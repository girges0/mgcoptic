-- ============================================================
-- MG COPTIC — Migration 4: Production Ready Architecture
-- ربط قاعدة البيانات الحقيقية وتفعيل الجاهزية للإنتاج بالكامل
-- ============================================================

-- 1) جدول المستخدمين والملفات الشخصية المرتبط بـ Supabase Auth
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL DEFAULT 'مستخدم قبطي',
    age INT DEFAULT 15,
    email VARCHAR(100) DEFAULT NULL,
    avatar_url TEXT DEFAULT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2) جدول تقدم ونقاط المستخدم
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    hearts INT DEFAULT 5,
    points INT DEFAULT 0,
    streak_days INT DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE
);

-- 3) دالة فحص صلاحية الأدمن الآمنة في الـ Database
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 4) Trigger تلقائي عند تسجيل أي مستخدم جديد في Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role VARCHAR(20) := 'student';
  v_full_name VARCHAR(100);
  v_age INT;
BEGIN
  IF NEW.email IN ('girgess07@gmail.com', 'mg@gmail.com', 'mgcoptic@gmail.com') THEN
    v_role := 'admin';
  END IF;

  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), 'مستخدم قبطي');
  v_age := COALESCE((NEW.raw_user_meta_data->>'age')::INT, 15);

  INSERT INTO public.users (id, full_name, age, email, role, created_at)
  VALUES (NEW.id, v_full_name, v_age, NEW.email, v_role, COALESCE(NEW.created_at, NOW()))
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      role = CASE WHEN NEW.email IN ('girgess07@gmail.com', 'mg@gmail.com', 'mgcoptic@gmail.com') THEN 'admin' ELSE users.role END;

  INSERT INTO public.user_progress (user_id, hearts, points, streak_days, last_active_date)
  VALUES (NEW.id, 5, 0, 1, CURRENT_DATE)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- تعبئة الحسابات الحالية الثلاثة
INSERT INTO public.users (id, full_name, age, email, role, created_at)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1), 'مدير المنصة'),
  15,
  email,
  'admin',
  created_at
FROM auth.users
ON CONFLICT (id) DO UPDATE SET role = 'admin';

INSERT INTO public.user_progress (user_id, hearts, points, streak_days, last_active_date)
SELECT id, 5, 0, 1, CURRENT_DATE
FROM public.users
ON CONFLICT (user_id) DO NOTHING;

