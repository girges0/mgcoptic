/**
 * MG COPTIC — Gamification & Curriculum Service
 * يتيح التعامل المشترك مع Supabase، مع التخزين المحلي الاحتياطي التلقائي (LocalStorage Fallback)
 * ونظام الصوتيات المولد بـ Web Audio API
 */

const MG_CONFIG = {
  SUPABASE_URL: 'https://kdoanxzpfiscprjjzzic.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo',
  STORAGE_KEYS: {
    USER: 'mg_coptic_user',
    PROGRESS: 'mg_coptic_progress',
    CURRICULUM: 'mg_coptic_curriculum_v1',
    LESSON_PROGRESS: 'mg_coptic_lesson_progress',
    SETTINGS: 'mg_coptic_game_settings'
  }
};

// إنشاء عميل Supabase إذا توفرت المكتبة
let sbClient = null;
if(window.supabase && typeof window.supabase.createClient === 'function'){
  try {
    sbClient = window.supabase.createClient(MG_CONFIG.SUPABASE_URL, MG_CONFIG.SUPABASE_ANON_KEY, {
      auth: {
        storageKey: 'mg_coptic_student_auth_token',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    window.sbClient = sbClient;
  } catch(e){
    console.warn('Supabase client init error:', e);
  }
}

/* ============================================================
   المنهج الافتراضي النظيف (جاهز لاستقبال المنهج الفعلي)
   ============================================================ */
const DEFAULT_CURRICULUM = {"levels":[{"id":5,"title":"المستوى الأول: الأبجدية القبطية الكاملة","description":"تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة","order_index":1}],"level":{"id":5,"title":"المستوى الأول: الأبجدية القبطية الكاملة","description":"تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة","order_index":1},"units":[{"id":41,"level_id":5,"title":"الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)","badge":"Ⲁ-Ⲉ","description":"تعلّم كتابة ونطق أول 5 حروف في الأبجدية القبطية","order_index":1,"lessons":[{"id":133,"unit_id":41,"title":"حرف ألفا (Ⲁ ⲁ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":668,"lesson_id":133,"type":"text_view","question":"نبذة عن حرف ألفا (Ⲁ ⲁ)","coptic_display":"Ⲁ ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• اسم الحرف: ألفا\n• نطق الحرف بالعربي: ألف مفتوحة (أ)\n• قواعد النطق: الحرف الأول في الأبجدية القبطية. يُنطق دائماً مثل حرف الألف المفتوحة في العربية أو (A) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲁⲗⲱⲙ\n  - القبطي المعرب (نطقها): «آلوم»\n  - المعنى بالعربية: جبنة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":669,"lesson_id":133,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲁ واستمع لنطقه","coptic_display":"Ⲁ","audio_text":"ألفا كابيتال","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":670,"lesson_id":133,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲁ واستمع لنطقه","coptic_display":"ⲁ","audio_text":"ألفا سمول","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":671,"lesson_id":133,"type":"read_select","question":"ما هو نطق الحرف Ⲁ بالعربية؟","coptic_display":"Ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4340,"challenge_id":671,"text":"ألف (فتحة)","is_correct":true,"image_url":null,"audio_url":null},{"id":4341,"challenge_id":671,"text":"ياء قصيرة (كسرة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4342,"challenge_id":671,"text":"واو قصيرة (ضمة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4343,"challenge_id":671,"text":"ياء طويلة (إي)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":672,"lesson_id":133,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲗⲱⲙ؟ (المعرب: «آلوم»)","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4344,"challenge_id":672,"text":"جبنة","is_correct":true,"image_url":null,"audio_url":null},{"id":4345,"challenge_id":672,"text":"لبن","is_correct":false,"image_url":null,"audio_url":null},{"id":4346,"challenge_id":672,"text":"خبز","is_correct":false,"image_url":null,"audio_url":null},{"id":4347,"challenge_id":672,"text":"عسل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":673,"lesson_id":133,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: جبنة (المعرب: «آلوم»)","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":"ⲁⲗⲱⲙ","tiles":["ⲁ","ⲗ","ⲱ","ⲙ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":134,"unit_id":41,"title":"حرف فيدا (Ⲃ ⲃ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":674,"lesson_id":134,"type":"text_view","question":"نبذة عن حرف فيدا (Ⲃ ⲃ)","coptic_display":"Ⲃ ⲃ","audio_text":"فيدا","audio_url":"audio_coptic/2veta.mp3","correct_word":"• اسم الحرف: فيدا\n• نطق الحرف بالعربي: ف أو ب\n• قواعد النطق: الحرف الثاني. يُنطق \"ف\" إذا جاء بعده حرف متحرك، ويُنطق \"ب\" إذا لم يأتِ بعده متحرك أو في نهاية الكلمة.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲃⲱ\n  - القبطي المعرب (نطقها): «ڤو»\n  - المعنى بالعربية: شجرة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":675,"lesson_id":134,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲃ واستمع لنطقه","coptic_display":"Ⲃ","audio_text":"فيدا كابيتال","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":676,"lesson_id":134,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲃ واستمع لنطقه","coptic_display":"ⲃ","audio_text":"فيدا سمول","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":677,"lesson_id":134,"type":"read_select","question":"ما هو نطق الحرف Ⲃ بالعربية؟","coptic_display":"Ⲃ","audio_text":"فيدا","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4348,"challenge_id":677,"text":"ب أو ڤ","is_correct":true,"image_url":null,"audio_url":null},{"id":4349,"challenge_id":677,"text":"ف فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4350,"challenge_id":677,"text":"ب فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4351,"challenge_id":677,"text":"م أو و","is_correct":false,"image_url":null,"audio_url":null}]},{"id":678,"lesson_id":134,"type":"select","question":"ما معنى الكلمة القبطية: ⲃⲱ؟ (المعرب: «ڤو»)","coptic_display":"ⲃⲱ","audio_text":"ڤو","audio_url":"assets/sounds/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4352,"challenge_id":678,"text":"شجرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4353,"challenge_id":678,"text":"نخلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4354,"challenge_id":678,"text":"غصن","is_correct":false,"image_url":null,"audio_url":null},{"id":4355,"challenge_id":678,"text":"وردة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":679,"lesson_id":134,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شجرة (المعرب: «ڤو»)","coptic_display":"ⲃⲱ","audio_text":"ڤو","audio_url":"assets/sounds/2vo.mp3","correct_word":"ⲃⲱ","tiles":["ⲃ","ⲱ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":135,"unit_id":41,"title":"حرف غاما (Ⲅ ⲅ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":680,"lesson_id":135,"type":"text_view","question":"نبذة عن حرف غاما (Ⲅ ⲅ)","coptic_display":"Ⲅ ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":"• اسم الحرف: غاما\n• نطق الحرف بالعربي: غ أو ج أو ن\n• قواعد النطق: الحرف الثالث. ينطق \"غ\" في الكلمات القبطية، و\"ن\" قبل الحلقيات، و\"ج\" معطشة قبل المتحرك للكسر في اليونانية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲅⲁⲗⲁ\n  - القبطي المعرب (نطقها): «غالا»\n  - المعنى بالعربية: لبن\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":681,"lesson_id":135,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲅ واستمع لنطقه","coptic_display":"Ⲅ","audio_text":"غاما كابيتال","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":682,"lesson_id":135,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲅ واستمع لنطقه","coptic_display":"ⲅ","audio_text":"غاما سمول","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":683,"lesson_id":135,"type":"read_select","question":"ما هو نطق الحرف Ⲅ بالعربية؟","coptic_display":"Ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4356,"challenge_id":683,"text":"غ أو ج أو ن","is_correct":true,"image_url":null,"audio_url":null},{"id":4357,"challenge_id":683,"text":"غ أو خ أو ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4358,"challenge_id":683,"text":"ج أو د أو ذ","is_correct":false,"image_url":null,"audio_url":null},{"id":4359,"challenge_id":683,"text":"ك أو ق أو غ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":684,"lesson_id":135,"type":"select","question":"ما معنى الكلمة القبطية: ⲅⲁⲗⲁ؟ (المعرب: «غالا»)","coptic_display":"ⲅⲁⲗⲁ","audio_text":"غالا","audio_url":"assets/sounds/3ghala.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4360,"challenge_id":684,"text":"زيت","is_correct":false,"image_url":null,"audio_url":null},{"id":4361,"challenge_id":684,"text":"ماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4362,"challenge_id":684,"text":"عسل","is_correct":false,"image_url":null,"audio_url":null},{"id":4363,"challenge_id":684,"text":"لبن","is_correct":true,"image_url":null,"audio_url":null}]},{"id":685,"lesson_id":135,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: لبن (المعرب: «غالا»)","coptic_display":"ⲅⲁⲗⲁ","audio_text":"غالا","audio_url":"assets/sounds/3ghala.mp3","correct_word":"ⲅⲁⲗⲁ","tiles":["ⲅ","ⲁ","ⲗ","ⲁ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":136,"unit_id":41,"title":"حرف دلدا (Ⲇ ⲇ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":686,"lesson_id":136,"type":"text_view","question":"نبذة عن حرف دلدا (Ⲇ ⲇ)","coptic_display":"Ⲇ ⲇ","audio_text":"دلدا","audio_url":"audio_coptic/4delta.mp3","correct_word":"• اسم الحرف: دلدا\n• نطق الحرف بالعربي: د أو ذ\n• قواعد النطق: الحرف الرابع. يُنطق \"د\" في أسماء الأعلام والكلمات القبطية، و\"ذ\" في الكلمات اليونانية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲇⲟⲝⲁ\n  - القبطي المعرب (نطقها): «ذوكسا»\n  - المعنى بالعربية: مجد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":687,"lesson_id":136,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲇ واستمع لنطقه","coptic_display":"Ⲇ","audio_text":"دلدا كابيتال","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":688,"lesson_id":136,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲇ واستمع لنطقه","coptic_display":"ⲇ","audio_text":"دلدا سمول","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":689,"lesson_id":136,"type":"read_select","question":"ما هو نطق الحرف Ⲇ بالعربية؟","coptic_display":"Ⲇ","audio_text":"دلدا","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4364,"challenge_id":689,"text":"د أو ذ","is_correct":true,"image_url":null,"audio_url":null},{"id":4365,"challenge_id":689,"text":"ت أو ط","is_correct":false,"image_url":null,"audio_url":null},{"id":4366,"challenge_id":689,"text":"د أو ض","is_correct":false,"image_url":null,"audio_url":null},{"id":4367,"challenge_id":689,"text":"ذ أو ز","is_correct":false,"image_url":null,"audio_url":null}]},{"id":690,"lesson_id":136,"type":"select","question":"ما معنى الكلمة القبطية: Ⲇⲟⲝⲁ؟ (المعرب: «ذوكسا»)","coptic_display":"Ⲇⲟⲝⲁ","audio_text":"ذوكسا","audio_url":"assets/sounds/4zoksa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4368,"challenge_id":690,"text":"كرامة","is_correct":false,"image_url":null,"audio_url":null},{"id":4369,"challenge_id":690,"text":"مجد","is_correct":true,"image_url":null,"audio_url":null},{"id":4370,"challenge_id":690,"text":"بركة","is_correct":false,"image_url":null,"audio_url":null},{"id":4371,"challenge_id":690,"text":"نعمة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":691,"lesson_id":136,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مجد (المعرب: «ذوكسا»)","coptic_display":"Ⲇⲟⲝⲁ","audio_text":"ذوكسا","audio_url":"assets/sounds/4zoksa.mp3","correct_word":"Ⲇⲟⲝⲁ","tiles":["Ⲇ","ⲟ","ⲝ","ⲁ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":137,"unit_id":41,"title":"حرف إي (Ⲉ ⲉ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":692,"lesson_id":137,"type":"text_view","question":"نبذة عن حرف إي (Ⲉ ⲉ)","coptic_display":"Ⲉ ⲉ","audio_text":"إي","audio_url":"audio_coptic/5ei.mp3","correct_word":"• اسم الحرف: إي\n• نطق الحرف بالعربي: إي خفيفة\n• قواعد النطق: الحرف الخامس. حرف متحرك خفيف ينطق مثل حرف (E) في الإنجليزية (فتحة مائلة للكسر).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲉ̀ⲣϣⲱ\n  - القبطي المعرب (نطقها): «إرجو»\n  - المعنى بالعربية: دجاجة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":693,"lesson_id":137,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲉ واستمع لنطقه","coptic_display":"Ⲉ","audio_text":"إي كابيتال","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":694,"lesson_id":137,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲉ واستمع لنطقه","coptic_display":"ⲉ","audio_text":"إي سمول","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":695,"lesson_id":137,"type":"read_select","question":"ما هو نطق الحرف Ⲉ بالعربية؟","coptic_display":"Ⲉ","audio_text":"إي","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4372,"challenge_id":695,"text":"إي خفيفة (كسرة قصيرة)","is_correct":true,"image_url":null,"audio_url":null},{"id":4373,"challenge_id":695,"text":"ياء طويلة ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4374,"challenge_id":695,"text":"ألف ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4375,"challenge_id":695,"text":"واو قصيرة (ضمة)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":696,"lesson_id":137,"type":"select","question":"ما معنى الكلمة القبطية: ⲉ̀ⲣϣⲱ؟ (المعرب: «إرجو»)","coptic_display":"ⲉ̀ⲣϣⲱ","audio_text":"إرجو","audio_url":"assets/sounds/5ergoh.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4376,"challenge_id":696,"text":"دجاجة","is_correct":true,"image_url":null,"audio_url":null},{"id":4377,"challenge_id":696,"text":"عصفور","is_correct":false,"image_url":null,"audio_url":null},{"id":4378,"challenge_id":696,"text":"حمامة","is_correct":false,"image_url":null,"audio_url":null},{"id":4379,"challenge_id":696,"text":"بطة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":697,"lesson_id":137,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: دجاجة (المعرب: «إرجو»)","coptic_display":"ⲉ̀ⲣϣⲱ","audio_text":"إرجو","audio_url":"assets/sounds/5ergoh.mp3","correct_word":"ⲉ̀ⲣϣⲱ","tiles":["ⲉ","̀","ⲣ","ϣ","ⲱ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":165,"unit_id":41,"title":"🔄 مراجعة الوحدة 1","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":860,"lesson_id":165,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲁ ⲁ","right":"ألفا (ألف مفتوحة (أ))"},{"left":"Ⲃ ⲃ","right":"فيدا (ف أو ب)"},{"left":"Ⲅ ⲅ","right":"غاما (غ أو ج أو ن)"},{"left":"Ⲇ ⲇ","right":"دلدا (د أو ذ)"}],"is_correct":true,"order_index":1,"options":[]},{"id":861,"lesson_id":165,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4599,"challenge_id":861,"text":"Ⲁ ⲁ (ألفا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4597,"challenge_id":861,"text":"Ⲉ ⲉ (إي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4596,"challenge_id":861,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4598,"challenge_id":861,"text":"Ⲟ ⲟ (أُو)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":862,"lesson_id":165,"type":"select","question":"ما معنى الكلمة: ⲃⲱ؟ (المعرب: «ڤو»)","coptic_display":"ⲃⲱ","audio_text":"ڤو","audio_url":"assets/sounds/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4600,"challenge_id":862,"text":"شجرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4602,"challenge_id":862,"text":"نخلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4603,"challenge_id":862,"text":"غصن","is_correct":false,"image_url":null,"audio_url":null},{"id":4601,"challenge_id":862,"text":"وردة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":863,"lesson_id":165,"type":"write","question":"رتب حروف الكلمة: دجاجة (المعرب: «إرجو»)","coptic_display":"ⲉ̀ⲣϣⲱ","audio_text":"إرجو","audio_url":"assets/sounds/5ergoh.mp3","correct_word":"ⲉ̀ⲣϣⲱ","tiles":["ⲉ","̀","ⲣ","ϣ","ⲱ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":864,"lesson_id":165,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲅ؟","coptic_display":"Ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4606,"challenge_id":864,"text":"غاما (غ أو ج أو ن)","is_correct":true,"image_url":null,"audio_url":null},{"id":4607,"challenge_id":864,"text":"غاما (غ أو خ أو ك)","is_correct":false,"image_url":null,"audio_url":null},{"id":4604,"challenge_id":864,"text":"جانجا (ج معطشة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4605,"challenge_id":864,"text":"كابا (ك)","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":42,"level_id":5,"title":"الوحدة ٢: الحروف من (Ⲋ – Ⲓ)","badge":"Ⲋ-Ⲓ","description":"تعلّم الرمز العددي سو والحروف من زاتا إلى إيوتا","order_index":2,"lessons":[{"id":138,"unit_id":42,"title":"حرف سو (رقم ٦) (Ⲋ ⲋ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":698,"lesson_id":138,"type":"text_view","question":"نبذة عن حرف سو (رقم ٦) (Ⲋ ⲋ)","coptic_display":"Ⲋ ⲋ","audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":"• اسم الحرف: سو (رقم ٦)\n• نطق الحرف بالعربي: سو (الرقم 6)\n• قواعد النطق: رمز ورقم عددي قبطي يدل على الرقم ستة (6). يوضع فوقه شرطة أفقية لتمييزه كرقم، وينطق \"سو\".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲋ̅ ⲛ̀ⲣⲱⲙⲓ\n  - القبطي المعرب (نطقها): «سوآوو إن رومي»\n  - المعنى بالعربية: 6 رجال\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":699,"lesson_id":138,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲋ واستمع لنطقه","coptic_display":"Ⲋ","audio_text":"سو (رقم ٦) كابيتال","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":700,"lesson_id":138,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲋ واستمع لنطقه","coptic_display":"ⲋ","audio_text":"سو (رقم ٦) سمول","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":701,"lesson_id":138,"type":"read_select","question":"ما هو نطق الحرف Ⲋ بالعربية؟","coptic_display":"Ⲋ","audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4380,"challenge_id":701,"text":"الرقم 6 (سو)","is_correct":true,"image_url":null,"audio_url":null},{"id":4381,"challenge_id":701,"text":"الرقم 7 (شاشف)","is_correct":false,"image_url":null,"audio_url":null},{"id":4382,"challenge_id":701,"text":"الرقم 5 (تيو)","is_correct":false,"image_url":null,"audio_url":null},{"id":4383,"challenge_id":701,"text":"الرقم 8 (شمين)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":702,"lesson_id":138,"type":"select","question":"ما معنى الكلمة القبطية: ⲋ̅ ⲛ̀ⲣⲱⲙⲓ؟ (المعرب: «سوآوو إن رومي»)","coptic_display":"ⲋ̅ ⲛ̀ⲣⲱⲙⲓ","audio_text":"سوآوو إن رومي","audio_url":"assets/sounds/6soohinrpmy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4384,"challenge_id":702,"text":"6 رجال","is_correct":true,"image_url":null,"audio_url":null},{"id":4385,"challenge_id":702,"text":"٥ رجال","is_correct":false,"image_url":null,"audio_url":null},{"id":4386,"challenge_id":702,"text":"٦ نساء","is_correct":false,"image_url":null,"audio_url":null},{"id":4387,"challenge_id":702,"text":"٧ رجال","is_correct":false,"image_url":null,"audio_url":null}]},{"id":703,"lesson_id":138,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: 6 رجال (المعرب: «سوآوو إن رومي»)","coptic_display":"ⲋ̅ ⲛ̀ⲣⲱⲙⲓ","audio_text":"سوآوو إن رومي","audio_url":"assets/sounds/6soohinrpmy.mp3","correct_word":"ⲋ̅ ⲛ̀ⲣⲱⲙⲓ","tiles":["ⲋ̅"," ","ⲛ","̀","ⲣ","ⲱ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":139,"unit_id":42,"title":"حرف زاتا (Ⲍ ⲍ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":704,"lesson_id":139,"type":"text_view","question":"نبذة عن حرف زاتا (Ⲍ ⲍ)","coptic_display":"Ⲍ ⲍ","audio_text":"زاتا","audio_url":"audio_coptic/7zeta.mp3","correct_word":"• اسم الحرف: زاتا\n• نطق الحرف بالعربي: ز\n• قواعد النطق: الحرف السابع في الأبجدية القبطية. يُنطق دائماً حرف \"ز\" مثل حرف (Z) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲍⲱⲏ\n  - القبطي المعرب (نطقها): «زوي»\n  - المعنى بالعربية: حياة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":705,"lesson_id":139,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲍ واستمع لنطقه","coptic_display":"Ⲍ","audio_text":"زاتا كابيتال","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":706,"lesson_id":139,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲍ واستمع لنطقه","coptic_display":"ⲍ","audio_text":"زاتا سمول","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":707,"lesson_id":139,"type":"read_select","question":"ما هو نطق الحرف Ⲍ بالعربية؟","coptic_display":"Ⲍ","audio_text":"زاتا","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4390,"challenge_id":707,"text":"ز","is_correct":true,"image_url":null,"audio_url":null},{"id":4391,"challenge_id":707,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4389,"challenge_id":707,"text":"ذ","is_correct":false,"image_url":null,"audio_url":null},{"id":4388,"challenge_id":707,"text":"ص","is_correct":false,"image_url":null,"audio_url":null}]},{"id":708,"lesson_id":139,"type":"select","question":"ما معنى الكلمة القبطية: Ⲍⲱⲏ؟ (المعرب: «زوي»)","coptic_display":"Ⲍⲱⲏ","audio_text":"زوي","audio_url":"assets/sounds/7zowy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4393,"challenge_id":708,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4394,"challenge_id":708,"text":"حياة","is_correct":true,"image_url":null,"audio_url":null},{"id":4395,"challenge_id":708,"text":"سلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4392,"challenge_id":708,"text":"حق","is_correct":false,"image_url":null,"audio_url":null}]},{"id":709,"lesson_id":139,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: حياة (المعرب: «زوي»)","coptic_display":"Ⲍⲱⲏ","audio_text":"زوي","audio_url":"assets/sounds/7zowy.mp3","correct_word":"Ⲍⲱⲏ","tiles":["Ⲍ","ⲱ","ⲏ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":140,"unit_id":42,"title":"حرف هيتا (Ⲏ ⲏ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":710,"lesson_id":140,"type":"text_view","question":"نبذة عن حرف هيتا (Ⲏ ⲏ)","coptic_display":"Ⲏ ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":"• اسم الحرف: هيتا\n• نطق الحرف بالعربي: ياء طويلة ممدودة\n• قواعد النطق: الحرف الثامن. حرف متحرك للكسر يُنطق ياء ممدودة وطويلة مثل (ee) في كلمة meet.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲏⲓ\n  - القبطي المعرب (نطقها): «إي»\n  - المعنى بالعربية: بيت\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":711,"lesson_id":140,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲏ واستمع لنطقه","coptic_display":"Ⲏ","audio_text":"هيتا كابيتال","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":712,"lesson_id":140,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲏ واستمع لنطقه","coptic_display":"ⲏ","audio_text":"هيتا سمول","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":713,"lesson_id":140,"type":"read_select","question":"ما هو نطق الحرف Ⲏ بالعربية؟","coptic_display":"Ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4397,"challenge_id":713,"text":"ياء طويلة ممدودة","is_correct":true,"image_url":null,"audio_url":null},{"id":4398,"challenge_id":713,"text":"ياء قصيرة (كسرة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4399,"challenge_id":713,"text":"إي خفيفة","is_correct":false,"image_url":null,"audio_url":null},{"id":4396,"challenge_id":713,"text":"واو طويلة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":714,"lesson_id":140,"type":"select","question":"ما معنى الكلمة القبطية: Ⲏⲓ؟ (المعرب: «إي»)","coptic_display":"Ⲏⲓ","audio_text":"إي","audio_url":"assets/sounds/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4402,"challenge_id":714,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4400,"challenge_id":714,"text":"بيت","is_correct":true,"image_url":null,"audio_url":null},{"id":4401,"challenge_id":714,"text":"مدرسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4403,"challenge_id":714,"text":"هيكل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":715,"lesson_id":140,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: بيت (المعرب: «إي»)","coptic_display":"Ⲏⲓ","audio_text":"إي","audio_url":"assets/sounds/8ei.mp3","correct_word":"Ⲏⲓ","tiles":["Ⲏ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":141,"unit_id":42,"title":"حرف ثيتا (Ⲑ ⲑ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":716,"lesson_id":141,"type":"text_view","question":"نبذة عن حرف ثيتا (Ⲑ ⲑ)","coptic_display":"Ⲑ ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/9seta.mp3","correct_word":"• اسم الحرف: ثيتا\n• نطق الحرف بالعربي: ث أو ت\n• قواعد النطق: الحرف التاسع. يُنطق \"ث\" دائماً، إلا إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) فيُنطق \"ت\".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲑⲁⲙⲓⲟ\n  - القبطي المعرب (نطقها): «ثاميو»\n  - المعنى بالعربية: يخلق\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":717,"lesson_id":141,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲑ واستمع لنطقه","coptic_display":"Ⲑ","audio_text":"ثيتا كابيتال","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":718,"lesson_id":141,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲑ واستمع لنطقه","coptic_display":"ⲑ","audio_text":"ثيتا سمول","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":719,"lesson_id":141,"type":"read_select","question":"ما هو نطق الحرف Ⲑ بالعربية؟","coptic_display":"Ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4404,"challenge_id":719,"text":"ث أو ت","is_correct":true,"image_url":null,"audio_url":null},{"id":4406,"challenge_id":719,"text":"ت أو ط","is_correct":false,"image_url":null,"audio_url":null},{"id":4405,"challenge_id":719,"text":"ث أو س","is_correct":false,"image_url":null,"audio_url":null},{"id":4407,"challenge_id":719,"text":"د أو ذ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":720,"lesson_id":141,"type":"select","question":"ما معنى الكلمة القبطية: Ⲑⲁⲙⲓⲟ؟ (المعرب: «ثاميو»)","coptic_display":"Ⲑⲁⲙⲓⲟ","audio_text":"ثاميو","audio_url":"assets/sounds/9samyo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4409,"challenge_id":720,"text":"يبني","is_correct":false,"image_url":null,"audio_url":null},{"id":4410,"challenge_id":720,"text":"يعمل","is_correct":false,"image_url":null,"audio_url":null},{"id":4411,"challenge_id":720,"text":"يخلق","is_correct":true,"image_url":null,"audio_url":null},{"id":4408,"challenge_id":720,"text":"يصنع","is_correct":false,"image_url":null,"audio_url":null}]},{"id":721,"lesson_id":141,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: يخلق (المعرب: «ثاميو»)","coptic_display":"Ⲑⲁⲙⲓⲟ","audio_text":"ثاميو","audio_url":"assets/sounds/9samyo.mp3","correct_word":"Ⲑⲁⲙⲓⲟ","tiles":["Ⲑ","ⲁ","ⲙ","ⲓ","ⲟ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":142,"unit_id":42,"title":"حرف إيوتا (Ⲓ ⲓ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":722,"lesson_id":142,"type":"text_view","question":"نبذة عن حرف إيوتا (Ⲓ ⲓ)","coptic_display":"Ⲓ ⲓ","audio_text":"إيوتا","audio_url":"audio_coptic/10yota.mp3","correct_word":"• اسم الحرف: إيوتا\n• نطق الحرف بالعربي: ياء قصيرة\n• قواعد النطق: الحرف العاشر. حرف متحرك يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف (I) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲓⲁⲗ\n  - القبطي المعرب (نطقها): «إيال»\n  - المعنى بالعربية: مراية\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":723,"lesson_id":142,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲓ واستمع لنطقه","coptic_display":"Ⲓ","audio_text":"إيوتا كابيتال","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":724,"lesson_id":142,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲓ واستمع لنطقه","coptic_display":"ⲓ","audio_text":"إيوتا سمول","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":725,"lesson_id":142,"type":"read_select","question":"ما هو نطق الحرف Ⲓ بالعربية؟","coptic_display":"Ⲓ","audio_text":"إيوتا","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4413,"challenge_id":725,"text":"ياء قصيرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4414,"challenge_id":725,"text":"ياء طويلة ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4415,"challenge_id":725,"text":"إي خفيفة","is_correct":false,"image_url":null,"audio_url":null},{"id":4412,"challenge_id":725,"text":"ألف لينة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":726,"lesson_id":142,"type":"select","question":"ما معنى الكلمة القبطية: ⲓⲁⲗ؟ (المعرب: «إيال»)","coptic_display":"ⲓⲁⲗ","audio_text":"إيال","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4416,"challenge_id":726,"text":"مراية","is_correct":true,"image_url":null,"audio_url":null},{"id":4418,"challenge_id":726,"text":"نافذة","is_correct":false,"image_url":null,"audio_url":null},{"id":4417,"challenge_id":726,"text":"لوحة","is_correct":false,"image_url":null,"audio_url":null},{"id":4419,"challenge_id":726,"text":"صورة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":727,"lesson_id":142,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مراية (المعرب: «إيال»)","coptic_display":"ⲓⲁⲗ","audio_text":"إيال","audio_url":"audio_coptic/10yota.mp3","correct_word":"ⲓⲁⲗ","tiles":["ⲓ","ⲁ","ⲗ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":166,"unit_id":42,"title":"🔄 مراجعة الوحدة 2","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":865,"lesson_id":166,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲋ ⲋ","right":"سو (رقم ٦) (سو (الرقم 6))"},{"left":"Ⲍ ⲍ","right":"زاتا (ز)"},{"left":"Ⲏ ⲏ","right":"هيتا (ياء طويلة ممدودة)"},{"left":"Ⲑ ⲑ","right":"ثيتا (ث أو ت)"}],"is_correct":true,"order_index":1,"options":[]},{"id":866,"lesson_id":166,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4610,"challenge_id":866,"text":"Ⲋ ⲋ (سو (رقم ٦))","is_correct":true,"image_url":null,"audio_url":null},{"id":4608,"challenge_id":866,"text":"Ⲍ ⲍ (زاتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4609,"challenge_id":866,"text":"Ⲥ ⲥ (سيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4611,"challenge_id":866,"text":"Ϣ ϣ (شاي)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":867,"lesson_id":166,"type":"select","question":"ما معنى الكلمة: Ⲍⲱⲏ؟ (المعرب: «زوي»)","coptic_display":"Ⲍⲱⲏ","audio_text":"زوي","audio_url":"assets/sounds/7zowy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4613,"challenge_id":867,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4614,"challenge_id":867,"text":"حق","is_correct":false,"image_url":null,"audio_url":null},{"id":4615,"challenge_id":867,"text":"سلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4612,"challenge_id":867,"text":"حياة","is_correct":true,"image_url":null,"audio_url":null}]},{"id":868,"lesson_id":166,"type":"write","question":"رتب حروف الكلمة: مراية (المعرب: «إيال»)","coptic_display":"ⲓⲁⲗ","audio_text":"إيال","audio_url":"audio_coptic/10yota.mp3","correct_word":"ⲓⲁⲗ","tiles":["ⲓ","ⲁ","ⲗ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":869,"lesson_id":166,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲏ؟","coptic_display":"Ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4616,"challenge_id":869,"text":"هيتا (ياء طويلة ممدودة)","is_correct":true,"image_url":null,"audio_url":null},{"id":4617,"challenge_id":869,"text":"إيوتا (ياء قصيرة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4619,"challenge_id":869,"text":"إي (إي خفيفة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4618,"challenge_id":869,"text":"أوميجا (واو طويلة)","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":43,"level_id":5,"title":"الوحدة ٣: الحروف من (Ⲕ – Ⲝ)","badge":"Ⲕ-Ⲝ","description":"تعلّم الحروف من كابا إلى كسي مع كلمات كنسية شهيرة","order_index":3,"lessons":[{"id":143,"unit_id":43,"title":"حرف كابا (Ⲕ ⲕ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":728,"lesson_id":143,"type":"text_view","question":"نبذة عن حرف كابا (Ⲕ ⲕ)","coptic_display":"Ⲕ ⲕ","audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":"• اسم الحرف: كابا\n• نطق الحرف بالعربي: ك\n• قواعد النطق: الحرف الحادي عشر في الأبجدية القبطية. يُنطق \"ك\" دائماً في جميع المواضع.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲕⲁϣ\n  - القبطي المعرب (نطقها): «كاش»\n  - المعنى بالعربية: قلم\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":729,"lesson_id":143,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲕ واستمع لنطقه","coptic_display":"Ⲕ","audio_text":"كابا كابيتال","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":730,"lesson_id":143,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲕ واستمع لنطقه","coptic_display":"ⲕ","audio_text":"كابا سمول","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":731,"lesson_id":143,"type":"read_select","question":"ما هو نطق الحرف Ⲕ بالعربية؟","coptic_display":"Ⲕ","audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4420,"challenge_id":731,"text":"ك","is_correct":true,"image_url":null,"audio_url":null},{"id":4422,"challenge_id":731,"text":"ق","is_correct":false,"image_url":null,"audio_url":null},{"id":4421,"challenge_id":731,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4423,"challenge_id":731,"text":"غ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":732,"lesson_id":143,"type":"select","question":"ما معنى الكلمة القبطية: ⲕⲁϣ؟ (المعرب: «كاش»)","coptic_display":"ⲕⲁϣ","audio_text":"كاش","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4425,"challenge_id":732,"text":"قلم","is_correct":true,"image_url":null,"audio_url":null},{"id":4426,"challenge_id":732,"text":"ورقة","is_correct":false,"image_url":null,"audio_url":null},{"id":4424,"challenge_id":732,"text":"كتاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4427,"challenge_id":732,"text":"مسطرة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":733,"lesson_id":143,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قلم (المعرب: «كاش»)","coptic_display":"ⲕⲁϣ","audio_text":"كاش","audio_url":"audio_coptic/11kapa.mp3","correct_word":"ⲕⲁϣ","tiles":["ⲕ","ⲁ","ϣ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":144,"unit_id":43,"title":"حرف لابدا (Ⲗ ⲗ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":734,"lesson_id":144,"type":"text_view","question":"نبذة عن حرف لابدا (Ⲗ ⲗ)","coptic_display":"Ⲗ ⲗ","audio_text":"لابدا","audio_url":"audio_coptic/12lavla.mp3","correct_word":"• اسم الحرف: لابدا\n• نطق الحرف بالعربي: ل\n• قواعد النطق: الحرف الثاني عشر. يُنطق \"ل\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲗⲁⲃⲟ\n  - القبطي المعرب (نطقها): «لاڤو»\n  - المعنى بالعربية: أسد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":735,"lesson_id":144,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲗ واستمع لنطقه","coptic_display":"Ⲗ","audio_text":"لابدا كابيتال","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":736,"lesson_id":144,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲗ واستمع لنطقه","coptic_display":"ⲗ","audio_text":"لابدا سمول","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":737,"lesson_id":144,"type":"read_select","question":"ما هو نطق الحرف Ⲗ بالعربية؟","coptic_display":"Ⲗ","audio_text":"لابدا","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4429,"challenge_id":737,"text":"ل","is_correct":true,"image_url":null,"audio_url":null},{"id":4430,"challenge_id":737,"text":"ر","is_correct":false,"image_url":null,"audio_url":null},{"id":4428,"challenge_id":737,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4431,"challenge_id":737,"text":"م","is_correct":false,"image_url":null,"audio_url":null}]},{"id":738,"lesson_id":144,"type":"select","question":"ما معنى الكلمة القبطية: ⲗⲁⲃⲟ؟ (المعرب: «لاڤو»)","coptic_display":"ⲗⲁⲃⲟ","audio_text":"لاڤو","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4435,"challenge_id":738,"text":"حصان","is_correct":false,"image_url":null,"audio_url":null},{"id":4434,"challenge_id":738,"text":"نمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4433,"challenge_id":738,"text":"ذئب","is_correct":false,"image_url":null,"audio_url":null},{"id":4432,"challenge_id":738,"text":"أسد","is_correct":true,"image_url":null,"audio_url":null}]},{"id":739,"lesson_id":144,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أسد (المعرب: «لاڤو»)","coptic_display":"ⲗⲁⲃⲟ","audio_text":"لاڤو","audio_url":"audio_coptic/12lavla.mp3","correct_word":"ⲗⲁⲃⲟ","tiles":["ⲗ","ⲁ","ⲃ","ⲟ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":145,"unit_id":43,"title":"حرف مي (Ⲙ ⲙ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":740,"lesson_id":145,"type":"text_view","question":"نبذة عن حرف مي (Ⲙ ⲙ)","coptic_display":"Ⲙ ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":"• اسم الحرف: مي\n• نطق الحرف بالعربي: م\n• قواعد النطق: الحرف الثالث عشر. يُنطق حرف \"م\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲙⲁⲛϩⲟⲛ\n  - القبطي المعرب (نطقها): «مانهون»\n  - المعنى بالعربية: برتقال\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":741,"lesson_id":145,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲙ واستمع لنطقه","coptic_display":"Ⲙ","audio_text":"مي كابيتال","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":742,"lesson_id":145,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲙ واستمع لنطقه","coptic_display":"ⲙ","audio_text":"مي سمول","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":743,"lesson_id":145,"type":"read_select","question":"ما هو نطق الحرف Ⲙ بالعربية؟","coptic_display":"Ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4436,"challenge_id":743,"text":"م","is_correct":true,"image_url":null,"audio_url":null},{"id":4437,"challenge_id":743,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4438,"challenge_id":743,"text":"ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4439,"challenge_id":743,"text":"و","is_correct":false,"image_url":null,"audio_url":null}]},{"id":744,"lesson_id":145,"type":"select","question":"ما معنى الكلمة القبطية: ⲙⲁⲛϩⲟⲛ؟ (المعرب: «مانهون»)","coptic_display":"ⲙⲁⲛϩⲟⲛ","audio_text":"مانهون","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4442,"challenge_id":744,"text":"برتقال","is_correct":true,"image_url":null,"audio_url":null},{"id":4443,"challenge_id":744,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4440,"challenge_id":744,"text":"بطيخ","is_correct":false,"image_url":null,"audio_url":null},{"id":4441,"challenge_id":744,"text":"تفاح","is_correct":false,"image_url":null,"audio_url":null}]},{"id":745,"lesson_id":145,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: برتقال (المعرب: «مانهون»)","coptic_display":"ⲙⲁⲛϩⲟⲛ","audio_text":"مانهون","audio_url":"audio_coptic/13mi.mp3","correct_word":"ⲙⲁⲛϩⲟⲛ","tiles":["ⲙ","ⲁ","ⲛ","ϩ","ⲟ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":146,"unit_id":43,"title":"حرف ني (Ⲛ ⲛ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":746,"lesson_id":146,"type":"text_view","question":"نبذة عن حرف ني (Ⲛ ⲛ)","coptic_display":"Ⲛ ⲛ","audio_text":"ني","audio_url":"audio_coptic/14ni.mp3","correct_word":"• اسم الحرف: ني\n• نطق الحرف بالعربي: ن\n• قواعد النطق: الحرف الرابع عشر. يُنطق حرف \"ن\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲉⲛ̀ⲕⲟⲧ\n  - القبطي المعرب (نطقها): «إنكوت»\n  - المعنى بالعربية: ينام\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":747,"lesson_id":146,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲛ واستمع لنطقه","coptic_display":"Ⲛ","audio_text":"ني كابيتال","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":748,"lesson_id":146,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲛ واستمع لنطقه","coptic_display":"ⲛ","audio_text":"ني سمول","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":749,"lesson_id":146,"type":"read_select","question":"ما هو نطق الحرف Ⲛ بالعربية؟","coptic_display":"Ⲛ","audio_text":"ني","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4447,"challenge_id":749,"text":"ن","is_correct":true,"image_url":null,"audio_url":null},{"id":4445,"challenge_id":749,"text":"م","is_correct":false,"image_url":null,"audio_url":null},{"id":4446,"challenge_id":749,"text":"ل","is_correct":false,"image_url":null,"audio_url":null},{"id":4444,"challenge_id":749,"text":"ر","is_correct":false,"image_url":null,"audio_url":null}]},{"id":750,"lesson_id":146,"type":"select","question":"ما معنى الكلمة القبطية: ⲉⲛ̀ⲕⲟⲧ؟ (المعرب: «إنكوت»)","coptic_display":"ⲉⲛ̀ⲕⲟⲧ","audio_text":"إنكوت","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4449,"challenge_id":750,"text":"يأكل","is_correct":false,"image_url":null,"audio_url":null},{"id":4451,"challenge_id":750,"text":"يجلس","is_correct":false,"image_url":null,"audio_url":null},{"id":4450,"challenge_id":750,"text":"يستيقظ","is_correct":false,"image_url":null,"audio_url":null},{"id":4448,"challenge_id":750,"text":"ينام","is_correct":true,"image_url":null,"audio_url":null}]},{"id":751,"lesson_id":146,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ينام (المعرب: «إنكوت»)","coptic_display":"ⲉⲛ̀ⲕⲟⲧ","audio_text":"إنكوت","audio_url":"audio_coptic/14ni.mp3","correct_word":"ⲉⲛ̀ⲕⲟⲧ","tiles":["ⲉ","ⲛ","̀","ⲕ","ⲟ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":147,"unit_id":43,"title":"حرف كسي (Ⲝ ⲝ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":752,"lesson_id":147,"type":"text_view","question":"نبذة عن حرف كسي (Ⲝ ⲝ)","coptic_display":"Ⲝ ⲝ","audio_text":"كسي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"• اسم الحرف: كسي\n• نطق الحرف بالعربي: كـ + س\n• قواعد النطق: الحرف الخامس عشر. حرف مركب يُنطق كاف وسين معاً (كـ + س = X) في صوت واحد.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲝⲟⲩⲏ\n  - القبطي المعرب (نطقها): «إكسومي»\n  - المعنى بالعربية: مسطرة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":753,"lesson_id":147,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲝ واستمع لنطقه","coptic_display":"Ⲝ","audio_text":"كسي كابيتال","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":754,"lesson_id":147,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲝ واستمع لنطقه","coptic_display":"ⲝ","audio_text":"كسي سمول","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":755,"lesson_id":147,"type":"read_select","question":"ما هو نطق الحرف Ⲝ بالعربية؟","coptic_display":"Ⲝ","audio_text":"كسي","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4453,"challenge_id":755,"text":"كـ + س (إكس)","is_correct":true,"image_url":null,"audio_url":null},{"id":4455,"challenge_id":755,"text":"بـ + س (إبسي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4454,"challenge_id":755,"text":"ت + س","is_correct":false,"image_url":null,"audio_url":null},{"id":4452,"challenge_id":755,"text":"ك + ش","is_correct":false,"image_url":null,"audio_url":null}]},{"id":756,"lesson_id":147,"type":"select","question":"ما معنى الكلمة القبطية: ⲝⲟⲩⲏ؟ (المعرب: «إكسومي»)","coptic_display":"ⲝⲟⲩⲏ","audio_text":"إكسومي","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4459,"challenge_id":756,"text":"مسطرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4456,"challenge_id":756,"text":"ممحاة","is_correct":false,"image_url":null,"audio_url":null},{"id":4457,"challenge_id":756,"text":"كتاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4458,"challenge_id":756,"text":"قلم","is_correct":false,"image_url":null,"audio_url":null}]},{"id":757,"lesson_id":147,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مسطرة (المعرب: «إكسومي»)","coptic_display":"ⲝⲟⲩⲏ","audio_text":"إكسومي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"ⲝⲟⲩⲏ","tiles":["ⲝ","ⲟ","ⲩ","ⲏ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":167,"unit_id":43,"title":"🔄 مراجعة الوحدة 3","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":870,"lesson_id":167,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"Ⲗ ⲗ","right":"لابدا (ل)"},{"left":"Ⲙ ⲙ","right":"مي (م)"},{"left":"Ⲛ ⲛ","right":"ني (ن)"}],"is_correct":true,"order_index":1,"options":[]},{"id":871,"lesson_id":167,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4622,"challenge_id":871,"text":"Ⲕ ⲕ (كابا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4623,"challenge_id":871,"text":"Ⲭ ⲭ (خي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4620,"challenge_id":871,"text":"Ⲅ ⲅ (غاما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4621,"challenge_id":871,"text":"Ⲧ ⲧ (تاو)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":872,"lesson_id":167,"type":"select","question":"ما معنى الكلمة: ⲗⲁⲃⲟ؟ (المعرب: «لاڤو»)","coptic_display":"ⲗⲁⲃⲟ","audio_text":"لاڤو","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4626,"challenge_id":872,"text":"أسد","is_correct":true,"image_url":null,"audio_url":null},{"id":4627,"challenge_id":872,"text":"نمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4624,"challenge_id":872,"text":"حصان","is_correct":false,"image_url":null,"audio_url":null},{"id":4625,"challenge_id":872,"text":"ذئب","is_correct":false,"image_url":null,"audio_url":null}]},{"id":873,"lesson_id":167,"type":"write","question":"رتب حروف الكلمة: مسطرة (المعرب: «إكسومي»)","coptic_display":"ⲝⲟⲩⲏ","audio_text":"إكسومي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"ⲝⲟⲩⲏ","tiles":["ⲝ","ⲟ","ⲩ","ⲏ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":874,"lesson_id":167,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲙ؟","coptic_display":"Ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4629,"challenge_id":874,"text":"مي (م)","is_correct":true,"image_url":null,"audio_url":null},{"id":4630,"challenge_id":874,"text":"ني (ن)","is_correct":false,"image_url":null,"audio_url":null},{"id":4631,"challenge_id":874,"text":"لابدا (ل)","is_correct":false,"image_url":null,"audio_url":null},{"id":4628,"challenge_id":874,"text":"رو (ر)","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":44,"level_id":5,"title":"الوحدة ٤: الحروف من (Ⲟ – Ⲧ)","badge":"Ⲟ-Ⲧ","description":"تعلّم الحروف من أُو قصيرة إلى تاف","order_index":4,"lessons":[{"id":148,"unit_id":44,"title":"حرف أُو (قصيرة) (Ⲟ ⲟ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":758,"lesson_id":148,"type":"text_view","question":"نبذة عن حرف أُو (قصيرة) (Ⲟ ⲟ)","coptic_display":"Ⲟ ⲟ","audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":"• اسم الحرف: أُو (قصيرة)\n• نطق الحرف بالعربي: واو قصيرة مضمومة\n• قواعد النطق: الحرف السادس عشر. حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲟⲩⲱⲙ\n  - القبطي المعرب (نطقها): «أوؤم»\n  - المعنى بالعربية: يأكل\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":759,"lesson_id":148,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲟ واستمع لنطقه","coptic_display":"Ⲟ","audio_text":"أُو (قصيرة) كابيتال","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":760,"lesson_id":148,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲟ واستمع لنطقه","coptic_display":"ⲟ","audio_text":"أُو (قصيرة) سمول","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":761,"lesson_id":148,"type":"read_select","question":"ما هو نطق الحرف Ⲟ بالعربية؟","coptic_display":"Ⲟ","audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4463,"challenge_id":761,"text":"واو قصيرة مضمومة","is_correct":true,"image_url":null,"audio_url":null},{"id":4460,"challenge_id":761,"text":"واو طويلة ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4461,"challenge_id":761,"text":"ألف مفخمة","is_correct":false,"image_url":null,"audio_url":null},{"id":4462,"challenge_id":761,"text":"واو لينة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":762,"lesson_id":148,"type":"select","question":"ما معنى الكلمة القبطية: ⲟⲩⲱⲙ؟ (المعرب: «أوؤم»)","coptic_display":"ⲟⲩⲱⲙ","audio_text":"أوؤم","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4465,"challenge_id":762,"text":"يشرب","is_correct":false,"image_url":null,"audio_url":null},{"id":4467,"challenge_id":762,"text":"ينام","is_correct":false,"image_url":null,"audio_url":null},{"id":4466,"challenge_id":762,"text":"يأكل","is_correct":true,"image_url":null,"audio_url":null},{"id":4464,"challenge_id":762,"text":"يمشي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":763,"lesson_id":148,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: يأكل (المعرب: «أوؤم»)","coptic_display":"ⲟⲩⲱⲙ","audio_text":"أوؤم","audio_url":"audio_coptic/16oo.mp3","correct_word":"ⲟⲩⲱⲙ","tiles":["ⲟ","ⲩ","ⲱ","ⲙ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":149,"unit_id":44,"title":"حرف بي (Ⲡ ⲡ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":764,"lesson_id":149,"type":"text_view","question":"نبذة عن حرف بي (Ⲡ ⲡ)","coptic_display":"Ⲡ ⲡ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":"• اسم الحرف: بي\n• نطق الحرف بالعربي: ب ثقيلة مشددة\n• قواعد النطق: الحرف السابع عشر. يُنطق \"ب\" شديدة مشددة مثل حرف (P) في اللغة الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲡⲓⲱⲧ\n  - القبطي المعرب (نطقها): «بايوت»\n  - المعنى بالعربية: أبي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":765,"lesson_id":149,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲡ واستمع لنطقه","coptic_display":"Ⲡ","audio_text":"بي كابيتال","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":766,"lesson_id":149,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲡ واستمع لنطقه","coptic_display":"ⲡ","audio_text":"بي سمول","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":767,"lesson_id":149,"type":"read_select","question":"ما هو نطق الحرف Ⲡ بالعربية؟","coptic_display":"Ⲡ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4469,"challenge_id":767,"text":"ب ثقيلة (P)","is_correct":true,"image_url":null,"audio_url":null},{"id":4471,"challenge_id":767,"text":"ب أو ڤ (فيدا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4470,"challenge_id":767,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4468,"challenge_id":767,"text":"م","is_correct":false,"image_url":null,"audio_url":null}]},{"id":768,"lesson_id":149,"type":"select","question":"ما معنى الكلمة القبطية: ⲡⲓⲱⲧ؟ (المعرب: «بايوت»)","coptic_display":"ⲡⲓⲱⲧ","audio_text":"بايوت","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4475,"challenge_id":768,"text":"أبي","is_correct":true,"image_url":null,"audio_url":null},{"id":4472,"challenge_id":768,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":4473,"challenge_id":768,"text":"أخي","is_correct":false,"image_url":null,"audio_url":null},{"id":4474,"challenge_id":768,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":769,"lesson_id":149,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أبي (المعرب: «بايوت»)","coptic_display":"ⲡⲓⲱⲧ","audio_text":"بايوت","audio_url":"audio_coptic/17pee.mp3","correct_word":"ⲡⲓⲱⲧ","tiles":["ⲡ","ⲓ","ⲱ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":150,"unit_id":44,"title":"حرف رو (Ⲣ ⲣ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":770,"lesson_id":150,"type":"text_view","question":"نبذة عن حرف رو (Ⲣ ⲣ)","coptic_display":"Ⲣ ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":"• اسم الحرف: رو\n• نطق الحرف بالعربي: ر\n• قواعد النطق: الحرف الثامن عشر. يُنطق حرف \"ر\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲣⲏ\n  - القبطي المعرب (نطقها): «ري»\n  - المعنى بالعربية: شمس\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":771,"lesson_id":150,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲣ واستمع لنطقه","coptic_display":"Ⲣ","audio_text":"رو كابيتال","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":772,"lesson_id":150,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲣ واستمع لنطقه","coptic_display":"ⲣ","audio_text":"رو سمول","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":773,"lesson_id":150,"type":"read_select","question":"ما هو نطق الحرف Ⲣ بالعربية؟","coptic_display":"Ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4479,"challenge_id":773,"text":"ر","is_correct":true,"image_url":null,"audio_url":null},{"id":4476,"challenge_id":773,"text":"ل","is_correct":false,"image_url":null,"audio_url":null},{"id":4477,"challenge_id":773,"text":"د","is_correct":false,"image_url":null,"audio_url":null},{"id":4478,"challenge_id":773,"text":"ز","is_correct":false,"image_url":null,"audio_url":null}]},{"id":774,"lesson_id":150,"type":"select","question":"ما معنى الكلمة القبطية: ⲣⲏ؟ (المعرب: «ري»)","coptic_display":"ⲣⲏ","audio_text":"ري","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4481,"challenge_id":774,"text":"قمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4483,"challenge_id":774,"text":"نجم","is_correct":false,"image_url":null,"audio_url":null},{"id":4482,"challenge_id":774,"text":"شمس","is_correct":true,"image_url":null,"audio_url":null},{"id":4480,"challenge_id":774,"text":"سماء","is_correct":false,"image_url":null,"audio_url":null}]},{"id":775,"lesson_id":150,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شمس (المعرب: «ري»)","coptic_display":"ⲣⲏ","audio_text":"ري","audio_url":"audio_coptic/18roo.mp3","correct_word":"ⲣⲏ","tiles":["ⲣ","ⲏ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":151,"unit_id":44,"title":"حرف سيما (Ⲥ ⲥ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":776,"lesson_id":151,"type":"text_view","question":"نبذة عن حرف سيما (Ⲥ ⲥ)","coptic_display":"Ⲥ ⲥ","audio_text":"سيما","audio_url":"audio_coptic/19sema.mp3","correct_word":"• اسم الحرف: سيما\n• نطق الحرف بالعربي: س\n• قواعد النطق: الحرف التاسع عشر. يُنطق حرف \"س\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲡⲁⲥⲟⲛ\n  - القبطي المعرب (نطقها): «باصون»\n  - المعنى بالعربية: أخي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":777,"lesson_id":151,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲥ واستمع لنطقه","coptic_display":"Ⲥ","audio_text":"سيما كابيتال","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":778,"lesson_id":151,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲥ واستمع لنطقه","coptic_display":"ⲥ","audio_text":"سيما سمول","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":779,"lesson_id":151,"type":"read_select","question":"ما هو نطق الحرف Ⲥ بالعربية؟","coptic_display":"Ⲥ","audio_text":"سيما","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4485,"challenge_id":779,"text":"س","is_correct":true,"image_url":null,"audio_url":null},{"id":4487,"challenge_id":779,"text":"ص","is_correct":false,"image_url":null,"audio_url":null},{"id":4486,"challenge_id":779,"text":"ز","is_correct":false,"image_url":null,"audio_url":null},{"id":4484,"challenge_id":779,"text":"ش","is_correct":false,"image_url":null,"audio_url":null}]},{"id":780,"lesson_id":151,"type":"select","question":"ما معنى الكلمة القبطية: ⲡⲁⲥⲟⲛ؟ (المعرب: «باصون»)","coptic_display":"ⲡⲁⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4491,"challenge_id":780,"text":"أخي","is_correct":true,"image_url":null,"audio_url":null},{"id":4488,"challenge_id":780,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null},{"id":4489,"challenge_id":780,"text":"صديقي","is_correct":false,"image_url":null,"audio_url":null},{"id":4490,"challenge_id":780,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":781,"lesson_id":151,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أخي (المعرب: «باصون»)","coptic_display":"ⲡⲁⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/19sema.mp3","correct_word":"ⲡⲁⲥⲟⲛ","tiles":["ⲡ","ⲁ","ⲥ","ⲟ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":152,"unit_id":44,"title":"حرف تاف (Ⲧ ⲧ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":782,"lesson_id":152,"type":"text_view","question":"نبذة عن حرف تاف (Ⲧ ⲧ)","coptic_display":"Ⲧ ⲧ","audio_text":"تاف","audio_url":"audio_coptic/20tav.mp3","correct_word":"• اسم الحرف: تاف\n• نطق الحرف بالعربي: ت\n• قواعد النطق: الحرف العشرون في الأبجدية القبطية. يُنطق حرف \"ت\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲧⲁⲙⲁⲩ\n  - القبطي المعرب (نطقها): «تاماف»\n  - المعنى بالعربية: أمي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":783,"lesson_id":152,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲧ واستمع لنطقه","coptic_display":"Ⲧ","audio_text":"تاف كابيتال","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":784,"lesson_id":152,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲧ واستمع لنطقه","coptic_display":"ⲧ","audio_text":"تاف سمول","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":785,"lesson_id":152,"type":"read_select","question":"ما هو نطق الحرف Ⲧ بالعربية؟","coptic_display":"Ⲧ","audio_text":"تاف","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4495,"challenge_id":785,"text":"ت","is_correct":true,"image_url":null,"audio_url":null},{"id":4492,"challenge_id":785,"text":"ط","is_correct":false,"image_url":null,"audio_url":null},{"id":4493,"challenge_id":785,"text":"د","is_correct":false,"image_url":null,"audio_url":null},{"id":4494,"challenge_id":785,"text":"ث","is_correct":false,"image_url":null,"audio_url":null}]},{"id":786,"lesson_id":152,"type":"select","question":"ما معنى الكلمة القبطية: ⲧⲁⲙⲁⲩ؟ (المعرب: «تاماف»)","coptic_display":"ⲧⲁⲙⲁⲩ","audio_text":"تاماف","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4497,"challenge_id":786,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":4499,"challenge_id":786,"text":"جدتي","is_correct":false,"image_url":null,"audio_url":null},{"id":4498,"challenge_id":786,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null},{"id":4496,"challenge_id":786,"text":"أمي","is_correct":true,"image_url":null,"audio_url":null}]},{"id":787,"lesson_id":152,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أمي (المعرب: «تاماف»)","coptic_display":"ⲧⲁⲙⲁⲩ","audio_text":"تاماف","audio_url":"audio_coptic/20tav.mp3","correct_word":"ⲧⲁⲙⲁⲩ","tiles":["ⲧ","ⲁ","ⲙ","ⲁ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":168,"unit_id":44,"title":"🔄 مراجعة الوحدة 4","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":875,"lesson_id":168,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲟ ⲟ","right":"أُو (قصيرة) (واو قصيرة مضمومة)"},{"left":"Ⲡ ⲡ","right":"بي (ب ثقيلة مشددة)"},{"left":"Ⲣ ⲣ","right":"رو (ر)"},{"left":"Ⲥ ⲥ","right":"سيما (س)"}],"is_correct":true,"order_index":1,"options":[]},{"id":876,"lesson_id":168,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4632,"challenge_id":876,"text":"Ⲟ ⲟ (أُو (قصيرة))","is_correct":true,"image_url":null,"audio_url":null},{"id":4635,"challenge_id":876,"text":"Ⲱ ⲱ (أوميجا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4633,"challenge_id":876,"text":"Ⲉ ⲉ (إي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4634,"challenge_id":876,"text":"Ⲁ ⲁ (ألفا)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":877,"lesson_id":168,"type":"select","question":"ما معنى الكلمة: ⲡⲓⲱⲧ؟ (المعرب: «بايوت»)","coptic_display":"ⲡⲓⲱⲧ","audio_text":"بايوت","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4639,"challenge_id":877,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":4637,"challenge_id":877,"text":"أبي","is_correct":true,"image_url":null,"audio_url":null},{"id":4636,"challenge_id":877,"text":"أخي","is_correct":false,"image_url":null,"audio_url":null},{"id":4638,"challenge_id":877,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":878,"lesson_id":168,"type":"write","question":"رتب حروف الكلمة: أمي (المعرب: «تاماف»)","coptic_display":"ⲧⲁⲙⲁⲩ","audio_text":"تاماف","audio_url":"audio_coptic/20tav.mp3","correct_word":"ⲧⲁⲙⲁⲩ","tiles":["ⲧ","ⲁ","ⲙ","ⲁ","ⲩ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":879,"lesson_id":168,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲣ؟","coptic_display":"Ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4642,"challenge_id":879,"text":"رو (ر)","is_correct":true,"image_url":null,"audio_url":null},{"id":4643,"challenge_id":879,"text":"لابدا (ل)","is_correct":false,"image_url":null,"audio_url":null},{"id":4640,"challenge_id":879,"text":"دلدا (د أو ذ)","is_correct":false,"image_url":null,"audio_url":null},{"id":4641,"challenge_id":879,"text":"زاتا (ز)","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":45,"level_id":5,"title":"الوحدة ٥: الحروف من (Ⲩ – Ⲱ)","badge":"Ⲩ-Ⲱ","description":"تعلّم الحروف من إبسيلون إلى أوميغا خاتمة الحروف اليونانية","order_index":5,"lessons":[{"id":153,"unit_id":45,"title":"حرف إبسيلون (Ⲩ ⲩ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":788,"lesson_id":153,"type":"text_view","question":"نبذة عن حرف إبسيلون (Ⲩ ⲩ)","coptic_display":"Ⲩ ⲩ","audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":"• اسم الحرف: إبسيلون\n• نطق الحرف بالعربي: ي أو ڤ أو و\n• قواعد النطق: الحرف الحادي والعشرون. حرف متحرك ينطق \"ڤ\" بعد Ⲁ أو Ⲉ، وينطق \"و\" طويلة بعد Ⲟ (ⲟⲩ)، وينطق \"ي\" في الحالات الأخرى.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲩⲥⲓⲥ\n  - القبطي المعرب (نطقها): «إيسيس»\n  - المعنى بالعربية: مطر\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":789,"lesson_id":153,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲩ واستمع لنطقه","coptic_display":"Ⲩ","audio_text":"إبسيلون كابيتال","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":790,"lesson_id":153,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲩ واستمع لنطقه","coptic_display":"ⲩ","audio_text":"إبسيلون سمول","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":791,"lesson_id":153,"type":"read_select","question":"ما هو نطق الحرف Ⲩ بالعربية؟","coptic_display":"Ⲩ","audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4501,"challenge_id":791,"text":"ي أو ڤ أو و","is_correct":true,"image_url":null,"audio_url":null},{"id":4502,"challenge_id":791,"text":"ياء طويلة فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4500,"challenge_id":791,"text":"واو فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4503,"challenge_id":791,"text":"ب أو ڤ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":792,"lesson_id":153,"type":"select","question":"ما معنى الكلمة القبطية: ⲩⲥⲓⲥ؟ (المعرب: «إيسيس»)","coptic_display":"ⲩⲥⲓⲥ","audio_text":"إيسيس","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4505,"challenge_id":792,"text":"سحاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4507,"challenge_id":792,"text":"ثلج","is_correct":false,"image_url":null,"audio_url":null},{"id":4504,"challenge_id":792,"text":"مطر","is_correct":true,"image_url":null,"audio_url":null},{"id":4506,"challenge_id":792,"text":"ريح","is_correct":false,"image_url":null,"audio_url":null}]},{"id":793,"lesson_id":153,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مطر (المعرب: «إيسيس»)","coptic_display":"ⲩⲥⲓⲥ","audio_text":"إيسيس","audio_url":"audio_coptic/21epselon.mp3","correct_word":"ⲩⲥⲓⲥ","tiles":["ⲩ","ⲥ","ⲓ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":154,"unit_id":45,"title":"حرف في (Ⲫ ⲫ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":794,"lesson_id":154,"type":"text_view","question":"نبذة عن حرف في (Ⲫ ⲫ)","coptic_display":"Ⲫ ⲫ","audio_text":"في","audio_url":"audio_coptic/22fi.mp3","correct_word":"• اسم الحرف: في\n• نطق الحرف بالعربي: ف\n• قواعد النطق: الحرف الثاني والعشرون. يُنطق حرف \"ف\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲫⲉⲃ\n  - القبطي المعرب (نطقها): «أفيغ»\n  - المعنى بالعربية: بطيخ\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":795,"lesson_id":154,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲫ واستمع لنطقه","coptic_display":"Ⲫ","audio_text":"في كابيتال","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":796,"lesson_id":154,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲫ واستمع لنطقه","coptic_display":"ⲫ","audio_text":"في سمول","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":797,"lesson_id":154,"type":"read_select","question":"ما هو نطق الحرف Ⲫ بالعربية؟","coptic_display":"Ⲫ","audio_text":"في","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4508,"challenge_id":797,"text":"ف","is_correct":true,"image_url":null,"audio_url":null},{"id":4509,"challenge_id":797,"text":"ب أو ڤ","is_correct":false,"image_url":null,"audio_url":null},{"id":4510,"challenge_id":797,"text":"ث","is_correct":false,"image_url":null,"audio_url":null},{"id":4511,"challenge_id":797,"text":"خ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":798,"lesson_id":154,"type":"select","question":"ما معنى الكلمة القبطية: ⲫⲉⲃ؟ (المعرب: «أفيغ»)","coptic_display":"ⲫⲉⲃ","audio_text":"أفيغ","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4513,"challenge_id":798,"text":"تفاح","is_correct":false,"image_url":null,"audio_url":null},{"id":4514,"challenge_id":798,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4515,"challenge_id":798,"text":"برتقال","is_correct":false,"image_url":null,"audio_url":null},{"id":4512,"challenge_id":798,"text":"بطيخ","is_correct":true,"image_url":null,"audio_url":null}]},{"id":799,"lesson_id":154,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: بطيخ (المعرب: «أفيغ»)","coptic_display":"ⲫⲉⲃ","audio_text":"أفيغ","audio_url":"audio_coptic/22fi.mp3","correct_word":"ⲫⲉⲃ","tiles":["ⲫ","ⲉ","ⲃ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":155,"unit_id":45,"title":"حرف خي (Ⲭ ⲭ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":800,"lesson_id":155,"type":"text_view","question":"نبذة عن حرف خي (Ⲭ ⲭ)","coptic_display":"Ⲭ ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":"• اسم الحرف: خي\n• نطق الحرف بالعربي: خ أو ك أو ش\n• قواعد النطق: الحرف الثالث والعشرون. يُنطق \"ك\" في الكلمات القبطية، ويُنطق \"خ\" أو \"ش\" في الكلمات ذات الأصل اليوناني.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲭ̀ⲗⲓⲗ\n  - القبطي المعرب (نطقها): «إخليل»\n  - المعنى بالعربية: عقد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":801,"lesson_id":155,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲭ واستمع لنطقه","coptic_display":"Ⲭ","audio_text":"خي كابيتال","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":802,"lesson_id":155,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲭ واستمع لنطقه","coptic_display":"ⲭ","audio_text":"خي سمول","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":803,"lesson_id":155,"type":"read_select","question":"ما هو نطق الحرف Ⲭ بالعربية؟","coptic_display":"Ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4517,"challenge_id":803,"text":"ك أو ش أو خ","is_correct":true,"image_url":null,"audio_url":null},{"id":4518,"challenge_id":803,"text":"ك أو ق أو ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4519,"challenge_id":803,"text":"خ أو غ أو ق","is_correct":false,"image_url":null,"audio_url":null},{"id":4516,"challenge_id":803,"text":"ش أو س أو ص","is_correct":false,"image_url":null,"audio_url":null}]},{"id":804,"lesson_id":155,"type":"select","question":"ما معنى الكلمة القبطية: ⲭ̀ⲗⲓⲗ؟ (المعرب: «إخليل»)","coptic_display":"ⲭ̀ⲗⲓⲗ","audio_text":"إخليل","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4520,"challenge_id":804,"text":"سوار","is_correct":false,"image_url":null,"audio_url":null},{"id":4521,"challenge_id":804,"text":"عقد","is_correct":true,"image_url":null,"audio_url":null},{"id":4522,"challenge_id":804,"text":"تاج","is_correct":false,"image_url":null,"audio_url":null},{"id":4523,"challenge_id":804,"text":"خاتم","is_correct":false,"image_url":null,"audio_url":null}]},{"id":805,"lesson_id":155,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: عقد (المعرب: «إخليل»)","coptic_display":"ⲭ̀ⲗⲓⲗ","audio_text":"إخليل","audio_url":"audio_coptic/23ki.mp3","correct_word":"ⲭ̀ⲗⲓⲗ","tiles":["ⲭ","̀","ⲗ","ⲓ","ⲗ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":156,"unit_id":45,"title":"حرف إبسي (Ⲯ ⲯ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":806,"lesson_id":156,"type":"text_view","question":"نبذة عن حرف إبسي (Ⲯ ⲯ)","coptic_display":"Ⲯ ⲯ","audio_text":"إبسي","audio_url":"audio_coptic/24psi.mp3","correct_word":"• اسم الحرف: إبسي\n• نطق الحرف بالعربي: بـ + س\n• قواعد النطق: الحرف الرابع والعشرون. حرف مركب يُنطق باء وسين معاً في صوت واحد (بـ + س = Ps).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ\n  - القبطي المعرب (نطقها): «إبسيت إن كينكين»\n  - المعنى بالعربية: 9 دفوف\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":807,"lesson_id":156,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲯ واستمع لنطقه","coptic_display":"Ⲯ","audio_text":"إبسي كابيتال","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":808,"lesson_id":156,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲯ واستمع لنطقه","coptic_display":"ⲯ","audio_text":"إبسي سمول","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":809,"lesson_id":156,"type":"read_select","question":"ما هو نطق الحرف Ⲯ بالعربية؟","coptic_display":"Ⲯ","audio_text":"إبسي","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4524,"challenge_id":809,"text":"بـ + س (إبسي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4525,"challenge_id":809,"text":"كـ + س (إكسي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4526,"challenge_id":809,"text":"ب + ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4527,"challenge_id":809,"text":"ف + س","is_correct":false,"image_url":null,"audio_url":null}]},{"id":810,"lesson_id":156,"type":"select","question":"ما معنى الكلمة القبطية: ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ؟ (المعرب: «إبسيت إن كينكين»)","coptic_display":"ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ","audio_text":"إبسيت إن كينكين","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4529,"challenge_id":810,"text":"٩ أجراس","is_correct":false,"image_url":null,"audio_url":null},{"id":4530,"challenge_id":810,"text":"٧ دفوف","is_correct":false,"image_url":null,"audio_url":null},{"id":4531,"challenge_id":810,"text":"9 دفوف","is_correct":true,"image_url":null,"audio_url":null},{"id":4528,"challenge_id":810,"text":"٨ قيثارات","is_correct":false,"image_url":null,"audio_url":null}]},{"id":811,"lesson_id":156,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: 9 دفوف (المعرب: «إبسيت إن كينكين»)","coptic_display":"ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ","audio_text":"إبسيت إن كينكين","audio_url":"audio_coptic/24psi.mp3","correct_word":"ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ","tiles":["ⲯ","ⲓ","ⲧ"," ","ⲛ","̀","ⲕ","ⲉ","ⲛ","ⲕ","ⲉ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":157,"unit_id":45,"title":"حرف أوميغا (أو طويلة) (Ⲱ ⲱ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":812,"lesson_id":157,"type":"text_view","question":"نبذة عن حرف أوميغا (أو طويلة) (Ⲱ ⲱ)","coptic_display":"Ⲱ ⲱ","audio_text":"أوميغا (أو طويلة)","audio_url":"audio_coptic/25oo.mp3","correct_word":"• اسم الحرف: أوميغا (أو طويلة)\n• نطق الحرف بالعربي: واو طويلة ممدودة\n• قواعد النطق: الحرف الخامس والعشرون. آخر الحروف المأخوذة من اليونانية. يُنطق واواً طويلة ومفتوحة (Ō).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲧⲁⲥⲱⲛⲓ\n  - القبطي المعرب (نطقها): «تاسوني»\n  - المعنى بالعربية: أختي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":813,"lesson_id":157,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲱ واستمع لنطقه","coptic_display":"Ⲱ","audio_text":"أوميغا (أو طويلة) كابيتال","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":814,"lesson_id":157,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲱ واستمع لنطقه","coptic_display":"ⲱ","audio_text":"أوميغا (أو طويلة) سمول","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":815,"lesson_id":157,"type":"read_select","question":"ما هو نطق الحرف Ⲱ بالعربية؟","coptic_display":"Ⲱ","audio_text":"أوميغا (أو طويلة)","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4533,"challenge_id":815,"text":"واو طويلة ممدودة","is_correct":true,"image_url":null,"audio_url":null},{"id":4534,"challenge_id":815,"text":"واو قصيرة مضمومة","is_correct":false,"image_url":null,"audio_url":null},{"id":4535,"challenge_id":815,"text":"ألف مفخمة","is_correct":false,"image_url":null,"audio_url":null},{"id":4532,"challenge_id":815,"text":"واو لينة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":816,"lesson_id":157,"type":"select","question":"ما معنى الكلمة القبطية: ⲧⲁⲥⲱⲛⲓ؟ (المعرب: «تاسوني»)","coptic_display":"ⲧⲁⲥⲱⲛⲓ","audio_text":"تاسوني","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4536,"challenge_id":816,"text":"أختي","is_correct":true,"image_url":null,"audio_url":null},{"id":4537,"challenge_id":816,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null},{"id":4538,"challenge_id":816,"text":"أخي","is_correct":false,"image_url":null,"audio_url":null},{"id":4539,"challenge_id":816,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null}]},{"id":817,"lesson_id":157,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أختي (المعرب: «تاسوني»)","coptic_display":"ⲧⲁⲥⲱⲛⲓ","audio_text":"تاسوني","audio_url":"audio_coptic/25oo.mp3","correct_word":"ⲧⲁⲥⲱⲛⲓ","tiles":["ⲧ","ⲁ","ⲥ","ⲱ","ⲛ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":169,"unit_id":45,"title":"🔄 مراجعة الوحدة 5","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":880,"lesson_id":169,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲩ ⲩ","right":"إبسيلون (ي أو ڤ أو و)"},{"left":"Ⲫ ⲫ","right":"في (ف)"},{"left":"Ⲭ ⲭ","right":"خي (خ أو ك أو ش)"},{"left":"Ⲯ ⲯ","right":"إبسي (بـ + س)"}],"is_correct":true,"order_index":1,"options":[]},{"id":881,"lesson_id":169,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4644,"challenge_id":881,"text":"Ⲩ ⲩ (إبسيلون)","is_correct":true,"image_url":null,"audio_url":null},{"id":4645,"challenge_id":881,"text":"Ⲓ ⲓ (إيوتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4646,"challenge_id":881,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4647,"challenge_id":881,"text":"Ⲟ ⲟ (أُو)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":882,"lesson_id":169,"type":"select","question":"ما معنى الكلمة: ⲫⲉⲃ؟ (المعرب: «أفيغ»)","coptic_display":"ⲫⲉⲃ","audio_text":"أفيغ","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4648,"challenge_id":882,"text":"برتقال","is_correct":false,"image_url":null,"audio_url":null},{"id":4650,"challenge_id":882,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4649,"challenge_id":882,"text":"بطيخ","is_correct":true,"image_url":null,"audio_url":null},{"id":4651,"challenge_id":882,"text":"تفاح","is_correct":false,"image_url":null,"audio_url":null}]},{"id":883,"lesson_id":169,"type":"write","question":"رتب حروف الكلمة: أختي (المعرب: «تاسوني»)","coptic_display":"ⲧⲁⲥⲱⲛⲓ","audio_text":"تاسوني","audio_url":"audio_coptic/25oo.mp3","correct_word":"ⲧⲁⲥⲱⲛⲓ","tiles":["ⲧ","ⲁ","ⲥ","ⲱ","ⲛ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":884,"lesson_id":169,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲭ؟","coptic_display":"Ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4652,"challenge_id":884,"text":"كي (ك أو ش أو خ)","is_correct":true,"image_url":null,"audio_url":null},{"id":4655,"challenge_id":884,"text":"غاما (غ أو ج أو ن)","is_correct":false,"image_url":null,"audio_url":null},{"id":4653,"challenge_id":884,"text":"كابا (ك)","is_correct":false,"image_url":null,"audio_url":null},{"id":4654,"challenge_id":884,"text":"شاي (ش)","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":46,"level_id":5,"title":"الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)","badge":"Ϣ-Ϫ","description":"الحروف الديموطيقية السبعة الخاصة باللغة المصرية القديمة","order_index":6,"lessons":[{"id":158,"unit_id":46,"title":"حرف شاي (Ϣ ϣ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":818,"lesson_id":158,"type":"text_view","question":"نبذة عن حرف شاي (Ϣ ϣ)","coptic_display":"Ϣ ϣ","audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":"• اسم الحرف: شاي\n• نطق الحرف بالعربي: ش\n• قواعد النطق: الحرف السادس والعشرون. أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم. يُنطق حرف \"ش\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϣⲁⲩ\n  - القبطي المعرب (نطقها): «شاف»\n  - المعنى بالعربية: قطة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":819,"lesson_id":158,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϣ واستمع لنطقه","coptic_display":"Ϣ","audio_text":"شاي كابيتال","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":820,"lesson_id":158,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϣ واستمع لنطقه","coptic_display":"ϣ","audio_text":"شاي سمول","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":821,"lesson_id":158,"type":"read_select","question":"ما هو نطق الحرف Ϣ بالعربية؟","coptic_display":"Ϣ","audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4540,"challenge_id":821,"text":"ش","is_correct":true,"image_url":null,"audio_url":null},{"id":4541,"challenge_id":821,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4542,"challenge_id":821,"text":"ص","is_correct":false,"image_url":null,"audio_url":null},{"id":4543,"challenge_id":821,"text":"تش","is_correct":false,"image_url":null,"audio_url":null}]},{"id":822,"lesson_id":158,"type":"select","question":"ما معنى الكلمة القبطية: ϣⲁⲩ؟ (المعرب: «شاف»)","coptic_display":"ϣⲁⲩ","audio_text":"شاف","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4545,"challenge_id":822,"text":"قطة","is_correct":true,"image_url":null,"audio_url":null},{"id":4546,"challenge_id":822,"text":"أسد","is_correct":false,"image_url":null,"audio_url":null},{"id":4547,"challenge_id":822,"text":"طائر","is_correct":false,"image_url":null,"audio_url":null},{"id":4544,"challenge_id":822,"text":"كلب","is_correct":false,"image_url":null,"audio_url":null}]},{"id":823,"lesson_id":158,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قطة (المعرب: «شاف»)","coptic_display":"ϣⲁⲩ","audio_text":"شاف","audio_url":"audio_coptic/26shay.mp3","correct_word":"ϣⲁⲩ","tiles":["ϣ","ⲁ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":159,"unit_id":46,"title":"حرف فاي (Ϥ ϥ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":824,"lesson_id":159,"type":"text_view","question":"نبذة عن حرف فاي (Ϥ ϥ)","coptic_display":"Ϥ ϥ","audio_text":"فاي","audio_url":"audio_coptic/27fay.mp3","correct_word":"• اسم الحرف: فاي\n• نطق الحرف بالعربي: ف\n• قواعد النطق: الحرف السابع والعشرون. حرف مصري ديموطيقي أصيل يُنطق \"ف\".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϥⲱⲓ\n  - القبطي المعرب (نطقها): «فوي»\n  - المعنى بالعربية: شعر\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":825,"lesson_id":159,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϥ واستمع لنطقه","coptic_display":"Ϥ","audio_text":"فاي كابيتال","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":826,"lesson_id":159,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϥ واستمع لنطقه","coptic_display":"ϥ","audio_text":"فاي سمول","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":827,"lesson_id":159,"type":"read_select","question":"ما هو نطق الحرف Ϥ بالعربية؟","coptic_display":"Ϥ","audio_text":"فاي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4549,"challenge_id":827,"text":"ف","is_correct":true,"image_url":null,"audio_url":null},{"id":4550,"challenge_id":827,"text":"ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4551,"challenge_id":827,"text":"ڤ","is_correct":false,"image_url":null,"audio_url":null},{"id":4548,"challenge_id":827,"text":"و","is_correct":false,"image_url":null,"audio_url":null}]},{"id":828,"lesson_id":159,"type":"select","question":"ما معنى الكلمة القبطية: ϥⲱⲓ؟ (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4552,"challenge_id":828,"text":"يد","is_correct":false,"image_url":null,"audio_url":null},{"id":4553,"challenge_id":828,"text":"عين","is_correct":false,"image_url":null,"audio_url":null},{"id":4554,"challenge_id":828,"text":"رأس","is_correct":false,"image_url":null,"audio_url":null},{"id":4555,"challenge_id":828,"text":"شعر","is_correct":true,"image_url":null,"audio_url":null}]},{"id":829,"lesson_id":159,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شعر (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":"ϥⲱⲓ","tiles":["ϥ","ⲱ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":160,"unit_id":46,"title":"حرف خاي (Ϧ ϧ)","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":830,"lesson_id":160,"type":"text_view","question":"نبذة عن حرف خاي (Ϧ ϧ)","coptic_display":"Ϧ ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":"• اسم الحرف: خاي\n• نطق الحرف بالعربي: خ\n• قواعد النطق: الحرف الثامن والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف \"خ\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϧⲏⲃⲥ\n  - القبطي المعرب (نطقها): «خيبس»\n  - المعنى بالعربية: مصباح\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":831,"lesson_id":160,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϧ واستمع لنطقه","coptic_display":"Ϧ","audio_text":"خاي كابيتال","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":832,"lesson_id":160,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϧ واستمع لنطقه","coptic_display":"ϧ","audio_text":"خاي سمول","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":833,"lesson_id":160,"type":"read_select","question":"ما هو نطق الحرف Ϧ بالعربية؟","coptic_display":"Ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4556,"challenge_id":833,"text":"خ","is_correct":true,"image_url":null,"audio_url":null},{"id":4557,"challenge_id":833,"text":"غ","is_correct":false,"image_url":null,"audio_url":null},{"id":4558,"challenge_id":833,"text":"ح","is_correct":false,"image_url":null,"audio_url":null},{"id":4559,"challenge_id":833,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null}]},{"id":834,"lesson_id":160,"type":"select","question":"ما معنى الكلمة القبطية: ϧⲏⲃⲥ؟ (المعرب: «خيبس»)","coptic_display":"ϧⲏⲃⲥ","audio_text":"خيبس","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4561,"challenge_id":834,"text":"شمعة","is_correct":false,"image_url":null,"audio_url":null},{"id":4562,"challenge_id":834,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4563,"challenge_id":834,"text":"قنديل","is_correct":false,"image_url":null,"audio_url":null},{"id":4560,"challenge_id":834,"text":"مصباح","is_correct":true,"image_url":null,"audio_url":null}]},{"id":835,"lesson_id":160,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مصباح (المعرب: «خيبس»)","coptic_display":"ϧⲏⲃⲥ","audio_text":"خيبس","audio_url":"audio_coptic/28khay.mp3","correct_word":"ϧⲏⲃⲥ","tiles":["ϧ","ⲏ","ⲃ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":161,"unit_id":46,"title":"حرف هوري (Ϩ ϩ)","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":836,"lesson_id":161,"type":"text_view","question":"نبذة عن حرف هوري (Ϩ ϩ)","coptic_display":"Ϩ ϩ","audio_text":"هوري","audio_url":"audio_coptic/29hory.mp3","correct_word":"• اسم الحرف: هوري\n• نطق الحرف بالعربي: هـ\n• قواعد النطق: الحرف التاسع والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف \"هـ\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϩ̀ⲑⲟ\n  - القبطي المعرب (نطقها): «إهثو»\n  - المعنى بالعربية: حصان\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":837,"lesson_id":161,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϩ واستمع لنطقه","coptic_display":"Ϩ","audio_text":"هوري كابيتال","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":838,"lesson_id":161,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϩ واستمع لنطقه","coptic_display":"ϩ","audio_text":"هوري سمول","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":839,"lesson_id":161,"type":"read_select","question":"ما هو نطق الحرف Ϩ بالعربية؟","coptic_display":"Ϩ","audio_text":"هوري","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4565,"challenge_id":839,"text":"هـ","is_correct":true,"image_url":null,"audio_url":null},{"id":4566,"challenge_id":839,"text":"ح","is_correct":false,"image_url":null,"audio_url":null},{"id":4567,"challenge_id":839,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4564,"challenge_id":839,"text":"ع","is_correct":false,"image_url":null,"audio_url":null}]},{"id":840,"lesson_id":161,"type":"select","question":"ما معنى الكلمة القبطية: ϩ̀ⲑⲟ؟ (المعرب: «إهثو»)","coptic_display":"ϩ̀ⲑⲟ","audio_text":"إهثو","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4568,"challenge_id":840,"text":"أسد","is_correct":false,"image_url":null,"audio_url":null},{"id":4569,"challenge_id":840,"text":"خروف","is_correct":false,"image_url":null,"audio_url":null},{"id":4570,"challenge_id":840,"text":"جمل","is_correct":false,"image_url":null,"audio_url":null},{"id":4571,"challenge_id":840,"text":"حصان","is_correct":true,"image_url":null,"audio_url":null}]},{"id":841,"lesson_id":161,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: حصان (المعرب: «إهثو»)","coptic_display":"ϩ̀ⲑⲟ","audio_text":"إهثو","audio_url":"audio_coptic/29hory.mp3","correct_word":"ϩ̀ⲑⲟ","tiles":["ϩ","̀","ⲑ","ⲟ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":162,"unit_id":46,"title":"حرف جانجا (Ϫ ϫ)","xp_reward":5,"order_index":5,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":842,"lesson_id":162,"type":"text_view","question":"نبذة عن حرف جانجا (Ϫ ϫ)","coptic_display":"Ϫ ϫ","audio_text":"جانجا","audio_url":"audio_coptic/30ganga.mp3","correct_word":"• اسم الحرف: جانجا\n• نطق الحرف بالعربي: ج (معطشة أو غير معطشة)\n• قواعد النطق: الحرف الثلاثون. حرف مصري ديموطيقي أصيل. يُنطق \"ج\" معطشة قبل المتحرك للكسر، و\"ج\" غير معطشة في الحالات الأخرى.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϫⲉⲙⲫⲉϩ\n  - القبطي المعرب (نطقها): «جيمفيه»\n  - المعنى بالعربية: تفاح\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":843,"lesson_id":162,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϫ واستمع لنطقه","coptic_display":"Ϫ","audio_text":"جانجا كابيتال","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":844,"lesson_id":162,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϫ واستمع لنطقه","coptic_display":"ϫ","audio_text":"جانجا سمول","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":845,"lesson_id":162,"type":"read_select","question":"ما هو نطق الحرف Ϫ بالعربية؟","coptic_display":"Ϫ","audio_text":"جانجا","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4572,"challenge_id":845,"text":"ج معطشة (أو د)","is_correct":true,"image_url":null,"audio_url":null},{"id":4573,"challenge_id":845,"text":"ج أو غ أو ن (غاما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4574,"challenge_id":845,"text":"تش (تشيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4575,"challenge_id":845,"text":"ش","is_correct":false,"image_url":null,"audio_url":null}]},{"id":846,"lesson_id":162,"type":"select","question":"ما معنى الكلمة القبطية: ϫⲉⲙⲫⲉϩ؟ (المعرب: «جيمفيه»)","coptic_display":"ϫⲉⲙⲫⲉϩ","audio_text":"جيمفيه","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4577,"challenge_id":846,"text":"برتقال","is_correct":false,"image_url":null,"audio_url":null},{"id":4578,"challenge_id":846,"text":"بطيخ","is_correct":false,"image_url":null,"audio_url":null},{"id":4579,"challenge_id":846,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4576,"challenge_id":846,"text":"تفاح","is_correct":true,"image_url":null,"audio_url":null}]},{"id":847,"lesson_id":162,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: تفاح (المعرب: «جيمفيه»)","coptic_display":"ϫⲉⲙⲫⲉϩ","audio_text":"جيمفيه","audio_url":"audio_coptic/30ganga.mp3","correct_word":"ϫⲉⲙⲫⲉϩ","tiles":["ϫ","ⲉ","ⲙ","ⲫ","ⲉ","ϩ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":170,"unit_id":46,"title":"🔄 مراجعة الوحدة 6","xp_reward":5,"order_index":6,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":885,"lesson_id":170,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ϣ ϣ","right":"شاي (ش)"},{"left":"Ϥ ϥ","right":"فاي (ف)"},{"left":"Ϧ ϧ","right":"خاي (خ)"},{"left":"Ϩ ϩ","right":"هوري (هـ)"}],"is_correct":true,"order_index":1,"options":[]},{"id":886,"lesson_id":170,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4656,"challenge_id":886,"text":"Ϣ ϣ (شاي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4657,"challenge_id":886,"text":"Ⲥ ⲥ (سيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4658,"challenge_id":886,"text":"Ϭ ϭ (تشيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4659,"challenge_id":886,"text":"Ϫ ϫ (جانجا)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":887,"lesson_id":170,"type":"select","question":"ما معنى الكلمة: ϥⲱⲓ؟ (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4660,"challenge_id":887,"text":"شعر","is_correct":true,"image_url":null,"audio_url":null},{"id":4661,"challenge_id":887,"text":"رأس","is_correct":false,"image_url":null,"audio_url":null},{"id":4663,"challenge_id":887,"text":"يد","is_correct":false,"image_url":null,"audio_url":null},{"id":4662,"challenge_id":887,"text":"عين","is_correct":false,"image_url":null,"audio_url":null}]},{"id":888,"lesson_id":170,"type":"write","question":"رتب حروف الكلمة: تفاح (المعرب: «جيمفيه»)","coptic_display":"ϫⲉⲙⲫⲉϩ","audio_text":"جيمفيه","audio_url":"audio_coptic/30ganga.mp3","correct_word":"ϫⲉⲙⲫⲉϩ","tiles":["ϫ","ⲉ","ⲙ","ⲫ","ⲉ","ϩ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":889,"lesson_id":170,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ϧ؟","coptic_display":"Ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4664,"challenge_id":889,"text":"خاي (خ)","is_correct":true,"image_url":null,"audio_url":null},{"id":4665,"challenge_id":889,"text":"هوري (هـ)","is_correct":false,"image_url":null,"audio_url":null},{"id":4666,"challenge_id":889,"text":"غاما (غ أو ج أو ن)","is_correct":false,"image_url":null,"audio_url":null},{"id":4667,"challenge_id":889,"text":"تشيما (تش)","is_correct":false,"image_url":null,"audio_url":null}]}]}]},{"id":47,"level_id":5,"title":"الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)","badge":"Ϭ-Ϯ","description":"ختام الأبجدية واختبار إتقان الـ 32 حرفاً القبطية بالكامل","order_index":7,"lessons":[{"id":163,"unit_id":47,"title":"حرف تشيما (Ϭ ϭ)","xp_reward":5,"order_index":1,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":848,"lesson_id":163,"type":"text_view","question":"نبذة عن حرف تشيما (Ϭ ϭ)","coptic_display":"Ϭ ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":"• اسم الحرف: تشيما\n• نطق الحرف بالعربي: تش\n• قواعد النطق: الحرف الحادي والثلاثون. الحرف السادس من الحروف المصرية الديموطيقية، يُنطق تاء وشين معاً (تش) دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϭⲁϫ\n  - القبطي المعرب (نطقها): «تشاج»\n  - المعنى بالعربية: عصفور\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":849,"lesson_id":163,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϭ واستمع لنطقه","coptic_display":"Ϭ","audio_text":"تشيما كابيتال","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":850,"lesson_id":163,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϭ واستمع لنطقه","coptic_display":"ϭ","audio_text":"تشيما سمول","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":851,"lesson_id":163,"type":"read_select","question":"ما هو نطق الحرف Ϭ بالعربية؟","coptic_display":"Ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4581,"challenge_id":851,"text":"تش","is_correct":true,"image_url":null,"audio_url":null},{"id":4582,"challenge_id":851,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4583,"challenge_id":851,"text":"ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4580,"challenge_id":851,"text":"ت","is_correct":false,"image_url":null,"audio_url":null}]},{"id":852,"lesson_id":163,"type":"select","question":"ما معنى الكلمة القبطية: ϭⲁϫ؟ (المعرب: «تشاج»)","coptic_display":"ϭⲁϫ","audio_text":"تشاج","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4584,"challenge_id":852,"text":"دجاجة","is_correct":false,"image_url":null,"audio_url":null},{"id":4585,"challenge_id":852,"text":"حمامة","is_correct":false,"image_url":null,"audio_url":null},{"id":4586,"challenge_id":852,"text":"بطة","is_correct":false,"image_url":null,"audio_url":null},{"id":4587,"challenge_id":852,"text":"عصفور","is_correct":true,"image_url":null,"audio_url":null}]},{"id":853,"lesson_id":163,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: عصفور (المعرب: «تشاج»)","coptic_display":"ϭⲁϫ","audio_text":"تشاج","audio_url":"audio_coptic/31chema.mp3","correct_word":"ϭⲁϫ","tiles":["ϭ","ⲁ","ϫ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":164,"unit_id":47,"title":"حرف تي (Ϯ ϯ)","xp_reward":5,"order_index":2,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":854,"lesson_id":164,"type":"text_view","question":"نبذة عن حرف تي (Ϯ ϯ)","coptic_display":"Ϯ ϯ","audio_text":"تي","audio_url":"audio_coptic/32tee.mp3","correct_word":"• اسم الحرف: تي\n• نطق الحرف بالعربي: تـ + ي\n• قواعد النطق: الحرف الثاني والثلاثون والأخير في الأبجدية القبطية. مقطع صوتي مركب ينطق تاء وياء معاً (تـ + ي = Ti).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϯⲙⲓ\n  - القبطي المعرب (نطقها): «تيمي»\n  - المعنى بالعربية: قرية\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"options":[]},{"id":855,"lesson_id":164,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϯ واستمع لنطقه","coptic_display":"Ϯ","audio_text":"تي كابيتال","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[]},{"id":856,"lesson_id":164,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϯ واستمع لنطقه","coptic_display":"ϯ","audio_text":"تي سمول","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[]},{"id":857,"lesson_id":164,"type":"read_select","question":"ما هو نطق الحرف Ϯ بالعربية؟","coptic_display":"Ϯ","audio_text":"تي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4588,"challenge_id":857,"text":"تـ + ي (تي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4589,"challenge_id":857,"text":"ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4590,"challenge_id":857,"text":"ث","is_correct":false,"image_url":null,"audio_url":null},{"id":4591,"challenge_id":857,"text":"د + ي (دي)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":858,"lesson_id":164,"type":"select","question":"ما معنى الكلمة القبطية: ϯⲙⲓ؟ (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4593,"challenge_id":858,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4594,"challenge_id":858,"text":"مدينة","is_correct":false,"image_url":null,"audio_url":null},{"id":4595,"challenge_id":858,"text":"قرية","is_correct":true,"image_url":null,"audio_url":null},{"id":4592,"challenge_id":858,"text":"بيت","is_correct":false,"image_url":null,"audio_url":null}]},{"id":859,"lesson_id":164,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قرية (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":"ϯⲙⲓ","tiles":["ϯ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"options":[]}]},{"id":171,"unit_id":47,"title":"🔄 مراجعة شاملة للأبجدية القبطية","xp_reward":5,"order_index":3,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":890,"lesson_id":171,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ϭ ϭ","right":"تشيما (تش)"},{"left":"Ϯ ϯ","right":"تي (تـ + ي)"}],"is_correct":true,"order_index":1,"options":[]},{"id":891,"lesson_id":171,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4669,"challenge_id":891,"text":"Ϭ ϭ (تشيما)","is_correct":true,"image_url":null,"audio_url":null},{"id":4668,"challenge_id":891,"text":"Ϣ ϣ (شاي)","is_correct":false,"image_url":null,"audio_url":null},{"id":98912,"challenge_id":891,"text":"Ϫ ϫ (جانجا)","is_correct":false,"image_url":null,"audio_url":null},{"id":98913,"challenge_id":891,"text":"Ϯ ϯ (تي)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":892,"lesson_id":171,"type":"select","question":"ما معنى الكلمة: ϯⲙⲓ؟ (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4670,"challenge_id":892,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4673,"challenge_id":892,"text":"قرية","is_correct":true,"image_url":null,"audio_url":null},{"id":4671,"challenge_id":892,"text":"بيت","is_correct":false,"image_url":null,"audio_url":null},{"id":4672,"challenge_id":892,"text":"مدينة","is_correct":false,"image_url":null,"audio_url":null}]},{"id":893,"lesson_id":171,"type":"write","question":"رتب حروف الكلمة: قرية (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":"ϯⲙⲓ","tiles":["ϯ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"options":[]},{"id":894,"lesson_id":171,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ϭ؟","coptic_display":"Ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"options":[{"id":4676,"challenge_id":894,"text":"تشيما (تش)","is_correct":true,"image_url":null,"audio_url":null},{"id":4677,"challenge_id":894,"text":"شاي (ش)","is_correct":false,"image_url":null,"audio_url":null},{"id":4674,"challenge_id":894,"text":"جانجا (ج معطشة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4675,"challenge_id":894,"text":"تي (تـ+ي)","is_correct":false,"image_url":null,"audio_url":null}]}]},{"id":172,"unit_id":47,"title":"🎓 الاختبار النهائي الشامل للمستوى الأول","xp_reward":5,"order_index":4,"practice_xp":1,"challenge_xp":5,"challenges":[{"id":895,"lesson_id":172,"type":"match","question":"صل الحرف بنطقه الصحيح بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲁ ⲁ","right":"ألفا (أ)"},{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"ⲭ ⲭ","right":"خي (خ/ك/ش)"},{"left":"Ϯ ϯ","right":"تي (تـ+ي)"}],"is_correct":true,"order_index":1,"options":[]},{"id":896,"lesson_id":172,"type":"listen","question":"استمع واختر الحرف الصحيح","coptic_display":null,"audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"options":[{"id":4678,"challenge_id":896,"text":"Ⲁ ⲁ (ألفا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4680,"challenge_id":896,"text":"Ⲉ ⲉ (إي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4679,"challenge_id":896,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4681,"challenge_id":896,"text":"Ⲟ ⲟ (أُو)","is_correct":false,"image_url":null,"audio_url":null}]},{"id":897,"lesson_id":172,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲗⲱⲙ؟ (المعرب: «آلوم»)","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"options":[{"id":4682,"challenge_id":897,"text":"جبنة","is_correct":true,"image_url":null,"audio_url":null},{"id":4683,"challenge_id":897,"text":"لبن","is_correct":false,"image_url":null,"audio_url":null},{"id":4684,"challenge_id":897,"text":"خبز","is_correct":false,"image_url":null,"audio_url":null},{"id":4685,"challenge_id":897,"text":"عسل","is_correct":false,"image_url":null,"audio_url":null}]},{"id":898,"lesson_id":172,"type":"select","question":"كم عدد حروف الأبجدية القبطية كاملة؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"options":[{"id":4686,"challenge_id":898,"text":"٣٢ حرفاً","is_correct":true,"image_url":null,"audio_url":null},{"id":4688,"challenge_id":898,"text":"٢٦ حرفاً","is_correct":false,"image_url":null,"audio_url":null},{"id":4687,"challenge_id":898,"text":"٢٨ حرفاً","is_correct":false,"image_url":null,"audio_url":null},{"id":4689,"challenge_id":898,"text":"٣٠ حرفاً","is_correct":false,"image_url":null,"audio_url":null}]},{"id":899,"lesson_id":172,"type":"write","question":"رتب حروف الكلمة القبطية: جبنة (المعرب: «آلوم») [ⲁⲗⲱⲙ]","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":"ⲁⲗⲱⲙ","tiles":["ⲁ","ⲗ","ⲱ","ⲙ"],"pairs":null,"is_correct":true,"order_index":5,"options":[]}]}]}],"chests":[{"id":"chest_unit_1","level_id":5,"unit_id":41,"title":"🎁 صندوق كنز الوحدة 1","description":"مكافأة إتمام دروس ومراجعة الوحدة 1","placement_type":"unit_end","after_lesson_id":165,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:14.452862+00:00"},{"id":"chest_unit_2","level_id":5,"unit_id":42,"title":"🎁 صندوق كنز الوحدة 2","description":"مكافأة إتمام دروس ومراجعة الوحدة 2","placement_type":"unit_end","after_lesson_id":166,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:24.120217+00:00"},{"id":"chest_unit_3","level_id":5,"unit_id":43,"title":"🎁 صندوق كنز الوحدة 3","description":"مكافأة إتمام دروس ومراجعة الوحدة 3","placement_type":"unit_end","after_lesson_id":167,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:31.505007+00:00"},{"id":"chest_unit_4","level_id":5,"unit_id":44,"title":"🎁 صندوق كنز الوحدة 4","description":"مكافأة إتمام دروس ومراجعة الوحدة 4","placement_type":"unit_end","after_lesson_id":168,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:38.422023+00:00"},{"id":"chest_unit_5","level_id":5,"unit_id":45,"title":"🎁 صندوق كنز الوحدة 5","description":"مكافأة إتمام دروس ومراجعة الوحدة 5","placement_type":"unit_end","after_lesson_id":169,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:44.559788+00:00"},{"id":"chest_unit_6","level_id":5,"unit_id":46,"title":"🎁 صندوق كنز الوحدة 6","description":"مكافأة إتمام دروس ومراجعة الوحدة 6","placement_type":"unit_end","after_lesson_id":170,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:52.06023+00:00"},{"id":"chest_unit_7","level_id":5,"unit_id":47,"title":"🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول","description":"تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!","placement_type":"unit_end","after_lesson_id":171,"xp_mode":"fixed","xp_min":50,"xp_max":50,"hearts":3,"has_badge":true,"badge_title":"متقن الأبجدية القبطية","badge_icon":"trophy","badge_desc":"أتممت المستوى الأول للأبجدية القبطية كاملاً (٣٢ حرفاً)","order_index":0,"created_at":"2026-09-12T14:06:58.486596+00:00"}]};

/* ============================================================
   محرك الصوتيات بواسطة Web Audio API (Chimes, Buzzers, Celebrations)
   ============================================================ */
class SoundEffects {
  constructor(){
    this.ctx = null;
    this._unlocked = false;
  }

  _init(){
    if(!this.ctx){
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if(this.ctx && this.ctx.state === 'suspended'){
      this.ctx.resume().catch(()=>{});
    }
  }

  unlock(){
    try {
      this._init();
      if(this.ctx){
        if(this.ctx.state === 'suspended'){
          this.ctx.resume().catch(()=>{});
        }
        if(!this._unlocked){
          this._unlocked = true;
          const buf = this.ctx.createBuffer(1, 1, 22050);
          const src = this.ctx.createBufferSource();
          src.buffer = buf;
          src.connect(this.ctx.destination);
          src.start(0);
        }
      }
      this.preloadAllSounds();
    } catch(e){}
  }

  _runAudio(fn){
    try {
      this._init();
      if(!this.ctx) return;
      if(this.ctx.state === 'suspended'){
        this.ctx.resume().then(() => {
          try { fn(this.ctx, this.ctx.currentTime); } catch(_) {}
        }).catch(() => {});
      } else {
        fn(this.ctx, this.ctx.currentTime);
      }
    } catch(e){}
  }

  _soundFileCache = new Map();

  _getSoundPath(name) {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname || '';
      if (p.includes('/admin/')) {
        return `../assets/sounds/${name}.wav`;
      }
    }
    return `assets/sounds/${name}.wav`;
  }

  _playSoundFile(name, fallbackFn) {
    try {
      this.unlock();
      const path = this._getSoundPath(name);
      let a = this._soundFileCache.get(name);
      if (!a) {
        a = new Audio(path);
        a.preload = 'auto';
        this._soundFileCache.set(name, a);
      }
      a.currentTime = 0;
      const p = a.play();
      if (p !== undefined) {
        p.catch(() => {
          if (fallbackFn) fallbackFn();
        });
      }
    } catch (_) {
      if (fallbackFn) fallbackFn();
    }
  }

  _lastSoundTimes = new Map();

  _shouldDebounce(soundName, cooldownMs = 250) {
    const now = Date.now();
    const last = this._lastSoundTimes.get(soundName) || 0;
    if (now - last < cooldownMs) return true;
    this._lastSoundTimes.set(soundName, now);
    return false;
  }

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
        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.23);
      });
    } catch(e){}
  }

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
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch(e){}
  }

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
        gain.gain.setValueAtTime(0.2, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + durs[i]);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + times[i]);
        osc.stop(now + times[i] + durs[i]);
      });
    } catch(e){}
  }

  playChestReward(){
    if (this._shouldDebounce('chest', 400)) return;
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch(e){}
  }

  playClick(){
    // ملغى نهائياً بناءً على رغبة المستخدم
  }
  _audioBufferCache = new Map();
  _currentSourceNode = null;
  _allSoundsPreloaded = false;

  preloadAllSounds() {
    if (this._allSoundsPreloaded) return;
    this._allSoundsPreloaded = true;
    this._init();

    const localSounds = [
      '1alfa.mp3', '2veta.mp3', '3ghamma.mp3', '4delta.mp3', '5ei.mp3',
      '6sow.mp3', '7zeta.mp3', '8eta.mp3', '9seta.mp3', '10yota.mp3',
      '11kapa.mp3', '12lavla.mp3', '13mi.mp3', '14ni.mp3', '15axsy.mp3',
      '16oo.mp3', '17pee.mp3', '18roo.mp3', '19sema.mp3', '20tav.mp3',
      '21epselon.mp3', '22fi.mp3', '23ki.mp3', '24psi.mp3', '25oo.mp3',
      '26shay.mp3', '27fay.mp3', '28khay.mp3', '29hory.mp3', '30ganga.mp3',
      '31chema.mp3', '32tee.mp3',
      '1alom.mp3', '2vo.mp3', '3ghala.mp3', '4zoksa.mp3', '5ergoh.mp3',
      '6soohinrpmy.mp3', '7zowy.mp3', '8ei.mp3', '9samyo.mp3',
      'correct.wav', 'wrong.wav', 'victory.wav', 'chest.wav'
    ];

    const isSub = (typeof window !== 'undefined' && window.location.pathname && window.location.pathname.includes('/admin/'));
    const prefix = isSub ? '../assets/sounds/' : 'assets/sounds/';

    localSounds.forEach(fn => {
      const src = prefix + fn;
      if (!this._soundFileCache.has(fn)) {
        try {
          const a = new Audio();
          a.preload = 'auto';
          a.src = src;
          this._soundFileCache.set(fn, a);
          this._soundFileCache.set(src, a);
          this._soundFileCache.set(fn.replace(/\.(mp3|wav)$/i, ''), a);
        } catch(_) {}
      }

      if (this.ctx && !this._audioBufferCache.has(fn)) {
        fetch(src)
          .then(r => r.ok ? r.arrayBuffer() : null)
          .then(buf => (buf && this.ctx) ? this.ctx.decodeAudioData(buf) : null)
          .then(decoded => {
            if (decoded) {
              this._audioBufferCache.set(fn, decoded);
              this._audioBufferCache.set(src, decoded);
              this._audioBufferCache.set(fn.replace(/\.(mp3|wav)$/i, ''), decoded);
            }
          })
          .catch(() => {});
      }
    });
  }

  resolveAudioCandidates(input){
    if(!input) return [];
    const raw = String(input).trim();
    if(!raw) return [];

    const audioMap = (typeof LOCAL_AUDIO_MAP !== 'undefined') ? LOCAL_AUDIO_MAP : {
      '1': '1alfa.mp3', 'alfa': '1alfa.mp3', '1alfa': '1alfa.mp3', 'ألفا': '1alfa.mp3', 'الفا': '1alfa.mp3', 'Ⲁ': '1alfa.mp3', 'ⲁ': '1alfa.mp3',
      '2': '2veta.mp3', 'veta': '2veta.mp3', '2veta': '2veta.mp3', 'vida': '2veta.mp3', 'فيدا': '2veta.mp3', 'بيتا': '2veta.mp3', 'ڤيتا': '2veta.mp3', 'ڤيتا (بيتا)': '2veta.mp3', 'Ⲃ': '2veta.mp3', 'ⲃ': '2veta.mp3',
      '3': '3ghamma.mp3', 'ghamma': '3ghamma.mp3', '3ghamma': '3ghamma.mp3', 'غاما': '3ghamma.mp3', 'غما': '3ghamma.mp3', 'Ⲅ': '3ghamma.mp3', 'ⲅ': '3ghamma.mp3',
      '4': '4delta.mp3', 'delta': '4delta.mp3', '4delta': '4delta.mp3', 'دلدا': '4delta.mp3', 'دلتا': '4delta.mp3', 'Ⲇ': '4delta.mp3', 'ⲇ': '4delta.mp3',
      '5': '5ei.mp3', 'ei': '5ei.mp3', '5ei': '5ei.mp3', 'إي': '5ei.mp3', 'اي': '5ei.mp3', 'Ⲉ': '5ei.mp3', 'ⲉ': '5ei.mp3',
      '6': '6sow.mp3', 'sow': '6sow.mp3', '6sow': '6sow.mp3', 'سو': '6sow.mp3', 'Ⲋ': '6sow.mp3', 'ⲋ': '6sow.mp3',
      '7': '7zeta.mp3', 'zeta': '7zeta.mp3', '7zeta': '7zeta.mp3', 'زيتا': '7zeta.mp3', 'زاتا': '7zeta.mp3', 'Ⲍ': '7zeta.mp3', 'ⲍ': '7zeta.mp3',
      '8': '8eta.mp3', 'eta': '8eta.mp3', '8eta': '8eta.mp3', 'إيتا': '8eta.mp3', 'ايتا': '8eta.mp3', 'هيتا': '8eta.mp3', 'Ⲏ': '8eta.mp3', 'ⲏ': '8eta.mp3',
      '9': '9seta.mp3', 'seta': '9seta.mp3', '9seta': '9seta.mp3', 'ثيتا': '9seta.mp3', 'سيتا': '9seta.mp3', 'Ⲑ': '9seta.mp3', 'ⲑ': '9seta.mp3',
      '10': '10yota.mp3', 'yota': '10yota.mp3', '10yota': '10yota.mp3', 'يوطا': '10yota.mp3', 'يوتا': '10yota.mp3', 'إيوتا': '10yota.mp3', 'Ⲓ': '10yota.mp3', 'ⲓ': '10yota.mp3',
      '11': '11kapa.mp3', 'kapa': '11kapa.mp3', '11kapa': '11kapa.mp3', 'كابا': '11kapa.mp3', 'كبا': '11kapa.mp3', 'Ⲕ': '11kapa.mp3', 'ⲕ': '11kapa.mp3',
      '12': '12lavla.mp3', 'lavla': '12lavla.mp3', '12lavla': '12lavla.mp3', 'لافلا': '12lavla.mp3', 'لولا': '12lavla.mp3', 'لابدا': '12lavla.mp3', 'Ⲗ': '12lavla.mp3', 'ⲗ': '12lavla.mp3',
      '13': '13mi.mp3', 'mi': '13mi.mp3', '13mi': '13mi.mp3', 'مي': '13mi.mp3', 'Ⲙ': '13mi.mp3', 'ⲙ': '13mi.mp3',
      '14': '14ni.mp3', 'ni': '14ni.mp3', '14ni': '14ni.mp3', 'ني': '14ni.mp3', 'Ⲛ': '14ni.mp3', 'ⲛ': '14ni.mp3',
      '15': '15axsy.mp3', 'axsy': '15axsy.mp3', '15axsy': '15axsy.mp3', 'إكسي': '15axsy.mp3', 'اكسي': '15axsy.mp3', 'كسي': '15axsy.mp3', 'Ⲝ': '15axsy.mp3', 'ⲝ': '15axsy.mp3',
      '16': '16oo.mp3', '16oo': '16oo.mp3', 'أو القصيرة': '16oo.mp3', 'او': '16oo.mp3', 'Ⲟ': '16oo.mp3', 'ⲟ': '16oo.mp3',
      '17': '17pee.mp3', 'pee': '17pee.mp3', '17pee': '17pee.mp3', 'بي': '17pee.mp3', 'Ⲡ': '17pee.mp3', 'ⲡ': '17pee.mp3',
      '18': '18roo.mp3', 'roo': '18roo.mp3', '18roo': '18roo.mp3', 'رو': '18roo.mp3', 'Ⲣ': '18roo.mp3', 'ⲣ': '18roo.mp3',
      '19': '19sema.mp3', 'sema': '19sema.mp3', '19sema': '19sema.mp3', 'سيما': '19sema.mp3', 'Ⲥ': '19sema.mp3', 'ⲥ': '19sema.mp3',
      '20': '20tav.mp3', 'tav': '20tav.mp3', '20tav': '20tav.mp3', 'تاف': '20tav.mp3', 'Ⲧ': '20tav.mp3', 'ⲧ': '20tav.mp3',
      '21': '21epselon.mp3', 'epselon': '21epselon.mp3', '21epselon': '21epselon.mp3', 'إبسيلون': '21epselon.mp3', 'ابسلون': '21epselon.mp3', 'Ⲩ': '21epselon.mp3', 'ⲩ': '21epselon.mp3',
      '22': '22fi.mp3', 'fi': '22fi.mp3', '22fi': '22fi.mp3', 'في': '22fi.mp3', 'Ⲫ': '22fi.mp3', 'ⲫ': '22fi.mp3',
      '23': '23ki.mp3', 'ki': '23ki.mp3', '23ki': '23ki.mp3', 'خي': '23ki.mp3', 'كي': '23ki.mp3', 'Ⲭ': '23ki.mp3', 'ⲭ': '23ki.mp3',
      '24': '24psi.mp3', 'psi': '24psi.mp3', '24psi': '24psi.mp3', 'إبسي': '24psi.mp3', 'بسي': '24psi.mp3', 'Ⲯ': '24psi.mp3', 'ⲯ': '24psi.mp3',
      '25': '25oo.mp3', '25oo': '25oo.mp3', 'أوميغا': '25oo.mp3', 'اوميجا': '25oo.mp3', 'أو الطويلة': '25oo.mp3', 'Ⲱ': '25oo.mp3', 'ⲱ': '25oo.mp3',
      '26': '26shay.mp3', 'shay': '26shay.mp3', '26shay': '26shay.mp3', 'شاي': '26shay.mp3', 'Ϣ': '26shay.mp3', 'ϣ': '26shay.mp3',
      '27': '27fay.mp3', 'fay': '27fay.mp3', '27fay': '27fay.mp3', 'فاي': '27fay.mp3', 'Ϥ': '27fay.mp3', 'ϥ': '27fay.mp3',
      '28': '28khay.mp3', 'khay': '28khay.mp3', '28khay': '28khay.mp3', 'خاي': '28khay.mp3', 'Ϧ': '28khay.mp3', 'ϧ': '28khay.mp3',
      '29': '29hory.mp3', 'hory': '29hory.mp3', '29hory': '29hory.mp3', 'هوري': '29hory.mp3', 'Ϩ': '29hory.mp3', 'ϩ': '29hory.mp3',
      '30': '30ganga.mp3', 'ganga': '30ganga.mp3', '30ganga': '30ganga.mp3', 'جانجا': '30ganga.mp3', 'Ϫ': '30ganga.mp3', 'ϫ': '30ganga.mp3',
      '31': '31chema.mp3', 'chema': '31chema.mp3', '31chema': '31chema.mp3', 'تشيما': '31chema.mp3', 'Ϭ': '31chema.mp3', 'ϭ': '31chema.mp3',
      '32': '32tee.mp3', 'tee': '32tee.mp3', '32tee': '32tee.mp3', 'تي': '32tee.mp3', 'Ϯ': '32tee.mp3', 'ϯ': '32tee.mp3',
      'alom': '1alom.mp3', '1alom': '1alom.mp3', 'ⲁⲗⲱⲙ': '1alom.mp3', 'آلوم': '1alom.mp3',
      'vo': '2vo.mp3', '2vo': '2vo.mp3', 'ⲃⲱ': '2vo.mp3', 'ڤو': '2vo.mp3',
      'ghala': '3ghala.mp3', '3ghala': '3ghala.mp3', 'ⲅⲁⲗⲁ': '3ghala.mp3', 'غالا': '3ghala.mp3',
      'zoksa': '4zoksa.mp3', '4zoksa': '4zoksa.mp3', 'Ⲇⲟⲝⲁ': '4zoksa.mp3', 'ذوكسا': '4zoksa.mp3',
      'ergoh': '5ergoh.mp3', '5ergoh': '5ergoh.mp3', 'ⲉ̀ⲣϣⲱ': '5ergoh.mp3', 'إرجو': '5ergoh.mp3',
      'soohinrpmy': '6soohinrpmy.mp3', '6soohinrpmy': '6soohinrpmy.mp3', 'ⲋ̅ ⲛ̀ⲣⲱⲙⲓ': '6soohinrpmy.mp3', 'سوآوو إن رومي': '6soohinrpmy.mp3',
      'zowy': '7zowy.mp3', '7zowy': '7zowy.mp3', 'Ⲍⲱⲏ': '7zowy.mp3', 'زوي': '7zowy.mp3',
      '8ei': '8ei.mp3', 'Ⲏⲓ': '8ei.mp3', 'بيت': '8ei.mp3',
      'samyo': '9samyo.mp3', '9samyo': '9samyo.mp3', 'Ⲑⲁⲙⲓⲟ': '9samyo.mp3', 'ثاميو': '9samyo.mp3',
      'chest': 'chest.mp3', 'correct': 'correct.mp3', 'victory': 'victory.mp3', 'wrong': 'wrong.mp3'
    };

    const rawClean = raw.toLowerCase().replace(/\.mp3$/i, '');
    const mapped = audioMap[raw] || audioMap[rawClean];
    const filename = mapped || raw.split('/').pop().split('\\').pop();

    // 1. الأولوية القصوى للملفات الصوتية المحلية المباشرة
    if(mapped || /\.(mp3|wav|ogg|m4a|aac|webm)$/i.test(raw)){
      const candidates = [];
      if (raw.startsWith('assets/') || raw.startsWith('audio_coptic/') || raw.startsWith('./') || raw.startsWith('../')) {
        candidates.push(raw);
      }
      candidates.push(`assets/sounds/${filename}`);
      candidates.push(`audio_coptic/${filename}`);
      candidates.push(`../assets/sounds/${filename}`);
      candidates.push(`../audio_coptic/${filename}`);
      candidates.push(raw);
      return Array.from(new Set(candidates));
    }

    // 2. Google Drive
    const gdMatch = raw.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^&]*&)*id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{20,})/i);
    if(gdMatch && gdMatch[1]){
      const id = gdMatch[1];
      return [
        `https://drive.usercontent.google.com/download?id=${id}&export=download`,
        `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0`,
        `https://lh3.googleusercontent.com/d/${id}`,
        `https://docs.google.com/uc?export=download&id=${id}`,
        `https://drive.google.com/uc?id=${id}&export=download`,
        raw
      ];
    }

    // 3. Dropbox
    if(/dropbox\.com/i.test(raw)){
      let u = raw.replace(/\?dl=0/i, '').replace(/&dl=0/i, '');
      u = u.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      return [u, raw.includes('?') ? `${raw}&raw=1` : `${raw}?raw=1`, raw];
    }

    // 4. ملفات أخرى أو روابط كاملة
    if(/^https?:\/\/|^data:audio/i.test(raw)){
      return [raw];
    }

    return [
      `audio_coptic/${filename}`,
      `assets/sounds/${filename}`,
      `../audio_coptic/${filename}`,
      `../assets/sounds/${filename}`,
      raw
    ];
  }

  async playAudio(urlOrText){
    const cleanPrimary = String(urlOrText || '').trim();
    if(!cleanPrimary) return false;

    // إيقاف أي صوت شغال
    if(this._currentSourceNode){
      try { this._currentSourceNode.stop(); } catch(e){}
      this._currentSourceNode = null;
    }
    if(this._activeAudio){
      try { this._activeAudio.pause(); this._activeAudio.currentTime = 0; } catch(e){}
      this._activeAudio = null;
    }

    this._init();
    if(this.ctx && this.ctx.state === 'suspended'){
      try { await this.ctx.resume(); } catch(e){}
    }

    const isUrl = /^https?:\/\/|^data:audio|\.(mp3|wav|ogg|m4a|aac|webm)(\?|$)/i.test(cleanPrimary) || cleanPrimary.startsWith('audio/') || /drive\.google\.com|dropbox\.com|1drv\.ms|docs\.google\.com|supabase\.co/i.test(cleanPrimary);

    if(!isUrl){
      return false;
    }

    // 1. إذا كان الصوت مخزناً في كاش Web Audio فائق السرعة (0ms)
    const cachedBuf = this._audioBufferCache.get(cleanPrimary) || this._audioBufferCache.get(filename);
    if(cachedBuf && this.ctx){
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = cachedBuf;
        source.connect(this.ctx.destination);
        source.start(0);
        this._currentSourceNode = source;
        return true;
      } catch(e){}
    }

    // 1.5. إذا كان الصوت في كاش عناصر HTML5 Audio مسبق التحميل (0ms)
    const cachedAudio = this._soundFileCache.get(cleanPrimary) || this._soundFileCache.get(filename);
    if(cachedAudio){
      try {
        cachedAudio.currentTime = 0;
        this._activeAudio = cachedAudio;
        const p = cachedAudio.play();
        if(p !== undefined) p.catch(() => {});
        return true;
      } catch(e){}
    }

    const candidates = this.resolveAudioCandidates(cleanPrimary);

    // 2. المحاولة عبر Web Audio API (أدق وأعلى نقاء وموثوقية)
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const resp = await fetch(candidateUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if(resp.ok){
          const arrayBuffer = await resp.arrayBuffer();
          if(arrayBuffer && arrayBuffer.byteLength > 100 && this.ctx){
            const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
            this._audioBufferCache.set(cleanPrimary, audioBuffer);
            const source = this.ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.ctx.destination);
            source.start(0);
            this._currentSourceNode = source;
            return true;
          }
        }
      } catch(err){}
    }

    // 3. المحاولة عبر HTML5 Audio
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      const ok = await new Promise((resolve) => {
        let done = false;
        const a = new Audio();
        this._activeAudio = a;

        const finishOk = () => {
          if(!done){
            done = true;
            resolve(true);
          }
        };
        const finishFail = () => {
          if(!done){
            done = true;
            resolve(false);
          }
        };

        a.addEventListener('playing', finishOk, { once: true });
        a.addEventListener('error', finishFail, { once: true });

        try {
          a.src = candidateUrl;
          const p = a.play();
          if(p !== undefined) p.then(finishOk).catch(finishFail);
        } catch(err){
          finishFail();
        }

        setTimeout(() => {
          if(!done){
            done = true;
            resolve(false);
          }
        }, 1200);
      });

      if(ok) return true;
    }

    return false;
  }

  async playChallengeAudio(audioUrl, audioText) {
    this.unlock();
    const cleanUrl = String(audioUrl || '').trim();
    if (cleanUrl) {
      try {
        const ok = await this.playAudio(cleanUrl);
        if (ok) return true;
      } catch(e){}
    }
    const textToSpeak = String(audioText || '').trim();
    if (textToSpeak) {
      try {
        const ok = await this.playAudio(textToSpeak);
        if (ok) return true;
      } catch(e){}
      return this.speakArabic(textToSpeak);
    }
    return false;
  }

  speakArabic(text){
    if(!text) return false;
    const clean = String(text).trim();
    if(!clean) return false;

    // استخدام محرك النطق الصوتي للمتصفح (SpeechSynthesis) لتفادي أخطاء 404 الناتجة عن خدمات خارجية معطلة
    try {
      if(!('speechSynthesis' in window)) return false;
      const synth = window.speechSynthesis;
      if(synth.paused) synth.resume();
      synth.cancel();

      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 0.90;
      utter.pitch = 1.0;
      utter.volume = 1.0;

      const voices = synth.getVoices ? synth.getVoices() : [];
      if(voices && voices.length > 0){
        const arVoice = voices.find(v => v.lang && (v.lang.startsWith('ar') || v.lang.includes('Arabic'))) ||
                        voices.find(v => v.name && (v.name.includes('Arabic') || v.name.includes('عربي') || v.name.includes('Hoda') || v.name.includes('Salma') || v.name.includes('Tarik') || v.name.includes('Maged') || v.name.includes('Laila')));
        if(arVoice){
          utter.voice = arVoice;
          utter.lang = arVoice.lang;
        } else {
          utter.lang = 'ar-EG';
        }
      } else {
        utter.lang = 'ar-EG';
      }

      synth.speak(utter);
      return true;
    } catch(err){
      console.warn('Speech synthesis error:', err);
      return false;
    }
  }
}

