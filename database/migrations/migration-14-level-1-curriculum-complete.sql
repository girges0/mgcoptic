-- ============================================================================
-- Migration 14: Level 1 Coptic Curriculum Complete (32 Letters across 7 Units)
-- Structure per lesson:
-- 1. Intro (text_view, 0 XP)
-- 2. Trace letter with pronunciation audio (trace, 1 XP)
-- 3. Pronunciation choice (read_select, 1 XP)
-- 4. Word meaning (select, 1 XP)
-- 5. Word tiles spelling (write, 1 XP)
-- + Review lessons at end of each unit
-- + Unit chests (10 XP + 1 heart) & Level Final Chest (50 XP + 3 hearts)
-- ============================================================================

-- Ensure columns exist
ALTER TABLE IF EXISTS public.challenges ADD COLUMN IF NOT EXISTS explanation TEXT;
ALTER TABLE IF EXISTS public.challenges ADD COLUMN IF NOT EXISTS xp_reward INT DEFAULT 1;

-- Clean existing curriculum for level 1
DELETE FROM public.challenge_options;
DELETE FROM public.challenges;
DELETE FROM public.lessons;
DELETE FROM public.chests WHERE level_id IN (1, 5);
DELETE FROM public.units WHERE level_id IN (1, 5);

DO $$
DECLARE
    v_level_id INT := 5;
    v_unit_id INT;
    v_lesson_id INT;
    v_challenge_id INT;