-- 5) جداول المنهج التعليمي
CREATE TABLE IF NOT EXISTS public.levels (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    order_index INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.units (
    id SERIAL PRIMARY KEY,
    level_id INT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    badge VARCHAR(50) DEFAULT 'Ⲁ',
    description TEXT,
    order_index INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.lessons (
    id SERIAL PRIMARY KEY,
    unit_id INT NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    xp_reward INT DEFAULT 20,
    order_index INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.challenges (
    id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    coptic_display TEXT,
    audio_text TEXT,
    audio_url TEXT,
    correct_word TEXT,
    tiles JSONB,
    pairs JSONB,
    is_correct BOOLEAN DEFAULT TRUE,
    order_index INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.challenge_options (
    id SERIAL PRIMARY KEY,
    challenge_id INT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    audio_url TEXT
);

CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id INT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'locked' CHECK (status IN ('locked', 'in_progress', 'completed')),
    score INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.user_challenge_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    challenge_id INT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_challenge UNIQUE (user_id, challenge_id)
);

-- 6) تعبئة بيانات المستوى الأول التعليمية الأساسية (7 وحدات)
DO $$
DECLARE
    lvl1_id INT;
    u1_id INT; u2_id INT; u3_id INT; u4_id INT; u5_id INT; u6_id INT; u7_id INT;
    l1_id INT; l2_id INT; l3_id INT; l4_id INT; l5_id INT; l6_id INT; l7_id INT;
    c_id INT;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.levels WHERE id = 1) THEN
        INSERT INTO public.levels (id, title, description, order_index)
        VALUES (1, 'المستوى 1: الأبجدية القبطية (اللهجة البحيرية)', 'تعلّم نطق وكتابة وقراءة جميع الحروف القبطية الـ 32 من خلال 7 وحدات تدريبية ممتعة.', 1)
        RETURNING id INTO lvl1_id;
    ELSE
        lvl1_id := 1;
    END IF;

    -- الوحدة 1
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 1) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 1: الحروف الأولى (ⲁ ⲃ ⲅ ⲇ ⲉ)', 'Ⲁ', 'ألفا، فيدا، غاما، دلدا، إي', 1) RETURNING id INTO u1_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u1_id, 'الدرس 1: نطق الحروف ⲁ ⲃ ⲅ ⲇ ⲉ', 20, 1) RETURNING id INTO l1_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l1_id, 'select', 'ما هو الصوت الأساسي للحرف Ⲁⲁ (ألفا)؟', 'Ⲁ ⲁ', 'ألفا', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'أَ (ألف مفتوحة ممدودة)', true),
        (c_id, 'ب (باء صريحة)', false),
        (c_id, 'ك (كاف مفخمة)', false),
        (c_id, 'م (ميم ساكنة)', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l1_id, 'select', 'أي من الحروف التالية يُنطق «ڤ / ب» واسمه فيدا؟', 'Ⲃ ⲃ', 'فيدا', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲃ ⲃ', true),
        (c_id, 'Ⲇ ⲇ', false),
        (c_id, 'Ⲉ ⲉ', false),
        (c_id, 'Ⲅ ⲅ', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l1_id, 'listen', 'استمع للاسم واختر الحرف القبطي المقابل:', 'Ⲅ ⲅ', 'غاما', 3) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲅ ⲅ (غاما)', true),
        (c_id, 'Ⲁ ⲁ (ألفا)', false),
        (c_id, 'Ⲃ ⲃ (فيدا)', false),
        (c_id, 'Ⲇ ⲇ (دلدا)', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l1_id, 'select', 'حرف Ⲇⲇ (دلدا) يُنطق في الكلمات القبطية كـ:', 'Ⲇ ⲇ', 'دلدا', 4) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'د (دال) أو ذ (ذال)', true),
        (c_id, 'ر (راء)', false),
        (c_id, 'س (سين)', false),
        (c_id, 'ص (صاد)', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l1_id, 'match', 'طابق كل حرف قبطي باسمه الصحيح:', '[{"left":"Ⲁ ⲁ","right":"ألفا"},{"left":"Ⲃ ⲃ","right":"فيدا"},{"left":"Ⲉ ⲉ","right":"إي"},{"left":"Ⲇ ⲇ","right":"دلدا"}]'::jsonb, 5);
    END IF;

    -- الوحدة 2
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 2) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 2: الحروف (ⲍ ⲏ ⲑ ⲓ ⲕ)', 'Ⲍ', 'زاتا، هيتا، ثيتا، إيوتا، كابا', 2) RETURNING id INTO u2_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u2_id, 'الدرس 2: نطق الحروف ⲍ ⲏ ⲑ ⲓ ⲕ', 20, 1) RETURNING id INTO l2_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l2_id, 'select', 'ما هو اسم الحرف القبطي Ⲍⲍ وكيف يُنطق؟', 'Ⲍ ⲍ', 'زاتا', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'زاتا — يُنطق زاي (ز)', true),
        (c_id, 'هيتا — ياء ممدودة', false),
        (c_id, 'ثيتا — ثاء', false),
        (c_id, 'كابا — كاف', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l2_id, 'select', 'حرف Ⲏⲏ (هيتا) هو حركة مدّية تعادل في النطق:', 'Ⲏ ⲏ', 'هيتا', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ياء ممدودة طويلة (يه)', true),
        (c_id, 'واو مضمومة', false),
        (c_id, 'ألف ساكنة', false),
        (c_id, 'نون خفيفة', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l2_id, 'select', 'ما هو الحرف المقابل لرمز Ⲑⲑ؟', 'Ⲑ ⲑ', 'ثيتا', 3) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ثيتا (ث)', true),
        (c_id, 'تاف (ت)', false),
        (c_id, 'شاي (ش)', false),
        (c_id, 'خاي (خ)', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l2_id, 'match', 'طابق الحرف بصوته المعتمد في اللهجة البحيرية:', '[{"left":"Ⲓ ⲓ","right":"ي (إيوتا)"},{"left":"Ⲕ ⲕ","right":"ك (كابا)"},{"left":"Ⲍ ⲍ","right":"ز (زاتا)"},{"left":"Ⲑ ⲑ","right":"ث (ثيتا)"}]'::jsonb, 4);
    END IF;

    -- الوحدة 3
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 3) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 3: الحروف (ⲗ ⲙ ⲛ ⲝ ⲟ)', 'Ⲗ', 'لابدا، مي، ني، كسي، أو القصيرة', 3) RETURNING id INTO u3_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u3_id, 'الدرس 3: نطق الحروف ⲗ ⲙ ⲛ ⲝ ⲟ', 20, 1) RETURNING id INTO l3_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l3_id, 'select', 'ما هو اسم ونطق الحرف Ⲗⲗ؟', 'Ⲗ ⲗ', 'لابدا', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'لابدا (ل)', true),
        (c_id, 'مي (م)', false),
        (c_id, 'رو (ر)', false),
        (c_id, 'ني (ن)', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l3_id, 'select', 'الحرف المركب Ⲝⲝ (كسي) يُنطق في الكلمات:', 'Ⲝ ⲝ', 'كسي', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'كس (K + S)', true),
        (c_id, 'بس (P + S)', false),
        (c_id, 'تش (CH)', false),
        (c_id, 'تي (T + I)', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l3_id, 'select', 'حرف Ⲟⲟ (أو) يُمثل حركة:', 'Ⲟ ⲟ', 'أو', 3) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ضمة قصيرة (ُأ)', true),
        (c_id, 'فتحة ممدودة', false),
        (c_id, 'كسرة عميقة', false),
        (c_id, 'سكون تام', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l3_id, 'match', 'طابق بين الحرف والنطق المقابل:', '[{"left":"Ⲙ ⲙ","right":"م (مي)"},{"left":"Ⲛ ⲛ","right":"ن (ني)"},{"left":"Ⲗ ⲗ","right":"ل (لابدا)"},{"left":"Ⲝ ⲝ","right":"كس (كسي)"}]'::jsonb, 4);
    END IF;

    -- الوحدة 4
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 4) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 4: الحروف (ⲡ ⲣ ⲥ ⲧ ⲩ)', 'Ⲡ', 'بي، رو، سيما، تاف، إبسيلون', 4) RETURNING id INTO u4_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u4_id, 'الدرس 4: نطق الحروف ⲡ ⲣ ⲥ ⲧ ⲩ', 20, 1) RETURNING id INTO l4_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l4_id, 'select', 'حرف Ⲡⲡ (بي) يُنطق دائماً في القبطية كـ:', 'Ⲡ ⲡ', 'بي', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ب (باء صريحة)', true),
        (c_id, 'ف (فاء)', false),
        (c_id, 'ت (تاء)', false),
        (c_id, 'م (ميم)', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l4_id, 'select', 'ما هو الحرف الذي يُنطق (س) واسمه سيما؟', 'Ⲥ ⲥ', 'سيما', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲥ ⲥ', true),
        (c_id, 'Ⲣ ⲣ', false),
        (c_id, 'Ⲧ ⲧ', false),
        (c_id, 'Ⲩ ⲩ', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l4_id, 'match', 'طابق الحرف القبطي مع اسمه المعتمد:', '[{"left":"Ⲣ ⲣ","right":"رو"},{"left":"Ⲧ ⲧ","right":"تاف"},{"left":"Ⲩ ⲩ","right":"إبسيلون"},{"left":"Ⲡ ⲡ","right":"بي"}]'::jsonb, 3);
    END IF;

    -- الوحدة 5
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 5) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 5: الحروف (ⲫ ⲭ ⲯ ⲱ)', 'Ⲫ', 'في، خي، إبسي، أوميغا', 5) RETURNING id INTO u5_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u5_id, 'الدرس 5: نطق الحروف ⲫ ⲭ ⲯ ⲱ', 20, 1) RETURNING id INTO l5_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l5_id, 'select', 'ما هو الحرف المركب Ⲯⲯ وما نطقه؟', 'Ⲯ ⲯ', 'إبسي', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'إبسي — يُنطق «بس» (P + S)', true),
        (c_id, 'كسي — يُنطق «كس»', false),
        (c_id, 'تي — يُنطق «تي»', false),
        (c_id, 'تشيما — يُنطق «تش»', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l5_id, 'select', 'حرف Ⲱⲱ (أوميغا) يُمثل حركة:', 'Ⲱ ⲱ', 'أوميغا', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'واو ممدودة طويلة (أوو)', true),
        (c_id, 'واو قصيرة مضمومة', false),
        (c_id, 'ياء ساكنة', false),
        (c_id, 'ألف مهموزة', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l5_id, 'match', 'طابق بين الحرف والنطق الصحيح:', '[{"left":"Ⲫ ⲫ","right":"ف (في)"},{"left":"Ⲭ ⲭ","right":"خ / ك / ش (خي)"},{"left":"Ⲯ ⲯ","right":"بس (إبسي)"},{"left":"Ⲱ ⲱ","right":"أوو (أوميغا)"}]'::jsonb, 3);
    END IF;

    -- الوحدة 6
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 6) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 6: الحروف المصرية الخاصة (ϣ ϥ ϧ ϩ ϫ ϭ ϯ)', 'Ϣ', 'شاي، فاي، خاي، هوري، جانجا، تشيما، تي', 6) RETURNING id INTO u6_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u6_id, 'الدرس 6: الحروف المصرية الديموطيقية الخاصة', 20, 1) RETURNING id INTO l6_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l6_id, 'select', 'الحرف Ϣϣ (شاي) أصله مصري قديم ويُنطق:', 'Ϣ ϣ', 'شاي', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ش (شين)', true),
        (c_id, 'س (سين)', false),
        (c_id, 'ص (صاد)', false),
        (c_id, 'ث (ثاء)', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l6_id, 'select', 'أي من هذه الحروف يُنطق «تش»؟', 'Ϭ ϭ', 'تشيما', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ϭ ϭ (تشيما)', true),
        (c_id, 'Ϫ ϫ (جانجا)', false),
        (c_id, 'Ϩ ϩ (هوري)', false),
        (c_id, 'Ϧ ϧ (خاي)', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l6_id, 'match', 'طابق الحروف المصرية الخاصة بأسمائها:', '[{"left":"Ϥ ϥ","right":"فاي"},{"left":"Ϧ ϧ","right":"خاي"},{"left":"Ϩ ϩ","right":"هوري"},{"left":"Ϯ ϯ","right":"تي"}]'::jsonb, 3);
    END IF;

    -- الوحدة 7
    IF NOT EXISTS (SELECT 1 FROM public.units WHERE level_id = lvl1_id AND order_index = 7) THEN
        INSERT INTO public.units (level_id, title, badge, description, order_index)
        VALUES (lvl1_id, 'الوحدة 7: مراجعة شاملة وتحدي الأبجدية', 'ⲱ', 'تحدي إتقان جميع الحروف الـ 32', 7) RETURNING id INTO u7_id;

        INSERT INTO public.lessons (unit_id, title, xp_reward, order_index)
        VALUES (u7_id, 'الدرس 7: اختبار إتقان الأبجدية القبطية', 25, 1) RETURNING id INTO l7_id;

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l7_id, 'select', 'كم عدد حروف الأبجدية القبطية (بما فيها الحرف الرقمي سو Ⲋⲋ)؟', 'Ⲁ-Ⲱ', 'الأبجدية', 1) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, '32 حرفاً', true),
        (c_id, '28 حرفاً', false),
        (c_id, '26 حرفاً', false),
        (c_id, '30 حرفاً', false);

        INSERT INTO public.challenges (lesson_id, type, question, coptic_display, audio_text, order_index)
        VALUES (l7_id, 'select', 'كم عدد الحروف القبطية ذات الأصل المصري الديموطيقي الخالص؟', 'Ϣ-ϯ', 'الحروف السبعة', 2) RETURNING id INTO c_id;
        INSERT INTO public.challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, '7 حروف (Ϣ ϥ ϧ ϩ ϫ ϭ ϯ)', true),
        (c_id, '5 حروف', false),
        (c_id, '9 حروف', false),
        (c_id, '3 حروف', false);

        INSERT INTO public.challenges (lesson_id, type, question, pairs, order_index)
        VALUES (l7_id, 'match', 'تحدي المطابقة النهائي: اختر الصوت الصحيح لكل حرف:', '[{"left":"Ⲁ ⲁ","right":"ألف مفتوحة"},{"left":"Ⲱ ⲱ","right":"واو ممدودة"},{"left":"Ϣ ϣ","right":"شين"},{"left":"Ϯ ϯ","right":"مقطع تي"}]'::jsonb, 3);
    END IF;

