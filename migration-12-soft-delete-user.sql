-- ============================================================
-- MG COPTIC — Migration 12: Soft Delete for Users
-- إتاحة حذف الحساب من جانب العميل مع بقاء كافة بياناته في الداشبورد
-- ============================================================

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS deleted_by TEXT DEFAULT NULL;

-- فهرس لتسريع البحث والتصفية
CREATE INDEX IF NOT EXISTS idx_users_is_deleted ON public.users(is_deleted);