BEGIN

    -- ---------------------------------------------------------
    -- Unit: الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (34, 5, 'الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)', 'Ⲁ-Ⲉ', 'تعلّم كتابة ونطق أول 5 حروف في الأبجدية القبطية', 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٢: الحروف من (Ⲋ – Ⲓ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (35, 5, 'الوحدة ٢: الحروف من (Ⲋ – Ⲓ)', 'Ⲋ-Ⲓ', 'تعلّم الرمز العددي سو والحروف من زاتا إلى إيوتا', 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٣: الحروف من (Ⲕ – Ⲝ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (36, 5, 'الوحدة ٣: الحروف من (Ⲕ – Ⲝ)', 'Ⲕ-Ⲝ', 'تعلّم الحروف من كابا إلى كسي مع كلمات كنسية شهيرة', 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٤: الحروف من (Ⲟ – Ⲧ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (37, 5, 'الوحدة ٤: الحروف من (Ⲟ – Ⲧ)', 'Ⲟ-Ⲧ', 'تعلّم الحروف من أُو قصيرة إلى تاف', 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٥: الحروف من (Ⲩ – Ⲱ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (38, 5, 'الوحدة ٥: الحروف من (Ⲩ – Ⲱ)', 'Ⲩ-Ⲱ', 'تعلّم الحروف من إبسيلون إلى أوميغا خاتمة الحروف اليونانية', 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (39, 5, 'الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)', 'Ϣ-Ϫ', 'الحروف الديموطيقية السبعة الخاصة باللغة المصرية القديمة', 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (40, 5, 'الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)', 'Ϭ-Ϯ', 'ختام الأبجدية واختبار إتقان الـ 32 حرفاً القبطية بالكامل', 7)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (93, 34, 'حرف ألفا (Ⲁ ⲁ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (123, 40, 'حرف تشيما (Ϭ ϭ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (98, 35, 'حرف سو (رقم ٦) (Ⲋ ⲋ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (108, 37, 'حرف أُو (قصيرة) (Ⲟ ⲟ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (103, 36, 'حرف كابا (Ⲕ ⲕ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (113, 38, 'حرف إبسيلون (Ⲩ ⲩ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (118, 39, 'حرف شاي (Ϣ ϣ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (109, 37, 'حرف بي (Ⲡ ⲡ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (104, 36, 'حرف لابدا (Ⲗ ⲗ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (124, 40, 'حرف تي (Ϯ ϯ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (94, 34, 'حرف فيدا (Ⲃ ⲃ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (119, 39, 'حرف فاي (Ϥ ϥ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (114, 38, 'حرف في (Ⲫ ⲫ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (99, 35, 'حرف زاتا (Ⲍ ⲍ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (115, 38, 'حرف خي (Ⲭ ⲭ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (110, 37, 'حرف رو (Ⲣ ⲣ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (95, 34, 'حرف غاما (Ⲅ ⲅ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (120, 39, 'حرف خاي (Ϧ ϧ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (105, 36, 'حرف مي (Ⲙ ⲙ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (131, 40, '🔄 مراجعة شاملة للأبجدية القبطية', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (100, 35, 'حرف هيتا (Ⲏ ⲏ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (121, 39, 'حرف هوري (Ϩ ϩ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (106, 36, 'حرف ني (Ⲛ ⲛ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (111, 37, 'حرف سيما (Ⲥ ⲥ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (116, 38, 'حرف إبسي (Ⲯ ⲯ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (101, 35, 'حرف ثيتا (Ⲑ ⲑ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (132, 40, '🎓 الاختبار النهائي الشامل للمستوى الأول', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (96, 34, 'حرف دلدا (Ⲇ ⲇ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (117, 38, 'حرف أوميغا (أو طويلة) (Ⲱ ⲱ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (112, 37, 'حرف تاف (Ⲧ ⲧ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (102, 35, 'حرف إيوتا (Ⲓ ⲓ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (97, 34, 'حرف إي (Ⲉ ⲉ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (107, 36, 'حرف كسي (Ⲝ ⲝ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (122, 39, 'حرف جانجا (Ϫ ϫ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (128, 37, '🔄 مراجعة الوحدة 4', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (130, 39, '🔄 مراجعة الوحدة 6', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (126, 35, '🔄 مراجعة الوحدة 2', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (125, 34, '🔄 مراجعة الوحدة 1', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (127, 36, '🔄 مراجعة الوحدة 3', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (129, 38, '🔄 مراجعة الوحدة 5', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (502, 104, 'text_view', 'نبذة عن حرف لابدا (Ⲗ ⲗ)', 'Ⲗ ⲗ', 'لابدا', 'audio_coptic/12lavla.mp3', '• اسم الحرف: لابدا
• نطق الحرف بالعربي: ل
• قواعد النطق: الحرف الثاني عشر. يُنطق "ل" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲗⲁⲙⲡⲁⲥ
  - القبطي المعرب (نطقها): «لامباس»
  - المعنى بالعربية: مصباح / قنديل

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (592, 119, 'text_view', 'نبذة عن حرف فاي (Ϥ ϥ)', 'Ϥ ϥ', 'فاي', 'audio_coptic/27fay.mp3', '• اسم الحرف: فاي
• نطق الحرف بالعربي: ف
• قواعد النطق: الحرف السابع والعشرون. حرف مصري ديموطيقي أصيل يُنطق "ف".
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϥⲱⲓ
  - القبطي المعرب (نطقها): «فوي»
  - المعنى بالعربية: شعر (شعر الرأس)

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (633, 126, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲋ ⲋ","right":"سو (رقم ٦) (سو (الرقم 6))"},{"left":"Ⲍ ⲍ","right":"زاتا (ز)"},{"left":"Ⲏ ⲏ","right":"هيتا (ياء طويلة ممدودة (ee))"},{"left":"Ⲑ ⲑ","right":"ثيتا (ث أو ت)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (574, 116, 'text_view', 'نبذة عن حرف إبسي (Ⲯ ⲯ)', 'Ⲯ ⲯ', 'إبسي', 'audio_coptic/24psi.mp3', '• اسم الحرف: إبسي
• نطق الحرف بالعربي: بـ + س (Ps)
• قواعد النطق: الحرف الرابع والعشرون. حرف مركب يُنطق باء وسين معاً في صوت واحد (بـ + س = Ps).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲯⲁⲗⲙⲟⲥ
  - القبطي المعرب (نطقها): «بصالموس»
  - المعنى بالعربية: مزمور

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (520, 107, 'text_view', 'نبذة عن حرف كسي (Ⲝ ⲝ)', 'Ⲝ ⲝ', 'كسي', 'audio_coptic/15axsy.mp3', '• اسم الحرف: كسي
• نطق الحرف بالعربي: كـ + س (X)
• قواعد النطق: الحرف الخامس عشر. حرف مركب يُنطق كاف وسين معاً (كـ + س = X) في صوت واحد.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲟⲩⲁⲗⲓⲝ
  - القبطي المعرب (نطقها): «أواليكس»
  - المعنى بالعربية: ستارة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (643, 128, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲟ ⲟ","right":"أُو (قصيرة) (واو قصيرة مضمومة (O))"},{"left":"Ⲡ ⲡ","right":"بي (ب ثقيلة مشددة (P))"},{"left":"Ⲣ ⲣ","right":"رو (ر)"},{"left":"Ⲥ ⲥ","right":"سيما (س)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (484, 101, 'text_view', 'نبذة عن حرف ثيتا (Ⲑ ⲑ)', 'Ⲑ ⲑ', 'ثيتا', 'audio_coptic/9seta.mp3', '• اسم الحرف: ثيتا
• نطق الحرف بالعربي: ث أو ت
• قواعد النطق: الحرف التاسع. يُنطق "ث" دائماً، إلا إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) فيُنطق "ت".
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲙⲁⲱⲟⲩⲧ
  - القبطي المعرب (نطقها): «ماووت»
  - المعنى بالعربية: مشط

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (538, 110, 'text_view', 'نبذة عن حرف رو (Ⲣ ⲣ)', 'Ⲣ ⲣ', 'رو', 'audio_coptic/18roo.mp3', '• اسم الحرف: رو
• نطق الحرف بالعربي: ر
• قواعد النطق: الحرف الثامن عشر. يُنطق حرف "ر" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲣⲱⲙⲓ
  - القبطي المعرب (نطقها): «رومي»
  - المعنى بالعربية: إنسان

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (622, 124, 'text_view', 'نبذة عن حرف تي (Ϯ ϯ)', 'Ϯ ϯ', 'تي', 'audio_coptic/32tee.mp3', '• اسم الحرف: تي
• نطق الحرف بالعربي: تـ + ي (Ti)
• قواعد النطق: الحرف الثاني والثلاثون والأخير في الأبجدية القبطية. مقطع صوتي مركب ينطق تاء وياء معاً (تـ + ي = Ti).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϯⲙⲏⲓ
  - القبطي المعرب (نطقها): «تيمي»
  - المعنى بالعربية: الحق / العدل

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (472, 99, 'text_view', 'نبذة عن حرف زاتا (Ⲍ ⲍ)', 'Ⲍ ⲍ', 'زاتا', 'audio_coptic/7zeta.mp3', '• اسم الحرف: زاتا
• نطق الحرف بالعربي: ز
• قواعد النطق: الحرف السابع في الأبجدية القبطية. يُنطق دائماً حرف "ز" مثل حرف (Z) في الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲧⲣⲁⲡⲉⲍⲁ
  - القبطي المعرب (نطقها): «ترابيزا»
  - المعنى بالعربية: مائدة / ترابيزة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (442, 94, 'text_view', 'نبذة عن حرف فيدا (Ⲃ ⲃ)', 'Ⲃ ⲃ', 'فيدا', 'audio_coptic/2veta.mp3', '• اسم الحرف: فيدا
• نطق الحرف بالعربي: ف (V) أو ب (B)
• قواعد النطق: الحرف الثاني. يُنطق "ف" إذا جاء بعده حرف متحرك، ويُنطق "ب" إذا لم يأتِ بعده متحرك أو في نهاية الكلمة.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲃⲉⲣⲧ
  - القبطي المعرب (نطقها): «فيرت»
  - المعنى بالعربية: وردة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (556, 113, 'text_view', 'نبذة عن حرف إبسيلون (Ⲩ ⲩ)', 'Ⲩ ⲩ', 'إبسيلون', 'audio_coptic/21epselon.mp3', '• اسم الحرف: إبسيلون
• نطق الحرف بالعربي: ي أو ڤ أو و
• قواعد النطق: الحرف الحادي والعشرون. حرف متحرك ينطق "ڤ" بعد Ⲁ أو Ⲉ، وينطق "و" طويلة بعد Ⲟ (ⲟⲩ)، وينطق "ي" في الحالات الأخرى.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲩⲓⲟⲥ
  - القبطي المعرب (نطقها): «إيوس»
  - المعنى بالعربية: ابن

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (604, 121, 'text_view', 'نبذة عن حرف هوري (Ϩ ϩ)', 'Ϩ ϩ', 'هوري', 'audio_coptic/29hory.mp3', '• اسم الحرف: هوري
• نطق الحرف بالعربي: هـ
• قواعد النطق: الحرف التاسع والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف "هـ" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϩⲱⲃ
  - القبطي المعرب (نطقها): «هوب»
  - المعنى بالعربية: عمل / شيء

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (568, 115, 'text_view', 'نبذة عن حرف خي (Ⲭ ⲭ)', 'Ⲭ ⲭ', 'خي', 'audio_coptic/23ki.mp3', '• اسم الحرف: خي
• نطق الحرف بالعربي: خ أو ك أو ش
• قواعد النطق: الحرف الثالث والعشرون. يُنطق "ك" في الكلمات القبطية، ويُنطق "خ" أو "ش" في الكلمات ذات الأصل اليوناني.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲭⲣⲓⲥⲧⲟⲥ
  - القبطي المعرب (نطقها): «خريستوس»
  - المعنى بالعربية: المسيح

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (663, 132, 'match', 'صل الحرف بنطقه الصحيح بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲁ ⲁ","right":"ألفا (أ)"},{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"ⲭ ⲭ","right":"خي (خ/ك/ش)"},{"left":"Ϯ ϯ","right":"تي (تـ+ي)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (550, 112, 'text_view', 'نبذة عن حرف تاف (Ⲧ ⲧ)', 'Ⲧ ⲧ', 'تاف', 'audio_coptic/20tav.mp3', '• اسم الحرف: تاف
• نطق الحرف بالعربي: ت
• قواعد النطق: الحرف العشرون في الأبجدية القبطية. يُنطق حرف "ت" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲧⲱⲟⲩ
  - القبطي المعرب (نطقها): «توو»
  - المعنى بالعربية: جبل

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (580, 117, 'text_view', 'نبذة عن حرف أوميغا (أو طويلة) (Ⲱ ⲱ)', 'Ⲱ ⲱ', 'أوميغا (أو طويلة)', 'audio_coptic/25oo.mp3', '• اسم الحرف: أوميغا (أو طويلة)
• نطق الحرف بالعربي: واو طويلة ممدودة (Ō)
• قواعد النطق: الحرف الخامس والعشرون. آخر الحروف المأخوذة من اليونانية. يُنطق واواً طويلة ومفتوحة (Ō).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲱⲛϧ
  - القبطي المعرب (نطقها): «أونخ»
  - المعنى بالعربية: حياة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (532, 109, 'text_view', 'نبذة عن حرف بي (Ⲡ ⲡ)', 'Ⲡ ⲡ', 'بي', 'audio_coptic/17pee.mp3', '• اسم الحرف: بي
• نطق الحرف بالعربي: ب ثقيلة مشددة (P)
• قواعد النطق: الحرف السابع عشر. يُنطق "ب" شديدة مشددة مثل حرف (P) في اللغة الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲡⲉ
  - القبطي المعرب (نطقها): «بي»
  - المعنى بالعربية: سماء

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (514, 106, 'text_view', 'نبذة عن حرف ني (Ⲛ ⲛ)', 'Ⲛ ⲛ', 'ني', 'audio_coptic/14ni.mp3', '• اسم الحرف: ني
• نطق الحرف بالعربي: ن
• قواعد النطق: الحرف الرابع عشر. يُنطق حرف "ن" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲛⲟⲩϯ
  - القبطي المعرب (نطقها): «نوتي»
  - المعنى بالعربية: الله

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (496, 103, 'text_view', 'نبذة عن حرف كابا (Ⲕ ⲕ)', 'Ⲕ ⲕ', 'كابا', 'audio_coptic/11kapa.mp3', '• اسم الحرف: كابا
• نطق الحرف بالعربي: ك
• قواعد النطق: الحرف الحادي عشر في الأبجدية القبطية. يُنطق "ك" دائماً في جميع المواضع.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲉⲕⲕⲗⲏⲥⲓⲁ
  - القبطي المعرب (نطقها): «إككليسيا»
  - المعنى بالعربية: كنيسة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (460, 97, 'text_view', 'نبذة عن حرف إي (Ⲉ ⲉ)', 'Ⲉ ⲉ', 'إي', 'audio_coptic/5ei.mp3', '• اسم الحرف: إي
• نطق الحرف بالعربي: إي خفيفة (E)
• قواعد النطق: الحرف الخامس. حرف متحرك خفيف ينطق مثل حرف (E) في الإنجليزية (فتحة مائلة للكسر).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲉⲛ
  - القبطي المعرب (نطقها): «إن»
  - المعنى بالعربية: قرد

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (466, 98, 'text_view', 'نبذة عن حرف سو (رقم ٦) (Ⲋ ⲋ)', 'Ⲋ ⲋ', 'سو (رقم ٦)', 'audio_coptic/6sow.mp3', '• اسم الحرف: سو (رقم ٦)
• نطق الحرف بالعربي: سو (الرقم 6)
• قواعد النطق: رمز ورقم عددي قبطي يدل على الرقم ستة (6). يوضع فوقه شرطة أفقية لتمييزه كرقم، وينطق "سو".
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲥⲟⲟⲩ
  - القبطي المعرب (نطقها): «سو»
  - المعنى بالعربية: الرقم ستة (٦)

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (478, 100, 'text_view', 'نبذة عن حرف هيتا (Ⲏ ⲏ)', 'Ⲏ ⲏ', 'هيتا', 'audio_coptic/8eta.mp3', '• اسم الحرف: هيتا
• نطق الحرف بالعربي: ياء طويلة ممدودة (ee)
• قواعد النطق: الحرف الثامن. حرف متحرك للكسر يُنطق ياء ممدودة وطويلة مثل (ee) في كلمة meet.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲁⲛⲍⲏⲃ
  - القبطي المعرب (نطقها): «أنزيب»
  - المعنى بالعربية: مدرسة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (598, 120, 'text_view', 'نبذة عن حرف خاي (Ϧ ϧ)', 'Ϧ ϧ', 'خاي', 'audio_coptic/28khay.mp3', '• اسم الحرف: خاي
• نطق الحرف بالعربي: خ
• قواعد النطق: الحرف الثامن والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف "خ" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϧⲏⲧ
  - القبطي المعرب (نطقها): «خيت»
  - المعنى بالعربية: قلب

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (628, 125, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲁ ⲁ","right":"ألفا (ألف مفتوحة (أ))"},{"left":"Ⲃ ⲃ","right":"فيدا (ف (V) أو ب (B))"},{"left":"Ⲅ ⲅ","right":"غاما (غ أو ج أو ن)"},{"left":"Ⲇ ⲇ","right":"دلدا (د أو ذ)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (616, 123, 'text_view', 'نبذة عن حرف تشيما (Ϭ ϭ)', 'Ϭ ϭ', 'تشيما', 'audio_coptic/31chema.mp3', '• اسم الحرف: تشيما
• نطق الحرف بالعربي: تش (Tsh)
• قواعد النطق: الحرف الحادي والثلاثون. الحرف السادس من الحروف المصرية الديموطيقية، يُنطق تاء وشين معاً (تش) دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϭⲟⲓⲥ
  - القبطي المعرب (نطقها): «تشويس»
  - المعنى بالعربية: رب / سيد

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (454, 96, 'text_view', 'نبذة عن حرف دلدا (Ⲇ ⲇ)', 'Ⲇ ⲇ', 'دلدا', 'audio_coptic/4delta.mp3', '• اسم الحرف: دلدا
• نطق الحرف بالعربي: د أو ذ
• قواعد النطق: الحرف الرابع. يُنطق "د" في أسماء الأعلام والكلمات القبطية، و"ذ" في الكلمات اليونانية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲇⲱⲣⲟⲛ
  - القبطي المعرب (نطقها): «ذورون»
  - المعنى بالعربية: عطية / هدية

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (586, 118, 'text_view', 'نبذة عن حرف شاي (Ϣ ϣ)', 'Ϣ ϣ', 'شاي', 'audio_coptic/26shay.mp3', '• اسم الحرف: شاي
• نطق الحرف بالعربي: ش
• قواعد النطق: الحرف السادس والعشرون. أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم. يُنطق حرف "ش" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϣⲏⲣⲓ
  - القبطي المعرب (نطقها): «شيري»
  - المعنى بالعربية: ابن / صبي

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (448, 95, 'text_view', 'نبذة عن حرف غاما (Ⲅ ⲅ)', 'Ⲅ ⲅ', 'غاما', 'audio_coptic/3ghamma.mp3', '• اسم الحرف: غاما
• نطق الحرف بالعربي: غ أو ج أو ن
• قواعد النطق: الحرف الثالث. ينطق "غ" في الكلمات القبطية، و"ن" قبل الحلقيات، و"ج" معطشة قبل المتحرك للكسر في اليونانية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲁⲅⲅⲉⲗⲟⲥ
  - القبطي المعرب (نطقها): «أنجيلوس»
  - المعنى بالعربية: ملاك

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (490, 102, 'text_view', 'نبذة عن حرف إيوتا (Ⲓ ⲓ)', 'Ⲓ ⲓ', 'إيوتا', 'audio_coptic/10yota.mp3', '• اسم الحرف: إيوتا
• نطق الحرف بالعربي: ياء قصيرة (i)
• قواعد النطق: الحرف العاشر. حرف متحرك يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف (I) في الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲱⲓⲛⲓ
  - القبطي المعرب (نطقها): «أويني»
  - المعنى بالعربية: صنارة / نور

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (653, 130, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϣ ϣ","right":"شاي (ش)"},{"left":"Ϥ ϥ","right":"فاي (ف)"},{"left":"Ϧ ϧ","right":"خاي (خ)"},{"left":"Ϩ ϩ","right":"هوري (هـ)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (508, 105, 'text_view', 'نبذة عن حرف مي (Ⲙ ⲙ)', 'Ⲙ ⲙ', 'مي', 'audio_coptic/13mi.mp3', '• اسم الحرف: مي
• نطق الحرف بالعربي: م
• قواعد النطق: الحرف الثالث عشر. يُنطق حرف "م" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲙⲟⲗϧ
  - القبطي المعرب (نطقها): «مولخ»
  - المعنى بالعربية: شمعة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (648, 129, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲩ ⲩ","right":"إبسيلون (ي أو ڤ أو و)"},{"left":"Ⲫ ⲫ","right":"في (ف)"},{"left":"Ⲭ ⲭ","right":"خي (خ أو ك أو ش)"},{"left":"Ⲯ ⲯ","right":"إبسي (بـ + س (Ps))"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (526, 108, 'text_view', 'نبذة عن حرف أُو (قصيرة) (Ⲟ ⲟ)', 'Ⲟ ⲟ', 'أُو (قصيرة)', 'audio_coptic/16oo.mp3', '• اسم الحرف: أُو (قصيرة)
• نطق الحرف بالعربي: واو قصيرة مضمومة (O)
• قواعد النطق: الحرف السادس عشر. حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲥⲓⲟⲩ
  - القبطي المعرب (نطقها): «سيو»
  - المعنى بالعربية: نجم

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (638, 127, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"Ⲗ ⲗ","right":"لابدا (ل)"},{"left":"Ⲙ ⲙ","right":"مي (م)"},{"left":"Ⲛ ⲛ","right":"ني (ن)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (544, 111, 'text_view', 'نبذة عن حرف سيما (Ⲥ ⲥ)', 'Ⲥ ⲥ', 'سيما', 'audio_coptic/19sema.mp3', '• اسم الحرف: سيما
• نطق الحرف بالعربي: س
• قواعد النطق: الحرف التاسع عشر. يُنطق حرف "س" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲥⲱ
  - القبطي المعرب (نطقها): «سو»
  - المعنى بالعربية: يشرب

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (658, 131, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϭ ϭ","right":"تشيما (تش (Tsh))"},{"left":"Ϯ ϯ","right":"تي (تـ + ي (Ti))"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (562, 114, 'text_view', 'نبذة عن حرف في (Ⲫ ⲫ)', 'Ⲫ ⲫ', 'في', 'audio_coptic/22fi.mp3', '• اسم الحرف: في
• نطق الحرف بالعربي: ف
• قواعد النطق: الحرف الثاني والعشرون. يُنطق حرف "ف" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲫⲟⲟⲩ
  - القبطي المعرب (نطقها): «إفهو»
  - المعنى بالعربية: اليوم / النهار

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (436, 93, 'text_view', 'نبذة عن حرف ألفا (Ⲁ ⲁ)', 'Ⲁ ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', '• اسم الحرف: ألفا
• نطق الحرف بالعربي: ألف مفتوحة (أ)
• قواعد النطق: الحرف الأول في الأبجدية القبطية. يُنطق دائماً مثل حرف الألف المفتوحة في العربية أو (A) في الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲁⲗⲟⲩ
  - القبطي المعرب (نطقها): «أَلو»
  - المعنى بالعربية: ولد / طفل

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (610, 122, 'text_view', 'نبذة عن حرف جانجا (Ϫ ϫ)', 'Ϫ ϫ', 'جانجا', 'audio_coptic/30ganga.mp3', '• اسم الحرف: جانجا
• نطق الحرف بالعربي: ج (معطشة أو غير معطشة)
• قواعد النطق: الحرف الثلاثون. حرف مصري ديموطيقي أصيل. يُنطق "ج" معطشة قبل المتحرك للكسر، و"ج" غير معطشة في الحالات الأخرى.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϫⲱ
  - القبطي المعرب (نطقها): «جو»
  - المعنى بالعربية: رأس / يقول

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (551, 112, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲧ واستمع لنطقه', 'Ⲧ', 'تاف كابيتال', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (461, 97, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲉ واستمع لنطقه', 'Ⲉ', 'إي كابيتال', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (485, 101, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲑ واستمع لنطقه', 'Ⲑ', 'ثيتا كابيتال', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (563, 114, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲫ واستمع لنطقه', 'Ⲫ', 'في كابيتال', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (467, 98, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲋ واستمع لنطقه', 'Ⲋ', 'سو (رقم ٦) كابيتال', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (545, 111, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲥ واستمع لنطقه', 'Ⲥ', 'سيما كابيتال', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (527, 108, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲟ واستمع لنطقه', 'Ⲟ', 'أُو (قصيرة) كابيتال', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (437, 93, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲁ واستمع لنطقه', 'Ⲁ', 'ألفا كابيتال', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (509, 105, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲙ واستمع لنطقه', 'Ⲙ', 'مي كابيتال', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (491, 102, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲓ واستمع لنطقه', 'Ⲓ', 'إيوتا كابيتال', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (497, 103, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲕ واستمع لنطقه', 'Ⲕ', 'كابا كابيتال', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (649, 129, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'إبسيلون', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (639, 127, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'كابا', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (473, 99, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲍ واستمع لنطقه', 'Ⲍ', 'زاتا كابيتال', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (515, 106, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲛ واستمع لنطقه', 'Ⲛ', 'ني كابيتال', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (634, 126, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'سو (رقم ٦)', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (443, 94, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲃ واستمع لنطقه', 'Ⲃ', 'فيدا كابيتال', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (629, 125, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'ألفا', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (611, 122, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϫ واستمع لنطقه', 'Ϫ', 'جانجا كابيتال', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (593, 119, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϥ واستمع لنطقه', 'Ϥ', 'فاي كابيتال', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (575, 116, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲯ واستمع لنطقه', 'Ⲯ', 'إبسي كابيتال', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (449, 95, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲅ واستمع لنطقه', 'Ⲅ', 'غاما كابيتال', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (455, 96, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲇ واستمع لنطقه', 'Ⲇ', 'دلدا كابيتال', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (533, 109, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲡ واستمع لنطقه', 'Ⲡ', 'بي كابيتال', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (587, 118, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϣ واستمع لنطقه', 'Ϣ', 'شاي كابيتال', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (605, 121, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϩ واستمع لنطقه', 'Ϩ', 'هوري كابيتال', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (623, 124, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϯ واستمع لنطقه', 'Ϯ', 'تي كابيتال', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (617, 123, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϭ واستمع لنطقه', 'Ϭ', 'تشيما كابيتال', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (644, 128, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'أُو (قصيرة)', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (599, 120, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϧ واستمع لنطقه', 'Ϧ', 'خاي كابيتال', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (581, 117, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲱ واستمع لنطقه', 'Ⲱ', 'أوميغا (أو طويلة) كابيتال', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (659, 131, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'تشيما', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (569, 115, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲭ واستمع لنطقه', 'Ⲭ', 'خي كابيتال', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (557, 113, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲩ واستمع لنطقه', 'Ⲩ', 'إبسيلون كابيتال', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (539, 110, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲣ واستمع لنطقه', 'Ⲣ', 'رو كابيتال', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (521, 107, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲝ واستمع لنطقه', 'Ⲝ', 'كسي كابيتال', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (503, 104, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲗ واستمع لنطقه', 'Ⲗ', 'لابدا كابيتال', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (664, 132, 'listen', 'استمع واختر الحرف الصحيح', NULL, 'ألفا', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (654, 130, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'شاي', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (479, 100, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲏ واستمع لنطقه', 'Ⲏ', 'هيتا كابيتال', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (456, 96, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲇ واستمع لنطقه', 'ⲇ', 'دلدا سمول', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (450, 95, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲅ واستمع لنطقه', 'ⲅ', 'غاما سمول', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (582, 117, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲱ واستمع لنطقه', 'ⲱ', 'أوميغا (أو طويلة) سمول', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (600, 120, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϧ واستمع لنطقه', 'ϧ', 'خاي سمول', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (618, 123, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϭ واستمع لنطقه', 'ϭ', 'تشيما سمول', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (640, 127, 'select', 'ما معنى الكلمة: ⲗⲁⲙⲡⲁⲥ؟ (المعرب: «لامباس»)', 'ⲗⲁⲙⲡⲁⲥ', 'لامباس', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (444, 94, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲃ واستمع لنطقه', 'ⲃ', 'فيدا سمول', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (474, 99, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲍ واستمع لنطقه', 'ⲍ', 'زاتا سمول', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (504, 104, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲗ واستمع لنطقه', 'ⲗ', 'لابدا سمول', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (522, 107, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲝ واستمع لنطقه', 'ⲝ', 'كسي سمول', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (540, 110, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲣ واستمع لنطقه', 'ⲣ', 'رو سمول', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (558, 113, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲩ واستمع لنطقه', 'ⲩ', 'إبسيلون سمول', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (630, 125, 'select', 'ما معنى الكلمة: ⲃⲉⲣⲧ؟ (المعرب: «فيرت»)', 'ⲃⲉⲣⲧ', 'فيرت', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (486, 101, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲑ واستمع لنطقه', 'ⲑ', 'ثيتا سمول', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (462, 97, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲉ واستمع لنطقه', 'ⲉ', 'إي سمول', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (480, 100, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲏ واستمع لنطقه', 'ⲏ', 'هيتا سمول', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (588, 118, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϣ واستمع لنطقه', 'ϣ', 'شاي سمول', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (606, 121, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϩ واستمع لنطقه', 'ϩ', 'هوري سمول', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (624, 124, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϯ واستمع لنطقه', 'ϯ', 'تي سمول', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (492, 102, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲓ واستمع لنطقه', 'ⲓ', 'إيوتا سمول', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (510, 105, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲙ واستمع لنطقه', 'ⲙ', 'مي سمول', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (528, 108, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲟ واستمع لنطقه', 'ⲟ', 'أُو (قصيرة) سمول', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (546, 111, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲥ واستمع لنطقه', 'ⲥ', 'سيما سمول', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (564, 114, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲫ واستمع لنطقه', 'ⲫ', 'في سمول', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (498, 103, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲕ واستمع لنطقه', 'ⲕ', 'كابا سمول', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (516, 106, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲛ واستمع لنطقه', 'ⲛ', 'ني سمول', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (534, 109, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲡ واستمع لنطقه', 'ⲡ', 'بي سمول', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (552, 112, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲧ واستمع لنطقه', 'ⲧ', 'تاف سمول', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (570, 115, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲭ واستمع لنطقه', 'ⲭ', 'خي سمول', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (650, 129, 'select', 'ما معنى الكلمة: ⲫⲟⲟⲩ؟ (المعرب: «إفهو»)', 'ⲫⲟⲟⲩ', 'إفهو', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (660, 131, 'select', 'ما معنى الكلمة: ϯⲙⲏⲓ؟ (المعرب: «تيمي»)', 'ϯⲙⲏⲓ', 'تيمي', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (635, 126, 'select', 'ما معنى الكلمة: ⲧⲣⲁⲡⲉⲍⲁ؟ (المعرب: «ترابيزا»)', 'ⲧⲣⲁⲡⲉⲍⲁ', 'ترابيزا', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (655, 130, 'select', 'ما معنى الكلمة: ϥⲱⲓ؟ (المعرب: «فوي»)', 'ϥⲱⲓ', 'فوي', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (665, 132, 'select', 'ما معنى الكلمة القبطية: ⲛⲟⲩϯ؟ (المعرب: «نوتي»)', 'ⲛⲟⲩϯ', 'نوتي', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (645, 128, 'select', 'ما معنى الكلمة: ⲡⲉ؟ (المعرب: «بي»)', 'ⲡⲉ', 'بي', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (576, 116, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲯ واستمع لنطقه', 'ⲯ', 'إبسي سمول', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (594, 119, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϥ واستمع لنطقه', 'ϥ', 'فاي سمول', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (612, 122, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϫ واستمع لنطقه', 'ϫ', 'جانجا سمول', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (468, 98, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲋ واستمع لنطقه', 'ⲋ', 'سو (رقم ٦) سمول', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (438, 93, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲁ واستمع لنطقه', 'ⲁ', 'ألفا سمول', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (523, 107, 'read_select', 'ما هو نطق الحرف Ⲝ بالعربية؟', 'Ⲝ', 'كسي', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (589, 118, 'read_select', 'ما هو نطق الحرف Ϣ بالعربية؟', 'Ϣ', 'شاي', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (541, 110, 'read_select', 'ما هو نطق الحرف Ⲣ بالعربية؟', 'Ⲣ', 'رو', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (553, 112, 'read_select', 'ما هو نطق الحرف Ⲧ بالعربية؟', 'Ⲧ', 'تاف', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (559, 113, 'read_select', 'ما هو نطق الحرف Ⲩ بالعربية؟', 'Ⲩ', 'إبسيلون', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (661, 131, 'write', 'رتب حروف الكلمة: الحق / العدل (المعرب: «تيمي»)', 'ϯⲙⲏⲓ', 'تيمي', 'audio_coptic/32tee.mp3', 'ϯⲙⲏⲓ', '["ϯ","ⲙ","ⲏ","ⲓ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (535, 109, 'read_select', 'ما هو نطق الحرف Ⲡ بالعربية؟', 'Ⲡ', 'بي', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (656, 130, 'write', 'رتب حروف الكلمة: رأس / يقول (المعرب: «جو»)', 'ϫⲱ', 'جو', 'audio_coptic/30ganga.mp3', 'ϫⲱ', '["ϫ","ⲱ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (463, 97, 'read_select', 'ما هو نطق الحرف Ⲉ بالعربية؟', 'Ⲉ', 'إي', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (457, 96, 'read_select', 'ما هو نطق الحرف Ⲇ بالعربية؟', 'Ⲇ', 'دلدا', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (666, 132, 'select', 'كم عدد حروف الأبجدية القبطية كاملة؟', NULL, NULL, NULL, NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (565, 114, 'read_select', 'ما هو نطق الحرف Ⲫ بالعربية؟', 'Ⲫ', 'في', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (487, 101, 'read_select', 'ما هو نطق الحرف Ⲑ بالعربية؟', 'Ⲑ', 'ثيتا', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (619, 123, 'read_select', 'ما هو نطق الحرف Ϭ بالعربية؟', 'Ϭ', 'تشيما', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (475, 99, 'read_select', 'ما هو نطق الحرف Ⲍ بالعربية؟', 'Ⲍ', 'زاتا', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (601, 120, 'read_select', 'ما هو نطق الحرف Ϧ بالعربية؟', 'Ϧ', 'خاي', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (641, 127, 'write', 'رتب حروف الكلمة: ستارة (المعرب: «أواليكس»)', 'ⲟⲩⲁⲗⲓⲝ', 'أواليكس', 'audio_coptic/15axsy.mp3', 'ⲟⲩⲁⲗⲓⲝ', '["ⲟ","ⲩ","ⲁ","ⲗ","ⲓ","ⲝ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (583, 117, 'read_select', 'ما هو نطق الحرف Ⲱ بالعربية؟', 'Ⲱ', 'أوميغا (أو طويلة)', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (636, 126, 'write', 'رتب حروف الكلمة: صنارة / نور (المعرب: «أويني»)', 'ⲱⲓⲛⲓ', 'أويني', 'audio_coptic/10yota.mp3', 'ⲱⲓⲛⲓ', '["ⲱ","ⲓ","ⲛ","ⲓ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (646, 128, 'write', 'رتب حروف الكلمة: جبل (المعرب: «توو»)', 'ⲧⲱⲟⲩ', 'توو', 'audio_coptic/20tav.mp3', 'ⲧⲱⲟⲩ', '["ⲧ","ⲱ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (577, 116, 'read_select', 'ما هو نطق الحرف Ⲯ بالعربية؟', 'Ⲯ', 'إبسي', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (481, 100, 'read_select', 'ما هو نطق الحرف Ⲏ بالعربية؟', 'Ⲏ', 'هيتا', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (651, 129, 'write', 'رتب حروف الكلمة: حياة (المعرب: «أونخ»)', 'ⲱⲛϧ', 'أونخ', 'audio_coptic/25oo.mp3', 'ⲱⲛϧ', '["ⲱ","ⲛ","ϧ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (571, 115, 'read_select', 'ما هو نطق الحرف Ⲭ بالعربية؟', 'Ⲭ', 'خي', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (595, 119, 'read_select', 'ما هو نطق الحرف Ϥ بالعربية؟', 'Ϥ', 'فاي', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (517, 106, 'read_select', 'ما هو نطق الحرف Ⲛ بالعربية؟', 'Ⲛ', 'ني', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (439, 93, 'read_select', 'ما هو نطق الحرف Ⲁ بالعربية؟', 'Ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (499, 103, 'read_select', 'ما هو نطق الحرف Ⲕ بالعربية؟', 'Ⲕ', 'كابا', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (631, 125, 'write', 'رتب حروف الكلمة: قرد (المعرب: «إن»)', 'ⲉⲛ', 'إن', 'audio_coptic/5ei.mp3', 'ⲉⲛ', '["ⲉ","ⲛ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (625, 124, 'read_select', 'ما هو نطق الحرف Ϯ بالعربية؟', 'Ϯ', 'تي', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (469, 98, 'read_select', 'ما هو نطق الحرف Ⲋ بالعربية؟', 'Ⲋ', 'سو (رقم ٦)', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (607, 121, 'read_select', 'ما هو نطق الحرف Ϩ بالعربية؟', 'Ϩ', 'هوري', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (445, 94, 'read_select', 'ما هو نطق الحرف Ⲃ بالعربية؟', 'Ⲃ', 'فيدا', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (493, 102, 'read_select', 'ما هو نطق الحرف Ⲓ بالعربية؟', 'Ⲓ', 'إيوتا', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (511, 105, 'read_select', 'ما هو نطق الحرف Ⲙ بالعربية؟', 'Ⲙ', 'مي', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (529, 108, 'read_select', 'ما هو نطق الحرف Ⲟ بالعربية؟', 'Ⲟ', 'أُو (قصيرة)', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (613, 122, 'read_select', 'ما هو نطق الحرف Ϫ بالعربية؟', 'Ϫ', 'جانجا', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (451, 95, 'read_select', 'ما هو نطق الحرف Ⲅ بالعربية؟', 'Ⲅ', 'غاما', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (505, 104, 'read_select', 'ما هو نطق الحرف Ⲗ بالعربية؟', 'Ⲗ', 'لابدا', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (547, 111, 'read_select', 'ما هو نطق الحرف Ⲥ بالعربية؟', 'Ⲥ', 'سيما', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (446, 94, 'select', 'ما معنى الكلمة القبطية: ⲃⲉⲣⲧ؟ (المعرب: «فيرت»)', 'ⲃⲉⲣⲧ', 'فيرت', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (602, 120, 'select', 'ما معنى الكلمة القبطية: ϧⲏⲧ؟ (المعرب: «خيت»)', 'ϧⲏⲧ', 'خيت', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (476, 99, 'select', 'ما معنى الكلمة القبطية: ⲧⲣⲁⲡⲉⲍⲁ؟ (المعرب: «ترابيزا»)', 'ⲧⲣⲁⲡⲉⲍⲁ', 'ترابيزا', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (647, 128, 'read_select', 'ما هو نطق الحرف القبطي: Ⲣ؟', 'Ⲣ', 'رو', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (458, 96, 'select', 'ما معنى الكلمة القبطية: ⲇⲱⲣⲟⲛ؟ (المعرب: «ذورون»)', 'ⲇⲱⲣⲟⲛ', 'ذورون', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (584, 117, 'select', 'ما معنى الكلمة القبطية: ⲱⲛϧ؟ (المعرب: «أونخ»)', 'ⲱⲛϧ', 'أونخ', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (494, 102, 'select', 'ما معنى الكلمة القبطية: ⲱⲓⲛⲓ؟ (المعرب: «أويني»)', 'ⲱⲓⲛⲓ', 'أويني', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (512, 105, 'select', 'ما معنى الكلمة القبطية: ⲙⲟⲗϧ؟ (المعرب: «مولخ»)', 'ⲙⲟⲗϧ', 'مولخ', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (530, 108, 'select', 'ما معنى الكلمة القبطية: ⲥⲓⲟⲩ؟ (المعرب: «سيو»)', 'ⲥⲓⲟⲩ', 'سيو', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (548, 111, 'select', 'ما معنى الكلمة القبطية: ⲥⲱ؟ (المعرب: «سو»)', 'ⲥⲱ', 'سو', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (578, 116, 'select', 'ما معنى الكلمة القبطية: ⲯⲁⲗⲙⲟⲥ؟ (المعرب: «بصالموس»)', 'ⲯⲁⲗⲙⲟⲥ', 'بصالموس', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (566, 114, 'select', 'ما معنى الكلمة القبطية: ⲫⲟⲟⲩ؟ (المعرب: «إفهو»)', 'ⲫⲟⲟⲩ', 'إفهو', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (572, 115, 'select', 'ما معنى الكلمة القبطية: ⲭⲣⲓⲥⲧⲟⲥ؟ (المعرب: «خريستوس»)', 'ⲭⲣⲓⲥⲧⲟⲥ', 'خريستوس', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (554, 112, 'select', 'ما معنى الكلمة القبطية: ⲧⲱⲟⲩ؟ (المعرب: «توو»)', 'ⲧⲱⲟⲩ', 'توو', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (652, 129, 'read_select', 'ما هو نطق الحرف القبطي: Ⲭ؟', 'Ⲭ', 'خي', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (536, 109, 'select', 'ما معنى الكلمة القبطية: ⲡⲉ؟ (المعرب: «بي»)', 'ⲡⲉ', 'بي', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (662, 131, 'read_select', 'ما هو نطق الحرف القبطي: Ϭ؟', 'Ϭ', 'تشيما', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (518, 106, 'select', 'ما معنى الكلمة القبطية: ⲛⲟⲩϯ؟ (المعرب: «نوتي»)', 'ⲛⲟⲩϯ', 'نوتي', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (500, 103, 'select', 'ما معنى الكلمة القبطية: ⲉⲕⲕⲗⲏⲥⲓⲁ؟ (المعرب: «إككليسيا»)', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', 'إككليسيا', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (632, 125, 'read_select', 'ما هو نطق الحرف القبطي: Ⲅ؟', 'Ⲅ', 'غاما', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (637, 126, 'read_select', 'ما هو نطق الحرف القبطي: Ⲏ؟', 'Ⲏ', 'هيتا', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (440, 93, 'select', 'ما معنى الكلمة القبطية: ⲁⲗⲟⲩ؟ (المعرب: «أَلو»)', 'ⲁⲗⲟⲩ', 'أَلو', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (657, 130, 'read_select', 'ما هو نطق الحرف القبطي: Ϧ؟', 'Ϧ', 'خاي', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (667, 132, 'write', 'رتب حروف الكلمة القبطية: ولد (المعرب: «أَلو») [ⲁⲗⲟⲩ]', 'ⲁⲗⲟⲩ', 'أَلو', 'audio_coptic/1alfa.mp3', 'ⲁⲗⲟⲩ', '["ⲁ","ⲗ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (452, 95, 'select', 'ما معنى الكلمة القبطية: ⲁⲅⲅⲉⲗⲟⲥ؟ (المعرب: «أنجيلوس»)', 'ⲁⲅⲅⲉⲗⲟⲥ', 'أنجيلوس', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (482, 100, 'select', 'ما معنى الكلمة القبطية: ⲁⲛⲍⲏⲃ؟ (المعرب: «أنزيب»)', 'ⲁⲛⲍⲏⲃ', 'أنزيب', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (590, 118, 'select', 'ما معنى الكلمة القبطية: ϣⲏⲣⲓ؟ (المعرب: «شيري»)', 'ϣⲏⲣⲓ', 'شيري', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (608, 121, 'select', 'ما معنى الكلمة القبطية: ϩⲱⲃ؟ (المعرب: «هوب»)', 'ϩⲱⲃ', 'هوب', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (626, 124, 'select', 'ما معنى الكلمة القبطية: ϯⲙⲏⲓ؟ (المعرب: «تيمي»)', 'ϯⲙⲏⲓ', 'تيمي', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (614, 122, 'select', 'ما معنى الكلمة القبطية: ϫⲱ؟ (المعرب: «جو»)', 'ϫⲱ', 'جو', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (596, 119, 'select', 'ما معنى الكلمة القبطية: ϥⲱⲓ؟ (المعرب: «فوي»)', 'ϥⲱⲓ', 'فوي', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (620, 123, 'select', 'ما معنى الكلمة القبطية: ϭⲟⲓⲥ؟ (المعرب: «تشويس»)', 'ϭⲟⲓⲥ', 'تشويس', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (560, 113, 'select', 'ما معنى الكلمة القبطية: ⲩⲓⲟⲥ؟ (المعرب: «إيوس»)', 'ⲩⲓⲟⲥ', 'إيوس', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (464, 97, 'select', 'ما معنى الكلمة القبطية: ⲉⲛ؟ (المعرب: «إن»)', 'ⲉⲛ', 'إن', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (470, 98, 'select', 'ما معنى الكلمة القبطية: ⲥⲟⲟⲩ؟ (المعرب: «سو»)', 'ⲥⲟⲟⲩ', 'سو', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (542, 110, 'select', 'ما معنى الكلمة القبطية: ⲣⲱⲙⲓ؟ (المعرب: «رومي»)', 'ⲣⲱⲙⲓ', 'رومي', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (524, 107, 'select', 'ما معنى الكلمة القبطية: ⲟⲩⲁⲗⲓⲝ؟ (المعرب: «أواليكس»)', 'ⲟⲩⲁⲗⲓⲝ', 'أواليكس', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (506, 104, 'select', 'ما معنى الكلمة القبطية: ⲗⲁⲙⲡⲁⲥ؟ (المعرب: «لامباس»)', 'ⲗⲁⲙⲡⲁⲥ', 'لامباس', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (488, 101, 'select', 'ما معنى الكلمة القبطية: ⲙⲁⲱⲟⲩⲧ؟ (المعرب: «ماووت»)', 'ⲙⲁⲱⲟⲩⲧ', 'ماووت', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (642, 127, 'read_select', 'ما هو نطق الحرف القبطي: Ⲙ؟', 'Ⲙ', 'مي', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (549, 111, 'write', 'رتب حروف الكلمة القبطية لتكوين: يشرب (المعرب: «سو»)', 'ⲥⲱ', 'سو', 'audio_coptic/19sema.mp3', 'ⲥⲱ', '["ⲥ","ⲱ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (465, 97, 'write', 'رتب حروف الكلمة القبطية لتكوين: قرد (المعرب: «إن»)', 'ⲉⲛ', 'إن', 'audio_coptic/5ei.mp3', 'ⲉⲛ', '["ⲉ","ⲛ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (519, 106, 'write', 'رتب حروف الكلمة القبطية لتكوين: الله (المعرب: «نوتي»)', 'ⲛⲟⲩϯ', 'نوتي', 'audio_coptic/14ni.mp3', 'ⲛⲟⲩϯ', '["ⲛ","ⲟ","ⲩ","ϯ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (531, 108, 'write', 'رتب حروف الكلمة القبطية لتكوين: نجم (المعرب: «سيو»)', 'ⲥⲓⲟⲩ', 'سيو', 'audio_coptic/16oo.mp3', 'ⲥⲓⲟⲩ', '["ⲥ","ⲓ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (525, 107, 'write', 'رتب حروف الكلمة القبطية لتكوين: ستارة (المعرب: «أواليكس»)', 'ⲟⲩⲁⲗⲓⲝ', 'أواليكس', 'audio_coptic/15axsy.mp3', 'ⲟⲩⲁⲗⲓⲝ', '["ⲟ","ⲩ","ⲁ","ⲗ","ⲓ","ⲝ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (447, 94, 'write', 'رتب حروف الكلمة القبطية لتكوين: وردة (المعرب: «فيرت»)', 'ⲃⲉⲣⲧ', 'فيرت', 'audio_coptic/2veta.mp3', 'ⲃⲉⲣⲧ', '["ⲃ","ⲉ","ⲣ","ⲧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (459, 96, 'write', 'رتب حروف الكلمة القبطية لتكوين: عطية / هدية (المعرب: «ذورون»)', 'ⲇⲱⲣⲟⲛ', 'ذورون', 'audio_coptic/4delta.mp3', 'ⲇⲱⲣⲟⲛ', '["ⲇ","ⲱ","ⲣ","ⲟ","ⲛ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (555, 112, 'write', 'رتب حروف الكلمة القبطية لتكوين: جبل (المعرب: «توو»)', 'ⲧⲱⲟⲩ', 'توو', 'audio_coptic/20tav.mp3', 'ⲧⲱⲟⲩ', '["ⲧ","ⲱ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (477, 99, 'write', 'رتب حروف الكلمة القبطية لتكوين: مائدة / ترابيزة (المعرب: «ترابيزا»)', 'ⲧⲣⲁⲡⲉⲍⲁ', 'ترابيزا', 'audio_coptic/7zeta.mp3', 'ⲧⲣⲁⲡⲉⲍⲁ', '["ⲧ","ⲣ","ⲁ","ⲡ","ⲉ","ⲍ","ⲁ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (453, 95, 'write', 'رتب حروف الكلمة القبطية لتكوين: ملاك (المعرب: «أنجيلوس»)', 'ⲁⲅⲅⲉⲗⲟⲥ', 'أنجيلوس', 'audio_coptic/3ghamma.mp3', 'ⲁⲅⲅⲉⲗⲟⲥ', '["ⲁ","ⲅ","ⲅ","ⲉ","ⲗ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (513, 105, 'write', 'رتب حروف الكلمة القبطية لتكوين: شمعة (المعرب: «مولخ»)', 'ⲙⲟⲗϧ', 'مولخ', 'audio_coptic/13mi.mp3', 'ⲙⲟⲗϧ', '["ⲙ","ⲟ","ⲗ","ϧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (483, 100, 'write', 'رتب حروف الكلمة القبطية لتكوين: مدرسة (المعرب: «أنزيب»)', 'ⲁⲛⲍⲏⲃ', 'أنزيب', 'audio_coptic/8eta.mp3', 'ⲁⲛⲍⲏⲃ', '["ⲁ","ⲛ","ⲍ","ⲏ","ⲃ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (543, 110, 'write', 'رتب حروف الكلمة القبطية لتكوين: إنسان (المعرب: «رومي»)', 'ⲣⲱⲙⲓ', 'رومي', 'audio_coptic/18roo.mp3', 'ⲣⲱⲙⲓ', '["ⲣ","ⲱ","ⲙ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (537, 109, 'write', 'رتب حروف الكلمة القبطية لتكوين: سماء (المعرب: «بي»)', 'ⲡⲉ', 'بي', 'audio_coptic/17pee.mp3', 'ⲡⲉ', '["ⲡ","ⲉ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (627, 124, 'write', 'رتب حروف الكلمة القبطية لتكوين: الحق / العدل (المعرب: «تيمي»)', 'ϯⲙⲏⲓ', 'تيمي', 'audio_coptic/32tee.mp3', 'ϯⲙⲏⲓ', '["ϯ","ⲙ","ⲏ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (615, 122, 'write', 'رتب حروف الكلمة القبطية لتكوين: رأس / يقول (المعرب: «جو»)', 'ϫⲱ', 'جو', 'audio_coptic/30ganga.mp3', 'ϫⲱ', '["ϫ","ⲱ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (609, 121, 'write', 'رتب حروف الكلمة القبطية لتكوين: عمل / شيء (المعرب: «هوب»)', 'ϩⲱⲃ', 'هوب', 'audio_coptic/29hory.mp3', 'ϩⲱⲃ', '["ϩ","ⲱ","ⲃ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (597, 119, 'write', 'رتب حروف الكلمة القبطية لتكوين: شعر (شعر الرأس) (المعرب: «فوي»)', 'ϥⲱⲓ', 'فوي', 'audio_coptic/27fay.mp3', 'ϥⲱⲓ', '["ϥ","ⲱ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (591, 118, 'write', 'رتب حروف الكلمة القبطية لتكوين: ابن / صبي (المعرب: «شيري»)', 'ϣⲏⲣⲓ', 'شيري', 'audio_coptic/26shay.mp3', 'ϣⲏⲣⲓ', '["ϣ","ⲏ","ⲣ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (501, 103, 'write', 'رتب حروف الكلمة القبطية لتكوين: كنيسة (المعرب: «إككليسيا»)', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', 'إككليسيا', 'audio_coptic/11kapa.mp3', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', '["ⲉ","ⲕ","ⲕ","ⲗ","ⲏ","ⲥ","ⲓ","ⲁ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (489, 101, 'write', 'رتب حروف الكلمة القبطية لتكوين: مشط (المعرب: «ماووت»)', 'ⲙⲁⲱⲟⲩⲧ', 'ماووت', 'audio_coptic/9seta.mp3', 'ⲙⲁⲱⲟⲩⲧ', '["ⲙ","ⲁ","ⲱ","ⲟ","ⲩ","ⲧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (495, 102, 'write', 'رتب حروف الكلمة القبطية لتكوين: صنارة / نور (المعرب: «أويني»)', 'ⲱⲓⲛⲓ', 'أويني', 'audio_coptic/10yota.mp3', 'ⲱⲓⲛⲓ', '["ⲱ","ⲓ","ⲛ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (579, 116, 'write', 'رتب حروف الكلمة القبطية لتكوين: مزمور (المعرب: «بصالموس»)', 'ⲯⲁⲗⲙⲟⲥ', 'بصالموس', 'audio_coptic/24psi.mp3', 'ⲯⲁⲗⲙⲟⲥ', '["ⲯ","ⲁ","ⲗ","ⲙ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (585, 117, 'write', 'رتب حروف الكلمة القبطية لتكوين: حياة (المعرب: «أونخ»)', 'ⲱⲛϧ', 'أونخ', 'audio_coptic/25oo.mp3', 'ⲱⲛϧ', '["ⲱ","ⲛ","ϧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (573, 115, 'write', 'رتب حروف الكلمة القبطية لتكوين: المسيح (المعرب: «خريستوس»)', 'ⲭⲣⲓⲥⲧⲟⲥ', 'خريستوس', 'audio_coptic/23ki.mp3', 'ⲭⲣⲓⲥⲧⲟⲥ', '["ⲭ","ⲣ","ⲓ","ⲥ","ⲧ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (603, 120, 'write', 'رتب حروف الكلمة القبطية لتكوين: قلب (المعرب: «خيت»)', 'ϧⲏⲧ', 'خيت', 'audio_coptic/28khay.mp3', 'ϧⲏⲧ', '["ϧ","ⲏ","ⲧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (441, 93, 'write', 'رتب حروف الكلمة القبطية لتكوين: ولد / طفل (المعرب: «أَلو»)', 'ⲁⲗⲟⲩ', 'أَلو', 'audio_coptic/1alfa.mp3', 'ⲁⲗⲟⲩ', '["ⲁ","ⲗ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (621, 123, 'write', 'رتب حروف الكلمة القبطية لتكوين: رب / سيد (المعرب: «تشويس»)', 'ϭⲟⲓⲥ', 'تشويس', 'audio_coptic/31chema.mp3', 'ϭⲟⲓⲥ', '["ϭ","ⲟ","ⲓ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (561, 113, 'write', 'رتب حروف الكلمة القبطية لتكوين: ابن (المعرب: «إيوس»)', 'ⲩⲓⲟⲥ', 'إيوس', 'audio_coptic/21epselon.mp3', 'ⲩⲓⲟⲥ', '["ⲩ","ⲓ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (567, 114, 'write', 'رتب حروف الكلمة القبطية لتكوين: اليوم / النهار (المعرب: «إفهو»)', 'ⲫⲟⲟⲩ', 'إفهو', 'audio_coptic/22fi.mp3', 'ⲫⲟⲟⲩ', '["ⲫ","ⲟ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (507, 104, 'write', 'رتب حروف الكلمة القبطية لتكوين: مصباح / قنديل (المعرب: «لامباس»)', 'ⲗⲁⲙⲡⲁⲥ', 'لامباس', 'audio_coptic/12lavla.mp3', 'ⲗⲁⲙⲡⲁⲥ', '["ⲗ","ⲁ","ⲙ","ⲡ","ⲁ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (471, 98, 'write', 'رتب حروف الكلمة القبطية لتكوين: الرقم ستة (٦) (المعرب: «سو»)', 'ⲥⲟⲟⲩ', 'سو', 'audio_coptic/6sow.mp3', 'ⲥⲟⲟⲩ', '["ⲥ","ⲟ","ⲟ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2997, 481, 'ثيتا (ث أو ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3004, 487, 'ثيتا — ينطق: ث أو ت', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3009, 488, 'ثوب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3012, 493, 'إيوتا — ينطق: ياء قصيرة (i)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3023, 499, 'كابا — ينطق: ك', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3033, 506, 'نار', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3036, 511, 'رو (ر)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3047, 517, 'سيما (س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3057, 524, 'حائط', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3060, 529, 'أوميغا (واو طويلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3071, 535, 'بي — ينطق: ب ثقيلة مشددة (P)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3081, 542, 'حيوان', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3084, 547, 'تاف (ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3095, 553, 'إبسيلون (ي/و)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3105, 560, 'ابن', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3108, 565, 'خي (خ أو ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3119, 571, 'خي — ينطق: خ أو ك أو ش', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3122, 572, 'الملك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3125, 577, 'خي (خ أو ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3146, 590, 'بنت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3149, 595, 'شاي (ش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3170, 608, 'راحة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3173, 613, 'تشيما (تش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3194, 626, 'الباطل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3199, 629, 'Ⲅ ⲅ (غاما)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3205, 632, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3210, 634, 'Ⲑ ⲑ (ثيتا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3216, 637, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3221, 639, 'Ⲕ ⲕ (كابا)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3232, 644, 'Ⲥ ⲥ (سيما)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3239, 645, 'نار', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3250, 650, 'اليوم / النهار', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3261, 655, 'عين', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3272, 660, 'السلام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3283, 665, 'السماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2943, 439, 'غاما (غ أو ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2958, 451, 'فيدا (ف أو ب)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2968, 458, 'عطية / هدية', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2981, 469, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2992, 476, 'نافذة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2998, 481, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3005, 487, 'هيتا (ياء طويلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3010, 488, 'مشط', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3013, 493, 'ثيتا (ث أو ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3034, 506, 'مصباح / قنديل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3037, 511, 'ني (ن)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3058, 524, 'مائدة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3061, 529, 'رو (ر)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3082, 542, 'ملاك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3085, 547, 'في (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3106, 560, 'أب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3109, 565, 'أوميغا (واو طويلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3123, 572, 'المخلص', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3126, 577, 'أوميغا (واو طويلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3136, 584, 'فرح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3147, 590, 'رجل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3150, 595, 'فاي — ينطق: ف', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3160, 602, 'روح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3171, 608, 'عمل / شيء', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3174, 613, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3184, 620, 'رب / سيد', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3195, 626, 'الحق / العدل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3206, 632, 'فيدا (ف أو ب)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3211, 634, 'Ⲋ ⲋ (سو (رقم ٦))', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3217, 637, 'هيتا (ياء طويلة ممدودة (ee))', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3222, 639, 'Ⲗ ⲗ (لابدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3228, 642, 'رو (ر)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3233, 644, 'Ⲣ ⲣ (رو)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3240, 647, 'خي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3245, 649, 'Ⲫ ⲫ (في)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3256, 654, 'Ϧ ϧ (خاي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2944, 440, 'ولد / طفل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2970, 458, 'صلاة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2973, 463, 'فيدا (ف أو ب)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2976, 464, 'طائر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2985, 470, 'الرقم سبعة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2988, 475, 'زاتا — ينطق: ز', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2995, 476, 'مائدة / ترابيزة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3278, 664, 'Ⲁ ⲁ (ألفا)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2999, 481, 'هيتا — ينطق: ياء طويلة ممدودة (ee)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3011, 488, 'خاتم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3014, 493, 'كابا (ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3024, 500, 'هيكل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3035, 506, 'شمس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3038, 511, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3048, 518, 'السماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3059, 524, 'ستارة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3062, 529, 'بي (ب ثقيلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3072, 536, 'سماء', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3083, 542, 'إنسان', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3086, 547, 'رو (ر)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3096, 554, 'جبل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3107, 560, 'أم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3110, 565, 'إبسيلون (ي/و)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3120, 572, 'المعلم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3124, 577, 'إبسي — ينطق: بـ + س (Ps)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3135, 583, 'شاي (ش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3145, 590, 'شيخ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3148, 595, 'خاي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3159, 601, 'فاي (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3169, 608, 'كلام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3172, 613, 'تي (تـ+ي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3183, 619, 'جانجا (ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3193, 626, 'السلام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3198, 629, 'Ⲇ ⲇ (دلدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3204, 632, 'سو (٦)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3209, 634, 'Ⲍ ⲍ (زاتا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3220, 639, 'Ⲙ ⲙ (مي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3241, 647, 'رو (ر)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2945, 440, 'شمس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2948, 445, 'دلدا (د أو ذ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2953, 446, 'وردة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2960, 452, 'قديس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2971, 458, 'خبز', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2974, 463, 'إي — ينطق: إي خفيفة (E)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2984, 470, 'الرقم عشرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2994, 476, 'كرسي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3246, 649, 'Ⲭ ⲭ (خي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3252, 652, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3257, 654, 'Ϥ ϥ (فاي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3268, 659, 'Ϯ ϯ (تي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3274, 662, 'شاي (ش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3279, 664, 'Ⲃ ⲃ (فيدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3286, 666, '٣٢ حرفاً', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3000, 482, 'طريق', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3026, 500, 'كنيسة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3029, 505, 'بي (ب مشددة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3050, 518, 'الله', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3053, 523, 'كسي — ينطق: كـ + س (X)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3074, 536, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3077, 541, 'بي (ب مشددة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3098, 554, 'نهر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3101, 559, 'في (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3127, 577, 'جانجا (ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3137, 584, 'سلام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3140, 589, 'شاي — ينطق: ش', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3151, 595, 'جانجا (ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3161, 602, 'جسد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3164, 607, 'جانجا (ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3175, 613, 'جانجا — ينطق: ج (معطشة أو غير معطشة)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3185, 620, 'عبد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3188, 625, 'تشيما (تش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3200, 630, 'نور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3207, 632, 'غاما (غ أو ج أو ن)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3218, 637, 'ثيتا (ث أو ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3223, 639, 'Ⲛ ⲛ (ني)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3229, 642, 'ني (ن)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3234, 644, 'Ⲡ ⲡ (بي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3242, 647, 'بي (ب مشددة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3247, 649, 'Ⲯ ⲯ (إبسي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3253, 652, 'إبسي (بـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3258, 654, 'Ϣ ϣ (شاي)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3264, 657, 'خاي (خ)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3269, 659, 'Ϭ ϭ (تشيما)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2946, 440, 'بنت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2949, 445, 'فيدا — ينطق: ف (V) أو ب (B)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2961, 452, 'ملاك', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2964, 457, 'دلدا — ينطق: د أو ذ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2977, 464, 'سمكة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2986, 470, 'الرقم خمسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2989, 475, 'سو (٦)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3275, 662, 'تي (تـ+ي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3280, 664, 'Ⲅ ⲅ (غاما)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3287, 666, '٢٨ حرفاً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3001, 482, 'بيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3007, 487, 'مي (م)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3016, 494, 'بحر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3027, 500, 'مذبح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3030, 505, 'لابدا — ينطق: ل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3040, 512, 'شمعة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3051, 518, 'النور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3054, 523, 'كابا (ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3064, 530, 'سماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3075, 536, 'أرض', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3078, 541, 'سيما (س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3088, 548, 'يمشي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3099, 554, 'صحراء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3102, 559, 'إبسي (بـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3112, 566, 'الليل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3128, 578, 'ترنيمة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3139, 584, 'حياة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3142, 589, 'فاي (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3152, 596, 'عين', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3163, 602, 'قلب', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3166, 607, 'تي (تـ+ي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3176, 614, 'عين', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3187, 620, 'ملك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3190, 625, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3202, 630, 'شجرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3213, 635, 'كرسي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3224, 640, 'شمس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3231, 642, 'مي (م)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3243, 647, 'سيما (س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3254, 652, 'في (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3259, 654, 'Ϩ ϩ (هوري)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3265, 657, 'فاي (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3276, 662, 'جانجا (ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3281, 664, 'Ⲇ ⲇ (دلدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3288, 666, '٢٦ حرفاً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2947, 440, 'مدرسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2950, 445, 'ألفا (أ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2954, 446, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2962, 452, 'إنسان', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2965, 457, 'غاما (غ أو ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2978, 464, 'قرد', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2980, 469, 'ثيتا (ث أو ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2982, 469, 'كابا (ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2987, 470, 'الرقم ستة (٦)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2990, 475, 'هيتا (ياء طويلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3002, 482, 'كنيسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3017, 494, 'قارب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3020, 499, 'كسي (كـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3031, 505, 'ني (ن)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3041, 512, 'بخور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3044, 517, 'ني — ينطق: ن', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3055, 523, 'ني (ن)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3065, 530, 'سحاب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3068, 535, 'أُو (واو قصيرة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3079, 541, 'خي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3089, 548, 'يشرب', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3092, 553, 'شاي (ش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3103, 559, 'خي (خ أو ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3113, 566, 'غداً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3116, 571, 'في (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3129, 578, 'إنجيل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3132, 583, 'إبسي (بـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3143, 589, 'خاي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3153, 596, 'قدم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3156, 601, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3167, 607, 'خاي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3177, 614, 'رأس / يقول', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3180, 619, 'شاي (ش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3191, 625, 'خاي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3203, 630, 'وردة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3214, 635, 'مائدة / ترابيزة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3225, 640, 'زيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3236, 645, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3244, 649, 'Ⲩ ⲩ (إبسيلون)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3263, 655, 'يد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3285, 665, 'الكنيسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2952, 446, 'شجرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2959, 451, 'غاما — ينطق: غ أو ج أو ن', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2969, 458, 'كتاب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2972, 463, 'ألفا (أ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2993, 476, 'باب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2996, 481, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3003, 482, 'مدرسة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3018, 494, 'شبكة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3021, 499, 'مي (م)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3042, 512, 'صليب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3045, 517, 'مي (م)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3066, 530, 'قمر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3069, 535, 'سيما (س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3090, 548, 'يأكل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3093, 553, 'تاف — ينطق: ت', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3114, 566, 'أمس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3117, 571, 'إبسي (بـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3130, 578, 'صلاة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3133, 583, 'أوميغا (أو طويلة) — ينطق: واو طويلة ممدودة (Ō)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3154, 596, 'شعر (شعر الرأس)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3157, 601, 'تشيما (تش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3178, 614, 'قدم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3181, 619, 'تشيما — ينطق: تش (Tsh)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3196, 629, 'Ⲁ ⲁ (ألفا)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3215, 635, 'باب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3226, 640, 'نار', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3237, 645, 'سماء', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3248, 650, 'غداً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3255, 652, 'خي (خ أو ك أو ش)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3266, 657, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3270, 660, 'الباطل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3277, 662, 'تشيما (تش (Tsh))', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3289, 666, '٣٠ حرفاً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2940, 439, 'دلدا (د أو ذ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2955, 446, 'نور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2963, 452, 'نبي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2966, 457, 'إي (E)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2979, 464, 'أسد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3006, 487, 'إيوتا (ياء قصيرة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3015, 493, 'ني (ن)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3025, 500, 'دير', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3028, 505, 'كابا (ك)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3039, 511, 'مي — ينطق: م', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3049, 518, 'الحق', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3052, 523, 'تاف (ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3063, 529, 'أُو (قصيرة) — ينطق: واو قصيرة مضمومة (O)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3073, 536, 'نار', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3076, 541, 'رو — ينطق: ر', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3087, 547, 'سيما — ينطق: س', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3097, 554, 'وادي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3100, 559, 'إبسيلون — ينطق: ي أو ڤ أو و', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3111, 565, 'في — ينطق: ف', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3121, 572, 'المسيح', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3131, 578, 'مزمور', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3134, 583, 'فاي (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3144, 590, 'ابن / صبي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3155, 596, 'يد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3158, 601, 'خاي — ينطق: خ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3168, 608, 'فكر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3179, 614, 'لسان', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3182, 619, 'تي (تـ+ي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3192, 626, 'النعمة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3197, 629, 'Ⲃ ⲃ (فيدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3208, 634, 'Ⲏ ⲏ (هيتا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3227, 640, 'مصباح / قنديل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3238, 645, 'أرض', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3249, 650, 'أمس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3260, 655, 'شعر (شعر الرأس)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3267, 657, 'تشيما (تش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3271, 660, 'الحق / العدل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3282, 665, 'الله', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2941, 439, 'فيدا (ف أو ب)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2951, 445, 'إي (E)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2956, 451, 'سو (٦)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2967, 457, 'هيتا (ياء طويلة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2975, 463, 'دلدا (د أو ذ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2991, 475, 'إيوتا (ياء قصيرة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3008, 488, 'مرآة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3019, 494, 'صنارة / نور', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3022, 499, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3032, 506, 'زيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3043, 512, 'كأس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3046, 517, 'كسي (كـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3056, 524, 'سقف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3067, 530, 'نجم', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3070, 535, 'تاف (ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3080, 542, 'شجر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3091, 548, 'ينام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3094, 553, 'سيما (س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3104, 560, 'أخ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3115, 566, 'اليوم / النهار', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3118, 571, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3138, 584, 'موت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3141, 589, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3162, 602, 'عقل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3165, 607, 'هوري — ينطق: هـ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3186, 620, 'خادم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3189, 625, 'تي — ينطق: تـ + ي (Ti)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3201, 630, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3212, 635, 'نافذة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3219, 637, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3230, 642, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3235, 644, 'Ⲟ ⲟ (أُو (قصيرة))', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3251, 650, 'الليل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3262, 655, 'قدم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3273, 660, 'النعمة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (3284, 665, 'الملاك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2942, 439, 'ألفا — ينطق: ألف مفتوحة (أ)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2957, 451, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (2983, 469, 'سو (رقم ٦) — ينطق: سو (الرقم 6)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_1', 5, 34, '🎁 صندوق كنز الوحدة 1', 'مكافأة إتمام دروس ومراجعة الوحدة 1', 'unit_end', 125, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_2', 5, 35, '🎁 صندوق كنز الوحدة 2', 'مكافأة إتمام دروس ومراجعة الوحدة 2', 'unit_end', 126, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_3', 5, 36, '🎁 صندوق كنز الوحدة 3', 'مكافأة إتمام دروس ومراجعة الوحدة 3', 'unit_end', 127, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_4', 5, 37, '🎁 صندوق كنز الوحدة 4', 'مكافأة إتمام دروس ومراجعة الوحدة 4', 'unit_end', 128, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_5', 5, 38, '🎁 صندوق كنز الوحدة 5', 'مكافأة إتمام دروس ومراجعة الوحدة 5', 'unit_end', 129, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_6', 5, 39, '🎁 صندوق كنز الوحدة 6', 'مكافأة إتمام دروس ومراجعة الوحدة 6', 'unit_end', 130, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_7', 5, 40, '🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول', 'تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!', 'unit_end', 131, 'fixed', 50, 50, 3, TRUE, 'متقن الأبجدية القبطية', 'trophy', 'أتممت المستوى الأول للأبجدية القبطية كاملاً (٣٢ حرفاً)')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

END $$;

-- Reset sequences
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'units_id_seq') THEN
        PERFORM setval('units_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.units));
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'lessons_id_seq') THEN
        PERFORM setval('lessons_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.lessons));
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'challenges_id_seq') THEN
        PERFORM setval('challenges_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.challenges));
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'challenge_options_id_seq') THEN
        PERFORM setval('challenge_options_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.challenge_options));
    END IF;
END $$;
