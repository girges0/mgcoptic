-- ============================================================
-- MG COPTIC — Reset All Learning Path Curriculum & Progress
-- تصفير جميع بيانات مسار التعلم للبدء في إضافة المنهج الفعلي
-- ============================================================
-- شغّل هذا السكربت في: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. حذف خيارات التمارين والتمارين والدروس والوحدات وصناديق المكافآت
DELETE FROM public.challenge_options;
DELETE FROM public.challenges;
DELETE FROM public.lessons;
DELETE FROM public.units;
DELETE FROM public.chests;

-- 2. حذف سجلات تقدم الطلاب في مسار التعلم السابق
DELETE FROM public.user_lesson_progress;
DELETE FROM public.user_challenge_progress;
DELETE FROM public.user_writing_progress;

-- 3. تصفير رصيد ونقاط المستخدمين في مسار التعلم
UPDATE public.user_progress
SET points = 0,
    hearts = 5,
    streak_days = 1,
    claimed_chests = '[]'::jsonb,
    last_active_date = CURRENT_DATE;

-- 4. إعادة ضبط ترقيم المعرفات التلقائية (Sequences) إن وجدت
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'units_id_seq') THEN
        ALTER SEQUENCE units_id_seq RESTART WITH 1;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'lessons_id_seq') THEN
        ALTER SEQUENCE lessons_id_seq RESTART WITH 1;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'challenges_id_seq') THEN
        ALTER SEQUENCE challenges_id_seq RESTART WITH 1;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'challenge_options_id_seq') THEN
        ALTER SEQUENCE challenge_options_id_seq RESTART WITH 1;
    END IF;
END $$;

-- 5. الإبقاء على المستوى الأول أو إعادة إنشائه نظيفاً
DELETE FROM public.levels;
INSERT INTO public.levels (id, title, description, order_index)
VALUES (1, 'المستوى 1: الأساسيات', 'مسار تعلم اللغة القبطية', 1)
ON CONFLICT (id) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = 1;

SELECT 'تم تصفير جميع بيانات مسار التعلم بنجاح! المسار جاهز لإضافة المنهج الفعلي.' AS status;
