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
    VALUES (41, 5, 'الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)', 'Ⲁ-Ⲉ', 'تعلّم كتابة ونطق أول 5 حروف في الأبجدية القبطية', 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٢: الحروف من (Ⲋ – Ⲓ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (42, 5, 'الوحدة ٢: الحروف من (Ⲋ – Ⲓ)', 'Ⲋ-Ⲓ', 'تعلّم الرمز العددي سو والحروف من زاتا إلى إيوتا', 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٣: الحروف من (Ⲕ – Ⲝ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (43, 5, 'الوحدة ٣: الحروف من (Ⲕ – Ⲝ)', 'Ⲕ-Ⲝ', 'تعلّم الحروف من كابا إلى كسي مع كلمات كنسية شهيرة', 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٤: الحروف من (Ⲟ – Ⲧ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (44, 5, 'الوحدة ٤: الحروف من (Ⲟ – Ⲧ)', 'Ⲟ-Ⲧ', 'تعلّم الحروف من أُو قصيرة إلى تاف', 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٥: الحروف من (Ⲩ – Ⲱ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (45, 5, 'الوحدة ٥: الحروف من (Ⲩ – Ⲱ)', 'Ⲩ-Ⲱ', 'تعلّم الحروف من إبسيلون إلى أوميغا خاتمة الحروف اليونانية', 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (46, 5, 'الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)', 'Ϣ-Ϫ', 'الحروف الديموطيقية السبعة الخاصة باللغة المصرية القديمة', 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    -- ---------------------------------------------------------
    -- Unit: الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (47, 5, 'الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)', 'Ϭ-Ϯ', 'ختام الأبجدية واختبار إتقان الـ 32 حرفاً القبطية بالكامل', 7)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (143, 43, 'حرف كابا (Ⲕ ⲕ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (153, 45, 'حرف إبسيلون (Ⲩ ⲩ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (133, 41, 'حرف ألفا (Ⲁ ⲁ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (138, 42, 'حرف سو (رقم ٦) (Ⲋ ⲋ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (148, 44, 'حرف أُو (قصيرة) (Ⲟ ⲟ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (163, 47, 'حرف تشيما (Ϭ ϭ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (158, 46, 'حرف شاي (Ϣ ϣ)', 5, 1, 5, 1)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (164, 47, 'حرف تي (Ϯ ϯ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (159, 46, 'حرف فاي (Ϥ ϥ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (134, 41, 'حرف فيدا (Ⲃ ⲃ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (144, 43, 'حرف لابدا (Ⲗ ⲗ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (149, 44, 'حرف بي (Ⲡ ⲡ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (139, 42, 'حرف زاتا (Ⲍ ⲍ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (154, 45, 'حرف في (Ⲫ ⲫ)', 5, 1, 5, 2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (150, 44, 'حرف رو (Ⲣ ⲣ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (155, 45, 'حرف خي (Ⲭ ⲭ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (171, 47, '🔄 مراجعة شاملة للأبجدية القبطية', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (160, 46, 'حرف خاي (Ϧ ϧ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (145, 43, 'حرف مي (Ⲙ ⲙ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (135, 41, 'حرف غاما (Ⲅ ⲅ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (140, 42, 'حرف هيتا (Ⲏ ⲏ)', 5, 1, 5, 3)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (156, 45, 'حرف إبسي (Ⲯ ⲯ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (141, 42, 'حرف ثيتا (Ⲑ ⲑ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (146, 43, 'حرف ني (Ⲛ ⲛ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (151, 44, 'حرف سيما (Ⲥ ⲥ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (136, 41, 'حرف دلدا (Ⲇ ⲇ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (161, 46, 'حرف هوري (Ϩ ϩ)', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (172, 47, '🎓 الاختبار النهائي الشامل للمستوى الأول', 5, 1, 5, 4)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (157, 45, 'حرف أوميغا (أو طويلة) (Ⲱ ⲱ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (152, 44, 'حرف تاف (Ⲧ ⲧ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (137, 41, 'حرف إي (Ⲉ ⲉ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (147, 43, 'حرف كسي (Ⲝ ⲝ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (142, 42, 'حرف إيوتا (Ⲓ ⲓ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (162, 46, 'حرف جانجا (Ϫ ϫ)', 5, 1, 5, 5)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (170, 46, '🔄 مراجعة الوحدة 6', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (165, 41, '🔄 مراجعة الوحدة 1', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (166, 42, '🔄 مراجعة الوحدة 2', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (167, 43, '🔄 مراجعة الوحدة 3', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (168, 44, '🔄 مراجعة الوحدة 4', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (169, 45, '🔄 مراجعة الوحدة 5', 5, 1, 5, 6)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (770, 150, 'text_view', 'نبذة عن حرف رو (Ⲣ ⲣ)', 'Ⲣ ⲣ', 'رو', 'audio_coptic/18roo.mp3', '• اسم الحرف: رو
• نطق الحرف بالعربي: ر
• قواعد النطق: الحرف الثامن عشر. يُنطق حرف "ر" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲣⲏ
  - القبطي المعرب (نطقها): «ري»
  - المعنى بالعربية: شمس

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (842, 162, 'text_view', 'نبذة عن حرف جانجا (Ϫ ϫ)', 'Ϫ ϫ', 'جانجا', 'audio_coptic/30ganga.mp3', '• اسم الحرف: جانجا
• نطق الحرف بالعربي: ج (معطشة أو غير معطشة)
• قواعد النطق: الحرف الثلاثون. حرف مصري ديموطيقي أصيل. يُنطق "ج" معطشة قبل المتحرك للكسر، و"ج" غير معطشة في الحالات الأخرى.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϫⲉⲙⲫⲉϩ
  - القبطي المعرب (نطقها): «جيمفيه»
  - المعنى بالعربية: تفاح

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (758, 148, 'text_view', 'نبذة عن حرف أُو (قصيرة) (Ⲟ ⲟ)', 'Ⲟ ⲟ', 'أُو (قصيرة)', 'audio_coptic/16oo.mp3', '• اسم الحرف: أُو (قصيرة)
• نطق الحرف بالعربي: واو قصيرة مضمومة
• قواعد النطق: الحرف السادس عشر. حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲟⲩⲱⲙ
  - القبطي المعرب (نطقها): «أوؤم»
  - المعنى بالعربية: يأكل

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (686, 136, 'text_view', 'نبذة عن حرف دلدا (Ⲇ ⲇ)', 'Ⲇ ⲇ', 'دلدا', 'audio_coptic/4delta.mp3', '• اسم الحرف: دلدا
• نطق الحرف بالعربي: د أو ذ
• قواعد النطق: الحرف الرابع. يُنطق "د" في أسماء الأعلام والكلمات القبطية، و"ذ" في الكلمات اليونانية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲁⲇⲁⲙ
  - القبطي المعرب (نطقها): «آدام»
  - المعنى بالعربية: آدم

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (860, 165, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲁ ⲁ","right":"ألفا (ألف مفتوحة (أ))"},{"left":"Ⲃ ⲃ","right":"فيدا (ف أو ب)"},{"left":"Ⲅ ⲅ","right":"غاما (غ أو ج أو ن)"},{"left":"Ⲇ ⲇ","right":"دلدا (د أو ذ)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (680, 135, 'text_view', 'نبذة عن حرف غاما (Ⲅ ⲅ)', 'Ⲅ ⲅ', 'غاما', 'audio_coptic/3ghamma.mp3', '• اسم الحرف: غاما
• نطق الحرف بالعربي: غ أو ج أو ن
• قواعد النطق: الحرف الثالث. ينطق "غ" في الكلمات القبطية، و"ن" قبل الحلقيات، و"ج" معطشة قبل المتحرك للكسر في اليونانية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲅⲁⲗⲁ
  - القبطي المعرب (نطقها): «غالا»
  - المعنى بالعربية: لبن

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (698, 138, 'text_view', 'نبذة عن حرف سو (رقم ٦) (Ⲋ ⲋ)', 'Ⲋ ⲋ', 'سو (رقم ٦)', 'audio_coptic/6sow.mp3', '• اسم الحرف: سو (رقم ٦)
• نطق الحرف بالعربي: سو (الرقم 6)
• قواعد النطق: رمز ورقم عددي قبطي يدل على الرقم ستة (6). يوضع فوقه شرطة أفقية لتمييزه كرقم، وينطق "سو".
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲥⲟⲟⲩ ⲛ̀ϣⲕⲉⲗⲕⲓⲗ
  - القبطي المعرب (نطقها): «إسوؤو إن شكيلكيل»
  - المعنى بالعربية: 6 أجراس

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (734, 144, 'text_view', 'نبذة عن حرف لابدا (Ⲗ ⲗ)', 'Ⲗ ⲗ', 'لابدا', 'audio_coptic/12lavla.mp3', '• اسم الحرف: لابدا
• نطق الحرف بالعربي: ل
• قواعد النطق: الحرف الثاني عشر. يُنطق "ل" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲗⲁⲃⲟ
  - القبطي المعرب (نطقها): «لاڤو»
  - المعنى بالعربية: أسد

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (668, 133, 'text_view', 'نبذة عن حرف ألفا (Ⲁ ⲁ)', 'Ⲁ ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', '• اسم الحرف: ألفا
• نطق الحرف بالعربي: ألف مفتوحة (أ)
• قواعد النطق: الحرف الأول في الأبجدية القبطية. يُنطق دائماً مثل حرف الألف المفتوحة في العربية أو (A) في الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲁⲗⲱⲙ
  - القبطي المعرب (نطقها): «آلوم»
  - المعنى بالعربية: جبنة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (880, 169, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲩ ⲩ","right":"إبسيلون (ي أو ڤ أو و)"},{"left":"Ⲫ ⲫ","right":"في (ف)"},{"left":"Ⲭ ⲭ","right":"خي (خ أو ك أو ش)"},{"left":"Ⲯ ⲯ","right":"إبسي (بـ + س)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (854, 164, 'text_view', 'نبذة عن حرف تي (Ϯ ϯ)', 'Ϯ ϯ', 'تي', 'audio_coptic/32tee.mp3', '• اسم الحرف: تي
• نطق الحرف بالعربي: تـ + ي
• قواعد النطق: الحرف الثاني والثلاثون والأخير في الأبجدية القبطية. مقطع صوتي مركب ينطق تاء وياء معاً (تـ + ي = Ti).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϯⲙⲓ
  - القبطي المعرب (نطقها): «تيمي»
  - المعنى بالعربية: قرية

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (848, 163, 'text_view', 'نبذة عن حرف تشيما (Ϭ ϭ)', 'Ϭ ϭ', 'تشيما', 'audio_coptic/31chema.mp3', '• اسم الحرف: تشيما
• نطق الحرف بالعربي: تش
• قواعد النطق: الحرف الحادي والثلاثون. الحرف السادس من الحروف المصرية الديموطيقية، يُنطق تاء وشين معاً (تش) دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϭⲁϫ
  - القبطي المعرب (نطقها): «تشاج»
  - المعنى بالعربية: عصفور

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (794, 154, 'text_view', 'نبذة عن حرف في (Ⲫ ⲫ)', 'Ⲫ ⲫ', 'في', 'audio_coptic/22fi.mp3', '• اسم الحرف: في
• نطق الحرف بالعربي: ف
• قواعد النطق: الحرف الثاني والعشرون. يُنطق حرف "ف" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲫⲉⲃ
  - القبطي المعرب (نطقها): «أفيغ»
  - المعنى بالعربية: بطيخ

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (870, 167, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"Ⲗ ⲗ","right":"لابدا (ل)"},{"left":"Ⲙ ⲙ","right":"مي (م)"},{"left":"Ⲛ ⲛ","right":"ني (ن)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (716, 141, 'text_view', 'نبذة عن حرف ثيتا (Ⲑ ⲑ)', 'Ⲑ ⲑ', 'ثيتا', 'audio_coptic/9seta.mp3', '• اسم الحرف: ثيتا
• نطق الحرف بالعربي: ث أو ت
• قواعد النطق: الحرف التاسع. يُنطق "ث" دائماً، إلا إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) فيُنطق "ت".
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲕⲓⲑⲁⲣⲁ
  - القبطي المعرب (نطقها): «كيثارا»
  - المعنى بالعربية: قيثارة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (830, 160, 'text_view', 'نبذة عن حرف خاي (Ϧ ϧ)', 'Ϧ ϧ', 'خاي', 'audio_coptic/28khay.mp3', '• اسم الحرف: خاي
• نطق الحرف بالعربي: خ
• قواعد النطق: الحرف الثامن والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف "خ" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϧⲏⲃⲥ
  - القبطي المعرب (نطقها): «خيبس»
  - المعنى بالعربية: مصباح

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (728, 143, 'text_view', 'نبذة عن حرف كابا (Ⲕ ⲕ)', 'Ⲕ ⲕ', 'كابا', 'audio_coptic/11kapa.mp3', '• اسم الحرف: كابا
• نطق الحرف بالعربي: ك
• قواعد النطق: الحرف الحادي عشر في الأبجدية القبطية. يُنطق "ك" دائماً في جميع المواضع.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲕⲁϣ
  - القبطي المعرب (نطقها): «كاش»
  - المعنى بالعربية: قلم

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (875, 168, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲟ ⲟ","right":"أُو (قصيرة) (واو قصيرة مضمومة)"},{"left":"Ⲡ ⲡ","right":"بي (ب ثقيلة مشددة)"},{"left":"Ⲣ ⲣ","right":"رو (ر)"},{"left":"Ⲥ ⲥ","right":"سيما (س)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (818, 158, 'text_view', 'نبذة عن حرف شاي (Ϣ ϣ)', 'Ϣ ϣ', 'شاي', 'audio_coptic/26shay.mp3', '• اسم الحرف: شاي
• نطق الحرف بالعربي: ش
• قواعد النطق: الحرف السادس والعشرون. أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم. يُنطق حرف "ش" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϣⲁⲩ
  - القبطي المعرب (نطقها): «شاف»
  - المعنى بالعربية: قطة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (836, 161, 'text_view', 'نبذة عن حرف هوري (Ϩ ϩ)', 'Ϩ ϩ', 'هوري', 'audio_coptic/29hory.mp3', '• اسم الحرف: هوري
• نطق الحرف بالعربي: هـ
• قواعد النطق: الحرف التاسع والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف "هـ" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϩ̀ⲑⲟ
  - القبطي المعرب (نطقها): «إهثو»
  - المعنى بالعربية: حصان

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (722, 142, 'text_view', 'نبذة عن حرف إيوتا (Ⲓ ⲓ)', 'Ⲓ ⲓ', 'إيوتا', 'audio_coptic/10yota.mp3', '• اسم الحرف: إيوتا
• نطق الحرف بالعربي: ياء قصيرة
• قواعد النطق: الحرف العاشر. حرف متحرك يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف (I) في الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲓⲁⲗ
  - القبطي المعرب (نطقها): «إيال»
  - المعنى بالعربية: مراية

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (746, 146, 'text_view', 'نبذة عن حرف ني (Ⲛ ⲛ)', 'Ⲛ ⲛ', 'ني', 'audio_coptic/14ni.mp3', '• اسم الحرف: ني
• نطق الحرف بالعربي: ن
• قواعد النطق: الحرف الرابع عشر. يُنطق حرف "ن" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲉⲛ̀ⲕⲟⲧ
  - القبطي المعرب (نطقها): «إنكوت»
  - المعنى بالعربية: ينام

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (710, 140, 'text_view', 'نبذة عن حرف هيتا (Ⲏ ⲏ)', 'Ⲏ ⲏ', 'هيتا', 'audio_coptic/8eta.mp3', '• اسم الحرف: هيتا
• نطق الحرف بالعربي: ياء طويلة ممدودة
• قواعد النطق: الحرف الثامن. حرف متحرك للكسر يُنطق ياء ممدودة وطويلة مثل (ee) في كلمة meet.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲏ̀ⲡⲓ
  - القبطي المعرب (نطقها): «إيبي»
  - المعنى بالعربية: قبة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (788, 153, 'text_view', 'نبذة عن حرف إبسيلون (Ⲩ ⲩ)', 'Ⲩ ⲩ', 'إبسيلون', 'audio_coptic/21epselon.mp3', '• اسم الحرف: إبسيلون
• نطق الحرف بالعربي: ي أو ڤ أو و
• قواعد النطق: الحرف الحادي والعشرون. حرف متحرك ينطق "ڤ" بعد Ⲁ أو Ⲉ، وينطق "و" طويلة بعد Ⲟ (ⲟⲩ)، وينطق "ي" في الحالات الأخرى.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲩⲥⲓⲥ
  - القبطي المعرب (نطقها): «إيسيس»
  - المعنى بالعربية: مطر

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (782, 152, 'text_view', 'نبذة عن حرف تاف (Ⲧ ⲧ)', 'Ⲧ ⲧ', 'تاف', 'audio_coptic/20tav.mp3', '• اسم الحرف: تاف
• نطق الحرف بالعربي: ت
• قواعد النطق: الحرف العشرون في الأبجدية القبطية. يُنطق حرف "ت" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲧⲁⲙⲁⲩ
  - القبطي المعرب (نطقها): «تاماف»
  - المعنى بالعربية: أمي

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (764, 149, 'text_view', 'نبذة عن حرف بي (Ⲡ ⲡ)', 'Ⲡ ⲡ', 'بي', 'audio_coptic/17pee.mp3', '• اسم الحرف: بي
• نطق الحرف بالعربي: ب ثقيلة مشددة
• قواعد النطق: الحرف السابع عشر. يُنطق "ب" شديدة مشددة مثل حرف (P) في اللغة الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲡⲓⲱⲧ
  - القبطي المعرب (نطقها): «بايوت»
  - المعنى بالعربية: أبي

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (890, 171, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϭ ϭ","right":"تشيما (تش)"},{"left":"Ϯ ϯ","right":"تي (تـ + ي)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (800, 155, 'text_view', 'نبذة عن حرف خي (Ⲭ ⲭ)', 'Ⲭ ⲭ', 'خي', 'audio_coptic/23ki.mp3', '• اسم الحرف: خي
• نطق الحرف بالعربي: خ أو ك أو ش
• قواعد النطق: الحرف الثالث والعشرون. يُنطق "ك" في الكلمات القبطية، ويُنطق "خ" أو "ش" في الكلمات ذات الأصل اليوناني.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲭ̀ⲗⲓⲗ
  - القبطي المعرب (نطقها): «إخليل»
  - المعنى بالعربية: عقد

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (885, 170, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϣ ϣ","right":"شاي (ش)"},{"left":"Ϥ ϥ","right":"فاي (ف)"},{"left":"Ϧ ϧ","right":"خاي (خ)"},{"left":"Ϩ ϩ","right":"هوري (هـ)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (865, 166, 'match', 'صل بين كل حرف قبطي ونطقه بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲋ ⲋ","right":"سو (رقم ٦) (سو (الرقم 6))"},{"left":"Ⲍ ⲍ","right":"زاتا (ز)"},{"left":"Ⲏ ⲏ","right":"هيتا (ياء طويلة ممدودة)"},{"left":"Ⲑ ⲑ","right":"ثيتا (ث أو ت)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (895, 172, 'match', 'صل الحرف بنطقه الصحيح بالعربية', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲁ ⲁ","right":"ألفا (أ)"},{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"ⲭ ⲭ","right":"خي (خ/ك/ش)"},{"left":"Ϯ ϯ","right":"تي (تـ+ي)"}]'::jsonb, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (674, 134, 'text_view', 'نبذة عن حرف فيدا (Ⲃ ⲃ)', 'Ⲃ ⲃ', 'فيدا', 'audio_coptic/2veta.mp3', '• اسم الحرف: فيدا
• نطق الحرف بالعربي: ف أو ب
• قواعد النطق: الحرف الثاني. يُنطق "ف" إذا جاء بعده حرف متحرك، ويُنطق "ب" إذا لم يأتِ بعده متحرك أو في نهاية الكلمة.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲃⲱ
  - القبطي المعرب (نطقها): «ڤو»
  - المعنى بالعربية: شجرة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (812, 157, 'text_view', 'نبذة عن حرف أوميغا (أو طويلة) (Ⲱ ⲱ)', 'Ⲱ ⲱ', 'أوميغا (أو طويلة)', 'audio_coptic/25oo.mp3', '• اسم الحرف: أوميغا (أو طويلة)
• نطق الحرف بالعربي: واو طويلة ممدودة
• قواعد النطق: الحرف الخامس والعشرون. آخر الحروف المأخوذة من اليونانية. يُنطق واواً طويلة ومفتوحة (Ō).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲧⲁⲥⲱⲛⲓ
  - القبطي المعرب (نطقها): «تاسوني»
  - المعنى بالعربية: أختي

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (776, 151, 'text_view', 'نبذة عن حرف سيما (Ⲥ ⲥ)', 'Ⲥ ⲥ', 'سيما', 'audio_coptic/19sema.mp3', '• اسم الحرف: سيما
• نطق الحرف بالعربي: س
• قواعد النطق: الحرف التاسع عشر. يُنطق حرف "س" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲡⲁⲥⲟⲛ
  - القبطي المعرب (نطقها): «باصون»
  - المعنى بالعربية: أخي

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (806, 156, 'text_view', 'نبذة عن حرف إبسي (Ⲯ ⲯ)', 'Ⲯ ⲯ', 'إبسي', 'audio_coptic/24psi.mp3', '• اسم الحرف: إبسي
• نطق الحرف بالعربي: بـ + س
• قواعد النطق: الحرف الرابع والعشرون. حرف مركب يُنطق باء وسين معاً في صوت واحد (بـ + س = Ps).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ
  - القبطي المعرب (نطقها): «إبسيت إن كينكين»
  - المعنى بالعربية: 9 دفوف

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (692, 137, 'text_view', 'نبذة عن حرف إي (Ⲉ ⲉ)', 'Ⲉ ⲉ', 'إي', 'audio_coptic/5ei.mp3', '• اسم الحرف: إي
• نطق الحرف بالعربي: إي خفيفة
• قواعد النطق: الحرف الخامس. حرف متحرك خفيف ينطق مثل حرف (E) في الإنجليزية (فتحة مائلة للكسر).
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲉ̀ⲣϣⲱ
  - القبطي المعرب (نطقها): «إرجو»
  - المعنى بالعربية: دجاجة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (704, 139, 'text_view', 'نبذة عن حرف زاتا (Ⲍ ⲍ)', 'Ⲍ ⲍ', 'زاتا', 'audio_coptic/7zeta.mp3', '• اسم الحرف: زاتا
• نطق الحرف بالعربي: ز
• قواعد النطق: الحرف السابع في الأبجدية القبطية. يُنطق دائماً حرف "ز" مثل حرف (Z) في الإنجليزية.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲍⲱⲙⲟⲥ
  - القبطي المعرب (نطقها): «أزموس»
  - المعنى بالعربية: شوربة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (752, 147, 'text_view', 'نبذة عن حرف كسي (Ⲝ ⲝ)', 'Ⲝ ⲝ', 'كسي', 'audio_coptic/15axsy.mp3', '• اسم الحرف: كسي
• نطق الحرف بالعربي: كـ + س
• قواعد النطق: الحرف الخامس عشر. حرف مركب يُنطق كاف وسين معاً (كـ + س = X) في صوت واحد.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲝⲟⲩⲏ
  - القبطي المعرب (نطقها): «إكسومي»
  - المعنى بالعربية: مسطرة

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (824, 159, 'text_view', 'نبذة عن حرف فاي (Ϥ ϥ)', 'Ϥ ϥ', 'فاي', 'audio_coptic/27fay.mp3', '• اسم الحرف: فاي
• نطق الحرف بالعربي: ف
• قواعد النطق: الحرف السابع والعشرون. حرف مصري ديموطيقي أصيل يُنطق "ف".
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ϥⲱⲓ
  - القبطي المعرب (نطقها): «فوي»
  - المعنى بالعربية: شعر

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (740, 145, 'text_view', 'نبذة عن حرف مي (Ⲙ ⲙ)', 'Ⲙ ⲙ', 'مي', 'audio_coptic/13mi.mp3', '• اسم الحرف: مي
• نطق الحرف بالعربي: م
• قواعد النطق: الحرف الثالث عشر. يُنطق حرف "م" دائماً.
────────────────────
• كلمة تطبيقية على الحرف:
  - الكلمة بالقبطية: ⲙⲁⲛϩⲟⲛ
  - القبطي المعرب (نطقها): «مانهون»
  - المعنى بالعربية: برتقال

(اضغط على زر الصوت للاستماع لنطق الحرف)', NULL, NULL, TRUE, 1)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (813, 157, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲱ واستمع لنطقه', 'Ⲱ', 'أوميغا (أو طويلة) كابيتال', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (681, 135, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲅ واستمع لنطقه', 'Ⲅ', 'غاما كابيتال', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (669, 133, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲁ واستمع لنطقه', 'Ⲁ', 'ألفا كابيتال', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (871, 167, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'كابا', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (795, 154, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲫ واستمع لنطقه', 'Ⲫ', 'في كابيتال', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (855, 164, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϯ واستمع لنطقه', 'Ϯ', 'تي كابيتال', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (843, 162, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϫ واستمع لنطقه', 'Ϫ', 'جانجا كابيتال', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (831, 160, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϧ واستمع لنطقه', 'Ϧ', 'خاي كابيتال', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (819, 158, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϣ واستمع لنطقه', 'Ϣ', 'شاي كابيتال', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (866, 166, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'سو (رقم ٦)', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (807, 156, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲯ واستمع لنطقه', 'Ⲯ', 'إبسي كابيتال', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (741, 145, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲙ واستمع لنطقه', 'Ⲙ', 'مي كابيتال', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (886, 170, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'شاي', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (876, 168, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'أُو (قصيرة)', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (735, 144, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲗ واستمع لنطقه', 'Ⲗ', 'لابدا كابيتال', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (675, 134, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲃ واستمع لنطقه', 'Ⲃ', 'فيدا كابيتال', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (747, 146, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲛ واستمع لنطقه', 'Ⲛ', 'ني كابيتال', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (687, 136, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲇ واستمع لنطقه', 'Ⲇ', 'دلدا كابيتال', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (699, 138, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲋ واستمع لنطقه', 'Ⲋ', 'سو (رقم ٦) كابيتال', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (837, 161, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϩ واستمع لنطقه', 'Ϩ', 'هوري كابيتال', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (849, 163, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϭ واستمع لنطقه', 'Ϭ', 'تشيما كابيتال', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (711, 140, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲏ واستمع لنطقه', 'Ⲏ', 'هيتا كابيتال', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (693, 137, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲉ واستمع لنطقه', 'Ⲉ', 'إي كابيتال', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (705, 139, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲍ واستمع لنطقه', 'Ⲍ', 'زاتا كابيتال', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (717, 141, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲑ واستمع لنطقه', 'Ⲑ', 'ثيتا كابيتال', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (753, 147, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲝ واستمع لنطقه', 'Ⲝ', 'كسي كابيتال', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (765, 149, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲡ واستمع لنطقه', 'Ⲡ', 'بي كابيتال', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (777, 151, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲥ واستمع لنطقه', 'Ⲥ', 'سيما كابيتال', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (789, 153, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲩ واستمع لنطقه', 'Ⲩ', 'إبسيلون كابيتال', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (723, 142, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲓ واستمع لنطقه', 'Ⲓ', 'إيوتا كابيتال', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (729, 143, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲕ واستمع لنطقه', 'Ⲕ', 'كابا كابيتال', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (881, 169, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'إبسيلون', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (783, 152, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲧ واستمع لنطقه', 'Ⲧ', 'تاف كابيتال', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (771, 150, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲣ واستمع لنطقه', 'Ⲣ', 'رو كابيتال', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (759, 148, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲟ واستمع لنطقه', 'Ⲟ', 'أُو (قصيرة) كابيتال', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (861, 165, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'ألفا', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (891, 171, 'listen', 'استمع إلى نطق الحرف ثم اختر الحرف المطابق', NULL, 'تشيما', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (896, 172, 'listen', 'استمع واختر الحرف الصحيح', NULL, 'ألفا', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (801, 155, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ⲭ واستمع لنطقه', 'Ⲭ', 'خي كابيتال', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (825, 159, 'trace', 'تتبّع كتابة الحرف الكبير (كابيتال): Ϥ واستمع لنطقه', 'Ϥ', 'فاي كابيتال', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 2)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (712, 140, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲏ واستمع لنطقه', 'ⲏ', 'هيتا سمول', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (718, 141, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲑ واستمع لنطقه', 'ⲑ', 'ثيتا سمول', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (676, 134, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲃ واستمع لنطقه', 'ⲃ', 'فيدا سمول', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (808, 156, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲯ واستمع لنطقه', 'ⲯ', 'إبسي سمول', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (820, 158, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϣ واستمع لنطقه', 'ϣ', 'شاي سمول', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (832, 160, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϧ واستمع لنطقه', 'ϧ', 'خاي سمول', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (844, 162, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϫ واستمع لنطقه', 'ϫ', 'جانجا سمول', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (856, 164, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϯ واستمع لنطقه', 'ϯ', 'تي سمول', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (706, 139, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲍ واستمع لنطقه', 'ⲍ', 'زاتا سمول', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (867, 166, 'select', 'ما معنى الكلمة: ⲍⲱⲙⲟⲥ؟ (المعرب: «أزموس»)', 'ⲍⲱⲙⲟⲥ', 'أزموس', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (694, 137, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲉ واستمع لنطقه', 'ⲉ', 'إي سمول', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (802, 155, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲭ واستمع لنطقه', 'ⲭ', 'خي سمول', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (814, 157, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲱ واستمع لنطقه', 'ⲱ', 'أوميغا (أو طويلة) سمول', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (826, 159, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϥ واستمع لنطقه', 'ϥ', 'فاي سمول', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (838, 161, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϩ واستمع لنطقه', 'ϩ', 'هوري سمول', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (850, 163, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ϭ واستمع لنطقه', 'ϭ', 'تشيما سمول', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (790, 153, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲩ واستمع لنطقه', 'ⲩ', 'إبسيلون سمول', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (778, 151, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲥ واستمع لنطقه', 'ⲥ', 'سيما سمول', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (766, 149, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲡ واستمع لنطقه', 'ⲡ', 'بي سمول', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (754, 147, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲝ واستمع لنطقه', 'ⲝ', 'كسي سمول', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (748, 146, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲛ واستمع لنطقه', 'ⲛ', 'ني سمول', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (897, 172, 'select', 'ما معنى الكلمة القبطية: ⲁⲗⲱⲙ؟ (المعرب: «آلوم»)', 'ⲁⲗⲱⲙ', 'آلوم', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (682, 135, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲅ واستمع لنطقه', 'ⲅ', 'غاما سمول', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (796, 154, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲫ واستمع لنطقه', 'ⲫ', 'في سمول', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (670, 133, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲁ واستمع لنطقه', 'ⲁ', 'ألفا سمول', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (872, 167, 'select', 'ما معنى الكلمة: ⲗⲁⲃⲟ؟ (المعرب: «لاڤو»)', 'ⲗⲁⲃⲟ', 'لاڤو', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (882, 169, 'select', 'ما معنى الكلمة: ⲫⲉⲃ؟ (المعرب: «أفيغ»)', 'ⲫⲉⲃ', 'أفيغ', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (688, 136, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲇ واستمع لنطقه', 'ⲇ', 'دلدا سمول', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (700, 138, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲋ واستمع لنطقه', 'ⲋ', 'سو (رقم ٦) سمول', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (730, 143, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲕ واستمع لنطقه', 'ⲕ', 'كابا سمول', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (724, 142, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲓ واستمع لنطقه', 'ⲓ', 'إيوتا سمول', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (784, 152, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲧ واستمع لنطقه', 'ⲧ', 'تاف سمول', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (772, 150, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲣ واستمع لنطقه', 'ⲣ', 'رو سمول', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (760, 148, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲟ واستمع لنطقه', 'ⲟ', 'أُو (قصيرة) سمول', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (742, 145, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲙ واستمع لنطقه', 'ⲙ', 'مي سمول', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (862, 165, 'select', 'ما معنى الكلمة: ⲃⲱ؟ (المعرب: «ڤو»)', 'ⲃⲱ', 'ڤو', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (877, 168, 'select', 'ما معنى الكلمة: ⲡⲓⲱⲧ؟ (المعرب: «بايوت»)', 'ⲡⲓⲱⲧ', 'بايوت', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (892, 171, 'select', 'ما معنى الكلمة: ϯⲙⲓ؟ (المعرب: «تيمي»)', 'ϯⲙⲓ', 'تيمي', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (736, 144, 'trace', 'تتبّع كتابة الحرف الصغير (سمول): ⲗ واستمع لنطقه', 'ⲗ', 'لابدا سمول', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (887, 170, 'select', 'ما معنى الكلمة: ϥⲱⲓ؟ (المعرب: «فوي»)', 'ϥⲱⲓ', 'فوي', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 3)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (791, 153, 'read_select', 'ما هو نطق الحرف Ⲩ بالعربية؟', 'Ⲩ', 'إبسيلون', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (695, 137, 'read_select', 'ما هو نطق الحرف Ⲉ بالعربية؟', 'Ⲉ', 'إي', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (707, 139, 'read_select', 'ما هو نطق الحرف Ⲍ بالعربية؟', 'Ⲍ', 'زاتا', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (888, 170, 'write', 'رتب حروف الكلمة: تفاح (المعرب: «جيمفيه»)', 'ϫⲉⲙⲫⲉϩ', 'جيمفيه', 'audio_coptic/30ganga.mp3', 'ϫⲉⲙⲫⲉϩ', '["ϫ","ⲉ","ⲙ","ⲫ","ⲉ","ϩ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (713, 140, 'read_select', 'ما هو نطق الحرف Ⲏ بالعربية؟', 'Ⲏ', 'هيتا', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (725, 142, 'read_select', 'ما هو نطق الحرف Ⲓ بالعربية؟', 'Ⲓ', 'إيوتا', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (797, 154, 'read_select', 'ما هو نطق الحرف Ⲫ بالعربية؟', 'Ⲫ', 'في', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (803, 155, 'read_select', 'ما هو نطق الحرف Ⲭ بالعربية؟', 'Ⲭ', 'خي', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (815, 157, 'read_select', 'ما هو نطق الحرف Ⲱ بالعربية؟', 'Ⲱ', 'أوميغا (أو طويلة)', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (827, 159, 'read_select', 'ما هو نطق الحرف Ϥ بالعربية؟', 'Ϥ', 'فاي', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (839, 161, 'read_select', 'ما هو نطق الحرف Ϩ بالعربية؟', 'Ϩ', 'هوري', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (851, 163, 'read_select', 'ما هو نطق الحرف Ϭ بالعربية؟', 'Ϭ', 'تشيما', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (898, 172, 'select', 'كم عدد حروف الأبجدية القبطية كاملة؟', NULL, NULL, NULL, NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (755, 147, 'read_select', 'ما هو نطق الحرف Ⲝ بالعربية؟', 'Ⲝ', 'كسي', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (767, 149, 'read_select', 'ما هو نطق الحرف Ⲡ بالعربية؟', 'Ⲡ', 'بي', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (779, 151, 'read_select', 'ما هو نطق الحرف Ⲥ بالعربية؟', 'Ⲥ', 'سيما', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (809, 156, 'read_select', 'ما هو نطق الحرف Ⲯ بالعربية؟', 'Ⲯ', 'إبسي', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (821, 158, 'read_select', 'ما هو نطق الحرف Ϣ بالعربية؟', 'Ϣ', 'شاي', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (833, 160, 'read_select', 'ما هو نطق الحرف Ϧ بالعربية؟', 'Ϧ', 'خاي', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (845, 162, 'read_select', 'ما هو نطق الحرف Ϫ بالعربية؟', 'Ϫ', 'جانجا', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (857, 164, 'read_select', 'ما هو نطق الحرف Ϯ بالعربية؟', 'Ϯ', 'تي', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (689, 136, 'read_select', 'ما هو نطق الحرف Ⲇ بالعربية؟', 'Ⲇ', 'دلدا', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (701, 138, 'read_select', 'ما هو نطق الحرف Ⲋ بالعربية؟', 'Ⲋ', 'سو (رقم ٦)', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (761, 148, 'read_select', 'ما هو نطق الحرف Ⲟ بالعربية؟', 'Ⲟ', 'أُو (قصيرة)', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (773, 150, 'read_select', 'ما هو نطق الحرف Ⲣ بالعربية؟', 'Ⲣ', 'رو', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (785, 152, 'read_select', 'ما هو نطق الحرف Ⲧ بالعربية؟', 'Ⲧ', 'تاف', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (863, 165, 'write', 'رتب حروف الكلمة: دجاجة (المعرب: «إرجو»)', 'ⲉ̀ⲣϣⲱ', 'إرجو', 'audio_coptic/5ei.mp3', 'ⲉ̀ⲣϣⲱ', '["ⲉ","̀","ⲣ","ϣ","ⲱ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (737, 144, 'read_select', 'ما هو نطق الحرف Ⲗ بالعربية؟', 'Ⲗ', 'لابدا', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (868, 166, 'write', 'رتب حروف الكلمة: مراية (المعرب: «إيال»)', 'ⲓⲁⲗ', 'إيال', 'audio_coptic/10yota.mp3', 'ⲓⲁⲗ', '["ⲓ","ⲁ","ⲗ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (719, 141, 'read_select', 'ما هو نطق الحرف Ⲑ بالعربية؟', 'Ⲑ', 'ثيتا', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (731, 143, 'read_select', 'ما هو نطق الحرف Ⲕ بالعربية؟', 'Ⲕ', 'كابا', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (878, 168, 'write', 'رتب حروف الكلمة: أمي (المعرب: «تاماف»)', 'ⲧⲁⲙⲁⲩ', 'تاماف', 'audio_coptic/20tav.mp3', 'ⲧⲁⲙⲁⲩ', '["ⲧ","ⲁ","ⲙ","ⲁ","ⲩ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (873, 167, 'write', 'رتب حروف الكلمة: مسطرة (المعرب: «إكسومي»)', 'ⲝⲟⲩⲏ', 'إكسومي', 'audio_coptic/15axsy.mp3', 'ⲝⲟⲩⲏ', '["ⲝ","ⲟ","ⲩ","ⲏ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (743, 145, 'read_select', 'ما هو نطق الحرف Ⲙ بالعربية؟', 'Ⲙ', 'مي', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (883, 169, 'write', 'رتب حروف الكلمة: أختي (المعرب: «تاسوني»)', 'ⲧⲁⲥⲱⲛⲓ', 'تاسوني', 'audio_coptic/25oo.mp3', 'ⲧⲁⲥⲱⲛⲓ', '["ⲧ","ⲁ","ⲥ","ⲱ","ⲛ","ⲓ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (683, 135, 'read_select', 'ما هو نطق الحرف Ⲅ بالعربية؟', 'Ⲅ', 'غاما', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (671, 133, 'read_select', 'ما هو نطق الحرف Ⲁ بالعربية؟', 'Ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (749, 146, 'read_select', 'ما هو نطق الحرف Ⲛ بالعربية؟', 'Ⲛ', 'ني', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (893, 171, 'write', 'رتب حروف الكلمة: قرية (المعرب: «تيمي»)', 'ϯⲙⲓ', 'تيمي', 'audio_coptic/32tee.mp3', 'ϯⲙⲓ', '["ϯ","ⲙ","ⲓ"]'::jsonb, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (677, 134, 'read_select', 'ما هو نطق الحرف Ⲃ بالعربية؟', 'Ⲃ', 'فيدا', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 4)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (816, 157, 'select', 'ما معنى الكلمة القبطية: ⲧⲁⲥⲱⲛⲓ؟ (المعرب: «تاسوني»)', 'ⲧⲁⲥⲱⲛⲓ', 'تاسوني', 'audio_coptic/25oo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (869, 166, 'read_select', 'ما هو نطق الحرف القبطي: Ⲏ؟', 'Ⲏ', 'هيتا', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (768, 149, 'select', 'ما معنى الكلمة القبطية: ⲡⲓⲱⲧ؟ (المعرب: «بايوت»)', 'ⲡⲓⲱⲧ', 'بايوت', 'audio_coptic/17pee.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (828, 159, 'select', 'ما معنى الكلمة القبطية: ϥⲱⲓ؟ (المعرب: «فوي»)', 'ϥⲱⲓ', 'فوي', 'audio_coptic/27fay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (804, 155, 'select', 'ما معنى الكلمة القبطية: ⲭ̀ⲗⲓⲗ؟ (المعرب: «إخليل»)', 'ⲭ̀ⲗⲓⲗ', 'إخليل', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (786, 152, 'select', 'ما معنى الكلمة القبطية: ⲧⲁⲙⲁⲩ؟ (المعرب: «تاماف»)', 'ⲧⲁⲙⲁⲩ', 'تاماف', 'audio_coptic/20tav.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (702, 138, 'select', 'ما معنى الكلمة القبطية: ⲥⲟⲟⲩ ⲛ̀ϣⲕⲉⲗⲕⲓⲗ؟ (المعرب: «إسوؤو إن شكيلكيل»)', 'ⲥⲟⲟⲩ ⲛ̀ϣⲕⲉⲗⲕⲓⲗ', 'إسوؤو إن شكيلكيل', 'audio_coptic/6sow.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (879, 168, 'read_select', 'ما هو نطق الحرف القبطي: Ⲣ؟', 'Ⲣ', 'رو', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (774, 150, 'select', 'ما معنى الكلمة القبطية: ⲣⲏ؟ (المعرب: «ري»)', 'ⲣⲏ', 'ري', 'audio_coptic/18roo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (762, 148, 'select', 'ما معنى الكلمة القبطية: ⲟⲩⲱⲙ؟ (المعرب: «أوؤم»)', 'ⲟⲩⲱⲙ', 'أوؤم', 'audio_coptic/16oo.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (750, 146, 'select', 'ما معنى الكلمة القبطية: ⲉⲛ̀ⲕⲟⲧ؟ (المعرب: «إنكوت»)', 'ⲉⲛ̀ⲕⲟⲧ', 'إنكوت', 'audio_coptic/14ni.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (858, 164, 'select', 'ما معنى الكلمة القبطية: ϯⲙⲓ؟ (المعرب: «تيمي»)', 'ϯⲙⲓ', 'تيمي', 'audio_coptic/32tee.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (846, 162, 'select', 'ما معنى الكلمة القبطية: ϫⲉⲙⲫⲉϩ؟ (المعرب: «جيمفيه»)', 'ϫⲉⲙⲫⲉϩ', 'جيمفيه', 'audio_coptic/30ganga.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (894, 171, 'read_select', 'ما هو نطق الحرف القبطي: Ϭ؟', 'Ϭ', 'تشيما', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (834, 160, 'select', 'ما معنى الكلمة القبطية: ϧⲏⲃⲥ؟ (المعرب: «خيبس»)', 'ϧⲏⲃⲥ', 'خيبس', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (822, 158, 'select', 'ما معنى الكلمة القبطية: ϣⲁⲩ؟ (المعرب: «شاف»)', 'ϣⲁⲩ', 'شاف', 'audio_coptic/26shay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (810, 156, 'select', 'ما معنى الكلمة القبطية: ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ؟ (المعرب: «إبسيت إن كينكين»)', 'ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ', 'إبسيت إن كينكين', 'audio_coptic/24psi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (690, 136, 'select', 'ما معنى الكلمة القبطية: ⲁⲇⲁⲙ؟ (المعرب: «آدام»)', 'ⲁⲇⲁⲙ', 'آدام', 'audio_coptic/4delta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (889, 170, 'read_select', 'ما هو نطق الحرف القبطي: Ϧ؟', 'Ϧ', 'خاي', 'audio_coptic/28khay.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (798, 154, 'select', 'ما معنى الكلمة القبطية: ⲫⲉⲃ؟ (المعرب: «أفيغ»)', 'ⲫⲉⲃ', 'أفيغ', 'audio_coptic/22fi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (899, 172, 'write', 'رتب حروف الكلمة القبطية: جبنة (المعرب: «آلوم») [ⲁⲗⲱⲙ]', 'ⲁⲗⲱⲙ', 'آلوم', 'audio_coptic/1alfa.mp3', 'ⲁⲗⲱⲙ', '["ⲁ","ⲗ","ⲱ","ⲙ"]'::jsonb, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (672, 133, 'select', 'ما معنى الكلمة القبطية: ⲁⲗⲱⲙ؟ (المعرب: «آلوم»)', 'ⲁⲗⲱⲙ', 'آلوم', 'audio_coptic/1alfa.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (678, 134, 'select', 'ما معنى الكلمة القبطية: ⲃⲱ؟ (المعرب: «ڤو»)', 'ⲃⲱ', 'ڤو', 'audio_coptic/2veta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (744, 145, 'select', 'ما معنى الكلمة القبطية: ⲙⲁⲛϩⲟⲛ؟ (المعرب: «مانهون»)', 'ⲙⲁⲛϩⲟⲛ', 'مانهون', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (684, 135, 'select', 'ما معنى الكلمة القبطية: ⲅⲁⲗⲁ؟ (المعرب: «غالا»)', 'ⲅⲁⲗⲁ', 'غالا', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (732, 143, 'select', 'ما معنى الكلمة القبطية: ⲕⲁϣ؟ (المعرب: «كاش»)', 'ⲕⲁϣ', 'كاش', 'audio_coptic/11kapa.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (720, 141, 'select', 'ما معنى الكلمة القبطية: ⲕⲓⲑⲁⲣⲁ؟ (المعرب: «كيثارا»)', 'ⲕⲓⲑⲁⲣⲁ', 'كيثارا', 'audio_coptic/9seta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (780, 151, 'select', 'ما معنى الكلمة القبطية: ⲡⲁⲥⲟⲛ؟ (المعرب: «باصون»)', 'ⲡⲁⲥⲟⲛ', 'باصون', 'audio_coptic/19sema.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (864, 165, 'read_select', 'ما هو نطق الحرف القبطي: Ⲅ؟', 'Ⲅ', 'غاما', 'audio_coptic/3ghamma.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (874, 167, 'read_select', 'ما هو نطق الحرف القبطي: Ⲙ؟', 'Ⲙ', 'مي', 'audio_coptic/13mi.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (708, 139, 'select', 'ما معنى الكلمة القبطية: ⲍⲱⲙⲟⲥ؟ (المعرب: «أزموس»)', 'ⲍⲱⲙⲟⲥ', 'أزموس', 'audio_coptic/7zeta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (714, 140, 'select', 'ما معنى الكلمة القبطية: ⲏ̀ⲡⲓ؟ (المعرب: «إيبي»)', 'ⲏ̀ⲡⲓ', 'إيبي', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (792, 153, 'select', 'ما معنى الكلمة القبطية: ⲩⲥⲓⲥ؟ (المعرب: «إيسيس»)', 'ⲩⲥⲓⲥ', 'إيسيس', 'audio_coptic/21epselon.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (726, 142, 'select', 'ما معنى الكلمة القبطية: ⲓⲁⲗ؟ (المعرب: «إيال»)', 'ⲓⲁⲗ', 'إيال', 'audio_coptic/10yota.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (738, 144, 'select', 'ما معنى الكلمة القبطية: ⲗⲁⲃⲟ؟ (المعرب: «لاڤو»)', 'ⲗⲁⲃⲟ', 'لاڤو', 'audio_coptic/12lavla.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (756, 147, 'select', 'ما معنى الكلمة القبطية: ⲝⲟⲩⲏ؟ (المعرب: «إكسومي»)', 'ⲝⲟⲩⲏ', 'إكسومي', 'audio_coptic/15axsy.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (696, 137, 'select', 'ما معنى الكلمة القبطية: ⲉ̀ⲣϣⲱ؟ (المعرب: «إرجو»)', 'ⲉ̀ⲣϣⲱ', 'إرجو', 'audio_coptic/5ei.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (884, 169, 'read_select', 'ما هو نطق الحرف القبطي: Ⲭ؟', 'Ⲭ', 'خي', 'audio_coptic/23ki.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (852, 163, 'select', 'ما معنى الكلمة القبطية: ϭⲁϫ؟ (المعرب: «تشاج»)', 'ϭⲁϫ', 'تشاج', 'audio_coptic/31chema.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (840, 161, 'select', 'ما معنى الكلمة القبطية: ϩ̀ⲑⲟ؟ (المعرب: «إهثو»)', 'ϩ̀ⲑⲟ', 'إهثو', 'audio_coptic/29hory.mp3', NULL, NULL, NULL, TRUE, 5)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (763, 148, 'write', 'رتب حروف الكلمة القبطية لتكوين: يأكل (المعرب: «أوؤم»)', 'ⲟⲩⲱⲙ', 'أوؤم', 'audio_coptic/16oo.mp3', 'ⲟⲩⲱⲙ', '["ⲟ","ⲩ","ⲱ","ⲙ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (679, 134, 'write', 'رتب حروف الكلمة القبطية لتكوين: شجرة (المعرب: «ڤو»)', 'ⲃⲱ', 'ڤو', 'audio_coptic/2veta.mp3', 'ⲃⲱ', '["ⲃ","ⲱ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (751, 146, 'write', 'رتب حروف الكلمة القبطية لتكوين: ينام (المعرب: «إنكوت»)', 'ⲉⲛ̀ⲕⲟⲧ', 'إنكوت', 'audio_coptic/14ni.mp3', 'ⲉⲛ̀ⲕⲟⲧ', '["ⲉ","ⲛ","̀","ⲕ","ⲟ","ⲧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (703, 138, 'write', 'رتب حروف الكلمة القبطية لتكوين: 6 أجراس (المعرب: «إسوؤو إن شكيلكيل»)', 'ⲥⲟⲟⲩ ⲛ̀ϣⲕⲉⲗⲕⲓⲗ', 'إسوؤو إن شكيلكيل', 'audio_coptic/6sow.mp3', 'ⲥⲟⲟⲩ ⲛ̀ϣⲕⲉⲗⲕⲓⲗ', '["ⲥ","ⲟ","ⲟ","ⲩ"," ","ⲛ","̀","ϣ","ⲕ","ⲉ","ⲗ","ⲕ","ⲓ","ⲗ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (841, 161, 'write', 'رتب حروف الكلمة القبطية لتكوين: حصان (المعرب: «إهثو»)', 'ϩ̀ⲑⲟ', 'إهثو', 'audio_coptic/29hory.mp3', 'ϩ̀ⲑⲟ', '["ϩ","̀","ⲑ","ⲟ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (733, 143, 'write', 'رتب حروف الكلمة القبطية لتكوين: قلم (المعرب: «كاش»)', 'ⲕⲁϣ', 'كاش', 'audio_coptic/11kapa.mp3', 'ⲕⲁϣ', '["ⲕ","ⲁ","ϣ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (721, 141, 'write', 'رتب حروف الكلمة القبطية لتكوين: قيثارة (المعرب: «كيثارا»)', 'ⲕⲓⲑⲁⲣⲁ', 'كيثارا', 'audio_coptic/9seta.mp3', 'ⲕⲓⲑⲁⲣⲁ', '["ⲕ","ⲓ","ⲑ","ⲁ","ⲣ","ⲁ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (691, 136, 'write', 'رتب حروف الكلمة القبطية لتكوين: آدم (المعرب: «آدام»)', 'ⲁⲇⲁⲙ', 'آدام', 'audio_coptic/4delta.mp3', 'ⲁⲇⲁⲙ', '["ⲁ","ⲇ","ⲁ","ⲙ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (859, 164, 'write', 'رتب حروف الكلمة القبطية لتكوين: قرية (المعرب: «تيمي»)', 'ϯⲙⲓ', 'تيمي', 'audio_coptic/32tee.mp3', 'ϯⲙⲓ', '["ϯ","ⲙ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (697, 137, 'write', 'رتب حروف الكلمة القبطية لتكوين: دجاجة (المعرب: «إرجو»)', 'ⲉ̀ⲣϣⲱ', 'إرجو', 'audio_coptic/5ei.mp3', 'ⲉ̀ⲣϣⲱ', '["ⲉ","̀","ⲣ","ϣ","ⲱ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (847, 162, 'write', 'رتب حروف الكلمة القبطية لتكوين: تفاح (المعرب: «جيمفيه»)', 'ϫⲉⲙⲫⲉϩ', 'جيمفيه', 'audio_coptic/30ganga.mp3', 'ϫⲉⲙⲫⲉϩ', '["ϫ","ⲉ","ⲙ","ⲫ","ⲉ","ϩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (745, 145, 'write', 'رتب حروف الكلمة القبطية لتكوين: برتقال (المعرب: «مانهون»)', 'ⲙⲁⲛϩⲟⲛ', 'مانهون', 'audio_coptic/13mi.mp3', 'ⲙⲁⲛϩⲟⲛ', '["ⲙ","ⲁ","ⲛ","ϩ","ⲟ","ⲛ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (835, 160, 'write', 'رتب حروف الكلمة القبطية لتكوين: مصباح (المعرب: «خيبس»)', 'ϧⲏⲃⲥ', 'خيبس', 'audio_coptic/28khay.mp3', 'ϧⲏⲃⲥ', '["ϧ","ⲏ","ⲃ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (829, 159, 'write', 'رتب حروف الكلمة القبطية لتكوين: شعر (المعرب: «فوي»)', 'ϥⲱⲓ', 'فوي', 'audio_coptic/27fay.mp3', 'ϥⲱⲓ', '["ϥ","ⲱ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (823, 158, 'write', 'رتب حروف الكلمة القبطية لتكوين: قطة (المعرب: «شاف»)', 'ϣⲁⲩ', 'شاف', 'audio_coptic/26shay.mp3', 'ϣⲁⲩ', '["ϣ","ⲁ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (775, 150, 'write', 'رتب حروف الكلمة القبطية لتكوين: شمس (المعرب: «ري»)', 'ⲣⲏ', 'ري', 'audio_coptic/18roo.mp3', 'ⲣⲏ', '["ⲣ","ⲏ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (811, 156, 'write', 'رتب حروف الكلمة القبطية لتكوين: 9 دفوف (المعرب: «إبسيت إن كينكين»)', 'ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ', 'إبسيت إن كينكين', 'audio_coptic/24psi.mp3', 'ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ', '["ⲯ","ⲓ","ⲧ"," ","ⲛ","̀","ⲕ","ⲉ","ⲛ","ⲕ","ⲉ","ⲛ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (673, 133, 'write', 'رتب حروف الكلمة القبطية لتكوين: جبنة (المعرب: «آلوم»)', 'ⲁⲗⲱⲙ', 'آلوم', 'audio_coptic/1alfa.mp3', 'ⲁⲗⲱⲙ', '["ⲁ","ⲗ","ⲱ","ⲙ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (799, 154, 'write', 'رتب حروف الكلمة القبطية لتكوين: بطيخ (المعرب: «أفيغ»)', 'ⲫⲉⲃ', 'أفيغ', 'audio_coptic/22fi.mp3', 'ⲫⲉⲃ', '["ⲫ","ⲉ","ⲃ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (685, 135, 'write', 'رتب حروف الكلمة القبطية لتكوين: لبن (المعرب: «غالا»)', 'ⲅⲁⲗⲁ', 'غالا', 'audio_coptic/3ghamma.mp3', 'ⲅⲁⲗⲁ', '["ⲅ","ⲁ","ⲗ","ⲁ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (817, 157, 'write', 'رتب حروف الكلمة القبطية لتكوين: أختي (المعرب: «تاسوني»)', 'ⲧⲁⲥⲱⲛⲓ', 'تاسوني', 'audio_coptic/25oo.mp3', 'ⲧⲁⲥⲱⲛⲓ', '["ⲧ","ⲁ","ⲥ","ⲱ","ⲛ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (793, 153, 'write', 'رتب حروف الكلمة القبطية لتكوين: مطر (المعرب: «إيسيس»)', 'ⲩⲥⲓⲥ', 'إيسيس', 'audio_coptic/21epselon.mp3', 'ⲩⲥⲓⲥ', '["ⲩ","ⲥ","ⲓ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (715, 140, 'write', 'رتب حروف الكلمة القبطية لتكوين: قبة (المعرب: «إيبي»)', 'ⲏ̀ⲡⲓ', 'إيبي', 'audio_coptic/8eta.mp3', 'ⲏ̀ⲡⲓ', '["ⲏ","̀","ⲡ","ⲓ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (781, 151, 'write', 'رتب حروف الكلمة القبطية لتكوين: أخي (المعرب: «باصون»)', 'ⲡⲁⲥⲟⲛ', 'باصون', 'audio_coptic/19sema.mp3', 'ⲡⲁⲥⲟⲛ', '["ⲡ","ⲁ","ⲥ","ⲟ","ⲛ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (805, 155, 'write', 'رتب حروف الكلمة القبطية لتكوين: عقد (المعرب: «إخليل»)', 'ⲭ̀ⲗⲓⲗ', 'إخليل', 'audio_coptic/23ki.mp3', 'ⲭ̀ⲗⲓⲗ', '["ⲭ","̀","ⲗ","ⲓ","ⲗ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (769, 149, 'write', 'رتب حروف الكلمة القبطية لتكوين: أبي (المعرب: «بايوت»)', 'ⲡⲓⲱⲧ', 'بايوت', 'audio_coptic/17pee.mp3', 'ⲡⲓⲱⲧ', '["ⲡ","ⲓ","ⲱ","ⲧ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (739, 144, 'write', 'رتب حروف الكلمة القبطية لتكوين: أسد (المعرب: «لاڤو»)', 'ⲗⲁⲃⲟ', 'لاڤو', 'audio_coptic/12lavla.mp3', 'ⲗⲁⲃⲟ', '["ⲗ","ⲁ","ⲃ","ⲟ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (757, 147, 'write', 'رتب حروف الكلمة القبطية لتكوين: مسطرة (المعرب: «إكسومي»)', 'ⲝⲟⲩⲏ', 'إكسومي', 'audio_coptic/15axsy.mp3', 'ⲝⲟⲩⲏ', '["ⲝ","ⲟ","ⲩ","ⲏ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (787, 152, 'write', 'رتب حروف الكلمة القبطية لتكوين: أمي (المعرب: «تاماف»)', 'ⲧⲁⲙⲁⲩ', 'تاماف', 'audio_coptic/20tav.mp3', 'ⲧⲁⲙⲁⲩ', '["ⲧ","ⲁ","ⲙ","ⲁ","ⲩ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (709, 139, 'write', 'رتب حروف الكلمة القبطية لتكوين: شوربة (المعرب: «أزموس»)', 'ⲍⲱⲙⲟⲥ', 'أزموس', 'audio_coptic/7zeta.mp3', 'ⲍⲱⲙⲟⲥ', '["ⲍ","ⲱ","ⲙ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (853, 163, 'write', 'رتب حروف الكلمة القبطية لتكوين: عصفور (المعرب: «تشاج»)', 'ϭⲁϫ', 'تشاج', 'audio_coptic/31chema.mp3', 'ϭⲁϫ', '["ϭ","ⲁ","ϫ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (727, 142, 'write', 'رتب حروف الكلمة القبطية لتكوين: مراية (المعرب: «إيال»)', 'ⲓⲁⲗ', 'إيال', 'audio_coptic/10yota.mp3', 'ⲓⲁⲗ', '["ⲓ","ⲁ","ⲗ"]'::jsonb, NULL, TRUE, 6)
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4364, 689, 'إي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4376, 696, 'دجاجة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4380, 701, 'ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4393, 708, 'طعام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4397, 713, 'ث أو ت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4340, 671, 'أ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4352, 678, 'شجرة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4356, 683, 'ز', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4409, 720, 'مزمار', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4413, 725, 'ياء قصيرة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4425, 732, 'قلم', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4429, 737, 'ب مشددة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4435, 738, 'حصان', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4442, 744, 'برتقال', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4449, 750, 'يأكل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4453, 755, 'ن', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4465, 762, 'يشرب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4469, 767, 'ت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4481, 774, 'قمر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4485, 779, 'ف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4497, 786, 'أختي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4513, 798, 'تفاح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4517, 803, 'بـ+س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4529, 810, '٩ أجراس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4533, 815, 'بـ+س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4545, 822, 'قطة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4549, 827, 'ف', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4561, 834, 'شمعة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4565, 839, 'تـ+ي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4577, 846, 'برتقال', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4581, 851, 'تـ+ي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4593, 858, 'كنيسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4599, 861, 'Ⲁ ⲁ (ألفا)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4606, 864, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4613, 867, 'طعام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4626, 872, 'أسد', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4639, 877, 'أختي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4656, 886, 'Ϣ ϣ (شاي)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4669, 891, 'Ϯ ϯ (تي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4676, 894, 'جانجا (ج)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4341, 671, 'غ أو ج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4353, 678, 'وردة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4357, 683, '٦', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4365, 689, 'د أو ذ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4377, 696, 'عصفور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4381, 701, 'ث أو ت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4400, 714, 'قبة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4402, 714, 'كنيسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4404, 719, 'ث أو ت', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4406, 719, 'ياء قصيرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4416, 726, 'مراية', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4418, 726, 'نافذة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4420, 731, 'كـ+س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4422, 731, 'ل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4426, 732, 'ورقة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4430, 737, 'ن', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4443, 744, 'عنب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4451, 750, 'يجلس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4455, 755, 'كـ + س', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4467, 762, 'ينام', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4471, 767, 'ب ثقيلة مشددة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4483, 774, 'نجم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4487, 779, 'س', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4499, 786, 'جدتي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4501, 791, 'بـ+س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4508, 797, 'ف', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4514, 798, 'عنب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4518, 803, 'ف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4530, 810, '٧ دفوف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4534, 815, 'ف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4546, 822, 'أسد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4550, 827, 'ش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4562, 834, 'نور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4566, 839, 'خ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4578, 846, 'بطيخ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4582, 851, 'تش', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4594, 858, 'مدينة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4607, 864, 'سو (٦)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4614, 867, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4627, 872, 'نمر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4644, 881, 'Ⲩ ⲩ (إبسيلون)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4657, 886, 'Ϥ ϥ (فاي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4664, 889, 'تشيما (تش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4677, 894, 'تشيما (تش)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4682, 897, 'جبنة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4366, 689, 'ياء طويلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4342, 671, 'د أو ذ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4354, 678, 'جبنة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4358, 683, 'ف أو ب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4378, 696, 'حمامة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4382, 701, 'ز', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4390, 707, 'ياء قصيرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4394, 708, 'شوربة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4398, 713, 'ل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4410, 720, 'ناي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4414, 725, 'ث أو ت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4424, 732, 'كتاب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4436, 743, 'ن', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4447, 749, 'ن', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4459, 756, 'مسطرة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4463, 761, 'واو طويلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4475, 768, 'أبي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4479, 773, 'س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4491, 780, 'أخي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4495, 785, 'ت', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4502, 791, 'ف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4505, 792, 'سحاب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4507, 792, 'ثلج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4515, 798, 'برتقال', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4519, 803, 'خ أو ك أو ش', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4531, 810, '9 دفوف', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4535, 815, 'واو طويلة ممدودة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4547, 822, 'طائر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4551, 827, 'خ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4563, 834, 'قنديل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4567, 839, 'هـ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4579, 846, 'عنب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4583, 851, 'ج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4595, 858, 'قرية', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4600, 862, 'جبنة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4615, 867, 'زيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4632, 876, 'Ⲟ ⲟ (أُو (قصيرة))', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4645, 881, 'Ⲫ ⲫ (في)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4652, 884, 'خي (خ أو ك أو ش)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4658, 886, 'Ϧ ϧ (خاي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4665, 889, 'خاي (خ)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4670, 892, 'كنيسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4683, 897, 'لبن', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4367, 689, 'غ أو ج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4343, 671, 'ف أو ب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4355, 678, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4359, 683, 'غ أو ج أو ن', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4379, 696, 'بطة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4383, 701, 'الرقم 6', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4391, 707, '٦', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4395, 708, 'زيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4399, 713, 'ياء طويلة ممدودة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4411, 720, 'قيثارة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4415, 725, 'ن', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4428, 737, 'ل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4437, 743, 'ل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4450, 750, 'يستيقظ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4454, 755, 'ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4456, 756, 'ممحاة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4460, 761, 'واو قصيرة مضمومة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4466, 762, 'يأكل', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4470, 767, 'واو قصيرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4472, 768, 'أختي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4476, 773, 'ر', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4482, 774, 'شمس', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4486, 779, 'ت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4488, 780, 'أمي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4492, 785, 'ش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4498, 786, 'أبي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4500, 791, 'ي أو ڤ أو و', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4503, 791, 'خ أو ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4520, 804, 'سوار', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4524, 809, 'بـ + س', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4536, 816, 'أختي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4540, 821, 'ش', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4552, 828, 'يد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4556, 833, 'خ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4568, 840, 'أسد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4572, 845, 'هـ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4584, 852, 'دجاجة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4588, 857, 'هـ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4602, 862, 'شجرة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4616, 869, 'هيتا (ياء طويلة ممدودة)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4622, 871, 'Ⲙ ⲙ (مي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4629, 874, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4635, 876, 'Ⲥ ⲥ (سيما)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4642, 879, 'خي (خ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4655, 884, 'إبسي (بـ+س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4660, 887, 'شعر', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4673, 892, 'قرية', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4368, 690, 'ملاك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4372, 695, 'د أو ذ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4344, 672, 'لبن', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4348, 677, 'د أو ذ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4360, 684, 'زيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4384, 702, '6 أجراس', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4401, 714, 'مدرسة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4405, 719, 'ياء طويلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4417, 726, 'نور', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4421, 731, 'م', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4427, 732, 'مسطرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4431, 737, 'ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4438, 743, 'م', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4445, 749, 'كـ+س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4457, 756, 'كتاب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4461, 761, 'ب ثقيلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4473, 768, 'أخي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4477, 773, 'خ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4489, 780, 'صديقي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4493, 785, 'ي/و', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4509, 797, 'واو طويلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4521, 804, 'عقد', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4525, 809, 'خ أو ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4537, 816, 'أمي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4541, 821, 'هـ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4553, 828, 'عين', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4557, 833, 'ف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4569, 840, 'خروف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4573, 845, 'تش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4585, 852, 'حمامة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4589, 857, 'تـ + ي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4597, 861, 'Ⲅ ⲅ (غاما)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4603, 862, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4604, 864, 'غاما (غ أو ج أو ن)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4610, 866, 'Ⲑ ⲑ (ثيتا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4617, 869, 'زاتا (ز)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4623, 871, 'Ⲛ ⲛ (ني)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4630, 874, 'رو (ر)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4643, 879, 'سيما (س)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4648, 882, 'برتقال', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4661, 887, 'رأس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4678, 896, 'Ⲁ ⲁ (ألفا)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4686, 898, '٣٢ حرفاً', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4345, 672, 'شجرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4349, 677, 'أ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4361, 684, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4369, 690, 'آدم', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4373, 695, 'ف أو ب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4385, 702, '٥ أجراس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4389, 707, 'ز', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4392, 708, 'ماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4396, 713, 'ز', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4408, 720, 'دف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4412, 725, 'ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4434, 738, 'نمر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4439, 743, 'ر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4446, 749, 'م', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4458, 756, 'قلم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4462, 761, 'ر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4474, 768, 'أمي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4478, 773, 'ب مشددة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4490, 780, 'أبي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4494, 785, 'س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4504, 792, 'مطر', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4510, 797, 'ي/و', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4522, 804, 'تاج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4526, 809, 'واو طويلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4538, 816, 'أخي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4542, 821, 'خ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4554, 828, 'رأس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4558, 833, 'هـ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4570, 840, 'جمل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4574, 845, 'تـ+ي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4586, 852, 'بطة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4590, 857, 'تش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4601, 862, 'وردة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4608, 866, 'Ⲋ ⲋ (سو (رقم ٦))', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4619, 869, 'ثيتا (ث أو ت)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4624, 872, 'حصان', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4637, 877, 'أبي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4650, 882, 'عنب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4663, 887, 'يد', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4674, 894, 'شاي (ش)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4680, 896, 'Ⲅ ⲅ (غاما)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4688, 898, '٢٦ حرفاً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4370, 690, 'إنسان', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4346, 672, 'جبنة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4350, 677, 'ف أو ب', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4362, 684, 'عسل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4374, 695, 'أ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4386, 702, '٦ شموع', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4433, 738, 'ذئب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4440, 744, 'بطيخ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4444, 749, 'س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4506, 792, 'ريح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4511, 797, 'خ أو ك', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4523, 804, 'خاتم', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4527, 809, 'ج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4539, 816, 'أبي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4543, 821, 'ف', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4555, 828, 'شعر', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4559, 833, 'تش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4571, 840, 'حصان', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4575, 845, 'معطشة أو غير معطشة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4587, 852, 'عصفور', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4591, 857, 'خ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4596, 861, 'Ⲇ ⲇ (دلدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4609, 866, 'Ⲍ ⲍ (زاتا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4611, 866, 'Ⲏ ⲏ (هيتا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4618, 869, 'لابدا (ل)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4620, 871, 'Ⲕ ⲕ (كابا)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4631, 874, 'ني (ن)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4633, 876, 'Ⲡ ⲡ (بي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4636, 877, 'أخي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4640, 879, 'رو (ر)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4646, 881, 'Ⲭ ⲭ (خي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4649, 882, 'بطيخ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4653, 884, 'في (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4659, 886, 'Ϩ ϩ (هوري)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4662, 887, 'عين', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4666, 889, 'فاي (ف)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4671, 892, 'بيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4679, 896, 'Ⲃ ⲃ (فيدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4684, 897, 'شجرة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4687, 898, '٢٨ حرفاً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4371, 690, 'نوح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4347, 672, 'خبز', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4351, 677, 'إي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4363, 684, 'لبن', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4375, 695, 'إي خفيفة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4387, 702, '٧ كؤوس', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4388, 707, 'ياء طويلة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4403, 714, 'هيكل', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4407, 719, 'م', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4419, 726, 'صورة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4423, 731, 'ك', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4432, 738, 'أسد', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4441, 744, 'تفاح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4448, 750, 'ينام', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4452, 755, 'ت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4464, 762, 'يمشي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4468, 767, 'س', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4480, 774, 'سماء', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4484, 779, 'ر', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4496, 786, 'أمي', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4512, 798, 'بطيخ', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4516, 803, 'هـ', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4528, 810, '٨ قيثارات', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4532, 815, 'ش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4544, 822, 'كلب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4548, 827, 'ج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4560, 834, 'مصباح', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4564, 839, 'ج', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4576, 846, 'تفاح', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4580, 851, 'ش', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4592, 858, 'بيت', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4598, 861, 'Ⲃ ⲃ (فيدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4605, 864, 'فيدا (ف أو ب)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4612, 867, 'شوربة', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4621, 871, 'Ⲗ ⲗ (لابدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4625, 872, 'ذئب', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4628, 874, 'مي (م)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4634, 876, 'Ⲣ ⲣ (رو)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4638, 877, 'أمي', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4641, 879, 'بي (ب مشددة)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4647, 881, 'Ⲯ ⲯ (إبسي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4651, 882, 'تفاح', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4654, 884, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4667, 889, 'هوري (هـ)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4668, 891, 'Ϭ ϭ (تشيما)', TRUE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4672, 892, 'مدينة', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4675, 894, 'تي (تـ+ي)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4681, 896, 'Ⲇ ⲇ (دلدا)', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4685, 897, 'خبز', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (4689, 898, '٣٠ حرفاً', FALSE)
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_1', 5, 41, '🎁 صندوق كنز الوحدة 1', 'مكافأة إتمام دروس ومراجعة الوحدة 1', 'unit_end', 165, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_2', 5, 42, '🎁 صندوق كنز الوحدة 2', 'مكافأة إتمام دروس ومراجعة الوحدة 2', 'unit_end', 166, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_3', 5, 43, '🎁 صندوق كنز الوحدة 3', 'مكافأة إتمام دروس ومراجعة الوحدة 3', 'unit_end', 167, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_4', 5, 44, '🎁 صندوق كنز الوحدة 4', 'مكافأة إتمام دروس ومراجعة الوحدة 4', 'unit_end', 168, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_5', 5, 45, '🎁 صندوق كنز الوحدة 5', 'مكافأة إتمام دروس ومراجعة الوحدة 5', 'unit_end', 169, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_6', 5, 46, '🎁 صندوق كنز الوحدة 6', 'مكافأة إتمام دروس ومراجعة الوحدة 6', 'unit_end', 170, 'fixed', 10, 10, 1, FALSE, '', 'gift', '')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES ('chest_unit_7', 5, 47, '🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول', 'تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!', 'unit_end', 171, 'fixed', 50, 50, 3, TRUE, 'متقن الأبجدية القبطية', 'trophy', 'أتممت المستوى الأول للأبجدية القبطية كاملاً (٣٢ حرفاً)')
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
