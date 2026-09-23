-- ============================================================================
-- MG COPTIC — Migration 20: Authoritative Gamification Ledger & XP Consistency
-- نظام موثق وذري بالكامل لحساب الـ XP ومنع التكرار والتصفير (Source of Truth: Supabase)
-- ============================================================================

-- 1. التأكد من وجود أعمدة التقدم الأساسية في جدول user_progress
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS total_points INT DEFAULT 0;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS reset_version INT DEFAULT 0;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS claimed_chests JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS last_active_date DATE DEFAULT CURRENT_DATE;

-- إضافة قيد سلامة يمنع أن تكون النقاط سالبة نهائياً
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_user_progress_points_non_negative'
    ) THEN
        ALTER TABLE public.user_progress 
        ADD CONSTRAINT chk_user_progress_points_non_negative CHECK (points >= 0);
    END IF;
END $$;

-- 2. جدول سجل مكافآت الدروس والتمارين (Authoritative Reward Ledger)
-- يمنع بشكل فيزيائي في قاعدة البيانات احتساب نفس التمرين أو نفس مكافأة الدرس مرتين
CREATE TABLE IF NOT EXISTS public.user_lesson_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id INT NOT NULL,
    challenge_id INT DEFAULT NULL,
    reward_type VARCHAR(50) NOT NULL, -- 'challenge_correct', 'lesson_completion', 'xp_recovery', 'heart_purchase', 'chest_reward'
    xp_amount INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس فريدة تمنع التكرار (Idempotency Constraints)
-- أ) منع تكرار احتساب الـ XP لنفس التمرين في نفس الدرس للطالب
CREATE UNIQUE INDEX IF NOT EXISTS uq_user_lesson_challenge_reward 
ON public.user_lesson_rewards (user_id, lesson_id, challenge_id) 
WHERE reward_type = 'challenge_correct' AND challenge_id IS NOT NULL;

-- ب) منع تكرار مكافأة إتمام الدرس للطالب
CREATE UNIQUE INDEX IF NOT EXISTS uq_user_lesson_completion_reward 
ON public.user_lesson_rewards (user_id, lesson_id) 
WHERE reward_type = 'lesson_completion';

-- فهرس لتسريع استعلامات رصيد ومكافآت الطالب
CREATE INDEX IF NOT EXISTS idx_user_lesson_rewards_lookup 
ON public.user_lesson_rewards (user_id, lesson_id, reward_type);

-- تفعيل RLS على جدول المكافآت
ALTER TABLE public.user_lesson_rewards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user can view own rewards" ON public.user_lesson_rewards;
CREATE POLICY "user can view own rewards" ON public.user_lesson_rewards
    FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

-- منع أي إدخال أو تعديل أو حذف مباشر من العميل؛ التعديل حصراً عبر الـ RPCs ذات الـ SECURITY DEFINER
REVOKE INSERT, UPDATE, DELETE ON public.user_lesson_rewards FROM anon, authenticated;

