-- ============================================================
-- MG COPTIC — Migration 3: Gamification & Curriculum System
-- (المستويات، الوحدات، الدروس، التمارين بأسلوب الدروس التفاعلية)
-- ============================================================
-- شغّل هذا الملف كامل مرة واحدة في: Supabase Dashboard > SQL Editor > New query
-- الملف آمن للتكرار (idempotent)
-- ============================================================

-- ---------- 1) جدول المستخدمين (Anonymous & Registered) ----------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    is_anonymous BOOLEAN DEFAULT TRUE,
    email VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------- 2) جدول تقدم ونقاط المستخدم ----------
CREATE TABLE IF NOT EXISTS user_progress (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    hearts INT DEFAULT 5,
    points INT DEFAULT 0,
    streak_days INT DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE
);

-- ---------- 3) جدول المستويات ----------
CREATE TABLE IF NOT EXISTS levels (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    order_index INT NOT NULL DEFAULT 1
);

-- ---------- 4) جدول الوحدات داخل كل مستوى ----------
CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    level_id INT NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    order_index INT NOT NULL DEFAULT 1
);

-- ---------- 5) جدول الدروس داخل كل وحدة ----------
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    order_index INT NOT NULL DEFAULT 1
);

-- ---------- 6) جدول التمارين والأسئلة داخل كل درس ----------
CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('select', 'write', 'listen', 'match')),
    question TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 1
);

-- ---------- 7) جدول خيارات التمارين ----------
CREATE TABLE IF NOT EXISTS challenge_options (
    id SERIAL PRIMARY KEY,
    challenge_id INT NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255) DEFAULT NULL,
    audio_url VARCHAR(255) DEFAULT NULL
);

-- ---------- 8) جدول تقدم المستخدم في الدروس ----------
CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'locked' CHECK (status IN ('locked', 'in_progress', 'completed')),
    score INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

-- ---------- 9) جدول تقدم المستخدم في التمارين الفردية ----------
CREATE TABLE IF NOT EXISTS user_challenge_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id INT NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_challenge UNIQUE (user_id, challenge_id)
);

-- ============================================================
-- سياسات الأمان (Row Level Security - RLS)
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;

-- 1) جدول users: السماح بالإنشاء والقراءة للجميع
DROP POLICY IF EXISTS "public can insert users" ON users;
CREATE POLICY "public can insert users" ON users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "public can read users" ON users;
CREATE POLICY "public can read users" ON users FOR SELECT USING (true);

DROP POLICY IF EXISTS "public can update users" ON users;
CREATE POLICY "public can update users" ON users FOR UPDATE USING (true);

-- 2) جدول user_progress: قراءة وتحديث للمستخدمين
DROP POLICY IF EXISTS "public can read user_progress" ON user_progress;
CREATE POLICY "public can read user_progress" ON user_progress FOR SELECT USING (true);

DROP POLICY IF EXISTS "public can insert user_progress" ON user_progress;
CREATE POLICY "public can insert user_progress" ON user_progress FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "public can update user_progress" ON user_progress;
CREATE POLICY "public can update user_progress" ON user_progress FOR UPDATE USING (true);

