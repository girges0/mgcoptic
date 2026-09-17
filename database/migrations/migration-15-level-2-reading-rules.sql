-- ============================================================================
-- Migration 15: Level 2 Coptic Curriculum (Reading Rules & Advanced Syllabification)
-- 8 Comprehensive Units, 42 Deep Lessons, 252 Challenges
-- 100% Strictly adhering to Holy Synod Curriculum 2014
-- ============================================================================

INSERT INTO public.levels (id, title, description, order_index)
VALUES (6, 'المستوى الثاني: قواعد القراءة ونطق الكلمات', 'أتقن قواعد القراءة والنطق الشرطي والمقاطع الصوتية لتتمكن من قراءة جميع الكلمات والنصوص القبطية بطلاقة تامة.', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, order_index = EXCLUDED.order_index;


-- ---------------------------------------------------------
-- Unit: الوحدة ١: هندسة الحركات ومقاييس زمن النطق
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (51, 6, 'الوحدة ١: هندسة الحركات ومقاييس زمن النطق', 'Ⲁ-Ⲱ', 'إتقان مخارج وأزمنة الحروف المتحركة السبعة والتمييز السمعي والبصري بين الحركات المتشابهة.', 1)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (201, 51, 'حركة الفتح وحرف الألفا (Ⲁ ⲁ)', 1, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3000, 201, 'text_view', 'قاعدة حركة الفتح وحرف الألفا (Ⲁ ⲁ)', 'Ⲁ ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', '• اسم الحرف: ألفا (Ⲁ ⲁ)
• النطق: ألف مفتوحة دائماً (مثل A في lamp).
• شواهد من المجمع المقدس:
  - ⲣⲁⲛ (ران) = اسم
  - ⲁⲛⲟⲕ (آنوك) = أنا
  - ⲥⲁ (سا) = ناحية / جهة', 'حرف الألفا حركة فتح صريحة ومستقلة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3001, 201, 'read_select', 'كيف تنطق كلمة «ⲣⲁⲛ» (اسم) بالقبطية؟', 'ⲣⲁⲛ', 'ران', 'audio_coptic/1alfa.mp3', NULL, 'حرف الألفا يفتح الحرف السابق: ران.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5000, 3001, 'ران (بألف مفتوحة صريحة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5001, 3001, 'رون (بواو)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5002, 3001, 'رين (بياء)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3002, 201, 'select', 'ما معنى كلمة «ⲁⲛⲟⲕ» بالقبطية؟', 'ⲁⲛⲟⲕ', 'آنوك', 'audio_coptic/1alfa.mp3', NULL, 'ⲁⲛⲟⲕ تعني أنا.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5003, 3002, 'أنا', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5004, 3002, 'أنت', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5005, 3002, 'هو', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3003, 201, 'write', 'رتّب حروف كلمة ''اسم'' بالقبطية (ران):', 'ⲣⲁⲛ', 'ران', 'audio_coptic/1alfa.mp3', 'ⲣⲁⲛ', 'ⲣⲁⲛ = اسم.', '["ⲣ","ⲁ","ⲛ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3004, 201, 'read_select', 'هل يتغير نطق حرف الألفا (Ⲁ) بتغير موضعه؟', 'Ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', NULL, 'الألفا حركة فتح ثابتة.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5006, 3004, 'لا، يُنطق دائماً ألفاً مفتوحة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5007, 3004, 'نعم، يتغير نطقه', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3005, 201, 'read_select', 'كلمة «ⲥⲁ» (ناحية) تتكون من مقطع صوتي يُنطق:', 'ⲥⲁ', 'سا', 'audio_coptic/1alfa.mp3', NULL, 'سيما + ألفا = سا.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5008, 3005, 'سا', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5009, 3005, 'سو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5010, 3005, 'سي', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (202, 51, 'عائلة حروف الكسر الثلاثية (Ⲉ ، Ⲏ ، Ⲓ)', 2, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3006, 202, 'text_view', 'قاعدة التمييز بين درجات الكسر الثلاث', 'Ⲉ ، Ⲏ ، Ⲓ', 'إي وإيتا ويوطا', 'audio_coptic/8ei.mp3', '• Ⲉ (إي): كسرة خفيفة خطافة (مثل e في help).
  - مثال: ⲛⲉⲙ (نِم) = مع
• Ⲏ (إيتا): ياء مكسورة بمد طويل ممتد (مثل ee في feet).
  - مثال: ⲙⲏⲧ (ميت) = عشرة (10)
• Ⲓ (يوطا): ياء قصيرة صريحة (مثل i في drink).
  - مثال: ⲕⲓⲙ (كيم) = يتحرك / حركة', 'درجات الكسر الثلاث المعتمدة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3007, 202, 'read_select', 'أي من الحروف التالية يمثل ''الياء المكسورة بمد طويل''؟', 'Ⲏ', 'إيتا', 'audio_coptic/8ei.mp3', NULL, 'الإيتا (Ⲏ) هي حرف المد الطويل للياء.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5011, 3007, 'حرف الإيتا (Ⲏ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5012, 3007, 'حرف الإي (Ⲉ)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5013, 3007, 'حرف اليوطا (Ⲓ)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3008, 202, 'select', 'ما معنى كلمة «ⲛⲉⲙ» بالقبطية؟', 'ⲛⲉⲙ', 'نِم', 'audio_coptic/8ei.mp3', NULL, 'ⲛⲉⲙ = مع.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5014, 3008, 'مع (حرف عطف)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5015, 3008, 'في', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5016, 3008, 'إلى', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3009, 202, 'match', 'طابق كل حرف بدرجة كسره الصوتية:', NULL, NULL, NULL, NULL, 'درجات الكسر الثلاث.', NULL, '[{"left":"Ⲉ","right":"كسرة خفيفة خطافة"},{"left":"Ⲏ","right":"ياء مكسورة بمد طويل"},{"left":"Ⲓ","right":"ياء قصيرة صريحة"}]'::jsonb, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3010, 202, 'write', 'ركّب كلمة ''عشرة'' بالقبطية (ميت):', 'ⲙⲏⲧ', 'ميت', 'audio_coptic/8ei.mp3', 'ⲙⲏⲧ', 'ⲙⲏⲧ = عشرة (10).', '["ⲙ","ⲏ","ⲧ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3011, 202, 'read_select', 'كلمة «ⲕⲓⲙ» (يتحرك) تنطق بياء:', 'ⲕⲓⲙ', 'كيم', 'audio_coptic/8ei.mp3', NULL, 'اليوطا ياء قصيرة صريحة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5017, 3011, 'قصيرة صريحة (كيم)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5018, 3011, 'ممدودة طويلاً', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5019, 3011, 'واو مضمومة', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (203, 51, 'عائلة حروف الضم ومقاييس الواوات (Ⲟ ، Ⲱ ، ⲞⲨ)', 3, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3012, 203, 'text_view', 'مقاييس أصوات الواو في اللغة القبطية', 'Ⲟ ، Ⲱ ، ⲞⲨ', 'أو وأوميجا وأو مضمومة', 'audio_coptic/1alfa.mp3', '• Ⲟ: واو قصيرة خطافة (مثل o في stop / مُعلم). مثال: ⲥⲟⲡ (سوب) = مرة
• Ⲱ: واو طويلة مفتوحة مفخمة (مثل hope / يوم). مثال: ⲱⲛϧ (أونخ) = حياة
• ⲞⲨ: واو طويلة مضمومة بشفتين مقفلتين (مثل oo في soon / فول). مثال: ⲁ̀ⲗⲟⲩ (آلو) = صبي', 'مقاييس أصوات الواوات الثلاثة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3013, 203, 'read_select', 'كلمة «ⲥⲟⲡ» (مرة) تُنطق بواو:', 'ⲥⲟⲡ', 'سوب', 'audio_coptic/1alfa.mp3', NULL, 'حرف Ⲟ واو قصيرة دائماً.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5020, 3013, 'قصيرة خطافة (سوب)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5021, 3013, 'طويلة مفخمة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5022, 3013, 'مكسورة', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3014, 203, 'select', 'ما معنى كلمة «ⲱⲛϧ» بالقبطية؟', 'ⲱⲛϧ', 'أونخ', 'audio_coptic/1alfa.mp3', NULL, 'ⲱⲛϧ = حياة / يعيش.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5023, 3014, 'يعيش / حياة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5024, 3014, 'يموت', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5025, 3014, 'يأكل', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3015, 203, 'write', 'ركّب كلمة ''صبي'' بالقبطية (آلو):', 'ⲁ̀ⲗⲟⲩ', 'آلو', 'audio_coptic/1alfa.mp3', 'ⲁ̀ⲗⲟⲩ', 'ⲁ̀ⲗⲟⲩ = صبي.', '["ⲁ̀","ⲗ","ⲟⲩ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3016, 203, 'read_select', 'ما الفرق في النطق بين «ⲥⲟⲡ» و «ⲥⲱⲡ»؟', 'ⲥⲟⲡ / ⲥⲱⲡ', 'سوب وسووب', 'audio_coptic/1alfa.mp3', NULL, 'الفارق بين Ⲟ و Ⲱ هو زمن النطق والتفخيم.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5026, 3016, 'الأولى بواو قصيرة خطافة والثانية بواو طويلة مفتوحة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5027, 3016, 'كلاهما متطابقان', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3017, 203, 'read_select', 'التركيب «ⲞⲨ» في كلمة «ⲛⲟⲩϯ» (الله) يُنطق:', 'ⲛⲟⲩϯ', 'نوتي', 'audio_coptic/1alfa.mp3', NULL, 'ⲞⲨ واو طويلة مضمومة (OO).', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5028, 3017, 'واو طويلة مضمومة كحرف المد في ''فول''', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5029, 3017, 'واو قصيرة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (204, 51, 'الأصوات المركبة الخاصة (ⲁⲩ ، ⲉⲩ ، ⲏⲩ)', 4, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3018, 204, 'text_view', 'قاعدة تحول الإبسلون بعد حروف الفتح والكسر إلى (ڤ)', 'ⲁⲩ ، ⲉⲩ ، ⲏⲩ', 'آڤ وإيڤ', 'audio_coptic/2vo.mp3', '• القاعدة الذهبية: إذا جاء حرف الإبسلون (Ⲩ) مسبوقاً بحرف فتح (Ⲁ) أو كسر (Ⲉ أو Ⲏ)، فإنه يُنطق صوتاً صامتاً شفتانياً: (ڤ - V):
  - ⲁⲩ ⬅ (آڤ) مثل: ⲥⲧⲁⲩⲣⲟⲥ (إستافروس) = صليب
  - ⲉⲩ ⬅ (إيڤ) مثل: ⲉⲩⲭⲏ (إيڤكي) = صلاة
  - ⲏⲩ ⬅ (إيـ-ڤ ممدودة) مثل: ⲛⲏⲩ (نيڤ) = آتٍ / قادم', 'الإبسلون بعد Ⲁ أو Ⲉ أو Ⲏ ينطق (ڤ).', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3019, 204, 'read_select', 'كيف يُنطق المقطع «ⲁⲩ» في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)؟', 'ⲥⲧⲁⲩⲣⲟⲥ', 'إستافروس', 'audio_coptic/2vo.mp3', NULL, 'Ⲁ + Ⲩ = آڤ.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5030, 3019, 'آڤ (صوت ڤ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5031, 3019, 'أوو (واو مضمومة)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5032, 3019, 'آي (ياء)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3020, 204, 'select', 'ما معنى كلمة «ⲉⲩⲭⲏ» في التراث الكنسي؟', 'ⲉⲩⲭⲏ', 'إيڤكي', 'audio_coptic/2vo.mp3', NULL, 'ⲉⲩⲭⲏ = صلاة.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5033, 3020, 'صلاة / طلبة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5034, 3020, 'صوم', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5035, 3020, 'قربان', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3021, 204, 'write', 'ركّب كلمة ''صليب'' بالقبطية:', 'ⲥⲧⲁⲩⲣⲟⲥ', 'إستافروس', 'audio_coptic/2vo.mp3', 'ⲥⲧⲁⲩⲣⲟⲥ', 'ⲥⲧⲁⲩⲣⲟⲥ = صليب.', '["ⲥ","ⲧ","ⲁ","ⲩ","ⲣ","ⲟ","ⲥ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3022, 204, 'read_select', 'كلمة «ⲛⲏⲩ» (آتٍ) تُنطق:', 'ⲛⲏⲩ', 'نيڤ', 'audio_coptic/2vo.mp3', NULL, 'Ⲏ + Ⲩ = نيڤ.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5036, 3022, 'نيڤ (بياء ممدودة بعدها ڤ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5037, 3022, 'نيو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3023, 204, 'read_select', 'في كلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ» (إنجيل)، المقطع الأول «ⲉⲩ» ينطق:', 'ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ', 'إيڤانغيليون', 'audio_coptic/2vo.mp3', NULL, 'Ⲉ + Ⲩ = إيڤ.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5038, 3023, 'إيڤ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5039, 3023, 'أوو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (205, 51, 'مختبر المقارنة والتمييز السمعي للوحدة الأولى', 5, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3024, 205, 'read_select', 'ميز بين «ⲙⲉⲧ» و «ⲙⲏⲧ»: الثانية بياء ممدودة وتعني:', 'ⲙⲏⲧ', 'ميت', 'audio_coptic/8ei.mp3', NULL, 'ⲙⲏⲧ = عشرة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5040, 3024, 'رقم عشرة (10)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5041, 3024, 'رقم خمسة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5042, 3024, 'خبز', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3025, 205, 'match', 'طابق كل كلمة بنطقها الصحيح من حيث طول الحركة:', NULL, NULL, NULL, NULL, 'مقارنة الواوات الثلاثة.', NULL, '[{"left":"ⲥⲟⲡ","right":"سوب (واو قصيرة)"},{"left":"ⲥⲱⲡ","right":"سووب (واو طويلة مفتوحة)"},{"left":"ⲥⲟⲩ","right":"سو (واو مضمومة)"}]'::jsonb, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3026, 205, 'select', 'أي من الكلمات التالية تشتمل على صوت (ڤ) صامت؟', 'ⲥⲧⲁⲩⲣⲟⲥ / ⲕⲓⲙ / ⲣⲁⲛ', 'إستافروس', 'audio_coptic/2vo.mp3', NULL, 'لوجود التركيب ⲁⲩ.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5043, 3026, 'ⲥⲧⲁⲩⲣⲟⲥ (صليب)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5044, 3026, 'ⲕⲓⲙ (حركة)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5045, 3026, 'ⲣⲁⲛ (اسم)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3027, 205, 'write', 'ركّب كلمة ''مع'' بالقبطية:', 'ⲛⲉⲙ', 'نِم', 'audio_coptic/8ei.mp3', 'ⲛⲉⲙ', 'ⲛⲉⲙ = مع.', '["ⲛ","ⲉ","ⲙ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3028, 205, 'read_select', 'كم مقطعاً صوتياً في كلمة «ⲉⲙⲙⲁⲛⲟⲩⲏⲗ» (عمانوئيل)؟', 'ⲉⲙ/ⲙⲁ/ⲛⲟⲩ/ⲏⲗ', 'إمّانوئيل', 'audio_coptic/8ei.mp3', NULL, '4 مقاطع صوتية متناسقة.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5046, 3028, '4 مقاطع (إم / ما / نو / إيل)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5047, 3028, 'مقطعان فقط', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3029, 205, 'read_select', 'ما هو الحرف المتحرك الوحيد المخصص للفتح في القبطية؟', 'Ⲁ', 'ألفا', 'audio_coptic/1alfa.mp3', NULL, 'Ⲁ هو حركة الفتح الوحيدة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5048, 3029, 'الألفا (Ⲁ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5049, 3029, 'الإي (Ⲉ)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_51', 6, 51, 'صندوق إتقان الوحدة ١: هندسة الحركات ومقاييس زمن النطق', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ١: هندسة الحركات ومقاييس زمن النطق', 'star', 'أتممت الوحدة ١: هندسة الحركات ومقاييس زمن النطق')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (52, 6, 'الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة', 'Ⲻ-Djinkim', 'فهم فلسفة التشكيل القبطي بالجنكم وكيفية صياغة المقاطع ومنع التقاء السواكن.', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (206, 52, 'الجنكم فوق الحروف الساكنة (صانع المقطع)', 1, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3030, 206, 'text_view', 'قاعدة الجنكم فوق الحروف الساكنة', 'ⲙ̀ ، ⲛ̀ ، ⲥ̀ ، ⲡ̀', 'جنكم ساكن', 'audio_coptic/1alfa.mp3', '• إذا وُضع الجنكم فوق حرف ساكن، يُنطق بمثابة همزة مكسورة خفيفة تسبق الحرف (إِ + الساكن)، فيجعله مقطعاً صوتياً مستقلاً بمفرده:
  - ⲙ̀ ⬅ يُنطق (إِم) مثل: ⲙ̀/ⲫⲣⲏ (إمفري = مثل / كـ)
  - ⲛ̀ ⬅ يُنطق (إِن) مثل: ⲛ̀/ⲧⲉ (إنتي = خاص بـ / لـ)
  - ⲥ̀ ⬅ يُنطق (إِس) مثل: ⲥ̀/ⲙⲟⲩ (إسمو = بارك)
  - ⲡ̀ ⬅ يُنطق (إِب) مثل: ⲡ̀/ϭⲟ/ⲓⲥ (إبشويس = الرب)', 'الجنكم على الساكن يسبقه بهمزة مكسورة (إِ).', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3031, 206, 'read_select', 'كيف يُنطق حرف السيما في أول كلمة «ⲥ̀ⲙⲟⲩ» (بارك)؟', 'ⲥ̀ⲙⲟⲩ', 'إسمو', 'audio_coptic/6soohinrpmy.mp3', NULL, 'الجنكم فوق الساكن ينطق كهمزة مكسورة: إِسـ.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5050, 3031, 'إِسـ (بهمزة مكسورة خفيفة قبل السين)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5051, 3031, 'سا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5052, 3031, 'سو', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3032, 206, 'select', 'ما معنى كلمة «ⲡ̀ϭⲟⲓⲥ» الكنسية الشهيرة؟', 'ⲡ̀ϭⲟⲓⲥ', 'إبشويس', 'audio_coptic/1alfa.mp3', NULL, 'ⲡ̀ϭⲟⲓⲥ = الرب.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5053, 3032, 'الرب / السيد', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5054, 3032, 'السماء', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5055, 3032, 'الملك', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3033, 206, 'write', 'ركّب كلمة ''بارك'' مقطعة بالقبطية (إسمو):', 'ⲥ̀ⲙⲟⲩ', 'إسمو', 'audio_coptic/6soohinrpmy.mp3', 'ⲥ̀ⲙⲟⲩ', 'ⲥ̀ⲙⲟⲩ = بارك.', '["ⲥ̀","ⲙ","ⲟⲩ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3034, 206, 'read_select', 'كم مقطعاً صوتياً في كلمة «ⲙ̀/ⲫⲣⲏ» (مثل)؟', 'ⲙ̀/ⲫⲣⲏ', 'إمفري', 'audio_coptic/1alfa.mp3', NULL, 'الجنكم صنع المقطع الأول المستقل (إم).', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5056, 3034, 'مقطعان: (إم) و (فري)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5057, 3034, 'مقطع واحد', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3035, 206, 'read_select', 'نطق حرف «ⲛ̀» في أول كلمة «ⲛ̀ⲧⲉ» هو:', 'ⲛ̀ⲧⲉ', 'إنتي', 'audio_coptic/1alfa.mp3', NULL, 'ⲛ̀ = إِن.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5058, 3035, 'إِن', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5059, 3035, 'نا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (207, 52, 'الجنكم فوق الحروف المتحركة (همزة القطع)', 2, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3036, 207, 'text_view', 'قاعدة الجنكم فوق الحروف المتحركة', 'ⲁ̀ ، ⲉ̀ ، ⲓ̀', 'جنكم متحرك', 'audio_coptic/1alfa.mp3', '• إذا وُضع الجنكم فوق حرف متحرك، ينطق الحرف نفسه بنبرة استقلال قاطعة كهمزة القطع:
  - ⲁ̀ ⬅ (آ قاطعة) مثل: ⲁ̀/ⲗⲟⲩ (آ-لو = صبي)
  - ⲉ̀ ⬅ (إي قاطعة) مثل: ⲉ̀/ⲃⲟⲗ (إي-فول = خارجاً / من)
  - ⲓ̀ ⬅ (إي قاطعة) مثل: ⲓ̀ (إي = تعالَ)', 'الجنكم على المتحرك يفيد استقلال نطقه كهمزة قطع.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3037, 207, 'read_select', 'ما هو أثر الجنكم فوق حرف متحرك مثل «ⲉ̀» في «ⲉ̀ⲃⲟⲗ»؟', 'ⲉ̀ⲃⲟⲗ', 'إيفول', 'audio_coptic/1alfa.mp3', NULL, 'الجنكم يعطي استقلالاً للنطق.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5060, 3037, 'يفيد استقلال نطق الحرف كنبرة منفصلة قاطعة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5061, 3037, 'يجعله صامتاً', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3038, 207, 'select', 'ما معنى كلمة «ⲉ̀ⲃⲟⲗ» بالقبطية؟', 'ⲉ̀ⲃⲟⲗ', 'إيفول', 'audio_coptic/1alfa.mp3', NULL, 'ⲉ̀ⲃⲟⲗ = خارجاً / من.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5062, 3038, 'خارجاً / من', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5063, 3038, 'داخلاً', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3039, 207, 'write', 'ركّب كلمة ''خارجاً'' بالقبطية:', 'ⲉ̀ⲃⲟⲗ', 'إيفول', 'audio_coptic/1alfa.mp3', 'ⲉ̀ⲃⲟⲗ', 'ⲉ̀ⲃⲟⲗ = خارجاً.', '["ⲉ̀","ⲃ","ⲟ","ⲗ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3040, 207, 'read_select', 'في عبارة «ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ» (أنعم لنا)، كيف يُنطق المقطع الأول «ⲁ̀»؟', 'ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ', 'آري إهموت', 'audio_coptic/1alfa.mp3', NULL, 'ⲁ̀ تلفظ آ مستقلة.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5064, 3040, 'آ (بنبرة همزة قطع صريحة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5065, 3040, 'إِ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3041, 207, 'read_select', 'ما الفرق في وظيفة الجنكم بين ساكن (ⲥ̀) ومتحرك (ⲉ̀)؟', NULL, NULL, NULL, NULL, 'الفرق الجوهري بين الساكن والمتحرك.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5066, 3041, 'على الساكن يسبقه بهمزة (إِسـ)، وعلى المتحرك ينطقه كهمزة مستقلة (إي)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5067, 3041, 'كلاهما متطابقان', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (208, 52, 'الجنكم المتتابع والكلمات متعددة المقاطع', 3, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3042, 208, 'text_view', 'تتابع علامات الجنكم في الكلمة الواحدة', 'ⲛ̀ⲧ̀ⲫⲉ ، ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ', 'جنكم متتابع', 'audio_coptic/1alfa.mp3', '• عندما تتتابع حروف ساكنة تحمل علامة الجنكم، ينطق كل حرف كمقطع مستقل:
  - ⲛ̀/ⲧ̀/ⲫⲉ ⬅ يُنطق (إن - إت - فيه = السماء)
  - ⲙ̀/ⲡ̀/ϭⲟ/ⲓⲥ ⬅ يُنطق (إم - إب - شو - يس = للرب)
  - ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ ⬅ يُنطق (إف - س - ما - رو - ؤوت = مبارك)', 'تتابع علامات الجنكم في الكلمة الواحدة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3043, 208, 'read_select', 'كلمة «ⲛ̀ⲧ̀ⲫⲉ» (السماء) تتكون من كم مقطع صوتي؟', 'ⲛ̀/ⲧ̀/ⲫⲉ', 'إن إت فيه', 'audio_coptic/1alfa.mp3', NULL, '3 مقاطع صوتية مستقلة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5068, 3043, '3 مقاطع: (إن) و (إت) و (فيه)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5069, 3043, 'مقطعان فقط', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3044, 208, 'select', 'ما معنى كلمة «ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» في التسابيح؟', 'ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ', 'إفسماروؤوت', 'audio_coptic/1alfa.mp3', NULL, 'ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ = مبارك.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5070, 3044, 'مبارك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5071, 3044, 'قدوس', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3045, 208, 'write', 'ركّب كلمة ''السماء'' ذات الجنكم المزدوج:', 'ⲛ̀ⲧ̀ⲫⲉ', 'إن إت فيه', 'audio_coptic/1alfa.mp3', 'ⲛ̀ⲧ̀ⲫⲉ', 'ⲛ̀ⲧ̀ⲫⲉ = السماء.', '["ⲛ̀","ⲧ̀","ⲫ","ⲉ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3046, 208, 'read_select', 'المقطعان الأولان في «ⲙ̀ⲡ̀ϭⲟⲓⲥ» (للرب) ينطقان:', 'ⲙ̀ⲡ̀ϭⲟⲓⲥ', 'إم إبشويس', 'audio_coptic/1alfa.mp3', NULL, 'ⲙ̀ (إم) + ⲡ̀ (إب).', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5072, 3046, 'إم - إب', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5073, 3046, 'ما - با', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3047, 208, 'read_select', 'لماذا وُضع الجنكم في كلمة «ⲛ̀ⲧ̀ⲫⲉ»؟', NULL, NULL, NULL, NULL, 'الجنكم يمنع التقاء السواكن.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5074, 3047, 'لمنع التقاء السواكن وتسهيل النطق بمقاطع مستقلة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5075, 3047, 'لأنه حرف علة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (209, 52, 'مراجعة وتحدي إتقان الجِنكِم', 4, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3048, 209, 'match', 'طابق الحرف بنطقه الفعلي عند وجود الجنكم:', NULL, NULL, NULL, NULL, 'نطق السواكن بالجنكم.', NULL, '[{"left":"ⲙ̀","right":"إِم"},{"left":"ⲡ̀","right":"إِب"},{"left":"ⲧ̀","right":"إِت"},{"left":"ϥ̀","right":"إِف"}]'::jsonb, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3049, 209, 'read_select', 'في جملة «ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ»، كم علامة جنكم توجد؟', 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ', 'إسمو إيبيكولوم', 'audio_coptic/1alfa.mp3', NULL, 'علامتان واضحتان.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5076, 3049, 'علامتان: الأولى فوق ⲥ̀ والثانية فوق ⲉ̀', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5077, 3049, 'علامة واحدة فقط', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3050, 209, 'write', 'ركّب كلمة ''الرب'' مقطعة:', 'ⲡ̀ϭⲟⲓⲥ', 'إبشويس', 'audio_coptic/1alfa.mp3', 'ⲡ̀ϭⲟⲓⲥ', 'ⲡ̀ϭⲟⲓⲥ = الرب.', '["ⲡ̀","ϭ","ⲟ","ⲓ","ⲥ"]'::jsonb, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3051, 209, 'select', 'كلمة «ⲙ̀ⲛⲟⲩϯ» المقطع الأول منها ينطق:', 'ⲙ̀ⲛⲟⲩϯ', 'إمنوتي', 'audio_coptic/1alfa.mp3', NULL, 'ⲙ̀/ⲛⲟⲩ/ϯ = إم - نو - تي.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5078, 3051, 'إِم (مقطع مستقل)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5079, 3051, 'مـا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3052, 209, 'read_select', 'ما الفرق الصوتي بين «ⲡⲓ» و «ⲡ̀/ⲓ»؟', NULL, NULL, NULL, NULL, 'الجنكم يقسم المقطع.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5080, 3052, 'الأولى تُنطق (بي) مقطع واحد، والثانية (إِب - ي) مقطعين', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5081, 3052, 'لا فرق بينهما', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3053, 209, 'read_select', 'حرف «ⲭ̀» في كلمة «ⲭ̀ⲣⲱⲟⲩ» (شاطئ) يُنطق:', 'ⲭ̀ⲣⲱⲟⲩ', 'إكروؤو', 'audio_coptic/1alfa.mp3', NULL, 'ⲭ̀ = إِك.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5082, 3053, 'إِك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5083, 3053, 'كا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_52', 6, 52, 'صندوق إتقان الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة', 'star', 'أتممت الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٣: الحروف ذات النطق الشرطي المزدوج
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (53, 6, 'الوحدة ٣: الحروف ذات النطق الشرطي المزدوج', 'Conditional-2', 'فحص الحرف التالي بدقة لتحديد صوت الحرف الحالي (Ⲃ, Ⲇ, Ⲑ, Ϫ).', 3)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (210, 53, 'حرف الفيتا (Ⲃ ⲃ) — بين ''ڤ'' و ''ب''', 1, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3054, 210, 'text_view', 'قاعدة نطق حرف الفيتا (Ⲃ ⲃ)', 'Ⲃ ⲃ', 'فيتا', 'audio_coptic/2vo.mp3', '• يُنطق (ڤ - V): إذا تلاه أي حرف متحرك (Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲩ, Ⲱ).
  - أمثلة: ⲃⲁⲗ (ڤال = عين)، ⲃⲱⲕ (ڤوك = اذهب)، ⲉ̀ⲃⲟⲗ (إيڤول = خارجاً)
• يُنطق (ب - B): إذا تلاه حرف ساكن أو جاء في نهاية الكلمة.
  - أمثلة: ⲧⲱⲃ (توب = طوبة)، ⲛⲓⲃ (نيف = كل)، ⲁⲃⲃⲁ (أبّا = أب)', 'الفيتا تنطق ڤ قبل المتحرك وب قبل الساكن وفي الآخر.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3055, 210, 'read_select', 'كيف يُنطق حرف «Ⲃ» في كلمة «ⲃⲁⲗ» (عين)؟', 'ⲃⲁⲗ', 'ڤال', 'audio_coptic/2vo.mp3', NULL, 'متبوعة بحرف متحرك = ڤ.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5084, 3055, 'ڤ (V) لمجيء حرف متحرك (Ⲁ) بعده', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5085, 3055, 'ب (B)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3056, 210, 'read_select', 'كيف يُنطق حرف «Ⲃ» في نهاية كلمة «ⲧⲱⲃ»؟', 'ⲧⲱⲃ', 'توب', 'audio_coptic/2vo.mp3', NULL, 'في نهاية الكلمة ينطق ب.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5086, 3056, 'ب (B) لوقوعه في نهاية الكلمة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5087, 3056, 'ڤ (V)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3057, 210, 'select', 'ما معنى كلمة «ⲃⲱⲕ» بالقبطية؟', 'ⲃⲱⲕ', 'ڤوك', 'audio_coptic/2vo.mp3', NULL, 'ⲃⲱⲕ = اذهب.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5088, 3057, 'اذهب / انطلق', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5089, 3057, 'اجلس', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3058, 210, 'write', 'ركّب كلمة ''عين'' بالقبطية (ڤال):', 'ⲃⲁⲗ', 'ڤال', 'audio_coptic/2vo.mp3', 'ⲃⲁⲗ', 'ⲃⲁⲗ = عين.', '["ⲃ","ⲁ","ⲗ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3059, 210, 'read_select', 'في كلمة «ⲁⲃⲃⲁ» (أبّا)، نُطق حرف الفيتا (ب) لأن:', NULL, NULL, NULL, NULL, 'الفيتا متبوعة بساكن تنطق ب.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5090, 3059, 'بعده حرف ساكن آخر', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5091, 3059, 'بعده حرف متحرك', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (211, 53, 'حرف الدلتا (Ⲇ ⲇ) — بين ''د'' و ''ذ''', 2, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3060, 211, 'text_view', 'قاعدة نطق حرف الدلتا (Ⲇ ⲇ)', 'Ⲇ ⲇ', 'دلتا', 'audio_coptic/1alfa.mp3', '• يُنطق (د - D): في أسماء الأعلام والأشخاص والمدن والبلاد المقدسة.
  - أمثلة: Ⲇⲁⲩⲓⲇ (داڤيد = داود الملك)، Ⲇⲁⲛⲓⲏⲗ (دانيال النبي)، Ⲓⲟⲣⲇⲁⲛⲏⲥ (يوردانيس = نهر الأردن)
• يُنطق (ذ - DH): في باقي الكلمات العامة (ومعظمها يوناني الأصل).
  - أمثلة: ⲇⲟⲝⲁ (ذوكصا = مجد)، ⲇⲓⲁⲕⲱⲛ (ذياكون = شماس)', 'أسماء الأعلام (د)، والكلمات العامة (ذ).', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3061, 211, 'read_select', 'يُنطق حرف «Ⲇ» في اسم «Ⲇⲁⲩⲓⲇ» بصوت:', 'Ⲇⲁⲩⲓⲇ', 'داڤيد', 'audio_coptic/1alfa.mp3', NULL, 'اسم عَلَم = د.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5092, 3061, 'د (D) لأنه اسم عَلَم', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5093, 3061, 'ذ (DH)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3062, 211, 'read_select', 'يُنطق حرف «Ⲇ» في كلمة «ⲇⲟⲝⲁ» (مجد) بصوت:', 'ⲇⲟⲝⲁ', 'ذوكصا', 'audio_coptic/1alfa.mp3', NULL, 'كلمة عامة = ذ.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5094, 3062, 'ذ (DH) لأنها كلمة عامة وليست اسم عَلَم', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5095, 3062, 'د (D)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3063, 211, 'select', 'كلمة «ⲇⲓⲁⲕⲱⲛ» تعني في الكنيسة:', 'ⲇⲓⲁⲕⲱⲛ', 'ذياكون', 'audio_coptic/1alfa.mp3', NULL, 'ⲇⲓⲁⲕⲱⲛ = شماس.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5096, 3063, 'شماس / خادم', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5097, 3063, 'كاهن', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3064, 211, 'write', 'ركّب كلمة ''مجد'' بالقبطية (ذوكصا):', 'ⲇⲟⲝⲁ', 'ذوكصا', 'audio_coptic/1alfa.mp3', 'ⲇⲟⲝⲁ', 'ⲇⲟⲝⲁ = مجد.', '["ⲇ","ⲟ","ⲝ","ⲁ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3065, 211, 'read_select', 'نهر الأردن «Ⲓⲟⲣⲇⲁⲛⲏⲥ» ينطق فيه الدلتا بصوت:', NULL, NULL, NULL, NULL, 'الأردن اسم علم = د.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5098, 3065, 'د (D) لأنه اسم مكان مقدّس (عَلَم)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5099, 3065, 'ذ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (212, 53, 'حرف الثيتا (Ⲑ ⲑ) — بين ''ت'' و ''ث''', 3, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3066, 212, 'text_view', 'قاعدة نطق حرف الثيتا (Ⲑ ⲑ)', 'Ⲑ ⲑ', 'ثيتا', 'audio_coptic/1alfa.mp3', '• يُنطق (ت - T): إذا سبقه مباشرة حرف السيما (Ⲥ) أو حرف الشاي (Ϣ).
  - أمثلة: ⲙⲓⲥ/ⲑⲟⲥ (مستوس = أجرة)، ⲁⲥ/ⲑⲉ/ⲛⲏⲥ (أستينيس = ضعيف / مريض)
• يُنطق (ث - TH): في جميع الحالات الأخرى.
  - أمثلة: ⲑⲱⲛ (ثون = أين)، ⲑⲉⲟⲥ (ثيئوس = إله)، ⲡⲁⲣⲑⲉⲛⲟⲥ (بارثينوس = عذراء)', 'ينطق ت بعد السيما أو الشاي، وث في باقي الحالات.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3067, 212, 'read_select', 'في كلمة «ⲙⲓⲥⲑⲟⲥ» (أجرة)، يُنطق حرف «Ⲑ»:', 'ⲙⲓⲥⲑⲟⲥ', 'مستوس', 'audio_coptic/1alfa.mp3', NULL, 'بعد السيما ينطق ت.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5100, 3067, 'ت (T) لأنه مسبوق بحرف السيما (Ⲥ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5101, 3067, 'ث (TH)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3068, 212, 'read_select', 'في كلمة «ⲑⲱⲛ» (أين)، يُنطق حرف «Ⲑ»:', 'ⲑⲱⲛ', 'ثون', 'audio_coptic/1alfa.mp3', NULL, 'في بداية الكلمة ينطق ث.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5102, 3068, 'ث (TH) لعدم وجود سيما أو شاي قبله', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5103, 3068, 'ت (T)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3069, 212, 'select', 'معنى كلمة «ⲡⲁⲣⲑⲉⲛⲟⲥ» في التسابيح هو:', 'ⲡⲁⲣⲑⲉⲛⲟⲥ', 'بارثينوس', 'audio_coptic/1alfa.mp3', NULL, 'ⲡⲁⲣⲑⲉⲛⲟⲥ = العذراء.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5104, 3069, 'العذراء', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5105, 3069, 'الملكة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3070, 212, 'write', 'ركّب كلمة ''أين'' بالقبطية (ثون):', 'ⲑⲱⲛ', 'ثون', 'audio_coptic/1alfa.mp3', 'ⲑⲱⲛ', 'ⲑⲱⲛ = أين.', '["ⲑ","ⲱ","ⲛ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3071, 212, 'read_select', 'كلمة «ⲑⲉⲟⲥ» (إله) تنطق:', 'ⲑⲉⲟⲥ', 'ثيئوس', 'audio_coptic/1alfa.mp3', NULL, 'تنطق ثيئوس.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5106, 3071, 'ثيئوس', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5107, 3071, 'تيئوس', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (213, 53, 'حرف الجانجا (Ϫ ϫ) — بين ''جيم معطشة'' و ''جيم صلبة''', 4, 1, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3072, 213, 'text_view', 'قاعدة نطق حرف الجانجا (Ϫ ϫ)', 'Ϫ ϫ', 'جانجا', 'audio_coptic/1alfa.mp3', '• يُنطق (جيم معطشة - J): إذا تلاه حرف متحرك مائل للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).
  - أمثلة: ϫⲉ (جيه = لأن / قائلاً)، ϫⲓ (جي = خُذ)، ϫⲏϫ (جيج = رؤساء)
• يُنطق (جيم مصرية صلبة غير معطشة - G): في باقي الحالات (قبل الفتح والضم والسواكن وفي آخر الكلمة).
  - أمثلة: ϫⲁⲙⲟⲩⲗ (جامول = جمل)، ϫⲟⲙ (جوم = قوة)، ⲁϫⲡ (أجب = ساعة)', 'جيم معطشة قبل الكسر، وجيم صلبة في غير ذلك.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3073, 213, 'read_select', 'يُنطق حرف «Ϫ» في كلمة «ϫⲉ» (لأن):', 'ϫⲉ', 'جيه', 'audio_coptic/1alfa.mp3', NULL, 'متبوعة بكسر = جيم معطشة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5108, 3073, 'جيم معطشة (J) لمجيء حرف كسر (Ⲉ) بعده', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5109, 3073, 'جيم صلبة (G)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3074, 213, 'read_select', 'يُنطق حرف «Ϫ» في كلمة «ϫⲁⲙⲟⲩⲗ» (جمل):', 'ϫⲁⲙⲟⲩⲗ', 'جامول', 'audio_coptic/1alfa.mp3', NULL, 'متبوعة بألفا (فتح) = جيم صلبة.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5110, 3074, 'جيم قاهرية صلبة (G) لعدم وجود كسر بعده', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5111, 3074, 'جيم معطشة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3075, 213, 'select', 'كلمة «ϫⲟⲙ» تعني بالقبطية:', 'ϫⲟⲙ', 'جوم', 'audio_coptic/1alfa.mp3', NULL, 'ϫⲟⲙ = قوة.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5112, 3075, 'قوة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5113, 3075, 'ضعف', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3076, 213, 'write', 'ركّب كلمة ''جمل'' بالقبطية (جامول):', 'ϫⲁⲙⲟⲩⲗ', 'جامول', 'audio_coptic/1alfa.mp3', 'ϫⲁⲙⲟⲩⲗ', 'ϫⲁⲙⲟⲩⲗ = جمل.', '["ϫ","ⲁ","ⲙ","ⲟⲩ","ⲗ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3077, 213, 'read_select', 'في كلمة «ⲁϫⲡ» (ساعة)، يُنطق حرف الجانجا:', NULL, NULL, NULL, NULL, 'متبوعة بساكن = جيم صلبة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5114, 3077, 'جيم صلبة (أجب) لأنه متبوع بحرف ساكن (Ⲡ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5115, 3077, 'جيم معطشة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (214, 53, 'مراجعة وتحدي الحروف الثنائية النطق', 5, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3078, 214, 'match', 'طابق الحرف بشرط نطقه المحدد بدقة:', NULL, NULL, NULL, NULL, 'ملخص القواعد الثنائية الأربع.', NULL, '[{"left":"Ⲃ","right":"ڤ قبل المتحرك وب في غير ذلك"},{"left":"Ⲇ","right":"د في أسماء الأعلام وذ في العام"},{"left":"Ⲑ","right":"ت بعد س وش وث في غير ذلك"},{"left":"Ϫ","right":"جيم معطشة قبل الكسر وصلبة في غيره"}]'::jsonb, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3079, 214, 'read_select', 'أي كلمة مما يلي تحتوي جيماً معطشة صريحة؟', 'ϫⲉ / ϫⲟⲙ / ϫⲁⲙⲟⲩⲗ', 'جيه', 'audio_coptic/1alfa.mp3', NULL, 'ϫⲉ متبوعة بكسر.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5116, 3079, 'ϫⲉ (جيه)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5117, 3079, 'ϫⲟⲙ (جوم)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5118, 3079, 'ϫⲁⲙⲟⲩⲗ (جامول)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3080, 214, 'write', 'ركّب اسم ''داود'' بالقبطية (داڤيد):', 'Ⲇⲁⲩⲓⲇ', 'داڤيد', 'audio_coptic/1alfa.mp3', 'Ⲇⲁⲩⲓⲇ', 'Ⲇⲁⲩⲓⲇ = داود.', '["Ⲇ","ⲁ","ⲩ","ⲓ","ⲇ"]'::jsonb, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3081, 214, 'read_select', 'كلمة «ⲁⲥⲑⲉⲛⲏⲥ» (مريض) نطق حرف الثيتا فيها هو:', NULL, NULL, NULL, NULL, 'سبقها حرف سيما.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5119, 3081, 'ت (أستينيس)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5120, 3081, 'ث', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3082, 214, 'select', 'في جملة «ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ Ⲇⲁⲩⲓⲇ»، نطق الفيتا والدلتا هو:', NULL, NULL, NULL, NULL, 'ڤ لتلوها بمتحرك ود لأنه اسم علم.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5121, 3082, 'ڤ (في إيڤول) و د (في داڤيد)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5122, 3082, 'ب و ذ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3083, 214, 'read_select', 'هل الجانجا حرف مصري ديموطيقي أم يوناني؟', NULL, NULL, NULL, NULL, 'الجانجا من الحروف الديموطيقية الـ 7.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5123, 3083, 'حرف مصري ديموطيقي أصيل', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5124, 3083, 'حرف يوناني', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_53', 6, 53, 'صندوق إتقان الوحدة ٣: الحروف ذات النطق الشرطي المزدوج', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٣: الحروف ذات النطق الشرطي المزدوج', 'star', 'أتممت الوحدة ٣: الحروف ذات النطق الشرطي المزدوج')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (54, 6, 'الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة', 'Conditional-3', 'فك شفرات الحروف الثلاثية النطق بتطبيق الشروط المتسلسلة (Ⲅ, Ⲩ, Ⲭ).', 4)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (215, 54, 'حرف الغمّا (Ⲅ ⲅ) — بين ''ج'' و ''ن'' و ''غ''', 1, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3084, 215, 'text_view', 'قاعدة حرف الغمّا (Ⲅ ⲅ) الثلاثية', 'Ⲅ ⲅ', 'غمّا', 'audio_coptic/3ghala.mp3', '• يُنطق (جيم معطشة - G): إذا جاء بعده حرف متحرك مائل للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).
  - أمثلة: ⲁⲅⲓⲟⲥ (آجيوس = قدوس)، ⲅⲏ (جي = أرض)
• يُنطق (نون أنفية حلقية - N): إذا جاء بعده حرف حلقي آخر (Ⲅ, Ⲕ, Ⲝ, Ⲭ).
  - أمثلة: ⲁⲅⲅⲉⲗⲟⲥ (أنغيلوس = ملاك)، ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ (إيڤانغيليون = إنجيل)
• يُنطق (غين - GH): في باقي الحالات الأخرى.
  - أمثلة: ⲅⲣⲁⲫⲏ (غرافيه = كتابة)، ⲗⲟⲅⲟⲥ (لوغوس = كلمة)', 'الغمّا: كسر ⬅ جيم | حلقي ⬅ نون | غير ذلك ⬅ غين.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3085, 215, 'read_select', 'في كلمة «ⲁⲅⲓⲟⲥ» (قدوس)، يُنطق حرف الغمّا:', 'ⲁⲅⲓⲟⲥ', 'آجيوس', 'audio_coptic/3ghala.mp3', NULL, 'متبوع بكسر = جيم معطشة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5125, 3085, 'جيم معطشة (G) لوجود حرف كسر (Ⲓ) بعده', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5126, 3085, 'نون (N)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5127, 3085, 'غين (GH)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3086, 215, 'read_select', 'في كلمة «ⲁⲅⲅⲉⲗⲟⲥ» (ملاك)، حرف الغمّا الأول يُنطق:', 'ⲁⲅⲅⲉⲗⲟⲥ', 'أنغيلوس', 'audio_coptic/3ghala.mp3', NULL, 'متبوع بحرف حلقي = نون.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5128, 3086, 'نون أنفية (N) لمجيء غمّا حلقية بعده', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5129, 3086, 'جيم', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5130, 3086, 'غين', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3087, 215, 'select', 'ما معنى كلمة «ⲁⲅⲅⲉⲗⲟⲥ» الكنسية؟', 'ⲁⲅⲅⲉⲗⲟⲥ', 'أنغيلوس', 'audio_coptic/3ghala.mp3', NULL, 'ⲁⲅⲅⲉⲗⲟⲥ = ملاك.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5131, 3087, 'ملاك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5132, 3087, 'رسول', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5133, 3087, 'شهيد', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3088, 215, 'write', 'ركّب كلمة ''قدوس'' بالقبطية (آجيوس):', 'ⲁⲅⲓⲟⲥ', 'آجيوس', 'audio_coptic/3ghala.mp3', 'ⲁⲅⲓⲟⲥ', 'ⲁⲅⲓⲟⲥ = قدوس.', '["ⲁ","ⲅ","ⲓ","ⲟ","ⲥ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3089, 215, 'read_select', 'كلمة «ⲅⲣⲁⲫⲏ» (كتابة) يُنطق الغمّا فيها بصوت:', NULL, NULL, NULL, NULL, 'ليس بعده كسر ولا حلقي = غين.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5134, 3089, 'غين (غرافيه) لأنه متبوع بحرف ساكن (Ⲣ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5135, 3089, 'جيم', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (216, 54, 'حرف الإبسلون (Ⲩ ⲩ) — بين ''ڤ'' و ''أو'' و ''ي''', 2, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3090, 216, 'text_view', 'قاعدة حرف الإبسلون (Ⲩ ⲩ) الثلاثية', 'Ⲩ ⲩ', 'إبسلون', 'audio_coptic/1alfa.mp3', '• يُنطق (ڤ - V): إذا سبقه حرف Ⲁ أو Ⲉ.
  - أمثلة: ⲥⲧⲁⲩⲣⲟⲥ (إستافروس = صليب)، ⲉⲩⲭⲏ (إيڤكي = صلاة)
• يُنطق (واو طويلة مضمومة - OO): إذا سبقه حرف Ⲟ (التركيب ⲞⲨ).
  - أمثلة: ⲟⲩϫⲁⲓ (أوجاي = سلامة)، ⲛⲟⲩϯ (نوتي = إله)
• يُنطق (ياء قصيرة - I): إذا جاء منفرداً دون أن يسبقه Ⲁ, Ⲉ, Ⲟ.
  - أمثلة: ⲯⲩⲭⲏ (بسيشي = نفس)، ϩⲩⲙⲛⲟⲥ (هيمنوس = ترنيمة)', 'الإبسلون: بعد Ⲁ, Ⲉ ⬅ ڤ | بعد Ⲟ ⬅ واو مضمومة | منفرد ⬅ ياء.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3091, 216, 'read_select', 'في كلمة «ⲛⲟⲩϯ» (الله)، يُنطق الإبسلون:', 'ⲛⲟⲩϯ', 'نوتي', 'audio_coptic/1alfa.mp3', NULL, 'مسبوق بحرف Ⲟ = واو مضمومة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5136, 3091, 'واو طويلة مضمومة لمجيء الأو (Ⲟ) قبله', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5137, 3091, 'ڤ (V)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5138, 3091, 'ياء', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3092, 216, 'read_select', 'في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)، يُنطق الإبسلون:', 'ⲥⲧⲁⲩⲣⲟⲥ', 'إستافروس', 'audio_coptic/2vo.mp3', NULL, 'مسبوق بألفا = ڤ.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5139, 3092, 'ڤ (V) لمجيء الألفا (Ⲁ) قبله', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5140, 3092, 'واو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3093, 216, 'select', 'ما معنى كلمة «ⲟⲩϫⲁⲓ» بالقبطية؟', 'ⲟⲩϫⲁⲓ', 'أوجاي', 'audio_coptic/1alfa.mp3', NULL, 'ⲟⲩϫⲁⲓ = سلامة / عافية.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5141, 3093, 'سلامة / عافية / خلاص', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5142, 3093, 'مرض', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3094, 216, 'write', 'ركّب كلمة ''ترنيمة'' بالقبطية (هيمنوس):', 'ϩⲩⲙⲛⲟⲥ', 'هيمنوس', 'audio_coptic/1alfa.mp3', 'ϩⲩⲙⲛⲟⲥ', 'ϩⲩⲙⲛⲟⲥ = ترنيمة.', '["ϩ","ⲩ","ⲙ","ⲛ","ⲟ","ⲥ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3095, 216, 'read_select', 'في كلمة «ⲯⲩⲭⲏ» (نفس)، يُنطق الإبسلون بصوت:', NULL, NULL, NULL, NULL, 'إبسلون منفرد = ياء.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5143, 3095, 'ياء قصيرة (بسيشي) لأنه جاء منفرداً', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5144, 3095, 'واو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (217, 54, 'حرف الكي (Ⲭ ⲭ) — بين ''ك'' و ''ش'' و ''خ''', 3, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3096, 217, 'text_view', 'قاعدة حرف الكي (Ⲭ ⲭ) الثلاثية المعتمدة', 'Ⲭ ⲭ', 'كي', 'audio_coptic/1alfa.mp3', '• يُنطق (كاف - K): في الكلمات القبطية الأصلية دائماً.
  - أمثلة: ⲭⲏⲙⲓ (كيمي = مصر)، ⲛⲉⲭⲗⲟⲙ (نيكلوم = أكاليل)
• يُنطق (شين - SH): في الكلمات اليونانية إذا تلاه حرف كسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).
  - أمثلة: ⲭⲉⲣⲉ (شيريه = السلام لكِ)، ⲭⲓⲱⲛ (شيون = ثلج)
• يُنطق (خاء - KH): في الكلمات اليونانية إذا لم يتله كسر (قبل فتح أو ضم أو ساكن).
  - أمثلة: Ⲭⲣⲓⲥⲧⲟⲥ (خرستوس = المسيح)، ⲭⲟⲣⲟⲥ (خوروس = مرتلون)', 'الكي: قبطي ⬅ كاف | يوناني + كسر ⬅ شين | يوناني + غير كسر ⬅ خاء.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3097, 217, 'read_select', 'كلمة «ⲭⲏⲙⲓ» (مصر) قبطية الأصل، لذا يُنطق حرف الكي فيها:', 'ⲭⲏⲙⲓ', 'كيمي', 'audio_coptic/1alfa.mp3', NULL, 'في الكلمات القبطية ينطق كافاً دائماً.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5145, 3097, 'كاف (K) لأن الكلمة قبطية أصيلة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5146, 3097, 'شين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5147, 3097, 'خاء', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3098, 217, 'read_select', 'كلمة «ⲭⲉⲣⲉ» (السلام لكِ) يونانية ومتبوعة بكسر، لذا تنطق:', 'ⲭⲉⲣⲉ', 'شيريه', 'audio_coptic/1alfa.mp3', NULL, 'يوناني + كسر = شين.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5148, 3098, 'شين (شيريه)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5149, 3098, 'خاء (خيريه)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5150, 3098, 'كاف (كيريه)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3099, 217, 'read_select', 'كلمة «Ⲭⲣⲓⲥⲧⲟⲥ» (المسيح) يونانية ومتبوعة بساكن، لذا تنطق:', 'Ⲭⲣⲓⲥⲧⲟⲥ', 'خرستوس', 'audio_coptic/1alfa.mp3', NULL, 'يوناني + غير كسر = خاء.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5151, 3099, 'خاء (خرستوس)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5152, 3099, 'شين (شرستوس)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5153, 3099, 'كاف', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3100, 217, 'write', 'ركّب كلمة ''السلام لكِ'' بالقبطية (شيريه):', 'ⲭⲉⲣⲉ', 'شيريه', 'audio_coptic/1alfa.mp3', 'ⲭⲉⲣⲉ', 'ⲭⲉⲣⲉ = السلام لكِ.', '["ⲭ","ⲉ","ⲣ","ⲉ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3101, 217, 'select', 'كلمة «ⲭⲏⲙⲓ» تعني بالقبطية:', 'ⲭⲏⲙⲓ', 'كيمي', 'audio_coptic/1alfa.mp3', NULL, 'ⲭⲏⲙⲓ = مصر.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5154, 3101, 'مصر (الأرض السوداء)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5155, 3101, 'الإسكندرية', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (218, 54, 'خوارزمية فحص الحروف الثلاثية بخطوتين', 4, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3102, 218, 'read_select', 'في كلمة «ⲭⲁⲕⲓ» (ظلمة) وهي قبطية، نطق الكي هو:', 'ⲭⲁⲕⲓ', 'كاكي', 'audio_coptic/1alfa.mp3', NULL, 'كلمة قبطية = كاف.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5156, 3102, 'كاف (كاكي)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5157, 3102, 'خاء', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3103, 218, 'read_select', 'في كلمة «ⲉⲩⲭⲏ» (صلاة) وهي يونانية ومتبوعة بإيتا، نطق الكي هو:', 'ⲉⲩⲭⲏ', 'إيڤكي', 'audio_coptic/2vo.mp3', NULL, 'تلاها حرف كسر.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5158, 3103, 'شين (إيڤشي) في اليوناني القياسي ويسمح بالكاف', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5159, 3103, 'خاء', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3104, 218, 'read_select', 'في «ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ»، الغمّا الأولى والثانية تنطقان:', NULL, NULL, NULL, NULL, 'أنغيلوس / إيڤانغيليون.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5160, 3104, 'الأولى نون والثانية جيم معطشة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5161, 3104, 'كلاهما جيم', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3105, 218, 'select', 'كلمة «ⲛⲉⲭⲗⲟⲙ» (أكاليل) قبطية، فكيف تنطق؟', 'ⲛⲉⲭⲗⲟⲙ', 'نيكلوم', 'audio_coptic/1alfa.mp3', NULL, 'قبطية = كاف.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5162, 3105, 'نيكلوم (بالكاف)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5163, 3105, 'نيخلوم', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3106, 218, 'write', 'ركّب كلمة ''المسيح'':', 'Ⲭⲣⲓⲥⲧⲟⲥ', 'خرستوس', 'audio_coptic/1alfa.mp3', 'Ⲭⲣⲓⲥⲧⲟⲥ', 'Ⲭⲣⲓⲥⲧⲟⲥ = المسيح.', '["Ⲭ","ⲣ","ⲓ","ⲥ","ⲧ","ⲟ","ⲥ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3107, 218, 'read_select', 'حرف «ⲭ» في «ⲭⲟⲣⲟⲥ» (مرتلون) ينطق:', NULL, NULL, NULL, NULL, 'متبوع بواو = خاء.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5164, 3107, 'خاء (خوروس) لعدم وجود كسر', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5165, 3107, 'شين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (219, 54, 'مراجعة وتحدي الحروف الثلاثية الشامل', 5, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3108, 219, 'match', 'طابق الحرف بحالاته الثلاث بدقة:', NULL, NULL, NULL, NULL, 'ملخص القواعد الثلاثية الكبرى.', NULL, '[{"left":"Ⲅ","right":"جيم قبل الكسر، نون قبل الحلقي، غين في الباقي"},{"left":"Ⲩ","right":"ڤ بعد ألفا وإي، واو بعد أو، ياء منفرد"},{"left":"Ⲭ","right":"كاف في القبطي، شين قبل الكسر باليوناني، خاء في الباقي"}]'::jsonb, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3109, 219, 'read_select', 'متى ينطق الإبسلون (ڤ)؟', NULL, NULL, NULL, NULL, 'بعد Ⲁ أو Ⲉ.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5166, 3109, 'إذا سبقه حرف Ⲁ أو Ⲉ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5167, 3109, 'في نهاية الكلمة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3110, 219, 'read_select', 'متى ينطق الغمّا (نون)؟', NULL, NULL, NULL, NULL, 'قبل الحروف الحلقية.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5168, 3110, 'إذا جاء بعده حرف حلقي آخر (غمّا، كبّا، كسي، كي)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5169, 3110, 'قبل حرف الألفا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3111, 219, 'write', 'ركّب كلمة ''إنجيل'' بالقبطية:', 'ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ', 'إيڤانغيليون', 'audio_coptic/2vo.mp3', 'ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ', 'ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ = إنجيل.', '["ⲉ","ⲩ","ⲁ","ⲅ","ⲅ","ⲉ","ⲗ","ⲓ","ⲟ","ⲛ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3112, 219, 'select', 'عبارة «Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ» تعني:', NULL, NULL, NULL, NULL, 'قدوس الله.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5170, 3112, 'قدوس الله', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5171, 3112, 'المجد لله', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3113, 219, 'read_select', 'في كلمة «ϩⲩⲙⲛⲟⲥ»، الإبسلون ينطق بصوت:', NULL, NULL, NULL, NULL, 'إبسلون منفرد = ياء.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5172, 3113, 'ياء قصيرة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5173, 3113, 'واو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_54', 6, 54, 'صندوق إتقان الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة', 'star', 'أتممت الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (55, 6, 'الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني', 'Coptic-vs-Greek', 'امتلاك الحاسة اللغوية الصائبة لتحديد أصل الكلمة وتطبيق أحكام نطقها بدقة.', 5)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (220, 55, 'الحروف الديموطيقية السبعة — صك الهوية المصرية', 1, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3114, 220, 'text_view', 'الحروف المصرية السبعة حارسة الأصل القبطي', 'Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ', 'حروف ديموطيقية', 'audio_coptic/1alfa.mp3', '• القاعدة القطعية: أي كلمة في اللغة القبطية تشتمل على حرف أو أكثر من الحروف السبعة الديموطيقية التالية هي كلمة قبطية أصيلة 100%:
  - Ϣ (شاي)، Ϥ (فاي)، Ϧ (خاي)، Ϩ (هوري)، Ϫ (جانجا)، Ϭ (تشيما)، Ϯ (تي)
• شواهد معتمدة:
  - ϣⲱⲡ (شوب = يقبل)، ϥⲁⲓ (فاي = يحمل)، ϧⲉⲛ (خين = في)
  - ϩⲏⲧ (هيت = قلب)، ϫⲱ (جو = يقول)، ϭⲟⲓⲥ (شويس = رب)', 'الحروف الديموطيقية لا توجد إطلاقاً في الكلمات اليونانية.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3115, 220, 'read_select', 'كلمة «ϧⲉⲛ» (في) أصلها:', 'ϧⲉⲛ', 'خين', 'audio_coptic/1alfa.mp3', NULL, 'الخاي حرف ديموطيقي أصيل.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5174, 3115, 'قبطي أصيل لوجود حرف الخاي (Ϧ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5175, 3115, 'يوناني', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3116, 220, 'read_select', 'كلمة «ϭⲟⲓⲥ» (رب) أصلها:', 'ϭⲟⲓⲥ', 'شويس', 'audio_coptic/1alfa.mp3', NULL, 'التشيما حرف ديموطيقي مصري.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5176, 3116, 'قبطي أصيل لوجود حرف التشيما (Ϭ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5177, 3116, 'يوناني', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3117, 220, 'select', 'كم حرفاً مصرياً ديموطيقياً في الأبجدية القبطية؟', NULL, NULL, NULL, NULL, '7 حروف مصرية مضافة للأبجدية اليونانية.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5178, 3117, '7 حروف', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5179, 3117, '5 حروف', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5180, 3117, '10 حروف', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3118, 220, 'write', 'ركّب كلمة ''في'' بالقبطية (خين):', 'ϧⲉⲛ', 'خين', 'audio_coptic/1alfa.mp3', 'ϧⲉⲛ', 'ϧⲉⲛ = في.', '["ϧ","ⲉ","ⲛ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3119, 220, 'read_select', 'إذا احتوت كلمة على حرف «Ϣ» ومعه حرف «Ⲭ»، كيف ينطق الكي؟', NULL, NULL, NULL, NULL, 'وجود حرف ديموطيقي يثبت قبطية الكلمة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5181, 3119, 'كاف دائماً لأن الكلمة قبطية قطعاً', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5182, 3119, 'شين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (221, 55, 'الحروف اليونانية الصريحة وكواشف الأصل', 2, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3120, 221, 'text_view', 'الحروف التي تدل على أصل يوناني', 'Ⲅ, Ⲇ, Ⲍ, Ⲝ, ⲯ', 'حروف يونانية', 'audio_coptic/1alfa.mp3', '• الحروف التالية لا تدخل في الكلمات القبطية الأصيلة، بل تشير دائماً إلى أصل يوناني للكلمة:
  - Ⲅ (غمّا)، Ⲇ (دلتا)، Ⲍ (زاطا)، Ⲝ (إكسي)، ⲯ (إبسي)
• أمثلة:
  - ⲇⲟⲝⲁ (ذوكصا = مجد)
  - ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)
  - ⲁⲝⲓⲟⲥ (آكسيوس = مستحق)', 'هذه الأحرف يونانية لا توجد في القبطي الأصيل إلا بشذوذ نادر.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3121, 221, 'read_select', 'كلمة «ⲇⲟⲝⲁ» (مجد) أصلها:', 'ⲇⲟⲝⲁ', 'ذوكصا', 'audio_coptic/1alfa.mp3', NULL, 'حروف يونانية صريحة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5183, 3121, 'يوناني لوجود حرفي الدلتا والإكسي', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5184, 3121, 'قبطي أصيل', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3122, 221, 'read_select', 'كلمة «ⲯⲁⲗⲙⲟⲥ» (مزمور) أصلها:', 'ⲯⲁⲗⲙⲟⲥ', 'بصالموس', 'audio_coptic/1alfa.mp3', NULL, 'يونانية الأصل.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5185, 3122, 'يوناني لوجود حرف الإبسي والنهاية os', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5186, 3122, 'قبطي', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3123, 221, 'select', 'كلمة «ⲁⲝⲓⲟⲥ» الكنسية تعني:', 'ⲁⲝⲓⲟⲥ', 'آكسيوس', 'audio_coptic/1alfa.mp3', NULL, 'ⲁⲝⲓⲟⲥ = مستحق.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5187, 3123, 'مستحق / عادل', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5188, 3123, 'مبارك', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3124, 221, 'write', 'ركّب كلمة ''مزمور'' بالقبطية:', 'ⲯⲁⲗⲙⲟⲥ', 'بصالموس', 'audio_coptic/1alfa.mp3', 'ⲯⲁⲗⲙⲟⲥ', 'ⲯⲁⲗⲙⲟⲥ = مزمور.', '["ⲯ","ⲁ","ⲗ","ⲙ","ⲟ","ⲥ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3125, 221, 'read_select', 'كلمة «ⲁⲛⲍⲏⲃ» (مدرسة) تُعد من الحالات الشاذة لأنها:', NULL, NULL, NULL, NULL, 'استثناء نادر جداً.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5189, 3125, 'كلمة قبطية احتوت نادراً على حرف الزاطا (Ⲍ)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5190, 3125, 'كلمة يونانية محضة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (222, 55, 'النهايات والقوالب الصرفية اليونانية', 3, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3126, 222, 'text_view', 'النهايات الإعرابية اليونانية الشهيرة', '-ⲟⲥ, -ⲏⲥ, -ⲁⲥ, -ⲟⲛ, -ⲓⲁ', 'نهايات يونانية', 'audio_coptic/1alfa.mp3', '• تتميز الكلمات اليونانية بنهايات إعرابية واضحة:
  1. نهايات المذكر: -ⲟⲥ (مثل: ⲗⲟⲅⲟⲥ, ⲁⲅⲅⲉⲗⲟⲥ)، -ⲏⲥ (مثل: ⲙⲁⲑⲏⲧⲏⲥ = تلميذ)
  2. نهايات المحايد والمؤنث: -ⲟⲛ (مثل: ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ)، -ⲓⲁ (مثل: ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة)', 'نهايات الأسماء اليونانية.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3127, 222, 'read_select', 'كلمة «ⲉⲕⲕⲗⲏⲥⲓⲁ» (كنيسة) تنتهي بـ «-ⲓⲁ»، لذا فأصلها:', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', 'إكليسيا', 'audio_coptic/1alfa.mp3', NULL, 'نهاية يونانية مؤنثة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5191, 3127, 'يوناني', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5192, 3127, 'قبطي', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3128, 222, 'read_select', 'كلمة «ⲙⲁⲑⲏⲧⲏⲥ» (تلميذ) تنتهي بـ «-ⲏⲥ»، وأصلها:', 'ⲙⲁⲑⲏⲧⲏⲥ', 'ماثيتيس', 'audio_coptic/1alfa.mp3', NULL, 'نهاية فاعل يونانية.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5193, 3128, 'يوناني', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5194, 3128, 'قبطي', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3129, 222, 'select', 'ما معنى كلمة «ⲉⲕⲕⲗⲏⲥⲓⲁ»؟', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', 'إكليسيا', 'audio_coptic/1alfa.mp3', NULL, 'ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5195, 3129, 'كنيسة / جماعة المؤمنين', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5196, 3129, 'مذبح', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3130, 222, 'write', 'ركّب كلمة ''كنيسة'' بالقبطية (إكليسيا):', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', 'إكليسيا', 'audio_coptic/1alfa.mp3', 'ⲉⲕⲕⲗⲏⲥⲓⲁ', 'ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة.', '["ⲉ","ⲕ","ⲕ","ⲗ","ⲏ","ⲥ","ⲓ","ⲁ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3131, 222, 'read_select', 'كلمة «ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ» أصل الكلمة بدون أداة التعريف (ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ) هو:', NULL, NULL, NULL, NULL, 'رسول (أبوستولوس) كلمة يونانية.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5197, 3131, 'يوناني لنهايتها بـ os', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5198, 3131, 'قبطي', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (223, 55, 'تمرين الفرز المعجمي المتقدم', 4, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3132, 223, 'match', 'صنّف الكلمات بدقة حسب أصلها اللغوي:', NULL, NULL, NULL, NULL, 'فرز معجمي دقيق.', NULL, '[{"left":"ϣⲱⲡ","right":"قبطية لوجود حرف الشاي"},{"left":"ⲗⲟⲅⲟⲥ","right":"يونانية لوجود Ⲅ ونهاية os"},{"left":"ϩⲏⲧ","right":"قبطية لوجود حرف الهوري"},{"left":"ⲉⲩⲭⲏ","right":"يونانية لوجود الإبسلون والكي"}]'::jsonb, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3133, 223, 'read_select', 'في كلمة «ⲭⲱⲣⲁ» (بلد/أرض) وهي يونانية تنتهي بـ a: حرف الكي ينطق:', 'ⲭⲱⲣⲁ', 'خورا', 'audio_coptic/1alfa.mp3', NULL, 'يوناني + غير كسر = خاء.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5199, 3133, 'خاء (خورا) لعدم وجود كسر', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5200, 3133, 'كاف', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3134, 223, 'select', 'أي كلمة مما يلي قبطية أصيلة 100%؟', NULL, NULL, NULL, NULL, 'ϥⲁⲓ لوجود الفاي.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5201, 3134, 'ϥⲁⲓ (يحمل)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5202, 3134, 'ⲁⲅⲅⲉⲗⲟⲥ (ملاك)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5203, 3134, 'ⲇⲟⲝⲁ (مجد)', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3135, 223, 'write', 'ركّب كلمة ''يحمل'' بالقبطية (فاي):', 'ϥⲁⲓ', 'فاي', 'audio_coptic/1alfa.mp3', 'ϥⲁⲓ', 'ϥⲁⲓ = يحمل.', '["ϥ","ⲁ","ⲓ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3136, 223, 'read_select', 'هل يمكن لكلمة تحتوي حرف «Ϫ» أن تكون يونانية الأصل؟', NULL, NULL, NULL, NULL, 'الجانجا علامة قبطية حاسمة.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5204, 3136, 'مستحيل، لأن الجانجا حرف ديموطيقي خالص', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5205, 3136, 'نعم يمكن', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3137, 223, 'read_select', 'كلمة «ⲛⲓⲫⲏⲟⲩⲓ» (السماوات) هي كلمة:', NULL, NULL, NULL, NULL, 'السماوات كلمة قبطية أصيلة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5206, 3137, 'قبطية أصيلة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5207, 3137, 'يونانية', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_55', 6, 55, 'صندوق إتقان الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني', 'star', 'أتممت الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (56, 6, 'الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس', 'Syllables-Matrix', 'إتقان القراءة المقطعية الثنائية لكل الحروف مع الحركات السبع استناداً لص 65 و 66 من كتاب إعدادي.', 6)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (224, 56, 'مصفوفة مقاطع حروف الوسط (Ⲕ, Ⲃ, Ⲅ, Ⲇ, Ⲍ, Ⲑ)', 1, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3138, 224, 'text_view', 'مصفوفة المقاطع لحروف الوسط', 'ⲕⲁ ⲕⲉ ⲕⲓ ⲕⲏ ⲕⲟ ⲕⲱ ⲕⲟⲩ', 'مقاطع كابا', 'audio_coptic/1alfa.mp3', '• جدول المقاطع المعتمد من المجمع المقدس:
  - Ⲕ: ⲕⲁ (كا), ⲕⲉ (كِ), ⲕⲓ (كي), ⲕⲏ (كيي), ⲕⲟ (كو), ⲕⲱ (كوو), ⲕⲟⲩ (كو مضمومة)
  - Ⲃ: ⲃⲁ (ڤا), ⲃⲉ (ڤِ), ⲃⲓ (ڤي), ⲃⲏ (ڤيي), ⲃⲟ (ڤو), ⲃⲱ (ڤوو), ⲃⲟⲩ (ڤو مضمومة)
  - Ⲅ: ⲅⲁ (غا), ⲅⲉ (جِ), ⲅⲓ (جي), ⲅⲏ (جيي), ⲅⲟ (غو), ⲅⲱ (غوو), ⲅⲟⲩ (غو مضمومة)', 'تركيب الساكن مع الحركات السبع.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3139, 224, 'read_select', 'المقطع «ⲅⲉ» يُنطق:', 'ⲅⲉ', 'جِ', 'audio_coptic/3ghala.mp3', NULL, 'غمّا + كسر = جيم.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5208, 3139, 'جِ (معطشة لوجود الإي الكاسرة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5209, 3139, 'غِ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5210, 3139, 'نِ', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3140, 224, 'read_select', 'المقطع «ⲃⲁ» يُنطق:', 'ⲃⲁ', 'ڤا', 'audio_coptic/2vo.mp3', NULL, 'فيتا + متحرك = ڤ.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5211, 3140, 'ڤا (لأن الفيتا تلاها متحرك)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5212, 3140, 'با', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3141, 224, 'match', 'طابق المقطع الصوتي بنطقه الدقيق:', NULL, NULL, NULL, NULL, 'مقاييس أصوات الكاف.', NULL, '[{"left":"ⲕⲟⲩ","right":"كو مضمومة طويلاً"},{"left":"ⲕⲱ","right":"كوو مفتوحة مفخمة"},{"left":"ⲕⲉ","right":"كِ خفيفة"}]'::jsonb, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3142, 224, 'write', 'ركّب المقطع الصوتي ''ڤي'':', 'ⲃⲓ', 'ڤي', 'audio_coptic/2vo.mp3', 'ⲃⲓ', 'ⲃ + ⲓ = ڤي.', '["ⲃ","ⲓ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3143, 224, 'read_select', 'المقطع «ⲑⲱ» يُنطق:', NULL, NULL, NULL, NULL, 'ثيتا + أوميجا = ثوو.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5213, 3143, 'ثوو (مفخمة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5214, 3143, 'توو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (225, 56, 'مصفوفة مقاطع حروف الرنين والشفتانية (Ⲗ, Ⲙ, Ⲛ, Ⲝ, Ⲡ, Ⲣ)', 2, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3144, 225, 'text_view', 'مصفوفة حروف الرنين', 'Ⲗ, Ⲙ, Ⲛ, Ⲣ', 'حروف الرنين', 'audio_coptic/1alfa.mp3', '• المقاطع الرنانة:
  - Ⲗ: ⲗⲁ, ⲗⲉ, ⲗⲓ, ⲗⲏ, ⲗⲟ, ⲗⲱ, ⲗⲟⲩ
  - Ⲙ: ⲙⲁ, ⲙⲉ, ⲙⲓ, ⲙⲏ, ⲙⲟ, ⲙⲱ, ⲙⲟⲩ
  - Ⲛ: ⲛⲁ, ⲛⲉ, ⲛⲓ, ⲛⲏ, ⲛⲟ, ⲛⲱ, ⲛⲟⲩ
  - Ⲣ: ⲣⲁ, ⲣⲉ, ⲣⲓ, ⲣⲏ, ⲣⲟ, ⲣⲱ, ⲣⲟⲩ', 'المقاطع الرنانة والشفتانية.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3145, 225, 'read_select', 'المقطع «ⲛⲏ» يُنطق:', 'ⲛⲏ', 'نيي', 'audio_coptic/8ei.mp3', NULL, 'نون + إيتا = نيي.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5215, 3145, 'نيي (بياء مكسورة ممدودة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5216, 3145, 'نِ قصيرة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3146, 225, 'select', 'كلمة «ⲙⲁ» تعني بالقبطية:', 'ⲙⲁ', 'ما', 'audio_coptic/1alfa.mp3', NULL, 'ⲙⲁ = موضع / مكان.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5217, 3146, 'موضع / مكان', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5218, 3146, 'زمان', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3147, 225, 'write', 'ركّب مقطع ''روو'' المفخم:', 'ⲣⲱ', 'روو', 'audio_coptic/1alfa.mp3', 'ⲣⲱ', 'ⲣ + ⲱ = روو.', '["ⲣ","ⲱ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3148, 225, 'match', 'طابق المقطع بنطقه:', NULL, NULL, NULL, NULL, 'مطابقة مقاطع الرنين.', NULL, '[{"left":"ⲗⲟⲩ","right":"لو مضمومة"},{"left":"ⲙⲁ","right":"ما"},{"left":"ⲛⲉ","right":"نِ خفيفة"}]'::jsonb, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3149, 225, 'read_select', 'المقطع «ⲡⲁ» في كلمة «ⲡⲁⲥⲟⲛ» (أخي) ينطق:', NULL, NULL, NULL, NULL, 'Ⲡ + Ⲁ = با.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5219, 3149, 'با خفيفة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5220, 3149, 'بو', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (226, 56, 'مصفوفة مقاطع الحروف الديموطيقية (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ)', 3, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3150, 226, 'text_view', 'مصفوفة الحروف الديموطيقية المصرية', 'Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ', 'مقاطع ديموطيقية', 'audio_coptic/1alfa.mp3', '• مقاطع الحروف المصرية:
  - Ϣ: ϣⲁ, ϣⲉ, ϣⲓ, ϣⲏ, ϣⲟ, ϣⲱ, ϣⲟⲩ
  - Ϥ: ϥⲁ, ϥⲉ, ϥⲓ, ϥⲏ, ϥⲟ, ϥⲱ, ϥⲟⲩ
  - Ϧ: ϧⲁ, ϧⲉ, ϧⲓ, ϧⲏ, ϧⲟ, ϧⲱ, ϧⲟⲩ
  - Ϩ: ϩⲁ, ϩⲉ, ϩⲓ, ϩⲏ, ϩⲟ, ϩⲱ, ϩⲟⲩ
  - Ϫ: ϫⲁ (جا صلبة), ϫⲉ (جِ معطشة), ϫⲓ (جي معطشة), ϫⲏ (جيي معطشة), ϫⲟ (جو صلبة), ϫⲱ (جوو صلبة), ϫⲟⲩ (جو صلبة)', 'مقاطع الحروف الديموطيقية مع تمييز تعطيش الجانجا.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3151, 226, 'read_select', 'المقطع «ϫⲉ» يُنطق:', 'ϫⲉ', 'جِ', 'audio_coptic/1alfa.mp3', NULL, 'جانجا + كسر = معطشة.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5221, 3151, 'جِ (معطشة لوجود الإي الكاسرة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5222, 3151, 'جِ صلبة قاهرية', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3152, 226, 'read_select', 'المقطع «ϫⲁ» يُنطق:', 'ϫⲁ', 'جا', 'audio_coptic/1alfa.mp3', NULL, 'جانجا + فتح = صلبة.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5223, 3152, 'جا صلبة قاهرية لعدم وجود كسر', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5224, 3152, 'جا معطشة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3153, 226, 'write', 'ركّب مقطع ''شا'':', 'ϣⲁ', 'شا', 'audio_coptic/1alfa.mp3', 'ϣⲁ', 'ϣ + ⲁ = شا.', '["ϣ","ⲁ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3154, 226, 'match', 'طابق المقطع الديموطيقي بنطقه:', NULL, NULL, NULL, NULL, 'مقاطع الحروف المصرية.', NULL, '[{"left":"ϧⲟⲩ","right":"خو مضمومة"},{"left":"ϩⲁ","right":"ها"},{"left":"Ϭⲓ","right":"تشي / شي"}]'::jsonb, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3155, 226, 'read_select', 'المقطع «ϥⲱ» ينطق:', NULL, NULL, NULL, NULL, 'فاي + أوميجا = فوو.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5225, 3155, 'فوو (مفخمة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5226, 3155, 'فو خفيفة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (227, 56, 'مصفوفة المقاطع العكسية (المتحرك يسبق الساكن)', 4, 1, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3156, 227, 'text_view', 'مصفوفة المقاطع العكسية المغلقة', 'ⲁⲕ, ⲉⲕ, ⲓⲕ, ⲟⲕ, ⲱⲕ, ⲟⲩⲕ', 'مقاطع عكسية', 'audio_coptic/1alfa.mp3', '• المقاطع العكسية تنتهي بساكن وتلعب دوراً رئيسياً في نهايات الكلمات:
  - ⲁⲕ (آك), ⲉⲕ (إِك), ⲓⲕ (إيك), ⲏⲕ (إييك), ⲟⲕ (أوك), ⲱⲕ (أووك), ⲟⲩⲕ (أووك مضمومة)
  - ⲁⲥ (آس), ⲉⲥ (إِس), ⲓⲥ (إيس), ⲏⲥ (إييس), ⲟⲥ (أوس), ⲱⲥ (أووس), ⲟⲩⲥ (أووس مضمومة)', 'المقاطع المغلقة المنتهية بساكن.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3157, 227, 'read_select', 'المقطع «ⲱⲛ» يُنطق:', 'ⲱⲛ', 'أوون', 'audio_coptic/1alfa.mp3', NULL, 'أوميجا + نون = أوون.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5227, 3157, 'أوون (بواو طويلة مفخمة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5228, 3157, 'أون قصيرة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3158, 227, 'read_select', 'المقطع «ⲟⲥ» في نهاية الكلمات اليونانية يُنطق:', 'ⲟⲥ', 'أوس', 'audio_coptic/1alfa.mp3', NULL, 'أو قصيرة + سيما = أوس.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5229, 3158, 'أوس (بواو قصيرة خطافة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5230, 3158, 'أووس ممدودة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3159, 227, 'write', 'ركّب المقطع العكسي ''إِش'':', 'ⲉϣ', 'إش', 'audio_coptic/1alfa.mp3', 'ⲉϣ', 'ⲉ + ϣ = إِش.', '["ⲉ","ϣ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3160, 227, 'match', 'طابق المقطع العكسي بنطقه:', NULL, NULL, NULL, NULL, 'مقاطع النون العكسية.', NULL, '[{"left":"ⲁⲛ","right":"آن"},{"left":"ⲉⲛ","right":"إِن"},{"left":"ⲟⲛ","right":"أون قصيرة"},{"left":"ⲱⲛ","right":"أوون مفخمة"}]'::jsonb, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3161, 227, 'read_select', 'المقطع «ⲁϥ» في بداية الأفعال الماضية ينطق:', NULL, NULL, NULL, NULL, 'Ⲁ + Ϥ = آف.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5231, 3161, 'آف', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5232, 3161, 'أُف', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (228, 56, 'مختبر القراءة الإيقاعية السريعة للمقاطع', 5, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3162, 228, 'read_select', 'اقرأ السلسلة السريعة: «ⲥⲁ ⲥⲉ ⲥⲓ ⲥⲏ ⲥⲟ ⲥⲱ ⲥⲟⲩ» بالترتيب:', NULL, NULL, NULL, NULL, 'قراءة إيقاعية لسلسلة السيما.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5233, 3162, 'سا، سِ، سي، سيي، سو، سوو، سو مضمومة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5234, 3162, 'ترتيب غير صحيح', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3163, 228, 'read_select', 'ميز بين «ⲃⲁ» و «ⲁⲃ»: أيهما ينطق فيه الحرف (ڤ)؟', NULL, NULL, NULL, NULL, 'ⲃⲁ = ڤا، أما ⲁⲃ = آب.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5235, 3163, 'الأولى (ⲃⲁ) لأن الفيتا متبوعة بمتحرك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5236, 3163, 'الثانية (ⲁⲃ)', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3164, 228, 'write', 'ركّب كلمة ''مخلّص'' من مقطعين (سوتير):', 'ⲥⲱⲧⲏⲣ', 'سوتير', 'audio_coptic/1alfa.mp3', 'ⲥⲱⲧⲏⲣ', 'ⲥⲱ / ⲧⲏⲣ = مخلّص.', '["ⲥⲱ","ⲧⲏⲣ"]'::jsonb, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3165, 228, 'select', 'كلمة «ⲥⲱⲧⲏⲣ» تعني بالقبطية:', 'ⲥⲱⲧⲏⲣ', 'سوتير', 'audio_coptic/1alfa.mp3', NULL, 'ⲥⲱⲧⲏⲣ = مخلص.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5237, 3165, 'مخلّص / فادي', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5238, 3165, 'خالق', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3166, 228, 'read_select', 'كم مقطعاً في كلمة «ⲡⲁ/ⲡⲁ»؟', 'ⲡⲁ/ⲡⲁ', 'بابا', 'audio_coptic/1alfa.mp3', NULL, 'مقطعان متماثلان.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5239, 3166, 'مقطعان: (با) و (با)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5240, 3166, 'مقطع واحد', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3167, 228, 'read_select', 'كلمة «ϫⲟⲓ» (سفينة / مركب) تتكون من مقطع:', NULL, NULL, NULL, NULL, 'ϫⲟⲓ = مركب.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5241, 3167, 'واحد ينطق (جوي صلبة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5242, 3167, 'مقطعين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_56', 6, 56, 'صندوق إتقان الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس', 'star', 'أتممت الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (57, 6, 'الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة', 'Syllabification-Master', 'امتلاك مهارة تشريح أي كلمة قبطية طويلة إلى مقاطع بديهية بالشرطة المائلة (/).', 7)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (229, 57, 'القواعد الذهبية الأربع لتقطيع الكلمات', 1, 1, 10)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3168, 229, 'text_view', 'القواعد الأربع للتقطيع المقطعي (Syllabification)', 'V/CV ، VC/CV', 'تقطيع الكلمات', 'audio_coptic/1alfa.mp3', '• القواعد الذهبية لتقطيع الكلمات بالشرطة المائلة (/):
  1. قاعدة النواة: لا يوجد مقطع بدون حركة (متحرك) أو جنكم.
  2. قاعدة الساكن الفردي بين حركتين (V / CV): يتبع الحركة التالية. مثال: ⲡⲁ/ⲥⲟⲛ (با - سون = أخي)
  3. قاعدة الساكنين بين حركتين (VC / CV): يُقسمان بين المقطعين. مثال: ⲙⲁⲣ/ⲕⲟⲥ (مار - كوس)
  4. قاعدة الجنكم: يقف كمقطع مستقل. مثال: ⲡ̀/ϭⲟ/ⲓⲥ (إب - شو - يس)', 'القواعد الأربع الأساسية للتقطيع.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3169, 229, 'read_select', 'التقطيع الصوتي الصحيح لكلمة «ⲡⲁⲥⲟⲛ» (أخي) هو:', 'ⲡⲁ/ⲥⲟⲛ', 'باصون', 'audio_coptic/1alfa.mp3', NULL, 'V/CV = ⲡⲁ/ⲥⲟⲛ.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5243, 3169, 'ⲡⲁ/ⲥⲟⲛ (ساكن بين حركتين يتبع اللاحقة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5244, 3169, 'ⲡⲁⲥ/ⲟⲛ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3170, 229, 'read_select', 'التقطيع الصوتي لكلمة «ⲙⲁⲣⲕⲟⲥ» (مرقس) هو:', 'ⲙⲁⲣ/ⲕⲟⲥ', 'ماركوس', 'audio_coptic/1alfa.mp3', NULL, 'VC/CV = ⲙⲁⲣ/ⲕⲟⲥ.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5245, 3170, 'ⲙⲁⲣ/ⲕⲟⲥ (ساكنان بين حركتين يقسمان)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5246, 3170, 'ⲙⲁ/ⲣⲕⲟⲥ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3171, 229, 'select', 'كلمة «ⲡⲁⲥⲟⲛ» تعني بالقبطية:', 'ⲡⲁⲥⲟⲛ', 'باصون', 'audio_coptic/1alfa.mp3', NULL, 'ⲡⲁⲥⲟⲛ = أخي.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5247, 3171, 'أخي', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5248, 3171, 'أبي', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5249, 3171, 'أختي', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3172, 229, 'write', 'قطّع وركّب كلمة ''أخي'' بالشرطة المائلة:', 'ⲡⲁ/ⲥⲟⲛ', 'باصون', 'audio_coptic/1alfa.mp3', 'ⲡⲁ/ⲥⲟⲛ', 'ⲡⲁ/ⲥⲟⲛ = أخي.', '["ⲡⲁ","/","ⲥⲟⲛ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3173, 229, 'read_select', 'كلمة «ⲧⲁⲥⲱⲛⲓ» (أختي) تقطع إلى:', NULL, NULL, NULL, NULL, 'تا / سو / ني = 3 مقاطع.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5250, 3173, '3 مقاطع: ⲧⲁ/ⲥⲱ/ⲛⲓ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5251, 3173, 'مقطعين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (230, 57, 'السوابق وأدوات التعريف المدمجة', 2, 1, 10)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3174, 230, 'text_view', 'أدوات التعريف وسوابق الأسماء', 'ⲡⲓ-, ϯ-, ⲛⲓ-', 'أدوات التعريف', 'audio_coptic/1alfa.mp3', '• ترتبط أدوات التعريف بالاسم في وحدة واحدة:
  - ⲡⲓ- (بي للمذكر): مثل ⲡⲓ/ⲕⲁ/ϩ (بي كاه = الأرض)
  - ϯ- (تي للمؤنث): مثل ϯ/ⲣⲟⲙ/ⲡⲓ (تي رومبي = السنة)
  - ⲛⲓ- (ني للجمع): مثل ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ (ني في أو ي = السماوات)', 'فك أدوات التعريف عند التقطيع.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3175, 230, 'read_select', 'كلمة «ϯⲣⲟⲙⲡⲓ» (السنة) تقطع إلى:', 'ϯ/ⲣⲟⲙ/ⲡⲓ', 'تي رومبي', 'audio_coptic/1alfa.mp3', NULL, 'ϯ / ⲣⲟⲙ / ⲡⲓ.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5252, 3175, 'ϯ/ⲣⲟⲙ/ⲡⲓ (3 مقاطع)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5253, 3175, 'ϯⲣ/ⲟⲙⲡⲓ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3176, 230, 'select', 'ما معنى كلمة «ϯⲣⲟⲙⲡⲓ» في الصلوات؟', 'ϯⲣⲟⲙⲡⲓ', 'تي رومبي', 'audio_coptic/1alfa.mp3', NULL, 'ϯⲣⲟⲙⲡⲓ = السنة.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5254, 3176, 'السنة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5255, 3176, 'الشهر', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3177, 230, 'write', 'ركّب مقاطع كلمة ''السنة'':', 'ϯ/ⲣⲟⲙ/ⲡⲓ', 'تي رومبي', 'audio_coptic/1alfa.mp3', 'ϯ/ⲣⲟⲙ/ⲡⲓ', 'ϯ/ⲣⲟⲙ/ⲡⲓ = السنة.', '["ϯ","/","ⲣⲟⲙ","/","ⲡⲓ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3178, 230, 'read_select', 'كلمة «ⲡⲓⲕⲁϩ» تعني بالقبطية:', NULL, NULL, NULL, NULL, 'ⲡⲓⲕⲁϩ = الأرض.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5256, 3178, 'الأرض', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5257, 3178, 'السماء', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3179, 230, 'read_select', 'كلمة «ⲛⲓⲫⲏⲟⲩⲓ» (السماوات) تقطع إلى:', NULL, NULL, NULL, NULL, 'ني / في / أو / ي = 4 مقاطع.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5258, 3179, '4 مقاطع: ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5259, 3179, 'مقطعين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (231, 57, 'الكلمات المركبة ومقاطع الإضافة والتجريد', 3, 1, 10)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3180, 231, 'text_view', 'مقاطع التجريد والفاعل والصفة', 'ⲙⲉⲧ-, ⲣⲉϥ-, ⲙⲁ-', 'سوابق التجريد', 'audio_coptic/1alfa.mp3', '• سوابق الكلمات المركبة الطويلة:
  - ⲙⲉⲧ- (سابقة التجريد): مثل ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ (صلاح / كرم)
  - ⲣⲉϥ- (سابقة الفاعل): مثل ⲣⲉϥ/ϩⲓ/ⲱ/ⲓϣ (كارز / مبشر)
  - ⲙⲁ- (سابقة المكان): مثل ⲙⲁ/ⲛ̀/ϣⲱ/ⲡⲓ (مسكن)', 'تركيب الكلمات بواسطة السوابق.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3181, 231, 'read_select', 'السابقة «ⲙⲉⲧ-» في أول الكلمة تفيد:', NULL, NULL, NULL, NULL, 'ⲙⲉⲧ- للمصدر المجرد.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5260, 3181, 'تحويل الصفة إلى اسم معنى ومصدر (تجريد)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5261, 3181, 'الجمع', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3182, 231, 'read_select', 'السابقة «ⲣⲉϥ-» تفيد دلالة:', NULL, NULL, NULL, NULL, 'ⲣⲉϥ- لاسم الفاعل.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5262, 3182, 'اسم الفاعل وصاحب المهنة أو الصفة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5263, 3182, 'المكان', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3183, 231, 'select', 'معنى كلمة «ⲣⲉϥϩⲓⲱⲓϣ» في لقب مارمرقس:', 'ⲣⲉϥϩⲓⲱⲓϣ', 'ريف هي أو يش', 'audio_coptic/1alfa.mp3', NULL, 'ⲣⲉϥϩⲓⲱⲓϣ = الكارز.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5264, 3183, 'الكارز / المنادي بالبشارة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5265, 3183, 'الشهيد', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3184, 231, 'write', 'ركّب مقاطع ''صلاحك'' بالشرطة المائلة:', 'ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ', 'ميت خرستوس', 'audio_coptic/1alfa.mp3', 'ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ', 'ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ = صلاح.', '["ⲙⲉⲧ","/","ⲭ","/","ⲣⲏⲥ","/","ⲧⲟⲥ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3185, 231, 'read_select', 'كلمة «ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ» (ملكوتك) تتكون من:', NULL, NULL, NULL, NULL, 'ⲧⲉⲕ + ⲙⲉⲧ + ⲟⲩⲣⲟ = ملكوتك.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5266, 3185, 'ضمير ملكية + سابقة تجريد + كلمة ملك (أورو)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5267, 3185, 'كلمة بسيطة', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (232, 57, 'تحدي فك الكلمات الطويلة بالغة الصعوبة', 4, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3186, 232, 'read_select', 'قطّع الكلمة الكبرى «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» (الإنجيلي):', 'ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ', 'إيڤانغيليستيس', 'audio_coptic/2vo.mp3', NULL, '5 مقاطع دقيقة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5268, 3186, 'ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ (5 مقاطع)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5269, 3186, 'ⲉ/ⲩⲁⲅⲅⲉ/ⲗⲓⲥⲧⲏⲥ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3187, 232, 'read_select', 'التقطيع الصائب لكلمة «ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» (مبارك) هو:', 'ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ', 'إفسماروؤوت', 'audio_coptic/1alfa.mp3', NULL, 'الجنكم صنع المقطع الأول.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5270, 3187, 'ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ (5 مقاطع)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5271, 3187, 'ϥⲥ/ⲙⲁ/ⲣⲱⲟⲩⲧ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3188, 232, 'select', 'كلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» تعني:', 'ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ', 'إيڤانغيليستيس', 'audio_coptic/2vo.mp3', NULL, 'الإنجيلي.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5272, 3188, 'الإنجيلي (كاتب البشارة)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5273, 3188, 'الشهيد', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3189, 232, 'write', 'ركّب كلمة ''مبارك'' مقطعة بالشرطة المائلة:', 'ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ', 'إفسماروؤوت', 'audio_coptic/1alfa.mp3', 'ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ', 'ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ = مبارك.', '["ϥ̀","/","ⲥ","/","ⲙⲁ","/","ⲣⲱ","/","ⲟⲩⲧ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3190, 232, 'read_select', 'كم مقطعاً في كلمة «ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ» (الرسول)؟', NULL, NULL, NULL, NULL, '5 مقاطع دقيقة.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5274, 3190, '5 مقاطع: ⲡⲓ/ⲁ̀/ⲡⲟⲥ/ⲧⲟ/ⲗⲟⲥ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5275, 3190, '3 مقاطع', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3191, 232, 'read_select', 'كلمة «ⲁϥϭⲓⲱⲙⲥ» (اعتمد) تقطع إلى:', NULL, NULL, NULL, NULL, 'ⲁϥ / ϭⲓ / ⲱⲙⲥ = 3 مقاطع.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5276, 3191, '3 مقاطع: ⲁϥ/ϭⲓ/ⲱⲙⲥ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5277, 3191, 'مقطعين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_57', 6, 57, 'صندوق إتقان الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة', 'star', 'أتممت الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------
-- Unit: الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل
-- ---------------------------------------------------------
INSERT INTO public.units (id, level_id, title, badge, description, order_index)
VALUES (58, 6, 'الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل', 'Liturgy-Master', 'تتويج المستوى الثاني بقراءة نصوص صلوات وألحان كنسية كاملة واجتياز امتحان التخرج الشامل.', 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (233, 58, 'مختبر صلوات المردات اليومية والطلبات', 1, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3192, 233, 'text_view', 'طلبات ومردات الكنيسة اليومية', 'Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ', 'إفنوتي ناي نان', 'audio_coptic/1alfa.mp3', '• نصوص كنسية معتمدة من كتاب إعدادي (ص 57):
  1. Ⲫ̀/ⲛⲟⲩ/ϯ ⲛⲁ/ⲓ ⲛⲁⲛ (إفنوتي ناي نان = يا الله ارحمنا)
  2. Ⲫ̀/ⲛⲟⲩ/ϯ ⲥⲱ/ⲧⲉⲙ ⲉ̀/ⲣⲟⲛ (إفنوتي سوتيم إيرون = يا الله اسمعنا)
  3. Ⲫ̀/ⲛⲟⲩ/ϯ ⲥⲟⲙⲥ ⲉ̀/ⲣⲟⲛ (إفنوتي سومس إيرون = يا الله انظر إلينا)
  4. Ⲫ̀/ⲛⲟⲩ/ϯ ϫⲟⲩ/ϣⲧ ⲉ̀/ⲣⲟⲛ (إفنوتي جوشت إيرون = يا الله اطلع علينا)
  5. Ⲫ̀/ⲛⲟⲩ/ϯ ϣⲉⲛ/ϩⲏⲧ ϧⲁ/ⲣⲟⲛ (إفنوتي شينهيت خارون = يا الله تراءف علينا)
  6. Ⲁ̀/ⲛⲟⲛ ϧⲁ ⲡⲉⲕ/ⲗⲁ/ⲟⲥ (آنون خا بيكلاؤس = نحن شعبك)', 'قراءة صلوات المردات اليومية.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3193, 233, 'read_select', 'ما معنى عبارة «Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ»؟', 'Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ', 'إفنوتي ناي نان', 'audio_coptic/1alfa.mp3', NULL, 'ناي نان = ارحمنا.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5278, 3193, 'يا الله ارحمنا', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5279, 3193, 'يا الله باركنا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5280, 3193, 'يا الله اسمعنا', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3194, 233, 'read_select', 'كيف تنطق عبارة «Ⲫ̀ⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ»؟', 'Ⲫ̀ⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ', 'إفنوتي سوتيم إيرون', 'audio_coptic/1alfa.mp3', NULL, 'سوتيم = اسمع.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5281, 3194, 'إفنوتي سوتيم إيرون (يا الله اسمعنا)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5282, 3194, 'إفنوتي سومس إيرون', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3195, 233, 'select', 'معنى عبارة «Ⲁ̀ⲛⲟⲛ ϧⲁ ⲡⲉⲕⲗⲁⲟⲥ» في المردات:', 'Ⲁ̀ⲛⲟⲛ ϧⲁ ⲡⲉⲕⲗⲁⲟⲥ', 'آنون خا بيكلاؤس', 'audio_coptic/1alfa.mp3', NULL, 'آنون خا بيكلاؤس = نحن شعبك.', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5283, 3195, 'نحن شعبك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5284, 3195, 'أنتم خدام الله', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3196, 233, 'write', 'ركّب طلبة ''يا الله ارحمنا'':', 'Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ', 'إفنوتي ناي نان', 'audio_coptic/1alfa.mp3', 'Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ', 'Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ = يا الله ارحمنا.', '["Ⲫ̀ⲛⲟⲩϯ","ⲛⲁⲓ","ⲛⲁⲛ"]'::jsonb, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3197, 233, 'read_select', 'كلمة «ϫⲟⲩϣⲧ» في «Ⲫ̀ⲛⲟⲩϯ ϫⲟⲩϣⲧ ⲉ̀ⲣⲟⲛ» تعني:', NULL, NULL, NULL, NULL, 'جوشت = انظر / اطلع.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5285, 3197, 'اطلع علينا / انظر إلينا بعين الرحمة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5286, 3197, 'اسمعنا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (234, 58, 'مختبر ربع إنجيل عيد النيروز وإكليل السنة', 2, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3198, 234, 'text_view', 'ربع مرد إنجيل النيروز بالتقطيع الصوتي', 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ', 'إسمو إيبيكولوم', 'audio_coptic/1alfa.mp3', '• نص ربع إنجيل عيد النيروز (كتاب إعدادي ص 1 وص 14):
  Ⲁⲗ/ⲗⲏ/ⲗⲟⲩ/ⲓⲁ (4) : ⲥ̀/ⲙⲟⲩ ⲉ̀/ⲡⲓ/ⲭ/ⲗⲟⲙ ⲛ̀/ⲧⲉ ϯ/ⲣⲟⲙ/ⲡⲓ : ϩⲓ/ⲧⲉⲛ ⲧⲉⲕ/ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ Ⲡ̀/ϭⲟ/ⲓⲥ : Ⲭⲉ ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ ⲛ̀/ϫⲉ Ⲫ̀/ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀/ϣⲏ/ⲣⲓ ⲛⲉⲙ Ⲡⲓ/ⲡ̀/ⲛⲉⲩ/ⲙⲁ ⲉⲑ/ⲟⲩ/ⲁⲃ.
• الترجمة: هلليلويا (4): بارك إكليل السنة بصلاحك يا رب، لأنه مبارك الآب والابن والروح القدس.', 'قراءة ربع مرد إنجيل النيروز.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3199, 234, 'read_select', 'في كلمة «ⲉ̀ⲡⲓⲭⲗⲟⲙ» (الإكليل)، حرف الكي يُنطق:', 'ⲉ̀ⲡⲓⲭⲗⲟⲙ', 'إيبيكولوم', 'audio_coptic/1alfa.mp3', NULL, 'كلمة قبطية = كاف.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5287, 3199, 'كاف لأن الكلمة قبطية أصيلة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5288, 3199, 'شين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5289, 3199, 'خاء', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3200, 234, 'select', 'معنى جملة «ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ» هو:', 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ', 'إسمو إيبيكولوم إنتي تيرومبي', 'audio_coptic/1alfa.mp3', NULL, 'بارك إكليل السنة.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5290, 3200, 'بارك إكليل السنة', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5291, 3200, 'بارك شعبك', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3201, 234, 'write', 'ركّب عبارة ''بارك الإكليل'':', 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ', 'إسمو إيبيكولوم', 'audio_coptic/1alfa.mp3', 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ', 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ = بارك الإكليل.', '["ⲥ̀ⲙⲟⲩ","ⲉ̀ⲡⲓⲭⲗⲟⲙ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3202, 234, 'read_select', 'كيف تنطق عبارة «Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ»؟', 'Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ', 'إفيوت نِم إبشيري', 'audio_coptic/1alfa.mp3', NULL, 'إفيوت نِم إبشيري.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5292, 3202, 'إفيوت نِم إبشيري (الآب والابن)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5293, 3202, 'إفيوت نِم إبشويس', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3203, 234, 'read_select', 'الكلمة «ⲧⲉⲕⲙⲉⲧⲭⲣⲏⲥⲧⲟⲥ» تعني:', NULL, NULL, NULL, NULL, 'ⲧⲉⲕⲙⲉⲧⲭⲣⲏⲥⲧⲟⲥ = صلاحك.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5294, 3203, 'صلاحك / جودك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5295, 3203, 'مجدك', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (235, 58, 'مختبر ذكصولوجية القديس مرقس الرسول', 3, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3204, 235, 'text_view', 'لحن الهيتينيات لمارمرقس الرسول بالتقطيع', 'Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ Ⲙⲁⲣⲕⲟⲥ', 'هيتين ني إيڤكي', 'audio_coptic/1alfa.mp3', '• نص الذكصولوجية (كتاب إعدادي ص 64):
  Ϩⲓ/ⲧⲉⲛ ⲛⲓ/ⲉⲩ/ⲭⲏ : ⲛ̀/ⲧⲉ ⲡⲓ/ⲑⲉ/ⲱ/ⲣⲓ/ⲙⲟⲥ : ⲛ̀/ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ : Ⲙⲁⲣ/ⲕⲟⲥ ⲡⲓ/ⲁ̀/ⲡⲟⲥ/ⲧⲟ/ⲗⲟⲥ : Ⲡ̀/ϭⲟ/ⲓⲥ ⲁ̀/ⲣⲓ/ϩ̀/ⲙⲟⲧ ⲛⲁⲛ : ⲙ̀/ⲡⲓ/ⲭⲱ ⲉ̀/ⲃⲟⲗ : ⲛ̀/ⲧⲉ ⲛⲉⲛ/ⲛⲟ/ⲃⲓ.
• الترجمة: بصلوات ناظر الإله الإنجيلي مرقس الرسول، يا رب أنعم لنا بمغفرة خطايانا.', 'قراءة ذكصولوجية مارمرقس الرسول.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3205, 235, 'read_select', 'كلمة «ⲛⲓⲉⲩⲭⲏ» تعني بالقبطية:', 'ⲛⲓⲉⲩⲭⲏ', 'ني إيڤكي', 'audio_coptic/2vo.mp3', NULL, 'الصلوات.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5296, 3205, 'الصلوات / الطلبات', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5297, 3205, 'الأصوام', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3206, 235, 'select', 'لقب مارمرقس «ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ» يعني:', 'ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ', 'بيثيؤوريموس', 'audio_coptic/1alfa.mp3', NULL, 'ناظر الإله.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5298, 3206, 'ناظر الإله', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5299, 3206, 'الشهيد', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3207, 235, 'write', 'ركّب اسم ''مرقس الرسول'' بالقبطية:', 'Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ', 'ماركوس بي أبوستولوس', 'audio_coptic/1alfa.mp3', 'Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ', 'مرقس الرسول.', '["Ⲙⲁⲣⲕⲟⲥ","ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3208, 235, 'read_select', 'عبارة «ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ» تعني:', NULL, NULL, NULL, NULL, 'مغفرة خطايانا.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5300, 3208, 'بمغفرة خطايانا', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5301, 3208, 'ببركة بيوتنا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3209, 235, 'read_select', 'في «ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ»، حرف الهوري عليه جنكم ينطق:', NULL, NULL, NULL, NULL, 'ϩ̀ = إهـ.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5302, 3209, 'إهموت (بهمزة مكسورة قبل الهاء)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5303, 3209, 'هاموت', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (236, 58, 'مختبر صلاة ''أبانا الذي في السماوات''', 4, 1, 12)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3210, 236, 'text_view', 'الصلاة الربانية بالتقطيع الصوتي الكامل', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ', 'بنيوت إتخين نيفيؤوي', 'audio_coptic/1alfa.mp3', '• نص الصلاة الربانية:
  Ⲡⲉⲛ/ⲓⲱⲧ ⲉⲧ/ϧⲉⲛ ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ : ⲙⲁ/ⲣⲉϥ/ⲧⲟⲩ/ⲃⲟ ⲛ̀/ϫⲉ ⲡⲉⲕ/ⲣⲁⲛ : ⲙⲁ/ⲣⲉⲥ/ⲓ̀ ⲛ̀/ϫⲉ ⲧⲉⲕ/ⲙⲉⲧ/ⲟⲩ/ⲣⲟ : ⲡⲉⲧ/ⲉϩ/ⲛⲁⲕ ⲙⲁ/ⲣⲉϥ/ϣⲱ/ⲡⲓ : ⲙ̀/ⲫ̀/ⲣⲏϯ ϧⲉⲛ ⲧ̀/ⲫⲉ ⲛⲉⲙ ϩⲓ/ϫⲉⲛ ⲡⲓ/ⲕⲁ/ϩ.
• الترجمة: أبانا الذي في السماوات، ليتقدس اسمك، ليأتِ ملكوتك، لتكن مشيئتك، كما في السماء كذلك على الأرض.', 'قراءة الصلاة الربانية مقطعة.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3211, 236, 'read_select', 'كلمة «ⲡⲉⲕⲣⲁⲛ» تعني:', 'ⲡⲉⲕⲣⲁⲛ', 'بيكران', 'audio_coptic/1alfa.mp3', NULL, 'ⲡⲉⲕ (لك) + ⲣⲁⲛ (اسم) = اسمك.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5304, 3211, 'اسمك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5305, 3211, 'بيتك', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5306, 3211, 'روحك', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3212, 236, 'select', 'عبارة «ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ» تعني:', 'ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ', 'تيكميت أورو', 'audio_coptic/1alfa.mp3', NULL, 'ملكوتك.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5307, 3212, 'ملكوتك', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5308, 3212, 'مجدك', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3213, 236, 'write', 'ركّب عبارة ''أبانا الذي في السماوات'':', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ', 'بنيوت إتخين نيفيؤوي', 'audio_coptic/1alfa.mp3', 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ', 'أبانا الذي في السماوات.', '["Ⲡⲉⲛⲓⲱⲧ","ⲉⲧϧⲉⲛ","ⲛⲓⲫⲏⲟⲩⲓ"]'::jsonb, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3214, 236, 'read_select', 'كيف تنطق عبارة «ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩ»؟', NULL, NULL, NULL, NULL, 'خين إتفيه نِم هيجين بيكاه.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5309, 3214, 'خين إتفيه نِم هيجين بيكاه (في السماء وعلى الأرض)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5310, 3214, 'خين تافيه نوم هيجون', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3215, 236, 'read_select', 'في «ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ»، كلمة «ⲧⲟⲩⲃⲟ» تعني:', NULL, NULL, NULL, NULL, 'طهارة وقداسة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5311, 3215, 'يتقدس / يطهر', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5312, 3215, 'يرتفع', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)
VALUES (237, 58, 'الامتحان النهائي الكبير لشهادة القراءة القبطية', 5, 1, 50)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3216, 237, 'read_select', 'سؤال 1: في كلمة «ⲭⲉⲣⲉ» (السلام لكِ)، يُنطق حرف الكي:', NULL, NULL, NULL, NULL, 'يوناني + كسر = شين.', NULL, NULL, 1, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5313, 3216, 'شين (شيريه)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5314, 3216, 'خاء', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5315, 3216, 'كاف', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3217, 237, 'read_select', 'سؤال 2: في كلمة «ⲭⲏⲙⲓ» (مصر)، يُنطق حرف الكي:', NULL, NULL, NULL, NULL, 'قبطي أصيل = كاف دائماً.', NULL, NULL, 2, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5316, 3217, 'كاف (كيمي)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5317, 3217, 'شين', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5318, 3217, 'خاء', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3218, 237, 'read_select', 'سؤال 3: في كلمة «ⲁⲅⲅⲉⲗⲟⲥ»، الغمّا الأولى تنطق:', NULL, NULL, NULL, NULL, 'قبل حرف حلقي = نون.', NULL, NULL, 3, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5319, 3218, 'نون (أنغيلوس)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5320, 3218, 'جيم', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3219, 237, 'read_select', 'سؤال 4: في اسم «Ⲇⲁⲩⲓⲇ»، الدلتا والفيتا ينطقان:', NULL, NULL, NULL, NULL, 'اسم علم (د) وفيتا قبل متحرك (ڤ).', NULL, NULL, 4, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5321, 3219, 'د و ڤ (داڤيد)', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5322, 3219, 'ذ و ب', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3220, 237, 'read_select', 'سؤال 5: في كلمة «ⲥ̀ⲙⲟⲩ»، الجنكم فوق السيما يلفظ:', NULL, NULL, NULL, NULL, 'جنكم فوق ساكن = همزة مكسورة.', NULL, NULL, 5, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5323, 3220, 'إِسـ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5324, 3220, 'سا', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)
VALUES (3221, 237, 'read_select', 'سؤال 6: التقطيع الصحيح لكلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» هو:', NULL, NULL, NULL, NULL, '5 مقاطع دقيقة.', NULL, NULL, 6, 1)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5325, 3221, 'ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)
VALUES (5326, 3221, 'ⲉ/ⲩⲁⲅⲅⲉ/ⲗⲓⲥⲧⲏⲥ', FALSE, 2)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;

INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_unit_58', 6, 58, 'صندوق إتقان الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل', 'star', 'أتممت الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل')
ON CONFLICT (id) DO NOTHING;

-- Final Level 2 Grand Graduation Chest
INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)
VALUES ('chest_level_2_final', 6, 58, '🏆 صندوق التخرج والاحتفال الختامي للمستوى الثاني', 'تهانينا الحارة! لقد أتقنت جميع قواعد القراءة والمقاطع الصوتية والنصوص الكنسية بنجاح باهر!', 'level_end', 60, 3, TRUE, 'قارئ قبطي متقن (Master Coptic Reader)', 'trophy', 'أتممت المستوى الثاني لقواعد القراءة والنطق السليم كاملاً')
ON CONFLICT (id) DO NOTHING;
