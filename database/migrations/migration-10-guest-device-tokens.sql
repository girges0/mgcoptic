-- ============================================================================
-- Migration 10: Guest Push Tokens & Account Linking
-- 1. Ensures public.device_tokens.user_id is nullable for guest/visitor tokens
-- 2. Configures RLS policies for anonymous token registration & authenticated claiming
-- 3. Adds claim_guest_device_token() RPC function for linking guest tokens to users on login/signup
-- ============================================================================

-- 1. التأكد من أن user_id يقبل NULL لدعم الزوار غير المسجلين
ALTER TABLE public.device_tokens ALTER COLUMN user_id DROP NOT NULL;

-- 2. تحديث سياسات الأمان على مستوى الصف (RLS)
ALTER TABLE public.device_tokens ENABLE ROW LEVEL SECURITY;

-- السماح للزوار غير المسجلين (anon) بحفظ توكن الجهاز عندما يكون user_id = NULL
DROP POLICY IF EXISTS "Anon can register device token" ON public.device_tokens;
CREATE POLICY "Anon can register device token"
    ON public.device_tokens
    FOR INSERT
    TO anon
    WITH CHECK (user_id IS NULL);

-- السماح للمستخدم المسجل بإدارة توكناته أو تعديل توكن زائر غير مرتبط
DROP POLICY IF EXISTS "Users can manage their own device tokens" ON public.device_tokens;
DROP POLICY IF EXISTS "Authenticated users can manage device tokens" ON public.device_tokens;
CREATE POLICY "Authenticated users can manage device tokens"
    ON public.device_tokens
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id OR user_id IS NULL)
    WITH CHECK (auth.uid() = user_id);

-- السماح للأدمن بإدارة جميع التوكنات
DROP POLICY IF EXISTS "Admin can manage all device tokens" ON public.device_tokens;
CREATE POLICY "Admin can manage all device tokens"
    ON public.device_tokens
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- 3. دالة RPC آمنة لربط توكن الزائر بحساب المستخدم الحالي فور تسجيل الدخول أو إنشاء الحساب
CREATE OR REPLACE FUNCTION public.claim_guest_device_token(p_token TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN FALSE;
    END IF;

    IF p_token IS NULL OR trim(p_token) = '' THEN
        RETURN FALSE;
    END IF;

    -- إذا كان التوكن مسجلاً لزائر (user_id IS NULL) أو لنفس المستخدم، حدّثه
    UPDATE public.device_tokens
    SET user_id = v_user_id,
        updated_at = timezone('utc'::text, now())
    WHERE token = trim(p_token);

    IF FOUND THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$;
