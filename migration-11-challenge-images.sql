-- ============================================================================
-- Migration 11: Support Image Exercises (image_url in challenges table)
-- 1. Adds image_url column to public.challenges table for image-based exercises
-- 2. Ensures existing RLS policies cover the new column
-- ============================================================================

-- 1. إضافة عمود image_url لجدول التمارين public.challenges
ALTER TABLE IF EXISTS public.challenges 
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN public.challenges.image_url IS 'رابط الصورة التوضيحية للتمرين (خاص بنوع تمرين انظر للصورة واختر image_select أو أي تمرين بصورة)';
