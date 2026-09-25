-- ============================================================
-- MG COPTIC — Migration 22: Device & Session Intelligence
-- نظام معلومات الأجهزة والجلسات النشطة
-- ============================================================
-- هذا الملف آمن للتشغيل أكثر من مرة (idempotent)
-- لا يؤثر على Auth أو Gamification أو Progress
-- ============================================================

-- 1) جدول أجهزة المستخدمين
CREATE TABLE IF NOT EXISTS public.user_devices (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    device_uuid     TEXT NOT NULL,              -- معرف UUID عشوائي يُنشأ محلياً على الجهاز
    platform        TEXT DEFAULT 'web',         -- web / android / ios
    device_type     TEXT DEFAULT 'unknown',     -- mobile / tablet / desktop / unknown
    manufacturer    TEXT DEFAULT '',            -- الشركة المصنعة (Samsung, Xiaomi, Apple, etc.)
    model           TEXT DEFAULT '',            -- موديل الجهاز (Redmi Note 13 Pro, iPhone 15, etc.)
    os_name         TEXT DEFAULT '',            -- نظام التشغيل (Android, iOS, Windows, macOS, Linux)
    os_version      TEXT DEFAULT '',            -- إصدار نظام التشغيل (15, 17.4, 11, etc.)
    browser_name    TEXT DEFAULT '',            -- اسم المتصفح (Chrome, Safari, Firefox, etc.)
    browser_version TEXT DEFAULT '',            -- إصدار المتصفح
    app_version     TEXT DEFAULT '',            -- إصدار التطبيق (1.0.0, 1.4.0, etc.)
    screen_width    INT DEFAULT 0,             -- عرض الشاشة (اختياري، لتحديد حجم الجهاز فقط)
    screen_height   INT DEFAULT 0,             -- ارتفاع الشاشة (اختياري)
    first_seen_at   TIMESTAMPTZ DEFAULT NOW(),  -- أول ظهور للجهاز
    last_seen_at    TIMESTAMPTZ DEFAULT NOW(),  -- آخر نشاط مسجل
    activity_count  INT DEFAULT 1,             -- عدد مرات النشاط (فتح التطبيق / تسجيل الدخول)
    is_active       BOOLEAN DEFAULT TRUE,       -- هل الجهاز نشط حالياً
    last_ip_hash    TEXT DEFAULT '',            -- Hash آمن للـ IP (ليس IP خام)
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2) فهرس فريد لمنع تكرار نفس الجهاز لنفس المستخدم
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_user_device_uuid'
    ) THEN
        ALTER TABLE public.user_devices 
            ADD CONSTRAINT uq_user_device_uuid UNIQUE (user_id, device_uuid);
    END IF;
END $$;

-- 3) فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON public.user_devices (user_id);
CREATE INDEX IF NOT EXISTS idx_user_devices_last_seen ON public.user_devices (last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_devices_platform ON public.user_devices (platform);
CREATE INDEX IF NOT EXISTS idx_user_devices_active ON public.user_devices (is_active) WHERE is_active = TRUE;

-- 4) تفعيل RLS
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;

-- 5) سياسات RLS

-- المستخدم العادي يستطيع فقط قراءة أجهزته هو
DROP POLICY IF EXISTS "users can read own devices" ON public.user_devices;
CREATE POLICY "users can read own devices" ON public.user_devices
    FOR SELECT
    USING (auth.uid() = user_id);

-- المستخدم يستطيع إضافة جهاز لنفسه فقط (مربوط بـ auth.uid)
DROP POLICY IF EXISTS "users can insert own devices" ON public.user_devices;
CREATE POLICY "users can insert own devices" ON public.user_devices
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- المستخدم يستطيع تحديث أجهزته هو فقط
DROP POLICY IF EXISTS "users can update own devices" ON public.user_devices;
CREATE POLICY "users can update own devices" ON public.user_devices
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Admin يستطيع قراءة كل الأجهزة
DROP POLICY IF EXISTS "admin can read all devices" ON public.user_devices;
CREATE POLICY "admin can read all devices" ON public.user_devices
    FOR SELECT
    USING (public.is_admin());

-- Admin يستطيع تحديث حالة أي جهاز (تعطيل / تفعيل)
DROP POLICY IF EXISTS "admin can update all devices" ON public.user_devices;
CREATE POLICY "admin can update all devices" ON public.user_devices
    FOR UPDATE
    USING (public.is_admin());

