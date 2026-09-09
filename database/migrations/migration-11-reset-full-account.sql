-- ============================================================================
-- Migration 11: RPC Function to Reset Full Account
-- Cleans up all lesson, challenge, and writing progress for a given user
-- and resets user_progress back to Level 1 / 0 XP / 5 hearts.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.admin_reset_full_account(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF p_user_id IS NULL THEN
        RETURN FALSE;
    END IF;

    -- 1. حذف جميع سجلات تقدم الدروس
    DELETE FROM public.user_lesson_progress WHERE user_id = p_user_id;

    -- 2. حذف جميع سجلات تقدم التحديات
    DELETE FROM public.user_challenge_progress WHERE user_id = p_user_id;

    -- 3. حذف جميع سجلات تمارين الكتابة
    DELETE FROM public.user_writing_progress WHERE user_id = p_user_id;

    -- 4. تصفير رصيد المستخدم وإعادته كطالب جديد
    INSERT INTO public.user_progress (user_id, points, hearts, streak_days, claimed_chests, last_active_date)
    VALUES (p_user_id, 0, 5, 1, '[]'::jsonb, CURRENT_DATE)
    ON CONFLICT (user_id) DO UPDATE
    SET points = 0,
        hearts = 5,
        streak_days = 1,
        claimed_chests = '[]'::jsonb,
        last_active_date = CURRENT_DATE;

    RETURN TRUE;
END;
$$;

-- منح صلاحية الاستدعاء للأدوار المعنية
GRANT EXECUTE ON FUNCTION public.admin_reset_full_account(UUID) TO authenticated, service_role, anon;