const Sound = new SoundEffects();
if (typeof window !== 'undefined') {
  window.Sound = Sound;
  window.SoundEffects = Sound;
  window.playUniversalAudio = (url, fallback) => Sound.playAudio(url, fallback);
  window.playChallengeAudio = (url, text, btn) => {
    if(btn){
      btn.classList.add('is-playing');
      setTimeout(() => btn.classList.remove('is-playing'), 1200);
    }
    return Sound.playChallengeAudio(url, text);
  };
  if('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined){
    window.speechSynthesis.onvoiceschanged = () => {
      try { window.speechSynthesis.getVoices(); } catch(e){}
    };
  }
  // تفعيل الصوت وفك قفل Web Audio API وتفعيل صوت النقر (Tactile Click) لجميع الأزرار التفاعلية
  let _lastClickSoundTime = 0;
  const _interactiveSelector = [
    'button',
    '.btn',
    '.choice-btn',
    '.option-card',
    '.lesson-node-btn',
    '.mystery-chest-btn',
    '.nav-btn',
    '.tab-btn',
    '.coptic-swal-confirm',
    '.coptic-swal-cancel',
    'a.btn',
    '.quiz-opt-btn',
    '.user-chip',
    '.word-tile',
    '.coptic-key',
    '.settings-card',
    '.swal2-confirm',
    '.swal2-cancel',
    '.bottom-nav-item',
    '.trophy-node-btn',
    '[role="button"]'
  ].join(', ');

  const _handleGlobalInteraction = (e) => {
    Sound.unlock();
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    // تم إلغاء صوت النقر تماماً
  };

  const _evtTypes = window.PointerEvent ? ['pointerdown'] : ['touchstart', 'mousedown'];
  _evtTypes.forEach(evt => {
    window.addEventListener(evt, _handleGlobalInteraction, { passive: true, capture: true });
  });
}