END $$;

-- 7) دالة آمنة لمعالجة إكمال الدرس (RPC Server Function)
CREATE OR REPLACE FUNCTION public.record_lesson_completion(
  p_lesson_id INT,
  p_score INT DEFAULT 100,
  p_xp_reward INT DEFAULT 20,
  p_next_lesson_id INT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_existing_status VARCHAR(20);
  v_added_xp INT := 0;
  v_progress RECORD;
  v_today DATE := CURRENT_DATE;
  v_new_streak INT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'المستخدم غير مسجل الدخول';
  END IF;

  SELECT status INTO v_existing_status
  FROM public.user_lesson_progress
  WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

  IF v_existing_status IS NULL OR v_existing_status <> 'completed' THEN
    v_added_xp := GREATEST(0, p_xp_reward);
  END IF;

  INSERT INTO public.user_lesson_progress (user_id, lesson_id, status, score, updated_at)
  VALUES (v_user_id, p_lesson_id, 'completed', p_score, NOW())
  ON CONFLICT (user_id, lesson_id) DO UPDATE
  SET status = 'completed',
      score = GREATEST(user_lesson_progress.score, EXCLUDED.score),
      updated_at = NOW();

  IF p_next_lesson_id IS NOT NULL THEN
    INSERT INTO public.user_lesson_progress (user_id, lesson_id, status, score, updated_at)
    VALUES (v_user_id, p_next_lesson_id, 'in_progress', 0, NOW())
    ON CONFLICT (user_id, lesson_id) DO UPDATE
    SET status = CASE 
      WHEN user_lesson_progress.status = 'locked' THEN 'in_progress' 
      ELSE user_lesson_progress.status 
    END;
  END IF;

  SELECT * INTO v_progress FROM public.user_progress WHERE user_id = v_user_id FOR UPDATE;
  
  IF v_progress IS NULL THEN
    INSERT INTO public.user_progress (user_id, hearts, points, streak_days, last_active_date)
    VALUES (v_user_id, 5, v_added_xp, 1, v_today)
    RETURNING * INTO v_progress;
  ELSE
    IF v_progress.last_active_date IS NULL THEN
      v_new_streak := 1;
    ELSIF v_progress.last_active_date = v_today THEN
      v_new_streak := v_progress.streak_days;
    ELSIF v_progress.last_active_date = v_today - 1 THEN
      v_new_streak := COALESCE(v_progress.streak_days, 0) + 1;
    ELSE
      v_new_streak := 1;
    END IF;

    UPDATE public.user_progress
    SET points = COALESCE(points, 0) + v_added_xp,
        streak_days = v_new_streak,
        last_active_date = v_today
    WHERE user_id = v_user_id
    RETURNING * INTO v_progress;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'added_xp', v_added_xp,
    'total_points', v_progress.points,
    'streak_days', v_progress.streak_days,
    'hearts', v_progress.hearts
  );
