-- ============================================================================
-- Migration 13: Level 3 Coptic Curriculum (المستوى الثالث: المراجعة الشاملة والتطبيق المتقدم)
-- Total Units: 10 | Total Lessons: 42 | Total Challenges: 316 | Total XP: ~456
-- Badge: Ⲡⲓⲣⲉϥⲥⲁⲃⲉ (المتقن القبطي الشامل)
-- ============================================================================

DO $$
DECLARE
    v_level_id INT := 7;
BEGIN
    -- 1. Levels
    INSERT INTO public.levels (id, title, description, order_index)
    VALUES (v_level_id, 'المستوى الثالث: المراجعة الشاملة والتطبيق المتقدم', 'مراجعة احترافية متقدمة وتطبيقية لجميع قواعد ونصوص ومفردات المستويين الأول والثاني مع تقييمات تفاعلية شاملة.', 3)
    ON CONFLICT (id) DO UPDATE SET 
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        order_index = EXCLUDED.order_index;

    -- Clean existing Level 3 data if re-running
    DELETE FROM public.challenge_options WHERE challenge_id IN (
        SELECT id FROM public.challenges WHERE lesson_id IN (
            SELECT id FROM public.lessons WHERE unit_id IN (
                SELECT id FROM public.units WHERE level_id = v_level_id
            )
        )
    );
    DELETE FROM public.challenges WHERE lesson_id IN (
        SELECT id FROM public.lessons WHERE unit_id IN (
            SELECT id FROM public.units WHERE level_id = v_level_id
        )
    );
    DELETE FROM public.lessons WHERE unit_id IN (
        SELECT id FROM public.units WHERE level_id = v_level_id
    );
    DELETE FROM public.chests WHERE level_id = v_level_id;
    DELETE FROM public.units WHERE level_id = v_level_id;

    -- ---------------------------------------------------------
    -- Unit 1: الوحدة ١: هندسة الأصوات والمخارج المتقابلة
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (71, v_level_id, 'الوحدة ١: هندسة الأصوات والمخارج المتقابلة', 'Ⲁ-Ⲱ', 'تحليل دقيق لأزمنة الحركات والمخارج المتشابهة وثنائيات الحروف المتقابلة وضوابط نطق فيدا وغاما.', 1);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (301, 71, 'مصفوفة المتحركات السبعة وأزمنة المد', 8, 1, 8, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4001, 301, 'select', 'أي من الحركات التالية يمثل حركة كسر طويلة ممتدة تعادل ضعف زمن الكسرة الخفيفة؟', 'Ⲏ', 'إيتا', 'audio_coptic/8eta.mp3', NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7001, 4001, 'حرف الإيتا (Ⲏ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7002, 4001, 'حرف الإي (Ⲉ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7003, 4001, 'حرف اليوطا (Ⲓ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7004, 4001, 'حرف الألفا (Ⲁ)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4002, 301, 'read_select', 'عند المقارنة بين كلمتي «ⲥⲟⲡ» (مرة) و «ⲥⲱⲡ» (يعدّ/يحسب)، ما هو الفارق الصوتي الجوهري؟', 'ⲥⲟⲡ / ⲥⲱⲡ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7005, 4002, 'الأولى بواو قصيرة خطافة (Ⲟ)، والثانية بواو طويلة مفتوحة مفخمة (Ⲱ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7006, 4002, 'الأولى بواو مضمومة بشفتين، والثانية بواو قصيرة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7007, 4002, 'لا يوجد فارق في زمن النطق بينهما', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7008, 4002, 'الأولى ساكنة والثانية متحركة بالفتح', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4003, 301, 'match', 'طابق كل حرف متحرك بتصنيفه الزمني ومخرجه الدقيق:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲁ","right":"حركة فتح صريحة ومستقلة"},{"left":"Ⲉ","right":"كسرة خفيفة قصيرة (خطافة)"},{"left":"Ⲏ","right":"ياء مكسورة ممدودة زمناً"},{"left":"ⲞⲨ","right":"واو مضمومة بشفتين مضمومتين"}]'::jsonb, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4004, 301, 'true_false', 'هل يُعد الحرف المزدوج «ⲞⲨ» حرفاً متحركاً مستقلاً يعامل في التقطيع الصوتي كوحدة صوتية واحدة؟', 'ⲞⲨ', NULL, NULL, NULL, NULL, NULL, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4005, 301, 'select', 'في كلمة «ⲱⲛϧ» (حياة)، كيف يؤثر صوت الأوميجا (Ⲱ) على مقطع الكلمة الصوتي؟', 'ⲱⲛϧ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7009, 4005, 'يعطي النطق تفخيماً وامتداداً زمنياً واضحاً (أوونخ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7010, 4005, 'يجعل النطق مختصراً وسريعاً مثل الضمة العربية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7011, 4005, 'ينقلب إلى ياء ممالة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7012, 4005, 'يماثل صوت الألف المرققة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4006, 301, 'fill_blank', 'أكمل الكلمة بالحرف المتحرك المناسب لتعني كلمة ''اسم'' (ران):', 'ⲣ...ⲛ', NULL, NULL, 'ⲣⲁⲛ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7013, 4006, 'ⲣⲁⲛ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7014, 4006, 'ⲣⲟⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7015, 4006, 'ⲣⲏⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7016, 4006, 'ⲣⲓⲛ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4007, 301, 'write', 'رتّب حروف كلمة ''عشرة'' بالقبطية بحركة الكسر الممدودة (ميت):', 'ⲙⲏⲧ', NULL, NULL, 'ⲙⲏⲧ', '["ⲙ","ⲏ","ⲧ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4008, 301, 'read_select', 'أي من الكلمات التالية تشتمل على حركة كسر خطافة غير ممدودة؟', 'ⲛⲉⲙ / ⲙⲏⲧ / ⲕⲓⲙ / ⲣⲁⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7017, 4008, 'ⲛⲉⲙ (مع) - لوجود حرف الإي Ⲉ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7018, 4008, 'ⲙⲏⲧ (عشرة) - لوجود حرف الإيتا Ⲏ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7019, 4008, 'ⲕⲓⲙ (يتحرك) - لوجود اليوطا Ⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7020, 4008, 'ⲣⲁⲛ (اسم) - لوجود الألفا Ⲁ', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (302, 71, 'ثنائيات الأصوات المتشابهة (Ⲧ vs Ⲑ, Ⲕ vs Ⲭ, Ⲇ vs Ⲍ)', 8, 1, 8, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4009, 302, 'select', 'ما هو الفارق النطقي والشرطي الأساسي بين حرف التاف (Ⲧ) وحرف الثيتا (Ⲑ)؟', 'Ⲧ / Ⲑ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7021, 4009, 'Ⲧ ينطق تاء دائماً، بينما Ⲑ ينطق تاء بشروط محددة وثاء في غيرها', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7022, 4009, 'Ⲑ ينطق تاء دائماً، وⲦ ينطق طاء', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7023, 4009, 'كلاهما ينطقان ثاء دائماً في الكلمات القبطية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7024, 4009, 'Ⲧ حرف يوناني فقط وⲐ حرف قبطي أصيل', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4010, 302, 'read_select', 'في كلمة «ⲡⲓⲭⲣⲓⲥⲧⲟⲥ» (المسيح)، لماذا نُطق حرف الكي (Ⲭ) كافاً بدلاً من شين أو خاء؟', 'ⲡⲓⲭⲣⲓⲥⲧⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7025, 4010, 'لأنها كلمة يونانية وجاء بعده حرف صامت (ⲣ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7026, 4010, 'لأن الكلمة قبطية أصلية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7027, 4010, 'لأنه جاء بعده حرف متحرك مائل للكسر', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7028, 4010, 'لأنه في أول الكلمة بعد أداة التعريف', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4011, 302, 'true_false', 'حرف الدلدا (Ⲇ) ينطق ''ذال'' في جميع الأسماء والأعلام القبطية واليونانية دون استثناء.', 'Ⲇ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4012, 302, 'select', 'متى ينطق حرف الثيتا (Ⲑ) صوتاً شبيهاً بالتاء (ت)؟', 'Ⲑ', NULL, NULL, NULL, NULL, NULL, TRUE, 4);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7029, 4012, 'إذا جاء مسبوقاً بحرف السيما (Ⲥ) أو حرف الشاي (Ϣ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7030, 4012, 'إذا جاء بعده حرف متحرك للفتح', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7031, 4012, 'إذا كان في نهاية الكلمة فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7032, 4012, 'إذا وُضع فوقه جنكم', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4013, 302, 'match', 'طابق كل حرف بالحرف المقابل له في المخرج الصوتي:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲧ","right":"صوت تاء انفجاري مرقق دائماً"},{"left":"Ⲑ","right":"صوت ثاء احتكاكي أو تاء مشروطة"},{"left":"Ⲕ","right":"صوت كاف حنكي صريح دائماً"},{"left":"Ⲭ","right":"صوت حلقي أو احتكاكي حسب الأصل والحركة"}]'::jsonb, TRUE, 5);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4014, 302, 'read_select', 'كيف يُنطق حرف الزاتا (Ⲍ) في الكلمات القبطية والكنسية؟', 'Ⲍ', NULL, NULL, NULL, NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7033, 4014, 'ينطق زاي صريحة (ز) دائماً', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7034, 4014, 'ينطق ذال معجمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7035, 4014, 'ينطق جيماً معطشة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7036, 4014, 'ينطق سيناً مجهورة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4015, 302, 'fill_blank', 'اختر الحرف الصحيح لإكمال كلمة ''سلام'' اليونانية الأصلية (إيريني):', 'ⲓⲣⲏⲛ... (Ⲉ / Ⲏ / Ⲓ)', NULL, NULL, 'ⲓⲣⲏⲛⲏ', NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7037, 4015, 'ⲓⲣⲏⲛⲏ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7038, 4015, 'ⲓⲣⲏⲛⲉ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7039, 4015, 'ⲓⲣⲏⲛⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4016, 302, 'write', 'رتّب حروف كلمة ''مجد'' اليونانية الشهيرة ذات حرف الدلدا (ذوكسا):', 'Ⲇⲟⲝⲁ', NULL, NULL, 'Ⲇⲟⲝⲁ', '["Ⲇ","ⲟ","ⲝ","ⲁ"]'::jsonb, NULL, TRUE, 8);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (303, 71, 'ديناميكية حرف فيدا (Ⲃ) بين الشفتاني والأسنان-شفوي', 7, 1, 7, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4017, 303, 'select', 'ما هو الشرط الدقيق لنطق حرف الفيدا (Ⲃ) صوتاً شفتانياً انفجارياً (ب)؟', 'Ⲃ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7040, 4017, 'إذا لم يأتِ بعده حرف متحرك، أو جاء في نهاية الكلمة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7041, 4017, 'إذا جاء بعده حرف متحرك للفتح أو الكسر فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7042, 4017, 'إذا جاء في أول الكلمة فقط دائماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7043, 4017, 'إذا كان في كلمة يونانية الأصل', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4018, 303, 'read_select', 'في كلمة «ⲃⲱ» (شجرة)، كيف يُنطق حرف الفيدا ولماذا؟', 'ⲃⲱ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7044, 4018, 'يُنطق ڤ (ڤو) لأن بعده حرف متحرك للضم (Ⲱ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7045, 4018, 'يُنطق ب (بو) لأنه في بداية الكلمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7046, 4018, 'يُنطق ف مهموسة لأن الكلمة قبطية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7047, 4018, 'يُنطق واواً شفتانية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4019, 303, 'read_select', 'في كلمة «ϣⲱⲡ» أو «ⲣⲓⲃ» (في نهاية الكلمة)، نطق الفيدا كـ (ب) يحقق مخرجاً:', 'Ⲃ في آخر الكلمة', NULL, NULL, NULL, NULL, NULL, TRUE, 3);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7048, 4019, 'شفتانياً انفجارياً مجهوراً (B)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7049, 4019, 'أسنانياً شفوياً رخواً (V)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7050, 4019, 'حلقياً مهموساً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7051, 4019, 'أنفياً شفوياً', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4020, 303, 'true_false', 'في كلمة «ⲉⲃⲓⲱ» (عسل)، يُنطق حرف الفيدا (ب) بالرغم من وجود اليوطا بعده لأنها جزء من مقطع مائل.', 'ⲉⲃⲓⲱ', NULL, NULL, NULL, NULL, NULL, FALSE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4021, 303, 'match', 'طابق كل كلمة بصوت حرف الفيدا الصحيح فيها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲃⲱ (شجرة)","right":"ڤ - متبوع بمتحرك (Ⲱ)"},{"left":"ⲧⲱⲃ (طوبة/لبنة)","right":"ب - في نهاية الكلمة"},{"left":"ⲛⲓⲃⲓ (يتنفس)","right":"ڤ - متبوع بمتحرك (Ⲓ)"},{"left":"ⲉⲃⲣⲏⲩ (عبراني)","right":"ب - متبوع بحرف ساكن (ⲣ)"}]'::jsonb, TRUE, 5);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4022, 303, 'write', 'رتّب حروف كلمة ''شجرة'' بالقبطية (ڤو):', 'ⲃⲱ', NULL, NULL, 'ⲃⲱ', '["ⲃ","ⲱ"]'::jsonb, NULL, TRUE, 6);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4023, 303, 'select', 'أي الكلمات التالية يُنطق فيها حرف الفيدا كـ (ب) صريحة لوقوعه قبل حرف ساكن؟', 'ⲉⲃⲗⲏ / ⲃⲁⲗ / ⲃⲱⲕ / ⲃⲏⲑ', NULL, NULL, NULL, NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7052, 4023, 'ⲉⲃⲗⲏ (أبلي) - لوقوعه قبل اللافلا الساكن', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7053, 4023, 'ⲃⲁⲗ (عين) - لوقوعه قبل الألفا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7054, 4023, 'ⲃⲱⲕ (يمضي) - لوقوعه قبل الأوميجا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7055, 4023, 'ⲃⲏⲑ (بيت) - لوقوعه قبل الإيتا', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (304, 71, 'حرف الغاما (Ⲅ) وثلاثيته الصوتية في السياقات المركبة', 7, 1, 7, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4024, 304, 'select', 'ما هي الأصوات الثلاثة المختلفة التي يمكن لحرف الغاما (Ⲅ) أن يؤديها بحسب سياقه؟', 'Ⲅ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7056, 4024, 'غين (غ)، أو جيم معطشة (ج)، أو نون (ن)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7057, 4024, 'غين (غ)، أو كاف (ك)، أو خاء (خ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7058, 4024, 'جيم (ج)، أو دال (د)، أو ذال (ذ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7059, 4024, 'قاف (ق)، أو غين (غ)، أو فاء (ف)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4025, 304, 'read_select', 'في كلمة «ⲁⲅⲅⲉⲗⲟⲥ» (ملاك)، كيف يُنطق حرفا الغاما المتتاليان؟', 'ⲁⲅⲅⲉⲗⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7060, 4025, 'الأول نون والثاني جيم معطشة: (أنغيلوس / أنجيلوس)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7061, 4025, 'كلاهما يُنطقان غين: (أغّلوس)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7062, 4025, 'كلاهما يُنطقان نون: (أنّيلوس)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7063, 4025, 'الأول جيم والثاني غين', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4026, 304, 'select', 'ما هي الحروف الحلقية الأربعة التي إذا جاءت بعد الغاما جعلته يُنطق نوناً (ن)؟', 'حلقيات الغاما', NULL, NULL, NULL, NULL, NULL, TRUE, 3);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7064, 4026, 'Ⲅ (غاما)، Ⲕ (كابا)، Ⲭ (كي)، Ⲝ (إكسي)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7065, 4026, 'Ⲁ (ألفا)، Ⲉ (إي)، Ⲏ (إيتا)، Ⲓ (يوطا)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7066, 4026, 'Ϣ (شاي)، Ϥ (فاي)، Ϧ (خاي)، Ϩ (هوري)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7067, 4026, 'Ⲃ (فيدا)، ⲙ (مي)، Ⲛ (ني)، Ⲡ (بي)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4027, 304, 'true_false', 'في الكلمات القبطية الأصلية ينطق الغاما غيناً (غ) دائماً لأن نطق الجيم مشروط بكون الكلمة يونانية.', 'Ⲅ', NULL, NULL, NULL, NULL, NULL, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4028, 304, 'fill_blank', 'في كلمة ''لبن'' (غالا)، الحرف الأول ينطق غيناً لأن الكلمة قبطية، اكتب الكلمة:', '...ⲁⲗⲁ', NULL, NULL, 'ⲅⲁⲗⲁ', NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7068, 4028, 'ⲅⲁⲗⲁ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7069, 4028, 'ⲕⲁⲗⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7070, 4028, 'ⲭⲁⲗⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4029, 304, 'match', 'طابق كل كلمة بالحالة الصوتية لحرف الغاما فيها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲁⲅⲓⲟⲥ (قدوس)","right":"جيم معطشة (كلمة يونانية بعدها يوطا)"},{"left":"ⲅⲁⲗⲁ (لبن)","right":"غين صريحة (كلمة قبطية بعدها ألفا)"},{"left":"ⲁⲛⲁⲅⲕⲏ (ضرورة)","right":"نون (متبوع بحرف حلقي كابا Ⲕ)"},{"left":"ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ (إنجيل)","right":"نون للغاما الأولى وجيم للثانية"}]'::jsonb, TRUE, 6);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4030, 304, 'read_select', 'في ترنيمة «Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ» (قدوس الله)، كيف يُنطق حرف الغاما في «Ⲁⲅⲓⲟⲥ»؟', 'Ⲁⲅⲓⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7071, 4030, 'آجيوس (بجيم معطشة)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7072, 4030, 'آغيوس (بغين مفخمة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7073, 4030, 'آنيوس (بنون)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7074, 4030, 'آكيوس (بكاف صامتة)', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (305, 71, 'ورشة التمييز السمعي والتحليل النطقي (مراجعة الوحدة الأولى)', 8, 1, 8, 5);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4031, 305, 'select', 'أي من الحروف التالية يمثل صوتاً احتكاكياً مهموساً لا يتغير نطقه مطلقاً بتغير ما بعده؟', 'Ϧ / Ⲅ / Ⲃ / Ⲭ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7075, 4031, 'حرف الخاي (Ϧ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7076, 4031, 'حرف الغاما (Ⲅ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7077, 4031, 'حرف الفيدا (Ⲃ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7078, 4031, 'حرف الكي (Ⲭ)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4032, 305, 'read_select', 'ما هو النطق الصوتي الدقيق للمقطع «ⲉⲩ» في كلمة «ⲉⲩⲭⲏ» (صلاة)؟', 'ⲉⲩⲭⲏ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7079, 4032, 'إيڤ (بصوت ڤ شفتاني-أسناني)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7080, 4032, 'إيو (بواو مضمومة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7081, 4032, 'إي (بياء مكسورة فقط)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7082, 4032, 'إف (بفاء مهموسة)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4033, 305, 'true_false', 'تتطابق كلمتا «ⲙⲉⲧ» و «ⲙⲏⲧ» في النطق الصوتي التام دون أي فارق في طول النغمة.', 'ⲙⲉⲧ / ⲙⲏⲧ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4034, 305, 'match', 'طابق كل كلمة بالنطق الصوتي لمعربها الصحيح:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲥⲧⲁⲩⲣⲟⲥ","right":"إستافروس (صوت ڤ)"},{"left":"ⲁⲛⲟⲕ","right":"آنوك (ألف فتح صريحة)"},{"left":"Ⲇⲟⲝⲁ","right":"ذوكسا (دال معجمة كذال)"},{"left":"ⲱⲛϧ","right":"أوونخ (واو طويلة مفخمة)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4035, 305, 'fill_blank', 'أكمل كلمة ''صليب'' بالقبطية بحرف الواو القصيرة الصحيح:', 'ⲥⲧⲁⲩⲣ...ⲥ', NULL, NULL, 'ⲥⲧⲁⲩⲣⲟⲥ', NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7083, 4035, 'ⲥⲧⲁⲩⲣⲟⲥ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7084, 4035, 'ⲥⲧⲁⲩⲣⲱⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7085, 4035, 'ⲥⲧⲁⲩⲣⲁⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4036, 305, 'write', 'رتّب حروف كلمة ''أنا'' بالقبطية (آنوك):', 'ⲁⲛⲟⲕ', NULL, NULL, 'ⲁⲛⲟⲕ', '["ⲁ","ⲛ","ⲟ","ⲕ"]'::jsonb, NULL, TRUE, 6);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4037, 305, 'read_select', 'كم صوتاً صامتاً متتالياً يوجد في بداية كلمة «ⲥⲧⲁⲩⲣⲟⲥ»؟', 'ⲥⲧⲁⲩⲣⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7086, 4037, 'صوتان صامتان (ⲥ و ⲧ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7087, 4037, 'ثلاثة أصوات', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7088, 4037, 'صوت صامت واحد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7089, 4037, 'لا يوجد أصوات صامتة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4038, 305, 'select', 'ما هي القاعدة التي تفرق بين نطق الفيدا في «ⲃⲁⲗ» ونطقها في «ⲧⲱⲃ»؟', 'ⲃⲁⲗ / ⲧⲱⲃ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7090, 4038, 'في ⲃⲁⲗ جاء بعدها متحرك فتنطق ڤ، وفي ⲧⲱⲃ في النهاية فتنطق ب', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7091, 4038, 'كلاهما ينطقان ب', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7092, 4038, 'كلاهما ينطقان ڤ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7093, 4038, 'الأولى كلمة يونانية والثانية قبطية', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_71', v_level_id, 71, 'صندوق إتقان الوحدة ١: هندسة الأصوات والمخارج المتقابلة', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 305, 'fixed', 15, 15, 1, true, 'متقن الوحدة ١: هندسة الأصوات والمخارج المتقابلة', 'star', 'أتممت الوحدة ١: هندسة الأصوات والمخارج المتقابلة', 1);

    -- ---------------------------------------------------------
    -- Unit 2: الوحدة ٢: منظومة الجنكم والتقطيع الصوتي المتقدم
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (72, v_level_id, 'الوحدة ٢: منظومة الجنكم والتقطيع الصوتي المتقدم', 'Ⲻ', 'إتقان علامة الجنكم على السواكن العادية، والمنفردة، والمتحركات، والتقطيع المقطعي المتكامل.', 2);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (306, 72, 'الجنكم على الحروف الساكنة العادية والمنفردة', 7, 1, 7, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4039, 306, 'select', 'ما هو الأثر الصوتي الدقيق لدخول علامة الجنكم (Ⲻ) على حرف ساكن غير الحروف المنفردة؟', 'Ⲻ على الساكن', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7094, 4039, 'يسبقه بهمزة مكسورة خفيفة ليصبح مقطعاً صوتياً مستقلاً (إِ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7095, 4039, 'يجعل الحرف ممدوداً بالواو', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7096, 4039, 'يحذف صوت الحرف تماماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7097, 4039, 'يحول الساكن إلى حرف حلقي مفخم', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4040, 306, 'read_select', 'كيف يُنطق حرف الشاي فوقه جنكم في كلمة «ⲛ̀ϣⲏⲣⲓ» (الابن)؟', 'ⲛ̀ϣⲏⲣⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7098, 4040, 'النون بجنكم تنطق «إن»، ثم «شيري»: (إنشيري)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7099, 4040, 'تُنطق «نشيري» دون أي صوت كسرة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7100, 4040, 'تُنطق «أنشيري» بهمزة مفتوحة صريحة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7101, 4040, 'تُنطق «ونشيري»', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4041, 306, 'true_false', 'تؤدي علامة الجنكم على الساكن دائماً نفس وظيفة السكون في اللغة العربية بالضبط دون أي صوت إضافي.', 'Ⲻ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4042, 306, 'match', 'طابق كل حرف ساكن يعلوه جنكم بنطقه الصوتي المنفصل:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲕ̀","right":"إِك (مقطع مستقل)"},{"left":"ⲧ̀","right":"إِت (مقطع مستقل)"},{"left":"ⲥ̀","right":"إِس (مقطع مستقل)"},{"left":"ⲙ̀","right":"إِم (مقطع مستقل رنان)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4043, 306, 'fill_blank', 'أكمل كتابة كلمة ''الله'' مع أداة التعريف بجنكم صحيح (إفنوتي):', '...ⲛⲟⲩϯ', NULL, NULL, 'ⲫ̀ⲛⲟⲩϯ', NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7102, 4043, 'ⲫ̀ⲛⲟⲩϯ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7103, 4043, 'ⲫⲛⲟⲩϯ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7104, 4043, 'ⲡ̀ⲛⲟⲩϯ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4044, 306, 'write', 'رتّب حروف كلمة ''السماء'' بالقبطية (إتفي):', 'ⲧ̀ⲫⲉ', NULL, NULL, 'ⲧ̀ⲫⲉ', '["ⲧ̀","ⲫ","ⲉ"]'::jsonb, NULL, TRUE, 6);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4045, 306, 'read_select', 'في كلمة «ⲕ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» (مبارك)، كم مقطعاً صوتياً ينشأ بفضل الجنكم الأول؟', 'ⲕ̀ⲥⲙⲁⲣⲱⲟⲩⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7105, 4045, 'الجنكم على ⲕ̀ يشكل مقطعاً أولاً مستقلاً (إِك-)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7106, 4045, 'لا يضيف أي مقطع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7107, 4045, 'يدمج الكلمة كلها في مقطع واحد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7108, 4045, 'ينطق كحرف علة طويل', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (307, 72, 'الجنكم على الحروف الحلقية والشفوية المنفردة', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4046, 307, 'select', 'ما هي الحروف السبعة المنفردة ذات الرنين الخاص التي يُسمى كل منها صامتاً رنّاناً عند وضع الجنكم؟', 'الحروف المنفردة', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7109, 4046, 'Ⲃ, Ⲅ, Ⲗ, ⲙ, Ⲛ, Ⲣ, Ϩ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7110, 4046, 'Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲱ, Ⲩ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7111, 4046, 'Ϣ, Ϥ, Ϧ, Ϫ, Ϭ, Ϯ, Ⲭ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7112, 4046, 'Ⲕ, Ⲧ, Ⲡ, Ⲫ, Ⲑ, Ⲭ, Ⲍ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4047, 307, 'read_select', 'عند دخول الجنكم على حرف المي في كلمة «ⲙ̀ⲡⲓⲣⲏⲧⲓ» (مثل / كهذا)، كيف يُنطق المقطع الأول؟', 'ⲙ̀ⲡⲓⲣⲏⲧⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7113, 4047, 'إِم (مقطع رنان يسهل نطق الباء اللاحقة)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7114, 4047, 'ما (بفتحة صريحة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7115, 4047, 'مو (بضمة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7116, 4047, 'م ساكنة دون صوت همزة مسبقة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4048, 307, 'true_false', 'حرف اللافلا (Ⲗ) إذا جاء فوقه جنكم (ⲗ̀) يمكنه أن يشكل نواة مقطع صوتي كامل دون أي حرف علة آخر.', 'ⲗ̀', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4049, 307, 'match', 'طابق الحرف المنفرد بجنكم بالمثال التطبيقي المعتمد له في الطقس:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲙ̀","right":"ⲙ̀ⲫⲓⲱⲧ (إمفيوت = للآب)"},{"left":"ⲛ̀","right":"ⲛ̀ⲑⲟⲕ (إنثوك = أنتَ)"},{"left":"ⲗ̀","right":"ⲗ̀ⲙⲏⲛ (إلمين = ميناء)"},{"left":"ⲣ̀","right":"ⲣ̀ⲫⲏⲓ (إرفي = الهيكل)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4050, 307, 'select', 'في كلمة «ⲛ̀ⲧⲟϥ» (هو)، حرف النون يعلوه جنكم، ما هو التحليل الصوتي لكلمة «ⲛ̀»؟', 'ⲛ̀ⲧⲟϥ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7117, 4050, 'تشكل مقطعاً بادئاً مستقلاً يُنطق «إن» يليه المقطع «توف»', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7118, 4050, 'تدمج مع التاف لتصبح نوناً مشددة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7119, 4050, 'تسقط النون في النطق وتلفظ أوف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7120, 4050, 'تنطق ناتوف', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4051, 307, 'fill_blank', 'أكمل الضمير المنفصل للمخاطب المذكر ''أنتَ'' (إنثوك):', '...̀ⲑⲟⲕ', NULL, NULL, 'ⲛ̀ⲑⲟⲕ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7121, 4051, 'ⲛ̀ⲑⲟⲕ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7122, 4051, 'ⲙ̀ⲑⲟⲕ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7123, 4051, 'ⲧ̀ⲑⲟⲕ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4052, 307, 'write', 'رتّب حروف كلمة ''هو'' بالقبطية مع جنكم النون (إنتوف):', 'ⲛ̀ⲧⲟϥ', NULL, NULL, 'ⲛ̀ⲧⲟϥ', '["ⲛ̀","ⲧ","ⲟ","ϥ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (308, 72, 'الجنكم على الحروف المتحركة وبدايات الكلمات', 8, 1, 8, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4053, 308, 'select', 'ما هو الأثر الصوتي الدقيق لدخول علامة الجنكم على الحرف المتحرك (حروف العلة)؟', 'Ⲻ على المتحرك', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7124, 4053, 'يعطي الحرف نبرة استقلال صوتي ويمنع إدغامه في الحرف السابق أو اللاحق', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7125, 4053, 'يسبقه بهمزة مكسورة مثل الساكن', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7126, 4053, 'يحوله إلى حرف ساكن مهموس', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7127, 4053, 'يلغي صوت العلة تماماً', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4054, 308, 'read_select', 'في كلمة «ⲁ̀ⲗⲟⲩ» (صبي)، كيف يُنطق حرف الألفا الذي يعلوه جنكم؟', 'ⲁ̀ⲗⲟⲩ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7128, 4054, 'يُنطق ألفاً مفتوحة بنبرة استقلال واضحة: (آ-لو)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7129, 4054, 'يُنطق إِ-آلو بهمزة مكسورة إضافية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7130, 4054, 'يُنطق واواً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7131, 4054, 'يسقط من النطق', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4055, 308, 'true_false', 'عندما يوضع الجنكم على حرف متحرك للكسر مثل الإي (ⲉ̀)، فإنه يُنطق بهمزة مكسورة خفيفة صريحة (إِ).', 'ⲉ̀', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4056, 308, 'select', 'في كلمة «ⲉ̀ⲃⲟⲗ» (خارجاً / من)، ما هو دور الجنكم على حرف الإي الأول؟', 'ⲉ̀ⲃⲟⲗ', NULL, NULL, NULL, NULL, NULL, TRUE, 4);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7132, 4056, 'تحقيق صوت همزة القطع المكسورة (إِ) في مطلع الكلمة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7133, 4056, 'مد صوت الواو في نهاية الكلمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7134, 4056, 'تحويل الفيدا إلى صوت باء', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7135, 4056, 'تشديد حرف اللام', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4057, 308, 'match', 'طابق كل حرف متحرك يعلوه جنكم بطريقة أدائه الصوتي:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲁ̀","right":"ألف مفتوحة مستقلة النبرة (آ)"},{"left":"ⲉ̀","right":"همزة قطع مكسورة صريحة (إِ)"},{"left":"ⲏ̀","right":"ياء ممدودة منفصلة عن مجاوراتها"},{"left":"ⲟ̀","right":"واو قصيرة منبورة في مطلع مقطع"}]'::jsonb, TRUE, 5);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4058, 308, 'fill_blank', 'أكمل كتابة كلمة ''خارجاً / من'' (إيفول) بالحرف المتحرك الصحيح بجنكم:', '...̀ⲃⲟⲗ', NULL, NULL, 'ⲉ̀ⲃⲟⲗ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7136, 4058, 'ⲉ̀ⲃⲟⲗ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7137, 4058, 'ⲁ̀ⲃⲟⲗ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7138, 4058, 'ⲟ̀ⲃⲟⲗ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4059, 308, 'write', 'رتّب حروف كلمة ''دجاجة'' بالقبطية بحرف الإي المبدوء بجنكم (إرجو):', 'ⲉ̀ⲣϫⲱ', NULL, NULL, 'ⲉ̀ⲣϫⲱ', '["ⲉ̀","ⲣ","ϫ","ⲱ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4060, 308, 'read_select', 'ما هو الفارق الصوتي الجوهري بين ⲥ̀ (سيما بجنكم) و ⲉ̀ (إي بجنكم)؟', 'ⲥ̀ / ⲉ̀', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7139, 4060, 'الأول ساكن يسبقه صوت همزة كسر (إِس)، والثاني حركة علة ينطق كهمزة كسر بذاته (إِ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7140, 4060, 'كلاهما متطابقان تماماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7141, 4060, 'الأول حركة والثاني حرف ساكن', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7142, 4060, 'الجنكم على العلة يلغي صوتها', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (309, 72, 'تحليل بنية المقاطع الصوتية المركبة في الكلمات الطويلة', 8, 1, 8, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4061, 309, 'select', 'كم مقطعاً صوتياً تتكون منه الكلمة الكنسية الطويلة «ⲉⲙⲙⲁⲛⲟⲩⲏⲗ» (عمانوئيل)؟', 'ⲉⲙⲙⲁⲛⲟⲩⲏⲗ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7143, 4061, '4 مقاطع صوتية: (ⲉⲙ / ⲙⲁ / ⲛⲟⲩ / ⲏⲗ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7144, 4061, 'مقطعان فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7145, 4061, '3 مقاطع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7146, 4061, '5 مقاطع', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4062, 309, 'read_select', 'في كلمة «ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ» (ضابط الكل)، كيف تتقسم الكلمة مقطعياً؟', 'ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7147, 4062, 'بان / تو / كرا / تور (4 مقاطع)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7148, 4062, 'با / نتو / كراتور (3 مقاطع)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7149, 4062, 'بانتو / كراتور (مقطعان)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7150, 4062, 'بان / ت / وك / را / تور (5 مقاطع)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4063, 309, 'true_false', 'المقطع الصوتي القبطي يمكن أن يبدأ بحرفين صامتين متعاقبين مثل (ⲥⲧ) أو (ⲕⲣ) دون الحاجة لحرف متحرك بينهما.', 'ⲥⲧⲁⲩⲣⲟⲥ / ⲕⲣⲁⲧⲱⲣ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4064, 309, 'match', 'طابق كل كلمة طويلة بعدد مقاطعها الصوتية الدقيقة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲉⲙⲙⲁⲛⲟⲩⲏⲗ","right":"4 مقاطع صوتية"},{"left":"ⲡⲓⲭⲣⲓⲥⲧⲟⲥ","right":"3 مقاطع (بي / خريس / توس)"},{"left":"ⲁⲅⲅⲉⲗⲟⲥ","right":"3 مقاطع (أن / غي / لوس)"},{"left":"ⲛⲟⲩϯ","right":"مقطعان (نو / تي)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4065, 309, 'select', 'ما هو العنصر الإلزامي الذي يجب أن يتواجد في كل مقطع صوتي قبطي ليكون مقطعاً متكاملاً؟', 'بنية المقطع', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7151, 4065, 'حرف حركة (علة)، أو صامت رنّان يعلوه جنكم', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7152, 4065, 'حرف ألفا حصراً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7153, 4065, 'حرف ساكن فقط بدون أي حركة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7154, 4065, 'علامة الاختصار', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4066, 309, 'fill_blank', 'أكمل التقطيع الصوتي لكلمة ''المسيح'' (ⲡⲓ / ... / ⲧⲟⲥ):', 'ⲡⲓⲭⲣⲓⲥⲧⲟⲥ', NULL, NULL, 'ⲭⲣⲓⲥ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7155, 4066, 'ⲭⲣⲓⲥ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7156, 4066, 'ⲭⲣⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7157, 4066, 'ⲣⲓⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4067, 309, 'write', 'رتّب حروف كلمة ''الله'' بالقبطية كأحد أهم الكلمات ثنائية المقطع (نوتي):', 'ⲛⲟⲩϯ', NULL, NULL, 'ⲛⲟⲩϯ', '["ⲛ","ⲟⲩ","ϯ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4068, 309, 'read_select', 'في كلمة «ϣⲱⲡⲧ» كم مقطعاً صوتياً تحتويه هذه الكلمة ذات التراكم الصامت النهائي؟', 'ϣⲱⲡⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7158, 4068, 'مقطع واحد مغلق ينتهي بساكنين (شوبت)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7159, 4068, 'مقطعان لوجود التاف في النهاية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7160, 4068, 'ثلاثة مقاطع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7161, 4068, 'لا تعتبر كلمة صحيحة', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_72', v_level_id, 72, 'صندوق إتقان الوحدة ٢: منظومة الجنكم والتقطيع الصوتي المتقدم', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 309, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٢: منظومة الجنكم والتقطيع الصوتي المتقدم', 'star', 'أتممت الوحدة ٢: منظومة الجنكم والتقطيع الصوتي المتقدم', 2);

    -- ---------------------------------------------------------
    -- Unit 3: الوحدة ٣: التمييز المعجمي: الأصل القبطي والأصل اليوناني
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (73, v_level_id, 'الوحدة ٣: التمييز المعجمي: الأصل القبطي والأصل اليوناني', 'Ϣ-Ϯ', 'إتقان علامات الحروف الفارقة للأصل اليوناني والقبطي، وتأثير أصل الكلمة على القواعد النطقية.', 3);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (310, 73, 'العلامات الحرفية الفارقة للأصل اليوناني (Ⲅ, Ⲇ, Ⲋ, Ⲝ, ⲫ, Ⲭ, Ⲯ)', 8, 1, 8, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4069, 310, 'select', 'إذا احتوت كلمة على حرف الإكسي (Ⲝ) أو حرف الإبسي (Ⲯ)، فما هو أصل الكلمة حكماً دون استثناء؟', 'Ⲝ / Ⲯ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7162, 4069, 'يونانية الأصل دائماً', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7163, 4069, 'قبطية صميمة دائماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7164, 4069, 'عبرانية قديمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7165, 4069, 'فرعونية متوارثة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4070, 310, 'read_select', 'كلمة «Ⲇⲟⲝⲁ» (مجد) تحتوي على حرفين يونانيين فارقين، ما هما؟', 'Ⲇⲟⲝⲁ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7166, 4070, 'الدلدا (Ⲇ) والإكسي (ⲝ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7167, 4070, 'الألفا والأوميجا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7168, 4070, 'السيما والتاف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7169, 4070, 'الغاما والخاي', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4071, 310, 'true_false', 'حرف الفاي (Ⲫ) لا يأتي مطلقاً في أي كلمة قبطية أصيلة بل هو حكر على اليونانية فقط.', 'Ⲫ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4072, 310, 'match', 'طابق كل حرف يوناني فارق بالدليل التطبيقي عليه من النصوص الكنسية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲝ","right":"Ⲇⲟⲝⲁ (ذوكسا = مجد)"},{"left":"Ⲯ","right":"ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)"},{"left":"Ⲭ","right":"ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (بي خريستوس = المسيح)"},{"left":"Ⲅ","right":"Ⲁⲅⲓⲟⲥ (آجيوس = قدوس)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4073, 310, 'select', 'لماذا يُنطق حرف الكي (Ⲭ) كشين في كلمة «ⲉⲩⲭⲏ» (صلاة)؟', 'ⲉⲩⲭⲏ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7170, 4073, 'لأنها كلمة يونانية متبوعة بحرف متحرك مائل للكسر (Ⲏ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7171, 4073, 'لأنها كلمة قبطية صميمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7172, 4073, 'لأنها بدأت بالمقطع إيڤ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7173, 4073, 'لأنها جاءت في صلاة فردية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4074, 310, 'fill_blank', 'أكمل كلمة ''مزمور'' اليونانية بحرف الإبسي الفارغ (بصالموس):', '...ⲁⲗⲙⲟⲥ', NULL, NULL, 'ⲯⲁⲗⲙⲟⲥ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7174, 4074, 'ⲯⲁⲗⲙⲟⲥ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7175, 4074, 'ⲝⲁⲗⲙⲟⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7176, 4074, 'ⲥⲁⲗⲙⲟⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4075, 310, 'write', 'رتّب حروف كلمة ''مزمور'' بالقبطية بحرف الإبسي (بصالموس):', 'ⲯⲁⲗⲙⲟⲥ', NULL, NULL, 'ⲯⲁⲗⲙⲟⲥ', '["ⲯ","ⲁ","ⲗ","ⲙ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4076, 310, 'read_select', 'أي من الحروف التالية إذا وجدته في كلمة حكمت فوراً بأنها ليست قبطية صميمة؟', 'ⲝ / ϣ / ϧ / ϩ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7177, 4076, 'حرف الإكسي (Ⲝ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7178, 4076, 'حرف الشاي (Ϣ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7179, 4076, 'حرف الخاي (Ϧ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7180, 4076, 'حرف الهوري (Ϩ)', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (311, 73, 'العلامات الحرفية السبعة للأصل القبطي الصميم (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ)', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4077, 311, 'select', 'كم عدد الحروف القبطية السبعة المأخوذة من الخط الديموطيقي المصري القديم التي تؤكد قبطية الكلمة؟', 'حروف الديموطيقي', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7181, 4077, '7 حروف: (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7182, 4077, '5 حروف فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7183, 4077, '10 حروف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7184, 4077, '3 حروف', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4078, 311, 'read_select', 'إذا وجدت في كلمة أحد الحروف (Ϣ أو Ϥ أو Ϧ أو Ϩ)، فما هو أصل الكلمة يقيناً؟', 'Ϣ, Ϥ, Ϧ, Ϩ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7185, 4078, 'قبطية أصيلة لا يمكن أن تكون يونانية', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7186, 4078, 'يونانية معربة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7187, 4078, 'لاتينية الأصل', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7188, 4078, 'سريانية قديمة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4079, 311, 'true_false', 'يمكن لكلمة يونانية أصيلة أن تشتمل على حرف الشاي (Ϣ) إذا كانت في النص الليتورجي.', 'Ϣ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4080, 311, 'match', 'طابق كل حرف قبطي أصيل بكلمته المعتمدة في المنهج:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϣ","right":"ϣⲱⲡ (يقبل / يتناول)"},{"left":"Ϧ","right":"ⲱⲛϧ (يعيش / حياة)"},{"left":"Ϫ","right":"ϫⲟⲙ (قوة)"},{"left":"Ϯ","right":"ⲛⲟⲩϯ (الله)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4081, 311, 'fill_blank', 'أكمل كلمة ''قوة'' القبطية الصميمة بالحرف الديموطيقي جانجا (جوم):', '...ⲟⲙ', NULL, NULL, 'ϫⲟⲙ', NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7189, 4081, 'ϫⲟⲙ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7190, 4081, 'ⲅⲟⲙ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7191, 4081, 'ⲕⲟⲙ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4082, 311, 'write', 'رتّب حروف كلمة ''قوة'' بالقبطية بحرف الجانجا (جوم):', 'ϫⲟⲙ', NULL, NULL, 'ϫⲟⲙ', '["ϫ","ⲟ","ⲙ"]'::jsonb, NULL, TRUE, 6);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4083, 311, 'select', 'أي الكلمات التالية قبطية صميمة استناداً لاشتمالها على حرف ديموطيقي؟', 'ⲥⲧⲁⲩⲣⲟⲥ / ⲱⲛϧ / ⲁⲅⲅⲉⲗⲟⲥ / ⲉⲩⲭⲏ', NULL, NULL, NULL, NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7192, 4083, 'ⲱⲛϧ (لوجود حرف الخاي Ϧ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7193, 4083, 'ⲥⲧⲁⲩⲣⲟⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7194, 4083, 'ⲁⲅⲅⲉⲗⲟⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7195, 4083, 'ⲉⲩⲭⲏ', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (312, 73, 'تحولات نطق الحروف المشروطة بحسب أصل الكلمة', 8, 1, 8, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4084, 312, 'select', 'ما هو الحرف الذي ينطق خاء (خ) دائماً في الكلمات القبطية، بينما في اليونانية ينطق شين أو كاف بحسب الحركة التالية؟', 'Ⲭ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7196, 4084, 'حرف الكي (Ⲭ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7197, 4084, 'حرف الخاي (Ϧ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7198, 4084, 'حرف الغاما (Ⲅ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7199, 4084, 'حرف الكابا (Ⲕ)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4085, 312, 'read_select', 'في كلمة «ⲭⲏⲙⲓ» (مصر)، كيف يُنطق حرف الكي (Ⲭ) ولماذا؟', 'ⲭⲏⲙⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7200, 4085, 'يُنطق خاء (خيمي) لأن الكلمة قبطية أصيلة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7201, 4085, 'يُنطق شين لأن بعده إيتا للكسر', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7202, 4085, 'يُنطق كافاً لأنها اسم بلد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7203, 4085, 'يُنطق جيماً معطشة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4086, 312, 'true_false', 'حرف الدلدا (Ⲇ) ينطق دال في الكلمات القبطية وأسماء الأعلام، وينطق ذال في الكلمات اليونانية العامة.', 'Ⲇ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4087, 312, 'match', 'طابق كل كلمة بصوت حرف الكي (Ⲭ) فيها بناء على أصل الكلمة وسياقها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲭⲏⲙⲓ (مصر)","right":"خاء - كلمة قبطية أصيلة"},{"left":"ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (المسيح)","right":"كاف - كلمة يونانية بعدها ساكن رو"},{"left":"Ⲭⲉⲣⲉ (افرحي / السلام)","right":"شين - كلمة يونانية بعدها متحرك كسر"},{"left":"ⲯⲩⲭⲏ (نفس)","right":"شين - كلمة يونانية بعدها إيتا"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4088, 312, 'select', 'في التحية الكنسية الشهيرة «Ⲭⲉⲣⲉ ⲛⲉ» (السلام لكِ)، ما هو النطق الصوتي المعتمد للحرف الأول؟', 'Ⲭⲉⲣⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7204, 4088, 'شين معطوفة على الكسر: (شيري)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7205, 4088, 'خاء: (خيري)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7206, 4088, 'كاف: (كيري)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7207, 4088, 'جيم: (جيري)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4089, 312, 'fill_blank', 'أكمل اسم أرض مصر بالقبطية (خيمي):', '...ⲏⲙⲓ', NULL, NULL, 'ⲭⲏⲙⲓ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7208, 4089, 'ⲭⲏⲙⲓ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7209, 4089, 'Ϧⲏⲙⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7210, 4089, 'ⲕⲏⲙⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4090, 312, 'write', 'رتّب حروف كلمة ''مصر'' بالقبطية بحرف الكي القبطي (خيمي):', 'ⲭⲏⲙⲓ', NULL, NULL, 'ⲭⲏⲙⲓ', '["ⲭ","ⲏ","ⲙ","ⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4091, 312, 'read_select', 'لماذا تختلف طريقة نطق الكي بين «ⲭⲏⲙⲓ» و «Ⲭⲉⲣⲉ» رغم أن كلاهما متبوع بمتحرك للكسر؟', 'ⲭⲏⲙⲓ / Ⲭⲉⲣⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7211, 4091, 'لأن الأولى قبطية فتنطق خاء دائماً، والثانية يونانية فتنطق شين بحسب شرط الكسر', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7212, 4091, 'لأن الأولى مسبوقة بألف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7213, 4091, 'لأن الثانية فعل والأولى اسم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7214, 4091, 'لا يوجد أي اختلاف في النطق بينهما', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (313, 73, 'مختبر فرز النصوص والمفردات الكنسية بين القبطي واليوناني', 7, 1, 7, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4092, 313, 'select', 'في جملة الصلاة الربانية «Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ»، ما هو التصنيف المعجمي لجميع هذه الكلمات؟', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7215, 4092, 'كلمات قبطية صميمة بالكامل', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7216, 4092, 'كلمات يونانية الأصل معربة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7217, 4092, 'مزيج نصفه قبطي ونصفه يوناني', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7218, 4092, 'مترجمة من العبرية مباشرة دون تعديل', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4093, 313, 'read_select', 'في التسبحة الشهيرة «Ⲁⲝⲓⲟⲥ ⲕⲉ ⲇⲓⲕⲉⲟⲥ» (مستحق وعادل)، ما هو أصل هذه العبارة؟', 'Ⲁⲝⲓⲟⲥ ⲕⲉ ⲇⲓⲕⲉⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7219, 4093, 'يونانية بالكامل لوجود ⲝ و Ⲇ و ⲕⲉ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7220, 4093, 'قبطية أصيلة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7221, 4093, 'قبطية بحيرية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7222, 4093, 'قبطية صعيدية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4094, 313, 'true_false', 'تشتمل الصلوات الليتورجية في الكنيسة القبطية على نصوص باللغة اليونانية حفظت كما هي بأصواتها اليونانية دون ترجمة.', 'الصلوات الليتورجية', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4095, 313, 'match', 'فرز الكلمات التالية بين أصل قبطي وأصل يوناني:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲛⲟⲩϯ (الله)","right":"أصل قبطي صميم (حرف Ϯ)"},{"left":"ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (المسيح)","right":"أصل يوناني كنسي"},{"left":"ⲱⲛϧ (حياة)","right":"أصل قبطي صميم (حرف Ϧ)"},{"left":"Ⲁⲅⲅⲉⲗⲟⲥ (ملاك)","right":"أصل يوناني ليتورجي"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4096, 313, 'select', 'أي من العبارات الكنسية التالية تمثل تركيبة قبطية صرفة؟', 'Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ / Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ / Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7223, 4096, 'Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ (الآب والابن)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7224, 4096, 'Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7225, 4096, 'Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7226, 4096, 'Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4097, 313, 'fill_blank', 'أكمل العبارة القبطية الشهيرة ''الآب والابن'' (Ⲫⲓⲱⲧ ⲛⲉⲙ ...):', 'Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡ...', NULL, NULL, 'Ⲡϣⲏⲣⲓ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7227, 4097, 'Ⲡϣⲏⲣⲓ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7228, 4097, 'Ⲡⲓⲱⲧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7229, 4097, 'Ⲡⲛⲉⲩⲙⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4098, 313, 'write', 'رتّب حروف كلمة ''الابن'' بالقبطية بحرف الشاي الديموطيقي (بشيري):', 'Ⲡϣⲏⲣⲓ', NULL, NULL, 'Ⲡϣⲏⲣⲓ', '["Ⲡ","ϣ","ⲏ","ⲣ","ⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_73', v_level_id, 73, 'صندوق إتقان الوحدة ٣: التمييز المعجمي: الأصل القبطي والأصل اليوناني', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 313, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٣: التمييز المعجمي: الأصل القبطي والأصل اليوناني', 'star', 'أتممت الوحدة ٣: التمييز المعجمي: الأصل القبطي والأصل اليوناني', 3);

    -- ---------------------------------------------------------
    -- Unit 4: الوحدة ٤: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (74, v_level_id, 'الوحدة ٤: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية', 'Ϧ-Ϭ', 'إتقان الفروق الدقيقة بين الحلقيات (Ϧ, Ⲭ, Ϩ) والمزدوجة (Ⲝ, Ⲯ) وأصوات الشين وتشي (Ϣ, Ϭ) في النصوص.', 4);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (314, 74, 'الثلاثي الحلقي المتقابل (Ϧ vs Ⲭ vs Ϩ)', 8, 1, 8, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4099, 314, 'select', 'ما هو الفارق في المخرج الصوتي بين الخاي (Ϧ) والهوري (Ϩ)؟', 'Ϧ / Ϩ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7230, 4099, 'Ϧ حلقي احتكاكي خشن (خاء)، بينما Ϩ حنجري مهموس خفيف (هاء)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7231, 4099, 'كلاهما ينطقان هاء دائماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7232, 4099, 'Ϧ ينطق كافاً وϨ ينطق حاء', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7233, 4099, 'لا يوجد أي فرق بينهما في اللهجة البحيرية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4100, 314, 'read_select', 'في كلمة «ϧⲉⲛ» (في / بواسطة)، ما هو الصوت الحلقي الذي تبدأ به الكلمة؟', 'ϧⲉⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7234, 4100, 'صوت الخاء الصريح (خين)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7235, 4100, 'صوت الهاء (هين)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7236, 4100, 'صوت الشين (شين)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7237, 4100, 'صوت الغين (غين)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4101, 314, 'true_false', 'حرف الهوري (Ϩ) يمكن أن ينطق حاء (ح) في بعض الكلمات القبطية القديمة.', 'Ϩ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4102, 314, 'match', 'طابق كل حرف حلقي بنطقه الصوتي المعتمد مع مثاله:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϧ","right":"خاء صريحة دائمًا: ϧⲉⲛ (خين = في)"},{"left":"Ϩ","right":"هاء رقيقة دائماً: ϩⲏⲧ (هيت = قلب)"},{"left":"Ⲭ (قبطي)","right":"خاء في الكلمات القبطية: ⲭⲏⲙⲓ (خيمي = مصر)"},{"left":"Ⲭ (يوناني)","right":"شين أو كاف بحسب الحركة اللاحقة"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4103, 314, 'select', 'في كلمة «ϩⲓⲧⲉⲛ» (بصلوات / بواسطة)، ما معنى الكلمة في مستهل الألحان الكنسية؟', 'ϩⲓⲧⲉⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7238, 4103, 'بشفاعة / بصلوات / بواسطة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7239, 4103, 'سلام / فرح', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7240, 4103, 'قدوس / طاهر', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7241, 4103, 'مجد / إكرام', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4104, 314, 'fill_blank', 'أكمل كلمة ''قلب'' بالقبطية بحرف الهوري (هيت):', '...ⲏⲧ', NULL, NULL, 'ϩⲏⲧ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7242, 4104, 'ϩⲏⲧ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7243, 4104, 'ϧⲏⲧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7244, 4104, 'ⲭⲏⲧ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4105, 314, 'write', 'رتّب حروف كلمة ''بشفاعة / بصلوات'' بالقبطية (هيتين):', 'ϩⲓⲧⲉⲛ', NULL, NULL, 'ϩⲓⲧⲉⲛ', '["ϩ","ⲓ","ⲧ","ⲉ","ⲛ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4106, 314, 'read_select', 'أي من الكلمات التالية تشتمل على صوت هاء (هـ) رقيق؟', 'ⲱⲛϧ / ϩⲏⲧ / ⲭⲏⲙⲓ / ϧⲉⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7245, 4106, 'ϩⲏⲧ (قلب) - لوجود حرف الهوري', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7246, 4106, 'ⲱⲛϧ (حياة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7247, 4106, 'ⲭⲏⲙⲓ (مصر)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7248, 4106, 'ϧⲉⲛ (في)', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (315, 74, 'الحروف المزدوجة التوافقية (Ⲝ vs Ⲯ)', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4107, 315, 'select', 'ما هو التركيب الصوتي الداخلي لحرف الإكسي (Ⲝ)؟', 'Ⲝ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7249, 4107, 'كاف متبوعة بسيما: (ك + س = ks)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7250, 4107, 'باء متبوعة بسيما: (ب + س = ps)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7251, 4107, 'تاء متبوعة بشين: (ت + ش = tsh)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7252, 4107, 'دال متبوعة بزاي: (د + ز = dz)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4108, 315, 'read_select', 'ما هو التركيب الصوتي الداخلي لحرف الإبسي (Ⲯ)؟', 'Ⲯ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7253, 4108, 'باء متبوعة بسيما: (ب + س = ps)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7254, 4108, 'كاف متبوعة بسيما: (ك + س = ks)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7255, 4108, 'فاء متبوعة بتاف: (ف + ت = ft)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7256, 4108, 'ميم متبوعة بسيما: (م + س = ms)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4109, 315, 'true_false', 'يُعامل الحرف المزدوج (Ⲝ أو Ⲯ) في القبطية كحرفين ساكنين متتاليين عند التقطيع الصوتي.', 'Ⲝ / Ⲯ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4110, 315, 'match', 'طابق كل حرف مركب بتكوينه ومثاله الكنسي الشائع:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲝ","right":"ك + س مثل: Ⲇⲟⲝⲁ (ذوكسا = مجد)"},{"left":"Ⲯ","right":"ب + س مثل: ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)"},{"left":"Ϯ","right":"ت + ي مثل: Ϯⲙⲉⲧⲟⲩⲣⲟ (تي ميت أورو)"},{"left":"Ϭ","right":"ت + ش (تش) مع الكسر أو ج"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4111, 315, 'select', 'في كلمة «ⲯⲩⲭⲏ» (نفس)، ما هما الحرفان المزدوج والحلقي المتتابعان فيها؟', 'ⲯⲩⲭⲏ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7257, 4111, 'الإبسي (ⲯ = ب+س) والكي (ⲭ = شين)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7258, 4111, 'الإكسي (ⲝ) والخاي (Ϧ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7259, 4111, 'السيما والتاف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7260, 4111, 'الفيدا والغاما', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4112, 315, 'fill_blank', 'أكمل كتابة كلمة ''مجد'' بحرف الإكسي المركب (ذوكسا):', 'Ⲇⲟ...ⲁ', NULL, NULL, 'Ⲇⲟⲝⲁ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7261, 4112, 'Ⲇⲟⲝⲁ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7262, 4112, 'Ⲇⲟⲯⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7263, 4112, 'Ⲇⲟⲥⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4113, 315, 'write', 'رتّب حروف كلمة ''نفس'' اليونانية الأصل بحرف الإبسي (بسيخي):', 'ⲯⲩⲭⲏ', NULL, NULL, 'ⲯⲩⲭⲏ', '["ⲯ","ⲩ","ⲭ","ⲏ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (316, 74, 'ثنائيات الكاف والشين والتشي (Ⲕ, Ϣ, Ϭ) وضوابط النطق', 7, 1, 7, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4114, 316, 'select', 'ما هو النطق الصوتي الدقيق لحرف التشيما (Ϭ) في اللغة القبطية؟', 'Ϭ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7264, 4114, 'ينطق (تش - tsh) إذا جاء بعده حرف متحرك للكسر، و(ش) أو (ك) مع غيره', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7265, 4114, 'ينطق كافاً صريحة دائماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7266, 4114, 'ينطق سيناً رقيقة دائماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7267, 4114, 'ينطق طاء مفخمة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4115, 316, 'read_select', 'في كلمة «Ϭⲟⲓⲥ» (الرب / السيد)، كيف يُنطق الحرف الأول؟', 'Ϭⲟⲓⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7268, 4115, 'شويس / تشويس (صوت شين أو تش مدمج)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7269, 4115, 'كويس بكاف صلبة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7270, 4115, 'لويس بلام', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7271, 4115, 'مويس بميم', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4116, 316, 'true_false', 'حرف الشاي (Ϣ) ينطق دائماً شيناً (ش) صريحة دون أي تغيير أو شروط في جميع مواضعه.', 'Ϣ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4117, 316, 'match', 'طابق كل حرف بالصوت الأساسي الذي يمثله في الكلمات القبطية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲕ","right":"كاف انفجارية صلبة دائماً: ⲕⲁϩ (كاه = أرض)"},{"left":"Ϣ","right":"شين احتكاكية رقيقة دائماً: ϣⲗⲏⲗ (شليل = صلاة)"},{"left":"Ϭ","right":"تشي مركب أو شين مشروطة: Ϭⲟⲓⲥ (شويس = الرب)"},{"left":"Ϫ","right":"جيم صريحة أو معطشة بحسب الحركة"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4118, 316, 'select', 'ما معنى كلمة «ϣⲗⲏⲗ» بالقبطية، وهي من أشهر الكلمات الطقسية؟', 'ϣⲗⲏⲗ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7272, 4118, 'صلاة / يصلي', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7273, 4118, 'صوم / يصوم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7274, 4118, 'قربان / تقدمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7275, 4118, 'سلام / تحية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4119, 316, 'fill_blank', 'أكمل كلمة ''صلاة'' بالقبطية بحرف الشاي الصحيح (شليل):', '...ⲗⲏⲗ', NULL, NULL, 'ϣⲗⲏⲗ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7276, 4119, 'ϣⲗⲏⲗ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7277, 4119, 'Ϭⲗⲏⲗ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7278, 4119, 'ⲕⲗⲏⲗ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4120, 316, 'write', 'رتّب حروف كلمة ''صلاة'' بالقبطية (شليل):', 'ϣⲗⲏⲗ', NULL, NULL, 'ϣⲗⲏⲗ', '["ϣ","ⲗ","ⲏ","ⲗ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (317, 74, 'قراءة وفحص كلمات ونصوص ليتورجية تركز على الحلقيات', 8, 1, 8, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4121, 317, 'select', 'في مقدمة مرد الإنجيل «Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ» (بصلوات / بشفاعات)، ما هما الحرفان الحلقيان المتباينان في هاتين الكلمتين؟', 'Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7279, 4121, 'الهوري (Ϩ) في الأولى، والكي (Ⲭ) في الثانية', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7280, 4121, 'الخاي في الأولى والغاما في الثانية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7281, 4121, 'السيما والتاف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7282, 4121, 'اللافلا والرو', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4122, 317, 'read_select', 'في عبارة «Ϧⲉⲛ ⲡⲣⲁⲛ ⲙ̀Ⲫⲓⲱⲧ» (باسم الآب)، ما هو الحرف الحلقي الوارد في حرف الجر «Ϧⲉⲛ»؟', 'Ϧⲉⲛ ⲡⲣⲁⲛ ⲙ̀Ⲫⲓⲱⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7283, 4122, 'حرف الخاي (Ϧ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7284, 4122, 'حرف الهوري (Ϩ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7285, 4122, 'حرف الكي (Ⲭ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7286, 4122, 'حرف الغاما (Ⲅ)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4123, 317, 'true_false', 'تحتوي عبارة «Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ» على حرف الخاي الديموطيقي في كلمة «ⲉⲧϧⲉⲛ».', 'ⲉⲧϧⲉⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4124, 317, 'match', 'طابق كل عبارة ليتورجية بترجمتها العربية الدقيقة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϧⲉⲛ ⲡⲣⲁⲛ","right":"باسم (في اسم)"},{"left":"Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ","right":"بصلوات / بشفاعات"},{"left":"Ϭⲟⲓⲥ ⲛⲁⲓ ⲛⲁⲛ","right":"يا رب ارحمنا"},{"left":"ϣⲗⲏⲗ ⲉ̀ϫⲉⲛ","right":"صلوا من أجل"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4125, 317, 'select', 'في نداء الشماس «Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ» (صلوا)، ما هو الحرف المزدوج الحلقي المتضمن في الكلمة؟', 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7287, 4125, 'حرف الإكسي (ⲝ = ك+س)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7288, 4125, 'حرف الإبسي (Ⲯ = ب+س)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7289, 4125, 'حرف الخاي (Ϧ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7290, 4125, 'حرف الهوري (Ϩ)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4126, 317, 'fill_blank', 'أكمل بداية البسملة القبطية الشهيرة ''باسم الآب'' (Ϧⲉⲛ ... ⲙ̀Ⲫⲓⲱⲧ):', 'Ϧⲉⲛ ... ⲙ̀Ⲫⲓⲱⲧ', NULL, NULL, 'ⲡⲣⲁⲛ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7291, 4126, 'ⲡⲣⲁⲛ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7292, 4126, 'ⲡⲓⲣⲁⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7293, 4126, 'ⲡⲓⲱⲧ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4127, 317, 'write', 'رتّب حروف عبارة ''باسم'' بالقبطية (خين بـ ران):', 'Ϧⲉⲛ ⲡⲣⲁⲛ', NULL, NULL, 'Ϧⲉⲛ ⲡⲣⲁⲛ', '["Ϧⲉⲛ","ⲡ","ⲣ","ⲁ","ⲛ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4128, 317, 'read_select', 'ما هو حكم نطق حرف الفاي في «ⲙ̀Ⲫⲓⲱⲧ» (للآب)؟', 'ⲙ̀Ⲫⲓⲱⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7294, 4128, 'فاء مهموسة غير مجهورة (فيوت)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7295, 4128, 'باء شفتانية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7296, 4128, 'ڤاء مجهورة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7297, 4128, 'واو لينة', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_74', v_level_id, 74, 'صندوق إتقان الوحدة ٤: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 317, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٤: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية', 'star', 'أتممت الوحدة ٤: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية', 4);

    -- ---------------------------------------------------------
    -- Unit 5: الوحدة ٥: التراكيب الصامتة المعقدة والحروف المزدوجة المتتالية
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (75, v_level_id, 'الوحدة ٥: التراكيب الصامتة المعقدة والحروف المزدوجة المتتالية', 'Ⲥ-Ⲧ', 'إتقان قراءة العناقيد الصامتة المركبة، وتوالي الحروف الشفوية والأنفية والمقاطع المشددة وسرعة القراءة الطقسية.', 5);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (318, 75, 'التراكيب الصامتة الثلاثية والرباعية دون فواصل متحركة', 7, 1, 7, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4129, 318, 'select', 'كيف يواجه القارئ القبطي توالي ثلاثة أحرف صامتة في بداية كلمة دون وجود حروف متحركة بينها؟', 'توالي الصوامت', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7298, 4129, 'الاستعانة بالجنكم الفطري أو المنطوق لكسر التقاء السواكن وتسهيل الانسياب الصوتي', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7299, 4129, 'حذف الحرف الأوسط من النطق', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7300, 4129, 'إضافة واو مد طويلة بين كل حرفين', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7301, 4129, 'تسكين الكلمة بالكامل والوقوف عليها', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4130, 318, 'read_select', 'في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)، كيف ينطلق الصوت في التركيب الصامت الثنائي «ⲥⲧ»؟', 'ⲥⲧⲁⲩⲣⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7302, 4130, 'صوت صفيري (س) يليه مباشرة انفجار تائي خفيف دون وقفة طويلة (إِستـ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7303, 4130, 'سكون تام مع مد الحرف السابق', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7304, 4130, 'تحويل التاء إلى طاء مفخمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7305, 4130, 'إبدال السيما بشين', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4131, 318, 'true_false', 'يجوز في قواعد القراءة القبطية أن تتوالى أربعة صوامت في مقطع واحد دون أي حركة صوتية أو جنكم.', 'تراكم الصوامت', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4132, 318, 'match', 'طابق كل تركيب صامت بلفظه المعرب الصحيح في بداية الكلمات الكنسية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲥⲡ-","right":"إسبـ (مثل: ⲥⲡⲉⲣⲙⲁ = نسل)"},{"left":"ⲥⲧ-","right":"إستـ (مثل: ⲥⲧⲁⲩⲣⲟⲥ = صليب)"},{"left":"ⲥⲭ-","right":"إسخـ (مثل: ⲥⲭⲏⲙⲁ = شكل/إسكيم)"},{"left":"ⲡⲛ-","right":"بنـ (مثل: ⲡⲛⲉⲩⲙⲁ = روح)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4133, 318, 'fill_blank', 'أكمل التركيب الصامت البادئ لكلمة ''روح'' اليونانية الأصل (بنيفما):', '...ⲉⲩⲙⲁ', NULL, NULL, 'ⲡⲛⲉⲩⲙⲁ', NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7306, 4133, 'ⲡⲛⲉⲩⲙⲁ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7307, 4133, 'ⲡⲥⲉⲩⲙⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7308, 4133, 'ⲡⲧⲉⲩⲙⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4134, 318, 'write', 'رتّب حروف كلمة ''روح'' بالقبطية (بنيفما):', 'ⲡⲛⲉⲩⲙⲁ', NULL, NULL, 'ⲡⲛⲉⲩⲙⲁ', '["ⲡ","ⲛ","ⲉ","ⲩ","ⲙ","ⲁ"]'::jsonb, NULL, TRUE, 6);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4135, 318, 'read_select', 'في الكلمة الرهبانية «ⲥⲭⲏⲙⲁ» (الإسكيم الرهباني)، كيف يُنطق المقطع الصامت الأول؟', 'ⲥⲭⲏⲙⲁ', NULL, NULL, NULL, NULL, NULL, TRUE, 7);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7309, 4135, 'إسخيـ (سيما يليها كاف أو خاء مع ياء ممدودة)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7310, 4135, 'شيما', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7311, 4135, 'سيما', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7312, 4135, 'سوخيما', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (319, 75, 'توالي الحروف الشفوية والأنفية (ⲙ, ⲛ, ⲡ, ⲃ) والوقفات الصوتية', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4136, 319, 'select', 'ماذا يحدث صوتياً عند توالي حرف الميم (ⲙ) مع حرف الباء (Ⲡ) كما في «ⲙ̀ⲡⲓⲣⲁⲛ»؟', 'ⲙ̀ⲡ-', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7313, 4136, 'تتحول حركة الميم الرنانة إلى تمهيد لانفجار الشفتين في الباء بسلاسة (إمبي)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7314, 4136, 'تدغم الميم في الباء وتصبح باء واحدة مشددة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7315, 4136, 'تسقط الباء تماماً من اللفظ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7316, 4136, 'تنقلب الميم إلى نون', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4137, 319, 'read_select', 'في التركيب «ⲙ̀ⲙⲟⲛ» (ليس / كلا)، ما هو الحكم الصوتي لتكرار حرف الميم؟', 'ⲙ̀ⲙⲟⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7317, 4137, 'الميم الأولى مقطع ساكن برنين (إِم-)، والميم الثانية تبدأ المقطع الموالي (ـمون)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7318, 4137, 'تنطق ميماً واحدة مخففة (مون)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7319, 4137, 'تنطق واواً مشددة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7320, 4137, 'تسقط الميم الثانية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4138, 319, 'true_false', 'توالي الحروف الأنفية (ⲙ و ⲛ) مع الحروف الشفوية (ⲃ و ⲡ) يعد من أكثر التراكيب الصوتية شيوعاً في قواعد الإضافة القبطية.', 'ⲙ̀ⲫ / ⲙ̀ⲡ / ⲛ̀ⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4139, 319, 'match', 'طابق القاعدة بتفسيرها الصوتي اللغوي في القبطية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"تحول ⲛ̀ إلى ⲙ̀","right":"تسهيل للنطق قبل الشفويات (Ⲃ, ⲙ, Ⲡ, Ⲫ)"},{"left":"الجنكم على ⲙ̀","right":"إعطاء رنين أنفي مستقل كهمزة كسر"},{"left":"ⲙ̀ⲫⲓⲱⲧ","right":"إمفيوت (توالي ميم أنفية مع فاء مهموسة)"},{"left":"ⲙ̀ⲡⲓⲱⲧ","right":"إمبيوت (توالي ميم مع باء غير معطشة)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4140, 319, 'select', 'لماذا نقول «ⲙ̀Ⲫⲓⲱⲧ» (للآب) بحرف الميم بدلاً من «ⲛ̀Ⲫⲓⲱⲧ»؟', 'ⲙ̀Ⲫⲓⲱⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7321, 4140, 'لأن الفاي (Ⲫ) حرف شفوي يناسبه إبدال النون ميماً للمجانسة الصوتية', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7322, 4140, 'لأن كلمة آب مؤنثة في القبطية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7323, 4140, 'لأنها قاعدة اختيارية لا أثر لها', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7324, 4140, 'لأن النون محرمة في الكلمات اللاهوتية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4141, 319, 'fill_blank', 'أكمل أداة الإضافة المناسبة لكلمة ''الآب'' المسبوقة بحرف شفوي (.. Ⲫⲓⲱⲧ):', '...̀ Ⲫⲓⲱⲧ', NULL, NULL, 'ⲙ̀Ⲫⲓⲱⲧ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7325, 4141, 'ⲙ̀Ⲫⲓⲱⲧ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7326, 4141, 'ⲛ̀Ⲫⲓⲱⲧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7327, 4141, 'ⲧ̀Ⲫⲓⲱⲧ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4142, 319, 'write', 'رتّب حروف كلمة ''كلا / ليس'' بالقبطية بتوالي الميمين (إم-مون):', 'ⲙ̀ⲙⲟⲛ', NULL, NULL, 'ⲙ̀ⲙⲟⲛ', '["ⲙ̀","ⲙ","ⲟ","ⲛ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (320, 75, 'نطق المقاطع المشددة والحروف المزدوجة المتماثلة', 8, 1, 8, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4143, 320, 'select', 'عند تكرار نفس الحرف الساكن مرتين متتاليتين في كلمة واحدة (مثل ⲙⲙ أو ⲗⲗ أو ⲅⲅ)، كيف يُؤدى النطق؟', 'الحروف المتماثلة المتتالية', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7328, 4143, 'يُشدد الحرف وينقسم بين المقطع السابق والمقطع اللاحق مع إعطائه زمناً مضاعفاً', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7329, 4143, 'يُسقط الحرف الأول تماماً وينطق كحرف واحد مفرد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7330, 4143, 'يتحول كلاهما إلى واو مد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7331, 4143, 'يمنع نطق الكلمة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4144, 320, 'read_select', 'في كلمة «ⲁⲗⲗⲏⲗⲟⲩⲓⲁ» (هلليلويا)، كيف يُنطق حرفا اللافلا المتتاليان (ⲗⲗ)؟', 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7332, 4144, 'لام مشددة ممتدة الارتكاز: (أل-لي-لو-يا)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7333, 4144, 'لام مخففة سريعة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7334, 4144, 'راء مكررة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7335, 4144, 'نون أنفية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4145, 320, 'true_false', 'في كلمة «ⲁⲅⲅⲉⲗⲟⲥ»، حرفا الغاما المتتاليان يُنطقان بصوت واحد مكرر (غين مشددة).', 'ⲁⲅⲅⲉⲗⲟⲥ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4146, 320, 'match', 'طابق كل كلمة بالحكم الصوتي للحرفين المتتاليين فيها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲁⲗⲗⲏⲗⲟⲩⲓⲁ","right":"تشديد اللام (أل-ليلويا)"},{"left":"ⲁⲅⲅⲉⲗⲟⲥ","right":"تغير الصوت: الأولى نون والثانية جيم"},{"left":"ⲉⲙⲙⲁⲛⲟⲩⲏⲗ","right":"تشديد الميم (إم-مانوئيل)"},{"left":"ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ","right":"فصل صوتي بين الكلمتين المتعاقبتين"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4147, 320, 'select', 'في اسم «Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ» (عمانوئيل)، كيف ينقسم صوت الميم المزدوج بين المقاطع؟', 'Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7336, 4147, 'الميم الأولى تقفل المقطع الأول (ⲉⲙ)، والثانية تفتح المقطع الثاني (ⲙⲁ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7337, 4147, 'الميمان تقعان في مقطع واحد معاً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7338, 4147, 'تسقط الميم الأولى', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7339, 4147, 'تتحول الميم الثانية إلى ألف', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4148, 320, 'fill_blank', 'أكمل الكلمة الليتورجية الشهيرة ''هلليلويا'' بالحرف المشدد المزدوج (ⲗⲗ):', 'ⲁ...ⲏⲗⲟⲩⲓⲁ', NULL, NULL, 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7340, 4148, 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7341, 4148, 'ⲁⲗⲏⲗⲟⲩⲓⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7342, 4148, 'ⲁⲣⲣⲏⲗⲟⲩⲓⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4149, 320, 'write', 'رتّب حروف اسم عمانوئيل بالقبطية بميمه المشددة (إمّانوئيل):', 'Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ', NULL, NULL, 'Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ', '["Ⲉ","ⲙ","ⲙ","ⲁ","ⲛ","ⲟⲩ","ⲏ","ⲗ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4150, 320, 'read_select', 'ما هو الأثر السمعي الدقيق لتشديد الحرف في الترتيل الكنسي؟', 'التشديد والترتيل', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7343, 4150, 'إبراز قوة المعنى وتثبيت النغمة الموسيقية على زمنين متتابعين', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7344, 4150, 'إسقاط اللحن', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7345, 4150, 'تسريع الكلمة دون وضوح', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7346, 4150, 'تغيير لغة الترتيل', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (321, 75, 'مختبر الطلاقة الصوتية في التراكيب السريعة', 8, 1, 8, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4151, 321, 'select', 'ما هي الطريقة المثالية لتحقيق الطلاقة عند قراءة جملة قبطية سريعة في طقس الخدمة؟', 'الطلاقة الكنسية', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7347, 4151, 'الربط الصوتي السليم بين أواخر الكلمات وبداياتها مع مراعاة الجنكم ومخارج الحروف', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7348, 4151, 'الوقف المطول بعد كل حرف بشكل منفصل', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7349, 4151, 'حذف الحركات القصيرة وتسكين كافة نهايات الكلمات', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7350, 4151, 'نطق الكلمات القبطية بنبر عربي عامي', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4152, 321, 'read_select', 'في ترتيل «Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ»، كيف ينساب الوصل بين «Ⲡⲉⲛⲓⲱⲧ» و «ⲉⲧϧⲉⲛ»؟', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7351, 4152, 'ينتهي الأول بتاف ساكنة تتصل فوراً بهمزة القطع المكسورة (إِتخين): (بينيوت-إتخين)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7352, 4152, 'تدمج التاف مع الهمزة فتصبح طاء ممدودة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7353, 4152, 'تسقط التاف الأخيرة تماماً من اللفظ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7354, 4152, 'يتم الوقف الإجباري لمدة دقيقة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4153, 321, 'true_false', 'قراءة النصوص القبطية بطلاقة تقتضي إلغاء الفروق بين الواو القصيرة (Ⲟ) والواو الطويلة (Ⲱ) لسرعة اللحن.', 'Ⲟ vs Ⲱ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4154, 321, 'match', 'طابق كل تركيب صوتي مركب بمهارة القراءة المطلوبة فيه:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ","right":"وصل سريع في إعلان القيامة المجيد"},{"left":"ϧⲉⲛ ⲟⲩϩⲓⲣⲏⲛⲏ","right":"وصل حرف الجر بأداة التنكير والاسم"},{"left":"Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ","right":"تشديد اللام وإطلاق صوت المد النهائي"},{"left":"Ϫⲉ ⲡⲉⲛⲓⲱⲧ","right":"فصل نبري خفيف عند أداة القول Ϫⲉ"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4155, 321, 'select', 'في عبارة التمجيد الشهيرة «Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ» (المسيح قام)، ما معنى الفعل «ⲁϥⲧⲱⲛϥ»؟', 'ⲁϥⲧⲱⲛϥ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7355, 4155, 'قامَ (فعل ماضٍ للمذكر الغائب)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7356, 4155, 'ماتَ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7357, 4155, 'صعدَ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7358, 4155, 'جلسَ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4156, 321, 'fill_blank', 'أكمل عبارة تحية القيامة الخالدة ''المسيح قام'' (Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ...):', 'Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ...', NULL, NULL, 'ⲁϥⲧⲱⲛϥ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7359, 4156, 'ⲁϥⲧⲱⲛϥ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7360, 4156, 'ⲁⲛⲧⲱⲛϥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7361, 4156, 'ⲁⲩⲧⲱⲛϥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4157, 321, 'write', 'رتّب حروف عبارة ''المسيح قام'' بالقبطية (بي خريستوس أفتونف):', 'Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ', NULL, NULL, 'Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ', '["Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ","ⲁϥⲧⲱⲛϥ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4158, 321, 'read_select', 'كم صوتاً صامتاً متتالياً يشتمل عليه مقطع «ⲧⲱⲛϥ» في نهايته؟', 'ⲧⲱⲛϥ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7362, 4158, 'صامتان متعاقبان مقفولان: النون (ⲛ) والفاي (ϥ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7363, 4158, 'صامت واحد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7364, 4158, 'ثلاثة صوامت', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7365, 4158, 'لا يوجد صوامت', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_75', v_level_id, 75, 'صندوق إتقان الوحدة ٥: التراكيب الصامتة المعقدة والحروف المزدوجة المتتالية', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 321, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٥: التراكيب الصامتة المعقدة والحروف المزدوجة المتتالية', 'star', 'أتممت الوحدة ٥: التراكيب الصامتة المعقدة والحروف المزدوجة المتتالية', 5);

    -- ---------------------------------------------------------
    -- Unit 6: الوحدة ٦: قاموس المفردات الحياتية والكنسية والطقسية
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (76, v_level_id, 'الوحدة ٦: قاموس المفردات الحياتية والكنسية والطقسية', 'Ⲉⲕⲕⲗⲏⲥⲓⲁ', 'إتقان المفردات الطقسية الكبرى (الهيكل، الأسرار، التقويم والشهور القبطية، الرتب الكنسية، والأسرة والطبيعة).', 6);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (322, 76, 'مفردات الهيكل والأسرار والمقدسات', 7, 1, 7, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4159, 322, 'select', 'ما معنى كلمة «ⲉⲣⲫⲏⲓ» (إرفي) في المصطلحات الكنسية العريقة؟', 'ⲉⲣⲫⲏⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7366, 4159, 'الهيكل / المعبد المقدس', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7367, 4159, 'المذبح الحجري فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7368, 4159, 'صحن الكنيسة الخارجي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7369, 4159, 'برج الأجراس', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4160, 322, 'read_select', 'ما هي الكلمة القبطية الدقيقة لمصطلح ''المذبح'' المقدس؟', 'المذبح المقدس', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7370, 4160, 'ⲡⲓⲙⲁⲛ̀ⲉⲣϣⲱⲟⲩϣⲓ (بي ما إن إرشووشي) أو ⲑⲩⲥⲓⲁⲥⲧⲏⲣⲓⲟⲛ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7371, 4160, 'ⲡⲓⲱⲛϧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7372, 4160, 'ⲡⲓⲥⲱⲙⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7373, 4160, 'ⲧⲓⲙⲉⲧⲟⲩⲣⲟ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4161, 322, 'true_false', 'كلمة «ⲙⲩⲥⲧⲏⲣⲓⲟⲛ» (مستيريون) تعني ''سر مقدّس'' من أسرار الكنيسة السبعة.', 'ⲙⲩⲥⲧⲏⲣⲓⲟⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4162, 322, 'match', 'طابق كل مصطلح طقسي كنسي بمعناه الصحيح بالعربية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲉⲕⲕⲗⲏⲥⲓⲁ","right":"كنيسة / جماعة المؤمنين"},{"left":"ⲉⲣⲫⲏⲓ","right":"هيكل مقدس"},{"left":"ⲡⲓⲱⲓⲕ","right":"الخبز / القربان المقدس"},{"left":"ⲡⲓⲏⲣⲡ","right":"الخمر (عصير الكرمة الطقسي)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4163, 322, 'select', 'ما معنى الكلمتين «ⲡⲓⲥⲱⲙⲁ» و «ⲡⲓⲥⲛⲟϥ» في صلوات القداس الإلهي؟', 'ⲡⲓⲥⲱⲙⲁ / ⲡⲓⲥⲛⲟϥ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7374, 4163, 'الجسد والدم الأقدسان', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7375, 4163, 'الماء والزيت', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7376, 4163, 'البخور والشمع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7377, 4163, 'الإنجيل والرسائل', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4164, 322, 'fill_blank', 'أكمل عبارة سر التناول ''الجسد والدم'': (ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ...):', 'ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ...', NULL, NULL, 'ⲡⲓⲥⲛⲟϥ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7378, 4164, 'ⲡⲓⲥⲛⲟϥ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7379, 4164, 'ⲡⲓⲱⲓⲕ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7380, 4164, 'ⲡⲓⲏⲣⲡ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4165, 322, 'write', 'رتّب حروف كلمة ''كنيسة'' بالقبطية (إككليسيا):', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', NULL, NULL, 'ⲉⲕⲕⲗⲏⲥⲓⲁ', '["ⲉ","ⲕ","ⲕ","ⲗ","ⲏ","ⲥ","ⲓ","ⲁ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (323, 76, 'مصطلحات الأعياد، الأصوام، والتقويم القبطي', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4166, 323, 'select', 'ما هو الشهر الأول في التقويم القبطي ومبدأ السنة القبطية الشهداء؟', 'الشهر الأول', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7381, 4166, 'Ⲑⲱⲟⲩⲧ (توت)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7382, 4166, 'Ⲡⲁⲟⲡⲓ (بابه)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7383, 4166, 'Ϩⲁⲑⲱⲣ (هاتور)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7384, 4166, 'Ⲭⲟⲓⲁⲕ (كيهك)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4167, 323, 'read_select', 'ما معنى كلمة «Ⲡⲁⲥⲭⲁ» (بصخة) وكلمة «ⲡⲓⲛⲏⲥⲧⲓⲁ» (بي نيستيا)؟', 'Ⲡⲁⲥⲭⲁ / ⲛⲏⲥⲧⲓⲁ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7385, 4167, 'الفصح (العبور)، والصوم المقدس', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7386, 4167, 'الميلاد، وعيد الغطاس', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7387, 4167, 'الصعود، وعيد العنصرة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7388, 4167, 'القربان، والبخور', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4168, 323, 'true_false', 'يحتوي التقويم القبطي على 13 شهراً، منها 12 شهراً طول كل منها 30 يوماً وشهر أخير صغير يسمى «Ⲡⲓⲁ̀ⲃⲟⲧ ⲛ̀ⲕⲟⲩϫⲓ» (الشهر الصغير / النسيء).', 'التقويم القبطي', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4169, 323, 'match', 'طابق الشهور القبطية الأربعة الأولى بترتيبها الزمني الصحيح:', NULL, NULL, NULL, NULL, NULL, '[{"left":"الشهر 1","right":"Ⲑⲱⲟⲩⲧ (توت)"},{"left":"الشهر 2","right":"Ⲡⲁⲟⲡⲓ (بابه)"},{"left":"الشهر 3","right":"Ϩⲁⲑⲱⲣ (هاتور)"},{"left":"الشهر 4","right":"Ⲭⲟⲓⲁⲕ (كيهك)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4170, 323, 'select', 'ما اسم عيد القيامة المجيد بالقبطية؟', 'عيد القيامة المجيد', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7389, 4170, 'Ⲡϣⲁⲓ ⲛ̀ⲧⲉ Ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ (بشاي إنتي تي أناستاسيس)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7390, 4170, 'Ⲡϣⲁⲓ ⲙ̀Ⲡⲓϫⲓⲛⲙⲓⲥⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7391, 4170, 'Ⲡϣⲁⲓ ⲙ̀Ⲡⲓⲱⲙⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7392, 4170, 'Ⲡϣⲁⲓ ⲛ̀Ⲧⲉⲡⲓⲫⲁⲛⲓⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4171, 323, 'fill_blank', 'أكمل اسم شهر التسبيح المريمي المشهور كيهك (خوياك):', '...ⲟⲓⲁⲕ', NULL, NULL, 'Ⲭⲟⲓⲁⲕ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7393, 4171, 'Ⲭⲟⲓⲁⲕ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7394, 4171, 'Ϧⲟⲓⲁⲕ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7395, 4171, 'Ⲕⲟⲓⲁⲕ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4172, 323, 'write', 'رتّب حروف كلمة ''عيد'' بالقبطية (بشاي):', 'Ⲡϣⲁⲓ', NULL, NULL, 'Ⲡϣⲁⲓ', '["Ⲡ","ϣ","ⲁ","ⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (324, 76, 'الألقاب الكنسية والصفات الروحية', 8, 1, 8, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4173, 324, 'select', 'ما هو اللقب القبطي المعادل لرتبة ''البطريرك'' أو بابا الإسكندرية؟', 'البابا والبطريرك', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7396, 4173, 'Ⲡⲁⲡⲁ ⲟⲩⲟϩ ⲛ̀Ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ (بابا أووه إن باتريارشيس)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7397, 4173, 'Ⲡⲓⲇⲓⲁⲕⲱⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7398, 4173, 'Ⲡⲓⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7399, 4173, 'Ⲡⲓⲯⲁⲗⲧⲏⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4174, 324, 'read_select', 'ما معنى رتبة الشماس بالقبطية واليونانية «ⲡⲓⲇⲓⲁⲕⲱⲛ» (بي دياكون)؟', 'ⲡⲓⲇⲓⲁⲕⲱⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7400, 4174, 'الخادم المكرس لخدمة المذبح والفقراء', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7401, 4174, 'القارئ فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7402, 4174, 'المرتل الموسيقي فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7403, 4174, 'حارس الباب', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4175, 324, 'true_false', 'كلمة «ⲟⲩⲏⲃ» (ويب) هي الكلمة القبطية الأصيلة المعبرة عن رتبة ''كاهن'' أو ''قس''.', 'ⲟⲩⲏⲃ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4176, 324, 'match', 'طابق كل رتبة كنسية بمعناها القبطي والوظيفي:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲡⲓⲉⲡⲓⲥⲕⲟⲡⲟⲥ","right":"الأسقف (الناظر من فوق / الراعي)"},{"left":"ⲡⲓⲟⲩⲏⲃ / ⲡⲓⲡⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ","right":"القسيس / الكاهن الشيخ"},{"left":"ⲡⲓⲇⲓⲁⲕⲱⲛ","right":"الشماس (الخادم)"},{"left":"ⲡⲓⲯⲁⲗⲧⲏⲥ","right":"المرتل (الإبصالتيس)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4177, 324, 'select', 'ما معنى الصفة الروحية القبطية «ⲉⲑⲟⲩⲁⲃ» في جملة «Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ»؟', 'ⲉⲑⲟⲩⲁⲃ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7404, 4177, 'القدوس / الطاهر (الروح القدس)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7405, 4177, 'العظيم / العالي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7406, 4177, 'المحيي فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7407, 4177, 'الضابط لكل شيء', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4178, 324, 'fill_blank', 'أكمل اللقب الثالوثي ''الروح القدس'' (Ⲡⲓⲡⲛⲉⲩⲙⲁ ...):', 'Ⲡⲓⲡⲛⲉⲩⲙⲁ ...', NULL, NULL, 'ⲉⲑⲟⲩⲁⲃ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7408, 4178, 'ⲉⲑⲟⲩⲁⲃ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7409, 4178, 'ⲉⲧⲧⲁⲓⲏⲟⲩⲧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7410, 4178, 'ⲉⲑⲛⲁⲛⲉϥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4179, 324, 'write', 'رتّب حروف كلمة ''الكاهن'' بالقبطية الأصيلة (بي ويب):', 'Ⲡⲓⲟⲩⲏⲃ', NULL, NULL, 'Ⲡⲓⲟⲩⲏⲃ', '["Ⲡⲓ","ⲟⲩ","ⲏ","ⲃ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4180, 324, 'read_select', 'في تسمية الكهنة «ⲛⲓⲟⲩⲏⲃ»، ما هي أداة التعريف المستعملة هنا؟', 'ⲛⲓⲟⲩⲏⲃ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7411, 4180, 'Ⲛⲓ أداة تعريف الجمع المذكر والمؤنث العامة (الـ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7412, 4180, 'Ⲡⲓ أداة المفرد المذكر', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7413, 4180, 'Ϯ أداة المفرد المؤنث', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7414, 4180, 'Ⲟⲩ أداة التنكير', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (325, 76, 'المفردات اليومية، الطبيعة، والأسرة المتقدمة', 8, 1, 8, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4181, 325, 'select', 'ما هي معاني كلمات الأسرة الأساسية: «ⲓⲱⲧ»، «ⲙⲁⲩ»، «ⲥⲟⲛ»، «ⲥⲱⲛⲓ»؟', 'ⲓⲱⲧ / ⲙⲁⲩ / ⲥⲟⲛ / ⲥⲱⲛⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7415, 4181, 'أب، أم، أخ، أخت', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7416, 4181, 'جد، جدة، عم، عمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7417, 4181, 'ابن، ابنة، حفيد، حفيدة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7418, 4181, 'معلم، تلميذ، صديق، جار', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4182, 325, 'read_select', 'ما معنى كلمة «ⲙⲱⲟⲩ» (موو) وكلمة «ⲕⲁϩⲓ» (كاهي)؟', 'ⲙⲱⲟⲩ / ⲕⲁϩⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7419, 4182, 'الماء، والأرض / التراب', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7420, 4182, 'النار، والهواء', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7421, 4182, 'الشمس، والقمر', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7422, 4182, 'الشجر، والثمر', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4183, 325, 'true_false', 'كلمة «ⲣⲏ» (ري) تعني ''الشمس''، وكلمة «ⲓⲟϩ» (يوه) تعني ''القمر'' بالقبطية.', 'ⲣⲏ / ⲓⲟϩ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4184, 325, 'match', 'طابق عناصر الطبيعة بالقبطية بمعانيها العربية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲣⲏ","right":"الشمس"},{"left":"ⲓⲟϩ","right":"القمر"},{"left":"ⲥⲓⲟⲩ","right":"النجم"},{"left":"ⲙⲱⲟⲩ","right":"الماء"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4185, 325, 'select', 'ما معنى الكلمة القبطية «ⲣⲱⲙⲓ» (رومي) التي تشكل جوهر تعريف الكائن البشري؟', 'ⲣⲱⲙⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7423, 4185, 'إنسان / رجل / بشر', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7424, 4185, 'ملك / حاكم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7425, 4185, 'ملاك نوراني', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7426, 4185, 'طائر', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4186, 325, 'fill_blank', 'أكمل كلمة ''أخ'' بالقبطية (سون):', '...ⲟⲛ', NULL, NULL, 'ⲥⲟⲛ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7427, 4186, 'ⲥⲟⲛ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7428, 4186, 'ⲕⲟⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7429, 4186, 'ⲣⲟⲛ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4187, 325, 'write', 'رتّب حروف كلمة ''إنسان / رجل'' بالقبطية (رومي):', 'ⲣⲱⲙⲓ', NULL, NULL, 'ⲣⲱⲙⲓ', '["ⲣ","ⲱ","ⲙ","ⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4188, 325, 'read_select', 'في تعبير «ⲡⲁⲥⲟⲛ» و «ⲧⲁⲥⲱⲛⲓ»، ما وظيفة السوابق ⲡⲁ- و ⲧⲁ-؟', 'ⲡⲁⲥⲟⲛ / ⲧⲁⲥⲱⲛⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7430, 4188, 'ضمائر ملكية للمتكلم: (أخي) للمذكر، و(أختي) للمؤنث', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7431, 4188, 'أدوات تنكير', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7432, 4188, 'حروف نداء', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7433, 4188, 'أفعال ماضية', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_76', v_level_id, 76, 'صندوق إتقان الوحدة ٦: قاموس المفردات الحياتية والكنسية والطقسية', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 325, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٦: قاموس المفردات الحياتية والكنسية والطقسية', 'star', 'أتممت الوحدة ٦: قاموس المفردات الحياتية والكنسية والطقسية', 6);

    -- ---------------------------------------------------------
    -- Unit 7: الوحدة ٧: فك شفرات الاختصارات والرموز والمخطوطات
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (77, v_level_id, 'الوحدة ٧: فك شفرات الاختصارات والرموز والمخطوطات', 'Ⲓ̅Ⲏ̅Ⲥ', 'تحليل الأسماء المقدسة (Nomina Sacra)، اختصارات الألقاب الكنسية، ونظام الأرقام والتوثيق المخطوطي.', 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (326, 77, 'الأسماء المقدسة الرئيسية (Nomina Sacra)', 8, 1, 8, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4189, 326, 'select', 'ماذا يسمى وضع خط أفقي يعلو حرفين أو ثلاثة في المخطوطات القبطية للدلالة على اسم إلهي مقدس؟', 'Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7434, 4189, 'الأسماء المقدسة (Nomina Sacra)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7435, 4189, 'الجنكم التكراري', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7436, 4189, 'علامة الاستفهام الكنسية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7437, 4189, 'شكل النغمة اللحنية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4190, 326, 'read_select', 'إلى أي اسم يشير الاختصار الكنسي الشهير «Ⲓ̅ⲏ̅ⲥ̅» أو «Ⲓ̅ⲥ̅» في الأيقونات والمخطوطات؟', 'Ⲓ̅ⲏ̅ⲥ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7438, 4190, 'ⲓⲏⲥⲟⲩⲥ (يسوع)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7439, 4190, 'ⲓⲱⲁⲛⲛⲏⲥ (يوحنا)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7440, 4190, 'ⲓⲁⲕⲱⲃⲟⲥ (يعقوب)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7441, 4190, 'ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ (أورشليم)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4191, 326, 'true_false', 'الاختصار «Ⲡ̅ⲭ̅ⲥ̅» في المخطوطات والأيقونات يشير إلى لقب «Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ» (المسيح).', 'Ⲡ̅ⲭ̅ⲥ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4192, 326, 'match', 'طابق كل اختصار مقدس بالاسم الكامل الذي يمثله في الكنيسة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲓ̅ⲥ̅","right":"ⲓⲏⲥⲟⲩⲥ (يسوع)"},{"left":"Ⲡ̅ⲭ̅ⲥ̅","right":"Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (المسيح)"},{"left":"Ⲑ̅ⲥ̅","right":"Ⲑⲉⲟⲥ (الله)"},{"left":"Ⲡ̅ⲛ̅ⲁ̅","right":"Ⲡⲛⲉⲩⲙⲁ (الروح)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4193, 326, 'select', 'في كتابة «Ⲟ̅ⲥ̅» أو «Ⲑ̅ⲥ̅»، يشير الاختصار إلى كلمة يونانية شهيرة هي:', 'Ⲑ̅ⲥ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7442, 4193, 'Ⲑⲉⲟⲥ (ثيئوس = الله)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7443, 4193, 'Ⲑⲱⲟⲩⲧ (توت)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7444, 4193, 'Ⲑⲁⲙⲓⲟ (يخلق)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7445, 4193, 'Ⲑⲉⲗⲏⲙⲁ (مشيئة)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4194, 326, 'fill_blank', 'أكمل الاسم الكامل للاختصار المقدس ''المسيح'' (Ⲡⲓ...ⲥⲧⲟⲥ):', 'Ⲡⲓ...ⲥⲧⲟⲥ', NULL, NULL, 'ⲭⲣⲓ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7446, 4194, 'ⲭⲣⲓ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7447, 4194, 'ⲕⲣⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7448, 4194, 'ϣⲣⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4195, 326, 'write', 'رتّب حروف الاسم الإلهي ''يسوع'' بالقبطية كاملاً (إيسوس):', 'Ⲓⲏⲥⲟⲩⲥ', NULL, NULL, 'Ⲓⲏⲥⲟⲩⲥ', '["Ⲓ","ⲏ","ⲥ","ⲟⲩ","ⲥ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4196, 326, 'read_select', 'على أيقونة ضابط الكل يكتب «Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅»، ما هي الترجمة الحرفية الدقيقة؟', 'Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7449, 4196, 'يسوع المسيح', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7450, 4196, 'ابن الله', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7451, 4196, 'مخلص العالم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7452, 4196, 'ملك الملوك', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (327, 77, 'اختصارات الألقاب والصلوات الشائعة', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4197, 327, 'select', 'في كتب القطمارس والدفنار، ماذا يعني اختصار «ⲁ̅ⲗ» في بداية الفقرات؟', 'ⲁ̅ⲗ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7453, 4197, 'اختصار لكلمة «Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ» (هلليلويا)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7454, 4197, 'اختصار للألفا الأولى', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7455, 4197, 'اختصار لكلمة ألو (صبي)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7456, 4197, 'اختصار لمدينة الإسكندرية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4198, 327, 'read_select', 'في المخطوطات الطقسية، إلى ماذا يرمز الحرف «Ⲇ̅» أو «Ⲇⲟ̅» في هوامش الخدمة؟', 'Ⲇ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7457, 4198, 'مرد المجد «Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ» (المجد للآب)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7458, 4198, 'الشماس دياكون', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7459, 4198, 'الداود النبي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7460, 4198, 'اليوم العاشر', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4199, 327, 'true_false', 'يرمز الحرفان «Ⲕ̅ⲉ̅» في نصوص المردات الكنسية إلى «Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ» (يا رب ارحم).', 'Ⲕ̅ⲉ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4200, 327, 'match', 'طابق كل رمز اختصاري بالعبارة الطقسية الكاملة له:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲕ̅ⲉ̅","right":"Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ (يا رب ارحم)"},{"left":"ⲁ̅ⲗ","right":"Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (هلليلويا)"},{"left":"ⲉ̅ⲑ̅ⲩ̅","right":"ⲉⲑⲟⲩⲁⲃ (قدوس / طاهر)"},{"left":"ⲡ̅ⲣ̅","right":"ⲡⲣⲟⲥⲉⲩⲭⲏ (صلاة / طلبة)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4201, 327, 'select', 'ما معنى العبارة اليونانية الشهيرة «Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ»؟', 'Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7461, 4201, 'يا رب ارحم', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7462, 4201, 'يا رب اسمع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7463, 4201, 'المجد لله', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7464, 4201, 'السلام للجميع', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4202, 327, 'fill_blank', 'أكمل نداء طلب الرحمة باليونانية (Ⲕⲩⲣⲓⲉ ...):', 'Ⲕⲩⲣⲓⲉ ...', NULL, NULL, 'ⲉⲗⲉⲏⲥⲟⲛ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7465, 4202, 'ⲉⲗⲉⲏⲥⲟⲛ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7466, 4202, 'ⲁⲝⲓⲟⲥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7467, 4202, 'ⲇⲟⲝⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4203, 327, 'write', 'رتّب حروف كلمة ''يا رب'' باليونانية الطقسية (كيريي):', 'Ⲕⲩⲣⲓⲉ', NULL, NULL, 'Ⲕⲩⲣⲓⲉ', '["Ⲕ","ⲩ","ⲣ","ⲓ","ⲉ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (328, 77, 'نظام الترقيم القبطي الكامل (الحساب بالأبجدية من 1 إلى 900)', 8, 1, 8, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4204, 328, 'select', 'كيف يُعبَّر عن الأرقام في نظام الترقيم الحسابي القبطي؟', 'حساب الجُمّل القبطي', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7468, 4204, 'باستخدام حروف الأبجدية القبطية يعلوها خط أفقي لتمييزها كأرقام عددية', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7469, 4204, 'باستخدام أرقام هيروغليفية معقدة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7470, 4204, 'بالأرقام الرومانية I, V, X فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7471, 4204, 'بالأرقام الهندية العربية 1, 2, 3', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4205, 328, 'read_select', 'ما هي القيمة العددية للرمز الخاص «ⲋ̅» (سو) في حساب الأرقام القبطي؟', 'ⲋ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7472, 4205, 'الرقم ستة (6)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7473, 4205, 'الرقم سبعة (7)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7474, 4205, 'الرقم ستين (60)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7475, 4205, 'الرقم ستمائة (600)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4206, 328, 'true_false', 'الحرف «Ⲓ̅» يمثل الرقم 10، والحرف «ⲣ̅» يمثل الرقم 100 في الحساب القبطي.', 'Ⲓ̅ = 10 / ⲣ̅ = 100', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4207, 328, 'match', 'طابق الحروف بالأرقام العددية التي تمثلها في حساب الأبجدية القبطية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲁ̅","right":"1 (واحد)"},{"left":"ⲉ̅","right":"5 (خمسة)"},{"left":"ⲋ̅","right":"6 (ستة)"},{"left":"ⲓ̅","right":"10 (عشرة)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4208, 328, 'select', 'كيف يكتب الرقم 12 بالقبطية بدمج العشرات والآحاد (10 + 2)؟', 'العدد 12', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7476, 4208, 'Ⲓ̅ⲃ̅ (عشرة Ⲓ + اثنان Ⲃ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7477, 4208, 'Ⲃ̅Ⲓ̅', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7478, 4208, 'ⲁ̅ⲃ̅', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7479, 4208, 'ⲙ̅ⲃ̅', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4209, 328, 'fill_blank', 'أكمل كتابة الرمز العددي القبطي للرقم 6 (سو):', '...̅', NULL, NULL, 'ⲋ̅', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7480, 4209, 'ⲋ̅', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7481, 4209, 'ⲍ̅', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7482, 4209, 'ⲉ̅', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4210, 328, 'write', 'رتّب حروف العدد 15 بالقبطية (10 + 5 = Ⲓ̅ⲉ̅):', 'Ⲓ̅ⲉ̅', NULL, NULL, 'Ⲓ̅ⲉ̅', '["Ⲓ̅","ⲉ̅"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4211, 328, 'read_select', 'ما هو الحرف الذي يمثل الرقم ثمانية (8) في الأرقام القبطية؟', 'الرقم 8', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7483, 4211, 'حرف الإيتا (Ⲏ̅)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7484, 4211, 'حرف الزاتا (Ⲍ̅)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7485, 4211, 'حرف الثيتا (Ⲑ̅)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7486, 4211, 'حرف الكابا (Ⲕ̅)', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (329, 77, 'قراءة وتفكيك نماذج حقيقية من نصوص المخطوطات والصلوات', 7, 1, 7, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4212, 329, 'select', 'عند قراءة سطر مخطوطي يبدأ بـ «Ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ»، ما معنى هذه العبارة الإنجيلية الشهيرة؟', 'Ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7487, 4212, 'ملكوت السموات', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7488, 4212, 'كنيسة القديسين', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7489, 4212, 'صلاة الأبرار', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7490, 4212, 'عرش الآباء', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4213, 329, 'read_select', 'في النص المخطوطي «Ⲁⲙⲏⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ»، كم لغة تشترك في صياغة هذه التسبيحة الجامعة؟', 'Ⲁⲙⲏⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7491, 4213, 'لغتان: العبرانية (آمين، هلليلويا) واليونانية (ذوكسا باتري)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7492, 4213, 'القبطية فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7493, 4213, 'اللاتينية والعربية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7494, 4213, 'السريانية والفارسية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4214, 329, 'true_false', 'تتميز المخطوطات القبطية القديمة بعدم وضع فواصل ومسافات واسعة بين الكلمات في بعض العصور (Scriptio continua).', 'المخطوطات القديمة', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4215, 329, 'match', 'طابق المقاطع المخطوطية بمعناها في التحليل الإنجيلي:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ϯⲙⲉⲧⲟⲩⲣⲟ","right":"الملكوت (الملكية العظمى)"},{"left":"ⲛⲓⲫⲏⲟⲩⲓ","right":"السموات (جمع بفي = سماء)"},{"left":"Ⲡⲉⲛⲛⲟⲩϯ","right":"إلهنا (نووتي + بين)"},{"left":"Ⲡⲉⲛⲥⲱⲧⲏⲣ","right":"مخلصنا (سوتير + بين)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4216, 329, 'select', 'في نهاية فصول الأناجيل بالمخطوطات نجد «Ⲡⲉⲧⲉ ⲟⲩⲟⲛ ⲙⲁϣϫ ⲙ̀ⲙⲟϥ ⲉ̀ⲥⲱⲧⲉⲙ»، ما معناه؟', 'Ⲡⲉⲧⲉ ⲟⲩⲟⲛ ⲙⲁϣϫ ⲙ̀ⲙⲟϥ ⲉ̀ⲥⲱⲧⲉⲙ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7495, 4216, 'من له أذنان للسمع فليسمع', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7496, 4216, 'المجد لله دائماً أبدياً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7497, 4216, 'طوبى لمن يتلو هذا الكلام', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7498, 4216, 'هذا هو إنجيل المسيح', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4217, 329, 'fill_blank', 'أكمل الكلمة المخطوطية الشهيرة لـ ''الملكوت'' (Ϯ...ⲟⲩⲣⲟ):', 'Ϯ...ⲟⲩⲣⲟ', NULL, NULL, 'ⲙⲉⲧ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7499, 4217, 'ⲙⲉⲧ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7500, 4217, 'ⲣⲉϥ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7501, 4217, 'ϫⲓⲛ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4218, 329, 'write', 'رتّب حروف كلمة ''الملكوت'' بالقبطية كاملة (تي ميت أورو):', 'Ϯⲙⲉⲧⲟⲩⲣⲟ', NULL, NULL, 'Ϯⲙⲉⲧⲟⲩⲣⲟ', '["Ϯ","ⲙⲉⲧ","ⲟⲩ","ⲣ","ⲟ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_77', v_level_id, 77, 'صندوق إتقان الوحدة ٧: فك شفرات الاختصارات والرموز والمخطوطات', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 329, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٧: فك شفرات الاختصارات والرموز والمخطوطات', 'star', 'أتممت الوحدة ٧: فك شفرات الاختصارات والرموز والمخطوطات', 7);

    -- ---------------------------------------------------------
    -- Unit 8: الوحدة ٨: قراءة ونقد النصوص الكنسية الشهيرة
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (78, v_level_id, 'الوحدة ٨: قراءة ونقد النصوص الكنسية الشهيرة', 'Ⲡⲉⲛⲓⲱⲧ', 'تحليل وتفكيك نصوص الصلاة الربانية ولحن البركة وصلاة الصلح وتسبحة نصف الليل مع تصحيح الأخطاء الشائعة.', 8);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (330, 78, 'قراءة وتحليل نص الصلاة الربانية (Ⲡⲉⲛⲓⲱⲧ)', 9, 1, 9, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4219, 330, 'select', 'ما هو الإعراب والتحليل الصوتي للكلمة الأولى من الصلاة الربانية «Ⲡⲉⲛⲓⲱⲧ»؟', 'Ⲡⲉⲛⲓⲱⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7502, 4219, 'أداة ملكية الجمع المتكلم (Ⲡⲉⲛ- = أبانا / نا) متصلة بكلمة (ⲓⲱⲧ = أب)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7503, 4219, 'فعل أمر بمعنى استجب لنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7504, 4219, 'اسم إشارة بمعنى هذا الأب', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7505, 4219, 'حرف جر مركب بمعنى من أجل الآب', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4220, 330, 'read_select', 'في جملة «ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ ⲛ̀ϫⲉ ⲡⲉⲕⲣⲁⲛ»، ما معنى الصيغة النحوية «ⲙⲁⲣⲉϥ-»؟', 'ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7506, 4220, 'صيغة التمني أو الطلب للأمر الغائب (ليتقدس / ليطهر)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7507, 4220, 'فعل ماضٍ تام بمعنى قد تقدس وانتهى', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7508, 4220, 'أداة نهي بمعنى لا تدع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7509, 4220, 'صيغة استفهام', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4221, 330, 'true_false', 'تفيد أداة «ⲛ̀ϫⲉ» في الصلاة الربانية تأخير الفاعل وإبرازه لغوياً بعد الفعل (ليتقدس اسمُك).', 'ⲛ̀ϫⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4222, 330, 'match', 'طابق كل عبارة من الصلاة الربانية بترجمتها الدقيقة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲙⲁⲣⲉⲥⲓ̀ ⲛ̀ϫⲉ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ","right":"ليأتِ ملكوتك"},{"left":"ⲡⲉⲧⲉϩⲛⲁⲕ ⲙⲁⲣⲉϥϣⲱⲡⲓ","right":"لتكن مشيئتك"},{"left":"ⲡⲉⲛⲱⲓⲕ ⲛ̀ⲧⲉ ⲣⲁⲥϯ","right":"خبزنا الذي للغد (كفافنا)"},{"left":"ⲭⲁ ⲛⲏⲉⲧⲉⲣⲟⲛ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ","right":"اغفر لنا ذنوبنا"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4223, 330, 'select', 'ما معنى عبارة «ⲙ̀ⲫⲣⲏϯ ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ»؟', 'ⲙ̀ⲫⲣⲏϯ ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7510, 4223, 'كما في السماء كذلك على الأرض', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7511, 4223, 'في الليل وفي النهار', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7512, 4223, 'من الآن وإلى الأبد', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7513, 4223, 'بين الملائكة والبشر', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4224, 330, 'fill_blank', 'أكمل عبارة الصلاة الربانية ''اغفر لنا ما علينا'': (... ⲛⲏⲉⲧⲉⲣⲟⲛ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ):', '... ⲛⲏⲉⲧⲉⲣⲟⲛ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ', NULL, NULL, 'ⲭⲁ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7514, 4224, 'ⲭⲁ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7515, 4224, 'ⲙⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7516, 4224, 'ⲁⲣⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4225, 330, 'write', 'رتّب حروف مستهل الصلاة الربانية بالقبطية (أبانا الذي في السموات):', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ', NULL, NULL, 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ', '["Ⲡⲉⲛⲓⲱⲧ","ⲉⲧϧⲉⲛ","ⲛⲓⲫⲏⲟⲩⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4226, 330, 'read_select', 'في نهاية الصلاة الربانية «ϧⲉⲛ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲉⲛϭⲟⲓⲥ»، ما معنى «Ⲡⲉⲛϭⲟⲓⲥ»؟', 'Ⲡⲉⲛϭⲟⲓⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7517, 4226, 'ربنا (ϭⲟⲓⲥ = رب + Ⲡⲉⲛ = نا)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7518, 4226, 'إلهنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7519, 4226, 'مخلصنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7520, 4226, 'ملكنا', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4227, 330, 'select', 'ما معنى الفعل «ⲛⲁϩⲙⲉⲛ» في طلبة «ⲛⲁϩⲙⲉⲛ ⲉ̀ⲃⲟⲗ ϩⲁ ⲡⲓⲡⲉⲧϩⲱⲟⲩ»؟', 'ⲛⲁϩⲙⲉⲛ ⲉ̀ⲃⲟⲗ', NULL, NULL, NULL, NULL, NULL, TRUE, 9);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7521, 4227, 'نجّنا / أنقذنا', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7522, 4227, 'ارحمنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7523, 4227, 'احفظنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7524, 4227, 'علّمنا', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (331, 78, 'قراءة وتحليل لحن البركة والصلح وتسابيح التمجيد', 8, 1, 8, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4228, 331, 'select', 'في لحن البركة الشهير «Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ»، ما معنى الفعل «Ⲧⲉⲛⲟⲩⲱϣⲧ»؟', 'Ⲧⲉⲛⲟⲩⲱϣⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7525, 4228, 'نسجدُ (فعل مضارع لجماعة المتكلمين نحن)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7526, 4228, 'نطلبُ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7527, 4228, 'نباركُ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7528, 4228, 'نسبحُ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4229, 331, 'read_select', 'في ختام لحن البركة «ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ»، ما المعنى اللاهوتي الدقيق؟', 'ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7529, 4229, 'أتيتَ وخلّصتَنا', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7530, 4229, 'قمتَ ورفعتَنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7531, 4229, 'صعدتَ وباركتَنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7532, 4229, 'تراءيتَ وشفيتَنا', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4230, 331, 'true_false', 'جملة «Ϯϩⲓⲣⲏⲛⲏ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ» في صلاة الصلح تعني ''سلام الله الذي يفوق كل عقل''.', 'Ϯϩⲓⲣⲏⲛⲏ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4231, 331, 'match', 'طابق عبارات التسابيح الكنسية بترجماتها الدقيقة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ","right":"نسجد للآب"},{"left":"ⲛⲉⲙ Ⲡϣⲏⲣⲓ","right":"والابن"},{"left":"ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ","right":"والروح القدس"},{"left":"ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ","right":"أتيت وخلصتنا"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4232, 331, 'select', 'في مقدمة صلاة الصلح «Ⲡⲛⲟⲩϯ ⲡⲓⲛⲓϣϯ ⲛ̀ⲉ̀ⲛⲉϩ»، ما معنى الصفة «ⲡⲓⲛⲓϣϯ»؟', 'ⲡⲓⲛⲓϣϯ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7533, 4232, 'العظيم / الأكبر', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7534, 4232, 'الرحيم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7535, 4232, 'القدوس', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7536, 4232, 'الأزلي', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4233, 331, 'fill_blank', 'أكمل عبارة لحن البركة الأولى ''نسجد للآب'' (Ⲧⲉⲛⲟⲩⲱϣⲧ ...):', 'Ⲧⲉⲛⲟⲩⲱϣⲧ ...', NULL, NULL, 'ⲙ̀Ⲫⲓⲱⲧ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7537, 4233, 'ⲙ̀Ⲫⲓⲱⲧ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7538, 4233, 'ⲛ̀Ⲫⲓⲱⲧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7539, 4233, 'ⲉ̀Ⲫⲓⲱⲧ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4234, 331, 'write', 'رتّب حروف عبارة ''أتيت وخلصتنا'' بالقبطية (أك إي أك سوتي إممون):', 'ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ', NULL, NULL, 'ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ', '["ⲁⲕⲓ̀","ⲁⲕⲥⲱϯ","ⲙ̀ⲙⲟⲛ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4235, 331, 'read_select', 'ما نوع الفعل «ⲁⲕⲥⲱϯ» من حيث صيغة الزمن والضمير؟', 'ⲁⲕⲥⲱϯ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7540, 4235, 'ماضٍ تام للمخاطب المذكر المفرد (أنتَ خلّصتَ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7541, 4235, 'أمر جماعي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7542, 4235, 'حاضر مستمر', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7543, 4235, 'مستقبل قريب', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (332, 78, 'قراءة وتحليل قطع الأجبية وتسبحة نصف الليل', 8, 1, 8, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4236, 332, 'select', 'ما اسم كتاب الصلوات السبع اليومية بالقبطية؟', 'صلوات الساعات', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7544, 4236, 'Ⲡⲓϫⲱⲙ ⲛ̀ⲧⲉ ⲛⲓⲁϫⲡ (بي جوم إنتي ني أجب = الأجبية)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7545, 4236, 'Ⲡⲓⲯⲁⲗⲧⲏⲣⲓⲟⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7546, 4236, 'Ⲡⲓⲉⲩⲭⲟⲗⲟⲅⲓⲟⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7547, 4236, 'Ⲡⲓⲕⲁⲧⲁⲙⲉⲣⲟⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4237, 332, 'read_select', 'في تسبحة نصف الليل «Ⲧⲉⲛⲑⲏⲛⲟⲩ» (قوموا يا بني النور)، ما معنى الكلمة الأولى؟', 'Ⲧⲉⲛⲑⲏⲛⲟⲩ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7548, 4237, 'استيقظوا / هبوا / انتبهوا (أنتم)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7549, 4237, 'ارقدوا بسلام', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7550, 4237, 'صلوا بلا انقطاع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7551, 4237, 'اسجدوا بخوف', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4238, 332, 'true_false', 'تعبير «ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ» يعني حرفياً ''بنو النور''.', 'ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4239, 332, 'match', 'طابق الكلمات الطقسية من تسبحة نصف الليل بمعانيها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲡⲓⲟⲩⲱⲓⲛⲓ","right":"النور الإلهي"},{"left":"ⲛⲓⲁϫⲡ","right":"الساعات / أوقات الصلاة"},{"left":"ϩⲱⲥ","right":"سبّحوا / هوس"},{"left":"ⲑⲉⲟⲧⲟⲕⲓⲁ","right":"ثيؤطوكية (تمجيد والدة الإله)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4240, 332, 'select', 'ما معنى كلمة «Ϩⲱⲥ» (هوس) التي تُطلق على تسابيح الكتاب المقدس الأربعة؟', 'Ϩⲱⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7552, 4240, 'تسبحة / سبّحوا', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7553, 4240, 'صلاة توبة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7554, 4240, 'قراءة تاريخية', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7555, 4240, 'وعظة تعليمية', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4241, 332, 'fill_blank', 'أكمل نداء تسبحة نصف الليل ''بني النور'' (ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ...):', 'ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ...', NULL, NULL, 'ⲡⲓⲟⲩⲱⲓⲛⲓ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7556, 4241, 'ⲡⲓⲟⲩⲱⲓⲛⲓ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7557, 4241, 'ⲡⲓⲱⲛϧ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7558, 4241, 'ⲧ̀ⲫⲉ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4242, 332, 'write', 'رتّب حروف كلمة ''النور'' بالقبطية (بي أوويني):', 'ⲡⲓⲟⲩⲱⲓⲛⲓ', NULL, NULL, 'ⲡⲓⲟⲩⲱⲓⲛⲓ', '["ⲡⲓ","ⲟⲩ","ⲱ","ⲓ","ⲛ","ⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4243, 332, 'read_select', 'في عبارة «Ϩⲱⲥ ⲉ̀Ⲡϭⲟⲓⲥ» (سبحوا الرب)، ما هي أداة الجر المفعولية المستعملة؟', 'Ϩⲱⲥ ⲉ̀Ⲡϭⲟⲓⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7559, 4243, 'حرف الجر ⲉ̀ المتصل بأداة التعريف بي', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7560, 4243, 'حرف الجر ϧⲉⲛ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7561, 4243, 'أداة النسبة ⲛ̀ⲧⲉ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7562, 4243, 'أداة العطف ⲛⲉⲙ', FALSE);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (333, 78, 'تصحيح الأخطاء الشائعة في القراءة الشفهية الكنسية', 9, 1, 9, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4244, 333, 'select', 'ما هو الخطأ الشائع الذي يقع فيه البعض عند نطق كلمة «ⲭⲏⲙⲓ» (مصر)؟', 'ⲭⲏⲙⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7563, 4244, 'نطقها شيناً (شيمي) ظناً منهم أنها تخضع لقاعدة الكي اليونانية، والصحيح خاء (خيمي) لأنها قبطية', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7564, 4244, 'نطقها جيماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7565, 4244, 'نطقها فاء', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7566, 4244, 'مد الميم', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4245, 333, 'read_select', 'ما هو الصواب في نطق كلمة «ⲁⲅⲓⲟⲥ» (قدوس): هل بجيم معطشة أم بغين؟', 'ⲁⲅⲓⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7567, 4245, 'الصواب بجيم معطشة (آجيوس) لأنها كلمة يونانية متبوعة بمتحرك كسر (Ⲓ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7568, 4245, 'الصواب بغين (آغيوس) دائماً', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7569, 4245, 'الصواب بنون (آنيوس)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7570, 4245, 'كلاهما خطأ فادح', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4246, 333, 'true_false', 'من الأخطاء الشائعة تسكين الحرف الذي يعلوه جنكم وكأنه سكون عربي دون توليد صوت الكسرة الخفيفة التمهيدية.', 'الجنكم والتسكين', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4247, 333, 'match', 'طابق الكلمة بالنطق الكنسي الصحيح المصحح مقابل النطق الخاطئ:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲭⲏⲙⲓ (مصر)","right":"خيمي (صحيح) وليس شيمي"},{"left":"ⲁⲅⲓⲟⲥ (قدوس)","right":"آجيوس (صحيح) وليس آغيوس"},{"left":"ⲉⲩⲭⲏ (صلاة)","right":"إيڤكي أو إيفشي وليس إيوكي"},{"left":"ⲥⲧⲁⲩⲣⲟⲥ (صليب)","right":"إستافروس (صوت ڤ) وليس إستاوروس"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4248, 333, 'select', 'لماذا يُعد نطق «ⲥⲧⲁⲩⲣⲟⲥ» كـ (إستاوروس) خطأً صوتياً؟', 'ⲥⲧⲁⲩⲣⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7571, 4248, 'لأن الإبسلون بعد الألفا (ⲁⲩ) ينقلب حتماً إلى صوت ڤ صامت (إستافروس)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7572, 4248, 'لأن الألفا تسقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7573, 4248, 'لأن السيما تصبح زاي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7574, 4248, 'لأنها كلمة قبطية قديمة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4249, 333, 'fill_blank', 'أكمل تصحيح النطق لكلمة مصر القبطية: تنطق (...-مي) وليس (شي-مي):', 'ⲭⲏⲙⲓ', NULL, NULL, 'خي', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7575, 4249, 'خي', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7576, 4249, 'شي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7577, 4249, 'كي', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4250, 333, 'write', 'رتّب حروف كلمة ''قدوس'' اليونانية ذات الجيم المعطشة (آجيوس):', 'Ⲁⲅⲓⲟⲥ', NULL, NULL, 'Ⲁⲅⲓⲟⲥ', '["Ⲁ","ⲅ","ⲓ","ⲟ","ⲥ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4251, 333, 'read_select', 'في كلمة «ⲛⲓⲃⲓ» (يتنفس)، كيف يُنطق حرف الفيدا لمنع الخطأ الشائع؟', 'ⲛⲓⲃⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7578, 4251, 'نيڤي (بصوت ڤ لوقوعها قبل متحرك كسر Ⲓ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7579, 4251, 'نيبي (بصوت باء)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7580, 4251, 'نيمي (بصوت ميم)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7581, 4251, 'نيفي (بفاء مهموسة)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4252, 333, 'select', 'ما هو معيار النطق الأرثوذكسي المعتمد في الكنيسة القبطية حالياً؟', 'المعيار المعتمد', NULL, NULL, NULL, NULL, NULL, TRUE, 9);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7582, 4252, 'قرارات المجمع المقدس ولجنة الطقوس وقواعد المعلم عريان مفتاح والبابا كيرلس الرابع', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7583, 4252, 'الاجتهاد الفردي لكل قارئ دون مرجع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7584, 4252, 'النطق اليوناني البيزنطي الحديث المنفصل', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7585, 4252, 'قواعد اللهجة الصعيدية المترجمة بالإنجليزية فقط', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_78', v_level_id, 78, 'صندوق إتقان الوحدة ٨: قراءة ونقد النصوص الكنسية الشهيرة', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 333, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٨: قراءة ونقد النصوص الكنسية الشهيرة', 'star', 'أتممت الوحدة ٨: قراءة ونقد النصوص الكنسية الشهيرة', 8);

    -- ---------------------------------------------------------
    -- Unit 9: الوحدة ٩: البناء النحوي التأسيسي والترجمة التطبيقية
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (79, v_level_id, 'الوحدة ٩: البناء النحوي التأسيسي والترجمة التطبيقية', 'Ⲡⲓ-Ϯ-Ⲛⲓ', 'إتقان أدوات التعريف والتنكير، ضمائر الفاعل، أدوات النسبة والإضافة، تركيب الجملة الاسمية، وورشة الترجمة.', 9);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (334, 79, 'أدوات التعريف والتنكير (Ⲡⲓ, Ϯ, Ⲛⲓ, Ⲟⲩ, Ϩⲁⲛ)', 7, 1, 7, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4253, 334, 'select', 'ما هي أدوات التعريف العامة في اللغة القبطية للمفرد المذكر والمفرد المؤنث والجمع بنوعيه؟', 'أدوات التعريف العامة', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7586, 4253, 'Ⲡⲓ للمفرد المذكر، Ϯ للمفرد المؤنث، Ⲛⲓ للجمع بنوعيه', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7587, 4253, 'Ⲟⲩ للمذكر، Ϩⲁⲛ للمؤنث', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7588, 4253, 'Ⲡⲁ للمذكر، Ⲧⲁ للمؤنث، Ⲛⲁ للجمع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7589, 4253, 'Ⲫⲓ للمذكر، Ⲑⲓ للمؤنث فقط', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4254, 334, 'read_select', 'ما هي أدوات التنكير المقابلة (أداة نكرة لمفرد، وأداة نكرة لجمع)؟', 'أدوات التنكير', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7590, 4254, 'Ⲟⲩ للمفرد (مذكر ومؤنث)، و Ϩⲁⲛ للجمع بنوعيه', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7591, 4254, 'Ⲡⲓ و Ϯ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7592, 4254, 'ⲛ̀ و ⲙ̀', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7593, 4254, 'ⲡⲉ و ⲧⲉ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4255, 334, 'true_false', 'أداة التعريف الخاصة للمذكر (Ⲡ̀) تتحول إلى (Ⲫ̀) إذا بدأت الكلمة بحرف من حروف الحلقيات والشفويات المنفردة (Ⲃ, Ⲓ, Ⲗ, ⲙ, Ⲛ, Ⲣ, ⲞⲨ).', 'قاعدة الحروف الحلقية والشفوية (فيلنور)', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4256, 334, 'match', 'طابق كل أداة بنوع الاسم الذي تدل عليه في القواعد القبطية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲡⲓ-","right":"معرّف مفرد مذكر (مثل: Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ)"},{"left":"Ϯ-","right":"معرّف مفرد مؤنث (مثل: Ϯⲉⲕⲕⲗⲏⲥⲓⲁ)"},{"left":"Ⲛⲓ-","right":"معرّف جمع بنوعيه (مثل: Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ)"},{"left":"Ⲟⲩ-","right":"منكّر مفرد (مثل: ⲟⲩⲣⲱⲙⲓ = إنسان ما)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4257, 334, 'select', 'لماذا نقول «Ⲫⲓⲱⲧ» (الآب) بالفي (Ⲫ) بدلاً من «Ⲡⲓⲱⲧ» بالبي (Ⲡ)؟', 'Ⲫⲓⲱⲧ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7594, 4257, 'لأن كلمة «ⲓⲱⲧ» تبدأ بحرف اليوطا (Ⲓ) وهو من حروف عائلة الرنين السبعة (فيلنور)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7595, 4257, 'لأن كلمة الآب اسم مؤنث', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7596, 4257, 'لأنها كلمة يونانية مستعارة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7597, 4257, 'لأن حرف الفي يحل محل الألف دائماً', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4258, 334, 'fill_blank', 'أكمل تعريف كلمة ''الكنيسة'' (مفرد مؤنث): (...ⲉⲕⲕⲗⲏⲥⲓⲁ):', '...ⲉⲕⲕⲗⲏⲥⲓⲁ', NULL, NULL, 'Ϯ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7598, 4258, 'Ϯ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7599, 4258, 'Ⲡⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7600, 4258, 'Ⲛⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4259, 334, 'write', 'رتّب حروف عبارة ''الكنيسة'' بأداة التعريف المؤنثة (تي إككليسيا):', 'Ϯⲉⲕⲕⲗⲏⲥⲓⲁ', NULL, NULL, 'Ϯⲉⲕⲕⲗⲏⲥⲓⲁ', '["Ϯ","ⲉⲕ","ⲕⲗⲏ","ⲥⲓⲁ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (335, 79, 'ضمائر الفاعل المتصلة والمنفصلة (ⲁⲛⲟⲕ, ⲛ̀ⲑⲟⲕ, ...)', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4260, 335, 'select', 'ما هي الضمائر المنفصلة الثلاثة الأولى للمتكلم والمخاطب المذكر والمخاطبة المؤنثة؟', 'الضمائر المنفصلة', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7601, 4260, 'ⲁⲛⲟⲕ (أنا)، ⲛ̀ⲑⲟⲕ (أنتَ)، ⲛ̀ⲑⲟ (أنتِ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7602, 4260, 'ⲛ̀ⲧⲟϥ، ⲛ̀ⲧⲟⲥ، ⲛ̀ⲑⲱⲟⲩ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7603, 4260, 'ⲁⲛⲟⲛ، ⲛ̀ⲑⲱⲧⲉⲛ، ⲛ̀ⲧⲱⲟⲩ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7604, 4260, 'ⲡⲁⲓ، ⲑⲁⲓ، ⲛⲁⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4261, 335, 'read_select', 'ما معنى الضمير المنفصل «ⲁⲛⲟⲛ» في لغة الخدمة والتسبيح؟', 'ⲁⲛⲟⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7605, 4261, 'نحنُ (ضمير جماعة المتكلمين)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7606, 4261, 'أنتم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7607, 4261, 'هم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7608, 4261, 'أنا بمفردي', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4262, 335, 'true_false', 'الضميران «ⲛ̀ⲧⲟϥ» و «ⲛ̀ⲧⲟⲥ» يعنيان على الترتيب: ''هو'' للغائب المذكر، و''هي'' للغائبة المؤنثة.', 'ⲛ̀ⲧⲟϥ / ⲛ̀ⲧⲟⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4263, 335, 'match', 'طابق كل ضمير منفصل بالترجمة المقابلة له في العربية:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲁⲛⲟⲕ","right":"أنا"},{"left":"ⲛ̀ⲑⲟⲕ","right":"أنتَ (مذكر)"},{"left":"ⲛ̀ⲧⲟϥ","right":"هو (غائب مذكر)"},{"left":"ⲁⲛⲟⲛ","right":"نحنُ"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4264, 335, 'select', 'في عبارة «Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ» (إنجيل يوحنا)، ما معنى العبارة؟', 'Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7609, 4264, 'أنا هو خبز الحياة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7610, 4264, 'أنا هو الراعي الصالح', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7611, 4264, 'أنا هو نور العالم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7612, 4264, 'أنا هو الطريق والحق', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4265, 335, 'fill_blank', 'أكمل إعلان السيد المسيح الشهير ''أنا هو خبز الحياة'' (... ⲡⲉ ⲡⲓⲱⲓⲕ):', '... ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ', NULL, NULL, 'Ⲁⲛⲟⲕ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7613, 4265, 'Ⲁⲛⲟⲕ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7614, 4265, 'Ⲛ̀ⲑⲟⲕ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7615, 4265, 'Ⲛ̀ⲧⲟϥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4266, 335, 'write', 'رتّب حروف جملة ''أنا هو خبز الحياة'' بالقبطية (آنوك بي بي ويك إنتي بي أونخ):', 'Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ', NULL, NULL, 'Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ', '["Ⲁⲛⲟⲕ","ⲡⲉ","ⲡⲓⲱⲓⲕ","ⲛ̀ⲧⲉ","ⲡⲓⲱⲛϧ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (336, 79, 'أدوات الإضافة والنسبة (ⲛ̀ⲧⲉ, ⲙ̀, ⲛ̀)', 7, 1, 7, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4267, 336, 'select', 'ما هما نوعا الإضافة في اللغة القبطية للتعبير عن نسبة شيء إلى شيء آخر؟', 'الإضافة القبطية', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7616, 4267, 'الإضافة المباشرة بالأداة المركبة «ⲛ̀ⲧⲉ»، والإضافة بالحروف الرابطة المختصرة «ⲛ̀» و «ⲙ̀»', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7617, 4267, 'الإضافة بحرف الواو فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7618, 4267, 'الإضافة بتنوين الكلمة الأولى', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7619, 4267, 'الإضافة بالتقديم والتأخير دون أي أداة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4268, 336, 'read_select', 'متى تستعمل الأداة «ⲙ̀» بدلاً من «ⲛ̀» في الإضافة والنسبة؟', 'ⲙ̀ vs ⲛ̀', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7620, 4268, 'قبل الكلمات التي تبدأ بأحد الحروف الشفوية (Ⲃ, ⲙ, Ⲡ, Ⲫ, Ⲯ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7621, 4268, 'قبل الكلمات المؤنثة فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7622, 4268, 'في آخر الجملة فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7623, 4268, 'قبل الحروف المتحركة السبعة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4269, 336, 'true_false', 'في جملة «Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ» (ابن الله)، استعملنا ⲙ̀ لأن كلمة Ⲫⲛⲟⲩϯ تبدأ بحرف شفوي هو الفاي (Ⲫ).', 'Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4270, 336, 'match', 'طابق كل تركيب إضافة بالأداة المستخدمة فيه وسببها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ","right":"ⲙ̀ - قبل الحرف الشفوي Ⲫ"},{"left":"ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ","right":"ⲛ̀ⲧⲉ - أداة النسبة المنفصلة"},{"left":"Ⲡⲣⲁⲛ ⲛ̀Ⲓⲏⲥⲟⲩⲥ","right":"ⲛ̀ - قبل حرف اليوطا غير الشفوي"},{"left":"Ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ","right":"ⲛ̀ⲧⲉ - إضافة اسم الملكوت للسموات"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4271, 336, 'select', 'ما الترجمة الدقيقة لعبارة «Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ»؟', 'Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7624, 4271, 'ابن الله', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7625, 4271, 'خادم الله', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7626, 4271, 'بيت الله', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7627, 4271, 'شعب الله', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4272, 336, 'fill_blank', 'أكمل عبارة ''ابن الله'' بأداة الإضافة الصحيحة (Ⲡϣⲏⲣⲓ ... Ⲫⲛⲟⲩϯ):', 'Ⲡϣⲏⲣⲓ ... Ⲫⲛⲟⲩϯ', NULL, NULL, 'ⲙ̀', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7628, 4272, 'ⲙ̀', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7629, 4272, 'ⲛ̀', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7630, 4272, 'ϧⲉⲛ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4273, 336, 'write', 'رتّب حروف عبارة ''ابن الله'' بالقبطية (بشيري إمفنوتي):', 'Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ', NULL, NULL, 'Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ', '["Ⲡϣⲏⲣⲓ","ⲙ̀","Ⲫⲛⲟⲩϯ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (337, 79, 'تراكيب الجملة الاسمية البسيطة والربط النحوي', 7, 1, 7, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4274, 337, 'select', 'كيف تُربط عناصر الجملة الاسمية البسيطة (المبتدأ والخبر) في اللغة القبطية؟', 'رابطة الجملة الاسمية', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7631, 4274, 'باستخدام ضمائر الربط الإشارية (ⲡⲉ للمذكر، ⲧⲉ للمؤنث، ⲛⲉ للجمع)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7632, 4274, 'بوضع ضمة على آخر المبتدأ دون أداة رابطة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7633, 4274, 'باستخدام فعل كان فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7634, 4274, 'بحذف الخبر دائماً', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4275, 337, 'read_select', 'في جملة «Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ» (الله محبة)، ما هو دور الكلمة الأخيرة «ⲡⲉ»؟', 'Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7635, 4275, 'أداة ربط الجملة الاسمية العائدة على المبتدأ المذكر (الله هو محبة)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7636, 4275, 'أداة نفي بمعنى ليس', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7637, 4275, 'أداة استفهام', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7638, 4275, 'حرف جر زائد', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4276, 337, 'true_false', 'في الجملة الاسمية المؤنثة، نستخدم الأداة «ⲧⲉ» كأداة ربط مثل: «Ϯⲉⲕⲕⲗⲏⲥⲓⲁ ⲟⲩⲙⲁⲩ ⲧⲉ» (الكنيسة هي أم).', 'Ϯⲉⲕⲕⲗⲏⲥⲓⲁ ⲟⲩⲙⲁⲩ ⲧⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4277, 337, 'match', 'طابق أدوات الربط في الجملة الاسمية بحسب نوع المبتدأ وتطبيقاتها:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲡⲉ","right":"للمفرد المذكر: Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ (الله محبة)"},{"left":"ⲧⲉ","right":"للمفرد المؤنث: Ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲟⲩⲟⲩⲱⲓⲛⲓ ⲧⲉ"},{"left":"ⲛⲉ","right":"للجمع بنوعيه: Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ϩⲁⲛⲡⲛⲉⲩⲙⲁ ⲛⲉ"},{"left":"ⲡⲉⲛ-","right":"ضمير ملكية مضاف للمفرد المذكر (نا)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4278, 337, 'select', 'ما الترجمة الدقيقة للآية الإنجيلية «Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ»؟', 'Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7639, 4278, 'الله محبة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7640, 4278, 'الله نور', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7641, 4278, 'الله روح', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7642, 4278, 'الله سلام', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4279, 337, 'fill_blank', 'أكمل الجملة الاسمية ''الله محبة'' بأداة الربط المذكر المناسبة (Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ...):', 'Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ...', NULL, NULL, 'ⲡⲉ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7643, 4279, 'ⲡⲉ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7644, 4279, 'ⲧⲉ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7645, 4279, 'ⲛⲉ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4280, 337, 'write', 'رتّب حروف جملة ''الله محبة'' بالقبطية (إفنوتي أو أغابي بي):', 'Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ', NULL, NULL, 'Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ', '["Ⲫⲛⲟⲩϯ","ⲟⲩⲁⲅⲁⲡⲏ","ⲡⲉ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (338, 79, 'ورشة الترجمة ثنائية الاتجاه (قبطي ⇄ عربي)', 8, 1, 8, 5);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4281, 338, 'select', 'ترجم العبارة القبطية «Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ» إلى العربية:', 'Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7646, 4281, 'اللهم ارحمنا', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7647, 4281, 'الله مخلصنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7648, 4281, 'الله يسمعنا', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7649, 4281, 'الله يباركنا', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4282, 338, 'read_select', 'كيف تُترجم عبارة ''السلام لكِ يا مريم'' إلى اللغة القبطية الكنسية بدقة؟', 'السلام لكِ يا مريم', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7650, 4282, 'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ (شيري ني ماريا)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7651, 4282, 'Ⲡⲉⲛⲓⲱⲧ Ⲙⲁⲣⲓⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7652, 4282, 'Ⲫⲛⲟⲩϯ ⲛⲉⲙ Ⲙⲁⲣⲓⲁ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7653, 4282, 'Ⲁⲅⲓⲟⲥ Ⲙⲁⲣⲓⲁ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4283, 338, 'true_false', 'عبارة «Ⲟⲩϫⲁⲓ ϧⲉⲛ Ⲡϭⲟⲓⲥ» تعني في التراسل القبطي والتحيات ''كن معافى في الرب'' أو ''سلام في الرب''.', 'Ⲟⲩϫⲁⲓ ϧⲉⲛ Ⲡϭⲟⲓⲥ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4284, 338, 'match', 'طابق العبارات القبطية بترجماتها العربية السليمة في ورشة الترجمة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ","right":"السلام لكِ يا مريم"},{"left":"Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ","right":"يا الله ارحمنا"},{"left":"Ⲁⲝⲓⲟⲥ","right":"مستحق"},{"left":"Ⲁⲙⲏⲛ","right":"حقاً / استجب"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4285, 338, 'select', 'ما ترجمة عبارة «Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲙ̀ⲙⲏⲓ» الواردة في قطع صلاة باكر بالأجبية؟', 'Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲙ̀ⲙⲏⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7654, 4285, 'النور الحقيقي', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7655, 4285, 'النور العظيم', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7656, 4285, 'النور الأبدي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7657, 4285, 'نور العالم', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4286, 338, 'fill_blank', 'أكمل التحية المريمية بالقبطية ''السلام لكِ'' (Ⲭⲉⲣⲉ ...):', 'Ⲭⲉⲣⲉ ...', NULL, NULL, 'ⲛⲉ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7658, 4286, 'ⲛⲉ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7659, 4286, 'ⲛⲁⲕ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7660, 4286, 'ⲛⲁⲛ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4287, 338, 'write', 'رتّب حروف عبارة ''السلام لكِ يا مريم'' بالقبطية (شيري ني ماريا):', 'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ', NULL, NULL, 'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ', '["Ⲭⲉⲣⲉ","ⲛⲉ","Ⲙⲁⲣⲓⲁ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4288, 338, 'read_select', 'ما ترجمة عبارة «Ϯⲙⲉⲧⲥⲁⲃⲉ ⲛ̀ⲧⲉ ϯⲁⲥⲡⲓ» التي تعبر عن إتقان لغة الآباء؟', 'Ϯⲙⲉⲧⲥⲁⲃⲉ ⲛ̀ⲧⲉ ϯⲁⲥⲡⲓ', NULL, NULL, NULL, NULL, NULL, TRUE, 8);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7661, 4288, 'معرفة وإتقان اللغة (حكمة اللسان)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7662, 4288, 'تاريخ الكنيسة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7663, 4288, 'قراءة الكتب القديمة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7664, 4288, 'ترجمة الإنجيل', FALSE);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_79', v_level_id, 79, 'صندوق إتقان الوحدة ٩: البناء النحوي التأسيسي والترجمة التطبيقية', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 338, 'fixed', 15, 15, 1, true, 'متقن الوحدة ٩: البناء النحوي التأسيسي والترجمة التطبيقية', 'star', 'أتممت الوحدة ٩: البناء النحوي التأسيسي والترجمة التطبيقية', 9);

    -- ---------------------------------------------------------
    -- Unit 10: الوحدة ١٠: الامتحان النهائي الشامل ومشروع الإتقان
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (80, v_level_id, 'الوحدة ١٠: الامتحان النهائي الشامل ومشروع الإتقان', 'Ⲡⲓⲣⲉϥⲥⲁⲃⲉ', 'الاختبارات التشخيصية الشاملة للأصوات والقواعد والمفردات ونيل لقب المتقن القبطي الشامل (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ).', 10);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (339, 80, 'الاختبار التشخيصي الشامل: الأصوات والحروف', 7, 1, 7, 1);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4289, 339, 'select', 'ما هو الحرف المتحرك الوحيد الذي يمثل حركة الفتح الصريحة في الأبجدية القبطية؟', 'حركة الفتح', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7665, 4289, 'الألفا (Ⲁ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7666, 4289, 'الإي (Ⲉ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7667, 4289, 'الإيتا (Ⲏ)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7668, 4289, 'الأوميجا (Ⲱ)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4290, 339, 'read_select', 'متى يُنطق حرف الفيدا (Ⲃ) صوتاً شفتانياً (ب)؟', 'Ⲃ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7669, 4290, 'إذا لم يأتِ بعده حرف متحرك، أو جاء في نهاية الكلمة', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7670, 4290, 'إذا جاء بعده أي حرف متحرك', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7671, 4290, 'إذا كان في كلمة يونانية فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7672, 4290, 'إذا كان فوقه جنكم دائماً', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4291, 339, 'true_false', 'حرف الغاما (Ⲅ) ينطق جيماً معطشة في الكلمات القبطية الأصلية دائماً.', 'Ⲅ', NULL, NULL, NULL, NULL, NULL, FALSE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4292, 339, 'match', 'طابق الحروف بالأصوات الصوتية الفارقة التي تمثلها في الاختبار التشخيصي:', NULL, NULL, NULL, NULL, NULL, '[{"left":"Ⲏ","right":"ياء مكسورة طويلة ممتدة"},{"left":"Ⲱ","right":"واو طويلة مفتوحة مفخمة"},{"left":"Ϧ","right":"خاء صريحة قبطية دائماً"},{"left":"Ⲝ","right":"ك + س (حرف مزدوج يوناني)"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4293, 339, 'select', 'ما الصوت الناتج عن اجتماع حرف الألفا مع الإبسلون «ⲁⲩ» في الكلمات مثل «ⲥⲧⲁⲩⲣⲟⲥ»؟', 'ⲁⲩ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7673, 4293, 'آڤ (صوت ڤ شفتاني-أسناني)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7674, 4293, 'أوو (واو مضمومة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7675, 4293, 'آي (ياء مفتوحة)', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7676, 4293, 'أف (فاء صلبة)', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4294, 339, 'fill_blank', 'أكمل الكلمة بالحرف المناسب لنطق ''شجرة'' (ڤو): (...ⲱ):', '...ⲱ', NULL, NULL, 'ⲃⲱ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7677, 4294, 'ⲃⲱ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7678, 4294, 'ⲫⲱ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7679, 4294, 'ⲡⲱ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4295, 339, 'write', 'رتّب حروف كلمة ''اسم'' بالقبطية بحرف الألفا الفاتح (ران):', 'ⲣⲁⲛ', NULL, NULL, 'ⲣⲁⲛ', '["ⲣ","ⲁ","ⲛ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (340, 80, 'الاختبار الشامل: قواعد القراءة والمقاطع والأصل المعجمي', 7, 1, 7, 2);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4296, 340, 'select', 'ما هو الأثر الصوتي للجنكم على الحرف الساكن العادي مقارنة بالجنكم على الحرف المتحرك؟', 'الجنكم الشامل', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7680, 4296, 'على الساكن يسبقه بهمزة مكسورة خفيفة (إِ)، وعلى العلة يمنحه نبرة واستقلالاً صوتياً', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7681, 4296, 'كلاهما ينطقان واواً ممدودة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7682, 4296, 'على الساكن يسكنه دون صوت، وعلى العلة يحذفه', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7683, 4296, 'لا يوجد أي تأثير للجنكم', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4297, 340, 'read_select', 'كم عدد الحروف القبطية السبعة المأخوذة من الخط الديموطيقي التي تثبت قبطية الكلمة؟', 'الحروف الديموطيقية', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7684, 4297, '7 حروف: (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7685, 4297, '3 حروف فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7686, 4297, '5 حروف', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7687, 4297, '12 حرفاً', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4298, 340, 'true_false', 'حرف الكي (Ⲭ) في كلمة «ⲭⲏⲙⲓ» ينطق خاء لأن الكلمة قبطية، بينما في «Ⲭⲉⲣⲉ» ينطق شين لأن الكلمة يونانية متبوعة بمتحرك كسر.', 'Ⲭ في ⲭⲏⲙⲓ و Ⲭⲉⲣⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4299, 340, 'match', 'طابق كل كلمة بأصلها اللغوي وقاعدتها النطقية المقابلة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲭⲏⲙⲓ","right":"قبطية أصيلة - الكي تنطق خاء"},{"left":"Ⲇⲟⲝⲁ","right":"يونانية الأصل - الدلدا تنطق ذال"},{"left":"ⲯⲁⲗⲙⲟⲥ","right":"يونانية الأصل - تبدأ بحرف الإبسي"},{"left":"ⲱⲛϧ","right":"قبطية صميمة - تنتهي بحرف الخاي"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4300, 340, 'select', 'كم مقطعاً صوتياً في الكلمة الطقسية «ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ» (ضابط الكل)؟', 'ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7688, 4300, '4 مقاطع صوتية: (بان / تو / كرا / تور)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7689, 4300, 'مقطعان فقط', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7690, 4300, '3 مقاطع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7691, 4300, '5 مقاطع', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4301, 340, 'fill_blank', 'أكمل كلمة ''مجد'' بحرف الإكسي المركب (ذوكسا): (Ⲇⲟ...ⲁ):', 'Ⲇⲟ...ⲁ', NULL, NULL, 'ⲝ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7692, 4301, 'ⲝ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7693, 4301, 'ⲯ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7694, 4301, 'ⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4302, 340, 'write', 'رتّب حروف كلمة ''مصر'' بالقبطية (خيمي):', 'ⲭⲏⲙⲓ', NULL, NULL, 'ⲭⲏⲙⲓ', '["ⲭ","ⲏ","ⲙ","ⲓ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (341, 80, 'الاختبار الشامل: المفردات والنحو والتراكيب الليتورجية', 7, 1, 7, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4303, 341, 'select', 'ما هي أداة التعريف لجمع الأسماء المذكر والمؤنث في القبطية؟', 'أداة تعريف الجمع', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7695, 4303, 'Ⲛⲓ- (مثل: Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7696, 4303, 'Ⲡⲓ-', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7697, 4303, 'Ϯ-', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7698, 4303, 'Ⲟⲩ-', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4304, 341, 'read_select', 'في عبارة «Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ»، لماذا جاءت أداة الإضافة ميماً «ⲙ̀» بدلاً من نون «ⲛ̀»؟', 'ⲙ̀Ⲫⲛⲟⲩϯ', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7699, 4304, 'لأن كلمة «Ⲫⲛⲟⲩϯ» تبدأ بحرف شفوي هو الفاي (Ⲫ)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7700, 4304, 'لأن الكلمة جمع', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7701, 4304, 'لأنها أداة نفي', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7702, 4304, 'بسبب وجود حرف علة', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4305, 341, 'true_false', 'في الجملة الاسمية «Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ»، تفيد الأداة «ⲡⲉ» ربط المبتدأ المذكر بالخبر وتأكيد الكينونة (الله محبة).', 'Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4306, 341, 'match', 'طابق المصطلحات الليتورجية بترجماتها الدقيقة:', NULL, NULL, NULL, NULL, NULL, '[{"left":"ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ⲡⲓⲥⲛⲟϥ","right":"الجسد والدم الأقدسان"},{"left":"Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ","right":"أبانا الذي في السموات"},{"left":"Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ","right":"نسجد للآب"},{"left":"Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ","right":"المسيح قام"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4307, 341, 'select', 'ماذا يمثل الاختصار المقدس «Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅» المكتوب على الأيقونات القبطية؟', 'Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7703, 4307, 'يسوع المسيح (Nomina Sacra)', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7704, 4307, 'يوحنا المعمدان', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7705, 4307, 'يعقوب الرسول', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7706, 4307, 'يوسف النجار', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4308, 341, 'fill_blank', 'أكمل عبارة ''أبانا الذي في السموات'' (Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ...):', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ...', NULL, NULL, 'ⲛⲓⲫⲏⲟⲩⲓ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7707, 4308, 'ⲛⲓⲫⲏⲟⲩⲓ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7708, 4308, 'ⲡⲓⲕⲁϩⲓ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7709, 4308, 'ⲛⲓⲁⲅⲅⲉⲗⲟⲥ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4309, 341, 'write', 'رتّب حروف عبارة ''أنا هو'' بالقبطية (آنوك بي):', 'Ⲁⲛⲟⲕ ⲡⲉ', NULL, NULL, 'Ⲁⲛⲟⲕ ⲡⲉ', '["Ⲁⲛⲟⲕ","ⲡⲉ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (342, 80, 'مشروع التخرج النهائي ونيل لقب «المتقن القبطي الشامل» (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ)', 7, 1, 7, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4310, 342, 'select', 'ما المعنى اللغوي والروحي الرفيع للقب التخرج القبطي «Ⲡⲓⲣⲉϥⲥⲁⲃⲉ» (بي ريف سابيه)؟', 'Ⲡⲓⲣⲉϥⲥⲁⲃⲉ', NULL, NULL, NULL, NULL, NULL, TRUE, 1);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7710, 4310, 'الحكيم المتقن / العالم باللغة وتراث الآباء', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7711, 4310, 'القارئ المبتدئ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7712, 4310, 'المستمع الصامت', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7713, 4310, 'الناسخ الخطي فقط', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4311, 342, 'read_select', 'عند تلاوة نص قبطي كامل بطلاقة مع إخراج كل حرف من مخرجه ومراعاة أزمنة المد والجنكم، تكون قد حققت:', 'الإتقان الليتورجي', NULL, NULL, NULL, NULL, NULL, TRUE, 2);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7714, 4311, 'معيار القراءة الكنسية الأرثوذكسية الأصيلة السليمة 100%', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7715, 4311, 'قراءة سريعة دون معنى', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7716, 4311, 'نطقاً محرفاً غير مقبول', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7717, 4311, 'مجرد تكرار آلي', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4312, 342, 'true_false', 'اللغة القبطية هي المرحلة الأخيرة من مراحل اللغة المصرية القديمة مكتوبة بأبجدية مشتقة من اليونانية والخط الديموطيقي.', 'تاريخ اللغة القبطية', NULL, NULL, NULL, NULL, NULL, TRUE, 3);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4313, 342, 'match', 'طابق كل مستوى من مستويات المنصة بإنجازه التعليمي الأكبر:', NULL, NULL, NULL, NULL, NULL, '[{"left":"المستوى الأول","right":"إتقان الـ 32 حرفاً ورمزاً بالقراءة والكتابة"},{"left":"المستوى الثاني","right":"قواعد القراءة، الجنكم، الحركات والمقاطع"},{"left":"المستوى الثالث","right":"المراجعة الشاملة، النحو، النصوص والتطبيق المتقدم"},{"left":"Ⲡⲓⲣⲉϥⲥⲁⲃⲉ","right":"لقب التخرج الشرفي الممنوح للمتفوقين"}]'::jsonb, TRUE, 4);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4314, 342, 'select', 'ما هي النصيحة الذهبية المستمرة لحفظ لغة الآباء القبطية حية في القلوب؟', 'الممارسة والخدمة', NULL, NULL, NULL, NULL, NULL, TRUE, 5);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7718, 4314, 'المداومة على قراءة الأجبية والألحان والقداس الإلهي والبحث في معاني الكلمات', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7719, 4314, 'الاكتفاء بحفظ الحروف مرة واحدة فقط دون صلاة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7720, 4314, 'إهمال قواعد النطق المعتمدة', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7721, 4314, 'التوقف عن الترتيل', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4315, 342, 'fill_blank', 'أكمل وسام التخرج الختامي باللقب القبطي ''المتقن الحكيم'' (Ⲡⲓⲣⲉϥ...):', 'Ⲡⲓⲣⲉϥ...', NULL, NULL, 'ⲥⲁⲃⲉ', NULL, NULL, TRUE, 6);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7722, 4315, 'ⲥⲁⲃⲉ', TRUE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7723, 4315, 'ⲱϣ', FALSE);
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (7724, 4315, 'ⲥϧⲁⲓ', FALSE);

    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (4316, 342, 'write', 'رتّب حروف وسام التخرج القبطي الختامي (بي ريف سابيه):', 'Ⲡⲓⲣⲉϥⲥⲁⲃⲉ', NULL, NULL, 'Ⲡⲓⲣⲉϥⲥⲁⲃⲉ', '["Ⲡⲓ","ⲣⲉϥ","ⲥⲁⲃⲉ"]'::jsonb, NULL, TRUE, 7);

    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_unit_80', v_level_id, 80, 'صندوق إتقان الوحدة ١٠: الامتحان النهائي الشامل ومشروع الإتقان', 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!', 'unit_end', 342, 'fixed', 15, 15, 1, true, 'متقن الوحدة ١٠: الامتحان النهائي الشامل ومشروع الإتقان', 'star', 'أتممت الوحدة ١٠: الامتحان النهائي الشامل ومشروع الإتقان', 10);

    -- ---------------------------------------------------------
    -- Level 3 Final Graduation Chest
    -- ---------------------------------------------------------
    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_level_3_final', v_level_id, 80, '🏆 وسام التخرج الكبير: المتقن القبطي الشامل (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ)', 'تهانينا العظيمة! لقد أتممت المستوى الثالث والمراجعة الشاملة ونلت لقب المتقن القبطي الشامل عن جدارة واستحقاق!', 'level_end', 342, 'fixed', 75, 75, 3, true, 'المتقن القبطي الشامل — Ⲡⲓⲣⲉϥⲥⲁⲃⲉ', 'trophy', 'أتممت المستوى الثالث والمراجعة الشاملة والتطبيق المتقدم بالكامل', 99);

END $$;

-- Validation queries
SELECT 'levels' AS tbl, count(*) FROM public.levels WHERE id = 7
UNION ALL
SELECT 'units' AS tbl, count(*) FROM public.units WHERE level_id = 7
UNION ALL
SELECT 'lessons' AS tbl, count(*) FROM public.lessons WHERE unit_id IN (SELECT id FROM public.units WHERE level_id = 7)
UNION ALL
SELECT 'challenges' AS tbl, count(*) FROM public.challenges WHERE lesson_id IN (SELECT id FROM public.lessons WHERE unit_id IN (SELECT id FROM public.units WHERE level_id = 7))
UNION ALL
SELECT 'chests' AS tbl, count(*) FROM public.chests WHERE level_id = 7;
