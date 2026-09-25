-- ============================================================================
-- MG COPTIC — Migration 21: Cross-Device Student Gift Claim Synchronization
-- مزامنة استلام هدايا ومكافآت الطلاب سحابياً لمنع تكرار ظهورها عبر الأجهزة المتعددة
-- ============================================================================

-- 1. إضافة عمودي is_claimed و claimed_at لجدول أحداث الإشعارات
ALTER TABLE public.notification_events ADD COLUMN IF NOT EXISTS is_claimed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.notification_events ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_notification_events_claimed ON public.notification_events(target_user_id, is_claimed);

-- 2. إضافة عمود claimed_gifts لجدول تقدم المستخدم user_progress
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS claimed_gifts JSONB DEFAULT '[]'::jsonb;

-- 3. تفعيل صلاحيات التعديل والحذف للطالب على إشعاراته الخاصة
DROP POLICY IF EXISTS "user can update own notifications" ON public.notification_events;
CREATE POLICY "user can update own notifications" ON public.notification_events
  FOR UPDATE USING (auth.uid() = target_user_id OR public.is_admin())
  WITH CHECK (auth.uid() = target_user_id OR public.is_admin());

DROP POLICY IF EXISTS "user can delete own notifications" ON public.notification_events;
CREATE POLICY "user can delete own notifications" ON public.notification_events
  FOR DELETE USING (auth.uid() = target_user_id OR public.is_admin());

-- 4. إجراء موثوق ومحمي لاعتماد استلام الهدية وتثبيتها سحابياً لمنع تكرارها
CREATE OR REPLACE FUNCTION public.claim_student_gift(
    p_gift_id TEXT,
    p_notification_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_current_gifts JSONB;
BEGIN
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Unauthorized');
    END IF;

    -- 1. وضع علامة الاستلام على الإشعار في notification_events
    UPDATE public.notification_events
    SET is_claimed = TRUE,
        claimed_at = NOW()
    WHERE (target_user_id = v_user_id OR public.is_admin())
      AND (
        (p_notification_id IS NOT NULL AND id = p_notification_id)
        OR (p_gift_id IS NOT NULL AND p_gift_id <> '' AND deep_link LIKE '%' || p_gift_id || '%')
      );

    -- 2. إضافة معرف الهدية لسجل الهدايا المستلمة في user_progress
    IF p_gift_id IS NOT NULL AND p_gift_id <> '' THEN
        SELECT claimed_gifts INTO v_current_gifts
        FROM public.user_progress
        WHERE user_id = v_user_id;

        IF v_current_gifts IS NULL THEN
            v_current_gifts := '[]'::jsonb;
        END IF;

        IF NOT (v_current_gifts ? p_gift_id) THEN
            v_current_gifts := v_current_gifts || to_jsonb(p_gift_id);
            UPDATE public.user_progress
            SET claimed_gifts = v_current_gifts
            WHERE user_id = v_user_id;
        END IF;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'gift_id', p_gift_id,
        'claimed_gifts', COALESCE(v_current_gifts, '[]'::jsonb)
    );
END;
$$;
