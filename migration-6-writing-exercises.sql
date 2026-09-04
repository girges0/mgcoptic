-- ============================================================
-- MG COPTIC — Migration 6: Writing Exercises & Letter Tracing
-- ============================================================

-- جدول تمارين الكتابة: يربط حرف أو كلمة موجودة بتفعيل/تعطيل تمرين تتبع لها
CREATE TABLE IF NOT EXISTS public.writing_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(10) NOT NULL CHECK (type IN ('letter', 'word')),
    letter_id BIGINT REFERENCES public.letters(id) ON DELETE CASCADE,
    vocabulary_id BIGINT REFERENCES public.vocabulary(id) ON DELETE CASCADE,
    custom_text TEXT,
    custom_meaning TEXT,
    difficulty VARCHAR(10) NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy','medium','hard')),
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT writing_exercise_target CHECK (
      (type = 'letter' AND letter_id IS NOT NULL) OR
      (type = 'word' AND (vocabulary_id IS NOT NULL OR custom_text IS NOT NULL))
    )
);

ALTER TABLE public.writing_exercises ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can read active writing_exercises" ON public.writing_exercises;
CREATE POLICY "anyone can read active writing_exercises" ON public.writing_exercises
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "admin can manage writing_exercises" ON public.writing_exercises;
CREATE POLICY "admin can manage writing_exercises" ON public.writing_exercises
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- جدول تتبع تقدم الطالب في كل تمرين كتابة
CREATE TABLE IF NOT EXISTS public.user_writing_progress (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.writing_exercises(id) ON DELETE CASCADE,
    best_accuracy NUMERIC(5,2) DEFAULT 0,
    attempts INT DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    last_attempt_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, exercise_id)
);

ALTER TABLE public.user_writing_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user can manage own writing progress" ON public.user_writing_progress;
CREATE POLICY "user can manage own writing progress" ON public.user_writing_progress
  FOR ALL USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());