-- 6) دالة Upsert آمنة للجهاز — تستخدم auth.uid() مع p_user_id كبديل موثوق للـ WebViews
DROP FUNCTION IF EXISTS public.upsert_user_device(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INT, INT);
DROP FUNCTION IF EXISTS public.upsert_user_device(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INT, INT, UUID);
DROP FUNCTION IF EXISTS public.heartbeat_device(TEXT);
DROP FUNCTION IF EXISTS public.heartbeat_device(TEXT, UUID);

CREATE OR REPLACE FUNCTION public.upsert_user_device(
    p_device_uuid TEXT,
    p_platform TEXT DEFAULT 'web',
    p_device_type TEXT DEFAULT 'unknown',
    p_manufacturer TEXT DEFAULT '',
    p_model TEXT DEFAULT '',
    p_os_name TEXT DEFAULT '',
    p_os_version TEXT DEFAULT '',
    p_browser_name TEXT DEFAULT '',
    p_browser_version TEXT DEFAULT '',
    p_app_version TEXT DEFAULT '',
    p_screen_width INT DEFAULT 0,
    p_screen_height INT DEFAULT 0,
    p_user_id UUID DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    v_user_id := COALESCE(auth.uid(), p_user_id);
    IF v_user_id IS NULL THEN
        RETURN;
    END IF;

    -- التحقق من وجود المستخدم في جدول users
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = v_user_id) THEN
        RETURN;
    END IF;

    INSERT INTO public.user_devices (
        user_id, device_uuid, platform, device_type, manufacturer, model,
        os_name, os_version, browser_name, browser_version, app_version,
        screen_width, screen_height, first_seen_at, last_seen_at, activity_count,
        is_active, created_at, updated_at
    ) VALUES (
        v_user_id, p_device_uuid, p_platform, p_device_type, p_manufacturer, p_model,
        p_os_name, p_os_version, p_browser_name, p_browser_version, p_app_version,
        p_screen_width, p_screen_height, NOW(), NOW(), 1,
        TRUE, NOW(), NOW()
    )
    ON CONFLICT (user_id, device_uuid) DO UPDATE SET
        platform = EXCLUDED.platform,
        device_type = EXCLUDED.device_type,
        manufacturer = COALESCE(NULLIF(EXCLUDED.manufacturer, ''), user_devices.manufacturer),
        model = COALESCE(NULLIF(EXCLUDED.model, ''), user_devices.model),
        os_name = COALESCE(NULLIF(EXCLUDED.os_name, ''), user_devices.os_name),
        os_version = COALESCE(NULLIF(EXCLUDED.os_version, ''), user_devices.os_version),
        browser_name = COALESCE(NULLIF(EXCLUDED.browser_name, ''), user_devices.browser_name),
        browser_version = COALESCE(NULLIF(EXCLUDED.browser_version, ''), user_devices.browser_version),
        app_version = COALESCE(NULLIF(EXCLUDED.app_version, ''), user_devices.app_version),
        screen_width = CASE WHEN EXCLUDED.screen_width > 0 THEN EXCLUDED.screen_width ELSE user_devices.screen_width END,
        screen_height = CASE WHEN EXCLUDED.screen_height > 0 THEN EXCLUDED.screen_height ELSE user_devices.screen_height END,
        last_seen_at = NOW(),
        activity_count = user_devices.activity_count + 1,
        is_active = TRUE,
        updated_at = NOW();
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_user_device TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_user_device TO anon;

-- 7) دالة تحديث last_seen فقط مع throttling (لا تنشئ سجل جديد)
CREATE OR REPLACE FUNCTION public.heartbeat_device(
    p_device_uuid TEXT,
    p_user_id UUID DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_last_seen TIMESTAMPTZ;
BEGIN
    v_user_id := COALESCE(auth.uid(), p_user_id);
    IF v_user_id IS NULL THEN
        RETURN;
    END IF;

    SELECT last_seen_at INTO v_last_seen
    FROM public.user_devices
    WHERE user_id = v_user_id AND device_uuid = p_device_uuid;

    IF v_last_seen IS NOT NULL AND (NOW() - v_last_seen) < INTERVAL '3 minutes' THEN
        RETURN;
    END IF;

    UPDATE public.user_devices
    SET last_seen_at = NOW(),
        is_active = TRUE,
        updated_at = NOW()
    WHERE user_id = v_user_id AND device_uuid = p_device_uuid;
END;
$$;

GRANT EXECUTE ON FUNCTION public.heartbeat_device TO authenticated;
GRANT EXECUTE ON FUNCTION public.heartbeat_device TO anon;

-- ============================================================
-- ملاحظة مهمة:
-- هذا النظام لا يخزن أي بيانات حساسة:
-- لا IMEI، لا MAC، لا Serial، لا GPS، لا SIM
-- فقط Device Metadata غير حساسة مستخرجة من المتصفح
-- ============================================================