-- 3) المنهج: قراءة عامة للجميع (Levels, Units, Lessons, Challenges, Options)
DROP POLICY IF EXISTS "public can read levels" ON levels;
CREATE POLICY "public can read levels" ON levels FOR SELECT USING (true);
DROP POLICY IF EXISTS "authenticated can manage levels" ON levels;
CREATE POLICY "authenticated can manage levels" ON levels FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon can manage levels" ON levels;
CREATE POLICY "anon can manage levels" ON levels FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public can read units" ON units;
CREATE POLICY "public can read units" ON units FOR SELECT USING (true);
DROP POLICY IF EXISTS "authenticated can manage units" ON units;
CREATE POLICY "authenticated can manage units" ON units FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon can manage units" ON units;
CREATE POLICY "anon can manage units" ON units FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public can read lessons" ON lessons;
CREATE POLICY "public can read lessons" ON lessons FOR SELECT USING (true);
DROP POLICY IF EXISTS "authenticated can manage lessons" ON lessons;
CREATE POLICY "authenticated can manage lessons" ON lessons FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon can manage lessons" ON lessons;
CREATE POLICY "anon can manage lessons" ON lessons FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public can read challenges" ON challenges;
CREATE POLICY "public can read challenges" ON challenges FOR SELECT USING (true);
DROP POLICY IF EXISTS "authenticated can manage challenges" ON challenges;
CREATE POLICY "authenticated can manage challenges" ON challenges FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon can manage challenges" ON challenges;
CREATE POLICY "anon can manage challenges" ON challenges FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public can read challenge_options" ON challenge_options;
CREATE POLICY "public can read challenge_options" ON challenge_options FOR SELECT USING (true);
DROP POLICY IF EXISTS "authenticated can manage challenge_options" ON challenge_options;
CREATE POLICY "authenticated can manage challenge_options" ON challenge_options FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon can manage challenge_options" ON challenge_options;
CREATE POLICY "anon can manage challenge_options" ON challenge_options FOR ALL USING (true) WITH CHECK (true);

-- 4) تقدم الدروس والتحديات للمستخدمين
DROP POLICY IF EXISTS "public can manage user_lesson_progress" ON user_lesson_progress;
CREATE POLICY "public can manage user_lesson_progress" ON user_lesson_progress FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public can manage user_challenge_progress" ON user_challenge_progress;
CREATE POLICY "public can manage user_challenge_progress" ON user_challenge_progress FOR ALL USING (true) WITH CHECK (true);


-- ============================================================
-- تعبئة بيانات المنهج: المستوى الأول (الأبجدية القبطية - اللهجة البحيرية)
-- مقسّم إلى 7 وحدات وفق المتطلبات
-- ============================================================

DO $$
DECLARE
    lvl1_id INT;
    u1_id INT; u2_id INT; u3_id INT; u4_id INT; u5_id INT; u6_id INT; u7_id INT;
    l1_id INT; l2_id INT; l3_id INT; l4_id INT; l5_id INT; l6_id INT; l7_id INT;
    c_id INT;
