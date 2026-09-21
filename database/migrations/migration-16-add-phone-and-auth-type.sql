-- ============================================================================
-- Migration 16: Add phone and auth_type columns to public.users table
-- Allows storing and displaying mobile numbers and registration methods
-- (Google, Phone, Email) in the database and admin dashboard.
-- ============================================================================

-- 1. إضافة عمود رقم الموبايل
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(30);

-- 2. إضافة عمود وسيلة التسجيل (phone / email / google)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS auth_type VARCHAR(30);

-- 3. إنشاء فهرس على رقم الموبايل لسرعة البحث والاستعلام
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);

-- 4. تعليق توضيحي على الأعمدة
COMMENT ON COLUMN public.users.phone IS 'Mobile phone number of the user (e.g., 012xxxxxxxx)';
COMMENT ON COLUMN public.users.auth_type IS 'Registration method/provider: phone, email, or google';