/* ============================================================
   خدمات المستخدم والتقدم (User & Progress Services)
   ============================================================ */
class GamificationService {
  constructor(){
    this.sound = Sound;
    this.channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mg_coptic_gamification_sync') : null;
    this.listeners = [];
    this.initRealtimeSync();
  }

  // تسجيل مستمع للتحديثات الفورية عبر التبويبات والصفحات
  onUpdate(callback){
    if(typeof callback === 'function'){
      this.listeners.push(callback);
    }
  }

  // بث إشعار بالتحديثات لجميع الصفحات المفتوحة واللوحة فورياً
  broadcastUpdate(type, payload = {}){
    const message = { type, payload, timestamp: Date.now() };
    if(this.channel){
      try { this.channel.postMessage(message); } catch(e){}
    }
    try {
      localStorage.setItem('mg_coptic_sync_ping', Date.now().toString());
    } catch(e){}
    if(typeof window !== 'undefined'){
      window.dispatchEvent(new CustomEvent('mg_coptic_sync', { detail: message }));
    }
    this.listeners.forEach(fn => {
      try { fn(type, payload); } catch(e){ console.warn('Listener error:', e); }
    });
  }

  // تهيئة الاستماع الفوري
  initRealtimeSync(){
    let progressDebounceTimer = null;

    if(this.channel){
      this.channel.onmessage = (e) => {
        const data = e.data || {};
        if(data.type === 'full_account_reset'){
          const curUser = this.getCurrentUser();
          const curUid = curUser?.id;
          const targetUid = data.payload?.user_id;
          if(!targetUid || (curUid && curUid === targetUid)){
            const uidToClear = targetUid || curUid;
            if(uidToClear){
              localStorage.removeItem(`mg_coptic_progress_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_lesson_progress_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_claimed_chests_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_badges_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_daily_goal_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_daily_xp_date_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_daily_xp_val_${uidToClear}`);
              localStorage.removeItem(`mg_coptic_last_synced_date_${uidToClear}`);
            }
            localStorage.removeItem('mg_coptic_lesson_progress');
            localStorage.removeItem('mg_coptic_claimed_chests');
            localStorage.removeItem('mg_coptic_badges');
            localStorage.removeItem('mg_coptic_daily_xp_date');
            localStorage.removeItem('mg_coptic_daily_xp_val');

            const resetProg = {
              user_id: uidToClear,
              points: 0,
              total_points: 0,
              hearts: 5,
              streak_days: 1,
              claimed_chests: [],
              last_active_date: new Date().toISOString().split('T')[0]
            };
            this.saveProgressLocal(resetProg, uidToClear, false);

            const initialLp = { '1': { status: 'in_progress', score: 0 } };
            if(uidToClear) localStorage.setItem(`mg_coptic_lesson_progress_${uidToClear}`, JSON.stringify(initialLp));
            localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(initialLp));

            if(typeof window !== 'undefined'){
              if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(resetProg);
              if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
              if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
              if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
            }
          }
        } else if(data.type === 'progress_remote' || data.type === 'progress_admin_update'){
          const curUser = this.getCurrentUser();
          const curUid = curUser?.id;
          if(curUid && data.payload?.user_id === curUid){
            if(progressDebounceTimer) clearTimeout(progressDebounceTimer);
            progressDebounceTimer = setTimeout(() => {
              this.getProgress(curUid, false).then(fresh => {
                if(typeof window !== 'undefined'){
                  if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
                  if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                  if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
                }
              });
            }, 600);
          }
        } else if(data.type === 'curriculum_updated'){
          if(typeof window !== 'undefined'){
            if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
            if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
          }
        }
        this.listeners.forEach(fn => {
          try { fn(data.type, data.payload); } catch(err){}
        });
      };
    }
    if(typeof window !== 'undefined'){
      let storageDebounceTimer = null;
      window.addEventListener('storage', (e) => {
        if(e.key === 'mg_coptic_curriculum_v2' || e.key === 'mg_coptic_game_settings'){
          const curUser = this.getCurrentUser();
          const curUid = curUser?.id;
          if(storageDebounceTimer) clearTimeout(storageDebounceTimer);
          storageDebounceTimer = setTimeout(() => {
            this.getProgress(curUid, false).then(fresh => {
              if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
              if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
              if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
            });
            this.listeners.forEach(fn => {
              try { fn(e.key, null); } catch(err){}
            });
          }, 800);
        }
      });
    }

