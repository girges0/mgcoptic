-- ============================================================================
-- Migration 8: Ensure age column exists on public.users table
-- Allows storing and managing student age in the database & admin dashboard
-- ============================================================================

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS age INTEGER;
