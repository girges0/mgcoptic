-- ============================================================================
-- MG COPTIC — MIGRATION 18: ATOMIC HEART PURCHASE WITH XP
-- ============================================================================
-- هذه الدالة تضمن خصم الـ XP وإضافة القلوب بشكل ذري وموثوق على السيرفر (Server-Authoritative)
-- وتمنع حدوث Race Conditions أو خصم مبالغ خاطئة أو التلاعب بالرصيد
-- ============================================================================

CREATE OR REPLACE FUNCTION public.buy_hearts_with_xp(
    p_hearts_count INT DEFAULT 1,
    p_cost_per_heart INT DEFAULT 100
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_progress RECORD;
    v_safe_count INT;
    v_safe_cost INT;
    v_total_cost INT;
    v_new_hearts INT;
    v_new_points INT;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'المستخدم غير مسجل الدخول';
    END IF;

    -- التحقق وضبط المعاملات
    v_safe_count := GREATEST(1, LEAST(5, COALESCE(p_hearts_count, 1)));
    v_safe_cost := GREATEST(1, COALESCE(p_cost_per_heart, 100));
    v_total_cost := v_safe_count * v_safe_cost;

    -- قفل سجل المستخدم حصراً لمنع التزامن المزدوج
    SELECT * INTO v_progress 
    FROM public.user_progress 
    WHERE user_id = v_user_id 
    FOR UPDATE;

    IF v_progress IS NULL THEN
        RAISE EXCEPTION 'سجل تقدم المستخدم غير موجود';
    END IF;

    -- التحقق من كفاية الرصيد
    IF COALESCE(v_progress.points, 0) < v_total_cost THEN
        RETURN jsonb_build_object(
            'success', false,
            'reason', 'insufficient_xp',
            'required', v_total_cost,
            'current', COALESCE(v_progress.points, 0)
        );
    END IF;

    -- حساب القيم الجديدة (القلوب لا تتجاوز 5 والنقاط لا تقل عن 0)
    v_new_hearts := LEAST(5, COALESCE(v_progress.hearts, 0) + v_safe_count);
    v_new_points := GREATEST(0, COALESCE(v_progress.points, 0) - v_total_cost);

    UPDATE public.user_progress
    SET points = v_new_points,
        hearts = v_new_hearts,
        last_active_date = CURRENT_DATE
    WHERE user_id = v_user_id
    RETURNING * INTO v_progress;

    -- تسجيل العملية في سجل التدقيق
    BEGIN
        INSERT INTO public.audit_logs (user_id, actor_id, action, details, created_at)
        VALUES (
            v_user_id,
            v_user_id,
            'buy_hearts_with_xp',
            jsonb_build_object(
                'hearts_bought', v_safe_count,
                'cost_per_heart', v_safe_cost,
                'total_cost', v_total_cost,
                'new_points', v_progress.points,
                'new_hearts', v_progress.hearts
            ),
            NOW()
        );
    EXCEPTION WHEN OTHERS THEN
        -- عدم تعطيل الشراء في حال عدم وجود جدول التدقيق
        NULL;
    END;

    RETURN jsonb_build_object(
        'success', true,
        'points', v_progress.points,
        'hearts', v_progress.hearts,
        'spent_xp', v_total_cost,
        'added_hearts', v_safe_count
    );
END;
$$;

-- ضبط الصلاحيات
REVOKE EXECUTE ON FUNCTION public.buy_hearts_with_xp(INT, INT) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.buy_hearts_with_xp(INT, INT) TO authenticated, service_role;