    // الاشتراك في تحديثات Supabase Realtime إن توفر العميل
    if(sbClient && typeof sbClient.channel === 'function'){
      try {
        let rtProgressDebounce = null;
        sbClient.channel('gamification-realtime-sync')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'levels' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'units' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'lessons' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'challenges' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'chests' }, () => {
            this.getCurriculum(true).then(c => this.broadcastUpdate('curriculum', c));
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, (payload) => {
            const curUser = this.getCurrentUser();
            const curUid = curUser?.id;
            const updatedUid = payload?.new?.user_id || payload?.old?.user_id;
            if(curUid && updatedUid && curUid === updatedUid){
              if(rtProgressDebounce) clearTimeout(rtProgressDebounce);
              rtProgressDebounce = setTimeout(() => {
                const newResetVer = Number(payload?.new?.reset_version || 0);
                const oldResetVer = Number(payload?.old?.reset_version || 0);
                const rawLocalReset = localStorage.getItem(`mg_coptic_reset_version_${curUid}`);
                const localResetVer = Number(rawLocalReset || 0);
                const isExplicitReset = (rawLocalReset !== null && newResetVer > oldResetVer && newResetVer > localResetVer && localResetVer > 0);
                this.getProgress(curUid, isExplicitReset).then(fresh => {
                  if(typeof window !== 'undefined'){
                    if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
                    if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                    if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
                  }
                });
                if(isExplicitReset){
                  this.getLessonProgress(curUid, true).then(() => {
                    if(typeof window !== 'undefined' && typeof window.renderSkillMap === 'function'){
                      window.renderSkillMap();
                    }
                  });
                }
              }, 400);
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'user_lesson_progress' }, (payload) => {
            const curUser = this.getCurrentUser();
            const curUid = curUser?.id;
            const updatedUid = payload?.new?.user_id || payload?.old?.user_id;
            if(curUid && updatedUid && curUid === updatedUid){
              this.getLessonProgress(curUid, true).then(() => {
                if(typeof window !== 'undefined'){
                  if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
                  if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                }
              });
            }
          })
          .subscribe();
      } catch(e){
        console.warn('Realtime subscription warning:', e);
      }
    }
  }

  // إعدادات نطاق القلوب ونقاط الـ XP المشتركة
  getGameSettings(){
    try {
      const raw = localStorage.getItem(MG_CONFIG.STORAGE_KEYS.SETTINGS);
      if(raw) return JSON.parse(raw);
    } catch(e){}
    return {
      max_hearts: 5,
      heart_cost_xp: 15,
      default_challenge_xp: 1,
      default_lesson_xp: 25,
      default_level_xp: 140
    };
  }

  saveGameSettings(settings){
    const current = this.getGameSettings();
    const updated = { ...current, ...settings };
    try {
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch(e){}
    this.broadcastUpdate('settings', updated);
    return updated;
  }

  // فحص هل المستخدم مسجل حالياً من الكاش المحلي السريع
  getCurrentUser(){
    try {
      const raw = localStorage.getItem(MG_CONFIG.STORAGE_KEYS.USER);
      if(raw) return JSON.parse(raw);
    } catch(e){}
    return null;
  }

  // التحقق الحقيقي من جلسة Supabase Auth وجلب بيانات البروفايل دون مسح الكاش قسرياً
  async getCurrentUserAsync(){
    if(!sbClient) return this.getCurrentUser();
    try {
      let activeSession = null;
      const { data: { session }, error: sErr } = await sbClient.auth.getSession();
      if (session && session.user) {
        activeSession = session;
      } else {
        // محاولة تجديد الجلسة تلقائياً في حال انتهاء صلاحية التوكن
        const rawToken = localStorage.getItem('mg_coptic_student_auth_token');
        if (rawToken) {
          try {
            const parsed = JSON.parse(rawToken);
            if (parsed && parsed.refresh_token) {
              const { data: refData } = await sbClient.auth.refreshSession({ refresh_token: parsed.refresh_token });
              if (refData && refData.session) {
                activeSession = refData.session;
                try { localStorage.setItem('mg_coptic_student_auth_token', JSON.stringify(refData.session)); } catch (_) {}
              }
            }
          } catch (_) {}
        }
      }

      if(!activeSession || !activeSession.user){
        // لا نحذف الكاش المحلي لمنع تسجيل خروج المستخدم تلقائياً عند انقطاع الاتصال أو تحديث الصفحة
        return this.getCurrentUser();
      }
      const authUser = activeSession.user;
      const { data: profile } = await sbClient.from('users').select('*').eq('id', authUser.id).maybeSingle();
      const userObj = {
        id: authUser.id,
        email: authUser.email,
        full_name: (profile && profile.full_name) ? profile.full_name : (authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'بطل قبطي'),
        age: (profile && profile.age) ? profile.age : (authUser.user_metadata?.age || 15),
        avatar_url: (profile && profile.avatar_url) ? profile.avatar_url : (localStorage.getItem('mg_coptic_user.avatar_url') || ''),
        role: (profile && profile.role) ? profile.role : 'student'
      };
      this.saveUserLocal(userObj);
      return userObj;
    } catch(err){
      console.warn('getCurrentUserAsync error:', err);
      return this.getCurrentUser();
    }
  }

  // التأكد من توفر مستخدم (إذا لم يوجد مستخدم مسجل يرجع null حتى تطلب الواجهة منه تسجيل الدخول)
  ensureCurrentUser(){
    return this.getCurrentUser();
  }

  // فحص هل تم فتح صندوق كنز معين للمستخدم الحالي
  isChestClaimed(chestId, userId = null){
    const uid = userId || this.getCurrentUser()?.id;
    try {
      let list = [];
      if (uid) {
        const userRaw = localStorage.getItem(`mg_coptic_claimed_chests_${uid}`);
        if (userRaw !== null) {
          list = JSON.parse(userRaw);
        } else {
          const prog = this.getProgressSync ? this.getProgressSync(uid) : null;
          if (prog && Array.isArray(prog.claimed_chests)) {
            list = prog.claimed_chests;
          } else {
            list = [];
          }
        }
      } else {
        const raw = localStorage.getItem('mg_coptic_claimed_chests');
        list = raw ? JSON.parse(raw) : [];
      }
      return Array.isArray(list) && list.includes(String(chestId));
    } catch(e){ return false; }
  }

  // فحص شارات المستخدم المستلمة من الصناديق والتحديات
  getUserBadges(userId = null){
    const uid = userId || this.getCurrentUser()?.id;
    try {
      const key = uid ? `mg_coptic_badges_${uid}` : 'mg_coptic_badges';
      const raw = localStorage.getItem(key) || localStorage.getItem('mg_coptic_badges');
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      return [];
    }
  }

  // فتح صندوق الكنز وحفظه سحابياً في Supabase لحساب المستخدم عبر RPC الذرية الآمنة
  async claimChest(userId, chestId, xpReward = 30, heartsReward = 1, badgeReward = null){
    try {
      const uid = userId || this.getCurrentUser()?.id;
      const cleanChestId = String(chestId).trim();

      // فحص سريع محلي (UX Guard)
      if (this.isChestClaimed(cleanChestId, uid)) {
        return false;
      }

      let rpcHandled = false;

      if (sbClient && uid) {
        try {
          const { data, error } = await sbClient.rpc('claim_treasure_chest', {
            p_chest_id: cleanChestId
          });

          if (!error && data) {
            rpcHandled = true;
            // إذا كان الصندوق مفتوحاً مسبقاً في السيرفر، يتم مزامنة القائمة ورفض منح الجائزة
            if (data.already_claimed || !data.success) {
              const currentList = Array.isArray(data.claimed_chests) ? data.claimed_chests : [];
              if (uid) localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(currentList));
              localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(currentList));
              return false;
            }

            // اعتماد قيم السيرفر الحقيقية والموثوقة
            const currentList = Array.isArray(data.claimed_chests) ? data.claimed_chests : [];
            if (uid) localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(currentList));
            localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(currentList));

            const curProg = this.getProgressLocal(uid) || {};
            curProg.points = Number(data.points ?? curProg.points ?? 0);
            curProg.total_points = curProg.points;
            curProg.hearts = Number(data.hearts ?? curProg.hearts ?? 5);
            curProg.claimed_chests = currentList;
            this.saveProgressLocal(curProg, uid);
          } else if (error) {
            console.warn('claim_treasure_chest RPC error:', error);
            if (error.message && error.message.includes('مفتوح مسبقاً')) {
              return false;
            }
          }
        } catch (rpcErr) {
          console.warn('claim_treasure_chest RPC call failed:', rpcErr);
        }
      }

      // احتياطي غير متصل (Offline Fallback) فقط عند تعذر اتصال السيرفر
      if (!rpcHandled) {
        const key = uid ? `mg_coptic_claimed_chests_${uid}` : 'mg_coptic_claimed_chests';
        const raw = localStorage.getItem(key) || localStorage.getItem('mg_coptic_claimed_chests');
        let list = raw ? JSON.parse(raw) : [];
        if (list.includes(cleanChestId)) {
          return false;
        }
        list.push(cleanChestId);
        if (uid) localStorage.setItem(key, JSON.stringify(list));
        localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(list));
        await this.updateProgress(uid, { addPoints: xpReward, addHearts: heartsReward, claimed_chests: list });
      }

      // حفظ الشارة إن وُجدت
      if (badgeReward && (badgeReward.title || badgeReward.badge_title)) {
        try {
          const bTitle = badgeReward.title || badgeReward.badge_title;
          const bIcon = badgeReward.icon || badgeReward.badge_icon || '🏆';
          const bDesc = badgeReward.description || badgeReward.badge_desc || '';
          const badgeKey = uid ? `mg_coptic_badges_${uid}` : 'mg_coptic_badges';
          const rawBadges = localStorage.getItem(badgeKey) || localStorage.getItem('mg_coptic_badges') || '[]';
          let badgesList = JSON.parse(rawBadges);
          const alreadyHas = badgesList.some(b => (b.id === badgeReward.id || b.title === bTitle));
          if (!alreadyHas) {
            badgesList.push({
              id: badgeReward.id || `badge_${Date.now()}`,
              title: bTitle,
              icon: bIcon,
              description: bDesc,
              unlocked_at: new Date().toISOString()
            });
            if (uid) localStorage.setItem(badgeKey, JSON.stringify(badgesList));
            localStorage.setItem('mg_coptic_badges', JSON.stringify(badgesList));
          }
        } catch (bErr) {
          console.warn('Saving chest badge error:', bErr);
        }
      }

      this.sound.playChestReward();
      return true;
    } catch (e) {
      return false;
    }
  }

  // حفظ بيانات المستخدم محلياً كـ cache لحسابه
  saveUserLocal(user){
    try {
      if(user){
        localStorage.setItem(MG_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
        if(user.id) localStorage.setItem(`mg_coptic_user_${user.id}`, JSON.stringify(user));
      } else {
        localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.USER);
      }
    } catch(e){}
  }

  // تسجيل حساب جديد عبر Supabase Auth الحقيقي
  async createUser(fullName, age, email, password){
    if(!sbClient) throw new Error('Supabase غير متوفر');
    const cleanName = String(fullName || '').trim();
    const cleanAge = parseInt(age, 10) || 15;
    const cleanEmail = String(email || '').trim().toLowerCase();

    const { data, error } = await sbClient.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: {
          full_name: cleanName,
          age: cleanAge
        }
      }
    });

    if(error) throw error;
    if(data && (data.user || data.session)){
      const user = data.user || data.session?.user;
      const userObj = {
        id: user.id,
        email: cleanEmail,
        full_name: cleanName,
        age: cleanAge,
        avatar_url: '',
        role: 'student'
      };
      this.saveUserLocal(userObj);
      return userObj;
    }
    return null;
  }

  // تسجيل الخروج ومسح بيانات الجلسة السابقة مع الاحتفاظ بالتقدم المخزن
  async signOut(){
    if(sbClient){
      try {
        await sbClient.auth.signOut();
      } catch(e){}
    }
    try {
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.USER);
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      localStorage.removeItem('mg_coptic_student_auth_token');
      localStorage.removeItem('mg_coptic_claimed_chests');
      // ملاحظة: نحتفظ بكاش المستخدم الخاص mg_coptic_progress_${uid} و mg_coptic_lesson_progress_${uid}
      // لمنع فقدان البيانات عند العودة للدخول لاحقاً
    } catch(e){}
  }

  // قراءة فورية متزامنة (0 ميلي ثانية) لبيانات التقدم المخزنة محلياً
  getProgressLocal(userId = null){
    const uid = userId || this.getCurrentUser()?.id;
    const userKey = uid ? `mg_coptic_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.PROGRESS;
    try {
      const raw = localStorage.getItem(userKey) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      if(raw){
        const parsed = JSON.parse(raw);
        const resultProg = {
          user_id: uid,
          points: parsed.points ?? parsed.total_points ?? 0,
          total_points: parsed.points ?? parsed.total_points ?? 0,
          hearts: parsed.hearts ?? 5,
          streak_days: parsed.streak_days ?? parsed.streak ?? 1,
          last_active_date: parsed.last_active_date || new Date().toISOString().split('T')[0],
          claimed_chests: parsed.claimed_chests || []
        };
        return this.checkAndRegenerateHearts(resultProg, uid);
      }
    } catch(e){}
    return {
      user_id: uid,
      hearts: 5,
      points: 0,
      total_points: 0,
      streak_days: 1,
      last_active_date: new Date().toISOString().split('T')[0],
      claimed_chests: []
    };
  }

  // الحصول على بيانات التقدم (القلوب، النقاط، الستريك) من Supabase لحساب المستخدم
  async getProgress(userId, forceRemote = false){
    const uid = userId || this.getCurrentUser()?.id;
    let progress = null;
    const userKey = uid ? `mg_coptic_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.PROGRESS;

    try {
      const raw = localStorage.getItem(userKey) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      if(raw) progress = JSON.parse(raw);
    } catch(e){}

    // إذا كان التقدم مسجلاً محلياً ولم يُطلب الجلب الإجباري، نرجعه فوراً
    if(progress && !forceRemote){
      return this.checkAndRegenerateHearts(progress, uid);
    }

    if(sbClient && uid){
      try {
        const { data, error } = await sbClient.from('user_progress').select('*').eq('user_id', uid).maybeSingle();
        if(!error && data){
          const serverResetVersion = Number(data.reset_version || 0);
          const rawLocalReset = localStorage.getItem(`mg_coptic_reset_version_${uid}`);
          const hasLocalVersion = (rawLocalReset !== null && rawLocalReset !== undefined);
          const localResetVersion = Number(rawLocalReset || 0);
          const isResetDetected = hasLocalVersion && (serverResetVersion > localResetVersion) && (localResetVersion > 0);

          if (isResetDetected) {
            console.log('[Gamification] Account reset detected from server. Purging local stale cache...');
            this.resetFullAccountLocal(uid);
          }
          localStorage.setItem(`mg_coptic_reset_version_${uid}`, String(serverResetVersion));

          progress = {
            user_id: uid,
            hearts: data.hearts ?? 5,
            points: data.points ?? 0,
            total_points: data.points ?? 0,
            streak_days: data.streak_days ?? 1,
            reset_version: serverResetVersion,
            reset_at: data.reset_at || null,
            last_active_date: data.last_active_date || new Date().toISOString().split('T')[0],
            claimed_chests: data.claimed_chests || []
          };
          if(Array.isArray(data.claimed_chests)){
            localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(data.claimed_chests));
            localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(data.claimed_chests));
          }
          localStorage.setItem(`mg_coptic_reset_version_${uid}`, String(serverResetVersion));
          progress = this.checkAndRegenerateHearts(progress, uid);
          this.saveProgressLocal(progress, uid, false);
        } else if(!data && !error && uid){
          // إنشاء سجل تقدم جديد لهذا المستخدم في السحابة فقط إذا كان uid موجود
          const initialProg = {
            user_id: uid,
            hearts: 5,
            points: 0,
            total_points: 0,
            streak_days: 1,
            last_active_date: new Date().toISOString().split('T')[0],
            claimed_chests: []
          };
          try {
            sbClient.from('user_progress').insert(initialProg).then(()=>{}, ()=>{});
          } catch(_) {}
          progress = initialProg;
          this.saveProgressLocal(progress, uid, false);
        }
      } catch(e){
        console.warn('Fetch progress from Supabase error:', e);
      }
    }

    if(!progress){
      progress = {
        user_id: uid,
        hearts: 5,
        points: 0,
        total_points: 0,
        streak_days: 1,
        last_active_date: new Date().toISOString().split('T')[0],
        claimed_chests: []
      };
      this.saveProgressLocal(progress, uid, false);
    }

    return progress;
  }

  saveProgressLocal(prog, userId = null, broadcast = true){
    try {
      const uid = userId || prog?.user_id || this.getCurrentUser()?.id;
      const normalized = {
        ...prog,
        points: prog?.points ?? prog?.total_points ?? 0,
        total_points: prog?.points ?? prog?.total_points ?? 0,
        hearts: prog?.hearts ?? 5,
        streak_days: prog?.streak_days ?? 1
      };
      if(uid){
        localStorage.setItem(`mg_coptic_progress_${uid}`, JSON.stringify(normalized));
      }
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.PROGRESS, JSON.stringify(normalized));
      if(broadcast){
        this.broadcastUpdate('progress', normalized);
      }
    } catch(e){}
  }

  // تحديث التقدم سحابياً في Supabase لحساب المستخدم
  async updateProgress(userId, updates = {}){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = await this.getProgress(uid);
    if(typeof updates.hearts === 'number') prog.hearts = Math.max(0, updates.hearts);
    if(typeof updates.addPoints === 'number') prog.points = Math.max(0, (prog.points || 0) + updates.addPoints);
    if(typeof updates.addHearts === 'number') prog.hearts = Math.max(0, (prog.hearts ?? 5) + updates.addHearts);
    if(typeof updates.streak_days === 'number') prog.streak_days = updates.streak_days;
    if(Array.isArray(updates.claimed_chests)) prog.claimed_chests = updates.claimed_chests;

    this.saveProgressLocal(prog, uid);

    if(sbClient && uid){
      // مزامنة سحابية غير معطلة في الخلفية
      sbClient.from('user_progress').upsert({
        user_id: uid,
        hearts: prog.hearts,
        points: prog.points,
        streak_days: prog.streak_days,
        last_active_date: prog.last_active_date,
        claimed_chests: prog.claimed_chests || []
      }).then(()=>{}).catch(e => {
        console.warn('Supabase updateProgress error:', e);
      });
    }
    return prog;
  }
  // فحص وإعادة شحن القلوب تلقائياً بمعدل قلب كل 4.8 ساعات (5 قلوب خلال 24 ساعة)
  checkAndRegenerateHearts(prog, uid) {
    if (!prog) return prog;
    const currentHearts = Number(prog.hearts ?? 5);
    const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;

    if (currentHearts >= 5) {
      prog.hearts = 5;
      try { localStorage.removeItem(timerKey); } catch(e){}
      return prog;
    }

    let lastRefill = 0;
    try {
      lastRefill = Number(localStorage.getItem(timerKey) || prog.last_heart_loss_at || 0);
    } catch(e){}

    const now = Date.now();
    if (!lastRefill || isNaN(lastRefill) || lastRefill <= 0) {
      lastRefill = now;
      try { localStorage.setItem(timerKey, String(lastRefill)); } catch(e){}
      prog.last_heart_loss_at = lastRefill;
      return prog;
    }

    const REGEN_PER_HEART = 17280000; // 24 hours / 5 hearts = 4.8 hours = 17,280,000 ms
    const elapsed = now - lastRefill;

    if (elapsed >= REGEN_PER_HEART) {
      const heartsToAdd = Math.min(5 - currentHearts, Math.floor(elapsed / REGEN_PER_HEART));
      if (heartsToAdd > 0) {
        prog.hearts = Math.min(5, currentHearts + heartsToAdd);
        const newLastRefill = lastRefill + (heartsToAdd * REGEN_PER_HEART);
        if (prog.hearts >= 5) {
          try { localStorage.removeItem(timerKey); } catch(e){}
          prog.last_heart_loss_at = null;
        } else {
          try { localStorage.setItem(timerKey, String(newLastRefill)); } catch(e){}
          prog.last_heart_loss_at = newLastRefill;
        }
        this.saveProgressLocal(prog, uid, false);
        if (sbClient && uid) {
          sbClient.from('user_progress').update({ hearts: prog.hearts }).eq('user_id', uid).then(()=>{}, ()=>{});
        }
      }
    }
    return prog;
  }

  // حساب الوقت المتبقي لشحن القلب التالي
  getTimeUntilNextHeart(userId) {
    const uid = userId || this.getCurrentUser()?.id;
    const prog = this.getProgressLocal(uid);
    const hearts = Number(prog?.hearts ?? 5);
    if (hearts >= 5) {
      return { isFull: true, hearts: 5, formatted: 'ممتلئة بالكامل', secondsRemaining: 0 };
    }
    const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;
    let lastRefill = 0;
    try {
      lastRefill = Number(localStorage.getItem(timerKey) || prog?.last_heart_loss_at || 0);
    } catch(e){}
    if (!lastRefill) lastRefill = Date.now();

    const REGEN_PER_HEART = 17280000; // 4.8 hours
    const now = Date.now();
    const elapsed = Math.max(0, now - lastRefill);
    const remainingMs = Math.max(0, REGEN_PER_HEART - (elapsed % REGEN_PER_HEART));
    const totalSeconds = Math.ceil(remainingMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let formatted = '';
    if (hours > 0) {
      formatted = `${hours} ساعة و ${minutes} دقيقة`;
    } else {
      formatted = `${minutes} دقيقة`;
    }

    return {
      isFull: false,
      hearts: hearts,
      secondsRemaining: totalSeconds,
      formatted: formatted,
      fullRefillHours: Math.ceil((5 - hearts) * 4.8)
    };
  }

  // خصم قلب عند الإجابة الخاطئة وبدء مؤقت الشحن
    async loseHeart(userId){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = await this.getProgress(uid);
    const prevHearts = prog.hearts ?? 5;
    prog.hearts = Math.max(0, prevHearts - 1);
    const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;

    if (prog.hearts < 5) {
      let timerVal = Number(localStorage.getItem(timerKey) || 0);
      if (!timerVal || prevHearts >= 5) {
        timerVal = Date.now();
        try { localStorage.setItem(timerKey, String(timerVal)); } catch(e){}
      }
      prog.last_heart_loss_at = timerVal;
    }

    this.saveProgressLocal(prog, uid);

    if(sbClient && uid){
      sbClient.from('user_progress').update({ hearts: prog.hearts }).eq('user_id', uid).then(()=>{}).catch(()=>{});
    }
    return prog;
  }

  // إعادة ملء القلوب إلى 5
    // شراء قلوب بنقاط الـ XP (القلب = 100 XP)
  async buyHeartsWithXp(userId, count = 1, costPerHeart = 100){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = await this.getProgress(uid);
    const totalCost = count * costPerHeart;
    const currentPoints = prog.points || 0;
    if(currentPoints < totalCost){
      return { success: false, reason: 'insufficient_xp', required: totalCost, current: currentPoints };
    }
    prog.points = Math.max(0, currentPoints - totalCost);
    prog.hearts = Math.max(0, Math.min(5, (prog.hearts || 0) + count));

    const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;
    if (prog.hearts >= 5) {
      try { localStorage.removeItem(timerKey); } catch(e){}
      prog.last_heart_loss_at = null;
    }

    this.saveProgressLocal(prog, uid);
    if(sbClient && uid){
      try {
        await sbClient.from('user_progress').update({ points: prog.points, hearts: prog.hearts }).eq('user_id', uid);
      } catch(e){}
    }
    return { success: true, prog };
  }

    async refillHearts(userId){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = await this.getProgress(uid);
    prog.hearts = 5;
    const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;
    try { localStorage.removeItem(timerKey); } catch(e){}
    prog.last_heart_loss_at = null;
    this.saveProgressLocal(prog, uid);
    if(sbClient && uid){
      try {
        await sbClient.from('user_progress').update({ hearts: 5 }).eq('user_id', uid);
      } catch(e){}
    }
    return prog;
  }

  /* ============================================================
     خدمات المنهج والدروس (Curriculum & Lessons)
     ============================================================ */

  // جلب المنهج كامل مع الوحدات والدروس والتمارين
  async getCurriculum(forceRemote = false){
    let cachedCurriculum = null;
    try {
      const cached = localStorage.getItem('mg_coptic_curriculum_v2') || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM);
      if(cached) {
        if (cached.includes('ⲁⲇⲁⲙ') || cached.includes('ⲏ̀ⲡⲓ')) {
          localStorage.removeItem('mg_coptic_curriculum_v2');
          localStorage.removeItem('mg_coptic_curriculum_v1');
          localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM);
        } else {
          cachedCurriculum = JSON.parse(cached);
        }
      }
    } catch(e){}

    // إذا كان المنهج محفوظاً محلياً ولم يُطلب الجلب الإجباري، نرجعه فوراً
    if(cachedCurriculum && Array.isArray(cachedCurriculum.units) && !forceRemote){
      return cachedCurriculum;
    }

    if(sbClient){
      try {
        const { data: levelsData, error: lvlErr } = await sbClient.from('levels').select('*').order('order_index');
        const { data: unitsData, error: uErr } = await sbClient.from('units').select('*').order('order_index');

        if(!uErr && Array.isArray(unitsData)){
          if(unitsData.length === 0){
            const activeLevel = (levelsData && levelsData[0]) ? levelsData[0] : { id: 1, title: 'المستوى 1: الأساسيات', description: 'مسار تعلم اللغة القبطية', order_index: 1 };
            const curriculum = {
              levels: (levelsData && levelsData.length > 0) ? levelsData : [activeLevel],
              level: activeLevel,
              units: [],
              chests: []
            };
            this.saveCurriculumLocal(curriculum);
            return curriculum;
          }

          const unitIds = unitsData.map(u => u.id);
          const { data: lessonsData } = await sbClient.from('lessons').select('*').in('unit_id', unitIds).order('order_index');
          
          let allChallenges = [];
          if(lessonsData && lessonsData.length > 0){
            const lessonIds = lessonsData.map(l => l.id);
            const { data: chData } = await sbClient.from('challenges').select('*').in('lesson_id', lessonIds).order('order_index');
            allChallenges = chData || [];
          }

          let allOptions = [];
          if(allChallenges.length > 0){
            const chIds = allChallenges.map(c => c.id);
            const { data: optData } = await sbClient.from('challenge_options').select('*').in('challenge_id', chIds);
            allOptions = optData || [];
          }

          let chestsData = [];
          try {
            const { data: chs } = await sbClient.from('chests').select('*').order('created_at');
            chestsData = chs || [];
          } catch(e){}

          // تجميع الهيكل
          const builtUnits = unitsData.map(u => {
            const uLessons = (lessonsData || []).filter(l => String(l.unit_id) === String(u.id)).map(l => {
              const lChallenges = allChallenges.filter(c => String(c.lesson_id) === String(l.id)).map(c => {
                const opts = allOptions.filter(o => String(o.challenge_id) === String(c.id));
                const xp = parseInt(c.xp_reward || c.xp || 10, 10) || 10;
                return {
                  ...c,
                  xp: xp,
                  xp_reward: xp,
                  options: opts
                };
              });
              const finalLessonXp = parseInt(l.xp_reward, 10) || 20;
              const finalPracticeXp = parseInt(l.practice_xp, 10) || 20;
              const finalChallengeXp = parseInt(l.challenge_xp, 10) || 30;

              return {
                ...l,
                xp_reward: finalLessonXp,
                practice_xp: finalPracticeXp,
                challenge_xp: finalChallengeXp,
                challenges: lChallenges
              };
            });
            return {
              ...u,
              lessons: uLessons
            };
          });

          const finalChests = (chestsData && chestsData.length > 0)
            ? chestsData
            : (cachedCurriculum?.chests || []);

          const lvlOrderMap = new Map();
          (levelsData || []).forEach((lvl, idx) => {
            lvlOrderMap.set(String(lvl.id), Number(lvl.order_index) || (idx + 1));
          });
          builtUnits.sort((a, b) => {
            const lvlA = lvlOrderMap.get(String(a.level_id)) ?? 9999;
            const lvlB = lvlOrderMap.get(String(b.level_id)) ?? 9999;
            if (lvlA !== lvlB) return lvlA - lvlB;
            return (Number(a.order_index) || 1) - (Number(b.order_index) || 1);
          });

          const activeLevel = (levelsData && levelsData[0]) ? levelsData[0] : { id: 1, title: 'المستوى الأساسي' };
          const curriculum = {
            levels: (levelsData && levelsData.length > 0) ? levelsData : [activeLevel],
            level: activeLevel,
            units: builtUnits,
            chests: finalChests
          };
          this.saveCurriculumLocal(curriculum);
          return curriculum;
        }
      } catch(err){
        console.warn('Supabase curriculum fetch error, using cache:', err);
      }
    }

    return cachedCurriculum || DEFAULT_CURRICULUM;
  }

  saveCurriculumLocal(curriculum){
    try {
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM, JSON.stringify(curriculum));
      localStorage.setItem('mg_coptic_curriculum_v2', JSON.stringify(curriculum));
      localStorage.setItem('mg_coptic_curriculum_v1', JSON.stringify(curriculum));
      this.broadcastUpdate('curriculum', curriculum);
    } catch(e){}
  }

  // جلب سجل تقدم الدروس للمستخدم
  async getLessonProgress(userId, forceRemote = false){
    const uid = userId || this.getCurrentUser()?.id;
    let map = {};
    const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS;

    // 1. القراءة الفورية من التخزين المحلي (0 ميلي ثانية)
    try {
      const raw = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    if(map && Object.keys(map).length > 0 && !forceRemote){
      return map;
    }

    if(sbClient && uid){
      try {
        const { data, error } = await sbClient.from('user_lesson_progress').select('*').eq('user_id', uid);
        if(!error){
          // دمج بيانات السيرفر مع البيانات المحلية بأمان تام دون حذف أي إنجاز للطالب
          const serverMap = {};
          if(Array.isArray(data) && data.length > 0){
            data.forEach(row => {
              const lid = String(row.lesson_id);
              serverMap[lid] = {
                status: row.status,
                score: row.score || 0
              };
              if(row.status === 'completed'){
                serverMap[`${lid}_p`] = { status: 'completed', score: row.score || 100 };
                serverMap[`${lid}_c`] = { status: 'completed', score: row.score || 100 };
              }
            });
          }

          // ندمج بيانات السيرفر مع ما لدى المستخدم محلياً لضمان عدم ضياع أي دروس مكتملة
          map = { ...map, ...serverMap };
          if(!map || Object.keys(map).length === 0){
            map = { '1': { status: 'in_progress', score: 0 } };
          }

          if(uid) localStorage.setItem(userLpKey, JSON.stringify(map));
          localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(map));
          return map;
        }
      } catch(e){
        console.warn('Supabase getLessonProgress error:', e);
      }
    }

    if(!map['1'] && !map['101']){
      map['1'] = { status: 'in_progress', score: 0 };
    }
    return map;
  }

  // تسجيل إكمال درس وحفظه سحابياً في Supabase لحساب المستخدم
  // تسجيل إكمال درس وحفظه سحابياً في Supabase لحساب المستخدم عبر complete_lesson_reward
  async completeLesson(userId, lessonId, score = 100, nextLessonId = null, xpReward = 20){
    const uid = userId || this.getCurrentUser()?.id;
    const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS;
    let map = {};
    try {
      const raw = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    const wasAlreadyCompleted = map[String(lessonId)] && map[String(lessonId)].status === 'completed';
    map[String(lessonId)] = { status: 'completed', score: score };

    // إذا كانت محطة تحدي _c اكتملت، نتأكد أن الدرس الأساسي والمحطة _p مسجلان كمكتملين
    if(/_c$/.test(String(lessonId))){
      const baseId = String(lessonId).replace(/_c$/, '');
      if(!map[baseId] || map[baseId].status !== 'completed'){
        map[baseId] = { status: 'completed', score: score };
      }
      if(!map[`${baseId}_p`] || map[`${baseId}_p`].status !== 'completed'){
        map[`${baseId}_p`] = { status: 'completed', score: score };
      }
    } else if(/_p$/.test(String(lessonId))){
      const baseId = String(lessonId).replace(/_p$/, '');
      if(!map[baseId] || map[baseId].status !== 'completed'){
        map[baseId] = { status: 'completed', score: score };
      }
    }

    if(nextLessonId){
      if(!map[String(nextLessonId)] || map[String(nextLessonId)].status === 'locked'){
        map[String(nextLessonId)] = { status: 'in_progress', score: 0 };
      }
    }

    try {
      if(uid) localStorage.setItem(userLpKey, JSON.stringify(map));
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(map));
    } catch(e){}

    const isVirtualStation = /_(p|c)$/.test(String(lessonId));
    const numLessonId = isVirtualStation
      ? parseInt(String(lessonId).replace(/_(p|c)$/, ''), 10)
      : parseInt(lessonId, 10);

    let serverHandled = false;

    // المزامنة السحابية الموثوقة عبر complete_lesson_reward (بدون تمرير قيمة النقاط من العميل)
    if(sbClient && uid && !isNaN(numLessonId)){
      try {
        const { data: rpcData, error: rpcErr } = await sbClient.rpc('complete_lesson_reward', {
          p_lesson_id: numLessonId,
          p_score: parseInt(score, 10) || 100
        });

        if(!rpcErr && rpcData && rpcData.success){
          serverHandled = true;
          const curProg = this.getProgressLocal(uid) || {};
          curProg.points = Number(rpcData.points ?? curProg.points ?? 0);
          curProg.total_points = curProg.points;
          if(rpcData.hearts != null) curProg.hearts = Number(rpcData.hearts);
          if(rpcData.streak_days != null) curProg.streak_days = Number(rpcData.streak_days);
          this.saveProgressLocal(curProg, uid);

          if(rpcData.added_xp > 0){
            this.recordTodayEarnedXP(uid, rpcData.added_xp);
          }
        } else if(rpcErr){
          console.warn('complete_lesson_reward RPC error:', rpcErr);
        }

        // فتح الدرس التالي بالسحابة
        if(nextLessonId && !/_(p|c)$/.test(String(nextLessonId))){
          const nextNumId = parseInt(nextLessonId, 10);
          if(!isNaN(nextNumId)){
            sbClient.from('user_lesson_progress').upsert({
              user_id: uid,
              lesson_id: nextNumId,
              status: 'in_progress',
              score: 0,
              updated_at: new Date().toISOString()
            }).then(()=>{}, ()=>{});
          }
        }
      } catch(err){
        console.warn('completeLesson cloud sync error:', err);
      }
    }

    // احتياطي غير متصل (Offline fallback) فقط في حال تعذر الاتصال بالسيرفر
    if(!serverHandled && !wasAlreadyCompleted){
      const fallbackXp = parseInt(xpReward, 10) || 20;
      const curProg = this.getProgressLocal(uid) || {};
      if(fallbackXp > 0){
        curProg.points = (curProg.points || 0) + fallbackXp;
        curProg.total_points = (curProg.total_points || 0) + fallbackXp;
        this.saveProgressLocal(curProg, uid);
        this.recordTodayEarnedXP(uid, fallbackXp);
      }
      if(sbClient && uid && !isNaN(numLessonId)){
        sbClient.from('user_lesson_progress').upsert({
          user_id: uid,
          lesson_id: numLessonId,
          status: 'completed',
          score: parseInt(score, 10) || 100,
          updated_at: new Date().toISOString()
        }).then(()=>{}, ()=>{});

        sbClient.from('user_progress').update({
          points: curProg.points || 0,
          last_active_date: new Date().toISOString().split('T')[0]
        }).eq('user_id', uid).then(()=>{}, ()=>{});
      }
    }

    return map;
  }

  // مسح كامل الكاش المحلي لحساب المستخدم فور تصفيره
  resetFullAccountLocal(userId = null) {
    const uid = userId || this.getCurrentUser()?.id;
    if (!uid) return;

    const keysToClear = [
      `mg_coptic_progress_${uid}`,
      `mg_coptic_lesson_progress_${uid}`,
      `mg_coptic_claimed_chests_${uid}`,
      `mg_coptic_badges_${uid}`,
      `mg_coptic_daily_goal_${uid}`,
      `mg_coptic_daily_xp_date_${uid}`,
      `mg_coptic_daily_xp_val_${uid}`,
      `mg_coptic_last_synced_date_${uid}`,
      'mg_coptic_progress',
      'mg_coptic_lesson_progress',
      'mg_coptic_claimed_chests',
      'mg_coptic_badges',
      'mg_coptic_daily_xp_date',
      'mg_coptic_daily_xp_val',
      'mg_coptic_guest_migrated'
    ];
    keysToClear.forEach(k => {
      try { localStorage.removeItem(k); } catch(_) {}
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const initialProg = {
      user_id: uid,
      points: 0,
      total_points: 0,
      hearts: 5,
      streak_days: 1,
      claimed_chests: [],
      last_active_date: todayStr
    };
    this.saveProgressLocal(initialProg, uid, false);
    try {
      localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, '[]');
      localStorage.setItem('mg_coptic_claimed_chests', '[]');
      localStorage.setItem(`mg_coptic_badges_${uid}`, '[]');
      localStorage.setItem('mg_coptic_badges', '[]');
    } catch(_) {}

    const initialLp = { '1': { status: 'in_progress', score: 0 } };
    try {
      localStorage.setItem(`mg_coptic_lesson_progress_${uid}`, JSON.stringify(initialLp));
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(initialLp));
    } catch(_) {}

    if (typeof window !== 'undefined') {
      if (typeof window.resetLearningPathUI === 'function') window.resetLearningPathUI();
      if (typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(initialProg);
      if (typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
    }
  }

  // تصفير حساب المستخدم بالكامل وحذف كافة الدروس والتقدم محلياً وسحابياً
  async resetFullAccount(userId = null, actorId = null) {
    const uid = userId || this.getCurrentUser()?.id;
    if (!uid) return false;

    // 1. مسح جميع مفاتيح التخزين المحلي فوراً
    this.resetFullAccountLocal(uid);

    const todayStr = new Date().toISOString().split('T')[0];
    const initialProg = {
      user_id: uid,
      points: 0,
      total_points: 0,
      hearts: 5,
      streak_days: 1,
      claimed_chests: [],
      last_active_date: todayStr
    };

    // 2. استدعاء الـ Edge Function بصلاحيات Service Role لحذف كافة السجلات سحابياً
    try {
      const anonKey = (typeof MG_CONFIG !== 'undefined' && MG_CONFIG?.SUPABASE_ANON_KEY) ? MG_CONFIG.SUPABASE_ANON_KEY : (window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo');
      await fetch('https://kdoanxzpfiscprjjzzic.supabase.co/functions/v1/send-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify({
          action: 'reset_account',
          user_id: uid,
          actor_id: actorId || this.getCurrentUser()?.id || null
        })
      });
    } catch (e) {
      console.warn('resetFullAccount edge call notice:', e);
    }

    // 3. محاولة RPC الموثوقة مع تمرير معرّف المشرف
    const sb = this.getSupabaseClient();
    if (sb) {
      let rpcSuccess = false;
      try {
        const callerId = actorId || this.getCurrentUser()?.id || uid;
        const { data: d, error: err } = await sb.rpc('admin_reset_full_account', { p_user_id: uid, p_actor_id: callerId });
        if (!err && d && d.success) rpcSuccess = true;
      } catch(_) {}

      if (!rpcSuccess) {
        try {
          await sb.rpc('admin_reset_full_account', { p_user_id: uid });
        } catch(_) {}
      }

      // مسح سحابي مباشر احتياطي لضمان تصفير الجداول 100%
      try {
        await Promise.all([
          sb.from('user_lesson_progress').delete().eq('user_id', uid),
          sb.from('user_challenge_progress').delete().eq('user_id', uid),
          sb.from('user_writing_progress').delete().eq('user_id', uid)
        ]);
        let nextVer = 1;
        try {
          const { data: curProg } = await sb.from('user_progress').select('reset_version').eq('user_id', uid).maybeSingle();
          nextVer = Number(curProg?.reset_version || 0) + 1;
        } catch(_) {}
        await sb.from('user_progress').upsert({
          user_id: uid,
          points: 0,
          total_points: 0,
          hearts: 5,
          streak_days: 1,
          claimed_chests: [],
          reset_version: nextVer,
          reset_at: new Date().toISOString(),
          last_active_date: todayStr
        }, { onConflict: 'user_id' });
      } catch(tblErr) {
        console.warn('Direct tables reset fallback error in gamification-service:', tblErr);
      }
    }

    // 4. بث التحديث محلياً وعبر قنوات التزامن
    if (this.channel) {
      try {
        this.channel.postMessage({
          type: 'full_account_reset',
          payload: { user_id: uid, points: 0, hearts: 5, streak_days: 1, completed_lessons: 0 }
        });
      } catch(_) {}
    }

    if (typeof window !== 'undefined') {
      if (typeof window.resetLearningPathUI === 'function') window.resetLearningPathUI();
      if (typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(initialProg);
      if (typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
      if (typeof window.renderSkillMap === 'function') window.renderSkillMap();
      if (typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
    }

    return true;
  }

  recordTodayEarnedXP(userId, amount) {
    const addVal = parseInt(amount, 10);
    if (isNaN(addVal) || addVal <= 0) return;
    try {
      const uid = userId || this.getCurrentUser()?.id || 'guest';
      const todayStr = new Date().toISOString().split('T')[0];
      const dateKey = `mg_coptic_daily_xp_date_${uid}`;
      const valKey = `mg_coptic_daily_xp_val_${uid}`;
      const savedDate = localStorage.getItem(dateKey) || localStorage.getItem('mg_coptic_daily_xp_date');
      let current = 0;
      if (savedDate === todayStr) {
        current = parseInt(localStorage.getItem(valKey) || localStorage.getItem('mg_coptic_daily_xp_val') || '0', 10);
        if (isNaN(current) || current < 0) current = 0;
      }
      const updated = current + addVal;
      localStorage.setItem(dateKey, todayStr);
      localStorage.setItem(valKey, String(updated));
      localStorage.setItem('mg_coptic_daily_xp_date', todayStr);
      localStorage.setItem('mg_coptic_daily_xp_val', String(updated));

      if (typeof window !== 'undefined' && typeof window.updateDailyGoalUI === 'function') {
        try { window.updateDailyGoalUI(); } catch (e) {}
      }
    } catch (e) {
      console.warn('recordTodayEarnedXP error:', e);
    }
  }
}

// إنشاء نسخة عامة واحدة
window.DEFAULT_CURRICULUM = DEFAULT_CURRICULUM;
window.GamificationService = GamificationService;
GamificationService.DEFAULT_CURRICULUM = DEFAULT_CURRICULUM;
window.MGCopticGame = new GamificationService();