-- ============================================================================
-- 3. دالة تسجيل نقطة الـ XP للتمرين الفردي (Atomic Challenge XP Award)
-- تضمن 1 XP لكل إجابة صحيحة وتمنع التكرار عند إعادة المحاولة أو تعدد التابات
-- ============================================================================
CREATE OR REPLACE FUNCTION public.record_challenge_xp(
    p_lesson_id INT,
    p_challenge_id INT,
    p_is_correct BOOLEAN DEFAULT TRUE,
    p_xp_amount INT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_is_completed VARCHAR(20);
    v_already_exists BOOLEAN := FALSE;
    v_prog RECORD;
    v_db_challenge_xp INT := 1;
    v_awarded_xp INT := 1;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'غير مصرح: يجب تسجيل الدخول لاحتساب النقاط';
    END IF;

    IF p_lesson_id IS NULL OR p_challenge_id IS NULL THEN
        RAISE EXCEPTION 'معرف الدرس أو التمرين غير صالح';
    END IF;

    -- إذا كانت الإجابة خاطئة لا يتم احتساب أي نقاط
    IF p_is_correct IS NOT TRUE THEN
        SELECT points, hearts, streak_days INTO v_prog FROM public.user_progress WHERE user_id = v_user_id;
        RETURN jsonb_build_object(
            'success', true,
            'added_xp', 0,
            'points', COALESCE(v_prog.points, 0),
            'hearts', COALESCE(v_prog.hearts, 5)
        );
    END IF;

    -- قفل صف تقدم المستخدم لضمان العملية الذرية (Atomic Lock)
    SELECT * INTO v_prog FROM public.user_progress WHERE user_id = v_user_id FOR UPDATE;
    IF v_prog IS NULL THEN
        INSERT INTO public.user_progress (user_id, points, total_points, hearts, streak_days, last_active_date)
        VALUES (v_user_id, 0, 0, 5, 1, CURRENT_DATE)
        RETURNING * INTO v_prog;
    END IF;

    -- التحقق هل الدرس مكتمل مسبقاً (وضع المراجعة: 0 XP)
    SELECT status INTO v_is_completed 
    FROM public.user_lesson_progress 
    WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

    IF v_is_completed = 'completed' THEN
        RETURN jsonb_build_object(
            'success', true,
            'is_review', true,
            'already_awarded', true,
            'added_xp', 0,
            'points', v_prog.points,
            'hearts', v_prog.hearts
        );
    END IF;

    -- التحقق هل تم منح نقطة هذا التمرين مسبقاً للطالب
    SELECT EXISTS (
        SELECT 1 FROM public.user_lesson_rewards 
        WHERE user_id = v_user_id 
          AND lesson_id = p_lesson_id 
          AND challenge_id = p_challenge_id 
          AND reward_type = 'challenge_correct'
    ) INTO v_already_exists;

    IF v_already_exists THEN
        RETURN jsonb_build_object(
            'success', true,
            'already_awarded', true,
            'added_xp', 0,
            'points', v_prog.points,
            'hearts', v_prog.hearts
        );
    END IF;

    -- قراءة الـ XP المحدد لهذا التمرين من الداشبورد (جدول challenges) إن وُجد
    SELECT xp_reward INTO v_db_challenge_xp 
    FROM public.challenges 
    WHERE id = p_challenge_id;

    IF p_xp_amount IS NOT NULL AND p_xp_amount >= 0 THEN
        v_awarded_xp := p_xp_amount;
    ELSIF v_db_challenge_xp IS NOT NULL AND v_db_challenge_xp >= 0 THEN
        v_awarded_xp := v_db_challenge_xp;
    ELSE
        v_awarded_xp := 1;
    END IF;

    -- تسجيل المكافأة في السجل المحمي
    INSERT INTO public.user_lesson_rewards (user_id, lesson_id, challenge_id, reward_type, xp_amount)
    VALUES (v_user_id, p_lesson_id, p_challenge_id, 'challenge_correct', v_awarded_xp);

    -- تحديث رصيد المستخدم سحابياً بشكل ذري
    UPDATE public.user_progress
    SET points = COALESCE(points, 0) + v_awarded_xp,
        total_points = COALESCE(total_points, 0) + v_awarded_xp,
        last_active_date = CURRENT_DATE
    WHERE user_id = v_user_id
    RETURNING * INTO v_prog;

    -- تحديث سجل التمرين المكتمل
    INSERT INTO public.user_challenge_progress (user_id, challenge_id, completed, updated_at)
    VALUES (v_user_id, p_challenge_id, true, NOW())
    ON CONFLICT (user_id, challenge_id) DO UPDATE 
    SET completed = true, updated_at = NOW();

    RETURN jsonb_build_object(
        'success', true,
        'added_xp', v_awarded_xp,
        'points', v_prog.points,
        'hearts', v_prog.hearts,
        'streak_days', v_prog.streak_days
    );
END;
$$;

-- ============================================================================
-- 4. دالة إكمال الدرس الآمنة والموثوقة (Authoritative complete_lesson_reward)
-- تمنع ازدواجية الـ XP وتمنع ضياع النقاط وتعالج حالات المراجعة بدقة تامة
-- ============================================================================
CREATE OR REPLACE FUNCTION public.complete_lesson_reward(
    p_lesson_id INT,
    p_score INT DEFAULT 100
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_is_already_completed BOOLEAN := FALSE;
    v_existing_status VARCHAR(20);
    v_prog RECORD;
    v_new_streak INT := 1;
    v_awarded_challenges_xp INT := 0;
    v_earnable_xp INT := 5;
    v_completion_bonus INT := 0;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'غير مصرح: المستخدم غير مسجل الدخول';
    END IF;

    IF p_lesson_id IS NULL THEN
        RAISE EXCEPTION 'معرف الدرس غير صالح';
    END IF;

    -- قفل صف رصيد المستخدم
    SELECT * INTO v_prog FROM public.user_progress WHERE user_id = v_user_id FOR UPDATE;
    IF v_prog IS NULL THEN
        INSERT INTO public.user_progress (user_id, points, total_points, hearts, streak_days, last_active_date)
        VALUES (v_user_id, 0, 0, 5, 1, CURRENT_DATE)
        RETURNING * INTO v_prog;
    END IF;

    -- فحص حالة الدرس السابقة
    SELECT status INTO v_existing_status 
    FROM public.user_lesson_progress 
    WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

    IF v_existing_status = 'completed' THEN
        v_is_already_completed := TRUE;
    END IF;

    -- حساب أيام الاستمرارية (Streak)
    IF v_prog.last_active_date IS NULL THEN
        v_new_streak := 1;
    ELSIF v_prog.last_active_date = CURRENT_DATE THEN
        v_new_streak := COALESCE(v_prog.streak_days, 1);
    ELSIF v_prog.last_active_date = CURRENT_DATE - 1 THEN
        v_new_streak := COALESCE(v_prog.streak_days, 0) + 1;
    ELSE
        v_new_streak := 1;
    END IF;

    -- إذا كان الدرس مكتملاً مسبقاً (وضع المراجعة)، لا يتم منح أي نقاط إضافية
    IF v_is_already_completed THEN
        UPDATE public.user_progress
        SET streak_days = v_new_streak,
            last_active_date = CURRENT_DATE
        WHERE user_id = v_user_id
        RETURNING * INTO v_prog;

        RETURN jsonb_build_object(
            'success', true,
            'is_review', true,
            'added_xp', 0,
            'points', v_prog.points,
            'hearts', v_prog.hearts,
            'streak_days', v_prog.streak_days
        );
    END IF;

    -- تحديث حالة الدرس إلى مكتمل في جدول user_lesson_progress
    INSERT INTO public.user_lesson_progress (user_id, lesson_id, status, score, updated_at)
    VALUES (v_user_id, p_lesson_id, 'completed', COALESCE(p_score, 100), NOW())
    ON CONFLICT (user_id, lesson_id) DO UPDATE 
    SET status = 'completed',
        score = GREATEST(user_lesson_progress.score, EXCLUDED.score),
        updated_at = NOW();

    -- حساب النقاط المكتسبة بالفعل أثناء التمارين الفردية لهذا الدرس
    SELECT COALESCE(SUM(xp_amount), 0) INTO v_awarded_challenges_xp 
    FROM public.user_lesson_rewards
    WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

    -- استخراج عدد التمارين المستحقة للنقاط في هذا الدرس
    SELECT COUNT(*) INTO v_earnable_xp 
    FROM public.challenges 
    WHERE lesson_id = p_lesson_id 
      AND type NOT IN ('text_view', 'letter_overview', 'word_overview', 'lesson_overview', 'image_view');

    IF v_earnable_xp IS NULL OR v_earnable_xp <= 0 THEN
        -- استخراج من جدول lessons إذا لم توجد تمارين في جدول challenges
        SELECT xp_reward INTO v_earnable_xp FROM public.lessons WHERE id = p_lesson_id;
        IF v_earnable_xp IS NULL OR v_earnable_xp <= 0 THEN
            v_earnable_xp := 5;
        END IF;
    END IF;

    -- إذا كان هناك فرق بين ما تم احتسابه والحد المستحق (مثلاً تم إنهاء الدرس بدون إرسال كل تمرين):
    -- يتم منح الفرق فقط لضمان عدم ضياع أي نقاط، وبنفس الوقت منع الـ Double XP!
    IF v_earnable_xp > v_awarded_challenges_xp THEN
        v_completion_bonus := v_earnable_xp - v_awarded_challenges_xp;
    ELSE
        v_completion_bonus := 0;
    END IF;

    IF v_completion_bonus > 0 THEN
        INSERT INTO public.user_lesson_rewards (user_id, lesson_id, reward_type, xp_amount)
        VALUES (v_user_id, p_lesson_id, 'lesson_completion', v_completion_bonus)
        ON CONFLICT DO NOTHING;

        UPDATE public.user_progress
        SET points = COALESCE(points, 0) + v_completion_bonus,
            total_points = COALESCE(total_points, 0) + v_completion_bonus,
            streak_days = v_new_streak,
            last_active_date = CURRENT_DATE
        WHERE user_id = v_user_id
        RETURNING * INTO v_prog;
    ELSE
        -- تسجيل قيد الإتمام برصيد 0 لمنع التكرار مستقبلاً
        INSERT INTO public.user_lesson_rewards (user_id, lesson_id, reward_type, xp_amount)
        VALUES (v_user_id, p_lesson_id, 'lesson_completion', 0)
        ON CONFLICT DO NOTHING;

        UPDATE public.user_progress
        SET streak_days = v_new_streak,
            last_active_date = CURRENT_DATE
        WHERE user_id = v_user_id
        RETURNING * INTO v_prog;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'added_xp', v_completion_bonus,
        'total_lesson_xp', (v_awarded_challenges_xp + v_completion_bonus),
        'points', v_prog.points,
        'hearts', v_prog.hearts,
        'streak_days', v_prog.streak_days
    );
END;
$$;

-- ============================================================================
-- 5. دالة شراء القلوب بالـ XP الذرية والمحمية (Authoritative buy_hearts_with_xp)
-- 100 XP للقلب الواحد؛ الحساب والتحقق حصراً في السيرفر لمنع الرصيد السالب
-- ============================================================================
CREATE OR REPLACE FUNCTION public.buy_hearts_with_xp(
    p_count INT DEFAULT NULL,
    p_cost INT DEFAULT NULL,
    p_hearts_count INT DEFAULT NULL,
    p_cost_per_heart INT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_prog RECORD;
    v_req_count INT := COALESCE(p_count, p_hearts_count, 1);
    v_safe_count INT;
    v_effective_count INT;
    v_price_per_heart INT := 100;
    v_total_cost INT;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'غير مصرح: يجب تسجيل الدخول لإتمام عملية الشراء';
    END IF;

    v_safe_count := GREATEST(1, LEAST(5, COALESCE(v_req_count, 1)));

    -- قفل سجل المستخدم
    SELECT * INTO v_prog FROM public.user_progress WHERE user_id = v_user_id FOR UPDATE;
    IF v_prog IS NULL THEN
        RAISE EXCEPTION 'سجل المستخدم غير موجود';
    END IF;

    IF v_prog.hearts >= 5 THEN
        RAISE EXCEPTION 'القلوب ممتلئة بالفعل بالكامل (5 قلوب)';
    END IF;

    -- ضبط عدد القلوب المطلوب شراؤها لئلا يتجاوز السقف (5 قلوب)
    v_effective_count := LEAST(v_safe_count, 5 - COALESCE(v_prog.hearts, 0));
    v_total_cost := v_effective_count * v_price_per_heart;

    IF v_prog.points < v_total_cost THEN
        RAISE EXCEPTION 'رصيد نقاط الخبرة غير كافٍ للشراء (المطلوب: % XP، المتوفر: % XP)', v_total_cost, v_prog.points;
    END IF;

    -- خصم الـ XP وإضافة القلوب بشكل ذري ومستحيل أن يصبح سالباً
    UPDATE public.user_progress
    SET points = points - v_total_cost,
        hearts = LEAST(5, COALESCE(hearts, 0) + v_effective_count)
    WHERE user_id = v_user_id
    RETURNING * INTO v_prog;

    -- تسجيل عملية الشراء في السجل
    INSERT INTO public.user_lesson_rewards (user_id, lesson_id, reward_type, xp_amount)
    VALUES (v_user_id, 0, 'heart_purchase', -v_total_cost);

    RETURN jsonb_build_object(
        'success', true,
        'bought_hearts', v_effective_count,
        'cost', v_total_cost,
        'hearts', v_prog.hearts,
        'points', v_prog.points
    );
END;
$$;

-- ============================================================================
-- 6. دالة استعادة نقاط الـ XP المفقودة لمرة واحدة وبطريقة قابلة للتدقيق (XP Recovery)
-- تفحص الدروس المكتملة وتمنح الفروقات المستحقة فقط دون تكرار
-- ============================================================================
CREATE OR REPLACE FUNCTION public.recover_user_lost_xp()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_prog RECORD;
    v_rec RECORD;
    v_total_recovered INT := 0;
    v_awarded INT := 0;
    v_expected INT := 5;
    v_delta INT := 0;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'غير مصرح: يجب تسجيل الدخول لاستعادة النقاط';
    END IF;

    SELECT * INTO v_prog FROM public.user_progress WHERE user_id = v_user_id FOR UPDATE;
    IF v_prog IS NULL THEN
        INSERT INTO public.user_progress (user_id, points, total_points, hearts, streak_days, last_active_date)
        VALUES (v_user_id, 0, 0, 5, 1, CURRENT_DATE)
        RETURNING * INTO v_prog;
    END IF;

    -- تكرار على كافة الدروس المكتملة فعلياً للطالب
    FOR v_rec IN 
        SELECT lesson_id 
        FROM public.user_lesson_progress 
        WHERE user_id = v_user_id AND status = 'completed'
    LOOP
        -- حساب ما تم تسجيله سابقاً في السجل
        SELECT COALESCE(SUM(xp_amount), 0) INTO v_awarded 
        FROM public.user_lesson_rewards 
        WHERE user_id = v_user_id AND lesson_id = v_rec.lesson_id;

        -- تحديد ما يستحقه الدرس
        SELECT COUNT(*) INTO v_expected 
        FROM public.challenges 
        WHERE lesson_id = v_rec.lesson_id 
          AND type NOT IN ('text_view', 'letter_overview', 'word_overview', 'lesson_overview', 'image_view');

        IF v_expected IS NULL OR v_expected <= 0 THEN
            SELECT xp_reward INTO v_expected FROM public.lessons WHERE id = v_rec.lesson_id;
            IF v_expected IS NULL OR v_expected <= 0 THEN
                v_expected := 5;
            END IF;
        END IF;

        IF v_expected > v_awarded THEN
            v_delta := v_expected - v_awarded;
            INSERT INTO public.user_lesson_rewards (user_id, lesson_id, reward_type, xp_amount)
            VALUES (v_user_id, v_rec.lesson_id, 'xp_recovery', v_delta);

            v_total_recovered := v_total_recovered + v_delta;
        END IF;
    END LOOP;

    IF v_total_recovered > 0 THEN
        UPDATE public.user_progress
        SET points = COALESCE(points, 0) + v_total_recovered,
            total_points = COALESCE(total_points, 0) + v_total_recovered
        WHERE user_id = v_user_id
        RETURNING * INTO v_prog;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'recovered_xp', v_total_recovered,
        'points', v_prog.points,
        'hearts', v_prog.hearts,
        'streak_days', v_prog.streak_days
    );
END;
$$;

-- ============================================================================
-- 7. منح الصلاحيات الأمنية للدوال
-- ============================================================================
REVOKE EXECUTE ON FUNCTION public.record_challenge_xp(INT, INT, BOOLEAN, INT) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.record_challenge_xp(INT, INT, BOOLEAN, INT) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.complete_lesson_reward(INT, INT) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.complete_lesson_reward(INT, INT) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.buy_hearts_with_xp(INT, INT, INT, INT) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.buy_hearts_with_xp(INT, INT, INT, INT) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.recover_user_lost_xp() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.recover_user_lost_xp() TO authenticated;
