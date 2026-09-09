-- ============================================================================
-- Migration 12: Atomic Account Reset, Idempotent Chest Claim & Audit Logging
-- Canonical Location: database/migrations/migration-12-atomic-reset-chest-audit.sql
-- ============================================================================
-- 1. Server-side audit logs table
-- 2. reset_version & reset_at tracking on public.user_progress
-- 3. Dedicated reward configuration tables (chest_config, lesson_config)
-- 4. Authoritative, self-authorizing public.admin_reset_full_account(UUID, UUID)
-- 5. Atomic, idempotent public.claim_treasure_chest(TEXT)
-- 6. Authoritative public.complete_lesson_reward(INT, INT)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) جدول سجل العمليات والتدقيق (audit_logs)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
    FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs" ON public.audit_logs
    FOR INSERT WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 2) تتبع إصدار التصفير (reset_version) وتوقيته على جدول تقدم المستخدم
-- ----------------------------------------------------------------------------
ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS reset_version INT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS reset_at TIMESTAMPTZ;

-- ----------------------------------------------------------------------------
-- 3) جداول إعدادات المكافآت على السيرفر (Server-Authoritative Config)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chest_config (
    chest_id TEXT PRIMARY KEY,
    xp_reward INT NOT NULL DEFAULT 30,
    hearts_reward INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chest_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read chest_config" ON public.chest_config;
CREATE POLICY "Anyone can read chest_config" ON public.chest_config FOR SELECT USING (true);

-- إدراج إعدادات الصناديق الافتراضية
INSERT INTO public.chest_config (chest_id, xp_reward, hearts_reward)
VALUES 
    ('chest_1', 30, 1),
    ('chest_2', 35, 1),
    ('chest_3', 40, 2),
    ('chest_4', 45, 2),
    ('chest_5', 50, 3),
    ('chest_u1_1', 30, 1),
    ('chest_u1_2', 30, 1),
    ('chest_u2_1', 35, 1),
    ('chest_u2_2', 35, 1),
    ('chest_u3_1', 40, 2),
    ('chest_u4_1', 50, 3)
ON CONFLICT (chest_id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.lesson_config (
    lesson_id INT PRIMARY KEY,
    xp_reward INT NOT NULL DEFAULT 20,
    bonus_xp_for_perfect_score INT NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.lesson_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read lesson_config" ON public.lesson_config;
CREATE POLICY "Anyone can read lesson_config" ON public.lesson_config FOR SELECT USING (true);

-- تعبئة إعدادات الدروس تلقائياً من جدول الدروس public.lessons إن وُجد
INSERT INTO public.lesson_config (lesson_id, xp_reward, bonus_xp_for_perfect_score)
SELECT id, COALESCE(xp_reward, 20), 5 
FROM public.lessons
ON CONFLICT (lesson_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 4) دالة تصفير حساب المستخدم بالكامل مع الفحص الذاتي للصلاحيات (Self-Authorizing)
-- تشمل جميع الجداول المرتبطة بـ user_id في معاملة واحدة (Transaction)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_reset_full_account(
    p_user_id UUID,
    p_actor_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_caller_role TEXT := auth.role();
    v_caller_uid UUID := auth.uid();
    v_is_authorized BOOLEAN := FALSE;
    v_before_progress JSONB;
    v_after_progress JSONB;
    v_lessons_count INT := 0;
    v_challenges_count INT := 0;
    v_writings_count INT := 0;
    v_snapshots_count INT := 0;
    v_notifications_count INT := 0;
BEGIN
    -- 1. التحقق الذاتي الصارم من الصلاحيات (Self-Authorization Checks)
    IF v_caller_role = 'service_role' THEN
        -- مسموح فقط إذا كان الاستدعاء من خدمة السيرفر الداخلية المعتمدة
        v_is_authorized := TRUE;
    ELSE
        -- فحص أن المستدعي مسجل الدخول
        IF v_caller_uid IS NULL THEN
            RAISE EXCEPTION 'not authorized: caller must be authenticated';
        END IF;

        -- فحص عدم تزييف هوية المستدعي (caller matches p_actor_id)
        IF p_actor_id IS NULL OR v_caller_uid <> p_actor_id THEN
            RAISE EXCEPTION 'not authorized: actor mismatch';
        END IF;

        -- فحص أن المستدعي يمتلك رتبة مشرف (admin أو super_admin) في جدول users
        SELECT EXISTS (
            SELECT 1 FROM public.users
            WHERE id = p_actor_id AND role IN ('admin', 'super_admin')
        ) INTO v_is_authorized;

        IF NOT v_is_authorized THEN
            RAISE EXCEPTION 'not authorized: caller is not an admin';
        END IF;
    END IF;

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'invalid parameter: p_user_id cannot be null';
    END IF;

    -- 2. التقاط الحالة الحالية قبل التصفير لأغراض التدقيق (Capture Before-State)
    SELECT row_to_json(up) INTO v_before_progress
    FROM public.user_progress up
    WHERE up.user_id = p_user_id;

    SELECT COUNT(*) INTO v_lessons_count FROM public.user_lesson_progress WHERE user_id = p_user_id;
    SELECT COUNT(*) INTO v_challenges_count FROM public.user_challenge_progress WHERE user_id = p_user_id;
    SELECT COUNT(*) INTO v_writings_count FROM public.user_writing_progress WHERE user_id = p_user_id;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_rank_snapshot') THEN
        SELECT COUNT(*) INTO v_snapshots_count FROM public.user_rank_snapshot WHERE user_id = p_user_id;
        DELETE FROM public.user_rank_snapshot WHERE user_id = p_user_id;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notification_events') THEN
        SELECT COUNT(*) INTO v_notifications_count FROM public.notification_events WHERE target_user_id = p_user_id;
        DELETE FROM public.notification_events WHERE target_user_id = p_user_id;
    END IF;

    -- 3. حذف كافة سجلات التعلم والتقدم بشكل كامل وشامل في نفس المعاملة (All-or-Nothing)
    DELETE FROM public.user_lesson_progress WHERE user_id = p_user_id;
    DELETE FROM public.user_challenge_progress WHERE user_id = p_user_id;
    DELETE FROM public.user_writing_progress WHERE user_id = p_user_id;

    -- 4. تصفير رصيد التقدم وزيادة reset_version لفرض إبطال الكاش المحلي على أجهزة المستخدم
    INSERT INTO public.user_progress (
        user_id,
        points,
        hearts,
        streak_days,
        claimed_chests,
        reset_version,
        reset_at,
        last_active_date
    )
    VALUES (
        p_user_id,
        0,
        5,
        1,
        '[]'::jsonb,
        1,
        NOW(),
        CURRENT_DATE
    )
    ON CONFLICT (user_id) DO UPDATE
    SET points = 0,
        hearts = 5,
        streak_days = 1,
        claimed_chests = '[]'::jsonb,
        reset_version = COALESCE(public.user_progress.reset_version, 0) + 1,
        reset_at = NOW(),
        last_active_date = CURRENT_DATE
    RETURNING row_to_json(public.user_progress.*) INTO v_after_progress;

    -- 5. تسجيل حركة التصفير في سجل التدقيق (Audit Log)
    INSERT INTO public.audit_logs (user_id, actor_id, action, details, created_at)
    VALUES (
        p_user_id,
        COALESCE(p_actor_id, v_caller_uid),
        'account_reset',
        jsonb_build_object(
            'before', jsonb_build_object(
                'progress', v_before_progress,
                'lessons_cleared', v_lessons_count,
                'challenges_cleared', v_challenges_count,
                'writings_cleared', v_writings_count,
                'snapshots_cleared', v_snapshots_count,
                'notifications_cleared', v_notifications_count
            ),
            'after', v_after_progress,
            'reset_at', NOW()
        ),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'user_id', p_user_id,
        'reset_version', (v_after_progress->>'reset_version')::int,
        'progress', v_after_progress
    );
END;
$$;

-- ----------------------------------------------------------------------------
-- 5) دالة فتح صندوق الكنز الآمنة والذرية والمانعة للتكرار (Idempotent Chest Claim)
-- لا تقبل أي معاملات تخص قيم النقاط/القلوب من العميل إطلاقاً
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.claim_treasure_chest(
    p_chest_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_progress RECORD;
    v_xp_reward INT;
    v_hearts_reward INT;
    v_new_points INT;
    v_new_hearts INT;
    v_new_chests JSONB;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'المستخدم غير مسجل الدخول';
    END IF;

    IF p_chest_id IS NULL OR trim(p_chest_id) = '' THEN
        RAISE EXCEPTION 'رمز الصندوق غير صالح';
    END IF;

    -- قفل الصف row-level lock لمنع أي Race Condition أو فتح متزامن
    SELECT * INTO v_progress
    FROM public.user_progress
    WHERE user_id = v_user_id
    FOR UPDATE;

    IF v_progress IS NULL THEN
        INSERT INTO public.user_progress (user_id, points, hearts, streak_days, claimed_chests, last_active_date)
        VALUES (v_user_id, 0, 5, 1, '[]'::jsonb, CURRENT_DATE)
        RETURNING * INTO v_progress;
    END IF;

    -- التحقق: هل تم فتح هذا الصندوق مسبقاً؟
    IF v_progress.claimed_chests IS NOT NULL AND v_progress.claimed_chests ? trim(p_chest_id) THEN
        RETURN jsonb_build_object(
            'success', false,
            'already_claimed', true,
            'message', 'هذا الصندوق مفتوح مسبقاً',
            'points', v_progress.points,
            'hearts', v_progress.hearts,
            'claimed_chests', v_progress.claimed_chests
        );
    END IF;

    -- استخراج قيمة المكافأة حصراً من إعدادات السيرفر (Server-Side Config)
    SELECT xp_reward, hearts_reward 
    INTO v_xp_reward, v_hearts_reward
    FROM public.chest_config
    WHERE chest_id = trim(p_chest_id);

    IF v_xp_reward IS NULL THEN
        v_xp_reward := 30;
    END IF;
    IF v_hearts_reward IS NULL THEN
        v_hearts_reward := 1;
    END IF;

    v_new_points := COALESCE(v_progress.points, 0) + v_xp_reward;
    v_new_hearts := LEAST(5, COALESCE(v_progress.hearts, 5) + v_hearts_reward);
    v_new_chests := COALESCE(v_progress.claimed_chests, '[]'::jsonb) || to_jsonb(trim(p_chest_id));

    UPDATE public.user_progress
    SET points = v_new_points,
        hearts = v_new_hearts,
        claimed_chests = v_new_chests,
        last_active_date = CURRENT_DATE
    WHERE user_id = v_user_id;

    -- تسجيل فتح الصندوق في سجل التدقيق
    INSERT INTO public.audit_logs (user_id, actor_id, action, details, created_at)
    VALUES (
        v_user_id,
        v_user_id,
        'claim_chest',
        jsonb_build_object(
            'chest_id', trim(p_chest_id),
            'xp_reward', v_xp_reward,
            'hearts_reward', v_hearts_reward,
            'previous_points', v_progress.points,
            'new_points', v_new_points,
            'claimed_at', NOW()
        ),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'already_claimed', false,
        'points', v_new_points,
        'hearts', v_new_hearts,
        'claimed_chests', v_new_chests,
        'xp_reward', v_xp_reward,
        'hearts_reward', v_hearts_reward
    );
END;
$$;

-- ----------------------------------------------------------------------------
-- 6) دالة احتساب نقاط إكمال الدرس الموثوقة على السيرفر (Server-Authoritative Lesson Reward)
-- لا تقبل أي معامل يحدد قيمة الـ XP من العميل؛ تحسب النقاط والمكافأة حصراً في السيرفر
-- ----------------------------------------------------------------------------
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
    v_existing_status VARCHAR(20);
    v_base_xp INT := 20;
    v_bonus_xp INT := 0;
    v_effective_xp INT := 0;
    v_progress RECORD;
    v_new_streak INT := 1;
    v_already_completed BOOLEAN := FALSE;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'المستخدم غير مسجل الدخول';
    END IF;

    IF p_lesson_id IS NULL THEN
        RAISE EXCEPTION 'معرف الدرس غير صالح';
    END IF;

    -- التحقق من حالة الدرس السابقة
    SELECT status INTO v_existing_status
    FROM public.user_lesson_progress
    WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

    IF v_existing_status = 'completed' THEN
        v_already_completed := TRUE;
        v_effective_xp := 0;
    ELSE
        -- استخراج قيمة مكافأة الدرس من إعدادات السيرفر
        SELECT xp_reward, bonus_xp_for_perfect_score 
        INTO v_base_xp, v_bonus_xp
        FROM public.lesson_config
        WHERE lesson_id = p_lesson_id;

        IF v_base_xp IS NULL THEN
            SELECT xp_reward INTO v_base_xp FROM public.lessons WHERE id = p_lesson_id;
            IF v_base_xp IS NULL THEN
                v_base_xp := 20;
            END IF;
            v_bonus_xp := 5;
        END IF;

        v_effective_xp := v_base_xp;
        -- إضافة مكافأة الدرجة الكاملة في السيرفر فقط إذا كان الإنجاز 100%
        IF COALESCE(p_score, 0) >= 100 THEN
            v_effective_xp := v_effective_xp + COALESCE(v_bonus_xp, 0);
        END IF;
    END IF;

    -- تحديث حالة تقدم الدرس في السيرفر
    INSERT INTO public.user_lesson_progress (user_id, lesson_id, status, score, updated_at)
    VALUES (v_user_id, p_lesson_id, 'completed', COALESCE(p_score, 100), NOW())
    ON CONFLICT (user_id, lesson_id) DO UPDATE
    SET status = 'completed',
        score = GREATEST(user_lesson_progress.score, EXCLUDED.score),
        updated_at = NOW();

    -- قفل وتحديث رصيد المستخدم
    SELECT * INTO v_progress 
    FROM public.user_progress 
    WHERE user_id = v_user_id 
    FOR UPDATE;

    IF v_progress IS NULL THEN
        INSERT INTO public.user_progress (user_id, hearts, points, streak_days, last_active_date)
        VALUES (v_user_id, 5, v_effective_xp, 1, CURRENT_DATE)
        RETURNING * INTO v_progress;
    ELSE
        IF v_progress.last_active_date IS NULL THEN
            v_new_streak := 1;
        ELSIF v_progress.last_active_date = CURRENT_DATE THEN
            v_new_streak := v_progress.streak_days;
        ELSIF v_progress.last_active_date = CURRENT_DATE - 1 THEN
            v_new_streak := COALESCE(v_progress.streak_days, 0) + 1;
        ELSE
            v_new_streak := 1;
        END IF;

        UPDATE public.user_progress
        SET points = COALESCE(points, 0) + v_effective_xp,
            streak_days = v_new_streak,
            last_active_date = CURRENT_DATE
        WHERE user_id = v_user_id
        RETURNING * INTO v_progress;
    END IF;

    -- تسجيل الحدث في سجل التدقيق عند الحصول على نقاط جديدة
    IF v_effective_xp > 0 THEN
        INSERT INTO public.audit_logs (user_id, actor_id, action, details, created_at)
        VALUES (
            v_user_id,
            v_user_id,
            'complete_lesson',
            jsonb_build_object(
                'lesson_id', p_lesson_id,
                'score', p_score,
                'added_xp', v_effective_xp,
                'new_points', v_progress.points,
                'completed_at', NOW()
            ),
            NOW()
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'points', v_progress.points,
        'hearts', v_progress.hearts,
        'added_xp', v_effective_xp,
        'streak_days', v_progress.streak_days,
        'already_completed', v_already_completed
    );
END;
$$;

-- ----------------------------------------------------------------------------
-- 7) ضبط الصلاحيات (Strict Grants)
-- ----------------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.admin_reset_full_account(UUID, UUID) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.admin_reset_full_account(UUID, UUID) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.claim_treasure_chest(TEXT) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_treasure_chest(TEXT) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.complete_lesson_reward(INT, INT) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.complete_lesson_reward(INT, INT) TO authenticated;