END;
$$;

-- 8) إنشاء View حقيقي للمتصدرين
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT 
  u.id,
  u.full_name,
  u.avatar_url,
  COALESCE(p.points, 0) AS points,
  COALESCE(p.streak_days, 1) AS streak_days,
  RANK() OVER (ORDER BY COALESCE(p.points, 0) DESC) AS rank
FROM public.users u
LEFT JOIN public.user_progress p ON u.id = p.user_id
ORDER BY points DESC;

-- 9) تفعيل Row Level Security وتطبيق السياسات الصارمة
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;

-- سياسات users
DROP POLICY IF EXISTS "anyone can read users" ON public.users;
CREATE POLICY "anyone can read users" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "user can update own profile" ON public.users;
CREATE POLICY "user can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id OR public.is_admin()) WITH CHECK (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "user or trigger can insert user" ON public.users;
CREATE POLICY "user or trigger can insert user" ON public.users FOR INSERT WITH CHECK (auth.uid() = id OR public.is_admin() OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "admin can delete user" ON public.users;
CREATE POLICY "admin can delete user" ON public.users FOR DELETE USING (public.is_admin());

-- سياسات user_progress
DROP POLICY IF EXISTS "anyone can read user_progress" ON public.user_progress;
CREATE POLICY "anyone can read user_progress" ON public.user_progress FOR SELECT USING (true);

DROP POLICY IF EXISTS "user can update own progress" ON public.user_progress;
CREATE POLICY "user can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id OR public.is_admin()) WITH CHECK (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "user can insert own progress" ON public.user_progress;
CREATE POLICY "user can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin() OR auth.uid() IS NULL);

-- سياسات المنهج (قراءة للجميع، إدارة للأدمن فقط)
DROP POLICY IF EXISTS "anyone can read levels" ON public.levels;
CREATE POLICY "anyone can read levels" ON public.levels FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin can manage levels" ON public.levels;
CREATE POLICY "admin can manage levels" ON public.levels FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone can read units" ON public.units;
CREATE POLICY "anyone can read units" ON public.units FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin can manage units" ON public.units;
CREATE POLICY "admin can manage units" ON public.units FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone can read lessons" ON public.lessons;
CREATE POLICY "anyone can read lessons" ON public.lessons FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin can manage lessons" ON public.lessons;
CREATE POLICY "admin can manage lessons" ON public.lessons FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone can read challenges" ON public.challenges;
CREATE POLICY "anyone can read challenges" ON public.challenges FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin can manage challenges" ON public.challenges;
CREATE POLICY "admin can manage challenges" ON public.challenges FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone can read challenge_options" ON public.challenge_options;
CREATE POLICY "anyone can read challenge_options" ON public.challenge_options FOR SELECT USING (true);
DROP POLICY IF EXISTS "admin can manage challenge_options" ON public.challenge_options;
CREATE POLICY "admin can manage challenge_options" ON public.challenge_options FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- سياسات تقدم الدروس
DROP POLICY IF EXISTS "user can view own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "user can view own lesson progress" ON public.user_lesson_progress FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "user can manage own lesson progress" ON public.user_lesson_progress;
CREATE POLICY "user can manage own lesson progress" ON public.user_lesson_progress FOR ALL USING (auth.uid() = user_id OR public.is_admin()) WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- سياسات الجداول الأخرى للتأكد من حصر التعديل بالأدمن
DROP POLICY IF EXISTS "admin can manage letters" ON public.letters;
CREATE POLICY "admin can manage letters" ON public.letters FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin can manage vocabulary" ON public.vocabulary;
CREATE POLICY "admin can manage vocabulary" ON public.vocabulary FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin can manage grammar" ON public.grammar_sections;
CREATE POLICY "admin can manage grammar" ON public.grammar_sections FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin can manage articles" ON public.articles;
CREATE POLICY "admin can manage articles" ON public.articles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin can manage quiz_questions" ON public.quiz_questions;
CREATE POLICY "admin can manage quiz_questions" ON public.quiz_questions FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin can manage quiz_settings" ON public.quiz_settings;
CREATE POLICY "admin can manage quiz_settings" ON public.quiz_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin can manage quiz_category_settings" ON public.quiz_category_settings;
CREATE POLICY "admin can manage quiz_category_settings" ON public.quiz_category_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
