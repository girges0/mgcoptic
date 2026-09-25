-- ============================================================================
-- Migration 23: Dual Identifier Resolver (Email / Phone sign-in interchangeably)
-- Description:
--   Allows students who registered with both email & phone (or phone only / email only)
--   to log in smoothly using either their registered phone number or email address.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.resolve_login_auth_email(p_identifier TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
  v_raw TEXT := TRIM(COALESCE(p_identifier, ''));
  v_clean_phone TEXT;
  v_local_phone TEXT;
  v_found_email TEXT;
BEGIN
  IF v_raw = '' THEN
    RETURN NULL;
  END IF;

  -- 1. إذا كان المدخل بريداً إلكترونياً (يحتوي على @)
  IF POSITION('@' IN v_raw) > 0 THEN
    -- أ) تحقق هل هذا البريد موجود مباشرة في auth.users
    SELECT email INTO v_found_email
    FROM auth.users
    WHERE LOWER(email) = LOWER(v_raw)
    ORDER BY created_at DESC
    LIMIT 1;

    IF v_found_email IS NOT NULL THEN
      RETURN v_found_email;
    END IF;

    -- ب) إذا لم يوجد مباشرة في auth.users، ابحث في public.users
    -- فقد يكون المستخدم مسجلاً أصلاً برقم هاتف (auth.users.email = phone_...)
    -- وربط بريده الإلكتروني في حسابه بجدول public.users
    SELECT au.email INTO v_found_email
    FROM public.users u
    JOIN auth.users au ON au.id = u.id
    WHERE LOWER(u.email) = LOWER(v_raw)
       OR LOWER(COALESCE(au.raw_user_meta_data->>'email', '')) = LOWER(v_raw)
    ORDER BY u.created_at DESC NULLS LAST
    LIMIT 1;

    IF v_found_email IS NOT NULL THEN
      RETURN v_found_email;
    END IF;

    RETURN LOWER(v_raw);
  END IF;

  -- 2. إذا كان المدخل رقماً (هاتف / موبايل)
  v_clean_phone := REGEXP_REPLACE(v_raw, '[^0-9]', '', 'g');

  IF v_clean_phone <> '' THEN
    -- توحيد صيغ أرقام الموبايل (مثال: مصر 010, 011, 012, 015 أو كود الدولة +20)
    v_local_phone := v_clean_phone;
    IF v_local_phone LIKE '0020%' THEN
      v_local_phone := '0' || SUBSTRING(v_local_phone FROM 5);
    ELSIF v_local_phone LIKE '20%' AND LENGTH(v_local_phone) = 12 THEN
      v_local_phone := '0' || SUBSTRING(v_local_phone FROM 3);
    ELSIF LENGTH(v_local_phone) = 10 AND (v_local_phone LIKE '10%' OR v_local_phone LIKE '11%' OR v_local_phone LIKE '12%' OR v_local_phone LIKE '15%') THEN
      v_local_phone := '0' || v_local_phone;
    END IF;

    -- أ) ابحث في public.users وميتاداتا auth.users
    SELECT au.email INTO v_found_email
    FROM public.users u
    JOIN auth.users au ON au.id = u.id
    WHERE REGEXP_REPLACE(COALESCE(u.phone, ''), '[^0-9]', '', 'g') IN (v_clean_phone, v_local_phone, REGEXP_REPLACE(v_local_phone, '^0', ''))
       OR COALESCE(u.phone, '') IN (v_raw, v_clean_phone, v_local_phone)
       OR REGEXP_REPLACE(COALESCE(au.raw_user_meta_data->>'phone', ''), '[^0-9]', '', 'g') IN (v_clean_phone, v_local_phone, REGEXP_REPLACE(v_local_phone, '^0', ''))
    ORDER BY u.created_at DESC NULLS LAST
    LIMIT 1;

    IF v_found_email IS NOT NULL THEN
      RETURN v_found_email;
    END IF;

    -- ب) ابحث في auth.users بصيغة phone_...
    SELECT email INTO v_found_email
    FROM auth.users
    WHERE email IN (
      'phone_' || v_local_phone || '@phone.mgcoptic.com',
      'phone_' || v_clean_phone || '@phone.mgcoptic.com'
    )
    ORDER BY created_at DESC
    LIMIT 1;

    IF v_found_email IS NOT NULL THEN
      RETURN v_found_email;
    END IF;

    -- ج) افتراضي للهاتف
    RETURN 'phone_' || v_local_phone || '@phone.mgcoptic.com';
  END IF;

  RETURN v_raw;
END;
$$;

GRANT EXECUTE ON FUNCTION public.resolve_login_auth_email(TEXT) TO anon, authenticated, service_role;