BEGIN
    -- التحقق إذا كان المستوى الأول مسجلاً بالفعل
    IF NOT EXISTS (SELECT 1 FROM levels WHERE id = 1) THEN
        INSERT INTO levels (id, title, description, order_index)
        VALUES (1, 'المستوى 1: الأبجدية القبطية (اللهجة البحيرية)', 'تعلّم نطق وكتابة وقراءة جميع الحروف القبطية الـ 32 من خلال 7 وحدات تدريبية ممتعة.', 1)
        RETURNING id INTO lvl1_id;
    ELSE
        lvl1_id := 1;
    END IF;

    -- ---------- الوحدة 1: ⲁ ⲃ ⲅ ⲇ ⲉ ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 1) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 1: الحروف الأولى (ⲁ ⲃ ⲅ ⲇ ⲉ)', 1) RETURNING id INTO u1_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u1_id, 'تعرّف على الحروف: ألفا، فيدا، غاما، دلدا، إي', 1) RETURNING id INTO l1_id;

        -- تمرين 1: ما هو الصوت الصحيح للحرف Ⲁⲁ (ألفا)؟
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l1_id, 'select', 'ما هو الصوت الأساسي للحرف Ⲁⲁ (ألفا)؟', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'أَ (ألف مفتوحة كالمد في «باب»)', true),
        (c_id, 'ب (باء خفيفة)', false),
        (c_id, 'ك (كاف مفخمة)', false),
        (c_id, 'م (ميم ساكنة)', false);

        -- تمرين 2: اختر الحرف الذي يُنطق «ڤ / ب» (فيدا Ⲃⲃ)
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l1_id, 'select', 'أي من هذه الحروف هو حرف «فيدا» الذي يُنطق ڤ أو ب؟', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲃ ⲃ', true),
        (c_id, 'Ⲇ ⲇ', false),
        (c_id, 'Ⲉ ⲉ', false),
        (c_id, 'Ⲅ ⲅ', false);

        -- تمرين 3: استماع لحرف Ⲅⲅ (غاما)
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l1_id, 'listen', 'استمع إلى اسم الحرف وحدد الرمز المقابل له (غاما):', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲅ ⲅ (غاما)', true),
        (c_id, 'Ⲁ ⲁ (ألفا)', false),
        (c_id, 'Ⲃ ⲃ (فيدا)', false),
        (c_id, 'Ⲇ ⲇ (دلدا)', false);

        -- تمرين 4: ما هو نطق حرف Ⲇⲇ (دلدا)؟
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l1_id, 'select', 'حرف Ⲇⲇ (دلدا) يُنطق في الكلمات القبطية كـ:', 4) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'د (دال) أو ذ (ذال)', true),
        (c_id, 'ر (راء)', false),
        (c_id, 'س (سين)', false),
        (c_id, 'ص (صاد)', false);

        -- تمرين 5: مطابقة الحروف بأسمائها
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l1_id, 'match', 'طابق بين الحرف القبطي واسمه العربي الصحيح:', 5) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲁⲁ = ألفا', true),
        (c_id, 'Ⲃⲃ = فيدا', true),
        (c_id, 'Ⲉⲉ = إي', true),
        (c_id, 'Ⲇⲇ = دلدا', true);
    END IF;

    -- ---------- الوحدة 2: ⲍ ⲏ ⲑ ⲓ ⲕ ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 2) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 2: الحروف (ⲍ ⲏ ⲑ ⲓ ⲕ)', 2) RETURNING id INTO u2_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u2_id, 'تعرّف على الحروف: زاتا، هيتا، ثيتا، إيوتا، كابا', 1) RETURNING id INTO l2_id;

        -- تمرين 1: حرف Ⲍⲍ
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l2_id, 'select', 'ما هو اسم الحرف القبطي Ⲍⲍ وكيف يُنطق؟', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'زاتا — يُنطق زاي (ز)', true),
        (c_id, 'هيتا — ياء ممدودة', false),
        (c_id, 'ثيتا — ثاء', false),
        (c_id, 'كابا — كاف', false);

        -- تمرين 2: حرف Ⲏⲏ
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l2_id, 'select', 'حرف Ⲏⲏ (هيتا) هو حركة مدّية تعادل في النطق:', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ياء ممدودة طويلة (يه)', true),
        (c_id, 'واو مضمومة', false),
        (c_id, 'ألف ساكنة', false),
        (c_id, 'نون خفيفة', false);

        -- تمرين 3: حرف Ⲑⲑ
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l2_id, 'select', 'ما هو الحرف المقابل لرمز Ⲑⲑ؟', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ثيتا (ث)', true),
        (c_id, 'تاف (ت)', false),
        (c_id, 'شاي (ش)', false),
        (c_id, 'خاي (خ)', false);

        -- تمرين 4: مطابقة
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l2_id, 'match', 'طابق الحرف بصوته المعتمد في اللهجة البحيرية:', 4) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲓⲓ = ي (كسرة أو ياء)', true),
        (c_id, 'Ⲕⲕ = ك (كاف)', true),
        (c_id, 'Ⲍⲍ = ز (زاي)', true),
        (c_id, 'Ⲑⲑ = ث (ثاء)', true);
    END IF;

    -- ---------- الوحدة 3: ⲗ ⲙ ⲛ ⲝ ⲟ ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 3) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 3: الحروف (ⲗ ⲙ ⲛ ⲝ ⲟ)', 3) RETURNING id INTO u3_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u3_id, 'تعرّف على الحروف: لابدا، مي، ني، كسي، أو القصيرة', 1) RETURNING id INTO l3_id;

        -- تمرين 1: حرف ⲗⲗ
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l3_id, 'select', 'ما هو اسم ونطق الحرف Ⲗⲗ؟', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'لابدا (ل)', true),
        (c_id, 'مي (م)', false),
        (c_id, 'رو (ر)', false),
        (c_id, 'ني (ن)', false);

        -- تمرين 2: حرف ⲝ
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l3_id, 'select', 'الحرف المركب Ⲝⲝ (كسي) يُنطق في الكلمات:', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'كس (K + S)', true),
        (c_id, 'بس (P + S)', false),
        (c_id, 'تش (CH)', false),
        (c_id, 'تي (T + I)', false);

        -- تمرين 3: حرف Ⲟⲟ
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l3_id, 'select', 'حرف Ⲟⲟ (أو) يُمثل حركة:', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ضمة قصيرة (ُأ)', true),
        (c_id, 'فتحة ممدودة', false),
        (c_id, 'كسرة عميقة', false),
        (c_id, 'سكون تام', false);

        -- تمرين 4: مطابقة
        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l3_id, 'match', 'طابق بين الحرف والنطق المقابل:', 4) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲙⲙ = م (ميم)', true),
        (c_id, 'Ⲛⲛ = ن (نون)', true),
        (c_id, 'Ⲗⲗ = ل (لام)', true),
        (c_id, 'Ⲝⲝ = كس', true);
    END IF;

    -- ---------- الوحدة 4: ⲡ ⲣ ⲥ ⲧ ⲩ ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 4) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 4: الحروف (ⲡ ⲣ ⲥ ⲧ ⲩ)', 4) RETURNING id INTO u4_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u4_id, 'تعرّف على الحروف: بي، رو، سيما، تاف، إبسيلون', 1) RETURNING id INTO l4_id;

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l4_id, 'select', 'حرف Ⲡⲡ (بي) يُنطق دائماً في القبطية كـ:', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ب (باء صريحة)', true),
        (c_id, 'ف (فاء)', false),
        (c_id, 'ت (تاء)', false),
        (c_id, 'م (ميم)', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l4_id, 'select', 'ما هو الحرف الذي يُنطق (س) واسمه سيما؟', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲥ ⲥ', true),
        (c_id, 'Ⲣ ⲣ', false),
        (c_id, 'Ⲧ ⲧ', false),
        (c_id, 'Ⲩ ⲩ', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l4_id, 'match', 'طابق الحرف القبطي مع نطقه المعتمد:', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲣⲣ = ر (رو)', true),
        (c_id, 'Ⲧⲧ = ت (تاف)', true),
        (c_id, 'Ⲩⲩ = و / ي (إبسيلون)', true),
        (c_id, 'Ⲡⲡ = ب (بي)', true);
    END IF;

    -- ---------- الوحدة 5: ⲫ ⲭ ⲯ ⲱ ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 5) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 5: الحروف (ⲫ ⲭ ⲯ ⲱ)', 5) RETURNING id INTO u5_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u5_id, 'تعرّف على الحروف: في، خي، إبسي، أوميغا', 1) RETURNING id INTO l5_id;

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l5_id, 'select', 'ما هو الحرف المركب Ⲯⲯ وما نطقه؟', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'إبسي — يُنطق «بس» (P + S)', true),
        (c_id, 'كسي — يُنطق «كس»', false),
        (c_id, 'تي — يُنطق «تي»', false),
        (c_id, 'تشيما — يُنطق «تش»', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l5_id, 'select', 'حرف Ⲱⲱ (أوميغا) يُمثل حركة:', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'واو ممدودة طويلة (أوو)', true),
        (c_id, 'واو قصيرة مضمومة', false),
        (c_id, 'ياء ساكنة', false),
        (c_id, 'ألف مهموزة', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l5_id, 'match', 'طابق بين الحرف والنطق الصحيح:', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲫⲫ = ف (في)', true),
        (c_id, 'Ⲭⲭ = خ / ك / ش (خي)', true),
        (c_id, 'Ⲯⲯ = بس (إبسي)', true),
        (c_id, 'Ⲱⲱ = أوو (أوميغا)', true);
    END IF;

    -- ---------- الوحدة 6: الحروف السبعة المصرية الخاصة (الديموطيقية) ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 6) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 6: الحروف المصرية الخاصة (ϣ ϥ ϧ ϩ ϫ ϭ ϯ)', 6) RETURNING id INTO u6_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u6_id, 'الحروف القبطية الأصيلة المأخوذة من الديموطيقية المصرية', 1) RETURNING id INTO l6_id;

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l6_id, 'select', 'الحرف Ϣϣ (شاي) أصله مصري قديم ويُنطق:', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ش (شين)', true),
        (c_id, 'س (سين)', false),
        (c_id, 'ص (صاد)', false),
        (c_id, 'ث (ثاء)', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l6_id, 'select', 'أي من هذه الحروف يُنطق «تش» مثل «تشيرش»؟', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ϭ ϭ (تشيما)', true),
        (c_id, 'Ϫ ϫ (جانجا)', false),
        (c_id, 'Ϩ ϩ (هوري)', false),
        (c_id, 'Ϧ ϧ (خاي)', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l6_id, 'select', 'الحرف Ϫϫ (جانجا) في اللهجة البحيرية يُنطق:', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'ج (جيم عطشة أو معطشة)', true),
        (c_id, 'ق (قاف)', false),
        (c_id, 'غ (غين)', false),
        (c_id, 'خ (خاء)', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l6_id, 'match', 'طابق الحروف المصرية السبعة بأسمائها:', 4) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ϥϥ = فاي (ف)', true),
        (c_id, 'Ϧϧ = خاي (خ حلقية)', true),
        (c_id, 'Ϩϩ = هوري (هـ)', true),
        (c_id, 'Ϯϯ = تي (مقطع مركب تي)', true);
    END IF;

    -- ---------- الوحدة 7: مراجعة شاملة ----------
    IF NOT EXISTS (SELECT 1 FROM units WHERE level_id = lvl1_id AND order_index = 7) THEN
        INSERT INTO units (level_id, title, order_index)
        VALUES (lvl1_id, 'الوحدة 7: مراجعة شاملة وتحدي الأبجدية', 7) RETURNING id INTO u7_id;

        INSERT INTO lessons (unit_id, title, order_index)
        VALUES (u7_id, 'اختبار إتقان الأبجدية القبطية بالكامل', 1) RETURNING id INTO l7_id;

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l7_id, 'select', 'كم عدد حروف الأبجدية القبطية (بما فيها الحرف الرقمي سو Ⲋⲋ)؟', 1) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, '32 حرفاً', true),
        (c_id, '28 حرفاً', false),
        (c_id, '26 حرفاً', false),
        (c_id, '30 حرفاً', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l7_id, 'select', 'كم عدد الحروف القبطية ذات الأصل المصري الديموطيقي الخالص؟', 2) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, '7 حروف (Ϣ ϥ ϧ ϩ ϫ ϭ ϯ)', true),
        (c_id, '5 حروف', false),
        (c_id, '9 حروف', false),
        (c_id, '3 حروف', false);

        INSERT INTO challenges (lesson_id, type, question, order_index)
        VALUES (l7_id, 'match', 'تحدي المطابقة النهائي: اختر الصوت الصحيح لكل حرف:', 3) RETURNING id INTO c_id;
        INSERT INTO challenge_options (challenge_id, text, is_correct) VALUES
        (c_id, 'Ⲁⲁ = ألف مفتوحة', true),
        (c_id, 'Ⲱⲱ = واو ممدودة', true),
        (c_id, 'Ϣϣ = شين', true),
        (c_id, 'Ϯϯ = مقطع تي', true);
    END IF;

END $$;

-- ملحوظة: انتهى تنفيذ ملف الميجريشن الثالث بنجاح!
