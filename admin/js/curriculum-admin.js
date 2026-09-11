window.playChallengeAudio = function(url, text, btn){
  if(window.CurriculumAdminSystem && typeof window.CurriculumAdminSystem.playAudioSnippet === 'function'){
    window.CurriculumAdminSystem.playAudioSnippet(url, text, btn);
  } else {
    try { const a = new Audio(url); a.play(); } catch(e){}
  }
};
const CurriculumAdminSystem = (function(){
  const DEFAULT_SEEDED_CURRICULUM = {"levels":[{"id":5,"title":"المستوى الأول: الأبجدية القبطية الكاملة","description":"تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة","order_index":1}],"level":{"id":5,"title":"المستوى الأول: الأبجدية القبطية الكاملة","description":"تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة","order_index":1},"units":[{"id":34,"level_id":5,"title":"الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)","badge":"Ⲁ-Ⲉ","description":"تعلّم كتابة ونطق أول 5 حروف في الأبجدية القبطية","order_index":1,"lessons":[{"id":93,"unit_id":34,"title":"حرف ألفا (Ⲁ ⲁ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":436,"lesson_id":93,"type":"text_view","question":"نبذة عن حرف ألفا (Ⲁ ⲁ)","coptic_display":"Ⲁ ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• اسم الحرف: ألفا (Ⲁ ⲁ)\n• نطق الحرف بالعربي: ألف مفتوحة (أَ)\n• تصنيف الحرف: نعم، حرف متحرك (متحرك للفتح)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • الحرف الأول في الأبجدية القبطية. يُنطق دائماً ألفاً مفتوحة مشبعة مثل (أَ) في العربية أو (A) في كلمة (Father).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲁⲗⲟⲩ\n  - القبطي المعرب (نطقها): «أَلو»\n  - المعنى بالعربية: ولد / طفل\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":437,"lesson_id":93,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲁ واستمع لنطقه","coptic_display":"Ⲁ","audio_text":"ألفا كابيتال","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":438,"lesson_id":93,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲁ واستمع لنطقه","coptic_display":"ⲁ","audio_text":"ألفا سمول","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":439,"lesson_id":93,"type":"read_select","question":"ما هو نطق الحرف Ⲁ بالعربية؟","coptic_display":"Ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4010,"challenge_id":439,"text":"غ أو ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4016,"challenge_id":439,"text":"د أو ذ","is_correct":false,"image_url":null,"audio_url":null},{"id":4017,"challenge_id":439,"text":"ف أو ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4018,"challenge_id":439,"text":"ألف مفتوحة (أ)","is_correct":true,"image_url":null,"audio_url":null}]},{"id":440,"lesson_id":93,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲗⲟⲩ؟ (المعرب: «أَلو»)","coptic_display":"ⲁⲗⲟⲩ","audio_text":"أَلو","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4002,"challenge_id":440,"text":"ولد / طفل","is_correct":true,"image_url":null,"audio_url":null},{"id":4003,"challenge_id":440,"text":"شمس","is_correct":false,"image_url":null,"audio_url":null},{"id":4004,"challenge_id":440,"text":"بنت","is_correct":false,"image_url":null,"audio_url":null},{"id":4005,"challenge_id":440,"text":"مدرسة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":441,"lesson_id":93,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ولد / طفل (المعرب: «أَلو»)","coptic_display":"ⲁⲗⲟⲩ","audio_text":"أَلو","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲁⲗⲟⲩ","tiles":["ⲁ","ⲗ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":94,"unit_id":34,"title":"حرف ڤيتا (بيتا) (Ⲃ ⲃ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":442,"lesson_id":94,"type":"text_view","question":"نبذة عن حرف ڤيتا (بيتا) (Ⲃ ⲃ)","coptic_display":"Ⲃ ⲃ","audio_text":"ڤيتا او بيتا","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":443,"lesson_id":94,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲃ واستمع لنطقه","coptic_display":"Ⲃ","audio_text":"ڤيتا كابيتال","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":444,"lesson_id":94,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲃ واستمع لنطقه","coptic_display":"ⲃ","audio_text":"ڤيتا سمول","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":445,"lesson_id":94,"type":"read_select","question":"ما هو نطق الحرف Ⲃ بالعربية؟","coptic_display":"Ⲃ","audio_text":"ڤيتا","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4022,"challenge_id":445,"text":"ف أو ب","is_correct":true,"image_url":null,"audio_url":null},{"id":4023,"challenge_id":445,"text":"إي","is_correct":false,"image_url":null,"audio_url":null},{"id":4024,"challenge_id":445,"text":"د أو ذ","is_correct":false,"image_url":null,"audio_url":null},{"id":4025,"challenge_id":445,"text":"أ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":446,"lesson_id":94,"type":"select","question":"ما معنى الكلمة القبطية: ⲃⲉⲣⲧ؟ (المعرب: «ڤيرت»)","coptic_display":"ⲃⲉⲣⲧ","audio_text":"ڤيرت","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4038,"challenge_id":446,"text":"وردة","is_correct":true,"image_url":null,"audio_url":null},{"id":4039,"challenge_id":446,"text":"ماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4040,"challenge_id":446,"text":"شجرة","is_correct":false,"image_url":null,"audio_url":null},{"id":4041,"challenge_id":446,"text":"نور","is_correct":false,"image_url":null,"audio_url":null}]},{"id":447,"lesson_id":94,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: وردة (المعرب: «ڤيرت»)","coptic_display":"ⲃⲉⲣⲧ","audio_text":"ڤيرت","audio_url":"audio_coptic/2veta.mp3","correct_word":"ⲃⲉⲣⲧ","tiles":["ⲃ","ⲉ","ⲣ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":95,"unit_id":34,"title":"حرف غاما (Ⲅ ⲅ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":448,"lesson_id":95,"type":"text_view","question":"نبذة عن حرف غاما (Ⲅ ⲅ)","coptic_display":"Ⲅ ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":449,"lesson_id":95,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲅ واستمع لنطقه","coptic_display":"Ⲅ","audio_text":"غاما كابيتال","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":450,"lesson_id":95,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲅ واستمع لنطقه","coptic_display":"ⲅ","audio_text":"غاما سمول","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":451,"lesson_id":95,"type":"read_select","question":"ما هو نطق الحرف Ⲅ بالعربية؟","coptic_display":"Ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":3998,"challenge_id":451,"text":"ف أو ب","is_correct":false,"image_url":null,"audio_url":null},{"id":3999,"challenge_id":451,"text":"غ أو ج أو ن","is_correct":true,"image_url":null,"audio_url":null},{"id":4000,"challenge_id":451,"text":"٦","is_correct":false,"image_url":null,"audio_url":null},{"id":4001,"challenge_id":451,"text":"ز","is_correct":false,"image_url":null,"audio_url":null}]},{"id":452,"lesson_id":95,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲅⲅⲉⲗⲟⲥ؟ (المعرب: «أنجيلوس»)","coptic_display":"ⲁⲅⲅⲉⲗⲟⲥ","audio_text":"أنجيلوس","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":3990,"challenge_id":452,"text":"قديس","is_correct":false,"image_url":null,"audio_url":null},{"id":3991,"challenge_id":452,"text":"ملاك","is_correct":true,"image_url":null,"audio_url":null},{"id":3992,"challenge_id":452,"text":"إنسان","is_correct":false,"image_url":null,"audio_url":null},{"id":3993,"challenge_id":452,"text":"نبي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":453,"lesson_id":95,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ملاك (المعرب: «أنجيلوس»)","coptic_display":"ⲁⲅⲅⲉⲗⲟⲥ","audio_text":"أنجيلوس","audio_url":"audio_coptic/3ghamma.mp3","correct_word":"ⲁⲅⲅⲉⲗⲟⲥ","tiles":["ⲁ","ⲅ","ⲅ","ⲉ","ⲗ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":96,"unit_id":34,"title":"حرف دلدا (Ⲇ ⲇ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":454,"lesson_id":96,"type":"text_view","question":"نبذة عن حرف دلدا (Ⲇ ⲇ)","coptic_display":"Ⲇ ⲇ","audio_text":"دلدا","audio_url":"audio_coptic/4delta.mp3","correct_word":"• اسم الحرف: دلدا (دلتا) (Ⲇ ⲇ)\n• نطق الحرف بالعربي: د أو ذ\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له أكثر من نطق (له نطقان (د / ذ))\n• قواعد وحالات النطق:\n  1. يُنطق (د): في أسماء الأعلام والأشخاص والبلاد، وفي الكلمات القبطية الأصل.\n  2. يُنطق (ذ): في باقي الكلمات ذات الأصل اليوناني.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲇⲱⲣⲟⲛ\n  - القبطي المعرب (نطقها): «ذورون»\n  - المعنى بالعربية: عطية / هدية\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":455,"lesson_id":96,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲇ واستمع لنطقه","coptic_display":"Ⲇ","audio_text":"دلدا كابيتال","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":456,"lesson_id":96,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲇ واستمع لنطقه","coptic_display":"ⲇ","audio_text":"دلدا سمول","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":457,"lesson_id":96,"type":"read_select","question":"ما هو نطق الحرف Ⲇ بالعربية؟","coptic_display":"Ⲇ","audio_text":"دلدا","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4008,"challenge_id":457,"text":"إي","is_correct":false,"image_url":null,"audio_url":null},{"id":4006,"challenge_id":457,"text":"د أو ذ","is_correct":true,"image_url":null,"audio_url":null},{"id":4007,"challenge_id":457,"text":"غ أو ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4009,"challenge_id":457,"text":"ياء طويلة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":458,"lesson_id":96,"type":"select","question":"ما معنى الكلمة القبطية: ⲇⲱⲣⲟⲛ؟ (المعرب: «ذورون»)","coptic_display":"ⲇⲱⲣⲟⲛ","audio_text":"ذورون","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4013,"challenge_id":458,"text":"عطية / هدية","is_correct":true,"image_url":null,"audio_url":null},{"id":4019,"challenge_id":458,"text":"صلاة","is_correct":false,"image_url":null,"audio_url":null},{"id":4020,"challenge_id":458,"text":"خبز","is_correct":false,"image_url":null,"audio_url":null},{"id":4021,"challenge_id":458,"text":"كتاب","is_correct":false,"image_url":null,"audio_url":null}]},{"id":459,"lesson_id":96,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: عطية / هدية (المعرب: «ذورون»)","coptic_display":"ⲇⲱⲣⲟⲛ","audio_text":"ذورون","audio_url":"audio_coptic/4delta.mp3","correct_word":"ⲇⲱⲣⲟⲛ","tiles":["ⲇ","ⲱ","ⲣ","ⲟ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":97,"unit_id":34,"title":"حرف إي (Ⲉ ⲉ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":460,"lesson_id":97,"type":"text_view","question":"نبذة عن حرف إي (Ⲉ ⲉ)","coptic_display":"Ⲉ ⲉ","audio_text":"إي","audio_url":"audio_coptic/5ei.mp3","correct_word":"• اسم الحرف: إي (Ⲉ ⲉ)\n• نطق الحرف بالعربي: إي خفيفة (E)\n• تصنيف الحرف: نعم، حرف متحرك (متحرك للكسر (خفيف))\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف متحرك للكسر يُنطق فتحة مائلة للكسر مثل حرف (E) في كلمة (pen) أو (bed).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲉⲛ\n  - القبطي المعرب (نطقها): «إن»\n  - المعنى بالعربية: قرد\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":461,"lesson_id":97,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲉ واستمع لنطقه","coptic_display":"Ⲉ","audio_text":"إي كابيتال","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":462,"lesson_id":97,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲉ واستمع لنطقه","coptic_display":"ⲉ","audio_text":"إي سمول","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":463,"lesson_id":97,"type":"read_select","question":"ما هو نطق الحرف Ⲉ بالعربية؟","coptic_display":"Ⲉ","audio_text":"إي","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4027,"challenge_id":463,"text":"إي خفيفة","is_correct":true,"image_url":null,"audio_url":null},{"id":4026,"challenge_id":463,"text":"ف أو ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4028,"challenge_id":463,"text":"أ","is_correct":false,"image_url":null,"audio_url":null},{"id":4029,"challenge_id":463,"text":"د أو ذ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":464,"lesson_id":97,"type":"select","question":"ما معنى الكلمة القبطية: ⲉⲛ؟ (المعرب: «إن»)","coptic_display":"ⲉⲛ","audio_text":"إن","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4034,"challenge_id":464,"text":"طائر","is_correct":false,"image_url":null,"audio_url":null},{"id":4035,"challenge_id":464,"text":"سمكة","is_correct":false,"image_url":null,"audio_url":null},{"id":4036,"challenge_id":464,"text":"قرد","is_correct":true,"image_url":null,"audio_url":null},{"id":4037,"challenge_id":464,"text":"أسد","is_correct":false,"image_url":null,"audio_url":null}]},{"id":465,"lesson_id":97,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قرد (المعرب: «إن»)","coptic_display":"ⲉⲛ","audio_text":"إن","audio_url":"audio_coptic/5ei.mp3","correct_word":"ⲉⲛ","tiles":["ⲉ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":125,"unit_id":34,"title":"🔄 مراجعة الوحدة 1","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":628,"lesson_id":125,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲁ ⲁ","right":"ألفا (ألف مفتوحة (أ))"},{"left":"Ⲃ ⲃ","right":"ڤيتا (بيتا) (ف (V) أو ب (B))"},{"left":"Ⲅ ⲅ","right":"غاما (غ أو ج أو ن)"},{"left":"Ⲇ ⲇ","right":"دلدا (د أو ذ)"}],"is_correct":true,"order_index":1,"options":[]},{"id":629,"lesson_id":125,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":3994,"challenge_id":629,"text":"Ⲅ ⲅ (غاما)","is_correct":false,"image_url":null,"audio_url":null},{"id":3995,"challenge_id":629,"text":"Ⲇ ⲇ (دلدا)","is_correct":false,"image_url":null,"audio_url":null},{"id":3996,"challenge_id":629,"text":"Ⲁ ⲁ (ألفا)","is_correct":true,"image_url":null,"audio_url":null},{"id":3997,"challenge_id":629,"text":"Ⲃ ⲃ (فيدا)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":630,"lesson_id":125,"type":"select","question":"ما معنى الكلمة: ⲃⲉⲣⲧ؟ (المعرب: «ڤيرت»)","coptic_display":"ⲃⲉⲣⲧ","audio_text":"ڤيرت","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4030,"challenge_id":630,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4031,"challenge_id":630,"text":"شجرة","is_correct":false,"image_url":null,"audio_url":null},{"id":4032,"challenge_id":630,"text":"وردة","is_correct":true,"image_url":null,"audio_url":null},{"id":4033,"challenge_id":630,"text":"ماء","is_correct":false,"image_url":null,"audio_url":null}]},{"id":631,"lesson_id":125,"type":"write","question":"رتب حروف الكلمة: قرد (المعرب: «إن»)","coptic_display":"ⲉⲛ","audio_text":"إن","audio_url":"audio_coptic/5ei.mp3","correct_word":"ⲉⲛ","tiles":["ⲉ","ⲛ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":632,"lesson_id":125,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲅ؟","coptic_display":"Ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4011,"challenge_id":632,"text":"ز","is_correct":false,"image_url":null,"audio_url":null},{"id":4012,"challenge_id":632,"text":"ف أو ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4014,"challenge_id":632,"text":"٦","is_correct":false,"image_url":null,"audio_url":null},{"id":4015,"challenge_id":632,"text":"غ أو ج أو ن","is_correct":true,"image_url":null,"audio_url":null}]}]}]},{"id":35,"level_id":5,"title":"الوحدة ٢: الحروف من (Ⲋ – Ⲓ)","badge":"Ⲋ-Ⲓ","description":"تعلّم الرمز العددي سو والحروف من زاتا إلى إيوتا","order_index":2,"lessons":[{"id":98,"unit_id":35,"title":"حرف سو (رقم ٦) (Ⲋ ⲋ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":466,"lesson_id":98,"type":"text_view","question":"نبذة عن حرف سو (رقم ٦) (Ⲋ ⲋ)","coptic_display":"Ⲋ ⲋ","audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":"• اسم الحرف: سو (رقم ٦) (Ⲋ ⲋ)\n• نطق الحرف بالعربي: سو (الرقم 6)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • ليس حرفاً هجائياً أصيلاً بل رمز ورقم عددي يدل على الرقم ستة (٦). يوضع فوقه شرطة أفقية لتمييزه كرقم، ويُنطق \"سو\".\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲥⲟⲟⲩ\n  - القبطي المعرب (نطقها): «سو»\n  - المعنى بالعربية: الرقم ستة (٦)\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":467,"lesson_id":98,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲋ واستمع لنطقه","coptic_display":"Ⲋ","audio_text":"سو (رقم ٦) كابيتال","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":468,"lesson_id":98,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲋ واستمع لنطقه","coptic_display":"ⲋ","audio_text":"سو (رقم ٦) سمول","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":469,"lesson_id":98,"type":"read_select","question":"ما هو نطق الحرف Ⲋ بالعربية؟","coptic_display":"Ⲋ","audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4062,"challenge_id":469,"text":"ز","is_correct":false,"image_url":null,"audio_url":null},{"id":4063,"challenge_id":469,"text":"ث أو ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4064,"challenge_id":469,"text":"ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4065,"challenge_id":469,"text":"سو (الرقم 6)","is_correct":true,"image_url":null,"audio_url":null}]},{"id":470,"lesson_id":98,"type":"select","question":"ما معنى الكلمة القبطية: ⲥⲟⲟⲩ؟ (المعرب: «سو»)","coptic_display":"ⲥⲟⲟⲩ","audio_text":"سو","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4043,"challenge_id":470,"text":"الرقم سبعة","is_correct":false,"image_url":null,"audio_url":null},{"id":4045,"challenge_id":470,"text":"الرقم عشرة","is_correct":false,"image_url":null,"audio_url":null},{"id":4047,"challenge_id":470,"text":"الرقم خمسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4049,"challenge_id":470,"text":"الرقم ستة (٦)","is_correct":true,"image_url":null,"audio_url":null}]},{"id":471,"lesson_id":98,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: الرقم ستة (٦) (المعرب: «سو»)","coptic_display":"ⲥⲟⲟⲩ","audio_text":"سو","audio_url":"audio_coptic/6sow.mp3","correct_word":"ⲥⲟⲟⲩ","tiles":["ⲥ","ⲟ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":99,"unit_id":35,"title":"حرف زاتا (Ⲍ ⲍ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":472,"lesson_id":99,"type":"text_view","question":"نبذة عن حرف زاتا (Ⲍ ⲍ)","coptic_display":"Ⲍ ⲍ","audio_text":"زاتا","audio_url":"audio_coptic/7zeta.mp3","correct_word":"• اسم الحرف: زاتا (Ⲍ ⲍ)\n• نطق الحرف بالعربي: ز (Z)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف زين \"ز\" مثل حرف (Z) في الإنجليزية في جميع الكلمات والمواضع.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲧⲣⲁⲡⲉⲍⲁ\n  - القبطي المعرب (نطقها): «ترابيزا»\n  - المعنى بالعربية: مائدة / ترابيزة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":473,"lesson_id":99,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲍ واستمع لنطقه","coptic_display":"Ⲍ","audio_text":"زاتا كابيتال","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":474,"lesson_id":99,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲍ واستمع لنطقه","coptic_display":"ⲍ","audio_text":"زاتا سمول","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":475,"lesson_id":99,"type":"read_select","question":"ما هو نطق الحرف Ⲍ بالعربية؟","coptic_display":"Ⲍ","audio_text":"زاتا","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4078,"challenge_id":475,"text":"ز","is_correct":true,"image_url":null,"audio_url":null},{"id":4079,"challenge_id":475,"text":"٦","is_correct":false,"image_url":null,"audio_url":null},{"id":4080,"challenge_id":475,"text":"ياء طويلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4081,"challenge_id":475,"text":"ياء قصيرة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":476,"lesson_id":99,"type":"select","question":"ما معنى الكلمة القبطية: ⲧⲣⲁⲡⲉⲍⲁ؟ (المعرب: «ترابيزا»)","coptic_display":"ⲧⲣⲁⲡⲉⲍⲁ","audio_text":"ترابيزا","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4082,"challenge_id":476,"text":"نافذة","is_correct":false,"image_url":null,"audio_url":null},{"id":4083,"challenge_id":476,"text":"مائدة / ترابيزة","is_correct":true,"image_url":null,"audio_url":null},{"id":4084,"challenge_id":476,"text":"كرسي","is_correct":false,"image_url":null,"audio_url":null},{"id":4085,"challenge_id":476,"text":"باب","is_correct":false,"image_url":null,"audio_url":null}]},{"id":477,"lesson_id":99,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مائدة / ترابيزة (المعرب: «ترابيزا»)","coptic_display":"ⲧⲣⲁⲡⲉⲍⲁ","audio_text":"ترابيزا","audio_url":"audio_coptic/7zeta.mp3","correct_word":"ⲧⲣⲁⲡⲉⲍⲁ","tiles":["ⲧ","ⲣ","ⲁ","ⲡ","ⲉ","ⲍ","ⲁ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":100,"unit_id":35,"title":"حرف هيتا (Ⲏ ⲏ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":478,"lesson_id":100,"type":"text_view","question":"نبذة عن حرف هيتا (Ⲏ ⲏ)","coptic_display":"Ⲏ ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":"• اسم الحرف: هيتا (إيتا) (Ⲏ ⲏ)\n• نطق الحرف بالعربي: ياء طويلة ممدودة (ee)\n• تصنيف الحرف: نعم، حرف متحرك (متحرك للكسر (طويل ممدود))\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف متحرك للكسر يُنطق ياء طويلة مشبعة ممدودة مثل (ee) في كلمة (meet) أو (see).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲁⲛⲍⲏⲃ\n  - القبطي المعرب (نطقها): «أنزيب»\n  - المعنى بالعربية: مدرسة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":479,"lesson_id":100,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲏ واستمع لنطقه","coptic_display":"Ⲏ","audio_text":"هيتا كابيتال","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":480,"lesson_id":100,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲏ واستمع لنطقه","coptic_display":"ⲏ","audio_text":"هيتا سمول","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":481,"lesson_id":100,"type":"read_select","question":"ما هو نطق الحرف Ⲏ بالعربية؟","coptic_display":"Ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4092,"challenge_id":481,"text":"ياء طويلة ممدودة","is_correct":true,"image_url":null,"audio_url":null},{"id":4090,"challenge_id":481,"text":"ث أو ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4091,"challenge_id":481,"text":"ز","is_correct":false,"image_url":null,"audio_url":null},{"id":4093,"challenge_id":481,"text":"ل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":482,"lesson_id":100,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲛⲍⲏⲃ؟ (المعرب: «أنزيب»)","coptic_display":"ⲁⲛⲍⲏⲃ","audio_text":"أنزيب","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4086,"challenge_id":482,"text":"طريق","is_correct":false,"image_url":null,"audio_url":null},{"id":4087,"challenge_id":482,"text":"بيت","is_correct":false,"image_url":null,"audio_url":null},{"id":4088,"challenge_id":482,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4089,"challenge_id":482,"text":"مدرسة","is_correct":true,"image_url":null,"audio_url":null}]},{"id":483,"lesson_id":100,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مدرسة (المعرب: «أنزيب»)","coptic_display":"ⲁⲛⲍⲏⲃ","audio_text":"أنزيب","audio_url":"audio_coptic/8eta.mp3","correct_word":"ⲁⲛⲍⲏⲃ","tiles":["ⲁ","ⲛ","ⲍ","ⲏ","ⲃ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":101,"unit_id":35,"title":"حرف ثيتا (Ⲑ ⲑ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":484,"lesson_id":101,"type":"text_view","question":"نبذة عن حرف ثيتا (Ⲑ ⲑ)","coptic_display":"Ⲑ ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/9seta.mp3","correct_word":"• اسم الحرف: ثيتا (Ⲑ ⲑ)\n• نطق الحرف بالعربي: ث أو ت\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له أكثر من نطق (له نطقان (ث / ت))\n• قواعد وحالات النطق:\n  1. يُنطق (ت): إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ).\n  2. يُنطق (ث): في باقي الحالات الأخرى مثل حرف (Th) في الإنجليزية.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲙⲁⲱⲟⲩⲧ\n  - القبطي المعرب (نطقها): «ماووت»\n  - المعنى بالعربية: مشط\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":485,"lesson_id":101,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲑ واستمع لنطقه","coptic_display":"Ⲑ","audio_text":"ثيتا كابيتال","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":486,"lesson_id":101,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲑ واستمع لنطقه","coptic_display":"ⲑ","audio_text":"ثيتا سمول","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":487,"lesson_id":101,"type":"read_select","question":"ما هو نطق الحرف Ⲑ بالعربية؟","coptic_display":"Ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4058,"challenge_id":487,"text":"ث أو ت","is_correct":true,"image_url":null,"audio_url":null},{"id":4059,"challenge_id":487,"text":"ياء طويلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4060,"challenge_id":487,"text":"م","is_correct":false,"image_url":null,"audio_url":null},{"id":4061,"challenge_id":487,"text":"ياء قصيرة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":488,"lesson_id":101,"type":"select","question":"ما معنى الكلمة القبطية: ⲙⲁⲱⲟⲩⲧ؟ (المعرب: «ماووت»)","coptic_display":"ⲙⲁⲱⲟⲩⲧ","audio_text":"ماووت","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4070,"challenge_id":488,"text":"ثوب","is_correct":false,"image_url":null,"audio_url":null},{"id":4071,"challenge_id":488,"text":"مشط","is_correct":true,"image_url":null,"audio_url":null},{"id":4072,"challenge_id":488,"text":"خاتم","is_correct":false,"image_url":null,"audio_url":null},{"id":4073,"challenge_id":488,"text":"مرآة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":489,"lesson_id":101,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مشط (المعرب: «ماووت»)","coptic_display":"ⲙⲁⲱⲟⲩⲧ","audio_text":"ماووت","audio_url":"audio_coptic/9seta.mp3","correct_word":"ⲙⲁⲱⲟⲩⲧ","tiles":["ⲙ","ⲁ","ⲱ","ⲟ","ⲩ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":102,"unit_id":35,"title":"حرف إيوتا (Ⲓ ⲓ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":490,"lesson_id":102,"type":"text_view","question":"نبذة عن حرف إيوتا (Ⲓ ⲓ)","coptic_display":"Ⲓ ⲓ","audio_text":"إيوتا","audio_url":"audio_coptic/10yota.mp3","correct_word":"• اسم الحرف: إيوتا (Ⲓ ⲓ)\n• نطق الحرف بالعربي: ياء قصيرة خفيفة (i)\n• تصنيف الحرف: نعم، حرف متحرك (متحرك للكسر (قصير))\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف متحرك للكسر يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف (I) في كلمة (sit) أو (pin).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲱⲓⲛⲓ\n  - القبطي المعرب (نطقها): «أويني»\n  - المعنى بالعربية: صنارة / نور\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":491,"lesson_id":102,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲓ واستمع لنطقه","coptic_display":"Ⲓ","audio_text":"إيوتا كابيتال","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":492,"lesson_id":102,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲓ واستمع لنطقه","coptic_display":"ⲓ","audio_text":"إيوتا سمول","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":493,"lesson_id":102,"type":"read_select","question":"ما هو نطق الحرف Ⲓ بالعربية؟","coptic_display":"Ⲓ","audio_text":"إيوتا","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4042,"challenge_id":493,"text":"ياء قصيرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4044,"challenge_id":493,"text":"ث أو ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4046,"challenge_id":493,"text":"ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4048,"challenge_id":493,"text":"ن","is_correct":false,"image_url":null,"audio_url":null}]},{"id":494,"lesson_id":102,"type":"select","question":"ما معنى الكلمة القبطية: ⲱⲓⲛⲓ؟ (المعرب: «أويني»)","coptic_display":"ⲱⲓⲛⲓ","audio_text":"أويني","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4050,"challenge_id":494,"text":"بحر","is_correct":false,"image_url":null,"audio_url":null},{"id":4052,"challenge_id":494,"text":"قارب","is_correct":false,"image_url":null,"audio_url":null},{"id":4053,"challenge_id":494,"text":"شبكة","is_correct":false,"image_url":null,"audio_url":null},{"id":4054,"challenge_id":494,"text":"صنارة / نور","is_correct":true,"image_url":null,"audio_url":null}]},{"id":495,"lesson_id":102,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: صنارة / نور (المعرب: «أويني»)","coptic_display":"ⲱⲓⲛⲓ","audio_text":"أويني","audio_url":"audio_coptic/10yota.mp3","correct_word":"ⲱⲓⲛⲓ","tiles":["ⲱ","ⲓ","ⲛ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":126,"unit_id":35,"title":"🔄 مراجعة الوحدة 2","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":633,"lesson_id":126,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲋ ⲋ","right":"سو (رقم ٦) (سو (الرقم 6))"},{"left":"Ⲍ ⲍ","right":"زاتا (ز)"},{"left":"Ⲏ ⲏ","right":"هيتا (ياء طويلة ممدودة (ee))"},{"left":"Ⲑ ⲑ","right":"ثيتا (ث أو ت)"}],"is_correct":true,"order_index":1,"options":[]},{"id":634,"lesson_id":126,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4066,"challenge_id":634,"text":"Ⲑ ⲑ (ثيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4067,"challenge_id":634,"text":"Ⲋ ⲋ (سو (رقم ٦))","is_correct":true,"image_url":null,"audio_url":null},{"id":4068,"challenge_id":634,"text":"Ⲍ ⲍ (زاتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4069,"challenge_id":634,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":635,"lesson_id":126,"type":"select","question":"ما معنى الكلمة: ⲧⲣⲁⲡⲉⲍⲁ؟ (المعرب: «ترابيزا»)","coptic_display":"ⲧⲣⲁⲡⲉⲍⲁ","audio_text":"ترابيزا","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4074,"challenge_id":635,"text":"كرسي","is_correct":false,"image_url":null,"audio_url":null},{"id":4075,"challenge_id":635,"text":"مائدة / ترابيزة","is_correct":true,"image_url":null,"audio_url":null},{"id":4076,"challenge_id":635,"text":"باب","is_correct":false,"image_url":null,"audio_url":null},{"id":4077,"challenge_id":635,"text":"نافذة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":636,"lesson_id":126,"type":"write","question":"رتب حروف الكلمة: صنارة / نور (المعرب: «أويني»)","coptic_display":"ⲱⲓⲛⲓ","audio_text":"أويني","audio_url":"audio_coptic/10yota.mp3","correct_word":"ⲱⲓⲛⲓ","tiles":["ⲱ","ⲓ","ⲛ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":637,"lesson_id":126,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲏ؟","coptic_display":"Ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4055,"challenge_id":637,"text":"ياء طويلة ممدودة","is_correct":true,"image_url":null,"audio_url":null},{"id":4051,"challenge_id":637,"text":"ز","is_correct":false,"image_url":null,"audio_url":null},{"id":4056,"challenge_id":637,"text":"ث أو ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4057,"challenge_id":637,"text":"ل","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":36,"level_id":5,"title":"الوحدة ٣: الحروف من (Ⲕ – Ⲝ)","badge":"Ⲕ-Ⲝ","description":"تعلّم الحروف من كابا إلى كسي مع كلمات كنسية شهيرة","order_index":3,"lessons":[{"id":103,"unit_id":36,"title":"حرف كابا (Ⲕ ⲕ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":496,"lesson_id":103,"type":"text_view","question":"نبذة عن حرف كابا (Ⲕ ⲕ)","coptic_display":"Ⲕ ⲕ","audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":"• اسم الحرف: كابا (Ⲕ ⲕ)\n• نطق الحرف بالعربي: ك (K)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف كاف \"ك\" في جميع المواضع والكلمات دون استثناء.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲉⲕⲕⲗⲏⲥⲓⲁ\n  - القبطي المعرب (نطقها): «إككليسيا»\n  - المعنى بالعربية: كنيسة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":497,"lesson_id":103,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲕ واستمع لنطقه","coptic_display":"Ⲕ","audio_text":"كابا كابيتال","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":498,"lesson_id":103,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲕ واستمع لنطقه","coptic_display":"ⲕ","audio_text":"كابا سمول","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":499,"lesson_id":103,"type":"read_select","question":"ما هو نطق الحرف Ⲕ بالعربية؟","coptic_display":"Ⲕ","audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4094,"challenge_id":499,"text":"ك","is_correct":true,"image_url":null,"audio_url":null},{"id":4095,"challenge_id":499,"text":"كـ+س","is_correct":false,"image_url":null,"audio_url":null},{"id":4096,"challenge_id":499,"text":"م","is_correct":false,"image_url":null,"audio_url":null},{"id":4097,"challenge_id":499,"text":"ل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":500,"lesson_id":103,"type":"select","question":"ما معنى الكلمة القبطية: ⲉⲕⲕⲗⲏⲥⲓⲁ؟ (المعرب: «إككليسيا»)","coptic_display":"ⲉⲕⲕⲗⲏⲥⲓⲁ","audio_text":"إككليسيا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4098,"challenge_id":500,"text":"هيكل","is_correct":false,"image_url":null,"audio_url":null},{"id":4099,"challenge_id":500,"text":"كنيسة","is_correct":true,"image_url":null,"audio_url":null},{"id":4100,"challenge_id":500,"text":"مذبح","is_correct":false,"image_url":null,"audio_url":null},{"id":4101,"challenge_id":500,"text":"دير","is_correct":false,"image_url":null,"audio_url":null}]},{"id":501,"lesson_id":103,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: كنيسة (المعرب: «إككليسيا»)","coptic_display":"ⲉⲕⲕⲗⲏⲥⲓⲁ","audio_text":"إككليسيا","audio_url":"audio_coptic/11kapa.mp3","correct_word":"ⲉⲕⲕⲗⲏⲥⲓⲁ","tiles":["ⲉ","ⲕ","ⲕ","ⲗ","ⲏ","ⲥ","ⲓ","ⲁ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":104,"unit_id":36,"title":"حرف لابدا (Ⲗ ⲗ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":502,"lesson_id":104,"type":"text_view","question":"نبذة عن حرف لابدا (Ⲗ ⲗ)","coptic_display":"Ⲗ ⲗ","audio_text":"لابدا","audio_url":"audio_coptic/12lavla.mp3","correct_word":"• اسم الحرف: لابدا (لافلا) (Ⲗ ⲗ)\n• نطق الحرف بالعربي: ل (L)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف لام \"ل\" مثل حرف (L) في الإنجليزية.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲗⲁⲙⲡⲁⲥ\n  - القبطي المعرب (نطقها): «لامباس»\n  - المعنى بالعربية: مصباح / قنديل\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":503,"lesson_id":104,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲗ واستمع لنطقه","coptic_display":"Ⲗ","audio_text":"لابدا كابيتال","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":504,"lesson_id":104,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲗ واستمع لنطقه","coptic_display":"ⲗ","audio_text":"لابدا سمول","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":505,"lesson_id":104,"type":"read_select","question":"ما هو نطق الحرف Ⲗ بالعربية؟","coptic_display":"Ⲗ","audio_text":"لابدا","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4130,"challenge_id":505,"text":"ب مشددة","is_correct":false,"image_url":null,"audio_url":null},{"id":4131,"challenge_id":505,"text":"ل","is_correct":true,"image_url":null,"audio_url":null},{"id":4132,"challenge_id":505,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4133,"challenge_id":505,"text":"ك","is_correct":false,"image_url":null,"audio_url":null}]},{"id":506,"lesson_id":104,"type":"select","question":"ما معنى الكلمة القبطية: ⲗⲁⲙⲡⲁⲥ؟ (المعرب: «لامباس»)","coptic_display":"ⲗⲁⲙⲡⲁⲥ","audio_text":"لامباس","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4126,"challenge_id":506,"text":"نار","is_correct":false,"image_url":null,"audio_url":null},{"id":4127,"challenge_id":506,"text":"مصباح / قنديل","is_correct":true,"image_url":null,"audio_url":null},{"id":4128,"challenge_id":506,"text":"شمس","is_correct":false,"image_url":null,"audio_url":null},{"id":4129,"challenge_id":506,"text":"زيت","is_correct":false,"image_url":null,"audio_url":null}]},{"id":507,"lesson_id":104,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مصباح / قنديل (المعرب: «لامباس»)","coptic_display":"ⲗⲁⲙⲡⲁⲥ","audio_text":"لامباس","audio_url":"audio_coptic/12lavla.mp3","correct_word":"ⲗⲁⲙⲡⲁⲥ","tiles":["ⲗ","ⲁ","ⲙ","ⲡ","ⲁ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":105,"unit_id":36,"title":"حرف مي (Ⲙ ⲙ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":508,"lesson_id":105,"type":"text_view","question":"نبذة عن حرف مي (Ⲙ ⲙ)","coptic_display":"Ⲙ ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":"• اسم الحرف: مي (Ⲙ ⲙ)\n• نطق الحرف بالعربي: م (M)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف ميم \"م\" في جميع المواضع والكلمات.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲙⲟⲗϧ\n  - القبطي المعرب (نطقها): «مولخ»\n  - المعنى بالعربية: شمعة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":509,"lesson_id":105,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲙ واستمع لنطقه","coptic_display":"Ⲙ","audio_text":"مي كابيتال","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":510,"lesson_id":105,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲙ واستمع لنطقه","coptic_display":"ⲙ","audio_text":"مي سمول","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":511,"lesson_id":105,"type":"read_select","question":"ما هو نطق الحرف Ⲙ بالعربية؟","coptic_display":"Ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4138,"challenge_id":511,"text":"ر","is_correct":false,"image_url":null,"audio_url":null},{"id":4139,"challenge_id":511,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4140,"challenge_id":511,"text":"ل","is_correct":false,"image_url":null,"audio_url":null},{"id":4141,"challenge_id":511,"text":"م","is_correct":true,"image_url":null,"audio_url":null}]},{"id":512,"lesson_id":105,"type":"select","question":"ما معنى الكلمة القبطية: ⲙⲟⲗϧ؟ (المعرب: «مولخ»)","coptic_display":"ⲙⲟⲗϧ","audio_text":"مولخ","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4142,"challenge_id":512,"text":"شمعة","is_correct":true,"image_url":null,"audio_url":null},{"id":4143,"challenge_id":512,"text":"بخور","is_correct":false,"image_url":null,"audio_url":null},{"id":4144,"challenge_id":512,"text":"صليب","is_correct":false,"image_url":null,"audio_url":null},{"id":4145,"challenge_id":512,"text":"كأس","is_correct":false,"image_url":null,"audio_url":null}]},{"id":513,"lesson_id":105,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شمعة (المعرب: «مولخ»)","coptic_display":"ⲙⲟⲗϧ","audio_text":"مولخ","audio_url":"audio_coptic/13mi.mp3","correct_word":"ⲙⲟⲗϧ","tiles":["ⲙ","ⲟ","ⲗ","ϧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":106,"unit_id":36,"title":"حرف ني (Ⲛ ⲛ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":514,"lesson_id":106,"type":"text_view","question":"نبذة عن حرف ني (Ⲛ ⲛ)","coptic_display":"Ⲛ ⲛ","audio_text":"ني","audio_url":"audio_coptic/14ni.mp3","correct_word":"• اسم الحرف: ني (Ⲛ ⲛ)\n• نطق الحرف بالعربي: ن (N)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف نون \"ن\" في جميع المواضع والكلمات.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲛⲟⲩϯ\n  - القبطي المعرب (نطقها): «نوتي»\n  - المعنى بالعربية: الله\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":515,"lesson_id":106,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲛ واستمع لنطقه","coptic_display":"Ⲛ","audio_text":"ني كابيتال","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":516,"lesson_id":106,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲛ واستمع لنطقه","coptic_display":"ⲛ","audio_text":"ني سمول","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":517,"lesson_id":106,"type":"read_select","question":"ما هو نطق الحرف Ⲛ بالعربية؟","coptic_display":"Ⲛ","audio_text":"ني","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4102,"challenge_id":517,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4103,"challenge_id":517,"text":"ن","is_correct":true,"image_url":null,"audio_url":null},{"id":4104,"challenge_id":517,"text":"م","is_correct":false,"image_url":null,"audio_url":null},{"id":4105,"challenge_id":517,"text":"كـ+س","is_correct":false,"image_url":null,"audio_url":null}]},{"id":518,"lesson_id":106,"type":"select","question":"ما معنى الكلمة القبطية: ⲛⲟⲩϯ؟ (المعرب: «نوتي»)","coptic_display":"ⲛⲟⲩϯ","audio_text":"نوتي","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4118,"challenge_id":518,"text":"السماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4119,"challenge_id":518,"text":"الله","is_correct":true,"image_url":null,"audio_url":null},{"id":4120,"challenge_id":518,"text":"النور","is_correct":false,"image_url":null,"audio_url":null},{"id":4121,"challenge_id":518,"text":"الحق","is_correct":false,"image_url":null,"audio_url":null}]},{"id":519,"lesson_id":106,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: الله (المعرب: «نوتي»)","coptic_display":"ⲛⲟⲩϯ","audio_text":"نوتي","audio_url":"audio_coptic/14ni.mp3","correct_word":"ⲛⲟⲩϯ","tiles":["ⲛ","ⲟ","ⲩ","ϯ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":107,"unit_id":36,"title":"حرف كسي (Ⲝ ⲝ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":520,"lesson_id":107,"type":"text_view","question":"نبذة عن حرف كسي (Ⲝ ⲝ)","coptic_display":"Ⲝ ⲝ","audio_text":"كسي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"• اسم الحرف: كسي (Ⲝ ⲝ)\n• نطق الحرف بالعربي: كـ + س (X)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف مركب يُنطق كاف وسين معاً (كـ + س = X) في مقطع صوتي واحد.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲟⲩⲁⲗⲓⲝ\n  - القبطي المعرب (نطقها): «أواليكس»\n  - المعنى بالعربية: ستارة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":521,"lesson_id":107,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲝ واستمع لنطقه","coptic_display":"Ⲝ","audio_text":"كسي كابيتال","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":522,"lesson_id":107,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲝ واستمع لنطقه","coptic_display":"ⲝ","audio_text":"كسي سمول","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":523,"lesson_id":107,"type":"read_select","question":"ما هو نطق الحرف Ⲝ بالعربية؟","coptic_display":"Ⲝ","audio_text":"كسي","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4106,"challenge_id":523,"text":"كـ + س","is_correct":true,"image_url":null,"audio_url":null},{"id":4107,"challenge_id":523,"text":"ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4108,"challenge_id":523,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4109,"challenge_id":523,"text":"ت","is_correct":false,"image_url":null,"audio_url":null}]},{"id":524,"lesson_id":107,"type":"select","question":"ما معنى الكلمة القبطية: ⲟⲩⲁⲗⲓⲝ؟ (المعرب: «أواليكس»)","coptic_display":"ⲟⲩⲁⲗⲓⲝ","audio_text":"أواليكس","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4114,"challenge_id":524,"text":"حائط","is_correct":false,"image_url":null,"audio_url":null},{"id":4115,"challenge_id":524,"text":"مائدة","is_correct":false,"image_url":null,"audio_url":null},{"id":4116,"challenge_id":524,"text":"ستارة","is_correct":true,"image_url":null,"audio_url":null},{"id":4117,"challenge_id":524,"text":"سقف","is_correct":false,"image_url":null,"audio_url":null}]},{"id":525,"lesson_id":107,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ستارة (المعرب: «أواليكس»)","coptic_display":"ⲟⲩⲁⲗⲓⲝ","audio_text":"أواليكس","audio_url":"audio_coptic/15axsy.mp3","correct_word":"ⲟⲩⲁⲗⲓⲝ","tiles":["ⲟ","ⲩ","ⲁ","ⲗ","ⲓ","ⲝ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":127,"unit_id":36,"title":"🔄 مراجعة الوحدة 3","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":638,"lesson_id":127,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"Ⲗ ⲗ","right":"لابدا (ل)"},{"left":"Ⲙ ⲙ","right":"مي (م)"},{"left":"Ⲛ ⲛ","right":"ني (ن)"}],"is_correct":true,"order_index":1,"options":[]},{"id":639,"lesson_id":127,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4110,"challenge_id":639,"text":"Ⲕ ⲕ (كابا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4111,"challenge_id":639,"text":"Ⲗ ⲗ (لابدا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4112,"challenge_id":639,"text":"Ⲙ ⲙ (مي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4113,"challenge_id":639,"text":"Ⲛ ⲛ (ني)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":640,"lesson_id":127,"type":"select","question":"ما معنى الكلمة: ⲗⲁⲙⲡⲁⲥ؟ (المعرب: «لامباس»)","coptic_display":"ⲗⲁⲙⲡⲁⲥ","audio_text":"لامباس","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4134,"challenge_id":640,"text":"شمس","is_correct":false,"image_url":null,"audio_url":null},{"id":4135,"challenge_id":640,"text":"زيت","is_correct":false,"image_url":null,"audio_url":null},{"id":4136,"challenge_id":640,"text":"نار","is_correct":false,"image_url":null,"audio_url":null},{"id":4137,"challenge_id":640,"text":"مصباح / قنديل","is_correct":true,"image_url":null,"audio_url":null}]},{"id":641,"lesson_id":127,"type":"write","question":"رتب حروف الكلمة: ستارة (المعرب: «أواليكس»)","coptic_display":"ⲟⲩⲁⲗⲓⲝ","audio_text":"أواليكس","audio_url":"audio_coptic/15axsy.mp3","correct_word":"ⲟⲩⲁⲗⲓⲝ","tiles":["ⲟ","ⲩ","ⲁ","ⲗ","ⲓ","ⲝ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":642,"lesson_id":127,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲙ؟","coptic_display":"Ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4122,"challenge_id":642,"text":"ر","is_correct":false,"image_url":null,"audio_url":null},{"id":4123,"challenge_id":642,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4124,"challenge_id":642,"text":"م","is_correct":true,"image_url":null,"audio_url":null},{"id":4125,"challenge_id":642,"text":"ل","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":37,"level_id":5,"title":"الوحدة ٤: الحروف من (Ⲟ – Ⲧ)","badge":"Ⲟ-Ⲧ","description":"تعلّم الحروف من أُو قصيرة إلى تاف","order_index":4,"lessons":[{"id":108,"unit_id":37,"title":"حرف أُو (قصيرة) (Ⲟ ⲟ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":526,"lesson_id":108,"type":"text_view","question":"نبذة عن حرف أُو (قصيرة) (Ⲟ ⲟ)","coptic_display":"Ⲟ ⲟ","audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":"• اسم الحرف: أُو (قصيرة) (Ⲟ ⲟ)\n• نطق الحرف بالعربي: واو قصيرة مضمومة (O)\n• تصنيف الحرف: نعم، حرف متحرك (متحرك للضم (قصير))\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة مثل حرف (O) في كلمة (not) أو (hot).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲥⲓⲟⲩ\n  - القبطي المعرب (نطقها): «سيو»\n  - المعنى بالعربية: نجم\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":527,"lesson_id":108,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲟ واستمع لنطقه","coptic_display":"Ⲟ","audio_text":"أُو (قصيرة) كابيتال","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":528,"lesson_id":108,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲟ واستمع لنطقه","coptic_display":"ⲟ","audio_text":"أُو (قصيرة) سمول","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":529,"lesson_id":108,"type":"read_select","question":"ما هو نطق الحرف Ⲟ بالعربية؟","coptic_display":"Ⲟ","audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4173,"challenge_id":529,"text":"واو قصيرة مضمومة","is_correct":true,"image_url":null,"audio_url":null},{"id":4170,"challenge_id":529,"text":"واو طويلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4171,"challenge_id":529,"text":"ر","is_correct":false,"image_url":null,"audio_url":null},{"id":4172,"challenge_id":529,"text":"ب ثقيلة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":530,"lesson_id":108,"type":"select","question":"ما معنى الكلمة القبطية: ⲥⲓⲟⲩ؟ (المعرب: «سيو»)","coptic_display":"ⲥⲓⲟⲩ","audio_text":"سيو","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4154,"challenge_id":530,"text":"سماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4155,"challenge_id":530,"text":"سحاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4156,"challenge_id":530,"text":"قمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4157,"challenge_id":530,"text":"نجم","is_correct":true,"image_url":null,"audio_url":null}]},{"id":531,"lesson_id":108,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: نجم (المعرب: «سيو»)","coptic_display":"ⲥⲓⲟⲩ","audio_text":"سيو","audio_url":"audio_coptic/16oo.mp3","correct_word":"ⲥⲓⲟⲩ","tiles":["ⲥ","ⲓ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":109,"unit_id":37,"title":"حرف بي (Ⲡ ⲡ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":532,"lesson_id":109,"type":"text_view","question":"نبذة عن حرف بي (Ⲡ ⲡ)","coptic_display":"Ⲡ ⲡ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":"• اسم الحرف: بي (Ⲡ ⲡ)\n• نطق الحرف بالعربي: ب ثقيلة مشددة (P)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق باء شديدة تخرج بحبس الهواء ثم إطلاقه بقوة مثل حرف (P) في الإنجليزية.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲡⲉ\n  - القبطي المعرب (نطقها): «بي»\n  - المعنى بالعربية: سماء\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":533,"lesson_id":109,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲡ واستمع لنطقه","coptic_display":"Ⲡ","audio_text":"بي كابيتال","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":534,"lesson_id":109,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲡ واستمع لنطقه","coptic_display":"ⲡ","audio_text":"بي سمول","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":535,"lesson_id":109,"type":"read_select","question":"ما هو نطق الحرف Ⲡ بالعربية؟","coptic_display":"Ⲡ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4158,"challenge_id":535,"text":"ب ثقيلة مشددة","is_correct":true,"image_url":null,"audio_url":null},{"id":4159,"challenge_id":535,"text":"واو قصيرة","is_correct":false,"image_url":null,"audio_url":null},{"id":4160,"challenge_id":535,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4161,"challenge_id":535,"text":"ت","is_correct":false,"image_url":null,"audio_url":null}]},{"id":536,"lesson_id":109,"type":"select","question":"ما معنى الكلمة القبطية: ⲡⲉ؟ (المعرب: «بي»)","coptic_display":"ⲡⲉ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4162,"challenge_id":536,"text":"سماء","is_correct":true,"image_url":null,"audio_url":null},{"id":4163,"challenge_id":536,"text":"ماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4164,"challenge_id":536,"text":"أرض","is_correct":false,"image_url":null,"audio_url":null},{"id":4165,"challenge_id":536,"text":"نار","is_correct":false,"image_url":null,"audio_url":null}]},{"id":537,"lesson_id":109,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: سماء (المعرب: «بي»)","coptic_display":"ⲡⲉ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":"ⲡⲉ","tiles":["ⲡ","ⲉ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":110,"unit_id":37,"title":"حرف رو (Ⲣ ⲣ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":538,"lesson_id":110,"type":"text_view","question":"نبذة عن حرف رو (Ⲣ ⲣ)","coptic_display":"Ⲣ ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":"• اسم الحرف: رو (Ⲣ ⲣ)\n• نطق الحرف بالعربي: ر (R)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف راء \"ر\" في جميع المواضع والكلمات.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲣⲱⲙⲓ\n  - القبطي المعرب (نطقها): «رومي»\n  - المعنى بالعربية: إنسان\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":539,"lesson_id":110,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲣ واستمع لنطقه","coptic_display":"Ⲣ","audio_text":"رو كابيتال","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":540,"lesson_id":110,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲣ واستمع لنطقه","coptic_display":"ⲣ","audio_text":"رو سمول","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":541,"lesson_id":110,"type":"read_select","question":"ما هو نطق الحرف Ⲣ بالعربية؟","coptic_display":"Ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4182,"challenge_id":541,"text":"ب مشددة","is_correct":false,"image_url":null,"audio_url":null},{"id":4183,"challenge_id":541,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4184,"challenge_id":541,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4185,"challenge_id":541,"text":"ر","is_correct":true,"image_url":null,"audio_url":null}]},{"id":542,"lesson_id":110,"type":"select","question":"ما معنى الكلمة القبطية: ⲣⲱⲙⲓ؟ (المعرب: «رومي»)","coptic_display":"ⲣⲱⲙⲓ","audio_text":"رومي","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4166,"challenge_id":542,"text":"حيوان","is_correct":false,"image_url":null,"audio_url":null},{"id":4167,"challenge_id":542,"text":"ملاك","is_correct":false,"image_url":null,"audio_url":null},{"id":4168,"challenge_id":542,"text":"إنسان","is_correct":true,"image_url":null,"audio_url":null},{"id":4169,"challenge_id":542,"text":"شجر","is_correct":false,"image_url":null,"audio_url":null}]},{"id":543,"lesson_id":110,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: إنسان (المعرب: «رومي»)","coptic_display":"ⲣⲱⲙⲓ","audio_text":"رومي","audio_url":"audio_coptic/18roo.mp3","correct_word":"ⲣⲱⲙⲓ","tiles":["ⲣ","ⲱ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":111,"unit_id":37,"title":"حرف سيما (Ⲥ ⲥ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":544,"lesson_id":111,"type":"text_view","question":"نبذة عن حرف سيما (Ⲥ ⲥ)","coptic_display":"Ⲥ ⲥ","audio_text":"سيما","audio_url":"audio_coptic/19sema.mp3","correct_word":"• اسم الحرف: سيما (Ⲥ ⲥ)\n• نطق الحرف بالعربي: س (S)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف سين \"س\" في جميع المواضع.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲥⲱ\n  - القبطي المعرب (نطقها): «سو»\n  - المعنى بالعربية: يشرب\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":545,"lesson_id":111,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲥ واستمع لنطقه","coptic_display":"Ⲥ","audio_text":"سيما كابيتال","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":546,"lesson_id":111,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲥ واستمع لنطقه","coptic_display":"ⲥ","audio_text":"سيما سمول","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":547,"lesson_id":111,"type":"read_select","question":"ما هو نطق الحرف Ⲥ بالعربية؟","coptic_display":"Ⲥ","audio_text":"سيما","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4146,"challenge_id":547,"text":"ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4147,"challenge_id":547,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4148,"challenge_id":547,"text":"ر","is_correct":false,"image_url":null,"audio_url":null},{"id":4149,"challenge_id":547,"text":"س","is_correct":true,"image_url":null,"audio_url":null}]},{"id":548,"lesson_id":111,"type":"select","question":"ما معنى الكلمة القبطية: ⲥⲱ؟ (المعرب: «سو»)","coptic_display":"ⲥⲱ","audio_text":"سو","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4150,"challenge_id":548,"text":"يمشي","is_correct":false,"image_url":null,"audio_url":null},{"id":4151,"challenge_id":548,"text":"يشرب","is_correct":true,"image_url":null,"audio_url":null},{"id":4152,"challenge_id":548,"text":"يأكل","is_correct":false,"image_url":null,"audio_url":null},{"id":4153,"challenge_id":548,"text":"ينام","is_correct":false,"image_url":null,"audio_url":null}]},{"id":549,"lesson_id":111,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: يشرب (المعرب: «سو»)","coptic_display":"ⲥⲱ","audio_text":"سو","audio_url":"audio_coptic/19sema.mp3","correct_word":"ⲥⲱ","tiles":["ⲥ","ⲱ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":112,"unit_id":37,"title":"حرف تاف (Ⲧ ⲧ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":550,"lesson_id":112,"type":"text_view","question":"نبذة عن حرف تاف (Ⲧ ⲧ)","coptic_display":"Ⲧ ⲧ","audio_text":"تاف","audio_url":"audio_coptic/20tav.mp3","correct_word":"• اسم الحرف: تاف (Ⲧ ⲧ)\n• نطق الحرف بالعربي: ت (T)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف تاء \"ت\" في جميع المواضع والكلمات.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲧⲱⲟⲩ\n  - القبطي المعرب (نطقها): «توو»\n  - المعنى بالعربية: جبل\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":551,"lesson_id":112,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲧ واستمع لنطقه","coptic_display":"Ⲧ","audio_text":"تاف كابيتال","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":552,"lesson_id":112,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲧ واستمع لنطقه","coptic_display":"ⲧ","audio_text":"تاف سمول","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":553,"lesson_id":112,"type":"read_select","question":"ما هو نطق الحرف Ⲧ بالعربية؟","coptic_display":"Ⲧ","audio_text":"تاف","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4174,"challenge_id":553,"text":"ي/و","is_correct":false,"image_url":null,"audio_url":null},{"id":4175,"challenge_id":553,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4176,"challenge_id":553,"text":"ت","is_correct":true,"image_url":null,"audio_url":null},{"id":4177,"challenge_id":553,"text":"س","is_correct":false,"image_url":null,"audio_url":null}]},{"id":554,"lesson_id":112,"type":"select","question":"ما معنى الكلمة القبطية: ⲧⲱⲟⲩ؟ (المعرب: «توو»)","coptic_display":"ⲧⲱⲟⲩ","audio_text":"توو","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4178,"challenge_id":554,"text":"جبل","is_correct":true,"image_url":null,"audio_url":null},{"id":4179,"challenge_id":554,"text":"نهر","is_correct":false,"image_url":null,"audio_url":null},{"id":4180,"challenge_id":554,"text":"صحراء","is_correct":false,"image_url":null,"audio_url":null},{"id":4181,"challenge_id":554,"text":"وادي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":555,"lesson_id":112,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: جبل (المعرب: «توو»)","coptic_display":"ⲧⲱⲟⲩ","audio_text":"توو","audio_url":"audio_coptic/20tav.mp3","correct_word":"ⲧⲱⲟⲩ","tiles":["ⲧ","ⲱ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":128,"unit_id":37,"title":"🔄 مراجعة الوحدة 4","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":643,"lesson_id":128,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲟ ⲟ","right":"أُو (قصيرة) (واو قصيرة مضمومة (O))"},{"left":"Ⲡ ⲡ","right":"بي (ب ثقيلة مشددة (P))"},{"left":"Ⲣ ⲣ","right":"رو (ر)"},{"left":"Ⲥ ⲥ","right":"سيما (س)"}],"is_correct":true,"order_index":1,"options":[]},{"id":644,"lesson_id":128,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4186,"challenge_id":644,"text":"Ⲥ ⲥ (سيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4187,"challenge_id":644,"text":"Ⲣ ⲣ (رو)","is_correct":false,"image_url":null,"audio_url":null},{"id":4188,"challenge_id":644,"text":"Ⲡ ⲡ (بي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4189,"challenge_id":644,"text":"Ⲟ ⲟ (أُو (قصيرة))","is_correct":true,"image_url":null,"audio_url":null}]},{"id":645,"lesson_id":128,"type":"select","question":"ما معنى الكلمة: ⲡⲉ؟ (المعرب: «بي»)","coptic_display":"ⲡⲉ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4194,"challenge_id":645,"text":"نار","is_correct":false,"image_url":null,"audio_url":null},{"id":4195,"challenge_id":645,"text":"ماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4196,"challenge_id":645,"text":"سماء","is_correct":true,"image_url":null,"audio_url":null},{"id":4197,"challenge_id":645,"text":"أرض","is_correct":false,"image_url":null,"audio_url":null}]},{"id":646,"lesson_id":128,"type":"write","question":"رتب حروف الكلمة: جبل (المعرب: «توو»)","coptic_display":"ⲧⲱⲟⲩ","audio_text":"توو","audio_url":"audio_coptic/20tav.mp3","correct_word":"ⲧⲱⲟⲩ","tiles":["ⲧ","ⲱ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":647,"lesson_id":128,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲣ؟","coptic_display":"Ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4190,"challenge_id":647,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4191,"challenge_id":647,"text":"ر","is_correct":true,"image_url":null,"audio_url":null},{"id":4192,"challenge_id":647,"text":"ب مشددة","is_correct":false,"image_url":null,"audio_url":null},{"id":4193,"challenge_id":647,"text":"س","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":38,"level_id":5,"title":"الوحدة ٥: الحروف من (Ⲩ – Ⲱ)","badge":"Ⲩ-Ⲱ","description":"تعلّم الحروف من إبسيلون إلى أوميغا خاتمة الحروف اليونانية","order_index":5,"lessons":[{"id":113,"unit_id":38,"title":"حرف إبسيلون (Ⲩ ⲩ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":556,"lesson_id":113,"type":"text_view","question":"نبذة عن حرف إبسيلون (Ⲩ ⲩ)","coptic_display":"Ⲩ ⲩ","audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":"• اسم الحرف: إبسيلون (Ⲩ ⲩ)\n• نطق الحرف بالعربي: ڤ (V) أو و أو ي\n• تصنيف الحرف: نعم، حرف متحرك (متحرك (متعدد الحالات))\n• عدد حالات النطق: له أكثر من نطق (له 3 حالات نطق (ڤ / و / ي))\n• قواعد وحالات النطق:\n  1. يُنطق (ڤ / V): إذا سبقه حرف Ⲁ (ألفا) أو Ⲉ (إي) مثل المقطعين (ⲀⲨ / ⲈⲨ).\n  2. يُنطق (و ممدودة): إذا سبقه حرف Ⲟ (أو قصيرة) في المقطع (ⲞⲨ).\n  3. يُنطق (ي): في باقي الحالات إذا لم يسبقه (Ⲁ أو Ⲉ أو Ⲟ).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲩⲓⲟⲥ\n  - القبطي المعرب (نطقها): «إيوس»\n  - المعنى بالعربية: ابن\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":557,"lesson_id":113,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲩ واستمع لنطقه","coptic_display":"Ⲩ","audio_text":"إبسيلون كابيتال","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":558,"lesson_id":113,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲩ واستمع لنطقه","coptic_display":"ⲩ","audio_text":"إبسيلون سمول","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":559,"lesson_id":113,"type":"read_select","question":"ما هو نطق الحرف Ⲩ بالعربية؟","coptic_display":"Ⲩ","audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4242,"challenge_id":559,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4243,"challenge_id":559,"text":"بـ+س","is_correct":false,"image_url":null,"audio_url":null},{"id":4244,"challenge_id":559,"text":"خ أو ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4245,"challenge_id":559,"text":"ي أو ڤ أو و","is_correct":true,"image_url":null,"audio_url":null}]},{"id":560,"lesson_id":113,"type":"select","question":"ما معنى الكلمة القبطية: ⲩⲓⲟⲥ؟ (المعرب: «إيوس»)","coptic_display":"ⲩⲓⲟⲥ","audio_text":"إيوس","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4198,"challenge_id":560,"text":"ابن","is_correct":true,"image_url":null,"audio_url":null},{"id":4199,"challenge_id":560,"text":"أب","is_correct":false,"image_url":null,"audio_url":null},{"id":4200,"challenge_id":560,"text":"أم","is_correct":false,"image_url":null,"audio_url":null},{"id":4201,"challenge_id":560,"text":"أخ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":561,"lesson_id":113,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ابن (المعرب: «إيوس»)","coptic_display":"ⲩⲓⲟⲥ","audio_text":"إيوس","audio_url":"audio_coptic/21epselon.mp3","correct_word":"ⲩⲓⲟⲥ","tiles":["ⲩ","ⲓ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":114,"unit_id":38,"title":"حرف في (Ⲫ ⲫ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":562,"lesson_id":114,"type":"text_view","question":"نبذة عن حرف في (Ⲫ ⲫ)","coptic_display":"Ⲫ ⲫ","audio_text":"في","audio_url":"audio_coptic/22fi.mp3","correct_word":"• اسم الحرف: في (Ⲫ ⲫ)\n• نطق الحرف بالعربي: ف (F)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • يُنطق دائماً حرف فاء \"ف\" مثل حرف (F) في الإنجليزية.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲫⲟⲟⲩ\n  - القبطي المعرب (نطقها): «إفهو»\n  - المعنى بالعربية: اليوم / النهار\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":563,"lesson_id":114,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲫ واستمع لنطقه","coptic_display":"Ⲫ","audio_text":"في كابيتال","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":564,"lesson_id":114,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲫ واستمع لنطقه","coptic_display":"ⲫ","audio_text":"في سمول","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":565,"lesson_id":114,"type":"read_select","question":"ما هو نطق الحرف Ⲫ بالعربية؟","coptic_display":"Ⲫ","audio_text":"في","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4234,"challenge_id":565,"text":"خ أو ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4235,"challenge_id":565,"text":"واو طويلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4236,"challenge_id":565,"text":"ي/و","is_correct":false,"image_url":null,"audio_url":null},{"id":4237,"challenge_id":565,"text":"ف","is_correct":true,"image_url":null,"audio_url":null}]},{"id":566,"lesson_id":114,"type":"select","question":"ما معنى الكلمة القبطية: ⲫⲟⲟⲩ؟ (المعرب: «إفهو»)","coptic_display":"ⲫⲟⲟⲩ","audio_text":"إفهو","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4226,"challenge_id":566,"text":"الليل","is_correct":false,"image_url":null,"audio_url":null},{"id":4227,"challenge_id":566,"text":"غداً","is_correct":false,"image_url":null,"audio_url":null},{"id":4228,"challenge_id":566,"text":"أمس","is_correct":false,"image_url":null,"audio_url":null},{"id":4229,"challenge_id":566,"text":"اليوم / النهار","is_correct":true,"image_url":null,"audio_url":null}]},{"id":567,"lesson_id":114,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: اليوم / النهار (المعرب: «إفهو»)","coptic_display":"ⲫⲟⲟⲩ","audio_text":"إفهو","audio_url":"audio_coptic/22fi.mp3","correct_word":"ⲫⲟⲟⲩ","tiles":["ⲫ","ⲟ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":115,"unit_id":38,"title":"حرف خي (Ⲭ ⲭ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":568,"lesson_id":115,"type":"text_view","question":"نبذة عن حرف خي (Ⲭ ⲭ)","coptic_display":"Ⲭ ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":"• اسم الحرف: خي (كي) (Ⲭ ⲭ)\n• نطق الحرف بالعربي: ك أو ش أو خ\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له أكثر من نطق (له 3 أصوات (ك / ش / خ))\n• قواعد وحالات النطق:\n  1. يُنطق (ك): في الكلمات ذات الأصل القبطي.\n  2. يُنطق (ش): في الكلمات ذات الأصل اليوناني إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  3. يُنطق (خ): في الكلمات ذات الأصل اليوناني في باقي الحالات (إذا لم يأتِ بعده كسر).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲭⲣⲓⲥⲧⲟⲥ\n  - القبطي المعرب (نطقها): «خريستوس»\n  - المعنى بالعربية: المسيح\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":569,"lesson_id":115,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲭ واستمع لنطقه","coptic_display":"Ⲭ","audio_text":"خي كابيتال","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":570,"lesson_id":115,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲭ واستمع لنطقه","coptic_display":"ⲭ","audio_text":"خي سمول","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":571,"lesson_id":115,"type":"read_select","question":"ما هو نطق الحرف Ⲭ بالعربية؟","coptic_display":"Ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4222,"challenge_id":571,"text":"خ أو ك أو ش","is_correct":true,"image_url":null,"audio_url":null},{"id":4223,"challenge_id":571,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4224,"challenge_id":571,"text":"بـ+س","is_correct":false,"image_url":null,"audio_url":null},{"id":4225,"challenge_id":571,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":572,"lesson_id":115,"type":"select","question":"ما معنى الكلمة القبطية: ⲭⲣⲓⲥⲧⲟⲥ؟ (المعرب: «خريستوس»)","coptic_display":"ⲭⲣⲓⲥⲧⲟⲥ","audio_text":"خريستوس","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4238,"challenge_id":572,"text":"الملك","is_correct":false,"image_url":null,"audio_url":null},{"id":4239,"challenge_id":572,"text":"المخلص","is_correct":false,"image_url":null,"audio_url":null},{"id":4240,"challenge_id":572,"text":"المعلم","is_correct":false,"image_url":null,"audio_url":null},{"id":4241,"challenge_id":572,"text":"المسيح","is_correct":true,"image_url":null,"audio_url":null}]},{"id":573,"lesson_id":115,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: المسيح (المعرب: «خريستوس»)","coptic_display":"ⲭⲣⲓⲥⲧⲟⲥ","audio_text":"خريستوس","audio_url":"audio_coptic/23ki.mp3","correct_word":"ⲭⲣⲓⲥⲧⲟⲥ","tiles":["ⲭ","ⲣ","ⲓ","ⲥ","ⲧ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":116,"unit_id":38,"title":"حرف إبسي (Ⲯ ⲯ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":574,"lesson_id":116,"type":"text_view","question":"نبذة عن حرف إبسي (Ⲯ ⲯ)","coptic_display":"Ⲯ ⲯ","audio_text":"إبسي","audio_url":"audio_coptic/24psi.mp3","correct_word":"• اسم الحرف: إبسي (Ⲯ ⲯ)\n• نطق الحرف بالعربي: بـ + س (Ps)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف مركب يُنطق باء خفيفة وسين معاً (بـ + س = Ps) في مقطع صوتي واحد.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲯⲁⲗⲙⲟⲥ\n  - القبطي المعرب (نطقها): «بصالموس»\n  - المعنى بالعربية: مزمور\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":575,"lesson_id":116,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲯ واستمع لنطقه","coptic_display":"Ⲯ","audio_text":"إبسي كابيتال","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":576,"lesson_id":116,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲯ واستمع لنطقه","coptic_display":"ⲯ","audio_text":"إبسي سمول","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":577,"lesson_id":116,"type":"read_select","question":"ما هو نطق الحرف Ⲯ بالعربية؟","coptic_display":"Ⲯ","audio_text":"إبسي","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4232,"challenge_id":577,"text":"بـ + س","is_correct":true,"image_url":null,"audio_url":null},{"id":4230,"challenge_id":577,"text":"خ أو ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4231,"challenge_id":577,"text":"واو طويلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4233,"challenge_id":577,"text":"ج","is_correct":false,"image_url":null,"audio_url":null}]},{"id":578,"lesson_id":116,"type":"select","question":"ما معنى الكلمة القبطية: ⲯⲁⲗⲙⲟⲥ؟ (المعرب: «بصالموس»)","coptic_display":"ⲯⲁⲗⲙⲟⲥ","audio_text":"بصالموس","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4214,"challenge_id":578,"text":"ترنيمة","is_correct":false,"image_url":null,"audio_url":null},{"id":4215,"challenge_id":578,"text":"إنجيل","is_correct":false,"image_url":null,"audio_url":null},{"id":4216,"challenge_id":578,"text":"صلاة","is_correct":false,"image_url":null,"audio_url":null},{"id":4217,"challenge_id":578,"text":"مزمور","is_correct":true,"image_url":null,"audio_url":null}]},{"id":579,"lesson_id":116,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مزمور (المعرب: «بصالموس»)","coptic_display":"ⲯⲁⲗⲙⲟⲥ","audio_text":"بصالموس","audio_url":"audio_coptic/24psi.mp3","correct_word":"ⲯⲁⲗⲙⲟⲥ","tiles":["ⲯ","ⲁ","ⲗ","ⲙ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":117,"unit_id":38,"title":"حرف أوميغا (أو طويلة) (Ⲱ ⲱ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":580,"lesson_id":117,"type":"text_view","question":"نبذة عن حرف أوميغا (أو طويلة) (Ⲱ ⲱ)","coptic_display":"Ⲱ ⲱ","audio_text":"أوميغا (أو طويلة)","audio_url":"audio_coptic/25oo.mp3","correct_word":"• اسم الحرف: أوميغا (أو طويلة) (Ⲱ ⲱ)\n• نطق الحرف بالعربي: واو طويلة ممدودة (Ō)\n• تصنيف الحرف: نعم، حرف متحرك (متحرك للضم (طويل))\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • آخر الحروف المأخوذة من الأبجدية اليونانية. حرف متحرك للضم يُنطق واواً طويلة مفتوحة مشبعة ممدودة (Ō).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲱⲛϧ\n  - القبطي المعرب (نطقها): «أونخ»\n  - المعنى بالعربية: حياة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":581,"lesson_id":117,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲱ واستمع لنطقه","coptic_display":"Ⲱ","audio_text":"أوميغا (أو طويلة) كابيتال","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":582,"lesson_id":117,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲱ واستمع لنطقه","coptic_display":"ⲱ","audio_text":"أوميغا (أو طويلة) سمول","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":583,"lesson_id":117,"type":"read_select","question":"ما هو نطق الحرف Ⲱ بالعربية؟","coptic_display":"Ⲱ","audio_text":"أوميغا (أو طويلة)","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4246,"challenge_id":583,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4247,"challenge_id":583,"text":"بـ+س","is_correct":false,"image_url":null,"audio_url":null},{"id":4248,"challenge_id":583,"text":"واو طويلة ممدودة (Ō)","is_correct":true,"image_url":null,"audio_url":null},{"id":4249,"challenge_id":583,"text":"ف","is_correct":false,"image_url":null,"audio_url":null}]},{"id":584,"lesson_id":117,"type":"select","question":"ما معنى الكلمة القبطية: ⲱⲛϧ؟ (المعرب: «أونخ»)","coptic_display":"ⲱⲛϧ","audio_text":"أونخ","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4210,"challenge_id":584,"text":"فرح","is_correct":false,"image_url":null,"audio_url":null},{"id":4211,"challenge_id":584,"text":"سلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4212,"challenge_id":584,"text":"حياة","is_correct":true,"image_url":null,"audio_url":null},{"id":4213,"challenge_id":584,"text":"موت","is_correct":false,"image_url":null,"audio_url":null}]},{"id":585,"lesson_id":117,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: حياة (المعرب: «أونخ»)","coptic_display":"ⲱⲛϧ","audio_text":"أونخ","audio_url":"audio_coptic/25oo.mp3","correct_word":"ⲱⲛϧ","tiles":["ⲱ","ⲛ","ϧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":129,"unit_id":38,"title":"🔄 مراجعة الوحدة 5","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":648,"lesson_id":129,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲩ ⲩ","right":"إبسيلون (ي أو ڤ أو و)"},{"left":"Ⲫ ⲫ","right":"في (ف)"},{"left":"Ⲭ ⲭ","right":"خي (خ أو ك أو ش)"},{"left":"Ⲯ ⲯ","right":"إبسي (بـ + س (Ps))"}],"is_correct":true,"order_index":1,"options":[]},{"id":649,"lesson_id":129,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4206,"challenge_id":649,"text":"Ⲫ ⲫ (في)","is_correct":false,"image_url":null,"audio_url":null},{"id":4207,"challenge_id":649,"text":"Ⲭ ⲭ (خي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4208,"challenge_id":649,"text":"Ⲯ ⲯ (إبسي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4209,"challenge_id":649,"text":"Ⲩ ⲩ (إبسيلون)","is_correct":true,"image_url":null,"audio_url":null}]},{"id":650,"lesson_id":129,"type":"select","question":"ما معنى الكلمة: ⲫⲟⲟⲩ؟ (المعرب: «إفهو»)","coptic_display":"ⲫⲟⲟⲩ","audio_text":"إفهو","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4202,"challenge_id":650,"text":"اليوم / النهار","is_correct":true,"image_url":null,"audio_url":null},{"id":4203,"challenge_id":650,"text":"غداً","is_correct":false,"image_url":null,"audio_url":null},{"id":4204,"challenge_id":650,"text":"أمس","is_correct":false,"image_url":null,"audio_url":null},{"id":4205,"challenge_id":650,"text":"الليل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":651,"lesson_id":129,"type":"write","question":"رتب حروف الكلمة: حياة (المعرب: «أونخ»)","coptic_display":"ⲱⲛϧ","audio_text":"أونخ","audio_url":"audio_coptic/25oo.mp3","correct_word":"ⲱⲛϧ","tiles":["ⲱ","ⲛ","ϧ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":652,"lesson_id":129,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲭ؟","coptic_display":"Ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4218,"challenge_id":652,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null},{"id":4219,"challenge_id":652,"text":"بـ+س","is_correct":false,"image_url":null,"audio_url":null},{"id":4220,"challenge_id":652,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4221,"challenge_id":652,"text":"خ أو ك أو ش","is_correct":true,"image_url":null,"audio_url":null}]}]}]},{"id":39,"level_id":5,"title":"الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)","badge":"Ϣ-Ϫ","description":"الحروف الديموطيقية السبعة الخاصة باللغة المصرية القديمة","order_index":6,"lessons":[{"id":118,"unit_id":39,"title":"حرف شاي (Ϣ ϣ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":586,"lesson_id":118,"type":"text_view","question":"نبذة عن حرف شاي (Ϣ ϣ)","coptic_display":"Ϣ ϣ","audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":"• اسم الحرف: شاي (Ϣ ϣ)\n• نطق الحرف بالعربي: ش (Sh)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم، يُنطق دائماً حرف شين \"ش\".\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ϣⲏⲣⲓ\n  - القبطي المعرب (نطقها): «شيري»\n  - المعنى بالعربية: ابن / صبي\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":587,"lesson_id":118,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϣ واستمع لنطقه","coptic_display":"Ϣ","audio_text":"شاي كابيتال","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":588,"lesson_id":118,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϣ واستمع لنطقه","coptic_display":"ϣ","audio_text":"شاي سمول","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":589,"lesson_id":118,"type":"read_select","question":"ما هو نطق الحرف Ϣ بالعربية؟","coptic_display":"Ϣ","audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4258,"challenge_id":589,"text":"ش","is_correct":true,"image_url":null,"audio_url":null},{"id":4259,"challenge_id":589,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4260,"challenge_id":589,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4261,"challenge_id":589,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":590,"lesson_id":118,"type":"select","question":"ما معنى الكلمة القبطية: ϣⲏⲣⲓ؟ (المعرب: «شيري»)","coptic_display":"ϣⲏⲣⲓ","audio_text":"شيري","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4266,"challenge_id":590,"text":"بنت","is_correct":false,"image_url":null,"audio_url":null},{"id":4267,"challenge_id":590,"text":"رجل","is_correct":false,"image_url":null,"audio_url":null},{"id":4268,"challenge_id":590,"text":"شيخ","is_correct":false,"image_url":null,"audio_url":null},{"id":4269,"challenge_id":590,"text":"ابن / صبي","is_correct":true,"image_url":null,"audio_url":null}]},{"id":591,"lesson_id":118,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ابن / صبي (المعرب: «شيري»)","coptic_display":"ϣⲏⲣⲓ","audio_text":"شيري","audio_url":"audio_coptic/26shay.mp3","correct_word":"ϣⲏⲣⲓ","tiles":["ϣ","ⲏ","ⲣ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":119,"unit_id":39,"title":"حرف فاي (Ϥ ϥ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":592,"lesson_id":119,"type":"text_view","question":"نبذة عن حرف فاي (Ϥ ϥ)","coptic_display":"Ϥ ϥ","audio_text":"فاي","audio_url":"audio_coptic/27fay.mp3","correct_word":"• اسم الحرف: فاي (Ϥ ϥ)\n• نطق الحرف بالعربي: ف (F)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف فاء \"ف\".\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ϥⲱⲓ\n  - القبطي المعرب (نطقها): «فوي»\n  - المعنى بالعربية: شعر (شعر الرأس)\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":593,"lesson_id":119,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϥ واستمع لنطقه","coptic_display":"Ϥ","audio_text":"فاي كابيتال","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":594,"lesson_id":119,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϥ واستمع لنطقه","coptic_display":"ϥ","audio_text":"فاي سمول","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":595,"lesson_id":119,"type":"read_select","question":"ما هو نطق الحرف Ϥ بالعربية؟","coptic_display":"Ϥ","audio_text":"فاي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4262,"challenge_id":595,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4263,"challenge_id":595,"text":"ف","is_correct":true,"image_url":null,"audio_url":null},{"id":4264,"challenge_id":595,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4265,"challenge_id":595,"text":"ج","is_correct":false,"image_url":null,"audio_url":null}]},{"id":596,"lesson_id":119,"type":"select","question":"ما معنى الكلمة القبطية: ϥⲱⲓ؟ (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4278,"challenge_id":596,"text":"عين","is_correct":false,"image_url":null,"audio_url":null},{"id":4279,"challenge_id":596,"text":"قدم","is_correct":false,"image_url":null,"audio_url":null},{"id":4280,"challenge_id":596,"text":"شعر (شعر الرأس)","is_correct":true,"image_url":null,"audio_url":null},{"id":4281,"challenge_id":596,"text":"يد","is_correct":false,"image_url":null,"audio_url":null}]},{"id":597,"lesson_id":119,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شعر (شعر الرأس) (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":"ϥⲱⲓ","tiles":["ϥ","ⲱ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":120,"unit_id":39,"title":"حرف خاي (Ϧ ϧ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":598,"lesson_id":120,"type":"text_view","question":"نبذة عن حرف خاي (Ϧ ϧ)","coptic_display":"Ϧ ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":"• اسم الحرف: خاي (Ϧ ϧ)\n• نطق الحرف بالعربي: خ (Kh)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف خاء \"خ\".\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: Ϧⲏⲧ\n  - القبطي المعرب (نطقها): «خيت»\n  - المعنى بالعربية: قلب\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":599,"lesson_id":120,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϧ واستمع لنطقه","coptic_display":"Ϧ","audio_text":"خاي كابيتال","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":600,"lesson_id":120,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϧ واستمع لنطقه","coptic_display":"ϧ","audio_text":"خاي سمول","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":601,"lesson_id":120,"type":"read_select","question":"ما هو نطق الحرف Ϧ بالعربية؟","coptic_display":"Ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4250,"challenge_id":601,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4251,"challenge_id":601,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null},{"id":4252,"challenge_id":601,"text":"تش","is_correct":false,"image_url":null,"audio_url":null},{"id":4253,"challenge_id":601,"text":"خ","is_correct":true,"image_url":null,"audio_url":null}]},{"id":602,"lesson_id":120,"type":"select","question":"ما معنى الكلمة القبطية: ϧⲏⲧ؟ (المعرب: «خيت»)","coptic_display":"ϧⲏⲧ","audio_text":"خيت","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4294,"challenge_id":602,"text":"روح","is_correct":false,"image_url":null,"audio_url":null},{"id":4295,"challenge_id":602,"text":"جسد","is_correct":false,"image_url":null,"audio_url":null},{"id":4296,"challenge_id":602,"text":"قلب","is_correct":true,"image_url":null,"audio_url":null},{"id":4297,"challenge_id":602,"text":"عقل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":603,"lesson_id":120,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قلب (المعرب: «خيت»)","coptic_display":"ϧⲏⲧ","audio_text":"خيت","audio_url":"audio_coptic/28khay.mp3","correct_word":"ϧⲏⲧ","tiles":["ϧ","ⲏ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":121,"unit_id":39,"title":"حرف هوري (Ϩ ϩ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":604,"lesson_id":121,"type":"text_view","question":"نبذة عن حرف هوري (Ϩ ϩ)","coptic_display":"Ϩ ϩ","audio_text":"هوري","audio_url":"audio_coptic/29hory.mp3","correct_word":"• اسم الحرف: هوري (Ϩ ϩ)\n• نطق الحرف بالعربي: هـ (H)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف هاء \"هـ\".\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ϩⲱⲃ\n  - القبطي المعرب (نطقها): «هوب»\n  - المعنى بالعربية: عمل / شيء\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":605,"lesson_id":121,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϩ واستمع لنطقه","coptic_display":"Ϩ","audio_text":"هوري كابيتال","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":606,"lesson_id":121,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϩ واستمع لنطقه","coptic_display":"ϩ","audio_text":"هوري سمول","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":607,"lesson_id":121,"type":"read_select","question":"ما هو نطق الحرف Ϩ بالعربية؟","coptic_display":"Ϩ","audio_text":"هوري","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4270,"challenge_id":607,"text":"ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4271,"challenge_id":607,"text":"تـ+ي","is_correct":false,"image_url":null,"audio_url":null},{"id":4272,"challenge_id":607,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4273,"challenge_id":607,"text":"هـ","is_correct":true,"image_url":null,"audio_url":null}]},{"id":608,"lesson_id":121,"type":"select","question":"ما معنى الكلمة القبطية: ϩⲱⲃ؟ (المعرب: «هوب»)","coptic_display":"ϩⲱⲃ","audio_text":"هوب","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4282,"challenge_id":608,"text":"راحة","is_correct":false,"image_url":null,"audio_url":null},{"id":4283,"challenge_id":608,"text":"عمل / شيء","is_correct":true,"image_url":null,"audio_url":null},{"id":4284,"challenge_id":608,"text":"كلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4285,"challenge_id":608,"text":"فكر","is_correct":false,"image_url":null,"audio_url":null}]},{"id":609,"lesson_id":121,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: عمل / شيء (المعرب: «هوب»)","coptic_display":"ϩⲱⲃ","audio_text":"هوب","audio_url":"audio_coptic/29hory.mp3","correct_word":"ϩⲱⲃ","tiles":["ϩ","ⲱ","ⲃ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":122,"unit_id":39,"title":"حرف جانجا (Ϫ ϫ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":610,"lesson_id":122,"type":"text_view","question":"نبذة عن حرف جانجا (Ϫ ϫ)","coptic_display":"Ϫ ϫ","audio_text":"جانجا","audio_url":"audio_coptic/30ganga.mp3","correct_word":"• اسم الحرف: جانجا (Ϫ ϫ)\n• نطق الحرف بالعربي: جـ معطشة أو جـ غير معطشة\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له أكثر من نطق (له نطقان (جـ معطشة / جـ))\n• قواعد وحالات النطق:\n  1. يُنطق (جـ معطشة): إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  2. يُنطق (جـ غير معطشة): مثل الجيم المصرية في باقي الحالات.\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ϫⲱ\n  - القبطي المعرب (نطقها): «جو»\n  - المعنى بالعربية: رأس / يقول\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":611,"lesson_id":122,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϫ واستمع لنطقه","coptic_display":"Ϫ","audio_text":"جانجا كابيتال","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":612,"lesson_id":122,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϫ واستمع لنطقه","coptic_display":"ϫ","audio_text":"جانجا سمول","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":613,"lesson_id":122,"type":"read_select","question":"ما هو نطق الحرف Ϫ بالعربية؟","coptic_display":"Ϫ","audio_text":"جانجا","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4254,"challenge_id":613,"text":"تش","is_correct":false,"image_url":null,"audio_url":null},{"id":4255,"challenge_id":613,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null},{"id":4256,"challenge_id":613,"text":"تـ+ي","is_correct":false,"image_url":null,"audio_url":null},{"id":4257,"challenge_id":613,"text":"ج (معطشة أو غير معطشة)","is_correct":true,"image_url":null,"audio_url":null}]},{"id":614,"lesson_id":122,"type":"select","question":"ما معنى الكلمة القبطية: ϫⲱ؟ (المعرب: «جو»)","coptic_display":"ϫⲱ","audio_text":"جو","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4274,"challenge_id":614,"text":"عين","is_correct":false,"image_url":null,"audio_url":null},{"id":4275,"challenge_id":614,"text":"رأس / يقول","is_correct":true,"image_url":null,"audio_url":null},{"id":4276,"challenge_id":614,"text":"قدم","is_correct":false,"image_url":null,"audio_url":null},{"id":4277,"challenge_id":614,"text":"لسان","is_correct":false,"image_url":null,"audio_url":null}]},{"id":615,"lesson_id":122,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: رأس / يقول (المعرب: «جو»)","coptic_display":"ϫⲱ","audio_text":"جو","audio_url":"audio_coptic/30ganga.mp3","correct_word":"ϫⲱ","tiles":["ϫ","ⲱ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":130,"unit_id":39,"title":"🔄 مراجعة الوحدة 6","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":653,"lesson_id":130,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ϣ ϣ","right":"شاي (ش)"},{"left":"Ϥ ϥ","right":"فاي (ف)"},{"left":"Ϧ ϧ","right":"خاي (خ)"},{"left":"Ϩ ϩ","right":"هوري (هـ)"}],"is_correct":true,"order_index":1,"options":[]},{"id":654,"lesson_id":130,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4290,"challenge_id":654,"text":"Ϧ ϧ (خاي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4291,"challenge_id":654,"text":"Ϥ ϥ (فاي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4292,"challenge_id":654,"text":"Ϣ ϣ (شاي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4293,"challenge_id":654,"text":"Ϩ ϩ (هوري)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":655,"lesson_id":130,"type":"select","question":"ما معنى الكلمة: ϥⲱⲓ؟ (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4298,"challenge_id":655,"text":"عين","is_correct":false,"image_url":null,"audio_url":null},{"id":4299,"challenge_id":655,"text":"يد","is_correct":false,"image_url":null,"audio_url":null},{"id":4300,"challenge_id":655,"text":"شعر (شعر الرأس)","is_correct":true,"image_url":null,"audio_url":null},{"id":4301,"challenge_id":655,"text":"قدم","is_correct":false,"image_url":null,"audio_url":null}]},{"id":656,"lesson_id":130,"type":"write","question":"رتب حروف الكلمة: رأس / يقول (المعرب: «جو»)","coptic_display":"ϫⲱ","audio_text":"جو","audio_url":"audio_coptic/30ganga.mp3","correct_word":"ϫⲱ","tiles":["ϫ","ⲱ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":657,"lesson_id":130,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ϧ؟","coptic_display":"Ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4286,"challenge_id":657,"text":"خ","is_correct":true,"image_url":null,"audio_url":null},{"id":4287,"challenge_id":657,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4288,"challenge_id":657,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null},{"id":4289,"challenge_id":657,"text":"تش","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":40,"level_id":5,"title":"الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)","badge":"Ϭ-Ϯ","description":"ختام الأبجدية واختبار إتقان الـ 32 حرفاً القبطية بالكامل","order_index":7,"lessons":[{"id":123,"unit_id":40,"title":"حرف تشيما (Ϭ ϭ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":616,"lesson_id":123,"type":"text_view","question":"نبذة عن حرف تشيما (Ϭ ϭ)","coptic_display":"Ϭ ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":"• اسم الحرف: تشيما (Ϭ ϭ)\n• نطق الحرف بالعربي: تش (Tsh)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • حرف مصري ديموطيقي أصيل، يُنطق دائماً تاء وشين معاً (تش) مثل (Ch) في كلمة (church).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ϭⲟⲓⲥ\n  - القبطي المعرب (نطقها): «تشويس»\n  - المعنى بالعربية: رب / سيد\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":617,"lesson_id":123,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϭ واستمع لنطقه","coptic_display":"Ϭ","audio_text":"تشيما كابيتال","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":618,"lesson_id":123,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϭ واستمع لنطقه","coptic_display":"ϭ","audio_text":"تشيما سمول","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":619,"lesson_id":123,"type":"read_select","question":"ما هو نطق الحرف Ϭ بالعربية؟","coptic_display":"Ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4308,"challenge_id":619,"text":"تش","is_correct":true,"image_url":null,"audio_url":null},{"id":4306,"challenge_id":619,"text":"ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4307,"challenge_id":619,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4309,"challenge_id":619,"text":"تـ+ي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":620,"lesson_id":123,"type":"select","question":"ما معنى الكلمة القبطية: ϭⲟⲓⲥ؟ (المعرب: «تشويس»)","coptic_display":"ϭⲟⲓⲥ","audio_text":"تشويس","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4302,"challenge_id":620,"text":"رب / سيد","is_correct":true,"image_url":null,"audio_url":null},{"id":4303,"challenge_id":620,"text":"عبد","is_correct":false,"image_url":null,"audio_url":null},{"id":4304,"challenge_id":620,"text":"ملك","is_correct":false,"image_url":null,"audio_url":null},{"id":4305,"challenge_id":620,"text":"خادم","is_correct":false,"image_url":null,"audio_url":null}]},{"id":621,"lesson_id":123,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: رب / سيد (المعرب: «تشويس»)","coptic_display":"ϭⲟⲓⲥ","audio_text":"تشويس","audio_url":"audio_coptic/31chema.mp3","correct_word":"ϭⲟⲓⲥ","tiles":["ϭ","ⲟ","ⲓ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":124,"unit_id":40,"title":"حرف تي (Ϯ ϯ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":622,"lesson_id":124,"type":"text_view","question":"نبذة عن حرف تي (Ϯ ϯ)","coptic_display":"Ϯ ϯ","audio_text":"تي","audio_url":"audio_coptic/32tee.mp3","correct_word":"• اسم الحرف: تي (Ϯ ϯ)\n• نطق الحرف بالعربي: تـ + ي (Ti)\n• تصنيف الحرف: حرف ساكن (ليس من الحروف المتحركة)\n• عدد حالات النطق: له نطق واحد ثابت\n• قواعد وحالات النطق:\n  • الحرف الثاني والثلاثون، آخر حروف الأبجدية القبطية. مقطع صوتي ديموطيقي مركب يُنطق تاء متبوعة بكسرة ياء (تـ + ي = Ti).\n────────────────────\n• نبذة عن الكلمة التطبيقية على الحرف:\n  - الكلمة بالقبطية: ϯⲙⲓ\n  - القبطي المعرب (نطقها): «تيمي»\n  - المعنى بالعربية: قرية / بلدة\n  - النطق السماعي: اضغط على زر استماع الكلمة في التطبيق","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":623,"lesson_id":124,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϯ واستمع لنطقه","coptic_display":"Ϯ","audio_text":"تي كابيتال","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":624,"lesson_id":124,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϯ واستمع لنطقه","coptic_display":"ϯ","audio_text":"تي سمول","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":625,"lesson_id":124,"type":"read_select","question":"ما هو نطق الحرف Ϯ بالعربية؟","coptic_display":"Ϯ","audio_text":"تي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4317,"challenge_id":625,"text":"تـ + ي","is_correct":true,"image_url":null,"audio_url":null},{"id":4314,"challenge_id":625,"text":"تش","is_correct":false,"image_url":null,"audio_url":null},{"id":4315,"challenge_id":625,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null},{"id":4316,"challenge_id":625,"text":"خ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":626,"lesson_id":124,"type":"select","question":"ما معنى الكلمة القبطية: ϯⲙⲏⲓ؟ (المعرب: «تيمي»)","coptic_display":"ϯⲙⲏⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4318,"challenge_id":626,"text":"الباطل","is_correct":false,"image_url":null,"audio_url":null},{"id":4319,"challenge_id":626,"text":"الحق / العدل","is_correct":true,"image_url":null,"audio_url":null},{"id":4320,"challenge_id":626,"text":"السلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4321,"challenge_id":626,"text":"النعمة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":627,"lesson_id":124,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: الحق / العدل (المعرب: «تيمي»)","coptic_display":"ϯⲙⲏⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":"ϯⲙⲏⲓ","tiles":["ϯ","ⲙ","ⲏ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":131,"unit_id":40,"title":"🔄 مراجعة شاملة للأبجدية القبطية","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":658,"lesson_id":131,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ϭ ϭ","right":"تشيما (تش (Tsh))"},{"left":"Ϯ ϯ","right":"تي (تـ + ي (Ti))"}],"is_correct":true,"order_index":1,"options":[]},{"id":659,"lesson_id":131,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4338,"challenge_id":659,"text":"Ϯ ϯ (تي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4339,"challenge_id":659,"text":"Ϭ ϭ (تشيما)","is_correct":true,"image_url":null,"audio_url":null}]},{"id":660,"lesson_id":131,"type":"select","question":"ما معنى الكلمة: ϯⲙⲏⲓ؟ (المعرب: «تيمي»)","coptic_display":"ϯⲙⲏⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4334,"challenge_id":660,"text":"السلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4335,"challenge_id":660,"text":"الباطل","is_correct":false,"image_url":null,"audio_url":null},{"id":4336,"challenge_id":660,"text":"الحق / العدل","is_correct":true,"image_url":null,"audio_url":null},{"id":4337,"challenge_id":660,"text":"النعمة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":661,"lesson_id":131,"type":"write","question":"رتب حروف الكلمة: الحق / العدل (المعرب: «تيمي»)","coptic_display":"ϯⲙⲏⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":"ϯⲙⲏⲓ","tiles":["ϯ","ⲙ","ⲏ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":662,"lesson_id":131,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ϭ؟","coptic_display":"Ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4313,"challenge_id":662,"text":"تش","is_correct":true,"image_url":null,"audio_url":null},{"id":4310,"challenge_id":662,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4311,"challenge_id":662,"text":"تـ+ي","is_correct":false,"image_url":null,"audio_url":null},{"id":4312,"challenge_id":662,"text":"ج","is_correct":false,"image_url":null,"audio_url":null}]}]},{"id":132,"unit_id":40,"title":"🎓 الاختبار النهائي الشامل للمستوى الأول","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":663,"lesson_id":132,"type":"match","question":"صل الحرف بنطقه الصحيح بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲁ ⲁ","right":"ألفا (أ)"},{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"ⲭ ⲭ","right":"خي (خ/ك/ش)"},{"left":"Ϯ ϯ","right":"تي (تـ+ي)"}],"is_correct":true,"order_index":1,"options":[]},{"id":664,"lesson_id":132,"type":"listen","question":"استمع واختر الحرف الصحيح","coptic_display":null,"audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4326,"challenge_id":664,"text":"Ⲁ ⲁ (ألفا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4327,"challenge_id":664,"text":"Ⲃ ⲃ (فيدا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4328,"challenge_id":664,"text":"Ⲅ ⲅ (غاما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4329,"challenge_id":664,"text":"Ⲇ ⲇ (دلدا)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":665,"lesson_id":132,"type":"select","question":"ما معنى الكلمة القبطية: ⲛⲟⲩϯ؟ (المعرب: «نوتي»)","coptic_display":"ⲛⲟⲩϯ","audio_text":"نوتي","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4322,"challenge_id":665,"text":"السماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4323,"challenge_id":665,"text":"الكنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4324,"challenge_id":665,"text":"الله","is_correct":true,"image_url":null,"audio_url":null},{"id":4325,"challenge_id":665,"text":"الملاك","is_correct":false,"image_url":null,"audio_url":null}]},{"id":666,"lesson_id":132,"type":"select","question":"كم عدد حروف الأبجدية القبطية كاملة؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4330,"challenge_id":666,"text":"٣٢ حرفاً","is_correct":true,"image_url":null,"audio_url":null},{"id":4331,"challenge_id":666,"text":"٢٨ حرفاً","is_correct":false,"image_url":null,"audio_url":null},{"id":4332,"challenge_id":666,"text":"٢٦ حرفاً","is_correct":false,"image_url":null,"audio_url":null},{"id":4333,"challenge_id":666,"text":"٣٠ حرفاً","is_correct":false,"image_url":null,"audio_url":null}]},{"id":667,"lesson_id":132,"type":"write","question":"رتب حروف الكلمة القبطية: ولد (المعرب: «أَلو») [ⲁⲗⲟⲩ]","coptic_display":"ⲁⲗⲟⲩ","audio_text":"أَلو","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲁⲗⲟⲩ","tiles":["ⲁ","ⲗ","ⲟ","ⲩ"],"pairs":null,"is_correct":true,"order_index":5,"options":[]}]}]}],"chests":[{"id":"chest_unit_1","level_id":5,"unit_id":34,"title":"🎁 صندوق كنز الوحدة 1","description":"مكافأة إتمام دروس ومراجعة الوحدة 1","placement_type":"unit_end","after_lesson_id":125,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-11T10:25:43.11593+00:00"},{"id":"chest_unit_2","level_id":5,"unit_id":35,"title":"🎁 صندوق كنز الوحدة 2","description":"مكافأة إتمام دروس ومراجعة الوحدة 2","placement_type":"unit_end","after_lesson_id":126,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-11T10:25:48.431376+00:00"},{"id":"chest_unit_3","level_id":5,"unit_id":36,"title":"🎁 صندوق كنز الوحدة 3","description":"مكافأة إتمام دروس ومراجعة الوحدة 3","placement_type":"unit_end","after_lesson_id":127,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-11T10:25:55.073824+00:00"},{"id":"chest_unit_4","level_id":5,"unit_id":37,"title":"🎁 صندوق كنز الوحدة 4","description":"مكافأة إتمام دروس ومراجعة الوحدة 4","placement_type":"unit_end","after_lesson_id":128,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-11T10:26:03.070018+00:00"},{"id":"chest_unit_5","level_id":5,"unit_id":38,"title":"🎁 صندوق كنز الوحدة 5","description":"مكافأة إتمام دروس ومراجعة الوحدة 5","placement_type":"unit_end","after_lesson_id":129,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-11T10:26:11.17935+00:00"},{"id":"chest_unit_6","level_id":5,"unit_id":39,"title":"🎁 صندوق كنز الوحدة 6","description":"مكافأة إتمام دروس ومراجعة الوحدة 6","placement_type":"unit_end","after_lesson_id":130,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-11T10:26:21.28979+00:00"},{"id":"chest_unit_7","level_id":5,"unit_id":40,"title":"🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول","description":"تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!","placement_type":"unit_end","after_lesson_id":131,"xp_mode":"fixed","xp_min":50,"xp_max":50,"hearts":3,"has_badge":true,"badge_title":"متقن الأبجدية القبطية","badge_icon":"trophy","badge_desc":"أتممت المستوى الأول للأبجدية القبطية كاملاً (٣٢ حرفاً)","order_index":0,"created_at":"2026-09-11T10:26:28.011637+00:00"}]};

  /* ============ WEB AUDIO SOUND SYNTHESIZER (مطابق بنسبة 100% لأصوات الموقع) ============ */
  const PreviewSound = {
    ctx: null,
    _init(){
      if(!this.ctx){
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if(AudioCtx) this.ctx = new AudioCtx();
      }
      if(this.ctx && this.ctx.state === 'suspended'){
        this.ctx.resume().catch(()=>{});
      }
    },
    _lastSoundTimes: new Map(),
    _shouldDebounce(soundName, cooldownMs = 250) {
      const now = Date.now();
      const last = this._lastSoundTimes.get(soundName) || 0;
      if (now - last < cooldownMs) return true;
      this._lastSoundTimes.set(soundName, now);
      return false;
    },
    playClick(){
      // ملغى نهائياً بناءً على رغبة المستخدم
    },
    playCorrect(){
      if (this._shouldDebounce('correct', 250)) return;
      try {
        this._init();
        if(!this.ctx) return;
        const now = this.ctx.currentTime;
        // نغمة نجاح ثنائية فائقة السرعة والمرح (F5 -> A5)
        [698.46, 880.00].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.22, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.23);
        });
      } catch(e){}
    },
    playWrong(){
      if (this._shouldDebounce('wrong', 250)) return;
      try {
        this._init();
        if(!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.23);
      } catch(e){}
    },
    playVictory(){
      if (this._shouldDebounce('victory', 500)) return;
      try {
        this._init();
        if(!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        const times = [0, 0.12, 0.24, 0.38];
        const durs  = [0.15, 0.15, 0.18, 0.60];
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + times[i]);
          gain.gain.setValueAtTime(0.22, now + times[i]);
          gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + durs[i]);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + times[i]);
          osc.stop(now + times[i] + durs[i]);
        });
      } catch(e){}
    },
    speakArabic(text, onEnded = null){
      if(!text){
        if(typeof onEnded === 'function') onEnded();
        return;
      }
      const clean = String(text).trim();
      if(!clean){
        if(typeof onEnded === 'function') onEnded();
        return;
      }

      let finished = false;
      const done = () => {
        if(!finished){
          finished = true;
          if(typeof onEnded === 'function') onEnded();
        }
      };

      try {
        if(!('speechSynthesis' in window)){
          done();
          return;
        }
        const synth = window.speechSynthesis;
        if(synth.paused) synth.resume();
        synth.cancel();

        const u = new SpeechSynthesisUtterance(clean);
        u.rate = 0.9;
        u.pitch = 1.0;
        u.lang = 'ar-EG';

        const voices = synth.getVoices ? synth.getVoices() : [];
        if(voices && voices.length > 0){
          const arVoice = voices.find(v => v.lang && (v.lang.startsWith('ar') || v.lang.includes('Arabic'))) ||
                          voices.find(v => v.name && (v.name.includes('Arabic') || v.name.includes('عربي') || v.name.includes('Hoda') || v.name.includes('Salma') || v.name.includes('Tarik') || v.name.includes('Maged') || v.name.includes('Laila')));
          if(arVoice){
            u.voice = arVoice;
            u.lang = arVoice.lang;
          }
        }

        u.onend = done;
        u.onerror = done;
        synth.speak(u);
      } catch(err){
        console.warn('Speech synthesis error:', err);
        done();
      }
    }
  };

  let previewState = {
    active: false,
    lessonId: null,
    challenges: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    selectedAnswerIndex: null,
    isAnswered: false,
    isCorrect: false,
    deviceMode: 'desktop',
    selectedTiles: [],
    availableTiles: [],
    matchedPairKeys: [],
    selectedMatchLeft: null,
    selectedMatchRight: null,
    matchLeftItems: [],
    matchRightItems: [],
    matchInitializedFor: -1
  };

  /* ============ UNDO & REDO HISTORY STACK ============ */
  let undoStack = [];
  let redoStack = [];
  const MAX_HISTORY = 50;

  function pushHistorySnapshot(){
    if(!curriculumData) return;
    try {
      const snap = JSON.stringify(curriculumData);
      if(undoStack.length > 0 && undoStack[undoStack.length - 1] === snap){
        return;
      }
      undoStack.push(snap);
      if(undoStack.length > MAX_HISTORY){
        undoStack.shift();
      }
      redoStack = [];
      updateHistoryButtons();
    } catch(e){}
  }

  function updateHistoryButtons(){
    const undoBtn = document.getElementById('btn-curriculum-undo');
    const redoBtn = document.getElementById('btn-curriculum-redo');
    if(undoBtn){
      undoBtn.disabled = (undoStack.length === 0);
    }
    if(redoBtn){
      redoBtn.disabled = (redoStack.length === 0);
    }
  }

  function undo(){
    if(undoStack.length === 0){
      toast('لا توجد خطوات سابقة للتراجع عنها');
      return;
    }
    try {
      const currentSnap = JSON.stringify(curriculumData);
      redoStack.push(currentSnap);
      if(redoStack.length > MAX_HISTORY) redoStack.shift();

      const prevSnap = undoStack.pop();
      curriculumData = JSON.parse(prevSnap);
      normalizeCurriculumData();
      saveLocal(true);
      renderCurrentView();
      updateHistoryButtons();
      toast('تم التراجع عن آخر خطوة');
    } catch(e){
      console.error('Undo failed:', e);
    }
  }

  function redo(){
    if(redoStack.length === 0){
      toast('لا توجد خطوات لاحقة لإعادتها');
      return;
    }
    try {
      const currentSnap = JSON.stringify(curriculumData);
      undoStack.push(currentSnap);
      if(undoStack.length > MAX_HISTORY) undoStack.shift();

      const nextSnap = redoStack.pop();
      curriculumData = JSON.parse(nextSnap);
      normalizeCurriculumData();
      saveLocal(true);
      renderCurrentView();
      updateHistoryButtons();
      toast('تم إعادة تطبيق الخطوة');
    } catch(e){
      console.error('Redo failed:', e);
    }
  }

  /* ============ SVG ICONS SYSTEM (LUCIDE-STYLE PURE SVG) ============ */
  const SVG = {
    trophy: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 4h16v7a8 8 0 0 1-8 8 8 8 0 0 1-8-8V4z"/><path d="M12 19v3"/><path d="M8 22h8"/></svg>',
    crown: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="vertical-align:middle; display:inline-block;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    gem: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polygon points="6 3 18 3 22 9 12 22 2 9"/></svg>',
    gift: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    book: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    bookOpen: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    target: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    zap: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:middle; display:inline-block;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:middle; display:inline-block;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    volume2: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    audio: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    playCircle: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" style="vertical-align:middle; display:inline-block;"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    gripVertical: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block; cursor:grab;"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
    edit: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polyline points="18 15 12 9 6 15"/></svg>',
    arrowDown: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polyline points="6 9 12 15 18 9"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polyline points="20 6 9 17 4 12"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    save: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    alert: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    heart: '<svg viewBox="0 0 24 24" width="18" height="18" fill="#FF4B4B" stroke="#FF4B4B" stroke-width="1" style="vertical-align:middle; display:inline-block;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  };

  /* ============ TEMP ID HELPER ============ */
  function isTempId(id){
    return typeof id === 'string' && id.startsWith('temp_');
  }

  function generateTempId(prefix){
    return `temp_${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  function getBadgeIcon(badgeStr, defaultSvg){
    if(!badgeStr) return defaultSvg || SVG.trophy;
    const s = String(badgeStr).trim();
    if(s.startsWith('data:image/') || s.startsWith('http://') || s.startsWith('https://') || s.startsWith('blob:') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(s)){
      return `<img src="${s}" alt="شارة" style="width:42px;height:42px;min-width:42px;min-height:42px;object-fit:cover;border-radius:10px;display:block;" />`;
    }
    if(s === '🏆' || s === 'trophy' || s === 'كأس') return SVG.trophy;
    if(s === '👑' || s === 'crown' || s === 'تاج') return SVG.crown;
    if(s === '⭐' || s === '🌟' || s === 'star' || s === 'نجمة') return SVG.star;
    if(s === '💎' || s === 'gem' || s === 'جوهرة') return SVG.gem;
    if(s === '🛡️' || s === 'shield' || s === 'درع') return SVG.shield;
    if(s === '⚡' || s === 'zap' || s === 'طاقة') return SVG.zap;
    if(s === '🎯' || s === 'target' || s === 'هدف') return SVG.target;
    if(s === '📚' || s === '📖' || s === 'book' || s === 'كتاب') return SVG.book;
    if(s.length > 0){
      let fontSize = '1.3rem';
      if(s.length > 10) fontSize = '0.72rem';
      else if(s.length > 6) fontSize = '0.82rem';
      else if(s.length > 3) fontSize = '0.92rem';
      else if(s.length > 2) fontSize = '1.05rem';
      return `<span style="display:inline-flex;align-items:center;justify-content:center;font-size:${fontSize};font-weight:800;line-height:1.1;white-space:nowrap;padding:0 2px;">${escapeHtml(s)}</span>`;
    }
    return defaultSvg || SVG.trophy;
  }

  /* ============ AUDIO HELPER & CANDIDATE RESOLUTION ============ */
  let _currentPlayingAudio = null;
  let _currentActiveAudioBtn = null;
  let _currentAudioTimeout = null;

  const COPTIC_PRONUNCIATION_MAP = {
    'Ⲁ': 'ألفا', 'ⲁ': 'ألفا',
    'Ⲃ': 'فيدا', 'ⲃ': 'فيدا',
    'Ⲅ': 'غاما', 'ⲅ': 'غاما',
    'Ⲇ': 'دلدا', 'ⲇ': 'دلدا',
    'Ⲉ': 'إي', 'ⲉ': 'إي',
    'Ⲋ': 'سو', 'ⲋ': 'سو',
    'Ⲍ': 'زيتا', 'ⲍ': 'زيتا',
    'Ⲏ': 'إيتا', 'ⲏ': 'إيتا',
    'Ⲑ': 'تيتا', 'ⲑ': 'تيتا',
    'Ⲓ': 'يوطا', 'ⲓ': 'يوطا',
    'Ⲕ': 'كبا', 'ⲕ': 'كبا',
    'Ⲗ': 'لافلا', 'ⲗ': 'لافلا',
    'Ⲙ': 'مي', 'ⲙ': 'مي',
    'Ⲛ': 'ني', 'ⲛ': 'ني',
    'Ⲝ': 'إكسي', 'ⲝ': 'إكسي',
    'Ⲟ': 'أو قصيرة', 'ⲟ': 'أو قصيرة',
    'Ⲡ': 'بي', 'ⲡ': 'بي',
    'Ⲣ': 'رو', 'ⲣ': 'رو',
    'Ⲥ': 'سيما', 'ⲥ': 'سيما',
    'Ⲧ': 'تاف', 'ⲧ': 'تاف',
    'Ⲩ': 'إبسيلون', 'ⲩ': 'إبسيلون',
    'Ⲫ': 'في', 'ⲫ': 'في',
    'Ⲭ': 'كي', 'ⲭ': 'كي',
    'Ⲯ': 'بسي', 'ⲯ': 'بسي',
    'Ⲱ': 'أوميجا', 'ⲱ': 'أوميجا',
    'Ϣ': 'شاي', 'ϣ': 'شاي',
    'Ϥ': 'فاي', 'ϥ': 'فاي',
    'Ϧ': 'خاي', 'ϧ': 'خاي',
    'Ϩ': 'هوري', 'ϩ': 'هوري',
    'Ϫ': 'جانجا', 'ϫ': 'جانجا',
    'Ϭ': 'تشيما', 'ϭ': 'تشيما',
    'Ϯ': 'تي', 'ϯ': 'تي'
  };

  function getCopticNameFallback(str){
    if(!str) return '';
    const clean = String(str).trim();
    for(const ch of clean){
      if(COPTIC_PRONUNCIATION_MAP[ch]){
        return COPTIC_PRONUNCIATION_MAP[ch];
      }
    }
    return clean;
  }

  function stopAudioSnippet(){
    if(_currentAudioTimeout){
      clearTimeout(_currentAudioTimeout);
      _currentAudioTimeout = null;
    }
    if(_currentPlayingAudio){
      try {
        _currentPlayingAudio.pause();
        _currentPlayingAudio.currentTime = 0;
      } catch(e){}
      _currentPlayingAudio = null;
    }
    if('speechSynthesis' in window){
      try { window.speechSynthesis.cancel(); } catch(e){}
    }
    if(_currentActiveAudioBtn){
      _currentActiveAudioBtn.classList.remove('is-playing');
      _currentActiveAudioBtn = null;
    }
  }

  async function playAudioSnippet(urlOrText, spokenTextFallback, btnEl = null){
    // إذا كان الصوت شغال بالفعل على نفس الزر، يتم إيقافه
    const isCurrentlyActive = btnEl && _currentActiveAudioBtn === btnEl && (
      _currentPlayingAudio || ('speechSynthesis' in window && window.speechSynthesis.speaking)
    );
    if(isCurrentlyActive){
      stopAudioSnippet();
      toast('تم إيقاف الصوت');
      return;
    }

    stopAudioSnippet();
    PreviewSound.playClick();

    const cleanPrimary = String(urlOrText || '').trim();
    const fallbackText = String(spokenTextFallback || '').trim();

    const setButtonPlaying = () => {
      if(btnEl){
        _currentActiveAudioBtn = btnEl;
        btnEl.classList.add('is-playing');
      }
    };

    const resetButton = () => {
      if(btnEl){
        btnEl.classList.remove('is-playing');
        if(_currentActiveAudioBtn === btnEl) _currentActiveAudioBtn = null;
      }
      _currentPlayingAudio = null;
    };

    let candidates = [];
    if(typeof resolveAudioCandidates === 'function'){
      try { candidates = resolveAudioCandidates(cleanPrimary); } catch(e){}
      if((!candidates || candidates.length === 0) && fallbackText){
        try { candidates = resolveAudioCandidates(fallbackText); } catch(e){}
      }
    }

    const hasMappedAudio = (typeof LOCAL_AUDIO_MAP !== 'undefined' && (
      LOCAL_AUDIO_MAP[cleanPrimary] ||
      LOCAL_AUDIO_MAP[cleanPrimary.toLowerCase()] ||
      (fallbackText && (LOCAL_AUDIO_MAP[fallbackText] || LOCAL_AUDIO_MAP[fallbackText.toLowerCase()]))
    ));

    const isAudioUrl = Boolean(
      hasMappedAudio ||
      (candidates && candidates.length > 0) ||
      cleanPrimary.startsWith('http://') ||
      cleanPrimary.startsWith('https://') ||
      cleanPrimary.startsWith('data:audio') ||
      cleanPrimary.startsWith('audio/') ||
      cleanPrimary.startsWith('audio_coptic/') ||
      cleanPrimary.startsWith('assets/sounds/') ||
      /\.(mp3|wav|ogg|m4a|aac|webm)(\?|$)/i.test(cleanPrimary) ||
      /drive\.google\.com|dropbox\.com|1drv\.ms|docs\.google\.com|supabase\.co/i.test(cleanPrimary)
    );

    if(isAudioUrl){
      setButtonPlaying();

      if(!candidates || candidates.length === 0){
        candidates = [cleanPrimary];
      }

      // 2. تجربة تشغيل المرشحات بالتتابع (الأولوية القصوى للملفات المحلية دون أي تأخير)
      let playedOk = false;
      for(let i = 0; i < candidates.length; i++){
        const candidateUrl = candidates[i];
        if(!candidateUrl) continue;
        try {
          const success = await new Promise((resolve) => {
            const audio = new Audio();
            _currentPlayingAudio = audio;
            let settled = false;

            const handleSuccess = () => {
              if(!settled){
                settled = true;
                if(_currentAudioTimeout) clearTimeout(_currentAudioTimeout);
                resolve(true);
              }
            };
            const handleFail = () => {
              if(!settled){
                settled = true;
                if(_currentAudioTimeout) clearTimeout(_currentAudioTimeout);
                try { audio.pause(); audio.src = ''; } catch(e){}
                resolve(false);
              }
            };

            audio.addEventListener('playing', handleSuccess, { once: true });
            audio.addEventListener('error', handleFail, { once: true });
            audio.addEventListener('ended', () => {
              resetButton();
            }, { once: true });

            audio.src = candidateUrl;
            const playPromise = audio.play();
            if(playPromise !== undefined){
              playPromise.then(handleSuccess).catch(handleFail);
            }

            _currentAudioTimeout = setTimeout(() => {
              if(!settled){
                if(audio.paused && audio.readyState < 2){
                  handleFail();
                } else {
                  handleSuccess();
                }
              }
            }, 1200);
          });

          if(success){
            playedOk = true;
            break;
          }
        } catch(err){
          console.warn('Candidate playback failed:', candidateUrl, err);
        }
      }

      // 3. في حال فشل الروابط، نلجأ للنطق الصوتي الآلي البديل إن وجد نص
      if(!playedOk){
        if(fallbackText){
          PreviewSound.speakArabic(fallbackText, () => resetButton());
        } else {
          resetButton();
          toast('تعذر تشغيل الملف الصوتي — تأكد من وجود الملف محلياً أو صحة الرابط', true);
        }
      }
    } else if(cleanPrimary || fallbackText){
      // تشغيل النطق الصوتي المباشر للنص
      setButtonPlaying();
      toast('جارٍ تشغيل النطق الصوتي...');
      PreviewSound.speakArabic(cleanPrimary || fallbackText, () => resetButton());
    } else {
      toast('لا يوجد رابط صوت أو نص نطق لاختباره — أدخل رابطاً أو اكتب نصاً أولاً', true);
    }
  }

  /* ============ DATA INITIALIZATION & SUPABASE-FIRST ARCHITECTURE ============ */
  function init(){
    // 1. Load initial cached curriculum for instant render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if(stored){
        curriculumData = JSON.parse(stored);
        if(!curriculumData || !Array.isArray(curriculumData.units) || curriculumData.units.length === 0){
          curriculumData = JSON.parse(JSON.stringify(DEFAULT_SEEDED_CURRICULUM));
        }
      }
    } catch(e){
      console.warn('Could not parse curriculum from localStorage:', e);
    }

    const defaultCurriculum = (typeof DEFAULT_SEEDED_CURRICULUM !== 'undefined' ? DEFAULT_SEEDED_CURRICULUM : (typeof DEFAULT_CURRICULUM !== 'undefined' ? DEFAULT_CURRICULUM : (window.DEFAULT_CURRICULUM || (window.GamificationService && window.GamificationService.DEFAULT_CURRICULUM))));

    const hasUnits = curriculumData && Array.isArray(curriculumData.units) && curriculumData.units.length > 0;

    if((!curriculumData || !hasUnits) && defaultCurriculum){
      curriculumData = JSON.parse(JSON.stringify(defaultCurriculum));
    } else if(!curriculumData){
      curriculumData = {
        levels: [
          { id: 1, title: 'المستوى 1: الأبجدية القبطية (اللهجة البحيرية)', description: 'تعلّم نطق وكتابة وقراءة جميع الحروف القبطية الـ 32 من خلال 7 وحدات تدريبية ممتعة.', order_index: 1 }
        ],
        units: []
      };
    }

    normalizeCurriculumData();
    wireHeaderEvents();
    renderLevelsOverview();
    refreshStats();
    updateHistoryButtons();

    // 2. Supabase-First: Async load from Supabase if connected
    if(window.sb){
      loadCurriculumFromSupabase();
    }
  }

  function normalizeCurriculumData(){
    if(!curriculumData) curriculumData = {};
    if(!curriculumData.levels || !Array.isArray(curriculumData.levels) || curriculumData.levels.length === 0){
      if(curriculumData.level && typeof curriculumData.level === 'object'){
        curriculumData.levels = [ curriculumData.level ];
      } else {
        curriculumData.levels = [
          { id: 1, title: 'المستوى 1: الأبجدية القبطية (اللهجة البحيرية)', description: 'تعلّم نطق وكتابة وقراءة جميع الحروف القبطية الـ 32 من خلال 7 وحدات تدريبية ممتعة.', order_index: 1 }
        ];
      }
    }

    if(!curriculumData.units || !Array.isArray(curriculumData.units)){
      curriculumData.units = [];
    }

    if(!curriculumData.chests || !Array.isArray(curriculumData.chests)){
      curriculumData.chests = [];
    }
    curriculumData.chests.forEach((c, idx) => {
      c.id = c.id || ('chest_' + Date.now() + '_' + idx);
      c.title = c.title || 'صندوق المكافأة السري';
      c.description = c.description || 'أحسنت وصولاً إلى هذه المحطة! إليك هديتك التشجيعية:';
      c.level_id = c.level_id || (curriculumData.levels[0] ? curriculumData.levels[0].id : 5);
      c.placement_type = c.placement_type || 'after_lesson';
      c.hearts = (c.hearts !== undefined && c.hearts !== null && !isNaN(parseInt(c.hearts, 10))) ? parseInt(c.hearts, 10) : 1;
      c.xp_mode = c.xp_mode || 'fixed';
      c.xp_min = (c.xp_min !== undefined && c.xp_min !== null && !isNaN(parseInt(c.xp_min, 10))) ? parseInt(c.xp_min, 10) : 10;
      c.xp_max = (c.xp_max !== undefined && c.xp_max !== null && !isNaN(parseInt(c.xp_max, 10))) ? parseInt(c.xp_max, 10) : c.xp_min;
      c.has_badge = !!c.has_badge;
      c.badge_title = c.badge_title || '';
      c.badge_icon = c.badge_icon || 'trophy';
      c.badge_desc = c.badge_desc || '';
    });

    // Dynamic Level XP calculation from lessons and chests
    curriculumData.levels.forEach((lvl, idx) => {
      lvl.order_index = lvl.order_index || (idx + 1);
      const levelUnits = curriculumData.units.filter(u => String(u.level_id) === String(lvl.id));
      let totalXp = 0;
      levelUnits.forEach(u => {
        (u.lessons || []).forEach(l => {
          totalXp += (parseInt(l.xp_reward, 10) || 0);
        });
      });
      const levelChests = (curriculumData.chests || []).filter(c => String(c.level_id) === String(lvl.id) || (c.unit_id && levelUnits.some(u => String(u.id) === String(c.unit_id))));
      levelChests.forEach(c => {
        totalXp += (parseInt(c.xp_min, 10) || 0);
      });
      lvl.xp_reward = totalXp;
    }); // Dynamic Level XP calculation from lessons (No static fake XP)
    curriculumData.levels.forEach((lvl, idx) => {
      lvl.order_index = lvl.order_index || (idx + 1);
      const levelUnits = curriculumData.units.filter(u => String(u.level_id) === String(lvl.id));
      let totalXp = 0;
      levelUnits.forEach(u => {
        (u.lessons || []).forEach(l => {
          totalXp += (parseInt(l.xp_reward, 10) || 0);
        });
      });
      lvl.xp_reward = totalXp;
    });

    curriculumData.levels.sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    curriculumData.level = curriculumData.levels[0];

    // Normalize units, lessons, challenges
    curriculumData.units.forEach((u, uIdx) => {
      u.order_index = u.order_index || (uIdx + 1);
      if(!u.lessons || !Array.isArray(u.lessons)) u.lessons = [];
      u.lessons.forEach((l, lIdx) => {
        l.order_index = l.order_index || (lIdx + 1);
        l.xp_reward = (l.xp_reward !== undefined && l.xp_reward !== null && !isNaN(parseInt(l.xp_reward, 10))) ? parseInt(l.xp_reward, 10) : 5;
        if(!l.challenges || !Array.isArray(l.challenges)) l.challenges = [];
        l.challenges.forEach((c, cIdx) => {
          c.order_index = c.order_index || (cIdx + 1);
          if(!c.options || !Array.isArray(c.options)) c.options = [];
        });
        l.challenges.sort((a, b) => (a.order_index || 1) - (b.order_index || 1));
      });
      u.lessons.sort((a, b) => (a.order_index || 1) - (b.order_index || 1));
    });
    // ترتيب الوحدات أولاً حسب ترتيب المستوى ثم ترتيب الوحدة داخل مستواها
    const levelOrderMap = new Map();
    (curriculumData.levels || []).forEach(lvl => {
      levelOrderMap.set(String(lvl.id), lvl.order_index || 1);
    });
    curriculumData.units.sort((a, b) => {
      const lvlA = levelOrderMap.get(String(a.level_id)) ?? 999;
      const lvlB = levelOrderMap.get(String(b.level_id)) ?? 999;
      if (lvlA !== lvlB) return lvlA - lvlB;
      return (a.order_index || 1) - (b.order_index || 1);
    });
  }

  function getLevels(){
    normalizeCurriculumData();
    return curriculumData.levels || [];
  }

  function saveLocal(isDirty = true){
    if(!curriculumData) return;
    normalizeCurriculumData();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculumData));
      localStorage.setItem('mg_coptic_curriculum_v1', JSON.stringify(curriculumData));
      localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());

      if(window.MGCopticGame && typeof window.MGCopticGame.broadcastUpdate === 'function'){
        window.MGCopticGame.broadcastUpdate('curriculum', curriculumData);
      }
      if(typeof window !== 'undefined'){
        window.dispatchEvent(new CustomEvent('coptic_curriculum_updated', { detail: curriculumData }));
      }

      if(isDirty){
        window._isCurriculumDirty = true;
        localStorage.setItem('mg_coptic_curriculum_dirty', 'true');
      } else {
        window._isCurriculumDirty = false;
        localStorage.removeItem('mg_coptic_curriculum_dirty');
      }
      if(typeof updateDirtyCounter === 'function') updateDirtyCounter();
    } catch(e){
      console.error('Failed to save curriculum to localStorage:', e);
    }
  }

  /* ============ ASYNC LOAD FROM SUPABASE (SINGLE SOURCE OF TRUTH) ============ */
  async function loadCurriculumFromSupabase(){
    if(!window.sb) return;
    try {
      const { data: levelsData, error: lErr } = await sb.from('levels').select('*').order('order_index');
      if(lErr){
        console.warn('Could not fetch levels from Supabase:', lErr.message);
        return;
      }
      if(!levelsData || levelsData.length === 0){
        return;
      }

      const { data: unitsData } = await sb.from('units').select('*').order('order_index');
      const { data: lessonsData } = await sb.from('lessons').select('*').order('order_index');
      const { data: challengesData } = await sb.from('challenges').select('*').order('order_index');
      const { data: optionsData } = await sb.from('challenge_options').select('*');
      const { data: chestsData } = await sb.from('chests').select('*').order('created_at');

      const builtUnits = (unitsData || []).map(u => {
        const uLessons = (lessonsData || []).filter(l => String(l.unit_id) === String(u.id)).map(l => {
          const lChallenges = (challengesData || []).filter(c => String(c.lesson_id) === String(l.id)).map(c => {
            const cOpts = (optionsData || []).filter(o => String(o.challenge_id) === String(c.id));
            return { ...c, options: cOpts };
          });
          return { ...l, challenges: lChallenges };
        });
        return { ...u, lessons: uLessons };
      });

      // Maintain chests from Supabase, or fallback to local cache if offline/empty
      let finalChests = [];
      if (Array.isArray(chestsData) && chestsData.length > 0) {
        finalChests = chestsData;
      } else if (curriculumData && Array.isArray(curriculumData.chests) && curriculumData.chests.length > 0) {
        finalChests = curriculumData.chests;
      } else {
        try {
          const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem('mg_coptic_curriculum_v1') || '{}');
          if (Array.isArray(cached.chests)) finalChests = cached.chests;
        } catch(e){}
      }

      curriculumData = {
        levels: levelsData,
        level: levelsData[0],
        units: builtUnits,
        chests: finalChests
      };

      normalizeCurriculumData();
      saveLocal(false);
      renderCurrentView();
      refreshStats();
    } catch(e){
      console.warn('Supabase curriculum load failed, using cache:', e);
    }
  }
  window.loadCurriculumFromSupabase = loadCurriculumFromSupabase;

  /* ============ WIRE HEADER & GLOBAL BUTTONS ============ */
  function wireHeaderEvents(){
    const addBtn = document.getElementById('btn-add-curriculum-item');
    if(addBtn) addBtn.onclick = handleAddButtonClick;

    const addChestBtn = document.getElementById('btn-add-chest-level');
    if(addChestBtn) addChestBtn.onclick = () => openAddChestModal();

    const syncBtn = document.getElementById('btn-save-sync-curriculum');
    if(syncBtn) syncBtn.onclick = syncToDatabaseAndStorage;

    const importBtn = document.getElementById('btn-import-json-curriculum');
    if(importBtn) importBtn.onclick = triggerImportJSON;

    const exportBtn = document.getElementById('btn-export-json-curriculum');
    if(exportBtn) exportBtn.onclick = exportJSON;

    const resetAllBtn = document.getElementById('btn-reset-curriculum-all');
    if(resetAllBtn) resetAllBtn.onclick = resetAllCurriculumData;

    const previewBtn = document.getElementById('btn-preview-curriculum');
    if(previewBtn) previewBtn.onclick = () => {
      const targetLesson = getCurrentContextLesson();
      if(targetLesson) openInteractivePreview(targetLesson.id);
      else toast('لا توجد دروس متاحة للمعاينة في هذا المستوى حالياً', true);
    };

    const badgeTextInp = document.getElementById('unit-input-badge');
    if(badgeTextInp){
      badgeTextInp.addEventListener('input', () => {
        if(_currentBadgeMode === 'text'){
          updateBadgePreview();
        }
      });
    }

    updatePreviewButtonVisibility();
  }

  function handleAddButtonClick(){
    const unitDetailView = document.getElementById('unit-detail-view');
    const levelDetailView = document.getElementById('level-detail-view');

    if(unitDetailView && unitDetailView.classList.contains('active') && navState.unitId){
      openAddLessonModal(navState.unitId);
    } else if(levelDetailView && levelDetailView.classList.contains('active') && navState.levelId){
      openAddUnitModal(navState.levelId);
    } else {
      openAddLevelModal();
    }
  }

  function updatePreviewButtonVisibility(){
    const previewBtn = document.getElementById('btn-preview-curriculum');
    if(!previewBtn) return;

    // إخفاء زر المعاينة تماماً إذا كان المستخدم في شاشة المستويات العامة (ولم يدخل لأي مستوى بعد)
    if(!navState.levelId && !navState.unitId){
      previewBtn.style.display = 'none';
      return;
    }

    // إذا كان داخل مستوى أو وحدة، نبحث عن أول درس في هذا المستوى/الوحدة للمعاينة
    const targetLesson = getCurrentContextLesson();
    if(targetLesson){
      previewBtn.style.display = 'inline-flex';
      previewBtn.title = `معاينة درس: ${targetLesson.title || ''}`;
    } else {
      previewBtn.style.display = 'none';
    }
  }

  function getCurrentContextLesson(){
    if(!curriculumData || !curriculumData.units) return null;

    if(navState.unitId){
      const u = (curriculumData.units || []).find(x => String(x.id) === String(navState.unitId));
      if(u && u.lessons && u.lessons.length > 0) return u.lessons[0];
    }

    if(navState.levelId){
      const units = (curriculumData.units || []).filter(x => String(x.level_id) === String(navState.levelId));
      for(const u of units){
        if(u.lessons && u.lessons.length > 0) return u.lessons[0];
      }
    }

    return null;
  }

  /* ============ DETERMINISTIC RE-INDEXING (1..N) ============ */
  async function reindexCollection(items, tableName = null){
    if(!Array.isArray(items) || items.length === 0) return;
    items.forEach((item, idx) => {
      item.order_index = idx + 1;
    });

    if(tableName && window.sb){
      const realItems = items.filter(item => !isTempId(item.id) && !isNaN(parseInt(item.id)));
      if(realItems.length > 0){
        try {
          const updates = realItems.map(item => 
            sb.from(tableName).update({ order_index: item.order_index }).eq('id', parseInt(item.id))
          );
          await Promise.all(updates);
        } catch(err){
          console.warn(`Failed to reindex ${tableName} in Supabase:`, err);
        }
      }
    }
  }

  /* ============ STATS CALCULATION (REAL DATA ONLY: 0 = 0) ============ */
      function refreshStats(targetLevelId = null, targetUnitId = null){
    if(!curriculumData) return;
    const levels = getLevels();
    const levelsCount = levels.length;

    const currentUnit = (targetUnitId !== null && targetUnitId !== undefined)
      ? (curriculumData.units || []).find(u => String(u.id) === String(targetUnitId))
      : (navState.unitId ? (curriculumData.units || []).find(u => String(u.id) === String(navState.unitId)) : null);

    const currentLvl = currentUnit 
      ? (levels.find(l => String(l.id) === String(currentUnit.level_id)) || levels[0])
      : ((targetLevelId !== null && targetLevelId !== undefined) 
          ? (levels.find(l => String(l.id) === String(targetLevelId)) || levels[0]) 
          : (navState.levelId ? (levels.find(l => String(l.id) === String(navState.levelId)) || null) : null));

    let unitsList = curriculumData.units || [];
    if(currentUnit){
      unitsList = [ currentUnit ];
    } else if(currentLvl){
      unitsList = unitsList.filter(u => String(u.level_id) === String(currentLvl.id));
    }

    const unitsCount = unitsList.length;
    let lessonsCount = 0;
    let challengesCount = 0;
    let questionsCount = 0;
    let audioCount = 0;
    let totalLessonXp = 0;

    unitsList.forEach(u => {
      if(u.lessons){
        lessonsCount += u.lessons.length;
        u.lessons.forEach(l => {
          totalLessonXp += (parseInt(l.xp_reward, 10) || 0);
          if(l.challenges){
            challengesCount += l.challenges.length;
            l.challenges.forEach(c => {
              questionsCount++;
              if(c.audio_text || c.audio_url) audioCount++;
              if(c.options) questionsCount += c.options.length;
            });
          }
        });
      }
    });

    const relevantChests = (curriculumData.chests || []).filter(c => {
      if (currentUnit) return String(c.unit_id) === String(currentUnit.id);
      if (currentLvl) return String(c.level_id) === String(currentLvl.id) || (c.unit_id && unitsList.some(u => String(u.id) === String(c.unit_id)));
      return true;
    });

    const chestsCount = relevantChests.length;
    let totalChestXp = 0;
    let totalBonusHearts = 0;
    relevantChests.forEach(c => {
      totalChestXp += (parseInt(c.xp_min, 10) || 0);
      totalBonusHearts += (parseInt(c.hearts, 10) || 0);
    });

    const statLevelsEl = document.getElementById('stat-levels-count');
    const statLevelsLbl = document.getElementById('stat-levels-label');
    const statUnitsEl = document.getElementById('stat-units-count');
    const statLessonsEl = document.getElementById('stat-lessons-count');
    const statChallengesEl = document.getElementById('stat-challenges-count');
    const statChestsEl = document.getElementById('stat-chests-count');
    const statXpEl = document.getElementById('stat-curriculum-xp-count');
    const statHeartsEl = document.getElementById('stat-curriculum-hearts-count');
    const statQuestionsEl = document.getElementById('stat-questions-count');
    const statAudioEl = document.getElementById('stat-audio-count');

    if(statLevelsEl) statLevelsEl.textContent = levelsCount;
    if(statLevelsLbl) statLevelsLbl.textContent = 'المستويات';
    if(statUnitsEl) statUnitsEl.textContent = unitsCount;
    if(statLessonsEl) statLessonsEl.textContent = lessonsCount;
    if(statChallengesEl) statChallengesEl.textContent = challengesCount;
    if(statChestsEl) statChestsEl.textContent = chestsCount;
    if(statXpEl) statXpEl.textContent = (totalLessonXp + totalChestXp) + ' XP';
    if(statHeartsEl) statHeartsEl.textContent = '+' + totalBonusHearts + ' ❤️';
    if(statQuestionsEl) statQuestionsEl.textContent = questionsCount;
    if(statAudioEl) statAudioEl.textContent = audioCount;
  }

  /* ============ GRANULAR VIEW RENDERING ============ */
  function renderCurrentView(){
    const unitDetailView = document.getElementById('unit-detail-view');
    const levelDetailView = document.getElementById('level-detail-view');

    if(unitDetailView && unitDetailView.classList.contains('active') && navState.unitId){
      renderUnitDetail(navState.unitId);
    } else if(levelDetailView && levelDetailView.classList.contains('active') && navState.levelId){
      renderLevelDetail(navState.levelId);
    } else {
      renderLevelsOverview();
    }
    updatePreviewButtonVisibility();
  }

  function renderAll(){
    refreshStats(navState.levelId, navState.unitId);
    renderLevelsOverview();
    if(navState.levelId){
      renderLevelDetail(navState.levelId);
    }
    if(navState.unitId){
      renderUnitDetail(navState.unitId);
    }
    updatePreviewButtonVisibility();
  }

  /* ============ VIEW 1: LEVELS OVERVIEW ============ */
  function renderLevelsOverview(){
    const grid = document.getElementById('levels-overview-grid');
    if(!grid) return;
    const levels = getLevels();
    if(!levels || levels.length === 0){
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px 20px; background:#FFFFFF; border:1px dashed #E7DCC8; border-radius:18px; color:#746B6F;">لا توجد مستويات حالياً. انقر على "إضافة عنصر جديد" لإنشاء أول مستوى.</div>`;
      return;
    }

    grid.innerHTML = levels.map((lvl, idx) => {
      const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(lvl.id));
      const unitsCount = units.length;
      let lessonsCount = 0;
      let challengesCount = 0;
      let totalLessonsXp = 0;
      units.forEach(u => {
        if(u.lessons){
          lessonsCount += u.lessons.length;
          u.lessons.forEach(l => {
            totalLessonsXp += (parseInt(l.xp_reward, 10) || 0);
            if(l.challenges) challengesCount += l.challenges.length;
          });
        }
      });
      const levelXp = totalLessonsXp;
      const isFirst = idx === 0;
      const isLast = idx === levels.length - 1;

      return `
        <div class="level-overview-card" data-level-id="${lvl.id}" draggable="true" ondragstart="CurriculumAdminSystem.handleDragStart(event, 'level', '${lvl.id}')" ondragover="CurriculumAdminSystem.handleDragOver(event)" ondragleave="CurriculumAdminSystem.handleDragLeave(event)" ondrop="CurriculumAdminSystem.handleDrop(event, 'level', '${lvl.id}')" ondragend="CurriculumAdminSystem.handleDragEnd(event)">
          <div class="level-card-header">
            <div class="level-card-badge">${lvl.order_index || (idx + 1)}</div>
            <div class="level-card-title-area">
              <h3>${escapeHtml(lvl.title)}</h3>
              <p>${escapeHtml(lvl.description || 'تعلّم واختبر مهاراتك في هذا المستوى.')}</p>
            </div>
            <div class="drag-handle-badge" title="اسحب للترتيب">${SVG.gripVertical}</div>
          </div>
          <div class="level-card-body">
            <div class="level-card-stats">
              <span class="level-stat-chip"><span class="stat-icon">${SVG.book}</span> عدد الوحدات: <strong>${unitsCount}</strong></span>
              <span class="level-stat-chip"><span class="stat-icon">${SVG.bookOpen}</span> عدد الدروس: <strong>${lessonsCount}</strong></span>
              <span class="level-stat-chip"><span class="stat-icon">${SVG.target}</span> التمارين: <strong>${challengesCount}</strong></span>
              <span class="level-stat-chip xp-chip"><span class="stat-icon">${SVG.zap}</span> نقاط XP: <strong>${levelXp}</strong></span>
            </div>
          </div>
          <div class="level-card-footer">
            <button type="button" class="btn-open-level" onclick="CurriculumAdminSystem.showLevelDetail('${lvl.id}')" style="display:flex; align-items:center; justify-content:center; gap:8px;">
              <span>فتح المستوى</span>
              <span>${SVG.arrowLeft}</span>
            </button>
            <button type="button" class="btn-edit-level" onclick="CurriculumAdminSystem.openEditLevelModal('${lvl.id}')" title="تعديل بيانات المستوى">
              ${SVG.edit}
            </button>
            <button type="button" class="btn-delete-level" onclick="CurriculumAdminSystem.deleteLevel('${lvl.id}')" title="حذف المستوى" ${levels.length <= 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
              ${SVG.trash}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function showLevelDetail(levelId){
    navState.levelId = levelId;
    navState.unitId = null;
    const overviewEl = document.getElementById('levels-overview-view');
    const detailEl = document.getElementById('level-detail-view');
    const unitDetailEl = document.getElementById('unit-detail-view');

    if(overviewEl) overviewEl.classList.add('hidden');
    if(unitDetailEl) unitDetailEl.classList.remove('active');
    if(detailEl) detailEl.classList.add('active');

    refreshStats(levelId, null);
    renderLevelDetail(levelId);
    updatePreviewButtonVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showLevelsOverview(){
    navState.levelId = null;
    navState.unitId = null;
    const overviewEl = document.getElementById('levels-overview-view');
    const detailEl = document.getElementById('level-detail-view');
    const unitDetailEl = document.getElementById('unit-detail-view');

    if(overviewEl) overviewEl.classList.remove('hidden');
    if(detailEl) detailEl.classList.remove('active');
    if(unitDetailEl) unitDetailEl.classList.remove('active');

    refreshStats(null, null);
    renderLevelsOverview();
    updatePreviewButtonVisibility();
  }

  /* ============ VIEW 2: LEVEL DETAIL ============ */
  function renderLevelDetail(levelId){
    const levels = getLevels();
    const lvl = levels.find(l => String(l.id) === String(levelId)) || levels[0];
    if(!lvl) return;

    refreshStats(lvl.id, null);

    const hero = document.getElementById('level-detail-hero');
    if(hero){
      const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(lvl.id));
      let lessonsCount = 0;
      let challengesCount = 0;
      let levelTotalXp = 0;
      units.forEach(u => {
        if(u.lessons){
          lessonsCount += u.lessons.length;
          u.lessons.forEach(l => {
            levelTotalXp += (parseInt(l.xp_reward, 10) || 0);
            if(l.challenges) challengesCount += l.challenges.length;
          });
        }
      });

      hero.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:inline-block; background:rgba(212,175,55,0.25); color:#D4AF37; font-size:0.8rem; font-weight:800; padding:3px 10px; border-radius:8px; margin-bottom:6px;">المستوى #${lvl.order_index || 1}</div>
            <h2 style="margin:0 0 6px 0;">${escapeHtml(lvl.title)}</h2>
            <p style="margin:0;">${escapeHtml(lvl.description || 'إدارة محتويات وتفاصيل هذا المستوى')}</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:8px 14px; font-size:0.85rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.openEditLevelModal('${lvl.id}')">
              ${SVG.edit}
              <span>تعديل العنوان والوصف</span>
            </button>
          </div>
        </div>

        <div class="level-detail-info-grid">
          <div class="level-detail-info-item">
            <label>إجمالي نقاط XP (محسوبة)</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">
              <span>${SVG.zap} ${levelTotalXp} XP</span>
            </div>
          </div>
          <div class="level-detail-info-item">
            <label>إجمالي الوحدات</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.book} ${units.length}</div>
          </div>
          <div class="level-detail-info-item">
            <label>إجمالي الدروس</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.bookOpen} ${lessonsCount}</div>
          </div>
          <div class="level-detail-info-item">
            <label>إجمالي التمارين</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.target} ${challengesCount}</div>
          </div>
        </div>
      `;
    }

    renderRewardBoxSection(lvl);
    renderLevelDetailUnits(lvl);
  }

  function renderChestAsUnitCard(c, units = []){
    const xpDisplay = c.xp_mode === 'range' ? `${c.xp_min || 20}~${c.xp_max || 50} XP` : `${c.xp_min || 30} XP`;
    const unit = units.find(u => String(u.id) === String(c.unit_id));
    let locationText = 'محطة مكافأة في مسار المستوى';
    if(c.placement_type === 'unit_start'){
      locationText = unit ? `في بداية «${escapeHtml(unit.title)}»` : 'في بداية المسار';
    } else if(c.placement_type === 'unit_end'){
      locationText = unit ? `في نهاية «${escapeHtml(unit.title)}»` : 'في نهاية المسار';
    } else if(unit){
      const lesson = (unit.lessons || []).find(l => String(l.id) === String(c.after_lesson_id));
      locationText = lesson ? `في «${escapeHtml(unit.title)}» بعد: ${escapeHtml(lesson.title)}` : `داخل «${escapeHtml(unit.title)}»`;
    }

    return `
      <div class="unit-accordion-card chest-as-unit-card" data-chest-id="${c.id}" draggable="true" 
           ondragstart="CurriculumAdminSystem.handleDragStart(event, 'chest', '${c.id}')" 
           ondragover="CurriculumAdminSystem.handleDragOver(event)" 
           ondragleave="CurriculumAdminSystem.handleDragLeave(event)" 
           ondrop="CurriculumAdminSystem.handleDrop(event, 'chest_in_units', '${c.id}')" 
           ondragend="CurriculumAdminSystem.handleDragEnd(event)">
        <div class="unit-accordion-head" style="cursor: default;">
          <div class="unit-accordion-left">
            <span class="drag-handle-unit" title="اسحب الصندوق لتغيير مكانه بين الوحدات" onclick="event.stopPropagation()">${SVG.gripVertical}</span>
            <div class="unit-accordion-badge" style="background: linear-gradient(135deg, #6B470D 0%, #3D2103 100%); border: 2px solid #D4AF37; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="CurriculumAdminSystem.previewChest('${c.id}')" title="انقر لمعاينة الصندوق">
              <svg viewBox="0 0 96 74" width="36" height="28" fill="none">
                <rect x="15" y="28" width="66" height="34" rx="6" fill="#D6A42E" stroke="#FFE066" stroke-width="2"/>
                <path d="M14 29 C14 13, 26 7, 48 7 C70 7, 82 13, 82 29 Z" fill="#ECC757" stroke="#FFE066" stroke-width="2"/>
                <rect x="12" y="27" width="72" height="4.5" rx="2" fill="#FFE066"/>
                <rect x="41" y="23" width="14" height="17" rx="3.5" fill="#6B470D" stroke="#FFE175" stroke-width="1.8"/>
                <rect x="44" y="26.5" width="8" height="10" rx="2" fill="#D80032" stroke="#FFD1DC" stroke-width="0.8"/>
                <circle cx="46" cy="28.5" r="1.2" fill="#FFFFFF"/>
              </svg>
            </div>
            <div class="unit-accordion-info">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:3px; flex-wrap:wrap;">
                <span style="display:inline-block; background:#FFF0C2; border:1px solid #D4AF37; color:#6B470D; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:5px;">${SVG.gift} <span>صندوق هدايا ومكافآت (محطة في مسار المستوى)</span></span>
                <span style="background:rgba(0,163,255,0.12); color:#0077B6; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">${SVG.zap} <span>${xpDisplay}</span></span>
                ${c.hearts > 0 ? `<span style="background:rgba(255,75,75,0.12); color:#D92D20; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">${SVG.heart} <span>+${c.hearts}</span></span>` : ''}
                ${c.has_badge ? `<span style="background:rgba(212,175,55,0.2); color:#8C6A1A; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">${SVG.trophy} <span>وسام: ${escapeHtml(c.badge_title || 'متقن الأبجدية')}</span></span>` : ''}
                ${c.has_badge ? `<span style="background:rgba(212,175,55,0.2); color:#8C6A1A; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">${SVG.trophy} <span>وسام: ${escapeHtml(c.badge_title || 'متقن الأبجدية')}</span></span>` : ''}
              </div>
              <h4 style="color:#4A0D24; font-weight:900; display:flex; align-items:center; gap:6px;">${SVG.gift} <span>${escapeHtml(c.title || 'صندوق المكافأة السري')}</span></h4>
              <p style="color:#706354;">${escapeHtml(c.description || 'مكافأة تشجيعية عند الوصول لهذه المحطة')} • <span style="color:#8C6A1A; font-weight:700;">${locationText}</span></p>
            </div>
          </div>
          <div class="unit-accordion-actions" onclick="event.stopPropagation()">
            <!-- أزرار الترتيب الفوري ⬆ / ⬇ بين الوحدات -->
            <div style="display:flex; align-items:center; gap:2px; background:#FFFFFF; border:1.5px solid #D4AF37; border-radius:8px; padding:2px 6px;">
              <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.88rem; padding:3px 5px; color:#8C6A1A; font-weight:900;" onclick="CurriculumAdminSystem.moveChestAmongUnitsUp('${c.id}')" title="تحريك الصندوق للأعلى بين الوحدات">${SVG.arrowUp}</button>
              <span style="font-size:0.75rem; color:#D4AF37;">|</span>
              <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.88rem; padding:3px 5px; color:#8C6A1A; font-weight:900;" onclick="CurriculumAdminSystem.moveChestAmongUnitsDown('${c.id}')" title="تحريك الصندوق للأسفل بين الوحدات">${SVG.arrowDown}</button>
            </div>
            <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:6px 12px; font-size:0.82rem; display:flex; align-items:center; gap:5px;" onclick="CurriculumAdminSystem.previewChest('${c.id}')" title="معاينة شكل واحتفال الصندوق">
              ${SVG.playCircle}
              <span>معاينة</span>
            </button>
            <button type="button" class="btn-edit-level" style="width:38px; height:38px;" onclick="CurriculumAdminSystem.openEditChestModal('${c.id}')" title="تعديل بيانات الصندوق">${SVG.edit}</button>
            <button type="button" class="btn-delete-level" style="width:38px; height:38px;" onclick="CurriculumAdminSystem.deleteChest('${c.id}')" title="حذف الصندوق">${SVG.trash}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderLevelDetailUnits(lvl){
    const container = document.getElementById('level-detail-units-list');
    if(!container) return;

    const units = (curriculumData.units || [])
      .filter(u => String(u.level_id) === String(lvl.id))
      .sort((a,b) => (a.order_index || 1) - (b.order_index || 1));

    const levelChests = (curriculumData.chests || []).filter(c => {
      if(String(c.level_id) === String(lvl.id)) return true;
      if(c.unit_id){
        const u = units.find(unit => String(unit.id) === String(c.unit_id));
        if(u) return true;
      }
      return false;
    });

    if(units.length === 0 && levelChests.length === 0){
      container.innerHTML = `
        <div style="text-align:center; padding:35px 20px; background:#FFFFFF; border:1px dashed #E7DCC8; border-radius:14px;">
          <p style="font-size:1rem; font-weight:700; color:#4A0D24; margin-bottom:12px;">لا توجد وحدات في هذا المستوى حتى الآن</p>
          <div style="display:flex; gap:10px; justify-content:center;">
            <button type="button" class="curriculum-btn curriculum-btn-gold" onclick="CurriculumAdminSystem.addUnitToCurrentLevel()">+ إضافة أول وحدة في هذا المستوى</button>
            <button type="button" class="curriculum-btn curriculum-btn-primary" onclick="CurriculumAdminSystem.openAddChestModal('${lvl.id}')" style="display:inline-flex; align-items:center; gap:6px;">${SVG.gift} <span>إضافة صندوق مكافأة</span></button>
          </div>
        </div>
      `;
      return;
    }

    let html = '';

    // صناديق بداية المستوى (قبل الوحدة الأولى)
    const startChests = levelChests.filter(c => c.placement_type === 'unit_start' && units[0] && String(c.unit_id) === String(units[0].id));
    startChests.forEach(c => {
      html += renderChestAsUnitCard(c, units);
    });

    // عرض الوحدات والصناديق التابعة لها
    units.forEach((u, idx) => {
      const lessons = u.lessons || [];
      const challengesCount = lessons.reduce((acc, l) => acc + (l.challenges ? l.challenges.length : 0), 0);
      const isFirst = idx === 0;
      const isLast = idx === units.length - 1;
      const unitChests = (curriculumData.chests || []).filter(c => String(c.unit_id) === String(u.id));

      html += `
        <div class="unit-accordion-card" data-unit-id="${u.id}" draggable="true" ondragstart="CurriculumAdminSystem.handleDragStart(event, 'unit', '${u.id}')" ondragover="CurriculumAdminSystem.handleDragOver(event)" ondragleave="CurriculumAdminSystem.handleDragLeave(event)" ondrop="CurriculumAdminSystem.handleDrop(event, 'unit', '${u.id}')" ondragend="CurriculumAdminSystem.handleDragEnd(event)">
          <div class="unit-accordion-head" onclick="CurriculumAdminSystem.showUnitDetail('${u.id}')">
            <div class="unit-accordion-left">
              <span class="drag-handle-unit" title="اسحب للترتيب" onclick="event.stopPropagation()">${SVG.gripVertical}</span>
              <div class="unit-accordion-badge">${getBadgeIcon(u.badge, SVG.book)}</div>
              <div class="unit-accordion-info">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:3px; flex-wrap:wrap;">
                  <span style="display:inline-block; background:rgba(212,175,55,0.22); color:#8C6A1A; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px;">الترتيب: #${u.order_index || (idx + 1)}</span>
                  ${unitChests.length > 0 ? `
                    <span class="unit-chests-chip" title="تحتوي هذه الوحدة على ${unitChests.length} صندوق مكافآت" style="display:inline-flex; align-items:center; gap:5px;">
                      ${SVG.gift}
                      <span>${unitChests.length} ${unitChests.length === 1 ? 'صندوق مكافأة' : 'صناديق مكافآت'}</span>
                    </span>
                  ` : ''}
                </div>
                <h4>${escapeHtml(u.title)}</h4>
                <p>${escapeHtml(u.description || '')} • ${lessons.length} دروس • ${challengesCount} تمارين</p>
              </div>
            </div>
            <div class="unit-accordion-actions" onclick="event.stopPropagation()">
              <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:6px 10px; font-size:0.82rem; display:flex; align-items:center; gap:5px;" onclick="CurriculumAdminSystem.openAddChestModalForUnit('${u.id}')" title="إضافة صندوق هدايا لهذه الوحدة">
                ${SVG.gift}
                <span>+ صندوق هدايا</span>
              </button>
              <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:6px 12px; font-size:0.84rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.showUnitDetail('${u.id}')">
                <span>فتح الدروس والتمارين</span>
                <span>${SVG.arrowLeft}</span>
              </button>
              <button type="button" class="btn-edit-level" style="width:38px; height:38px;" onclick="CurriculumAdminSystem.openEditUnitModal('${u.id}')" title="تعديل بيانات الوحدة">${SVG.edit}</button>
              <button type="button" class="btn-delete-level" style="width:38px; height:38px;" onclick="CurriculumAdminSystem.deleteUnit('${u.id}')" title="حذف الوحدة">${SVG.trash}</button>
            </div>
          </div>
        </div>
      `;

      // صناديق هذه الوحدة بعد دروسها أو في نهايتها، تُعرض كبطاقات وحدات تابعة
      const afterUnitChests = levelChests.filter(c => String(c.unit_id) === String(u.id) && (c.placement_type === 'unit_end' || c.placement_type === 'after_lesson'));
      afterUnitChests.forEach(c => {
        html += renderChestAsUnitCard(c, units);
      });
    });

    container.innerHTML = html;
  }

  function addUnitToCurrentLevel(){
    const currentLevelId = navState.levelId || (getLevels()[0] ? getLevels()[0].id : 1);
    openAddUnitModal(currentLevelId);
  }

  function openAddLessonToCurrentUnit(){
    openAddLessonModal(navState.unitId);
  }

  /* ============ REWARD CHESTS SECTION & MANAGEMENT (صناديق الهدايا والمكافآت) ============ */
  function renderRewardBoxSection(lvl){
    const container = document.getElementById('reward-box-content');
    if(!container) return;

    const chests = (curriculumData.chests || []).filter(c => {
      if(String(c.level_id) === String(lvl.id)) return true;
      if(c.unit_id){
        const u = (curriculumData.units || []).find(unit => String(unit.id) === String(c.unit_id));
        if(u && String(u.level_id) === String(lvl.id)) return true;
      }
      if(!c.level_id && (curriculumData.levels || []).length <= 1) return true;
      return false;
    });

    if(chests.length === 0){
      container.innerHTML = `
        <div style="text-align:center; padding:32px 20px; background:#FDFBF7; border:1.5px dashed #E7DCC8; border-radius:14px;">
          <div style="font-size:2rem; margin-bottom:8px; color:#D4AF37;">${SVG.gift}</div>
          <h4 style="margin:0 0 6px 0; font-size:1.05rem; font-weight:800; color:#4A0D24;">لا توجد صناديق هدايا مخصصة في هذا المستوى حتى الآن</h4>
          <p style="margin:0 0 16px 0; font-size:0.86rem; color:#706354; max-width:480px; margin-inline:auto; line-height:1.5;">
            أضف صناديق مكافآت وجوائز تشجيعية للطلاب (قلوب إضافية، نطاق نقاط خبرة XP، شارات تميز) تظهر في أي موضع تريده بالمسار التعليمي.
          </p>
          <button type="button" class="curriculum-btn curriculum-btn-gold" onclick="CurriculumAdminSystem.openAddChestModal('${lvl.id}')" style="font-weight:800; padding:9px 20px; box-shadow:0 4px 12px rgba(212,175,55,0.25); display:inline-flex; align-items:center; gap:6px;">
            ${SVG.gift}
            <span>إضافة أول صندوق هدايا</span>
          </button>
        </div>
      `;
      return;
    }

    const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(lvl.id));

    container.innerHTML = `
      <div class="reward-box-items-grid">
        ${chests.map(chest => {
          const targetUnit = units.find(u => String(u.id) === String(chest.unit_id));
          const targetLesson = (targetUnit?.lessons || []).find(l => String(l.id) === String(chest.after_lesson_id));

          let locText = '';
          if(chest.placement_type === 'after_lesson'){
            locText = `${targetUnit ? targetUnit.title : 'الوحدة'} • بعد: ${targetLesson ? targetLesson.title : 'الدرس'}`;
          } else if(chest.placement_type === 'unit_start'){
            locText = `${targetUnit ? targetUnit.title : 'الوحدة'} • في البداية`;
          } else if(chest.placement_type === 'unit_middle'){
            locText = `${targetUnit ? targetUnit.title : 'الوحدة'} • في المنتصف`;
          } else if(chest.placement_type === 'unit_end'){
            locText = `${targetUnit ? targetUnit.title : 'الوحدة'} • في النهاية`;
          } else {
            locText = `${targetUnit ? targetUnit.title : 'المسار التعليمي'}`;
          }

          const xpDisplay = chest.xp_mode === 'range' 
            ? `${chest.xp_min || 20} ~ ${chest.xp_max || 50} XP` 
            : `${chest.xp_min || 30} XP`;

          return `
            <div class="chest-admin-card" data-chest-id="${chest.id}">
              <div class="chest-admin-header">
                <div class="chest-admin-icon" style="color:#D4AF37;">${SVG.gift}</div>
                <div class="chest-admin-info" style="flex:1;">
                  <h4>${escapeHtml(chest.title || 'صندوق المكافأة السري')}</h4>
                  <p>${escapeHtml(chest.description || '')}</p>
                  <div class="chest-location-tag">${escapeHtml(locText)}</div>
                </div>
              </div>

              <div class="chest-rewards-chips">
                <span class="reward-chip xp" style="display:inline-flex; align-items:center; gap:4px;">${SVG.zap} <span>${xpDisplay}</span></span>
                <span class="reward-chip heart" style="display:inline-flex; align-items:center; gap:4px;">${SVG.heart} <span>${chest.hearts > 0 ? `+${chest.hearts} قلوب` : 'بدون قلوب'}</span></span>
              </div>

              <div class="chest-admin-actions">
                <button type="button" class="curriculum-btn curriculum-btn-outline" style="padding:5px 12px; font-size:0.8rem; display:flex; align-items:center; gap:5px;" onclick="CurriculumAdminSystem.previewChest('${chest.id}')" title="معاينة شكل الصندوق">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  <span>معاينة</span>
                </button>
                <button type="button" class="btn-edit-level" style="width:34px; height:34px;" onclick="CurriculumAdminSystem.openEditChestModal('${chest.id}')" title="تعديل الصندوق">${SVG.edit}</button>
                <button type="button" class="btn-delete-level" style="width:34px; height:34px;" onclick="CurriculumAdminSystem.deleteChest('${chest.id}')" title="حذف الصندوق">${SVG.trash}</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function populateChestUnitSelector(selectedLevelId, selectedUnitId){
    const unitSelect = document.getElementById('chest-input-unit-id');
    if(!unitSelect) return;
    const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(selectedLevelId));
    unitSelect.innerHTML = units.map(u => `<option value="${u.id}" ${String(u.id) === String(selectedUnitId) ? 'selected' : ''}>${escapeHtml(u.title)}</option>`).join('');
    if(units.length === 0){
      unitSelect.innerHTML = `<option value="">-- لا توجد وحدات في هذا المستوى --</option>`;
    }
  }

  function populateChestLessonSelector(selectedUnitId, selectedLessonId){
    const lessonWrap = document.getElementById('chest-input-lesson-wrap');
    const lessonSelect = document.getElementById('chest-input-after-lesson-id');
    const placement = document.getElementById('chest-input-placement')?.value;

    if(placement !== 'after_lesson'){
      if(lessonWrap) lessonWrap.style.display = 'none';
      return;
    }
    if(lessonWrap) lessonWrap.style.display = 'block';

    const unit = (curriculumData.units || []).find(u => String(u.id) === String(selectedUnitId));
    const lessons = unit ? (unit.lessons || []) : [];
    if(lessonSelect){
      if(lessons.length > 0){
        lessonSelect.innerHTML = lessons.map(l => `<option value="${l.id}" ${String(l.id) === String(selectedLessonId) ? 'selected' : ''}>${escapeHtml(l.title)} (الدرس #${l.order_index || 1})</option>`).join('');
      } else {
        lessonSelect.innerHTML = `<option value="">-- لا توجد دروس في هذه الوحدة --</option>`;
      }
    }
  }

  function onChestUnitChange(){
    const unitId = document.getElementById('chest-input-unit-id')?.value;
    populateChestLessonSelector(unitId, null);
    updateChestModalPreview();
  }

  function onChestPlacementChange(){
    const unitId = document.getElementById('chest-input-unit-id')?.value;
    populateChestLessonSelector(unitId, null);
    updateChestModalPreview();
  }

  function onChestXpModeChange(mode){
    const rangeFields = document.getElementById('chest-xp-range-fields');
    const fixedField = document.getElementById('chest-xp-fixed-field');
    const rRange = document.getElementById('chest-xp-mode-range');
    const rFixed = document.getElementById('chest-xp-mode-fixed');

    if(mode === 'fixed'){
      if(rangeFields) rangeFields.style.display = 'none';
      if(fixedField) fixedField.style.display = 'block';
      if(rFixed) rFixed.checked = true;
    } else {
      if(rangeFields) rangeFields.style.display = 'grid';
      if(fixedField) fixedField.style.display = 'none';
      if(rRange) rRange.checked = true;
    }
    updateChestModalPreview();
  }

  function setChestHearts(n){
    const input = document.getElementById('chest-input-hearts');
    if(input){
      input.value = n;
      updateChestModalPreview();
    }
  }

  function onChestBadgeToggle(checked){
    toggleChestBadgeFields(checked);
  }
  window.onChestBadgeToggle = onChestBadgeToggle;

  function toggleChestBadgeFields(checked){
    const cont = document.getElementById('chest-badge-fields-container');
    if(cont) cont.style.display = checked ? 'block' : 'none';
    updateChestModalPreview();
  }

  function setChestBadgeIcon(icon){
    const input = document.getElementById('chest-input-badge-icon');
    if(input){
      input.value = icon;
      updateChestModalPreview();
    }
  }

  function updateChestModalPreview(){
    const title = document.getElementById('chest-input-title')?.value || 'صندوق المكافأة السري!';
    const desc = document.getElementById('chest-input-desc')?.value || 'أحسنت وصولاً إلى هذه المحطة! إليك هديتك التشجيعية:';
    const isFixedXp = document.getElementById('chest-xp-mode-fixed')?.checked;
    const xpMin = parseInt(document.getElementById('chest-input-xp-min')?.value, 10) || 20;
    const xpMax = parseInt(document.getElementById('chest-input-xp-max')?.value, 10) || 50;
    const xpFixed = parseInt(document.getElementById('chest-input-xp-fixed')?.value, 10) || 30;
    const hearts = parseInt(document.getElementById('chest-input-hearts')?.value, 10) ?? 1;

    const unitId = document.getElementById('chest-input-unit-id')?.value;
    const placement = document.getElementById('chest-input-placement')?.value;
    const afterLessonId = document.getElementById('chest-input-after-lesson-id')?.value;

    const unit = (curriculumData.units || []).find(u => String(u.id) === String(unitId));
    const lesson = (unit?.lessons || []).find(l => String(l.id) === String(afterLessonId));

    let locLabel = 'المسار التعليمي';
    if(unit){
      if(placement === 'after_lesson' && lesson){
        locLabel = `${unit.title} • بعد: ${lesson.title}`;
      } else if(placement === 'unit_start'){
        locLabel = `${unit.title} • البداية`;
      } else if(placement === 'unit_end'){
        locLabel = `${unit.title} • النهاية`;
      } else {
        locLabel = `${unit.title}`;
      }
    }
    const locEl = document.getElementById('preview-chest-location-badge');
    if(locEl) locEl.textContent = locLabel;

    const xpText = isFixedXp ? `+${xpFixed} XP` : `+${xpMin}~${xpMax} XP`;

    const box = document.getElementById('chest-modal-live-preview-box');
    if(!box) return;

    box.innerHTML = `
      <div style="display:flex; justify-content:center; margin-bottom:8px;">
        <svg viewBox="0 0 96 74" width="90" height="70" fill="none">
          <ellipse cx="48" cy="67" rx="34" ry="5.5" fill="rgba(80,50,10,0.25)"/>
          <rect x="15" y="28" width="66" height="34" rx="6" fill="#D6A42E" stroke="#5E3F0A" stroke-width="2.5"/>
          <line x1="28" y1="30" x2="28" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
          <line x1="41" y1="30" x2="41" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
          <line x1="55" y1="30" x2="55" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
          <line x1="68" y1="30" x2="68" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
          <rect x="13" y="58" width="70" height="5" rx="2.5" fill="#B37C17" stroke="#5E3F0A" stroke-width="2"/>
          <path d="M14 29 C14 13, 26 7, 48 7 C70 7, 82 13, 82 29 Z" fill="#ECC757" stroke="#5E3F0A" stroke-width="2.5"/>
          <rect x="12" y="27" width="72" height="5" rx="2" fill="#FFE066" stroke="#5E3F0A" stroke-width="2"/>
          <rect x="41" y="23" width="14" height="17" rx="3.5" fill="#6B470D" stroke="#FFE175" stroke-width="1.8"/>
          <rect x="44" y="26.5" width="8" height="10" rx="2" fill="#D80032" stroke="#FFD1DC" stroke-width="0.8"/>
          <circle cx="46" cy="28.5" r="1.2" fill="#FFFFFF"/>
        </svg>
      </div>
      <div style="margin-bottom:8px;">
        <span style="background:#D1FADF; color:#027A48; border:1.5px solid #A6F4C5; padding:2px 12px; border-radius:12px; font-weight:800; font-size:0.75rem;">تم الفتح ✓</span>
      </div>
      <h3 style="margin:0 0 4px 0; font-size:1.15rem; font-weight:800; color:#4A0D24;">${escapeHtml(title)}</h3>
      <p style="margin:0 0 12px 0; font-size:0.84rem; color:#706354;">${escapeHtml(desc)}</p>

      <div class="chest-preview-rewards-grid">
        <div class="chest-preview-reward-pill">
          <span style="font-size:1.3rem; color:#00A3FF;">${SVG.zap}</span>
          <span class="chest-preview-reward-val" style="color:#0077CC;">${xpText}</span>
          <span class="chest-preview-reward-lbl">نقاط خبرة إضافية</span>
        </div>

        ${hearts > 0 ? `
          <div class="chest-preview-reward-pill">
            <span style="font-size:1.3rem; color:#FF4B4B;">${SVG.heart}</span>
            <span class="chest-preview-reward-val" style="color:#D92D20;">+${hearts} محاولات</span>
            <span class="chest-preview-reward-lbl">محاولات إضافية</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  function openAddChestModal(levelId = null, unitId = null, afterLessonId = null){
    try {
      const targetLevelId = levelId || navState.levelId || (getLevels()[0] ? getLevels()[0].id : 1);
      const targetUnitId = unitId || navState.unitId;

      const titleEl = document.getElementById('modal-chest-title');
      if(titleEl){
        titleEl.innerHTML = `
          <span style="display:inline-flex; align-items:center; color:#D4AF37;">${SVG.gift}</span>
          <span>إضافة صندوق هدايا ومكافآت جديد</span>
        `;
      }
      const editIdEl = document.getElementById('chest-edit-id');
      if(editIdEl) editIdEl.value = '';
      const inputTitleEl = document.getElementById('chest-input-title');
      if(inputTitleEl) inputTitleEl.value = 'صندوق المكافأة السري';
      const inputDescEl = document.getElementById('chest-input-desc');
      if(inputDescEl) inputDescEl.value = 'أحسنت وصولاً إلى هذه المحطة! إليك هديتك التشجيعية:';

      populateChestUnitSelector(targetLevelId, targetUnitId);
      const activeUnitId = document.getElementById('chest-input-unit-id')?.value;
      const placementEl = document.getElementById('chest-input-placement');
      if(placementEl) placementEl.value = afterLessonId ? 'after_lesson' : 'after_lesson';
      populateChestLessonSelector(activeUnitId, afterLessonId);
      if(afterLessonId){
        const afterLessonEl = document.getElementById('chest-input-after-lesson-id');
        if(afterLessonEl) afterLessonEl.value = afterLessonId;
      }

      onChestXpModeChange('range');
      const xpMinEl = document.getElementById('chest-input-xp-min');
      if(xpMinEl) xpMinEl.value = 20;
      const xpMaxEl = document.getElementById('chest-input-xp-max');
      if(xpMaxEl) xpMaxEl.value = 50;
      const xpFixedEl = document.getElementById('chest-input-xp-fixed');
      if(xpFixedEl) xpFixedEl.value = 30;

      setChestHearts(1);

      updateChestModalPreview();
      const modalEl = document.getElementById('modal-chest-editor');
      if(modalEl){
        modalEl.style.display = 'flex';
      }
    } catch(err){
      console.error('Error opening add chest modal:', err);
    }
  }

  function openAddChestToCurrentLevel(){
    const targetLevelId = navState.levelId || (getLevels()[0] ? getLevels()[0].id : 1);
    const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(targetLevelId));
    const firstUnitId = units[0] ? units[0].id : null;
    openAddChestModal(targetLevelId, firstUnitId);
  }

  function openAddChestToCurrentUnit(){
    const targetLevelId = navState.levelId || (getLevels()[0] ? getLevels()[0].id : 1);
    openAddChestModal(targetLevelId, navState.unitId);
  }

  function openAddChestModalForUnit(unitId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    openAddChestModal(u ? u.level_id : navState.levelId, unitId);
  }

  function openAddChestAfterLesson(unitId, lessonId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    openAddChestModal(u ? u.level_id : navState.levelId, unitId, lessonId);
  }

  function openAddChestToLesson(unitId, lessonId){
    openAddChestAfterLesson(unitId, lessonId);
  }

  function openEditChestModal(chestId){
    try {
      const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
      if(!chest) return;

      const titleEl = document.getElementById('modal-chest-title');
      if(titleEl){
        titleEl.innerHTML = `
          <span style="display:inline-flex; align-items:center; color:#D4AF37;">${SVG.edit}</span>
          <span>تعديل صندوق المكافآت</span>
        `;
      }
      const editIdEl = document.getElementById('chest-edit-id');
      if(editIdEl) editIdEl.value = chest.id;
      const inputTitleEl = document.getElementById('chest-input-title');
      if(inputTitleEl) inputTitleEl.value = chest.title || 'صندوق المكافأة السري';
      const inputDescEl = document.getElementById('chest-input-desc');
      if(inputDescEl) inputDescEl.value = chest.description || '';

      populateChestUnitSelector(chest.level_id || navState.levelId, chest.unit_id);
      const unitSelect = document.getElementById('chest-input-unit-id');
      if(unitSelect) unitSelect.value = chest.unit_id || '';
      const placementEl = document.getElementById('chest-input-placement');
      if(placementEl) placementEl.value = chest.placement_type || 'after_lesson';
      populateChestLessonSelector(chest.unit_id, chest.after_lesson_id);

      onChestXpModeChange(chest.xp_mode || 'range');
      const xpMinEl = document.getElementById('chest-input-xp-min');
      if(xpMinEl) xpMinEl.value = chest.xp_min || 20;
      const xpMaxEl = document.getElementById('chest-input-xp-max');
      if(xpMaxEl) xpMaxEl.value = chest.xp_max || 50;
      const xpFixedEl = document.getElementById('chest-input-xp-fixed');
      if(xpFixedEl) xpFixedEl.value = chest.xp_min || 30;

      setChestHearts(chest.hearts !== undefined ? chest.hearts : 1);

      // Populate badge fields
      const hasBadgeEl = document.getElementById('chest-input-has-badge');
      const badgeWrapEl = document.getElementById('chest-badge-fields-wrap');
      const badgeTitleEl = document.getElementById('chest-input-badge-title');
      const badgeIconEl = document.getElementById('chest-input-badge-icon');
      const badgeDescEl = document.getElementById('chest-input-badge-desc');

      if(hasBadgeEl) hasBadgeEl.checked = !!chest.has_badge;
      if(badgeWrapEl) badgeWrapEl.style.display = chest.has_badge ? 'block' : 'none';
      if(badgeTitleEl) badgeTitleEl.value = chest.badge_title || '';
      if(badgeIconEl) badgeIconEl.value = chest.badge_icon || 'trophy';
      if(badgeDescEl) badgeDescEl.value = chest.badge_desc || '';

      updateChestModalPreview();
      const modalEl = document.getElementById('modal-chest-editor');
      if(modalEl){
        modalEl.style.display = 'flex';
      }
    } catch(err){
      console.error('Error opening edit chest modal:', err);
    }
  }

  async function saveChestForm(){
    pushHistorySnapshot();
    const idVal = document.getElementById('chest-edit-id').value;
    const titleVal = document.getElementById('chest-input-title').value.trim();
    if(!titleVal){
      toast('يرجى كتابة اسم أو عنوان للصندوق', true);
      return;
    }
    const descVal = document.getElementById('chest-input-desc').value.trim();
    const unitIdVal = document.getElementById('chest-input-unit-id').value;
    const placementVal = document.getElementById('chest-input-placement').value;
    const afterLessonIdVal = document.getElementById('chest-input-after-lesson-id')?.value;

    const unit = (curriculumData.units || []).find(u => String(u.id) === String(unitIdVal));
    const targetLevelId = unit ? unit.level_id : (navState.levelId || 1);

    const isFixedXp = document.getElementById('chest-xp-mode-fixed')?.checked;
    const xpMode = isFixedXp ? 'fixed' : 'range';
    let xpMin = parseInt(document.getElementById('chest-input-xp-min').value, 10) || 20;
    let xpMax = parseInt(document.getElementById('chest-input-xp-max').value, 10) || 50;
    if(isFixedXp){
      const fixedVal = parseInt(document.getElementById('chest-input-xp-fixed').value, 10) || 30;
      xpMin = fixedVal;
      xpMax = fixedVal;
    } else {
      if(xpMin > xpMax) {
        const temp = xpMin; xpMin = xpMax; xpMax = temp;
      }
    }

    const heartsVal = Math.max(0, parseInt(document.getElementById('chest-input-hearts').value, 10) || 0);
    const hasBadge = document.getElementById('chest-input-has-badge')?.checked ?? (chestObj?.has_badge || false);
    const badgeTitle = document.getElementById('chest-input-badge-title')?.value.trim() || chestObj?.badge_title || '';
    const badgeIcon = document.getElementById('chest-input-badge-icon')?.value || chestObj?.badge_icon || 'trophy';
    const badgeDesc = document.getElementById('chest-input-badge-desc')?.value.trim() || chestObj?.badge_desc || '';

    if(!curriculumData.chests) curriculumData.chests = [];

    let chestObj = idVal ? curriculumData.chests.find(c => String(c.id) === String(idVal)) : null;

    if(chestObj){
      chestObj.title = titleVal;
      chestObj.description = descVal;
      chestObj.level_id = targetLevelId;
      chestObj.unit_id = unitIdVal;
      chestObj.placement_type = placementVal;
      chestObj.after_lesson_id = (placementVal === 'after_lesson' || placementVal === 'unit_end') ? afterLessonIdVal : null;
      chestObj.xp_mode = xpMode;
      chestObj.xp_min = xpMin;
      chestObj.xp_max = xpMax;
      chestObj.hearts = heartsVal;
      chestObj.has_badge = hasBadge;
      chestObj.badge_title = badgeTitle;
      chestObj.badge_icon = badgeIcon;
      chestObj.badge_desc = badgeDesc;
    } else {
      chestObj = {
        id: `chest_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        title: titleVal,
        description: descVal,
        level_id: targetLevelId,
        unit_id: unitIdVal,
        placement_type: placementVal,
        after_lesson_id: (placementVal === 'after_lesson') ? afterLessonIdVal : null,
        xp_mode: xpMode,
        xp_min: xpMin,
        xp_max: xpMax,
        hearts: heartsVal,
        has_badge: hasBadge,
        badge_title: badgeTitle,
        badge_icon: badgeIcon,
        badge_desc: badgeDesc
      };
      curriculumData.chests.push(chestObj);
    }

    saveLocal(true);
    closeModals();
    if(navState.unitId) renderUnitDetail(navState.unitId);
    if(navState.levelId) renderLevelDetail(navState.levelId);
    const currentLevel = getLevels().find(l => String(l.id) === String(targetLevelId)) || getLevels()[0];
    if(currentLevel) renderRewardBoxSection(currentLevel);
    toast('تم حفظ وتثبيت صندوق المكافآت بنجاح ✓');

    if(window.sb){
      try {
        const dbPayload = {
          id: chestObj.id,
          level_id: chestObj.level_id ? parseInt(chestObj.level_id, 10) : 1,
          unit_id: chestObj.unit_id ? parseInt(chestObj.unit_id, 10) : null,
          title: chestObj.title,
          description: chestObj.description || '',
          placement_type: chestObj.placement_type || 'after_lesson',
          after_lesson_id: chestObj.after_lesson_id ? parseInt(chestObj.after_lesson_id, 10) : null,
          xp_mode: chestObj.xp_mode || 'range',
          xp_min: parseInt(chestObj.xp_min, 10) || 20,
          xp_max: parseInt(chestObj.xp_max, 10) || 50,
          hearts: parseInt(chestObj.hearts, 10) || 0,
          has_badge: !!chestObj.has_badge,
          badge_title: chestObj.badge_title || '',
          badge_icon: chestObj.badge_icon || 'trophy',
          badge_desc: chestObj.badge_desc || ''
        };
        const { error: sbErr } = await sb.from('chests').upsert(dbPayload);
        if(sbErr){
          console.error('Failed to sync chest to Supabase:', sbErr);
          toast('تم الحفظ محلياً (خطأ في السيرفر: ' + sbErr.message + ')', true);
        } else {
          saveLocal(false);
          toast('تم حفظ صندوق المكافآت بنجاح وتأمينه في قاعدة البيانات ✓');
        }
      } catch(err){
        console.error('Error in saveChestForm supabase sync:', err);
      }
    }
  }

  async function deleteChest(chestId){
    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    if(window.Swal){
      const res = await Swal.fire({
        title: 'تأكيد حذف صندوق المكافآت',
        text: `هل أنت متأكد من حذف «${chest.title || 'صندوق المكافأة'}» من المسار؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذف الصندوق',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#B53A3A',
        cancelButtonColor: '#746B6F'
      });
      if(!res.isConfirmed) return;
    } else {
      if(!confirm(`هل أنت متأكد من حذف «${chest.title || 'صندوق المكافأة'}»؟`)) return;
    }

    pushHistorySnapshot();
    curriculumData.chests = (curriculumData.chests || []).filter(c => String(c.id) !== String(chestId));
    saveLocal(true);

    if(navState.unitId) renderUnitDetail(navState.unitId);
    if(navState.levelId) renderLevelDetail(navState.levelId);
    const lvl = getLevels().find(l => String(l.id) === String(chest.level_id || navState.levelId)) || getLevels()[0];
    if(lvl) renderRewardBoxSection(lvl);
    toast('تم حذف صندوق المكافآت بنجاح');

    if(window.sb){
      try {
        const { error: delErr } = await sb.from('chests').delete().eq('id', chestId);
        if(delErr){
          console.error('Failed to delete chest from Supabase:', delErr);
        } else {
          saveLocal(false);
        }
      } catch(err){
        console.error('Error deleting chest from Supabase:', err);
      }
    }
  }

  function previewChest(chestId){
    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    const modal = document.getElementById('modal-chest-preview');
    const titleEl = document.getElementById('preview-popup-title');
    const descEl = document.getElementById('preview-popup-desc');
    const gridEl = document.getElementById('preview-popup-rewards-grid');
    if(!modal) return;

    if(titleEl) titleEl.textContent = chest.title || 'صندوق المكافأة السري!';
    if(descEl) descEl.textContent = chest.description || 'أحسنت وصولاً إلى هذه المحطة! إليك هديتك التشجيعية:';

    const xpText = chest.xp_mode === 'range' ? `+${chest.xp_min}~${chest.xp_max} XP` : `+${chest.xp_min || 30} XP`;

    if(gridEl){
      gridEl.innerHTML = `
        <div style="background:#F0F8FF; border:1.5px solid #BAE3FF; border-radius:14px; padding:14px; text-align:center;">
          <div style="font-size:1.6rem; color:#00A3FF; margin-bottom:4px;">${SVG.zap}</div>
          <div style="font-size:1.05rem; font-weight:900; color:#0077CC;">${xpText}</div>
          <div style="font-size:0.75rem; color:#706354; font-weight:700;">نقاط خبرة إضافية</div>
        </div>

        ${chest.hearts > 0 ? `
          <div style="background:#FFF5F5; border:1.5px solid #FFCDD2; border-radius:14px; padding:14px; text-align:center;">
            <div style="font-size:1.6rem; color:#FF4B4B; margin-bottom:4px;">${SVG.heart}</div>
            <div style="font-size:1.05rem; font-weight:900; color:#D92D20;">+${chest.hearts} محاولات</div>
            <div style="font-size:0.75rem; color:#706354; font-weight:700;">محاولات إضافية</div>
          </div>
        ` : ''}
        ${chest.has_badge ? `
          <div style="background:#FFFDF0; border:1.5px solid #FFE082; border-radius:14px; padding:14px; text-align:center;">
            <div style="font-size:1.6rem; color:#D4AF37; margin-bottom:4px;">${SVG.crown || SVG.trophy}</div>
            <div style="font-size:1.05rem; font-weight:900; color:#8C6A1A;">${escapeHtml(chest.badge_title || 'وسام التميز')}</div>
            <div style="font-size:0.75rem; color:#706354; font-weight:700;">وسام تخرج خاص</div>
          </div>
        ` : ''}
      `;
    }

    modal.style.display = 'flex';
  }

  function triggerPreviewCelebration(){
    if(window.Sound && typeof window.Sound.playChestReward === 'function'){
      window.Sound.playChestReward();
    } else if(window.Sound && typeof window.Sound.playVictory === 'function'){
      window.Sound.playVictory();
    }
    toast('تم استلام المكافأة بنجاح في وضع المعاينة!');
    const modal = document.getElementById('modal-chest-preview');
    if(modal) setTimeout(() => modal.style.display = 'none', 1200);
  }

  async function syncChestToDatabase(chest){
    if(!window.sb || !chest) return;
    try {
      await sb.from('chests').upsert({
        id: chest.id,
        level_id: chest.level_id ? parseInt(chest.level_id, 10) : 1,
        unit_id: chest.unit_id ? parseInt(chest.unit_id, 10) : null,
        title: chest.title,
        description: chest.description || '',
        placement_type: chest.placement_type || 'after_lesson',
        after_lesson_id: (chest.placement_type === 'after_lesson' && chest.after_lesson_id) ? parseInt(chest.after_lesson_id, 10) : null,
        xp_mode: chest.xp_mode || 'range',
        xp_min: parseInt(chest.xp_min, 10) || 20,
        xp_max: parseInt(chest.xp_max, 10) || 50,
        hearts: parseInt(chest.hearts, 10) || 0,
        has_badge: !!chest.has_badge,
        badge_title: chest.badge_title || '',
        badge_icon: chest.badge_icon || 'trophy',
        badge_desc: chest.badge_desc || ''
      });
    } catch(err){
      console.warn('Error syncing chest to Supabase:', err);
    }
  }

  async function moveChestAmongUnitsUp(chestId){
    const currentLevelId = navState.levelId || (getLevels()[0] ? getLevels()[0].id : 1);
    const units = (curriculumData.units || [])
      .filter(u => String(u.level_id) === String(currentLevelId))
      .sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    if(units.length === 0) return;

    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    pushHistorySnapshot();
    const unitIdx = units.findIndex(u => String(u.id) === String(chest.unit_id));

    if(chest.placement_type === 'unit_start' || (unitIdx <= 0 && chest.placement_type !== 'unit_end')){
      toast('الصندوق في أعلى موضع بالفعل في هذا المستوى');
      return;
    }

    if(chest.placement_type === 'unit_end'){
      chest.placement_type = 'after_lesson';
      const u = (unitIdx >= 0) ? units[unitIdx] : units[units.length - 1];
      chest.unit_id = u.id;
      chest.after_lesson_id = (u.lessons && u.lessons.length > 0) ? u.lessons[u.lessons.length - 1].id : null;
    } else if(unitIdx > 0){
      const prevU = units[unitIdx - 1];
      chest.unit_id = prevU.id;
      chest.placement_type = 'after_lesson';
      chest.after_lesson_id = (prevU.lessons && prevU.lessons.length > 0) ? prevU.lessons[prevU.lessons.length - 1].id : null;
    } else {
      chest.placement_type = 'unit_start';
      chest.unit_id = units[0].id;
      chest.after_lesson_id = null;
    }

    saveLocal(true);
    await syncChestToDatabase(chest);
    if(navState.levelId) renderLevelDetail(navState.levelId);
    toast('تم تحريك الصندوق للأعلى بين الوحدات بنجاح ✓');
  }

  async function moveChestAmongUnitsDown(chestId){
    const currentLevelId = navState.levelId || (getLevels()[0] ? getLevels()[0].id : 1);
    const units = (curriculumData.units || [])
      .filter(u => String(u.level_id) === String(currentLevelId))
      .sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    if(units.length === 0) return;

    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    pushHistorySnapshot();
    const unitIdx = units.findIndex(u => String(u.id) === String(chest.unit_id));

    if(chest.placement_type === 'unit_end'){
      toast('الصندوق في آخر موضع بالفعل في هذا المستوى');
      return;
    }

    if(chest.placement_type === 'unit_start' && unitIdx >= 0){
      chest.placement_type = 'after_lesson';
      const u = units[unitIdx];
      chest.after_lesson_id = (u.lessons && u.lessons.length > 0) ? u.lessons[u.lessons.length - 1].id : null;
    } else if(unitIdx >= 0 && unitIdx < units.length - 1){
      const nextU = units[unitIdx + 1];
      chest.unit_id = nextU.id;
      chest.placement_type = 'after_lesson';
      chest.after_lesson_id = (nextU.lessons && nextU.lessons.length > 0) ? nextU.lessons[nextU.lessons.length - 1].id : null;
    } else {
      chest.placement_type = 'unit_end';
      chest.unit_id = units[units.length - 1].id;
      chest.after_lesson_id = null;
    }

    saveLocal(true);
    await syncChestToDatabase(chest);
    if(navState.levelId) renderLevelDetail(navState.levelId);
    toast('تم تحريك الصندوق للأسفل بين الوحدات بنجاح ✓');
  }

  function openAddChestToLesson(unitId, lessonId){
    openAddChestAfterLesson(unitId, lessonId);
  }

  function renderChestAsChallengeCard(c, lId = null, itemNumber = null){
    const xpDisplay = c.xp_mode === 'range' ? `${c.xp_min || 20}~${c.xp_max || 50} XP` : `${c.xp_min || 30} XP`;
    const numDisplay = itemNumber ? `#${itemNumber}` : SVG.gift;
    const targetLessonId = lId || c.after_lesson_id || c.lesson_id;
    return `
      <div class="challenge-row-card chest-as-challenge-card" data-chest-id="${c.id}" draggable="true" 
           ondragstart="CurriculumAdminSystem.handleDragStart(event, 'chest', '${c.id}')" 
           ondragover="CurriculumAdminSystem.handleDragOver(event)" 
           ondragleave="CurriculumAdminSystem.handleDragLeave(event)" 
           ondrop="CurriculumAdminSystem.handleDrop(event, 'chest', '${c.id}')" 
           ondragend="CurriculumAdminSystem.handleDragEnd(event)">
        <div class="challenge-row-content">
          <span class="drag-handle-ch" title="اسحب الصندوق لترتيبه بين التمارين">${SVG.gripVertical}</span>
          <span style="font-weight:900; color:#D4AF37; font-size:0.88rem; min-width:24px; text-align:center;">${numDisplay}</span>
          <span class="curriculum-exercise-type-tag" style="background:#FFF0C2; border:1px solid #D4AF37; color:#6B470D; font-weight:800; display:inline-flex; align-items:center; gap:5px;">${SVG.gift} <span>صندوق مكافأة</span></span>
          <div style="width:34px; height:26px; flex-shrink:0; cursor:pointer;" onclick="CurriculumAdminSystem.previewChest('${c.id}')" title="انقر لمعاينة الصندوق">
            <svg viewBox="0 0 96 74" width="34" height="26" fill="none">
              <rect x="15" y="28" width="66" height="34" rx="6" fill="#D6A42E" stroke="#5E3F0A" stroke-width="2"/>
              <path d="M14 29 C14 13, 26 7, 48 7 C70 7, 82 13, 82 29 Z" fill="#ECC757" stroke="#5E3F0A" stroke-width="2"/>
              <rect x="12" y="27" width="72" height="4" rx="2" fill="#FFE066"/>
              <rect x="41" y="23" width="14" height="17" rx="3.5" fill="#6B470D" stroke="#FFE175" stroke-width="1.8"/>
              <rect x="44" y="26.5" width="8" height="10" rx="2" fill="#D80032" stroke="#FFD1DC" stroke-width="0.8"/>
              <circle cx="46" cy="28.5" r="1.2" fill="#FFFFFF"/>
            </svg>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="font-weight:800; font-size:0.92rem; color:#4A0D24; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span>${escapeHtml(c.title || 'صندوق المكافأة السري')}</span>
              <span style="font-size:0.75rem; background:rgba(0,163,255,0.12); color:#0077B6; padding:1px 6px; border-radius:5px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">${SVG.zap} <span>${xpDisplay}</span></span>
              ${c.hearts > 0 ? `<span style="font-size:0.75rem; background:rgba(255,75,75,0.12); color:#D92D20; padding:1px 6px; border-radius:5px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">${SVG.heart} <span>+${c.hearts}</span></span>` : ''}
            </div>
            <div style="font-size:0.8rem; color:#706354; margin-top:2px;">
              ${escapeHtml(c.description || 'مكافأة تشجيعية عند إتمام هذا الجزء')}
            </div>
          </div>
        </div>
        <div class="challenge-row-actions">
          <!-- أزرار الترتيب الفوري ⬆ / ⬇ بين التمارين -->
          <div style="display:flex; align-items:center; gap:2px; background:#FFFFFF; border:1px solid #D4AF37; border-radius:6px; padding:2px 4px;">
            <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.85rem; padding:2px 4px; color:#8C6A1A; font-weight:900;" onclick="CurriculumAdminSystem.moveLessonItemUp('${targetLessonId}', '${c.id}', true)" title="تحريك الصندوق للأعلى بين التمارين">${SVG.arrowUp}</button>
            <span style="font-size:0.7rem; color:#D4AF37;">|</span>
            <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.85rem; padding:2px 4px; color:#8C6A1A; font-weight:900;" onclick="CurriculumAdminSystem.moveLessonItemDown('${targetLessonId}', '${c.id}', true)" title="تحريك الصندوق للأسفل بين التمارين">${SVG.arrowDown}</button>
          </div>
          <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:4px 10px; font-size:0.78rem; display:flex; align-items:center; gap:4px;" onclick="CurriculumAdminSystem.previewChest('${c.id}')" title="معاينة شكل واحتفال الصندوق">
            ${SVG.playCircle}
            <span>معاينة</span>
          </button>
          <button type="button" class="btn-edit-level" style="width:34px; height:34px;" onclick="CurriculumAdminSystem.openEditChestModal('${c.id}')" title="تعديل بيانات الصندوق ومكافآته">${SVG.edit}</button>
          <button type="button" class="btn-delete-level" style="width:34px; height:34px;" onclick="CurriculumAdminSystem.deleteChest('${c.id}')" title="حذف الصندوق">${SVG.trash}</button>
        </div>
      </div>
    `;
  }

  async function moveLessonItemUp(lessonId, itemId, isChest){
    let parentLesson = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if(String(l.id) === String(lessonId)) parentLesson = l;
      });
    });
    if(!parentLesson) return;

    const challenges = (parentLesson.challenges || []).map(ch => ({ id: ch.id, obj: ch, isChest: false, order: ch.order_index || 1 }));
    const chests = (curriculumData.chests || [])
      .filter(c => (String(c.after_lesson_id) === String(lessonId) || String(c.lesson_id) === String(lessonId)) && c.placement_type !== 'unit_start' && c.placement_type !== 'unit_end')
      .map(c => ({ id: c.id, obj: c, isChest: true, order: c.order_index || 999 }));

    const merged = [...challenges, ...chests].sort((a, b) => a.order - b.order);
    const idx = merged.findIndex(x => String(x.id) === String(itemId) && x.isChest === isChest);
    if(idx <= 0){
      toast('العنصر في أعلى موضع بالفعل في هذا الدرس');
      return;
    }

    pushHistorySnapshot();

    const temp = merged[idx - 1];
    merged[idx - 1] = merged[idx];
    merged[idx] = temp;

    merged.forEach((item, i) => {
      item.obj.order_index = i + 1;
    });

    saveLocal(true);
    if(isChest) await syncChestToDatabase(merged[idx - 1].obj);
    if(navState.unitId) renderUnitDetail(navState.unitId);
    toast('تم تحريك العنصر للأعلى بنجاح ✓');
  }

  async function moveLessonItemDown(lessonId, itemId, isChest){
    let parentLesson = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if(String(l.id) === String(lessonId)) parentLesson = l;
      });
    });
    if(!parentLesson) return;

    const challenges = (parentLesson.challenges || []).map(ch => ({ id: ch.id, obj: ch, isChest: false, order: ch.order_index || 1 }));
    const chests = (curriculumData.chests || [])
      .filter(c => (String(c.after_lesson_id) === String(lessonId) || String(c.lesson_id) === String(lessonId)) && c.placement_type !== 'unit_start' && c.placement_type !== 'unit_end')
      .map(c => ({ id: c.id, obj: c, isChest: true, order: c.order_index || 999 }));

    const merged = [...challenges, ...chests].sort((a, b) => a.order - b.order);
    const idx = merged.findIndex(x => String(x.id) === String(itemId) && x.isChest === isChest);
    if(idx < 0 || idx >= merged.length - 1){
      toast('العنصر في آخر موضع بالفعل في هذا الدرس');
      return;
    }

    pushHistorySnapshot();

    const temp = merged[idx + 1];
    merged[idx + 1] = merged[idx];
    merged[idx] = temp;

    merged.forEach((item, i) => {
      item.obj.order_index = i + 1;
    });

    saveLocal(true);
    if(isChest) await syncChestToDatabase(merged[idx + 1].obj);
    if(navState.unitId) renderUnitDetail(navState.unitId);
    toast('تم تحريك العنصر للأسفل بنجاح ✓');
  }

  /* ============ VIEW 3: UNIT DETAIL & EXERCISES ============ */
  function showUnitDetail(unitId){
    navState.unitId = unitId;
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    if(u) navState.levelId = u.level_id;

    const overviewEl = document.getElementById('levels-overview-view');
    const detailEl = document.getElementById('level-detail-view');
    const unitDetailEl = document.getElementById('unit-detail-view');

    if(overviewEl) overviewEl.classList.add('hidden');
    if(detailEl) detailEl.classList.remove('active');
    if(unitDetailEl) unitDetailEl.classList.add('active');

    refreshStats(navState.levelId, unitId);
    renderUnitDetail(unitId);
    updatePreviewButtonVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToLevelDetail(){
    navState.unitId = null;
    const overviewEl = document.getElementById('levels-overview-view');
    const detailEl = document.getElementById('level-detail-view');
    const unitDetailEl = document.getElementById('unit-detail-view');

    if(overviewEl) overviewEl.classList.add('hidden');
    if(unitDetailEl) unitDetailEl.classList.remove('active');
    if(detailEl) detailEl.classList.add('active');

    refreshStats(navState.levelId, null);
    if(navState.levelId){
      renderLevelDetail(navState.levelId);
    }
    updatePreviewButtonVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderUnitDetail(unitId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    if(!u) return;

    refreshStats(u.level_id, u.id);

    const selectEl = document.getElementById('select-unit-quick-switch');
    if(selectEl){
      const siblingUnits = (curriculumData.units || []).filter(x => String(x.level_id) === String(u.level_id));
      selectEl.innerHTML = siblingUnits.map(unit => `
        <option value="${unit.id}" ${String(unit.id) === String(u.id) ? 'selected' : ''}>${escapeHtml(unit.title)}</option>
      `).join('');
    }

    const unitChests = (curriculumData.chests || []).filter(c => String(c.unit_id) === String(u.id));

    const hero = document.getElementById('unit-detail-hero');
    if(hero){
      const lessons = u.lessons || [];
      const challengesCount = lessons.reduce((acc, l) => acc + (l.challenges ? l.challenges.length : 0), 0);
      const unitTotalXp = lessons.reduce((acc, l) => acc + (parseInt(l.xp_reward, 10) || 0), 0);

      hero.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="min-width:52px; width:auto; max-width:180px; height:52px; padding:0 8px; border-radius:14px; background:rgba(255,255,255,0.18); border:2px solid rgba(212,175,55,0.6); display:flex; align-items:center; justify-content:center; font-weight:900; color:#D4AF37; overflow:hidden; box-sizing:border-box;">
              ${getBadgeIcon(u.badge, SVG.book)}
            </div>
            <div>
              <div style="display:inline-block; background:rgba(212,175,55,0.25); color:#D4AF37; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:6px; margin-bottom:4px;">الوحدة #${u.order_index || 1}</div>
              <h2 style="margin:0 0 4px 0;">${escapeHtml(u.title)}</h2>
              <p style="margin:0;">${escapeHtml(u.description || 'دروس وتمارين هذه الوحدة')}</p>
            </div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:8px 14px; font-size:0.85rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.openAddChestModalForUnit('${u.id}')">
              ${SVG.gift}
              <span>+ إضافة صندوق مكافأة</span>
            </button>
            <button type="button" class="curriculum-btn curriculum-btn-primary" style="padding:8px 14px; font-size:0.85rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.openEditUnitModal('${u.id}')">
              ${SVG.edit}
              <span>تعديل بيانات الوحدة</span>
            </button>
          </div>
        </div>

        <div class="level-detail-info-grid">
          <div class="level-detail-info-item">
            <label>إجمالي نقاط XP للوحدة</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.zap} ${unitTotalXp} XP</div>
          </div>
          <div class="level-detail-info-item">
            <label>عدد الدروس</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.bookOpen} ${lessons.length}</div>
          </div>
          <div class="level-detail-info-item">
            <label>إجمالي التمارين</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.target} ${challengesCount}</div>
          </div>
          <div class="level-detail-info-item">
            <label>صناديق المكافآت</label>
            <div class="info-value" style="display:flex; align-items:center; gap:6px;">${SVG.gift} ${unitChests.length}</div>
          </div>
        </div>
      `;
    }

    const lessonsListContainer = document.getElementById('unit-detail-lessons-list');
    if(!lessonsListContainer) return;

    const lessons = (u.lessons || []).slice().sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    const startChests = unitChests.filter(c => c.placement_type === 'unit_start');
    const endChests = unitChests.filter(c => c.placement_type === 'unit_end');

    if(lessons.length === 0 && unitChests.length === 0){
      lessonsListContainer.innerHTML = `
        <div style="text-align:center; padding:35px 20px; background:#FFFFFF; border:1px dashed #E7DCC8; border-radius:14px;">
          <p style="font-size:1rem; font-weight:700; color:#4A0D24; margin-bottom:12px;">لا توجد دروس أو صناديق في هذه الوحدة حتى الآن</p>
          <div style="display:flex; gap:10px; justify-content:center;">
            <button type="button" class="curriculum-btn curriculum-btn-primary" onclick="CurriculumAdminSystem.openAddLessonModal('${u.id}')">+ إضافة أول درس</button>
            <button type="button" class="curriculum-btn curriculum-btn-gold" onclick="CurriculumAdminSystem.openAddChestModalForUnit('${u.id}')" style="display:inline-flex; align-items:center; gap:6px;">${SVG.gift} <span>إضافة صندوق مكافآت</span></button>
          </div>
        </div>
      `;
      return;
    }

    let itemsHtml = '';

    // 1. صناديق بداية الوحدة
    startChests.forEach(c => {
      itemsHtml += renderChestFlowCard(c, 'في بداية الوحدة', lessons);
    });

    // 2. الدروس والتمارين والصناديق التابعة لها
    lessons.forEach((l, lIdx) => {
      const challenges = (l.challenges || []).map(ch => ({
        type: 'challenge',
        id: ch.id,
        item: ch,
        order: ch.order_index || 1
      }));

      const lessonChests = (curriculumData.chests || [])
        .filter(c => (String(c.after_lesson_id) === String(l.id) || String(c.lesson_id) === String(l.id)) && c.placement_type !== 'unit_start' && c.placement_type !== 'unit_end')
        .map(c => ({
          type: 'chest',
          id: c.id,
          item: c,
          order: c.order_index || 999
        }));

      const allItems = [...challenges, ...lessonChests].sort((a,b) => (a.order - b.order));

      itemsHtml += `
        <div class="lesson-item-box" data-lesson-id="${l.id}" draggable="true" ondragstart="CurriculumAdminSystem.handleDragStart(event, 'lesson', '${l.id}')" ondragover="CurriculumAdminSystem.handleDragOver(event)" ondragleave="CurriculumAdminSystem.handleDragLeave(event)" ondrop="CurriculumAdminSystem.handleDrop(event, 'lesson', '${l.id}')" ondragend="CurriculumAdminSystem.handleDragEnd(event)">
          <div class="lesson-item-header">
            <div class="lesson-item-title-area">
              <span class="drag-handle-lesson" title="اسحب للترتيب">${SVG.gripVertical}</span>
              <h5>الدرس #${l.order_index || (lIdx + 1)}: ${escapeHtml(l.title)}</h5>
              <span class="lesson-xp-badge" title="نقاط درس الشرح">${SVG.zap} درس: ${l.xp_reward ?? 20} XP</span>
              <span class="lesson-xp-badge" style="background:#EDE9FE; color:#6D28D9; border-color:#DDD6FE;" title="نقاط محطة التطبيق والاستماع">${SVG.zap} تطبيق: ${l.practice_xp ?? 20} XP</span>
              <span class="lesson-xp-badge" style="background:#FEF3C7; color:#B45309; border-color:#FDE68A;" title="نقاط محطة تحدي الإتقان">${SVG.zap} تحدي: ${l.challenge_xp ?? 30} XP</span>
              <span class="curriculum-chip">${allItems.length} عناصر تدريبية</span>
            </div>
            <div class="lesson-item-actions">
              <button type="button" class="curriculum-btn curriculum-btn-primary" style="padding:6px 12px; font-size:0.82rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.openAddChallengeModal('${l.id}')">
                ${SVG.plus}
                <span>إضافة تمرين</span>
              </button>
              <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:6px 12px; font-size:0.82rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.openAddChestToLesson('${u.id}', '${l.id}')" title="إضافة صندوق مكافأة داخل هذا الدرس">
                ${SVG.gift}
                <span>إضافة صندوق</span>
              </button>
              <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:6px 12px; font-size:0.82rem; display:flex; align-items:center; gap:6px;" onclick="CurriculumAdminSystem.openInteractivePreview('${l.id}')" title="معاينة تفاعلية لهذا الدرس">
                ${SVG.playCircle}
                <span>معاينة</span>
              </button>
              <button type="button" class="btn-edit-level" style="width:36px; height:36px;" onclick="CurriculumAdminSystem.openEditLessonModal('${l.id}')" title="تعديل بيانات الدرس">${SVG.edit}</button>
              <button type="button" class="btn-delete-level" style="width:36px; height:36px;" onclick="CurriculumAdminSystem.deleteLesson('${l.id}')" title="حذف الدرس">${SVG.trash}</button>
            </div>
          </div>

          <div class="challenges-list-vertical">
            ${allItems.length === 0 ? `
              <div style="text-align:center; padding:18px; color:#A89F91; font-size:0.88rem; background:#FBF8F1; border-radius:10px;">
                لا توجد تمارين أو صناديق في هذا الدرس حتى الآن. انقر على "+ إضافة تمرين" أو "إضافة صندوق" بالأعلى لإضافة عناصر.
              </div>
            ` : allItems.map((entry, idx) => {
              if(entry.type === 'challenge'){
                const c = entry.item;
                const typeLabel = getChallengeTypeName(c.type);
                return `
                  <div class="challenge-row-card" data-challenge-id="${c.id}" draggable="true" ondragstart="CurriculumAdminSystem.handleDragStart(event, 'challenge', '${c.id}')" ondragover="CurriculumAdminSystem.handleDragOver(event)" ondragleave="CurriculumAdminSystem.handleDragLeave(event)" ondrop="CurriculumAdminSystem.handleDrop(event, 'challenge', '${c.id}')" ondragend="CurriculumAdminSystem.handleDragEnd(event)">
                    <div class="challenge-row-content">
                      <span class="drag-handle-ch" title="اسحب للترتيب">${SVG.gripVertical}</span>
                      <span style="font-weight:900; color:#D4AF37; font-size:0.88rem; min-width:24px; text-align:center;">#${idx + 1}</span>
                      <span class="curriculum-exercise-type-tag">${escapeHtml(typeLabel)}</span>
                      <div style="flex:1; min-width:0;">
                        <div style="font-weight:700; font-size:0.92rem; color:#241D20; line-height:1.4;">
                          ${escapeHtml(c.question)}
                        </div>
                        ${c.coptic_display ? `<span class="coptic coptic-font coptic-display-val" style="font-size:1.25rem; color:#6F1737; font-weight:800; display:inline-block; margin-top:4px; font-family:'girges', 'Coptic Girges', sans-serif !important; direction:ltr; unicode-bidi:isolate; letter-spacing:0.5px;">${escapeHtml(c.coptic_display)}</span>` : ''}
                      </div>
                    </div>
                    <div class="challenge-row-actions">
                      <!-- أزرار الترتيب الفوري ⬆ / ⬇ بين التمارين والصناديق -->
                      <div style="display:flex; align-items:center; gap:2px; background:#FFFFFF; border:1px solid #E7DCC8; border-radius:6px; padding:2px 4px;">
                        <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.85rem; padding:2px 4px; color:#6F1737; font-weight:900;" onclick="CurriculumAdminSystem.moveLessonItemUp('${l.id}', '${c.id}', false)" title="تحريك التمرين للأعلى">${SVG.arrowUp}</button>
                        <span style="font-size:0.72rem; color:#D4AF37;">|</span>
                        <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.85rem; padding:2px 4px; color:#6F1737; font-weight:900;" onclick="CurriculumAdminSystem.moveLessonItemDown('${l.id}', '${c.id}', false)" title="تحريك التمرين للأسفل">${SVG.arrowDown}</button>
                      </div>
                      ${(c.audio_url || c.audio_text) ? `
                        <button type="button" class="coptic-audio-circle-btn" onclick="CurriculumAdminSystem.playAudioSnippet('${escapeJs(c.audio_url || '')}', '${escapeJs(c.audio_text || '')}', this)" title="تشغيل النطق الصوتي" aria-label="تشغيل النطق الصوتي">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                          </svg>
                        </button>
                      ` : ''}
                      <button type="button" class="btn-edit-level" style="width:34px; height:34px;" onclick="CurriculumAdminSystem.openEditChallengeModal('${c.id}')" title="تعديل التمرين">${SVG.edit}</button>
                      <button type="button" class="btn-delete-level" style="width:34px; height:34px;" onclick="CurriculumAdminSystem.deleteChallenge('${c.id}')" title="حذف التمرين">${SVG.trash}</button>
                    </div>
                  </div>
                `;
              } else {
                const c = entry.item;
                return renderChestAsChallengeCard(c, l.id, idx + 1);
              }
            }).join('')}
          </div>
        </div>
      `;
    });

    // 3. صناديق نهاية الوحدة
    endChests.forEach(c => {
      itemsHtml += renderChestFlowCard(c, 'في نهاية الوحدة', lessons);
    });

    lessonsListContainer.innerHTML = itemsHtml;
  }

  function renderChestFlowCard(c, placementLabel, unitLessons = []){
    const xpDisplay = c.xp_mode === 'range' ? `${c.xp_min || 20}~${c.xp_max || 50} XP` : `${c.xp_min || 30} XP`;
    return `
      <div class="curriculum-chest-flow-card" data-chest-id="${c.id}" draggable="true" 
           ondragstart="CurriculumAdminSystem.handleDragStart(event, 'chest', '${c.id}')" 
           ondragover="CurriculumAdminSystem.handleDragOver(event)" 
           ondragleave="CurriculumAdminSystem.handleDragLeave(event)" 
           ondrop="CurriculumAdminSystem.handleDrop(event, 'chest', '${c.id}')" 
           ondragend="CurriculumAdminSystem.handleDragEnd(event)">
        <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:240px;">
          <span class="drag-handle-chest" title="اسحب الصندوق لتغيير مكانه بين الدروس">${SVG.gripVertical}</span>
          
          <!-- أيقونة الصندوق الذهبي المصغرة ذات الياقوتة الحمراء المطابقة للصورة -->
          <div style="width:48px; height:40px; flex-shrink:0; cursor:pointer;" onclick="CurriculumAdminSystem.previewChest('${c.id}')" title="انقر لمعاينة الصندوق">
            <svg viewBox="0 0 96 74" width="48" height="38" fill="none">
              <ellipse cx="48" cy="67" rx="34" ry="5.5" fill="rgba(80,50,10,0.2)"/>
              <rect x="15" y="28" width="66" height="34" rx="6" fill="#D6A42E" stroke="#5E3F0A" stroke-width="2.5"/>
              <line x1="28" y1="30" x2="28" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
              <line x1="41" y1="30" x2="41" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
              <line x1="55" y1="30" x2="55" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
              <line x1="68" y1="30" x2="68" y2="61" stroke="#5E3F0A" stroke-width="1.8" opacity="0.6"/>
              <rect x="13" y="58" width="70" height="5" rx="2.5" fill="#B37C17" stroke="#5E3F0A" stroke-width="2"/>
              <path d="M14 29 C14 13, 26 7, 48 7 C70 7, 82 13, 82 29 Z" fill="#ECC757" stroke="#5E3F0A" stroke-width="2.5"/>
              <rect x="12" y="27" width="72" height="5" rx="2" fill="#FFE066" stroke="#5E3F0A" stroke-width="2"/>
              <rect x="41" y="23" width="14" height="17" rx="3.5" fill="#6B470D" stroke="#FFE175" stroke-width="1.8"/>
              <!-- الياقوتة الحمراء المركزية -->
              <rect x="44" y="26.5" width="8" height="10" rx="2" fill="#D80032" stroke="#FFD1DC" stroke-width="0.8"/>
              <circle cx="46" cy="28.5" r="1.2" fill="#FFFFFF"/>
            </svg>
          </div>

          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:2px;">
              <span style="font-weight:900; font-size:1rem; color:#4A0D24; display:inline-flex; align-items:center; gap:6px;">${SVG.gift} <span>${escapeHtml(c.title || 'صندوق المكافأة السري')}</span></span>
              <span style="background:#FFF2D6; border:1px solid #D4AF37; color:#8C6A1A; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:10px;">${placementLabel || 'في المسار'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:#706354; flex-wrap:wrap;">
              <span style="background:rgba(0,163,255,0.12); color:#0077B6; padding:1px 6px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">${SVG.zap} <span>${xpDisplay}</span></span>
              ${c.hearts > 0 ? `<span style="background:rgba(255,75,75,0.12); color:#D92D20; padding:1px 6px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">${SVG.heart} <span>+${c.hearts}</span></span>` : ''}
              ${c.has_badge ? `<span style="background:rgba(212,175,55,0.2); color:#8C6A1A; padding:1px 6px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">${SVG.trophy} <span>وسام: ${escapeHtml(c.badge_title || 'متقن الأبجدية')}</span></span>` : ''}
              <span>• ${escapeHtml(c.description || 'مكافأة تشجيعية')}</span>
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <!-- أزرار الترتيب الفوري ⬆ / ⬇ -->
          <div style="display:flex; align-items:center; gap:2px; background:#FFFFFF; border:1.5px solid #D4AF37; border-radius:8px; padding:2px 6px;">
            <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.88rem; padding:3px 4px; color:#8C6A1A; font-weight:900;" onclick="CurriculumAdminSystem.moveChestUp('${c.id}')" title="تحريك الصندوق للأعلى خطوة">${SVG.arrowUp}</button>
            <span style="font-size:0.75rem; color:#D4AF37;">|</span>
            <button type="button" style="border:none; background:none; cursor:pointer; font-size:0.88rem; padding:3px 4px; color:#8C6A1A; font-weight:900;" onclick="CurriculumAdminSystem.moveChestDown('${c.id}')" title="تحريك الصندوق للأسفل خطوة">${SVG.arrowDown}</button>
          </div>

          <!-- قائمة موضع الصندوق الفورية السريعة -->
          <select onchange="CurriculumAdminSystem.changeChestPosition('${c.id}', this.value)" style="border-radius:8px; padding:6px 8px; font-size:0.78rem; font-weight:800; border:1.5px solid #D4AF37; background:#FFFFFF; color:#4A0D24; cursor:pointer; max-width:180px;" title="اختر موضع الصندوق في مسار الوحدة">
            <option value="unit_start" ${c.placement_type === 'unit_start' ? 'selected' : ''}>بداية الوحدة</option>
            ${unitLessons.map(l => `
              <option value="after_${l.id}" ${(c.placement_type === 'after_lesson' && String(c.after_lesson_id) === String(l.id)) ? 'selected' : ''}>بعد: ${escapeHtml(l.title)}</option>
            `).join('')}
            <option value="unit_end" ${c.placement_type === 'unit_end' ? 'selected' : ''}>نهاية الوحدة</option>
          </select>

          <!-- أزرار المعاينة والتعديل والحذف -->
          <button type="button" class="curriculum-btn curriculum-btn-gold" style="padding:6px 12px; font-size:0.82rem; display:flex; align-items:center; gap:5px;" onclick="CurriculumAdminSystem.previewChest('${c.id}')" title="معاينة شكل واحتفال الصندوق">
            ${SVG.playCircle}
            <span>معاينة</span>
          </button>
          <button type="button" class="btn-edit-level" style="width:36px; height:36px;" onclick="CurriculumAdminSystem.openEditChestModal('${c.id}')" title="تعديل بيانات الصندوق ومكافآته">${SVG.edit}</button>
          <button type="button" class="btn-delete-level" style="width:36px; height:36px;" onclick="CurriculumAdminSystem.deleteChest('${c.id}')" title="حذف الصندوق">${SVG.trash}</button>
        </div>
      </div>
    `;
  }

  async function changeChestPosition(chestId, targetVal){
    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    pushHistorySnapshot();
    if(targetVal === 'unit_start'){
      chest.placement_type = 'unit_start';
      chest.after_lesson_id = null;
    } else if(targetVal === 'unit_end'){
      chest.placement_type = 'unit_end';
      chest.after_lesson_id = null;
    } else if(targetVal && targetVal.startsWith('after_')){
      chest.placement_type = 'after_lesson';
      chest.after_lesson_id = targetVal.replace('after_', '');
    }

    saveLocal(true);
    if(window.sb){
      try {
        await sb.from('chests').upsert({
          id: chest.id,
          level_id: chest.level_id ? parseInt(chest.level_id, 10) : 1,
          unit_id: chest.unit_id ? parseInt(chest.unit_id, 10) : null,
          title: chest.title,
          description: chest.description || '',
          placement_type: chest.placement_type,
          after_lesson_id: (chest.placement_type === 'after_lesson' && chest.after_lesson_id) ? parseInt(chest.after_lesson_id, 10) : null,
          xp_mode: chest.xp_mode || 'range',
          xp_min: parseInt(chest.xp_min, 10) || 20,
          xp_max: parseInt(chest.xp_max, 10) || 50,
          hearts: parseInt(chest.hearts, 10) || 0,
          has_badge: !!chest.has_badge,
          badge_title: chest.badge_title || '',
          badge_icon: chest.badge_icon || 'trophy',
          badge_desc: chest.badge_desc || ''
        });
      } catch(err){
        console.warn('Error syncing moved chest to Supabase:', err);
      }
    }

    if(navState.unitId) renderUnitDetail(navState.unitId);
    if(navState.levelId) renderLevelDetail(navState.levelId);
    toast('تم تغيير موضع الصندوق بنجاح ✓');
  }

  async function moveChestUp(chestId){
    const unit = (curriculumData.units || []).find(u => String(u.id) === String(navState.unitId));
    if(!unit) return;
    const lessons = (unit.lessons || []).slice().sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    const slots = ['unit_start'];
    lessons.forEach(l => slots.push(`after_${l.id}`));
    slots.push('unit_end');

    const currentSlot = chest.placement_type === 'unit_start' ? 'unit_start'
      : (chest.placement_type === 'unit_end' ? 'unit_end' : `after_${chest.after_lesson_id}`);
    const currIdx = slots.indexOf(currentSlot);
    if(currIdx > 0){
      await changeChestPosition(chestId, slots[currIdx - 1]);
    } else {
      toast('الصندوق في أعلى موضع بالفعل في هذه الوحدة');
    }
  }

  async function moveChestDown(chestId){
    const unit = (curriculumData.units || []).find(u => String(u.id) === String(navState.unitId));
    if(!unit) return;
    const lessons = (unit.lessons || []).slice().sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
    if(!chest) return;

    const slots = ['unit_start'];
    lessons.forEach(l => slots.push(`after_${l.id}`));
    slots.push('unit_end');

    const currentSlot = chest.placement_type === 'unit_start' ? 'unit_start'
      : (chest.placement_type === 'unit_end' ? 'unit_end' : `after_${chest.after_lesson_id}`);
    const currIdx = slots.indexOf(currentSlot);
    if(currIdx >= 0 && currIdx < slots.length - 1){
      await changeChestPosition(chestId, slots[currIdx + 1]);
    } else {
      toast('الصندوق في آخر موضع بالفعل في هذه الوحدة');
    }
  }

  function openAddChestAtStart(unitId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    openAddChestModal(u ? u.level_id : navState.levelId, unitId);
    setTimeout(() => {
      const placementEl = document.getElementById('chest-input-placement');
      if(placementEl) {
        placementEl.value = 'unit_start';
        onChestPlacementChange();
      }
      updateChestModalPreview();
    }, 100);
  }

  function openAddChestAtEnd(unitId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    openAddChestModal(u ? u.level_id : navState.levelId, unitId);
    setTimeout(() => {
      const placementEl = document.getElementById('chest-input-placement');
      if(placementEl) {
        placementEl.value = 'unit_end';
        onChestPlacementChange();
      }
      updateChestModalPreview();
    }, 100);
  }

  function getChallengeTypeName(type){
    switch(type){
      case 'trace': return 'تتبع ورسم قبطي (Tracing)';
      case 'image_select': return 'انظر للصورة واختر (Image & Select)';
      case 'image_view': return 'انظر للصورة فقط (Image Only)';
      case 'text_view': return 'قراءة نص وشرح (Text & Info)';
      case 'read_select': return 'اقرأ واختر (Read & Select)';
      case 'listen_write': return 'استمع واكتب (Listen & Type)';
      case 'select': return 'اختيار من متعدد';
      case 'listen': return 'استماع وتعرف';
      case 'match': return 'توصيل أزواج';
      case 'write': return 'تركيب / كتابة الكلمة';
      case 'true_false': return 'صح أم خطأ';
      case 'fill_blank': return 'أكمل الفراغ';
      default: return 'تمرين تفاعلي';
    }
  }

  /* ============ ROBUST REORDERING & SYNCING SYSTEM ============ */
  let draggedItemInfo = null;

  async function reindexCollection(arr, tableName = null){
    if(!Array.isArray(arr)) return;
    arr.forEach((item, idx) => {
      if(item){
        const newIndex = idx + 1;
        item.order_index = newIndex;
        if(tableName === 'units' && item.title && /^الوحدة\s*\d+\s*[:\-]\s*/.test(item.title)){
          item.title = item.title.replace(/^الوحدة\s*\d+/, `الوحدة ${newIndex}`);
        } else if(tableName === 'lessons' && item.title && /^الدرس\s*\d+\s*[:\-]\s*/.test(item.title)){
          item.title = item.title.replace(/^الدرس\s*\d+/, `الدرس ${newIndex}`);
        } else if(tableName === 'levels' && item.title && /^المستوى\s*\d+\s*[:\-]\s*/.test(item.title)){
          item.title = item.title.replace(/^المستوى\s*\d+/, `المستوى ${newIndex}`);
        }
      }
    });

    if(window.sb && tableName){
      try {
        const realItems = arr.filter(item => item && !isTempId(item.id) && !isNaN(parseInt(item.id)));
        if(realItems.length > 0){
          const updates = realItems.map(item => {
            const payload = { order_index: item.order_index };
            if(item.title) payload.title = item.title;
            return sb.from(tableName).update(payload).eq('id', parseInt(item.id));
          });
          await Promise.all(updates);
        }
      } catch(err){
        console.warn(`Failed to sync reindexed ${tableName} to Supabase:`, err);
      }
    }
  }

  async function reorderAndSyncCollection(items, movedItem, targetOrder, tableName){
    if(!Array.isArray(items) || !movedItem) return;
    
    // 1. Remove moved item from its current place in items
    const filtered = items.filter(item => String(item.id) !== String(movedItem.id));
    
    // 2. Clamp target index (0-based)
    const targetIdx = Math.max(0, Math.min(targetOrder - 1, filtered.length));
    
    // 3. Insert moved item at the exact target position
    filtered.splice(targetIdx, 0, movedItem);
    
    // 4. Update the array in-place
    items.length = 0;
    filtered.forEach(item => items.push(item));
    
    // 5. Re-index sequentially and sync to Supabase
    await reindexCollection(items, tableName);
  }

  function handleDragStart(e, type, id){
    draggedItemInfo = { type, id: String(id) };
    if(e.dataTransfer){
      e.dataTransfer.effectAllowed = 'move';
      try {
        e.dataTransfer.setData('text/plain', JSON.stringify(draggedItemInfo));
      } catch(err){}
    }
    const card = e.currentTarget || (e.target && e.target.closest ? e.target.closest(`[data-${type}-id]`) : null) || e.target;
    if(card && card.classList) card.classList.add('dragging');
  }

  function handleDragOver(e){
    e.preventDefault();
    if(e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    const card = e.currentTarget;
    if(card && !card.classList.contains('dragging')){
      card.classList.add('drag-over');
    }
  }

  function handleDragLeave(e){
    const card = e.currentTarget;
    if(card) card.classList.remove('drag-over');
  }

  function handleDragEnd(e){
    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    draggedItemInfo = null;
  }

  async function handleDrop(e, targetType, targetId){
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));

    if(!draggedItemInfo){
      try {
        const raw = e.dataTransfer ? e.dataTransfer.getData('text/plain') : null;
        if(raw) draggedItemInfo = JSON.parse(raw);
      } catch(err){}
    }

    // التعامل مع سحب وإفلات عناصر التمارين وصناديق المكافآت بين التمارين
    if(draggedItemInfo && (draggedItemInfo.type === 'challenge' || draggedItemInfo.type === 'chest') && (targetType === 'challenge' || targetType === 'chest')){
      const srcId = String(draggedItemInfo.id);
      const trgId = String(targetId);
      const srcIsChest = draggedItemInfo.type === 'chest';
      const trgIsChest = targetType === 'chest';
      draggedItemInfo = null;

      if(srcId === trgId && srcIsChest === trgIsChest) return;

      // Find target lesson
      let targetLesson = null;
      let targetUnit = null;
      (curriculumData.units || []).forEach(u => {
        (u.lessons || []).forEach(l => {
          if(!trgIsChest && (l.challenges || []).some(c => String(c.id) === trgId)) {
            targetLesson = l; targetUnit = u;
          }
          if(trgIsChest && ((curriculumData.chests || []).some(c => String(c.id) === trgId && (String(c.after_lesson_id) === String(l.id) || String(c.lesson_id) === String(l.id))))) {
            targetLesson = l; targetUnit = u;
          }
        });
      });

      if(targetLesson){
        pushHistorySnapshot();
        if(srcIsChest){
          const chest = (curriculumData.chests || []).find(c => String(c.id) === srcId);
          if(chest && targetUnit){
            chest.unit_id = targetUnit.id;
            chest.after_lesson_id = targetLesson.id;
            chest.lesson_id = targetLesson.id;
            chest.placement_type = 'after_lesson';
          }
        }

        const challenges = (targetLesson.challenges || []).map(ch => ({ id: ch.id, obj: ch, isChest: false, order: ch.order_index || 1 }));
        const chests = (curriculumData.chests || [])
          .filter(c => (String(c.after_lesson_id) === String(targetLesson.id) || String(c.lesson_id) === String(targetLesson.id)) && c.placement_type !== 'unit_start' && c.placement_type !== 'unit_end')
          .map(c => ({ id: c.id, obj: c, isChest: true, order: c.order_index || 999 }));

        let merged = [...challenges, ...chests].sort((a,b) => a.order - b.order);
        const fromIdx = merged.findIndex(x => String(x.id) === srcId && x.isChest === srcIsChest);
        const toIdx = merged.findIndex(x => String(x.id) === trgId && x.isChest === trgIsChest);

        if(fromIdx > -1 && toIdx > -1){
          const [moved] = merged.splice(fromIdx, 1);
          merged.splice(toIdx, 0, moved);
        } else if(fromIdx === -1 && toIdx > -1){
          if(srcIsChest){
            const chest = (curriculumData.chests || []).find(c => String(c.id) === srcId);
            if(chest) merged.splice(toIdx, 0, { id: chest.id, obj: chest, isChest: true, order: 999 });
          }
        }

        merged.forEach((item, i) => {
          item.obj.order_index = i + 1;
        });

        saveLocal(true);
        if(srcIsChest){
          const chest = (curriculumData.chests || []).find(c => String(c.id) === srcId);
          if(chest) await syncChestToDatabase(chest);
        }
        if(navState.unitId) renderUnitDetail(navState.unitId);
        toast('تم إعادة ترتيب العنصر بالسحب بنجاح ✓');
        return;
      }
    }

    // التعامل مع سحب وإفلات الصناديق في مستوى الوحدات
    if(draggedItemInfo && draggedItemInfo.type === 'chest'){
      const chestId = draggedItemInfo.id;
      const chest = (curriculumData.chests || []).find(c => String(c.id) === String(chestId));
      draggedItemInfo = null;
      if(!chest) return;

      pushHistorySnapshot();

      if(targetType === 'unit'){
        const targetUnit = (curriculumData.units || []).find(u => String(u.id) === String(targetId));
        if(targetUnit){
          chest.unit_id = targetUnit.id;
          chest.level_id = targetUnit.level_id;
          chest.placement_type = 'after_lesson';
          chest.after_lesson_id = (targetUnit.lessons && targetUnit.lessons.length > 0) ? targetUnit.lessons[targetUnit.lessons.length - 1].id : null;
        }
      } else if(targetType === 'chest_in_units'){
        const targetChest = (curriculumData.chests || []).find(c => String(c.id) === String(targetId));
        if(targetChest && String(targetChest.id) !== String(chest.id)){
          chest.placement_type = targetChest.placement_type;
          chest.after_lesson_id = targetChest.after_lesson_id;
          chest.unit_id = targetChest.unit_id;
          chest.level_id = targetChest.level_id;
        }
      }

      saveLocal(true);
      await syncChestToDatabase(chest);

      if(navState.unitId) renderUnitDetail(navState.unitId);
      if(navState.levelId) renderLevelDetail(navState.levelId);
      toast(`تم نقل وتغيير موضع «${chest.title || 'صندوق المكافأة'}» بالسحب بنجاح ✓`);
      return;
    }

    if(!draggedItemInfo || draggedItemInfo.type !== targetType || String(draggedItemInfo.id) === String(targetId)) {
      draggedItemInfo = null;
      return;
    }

    pushHistorySnapshot();
    const { type, id: srcId } = draggedItemInfo;
    draggedItemInfo = null;

    if(type === 'level'){
      const levels = getLevels();
      const srcIdx = levels.findIndex(l => String(l.id) === String(srcId));
      const trgIdx = levels.findIndex(l => String(l.id) === String(targetId));
      if(srcIdx > -1 && trgIdx > -1){
        const [moved] = levels.splice(srcIdx, 1);
        levels.splice(trgIdx, 0, moved);
        await reindexCollection(levels, 'levels');
        curriculumData.levels = levels;
        saveLocal(true);
        renderLevelsOverview();
        refreshStats();
        toast('تم إعادة ترتيب المستويات بالسحب بنجاح');
      }
    } else if(type === 'unit'){
      const units = curriculumData.units || [];
      const srcUnit = units.find(u => String(u.id) === String(srcId));
      if(srcUnit){
        const levelUnits = units.filter(u => String(u.level_id) === String(srcUnit.level_id))
          .sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
        const srcIdx = levelUnits.findIndex(u => String(u.id) === String(srcId));
        const trgIdx = levelUnits.findIndex(u => String(u.id) === String(targetId));
        if(srcIdx > -1 && trgIdx > -1){
          const [moved] = levelUnits.splice(srcIdx, 1);
          levelUnits.splice(trgIdx, 0, moved);
          await reindexCollection(levelUnits, 'units');
          const otherUnits = units.filter(u => String(u.level_id) !== String(srcUnit.level_id));
          curriculumData.units = [...otherUnits, ...levelUnits];
          saveLocal(true);
          if(navState.levelId) renderLevelDetail(navState.levelId);
          refreshStats();
          toast('تم إعادة ترتيب الوحدات بالسحب بنجاح');
        }
      }
    } else if(type === 'lesson'){
      let targetUnit = null;
      (curriculumData.units || []).forEach(u => {
        if((u.lessons || []).some(l => String(l.id) === String(srcId))){
          targetUnit = u;
        }
      });
      if(targetUnit){
        const lessons = targetUnit.lessons;
        const srcIdx = lessons.findIndex(l => String(l.id) === String(srcId));
        const trgIdx = lessons.findIndex(l => String(l.id) === String(targetId));
        if(srcIdx > -1 && trgIdx > -1){
          const [moved] = lessons.splice(srcIdx, 1);
          lessons.splice(trgIdx, 0, moved);
          await reindexCollection(lessons, 'lessons');
          saveLocal(true);
          if(navState.unitId) renderUnitDetail(navState.unitId);
          refreshStats();
          toast('تم إعادة ترتيب الدروس بالسحب بنجاح');
        }
      }
    } else if(type === 'challenge'){
      let targetLesson = null;
      (curriculumData.units || []).forEach(u => {
        (u.lessons || []).forEach(l => {
          if((l.challenges || []).some(c => String(c.id) === String(srcId))){
            targetLesson = l;
          }
        });
      });
      if(targetLesson){
        const challenges = targetLesson.challenges;
        const srcIdx = challenges.findIndex(c => String(c.id) === String(srcId));
        const trgIdx = challenges.findIndex(c => String(c.id) === String(targetId));
        if(srcIdx > -1 && trgIdx > -1){
          const [moved] = challenges.splice(srcIdx, 1);
          challenges.splice(trgIdx, 0, moved);
          await reindexCollection(challenges, 'challenges');
          saveLocal(true);
          if(navState.unitId) renderUnitDetail(navState.unitId);
          refreshStats();
          toast('تم إعادة ترتيب التمارين بالسحب بنجاح');
        }
      }
    }
  }

  /* ============ MANUAL MOVE UP / DOWN (ACCESSIBLE / MOBILE) ============ */
  async function moveLevel(levelId, dir){
    pushHistorySnapshot();
    const levels = getLevels();
    const idx = levels.findIndex(l => String(l.id) === String(levelId));
    if(idx === -1) return;
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if(targetIdx < 0 || targetIdx >= levels.length) return;

    const temp = levels[idx];
    levels[idx] = levels[targetIdx];
    levels[targetIdx] = temp;

    await reindexCollection(levels, 'levels');
    curriculumData.levels = levels;
    saveLocal(true);
    renderLevelsOverview();
    refreshStats();
    toast('تم تغيير ترتيب المستوى');
  }

  async function moveUnitInLevel(unitId, dir){
    pushHistorySnapshot();
    const units = curriculumData.units || [];
    const currentUnit = units.find(u => String(u.id) === String(unitId));
    if(!currentUnit) return;
    const siblingUnits = units.filter(u => String(u.level_id) === String(currentUnit.level_id))
      .sort((a,b) => (a.order_index || 1) - (b.order_index || 1));
    const sIdx = siblingUnits.findIndex(u => String(u.id) === String(unitId));
    const targetSIdx = dir === 'up' ? sIdx - 1 : sIdx + 1;
    if(targetSIdx < 0 || targetSIdx >= siblingUnits.length) return;

    const [moved] = siblingUnits.splice(sIdx, 1);
    siblingUnits.splice(targetSIdx, 0, moved);

    await reindexCollection(siblingUnits, 'units');

    const otherUnits = units.filter(u => String(u.level_id) !== String(currentUnit.level_id));
    curriculumData.units = [...otherUnits, ...siblingUnits];
    saveLocal(true);
    if(navState.levelId) renderLevelDetail(navState.levelId);
    refreshStats();
    toast('تم تغيير ترتيب الوحدة');
  }

  async function moveLessonInUnit(lessonId, dir){
    pushHistorySnapshot();
    let parentUnit = null;
    (curriculumData.units || []).forEach(u => {
      if((u.lessons || []).some(l => String(l.id) === String(lessonId))){
        parentUnit = u;
      }
    });
    if(!parentUnit) return;
    const lessons = parentUnit.lessons;
    const idx = lessons.findIndex(l => String(l.id) === String(lessonId));
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if(targetIdx < 0 || targetIdx >= lessons.length) return;

    const temp = lessons[idx];
    lessons[idx] = lessons[targetIdx];
    lessons[targetIdx] = temp;

    await reindexCollection(lessons, 'lessons');
    saveLocal(true);
    if(navState.unitId) renderUnitDetail(navState.unitId);
    refreshStats();
    toast('تم تغيير ترتيب الدرس');
  }

  async function moveChallengeInLesson(challengeId, dir){
    pushHistorySnapshot();
    let parentLesson = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if((l.challenges || []).some(c => String(c.id) === String(challengeId))){
          parentLesson = l;
        }
      });
    });
    if(!parentLesson) return;
    const challenges = parentLesson.challenges;
    const idx = challenges.findIndex(c => String(c.id) === String(challengeId));
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if(targetIdx < 0 || targetIdx >= challenges.length) return;

    const temp = challenges[idx];
    challenges[idx] = challenges[targetIdx];
    challenges[targetIdx] = temp;

    await reindexCollection(challenges, 'challenges');
    saveLocal(true);
    if(navState.unitId) renderUnitDetail(navState.unitId);
    refreshStats();
    toast('تم تغيير ترتيب التمرين');
  }

  /* ============ MEDIA ASSET CLEANUP HELPERS ============ */
  function getChallengeMediaUrls(c){
    if(!c) return [];
    const urls = [];
    if(c.audio_url) urls.push(c.audio_url);
    if(Array.isArray(c.options)){
      c.options.forEach(opt => {
        if(opt.audio_url) urls.push(opt.audio_url);
        if(opt.image_url) urls.push(opt.image_url);
      });
    }
    return urls;
  }

  function getLessonMediaUrls(l){
    if(!l) return [];
    let urls = [];
    (l.challenges || []).forEach(c => {
      urls = urls.concat(getChallengeMediaUrls(c));
    });
    return urls;
  }

  function getUnitMediaUrls(u){
    if(!u) return [];
    let urls = [];
    (u.lessons || []).forEach(l => {
      urls = urls.concat(getLessonMediaUrls(l));
    });
    return urls;
  }

  function getLevelMediaUrls(levelId){
    const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(levelId));
    let urls = [];
    units.forEach(u => {
      urls = urls.concat(getUnitMediaUrls(u));
    });
    return urls;
  }

  /* ============ SAFE CASCADING DELETE WITH CONFIRMATION & STORAGE CLEANUP ============ */
  async function deleteLevel(levelId){
    const levels = getLevels();
    if(levels.length <= 1){
      toast('لا يمكن حذف المستوى الوحيد المتبقي في المنهج', true);
      return;
    }
    const lvl = levels.find(l => String(l.id) === String(levelId));
    if(!lvl) return;

    const units = (curriculumData.units || []).filter(u => String(u.level_id) === String(lvl.id));
    let lessonsCount = 0;
    let challengesCount = 0;
    units.forEach(u => {
      lessonsCount += (u.lessons || []).length;
      (u.lessons || []).forEach(l => {
        challengesCount += (l.challenges || []).length;
      });
    });

    const confirmHtml = `
      <div style="text-align:right; font-size:0.95rem; line-height:1.6; color:#241D20;">
        <p>أنت على وشك حذف المستوى: <strong>«${escapeHtml(lvl.title)}»</strong>.</p>
        <p style="color:#B53A3A; font-weight:700; margin:10px 0;">سيؤدي هذا الإجراء إلى حذف نهائي من Supabase والتخزين السحابي لكل من:</p>
        <ul style="margin:0; padding-right:20px; color:#4A0D24;">
          <li>${units.length} وحدة تعليمية</li>
          <li>${lessonsCount} درساً</li>
          <li>${challengesCount} تمريناً تفاعلياً</li>
          <li>كافة الملفات الصوتية والصور التابعة</li>
        </ul>
      </div>
    `;

    if(window.Swal){
      const res = await Swal.fire({
        title: 'تنبيه أمان: تأكيد حذف المستوى نهائياً',
        html: confirmHtml,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذف المستوى وتوابعه نهائياً',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#B53A3A',
        cancelButtonColor: '#746B6F'
      });
      if(!res.isConfirmed) return;
    } else {
      if(!confirm(`هل أنت متأكد من حذف مستوى «${lvl.title}» وجميع وحداته (${units.length}) ودروسه (${lessonsCount}) نهائياً؟`)) return;
    }

    const mediaUrls = getLevelMediaUrls(levelId);
    pushHistorySnapshot();

    if(window.sb && !isTempId(lvl.id) && !isNaN(parseInt(lvl.id))){
      try {
        const { error } = await sb.from('levels').delete().eq('id', parseInt(lvl.id));
        if(error) throw error;
      } catch(err){
        console.error('Supabase delete level error:', err);
        toast('تعذر حذف المستوى من السحابة: ' + (err.message || ''), true);
        return;
      }
    }

    // تنظيف وحذف جميع الملفات الصوتية والصور المرتبطة من التخزين السحابي Supabase Storage
    if(window.deleteStorageFiles && mediaUrls.length > 0){
      await window.deleteStorageFiles(mediaUrls);
    }

    curriculumData.levels = levels.filter(l => String(l.id) !== String(levelId));
    curriculumData.units = (curriculumData.units || []).filter(u => String(u.level_id) !== String(levelId));
    if(String(navState.levelId) === String(levelId)) navState.levelId = null;

    await reindexCollection(curriculumData.levels, 'levels');
    saveLocal(false);
    showLevelsOverview();
    toast('تم حذف المستوى وتوابعه وملفاته نهائياً من Supabase بنجاح ✓');
  }

  async function deleteUnit(unitId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    if(!u) return;

    const lessons = u.lessons || [];
    let challengesCount = 0;
    lessons.forEach(l => { challengesCount += (l.challenges || []).length; });

    const confirmHtml = `
      <div style="text-align:right; font-size:0.95rem; line-height:1.6; color:#241D20;">
        <p>أنت على وشك حذف الوحدة: <strong>«${escapeHtml(u.title)}»</strong>.</p>
        <p style="color:#B53A3A; font-weight:700; margin:10px 0;">سيتم حذفها نهائياً من قاعدة البيانات والتخزين السحابي مع:</p>
        <ul style="margin:0; padding-right:20px; color:#4A0D24;">
          <li>${lessons.length} درساً</li>
          <li>${challengesCount} تمريناً تفاعلياً</li>
          <li>كافة الملفات الصوتية والصور التابعة للتمارين</li>
        </ul>
      </div>
    `;

    if(window.Swal){
      const res = await Swal.fire({
        title: 'تأكيد حذف الوحدة نهائياً',
        html: confirmHtml,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذف الوحدة وتوابعها',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#B53A3A',
        cancelButtonColor: '#746B6F'
      });
      if(!res.isConfirmed) return;
    } else {
      if(!confirm(`هل أنت متأكد من حذف الوحدة «${u.title}» وجميع دروسها نهائياً؟`)) return;
    }

    const mediaUrls = getUnitMediaUrls(u);
    pushHistorySnapshot();

    if(window.sb && !isTempId(u.id) && !isNaN(parseInt(u.id))){
      try {
        const { error } = await sb.from('units').delete().eq('id', parseInt(u.id));
        if(error) throw error;
      } catch(err){
        console.error('Supabase delete unit error:', err);
        toast('تعذر حذف الوحدة من السحابة: ' + (err.message || ''), true);
        return;
      }
    }

    // تنظيف وحذف جميع الملفات الصوتية من باكت التخزين السحابي
    if(window.deleteStorageFiles && mediaUrls.length > 0){
      await window.deleteStorageFiles(mediaUrls);
    }

    curriculumData.units = (curriculumData.units || []).filter(x => String(x.id) !== String(unitId));
    if(String(navState.unitId) === String(unitId)) navState.unitId = null;

    const siblingUnits = (curriculumData.units || []).filter(x => String(x.level_id) === String(u.level_id));
    await reindexCollection(siblingUnits, 'units');

    saveLocal(false);
    if(navState.levelId){
      renderLevelDetail(navState.levelId);
    } else {
      renderLevelsOverview();
    }
    refreshStats();
    toast('تم حذف الوحدة وتوابعها وملفاتها نهائياً من Supabase ✓');
  }

  async function deleteLesson(lessonId){
    let parentUnit = null, targetLesson = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if(String(l.id) === String(lessonId)){
          parentUnit = u;
          targetLesson = l;
        }
      });
    });
    if(!targetLesson) return;

    const challengesCount = (targetLesson.challenges || []).length;

    const confirmHtml = `
      <div style="text-align:right; font-size:0.95rem; line-height:1.6; color:#241D20;">
        <p>أنت على وشك حذف الدرس: <strong>«${escapeHtml(targetLesson.title)}»</strong>.</p>
        <p style="color:#B53A3A; font-weight:700; margin:10px 0;">سيتم مسح الدرس نهائياً مع ${challengesCount} تمرين تفاعلي وكافة الملفات الصوتية التابعة له من Supabase والتخزين السحابي.</p>
      </div>
    `;

    if(window.Swal){
      const res = await Swal.fire({
        title: 'تأكيد حذف الدرس نهائياً',
        html: confirmHtml,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذف الدرس',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#B53A3A',
        cancelButtonColor: '#746B6F'
      });
      if(!res.isConfirmed) return;
    } else {
      if(!confirm(`هل أنت متأكد من حذف الدرس «${targetLesson.title}»؟`)) return;
    }

    const mediaUrls = getLessonMediaUrls(targetLesson);
    pushHistorySnapshot();

    if(window.sb && !isTempId(targetLesson.id) && !isNaN(parseInt(targetLesson.id))){
      try {
        const { error } = await sb.from('lessons').delete().eq('id', parseInt(targetLesson.id));
        if(error) throw error;
      } catch(err){
        console.error('Supabase delete lesson error:', err);
        toast('تعذر حذف الدرس من السحابة: ' + (err.message || ''), true);
        return;
      }
    }

    // تنظيف وحذف جميع الملفات الصوتية للدرس من التخزين السحابي
    if(window.deleteStorageFiles && mediaUrls.length > 0){
      await window.deleteStorageFiles(mediaUrls);
    }

    if(parentUnit){
      parentUnit.lessons = (parentUnit.lessons || []).filter(l => String(l.id) !== String(lessonId));
      await reindexCollection(parentUnit.lessons, 'lessons');
    }

    if(String(navState.lessonId) === String(lessonId)) navState.lessonId = null;

    saveLocal(false);
    if(parentUnit){
      renderUnitDetail(parentUnit.id);
    }
    refreshStats();
    toast('تم حذف الدرس وتمارينه وملفاته الصوتية نهائياً من Supabase ✓');
  }

  async function deleteChallenge(challengeId){
    let parentLesson = null, parentUnit = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        (l.challenges || []).forEach(c => {
          if(String(c.id) === String(challengeId)){
            parentLesson = l;
            parentUnit = u;
          }
        });
      });
    });

    if(window.Swal){
      const res = await Swal.fire({
        title: 'تأكيد حذف التمرين',
        text: 'هل أنت متأكد من رغبتك في حذف هذا التمرين التفاعلي نهائياً؟ سيتم مسح بياناته وملفاته الصوتية من Supabase.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذف التمرين',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#B53A3A',
        cancelButtonColor: '#746B6F'
      });
      if(!res.isConfirmed) return;
    } else {
      if(!confirm('هل أنت متأكد من حذف هذا التمرين؟')) return;
    }

    const targetChallenge = parentLesson ? parentLesson.challenges.find(c => String(c.id) === String(challengeId)) : null;
    const mediaUrls = targetChallenge ? getChallengeMediaUrls(targetChallenge) : [];

    pushHistorySnapshot();

    if(window.sb && !isTempId(challengeId) && !isNaN(parseInt(challengeId))){
      try {
        const { error } = await sb.from('challenges').delete().eq('id', parseInt(challengeId));
        if(error) throw error;
      } catch(err){
        console.error('Supabase delete challenge error:', err);
        toast('تعذر حذف التمرين من السحابة: ' + (err.message || ''), true);
        return;
      }
    }

    // تنظيف وحذف الملفات الصوتية والصور التابعة للتمرين من التخزين السحابي
    if(window.deleteStorageFiles && mediaUrls.length > 0){
      await window.deleteStorageFiles(mediaUrls);
    }

    if(parentLesson){
      parentLesson.challenges = (parentLesson.challenges || []).filter(c => String(c.id) !== String(challengeId));
      await reindexCollection(parentLesson.challenges, 'challenges');
    }

    saveLocal(false);
    if(parentUnit){
      renderUnitDetail(parentUnit.id);
    }
    refreshStats();
    toast('تم حذف التمرين وملفاته الصوتية نهائياً من Supabase ✓');
  }

  /* ============ MODAL CONTROLLERS & CRUD FORMS ============ */
  function closeModals(){
    document.querySelectorAll('.curriculum-modal-overlay').forEach(m => m.style.display = 'none');
  }

  /* LEVEL MODAL */
  function openAddLevelModal(){
    const levels = getLevels();
    document.getElementById('modal-level-title').textContent = 'إضافة مستوى جديد';
    document.getElementById('level-edit-id').value = '';
    document.getElementById('level-input-title').value = '';
    document.getElementById('level-input-desc').value = '';
    document.getElementById('level-input-order').value = levels.length + 1;
    document.getElementById('modal-level-editor').style.display = 'flex';
  }

  function openEditLevelModal(levelId){
    const levels = getLevels();
    const lvl = (levelId ? levels.find(l => String(l.id) === String(levelId)) : null) || levels[0];
    if(!lvl) return;
    document.getElementById('modal-level-title').textContent = 'تعديل المستوى';
    document.getElementById('level-edit-id').value = lvl.id;
    document.getElementById('level-input-title').value = lvl.title || '';
    document.getElementById('level-input-desc').value = lvl.description || '';
    document.getElementById('level-input-order').value = lvl.order_index || 1;
    document.getElementById('modal-level-editor').style.display = 'flex';
  }

  async function saveLevelForm(){
    pushHistorySnapshot();
    let title = document.getElementById('level-input-title').value.trim();
    if(!title){ toast('يرجى إدخال عنوان المستوى', true); return; }
    const idVal = document.getElementById('level-edit-id').value;
    const desc = document.getElementById('level-input-desc').value.trim();
    const order = Math.max(1, parseInt(document.getElementById('level-input-order').value) || 1);

    let levels = getLevels();
    let lvlObj = null;

    if(idVal){
      lvlObj = levels.find(l => String(l.id) === String(idVal));
      if(lvlObj){
        lvlObj.description = desc;
      }
    }

    if(!lvlObj){
      lvlObj = {
        id: generateTempId('lvl'),
        title: title,
        description: desc,
        order_index: order
      };
    } else {
      lvlObj.description = desc;
    }

    levels.sort((a,b) => (a.order_index || 1) - (b.order_index || 1));

    // Reorder and reindex sequentially, updating titles and syncing to Supabase
    await reorderAndSyncCollection(levels, lvlObj, order, 'levels');

    curriculumData.levels = levels;
    curriculumData.level = levels[0];

    saveLocal(true);
    closeModals();
    renderLevelsOverview();
    refreshStats();

    if(window.sb){
      try {
        if(isTempId(idVal) || !idVal){
          const dbPayload = {
            title: lvlObj.title,
            description: desc,
            order_index: lvlObj.order_index
          };
          const { data: newL, error } = await sb.from('levels').insert(dbPayload).select().single();
          if(error) throw error;
          if(newL && lvlObj){
            lvlObj.id = newL.id;
            saveLocal(false);
            renderLevelsOverview();
          }
        }
        toast('تم حفظ وإعادة ترتيب المستويات في الداشبورد بنجاح');
      } catch(err){
        console.error('Supabase level save error:', err);
        toast('تم الترتيب في الداشبورد محلياً: ' + (err.message || ''), true);
      }
    } else {
      toast('تم حفظ وإعادة ترتيب المستويات في الداشبورد بنجاح');
    }
  }

  function populateLevelSelect(selectId, selectedId){
    const s = document.getElementById(selectId);
    if(!s) return;
    const levels = getLevels();
    s.innerHTML = levels.map(lvl => `<option value="${lvl.id}">${escapeHtml(lvl.title)} (#${lvl.order_index || 1})</option>`).join('');
    if(selectedId){
      s.value = String(selectedId);
    } else if(navState.levelId){
      s.value = String(navState.levelId);
    } else if(levels.length > 0){
      s.value = String(levels[0].id);
    }
  }

  /* UNIT MODAL & BADGE HANDLERS */
  let _currentBadgeMode = 'text';

  function updateBadgePreview(){
    const preview = document.getElementById('badge-preview');
    if(!preview) return;

    if(_currentBadgeMode === 'image'){
      const url = document.getElementById('unit-input-badge-url')?.value?.trim() || '';
      if(url){
        preview.innerHTML = `<img src="${url}" style="width:38px;height:38px;object-fit:cover;border-radius:8px;display:block;" alt="شارة" />`;
      } else {
        preview.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C5A059" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
      }
    } else {
      const textVal = document.getElementById('unit-input-badge')?.value?.trim() || 'Ⲁ';
      // في حال قام المستخدم بلصق رابط صورة في حقل النص مباشرة
      if(textVal.startsWith('data:image/') || textVal.startsWith('http://') || textVal.startsWith('https://') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(textVal)){
        preview.innerHTML = `<img src="${textVal}" style="width:38px;height:38px;object-fit:cover;border-radius:8px;display:block;" alt="شارة" />`;
        return;
      }
      let fontSize = '1.25rem';
      if(textVal.length > 10) fontSize = '0.72rem';
      else if(textVal.length > 6) fontSize = '0.82rem';
      else if(textVal.length > 3) fontSize = '0.92rem';
      else if(textVal.length > 2) fontSize = '1.05rem';

      preview.innerHTML = `<span style="font-size:${fontSize};font-weight:800;line-height:1.1;white-space:nowrap;color:#6F1737;display:inline-block;padding:0 4px;">${escapeHtml(textVal)}</span>`;
    }
  }

  function setBadgeMode(mode){
    _currentBadgeMode = mode;
    const btnText = document.getElementById('badge-mode-text');
    const btnImage = document.getElementById('badge-mode-image');
    const textWrap = document.getElementById('badge-input-text-wrapper');
    const imgWrap = document.getElementById('badge-input-image-wrapper');

    if(mode === 'image'){
      if(btnText){ btnText.classList.remove('curriculum-btn-primary'); btnText.classList.add('curriculum-btn-secondary'); }
      if(btnImage){ btnImage.classList.remove('curriculum-btn-secondary'); btnImage.classList.add('curriculum-btn-primary'); }
      if(textWrap) textWrap.style.display = 'none';
      if(imgWrap) imgWrap.style.display = 'block';
    } else {
      if(btnText){ btnText.classList.remove('curriculum-btn-secondary'); btnText.classList.add('curriculum-btn-primary'); }
      if(btnImage){ btnImage.classList.remove('curriculum-btn-primary'); btnImage.classList.add('curriculum-btn-secondary'); }
      if(textWrap) textWrap.style.display = 'block';
      if(imgWrap) imgWrap.style.display = 'none';
    }
    updateBadgePreview();
  }

  function handleBadgeImageUpload(event){
    const file = event.target.files && event.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){
      toast('يرجى اختيار ملف صورة صالح (PNG, JPG, SVG, WebP)', true);
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
      const img = new Image();
      img.onload = function(){
        // ضبط أبعاد الصورة لتحسين الحجم والأداء دون أي فقد بالجودة
        const maxDim = 200;
        let w = img.width;
        let h = img.height;
        if(w > maxDim || h > maxDim){
          if(w > h){
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const resizedDataUrl = canvas.toDataURL('image/png');

        const urlInput = document.getElementById('unit-input-badge-url');
        if(urlInput) urlInput.value = resizedDataUrl;

        updateBadgePreview();
        toast('تم تحميل وتجهيز صورة الشارة بنجاح');
      };
      img.onerror = function(){
        const urlInput = document.getElementById('unit-input-badge-url');
        if(urlInput) urlInput.value = e.target.result;
        updateBadgePreview();
        toast('تم تحميل صورة الشارة بنجاح');
      };
      img.src = e.target.result;
    };
    reader.onerror = function(){
      toast('فشل قراءة ملف الصورة', true);
    };
    reader.readAsDataURL(file);
  }

  function openAddUnitModal(preselectedLevelId){
    const levels = getLevels();
    if(levels.length === 0){
      toast('يرجى إنشاء مستوى أولاً قبل إضافة وحدة', true);
      return;
    }
    const currentLevelId = preselectedLevelId || navState.levelId || (levels[0] ? levels[0].id : 1);
    const levelUnits = (curriculumData.units || []).filter(u => String(u.level_id) === String(currentLevelId));
    document.getElementById('modal-unit-title').textContent = 'إضافة وحدة جديدة';
    document.getElementById('unit-edit-id').value = '';
    populateLevelSelect('unit-input-level-id', currentLevelId);
    document.getElementById('unit-input-title').value = '';
    document.getElementById('unit-input-badge').value = 'Ⲁ';
    if(document.getElementById('unit-input-badge-url')) document.getElementById('unit-input-badge-url').value = '';
    setBadgeMode('text');
    document.getElementById('unit-input-desc').value = '';
    document.getElementById('unit-input-order').value = levelUnits.length + 1;
    document.getElementById('modal-unit-editor').style.display = 'flex';
  }

  function openEditUnitModal(unitId){
    const u = (curriculumData.units || []).find(x => String(x.id) === String(unitId));
    if(!u) return;
    document.getElementById('modal-unit-title').textContent = 'تعديل الوحدة';
    document.getElementById('unit-edit-id').value = u.id;
    populateLevelSelect('unit-input-level-id', u.level_id);
    document.getElementById('unit-input-title').value = u.title || '';
    
    const isImageBadge = u.badge && (u.badge.startsWith('data:image/') || u.badge.startsWith('http://') || u.badge.startsWith('https://') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(u.badge));
    if(isImageBadge){
      if(document.getElementById('unit-input-badge-url')) document.getElementById('unit-input-badge-url').value = u.badge;
      if(document.getElementById('unit-input-badge')) document.getElementById('unit-input-badge').value = '';
      setBadgeMode('image');
    } else {
      document.getElementById('unit-input-badge').value = u.badge || 'Ⲁ';
      if(document.getElementById('unit-input-badge-url')) document.getElementById('unit-input-badge-url').value = '';
      setBadgeMode('text');
    }
    
    document.getElementById('unit-input-desc').value = u.description || '';
    document.getElementById('unit-input-order').value = u.order_index || 1;
    document.getElementById('modal-unit-editor').style.display = 'flex';
  }

  async function saveUnitForm(){
    pushHistorySnapshot();
    let title = document.getElementById('unit-input-title').value.trim();
    if(!title){ toast('يرجى إدخال عنوان الوحدة', true); return; }
    const idVal = document.getElementById('unit-edit-id').value;
    const levelIdVal = document.getElementById('unit-input-level-id').value || (getLevels()[0] ? getLevels()[0].id : 1);
    
    let badgeVal = 'Ⲁ';
    const textVal = document.getElementById('unit-input-badge')?.value?.trim() || '';
    const imgUrl = document.getElementById('unit-input-badge-url')?.value?.trim() || '';
    if(_currentBadgeMode === 'image'){
      badgeVal = imgUrl || textVal || 'Ⲁ';
    } else {
      if(textVal.startsWith('data:image/') || textVal.startsWith('http://') || textVal.startsWith('https://') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(textVal)){
        badgeVal = textVal;
      } else {
        badgeVal = textVal || imgUrl || 'Ⲁ';
      }
    }

    const descVal = document.getElementById('unit-input-desc').value.trim();
    const orderVal = Math.max(1, parseInt(document.getElementById('unit-input-order').value) || 1);

    if(!curriculumData.units) curriculumData.units = [];

    let unitObj = null;

    if(idVal){
      unitObj = curriculumData.units.find(x => String(x.id) === String(idVal));
      if(unitObj){
        unitObj.title = title;
        unitObj.level_id = levelIdVal;
        unitObj.badge = badgeVal;
        unitObj.description = descVal;
      }
    }

    if(!unitObj){
      unitObj = {
        id: generateTempId('unit'),
        level_id: levelIdVal,
        title: title,
        badge: badgeVal,
        description: descVal,
        order_index: orderVal,
        lessons: []
      };
      curriculumData.units.push(unitObj);
    }

    // فصل وحدات هذا المستوى عن المستويات الأخرى
    let levelUnits = curriculumData.units
      .filter(u => String(u.level_id) === String(levelIdVal))
      .sort((a,b) => (a.order_index || 1) - (b.order_index || 1));

    // تنفيذ إعادة الترتيب وإعادة الترقيم التلقائي وتحديث العناوين ومزامنة Supabase
    await reorderAndSyncCollection(levelUnits, unitObj, orderVal, 'units');

    // إعادة دمج وحدات هذا المستوى مع بقية وحدات المستويات الأخرى
    const otherUnits = curriculumData.units.filter(u => String(u.level_id) !== String(levelIdVal));
    curriculumData.units = [...otherUnits, ...levelUnits];

    navState.levelId = levelIdVal;
    saveLocal(true);
    closeModals();
    if(navState.levelId) renderLevelDetail(navState.levelId);
    refreshStats();

    if(window.sb && !isTempId(levelIdVal)){
      try {
        if(isTempId(idVal) || !idVal){
          const dbPayload = {
            level_id: parseInt(levelIdVal),
            title: unitObj.title,
            badge: unitObj.badge,
            description: unitObj.description || '',
            order_index: unitObj.order_index
          };
          const { data: newU, error } = await sb.from('units').insert(dbPayload).select().single();
          if(error) throw error;
          if(newU && unitObj){
            unitObj.id = newU.id;
            saveLocal(false);
            if(navState.levelId) renderLevelDetail(navState.levelId);
          }
        }
        toast('تم حفظ وإعادة ترتيب الوحدة في الداشبورد بنجاح');
      } catch(err){
        console.error('Supabase unit save error:', err);
        toast('تم الترتيب في الداشبورد محلياً: ' + (err.message || ''), true);
      }
    } else {
      toast('تم حفظ وإعادة ترتيب الوحدة في الداشبورد بنجاح');
    }
  }

  function populateUnitSelect(selectId, selectedId){
    const s = document.getElementById(selectId);
    if(!s) return;
    let units = curriculumData.units || [];

    // فلترة: عرض الوحدات الخاصة بالمستوى الحالي فقط
    if(navState.levelId){
      const filteredUnits = units.filter(u => String(u.level_id) === String(navState.levelId));
      if(filteredUnits.length > 0) units = filteredUnits;
    } else if(selectedId){
      // لو مفيش مستوى محدد بس في وحدة محددة، نجيب المستوى بتاعها ونفلتر
      const selectedUnit = units.find(u => String(u.id) === String(selectedId));
      if(selectedUnit && selectedUnit.level_id){
        const filteredUnits = units.filter(u => String(u.level_id) === String(selectedUnit.level_id));
        if(filteredUnits.length > 0) units = filteredUnits;
      }
    }

    s.innerHTML = units.map(u => `<option value="${u.id}">${escapeHtml(u.title)} (#${u.order_index || 1})</option>`).join('');
    if(selectedId){
      s.value = String(selectedId);
    } else if(navState.unitId){
      s.value = String(navState.unitId);
    } else if(units.length > 0){
      s.value = String(units[0].id);
    }
  }

  /* LESSON MODAL */
  function openAddLessonModal(preselectedUnitId){
    const units = curriculumData.units || [];
    if(units.length === 0){
      toast('يرجى إنشاء وحدة أولاً قبل إضافة درس', true);
      return;
    }
    const currentUnitId = preselectedUnitId || navState.unitId || (units[0] ? units[0].id : null);
    const targetUnit = units.find(u => String(u.id) === String(currentUnitId));
    const lessonsCount = (targetUnit && targetUnit.lessons) ? targetUnit.lessons.length : 0;
    document.getElementById('modal-lesson-title').textContent = 'إضافة درس جديد';
    document.getElementById('lesson-edit-id').value = '';
    populateUnitSelect('lesson-input-unit-id', currentUnitId);
    document.getElementById('lesson-input-title').value = '';
    document.getElementById('lesson-input-xp').value = 20;
    if(document.getElementById('lesson-input-practice-xp')) document.getElementById('lesson-input-practice-xp').value = 20;
    if(document.getElementById('lesson-input-challenge-xp')) document.getElementById('lesson-input-challenge-xp').value = 30;
    document.getElementById('lesson-input-order').value = lessonsCount + 1;
    document.getElementById('modal-lesson-editor').style.display = 'flex';
  }

  function openEditLessonModal(lessonId){
    let foundLesson = null, parentUnit = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if(String(l.id) === String(lessonId)){ foundLesson = l; parentUnit = u; }
      });
    });
    if(!foundLesson) return;

    document.getElementById('modal-lesson-title').textContent = 'تعديل الدرس';
    document.getElementById('lesson-edit-id').value = foundLesson.id;
    populateUnitSelect('lesson-input-unit-id', parentUnit.id);
    document.getElementById('lesson-input-title').value = foundLesson.title || '';
    document.getElementById('lesson-input-xp').value = foundLesson.xp_reward !== undefined ? foundLesson.xp_reward : 20;
    if(document.getElementById('lesson-input-practice-xp')) {
      document.getElementById('lesson-input-practice-xp').value = foundLesson.practice_xp !== undefined ? foundLesson.practice_xp : 20;
    }
    if(document.getElementById('lesson-input-challenge-xp')) {
      document.getElementById('lesson-input-challenge-xp').value = foundLesson.challenge_xp !== undefined ? foundLesson.challenge_xp : 30;
    }
    document.getElementById('lesson-input-order').value = foundLesson.order_index || 1;
    document.getElementById('modal-lesson-editor').style.display = 'flex';
  }

  async function saveLessonForm(){
    pushHistorySnapshot();
    let title = document.getElementById('lesson-input-title').value.trim();
    if(!title){ toast('يرجى إدخال عنوان الدرس', true); return; }
    const unitId = document.getElementById('lesson-input-unit-id').value;
    const idVal = document.getElementById('lesson-edit-id').value;
    const xpVal = Math.max(0, parseInt(document.getElementById('lesson-input-xp').value, 10) || 0);
    const practiceXpVal = Math.max(0, parseInt(document.getElementById('lesson-input-practice-xp')?.value, 10) || 0);
    const challengeXpVal = Math.max(0, parseInt(document.getElementById('lesson-input-challenge-xp')?.value, 10) || 0);
    const orderVal = Math.max(1, parseInt(document.getElementById('lesson-input-order').value, 10) || 1);

    const targetUnit = (curriculumData.units || []).find(u => String(u.id) === String(unitId));
    if(!targetUnit){ toast('الوحدة المحددة غير موجودة', true); return; }
    if(!targetUnit.lessons) targetUnit.lessons = [];

    let existingChallenges = [];
    let lessonObj = null;

    if(idVal){
      (curriculumData.units || []).forEach(u => {
        const found = (u.lessons || []).find(l => String(l.id) === String(idVal));
        if(found){
          lessonObj = found;
          if(found.challenges) existingChallenges = found.challenges;
        }
        u.lessons = (u.lessons || []).filter(l => String(l.id) !== String(idVal));
      });
    }

    if(!lessonObj){
      lessonObj = {
        id: generateTempId('les'),
        unit_id: unitId,
        title: title,
        xp_reward: xpVal,
        practice_xp: practiceXpVal,
        challenge_xp: challengeXpVal,
        order_index: orderVal,
        challenges: existingChallenges
      };
    } else {
      lessonObj.unit_id = unitId;
      lessonObj.title = title;
      lessonObj.xp_reward = xpVal;
      lessonObj.practice_xp = practiceXpVal;
      lessonObj.challenge_xp = challengeXpVal;
      lessonObj.challenges = existingChallenges;
    }

    // Sort remaining lessons in unit
    targetUnit.lessons.sort((a,b) => (a.order_index || 1) - (b.order_index || 1));

    // Reorder and reindex sequentially, updating titles and syncing to Supabase
    await reorderAndSyncCollection(targetUnit.lessons, lessonObj, orderVal, 'lessons');

    navState.unitId = unitId;
    saveLocal(true);
    closeModals();
    renderUnitDetail(unitId);
    refreshStats();

    if(window.sb && !isTempId(unitId)){
      try {
        if(isTempId(idVal) || !idVal){
          const dbPayload = {
            unit_id: parseInt(unitId),
            title: lessonObj.title,
            xp_reward: lessonObj.xp_reward,
            practice_xp: lessonObj.practice_xp,
            challenge_xp: lessonObj.challenge_xp,
            order_index: lessonObj.order_index
          };
          const { data: newL, error } = await sb.from('lessons').insert(dbPayload).select().single();
          if(error) throw error;
          if(newL && lessonObj){
            lessonObj.id = newL.id;
            saveLocal(false);
            renderUnitDetail(unitId);
          }
        } else {
          const dbUpdate = {
            title: lessonObj.title,
            xp_reward: lessonObj.xp_reward,
            practice_xp: lessonObj.practice_xp,
            challenge_xp: lessonObj.challenge_xp,
            order_index: lessonObj.order_index
          };
          const { error } = await sb.from('lessons').update(dbUpdate).eq('id', parseInt(idVal));
          if(error) throw error;
        }

        // إرسال إشعار فوري لجميع الصفحات المفتوحة (الرئيسية ومسار التعلم) لتحديث الـ XP لحظياً
        try {
          const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
          if(channel){
            channel.postMessage({ type: 'curriculum_updated', payload: { lesson_id: lessonObj.id, xp_reward: lessonObj.xp_reward, practice_xp: lessonObj.practice_xp, challenge_xp: lessonObj.challenge_xp } });
            channel.close();
          }
        } catch(e){}

        toast('تم حفظ وإعادة ترتيب الدروس ونقاط الـ XP بنجاح');
      } catch(err){
        console.error('Supabase lesson save error:', err);
        toast('تم الحفظ محلياً: ' + (err.message || ''), true);
      }
    } else {
      toast('تم حفظ وإعادة ترتيب الدروس بنجاح');
    }
  }

  /* CHALLENGE MODAL WITH ALL QUESTION TYPES */
  const LATIN_TO_COPTIC_MAP = {
    // Upper case
    'A': 'Ⲁ', 'B': 'Ⲃ', 'G': 'Ⲅ', 'D': 'Ⲇ', 'E': 'Ⲉ', 'Z': 'Ⲍ', 'H': 'Ⲏ', 'Q': 'Ⲑ',
    'I': 'Ⲓ', 'K': 'Ⲕ', 'L': 'Ⲗ', 'M': 'Ⲙ', 'N': 'Ⲛ', 'X': 'Ⲝ', 'O': 'Ⲟ', 'P': 'Ⲡ',
    'R': 'Ⲣ', 'S': 'Ⲥ', 'T': 'Ⲧ', 'U': 'Ⲩ', 'V': 'Ⲃ', 'W': 'Ⲱ', 'F': 'Ⲫ', 'C': 'Ϭ',
    'J': 'Ϫ', 'Y': 'Ⲩ',
    // Lower case
    'a': 'ⲁ', 'b': 'ⲃ', 'g': 'ⲅ', 'd': 'ⲇ', 'e': 'ⲉ', 'z': 'ⲍ', 'h': 'ⲏ', 'q': 'ⲑ',
    'i': 'ⲓ', 'k': 'ⲕ', 'l': 'ⲗ', 'm': 'ⲙ', 'n': 'ⲛ', 'x': 'ⲝ', 'o': 'ⲟ', 'p': 'ⲡ',
    'r': 'ⲣ', 's': 'ⲥ', 't': 'ⲧ', 'u': 'ⲩ', 'v': 'ⲃ', 'w': 'ⲱ', 'f': 'ⲫ', 'c': 'ϭ',
    'j': 'ϫ', 'y': 'ⲩ'
  };

  function transliterateLatinToCoptic(str) {
    if (!str) return '';
    let res = str;
    // Replace digraphs first
    res = res.replace(/Sh/g, 'Ϣ').replace(/sh/g, 'ϣ').replace(/SH/g, 'Ϣ')
             .replace(/Kh/g, 'Ϧ').replace(/kh/g, 'ϧ').replace(/KH/g, 'Ϧ')
             .replace(/Ti/g, 'Ϯ').replace(/ti/g, 'ϯ').replace(/TI/g, 'Ϯ')
             .replace(/Ps/g, 'Ⲯ').replace(/ps/g, 'ⲯ').replace(/PS/g, 'Ⲯ')
             .replace(/Hh/g, 'Ϩ').replace(/hh/g, 'ϩ').replace(/HH/g, 'Ϩ');
    // Replace single Latin letters, strictly preserving exact case
    return res.replace(/[A-Za-z]/g, ch => LATIN_TO_COPTIC_MAP[ch] || ch);
  }

  function attachCopticKeyHandler(inputEl, onSync) {
    if (!inputEl || inputEl._copticAttached) return;
    inputEl._copticAttached = true;
    inputEl.addEventListener('input', () => {
      const start = inputEl.selectionStart;
      const end = inputEl.selectionEnd;
      const oldVal = inputEl.value;
      const newVal = transliterateLatinToCoptic(oldVal);
      if (newVal !== oldVal) {
        inputEl.value = newVal;
        if (typeof start === 'number' && typeof end === 'number') {
          inputEl.setSelectionRange(start, end);
        }
      }
      if (typeof onSync === 'function') onSync(inputEl.value);
    });
  }

  function populateLessonSelect(selectId, selectedId){
    const s = document.getElementById(selectId);
    if(!s) return;

    // تحديد المستوى الحالي لفلترة الدروس بناءً عليه
    let currentLevelId = navState.levelId;
    if(!currentLevelId && navState.unitId){
      const u = (curriculumData.units || []).find(x => String(x.id) === String(navState.unitId));
      if(u) currentLevelId = u.level_id;
    }
    if(!currentLevelId && selectedId){
      for(const u of (curriculumData.units || [])){
        if((u.lessons || []).some(l => String(l.id) === String(selectedId))){
          currentLevelId = u.level_id;
          break;
        }
      }
    }

    let units = curriculumData.units || [];
    if(currentLevelId){
      const filteredUnits = units.filter(u => String(u.level_id) === String(currentLevelId));
      if(filteredUnits.length > 0) units = filteredUnits;
    }

    const allLessons = [];
    units.forEach(u => {
      (u.lessons || []).forEach(l => allLessons.push({ id: l.id, title: l.title, unitTitle: u.title }));
    });
    s.innerHTML = allLessons.map(l => `<option value="${l.id}">${escapeHtml(l.title)} (${escapeHtml(l.unitTitle)})</option>`).join('');
    if(selectedId){
      s.value = String(selectedId);
    } else if(navState.lessonId){
      s.value = String(navState.lessonId);
    } else if(allLessons.length > 0){
      s.value = String(allLessons[0].id);
    }
  }

  function openAddChallengeModal(preselectedLessonId){
    let currentLevelId = navState.levelId;
    if(!currentLevelId && navState.unitId){
      const u = (curriculumData.units || []).find(x => String(x.id) === String(navState.unitId));
      if(u) currentLevelId = u.level_id;
    }
    let units = curriculumData.units || [];
    if(currentLevelId){
      const filtered = units.filter(u => String(u.level_id) === String(currentLevelId));
      if(filtered.length > 0) units = filtered;
    }

    const allLessons = [];
    units.forEach(u => {
      (u.lessons || []).forEach(l => allLessons.push(l));
    });
    if(allLessons.length === 0){
      toast('يرجى إنشاء درس في هذا المستوى أولاً قبل إضافة تمرين', true); return;
    }
    document.getElementById('modal-challenge-title').textContent = 'إضافة تمرين تفاعلي جديد';
    document.getElementById('challenge-edit-id').value = '';
    populateLessonSelect('challenge-input-lesson-id', preselectedLessonId || navState.lessonId);
    document.getElementById('challenge-input-type').value = 'select';
    document.getElementById('challenge-input-question').value = '';
    document.getElementById('challenge-input-xp').value = 10;
    document.getElementById('challenge-input-coptic').value = '';
    document.getElementById('challenge-input-audio-text').value = '';
    document.getElementById('challenge-input-audio-url').value = '';
    updateAudioDeleteBtnVisibility();
    onChallengeTypeChange('select');
    document.getElementById('modal-challenge-editor').style.display = 'flex';
  }

  function openEditChallengeModal(challengeId){
    let foundChallenge = null, parentLesson = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        (l.challenges || []).forEach(c => {
          if(String(c.id) === String(challengeId)){ foundChallenge = c; parentLesson = l; }
        });
      });
    });
    if(!foundChallenge) return;

    document.getElementById('modal-challenge-title').textContent = 'تعديل التمرين التفاعلي';
    document.getElementById('challenge-edit-id').value = foundChallenge.id;
    populateLessonSelect('challenge-input-lesson-id', parentLesson ? parentLesson.id : null);
    document.getElementById('challenge-input-type').value = foundChallenge.type || 'select';
    document.getElementById('challenge-input-question').value = foundChallenge.question || '';
    document.getElementById('challenge-input-xp').value = foundChallenge.xp_reward !== undefined ? foundChallenge.xp_reward : 10;
    document.getElementById('challenge-input-coptic').value = foundChallenge.coptic_display || '';
    document.getElementById('challenge-input-audio-text').value = foundChallenge.audio_text || '';
    document.getElementById('challenge-input-audio-url').value = foundChallenge.audio_url || '';
    updateAudioDeleteBtnVisibility();
    onChallengeTypeChange(foundChallenge.type || 'select', foundChallenge);
    document.getElementById('modal-challenge-editor').style.display = 'flex';
  }

  function onChallengeTypeChange(type, existingData){
    const container = document.getElementById('challenge-editor-dynamic-area') || document.getElementById('challenge-dynamic-type-editor');
    if(!container) return;

    // Attach Coptic typing handler to the main coptic display input as well
    const copticDispInput = document.getElementById('challenge-input-coptic');
    if (copticDispInput) {
      attachCopticKeyHandler(copticDispInput, (val) => {
        const traceInput = document.getElementById('trace-target-text');
        if (traceInput && (!traceInput.value.trim() || traceInput.value === val.slice(0, -1))) {
          traceInput.value = val;
        }
      });
    }

    if(type === 'text_view'){
      let ov = (existingData && existingData.overview_data && typeof existingData.overview_data === 'object') ? existingData.overview_data : null;
      if (!ov && existingData && existingData.explanation && typeof existingData.explanation === 'string' && existingData.explanation.trim().startsWith('{')) {
        try { ov = JSON.parse(existingData.explanation); } catch(e){}
      }
      if (!ov && typeof findLetterCatalogItem === 'function') {
        ov = findLetterCatalogItem(existingData || {});
      }

      const qInput = document.getElementById('challenge-input-question');
      if (qInput && (!qInput.value.trim() || qInput.value.trim() === 'اقرأ وتأمّل' || qInput.value.trim() === 'شرح وقراءة (تأمّل وتعلّم)')) {
        qInput.value = (ov && ov.name) ? `نبذة عن حرف ${ov.name} (${ov.pair || ov.upper || ''})` : 'نبذة عن الحرف';
      }

      const pairVal = (ov && ov.pair) || (existingData && existingData.coptic_display) || '';
      const nameVal = (ov && ov.name) || (existingData && existingData.audio_text) || '';
      const typeBadgeVal = (ov && ov.letterTypeBadge) || (ov && ov.isVowel ? 'حرف متحرك' : 'حرف ساكن');
      const badgeClassVal = (ov && ov.badgeClass) || (ov && ov.isVowel ? 'badge-vowel' : 'badge-consonant');
      const hasMulti = ov ? Boolean(ov.hasMultiple) : false;
      const multiTextVal = (ov && ov.multipleCountText) || '';
      const pronVal = (ov && ov.pronunciation) || '';
      const soundVal = (ov && ov.soundFile) || (existingData && existingData.audio_url) || '';
      const rulesTitleVal = (ov && ov.rulesTitle) || (hasMulti ? 'حالات وقواعد نطق الحرف بالتفصيل:' : 'قاعدة نطق الحرف:');
      const rawRules = (ov && Array.isArray(ov.rules) && ov.rules.length > 0) ? ov.rules : ((ov && ov.rules) ? [ov.rules] : ['يُنطق الحرف وفقاً للقواعد الكنسية المعتمدة.']);
      const wordTitleVal = (ov && ov.wordTitle) || 'نبذة عن الكلمة التطبيقية على الحرف';
      const wordCopticVal = (ov && ov.word && ov.word.coptic) || '';
      const wordPhoneticVal = (ov && ov.word && ov.word.phoneticAr) || '';
      const wordMeaningVal = (ov && ov.word && ov.word.meaning) || '';

      const cDisp = document.getElementById('challenge-input-coptic');
      if (cDisp && !cDisp.value.trim() && pairVal) cDisp.value = pairVal;
      const aText = document.getElementById('challenge-input-audio-text');
      if (aText && !aText.value.trim() && nameVal) aText.value = nameVal;
      const aUrl = document.getElementById('challenge-input-audio-url');
      if (aUrl && !aUrl.value.trim() && soundVal) aUrl.value = soundVal;

      container.innerHTML = `
        <div class="tv-editor-wrapper" style="display:flex; flex-direction:column; gap:14px;">
          
          <div style="background:linear-gradient(135deg, #FFF9F0 0%, #FAF0E4 100%); border:1.5px solid #D6C3A5; border-radius:14px; padding:14px 16px;">
            <div style="font-weight:900; color:#6F1737; font-size:1.02rem; display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
              <span>لوحة التحكم الكاملة في بطاقة نبذة الحرف والكلمة (Full Interactive Flashcard)</span>
              <span style="font-size:0.78rem; background:#6F1737; color:#fff; padding:3px 10px; border-radius:20px;">تحكم كامل وفوري</span>
            </div>
            <p style="font-size:0.83rem; color:#5D4037; margin:0;">يمكنك هنا تعديل جميع نصوص وكلمات وشارات وقواعد النطق وأصوات هذه الصفحة بسهولة تامة، وتنعكس التعديلات حياً ومباشرة في المعاينة أدناه.</p>
          </div>

          <!-- القسم 1: بيانات رأس الصفحة والحرف -->
          <div class="tv-editor-box">
            <div class="tv-editor-header">
              <span>1. بيانات وشارات الحرف والنطق العام</span>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
              <div class="curriculum-field">
                <label style="font-weight:700;">اسم الحرف بالعربية *</label>
                <input type="text" id="tv-letter-name" value="${escapeHtml(nameVal)}" placeholder="مثال: فيدا (بيتا)" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700;">رمز الحرف (كبير وصغير) *</label>
                <input type="text" id="tv-letter-pair" class="coptic-input" value="${escapeHtml(pairVal)}" placeholder="مثال: Ⲃ ⲃ" dir="ltr" style="font-size:1.3rem; font-weight:800;" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-top:10px;">
              <div class="curriculum-field">
                <label style="font-weight:700;">تصنيف الحرف (الشارة الأولى)</label>
                <select id="tv-letter-badge-select" onchange="CurriculumAdminSystem.onOverviewBadgeSelectChange()">
                  <option value="حرف ساكن|badge-consonant" ${typeBadgeVal === 'حرف ساكن' ? 'selected' : ''}>حرف ساكن (أزرق)</option>
                  <option value="حرف متحرك (للفتح)|badge-vowel" ${typeBadgeVal.includes('فتح') ? 'selected' : ''}>حرف متحرك للفتح (برتقالي)</option>
                  <option value="حرف متحرك (للكسر)|badge-vowel" ${typeBadgeVal === 'حرف متحرك (للكسر)' ? 'selected' : ''}>حرف متحرك للكسر (برتقالي)</option>
                  <option value="حرف متحرك (للكسر خفيف)|badge-vowel" ${typeBadgeVal.includes('كسر خفيف') ? 'selected' : ''}>حرف متحرك للكسر خفيف</option>
                  <option value="حرف متحرك (للكسر طويل)|badge-vowel" ${typeBadgeVal.includes('كسر طويل') ? 'selected' : ''}>حرف متحرك للكسر طويل</option>
                  <option value="حرف متحرك (للكسر قصير)|badge-vowel" ${typeBadgeVal.includes('كسر قصير') ? 'selected' : ''}>حرف متحرك للكسر قصير</option>
                  <option value="حرف متحرك (للضم)|badge-vowel" ${typeBadgeVal === 'حرف متحرك (للضم)' ? 'selected' : ''}>حرف متحرك للضم</option>
                  <option value="حرف متحرك (للضم قصير)|badge-vowel" ${typeBadgeVal.includes('ضم قصير') ? 'selected' : ''}>حرف متحرك للضم قصير</option>
                  <option value="حرف متحرك (للضم طويل)|badge-vowel" ${typeBadgeVal.includes('ضم طويل') ? 'selected' : ''}>حرف متحرك للضم طويل</option>
                  <option value="حرف متحرك (متعدد الحالات)|badge-vowel" ${typeBadgeVal.includes('متعدد') ? 'selected' : ''}>حرف متحرك متعدد الحالات</option>
                  <option value="حرف ساكن مركب|badge-compound" ${typeBadgeVal.includes('مركب') ? 'selected' : ''}>حرف ساكن مركب (أخضر)</option>
                  <option value="حرف مصري ديموطيقي|badge-demotic" ${typeBadgeVal.includes('ديموطيقي') ? 'selected' : ''}>حرف مصري ديموطيقي (بني)</option>
                  <option value="مقطع ساكن ديموطيقي|badge-demotic" ${typeBadgeVal.includes('مقطع') ? 'selected' : ''}>مقطع ساكن ديموطيقي</option>
                  <option value="رقم عددي رمزي|badge-symbol" ${typeBadgeVal.includes('رقم') ? 'selected' : ''}>رقم عددي رمزي (بنفسجي)</option>
                  <option value="custom">نص مخصص...</option>
                </select>
                <input type="text" id="tv-letter-badge-custom" style="display:none; margin-top:6px;" value="${escapeHtml(typeBadgeVal)}" placeholder="اكتب نص الشارة المخصصة" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700;">شارة عدد الحالات الصوتية (الشارة الثانية)</label>
                <select id="tv-multi-badge-select" onchange="CurriculumAdminSystem.onOverviewMultiSelectChange()">
                  <option value="" ${!multiTextVal ? 'selected' : ''}>— بدون شارة ثانية (نطق واحد قياسي) —</option>
                  <option value="له نطقان (ڤ / ب)" ${multiTextVal.includes('له نطقان (ڤ / ب)') ? 'selected' : ''}>له نطقان (ڤ / ب)</option>
                  <option value="له نطقان (د / ذ)" ${multiTextVal.includes('له نطقان (د / ذ)') ? 'selected' : ''}>له نطقان (د / ذ)</option>
                  <option value="له نطقان (ث / ت)" ${multiTextVal.includes('له نطقان (ث / ت)') ? 'selected' : ''}>له نطقان (ث / ت)</option>
                  <option value="له نطقان (جـ معطشة / جـ)" ${multiTextVal.includes('له نطقان (جـ') ? 'selected' : ''}>له نطقان (جـ معطشة / جـ)</option>
                  <option value="له 3 أصوات (جـ / ن / غ)" ${multiTextVal.includes('(جـ / ن / غ)') ? 'selected' : ''}>له 3 أصوات (جـ / ن / غ)</option>
                  <option value="له 3 أصوات (ك / ش / خ)" ${multiTextVal.includes('(ك / ش / خ)') ? 'selected' : ''}>له 3 أصوات (ك / ش / خ)</option>
                  <option value="له 3 حالات نطق (ڤ / و / ي)" ${multiTextVal.includes('(ڤ / و / ي)') ? 'selected' : ''}>له 3 حالات نطق (ڤ / و / ي)</option>
                  <option value="نطق مركب مزدوج" ${multiTextVal.includes('مركب مزدوج') ? 'selected' : ''}>نطق مركب مزدوج</option>
                  <option value="نطق مركب (ت + ش)" ${multiTextVal.includes('ت + ش') ? 'selected' : ''}>نطق مركب (ت + ش)</option>
                  <option value="نطق مقطعي (تـ + ي)" ${multiTextVal.includes('تـ + ي') ? 'selected' : ''}>نطق مقطعي (تـ + ي)</option>
                  <option value="custom">نص مخصص...</option>
                </select>
                <input type="text" id="tv-multi-badge-custom" style="display:none; margin-top:6px;" value="${escapeHtml(multiTextVal)}" placeholder="مثال: له نطقان..." oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-top:10px;">
              <div class="curriculum-field">
                <label style="font-weight:700;">النطق بالعربي (النص المميز) *</label>
                <input type="text" id="tv-letter-pron" value="${escapeHtml(pronVal)}" placeholder="مثال: ڤ (V) أو ب (B)" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700;">ملف صوت نطق الحرف</label>
                <div style="display:flex; gap:6px;">
                  <input type="text" id="tv-letter-sound" dir="ltr" value="${escapeHtml(soundVal)}" placeholder="مثال: audio_coptic/2veta.mp3" style="flex:1;" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
                  <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:4px 10px;" onclick="CurriculumAdminSystem.playAudioSnippet(document.getElementById('tv-letter-sound').value, document.getElementById('tv-letter-name').value, this)" title="تجربة الصوت">▶</button>
                </div>
              </div>
            </div>
          </div>

          <!-- القسم 2: حالات وقواعد نطق الحرف بالتفصيل -->
          <div class="tv-editor-box">
            <div class="tv-editor-header">
              <span>2. حالات وقواعد نطق الحرف بالتفصيل</span>
              <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:4px 10px; font-size:0.8rem;" onclick="CurriculumAdminSystem.addOverviewRuleRow()">+ إضافة قاعدة نطق جديدة</button>
            </div>

            <div class="curriculum-field" style="margin-bottom:12px;">
              <label style="font-weight:700;">عنوان صندوق القواعد:</label>
              <input type="text" id="tv-rules-title" value="${escapeHtml(rulesTitleVal)}" placeholder="مثال: حالات وقواعد نطق الحرف بالتفصيل:" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
            </div>

            <div id="tv-rules-container" style="display:flex; flex-direction:column; gap:8px;">
              ${rawRules.map((r, i) => `
                <div class="tv-rule-row">
                  <span class="tv-rule-num">${i + 1}.</span>
                  <input type="text" class="tv-rule-input" value="${escapeHtml(r)}" placeholder="اكتب قاعدة النطق هنا..." oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
                  <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeOverviewRuleRow(this)" title="حذف القاعدة">✕</button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- القسم 3: الكلمة التطبيقية على الحرف -->
          <div class="tv-editor-box">
            <div class="tv-editor-header">
              <span>3. نبذة عن الكلمة التطبيقية على الحرف</span>
            </div>

            <div class="curriculum-field" style="margin-bottom:12px;">
              <label style="font-weight:700;">عنوان بطاقة الكلمة:</label>
              <input type="text" id="tv-word-title" value="${escapeHtml(wordTitleVal)}" placeholder="مثال: نبذة عن الكلمة التطبيقية على الحرف" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
              <div class="curriculum-field">
                <label style="font-weight:700;">الكلمة بالقبطية *</label>
                <input type="text" id="tv-word-coptic" class="coptic-input" value="${escapeHtml(wordCopticVal)}" placeholder="مثال: ⲃⲉⲣⲧ" dir="ltr" style="font-size:1.3rem; font-weight:800;" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700;">القبطي المعرب (النطق) *</label>
                <input type="text" id="tv-word-phonetic" value="${escapeHtml(wordPhoneticVal)}" placeholder="مثال: فيرت" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700;">المعنى بالعربية *</label>
                <input type="text" id="tv-word-meaning" value="${escapeHtml(wordMeaningVal)}" placeholder="مثال: وردة" oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
              </div>
            </div>
          </div>

          <!-- القسم 4: 🎨 تخصيص ألوان النصوص والخلفيات -->
          <div class="tv-editor-box">
            <div class="tv-editor-header" style="flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span>4. 🎨 تخصيص ألوان النصوص والخلفيات</span>
                <span style="font-size:0.75rem; background:#4A0D24; color:#FFE082; padding:3px 10px; border-radius:14px; font-weight:800;">تحكم مرئي فوري</span>
              </div>
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <button type="button" class="curriculum-btn curriculum-btn-secondary" style="font-size:0.75rem; padding:4px 10px;" onclick="CurriculumAdminSystem.applyColorPreset('default', this)">👑 الملكي (الافتراضي)</button>
                <button type="button" class="curriculum-btn curriculum-btn-secondary" style="font-size:0.75rem; padding:4px 10px;" onclick="CurriculumAdminSystem.applyColorPreset('dark', this)">🌙 الليلي الداكن</button>
                <button type="button" class="curriculum-btn curriculum-btn-secondary" style="font-size:0.75rem; padding:4px 10px;" onclick="CurriculumAdminSystem.applyColorPreset('emerald', this)">🌿 الزمردي الكنسي</button>
                <button type="button" class="curriculum-btn curriculum-btn-secondary" style="font-size:0.75rem; padding:4px 10px;" onclick="CurriculumAdminSystem.applyColorPreset('papyrus', this)">📜 البردي العتيق</button>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-top:8px;">
              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون عنوان الدرس الرئيسي:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-title" value="${(ov && ov.colors && ov.colors.titleColor) || '#2E2018'}" oninput="document.getElementById('tv-col-title-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-title-text" value="${(ov && ov.colors && ov.colors.titleColor) || '#2E2018'}" oninput="document.getElementById('tv-col-title').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">خلفية بطاقة الحرف:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-card-bg" value="${(ov && ov.colors && ov.colors.cardBg) || '#FFFFFF'}" oninput="document.getElementById('tv-col-card-bg-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-card-bg-text" value="${(ov && ov.colors && ov.colors.cardBg) || '#FFFFFF'}" oninput="document.getElementById('tv-col-card-bg').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">إطار بطاقة الحرف:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-card-border" value="${(ov && ov.colors && ov.colors.cardBorder) || '#E6D7C3'}" oninput="document.getElementById('tv-col-card-border-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-card-border-text" value="${(ov && ov.colors && ov.colors.cardBorder) || '#E6D7C3'}" oninput="document.getElementById('tv-col-card-border').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون الحرف القبطي في الصندوق:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-glyph" value="${(ov && ov.colors && ov.colors.glyphColor) || '#6F1737'}" oninput="document.getElementById('tv-col-glyph-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-glyph-text" value="${(ov && ov.colors && ov.colors.glyphColor) || '#6F1737'}" oninput="document.getElementById('tv-col-glyph').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">خلفية صندوق الحرف:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-glyph-bg" value="${(ov && ov.colors && ov.colors.glyphBg) || '#FFF9F0'}" oninput="document.getElementById('tv-col-glyph-bg-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-glyph-bg-text" value="${(ov && ov.colors && ov.colors.glyphBg) || '#FFF9F0'}" oninput="document.getElementById('tv-col-glyph-bg').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون نص النطق بالعربي:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-pron" value="${(ov && ov.colors && ov.colors.pronColor) || '#8E1B3A'}" oninput="document.getElementById('tv-col-pron-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-pron-text" value="${(ov && ov.colors && ov.colors.pronColor) || '#8E1B3A'}" oninput="document.getElementById('tv-col-pron').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">خلفية صندوق النطق بالعربي:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-pron-bg" value="${(ov && ov.colors && ov.colors.pronBg) || '#FDF4E6'}" oninput="document.getElementById('tv-col-pron-bg-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-pron-bg-text" value="${(ov && ov.colors && ov.colors.pronBg) || '#FDF4E6'}" oninput="document.getElementById('tv-col-pron-bg').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">خلفية صندوق القواعد:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-rules-bg" value="${(ov && ov.colors && ov.colors.rulesBg) || '#FBF8F2'}" oninput="document.getElementById('tv-col-rules-bg-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-rules-bg-text" value="${(ov && ov.colors && ov.colors.rulesBg) || '#FBF8F2'}" oninput="document.getElementById('tv-col-rules-bg').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون عنوان قواعد النطق:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-rules-title" value="${(ov && ov.colors && ov.colors.rulesTitleColor) || '#6F1737'}" oninput="document.getElementById('tv-col-rules-title-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-rules-title-text" value="${(ov && ov.colors && ov.colors.rulesTitleColor) || '#6F1737'}" oninput="document.getElementById('tv-col-rules-title').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون نصوص وقواعد النطق:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-rules-text" value="${(ov && ov.colors && ov.colors.rulesTextColor) || '#3E2C22'}" oninput="document.getElementById('tv-col-rules-text-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-rules-text-text" value="${(ov && ov.colors && ov.colors.rulesTextColor) || '#3E2C22'}" oninput="document.getElementById('tv-col-rules-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">خلفية بطاقة الكلمة:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-word-card-bg" value="${(ov && ov.colors && ov.colors.wordCardBg) || '#FFFDF8'}" oninput="document.getElementById('tv-col-word-card-bg-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-word-card-bg-text" value="${(ov && ov.colors && ov.colors.wordCardBg) || '#FFFDF8'}" oninput="document.getElementById('tv-col-word-card-bg').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون الكلمة بالقبطية:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-word-coptic" value="${(ov && ov.colors && ov.colors.wordCopticColor) || '#6F1737'}" oninput="document.getElementById('tv-col-word-coptic-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-word-coptic-text" value="${(ov && ov.colors && ov.colors.wordCopticColor) || '#6F1737'}" oninput="document.getElementById('tv-col-word-coptic').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون القبطي المعرب (النطق):</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-word-phonetic" value="${(ov && ov.colors && ov.colors.wordPhoneticColor) || '#A3284B'}" oninput="document.getElementById('tv-col-word-phonetic-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-word-phonetic-text" value="${(ov && ov.colors && ov.colors.wordPhoneticColor) || '#A3284B'}" oninput="document.getElementById('tv-col-word-phonetic').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">لون المعنى بالعربية:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-word-meaning" value="${(ov && ov.colors && ov.colors.wordMeaningColor) || '#2D1B12'}" oninput="document.getElementById('tv-col-word-meaning-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-word-meaning-text" value="${(ov && ov.colors && ov.colors.wordMeaningColor) || '#2D1B12'}" oninput="document.getElementById('tv-col-word-meaning').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>

              <div class="curriculum-field">
                <label style="font-weight:700; font-size:0.83rem;">خلفية خلايا الكلمة:</label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="color" id="tv-col-word-cell-bg" value="${(ov && ov.colors && ov.colors.wordCellBg) || '#FFFFFF'}" oninput="document.getElementById('tv-col-word-cell-bg-text').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="width:38px; height:34px; padding:0; border:1.5px solid #D6C3A5; border-radius:8px; cursor:pointer;">
                  <input type="text" id="tv-col-word-cell-bg-text" value="${(ov && ov.colors && ov.colors.wordCellBg) || '#FFFFFF'}" oninput="document.getElementById('tv-col-word-cell-bg').value=this.value; CurriculumAdminSystem.updateOverviewLivePreview();" style="flex:1; font-size:0.82rem; direction:ltr; text-align:center;">
                </div>
              </div>
            </div>
          </div>

          <!-- القسم 4: المعاينة الحية الفورية -->
          <div class="tv-live-preview-container">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; border-bottom:1.5px dashed #D6C3A5; padding-bottom:8px;">
              <div style="font-weight:900; color:#5D371E; font-size:1rem; display:flex; align-items:center; gap:8px;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>المعاينة الحية الفورية للبطاقة (كما تظهر للطالب في الموقع والتطبيق تماماً):</span>
              </div>
              <span style="font-size:0.75rem; color:#888;">تحديث فوري أثناء الكتابة</span>
            </div>
            
            <div id="tv-live-preview-box"></div>
          </div>

        </div>
      `;

      // ربط كتابة الحروف القبطية بالحقول
      const pairInp = document.getElementById('tv-letter-pair');
      if (pairInp) {
        attachCopticKeyHandler(pairInp, () => { updateOverviewLivePreview(); });
      }
      const wordCopticInp = document.getElementById('tv-word-coptic');
      if (wordCopticInp) {
        attachCopticKeyHandler(wordCopticInp, () => { updateOverviewLivePreview(); });
      }

      // تشغيل المعاينة المبدئية
      setTimeout(() => { updateOverviewLivePreview(); }, 30);
      return;
    }

    if(type === 'listen_write'){
      const correctWord = (existingData && (existingData.correct_word || existingData.coptic_display)) || '';
      const meaning = (existingData && (existingData.meaning || existingData.audio_text)) || '';
      const qInput = document.getElementById('challenge-input-question');
      if(qInput && !qInput.value.trim()){
        qInput.value = 'استمع جيداً ثم اكتب الحرف أو الكلمة القبطية';
      }
      container.innerHTML = `
        <div style="background:#FAF6EE; border:1.5px solid #D6C8B2; border-radius:12px; padding:14px 16px; margin-bottom:12px;">
          <div style="font-weight:800; color:#6F1737; margin-bottom:6px; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
            <span>إعدادات تمرين "استمع واكتب" (Listen & Type):</span>
          </div>
          <p style="font-size:0.83rem; color:#666; margin:0 0 12px 0;">يستمع الطالب للتسجيل الصوتي المرفق أو النطق التلقائي، ثم يكتب الحرف أو الكلمة القبطية المطلوبة عبر الكيبورد.</p>
          
          <div class="curriculum-field">
            <label style="font-weight:700;">الحرف أو الكلمة القبطية الصحيحة (الإجابة المطلوبة) *</label>
            <input type="text" id="listen-write-correct-word" class="coptic-input" value="${escapeHtml(correctWord)}" placeholder="مثال: Ⲁ أو ⲁⲗⲫⲁ" style="font-size:1.25rem; font-weight:800; font-family:'girges', 'Coptic Girges', 'Noto Sans Coptic', Cairo, sans-serif; direction:ltr; text-align:right;">
          </div>
          <div class="curriculum-field" style="margin-top:10px;">
            <label style="font-weight:700;">اسم الحرف / معنى الكلمة بالعربية (اختياري كتلميح):</label>
            <input type="text" id="listen-write-meaning" value="${escapeHtml(meaning)}" placeholder="مثال: حرف ألفا">
          </div>
        </div>
      `;
      const lwInput = document.getElementById('listen-write-correct-word');
      if (lwInput) {
        attachCopticKeyHandler(lwInput, (val) => {
          const cDisp = document.getElementById('challenge-input-coptic');
          if (cDisp && (!cDisp.value.trim() || cDisp.value === val.slice(0, -1))) {
            cDisp.value = val;
          }
        });
      }
    } else if(type === 'read_select'){
      const qInput = document.getElementById('challenge-input-question');
      if(qInput && !qInput.value.trim()){
        qInput.value = 'اقرأ الحرف/الكلمة ثم اختر النطق الصحيح';
      }
      const options = (existingData && existingData.options && existingData.options.length > 0) ? existingData.options : [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
        { text: '', is_correct: false }
      ];
      container.innerHTML = `
        <div style="background:#FAF6EE; border:1.5px solid #D6C8B2; border-radius:12px; padding:12px 14px; margin-bottom:12px;">
          <div style="font-weight:800; color:#6F1737; margin-bottom:4px; font-size:0.92rem;">
            <span>إعدادات تمرين "اقرأ واختر" (Read & Select):</span>
          </div>
          <p style="font-size:0.82rem; color:#666; margin:0;">اكتب الحرف أو الكلمة القبطية في حقل <strong>(النص القبطي المعروض أعلاه)</strong>، ثم أضف خيارات النطق بالعربية وحدد الخيار الصحيح.</p>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <label style="font-weight:700; font-size:0.86rem; color:#241D20;">خيارات النطق (حدّد الإجابة الصحيحة):</label>
          <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:3px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.addOptionRow()">+ إضافة اختيار</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;" id="options-rows-container">
          ${options.map((opt, i) => `
            <div class="curriculum-dynamic-opt-row" style="display:flex; align-items:center; gap:8px;">
              <input type="radio" name="correct_opt_radio" value="${i}" ${opt.is_correct ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;" title="تحديد كإجابة صحيحة">
              <input type="text" class="challenge-opt-input" value="${escapeHtml(opt.text)}" placeholder="نص الاختيار #${i+1} (مثال: ألفا)" style="flex:1;">
              <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeOptionRow(this)" title="حذف هذا الاختيار">✕</button>
            </div>
          `).join('')}
        </div>
      `;
    } else if(type === 'image_select'){
      const qInput = document.getElementById('challenge-input-question');
      if(qInput && !qInput.value.trim()){
        qInput.value = 'انظر إلى الصورة ثم اختر الإجابة الصحيحة';
      }
      const imageUrl = (existingData && existingData.image_url) || '';
      const options = (existingData && existingData.options && existingData.options.length > 0) ? existingData.options : [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
        { text: '', is_correct: false }
      ];
      container.innerHTML = `
        <div style="background:#FAF6EE; border:1.5px solid #D6C8B2; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
          <div style="font-weight:800; color:#6F1737; margin-bottom:6px; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>إعدادات تمرين "انظر للصورة واختر" (Image & Select):</span>
          </div>
          <p style="font-size:0.83rem; color:#666; margin:0 0 12px 0;">أضف صورة واضحة للسؤال من خلال رابط مباشر أو Google Drive أو رفعها مباشرة من جهازك. تُعرض الصورة بحجم متجاوب ممتاز لكافة الشاشات ويمكن للطالب النقر عليها لتكبيرها.</p>

          <div class="curriculum-field">
            <label style="font-weight:700;">رابط الصورة (Image URL - رابط مباشر أو Google Drive أو رفع ملف) *</label>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input type="text" id="challenge-input-image-url" value="${escapeHtml(imageUrl)}" oninput="CurriculumAdminSystem.updateImageEditorPreview()" placeholder="https://... رابط الصورة المباشر أو من Google Drive" dir="ltr" style="flex:1; min-width:240px;">
              <label class="curriculum-btn curriculum-btn-secondary" style="margin:0; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:6px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>رفع صورة</span>
                <input type="file" id="challenge-file-image-upload" accept="image/*" style="display:none;" onchange="CurriculumAdminSystem.onImageFileSelected(event)">
              </label>
              <button type="button" class="curriculum-btn curriculum-btn-danger" id="btn-delete-challenge-image" onclick="CurriculumAdminSystem.removeEditorImage()" style="${imageUrl ? 'display:inline-flex;' : 'display:none;'} white-space:nowrap; align-items:center; gap:6px;" title="إزالة الصورة">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                <span>إزالة الصورة</span>
              </button>
            </div>
            <p style="font-size:0.78rem; color:#746B6F; margin:4px 0 0 0;">يدعم الرفع المباشر (.png, .jpg, .webp, .svg) وروابط الويب وروابط Google Drive العامة.</p>
          </div>

          <!-- معاينة الصورة داخل نافذة التعديل مع زر فحص التكبير -->
          <div id="challenge-image-preview-box" style="${imageUrl ? 'display:block;' : 'display:none;'} margin-top:10px;">
            <label style="font-size:0.82rem; font-weight:700; color:#6F1737; display:block; margin-bottom:4px;">معاينة مظهر الصورة (انقر للتكبير والتجربة):</label>
            <div style="position:relative; width:100%; max-width:280px; height:160px; border-radius:12px; border:2px solid #E7DCC8; overflow:hidden; background:#FFF; cursor:zoom-in; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.06);" onclick="const u=document.getElementById('challenge-input-image-url')?.value.trim(); if(u && window.CurriculumAdminSystem?.openImageZoomModal) CurriculumAdminSystem.openImageZoomModal(u, 'معاينة صورة التمرين');" title="انقر لتجربة التكبير">
              <img id="challenge-image-preview-thumb" src="${escapeHtml(imageUrl)}" style="width:100%; height:100%; object-fit:contain;" alt="معاينة صورة التمرين" />
              <div style="position:absolute; bottom:6px; left:6px; background:rgba(111,23,55,0.85); color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:12px; display:flex; align-items:center; gap:4px; font-weight:700; backdrop-filter:blur(4px);">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>تكبير</span>
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <label style="font-weight:700; font-size:0.86rem; color:#241D20;">خيارات الإجابة (حدّد الإجابة الصحيحة):</label>
          <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:3px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.addOptionRow()">+ إضافة اختيار</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;" id="options-rows-container">
          ${options.map((opt, i) => `
            <div class="curriculum-dynamic-opt-row" style="display:flex; align-items:center; gap:8px;">
              <input type="radio" name="correct_opt_radio" value="${i}" ${opt.is_correct ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;" title="تحديد كإجابة صحيحة">
              <input type="text" class="challenge-opt-input" value="${escapeHtml(opt.text)}" placeholder="نص الاختيار #${i+1}" style="flex:1;">
              <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeOptionRow(this)" title="حذف هذا الاختيار">✕</button>
            </div>
          `).join('')}
        </div>
      `;
    } else if(type === 'image_view'){
      const qInput = document.getElementById('challenge-input-question');
      if(qInput && !qInput.value.trim()){
        qInput.value = 'انظر إلى الصورة وتأملها';
      }
      const xpInput = document.getElementById('challenge-input-xp');
      if(xpInput && (!existingData || existingData.xp_reward === undefined)){
        xpInput.value = 0;
      }
      const imageUrl = (existingData && existingData.image_url) || '';
      const explanation = (existingData && existingData.explanation) || '';
      container.innerHTML = `
        <div style="background:#FAF6EE; border:1.5px solid #D6C8B2; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
          <div style="font-weight:800; color:#6F1737; margin-bottom:6px; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>إعدادات تمرين "انظر للصورة فقط" (عرض وتوضيح / Image Only):</span>
          </div>
          <p style="font-size:0.83rem; color:#666; margin:0 0 12px 0;">تمرين لعرض صورة تعليمية توضيحية بدون خيارات أو أسئلة. يقوم الطالب بمشاهدة الصورة وتكبيرها وقراءة التوضيح ثم النقر على متابعة مباشرةً. يمكنك ترك نقاط XP بـ 0 أو تحديد أي نقاط تريدها.</p>

          <div class="curriculum-field">
            <label style="font-weight:700;">رابط الصورة (Image URL - رابط مباشر أو Google Drive أو رفع ملف) *</label>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input type="text" id="challenge-input-image-url" value="${escapeHtml(imageUrl)}" oninput="CurriculumAdminSystem.updateImageEditorPreview()" placeholder="https://... رابط الصورة المباشر أو من Google Drive" dir="ltr" style="flex:1; min-width:240px;">
              <label class="curriculum-btn curriculum-btn-secondary" style="margin:0; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:6px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>رفع صورة</span>
                <input type="file" id="challenge-file-image-upload" accept="image/*" style="display:none;" onchange="CurriculumAdminSystem.onImageFileSelected(event)">
              </label>
              <button type="button" class="curriculum-btn curriculum-btn-danger" id="btn-delete-challenge-image" onclick="CurriculumAdminSystem.removeEditorImage()" style="${imageUrl ? 'display:inline-flex;' : 'display:none;'} white-space:nowrap; align-items:center; gap:6px;" title="إزالة الصورة">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                <span>إزالة الصورة</span>
              </button>
            </div>
            <p style="font-size:0.78rem; color:#746B6F; margin:4px 0 0 0;">يدعم الرفع المباشر (.png, .jpg, .webp, .svg) وروابط الويب وروابط Google Drive العامة.</p>
          </div>

          <!-- معاينة الصورة داخل نافذة التعديل مع زر فحص التكبير -->
          <div id="challenge-image-preview-box" style="${imageUrl ? 'display:block;' : 'display:none;'} margin-top:10px;">
            <label style="font-size:0.82rem; font-weight:700; color:#6F1737; display:block; margin-bottom:4px;">معاينة مظهر الصورة (انقر للتكبير والتجربة):</label>
            <div style="position:relative; width:100%; max-width:280px; height:160px; border-radius:12px; border:2px solid #E7DCC8; overflow:hidden; background:#FFF; cursor:zoom-in; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.06);" onclick="const u=document.getElementById('challenge-input-image-url')?.value.trim(); if(u && window.CurriculumAdminSystem?.openImageZoomModal) CurriculumAdminSystem.openImageZoomModal(u, 'معاينة صورة التمرين');" title="انقر لتجربة التكبير">
              <img id="challenge-image-preview-thumb" src="${escapeHtml(imageUrl)}" style="width:100%; height:100%; object-fit:contain;" alt="معاينة صورة التمرين" />
              <div style="position:absolute; bottom:6px; left:6px; background:rgba(111,23,55,0.85); color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:12px; display:flex; align-items:center; gap:4px; font-weight:700; backdrop-filter:blur(4px);">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>تكبير</span>
              </div>
            </div>
          </div>
        </div>

        <div class="curriculum-field" style="margin-top:10px;">
          <label style="font-weight:700;">نص أو شرح توضيحي أسفل الصورة (اختياري)</label>
          <textarea id="challenge-input-view-explanation" rows="2" placeholder="اكتب هنا أي شرح أو تعليق تريده أن يظهر تحت الصورة للطلاب..." style="width:100%; padding:10px; border-radius:10px; border:1.5px solid #D6C8B2; font-family:inherit; font-size:0.9rem; resize:vertical;">${escapeHtml(explanation)}</textarea>
        </div>

        <div style="background:#F0FDF4; border:1.5px solid #BBF7D0; border-radius:10px; padding:10px 14px; margin-top:8px; display:flex; align-items:center; gap:8px; color:#166534; font-size:0.86rem; font-weight:700;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>هذا التمرين للعرض والتوضيح فقط: لا يتطلب خيارات إجابة، وسيقوم الطالب بالضغط على "متابعة" مباشرةً.</span>
        </div>
      `;
    } else if(type === 'text_view'){
      const qInput = document.getElementById('challenge-input-question');
      if(qInput && !qInput.value.trim()){
        qInput.value = 'شرح وقراءة (تأمّل وتعلّم)';
      }
      const xpInput = document.getElementById('challenge-input-xp');
      if(xpInput && (!existingData || existingData.xp_reward === undefined)){
        xpInput.value = 0;
      }
      const textContent = (existingData && (existingData.explanation || existingData.meaning)) || '';
      container.innerHTML = `
        <div style="background:#FAF6EE; border:1.5px solid #D6C8B2; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
          <div style="font-weight:800; color:#6F1737; margin-bottom:6px; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>إعدادات بطاقة "قراءة نص وشرح" (Text & Info):</span>
          </div>
          <p style="font-size:0.83rem; color:#666; margin:0 0 12px 0;">أضف نصاً تعليمياً، أو شرحاً لقاعدة لغوية أو طقسية، أو قطعة للقراءة. لا يتطلب هذا النوع أي خيارات أو أسئلة، ويتم ضبط الـ XP بـ 0 تلقائياً (ويمكنك زيادتها بحرية)، وسيقوم الطالب بقراءة النص والنقر على متابعة مباشرةً.</p>

          <div class="curriculum-field">
            <label style="font-weight:700;">محتوى النص أو الشرح التعليمي *</label>
            <textarea id="challenge-input-text-content" rows="6" placeholder="اكتب هنا نص الدرس أو الشرح أو القواعد اللغوية أو النطق... يدعم السطور المتعددة والنقاط." style="width:100%; padding:12px; border-radius:10px; border:1.5px solid #D6C8B2; font-family:inherit; font-size:0.95rem; line-height:1.7; resize:vertical;">${escapeHtml(textContent)}</textarea>
          </div>

          <div style="background:#F0FDF4; border:1.5px solid #BBF7D0; border-radius:10px; padding:10px 14px; margin-top:8px; display:flex; align-items:center; gap:8px; color:#166534; font-size:0.86rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>هذا التمرين نصي فقط بدون أسئلة: يمكنك ربطه بصوت أو نص قبطي في الأعلى، وزر المتابعة سيكون متاحاً مباشرة للطالب.</span>
          </div>
        </div>
      `;
    } else if(type === 'select' || type === 'listen'){
      const options = (existingData && existingData.options && existingData.options.length > 0) ? existingData.options : [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
        { text: '', is_correct: false }
      ];
      container.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <label style="font-weight:700; font-size:0.86rem; color:#241D20;">الاختيارات (حدّد الإجابة الصحيحة):</label>
          <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:3px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.addOptionRow()">+ إضافة اختيار</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;" id="options-rows-container">
          ${options.map((opt, i) => `
            <div class="curriculum-dynamic-opt-row" style="display:flex; align-items:center; gap:8px;">
              <input type="radio" name="correct_opt_radio" value="${i}" ${opt.is_correct ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;" title="تحديد كإجابة صحيحة">
              <input type="text" class="challenge-opt-input" value="${escapeHtml(opt.text)}" placeholder="نص الاختيار #${i+1}" style="flex:1;">
              <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeOptionRow(this)" title="حذف هذا الاختيار">✕</button>
            </div>
          `).join('')}
        </div>
      `;
    } else if(type === 'match'){
      const pairs = (existingData && existingData.pairs && existingData.pairs.length > 0) ? existingData.pairs : [
        { left: 'Ⲁ', right: 'ألفا' },
        { left: 'Ⲃ', right: 'فيدا' },
        { left: 'Ⲅ', right: 'غاما' }
      ];
      container.innerHTML = `
        <div style="background:#FFF9E6; border:1px solid #E6D08C; border-radius:8px; padding:10px 14px; margin-bottom:12px; font-size:0.84rem; color:#6B5310; line-height:1.5;">
          <strong>ملاحظة للمسؤول:</strong> في هذه النافذة تحدد <strong>الإجابة الصحيحة</strong> (كل عنصر قبطي وبجواره مقابله الصحيح). يقوم النظام تلقائياً بخلط وترتيب العناصر عشوائياً للطلاب أثناء حل التمرين.
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <label style="font-weight:700; font-size:0.86rem; color:#241D20;">أزواج التوصيل (مفتاح الإجابة الصحيح):</label>
          <button type="button" class="curriculum-btn curriculum-btn-secondary" style="padding:3px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.addMatchPairRow()">+ إضافة زوج جديد</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;" id="match-pairs-container">
          ${pairs.map((p, i) => `
            <div class="curriculum-dynamic-pair-row" style="display:flex; gap:8px; align-items:center;">
              <input type="text" class="match-left-input coptic-input" value="${escapeHtml(p.left)}" placeholder="العنصر القبطي (مثال: Ⲁ)" style="flex:1;">
              <span style="font-weight:800; color:#6F1737;">➔</span>
              <input type="text" class="match-right-input" value="${escapeHtml(p.right)}" placeholder="المعنى / المقابل العربي (مثال: ألفا)" style="flex:1;">
              <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeMatchPairRow(this)">✕</button>
            </div>
          `).join('')}
        </div>
      `;
    } else if(type === 'write'){
      const tiles = (existingData && existingData.tiles) ? existingData.tiles.join(' ') : '';
      const correctWord = (existingData && existingData.correct_word) ? existingData.correct_word : '';
      container.innerHTML = `
        <div class="curriculum-field">
          <label>الكلمة الصحيحة المطلوب تركيبها / كتابتها *</label>
          <input type="text" id="write-correct-word" class="coptic-input" value="${escapeHtml(correctWord)}" placeholder="مثال: ⲁⲗⲫⲁ">
        </div>
        <div class="curriculum-field" style="margin-top:8px;">
          <label>الحروف / القطع المتاحة للطالب (مفصولة بمسافات):</label>
          <input type="text" id="write-tiles" class="coptic-input" value="${escapeHtml(tiles)}" placeholder="مثال: ⲁ ⲗ ⲫ ⲁ">
        </div>
      `;
    } else if(type === 'true_false'){
      const isTrue = existingData ? (existingData.is_correct !== false) : true;
      container.innerHTML = `
        <label style="font-weight:700; font-size:0.86rem; color:#241D20;">الإجابة الصحيحة للعبارة:</label>
        <div style="display:flex; gap:20px; margin-top:8px;">
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-weight:700;">
            <input type="radio" name="tf_radio" value="true" ${isTrue ? 'checked' : ''} style="width:20px; height:20px;">
            <span>صح (True)</span>
          </label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-weight:700;">
            <input type="radio" name="tf_radio" value="false" ${!isTrue ? 'checked' : ''} style="width:20px; height:20px;">
            <span>خطأ (False)</span>
          </label>
        </div>
      `;
    } else if(type === 'fill_blank'){
      const answer = (existingData && existingData.correct_word) ? existingData.correct_word : '';
      const distractors = (existingData && existingData.options) ? existingData.options.map(o => o.text).join('، ') : '';
      container.innerHTML = `
        <div class="curriculum-field">
          <label>الكلمة الصحيحة لملء الفراغ *</label>
          <input type="text" id="fill-blank-correct" class="coptic-input" value="${escapeHtml(answer)}" placeholder="الكلمة المفقودة الصحيحة">
        </div>
        <div class="curriculum-field" style="margin-top:8px;">
          <label>خيارات إضافية مضللة (مفصولة بفواصل):</label>
          <input type="text" id="fill-blank-distractors" class="coptic-input" value="${escapeHtml(distractors)}" placeholder="خيار 1، خيار 2، خيار 3">
        </div>
      `;
    } else if(type === 'trace'){
      const targetText = (existingData && (existingData.text_to_trace || existingData.coptic_display)) || document.getElementById('challenge-input-coptic')?.value.trim() || '';
      const targetMeaning = (existingData && (existingData.target_title || existingData.meaning)) || '';
      container.innerHTML = `
        <div style="background:#FAF6EE; border:1.5px solid #D6C8B2; border-radius:12px; padding:14px 16px; margin-bottom:12px;">
          <div style="font-weight:800; color:#6F1737; margin-bottom:6px; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            <span>إعدادات سبورة تتبع الحروف والكلمات (Letter / Word Tracing):</span>
          </div>
          <p style="font-size:0.83rem; color:#666; margin:0 0 12px 0;">يتاح للطالب تتبع ورسم الحرف أو الكلمة المخصصة تفاعلياً على السبورة في مسار التعلم. يُشترط كتابة الحرف كاملاً للنجاح.</p>
          
          <div class="curriculum-field">
            <label style="font-weight:700;">النص القبطي المراد تتبعه (حرف أو كلمة مخصصة تكتبها بنفسك) *</label>
            <input type="text" id="trace-target-text" class="coptic-input" value="${escapeHtml(targetText)}" placeholder="" style="font-size:1.25rem; font-weight:800; font-family:'girges', 'Coptic Girges', 'Noto Sans Coptic', Cairo, sans-serif; direction:ltr; text-align:right;">
          </div>

          <div class="curriculum-field" style="margin-top:10px;">
            <label style="font-weight:700;">اسم الحرف / معنى الكلمة بالعربية (اختياري)</label>
            <input type="text" id="trace-target-meaning" value="${escapeHtml(targetMeaning)}" placeholder="مثال: حرف ألفا، أو كلمة الله...">
          </div>
        </div>
      `;

      const traceInput = document.getElementById('trace-target-text');
      if (traceInput) {
        attachCopticKeyHandler(traceInput, (val) => {
          const copticDisp = document.getElementById('challenge-input-coptic');
          if (copticDisp && (!copticDisp.value.trim() || copticDisp.value === val.slice(0, -1))) {
            copticDisp.value = val;
          }
        });
      }
    }
  }

  function addOptionRow(){
    const container = document.getElementById('options-rows-container');
    if(!container) return;
    const count = container.querySelectorAll('.curriculum-dynamic-opt-row').length;
    const div = document.createElement('div');
    div.className = 'curriculum-dynamic-opt-row';
    div.style = 'display:flex; align-items:center; gap:8px;';
    div.innerHTML = `
      <input type="radio" name="correct_opt_radio" value="${count}" style="width:20px; height:20px; cursor:pointer;">
      <input type="text" class="challenge-opt-input" placeholder="نص الاختيار #${count+1}" style="flex:1;">
      <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeOptionRow(this)">✕</button>
    `;
    container.appendChild(div);
  }

  function removeOptionRow(btn){
    const row = btn.closest('.curriculum-dynamic-opt-row');
    if(row) row.remove();
  }

  function addMatchPairRow(){
    const container = document.getElementById('match-pairs-container');
    if(!container) return;
    const div = document.createElement('div');
    div.className = 'curriculum-dynamic-pair-row';
    div.style = 'display:flex; gap:8px; align-items:center;';
    div.innerHTML = `
      <input type="text" class="match-left-input coptic-input" placeholder="العنصر القبطي" style="flex:1;">
      <span style="font-weight:800; color:#6F1737;">➔</span>
      <input type="text" class="match-right-input" placeholder="المعنى / المقابل" style="flex:1;">
      <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeMatchPairRow(this)">✕</button>
    `;
    container.appendChild(div);
  }

  function removeMatchPairRow(btn){
    const row = btn.closest('.curriculum-dynamic-pair-row');
    if(row) row.remove();
  }

  async function saveChallengeForm(){
    pushHistorySnapshot();
    const lessonId = document.getElementById('challenge-input-lesson-id').value;
    const question = document.getElementById('challenge-input-question').value.trim();
    if(!question){ toast('يرجى كتابة منطوق السؤال للتمرين', true); return; }
    const type = document.getElementById('challenge-input-type').value;
    const idVal = document.getElementById('challenge-edit-id').value;

    let targetLesson = null;
    let oldChallenge = null;
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if(String(l.id) === String(lessonId)) targetLesson = l;
        (l.challenges || []).forEach(c => {
          if(idVal && String(c.id) === String(idVal)){
            oldChallenge = c;
          }
        });
      });
    });
    if(!targetLesson){ toast('الدرس المحدد غير متوفر', true); return; }
    if(!targetLesson.challenges) targetLesson.challenges = [];

    const existingOrder = oldChallenge ? (oldChallenge.order_index || 1) : (targetLesson.challenges.length + 1);
    const rawXpVal = document.getElementById('challenge-input-xp')?.value;
    const parsedXp = parseInt(rawXpVal, 10);
    const xpVal = (!isNaN(parsedXp) && parsedXp >= 0) ? parsedXp : ((type === 'image_view' || type === 'text_view') ? 0 : 10);

    const editorImgVal = document.getElementById('challenge-input-image-url')?.value.trim() || null;
    const challengeObj = {
      id: idVal ? idVal : generateTempId('ch'),
      lesson_id: lessonId,
      type: type,
      question: question,
      xp_reward: xpVal,
      coptic_display: document.getElementById('challenge-input-coptic').value.trim() || null,
      audio_text: document.getElementById('challenge-input-audio-text').value.trim() || null,
      audio_url: document.getElementById('challenge-input-audio-url').value.trim() || null,
      image_url: editorImgVal || (oldChallenge ? oldChallenge.image_url : null) || null,
      order_index: existingOrder
    };

    if(type === 'listen_write'){
      const cWord = document.getElementById('listen-write-correct-word')?.value.trim() || challengeObj.coptic_display || '';
      if(!cWord){
        toast('يرجى كتابة الحرف أو الكلمة القبطية المطلوبة للإجابة الصحيحة', true);
        return;
      }
      const meaning = document.getElementById('listen-write-meaning')?.value.trim() || '';
      challengeObj.correct_word = cWord;
      challengeObj.coptic_display = cWord;
      challengeObj.meaning = meaning;
      if(!challengeObj.audio_text && meaning){
        challengeObj.audio_text = meaning;
      }
    } else if(type === 'image_select'){
      const imgVal = document.getElementById('challenge-input-image-url')?.value.trim() || challengeObj.image_url;
      if(!imgVal){
        toast('يرجى إضافة رابط الصورة أو رفع ملف صورة لهذا التمرين', true);
        return;
      }
      challengeObj.image_url = imgVal;
      const allRows = document.querySelectorAll('#options-rows-container .curriculum-dynamic-opt-row');
      challengeObj.options = [];
      allRows.forEach((row, idx) => {
        const inp = row.querySelector('.challenge-opt-input');
        const radio = row.querySelector('input[name="correct_opt_radio"]');
        if(inp && inp.value.trim()){
          challengeObj.options.push({
            text: inp.value.trim(),
            is_correct: (radio && radio.checked)
          });
        }
      });
      if(challengeObj.options.length === 0){
        toast('يرجى كتابة اختيار واحد على الأقل', true); return;
      }
      const hasCorrect = challengeObj.options.some(o => o.is_correct);
      if(!hasCorrect && challengeObj.options.length > 0){
        challengeObj.options[0].is_correct = true;
      }
    } else if(type === 'image_view'){
      const imgVal = document.getElementById('challenge-input-image-url')?.value.trim() || challengeObj.image_url;
      if(!imgVal){
        toast('يرجى إضافة رابط الصورة أو رفع ملف صورة لهذا التمرين', true);
        return;
      }
      challengeObj.image_url = imgVal;
      const explInput = document.getElementById('challenge-input-view-explanation');
      if(explInput){
        challengeObj.explanation = explInput.value.trim() || null;
      }
      challengeObj.options = [];
    } else if(type === 'text_view'){
      const name = document.getElementById('tv-letter-name')?.value.trim() || '';
      const pair = document.getElementById('tv-letter-pair')?.value.trim() || '';
      if(!name && !pair && !challengeObj.coptic_display){
        toast('يرجى كتابة اسم الحرف ورمزه القبطي', true);
        return;
      }
      const badgeSel = document.getElementById('tv-letter-badge-select')?.value || 'حرف ساكن|badge-consonant';
      let letterTypeBadge = 'حرف ساكن';
      let badgeClass = 'badge-consonant';
      if (badgeSel === 'custom') {
        letterTypeBadge = document.getElementById('tv-letter-badge-custom')?.value.trim() || 'حرف مخصص';
        badgeClass = 'badge-consonant';
      } else {
        const parts = badgeSel.split('|');
        letterTypeBadge = parts[0] || 'حرف ساكن';
        badgeClass = parts[1] || 'badge-consonant';
      }

      const multiSel = document.getElementById('tv-multi-badge-select')?.value || '';
      let hasMultiple = false;
      let multipleCountText = '';
      if (multiSel === 'custom') {
        hasMultiple = true;
        multipleCountText = document.getElementById('tv-multi-badge-custom')?.value.trim() || '';
      } else if (multiSel) {
        hasMultiple = true;
        multipleCountText = multiSel;
      }

      const pron = document.getElementById('tv-letter-pron')?.value.trim() || '';
      const soundFile = document.getElementById('tv-letter-sound')?.value.trim() || '';
      const rulesTitle = document.getElementById('tv-rules-title')?.value.trim() || 'حالات وقواعد نطق الحرف بالتفصيل:';

      const rules = [];
      document.querySelectorAll('#tv-rules-container .tv-rule-input').forEach(inp => {
        const val = inp.value.trim();
        if (val) rules.push(val);
      });

      const wordTitle = document.getElementById('tv-word-title')?.value.trim() || 'نبذة عن الكلمة التطبيقية على الحرف';
      const wordCoptic = document.getElementById('tv-word-coptic')?.value.trim() || '';
      const wordPhonetic = document.getElementById('tv-word-phonetic')?.value.trim() || '';
      const wordMeaning = document.getElementById('tv-word-meaning')?.value.trim() || '';

      const colors = {
        titleColor: document.getElementById('tv-col-title')?.value || '',
        cardBg: document.getElementById('tv-col-card-bg')?.value || '',
        cardBorder: document.getElementById('tv-col-card-border')?.value || '',
        glyphColor: document.getElementById('tv-col-glyph')?.value || '',
        glyphBg: document.getElementById('tv-col-glyph-bg')?.value || '',
        pronColor: document.getElementById('tv-col-pron')?.value || '',
        pronBg: document.getElementById('tv-col-pron-bg')?.value || '',
        rulesBg: document.getElementById('tv-col-rules-bg')?.value || '',
        rulesTitleColor: document.getElementById('tv-col-rules-title')?.value || '',
        rulesTextColor: document.getElementById('tv-col-rules-text')?.value || '',
        wordCardBg: document.getElementById('tv-col-word-card-bg')?.value || '',
        wordCopticColor: document.getElementById('tv-col-word-coptic')?.value || '',
        wordPhoneticColor: document.getElementById('tv-col-word-phonetic')?.value || '',
        wordMeaningColor: document.getElementById('tv-col-word-meaning')?.value || '',
        wordCellBg: document.getElementById('tv-col-word-cell-bg')?.value || ''
      };

      const customOverview = {
        title: challengeObj.question,
        name: name,
        pair: pair,
        upper: pair.split(' ')[0] || pair,
        lower: pair.split(' ')[1] || pair,
        isVowel: badgeClass === 'badge-vowel',
        letterTypeBadge: letterTypeBadge,
        badgeClass: badgeClass,
        hasMultiple: hasMultiple,
        multipleCountText: multipleCountText,
        pronunciation: pron,
        soundFile: soundFile,
        rulesTitle: rulesTitle,
        rules: rules.length > 0 ? rules : ['يُنطق الحرف وفقاً للقواعد الكنسية المعتمدة.'],
        wordTitle: wordTitle,
        word: {
          coptic: wordCoptic,
          phoneticAr: wordPhonetic,
          meaning: wordMeaning,
          soundFile: soundFile
        },
        colors: colors
      };

      challengeObj.overview_data = customOverview;
      challengeObj.explanation = JSON.stringify(customOverview);
      challengeObj.coptic_display = pair;
      challengeObj.audio_text = name;
      challengeObj.audio_url = soundFile;
      challengeObj.options = [];
    } else if(type === 'read_select'){
      if(!challengeObj.coptic_display){
        toast('يرجى كتابة الحرف أو الكلمة القبطية في حقل (النص القبطي المعروض)', true);
        return;
      }
      const allRows = document.querySelectorAll('#options-rows-container .curriculum-dynamic-opt-row');
      challengeObj.options = [];
      allRows.forEach((row, idx) => {
        const inp = row.querySelector('.challenge-opt-input');
        const radio = row.querySelector('input[name="correct_opt_radio"]');
        if(inp && inp.value.trim()){
          challengeObj.options.push({
            text: inp.value.trim(),
            is_correct: (radio && radio.checked)
          });
        }
      });
      if(challengeObj.options.length === 0){
        toast('يرجى كتابة اختيار واحد على الأقل لنطق الكلمة', true); return;
      }
    } else if(type === 'select' || type === 'listen'){
      const allRows = document.querySelectorAll('#options-rows-container .curriculum-dynamic-opt-row');
      challengeObj.options = [];
      allRows.forEach((row, idx) => {
        const inp = row.querySelector('.challenge-opt-input');
        const radio = row.querySelector('input[name="correct_opt_radio"]');
        if(inp && inp.value.trim()){
          challengeObj.options.push({
            text: inp.value.trim(),
            is_correct: (radio && radio.checked)
          });
        }
      });
      if(challengeObj.options.length === 0){
        toast('يرجى كتابة اختيار واحد على الأقل', true); return;
      }
    } else if(type === 'match'){
      const leftInps = document.querySelectorAll('.match-left-input');
      const rightInps = document.querySelectorAll('.match-right-input');
      challengeObj.pairs = [];
      leftInps.forEach((lInp, i) => {
        const rVal = rightInps[i] ? rightInps[i].value.trim() : '';
        if(lInp.value.trim() || rVal){
          challengeObj.pairs.push({ left: lInp.value.trim(), right: rVal });
        }
      });
    } else if(type === 'write'){
      challengeObj.correct_word = document.getElementById('write-correct-word').value.trim();
      const tilesStr = document.getElementById('write-tiles').value.trim();
      challengeObj.tiles = tilesStr ? tilesStr.split(/\s+/) : challengeObj.correct_word.split('');
    } else if(type === 'true_false'){
      const tfVal = document.querySelector('input[name="tf_radio"]:checked');
      challengeObj.is_correct = tfVal ? (tfVal.value === 'true') : true;
    } else if(type === 'fill_blank'){
      const cWord = document.getElementById('fill-blank-correct')?.value.trim();
      if(!cWord){
        toast('يرجى إدخال الكلمة الصحيحة لملء الفراغ', true);
        return;
      }
      challengeObj.correct_word = cWord;
      const distStr = document.getElementById('fill-blank-distractors')?.value.trim() || '';
      const distList = distStr ? distStr.split(/[,،]/).map(s => s.trim()).filter(Boolean) : [];
      challengeObj.options = [
        { text: challengeObj.correct_word, is_correct: true },
        ...distList.map(t => ({ text: t, is_correct: false }))
      ];
    } else if(type === 'trace'){
      const traceText = document.getElementById('trace-target-text')?.value.trim() || challengeObj.coptic_display || '';
      if(!traceText){ toast('يرجى كتابة الحرف أو الكلمة القبطية المراد تتبعها على السبورة', true); return; }
      const traceMeaning = document.getElementById('trace-target-meaning')?.value.trim() || '';
      challengeObj.text_to_trace = traceText;
      challengeObj.coptic_display = traceText;
      challengeObj.target_title = traceMeaning ? `تتبع: ${traceText} (${traceMeaning})` : `تتبع: ${traceText}`;
      challengeObj.meaning = traceMeaning;
    }

    let oldAudioUrl = null;
    let oldImageUrl = null;
    if(idVal){
      (curriculumData.units || []).forEach(u => {
        (u.lessons || []).forEach(l => {
          const prev = (l.challenges || []).find(c => String(c.id) === String(idVal));
          if(prev && prev.audio_url) oldAudioUrl = prev.audio_url;
          if(prev && prev.image_url) oldImageUrl = prev.image_url;
          l.challenges = (l.challenges || []).filter(c => String(c.id) !== String(idVal));
        });
      });
      // إذا تم استبدال الملفات القديمة، يتم تنظيفها سحابياً
      if(oldAudioUrl && oldAudioUrl !== challengeObj.audio_url && window.deleteStorageFile){
        window.deleteStorageFile(oldAudioUrl);
      }
      if(oldImageUrl && oldImageUrl !== challengeObj.image_url && window.deleteStorageFile){
        window.deleteStorageFile(oldImageUrl);
      }
    }
    targetLesson.challenges.push(challengeObj);
    targetLesson.challenges.sort((a,b) => (a.order_index || 1) - (b.order_index || 1));

    saveLocal(true);
    closeModals();
    if(navState.unitId) renderUnitDetail(navState.unitId);
    refreshStats();

    if(window.sb && !isTempId(lessonId)){
      try {
        const dbPayload = {
          lesson_id: parseInt(lessonId),
          type: challengeObj.type || 'select',
          question: challengeObj.question,
          coptic_display: challengeObj.coptic_display || null,
          audio_text: challengeObj.audio_text || null,
          audio_url: challengeObj.audio_url || null,
          image_url: challengeObj.image_url || null,
          correct_word: challengeObj.correct_word || null,
          tiles: challengeObj.tiles ? JSON.parse(JSON.stringify(challengeObj.tiles)) : null,
          pairs: challengeObj.pairs ? JSON.parse(JSON.stringify(challengeObj.pairs)) : null,
          is_correct: challengeObj.is_correct ?? true,
          order_index: challengeObj.order_index || 1
        };

        let targetChallengeId = (!isTempId(idVal) && !isNaN(parseInt(idVal))) ? parseInt(idVal) : null;
        if(targetChallengeId){
          let { error: updErr } = await sb.from('challenges').update(dbPayload).eq('id', targetChallengeId);
          if(updErr && updErr.message && updErr.message.includes('image_url')){
            delete dbPayload.image_url;
            const res = await sb.from('challenges').update(dbPayload).eq('id', targetChallengeId);
            updErr = res.error;
          }
          if(updErr) throw updErr;
        } else {
          let { data: newC, error: insErr } = await sb.from('challenges').insert(dbPayload).select().single();
          if(insErr && insErr.message && insErr.message.includes('image_url')){
            delete dbPayload.image_url;
            const res = await sb.from('challenges').insert(dbPayload).select().single();
            newC = res.data;
            insErr = res.error;
          }
          if(insErr) throw insErr;
          if(newC){
            targetChallengeId = newC.id;
            challengeObj.id = newC.id;
          }
        }

        if(targetChallengeId && (challengeObj.type === 'select' || challengeObj.type === 'listen' || challengeObj.type === 'fill_blank' || challengeObj.type === 'read_select' || challengeObj.type === 'image_select' || challengeObj.type === 'image_view' || challengeObj.type === 'text_view')){
          await sb.from('challenge_options').delete().eq('challenge_id', targetChallengeId);
          if(challengeObj.options && challengeObj.options.length > 0){
            const optPayloads = challengeObj.options.map(o => ({
              challenge_id: targetChallengeId,
              text: o.text,
              is_correct: !!o.is_correct,
              image_url: o.image_url || null,
              audio_url: o.audio_url || null
            }));
            await sb.from('challenge_options').insert(optPayloads);
          }
        }
        saveLocal(false);
        if(navState.unitId) renderUnitDetail(navState.unitId);
        toast('تم حفظ التمرين ومزامنته سحابياً بنجاح');
      } catch(err){
        console.error('Direct challenge sync to Supabase error:', err);
        toast('خطأ في مزامنة التمرين سحابياً: ' + (err.message || ''), true);
      }
    } else {
      toast('تم حفظ التمرين محلياً');
    }
  }

  function updateAudioDeleteBtnVisibility(){
    const input = document.getElementById('challenge-input-audio-url');
    const deleteBtn = document.getElementById('btn-delete-challenge-audio');
    if(!input || !deleteBtn) return;
    deleteBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
  }

  async function removeEditorAudio(){
    const input = document.getElementById('challenge-input-audio-url');
    if(input){
      const oldUrl = input.value.trim();
      input.value = '';
      updateAudioDeleteBtnVisibility();
      if(oldUrl && window.deleteStorageFile){
        await window.deleteStorageFile(oldUrl);
      }
      toast('تمت إزالة وحذف ملف التسجيل الصوتي من التخزين السحابي ✓');
    }
  }

  // testEditorAudio removed — audio now plays directly via playAudioSnippet on preview and site

  async function onAudioFileSelected(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;

    try {
      // استخدام دالة الرفع المشتركة من admin.js — تتعامل مع overlay و MIME types تلقائياً
      const publicUrl = await window.uploadFile(file, 'curriculum', 'جارٍ رفع الملف الصوتي...');
      if(publicUrl){
        const inp = document.getElementById('challenge-input-audio-url');
        if(inp){
          inp.value = publicUrl;
          updateAudioDeleteBtnVisibility();
        }
        toast('تم رفع الملف الصوتي وتحديث الرابط بنجاح ✓');
      } else {
        toast('تعذر رفع الملف الصوتي — تأكد من اتصالك بالإنترنت', true);
      }
    } catch(err){
      console.error('Audio upload error:', err);
      toast('تعذر رفع الملف الصوتي: ' + (err.message || ''), true);
    } finally {
      e.target.value = '';
    }
  }

  async function onImageFileSelected(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;

    try {
      const publicUrl = await window.uploadFile(file, 'curriculum-images', 'جارٍ رفع وتحسين صورة التمرين...');
      if(publicUrl){
        const inp = document.getElementById('challenge-input-image-url');
        if(inp){
          inp.value = publicUrl;
          updateImageEditorPreview();
        }
        toast('تم رفع الصورة بنجاح وتحديث الرابط ✓');
      } else {
        toast('تعذر رفع الصورة — تأكد من اتصالك بالإنترنت', true);
      }
    } catch(err){
      console.error('Image upload error:', err);
      toast('تعذر رفع الصورة: ' + (err.message || ''), true);
    } finally {
      e.target.value = '';
    }
  }

  function updateImageEditorPreview(){
    const input = document.getElementById('challenge-input-image-url');
    const previewBox = document.getElementById('challenge-image-preview-box');
    const previewThumb = document.getElementById('challenge-image-preview-thumb');
    const deleteBtn = document.getElementById('btn-delete-challenge-image');
    if(!input || !previewBox || !previewThumb) return;

    let val = input.value.trim();
    // تحويل روابط Google Drive العامة تلقائياً إلى روابط عرض صور مباشرة
    if(val.includes('drive.google.com/file/d/')){
      const match = val.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if(match && match[1]){
        val = `https://drive.google.com/uc?export=view&id=${match[1]}`;
        input.value = val;
      }
    }

    if(val){
      previewBox.style.display = 'block';
      previewThumb.src = val;
      if(deleteBtn) deleteBtn.style.display = 'inline-flex';
    } else {
      previewBox.style.display = 'none';
      previewThumb.src = '';
      if(deleteBtn) deleteBtn.style.display = 'none';
    }
  }

  async function removeEditorImage(){
    const input = document.getElementById('challenge-input-image-url');
    if(input){
      const oldUrl = input.value.trim();
      input.value = '';
      updateImageEditorPreview();
      if(oldUrl && window.deleteStorageFile){
        await window.deleteStorageFile(oldUrl);
      }
      toast('تمت إزالة الصورة بنجاح ✓');
    }
  }

  function openImageZoomModal(imageUrl, caption){
    if(!imageUrl) return;
    let modal = document.getElementById('global-image-zoom-modal');
    if(!modal){
      modal = document.createElement('div');
      modal.id = 'global-image-zoom-modal';
      modal.className = 'global-image-zoom-modal';
      modal.innerHTML = `
        <div class="image-zoom-controls">
          <button type="button" id="btn-zoom-in-action" class="image-zoom-btn" title="تكبير (+)">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button type="button" id="btn-zoom-out-action" class="image-zoom-btn" title="تصغير (−)">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button type="button" id="btn-zoom-close-action" class="image-zoom-btn close-btn" title="إغلاق (Esc)">✕</button>
        </div>
        <div class="image-zoom-viewport" id="image-zoom-viewport">
          <img id="image-zoom-target" src="" alt="صورة مكبرة" />
          <div id="image-zoom-caption" class="image-zoom-caption"></div>
        </div>
        <div class="image-zoom-hint">انقر نقراً مزدوجاً للتبديل بين التكبير، أو انقر في أي مكان فارغ للإغلاق</div>
      `;
      document.body.appendChild(modal);

      let currentZoom = 1;
      const targetImg = modal.querySelector('#image-zoom-target');
      const setZoom = (z) => {
        currentZoom = Math.max(0.6, Math.min(3.5, z));
        targetImg.style.transform = `scale(${currentZoom})`;
      };

      modal.querySelector('#btn-zoom-in-action').onclick = (e) => {
        e.stopPropagation();
        setZoom(currentZoom + 0.35);
      };
      modal.querySelector('#btn-zoom-out-action').onclick = (e) => {
        e.stopPropagation();
        setZoom(currentZoom - 0.35);
      };
      modal.querySelector('#btn-zoom-close-action').onclick = (e) => {
        e.stopPropagation();
        closeZoom();
      };

      modal.onclick = (e) => {
        if(e.target === modal || e.target.id === 'image-zoom-viewport'){
          closeZoom();
        }
      };

      targetImg.ondblclick = (e) => {
        e.stopPropagation();
        setZoom(currentZoom > 1.2 ? 1 : 1.8);
      };

      function closeZoom(){
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
          currentZoom = 1;
          targetImg.style.transform = 'scale(1)';
        }, 220);
      }
      modal._closeZoom = closeZoom;
    }

    const img = modal.querySelector('#image-zoom-target');
    const cap = modal.querySelector('#image-zoom-caption');
    if(img){
      img.src = imageUrl;
      img.style.transform = 'scale(1)';
    }
    if(cap){
      cap.textContent = caption || '';
      cap.style.display = caption ? 'block' : 'none';
    }
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  /* ============ COMPLETE HIERARCHICAL SYNC TO DATABASE (DEPENDENCY-AWARE) ============ */
  let _isSyncingCurriculum = false;
  async function syncToDatabaseAndStorage(){
    if(_isSyncingCurriculum) return;
    _isSyncingCurriculum = true;

    const syncBtn = document.getElementById('btn-save-sync-curriculum');
    const originalHtml = syncBtn ? syncBtn.innerHTML : '';

    const setSyncBtnState = (state, text) => {
      if(!syncBtn) return;
      syncBtn.classList.remove('is-loading', 'is-success', 'is-error');
      if(state === 'loading'){
        syncBtn.disabled = true;
        syncBtn.classList.add('is-loading');
        syncBtn.innerHTML = `
          <svg class="curriculum-spinner-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" fill="none"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-linecap="round"/>
          </svg>
          <span>${text || 'جارٍ المزامنة والتطبيق...'}</span>
        `;
      } else if(state === 'success'){
        syncBtn.classList.add('is-success');
        syncBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${text || 'تم التطبيق والتحديث بنجاح! ✓'}</span>
        `;
        setTimeout(() => {
          if(syncBtn && originalHtml){
            syncBtn.classList.remove('is-success');
            syncBtn.innerHTML = originalHtml;
            syncBtn.disabled = false;
          }
        }, 2500);
      } else if(state === 'error'){
        syncBtn.classList.add('is-error');
        syncBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>${text || 'تعذّر التحديث!'}</span>
        `;
        setTimeout(() => {
          if(syncBtn && originalHtml){
            syncBtn.classList.remove('is-error');
            syncBtn.innerHTML = originalHtml;
            syncBtn.disabled = false;
          }
        }, 3000);
      }
    };

    setSyncBtnState('loading', 'جارٍ حفظ المنهج محلياً...');
    saveLocal(true);

    if(!window.sb){
      toast('Supabase غير متصل، تم الحفظ محلياً وتحديث تطبيق التعلّم');
      setSyncBtnState('success', 'تم الحفظ محلياً ✓');
      _isSyncingCurriculum = false;
      return;
    }

    try {
      setSyncBtnState('loading', 'جارٍ مزامنة المستويات والوحدات...');
      const levels = getLevels();
      const levelIdMap = {};
      const unitIdMap = {};
      const lessonIdMap = {};

      // 1. Levels
      if(levels && levels.length > 0){
        for(const lvl of levels){
          const lvlPayload = {
            title: lvl.title,
            description: lvl.description || '',
            order_index: lvl.order_index || 1
          };
          const oldLvlId = lvl.id;
          if(!isTempId(oldLvlId) && !isNaN(parseInt(oldLvlId))){
            const { error } = await sb.from('levels').update(lvlPayload).eq('id', parseInt(oldLvlId));
            if(error) throw error;
            levelIdMap[oldLvlId] = parseInt(oldLvlId);
          } else {
            const { data: newL, error } = await sb.from('levels').insert(lvlPayload).select().single();
            if(error) throw error;
            if(newL){
              lvl.id = newL.id;
              levelIdMap[oldLvlId] = newL.id;
            }
          }
        }
      }

      // 2. Units
      for(const u of (curriculumData.units || [])){
        const mappedLevelId = levelIdMap[u.level_id] || u.level_id || (levels[0] ? levels[0].id : 1);
        u.level_id = mappedLevelId;
        const uPayload = {
          level_id: mappedLevelId,
          title: u.title,
          badge: u.badge || 'Ⲁ',
          description: u.description || '',
          order_index: u.order_index || 1
        };
        const oldUnitId = u.id;
        if(!isTempId(oldUnitId) && !isNaN(parseInt(oldUnitId))){
          const { error } = await sb.from('units').update(uPayload).eq('id', parseInt(oldUnitId));
          if(error) throw error;
          unitIdMap[oldUnitId] = parseInt(oldUnitId);
        } else {
          const { data: newU, error } = await sb.from('units').insert(uPayload).select().single();
          if(error) throw error;
          if(newU){
            u.id = newU.id;
            unitIdMap[oldUnitId] = newU.id;
          }
        }
      }

      // 3. Lessons & Challenges (Parallelized across units for maximum speed)
      setSyncBtnState('loading', 'جارٍ مزامنة الدروس والتمارين...');
      for(const u of (curriculumData.units || [])){
        const mappedUnitId = unitIdMap[u.id] || u.id;
        await Promise.all((u.lessons || []).map(async l => {
          l.unit_id = mappedUnitId;
          const lPayload = {
            unit_id: mappedUnitId,
            title: l.title,
            xp_reward: l.xp_reward || 20,
            order_index: l.order_index || 1
          };
          const oldLessonId = l.id;
          if(!isTempId(oldLessonId) && !isNaN(parseInt(oldLessonId))){
            const { error } = await sb.from('lessons').update(lPayload).eq('id', parseInt(oldLessonId));
            if(error) throw error;
            lessonIdMap[oldLessonId] = parseInt(oldLessonId);
          } else {
            const { data: newL, error } = await sb.from('lessons').insert(lPayload).select().single();
            if(error) throw error;
            if(newL){
              l.id = newL.id;
              lessonIdMap[oldLessonId] = newL.id;
            }
          }

          // 4. Challenges inside this lesson
          const mappedLessonId = lessonIdMap[l.id] || l.id;
          await Promise.all((l.challenges || []).map(async c => {
            c.lesson_id = mappedLessonId;
            const cPayload = {
              lesson_id: mappedLessonId,
              type: c.type || 'select',
              question: c.question,
              coptic_display: c.coptic_display || null,
              audio_text: c.audio_text || null,
              audio_url: c.audio_url || null,
              image_url: c.image_url || null,
              correct_word: c.correct_word || null,
              tiles: c.tiles ? JSON.parse(JSON.stringify(c.tiles)) : null,
              pairs: c.pairs ? JSON.parse(JSON.stringify(c.pairs)) : null,
              is_correct: c.is_correct ?? true,
              order_index: c.order_index || 1
            };

            const oldChallengeId = c.id;
            let cid = (!isTempId(oldChallengeId) && !isNaN(parseInt(oldChallengeId))) ? parseInt(oldChallengeId) : null;
            if(cid){
              let { error } = await sb.from('challenges').update(cPayload).eq('id', cid);
              if(error && error.message && error.message.includes('image_url')){
                delete cPayload.image_url;
                const res = await sb.from('challenges').update(cPayload).eq('id', cid);
                error = res.error;
              }
              if(error) throw error;
            } else {
              let { data: newC, error } = await sb.from('challenges').insert(cPayload).select().single();
              if(error && error.message && error.message.includes('image_url')){
                delete cPayload.image_url;
                const res = await sb.from('challenges').insert(cPayload).select().single();
                newC = res.data;
                error = res.error;
              }
              if(error) throw error;
              if(newC){
                c.id = newC.id;
                cid = newC.id;
              }
            }

            // 5. Challenge Options
            if(cid && (c.type === 'select' || c.type === 'listen' || c.type === 'fill_blank' || c.type === 'read_select' || c.type === 'image_select' || c.type === 'image_view' || c.type === 'text_view')){
              await sb.from('challenge_options').delete().eq('challenge_id', cid);
              if(c.options && Array.isArray(c.options) && c.options.length > 0){
                const optPayloads = c.options.map(opt => ({
                  challenge_id: cid,
                  text: opt.text,
                  is_correct: !!opt.is_correct,
                  image_url: opt.image_url || null,
                  audio_url: opt.audio_url || null
                }));
                const { error: optErr } = await sb.from('challenge_options').insert(optPayloads);
                if(optErr) throw optErr;
              }
            }
          }));
        }));
      }

      // 6. Chests synchronization
      setSyncBtnState('loading', 'جارٍ مزامنة صناديق المكافآت...');
      await Promise.all((curriculumData.chests || []).map(async chest => {
        const mappedUnitId = unitIdMap[chest.unit_id] || chest.unit_id;
        const mappedLessonId = lessonIdMap[chest.after_lesson_id] || chest.after_lesson_id;
        const chestPayload = {
          id: chest.id,
          level_id: chest.level_id ? parseInt(chest.level_id, 10) : 1,
          unit_id: mappedUnitId ? parseInt(mappedUnitId, 10) : null,
          title: chest.title || 'صندوق المكافأة السري',
          description: chest.description || '',
          placement_type: chest.placement_type || 'after_lesson',
          after_lesson_id: ((chest.placement_type === 'after_lesson' || chest.placement_type === 'unit_end') && mappedLessonId) ? parseInt(mappedLessonId, 10) : null,
          xp_mode: chest.xp_mode || 'range',
          xp_min: parseInt(chest.xp_min, 10) || 20,
          xp_max: parseInt(chest.xp_max, 10) || 50,
          hearts: parseInt(chest.hearts, 10) || 0,
          has_badge: !!chest.has_badge,
          badge_title: chest.badge_title || '',
          badge_icon: chest.badge_icon || 'trophy',
          badge_desc: chest.badge_desc || ''
        };
        await sb.from('chests').upsert(chestPayload);
      }));

      saveLocal(false);
      renderCurrentView();
      refreshStats();
      setSyncBtnState('success', 'تم التطبيق والتحديث بنجاح! ✓');
      toast('تم تطبيق وتحديث المنهج وصناديق المكافآت في Supabase والموقع بنجاح');
      if(window.Swal){
        Swal.fire({
          toast: true,
          position: 'top-start',
          icon: 'success',
          title: 'تم تحديث المنهج بنجاح',
          text: 'تم تطبيق وتحديث المنهج وصناديق المكافآت في تطبيق التعلّم والسحابة بنجاح.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    } catch(err){
      console.error('Supabase sync error:', err);
      setSyncBtnState('error', 'تعذّر التحديث! راجع الاتصال');
      toast('خطأ أثناء المزامنة مع السحابة: ' + (err.message || ''), true);
      if(window.Swal){
        Swal.fire({
          icon: 'error',
          title: 'تعذّرت المزامنة مع السحابة',
          text: (err && err.message) ? err.message : 'حدث خطأ غير متوقع أثناء المزامنة.',
          confirmButtonText: 'حسناً'
        });
      }
    } finally {
      _isSyncingCurriculum = false;
    }
  }
  window.syncToDatabaseAndStorage = syncToDatabaseAndStorage;

  /* ============ COMPLETE CURRICULUM & LEARNING PATH RESET (ZERO DATA) ============ */
  async function resetAllCurriculumData(){
    const confirmHtml = `
      <div style="text-align:right; font-size:0.95rem; line-height:1.7; color:#241D20;">
        <p>هل أنت متأكد من <strong>تصفير جميع بيانات مسار التعلم</strong>؟</p>
        <div style="background:#FEF2F2; border-right:4px solid #EF4444; padding:10px 14px; border-radius:8px; margin:12px 0;">
          <p style="color:#B91C1C; font-weight:700; margin:0 0 6px 0;">تحذير: سيتم تنفيذ الإجراءات التالية:</p>
          <ul style="margin:0; padding-right:20px; color:#991B1B; font-size:0.9rem;">
            <li>حذف جميع الوحدات والدروس والتمارين التفاعلية الحالية نهائياً.</li>
            <li>حذف خيارات التمارين وصناديق المكافآت التابعة للمسار.</li>
            <li>تصفير تقدم وسجلات الطلاب في مسار التعلم للبدء على نظيف.</li>
            <li>مسح الذاكرة المؤقتة (Cache) لجميع المتصفحات فوراً.</li>
          </ul>
        </div>
        <p style="color:#4B5563; font-size:0.88rem;">سيبقى المستوى الأول فارغاً تماماً لتتمكن من إضافة وحدات ودروس المنهج الفعلي الجديد بكل سهولة.</p>
      </div>
    `;

    if(window.Swal){
      const res = await Swal.fire({
        title: 'تأكيد تصفير مسار التعلم بالكامل',
        html: confirmHtml,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، صفّر مسار التعلم نهائياً',
        cancelButtonText: 'إلغاء وتراجع',
        confirmButtonColor: '#DC2626',
        cancelButtonColor: '#6B7280'
      });
      if(!res.isConfirmed) return;
    } else {
      if(!confirm('هل أنت متأكد من تصفير جميع بيانات مسار التعلم وحذف جميع الوحدات والدروس؟')) return;
    }

    if(window.Swal){
      Swal.fire({
        title: 'جارٍ تصفير مسار التعلم...',
        text: 'يتم حذف البيانات القديمة وتطهير قاعدة البيانات محلياً وسحابياً',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });
    }

    try {
      // 1. حذف من قاعدة بيانات Supabase إن كانت متصلة
      if(window.sb){
        try { await window.sb.from('challenge_options').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try { await window.sb.from('challenges').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try { await window.sb.from('lessons').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try { await window.sb.from('units').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try { await window.sb.from('chests').delete().neq('id', '___'); } catch(e){ console.warn(e); }
        try { await window.sb.from('user_challenge_progress').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try { await window.sb.from('user_lesson_progress').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try { await window.sb.from('user_writing_progress').delete().neq('id', 0); } catch(e){ console.warn(e); }
        try {
          await window.sb.from('user_progress').update({
            points: 0,
            hearts: 5,
            streak_days: 1,
            claimed_chests: []
          }).neq('user_id', '00000000-0000-0000-0000-000000000000');
        } catch(e){ console.warn(e); }
      }

      // 2. تصفير الذاكرة المحلية localStorage
      const keysToClear = [
        'mg_coptic_curriculum_v2',
        'mg_coptic_curriculum_v1',
        'mg_coptic_curriculum_backup',
        'mg_coptic_user_progress',
        'mg_coptic_lesson_progress',
        'mg_coptic_challenge_progress',
        'mg_coptic_writing_progress',
        'mg_coptic_claimed_chests',
        'mg_coptic_cached_hero_card',
        'mg_coptic_curriculum_dirty',
        'mg_coptic_curriculum_raw'
      ];
      keysToClear.forEach(k => {
        try { localStorage.removeItem(k); } catch(e){}
      });
      // مسح أي مفاتيح تخص معرف المستخدم
      try {
        for(let i = localStorage.length - 1; i >= 0; i--){
          const key = localStorage.key(i);
          if(key && (key.startsWith('mg_coptic_lesson_progress_') || key.startsWith('mg_coptic_challenge_progress_') || key.startsWith('mg_coptic_progress_'))){
            localStorage.removeItem(key);
          }
        }
      } catch(e){}

      // 3. إعادة تعيين البيانات في الذاكرة الحالية كمنهج نظيف
      curriculumData = {
        levels: [
          { id: 1, title: 'المستوى 1: الأساسيات', description: 'مسار تعلم اللغة القبطية', order_index: 1 }
        ],
        level: { id: 1, title: 'المستوى 1: الأساسيات', description: 'مسار تعلم اللغة القبطية', order_index: 1 },
        units: [],
        chests: []
      };

      saveLocal(false);
      navState = { levelId: null, unitId: null, lessonId: null };
      renderAll();
      refreshStats();

      // 4. بث التحديث للجميع
      if(window.MGCopticGame && typeof window.MGCopticGame.broadcastUpdate === 'function'){
        window.MGCopticGame.broadcastUpdate('curriculum', curriculumData);
      }
      window.dispatchEvent(new CustomEvent('coptic_curriculum_updated', { detail: curriculumData }));

      if(window.Swal){
        Swal.fire({
          title: 'تم التصفير بنجاح! ✓',
          text: 'تم تصفير جميع بيانات مسار التعلم السابقة بالكامل. يمكنك الآن البدء في إضافة وحدات ودروس المنهج الفعلي.',
          icon: 'success',
          confirmButtonText: 'ممتاز، ابدأ إضافة المنهج',
          confirmButtonColor: '#15803D'
        });
      } else {
        alert('تم تصفير جميع بيانات مسار التعلم بنجاح!');
      }
    } catch(err) {
      console.error('Error during curriculum reset:', err);
      if(window.Swal){
        Swal.fire('خطأ أثناء التصفير', err.message || 'حدث خطأ غير متوقع', 'error');
      } else {
        alert('حدث خطأ: ' + (err.message || ''));
      }
    }
  }
  window.resetAllCurriculumData = resetAllCurriculumData;

  /* ============ EXPORT & IMPORT JSON ============ */
  function exportJSON(){
    if(!curriculumData){
      toast('لا توجد بيانات متاحة للتصدير', true); return;
    }
    normalizeCurriculumData();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curriculumData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `mg_coptic_curriculum_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    toast('تم تصدير ملف المنهج JSON بنجاح');
  }

  function triggerImportJSON(){
    const input = document.getElementById('curriculum-file-input');
    if(input) input.click();
  }

  let pendingImportData = null;

  function onFileSelected(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(evt){
      try {
        const parsed = JSON.parse(evt.target.result);
        if(!parsed.units && !parsed.levels && !parsed.level){
          toast('الملف المرفوع لا يحتوي على بنية منهج صحيحة', true);
          return;
        }
        pendingImportData = parsed;
        showImportDiffModal(parsed);
      } catch(err){
        toast('خطأ في قراءة ملف JSON: ' + err.message, true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function showImportDiffModal(imported){
    const modal = document.getElementById('modal-json-import-diff');
    const summaryBox = document.getElementById('import-diff-summary-box');
    if(!modal || !summaryBox) return;

    const importedLevelsCount = (imported.levels || (imported.level ? [imported.level] : [])).length;
    const importedUnitsCount = (imported.units || []).length;
    let importedLessonsCount = 0;
    let importedChallengesCount = 0;

    (imported.units || []).forEach(u => {
      importedLessonsCount += (u.lessons || []).length;
      (u.lessons || []).forEach(l => {
        importedChallengesCount += (l.challenges || []).length;
      });
    });

    summaryBox.innerHTML = `
      <p><strong>تفاصيل المنهج في الملف المختار:</strong></p>
      <ul>
        <li>عدد المستويات: <strong>${importedLevelsCount}</strong></li>
        <li>عدد الوحدات: <strong>${importedUnitsCount}</strong></li>
        <li>عدد الدروس: <strong>${importedLessonsCount}</strong></li>
        <li>عدد التمارين التفاعلية: <strong>${importedChallengesCount}</strong></li>
      </ul>
      <p style="color:#746B6F; font-size:0.85rem;">سيتم الاحتفاظ بنسخة احتياطية تلقائية من المنهج الحالي قبل التطبيق.</p>
    `;

    modal.style.display = 'flex';
  }

  function confirmApplyImport(){
    if(!pendingImportData) return;
    pushHistorySnapshot();
    try {
      localStorage.setItem(BACKUP_KEY, JSON.stringify(curriculumData));
    } catch(e){}

    curriculumData = JSON.parse(JSON.stringify(pendingImportData));
    pendingImportData = null;
    normalizeCurriculumData();
    saveLocal(true);
    closeModals();
    renderLevelsOverview();
    refreshStats();
    toast('تم تطبيق بيانات المنهج المستوردة بنجاح');
  }

  /* ============ ENHANCED INTERACTIVE PREVIEW (مطابق تماماً لتصميم وأصوات الموقع) ============ */
  function openInteractivePreview(lessonId){
    let targetLesson = null, parentUnit = null, parentLevel = null;
    const levels = getLevels();
    (curriculumData.units || []).forEach(u => {
      (u.lessons || []).forEach(l => {
        if(String(l.id) === String(lessonId)){
          targetLesson = l;
          parentUnit = u;
          parentLevel = levels.find(lvl => String(lvl.id) === String(u.level_id)) || levels[0];
        }
      });
    });

    if(!targetLesson || !targetLesson.challenges || targetLesson.challenges.length === 0){
      toast('الدرس المختار لا يحتوي على أي تمارين تفاعلية للمعاينة', true);
      return;
    }

    PreviewSound.unlock ? PreviewSound.unlock() : PreviewSound._init();
    PreviewSound.playClick();

    previewState = {
      active: true,
      lessonId: lessonId,
      challenges: JSON.parse(JSON.stringify(targetLesson.challenges)),
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      selectedAnswerIndex: null,
      isAnswered: false,
      isCorrect: false,
      deviceMode: previewState.deviceMode || 'desktop',
      selectedTiles: [],
      availableTiles: [],
      matchedPairKeys: [],
      selectedMatchLeft: null,
      selectedMatchRight: null,
      matchLeftItems: [],
      matchRightItems: [],
      matchInitializedFor: -1
    };

    const infoLvlUnit = document.getElementById('preview-info-level-unit');
    const infoLesTitle = document.getElementById('preview-info-lesson-title');
    const infoTotalCh = document.getElementById('preview-info-total-challenges');
    const modalEl = document.getElementById('admin-preview-modal');

    if(infoLvlUnit) infoLvlUnit.textContent = `${parentLevel ? parentLevel.title : 'المستوى'} / ${parentUnit ? parentUnit.title : ''}`;
    if(infoLesTitle) infoLesTitle.textContent = targetLesson.title;
    if(infoTotalCh) infoTotalCh.textContent = `${previewState.challenges.length} تمارين تفاعلية`;
    if(modalEl) modalEl.style.display = 'flex';

    setupCurrentChallengeState();
    renderCurrentPreviewChallenge();
  }

  function setupCurrentChallengeState(){
    if(!previewState.challenges || previewState.currentIndex >= previewState.challenges.length) return;
    const ch = previewState.challenges[previewState.currentIndex];
    previewState.selectedAnswerIndex = null;
    previewState.isAnswered = false;
    previewState.isCorrect = false;
    previewState.fillBlankValue = '';

    if(ch.type === 'write'){
      const tiles = ch.tiles || (ch.correct_word ? ch.correct_word.split('') : ['ⲁ', 'ⲗ', 'ⲫ', 'ⲁ']);
      previewState.availableTiles = shuffleArray([...tiles]);
      previewState.selectedTiles = [];
    } else if(ch.type === 'match'){
      initMatchChallenge(ch);
    }
  }

  function setPreviewDeviceMode(mode){
    PreviewSound.playClick();
    previewState.deviceMode = mode;
    const wrapper = document.getElementById('preview-frame-wrapper');
    document.querySelectorAll('.preview-device-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    if(wrapper){
      wrapper.className = `preview-frame-container mode-${mode}`;
    }
  }

  function closeInteractivePreview(){
    PreviewSound.playClick();
    previewState.active = false;
    const modalEl = document.getElementById('admin-preview-modal');
    if(modalEl) modalEl.style.display = 'none';
  }

  function shuffleArray(arr){
    const a = [...arr];
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function initMatchChallenge(challenge){
    if(previewState.matchInitializedFor === previewState.currentIndex) return;
    previewState.matchInitializedFor = previewState.currentIndex;
    const pairs = challenge.pairs || [
      { left: 'Ⲁ ⲁ', right: 'ألفا' },
      { left: 'Ⲃ ⲃ', right: 'فيدا' },
      { left: 'Ⲉ ⲉ', right: 'إي' },
      { left: 'Ⲇ ⲇ', right: 'دلدا' }
    ];
    previewState.matchLeftItems = shuffleArray(pairs.map((p, idx) => ({ id: idx, key: p.left, text: p.left })));
    previewState.matchRightItems = shuffleArray(pairs.map((p, idx) => ({ id: idx, matchKey: p.left, text: p.right })));
    previewState.selectedMatchLeft = null;
    previewState.selectedMatchRight = null;
    previewState.matchedPairKeys = [];
  }

  function handleMatchClick(btn, side, key){
    if(previewState.isAnswered) return;
    PreviewSound.playClick();

    if(side === 'left'){
      if(previewState.matchedPairKeys.includes(key)) return;
      previewState.selectedMatchLeft = key;
    } else {
      if(previewState.matchedPairKeys.includes(key)) return;
      previewState.selectedMatchRight = key;
    }

    if(previewState.selectedMatchLeft !== null && previewState.selectedMatchRight !== null){
      const challenge = previewState.challenges[previewState.currentIndex];
      const totalPairs = (challenge.pairs || []).length;

      if(previewState.selectedMatchLeft === previewState.selectedMatchRight){
        // Match Correct
        previewState.matchedPairKeys.push(previewState.selectedMatchLeft);
        PreviewSound.playCorrect();
        previewState.selectedMatchLeft = null;
        previewState.selectedMatchRight = null;

        if(previewState.matchedPairKeys.length >= totalPairs){
          previewState.isAnswered = true;
          previewState.isCorrect = true;
          previewState.correctCount++;
          const currentChallenge = previewState.challenges[previewState.currentIndex];
          const earnedXp = currentChallenge && currentChallenge.xp_reward ? currentChallenge.xp_reward : 10;
          previewState.score += earnedXp;
        }
        renderCurrentPreviewChallenge();
      } else {
        // Match Wrong
        PreviewSound.playWrong();
        const leftKey = previewState.selectedMatchLeft;
        const rightKey = previewState.selectedMatchRight;
        previewState.flashWrongLeft = leftKey;
        previewState.flashWrongRight = rightKey;
        renderCurrentPreviewChallenge();

        setTimeout(() => {
          previewState.selectedMatchLeft = null;
          previewState.selectedMatchRight = null;
          previewState.flashWrongLeft = null;
          previewState.flashWrongRight = null;
          renderCurrentPreviewChallenge();
        }, 550);
      }
    } else {
      renderCurrentPreviewChallenge();
    }
  }

  function renderCurrentPreviewChallenge(){
    const container = document.getElementById('preview-student-container');
    if(!container) return;

    // Victory Celebration Screen
    if(previewState.currentIndex >= previewState.challenges.length){
      const totalChallenges = previewState.challenges.length || 1;
      const accuracy = Math.round((previewState.correctCount / totalChallenges) * 100);
      PreviewSound.playVictory();

      container.innerHTML = `
        <div class="victory-card">
          <div class="victory-badge">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 4h16v7a8 8 0 0 1-8 8 8 8 0 0 1-8-8V4z"/><path d="M12 19v3"/><path d="M8 22h8"/></svg>
          </div>
          <h2 style="margin:0; font-size:1.6rem; color:#4A0D24; font-family:var(--font-display, 'Tajawal'); font-weight:900;">أحسنت! أكملت الدرس بنجاح</h2>
          <p style="margin:0; font-size:0.95rem; color:#746B6F;">معاينة تفاعلية كاملة بنفس تصميم وصوتيات الموقع</p>
          
          <div style="display:flex; gap:16px; margin:8px 0; width:100%; justify-content:center; flex-wrap:wrap;">
            <div class="victory-stat-box">
              <div class="victory-stat-val">+${previewState.score}</div>
              <div class="victory-stat-lbl">نقاط XP المكتسبة</div>
            </div>
            <div class="victory-stat-box">
              <div class="victory-stat-val">${accuracy}%</div>
              <div class="victory-stat-lbl">نسبة الدقة والإتقان</div>
            </div>
          </div>

          <div style="display:flex; gap:12px; width:100%; max-width:340px; margin-top:8px;">
            <button type="button" class="btn-check-answer" style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:8px;" onclick="CurriculumAdminSystem.openInteractivePreview('${previewState.lessonId}')">
              ${SVG.refresh}
              <span>إعادة المعاينة</span>
            </button>
            <button type="button" class="curriculum-btn curriculum-btn-secondary" style="flex:1; min-height:48px; font-weight:800;" onclick="CurriculumAdminSystem.closeInteractivePreview()">إغلاق</button>
          </div>
        </div>
      `;
      return;
    }

    const challenge = previewState.challenges[previewState.currentIndex];
    const progressPct = ((previewState.currentIndex) / previewState.challenges.length) * 100;

    let challengeContent = '';

    if(challenge.type === 'text_view'){
      if(typeof window.renderLetterOverviewCardHtml === 'function'){
        challengeContent = window.renderLetterOverviewCardHtml(challenge);
      } else {
        challengeContent = `
          <div class="question-heading">${escapeHtml(challenge.question || 'شرح وقراءة')}</div>
          <div class="coptic-letter-display"><span class="coptic-big-glyph">${escapeHtml(challenge.coptic_display || '')}</span></div>
          <div style="background:#FFFDF7; border:1.5px solid #E4D5BC; border-radius:14px; padding:16px 20px; margin:14px auto 0; max-width:540px; text-align:right; color:#4A3525; font-size:1.05rem; line-height:1.8; font-weight:600; white-space:pre-line;">
            ${escapeHtml(challenge.explanation || '')}
          </div>
        `;
      }
    } else if(challenge.type === 'listen_write'){
      const enteredVal = previewState.listenWriteValue || '';
      challengeContent = `
        <div class="question-heading">${escapeHtml(challenge.question || 'استمع جيداً ثم اكتب الحرف أو الكلمة القبطية')}</div>
        <div class="coptic-letter-display">
          <button type="button" class="coptic-audio-circle-btn listen-pulse" style="width:72px;height:72px;border-radius:50%;margin:10px auto;" title="استمع للصوت" aria-label="استمع للصوت" onclick="CurriculumAdminSystem.playAudioSnippet('${escapeJs(challenge.audio_url || '')}', '${escapeJs(challenge.audio_text || challenge.correct_word || challenge.coptic_display || 'حرف قبطي')}', this)">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </button>
        </div>
        <div style="max-width:420px; margin:16px auto; display:flex; flex-direction:column; gap:12px;">
          <div style="position:relative; width:100%;">
            <input type="text" id="listen-write-preview-input" class="coptic-input listen-write-input ${previewState.isAnswered ? (previewState.isCorrect ? 'correct' : 'wrong') : ''}" value="${escapeHtml(enteredVal)}" ${previewState.isAnswered ? 'readonly' : ''} oninput="CurriculumAdminSystem.onPreviewListenWriteInput(this.value)" placeholder="اكتب بالقبطية هنا..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
            ${!previewState.isAnswered ? `
              <button type="button" onclick="const inp=document.getElementById('listen-write-preview-input'); if(inp && inp.value){ inp.value=inp.value.slice(0,-1); CurriculumAdminSystem.onPreviewListenWriteInput(inp.value); }" title="مسح آخر حرف" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); border:none; background:transparent; cursor:pointer; color:#888; padding:6px;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    } else if(challenge.type === 'read_select' || challenge.type === 'select' || challenge.type === 'listen' || challenge.type === 'image_select' || challenge.type === 'image_view' || challenge.type === 'text_view'){
      challengeContent = `
        <div class="question-heading">${escapeHtml(challenge.question || (challenge.type === 'read_select' ? 'اقرأ الحرف/الكلمة ثم اختر النطق الصحيح' : (challenge.type === 'image_select' ? 'انظر إلى الصورة ثم اختر الإجابة الصحيحة' : (challenge.type === 'image_view' ? 'انظر إلى الصورة وتأملها' : (challenge.type === 'text_view' ? 'اقرأ وتأمّل' : 'اختر الإجابة الصحيحة')))))}</div>
        ${challenge.image_url ? `
          <div class="challenge-image-container">
            <div class="challenge-image-card" onclick="CurriculumAdminSystem.openImageZoomModal('${escapeJs(challenge.image_url)}', '${escapeJs(challenge.question || '')}')" title="انقر لتكبير الصورة">
              <img src="${escapeHtml(challenge.image_url)}" alt="صورة التمرين" class="challenge-image-tag" loading="lazy" />
              <div class="challenge-image-zoom-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>تكبير الصورة</span>
              </div>
            </div>
          </div>
        ` : ''}
        ${challenge.coptic_display ? `
          <div class="coptic-letter-display">
            <span class="coptic-big-glyph" style="font-size:3.5rem; line-height:1.2; font-weight:800;">${escapeHtml(challenge.coptic_display)}</span>
            ${(challenge.audio_text || challenge.audio_url) ? `
              <button type="button" class="coptic-audio-circle-btn" title="استمع للنطق" aria-label="استمع للنطق" onclick="CurriculumAdminSystem.playAudioSnippet('${escapeJs(challenge.audio_url || '')}', '${escapeJs(challenge.audio_text || challenge.coptic_display || '')}', this)">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </button>
            ` : ''}
          </div>
        ` : (challenge.type === 'listen' ? `
          <div class="coptic-letter-display">
            <button type="button" class="coptic-audio-circle-btn listen-pulse" style="width:68px;height:68px;border-radius:50%;margin-top:10px;" title="استمع للصوت" aria-label="استمع للصوت" onclick="CurriculumAdminSystem.playAudioSnippet('${escapeJs(challenge.audio_url || '')}', '${escapeJs(challenge.audio_text || 'حرف قبطي')}', this)">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            </button>
          </div>
        ` : '')}

        ${challenge.explanation ? `
          <div style="background:#FFFDF7; border:1.5px solid #E4D5BC; border-radius:14px; padding:16px 20px; margin:14px auto 0; max-width:540px; text-align:right; color:#4A3525; font-size:1.05rem; line-height:1.8; font-weight:600; white-space:pre-line; box-shadow:0 3px 12px rgba(0,0,0,0.04);">
            ${escapeHtml(challenge.explanation)}
          </div>
        ` : ''}

        ${(challenge.type !== 'image_view' && challenge.type !== 'text_view') ? `
          <div class="options-grid">
            ${(challenge.options || []).map((opt, idx) => {
              let cls = 'option-card';
              if(previewState.isAnswered){
                if(opt.is_correct) cls += ' correct';
                else if(previewState.selectedAnswerIndex === idx) cls += ' wrong';
              } else if(previewState.selectedAnswerIndex === idx){
                cls += ' selected';
              }
              const isPronQ = challenge.type === 'read_select' || (challenge.question && challenge.question.includes('نطق'));
              const optDisplayText = isPronQ && typeof window.formatPronunciationOption === 'function'
                ? window.formatPronunciationOption(opt.text)
                : opt.text;
              return `
                <div class="${cls}" onclick="CurriculumAdminSystem.selectPreviewAnswer(${idx})">
                  <span>${escapeHtml(optDisplayText)}</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      `;
    } else if(challenge.type === 'write'){
      const selected = previewState.selectedTiles || [];
      const available = previewState.availableTiles || [];

      challengeContent = `
        <div class="question-heading">${escapeHtml(challenge.question)}</div>
        ${challenge.coptic_display ? `
          <div class="coptic-letter-display">
            <span class="coptic-big-glyph">${escapeHtml(challenge.coptic_display)}</span>
          </div>
        ` : ''}
        <div class="write-area">
          <div class="tiles-dropzone">
            ${selected.length > 0 ? selected.map((tile, i) => `
              <button type="button" class="word-tile" style="background:#4A0D24; color:#FFFFFF; border-color:#6B1530;" onclick="CurriculumAdminSystem.removeWordTile(${i})">${escapeHtml(tile)}</button>
            `).join('') : '<span style="color:#6E6254; font-size:0.95rem; font-weight:700;">اضغط على الحروف لترتيبها هنا</span>'}
          </div>
          <div class="tiles-pool">
            ${available.map((tile, i) => `
              <button type="button" class="word-tile" onclick="CurriculumAdminSystem.pickWordTile(${i})">${escapeHtml(tile)}</button>
            `).join('')}
          </div>
        </div>
      `;
    } else if(challenge.type === 'match'){
      const lefts = previewState.matchLeftItems || [];
      const rights = previewState.matchRightItems || [];
      const totalPairs = (challenge.pairs || []).length;
      const matchedCount = (previewState.matchedPairKeys || []).length;

      challengeContent = `
        <div class="question-heading">${escapeHtml(challenge.question)}</div>
        <div style="background:#FFF9E6; border:1px solid #E6D08C; border-radius:12px; padding:10px 16px; margin-bottom:18px; font-size:0.88rem; text-align:center; color:#6B5310; font-weight:800;">
          طابق كل عنصر قبطي بنطقه ومعناه الصحيح (${matchedCount}/${totalPairs})
        </div>
        <div class="match-grid">
          <div class="match-col">
            ${lefts.map(p => {
              const isMatched = (previewState.matchedPairKeys || []).includes(p.key);
              const isSelected = previewState.selectedMatchLeft === p.key;
              const isWrong = previewState.flashWrongLeft === p.key;
              let cls = 'match-btn coptic-font';
              if(isMatched) cls += ' matched';
              else if(isWrong) cls += ' flash-wrong';
              else if(isSelected) cls += ' selected';
              return `<button type="button" class="${cls}" onclick="CurriculumAdminSystem.handleMatchClick(this, 'left', '${escapeJs(p.key)}')">${escapeHtml(p.text)}</button>`;
            }).join('')}
          </div>
          <div class="match-col">
            ${rights.map(p => {
              const isMatched = (previewState.matchedPairKeys || []).includes(p.matchKey);
              const isSelected = previewState.selectedMatchRight === p.matchKey;
              const isWrong = previewState.flashWrongRight === p.matchKey;
              let cls = 'match-btn';
              if(isMatched) cls += ' matched';
              else if(isWrong) cls += ' flash-wrong';
              else if(isSelected) cls += ' selected';
              return `<button type="button" class="${cls}" onclick="CurriculumAdminSystem.handleMatchClick(this, 'right', '${escapeJs(p.matchKey)}')">${escapeHtml(p.text)}</button>`;
            }).join('')}
          </div>
        </div>
      `;
    } else if(challenge.type === 'true_false'){
      challengeContent = `
        <div class="question-heading">${escapeHtml(challenge.question)}</div>
        ${challenge.coptic_display ? `
          <div class="coptic-letter-display">
            <span class="coptic-big-glyph">${escapeHtml(challenge.coptic_display)}</span>
          </div>
        ` : ''}
        <div class="options-grid">
          <div class="option-card ${previewState.selectedAnswerIndex === 0 ? (previewState.isAnswered ? (challenge.is_correct !== false ? 'correct' : 'wrong') : 'selected') : (previewState.isAnswered && challenge.is_correct !== false ? 'correct' : '')}" onclick="CurriculumAdminSystem.selectPreviewAnswer(0)">
            <span>صح (True)</span>
          </div>
          <div class="option-card ${previewState.selectedAnswerIndex === 1 ? (previewState.isAnswered ? (challenge.is_correct === false ? 'correct' : 'wrong') : 'selected') : (previewState.isAnswered && challenge.is_correct === false ? 'correct' : '')}" onclick="CurriculumAdminSystem.selectPreviewAnswer(1)">
            <span>خطأ (False)</span>
          </div>
        </div>
      `;
    } else if(challenge.type === 'fill_blank'){
      const options = challenge.options || [];
      const userVal = previewState.fillBlankValue || '';
      challengeContent = `
        <div class="question-heading">${escapeHtml(challenge.question)}</div>
        ${challenge.coptic_display ? `
          <div class="coptic-letter-display">
            <span class="coptic-big-glyph">${escapeHtml(challenge.coptic_display)}</span>
          </div>
        ` : ''}
        <div class="fill-blank-area">
          <div class="fill-blank-input-wrapper">
            <input type="text" 
                   id="fill-blank-preview-input" 
                   class="fill-blank-input coptic-input ${previewState.isAnswered ? (previewState.isCorrect ? 'correct' : 'wrong') : ''}" 
                   value="${escapeHtml(userVal)}"
                   placeholder="اضغط هنا للكتابة بالقبطي..." 
                   dir="ltr"
                   ${previewState.isAnswered ? 'readonly' : ''}
                   oninput="CurriculumAdminSystem.onPreviewFillBlankInput(this.value)">
          </div>
          ${options.length > 0 ? `
            <div class="fill-blank-options-label">أو اختر الكلمة المفقودة من الخيارات:</div>
            <div class="fill-blank-chips-pool">
              ${options.map((opt, idx) => {
                let cls = 'fill-blank-chip coptic-font';
                if(previewState.selectedAnswerIndex === idx) cls += ' selected';
                return `<button type="button" class="${cls}" onclick="CurriculumAdminSystem.selectPreviewFillBlankChip(${idx}, '${escapeJs(opt.text)}')">${escapeHtml(opt.text)}</button>`;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
    } else if(challenge.type === 'trace'){
      const targetText = challenge.text_to_trace || challenge.coptic_display || 'Ⲁ';
      const targetHeading = challenge.meaning || challenge.target_title || challenge.question || 'تتبّع الحرف';
      challengeContent = `
        <div class="trace-interactive-card" style="width:100%;max-width:390px;margin:0 auto;display:flex;flex-direction:column;align-items:center;">
          <div class="question-heading" style="font-size:1.85rem;font-weight:900;color:#2A1F17;text-align:right;margin:10px 4px 4px;line-height:1.2;width:100%;">${escapeHtml(targetHeading)}</div>
          <div style="font-size:1.35rem;font-weight:800;color:var(--gold, #B8860B);text-align:center;margin-bottom:12px;font-family:'Coptic Girges', Cairo, 'Noto Sans Coptic', sans-serif;letter-spacing:2px;min-height:30px;">
            ${escapeHtml(targetText)}
          </div>

          <!-- مؤشر التحكم في سمك الكتابة -->
          <div class="trace-stroke-control" style="display:flex;align-items:center;justify-content:space-between;background:#EFE6D5;padding:7px 14px;border-radius:28px;border:1.5px solid #DFD2BD;width:100%;max-width:340px;margin:0 auto 14px;box-sizing:border-box;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
            <div style="display:flex;align-items:center;gap:8px;">
              <span id="curriculum-tracer-stroke-preview" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#2e7d32;flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,0.25);transition:width 0.1s ease, height 0.1s ease;"></span>
              <span id="curriculum-tracer-stroke-val" style="min-width:32px;font-weight:800;color:var(--madder, #6F1737);font-size:.85rem;text-align:center;">12px</span>
            </div>
            <input type="range" id="curriculum-tracer-stroke-slider" min="6" max="32" value="12" step="2" style="flex:1;max-width:130px;accent-color:var(--madder, #6F1737);cursor:pointer;margin:0 10px;" title="تحكم في سمك خط الكتابة">
            <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.85rem;font-weight:800;color:#5A4A3E;white-space:nowrap;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
              سُمْك القلم:
            </span>
          </div>

          <div class="trace-canvas-wrapper" style="position:relative;width:100%;max-width:340px;height:310px;margin:0 auto;background:#FFFDF8;border-radius:24px;border:2px solid #D6C8B2;box-shadow:0 8px 24px rgba(0,0,0,0.05);overflow:hidden;touch-action:none;">
            <canvas id="curriculum-preview-tracer-canvas" style="width:100%;height:100%;touch-action:none;display:block;cursor:crosshair;"></canvas>
            <div id="curriculum-preview-tracer-badge" style="position:absolute;top:10px;left:10px;background:rgba(255,255,255,0.95);backdrop-filter:blur(4px);padding:4px 12px;border-radius:12px;font-size:.82rem;font-weight:800;color:#2A1F17;border:1px solid #D6C8B2;display:none;">الدقة: <span id="curriculum-preview-tracer-score">0</span>%</div>
          </div>
          <div style="display:flex;justify-content:center;gap:12px;margin:16px auto 0;width:100%;max-width:340px;">
            <button type="button" class="curriculum-btn" id="btn-preview-trace-eval" style="flex:1;padding:12px 16px;font-size:.92rem;font-weight:800;background:linear-gradient(135deg, #B8860B, #8F6310);color:#fff;border:none;border-radius:14px;cursor:pointer;box-shadow:0 4px 12px rgba(184,134,11,0.25);display:flex;align-items:center;justify-content:center;gap:6px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>فحص النتيجة</span></button>
            <button type="button" class="curriculum-btn" id="btn-preview-trace-clear" style="flex:1;padding:12px 16px;font-size:.92rem;font-weight:800;background:#EFE6D5;color:#2A1F17;border:1.5px solid #DFD2BD;border-radius:14px;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.04);display:flex;align-items:center;justify-content:center;gap:6px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg><span>مسح وإعادة</span></button>
          </div>
        </div>
      `;
    }

    // Determine footer button and feedback state
    const isMatchingType = challenge.type === 'match';
    const totalPairs = (challenge.pairs || []).length;
    const matchedCount = (previewState.matchedPairKeys || []).length;
    const isMatchingComplete = isMatchingType && matchedCount >= totalPairs;

    let canCheck = false;
    if(challenge.type === 'select' || challenge.type === 'listen' || challenge.type === 'read_select' || challenge.type === 'true_false' || challenge.type === 'image_select'){
      canCheck = previewState.selectedAnswerIndex !== null;
    } else if(challenge.type === 'image_view' || challenge.type === 'text_view'){
      canCheck = true;
    } else if(challenge.type === 'listen_write'){
      canCheck = Boolean((previewState.listenWriteValue || '').trim());
    } else if(challenge.type === 'fill_blank'){
      canCheck = Boolean((previewState.fillBlankValue || '').trim()) || previewState.selectedAnswerIndex !== null;
    } else if(challenge.type === 'write'){
      canCheck = (previewState.selectedTiles || []).length > 0;
    } else if(challenge.type === 'match'){
      canCheck = isMatchingComplete;
    } else if(challenge.type === 'trace'){
      canCheck = previewState.isTracePassed === true;
    }

    container.innerHTML = `
      <div class="runner-topbar">
        <button type="button" class="runner-close-btn" onclick="CurriculumAdminSystem.closeInteractivePreview()" title="إغلاق المعاينة">&times;</button>
        <div class="runner-progress-track">
          <div class="runner-progress-fill" style="width:${progressPct}%;"></div>
        </div>
        <div class="runner-hearts">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF4B4B" stroke="#FF4B4B" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span style="font-weight:900; font-size:1.15rem; color:#FF4B4B;">5</span>
        </div>
      </div>

      <div class="runner-body">
        ${challengeContent}
      </div>

      <div class="runner-footer">
        <div class="feedback-msg ${previewState.isAnswered ? (previewState.isCorrect ? 'correct' : 'wrong') : ''}" style="visibility:${previewState.isAnswered ? 'visible' : 'hidden'};">
          ${previewState.isAnswered ? (previewState.isCorrect ? `
            <span style="font-size:1.4rem;">${SVG.check}</span>
            <span>إجابة صحيحة! أحسنت</span>
          ` : `
            <span style="font-size:1.4rem;">${SVG.close}</span>
            <span>${
              challenge.type === 'fill_blank' && challenge.correct_word ? `إجابة غير صحيحة — الكلمة الصحيحة: «${escapeHtml(challenge.correct_word)}»` :
              challenge.type === 'listen_write' && (challenge.correct_word || challenge.coptic_display) ? `إجابة غير صحيحة — الإجابة الصحيحة هي: «${escapeHtml(challenge.correct_word || challenge.coptic_display)}»` :
              'إجابة غير صحيحة، حاول مجدداً'
            }</span>
          `) : ''}
        </div>

        <div>
          ${(challenge.type === 'text_view' || challenge.type === 'image_view') ? `
            <button type="button" class="btn-check-answer btn-continue-ok ready" onclick="CurriculumAdminSystem.nextPreviewChallenge()">فهمت ومتابعة ${SVG.arrowLeft}</button>
          ` : (
            isMatchingType ? (
              isMatchingComplete ? `
                <button type="button" class="btn-check-answer btn-continue-ok" onclick="CurriculumAdminSystem.nextPreviewChallenge()">متابعة ${SVG.arrowLeft}</button>
              ` : `
                <button type="button" class="btn-check-answer" disabled>طابق جميع الأزواج</button>
              `
            ) : (
              !previewState.isAnswered ? `
                <button type="button" class="btn-check-answer" ${!canCheck ? 'disabled' : ''} onclick="CurriculumAdminSystem.checkPreviewAnswer()">تحقق</button>
              ` : (
                previewState.isCorrect ? `
                  <button type="button" class="btn-check-answer btn-continue-ok" onclick="CurriculumAdminSystem.nextPreviewChallenge()">متابعة ${SVG.arrowLeft}</button>
                ` : `
                  <button type="button" class="btn-check-answer btn-continue-err" onclick="CurriculumAdminSystem.nextPreviewChallenge()">متابعة ${SVG.arrowLeft}</button>
                `
              )
            )
          )}
        </div>
      </div>
    `;

    if(challenge.type === 'trace'){
      const canvasEl = document.getElementById('curriculum-preview-tracer-canvas');
      const badgeEl = document.getElementById('curriculum-preview-tracer-badge');
      const scoreEl = document.getElementById('curriculum-preview-tracer-score');
      const clearBtn = document.getElementById('btn-preview-trace-clear');
      const evalBtn = document.getElementById('btn-preview-trace-eval');

      if(window.previewActiveTracer){
        try { window.previewActiveTracer.destroy(); } catch(_){}
        window.previewActiveTracer = null;
      }

      const cleanTraceText = (challenge.text_to_trace || challenge.coptic_display || 'Ⲁ').trim();
      if(canvasEl && typeof LetterTracer !== 'undefined'){
        window.previewActiveTracer = new LetterTracer({
          canvasId: canvasEl,
          fontUrl: 'assets/fonts/girges.woff',
          text: cleanTraceText,
          passThreshold: 80,
          minCoverageThreshold: 80,
          onSuccess: (score) => {
            if(badgeEl && scoreEl){
              scoreEl.textContent = score;
              badgeEl.style.display = 'block';
              badgeEl.style.color = '#2e6b3e';
              badgeEl.style.borderColor = '#2e6b3e';
            }
            previewState.isTracePassed = true;
          }
        });

        const strokeSlider = document.getElementById('curriculum-tracer-stroke-slider');
        const strokeVal = document.getElementById('curriculum-tracer-stroke-val');
        const strokePreview = document.getElementById('curriculum-tracer-stroke-preview');
        if (strokeSlider) {
          strokeSlider.value = 12;
          if (strokeVal) strokeVal.textContent = '12px';
          if (strokePreview) {
            strokePreview.style.width = '12px';
            strokePreview.style.height = '12px';
          }
          strokeSlider.oninput = (e) => {
            const w = parseInt(e.target.value, 10);
            if (strokeVal) strokeVal.textContent = `${w}px`;
            if (strokePreview) {
              strokePreview.style.width = `${w}px`;
              strokePreview.style.height = `${w}px`;
            }
            if (window.previewActiveTracer) {
              window.previewActiveTracer.setStrokeWidth(w);
            }
          };
        }

        setTimeout(() => {
          if (window.previewActiveTracer) {
            window.previewActiveTracer._setupCanvasSize();
            window.previewActiveTracer.draw();
          }
        }, 60);

        if(clearBtn){
          clearBtn.onclick = () => {
            if(window.previewActiveTracer) window.previewActiveTracer.clear();
            if(badgeEl) badgeEl.style.display = 'none';
            previewState.isTracePassed = false;
          };
        }
        if(evalBtn){
          evalBtn.onclick = () => {
            if(window.previewActiveTracer){
              const res = window.previewActiveTracer.evaluate();
              if(badgeEl && scoreEl){
                scoreEl.textContent = res.finalScore;
                badgeEl.style.display = 'block';
                badgeEl.style.color = res.passed ? '#2e6b3e' : (res.incomplete ? '#c2410c' : '#a13030');
                badgeEl.style.borderColor = res.passed ? '#2e6b3e' : (res.incomplete ? '#ea580c' : '#a13030');
              }
              if(res.incomplete){
                toast(res.message || `يرجى إكمال كتابة الحرف كاملاً (${res.coveragePercent}%)`, true);
              } else if(!res.passed){
                toast(`الدقة ${res.finalScore}% — حاول البقاء داخل المسار لتصل إلى 80%`, true);
              } else {
                previewState.isTracePassed = true;
                previewState.isAnswered = true;
                previewState.isCorrect = true;
                previewState.correctCount++;
                const earnedXp = challenge.xp_reward || 10;
                previewState.score += earnedXp;
                toast(`ممتاز! الدقة ${res.finalScore}% — يمكنك المتابعة الآن`);
                renderCurrentPreviewChallenge();
              }
            }
          };
        }
      }
    }

    // Auto-focus and open Coptic Keyboard for fill_blank in preview
    if(challenge.type === 'fill_blank'){
      setTimeout(() => {
        const previewInp = document.getElementById('fill-blank-preview-input');
        if(previewInp && !previewState.isAnswered){
          try {
            previewInp.focus();
            if(window.CopticKeyboard) window.CopticKeyboard.open(previewInp);
          } catch(_){}
        }
      }, 250);
    }

    // تشغيل الصوت فوراً لأي تمرين يحتوي على صوت دون الحاجة للضغط على الزر
    const hasAudio = !!(challenge.audio_url || challenge.audio_text || challenge.type === 'listen');
    if(hasAudio){
      setTimeout(() => {
        const previewAudioBtn = document.querySelector('#preview-student-container .coptic-audio-circle-btn, #preview-student-container .audio-icon-btn');
        const spoken = challenge.audio_text || (challenge.type === 'listen' ? (challenge.coptic_display || 'حرف قبطي') : (challenge.coptic_display || ''));
        CurriculumAdminSystem.playAudioSnippet(challenge.audio_url || '', spoken, previewAudioBtn);
      }, 250);
    }
  }

  function onPreviewFillBlankInput(val){
    if(previewState.isAnswered) return;
    previewState.fillBlankValue = val;
    const checkBtn = document.querySelector('#preview-student-container .btn-check-answer');
    if(checkBtn && !previewState.isAnswered){
      const canCheck = Boolean((val || '').trim()) || previewState.selectedAnswerIndex !== null;
      checkBtn.disabled = !canCheck;
    }
  }

  function selectPreviewFillBlankChip(idx, text){
    if(previewState.isAnswered) return;
    PreviewSound.playClick();
    previewState.selectedAnswerIndex = idx;
    previewState.fillBlankValue = text;
    const input = document.getElementById('fill-blank-preview-input');
    if(input){
      input.value = text;
    }
    renderCurrentPreviewChallenge();
  }

  function selectPreviewAnswer(idx){
    if(previewState.isAnswered) return;
    PreviewSound.playClick();
    previewState.selectedAnswerIndex = idx;
    renderCurrentPreviewChallenge();
  }

  function pickWordTile(availableIdx){
    if(previewState.isAnswered) return;
    PreviewSound.playClick();
    if(previewState.availableTiles && previewState.availableTiles[availableIdx] !== undefined){
      const [tile] = previewState.availableTiles.splice(availableIdx, 1);
      if(!previewState.selectedTiles) previewState.selectedTiles = [];
      previewState.selectedTiles.push(tile);
      renderCurrentPreviewChallenge();
    }
  }

  function removeWordTile(selectedIdx){
    if(previewState.isAnswered) return;
    PreviewSound.playClick();
    if(previewState.selectedTiles && previewState.selectedTiles[selectedIdx] !== undefined){
      const [tile] = previewState.selectedTiles.splice(selectedIdx, 1);
      if(!previewState.availableTiles) previewState.availableTiles = [];
      previewState.availableTiles.push(tile);
      renderCurrentPreviewChallenge();
    }
  }

  function onPreviewListenWriteInput(val){
    if(previewState.isAnswered) return;
    previewState.listenWriteValue = val;
    const checkBtn = document.querySelector('#preview-student-container .btn-check-answer');
    if(checkBtn && !previewState.isAnswered){
      checkBtn.disabled = !Boolean((val || '').trim());
    }
  }

  function checkPreviewAnswer(){
    if(previewState.isAnswered) return;
    const challenge = previewState.challenges[previewState.currentIndex];
    let isCorrect = false;

    if(challenge.type === 'select' || challenge.type === 'listen' || challenge.type === 'read_select' || challenge.type === 'image_select'){
      if(previewState.selectedAnswerIndex === null) return;
      const selectedOpt = challenge.options[previewState.selectedAnswerIndex];
      isCorrect = selectedOpt ? !!selectedOpt.is_correct : false;
    } else if(challenge.type === 'listen_write'){
      const entered = (previewState.listenWriteValue || '').trim();
      const expected = (challenge.correct_word || challenge.coptic_display || '').trim();
      const clean = (s) => s.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
      isCorrect = (clean(entered) === clean(expected) || clean(entered).toLowerCase() === clean(expected).toLowerCase());
    } else if(challenge.type === 'fill_blank'){
      const entered = (previewState.fillBlankValue || '').trim().toLowerCase();
      const expected = (challenge.correct_word || '').trim().toLowerCase();
      if(expected){
        isCorrect = (entered === expected);
      } else if(previewState.selectedAnswerIndex !== null && challenge.options){
        const selectedOpt = challenge.options[previewState.selectedAnswerIndex];
        isCorrect = selectedOpt ? !!selectedOpt.is_correct : false;
      }
    } else if(challenge.type === 'true_false'){
      if(previewState.selectedAnswerIndex === null) return;
      const chosenBool = previewState.selectedAnswerIndex === 0;
      const expectedBool = challenge.is_correct !== false;
      isCorrect = (chosenBool === expectedBool);
    } else if(challenge.type === 'write'){
      const entered = (previewState.selectedTiles || []).join('');
      isCorrect = entered === (challenge.correct_word || '');
    } else {
      isCorrect = true;
    }

    previewState.isAnswered = true;
    previewState.isCorrect = isCorrect;
    if(isCorrect){
      previewState.correctCount++;
      const currentChallenge = previewState.challenges[previewState.currentIndex];
      const earnedXp = (currentChallenge && currentChallenge.xp_reward !== undefined && currentChallenge.xp_reward !== null) ? Number(currentChallenge.xp_reward) : ((currentChallenge && (currentChallenge.type === 'image_view' || currentChallenge.type === 'text_view')) ? 0 : 10);
      previewState.score += earnedXp;
      PreviewSound.playCorrect();
    } else {
      PreviewSound.playWrong();
    }

    renderCurrentPreviewChallenge();
  }

  function nextPreviewChallenge(){
    PreviewSound.playClick();
    previewState.currentIndex++;
    setupCurrentChallengeState();
    renderCurrentPreviewChallenge();
  }

  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escapeJs(str){
    if(!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
  }


  /* ============ TEXT VIEW OVERVIEW EDITOR HELPERS & LIVE PREVIEW ============ */
  function onOverviewBadgeSelectChange(){
    const sel = document.getElementById('tv-letter-badge-select');
    const customInp = document.getElementById('tv-letter-badge-custom');
    if (sel && customInp) {
      customInp.style.display = sel.value === 'custom' ? 'block' : 'none';
    }
    updateOverviewLivePreview();
  }

  function onOverviewMultiSelectChange(){
    const sel = document.getElementById('tv-multi-badge-select');
    const customInp = document.getElementById('tv-multi-badge-custom');
    if (sel && customInp) {
      customInp.style.display = sel.value === 'custom' ? 'block' : 'none';
    }
    updateOverviewLivePreview();
  }

  function addOverviewRuleRow(text = ''){
    const container = document.getElementById('tv-rules-container');
    if (!container) return;
    const rowCount = container.querySelectorAll('.tv-rule-row').length + 1;
    const div = document.createElement('div');
    div.className = 'tv-rule-row';
    div.innerHTML = `
      <span class="tv-rule-num">${rowCount}.</span>
      <input type="text" class="tv-rule-input" value="${escapeHtml(text)}" placeholder="اكتب قاعدة النطق هنا..." oninput="CurriculumAdminSystem.updateOverviewLivePreview()">
      <button type="button" class="curriculum-btn curriculum-btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="CurriculumAdminSystem.removeOverviewRuleRow(this)" title="حذف القاعدة">✕</button>
    `;
    container.appendChild(div);
    updateOverviewLivePreview();
  }

  function removeOverviewRuleRow(btn){
    const row = btn.closest('.tv-rule-row');
    if (row) row.remove();
    const container = document.getElementById('tv-rules-container');
    if (container) {
      container.querySelectorAll('.tv-rule-row').forEach((r, idx) => {
        const numSpan = r.querySelector('.tv-rule-num');
        if (numSpan) numSpan.textContent = (idx + 1) + '.';
      });
    }
    updateOverviewLivePreview();
  }

  
  function applyColorPreset(preset, btn){
    const presets = {
      default: {
        titleColor: '#2E2018',
        cardBg: '#FFFFFF',
        cardBorder: '#E6D7C3',
        glyphColor: '#6F1737',
        glyphBg: '#FFF9F0',
        pronColor: '#8E1B3A',
        pronBg: '#FDF4E6',
        rulesBg: '#FBF8F2',
        rulesTitleColor: '#6F1737',
        rulesTextColor: '#3E2C22',
        wordCardBg: '#FFFDF8',
        wordCopticColor: '#6F1737',
        wordPhoneticColor: '#A3284B',
        wordMeaningColor: '#2D1B12',
        wordCellBg: '#FFFFFF'
      },
      dark: {
        titleColor: '#FFDF6D',
        cardBg: '#23181D',
        cardBorder: '#8C6A1A',
        glyphColor: '#FFE082',
        glyphBg: '#341D26',
        pronColor: '#FFE082',
        pronBg: '#3E212D',
        rulesBg: '#2B1E24',
        rulesTitleColor: '#FFDF6D',
        rulesTextColor: '#FAF0E4',
        wordCardBg: '#261A20',
        wordCopticColor: '#FFDF6D',
        wordPhoneticColor: '#FFB4C8',
        wordMeaningColor: '#FFFFFF',
        wordCellBg: '#35212B'
      },
      emerald: {
        titleColor: '#0E3A24',
        cardBg: '#F4FAF6',
        cardBorder: '#A3D2BA',
        glyphColor: '#0E5C34',
        glyphBg: '#E2F3EA',
        pronColor: '#0E5C34',
        pronBg: '#E8F6EF',
        rulesBg: '#EBF7F0',
        rulesTitleColor: '#0E5C34',
        rulesTextColor: '#143322',
        wordCardBg: '#F0F9F4',
        wordCopticColor: '#0E5C34',
        wordPhoneticColor: '#1B824E',
        wordMeaningColor: '#0E3A24',
        wordCellBg: '#FFFFFF'
      },
      papyrus: {
        titleColor: '#3A2718',
        cardBg: '#FBF5E8',
        cardBorder: '#D8C29D',
        glyphColor: '#5C381E',
        glyphBg: '#F4E8D2',
        pronColor: '#7A4722',
        pronBg: '#F3E5CC',
        rulesBg: '#F7EEDC',
        rulesTitleColor: '#5C381E',
        rulesTextColor: '#3A2718',
        wordCardBg: '#F9F1E0',
        wordCopticColor: '#5C381E',
        wordPhoneticColor: '#8C5228',
        wordMeaningColor: '#2D1C10',
        wordCellBg: '#FFFDF7'
      }
    };

    const p = presets[preset] || presets.default;
    const map = {
      'tv-col-title': p.titleColor,
      'tv-col-card-bg': p.cardBg,
      'tv-col-card-border': p.cardBorder,
      'tv-col-glyph': p.glyphColor,
      'tv-col-glyph-bg': p.glyphBg,
      'tv-col-pron': p.pronColor,
      'tv-col-pron-bg': p.pronBg,
      'tv-col-rules-bg': p.rulesBg,
      'tv-col-rules-title': p.rulesTitleColor,
      'tv-col-rules-text': p.rulesTextColor,
      'tv-col-word-card-bg': p.wordCardBg,
      'tv-col-word-coptic': p.wordCopticColor,
      'tv-col-word-phonetic': p.wordPhoneticColor,
      'tv-col-word-meaning': p.wordMeaningColor,
      'tv-col-word-cell-bg': p.wordCellBg
    };

    Object.keys(map).forEach(id => {
      const el = document.getElementById(id);
      const textEl = document.getElementById(id + '-text');
      if (el) el.value = map[id];
      if (textEl) textEl.value = map[id];
    });

    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('button').forEach(b => {
        b.style.borderColor = '';
        b.style.background = '';
        b.style.color = '';
        b.style.boxShadow = '';
      });
      btn.style.borderColor = '#6F1737';
      btn.style.background = '#6F1737';
      btn.style.color = '#FFFFFF';
      btn.style.boxShadow = '0 2px 8px rgba(111, 23, 55, 0.35)';
    }

    updateOverviewLivePreview();
  }
  window.applyColorPreset = applyColorPreset;

  function updateOverviewLivePreview(){
    const box = document.getElementById('tv-live-preview-box');
    if (!box) return;

    const name = document.getElementById('tv-letter-name')?.value.trim() || 'الحرف';
    const pair = document.getElementById('tv-letter-pair')?.value.trim() || 'Ⲁ ⲁ';
    const badgeSel = document.getElementById('tv-letter-badge-select')?.value || 'badge-consonant';
    let letterTypeBadge = 'حرف ساكن';
    let badgeClass = 'badge-consonant';

    if (badgeSel === 'custom') {
      letterTypeBadge = document.getElementById('tv-letter-badge-custom')?.value.trim() || 'حرف مخصص';
      badgeClass = 'badge-consonant';
    } else {
      const opt = document.getElementById('tv-letter-badge-select')?.selectedOptions[0];
      letterTypeBadge = opt ? opt.textContent.trim() : 'حرف ساكن';
      badgeClass = badgeSel;
    }

    const multiSel = document.getElementById('tv-multi-badge-select')?.value || 'none';
    let hasMultiple = false;
    let multipleCountText = '';
    if (multiSel === 'custom') {
      hasMultiple = true;
      multipleCountText = document.getElementById('tv-multi-badge-custom')?.value.trim() || '';
    } else if (multiSel !== 'none') {
      hasMultiple = true;
      const opt = document.getElementById('tv-multi-badge-select')?.selectedOptions[0];
      multipleCountText = opt ? opt.textContent.trim() : '';
    }

    const pron = document.getElementById('tv-letter-pron')?.value.trim() || '';
    const soundFile = document.getElementById('tv-letter-sound')?.value.trim() || '';
    const rulesTitle = document.getElementById('tv-rules-title')?.value.trim() || (hasMultiple ? 'حالات وقواعد نطق الحرف بالتفصيل:' : 'قاعدة نطق الحرف:');

    const rules = [];
    document.querySelectorAll('#tv-rules-container .tv-rule-input').forEach(inp => {
      const val = inp.value.trim();
      if (val) rules.push(val);
    });

    const wordTitle = document.getElementById('tv-word-title')?.value.trim() || 'نبذة عن الكلمة التطبيقية على الحرف';
    const wordCoptic = document.getElementById('tv-word-coptic')?.value.trim() || '';
    const wordPhonetic = document.getElementById('tv-word-phonetic')?.value.trim() || '';
    const wordMeaning = document.getElementById('tv-word-meaning')?.value.trim() || '';

    const colors = {
      titleColor: document.getElementById('tv-col-title')?.value || '',
      cardBg: document.getElementById('tv-col-card-bg')?.value || '',
      cardBorder: document.getElementById('tv-col-card-border')?.value || '',
      glyphColor: document.getElementById('tv-col-glyph')?.value || '',
      glyphBg: document.getElementById('tv-col-glyph-bg')?.value || '',
      pronColor: document.getElementById('tv-col-pron')?.value || '',
      pronBg: document.getElementById('tv-col-pron-bg')?.value || '',
      rulesBg: document.getElementById('tv-col-rules-bg')?.value || '',
      rulesTitleColor: document.getElementById('tv-col-rules-title')?.value || '',
      rulesTextColor: document.getElementById('tv-col-rules-text')?.value || '',
      wordCardBg: document.getElementById('tv-col-word-card-bg')?.value || '',
      wordCopticColor: document.getElementById('tv-col-word-coptic')?.value || '',
      wordPhoneticColor: document.getElementById('tv-col-word-phonetic')?.value || '',
      wordMeaningColor: document.getElementById('tv-col-word-meaning')?.value || '',
      wordCellBg: document.getElementById('tv-col-word-cell-bg')?.value || ''
    };

    const mockCh = {
      type: 'text_view',
      question: `نبذة عن حرف ${name} (${pair})`,
      coptic_display: pair,
      audio_url: soundFile,
      overview_data: {
        title: `نبذة عن حرف ${name} (${pair})`,
        name: name,
        pair: pair,
        upper: pair.split(' ')[0] || pair,
        lower: pair.split(' ')[1] || pair,
        isVowel: badgeClass === 'badge-vowel',
        letterTypeBadge: letterTypeBadge,
        badgeClass: badgeClass,
        hasMultiple: hasMultiple,
        multipleCountText: multipleCountText,
        pronunciation: pron,
        soundFile: soundFile,
        rulesTitle: rulesTitle,
        rules: rules.length > 0 ? rules : ['يُنطق الحرف وفقاً للقواعد الكنسية.'],
        wordTitle: wordTitle,
        word: {
          coptic: wordCoptic,
          phoneticAr: wordPhonetic,
          meaning: wordMeaning,
          soundFile: soundFile
        },
        colors: colors
      }
    };

    if (typeof window.renderLetterOverviewCardHtml === 'function') {
      box.innerHTML = window.renderLetterOverviewCardHtml(mockCh);
    } else {
      box.innerHTML = `<div style="padding:20px; text-align:center;">جاري تحميل المعاينة...</div>`;
    }
  }

  return {
    init,
    undo,
    redo,
    renderAll,
    closeModals,
    openAddLevelModal,
    openEditLevelModal,
    saveLevelForm,
    deleteLevel,
    moveLevel,
    openAddUnitModal,
    openEditUnitModal,
    saveUnitForm,
    deleteUnit,
    moveUnitInLevel,
    openAddLessonModal,
    openEditLessonModal,
    saveLessonForm,
    deleteLesson,
    moveLessonInUnit,
    openAddChallengeModal,
    openEditChallengeModal,
    saveChallengeForm,
    deleteChallenge,
    moveChallengeInLesson,
    onChallengeTypeChange,
    addOptionRow,
    removeOptionRow,
    addMatchPairRow,
    removeMatchPairRow,
    playAudioSnippet,
    stopAudioSnippet,
    onAudioFileSelected,
    removeEditorAudio,
    updateAudioDeleteBtnVisibility,
    onImageFileSelected,
    updateImageEditorPreview,
    removeEditorImage,
    openImageZoomModal,
    triggerImportJSON,
    onFileSelected,
    confirmApplyImport,
    exportJSON,
    syncToDatabaseAndStorage,
    resetAllCurriculumData,
    openInteractivePreview,
    closeInteractivePreview,
    setPreviewDeviceMode,
    selectPreviewAnswer,
    onPreviewListenWriteInput,
    onPreviewFillBlankInput,
    selectPreviewFillBlankChip,
    pickWordTile,
    removeWordTile,
    handleMatchClick,
    checkPreviewAnswer,
    nextPreviewChallenge,
    showLevelDetail,
    showLevelsOverview,
    showUnitDetail,
    backToLevelDetail,
    renderUnitDetail,
    renderLevelsOverview,
    addUnitToCurrentLevel,
    openAddLessonToCurrentUnit,
    addRewardItem: openAddChestModal,
    openAddChestModal,
    openAddChestToCurrentLevel,
    openAddChestToCurrentUnit,
    openAddChestModalForUnit,
    openAddChestAfterLesson,
    openAddChestToLesson,
    openAddChestAtStart,
    openAddChestAtEnd,
    changeChestPosition,
    moveChestUp,
    moveChestDown,
    moveChestAmongUnitsUp,
    moveChestAmongUnitsDown,
    moveLessonItemUp,
    moveLessonItemDown,
    openEditChestModal,
    saveChestForm,
    deleteChest,
    previewChest,
    triggerPreviewCelebration,
    onChestUnitChange,
    onChestPlacementChange,
    onChestXpModeChange,
    setChestHearts,
    toggleChestBadgeFields,
    onChestBadgeToggle,
    onChestBadgeToggle,
    setChestBadgeIcon,
    updateChestModalPreview,
    renderRewardBoxSection,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    setBadgeMode,
    handleBadgeImageUpload,
    updateBadgePreview,
    applyColorPreset,
    updateOverviewLivePreview,
    addOverviewRuleRow,
    removeOverviewRuleRow,
    onOverviewBadgeSelectChange,
    onOverviewMultiSelectChange
  };
})();

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    CurriculumAdminSystem.closeInteractivePreview();
    CurriculumAdminSystem.closeModals();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  CurriculumAdminSystem.init();
});


window.CurriculumAdminSystem = CurriculumAdminSystem;
