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
const DEFAULT_CURRICULUM = {"levels":[{"id":5,"title":"المستوى الأول: الأبجدية القبطية الكاملة","description":"تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة","order_index":1},{"id":6,"title":"المستوى الثاني: قواعد القراءة ونطق الكلمات","description":"أتقن قواعد القراءة والنطق الشرطي والمقاطع الصوتية لتتمكن من قراءة جميع الكلمات والنصوص القبطية بطلاقة تامة.","order_index":2}],"level":{"id":5,"title":"المستوى الأول: الأبجدية القبطية الكاملة","description":"تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة","order_index":1},"units":[{"id":41,"level_id":5,"title":"الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)","badge":"Ⲁ-Ⲉ","description":"تعلّم كتابة ونطق أول 5 حروف في الأبجدية القبطية","order_index":1,"lessons":[{"id":133,"unit_id":41,"title":"حرف ألفا (Ⲁ ⲁ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":668,"lesson_id":133,"type":"text_view","question":"نبذة عن حرف ألفا (Ⲁ ⲁ)","coptic_display":"Ⲁ ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• اسم الحرف: ألفا\n• نطق الحرف بالعربي: ألف مفتوحة (أ)\n• قواعد النطق: الحرف الأول في الأبجدية القبطية. يُنطق دائماً مثل حرف الألف المفتوحة في العربية أو (A) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲁⲗⲱⲙ\n  - القبطي المعرب (نطقها): «آلوم»\n  - المعنى بالعربية: جبنة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":669,"lesson_id":133,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲁ واستمع لنطقه","coptic_display":"Ⲁ","audio_text":"ألفا كابيتال","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":670,"lesson_id":133,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲁ واستمع لنطقه","coptic_display":"ⲁ","audio_text":"ألفا سمول","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":671,"lesson_id":133,"type":"read_select","question":"ما هو نطق الحرف Ⲁ بالعربية؟","coptic_display":"Ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4340,"challenge_id":671,"text":"ألف (فتحة)","is_correct":true,"image_url":null,"audio_url":null},{"id":4341,"challenge_id":671,"text":"ياء قصيرة (كسرة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4342,"challenge_id":671,"text":"واو قصيرة (ضمة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4343,"challenge_id":671,"text":"ياء طويلة (إي)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":672,"lesson_id":133,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲗⲱⲙ؟ (المعرب: «آلوم»)","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4344,"challenge_id":672,"text":"جبنة","is_correct":true,"image_url":null,"audio_url":null},{"id":4345,"challenge_id":672,"text":"لبن","is_correct":false,"image_url":null,"audio_url":null},{"id":4346,"challenge_id":672,"text":"خبز","is_correct":false,"image_url":null,"audio_url":null},{"id":4347,"challenge_id":672,"text":"عسل","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":673,"lesson_id":133,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: جبنة (المعرب: «آلوم»)","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":"ⲁⲗⲱⲙ","tiles":["ⲁ","ⲗ","ⲱ","ⲙ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":134,"unit_id":41,"title":"حرف فيدا (Ⲃ ⲃ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":674,"lesson_id":134,"type":"text_view","question":"نبذة عن حرف فيدا (Ⲃ ⲃ)","coptic_display":"Ⲃ ⲃ","audio_text":"فيدا","audio_url":"audio_coptic/2veta.mp3","correct_word":"• اسم الحرف: فيدا\n• نطق الحرف بالعربي: ف أو ب\n• قواعد النطق: الحرف الثاني. يُنطق \"ف\" إذا جاء بعده حرف متحرك، ويُنطق \"ب\" إذا لم يأتِ بعده متحرك أو في نهاية الكلمة.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲃⲱ\n  - القبطي المعرب (نطقها): «ڤو»\n  - المعنى بالعربية: شجرة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":675,"lesson_id":134,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲃ واستمع لنطقه","coptic_display":"Ⲃ","audio_text":"فيدا كابيتال","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":676,"lesson_id":134,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲃ واستمع لنطقه","coptic_display":"ⲃ","audio_text":"فيدا سمول","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":677,"lesson_id":134,"type":"read_select","question":"ما هو نطق الحرف Ⲃ بالعربية؟","coptic_display":"Ⲃ","audio_text":"فيدا","audio_url":"audio_coptic/2veta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4348,"challenge_id":677,"text":"ب أو ڤ","is_correct":true,"image_url":null,"audio_url":null},{"id":4349,"challenge_id":677,"text":"ف فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4350,"challenge_id":677,"text":"ب فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4351,"challenge_id":677,"text":"م أو و","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":678,"lesson_id":134,"type":"select","question":"ما معنى الكلمة القبطية: ⲃⲱ؟ (المعرب: «ڤو»)","coptic_display":"ⲃⲱ","audio_text":"ڤو","audio_url":"assets/sounds/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4352,"challenge_id":678,"text":"شجرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4353,"challenge_id":678,"text":"نخلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4354,"challenge_id":678,"text":"غصن","is_correct":false,"image_url":null,"audio_url":null},{"id":4355,"challenge_id":678,"text":"وردة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":679,"lesson_id":134,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شجرة (المعرب: «ڤو»)","coptic_display":"ⲃⲱ","audio_text":"ڤو","audio_url":"assets/sounds/2vo.mp3","correct_word":"ⲃⲱ","tiles":["ⲃ","ⲱ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":135,"unit_id":41,"title":"حرف غاما (Ⲅ ⲅ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":680,"lesson_id":135,"type":"text_view","question":"نبذة عن حرف غاما (Ⲅ ⲅ)","coptic_display":"Ⲅ ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":"• اسم الحرف: غاما\n• نطق الحرف بالعربي: غ أو ج أو ن\n• قواعد النطق: الحرف الثالث. ينطق \"غ\" في الكلمات القبطية، و\"ن\" قبل الحلقيات، و\"ج\" معطشة قبل المتحرك للكسر في اليونانية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲅⲁⲗⲁ\n  - القبطي المعرب (نطقها): «غالا»\n  - المعنى بالعربية: لبن\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":681,"lesson_id":135,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲅ واستمع لنطقه","coptic_display":"Ⲅ","audio_text":"غاما كابيتال","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":682,"lesson_id":135,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲅ واستمع لنطقه","coptic_display":"ⲅ","audio_text":"غاما سمول","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":683,"lesson_id":135,"type":"read_select","question":"ما هو نطق الحرف Ⲅ بالعربية؟","coptic_display":"Ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4356,"challenge_id":683,"text":"غ أو ج أو ن","is_correct":true,"image_url":null,"audio_url":null},{"id":4357,"challenge_id":683,"text":"غ أو خ أو ك","is_correct":false,"image_url":null,"audio_url":null},{"id":4358,"challenge_id":683,"text":"ج أو د أو ذ","is_correct":false,"image_url":null,"audio_url":null},{"id":4359,"challenge_id":683,"text":"ك أو ق أو غ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":684,"lesson_id":135,"type":"select","question":"ما معنى الكلمة القبطية: ⲅⲁⲗⲁ؟ (المعرب: «غالا»)","coptic_display":"ⲅⲁⲗⲁ","audio_text":"غالا","audio_url":"assets/sounds/3ghala.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4360,"challenge_id":684,"text":"زيت","is_correct":false,"image_url":null,"audio_url":null},{"id":4361,"challenge_id":684,"text":"ماء","is_correct":false,"image_url":null,"audio_url":null},{"id":4362,"challenge_id":684,"text":"عسل","is_correct":false,"image_url":null,"audio_url":null},{"id":4363,"challenge_id":684,"text":"لبن","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":685,"lesson_id":135,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: لبن (المعرب: «غالا»)","coptic_display":"ⲅⲁⲗⲁ","audio_text":"غالا","audio_url":"assets/sounds/3ghala.mp3","correct_word":"ⲅⲁⲗⲁ","tiles":["ⲅ","ⲁ","ⲗ","ⲁ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":136,"unit_id":41,"title":"حرف دلدا (Ⲇ ⲇ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":686,"lesson_id":136,"type":"text_view","question":"نبذة عن حرف دلدا (Ⲇ ⲇ)","coptic_display":"Ⲇ ⲇ","audio_text":"دلدا","audio_url":"audio_coptic/4delta.mp3","correct_word":"• اسم الحرف: دلدا\n• نطق الحرف بالعربي: د أو ذ\n• قواعد النطق: الحرف الرابع. يُنطق \"د\" في أسماء الأعلام والكلمات القبطية، و\"ذ\" في الكلمات اليونانية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲇⲟⲝⲁ\n  - القبطي المعرب (نطقها): «ذوكسا»\n  - المعنى بالعربية: مجد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":687,"lesson_id":136,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲇ واستمع لنطقه","coptic_display":"Ⲇ","audio_text":"دلدا كابيتال","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":688,"lesson_id":136,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲇ واستمع لنطقه","coptic_display":"ⲇ","audio_text":"دلدا سمول","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":689,"lesson_id":136,"type":"read_select","question":"ما هو نطق الحرف Ⲇ بالعربية؟","coptic_display":"Ⲇ","audio_text":"دلدا","audio_url":"audio_coptic/4delta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4364,"challenge_id":689,"text":"د أو ذ","is_correct":true,"image_url":null,"audio_url":null},{"id":4365,"challenge_id":689,"text":"ت أو ط","is_correct":false,"image_url":null,"audio_url":null},{"id":4366,"challenge_id":689,"text":"د أو ض","is_correct":false,"image_url":null,"audio_url":null},{"id":4367,"challenge_id":689,"text":"ذ أو ز","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":690,"lesson_id":136,"type":"select","question":"ما معنى الكلمة القبطية: Ⲇⲟⲝⲁ؟ (المعرب: «ذوكسا»)","coptic_display":"Ⲇⲟⲝⲁ","audio_text":"ذوكسا","audio_url":"assets/sounds/4zoksa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4368,"challenge_id":690,"text":"كرامة","is_correct":false,"image_url":null,"audio_url":null},{"id":4369,"challenge_id":690,"text":"مجد","is_correct":true,"image_url":null,"audio_url":null},{"id":4370,"challenge_id":690,"text":"بركة","is_correct":false,"image_url":null,"audio_url":null},{"id":4371,"challenge_id":690,"text":"نعمة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":691,"lesson_id":136,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مجد (المعرب: «ذوكسا»)","coptic_display":"Ⲇⲟⲝⲁ","audio_text":"ذوكسا","audio_url":"assets/sounds/4zoksa.mp3","correct_word":"Ⲇⲟⲝⲁ","tiles":["Ⲇ","ⲟ","ⲝ","ⲁ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":137,"unit_id":41,"title":"حرف إي (Ⲉ ⲉ)","xp_reward":5,"order_index":5,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":692,"lesson_id":137,"type":"text_view","question":"نبذة عن حرف إي (Ⲉ ⲉ)","coptic_display":"Ⲉ ⲉ","audio_text":"إي","audio_url":"audio_coptic/5ei.mp3","correct_word":"• اسم الحرف: إي\n• نطق الحرف بالعربي: إي خفيفة\n• قواعد النطق: الحرف الخامس. حرف متحرك خفيف ينطق مثل حرف (E) في الإنجليزية (فتحة مائلة للكسر).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲉ̀ⲣϫⲱ\n  - القبطي المعرب (نطقها): «إرجو»\n  - المعنى بالعربية: دجاجة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":693,"lesson_id":137,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲉ واستمع لنطقه","coptic_display":"Ⲉ","audio_text":"إي كابيتال","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":694,"lesson_id":137,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲉ واستمع لنطقه","coptic_display":"ⲉ","audio_text":"إي سمول","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":695,"lesson_id":137,"type":"read_select","question":"ما هو نطق الحرف Ⲉ بالعربية؟","coptic_display":"Ⲉ","audio_text":"إي","audio_url":"audio_coptic/5ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4372,"challenge_id":695,"text":"إي خفيفة (كسرة قصيرة)","is_correct":true,"image_url":null,"audio_url":null},{"id":4373,"challenge_id":695,"text":"ياء طويلة ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4374,"challenge_id":695,"text":"ألف ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4375,"challenge_id":695,"text":"واو قصيرة (ضمة)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":696,"lesson_id":137,"type":"select","question":"ما معنى الكلمة القبطية: ⲉ̀ⲣϫⲱ؟ (المعرب: «إرجو»)","coptic_display":"ⲉ̀ⲣϫⲱ","audio_text":"إرجو","audio_url":"assets/sounds/5ergoh.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4376,"challenge_id":696,"text":"دجاجة","is_correct":true,"image_url":null,"audio_url":null},{"id":4377,"challenge_id":696,"text":"عصفور","is_correct":false,"image_url":null,"audio_url":null},{"id":4378,"challenge_id":696,"text":"حمامة","is_correct":false,"image_url":null,"audio_url":null},{"id":4379,"challenge_id":696,"text":"بطة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":697,"lesson_id":137,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: دجاجة (المعرب: «إرجو»)","coptic_display":"ⲉ̀ⲣϫⲱ","audio_text":"إرجو","audio_url":"assets/sounds/5ergoh.mp3","correct_word":"ⲉ̀ⲣϫⲱ","tiles":["ⲉ","̀","ⲣ","ϫ","ⲱ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":165,"unit_id":41,"title":"🔄 مراجعة الوحدة 1","xp_reward":5,"order_index":6,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":860,"lesson_id":165,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲁ ⲁ","right":"ألفا (ألف مفتوحة (أ))"},{"left":"Ⲃ ⲃ","right":"فيدا (ف أو ب)"},{"left":"Ⲅ ⲅ","right":"غاما (غ أو ج أو ن)"},{"left":"Ⲇ ⲇ","right":"دلدا (د أو ذ)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":861,"lesson_id":165,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4599,"challenge_id":861,"text":"Ⲁ ⲁ (ألفا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4597,"challenge_id":861,"text":"Ⲉ ⲉ (إي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4596,"challenge_id":861,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4598,"challenge_id":861,"text":"Ⲟ ⲟ (أُو)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":862,"lesson_id":165,"type":"select","question":"ما معنى الكلمة: ⲃⲱ؟ (المعرب: «ڤو»)","coptic_display":"ⲃⲱ","audio_text":"ڤو","audio_url":"assets/sounds/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4600,"challenge_id":862,"text":"شجرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4602,"challenge_id":862,"text":"نخلة","is_correct":false,"image_url":null,"audio_url":null},{"id":4603,"challenge_id":862,"text":"غصن","is_correct":false,"image_url":null,"audio_url":null},{"id":4601,"challenge_id":862,"text":"وردة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":863,"lesson_id":165,"type":"write","question":"رتب حروف الكلمة: دجاجة (المعرب: «إرجو»)","coptic_display":"ⲉ̀ⲣϫⲱ","audio_text":"إرجو","audio_url":"assets/sounds/5ergoh.mp3","correct_word":"ⲉ̀ⲣϫⲱ","tiles":["ⲉ","̀","ⲣ","ϫ","ⲱ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":864,"lesson_id":165,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲅ؟","coptic_display":"Ⲅ","audio_text":"غاما","audio_url":"audio_coptic/3ghamma.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4606,"challenge_id":864,"text":"غاما (غ أو ج أو ن)","is_correct":true,"image_url":null,"audio_url":null},{"id":4607,"challenge_id":864,"text":"غاما (غ أو خ أو ك)","is_correct":false,"image_url":null,"audio_url":null},{"id":4604,"challenge_id":864,"text":"جانجا (ج معطشة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4605,"challenge_id":864,"text":"كابا (ك)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":51,"level_id":6,"title":"الوحدة ١: هندسة الحركات ومقاييس زمن النطق","badge":"Ⲁ-Ⲱ","description":"إتقان مخارج وأزمنة الحروف المتحركة السبعة والتمييز السمعي والبصري بين الحركات المتشابهة.","order_index":1,"lessons":[{"id":201,"unit_id":51,"title":"حركة الفتح وحرف الألفا (Ⲁ ⲁ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3000,"lesson_id":201,"type":"text_view","question":"قاعدة حركة الفتح وحرف الألفا (Ⲁ ⲁ)","coptic_display":"Ⲁ ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• اسم الحرف: ألفا (Ⲁ ⲁ)\n• النطق: ألف مفتوحة دائماً (ألف مفتوحة صريحة).\n• شواهد من المجمع المقدس:\n  - ⲣⲁⲛ (ران) = اسم\n  - ⲁⲛⲟⲕ (آنوك) = أنا\n  - ⲥⲁ (سا) = ناحية / جهة","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3001,"lesson_id":201,"type":"read_select","question":"كيف تنطق كلمة «ⲣⲁⲛ» (اسم) بالقبطية؟","coptic_display":"ⲣⲁⲛ","audio_text":"ران","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5000,"challenge_id":3001,"text":"ران (بألف مفتوحة صريحة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5001,"challenge_id":3001,"text":"رون (بواو)","is_correct":false,"image_url":null,"audio_url":null},{"id":5002,"challenge_id":3001,"text":"رين (بياء)","is_correct":false,"image_url":null,"audio_url":null},{"id":6000,"challenge_id":3001,"text":"روون (بواو مفخمة طويلة)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3002,"lesson_id":201,"type":"select","question":"ما معنى كلمة «ⲁⲛⲟⲕ» بالقبطية؟","coptic_display":"ⲁⲛⲟⲕ","audio_text":"آنوك","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5003,"challenge_id":3002,"text":"أنا","is_correct":true,"image_url":null,"audio_url":null},{"id":5004,"challenge_id":3002,"text":"أنت","is_correct":false,"image_url":null,"audio_url":null},{"id":5005,"challenge_id":3002,"text":"هو","is_correct":false,"image_url":null,"audio_url":null},{"id":6001,"challenge_id":3002,"text":"نحن","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3003,"lesson_id":201,"type":"write","question":"رتّب حروف كلمة 'اسم' بالقبطية (ران):","coptic_display":"ⲣⲁⲛ","audio_text":"ران","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲣⲁⲛ","tiles":["ⲣ","ⲁ","ⲛ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3004,"lesson_id":201,"type":"read_select","question":"هل يتغير نطق حرف الألفا (Ⲁ) بتغير موضعه؟","coptic_display":"Ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5006,"challenge_id":3004,"text":"لا، يُنطق دائماً ألفاً مفتوحة","is_correct":true,"image_url":null,"audio_url":null},{"id":5007,"challenge_id":3004,"text":"نعم، يتغير نطقه","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3005,"lesson_id":201,"type":"read_select","question":"كلمة «ⲥⲁ» (ناحية) تتكون من مقطع صوتي يُنطق:","coptic_display":"ⲥⲁ","audio_text":"سا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5008,"challenge_id":3005,"text":"سا","is_correct":true,"image_url":null,"audio_url":null},{"id":5009,"challenge_id":3005,"text":"سو","is_correct":false,"image_url":null,"audio_url":null},{"id":5010,"challenge_id":3005,"text":"سي","is_correct":false,"image_url":null,"audio_url":null},{"id":6002,"challenge_id":3005,"text":"سِيـ (بياء مكسورة طويلة)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":202,"unit_id":51,"title":"عائلة حروف الكسر الثلاثية (Ⲉ ، Ⲏ ، Ⲓ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3006,"lesson_id":202,"type":"text_view","question":"قاعدة التمييز بين درجات الكسر الثلاث","coptic_display":"Ⲉ ، Ⲏ ، Ⲓ","audio_text":"إي وإيتا ويوطا","audio_url":"audio_coptic/8ei.mp3","correct_word":"• Ⲉ (إي): كسرة خفيفة خطافة (كسرة خفيفة خطافة).\n  - مثال: ⲛⲉⲙ (نِم) = مع\n• Ⲏ (إيتا): ياء مكسورة بمد طويل ممتد (ياء مكسورة بمد طويل).\n  - مثال: ⲙⲏⲧ (ميت) = عشرة (10)\n• Ⲓ (يوطا): ياء قصيرة صريحة (ياء قصيرة صريحة).\n  - مثال: ⲕⲓⲙ (كيم) = يتحرك / حركة","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3007,"lesson_id":202,"type":"read_select","question":"أي من الحروف التالية يمثل 'الياء المكسورة بمد طويل'؟","coptic_display":"Ⲏ","audio_text":"إيتا","audio_url":"audio_coptic/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5011,"challenge_id":3007,"text":"حرف الإيتا (Ⲏ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5012,"challenge_id":3007,"text":"حرف الإي (Ⲉ)","is_correct":false,"image_url":null,"audio_url":null},{"id":5013,"challenge_id":3007,"text":"حرف اليوطا (Ⲓ)","is_correct":false,"image_url":null,"audio_url":null},{"id":6003,"challenge_id":3007,"text":"حرف الإبسلون (Ⲩ)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3008,"lesson_id":202,"type":"select","question":"ما معنى كلمة «ⲛⲉⲙ» بالقبطية؟","coptic_display":"ⲛⲉⲙ","audio_text":"نِم","audio_url":"audio_coptic/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5014,"challenge_id":3008,"text":"مع (حرف عطف)","is_correct":true,"image_url":null,"audio_url":null},{"id":5015,"challenge_id":3008,"text":"في","is_correct":false,"image_url":null,"audio_url":null},{"id":5016,"challenge_id":3008,"text":"إلى","is_correct":false,"image_url":null,"audio_url":null},{"id":6004,"challenge_id":3008,"text":"على (حرف جر)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3009,"lesson_id":202,"type":"match","question":"طابق كل حرف بدرجة كسره الصوتية:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲉ","right":"كسرة خفيفة خطافة"},{"left":"Ⲏ","right":"ياء مكسورة بمد طويل"},{"left":"Ⲓ","right":"ياء قصيرة صريحة"}],"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3010,"lesson_id":202,"type":"write","question":"ركّب كلمة 'عشرة' بالقبطية (ميت):","coptic_display":"ⲙⲏⲧ","audio_text":"ميت","audio_url":"audio_coptic/8ei.mp3","correct_word":"ⲙⲏⲧ","tiles":["ⲙ","ⲏ","ⲧ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3011,"lesson_id":202,"type":"read_select","question":"كلمة «ⲕⲓⲙ» (يتحرك) تنطق بياء:","coptic_display":"ⲕⲓⲙ","audio_text":"كيم","audio_url":"audio_coptic/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5017,"challenge_id":3011,"text":"قصيرة صريحة (كيم)","is_correct":true,"image_url":null,"audio_url":null},{"id":5018,"challenge_id":3011,"text":"ممدودة طويلاً","is_correct":false,"image_url":null,"audio_url":null},{"id":5019,"challenge_id":3011,"text":"واو مضمومة","is_correct":false,"image_url":null,"audio_url":null},{"id":6005,"challenge_id":3011,"text":"خفيفة خطافة كالألف اللينة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":203,"unit_id":51,"title":"عائلة حروف الضم ومقاييس الواوات (Ⲟ ، Ⲱ ، ⲞⲨ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3012,"lesson_id":203,"type":"text_view","question":"مقاييس أصوات الواو في اللغة القبطية","coptic_display":"Ⲟ ، Ⲱ ، ⲞⲨ","audio_text":"أو وأوميجا وأو مضمومة","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• Ⲟ: واو قصيرة خطافة (واو قصيرة خطافة). مثال: ⲥⲟⲡ (سوب) = مرة\n• Ⲱ: واو طويلة مفتوحة مفخمة (واو طويلة مفتوحة ومفخمة). مثال: ⲱⲛϧ (أونخ) = حياة\n• ⲞⲨ: واو طويلة مضمومة بشفتين مقفلتين (واو طويلة مضمومة بشفتين مقفلتين). مثال: ⲁ̀ⲗⲟⲩ (آلو) = صبي","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3013,"lesson_id":203,"type":"read_select","question":"كلمة «ⲥⲟⲡ» (مرة) تُنطق بواو:","coptic_display":"ⲥⲟⲡ","audio_text":"سوب","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5020,"challenge_id":3013,"text":"قصيرة خطافة (سوب)","is_correct":true,"image_url":null,"audio_url":null},{"id":5021,"challenge_id":3013,"text":"طويلة مفخمة","is_correct":false,"image_url":null,"audio_url":null},{"id":5022,"challenge_id":3013,"text":"مكسورة","is_correct":false,"image_url":null,"audio_url":null},{"id":6006,"challenge_id":3013,"text":"طويلة مضمومة كحرف المد في فول","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3014,"lesson_id":203,"type":"select","question":"ما معنى كلمة «ⲱⲛϧ» بالقبطية؟","coptic_display":"ⲱⲛϧ","audio_text":"أونخ","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5023,"challenge_id":3014,"text":"يعيش / حياة","is_correct":true,"image_url":null,"audio_url":null},{"id":5024,"challenge_id":3014,"text":"يموت","is_correct":false,"image_url":null,"audio_url":null},{"id":5025,"challenge_id":3014,"text":"يأكل","is_correct":false,"image_url":null,"audio_url":null},{"id":6007,"challenge_id":3014,"text":"يقوم / قيامة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3015,"lesson_id":203,"type":"write","question":"ركّب كلمة 'صبي' بالقبطية (آلو):","coptic_display":"ⲁ̀ⲗⲟⲩ","audio_text":"آلو","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲁ̀ⲗⲟⲩ","tiles":["ⲁ̀","ⲗ","ⲟⲩ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3016,"lesson_id":203,"type":"read_select","question":"ما الفرق في النطق بين «ⲥⲟⲡ» و «ⲥⲱⲡ»؟","coptic_display":"ⲥⲟⲡ / ⲥⲱⲡ","audio_text":"سوب وسووب","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5026,"challenge_id":3016,"text":"الأولى بواو قصيرة خطافة والثانية بواو طويلة مفتوحة","is_correct":true,"image_url":null,"audio_url":null},{"id":5027,"challenge_id":3016,"text":"كلاهما متطابقان","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3017,"lesson_id":203,"type":"read_select","question":"التركيب «ⲞⲨ» في كلمة «ⲛⲟⲩϯ» (الله) يُنطق:","coptic_display":"ⲛⲟⲩϯ","audio_text":"نوتي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5028,"challenge_id":3017,"text":"واو طويلة مضمومة كحرف المد في 'فول'","is_correct":true,"image_url":null,"audio_url":null},{"id":5029,"challenge_id":3017,"text":"واو قصيرة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":204,"unit_id":51,"title":"الأصوات المركبة الخاصة (ⲁⲩ ، ⲉⲩ ، ⲏⲩ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3018,"lesson_id":204,"type":"text_view","question":"قاعدة تحول الإبسلون بعد حروف الفتح والكسر إلى (ڤ)","coptic_display":"ⲁⲩ ، ⲉⲩ ، ⲏⲩ","audio_text":"آڤ وإيڤ","audio_url":"audio_coptic/2vo.mp3","correct_word":"• القاعدة الذهبية: إذا جاء حرف الإبسلون (Ⲩ) مسبوقاً بحرف فتح (Ⲁ) أو كسر (Ⲉ أو Ⲏ)، فإنه يُنطق صوتاً صامتاً شفتانياً: (ڤ - V):\n  - ⲁⲩ ⬅ (آڤ) مثل: ⲥⲧⲁⲩⲣⲟⲥ (إستافروس) = صليب\n  - ⲉⲩ ⬅ (إيڤ) مثل: ⲉⲩⲭⲏ (إيڤكي) = صلاة\n  - ⲏⲩ ⬅ (إيـ-ڤ ممدودة) مثل: ⲛⲏⲩ (نيڤ) = آتٍ / قادم","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3019,"lesson_id":204,"type":"read_select","question":"كيف يُنطق المقطع «ⲁⲩ» في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)؟","coptic_display":"ⲥⲧⲁⲩⲣⲟⲥ","audio_text":"إستافروس","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5030,"challenge_id":3019,"text":"آڤ (صوت ڤ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5031,"challenge_id":3019,"text":"أوو (واو مضمومة)","is_correct":false,"image_url":null,"audio_url":null},{"id":5032,"challenge_id":3019,"text":"آي (ياء)","is_correct":false,"image_url":null,"audio_url":null},{"id":6008,"challenge_id":3019,"text":"أو (واو قصيرة خطافة)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3020,"lesson_id":204,"type":"select","question":"ما معنى كلمة «ⲉⲩⲭⲏ» في التراث الكنسي؟","coptic_display":"ⲉⲩⲭⲏ","audio_text":"إيڤكي","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5033,"challenge_id":3020,"text":"صلاة / طلبة","is_correct":true,"image_url":null,"audio_url":null},{"id":5034,"challenge_id":3020,"text":"صوم","is_correct":false,"image_url":null,"audio_url":null},{"id":5035,"challenge_id":3020,"text":"قربان","is_correct":false,"image_url":null,"audio_url":null},{"id":6009,"challenge_id":3020,"text":"ترنيمة / تسبحة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3021,"lesson_id":204,"type":"write","question":"ركّب كلمة 'صليب' بالقبطية:","coptic_display":"ⲥⲧⲁⲩⲣⲟⲥ","audio_text":"إستافروس","audio_url":"audio_coptic/2vo.mp3","correct_word":"ⲥⲧⲁⲩⲣⲟⲥ","tiles":["ⲥ","ⲧ","ⲁ","ⲩ","ⲣ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3022,"lesson_id":204,"type":"read_select","question":"كلمة «ⲛⲏⲩ» (آتٍ) تُنطق:","coptic_display":"ⲛⲏⲩ","audio_text":"نيڤ","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5036,"challenge_id":3022,"text":"نيڤ (بياء ممدودة بعدها ڤ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5037,"challenge_id":3022,"text":"نيو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3023,"lesson_id":204,"type":"read_select","question":"في كلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ» (إنجيل)، المقطع الأول «ⲉⲩ» ينطق:","coptic_display":"ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ","audio_text":"إيڤانغيليون","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5038,"challenge_id":3023,"text":"إيڤ","is_correct":true,"image_url":null,"audio_url":null},{"id":5039,"challenge_id":3023,"text":"أوو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":205,"unit_id":51,"title":"مختبر المقارنة والتمييز السمعي للوحدة الأولى","xp_reward":6,"order_index":5,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3024,"lesson_id":205,"type":"read_select","question":"ميز بين «ⲙⲉⲧ» و «ⲙⲏⲧ»: الثانية بياء ممدودة وتعني:","coptic_display":"ⲙⲏⲧ","audio_text":"ميت","audio_url":"audio_coptic/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":1,"options":[{"id":5040,"challenge_id":3024,"text":"رقم عشرة (10)","is_correct":true,"image_url":null,"audio_url":null},{"id":5041,"challenge_id":3024,"text":"رقم خمسة","is_correct":false,"image_url":null,"audio_url":null},{"id":5042,"challenge_id":3024,"text":"خبز","is_correct":false,"image_url":null,"audio_url":null},{"id":6010,"challenge_id":3024,"text":"رقم سبعة (7)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3025,"lesson_id":205,"type":"match","question":"طابق كل كلمة بنطقها الصحيح من حيث طول الحركة:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ⲥⲟⲡ","right":"سوب (واو قصيرة)"},{"left":"ⲥⲱⲡ","right":"سووب (واو طويلة مفتوحة)"},{"left":"ⲥⲟⲩ","right":"سو (واو مضمومة)"}],"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":3026,"lesson_id":205,"type":"select","question":"أي من الكلمات التالية تشتمل على صوت (ڤ) صامت؟","coptic_display":"ⲥⲧⲁⲩⲣⲟⲥ / ⲕⲓⲙ / ⲣⲁⲛ","audio_text":"إستافروس","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5043,"challenge_id":3026,"text":"ⲥⲧⲁⲩⲣⲟⲥ (صليب)","is_correct":true,"image_url":null,"audio_url":null},{"id":5044,"challenge_id":3026,"text":"ⲕⲓⲙ (حركة)","is_correct":false,"image_url":null,"audio_url":null},{"id":5045,"challenge_id":3026,"text":"ⲣⲁⲛ (اسم)","is_correct":false,"image_url":null,"audio_url":null},{"id":6011,"challenge_id":3026,"text":"ⲥⲟⲡ (مرة)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3027,"lesson_id":205,"type":"write","question":"ركّب كلمة 'مع' بالقبطية:","coptic_display":"ⲛⲉⲙ","audio_text":"نِم","audio_url":"audio_coptic/8ei.mp3","correct_word":"ⲛⲉⲙ","tiles":["ⲛ","ⲉ","ⲙ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3028,"lesson_id":205,"type":"read_select","question":"كم مقطعاً صوتياً في كلمة «ⲉⲙⲙⲁⲛⲟⲩⲏⲗ» (عمانوئيل)؟","coptic_display":"ⲉⲙ/ⲙⲁ/ⲛⲟⲩ/ⲏⲗ","audio_text":"إمّانوئيل","audio_url":"audio_coptic/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5046,"challenge_id":3028,"text":"4 مقاطع (إم / ما / نو / إيل)","is_correct":true,"image_url":null,"audio_url":null},{"id":5047,"challenge_id":3028,"text":"مقطعان فقط","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3029,"lesson_id":205,"type":"read_select","question":"ما هو الحرف المتحرك الوحيد المخصص للفتح في القبطية؟","coptic_display":"Ⲁ","audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5048,"challenge_id":3029,"text":"الألفا (Ⲁ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5049,"challenge_id":3029,"text":"الإي (Ⲉ)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":42,"level_id":5,"title":"الوحدة ٢: الحروف من (Ⲋ – Ⲓ)","badge":"Ⲋ-Ⲓ","description":"تعلّم الرمز العددي سو والحروف من زاتا إلى إيوتا","order_index":2,"lessons":[{"id":138,"unit_id":42,"title":"حرف سو (رقم ٦) (Ⲋ ⲋ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":698,"lesson_id":138,"type":"text_view","question":"نبذة عن حرف سو (رقم ٦) (Ⲋ ⲋ)","coptic_display":"Ⲋ ⲋ","audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":"• اسم الحرف: سو (رقم ٦)\n• نطق الحرف بالعربي: سو (الرقم 6)\n• قواعد النطق: رمز ورقم عددي قبطي يدل على الرقم ستة (6). يوضع فوقه شرطة أفقية لتمييزه كرقم، وينطق \"سو\".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲋ̅ ⲛ̀ⲣⲱⲙⲓ\n  - القبطي المعرب (نطقها): «سوآوو إن رومي»\n  - المعنى بالعربية: 6 رجال\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":699,"lesson_id":138,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲋ واستمع لنطقه","coptic_display":"Ⲋ","audio_text":"سو (رقم ٦) كابيتال","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":700,"lesson_id":138,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲋ واستمع لنطقه","coptic_display":"ⲋ","audio_text":"سو (رقم ٦) سمول","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":701,"lesson_id":138,"type":"read_select","question":"ما هو نطق الحرف Ⲋ بالعربية؟","coptic_display":"Ⲋ","audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4380,"challenge_id":701,"text":"الرقم 6 (سو)","is_correct":true,"image_url":null,"audio_url":null},{"id":4381,"challenge_id":701,"text":"الرقم 7 (شاشف)","is_correct":false,"image_url":null,"audio_url":null},{"id":4382,"challenge_id":701,"text":"الرقم 5 (تيو)","is_correct":false,"image_url":null,"audio_url":null},{"id":4383,"challenge_id":701,"text":"الرقم 8 (شمين)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":702,"lesson_id":138,"type":"select","question":"ما معنى الكلمة القبطية: ⲋ̅ ⲛ̀ⲣⲱⲙⲓ؟ (المعرب: «سوآوو إن رومي»)","coptic_display":"ⲋ̅ ⲛ̀ⲣⲱⲙⲓ","audio_text":"سوآوو إن رومي","audio_url":"assets/sounds/6soohinrpmy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4384,"challenge_id":702,"text":"6 رجال","is_correct":true,"image_url":null,"audio_url":null},{"id":4385,"challenge_id":702,"text":"٥ رجال","is_correct":false,"image_url":null,"audio_url":null},{"id":4386,"challenge_id":702,"text":"٦ نساء","is_correct":false,"image_url":null,"audio_url":null},{"id":4387,"challenge_id":702,"text":"٧ رجال","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":703,"lesson_id":138,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: 6 رجال (المعرب: «سوآوو إن رومي»)","coptic_display":"ⲋ̅ ⲛ̀ⲣⲱⲙⲓ","audio_text":"سوآوو إن رومي","audio_url":"assets/sounds/6soohinrpmy.mp3","correct_word":"ⲋ̅ ⲛ̀ⲣⲱⲙⲓ","tiles":["ⲋ̅"," ","ⲛ","̀","ⲣ","ⲱ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":139,"unit_id":42,"title":"حرف زاتا (Ⲍ ⲍ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":704,"lesson_id":139,"type":"text_view","question":"نبذة عن حرف زاتا (Ⲍ ⲍ)","coptic_display":"Ⲍ ⲍ","audio_text":"زاتا","audio_url":"audio_coptic/7zeta.mp3","correct_word":"• اسم الحرف: زاتا\n• نطق الحرف بالعربي: ز\n• قواعد النطق: الحرف السابع في الأبجدية القبطية. يُنطق دائماً حرف \"ز\" مثل حرف (Z) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲍⲱⲏ\n  - القبطي المعرب (نطقها): «زوي»\n  - المعنى بالعربية: حياة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":705,"lesson_id":139,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲍ واستمع لنطقه","coptic_display":"Ⲍ","audio_text":"زاتا كابيتال","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":706,"lesson_id":139,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲍ واستمع لنطقه","coptic_display":"ⲍ","audio_text":"زاتا سمول","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":707,"lesson_id":139,"type":"read_select","question":"ما هو نطق الحرف Ⲍ بالعربية؟","coptic_display":"Ⲍ","audio_text":"زاتا","audio_url":"audio_coptic/7zeta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4390,"challenge_id":707,"text":"ز","is_correct":true,"image_url":null,"audio_url":null},{"id":4391,"challenge_id":707,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4389,"challenge_id":707,"text":"ذ","is_correct":false,"image_url":null,"audio_url":null},{"id":4388,"challenge_id":707,"text":"ص","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":708,"lesson_id":139,"type":"select","question":"ما معنى الكلمة القبطية: Ⲍⲱⲏ؟ (المعرب: «زوي»)","coptic_display":"Ⲍⲱⲏ","audio_text":"زوي","audio_url":"assets/sounds/7zowy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4393,"challenge_id":708,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4394,"challenge_id":708,"text":"حياة","is_correct":true,"image_url":null,"audio_url":null},{"id":4395,"challenge_id":708,"text":"سلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4392,"challenge_id":708,"text":"حق","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":709,"lesson_id":139,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: حياة (المعرب: «زوي»)","coptic_display":"Ⲍⲱⲏ","audio_text":"زوي","audio_url":"assets/sounds/7zowy.mp3","correct_word":"Ⲍⲱⲏ","tiles":["Ⲍ","ⲱ","ⲏ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":140,"unit_id":42,"title":"حرف هيتا (Ⲏ ⲏ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":710,"lesson_id":140,"type":"text_view","question":"نبذة عن حرف هيتا (Ⲏ ⲏ)","coptic_display":"Ⲏ ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":"• اسم الحرف: هيتا\n• نطق الحرف بالعربي: ياء طويلة ممدودة\n• قواعد النطق: الحرف الثامن. حرف متحرك للكسر يُنطق ياء ممدودة وطويلة مثل (ee) في كلمة meet.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲏⲓ\n  - القبطي المعرب (نطقها): «إي»\n  - المعنى بالعربية: بيت\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":711,"lesson_id":140,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲏ واستمع لنطقه","coptic_display":"Ⲏ","audio_text":"هيتا كابيتال","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":712,"lesson_id":140,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲏ واستمع لنطقه","coptic_display":"ⲏ","audio_text":"هيتا سمول","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":713,"lesson_id":140,"type":"read_select","question":"ما هو نطق الحرف Ⲏ بالعربية؟","coptic_display":"Ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4397,"challenge_id":713,"text":"ياء طويلة ممدودة","is_correct":true,"image_url":null,"audio_url":null},{"id":4398,"challenge_id":713,"text":"ياء قصيرة (كسرة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4399,"challenge_id":713,"text":"إي خفيفة","is_correct":false,"image_url":null,"audio_url":null},{"id":4396,"challenge_id":713,"text":"واو طويلة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":714,"lesson_id":140,"type":"select","question":"ما معنى الكلمة القبطية: Ⲏⲓ؟ (المعرب: «إي»)","coptic_display":"Ⲏⲓ","audio_text":"إي","audio_url":"assets/sounds/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4402,"challenge_id":714,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4400,"challenge_id":714,"text":"بيت","is_correct":true,"image_url":null,"audio_url":null},{"id":4401,"challenge_id":714,"text":"مدرسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4403,"challenge_id":714,"text":"هيكل","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":715,"lesson_id":140,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: بيت (المعرب: «إي»)","coptic_display":"Ⲏⲓ","audio_text":"إي","audio_url":"assets/sounds/8ei.mp3","correct_word":"Ⲏⲓ","tiles":["Ⲏ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":141,"unit_id":42,"title":"حرف ثيتا (Ⲑ ⲑ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":716,"lesson_id":141,"type":"text_view","question":"نبذة عن حرف ثيتا (Ⲑ ⲑ)","coptic_display":"Ⲑ ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/9seta.mp3","correct_word":"• اسم الحرف: ثيتا\n• نطق الحرف بالعربي: ث أو ت\n• قواعد النطق: الحرف التاسع. يُنطق \"ث\" دائماً، إلا إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) فيُنطق \"ت\".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: Ⲑⲁⲙⲓⲟ\n  - القبطي المعرب (نطقها): «ثاميو»\n  - المعنى بالعربية: يخلق\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":717,"lesson_id":141,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲑ واستمع لنطقه","coptic_display":"Ⲑ","audio_text":"ثيتا كابيتال","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":718,"lesson_id":141,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲑ واستمع لنطقه","coptic_display":"ⲑ","audio_text":"ثيتا سمول","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":719,"lesson_id":141,"type":"read_select","question":"ما هو نطق الحرف Ⲑ بالعربية؟","coptic_display":"Ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/9seta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4404,"challenge_id":719,"text":"ث أو ت","is_correct":true,"image_url":null,"audio_url":null},{"id":4406,"challenge_id":719,"text":"ت أو ط","is_correct":false,"image_url":null,"audio_url":null},{"id":4405,"challenge_id":719,"text":"ث أو س","is_correct":false,"image_url":null,"audio_url":null},{"id":4407,"challenge_id":719,"text":"د أو ذ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":720,"lesson_id":141,"type":"select","question":"ما معنى الكلمة القبطية: Ⲑⲁⲙⲓⲟ؟ (المعرب: «ثاميو»)","coptic_display":"Ⲑⲁⲙⲓⲟ","audio_text":"ثاميو","audio_url":"assets/sounds/9samyo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4409,"challenge_id":720,"text":"يبني","is_correct":false,"image_url":null,"audio_url":null},{"id":4410,"challenge_id":720,"text":"يعمل","is_correct":false,"image_url":null,"audio_url":null},{"id":4411,"challenge_id":720,"text":"يخلق","is_correct":true,"image_url":null,"audio_url":null},{"id":4408,"challenge_id":720,"text":"يصنع","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":721,"lesson_id":141,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: يخلق (المعرب: «ثاميو»)","coptic_display":"Ⲑⲁⲙⲓⲟ","audio_text":"ثاميو","audio_url":"assets/sounds/9samyo.mp3","correct_word":"Ⲑⲁⲙⲓⲟ","tiles":["Ⲑ","ⲁ","ⲙ","ⲓ","ⲟ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":142,"unit_id":42,"title":"حرف إيوتا (Ⲓ ⲓ)","xp_reward":5,"order_index":5,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":722,"lesson_id":142,"type":"text_view","question":"نبذة عن حرف إيوتا (Ⲓ ⲓ)","coptic_display":"Ⲓ ⲓ","audio_text":"إيوتا","audio_url":"audio_coptic/10yota.mp3","correct_word":"• اسم الحرف: إيوتا\n• نطق الحرف بالعربي: ياء قصيرة\n• قواعد النطق: الحرف العاشر. حرف متحرك يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف (I) في الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲓⲁⲗ\n  - القبطي المعرب (نطقها): «إيال»\n  - المعنى بالعربية: مراية\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":723,"lesson_id":142,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲓ واستمع لنطقه","coptic_display":"Ⲓ","audio_text":"إيوتا كابيتال","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":724,"lesson_id":142,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲓ واستمع لنطقه","coptic_display":"ⲓ","audio_text":"إيوتا سمول","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":725,"lesson_id":142,"type":"read_select","question":"ما هو نطق الحرف Ⲓ بالعربية؟","coptic_display":"Ⲓ","audio_text":"إيوتا","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4413,"challenge_id":725,"text":"ياء قصيرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4414,"challenge_id":725,"text":"ياء طويلة ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4415,"challenge_id":725,"text":"إي خفيفة","is_correct":false,"image_url":null,"audio_url":null},{"id":4412,"challenge_id":725,"text":"ألف لينة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":726,"lesson_id":142,"type":"select","question":"ما معنى الكلمة القبطية: ⲓⲁⲗ؟ (المعرب: «إيال»)","coptic_display":"ⲓⲁⲗ","audio_text":"إيال","audio_url":"audio_coptic/10yota.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4416,"challenge_id":726,"text":"مراية","is_correct":true,"image_url":null,"audio_url":null},{"id":4418,"challenge_id":726,"text":"نافذة","is_correct":false,"image_url":null,"audio_url":null},{"id":4417,"challenge_id":726,"text":"لوحة","is_correct":false,"image_url":null,"audio_url":null},{"id":4419,"challenge_id":726,"text":"صورة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":727,"lesson_id":142,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مراية (المعرب: «إيال»)","coptic_display":"ⲓⲁⲗ","audio_text":"إيال","audio_url":"audio_coptic/10yota.mp3","correct_word":"ⲓⲁⲗ","tiles":["ⲓ","ⲁ","ⲗ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":166,"unit_id":42,"title":"🔄 مراجعة الوحدة 2","xp_reward":5,"order_index":6,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":865,"lesson_id":166,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲋ ⲋ","right":"سو (رقم ٦) (سو (الرقم 6))"},{"left":"Ⲍ ⲍ","right":"زاتا (ز)"},{"left":"Ⲏ ⲏ","right":"هيتا (ياء طويلة ممدودة)"},{"left":"Ⲑ ⲑ","right":"ثيتا (ث أو ت)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":866,"lesson_id":166,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"سو (رقم ٦)","audio_url":"audio_coptic/6sow.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4610,"challenge_id":866,"text":"Ⲋ ⲋ (سو (رقم ٦))","is_correct":true,"image_url":null,"audio_url":null},{"id":4608,"challenge_id":866,"text":"Ⲍ ⲍ (زاتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4609,"challenge_id":866,"text":"Ⲥ ⲥ (سيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4611,"challenge_id":866,"text":"Ϣ ϣ (شاي)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":867,"lesson_id":166,"type":"select","question":"ما معنى الكلمة: Ⲍⲱⲏ؟ (المعرب: «زوي»)","coptic_display":"Ⲍⲱⲏ","audio_text":"زوي","audio_url":"assets/sounds/7zowy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4613,"challenge_id":867,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4614,"challenge_id":867,"text":"حق","is_correct":false,"image_url":null,"audio_url":null},{"id":4615,"challenge_id":867,"text":"سلام","is_correct":false,"image_url":null,"audio_url":null},{"id":4612,"challenge_id":867,"text":"حياة","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":868,"lesson_id":166,"type":"write","question":"رتب حروف الكلمة: مراية (المعرب: «إيال»)","coptic_display":"ⲓⲁⲗ","audio_text":"إيال","audio_url":"audio_coptic/10yota.mp3","correct_word":"ⲓⲁⲗ","tiles":["ⲓ","ⲁ","ⲗ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":869,"lesson_id":166,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲏ؟","coptic_display":"Ⲏ","audio_text":"هيتا","audio_url":"audio_coptic/8eta.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4616,"challenge_id":869,"text":"هيتا (ياء طويلة ممدودة)","is_correct":true,"image_url":null,"audio_url":null},{"id":4617,"challenge_id":869,"text":"إيوتا (ياء قصيرة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4619,"challenge_id":869,"text":"إي (إي خفيفة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4618,"challenge_id":869,"text":"أوميجا (واو طويلة)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":52,"level_id":6,"title":"الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة","badge":"الجِنكِم","description":"فهم فلسفة التشكيل القبطي بالجنكم وكيفية صياغة المقاطع ومنع التقاء السواكن.","order_index":2,"lessons":[{"id":206,"unit_id":52,"title":"الجنكم فوق الحروف الساكنة (صانع المقطع)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3030,"lesson_id":206,"type":"text_view","question":"قاعدة الجنكم فوق الحروف الساكنة","coptic_display":"ⲙ̀ ، ⲛ̀ ، ⲥ̀ ، ⲡ̀","audio_text":"جنكم ساكن","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• إذا وُضع الجنكم فوق حرف ساكن، يُنطق بمثابة همزة مكسورة خفيفة تسبق الحرف (إِ + الساكن)، فيجعله مقطعاً صوتياً مستقلاً بمفرده:\n  - ⲙ̀ ⬅ يُنطق (إِم) مثل: ⲙ̀/ⲫⲣⲏ (إمفري = مثل / كـ)\n  - ⲛ̀ ⬅ يُنطق (إِن) مثل: ⲛ̀/ⲧⲉ (إنتي = خاص بـ / لـ)\n  - ⲥ̀ ⬅ يُنطق (إِس) مثل: ⲥ̀/ⲙⲟⲩ (إسمو = بارك)\n  - ⲡ̀ ⬅ يُنطق (إِب) مثل: ⲡ̀/ϭⲟ/ⲓⲥ (إبشويس = الرب)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3031,"lesson_id":206,"type":"read_select","question":"كيف يُنطق حرف السيما في أول كلمة «ⲥ̀ⲙⲟⲩ» (بارك)؟","coptic_display":"ⲥ̀ⲙⲟⲩ","audio_text":"إسمو","audio_url":"audio_coptic/6soohinrpmy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5050,"challenge_id":3031,"text":"إِسـ (بهمزة مكسورة خفيفة قبل السين)","is_correct":true,"image_url":null,"audio_url":null},{"id":5051,"challenge_id":3031,"text":"سا","is_correct":false,"image_url":null,"audio_url":null},{"id":5052,"challenge_id":3031,"text":"سو","is_correct":false,"image_url":null,"audio_url":null},{"id":6012,"challenge_id":3031,"text":"سيـ (بكسرة تلي السين)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3032,"lesson_id":206,"type":"select","question":"ما معنى كلمة «ⲡ̀ϭⲟⲓⲥ» الكنسية الشهيرة؟","coptic_display":"ⲡ̀ϭⲟⲓⲥ","audio_text":"إبشويس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5053,"challenge_id":3032,"text":"الرب / السيد","is_correct":true,"image_url":null,"audio_url":null},{"id":5054,"challenge_id":3032,"text":"السماء","is_correct":false,"image_url":null,"audio_url":null},{"id":5055,"challenge_id":3032,"text":"الملك","is_correct":false,"image_url":null,"audio_url":null},{"id":6013,"challenge_id":3032,"text":"القدوس","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3033,"lesson_id":206,"type":"write","question":"ركّب كلمة 'بارك' مقطعة بالقبطية (إسمو):","coptic_display":"ⲥ̀ⲙⲟⲩ","audio_text":"إسمو","audio_url":"audio_coptic/6soohinrpmy.mp3","correct_word":"ⲥ̀ⲙⲟⲩ","tiles":["ⲥ̀","ⲙ","ⲟⲩ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3034,"lesson_id":206,"type":"read_select","question":"كم مقطعاً صوتياً في كلمة «ⲙ̀/ⲫⲣⲏ» (مثل)؟","coptic_display":"ⲙ̀/ⲫⲣⲏ","audio_text":"إمفري","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5056,"challenge_id":3034,"text":"مقطعان: (إم) و (فري)","is_correct":true,"image_url":null,"audio_url":null},{"id":5057,"challenge_id":3034,"text":"مقطع واحد","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3035,"lesson_id":206,"type":"read_select","question":"نطق حرف «ⲛ̀» في أول كلمة «ⲛ̀ⲧⲉ» هو:","coptic_display":"ⲛ̀ⲧⲉ","audio_text":"إنتي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5058,"challenge_id":3035,"text":"إِن","is_correct":true,"image_url":null,"audio_url":null},{"id":5059,"challenge_id":3035,"text":"نا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":207,"unit_id":52,"title":"الجنكم فوق الحروف المتحركة (همزة القطع)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3036,"lesson_id":207,"type":"text_view","question":"قاعدة الجنكم فوق الحروف المتحركة","coptic_display":"ⲁ̀ ، ⲉ̀ ، ⲓ̀","audio_text":"جنكم متحرك","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• إذا وُضع الجنكم فوق حرف متحرك، ينطق الحرف نفسه بنبرة استقلال قاطعة كهمزة القطع:\n  - ⲁ̀ ⬅ (آ قاطعة) مثل: ⲁ̀/ⲗⲟⲩ (آ-لو = صبي)\n  - ⲉ̀ ⬅ (إي قاطعة) مثل: ⲉ̀/ⲃⲟⲗ (إي-فول = خارجاً / من)\n  - ⲓ̀ ⬅ (إي قاطعة) مثل: ⲓ̀ (إي = تعالَ)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3037,"lesson_id":207,"type":"read_select","question":"ما هو أثر الجنكم فوق حرف متحرك مثل «ⲉ̀» في «ⲉ̀ⲃⲟⲗ»؟","coptic_display":"ⲉ̀ⲃⲟⲗ","audio_text":"إيفول","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5060,"challenge_id":3037,"text":"يفيد استقلال نطق الحرف كنبرة منفصلة قاطعة","is_correct":true,"image_url":null,"audio_url":null},{"id":5061,"challenge_id":3037,"text":"يجعله صامتاً","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3038,"lesson_id":207,"type":"select","question":"ما معنى كلمة «ⲉ̀ⲃⲟⲗ» بالقبطية؟","coptic_display":"ⲉ̀ⲃⲟⲗ","audio_text":"إيفول","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5062,"challenge_id":3038,"text":"خارجاً / من","is_correct":true,"image_url":null,"audio_url":null},{"id":5063,"challenge_id":3038,"text":"داخلاً","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3039,"lesson_id":207,"type":"write","question":"ركّب كلمة 'خارجاً' بالقبطية:","coptic_display":"ⲉ̀ⲃⲟⲗ","audio_text":"إيفول","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲉ̀ⲃⲟⲗ","tiles":["ⲉ̀","ⲃ","ⲟ","ⲗ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3040,"lesson_id":207,"type":"read_select","question":"في عبارة «ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ» (أنعم لنا)، كيف يُنطق المقطع الأول «ⲁ̀»؟","coptic_display":"ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ","audio_text":"آري إهموت","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5064,"challenge_id":3040,"text":"آ (بنبرة همزة قطع صريحة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5065,"challenge_id":3040,"text":"إِ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3041,"lesson_id":207,"type":"read_select","question":"ما الفرق في وظيفة الجنكم بين ساكن (ⲥ̀) ومتحرك (ⲉ̀)؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5066,"challenge_id":3041,"text":"على الساكن يسبقه بهمزة (إِسـ)، وعلى المتحرك ينطقه كهمزة مستقلة (إي)","is_correct":true,"image_url":null,"audio_url":null},{"id":5067,"challenge_id":3041,"text":"كلاهما متطابقان","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":208,"unit_id":52,"title":"الجنكم المتتابع والكلمات متعددة المقاطع","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3042,"lesson_id":208,"type":"text_view","question":"تتابع علامات الجنكم في الكلمة الواحدة","coptic_display":"ⲛ̀ⲧ̀ⲫⲉ ، ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ","audio_text":"جنكم متتابع","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• عندما تتتابع حروف ساكنة تحمل علامة الجنكم، ينطق كل حرف كمقطع مستقل:\n  - ⲛ̀/ⲧ̀/ⲫⲉ ⬅ يُنطق (إن - إت - فيه = السماء)\n  - ⲙ̀/ⲡ̀/ϭⲟ/ⲓⲥ ⬅ يُنطق (إم - إب - شو - يس = للرب)\n  - ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ ⬅ يُنطق (إف - س - ما - رو - ؤوت = مبارك)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3043,"lesson_id":208,"type":"read_select","question":"كلمة «ⲛ̀ⲧ̀ⲫⲉ» (السماء) تتكون من كم مقطع صوتي؟","coptic_display":"ⲛ̀/ⲧ̀/ⲫⲉ","audio_text":"إن إت فيه","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5068,"challenge_id":3043,"text":"3 مقاطع: (إن) و (إت) و (فيه)","is_correct":true,"image_url":null,"audio_url":null},{"id":5069,"challenge_id":3043,"text":"مقطعان فقط","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3044,"lesson_id":208,"type":"select","question":"ما معنى كلمة «ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» في التسابيح؟","coptic_display":"ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ","audio_text":"إفسماروؤوت","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5070,"challenge_id":3044,"text":"مبارك","is_correct":true,"image_url":null,"audio_url":null},{"id":5071,"challenge_id":3044,"text":"قدوس","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3045,"lesson_id":208,"type":"write","question":"ركّب كلمة 'السماء' ذات الجنكم المزدوج:","coptic_display":"ⲛ̀ⲧ̀ⲫⲉ","audio_text":"إن إت فيه","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲛ̀ⲧ̀ⲫⲉ","tiles":["ⲛ̀","ⲧ̀","ⲫ","ⲉ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3046,"lesson_id":208,"type":"read_select","question":"المقطعان الأولان في «ⲙ̀ⲡ̀ϭⲟⲓⲥ» (للرب) ينطقان:","coptic_display":"ⲙ̀ⲡ̀ϭⲟⲓⲥ","audio_text":"إم إبشويس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5072,"challenge_id":3046,"text":"إم - إب","is_correct":true,"image_url":null,"audio_url":null},{"id":5073,"challenge_id":3046,"text":"ما - با","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3047,"lesson_id":208,"type":"read_select","question":"لماذا وُضع الجنكم في كلمة «ⲛ̀ⲧ̀ⲫⲉ»؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5074,"challenge_id":3047,"text":"لمنع التقاء السواكن وتسهيل النطق بمقاطع مستقلة","is_correct":true,"image_url":null,"audio_url":null},{"id":5075,"challenge_id":3047,"text":"لأنه حرف علة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":209,"unit_id":52,"title":"مراجعة وتحدي إتقان الجِنكِم","xp_reward":6,"order_index":4,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3048,"lesson_id":209,"type":"match","question":"طابق الحرف بنطقه الفعلي عند وجود الجنكم:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ⲙ̀","right":"إِم"},{"left":"ⲡ̀","right":"إِب"},{"left":"ⲧ̀","right":"إِت"},{"left":"ϥ̀","right":"إِف"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":3049,"lesson_id":209,"type":"read_select","question":"في جملة «ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ»، كم علامة جنكم توجد؟","coptic_display":"ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ","audio_text":"إسمو إيبيكولوم","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5076,"challenge_id":3049,"text":"علامتان: الأولى فوق ⲥ̀ والثانية فوق ⲉ̀","is_correct":true,"image_url":null,"audio_url":null},{"id":5077,"challenge_id":3049,"text":"علامة واحدة فقط","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3050,"lesson_id":209,"type":"write","question":"ركّب كلمة 'الرب' مقطعة:","coptic_display":"ⲡ̀ϭⲟⲓⲥ","audio_text":"إبشويس","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲡ̀ϭⲟⲓⲥ","tiles":["ⲡ̀","ϭ","ⲟ","ⲓ","ⲥ"],"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":3051,"lesson_id":209,"type":"select","question":"كلمة «ⲙ̀ⲛⲟⲩϯ» المقطع الأول منها ينطق:","coptic_display":"ⲙ̀ⲛⲟⲩϯ","audio_text":"إمنوتي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5078,"challenge_id":3051,"text":"إِم (مقطع مستقل)","is_correct":true,"image_url":null,"audio_url":null},{"id":5079,"challenge_id":3051,"text":"مـا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3052,"lesson_id":209,"type":"read_select","question":"ما الفرق الصوتي بين «ⲡⲓ» و «ⲡ̀/ⲓ»؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5080,"challenge_id":3052,"text":"الأولى تُنطق (بي) مقطع واحد، والثانية (إِب - ي) مقطعين","is_correct":true,"image_url":null,"audio_url":null},{"id":5081,"challenge_id":3052,"text":"لا فرق بينهما","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3053,"lesson_id":209,"type":"read_select","question":"حرف «ⲭ̀» في كلمة «ⲭ̀ⲣⲱⲟⲩ» (شاطئ) يُنطق:","coptic_display":"ⲭ̀ⲣⲱⲟⲩ","audio_text":"إكروؤو","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5082,"challenge_id":3053,"text":"إِك","is_correct":true,"image_url":null,"audio_url":null},{"id":5083,"challenge_id":3053,"text":"كا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":43,"level_id":5,"title":"الوحدة ٣: الحروف من (Ⲕ – Ⲝ)","badge":"Ⲕ-Ⲝ","description":"تعلّم الحروف من كابا إلى كسي مع كلمات كنسية شهيرة","order_index":3,"lessons":[{"id":143,"unit_id":43,"title":"حرف كابا (Ⲕ ⲕ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":728,"lesson_id":143,"type":"text_view","question":"نبذة عن حرف كابا (Ⲕ ⲕ)","coptic_display":"Ⲕ ⲕ","audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":"• اسم الحرف: كابا\n• نطق الحرف بالعربي: ك\n• قواعد النطق: الحرف الحادي عشر في الأبجدية القبطية. يُنطق \"ك\" دائماً في جميع المواضع.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲕⲁϣ\n  - القبطي المعرب (نطقها): «كاش»\n  - المعنى بالعربية: قلم\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":729,"lesson_id":143,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲕ واستمع لنطقه","coptic_display":"Ⲕ","audio_text":"كابا كابيتال","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":730,"lesson_id":143,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲕ واستمع لنطقه","coptic_display":"ⲕ","audio_text":"كابا سمول","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":731,"lesson_id":143,"type":"read_select","question":"ما هو نطق الحرف Ⲕ بالعربية؟","coptic_display":"Ⲕ","audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4420,"challenge_id":731,"text":"ك","is_correct":true,"image_url":null,"audio_url":null},{"id":4422,"challenge_id":731,"text":"ق","is_correct":false,"image_url":null,"audio_url":null},{"id":4421,"challenge_id":731,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4423,"challenge_id":731,"text":"غ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":732,"lesson_id":143,"type":"select","question":"ما معنى الكلمة القبطية: ⲕⲁϣ؟ (المعرب: «كاش»)","coptic_display":"ⲕⲁϣ","audio_text":"كاش","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4425,"challenge_id":732,"text":"قلم","is_correct":true,"image_url":null,"audio_url":null},{"id":4426,"challenge_id":732,"text":"ورقة","is_correct":false,"image_url":null,"audio_url":null},{"id":4424,"challenge_id":732,"text":"كتاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4427,"challenge_id":732,"text":"مسطرة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":733,"lesson_id":143,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قلم (المعرب: «كاش»)","coptic_display":"ⲕⲁϣ","audio_text":"كاش","audio_url":"audio_coptic/11kapa.mp3","correct_word":"ⲕⲁϣ","tiles":["ⲕ","ⲁ","ϣ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":144,"unit_id":43,"title":"حرف لابدا (Ⲗ ⲗ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":734,"lesson_id":144,"type":"text_view","question":"نبذة عن حرف لابدا (Ⲗ ⲗ)","coptic_display":"Ⲗ ⲗ","audio_text":"لابدا","audio_url":"audio_coptic/12lavla.mp3","correct_word":"• اسم الحرف: لابدا\n• نطق الحرف بالعربي: ل\n• قواعد النطق: الحرف الثاني عشر. يُنطق \"ل\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲗⲁⲃⲟ\n  - القبطي المعرب (نطقها): «لاڤو»\n  - المعنى بالعربية: أسد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":735,"lesson_id":144,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲗ واستمع لنطقه","coptic_display":"Ⲗ","audio_text":"لابدا كابيتال","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":736,"lesson_id":144,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲗ واستمع لنطقه","coptic_display":"ⲗ","audio_text":"لابدا سمول","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":737,"lesson_id":144,"type":"read_select","question":"ما هو نطق الحرف Ⲗ بالعربية؟","coptic_display":"Ⲗ","audio_text":"لابدا","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4429,"challenge_id":737,"text":"ل","is_correct":true,"image_url":null,"audio_url":null},{"id":4430,"challenge_id":737,"text":"ر","is_correct":false,"image_url":null,"audio_url":null},{"id":4428,"challenge_id":737,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4431,"challenge_id":737,"text":"م","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":738,"lesson_id":144,"type":"select","question":"ما معنى الكلمة القبطية: ⲗⲁⲃⲟ؟ (المعرب: «لاڤو»)","coptic_display":"ⲗⲁⲃⲟ","audio_text":"لاڤو","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4435,"challenge_id":738,"text":"حصان","is_correct":false,"image_url":null,"audio_url":null},{"id":4434,"challenge_id":738,"text":"نمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4433,"challenge_id":738,"text":"ذئب","is_correct":false,"image_url":null,"audio_url":null},{"id":4432,"challenge_id":738,"text":"أسد","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":739,"lesson_id":144,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أسد (المعرب: «لاڤو»)","coptic_display":"ⲗⲁⲃⲟ","audio_text":"لاڤو","audio_url":"audio_coptic/12lavla.mp3","correct_word":"ⲗⲁⲃⲟ","tiles":["ⲗ","ⲁ","ⲃ","ⲟ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":145,"unit_id":43,"title":"حرف مي (Ⲙ ⲙ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":740,"lesson_id":145,"type":"text_view","question":"نبذة عن حرف مي (Ⲙ ⲙ)","coptic_display":"Ⲙ ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":"• اسم الحرف: مي\n• نطق الحرف بالعربي: م\n• قواعد النطق: الحرف الثالث عشر. يُنطق حرف \"م\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲙⲁⲛϩⲟⲛ\n  - القبطي المعرب (نطقها): «مانهون»\n  - المعنى بالعربية: برتقال\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":741,"lesson_id":145,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲙ واستمع لنطقه","coptic_display":"Ⲙ","audio_text":"مي كابيتال","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":742,"lesson_id":145,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲙ واستمع لنطقه","coptic_display":"ⲙ","audio_text":"مي سمول","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":743,"lesson_id":145,"type":"read_select","question":"ما هو نطق الحرف Ⲙ بالعربية؟","coptic_display":"Ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4436,"challenge_id":743,"text":"م","is_correct":true,"image_url":null,"audio_url":null},{"id":4437,"challenge_id":743,"text":"ن","is_correct":false,"image_url":null,"audio_url":null},{"id":4438,"challenge_id":743,"text":"ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4439,"challenge_id":743,"text":"و","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":744,"lesson_id":145,"type":"select","question":"ما معنى الكلمة القبطية: ⲙⲁⲛϩⲟⲛ؟ (المعرب: «مانهون»)","coptic_display":"ⲙⲁⲛϩⲟⲛ","audio_text":"مانهون","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4442,"challenge_id":744,"text":"برتقال","is_correct":true,"image_url":null,"audio_url":null},{"id":4443,"challenge_id":744,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4440,"challenge_id":744,"text":"بطيخ","is_correct":false,"image_url":null,"audio_url":null},{"id":4441,"challenge_id":744,"text":"تفاح","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":745,"lesson_id":145,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: برتقال (المعرب: «مانهون»)","coptic_display":"ⲙⲁⲛϩⲟⲛ","audio_text":"مانهون","audio_url":"audio_coptic/13mi.mp3","correct_word":"ⲙⲁⲛϩⲟⲛ","tiles":["ⲙ","ⲁ","ⲛ","ϩ","ⲟ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":146,"unit_id":43,"title":"حرف ني (Ⲛ ⲛ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":746,"lesson_id":146,"type":"text_view","question":"نبذة عن حرف ني (Ⲛ ⲛ)","coptic_display":"Ⲛ ⲛ","audio_text":"ني","audio_url":"audio_coptic/14ni.mp3","correct_word":"• اسم الحرف: ني\n• نطق الحرف بالعربي: ن\n• قواعد النطق: الحرف الرابع عشر. يُنطق حرف \"ن\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲉⲛ̀ⲕⲟⲧ\n  - القبطي المعرب (نطقها): «إنكوت»\n  - المعنى بالعربية: ينام\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":747,"lesson_id":146,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲛ واستمع لنطقه","coptic_display":"Ⲛ","audio_text":"ني كابيتال","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":748,"lesson_id":146,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲛ واستمع لنطقه","coptic_display":"ⲛ","audio_text":"ني سمول","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":749,"lesson_id":146,"type":"read_select","question":"ما هو نطق الحرف Ⲛ بالعربية؟","coptic_display":"Ⲛ","audio_text":"ني","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4447,"challenge_id":749,"text":"ن","is_correct":true,"image_url":null,"audio_url":null},{"id":4445,"challenge_id":749,"text":"م","is_correct":false,"image_url":null,"audio_url":null},{"id":4446,"challenge_id":749,"text":"ل","is_correct":false,"image_url":null,"audio_url":null},{"id":4444,"challenge_id":749,"text":"ر","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":750,"lesson_id":146,"type":"select","question":"ما معنى الكلمة القبطية: ⲉⲛ̀ⲕⲟⲧ؟ (المعرب: «إنكوت»)","coptic_display":"ⲉⲛ̀ⲕⲟⲧ","audio_text":"إنكوت","audio_url":"audio_coptic/14ni.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4449,"challenge_id":750,"text":"يأكل","is_correct":false,"image_url":null,"audio_url":null},{"id":4451,"challenge_id":750,"text":"يجلس","is_correct":false,"image_url":null,"audio_url":null},{"id":4450,"challenge_id":750,"text":"يستيقظ","is_correct":false,"image_url":null,"audio_url":null},{"id":4448,"challenge_id":750,"text":"ينام","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":751,"lesson_id":146,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: ينام (المعرب: «إنكوت»)","coptic_display":"ⲉⲛ̀ⲕⲟⲧ","audio_text":"إنكوت","audio_url":"audio_coptic/14ni.mp3","correct_word":"ⲉⲛ̀ⲕⲟⲧ","tiles":["ⲉ","ⲛ","̀","ⲕ","ⲟ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":147,"unit_id":43,"title":"حرف كسي (Ⲝ ⲝ)","xp_reward":5,"order_index":5,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":752,"lesson_id":147,"type":"text_view","question":"نبذة عن حرف كسي (Ⲝ ⲝ)","coptic_display":"Ⲝ ⲝ","audio_text":"كسي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"• اسم الحرف: كسي\n• نطق الحرف بالعربي: كـ + س\n• قواعد النطق: الحرف الخامس عشر. حرف مركب يُنطق كاف وسين معاً (كـ + س = X) في صوت واحد.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲝⲟⲩⲏ\n  - القبطي المعرب (نطقها): «إكسومي»\n  - المعنى بالعربية: مسطرة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":753,"lesson_id":147,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲝ واستمع لنطقه","coptic_display":"Ⲝ","audio_text":"كسي كابيتال","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":754,"lesson_id":147,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲝ واستمع لنطقه","coptic_display":"ⲝ","audio_text":"كسي سمول","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":755,"lesson_id":147,"type":"read_select","question":"ما هو نطق الحرف Ⲝ بالعربية؟","coptic_display":"Ⲝ","audio_text":"كسي","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4453,"challenge_id":755,"text":"كـ + س (إكس)","is_correct":true,"image_url":null,"audio_url":null},{"id":4455,"challenge_id":755,"text":"بـ + س (إبسي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4454,"challenge_id":755,"text":"ت + س","is_correct":false,"image_url":null,"audio_url":null},{"id":4452,"challenge_id":755,"text":"ك + ش","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":756,"lesson_id":147,"type":"select","question":"ما معنى الكلمة القبطية: ⲝⲟⲩⲏ؟ (المعرب: «إكسومي»)","coptic_display":"ⲝⲟⲩⲏ","audio_text":"إكسومي","audio_url":"audio_coptic/15axsy.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4459,"challenge_id":756,"text":"مسطرة","is_correct":true,"image_url":null,"audio_url":null},{"id":4456,"challenge_id":756,"text":"ممحاة","is_correct":false,"image_url":null,"audio_url":null},{"id":4457,"challenge_id":756,"text":"كتاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4458,"challenge_id":756,"text":"قلم","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":757,"lesson_id":147,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مسطرة (المعرب: «إكسومي»)","coptic_display":"ⲝⲟⲩⲏ","audio_text":"إكسومي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"ⲝⲟⲩⲏ","tiles":["ⲝ","ⲟ","ⲩ","ⲏ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":167,"unit_id":43,"title":"🔄 مراجعة الوحدة 3","xp_reward":5,"order_index":6,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":870,"lesson_id":167,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"Ⲗ ⲗ","right":"لابدا (ل)"},{"left":"Ⲙ ⲙ","right":"مي (م)"},{"left":"Ⲛ ⲛ","right":"ني (ن)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":871,"lesson_id":167,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"كابا","audio_url":"audio_coptic/11kapa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4622,"challenge_id":871,"text":"Ⲕ ⲕ (كابا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4623,"challenge_id":871,"text":"Ⲭ ⲭ (خي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4620,"challenge_id":871,"text":"Ⲅ ⲅ (غاما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4621,"challenge_id":871,"text":"Ⲧ ⲧ (تاو)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":872,"lesson_id":167,"type":"select","question":"ما معنى الكلمة: ⲗⲁⲃⲟ؟ (المعرب: «لاڤو»)","coptic_display":"ⲗⲁⲃⲟ","audio_text":"لاڤو","audio_url":"audio_coptic/12lavla.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4626,"challenge_id":872,"text":"أسد","is_correct":true,"image_url":null,"audio_url":null},{"id":4627,"challenge_id":872,"text":"نمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4624,"challenge_id":872,"text":"حصان","is_correct":false,"image_url":null,"audio_url":null},{"id":4625,"challenge_id":872,"text":"ذئب","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":873,"lesson_id":167,"type":"write","question":"رتب حروف الكلمة: مسطرة (المعرب: «إكسومي»)","coptic_display":"ⲝⲟⲩⲏ","audio_text":"إكسومي","audio_url":"audio_coptic/15axsy.mp3","correct_word":"ⲝⲟⲩⲏ","tiles":["ⲝ","ⲟ","ⲩ","ⲏ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":874,"lesson_id":167,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲙ؟","coptic_display":"Ⲙ","audio_text":"مي","audio_url":"audio_coptic/13mi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4629,"challenge_id":874,"text":"مي (م)","is_correct":true,"image_url":null,"audio_url":null},{"id":4630,"challenge_id":874,"text":"ني (ن)","is_correct":false,"image_url":null,"audio_url":null},{"id":4631,"challenge_id":874,"text":"لابدا (ل)","is_correct":false,"image_url":null,"audio_url":null},{"id":4628,"challenge_id":874,"text":"رو (ر)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":53,"level_id":6,"title":"الوحدة ٣: الحروف ذات النطق الشرطي المزدوج","badge":"نطق مزدوج","description":"فحص الحرف التالي بدقة لتحديد صوت الحرف: فيدا (Ⲃ)، دلدا (Ⲇ)، ثيتا (Ⲑ)، وجانجا (Ϫ).","order_index":3,"lessons":[{"id":210,"unit_id":53,"title":"حرف الفيتا (Ⲃ ⲃ) — بين 'ڤ' و 'ب'","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3054,"lesson_id":210,"type":"text_view","question":"قاعدة نطق حرف الفيتا (Ⲃ ⲃ)","coptic_display":"Ⲃ ⲃ","audio_text":"فيتا","audio_url":"audio_coptic/2vo.mp3","correct_word":"• يُنطق (ڤ - V): إذا تلاه أي حرف متحرك (Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲩ, Ⲱ).\n  - أمثلة: ⲃⲁⲗ (ڤال = عين)، ⲃⲱⲕ (ڤوك = اذهب)، ⲉ̀ⲃⲟⲗ (إيڤول = خارجاً)\n• يُنطق (ب - B): إذا تلاه حرف ساكن أو جاء في نهاية الكلمة.\n  - أمثلة: ⲧⲱⲃ (توب = طوبة)، ⲛⲓⲃ (نيف = كل)، ⲁⲃⲃⲁ (أبّا = أب)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3055,"lesson_id":210,"type":"read_select","question":"كيف يُنطق حرف «Ⲃ» في كلمة «ⲃⲁⲗ» (عين)؟","coptic_display":"ⲃⲁⲗ","audio_text":"ڤال","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5084,"challenge_id":3055,"text":"ڤ (V) لمجيء حرف متحرك (Ⲁ) بعده","is_correct":true,"image_url":null,"audio_url":null},{"id":5085,"challenge_id":3055,"text":"ب (B)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3056,"lesson_id":210,"type":"read_select","question":"كيف يُنطق حرف «Ⲃ» في نهاية كلمة «ⲧⲱⲃ»؟","coptic_display":"ⲧⲱⲃ","audio_text":"توب","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5086,"challenge_id":3056,"text":"ب (B) لوقوعه في نهاية الكلمة","is_correct":true,"image_url":null,"audio_url":null},{"id":5087,"challenge_id":3056,"text":"ڤ (V)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3057,"lesson_id":210,"type":"select","question":"ما معنى كلمة «ⲃⲱⲕ» بالقبطية؟","coptic_display":"ⲃⲱⲕ","audio_text":"ڤوك","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5088,"challenge_id":3057,"text":"اذهب / انطلق","is_correct":true,"image_url":null,"audio_url":null},{"id":5089,"challenge_id":3057,"text":"اجلس","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3058,"lesson_id":210,"type":"write","question":"ركّب كلمة 'عين' بالقبطية (ڤال):","coptic_display":"ⲃⲁⲗ","audio_text":"ڤال","audio_url":"audio_coptic/2vo.mp3","correct_word":"ⲃⲁⲗ","tiles":["ⲃ","ⲁ","ⲗ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3059,"lesson_id":210,"type":"read_select","question":"في كلمة «ⲁⲃⲃⲁ» (أبّا)، نُطق حرف الفيتا (ب) لأن:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5090,"challenge_id":3059,"text":"بعده حرف ساكن آخر","is_correct":true,"image_url":null,"audio_url":null},{"id":5091,"challenge_id":3059,"text":"بعده حرف متحرك","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":211,"unit_id":53,"title":"حرف الدلتا (Ⲇ ⲇ) — بين 'د' و 'ذ'","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3060,"lesson_id":211,"type":"text_view","question":"قاعدة نطق حرف الدلتا (Ⲇ ⲇ)","coptic_display":"Ⲇ ⲇ","audio_text":"دلتا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• يُنطق (د - D): في أسماء الأعلام والأشخاص والمدن والبلاد المقدسة.\n  - أمثلة: Ⲇⲁⲩⲓⲇ (داڤيد = داود الملك)، Ⲇⲁⲛⲓⲏⲗ (دانيال النبي)، Ⲓⲟⲣⲇⲁⲛⲏⲥ (يوردانيس = نهر الأردن)\n• يُنطق (ذ - DH): في باقي الكلمات العامة (ومعظمها يوناني الأصل).\n  - أمثلة: ⲇⲟⲝⲁ (ذوكصا = مجد)، ⲇⲓⲁⲕⲱⲛ (ذياكون = شماس)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3061,"lesson_id":211,"type":"read_select","question":"يُنطق حرف «Ⲇ» في اسم «Ⲇⲁⲩⲓⲇ» بصوت:","coptic_display":"Ⲇⲁⲩⲓⲇ","audio_text":"داڤيد","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5092,"challenge_id":3061,"text":"د (D) لأنه اسم عَلَم","is_correct":true,"image_url":null,"audio_url":null},{"id":5093,"challenge_id":3061,"text":"ذ (DH)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3062,"lesson_id":211,"type":"read_select","question":"يُنطق حرف «Ⲇ» في كلمة «ⲇⲟⲝⲁ» (مجد) بصوت:","coptic_display":"ⲇⲟⲝⲁ","audio_text":"ذوكصا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5094,"challenge_id":3062,"text":"ذ (DH) لأنها كلمة عامة وليست اسم عَلَم","is_correct":true,"image_url":null,"audio_url":null},{"id":5095,"challenge_id":3062,"text":"د (D)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3063,"lesson_id":211,"type":"select","question":"كلمة «ⲇⲓⲁⲕⲱⲛ» تعني في الكنيسة:","coptic_display":"ⲇⲓⲁⲕⲱⲛ","audio_text":"ذياكون","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5096,"challenge_id":3063,"text":"شماس / خادم","is_correct":true,"image_url":null,"audio_url":null},{"id":5097,"challenge_id":3063,"text":"كاهن","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3064,"lesson_id":211,"type":"write","question":"ركّب كلمة 'مجد' بالقبطية (ذوكصا):","coptic_display":"ⲇⲟⲝⲁ","audio_text":"ذوكصا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲇⲟⲝⲁ","tiles":["ⲇ","ⲟ","ⲝ","ⲁ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3065,"lesson_id":211,"type":"read_select","question":"نهر الأردن «Ⲓⲟⲣⲇⲁⲛⲏⲥ» ينطق فيه الدلتا بصوت:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5098,"challenge_id":3065,"text":"د (D) لأنه اسم مكان مقدّس (عَلَم)","is_correct":true,"image_url":null,"audio_url":null},{"id":5099,"challenge_id":3065,"text":"ذ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":212,"unit_id":53,"title":"حرف الثيتا (Ⲑ ⲑ) — بين 'ت' و 'ث'","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3066,"lesson_id":212,"type":"text_view","question":"قاعدة نطق حرف الثيتا (Ⲑ ⲑ)","coptic_display":"Ⲑ ⲑ","audio_text":"ثيتا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• يُنطق (ت - T): إذا سبقه مباشرة حرف السيما (Ⲥ) أو حرف الشاي (Ϣ).\n  - أمثلة: ⲙⲓⲥ/ⲑⲟⲥ (مستوس = أجرة)، ⲁⲥ/ⲑⲉ/ⲛⲏⲥ (أستينيس = ضعيف / مريض)\n• يُنطق (ث - TH): في جميع الحالات الأخرى.\n  - أمثلة: ⲑⲱⲛ (ثون = أين)، ⲑⲉⲟⲥ (ثيئوس = إله)، ⲡⲁⲣⲑⲉⲛⲟⲥ (بارثينوس = عذراء)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3067,"lesson_id":212,"type":"read_select","question":"في كلمة «ⲙⲓⲥⲑⲟⲥ» (أجرة)، يُنطق حرف «Ⲑ»:","coptic_display":"ⲙⲓⲥⲑⲟⲥ","audio_text":"مستوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5100,"challenge_id":3067,"text":"ت (T) لأنه مسبوق بحرف السيما (Ⲥ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5101,"challenge_id":3067,"text":"ث (TH)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3068,"lesson_id":212,"type":"read_select","question":"في كلمة «ⲑⲱⲛ» (أين)، يُنطق حرف «Ⲑ»:","coptic_display":"ⲑⲱⲛ","audio_text":"ثون","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5102,"challenge_id":3068,"text":"ث (TH) لعدم وجود سيما أو شاي قبله","is_correct":true,"image_url":null,"audio_url":null},{"id":5103,"challenge_id":3068,"text":"ت (T)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3069,"lesson_id":212,"type":"select","question":"معنى كلمة «ⲡⲁⲣⲑⲉⲛⲟⲥ» في التسابيح هو:","coptic_display":"ⲡⲁⲣⲑⲉⲛⲟⲥ","audio_text":"بارثينوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5104,"challenge_id":3069,"text":"العذراء","is_correct":true,"image_url":null,"audio_url":null},{"id":5105,"challenge_id":3069,"text":"الملكة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3070,"lesson_id":212,"type":"write","question":"ركّب كلمة 'أين' بالقبطية (ثون):","coptic_display":"ⲑⲱⲛ","audio_text":"ثون","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲑⲱⲛ","tiles":["ⲑ","ⲱ","ⲛ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3071,"lesson_id":212,"type":"read_select","question":"كلمة «ⲑⲉⲟⲥ» (إله) تنطق:","coptic_display":"ⲑⲉⲟⲥ","audio_text":"ثيئوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5106,"challenge_id":3071,"text":"ثيئوس","is_correct":true,"image_url":null,"audio_url":null},{"id":5107,"challenge_id":3071,"text":"تيئوس","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":213,"unit_id":53,"title":"حرف الجانجا (Ϫ ϫ) — بين 'جيم معطشة' و 'جيم صلبة'","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3072,"lesson_id":213,"type":"text_view","question":"قاعدة نطق حرف الجانجا (Ϫ ϫ)","coptic_display":"Ϫ ϫ","audio_text":"جانجا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• يُنطق (جيم معطشة - J): إذا تلاه حرف متحرك مائل للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  - أمثلة: ϫⲉ (جيه = لأن / قائلاً)، ϫⲓ (جي = خُذ)، ϫⲏϫ (جيج = رؤساء)\n• يُنطق (جيم مصرية صلبة غير معطشة - G): في باقي الحالات (قبل الفتح والضم والسواكن وفي آخر الكلمة).\n  - أمثلة: ϫⲁⲙⲟⲩⲗ (جامول = جمل)، ϫⲟⲙ (جوم = قوة)، ⲁϫⲡ (أجب = ساعة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3073,"lesson_id":213,"type":"read_select","question":"يُنطق حرف «Ϫ» في كلمة «ϫⲉ» (لأن):","coptic_display":"ϫⲉ","audio_text":"جيه","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5108,"challenge_id":3073,"text":"جيم معطشة (J) لمجيء حرف كسر (Ⲉ) بعده","is_correct":true,"image_url":null,"audio_url":null},{"id":5109,"challenge_id":3073,"text":"جيم صلبة (G)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3074,"lesson_id":213,"type":"read_select","question":"يُنطق حرف «Ϫ» في كلمة «ϫⲁⲙⲟⲩⲗ» (جمل):","coptic_display":"ϫⲁⲙⲟⲩⲗ","audio_text":"جامول","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5110,"challenge_id":3074,"text":"جيم قاهرية صلبة (G) لعدم وجود كسر بعده","is_correct":true,"image_url":null,"audio_url":null},{"id":5111,"challenge_id":3074,"text":"جيم معطشة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3075,"lesson_id":213,"type":"select","question":"كلمة «ϫⲟⲙ» تعني بالقبطية:","coptic_display":"ϫⲟⲙ","audio_text":"جوم","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5112,"challenge_id":3075,"text":"قوة","is_correct":true,"image_url":null,"audio_url":null},{"id":5113,"challenge_id":3075,"text":"ضعف","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3076,"lesson_id":213,"type":"write","question":"ركّب كلمة 'جمل' بالقبطية (جامول):","coptic_display":"ϫⲁⲙⲟⲩⲗ","audio_text":"جامول","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϫⲁⲙⲟⲩⲗ","tiles":["ϫ","ⲁ","ⲙ","ⲟⲩ","ⲗ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3077,"lesson_id":213,"type":"read_select","question":"في كلمة «ⲁϫⲡ» (ساعة)، يُنطق حرف الجانجا:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5114,"challenge_id":3077,"text":"جيم صلبة (أجب) لأنه متبوع بحرف ساكن (Ⲡ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5115,"challenge_id":3077,"text":"جيم معطشة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":214,"unit_id":53,"title":"مراجعة وتحدي الحروف الثنائية النطق","xp_reward":6,"order_index":5,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3078,"lesson_id":214,"type":"match","question":"طابق الحرف بشرط نطقه المحدد بدقة:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲃ","right":"ڤ قبل المتحرك وب في غير ذلك"},{"left":"Ⲇ","right":"د في أسماء الأعلام وذ في العام"},{"left":"Ⲑ","right":"ت بعد س وش وث في غير ذلك"},{"left":"Ϫ","right":"جيم معطشة قبل الكسر وصلبة في غيره"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":3079,"lesson_id":214,"type":"read_select","question":"أي كلمة مما يلي تحتوي جيماً معطشة صريحة؟","coptic_display":"ϫⲉ / ϫⲟⲙ / ϫⲁⲙⲟⲩⲗ","audio_text":"جيه","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5116,"challenge_id":3079,"text":"ϫⲉ (جيه)","is_correct":true,"image_url":null,"audio_url":null},{"id":5117,"challenge_id":3079,"text":"ϫⲟⲙ (جوم)","is_correct":false,"image_url":null,"audio_url":null},{"id":5118,"challenge_id":3079,"text":"ϫⲁⲙⲟⲩⲗ (جامول)","is_correct":false,"image_url":null,"audio_url":null},{"id":6014,"challenge_id":3079,"text":"ϫⲱ (جو)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3080,"lesson_id":214,"type":"write","question":"ركّب اسم 'داود' بالقبطية (داڤيد):","coptic_display":"Ⲇⲁⲩⲓⲇ","audio_text":"داڤيد","audio_url":"audio_coptic/1alfa.mp3","correct_word":"Ⲇⲁⲩⲓⲇ","tiles":["Ⲇ","ⲁ","ⲩ","ⲓ","ⲇ"],"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":3081,"lesson_id":214,"type":"read_select","question":"كلمة «ⲁⲥⲑⲉⲛⲏⲥ» (مريض) نطق حرف الثيتا فيها هو:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5119,"challenge_id":3081,"text":"ت (أستينيس)","is_correct":true,"image_url":null,"audio_url":null},{"id":5120,"challenge_id":3081,"text":"ث","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3082,"lesson_id":214,"type":"select","question":"في جملة «ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ Ⲇⲁⲩⲓⲇ»، نطق الفيتا والدلتا هو:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5121,"challenge_id":3082,"text":"ڤ (في إيڤول) و د (في داڤيد)","is_correct":true,"image_url":null,"audio_url":null},{"id":5122,"challenge_id":3082,"text":"ب و ذ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3083,"lesson_id":214,"type":"read_select","question":"هل الجانجا حرف مصري ديموطيقي أم يوناني؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5123,"challenge_id":3083,"text":"حرف مصري ديموطيقي أصيل","is_correct":true,"image_url":null,"audio_url":null},{"id":5124,"challenge_id":3083,"text":"حرف يوناني","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":44,"level_id":5,"title":"الوحدة ٤: الحروف من (Ⲟ – Ⲧ)","badge":"Ⲟ-Ⲧ","description":"تعلّم الحروف من أُو قصيرة إلى تاف","order_index":4,"lessons":[{"id":148,"unit_id":44,"title":"حرف أُو (قصيرة) (Ⲟ ⲟ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":758,"lesson_id":148,"type":"text_view","question":"نبذة عن حرف أُو (قصيرة) (Ⲟ ⲟ)","coptic_display":"Ⲟ ⲟ","audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":"• اسم الحرف: أُو (قصيرة)\n• نطق الحرف بالعربي: واو قصيرة مضمومة\n• قواعد النطق: الحرف السادس عشر. حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲟⲩⲱⲙ\n  - القبطي المعرب (نطقها): «أوؤم»\n  - المعنى بالعربية: يأكل\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":759,"lesson_id":148,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲟ واستمع لنطقه","coptic_display":"Ⲟ","audio_text":"أُو (قصيرة) كابيتال","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":760,"lesson_id":148,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲟ واستمع لنطقه","coptic_display":"ⲟ","audio_text":"أُو (قصيرة) سمول","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":761,"lesson_id":148,"type":"read_select","question":"ما هو نطق الحرف Ⲟ بالعربية؟","coptic_display":"Ⲟ","audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4463,"challenge_id":761,"text":"واو قصيرة مضمومة","is_correct":true,"image_url":null,"audio_url":null},{"id":4460,"challenge_id":761,"text":"واو طويلة ممدودة","is_correct":false,"image_url":null,"audio_url":null},{"id":4461,"challenge_id":761,"text":"ألف مفخمة","is_correct":false,"image_url":null,"audio_url":null},{"id":4462,"challenge_id":761,"text":"واو لينة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":762,"lesson_id":148,"type":"select","question":"ما معنى الكلمة القبطية: ⲟⲩⲱⲙ؟ (المعرب: «أوؤم»)","coptic_display":"ⲟⲩⲱⲙ","audio_text":"أوؤم","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4465,"challenge_id":762,"text":"يشرب","is_correct":false,"image_url":null,"audio_url":null},{"id":4467,"challenge_id":762,"text":"ينام","is_correct":false,"image_url":null,"audio_url":null},{"id":4466,"challenge_id":762,"text":"يأكل","is_correct":true,"image_url":null,"audio_url":null},{"id":4464,"challenge_id":762,"text":"يمشي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":763,"lesson_id":148,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: يأكل (المعرب: «أوؤم»)","coptic_display":"ⲟⲩⲱⲙ","audio_text":"أوؤم","audio_url":"audio_coptic/16oo.mp3","correct_word":"ⲟⲩⲱⲙ","tiles":["ⲟ","ⲩ","ⲱ","ⲙ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":149,"unit_id":44,"title":"حرف بي (Ⲡ ⲡ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":764,"lesson_id":149,"type":"text_view","question":"نبذة عن حرف بي (Ⲡ ⲡ)","coptic_display":"Ⲡ ⲡ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":"• اسم الحرف: بي\n• نطق الحرف بالعربي: ب ثقيلة مشددة\n• قواعد النطق: الحرف السابع عشر. يُنطق \"ب\" شديدة مشددة مثل حرف (P) في اللغة الإنجليزية.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲡⲓⲱⲧ\n  - القبطي المعرب (نطقها): «بايوت»\n  - المعنى بالعربية: أبي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":765,"lesson_id":149,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲡ واستمع لنطقه","coptic_display":"Ⲡ","audio_text":"بي كابيتال","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":766,"lesson_id":149,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲡ واستمع لنطقه","coptic_display":"ⲡ","audio_text":"بي سمول","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":767,"lesson_id":149,"type":"read_select","question":"ما هو نطق الحرف Ⲡ بالعربية؟","coptic_display":"Ⲡ","audio_text":"بي","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4469,"challenge_id":767,"text":"ب ثقيلة (P)","is_correct":true,"image_url":null,"audio_url":null},{"id":4471,"challenge_id":767,"text":"ب أو ڤ (فيدا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4470,"challenge_id":767,"text":"ف","is_correct":false,"image_url":null,"audio_url":null},{"id":4468,"challenge_id":767,"text":"م","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":768,"lesson_id":149,"type":"select","question":"ما معنى الكلمة القبطية: ⲡⲓⲱⲧ؟ (المعرب: «بايوت»)","coptic_display":"ⲡⲓⲱⲧ","audio_text":"بايوت","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4475,"challenge_id":768,"text":"أبي","is_correct":true,"image_url":null,"audio_url":null},{"id":4472,"challenge_id":768,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":4473,"challenge_id":768,"text":"أخي","is_correct":false,"image_url":null,"audio_url":null},{"id":4474,"challenge_id":768,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":769,"lesson_id":149,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أبي (المعرب: «بايوت»)","coptic_display":"ⲡⲓⲱⲧ","audio_text":"بايوت","audio_url":"audio_coptic/17pee.mp3","correct_word":"ⲡⲓⲱⲧ","tiles":["ⲡ","ⲓ","ⲱ","ⲧ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":150,"unit_id":44,"title":"حرف رو (Ⲣ ⲣ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":770,"lesson_id":150,"type":"text_view","question":"نبذة عن حرف رو (Ⲣ ⲣ)","coptic_display":"Ⲣ ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":"• اسم الحرف: رو\n• نطق الحرف بالعربي: ر\n• قواعد النطق: الحرف الثامن عشر. يُنطق حرف \"ر\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲣⲏ\n  - القبطي المعرب (نطقها): «ري»\n  - المعنى بالعربية: شمس\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":771,"lesson_id":150,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲣ واستمع لنطقه","coptic_display":"Ⲣ","audio_text":"رو كابيتال","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":772,"lesson_id":150,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲣ واستمع لنطقه","coptic_display":"ⲣ","audio_text":"رو سمول","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":773,"lesson_id":150,"type":"read_select","question":"ما هو نطق الحرف Ⲣ بالعربية؟","coptic_display":"Ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4479,"challenge_id":773,"text":"ر","is_correct":true,"image_url":null,"audio_url":null},{"id":4476,"challenge_id":773,"text":"ل","is_correct":false,"image_url":null,"audio_url":null},{"id":4477,"challenge_id":773,"text":"د","is_correct":false,"image_url":null,"audio_url":null},{"id":4478,"challenge_id":773,"text":"ز","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":774,"lesson_id":150,"type":"select","question":"ما معنى الكلمة القبطية: ⲣⲏ؟ (المعرب: «ري»)","coptic_display":"ⲣⲏ","audio_text":"ري","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4481,"challenge_id":774,"text":"قمر","is_correct":false,"image_url":null,"audio_url":null},{"id":4483,"challenge_id":774,"text":"نجم","is_correct":false,"image_url":null,"audio_url":null},{"id":4482,"challenge_id":774,"text":"شمس","is_correct":true,"image_url":null,"audio_url":null},{"id":4480,"challenge_id":774,"text":"سماء","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":775,"lesson_id":150,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شمس (المعرب: «ري»)","coptic_display":"ⲣⲏ","audio_text":"ري","audio_url":"audio_coptic/18roo.mp3","correct_word":"ⲣⲏ","tiles":["ⲣ","ⲏ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":151,"unit_id":44,"title":"حرف سيما (Ⲥ ⲥ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":776,"lesson_id":151,"type":"text_view","question":"نبذة عن حرف سيما (Ⲥ ⲥ)","coptic_display":"Ⲥ ⲥ","audio_text":"سيما","audio_url":"audio_coptic/19sema.mp3","correct_word":"• اسم الحرف: سيما\n• نطق الحرف بالعربي: س\n• قواعد النطق: الحرف التاسع عشر. يُنطق حرف \"س\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲡⲁⲥⲟⲛ\n  - القبطي المعرب (نطقها): «باصون»\n  - المعنى بالعربية: أخي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":777,"lesson_id":151,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲥ واستمع لنطقه","coptic_display":"Ⲥ","audio_text":"سيما كابيتال","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":778,"lesson_id":151,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲥ واستمع لنطقه","coptic_display":"ⲥ","audio_text":"سيما سمول","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":779,"lesson_id":151,"type":"read_select","question":"ما هو نطق الحرف Ⲥ بالعربية؟","coptic_display":"Ⲥ","audio_text":"سيما","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4485,"challenge_id":779,"text":"س","is_correct":true,"image_url":null,"audio_url":null},{"id":4487,"challenge_id":779,"text":"ص","is_correct":false,"image_url":null,"audio_url":null},{"id":4486,"challenge_id":779,"text":"ز","is_correct":false,"image_url":null,"audio_url":null},{"id":4484,"challenge_id":779,"text":"ش","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":780,"lesson_id":151,"type":"select","question":"ما معنى الكلمة القبطية: ⲡⲁⲥⲟⲛ؟ (المعرب: «باصون»)","coptic_display":"ⲡⲁⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/19sema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4491,"challenge_id":780,"text":"أخي","is_correct":true,"image_url":null,"audio_url":null},{"id":4488,"challenge_id":780,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null},{"id":4489,"challenge_id":780,"text":"صديقي","is_correct":false,"image_url":null,"audio_url":null},{"id":4490,"challenge_id":780,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":781,"lesson_id":151,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أخي (المعرب: «باصون»)","coptic_display":"ⲡⲁⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/19sema.mp3","correct_word":"ⲡⲁⲥⲟⲛ","tiles":["ⲡ","ⲁ","ⲥ","ⲟ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":152,"unit_id":44,"title":"حرف تاف (Ⲧ ⲧ)","xp_reward":5,"order_index":5,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":782,"lesson_id":152,"type":"text_view","question":"نبذة عن حرف تاف (Ⲧ ⲧ)","coptic_display":"Ⲧ ⲧ","audio_text":"تاف","audio_url":"audio_coptic/20tav.mp3","correct_word":"• اسم الحرف: تاف\n• نطق الحرف بالعربي: ت\n• قواعد النطق: الحرف العشرون في الأبجدية القبطية. يُنطق حرف \"ت\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲧⲁⲙⲁⲩ\n  - القبطي المعرب (نطقها): «تاماف»\n  - المعنى بالعربية: أمي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":783,"lesson_id":152,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲧ واستمع لنطقه","coptic_display":"Ⲧ","audio_text":"تاف كابيتال","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":784,"lesson_id":152,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲧ واستمع لنطقه","coptic_display":"ⲧ","audio_text":"تاف سمول","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":785,"lesson_id":152,"type":"read_select","question":"ما هو نطق الحرف Ⲧ بالعربية؟","coptic_display":"Ⲧ","audio_text":"تاف","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4495,"challenge_id":785,"text":"ت","is_correct":true,"image_url":null,"audio_url":null},{"id":4492,"challenge_id":785,"text":"ط","is_correct":false,"image_url":null,"audio_url":null},{"id":4493,"challenge_id":785,"text":"د","is_correct":false,"image_url":null,"audio_url":null},{"id":4494,"challenge_id":785,"text":"ث","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":786,"lesson_id":152,"type":"select","question":"ما معنى الكلمة القبطية: ⲧⲁⲙⲁⲩ؟ (المعرب: «تاماف»)","coptic_display":"ⲧⲁⲙⲁⲩ","audio_text":"تاماف","audio_url":"audio_coptic/20tav.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4497,"challenge_id":786,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":4499,"challenge_id":786,"text":"جدتي","is_correct":false,"image_url":null,"audio_url":null},{"id":4498,"challenge_id":786,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null},{"id":4496,"challenge_id":786,"text":"أمي","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":787,"lesson_id":152,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أمي (المعرب: «تاماف»)","coptic_display":"ⲧⲁⲙⲁⲩ","audio_text":"تاماف","audio_url":"audio_coptic/20tav.mp3","correct_word":"ⲧⲁⲙⲁⲩ","tiles":["ⲧ","ⲁ","ⲙ","ⲁ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":168,"unit_id":44,"title":"🔄 مراجعة الوحدة 4","xp_reward":5,"order_index":6,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":875,"lesson_id":168,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲟ ⲟ","right":"أُو (قصيرة) (واو قصيرة مضمومة)"},{"left":"Ⲡ ⲡ","right":"بي (ب ثقيلة مشددة)"},{"left":"Ⲣ ⲣ","right":"رو (ر)"},{"left":"Ⲥ ⲥ","right":"سيما (س)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":876,"lesson_id":168,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"أُو (قصيرة)","audio_url":"audio_coptic/16oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4632,"challenge_id":876,"text":"Ⲟ ⲟ (أُو (قصيرة))","is_correct":true,"image_url":null,"audio_url":null},{"id":4635,"challenge_id":876,"text":"Ⲱ ⲱ (أوميجا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4633,"challenge_id":876,"text":"Ⲉ ⲉ (إي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4634,"challenge_id":876,"text":"Ⲁ ⲁ (ألفا)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":877,"lesson_id":168,"type":"select","question":"ما معنى الكلمة: ⲡⲓⲱⲧ؟ (المعرب: «بايوت»)","coptic_display":"ⲡⲓⲱⲧ","audio_text":"بايوت","audio_url":"audio_coptic/17pee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4639,"challenge_id":877,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":4637,"challenge_id":877,"text":"أبي","is_correct":true,"image_url":null,"audio_url":null},{"id":4636,"challenge_id":877,"text":"أخي","is_correct":false,"image_url":null,"audio_url":null},{"id":4638,"challenge_id":877,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":878,"lesson_id":168,"type":"write","question":"رتب حروف الكلمة: أمي (المعرب: «تاماف»)","coptic_display":"ⲧⲁⲙⲁⲩ","audio_text":"تاماف","audio_url":"audio_coptic/20tav.mp3","correct_word":"ⲧⲁⲙⲁⲩ","tiles":["ⲧ","ⲁ","ⲙ","ⲁ","ⲩ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":879,"lesson_id":168,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲣ؟","coptic_display":"Ⲣ","audio_text":"رو","audio_url":"audio_coptic/18roo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4642,"challenge_id":879,"text":"رو (ر)","is_correct":true,"image_url":null,"audio_url":null},{"id":4643,"challenge_id":879,"text":"لابدا (ل)","is_correct":false,"image_url":null,"audio_url":null},{"id":4640,"challenge_id":879,"text":"دلدا (د أو ذ)","is_correct":false,"image_url":null,"audio_url":null},{"id":4641,"challenge_id":879,"text":"زاتا (ز)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":54,"level_id":6,"title":"الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة","badge":"نطق ثلاثي","description":"فك شفرات الحروف الثلاثية النطق بتطبيق الشروط: غاما (Ⲅ)، إبسلون (Ⲩ)، وكي (Ⲭ).","order_index":4,"lessons":[{"id":215,"unit_id":54,"title":"حرف الغمّا (Ⲅ ⲅ) — بين 'ج' و 'ن' و 'غ'","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3084,"lesson_id":215,"type":"text_view","question":"قاعدة حرف الغمّا (Ⲅ ⲅ) الثلاثية","coptic_display":"Ⲅ ⲅ","audio_text":"غمّا","audio_url":"audio_coptic/3ghala.mp3","correct_word":"• يُنطق (جيم معطشة - G): إذا جاء بعده حرف متحرك مائل للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  - أمثلة: ⲁⲅⲓⲟⲥ (آجيوس = قدوس)، ⲅⲏ (جي = أرض)\n• يُنطق (نون أنفية حلقية - N): إذا جاء بعده حرف حلقي آخر (Ⲅ, Ⲕ, Ⲝ, Ⲭ).\n  - أمثلة: ⲁⲅⲅⲉⲗⲟⲥ (أنغيلوس = ملاك)، ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ (إيڤانغيليون = إنجيل)\n• يُنطق (غين - GH): في باقي الحالات الأخرى.\n  - أمثلة: ⲅⲣⲁⲫⲏ (غرافيه = كتابة)، ⲗⲟⲅⲟⲥ (لوغوس = كلمة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3085,"lesson_id":215,"type":"read_select","question":"في كلمة «ⲁⲅⲓⲟⲥ» (قدوس)، يُنطق حرف الغمّا:","coptic_display":"ⲁⲅⲓⲟⲥ","audio_text":"آجيوس","audio_url":"audio_coptic/3ghala.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5125,"challenge_id":3085,"text":"جيم معطشة (G) لوجود حرف كسر (Ⲓ) بعده","is_correct":true,"image_url":null,"audio_url":null},{"id":5126,"challenge_id":3085,"text":"نون (N)","is_correct":false,"image_url":null,"audio_url":null},{"id":5127,"challenge_id":3085,"text":"غين (GH)","is_correct":false,"image_url":null,"audio_url":null},{"id":6015,"challenge_id":3085,"text":"قاف (Q)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3086,"lesson_id":215,"type":"read_select","question":"في كلمة «ⲁⲅⲅⲉⲗⲟⲥ» (ملاك)، حرف الغمّا الأول يُنطق:","coptic_display":"ⲁⲅⲅⲉⲗⲟⲥ","audio_text":"أنغيلوس","audio_url":"audio_coptic/3ghala.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5128,"challenge_id":3086,"text":"نون أنفية (N) لمجيء غمّا حلقية بعده","is_correct":true,"image_url":null,"audio_url":null},{"id":5129,"challenge_id":3086,"text":"جيم","is_correct":false,"image_url":null,"audio_url":null},{"id":5130,"challenge_id":3086,"text":"غين","is_correct":false,"image_url":null,"audio_url":null},{"id":6016,"challenge_id":3086,"text":"ياء","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3087,"lesson_id":215,"type":"select","question":"ما معنى كلمة «ⲁⲅⲅⲉⲗⲟⲥ» الكنسية؟","coptic_display":"ⲁⲅⲅⲉⲗⲟⲥ","audio_text":"أنغيلوس","audio_url":"audio_coptic/3ghala.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5131,"challenge_id":3087,"text":"ملاك","is_correct":true,"image_url":null,"audio_url":null},{"id":5132,"challenge_id":3087,"text":"رسول","is_correct":false,"image_url":null,"audio_url":null},{"id":5133,"challenge_id":3087,"text":"شهيد","is_correct":false,"image_url":null,"audio_url":null},{"id":6017,"challenge_id":3087,"text":"قديس","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3088,"lesson_id":215,"type":"write","question":"ركّب كلمة 'قدوس' بالقبطية (آجيوس):","coptic_display":"ⲁⲅⲓⲟⲥ","audio_text":"آجيوس","audio_url":"audio_coptic/3ghala.mp3","correct_word":"ⲁⲅⲓⲟⲥ","tiles":["ⲁ","ⲅ","ⲓ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3089,"lesson_id":215,"type":"read_select","question":"كلمة «ⲅⲣⲁⲫⲏ» (كتابة) يُنطق الغمّا فيها بصوت:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5134,"challenge_id":3089,"text":"غين (غرافيه) لأنه متبوع بحرف ساكن (Ⲣ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5135,"challenge_id":3089,"text":"جيم","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":216,"unit_id":54,"title":"حرف الإبسلون (Ⲩ ⲩ) — بين 'ڤ' و 'أو' و 'ي'","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3090,"lesson_id":216,"type":"text_view","question":"قاعدة حرف الإبسلون (Ⲩ ⲩ) الثلاثية","coptic_display":"Ⲩ ⲩ","audio_text":"إبسلون","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• يُنطق (ڤ - V): إذا سبقه حرف Ⲁ أو Ⲉ.\n  - أمثلة: ⲥⲧⲁⲩⲣⲟⲥ (إستافروس = صليب)، ⲉⲩⲭⲏ (إيڤكي = صلاة)\n• يُنطق (واو طويلة مضمومة - OO): إذا سبقه حرف Ⲟ (التركيب ⲞⲨ).\n  - أمثلة: ⲟⲩϫⲁⲓ (أوجاي = سلامة)، ⲛⲟⲩϯ (نوتي = إله)\n• يُنطق (ياء قصيرة - I): إذا جاء منفرداً دون أن يسبقه Ⲁ, Ⲉ, Ⲟ.\n  - أمثلة: ⲯⲩⲭⲏ (بسيشي = نفس)، ϩⲩⲙⲛⲟⲥ (هيمنوس = ترنيمة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3091,"lesson_id":216,"type":"read_select","question":"في كلمة «ⲛⲟⲩϯ» (الله)، يُنطق الإبسلون:","coptic_display":"ⲛⲟⲩϯ","audio_text":"نوتي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5136,"challenge_id":3091,"text":"واو طويلة مضمومة لمجيء الأو (Ⲟ) قبله","is_correct":true,"image_url":null,"audio_url":null},{"id":5137,"challenge_id":3091,"text":"ڤ (V)","is_correct":false,"image_url":null,"audio_url":null},{"id":5138,"challenge_id":3091,"text":"ياء","is_correct":false,"image_url":null,"audio_url":null},{"id":6018,"challenge_id":3091,"text":"همزة مكسورة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3092,"lesson_id":216,"type":"read_select","question":"في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)، يُنطق الإبسلون:","coptic_display":"ⲥⲧⲁⲩⲣⲟⲥ","audio_text":"إستافروس","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5139,"challenge_id":3092,"text":"ڤ (V) لمجيء الألفا (Ⲁ) قبله","is_correct":true,"image_url":null,"audio_url":null},{"id":5140,"challenge_id":3092,"text":"واو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3093,"lesson_id":216,"type":"select","question":"ما معنى كلمة «ⲟⲩϫⲁⲓ» بالقبطية؟","coptic_display":"ⲟⲩϫⲁⲓ","audio_text":"أوجاي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5141,"challenge_id":3093,"text":"سلامة / عافية / خلاص","is_correct":true,"image_url":null,"audio_url":null},{"id":5142,"challenge_id":3093,"text":"مرض","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3094,"lesson_id":216,"type":"write","question":"ركّب كلمة 'ترنيمة' بالقبطية (هيمنوس):","coptic_display":"ϩⲩⲙⲛⲟⲥ","audio_text":"هيمنوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϩⲩⲙⲛⲟⲥ","tiles":["ϩ","ⲩ","ⲙ","ⲛ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3095,"lesson_id":216,"type":"read_select","question":"في كلمة «ⲯⲩⲭⲏ» (نفس)، يُنطق الإبسلون بصوت:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5143,"challenge_id":3095,"text":"ياء قصيرة (بسيشي) لأنه جاء منفرداً","is_correct":true,"image_url":null,"audio_url":null},{"id":5144,"challenge_id":3095,"text":"واو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":217,"unit_id":54,"title":"حرف الكي (Ⲭ ⲭ) — بين 'ك' و 'ش' و 'خ'","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3096,"lesson_id":217,"type":"text_view","question":"قاعدة حرف الكي (Ⲭ ⲭ) الثلاثية المعتمدة","coptic_display":"Ⲭ ⲭ","audio_text":"كي","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• يُنطق (كاف - K): في الكلمات القبطية الأصلية دائماً.\n  - أمثلة: ⲭⲏⲙⲓ (كيمي = مصر)، ⲛⲉⲭⲗⲟⲙ (نيكلوم = أكاليل)\n• يُنطق (شين - SH): في الكلمات اليونانية إذا تلاه حرف كسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  - أمثلة: ⲭⲉⲣⲉ (شيريه = السلام لكِ)، ⲭⲓⲱⲛ (شيون = ثلج)\n• يُنطق (خاء - KH): في الكلمات اليونانية إذا لم يتله كسر (قبل فتح أو ضم أو ساكن).\n  - أمثلة: Ⲭⲣⲓⲥⲧⲟⲥ (خرستوس = المسيح)، ⲭⲟⲣⲟⲥ (خوروس = مرتلون)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3097,"lesson_id":217,"type":"read_select","question":"كلمة «ⲭⲏⲙⲓ» (مصر) قبطية الأصل، لذا يُنطق حرف الكي فيها:","coptic_display":"ⲭⲏⲙⲓ","audio_text":"كيمي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5145,"challenge_id":3097,"text":"كاف (K) لأن الكلمة قبطية أصيلة","is_correct":true,"image_url":null,"audio_url":null},{"id":5146,"challenge_id":3097,"text":"شين","is_correct":false,"image_url":null,"audio_url":null},{"id":5147,"challenge_id":3097,"text":"خاء","is_correct":false,"image_url":null,"audio_url":null},{"id":6019,"challenge_id":3097,"text":"جيم معطشة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3098,"lesson_id":217,"type":"read_select","question":"كلمة «ⲭⲉⲣⲉ» (السلام لكِ) يونانية ومتبوعة بكسر، لذا تنطق:","coptic_display":"ⲭⲉⲣⲉ","audio_text":"شيريه","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5150,"challenge_id":3098,"text":"كاف (كيريه)","is_correct":false,"image_url":null,"audio_url":null},{"id":5148,"challenge_id":3098,"text":"شين (شيريه)","is_correct":true,"image_url":null,"audio_url":null},{"id":5149,"challenge_id":3098,"text":"خاء (خيريه)","is_correct":false,"image_url":null,"audio_url":null},{"id":6020,"challenge_id":3098,"text":"سين (سيريه)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3099,"lesson_id":217,"type":"read_select","question":"كلمة «Ⲭⲣⲓⲥⲧⲟⲥ» (المسيح) يونانية ومتبوعة بساكن، لذا تنطق:","coptic_display":"Ⲭⲣⲓⲥⲧⲟⲥ","audio_text":"خرستوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5151,"challenge_id":3099,"text":"خاء (خرستوس)","is_correct":true,"image_url":null,"audio_url":null},{"id":5152,"challenge_id":3099,"text":"شين (شرستوس)","is_correct":false,"image_url":null,"audio_url":null},{"id":5153,"challenge_id":3099,"text":"كاف","is_correct":false,"image_url":null,"audio_url":null},{"id":6021,"challenge_id":3099,"text":"غين (غرستوس)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3100,"lesson_id":217,"type":"write","question":"ركّب كلمة 'السلام لكِ' بالقبطية (شيريه):","coptic_display":"ⲭⲉⲣⲉ","audio_text":"شيريه","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲭⲉⲣⲉ","tiles":["ⲭ","ⲉ","ⲣ","ⲉ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3101,"lesson_id":217,"type":"select","question":"كلمة «ⲭⲏⲙⲓ» تعني بالقبطية:","coptic_display":"ⲭⲏⲙⲓ","audio_text":"كيمي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5154,"challenge_id":3101,"text":"مصر (الأرض السوداء)","is_correct":true,"image_url":null,"audio_url":null},{"id":5155,"challenge_id":3101,"text":"الإسكندرية","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":218,"unit_id":54,"title":"خوارزمية فحص الحروف الثلاثية بخطوتين","xp_reward":6,"order_index":4,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3102,"lesson_id":218,"type":"read_select","question":"في كلمة «ⲭⲁⲕⲓ» (ظلمة) وهي قبطية، نطق الكي هو:","coptic_display":"ⲭⲁⲕⲓ","audio_text":"كاكي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":1,"options":[{"id":5156,"challenge_id":3102,"text":"كاف (كاكي)","is_correct":true,"image_url":null,"audio_url":null},{"id":5157,"challenge_id":3102,"text":"خاء","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3103,"lesson_id":218,"type":"read_select","question":"في كلمة «ⲉⲩⲭⲏ» (صلاة) وهي يونانية ومتبوعة بإيتا، نطق الكي هو:","coptic_display":"ⲉⲩⲭⲏ","audio_text":"إيڤكي","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5158,"challenge_id":3103,"text":"شين (إيڤشي) في اليوناني القياسي ويسمح بالكاف","is_correct":true,"image_url":null,"audio_url":null},{"id":5159,"challenge_id":3103,"text":"خاء","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3104,"lesson_id":218,"type":"read_select","question":"في «ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ»، الغمّا الأولى والثانية تنطقان:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5160,"challenge_id":3104,"text":"الأولى نون والثانية جيم معطشة","is_correct":true,"image_url":null,"audio_url":null},{"id":5161,"challenge_id":3104,"text":"كلاهما جيم","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3105,"lesson_id":218,"type":"select","question":"كلمة «ⲛⲉⲭⲗⲟⲙ» (أكاليل) قبطية، فكيف تنطق؟","coptic_display":"ⲛⲉⲭⲗⲟⲙ","audio_text":"نيكلوم","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5162,"challenge_id":3105,"text":"نيكلوم (بالكاف)","is_correct":true,"image_url":null,"audio_url":null},{"id":5163,"challenge_id":3105,"text":"نيخلوم","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3106,"lesson_id":218,"type":"write","question":"ركّب كلمة 'المسيح':","coptic_display":"Ⲭⲣⲓⲥⲧⲟⲥ","audio_text":"خرستوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":"Ⲭⲣⲓⲥⲧⲟⲥ","tiles":["Ⲭ","ⲣ","ⲓ","ⲥ","ⲧ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3107,"lesson_id":218,"type":"read_select","question":"حرف «ⲭ» في «ⲭⲟⲣⲟⲥ» (مرتلون) ينطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5164,"challenge_id":3107,"text":"خاء (خوروس) لعدم وجود كسر","is_correct":true,"image_url":null,"audio_url":null},{"id":5165,"challenge_id":3107,"text":"شين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":219,"unit_id":54,"title":"مراجعة وتحدي الحروف الثلاثية الشامل","xp_reward":6,"order_index":5,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3108,"lesson_id":219,"type":"match","question":"طابق الحرف بحالاته الثلاث بدقة:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲅ","right":"جيم قبل الكسر، نون قبل الحلقي، غين في الباقي"},{"left":"Ⲩ","right":"ڤ بعد ألفا وإي، واو بعد أو، ياء منفرد"},{"left":"Ⲭ","right":"كاف في القبطي، شين قبل الكسر باليوناني، خاء في الباقي"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":3109,"lesson_id":219,"type":"read_select","question":"متى ينطق الإبسلون (ڤ)؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5166,"challenge_id":3109,"text":"إذا سبقه حرف Ⲁ أو Ⲉ","is_correct":true,"image_url":null,"audio_url":null},{"id":5167,"challenge_id":3109,"text":"في نهاية الكلمة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3110,"lesson_id":219,"type":"read_select","question":"متى ينطق الغمّا (نون)؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5168,"challenge_id":3110,"text":"إذا جاء بعده حرف حلقي آخر (غمّا، كبّا، كسي، كي)","is_correct":true,"image_url":null,"audio_url":null},{"id":5169,"challenge_id":3110,"text":"قبل حرف الألفا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3111,"lesson_id":219,"type":"write","question":"ركّب كلمة 'إنجيل' بالقبطية:","coptic_display":"ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ","audio_text":"إيڤانغيليون","audio_url":"audio_coptic/2vo.mp3","correct_word":"ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ","tiles":["ⲉ","ⲩ","ⲁ","ⲅ","ⲅ","ⲉ","ⲗ","ⲓ","ⲟ","ⲛ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3112,"lesson_id":219,"type":"select","question":"عبارة «Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ» تعني:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5170,"challenge_id":3112,"text":"قدوس الله","is_correct":true,"image_url":null,"audio_url":null},{"id":5171,"challenge_id":3112,"text":"المجد لله","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3113,"lesson_id":219,"type":"read_select","question":"في كلمة «ϩⲩⲙⲛⲟⲥ»، الإبسلون ينطق بصوت:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5172,"challenge_id":3113,"text":"ياء قصيرة","is_correct":true,"image_url":null,"audio_url":null},{"id":5173,"challenge_id":3113,"text":"واو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":55,"level_id":6,"title":"الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني","badge":"قبطي ويوناني","description":"امتلاك الحاسة اللغوية الصائبة لتحديد أصل الكلمة وتطبيق أحكام نطقها بدقة.","order_index":5,"lessons":[{"id":220,"unit_id":55,"title":"الحروف الديموطيقية السبعة — صك الهوية المصرية","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3114,"lesson_id":220,"type":"text_view","question":"الحروف المصرية السبعة حارسة الأصل القبطي","coptic_display":"Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ","audio_text":"حروف ديموطيقية","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• القاعدة القطعية: أي كلمة في اللغة القبطية تشتمل على حرف أو أكثر من الحروف السبعة الديموطيقية التالية هي كلمة قبطية أصيلة 100%:\n  - Ϣ (شاي)، Ϥ (فاي)، Ϧ (خاي)، Ϩ (هوري)، Ϫ (جانجا)، Ϭ (تشيما)، Ϯ (تي)\n• شواهد معتمدة:\n  - ϣⲱⲡ (شوب = يقبل)، ϥⲁⲓ (فاي = يحمل)، ϧⲉⲛ (خين = في)\n  - ϩⲏⲧ (هيت = قلب)، ϫⲱ (جو = يقول)، ϭⲟⲓⲥ (شويس = رب)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3115,"lesson_id":220,"type":"read_select","question":"كلمة «ϧⲉⲛ» (في) أصلها:","coptic_display":"ϧⲉⲛ","audio_text":"خين","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5174,"challenge_id":3115,"text":"قبطي أصيل لوجود حرف الخاي (Ϧ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5175,"challenge_id":3115,"text":"يوناني","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3116,"lesson_id":220,"type":"read_select","question":"كلمة «ϭⲟⲓⲥ» (رب) أصلها:","coptic_display":"ϭⲟⲓⲥ","audio_text":"شويس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5176,"challenge_id":3116,"text":"قبطي أصيل لوجود حرف التشيما (Ϭ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5177,"challenge_id":3116,"text":"يوناني","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3117,"lesson_id":220,"type":"select","question":"كم حرفاً مصرياً ديموطيقياً في الأبجدية القبطية؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5178,"challenge_id":3117,"text":"7 حروف","is_correct":true,"image_url":null,"audio_url":null},{"id":5179,"challenge_id":3117,"text":"5 حروف","is_correct":false,"image_url":null,"audio_url":null},{"id":5180,"challenge_id":3117,"text":"10 حروف","is_correct":false,"image_url":null,"audio_url":null},{"id":6022,"challenge_id":3117,"text":"6 حروف","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3118,"lesson_id":220,"type":"write","question":"ركّب كلمة 'في' بالقبطية (خين):","coptic_display":"ϧⲉⲛ","audio_text":"خين","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϧⲉⲛ","tiles":["ϧ","ⲉ","ⲛ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3119,"lesson_id":220,"type":"read_select","question":"إذا احتوت كلمة على حرف «Ϣ» ومعه حرف «Ⲭ»، كيف ينطق الكي؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5181,"challenge_id":3119,"text":"كاف دائماً لأن الكلمة قبطية قطعاً","is_correct":true,"image_url":null,"audio_url":null},{"id":5182,"challenge_id":3119,"text":"شين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":221,"unit_id":55,"title":"الحروف اليونانية الصريحة وكواشف الأصل","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3120,"lesson_id":221,"type":"text_view","question":"الحروف التي تدل على أصل يوناني","coptic_display":"Ⲅ, Ⲇ, Ⲍ, Ⲝ, ⲯ","audio_text":"حروف يونانية","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• الحروف التالية لا تدخل في الكلمات القبطية الأصيلة، بل تشير دائماً إلى أصل يوناني للكلمة:\n  - Ⲅ (غمّا)، Ⲇ (دلتا)، Ⲍ (زاطا)، Ⲝ (إكسي)، ⲯ (إبسي)\n• أمثلة:\n  - ⲇⲟⲝⲁ (ذوكصا = مجد)\n  - ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)\n  - ⲁⲝⲓⲟⲥ (آكسيوس = مستحق)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3121,"lesson_id":221,"type":"read_select","question":"كلمة «ⲇⲟⲝⲁ» (مجد) أصلها:","coptic_display":"ⲇⲟⲝⲁ","audio_text":"ذوكصا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5183,"challenge_id":3121,"text":"يوناني لوجود حرفي الدلتا والإكسي","is_correct":true,"image_url":null,"audio_url":null},{"id":5184,"challenge_id":3121,"text":"قبطي أصيل","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3122,"lesson_id":221,"type":"read_select","question":"كلمة «ⲯⲁⲗⲙⲟⲥ» (مزمور) أصلها:","coptic_display":"ⲯⲁⲗⲙⲟⲥ","audio_text":"بصالموس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5185,"challenge_id":3122,"text":"يوناني لوجود حرف الإبسي والنهاية os","is_correct":true,"image_url":null,"audio_url":null},{"id":5186,"challenge_id":3122,"text":"قبطي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3123,"lesson_id":221,"type":"select","question":"كلمة «ⲁⲝⲓⲟⲥ» الكنسية تعني:","coptic_display":"ⲁⲝⲓⲟⲥ","audio_text":"آكسيوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5187,"challenge_id":3123,"text":"مستحق / عادل","is_correct":true,"image_url":null,"audio_url":null},{"id":5188,"challenge_id":3123,"text":"مبارك","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3124,"lesson_id":221,"type":"write","question":"ركّب كلمة 'مزمور' بالقبطية:","coptic_display":"ⲯⲁⲗⲙⲟⲥ","audio_text":"بصالموس","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲯⲁⲗⲙⲟⲥ","tiles":["ⲯ","ⲁ","ⲗ","ⲙ","ⲟ","ⲥ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3125,"lesson_id":221,"type":"read_select","question":"كلمة «ⲁⲛⲍⲏⲃ» (مدرسة) تُعد من الحالات الشاذة لأنها:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5189,"challenge_id":3125,"text":"كلمة قبطية احتوت نادراً على حرف الزاطا (Ⲍ)","is_correct":true,"image_url":null,"audio_url":null},{"id":5190,"challenge_id":3125,"text":"كلمة يونانية محضة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":222,"unit_id":55,"title":"النهايات والقوالب الصرفية اليونانية","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3126,"lesson_id":222,"type":"text_view","question":"النهايات الإعرابية اليونانية الشهيرة","coptic_display":"-ⲟⲥ, -ⲏⲥ, -ⲁⲥ, -ⲟⲛ, -ⲓⲁ","audio_text":"نهايات يونانية","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• تتميز الكلمات اليونانية بنهايات إعرابية واضحة:\n  1. نهايات المذكر: -ⲟⲥ (مثل: ⲗⲟⲅⲟⲥ, ⲁⲅⲅⲉⲗⲟⲥ)، -ⲏⲥ (مثل: ⲙⲁⲑⲏⲧⲏⲥ = تلميذ)\n  2. نهايات المحايد والمؤنث: -ⲟⲛ (مثل: ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ)، -ⲓⲁ (مثل: ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3127,"lesson_id":222,"type":"read_select","question":"كلمة «ⲉⲕⲕⲗⲏⲥⲓⲁ» (كنيسة) تنتهي بـ «-ⲓⲁ»، لذا فأصلها:","coptic_display":"ⲉⲕⲕⲗⲏⲥⲓⲁ","audio_text":"إكليسيا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5191,"challenge_id":3127,"text":"يوناني","is_correct":true,"image_url":null,"audio_url":null},{"id":5192,"challenge_id":3127,"text":"قبطي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3128,"lesson_id":222,"type":"read_select","question":"كلمة «ⲙⲁⲑⲏⲧⲏⲥ» (تلميذ) تنتهي بـ «-ⲏⲥ»، وأصلها:","coptic_display":"ⲙⲁⲑⲏⲧⲏⲥ","audio_text":"ماثيتيس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5193,"challenge_id":3128,"text":"يوناني","is_correct":true,"image_url":null,"audio_url":null},{"id":5194,"challenge_id":3128,"text":"قبطي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3129,"lesson_id":222,"type":"select","question":"ما معنى كلمة «ⲉⲕⲕⲗⲏⲥⲓⲁ»؟","coptic_display":"ⲉⲕⲕⲗⲏⲥⲓⲁ","audio_text":"إكليسيا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5195,"challenge_id":3129,"text":"كنيسة / جماعة المؤمنين","is_correct":true,"image_url":null,"audio_url":null},{"id":5196,"challenge_id":3129,"text":"مذبح","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3130,"lesson_id":222,"type":"write","question":"ركّب كلمة 'كنيسة' بالقبطية (إكليسيا):","coptic_display":"ⲉⲕⲕⲗⲏⲥⲓⲁ","audio_text":"إكليسيا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲉⲕⲕⲗⲏⲥⲓⲁ","tiles":["ⲉ","ⲕ","ⲕ","ⲗ","ⲏ","ⲥ","ⲓ","ⲁ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3131,"lesson_id":222,"type":"read_select","question":"كلمة «ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ» أصل الكلمة بدون أداة التعريف (ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ) هو:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5197,"challenge_id":3131,"text":"يوناني لنهايتها بـ os","is_correct":true,"image_url":null,"audio_url":null},{"id":5198,"challenge_id":3131,"text":"قبطي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":223,"unit_id":55,"title":"تمرين الفرز المعجمي المتقدم","xp_reward":6,"order_index":4,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3132,"lesson_id":223,"type":"match","question":"صنّف الكلمات بدقة حسب أصلها اللغوي:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ϣⲱⲡ","right":"قبطية لوجود حرف الشاي"},{"left":"ⲗⲟⲅⲟⲥ","right":"يونانية لوجود Ⲅ ونهاية os"},{"left":"ϩⲏⲧ","right":"قبطية لوجود حرف الهوري"},{"left":"ⲉⲩⲭⲏ","right":"يونانية لوجود الإبسلون والكي"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":3133,"lesson_id":223,"type":"read_select","question":"في كلمة «ⲭⲱⲣⲁ» (بلد/أرض) وهي يونانية تنتهي بـ a: حرف الكي ينطق:","coptic_display":"ⲭⲱⲣⲁ","audio_text":"خورا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5200,"challenge_id":3133,"text":"كاف","is_correct":false,"image_url":null,"audio_url":null},{"id":5199,"challenge_id":3133,"text":"خاء (خورا) لعدم وجود كسر","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3134,"lesson_id":223,"type":"select","question":"أي كلمة مما يلي قبطية أصيلة 100%؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5201,"challenge_id":3134,"text":"ϥⲁⲓ (يحمل)","is_correct":true,"image_url":null,"audio_url":null},{"id":5202,"challenge_id":3134,"text":"ⲁⲅⲅⲉⲗⲟⲥ (ملاك)","is_correct":false,"image_url":null,"audio_url":null},{"id":5203,"challenge_id":3134,"text":"ⲇⲟⲝⲁ (مجد)","is_correct":false,"image_url":null,"audio_url":null},{"id":6023,"challenge_id":3134,"text":"ⲭⲉⲣⲉ (السلام لكِ)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3135,"lesson_id":223,"type":"write","question":"ركّب كلمة 'يحمل' بالقبطية (فاي):","coptic_display":"ϥⲁⲓ","audio_text":"فاي","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϥⲁⲓ","tiles":["ϥ","ⲁ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3136,"lesson_id":223,"type":"read_select","question":"هل يمكن لكلمة تحتوي حرف «Ϫ» أن تكون يونانية الأصل؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5204,"challenge_id":3136,"text":"مستحيل، لأن الجانجا حرف ديموطيقي خالص","is_correct":true,"image_url":null,"audio_url":null},{"id":5205,"challenge_id":3136,"text":"نعم يمكن","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3137,"lesson_id":223,"type":"read_select","question":"كلمة «ⲛⲓⲫⲏⲟⲩⲓ» (السماوات) هي كلمة:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5206,"challenge_id":3137,"text":"قبطية أصيلة","is_correct":true,"image_url":null,"audio_url":null},{"id":5207,"challenge_id":3137,"text":"يونانية","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":45,"level_id":5,"title":"الوحدة ٥: الحروف من (Ⲩ – Ⲱ)","badge":"Ⲩ-Ⲱ","description":"تعلّم الحروف من إبسيلون إلى أوميغا خاتمة الحروف اليونانية","order_index":5,"lessons":[{"id":153,"unit_id":45,"title":"حرف إبسيلون (Ⲩ ⲩ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":788,"lesson_id":153,"type":"text_view","question":"نبذة عن حرف إبسيلون (Ⲩ ⲩ)","coptic_display":"Ⲩ ⲩ","audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":"• اسم الحرف: إبسيلون\n• نطق الحرف بالعربي: ي أو ڤ أو و\n• قواعد النطق: الحرف الحادي والعشرون. حرف متحرك ينطق \"ڤ\" بعد Ⲁ أو Ⲉ، وينطق \"و\" طويلة بعد Ⲟ (ⲟⲩ)، وينطق \"ي\" في الحالات الأخرى.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲩⲥⲓⲥ\n  - القبطي المعرب (نطقها): «إيسيس»\n  - المعنى بالعربية: مطر\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":789,"lesson_id":153,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲩ واستمع لنطقه","coptic_display":"Ⲩ","audio_text":"إبسيلون كابيتال","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":790,"lesson_id":153,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲩ واستمع لنطقه","coptic_display":"ⲩ","audio_text":"إبسيلون سمول","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":791,"lesson_id":153,"type":"read_select","question":"ما هو نطق الحرف Ⲩ بالعربية؟","coptic_display":"Ⲩ","audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4501,"challenge_id":791,"text":"ي أو ڤ أو و","is_correct":true,"image_url":null,"audio_url":null},{"id":4502,"challenge_id":791,"text":"ياء طويلة فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4500,"challenge_id":791,"text":"واو فقط","is_correct":false,"image_url":null,"audio_url":null},{"id":4503,"challenge_id":791,"text":"ب أو ڤ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":792,"lesson_id":153,"type":"select","question":"ما معنى الكلمة القبطية: ⲩⲥⲓⲥ؟ (المعرب: «إيسيس»)","coptic_display":"ⲩⲥⲓⲥ","audio_text":"إيسيس","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4505,"challenge_id":792,"text":"سحاب","is_correct":false,"image_url":null,"audio_url":null},{"id":4507,"challenge_id":792,"text":"ثلج","is_correct":false,"image_url":null,"audio_url":null},{"id":4504,"challenge_id":792,"text":"مطر","is_correct":true,"image_url":null,"audio_url":null},{"id":4506,"challenge_id":792,"text":"ريح","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":793,"lesson_id":153,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مطر (المعرب: «إيسيس»)","coptic_display":"ⲩⲥⲓⲥ","audio_text":"إيسيس","audio_url":"audio_coptic/21epselon.mp3","correct_word":"ⲩⲥⲓⲥ","tiles":["ⲩ","ⲥ","ⲓ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":154,"unit_id":45,"title":"حرف في (Ⲫ ⲫ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":794,"lesson_id":154,"type":"text_view","question":"نبذة عن حرف في (Ⲫ ⲫ)","coptic_display":"Ⲫ ⲫ","audio_text":"في","audio_url":"audio_coptic/22fi.mp3","correct_word":"• اسم الحرف: في\n• نطق الحرف بالعربي: ف\n• قواعد النطق: الحرف الثاني والعشرون. يُنطق حرف \"ف\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲫⲉⲃ\n  - القبطي المعرب (نطقها): «أفيغ»\n  - المعنى بالعربية: بطيخ\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":795,"lesson_id":154,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲫ واستمع لنطقه","coptic_display":"Ⲫ","audio_text":"في كابيتال","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":796,"lesson_id":154,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲫ واستمع لنطقه","coptic_display":"ⲫ","audio_text":"في سمول","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":797,"lesson_id":154,"type":"read_select","question":"ما هو نطق الحرف Ⲫ بالعربية؟","coptic_display":"Ⲫ","audio_text":"في","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4508,"challenge_id":797,"text":"ف","is_correct":true,"image_url":null,"audio_url":null},{"id":4509,"challenge_id":797,"text":"ب أو ڤ","is_correct":false,"image_url":null,"audio_url":null},{"id":4510,"challenge_id":797,"text":"ث","is_correct":false,"image_url":null,"audio_url":null},{"id":4511,"challenge_id":797,"text":"خ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":798,"lesson_id":154,"type":"select","question":"ما معنى الكلمة القبطية: ⲫⲉⲃ؟ (المعرب: «أفيغ»)","coptic_display":"ⲫⲉⲃ","audio_text":"أفيغ","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4513,"challenge_id":798,"text":"تفاح","is_correct":false,"image_url":null,"audio_url":null},{"id":4514,"challenge_id":798,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4515,"challenge_id":798,"text":"برتقال","is_correct":false,"image_url":null,"audio_url":null},{"id":4512,"challenge_id":798,"text":"بطيخ","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":799,"lesson_id":154,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: بطيخ (المعرب: «أفيغ»)","coptic_display":"ⲫⲉⲃ","audio_text":"أفيغ","audio_url":"audio_coptic/22fi.mp3","correct_word":"ⲫⲉⲃ","tiles":["ⲫ","ⲉ","ⲃ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":155,"unit_id":45,"title":"حرف خي (Ⲭ ⲭ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":800,"lesson_id":155,"type":"text_view","question":"نبذة عن حرف خي (Ⲭ ⲭ)","coptic_display":"Ⲭ ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":"• اسم الحرف: خي\n• نطق الحرف بالعربي: خ أو ك أو ش\n• قواعد النطق: الحرف الثالث والعشرون. يُنطق \"ك\" في الكلمات القبطية، ويُنطق \"خ\" أو \"ش\" في الكلمات ذات الأصل اليوناني.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲭ̀ⲗⲓⲗ\n  - القبطي المعرب (نطقها): «إخليل»\n  - المعنى بالعربية: عقد\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":801,"lesson_id":155,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲭ واستمع لنطقه","coptic_display":"Ⲭ","audio_text":"خي كابيتال","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":802,"lesson_id":155,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲭ واستمع لنطقه","coptic_display":"ⲭ","audio_text":"خي سمول","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":803,"lesson_id":155,"type":"read_select","question":"ما هو نطق الحرف Ⲭ بالعربية؟","coptic_display":"Ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4517,"challenge_id":803,"text":"ك أو ش أو خ","is_correct":true,"image_url":null,"audio_url":null},{"id":4518,"challenge_id":803,"text":"ك أو ق أو ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4519,"challenge_id":803,"text":"خ أو غ أو ق","is_correct":false,"image_url":null,"audio_url":null},{"id":4516,"challenge_id":803,"text":"ش أو س أو ص","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":804,"lesson_id":155,"type":"select","question":"ما معنى الكلمة القبطية: ⲭ̀ⲗⲓⲗ؟ (المعرب: «إخليل»)","coptic_display":"ⲭ̀ⲗⲓⲗ","audio_text":"إخليل","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4520,"challenge_id":804,"text":"سوار","is_correct":false,"image_url":null,"audio_url":null},{"id":4521,"challenge_id":804,"text":"عقد","is_correct":true,"image_url":null,"audio_url":null},{"id":4522,"challenge_id":804,"text":"تاج","is_correct":false,"image_url":null,"audio_url":null},{"id":4523,"challenge_id":804,"text":"خاتم","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":805,"lesson_id":155,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: عقد (المعرب: «إخليل»)","coptic_display":"ⲭ̀ⲗⲓⲗ","audio_text":"إخليل","audio_url":"audio_coptic/23ki.mp3","correct_word":"ⲭ̀ⲗⲓⲗ","tiles":["ⲭ","̀","ⲗ","ⲓ","ⲗ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":156,"unit_id":45,"title":"حرف إبسي (Ⲯ ⲯ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":806,"lesson_id":156,"type":"text_view","question":"نبذة عن حرف إبسي (Ⲯ ⲯ)","coptic_display":"Ⲯ ⲯ","audio_text":"إبسي","audio_url":"audio_coptic/24psi.mp3","correct_word":"• اسم الحرف: إبسي\n• نطق الحرف بالعربي: بـ + س\n• قواعد النطق: الحرف الرابع والعشرون. حرف مركب يُنطق باء وسين معاً في صوت واحد (بـ + س = Ps).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ\n  - القبطي المعرب (نطقها): «إبسيت إن كينكين»\n  - المعنى بالعربية: 9 دفوف\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":807,"lesson_id":156,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲯ واستمع لنطقه","coptic_display":"Ⲯ","audio_text":"إبسي كابيتال","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":808,"lesson_id":156,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲯ واستمع لنطقه","coptic_display":"ⲯ","audio_text":"إبسي سمول","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":809,"lesson_id":156,"type":"read_select","question":"ما هو نطق الحرف Ⲯ بالعربية؟","coptic_display":"Ⲯ","audio_text":"إبسي","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4524,"challenge_id":809,"text":"بـ + س (إبسي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4525,"challenge_id":809,"text":"كـ + س (إكسي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4526,"challenge_id":809,"text":"ب + ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4527,"challenge_id":809,"text":"ف + س","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":810,"lesson_id":156,"type":"select","question":"ما معنى الكلمة القبطية: ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ؟ (المعرب: «إبسيت إن كينكين»)","coptic_display":"ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ","audio_text":"إبسيت إن كينكين","audio_url":"audio_coptic/24psi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4529,"challenge_id":810,"text":"٩ أجراس","is_correct":false,"image_url":null,"audio_url":null},{"id":4530,"challenge_id":810,"text":"٧ دفوف","is_correct":false,"image_url":null,"audio_url":null},{"id":4531,"challenge_id":810,"text":"9 دفوف","is_correct":true,"image_url":null,"audio_url":null},{"id":4528,"challenge_id":810,"text":"٨ قيثارات","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":811,"lesson_id":156,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: 9 دفوف (المعرب: «إبسيت إن كينكين»)","coptic_display":"ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ","audio_text":"إبسيت إن كينكين","audio_url":"audio_coptic/24psi.mp3","correct_word":"ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ","tiles":["ⲯ","ⲓ","ⲧ"," ","ⲛ","̀","ⲕ","ⲉ","ⲛ","ⲕ","ⲉ","ⲛ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":157,"unit_id":45,"title":"حرف أوميغا (أو طويلة) (Ⲱ ⲱ)","xp_reward":5,"order_index":5,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":812,"lesson_id":157,"type":"text_view","question":"نبذة عن حرف أوميغا (أو طويلة) (Ⲱ ⲱ)","coptic_display":"Ⲱ ⲱ","audio_text":"أوميغا (أو طويلة)","audio_url":"audio_coptic/25oo.mp3","correct_word":"• اسم الحرف: أوميغا (أو طويلة)\n• نطق الحرف بالعربي: واو طويلة ممدودة\n• قواعد النطق: الحرف الخامس والعشرون. آخر الحروف المأخوذة من اليونانية. يُنطق واواً طويلة ومفتوحة (Ō).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ⲧⲁⲥⲱⲛⲓ\n  - القبطي المعرب (نطقها): «تاسوني»\n  - المعنى بالعربية: أختي\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":813,"lesson_id":157,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ⲱ واستمع لنطقه","coptic_display":"Ⲱ","audio_text":"أوميغا (أو طويلة) كابيتال","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":814,"lesson_id":157,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ⲱ واستمع لنطقه","coptic_display":"ⲱ","audio_text":"أوميغا (أو طويلة) سمول","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":815,"lesson_id":157,"type":"read_select","question":"ما هو نطق الحرف Ⲱ بالعربية؟","coptic_display":"Ⲱ","audio_text":"أوميغا (أو طويلة)","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4533,"challenge_id":815,"text":"واو طويلة ممدودة","is_correct":true,"image_url":null,"audio_url":null},{"id":4534,"challenge_id":815,"text":"واو قصيرة مضمومة","is_correct":false,"image_url":null,"audio_url":null},{"id":4535,"challenge_id":815,"text":"ألف مفخمة","is_correct":false,"image_url":null,"audio_url":null},{"id":4532,"challenge_id":815,"text":"واو لينة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":816,"lesson_id":157,"type":"select","question":"ما معنى الكلمة القبطية: ⲧⲁⲥⲱⲛⲓ؟ (المعرب: «تاسوني»)","coptic_display":"ⲧⲁⲥⲱⲛⲓ","audio_text":"تاسوني","audio_url":"audio_coptic/25oo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4536,"challenge_id":816,"text":"أختي","is_correct":true,"image_url":null,"audio_url":null},{"id":4537,"challenge_id":816,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null},{"id":4538,"challenge_id":816,"text":"أخي","is_correct":false,"image_url":null,"audio_url":null},{"id":4539,"challenge_id":816,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":817,"lesson_id":157,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: أختي (المعرب: «تاسوني»)","coptic_display":"ⲧⲁⲥⲱⲛⲓ","audio_text":"تاسوني","audio_url":"audio_coptic/25oo.mp3","correct_word":"ⲧⲁⲥⲱⲛⲓ","tiles":["ⲧ","ⲁ","ⲥ","ⲱ","ⲛ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":169,"unit_id":45,"title":"🔄 مراجعة الوحدة 5","xp_reward":5,"order_index":6,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":880,"lesson_id":169,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲩ ⲩ","right":"إبسيلون (ي أو ڤ أو و)"},{"left":"Ⲫ ⲫ","right":"في (ف)"},{"left":"Ⲭ ⲭ","right":"خي (خ أو ك أو ش)"},{"left":"Ⲯ ⲯ","right":"إبسي (بـ + س)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":881,"lesson_id":169,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"إبسيلون","audio_url":"audio_coptic/21epselon.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4644,"challenge_id":881,"text":"Ⲩ ⲩ (إبسيلون)","is_correct":true,"image_url":null,"audio_url":null},{"id":4645,"challenge_id":881,"text":"Ⲓ ⲓ (إيوتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4646,"challenge_id":881,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4647,"challenge_id":881,"text":"Ⲟ ⲟ (أُو)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":882,"lesson_id":169,"type":"select","question":"ما معنى الكلمة: ⲫⲉⲃ؟ (المعرب: «أفيغ»)","coptic_display":"ⲫⲉⲃ","audio_text":"أفيغ","audio_url":"audio_coptic/22fi.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4648,"challenge_id":882,"text":"برتقال","is_correct":false,"image_url":null,"audio_url":null},{"id":4650,"challenge_id":882,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4649,"challenge_id":882,"text":"بطيخ","is_correct":true,"image_url":null,"audio_url":null},{"id":4651,"challenge_id":882,"text":"تفاح","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":883,"lesson_id":169,"type":"write","question":"رتب حروف الكلمة: أختي (المعرب: «تاسوني»)","coptic_display":"ⲧⲁⲥⲱⲛⲓ","audio_text":"تاسوني","audio_url":"audio_coptic/25oo.mp3","correct_word":"ⲧⲁⲥⲱⲛⲓ","tiles":["ⲧ","ⲁ","ⲥ","ⲱ","ⲛ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":884,"lesson_id":169,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ⲭ؟","coptic_display":"Ⲭ","audio_text":"خي","audio_url":"audio_coptic/23ki.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4652,"challenge_id":884,"text":"كي (ك أو ش أو خ)","is_correct":true,"image_url":null,"audio_url":null},{"id":4655,"challenge_id":884,"text":"غاما (غ أو ج أو ن)","is_correct":false,"image_url":null,"audio_url":null},{"id":4653,"challenge_id":884,"text":"كابا (ك)","is_correct":false,"image_url":null,"audio_url":null},{"id":4654,"challenge_id":884,"text":"شاي (ش)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":56,"level_id":6,"title":"الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس","badge":"المقاطع الصوتية","description":"إتقان القراءة المقطعية الثنائية لكل الحروف مع الحركات السبع استناداً لص 65 و 66 من كتاب إعدادي.","order_index":6,"lessons":[{"id":224,"unit_id":56,"title":"مصفوفة مقاطع حروف الوسط (Ⲕ, Ⲃ, Ⲅ, Ⲇ, Ⲍ, Ⲑ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3138,"lesson_id":224,"type":"text_view","question":"مصفوفة المقاطع لحروف الوسط","coptic_display":"ⲕⲁ ⲕⲉ ⲕⲓ ⲕⲏ ⲕⲟ ⲕⲱ ⲕⲟⲩ","audio_text":"مقاطع كابا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• جدول المقاطع المعتمد من المجمع المقدس:\n  - Ⲕ: ⲕⲁ (كا), ⲕⲉ (كِ), ⲕⲓ (كي), ⲕⲏ (كيي), ⲕⲟ (كو), ⲕⲱ (كوو), ⲕⲟⲩ (كو مضمومة)\n  - Ⲃ: ⲃⲁ (ڤا), ⲃⲉ (ڤِ), ⲃⲓ (ڤي), ⲃⲏ (ڤيي), ⲃⲟ (ڤو), ⲃⲱ (ڤوو), ⲃⲟⲩ (ڤو مضمومة)\n  - Ⲅ: ⲅⲁ (غا), ⲅⲉ (جِ), ⲅⲓ (جي), ⲅⲏ (جيي), ⲅⲟ (غو), ⲅⲱ (غوو), ⲅⲟⲩ (غو مضمومة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3139,"lesson_id":224,"type":"read_select","question":"المقطع «ⲅⲉ» يُنطق:","coptic_display":"ⲅⲉ","audio_text":"جِ","audio_url":"audio_coptic/3ghala.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5208,"challenge_id":3139,"text":"جِ (معطشة لوجود الإي الكاسرة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5209,"challenge_id":3139,"text":"غِ","is_correct":false,"image_url":null,"audio_url":null},{"id":5210,"challenge_id":3139,"text":"نِ","is_correct":false,"image_url":null,"audio_url":null},{"id":6024,"challenge_id":3139,"text":"كِ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3140,"lesson_id":224,"type":"read_select","question":"المقطع «ⲃⲁ» يُنطق:","coptic_display":"ⲃⲁ","audio_text":"ڤا","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5211,"challenge_id":3140,"text":"ڤا (لأن الفيتا تلاها متحرك)","is_correct":true,"image_url":null,"audio_url":null},{"id":5212,"challenge_id":3140,"text":"با","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3141,"lesson_id":224,"type":"match","question":"طابق المقطع الصوتي بنطقه الدقيق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ⲕⲟⲩ","right":"كو مضمومة طويلاً"},{"left":"ⲕⲱ","right":"كوو مفتوحة مفخمة"},{"left":"ⲕⲉ","right":"كِ خفيفة"}],"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3142,"lesson_id":224,"type":"write","question":"ركّب المقطع الصوتي 'ڤي':","coptic_display":"ⲃⲓ","audio_text":"ڤي","audio_url":"audio_coptic/2vo.mp3","correct_word":"ⲃⲓ","tiles":["ⲃ","ⲓ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3143,"lesson_id":224,"type":"read_select","question":"المقطع «ⲑⲱ» يُنطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5213,"challenge_id":3143,"text":"ثوو (مفخمة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5214,"challenge_id":3143,"text":"توو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":225,"unit_id":56,"title":"مصفوفة مقاطع حروف الرنين والشفتانية (Ⲗ, Ⲙ, Ⲛ, Ⲝ, Ⲡ, Ⲣ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3144,"lesson_id":225,"type":"text_view","question":"مصفوفة حروف الرنين","coptic_display":"Ⲗ, Ⲙ, Ⲛ, Ⲣ","audio_text":"حروف الرنين","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• المقاطع الرنانة:\n  - Ⲗ: ⲗⲁ, ⲗⲉ, ⲗⲓ, ⲗⲏ, ⲗⲟ, ⲗⲱ, ⲗⲟⲩ\n  - Ⲙ: ⲙⲁ, ⲙⲉ, ⲙⲓ, ⲙⲏ, ⲙⲟ, ⲙⲱ, ⲙⲟⲩ\n  - Ⲛ: ⲛⲁ, ⲛⲉ, ⲛⲓ, ⲛⲏ, ⲛⲟ, ⲛⲱ, ⲛⲟⲩ\n  - Ⲣ: ⲣⲁ, ⲣⲉ, ⲣⲓ, ⲣⲏ, ⲣⲟ, ⲣⲱ, ⲣⲟⲩ","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3145,"lesson_id":225,"type":"read_select","question":"المقطع «ⲛⲏ» يُنطق:","coptic_display":"ⲛⲏ","audio_text":"نيي","audio_url":"audio_coptic/8ei.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5215,"challenge_id":3145,"text":"نيي (بياء مكسورة ممدودة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5216,"challenge_id":3145,"text":"نِ قصيرة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3146,"lesson_id":225,"type":"select","question":"كلمة «ⲙⲁ» تعني بالقبطية:","coptic_display":"ⲙⲁ","audio_text":"ما","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5217,"challenge_id":3146,"text":"موضع / مكان","is_correct":true,"image_url":null,"audio_url":null},{"id":5218,"challenge_id":3146,"text":"زمان","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3147,"lesson_id":225,"type":"write","question":"ركّب مقطع 'روو' المفخم:","coptic_display":"ⲣⲱ","audio_text":"روو","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲣⲱ","tiles":["ⲣ","ⲱ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3148,"lesson_id":225,"type":"match","question":"طابق المقطع بنطقه:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ⲗⲟⲩ","right":"لو مضمومة"},{"left":"ⲙⲁ","right":"ما"},{"left":"ⲛⲉ","right":"نِ خفيفة"}],"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3149,"lesson_id":225,"type":"read_select","question":"المقطع «ⲡⲁ» في كلمة «ⲡⲁⲥⲟⲛ» (أخي) ينطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5219,"challenge_id":3149,"text":"با خفيفة","is_correct":true,"image_url":null,"audio_url":null},{"id":5220,"challenge_id":3149,"text":"بو","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":226,"unit_id":56,"title":"مصفوفة مقاطع الحروف الديموطيقية (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3150,"lesson_id":226,"type":"text_view","question":"مصفوفة الحروف الديموطيقية المصرية","coptic_display":"Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ","audio_text":"مقاطع ديموطيقية","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• مقاطع الحروف المصرية:\n  - Ϣ: ϣⲁ, ϣⲉ, ϣⲓ, ϣⲏ, ϣⲟ, ϣⲱ, ϣⲟⲩ\n  - Ϥ: ϥⲁ, ϥⲉ, ϥⲓ, ϥⲏ, ϥⲟ, ϥⲱ, ϥⲟⲩ\n  - Ϧ: ϧⲁ, ϧⲉ, ϧⲓ, ϧⲏ, ϧⲟ, ϧⲱ, ϧⲟⲩ\n  - Ϩ: ϩⲁ, ϩⲉ, ϩⲓ, ϩⲏ, ϩⲟ, ϩⲱ, ϩⲟⲩ\n  - Ϫ: ϫⲁ (جا صلبة), ϫⲉ (جِ معطشة), ϫⲓ (جي معطشة), ϫⲏ (جيي معطشة), ϫⲟ (جو صلبة), ϫⲱ (جوو صلبة), ϫⲟⲩ (جو صلبة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3151,"lesson_id":226,"type":"read_select","question":"المقطع «ϫⲉ» يُنطق:","coptic_display":"ϫⲉ","audio_text":"جِ","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5221,"challenge_id":3151,"text":"جِ (معطشة لوجود الإي الكاسرة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5222,"challenge_id":3151,"text":"جِ صلبة قاهرية","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3152,"lesson_id":226,"type":"read_select","question":"المقطع «ϫⲁ» يُنطق:","coptic_display":"ϫⲁ","audio_text":"جا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5223,"challenge_id":3152,"text":"جا صلبة قاهرية لعدم وجود كسر","is_correct":true,"image_url":null,"audio_url":null},{"id":5224,"challenge_id":3152,"text":"جا معطشة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3153,"lesson_id":226,"type":"write","question":"ركّب مقطع 'شا':","coptic_display":"ϣⲁ","audio_text":"شا","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϣⲁ","tiles":["ϣ","ⲁ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3154,"lesson_id":226,"type":"match","question":"طابق المقطع الديموطيقي بنطقه:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ϧⲟⲩ","right":"خو مضمومة"},{"left":"ϩⲁ","right":"ها"},{"left":"Ϭⲓ","right":"تشي / شي"}],"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3155,"lesson_id":226,"type":"read_select","question":"المقطع «ϥⲱ» ينطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5225,"challenge_id":3155,"text":"فوو (مفخمة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5226,"challenge_id":3155,"text":"فو خفيفة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":227,"unit_id":56,"title":"مصفوفة المقاطع العكسية (المتحرك يسبق الساكن)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3156,"lesson_id":227,"type":"text_view","question":"مصفوفة المقاطع العكسية المغلقة","coptic_display":"ⲁⲕ, ⲉⲕ, ⲓⲕ, ⲟⲕ, ⲱⲕ, ⲟⲩⲕ","audio_text":"مقاطع عكسية","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• المقاطع العكسية تنتهي بساكن وتلعب دوراً رئيسياً في نهايات الكلمات:\n  - ⲁⲕ (آك), ⲉⲕ (إِك), ⲓⲕ (إيك), ⲏⲕ (إييك), ⲟⲕ (أوك), ⲱⲕ (أووك), ⲟⲩⲕ (أووك مضمومة)\n  - ⲁⲥ (آس), ⲉⲥ (إِس), ⲓⲥ (إيس), ⲏⲥ (إييس), ⲟⲥ (أوس), ⲱⲥ (أووس), ⲟⲩⲥ (أووس مضمومة)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3157,"lesson_id":227,"type":"read_select","question":"المقطع «ⲱⲛ» يُنطق:","coptic_display":"ⲱⲛ","audio_text":"أوون","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5227,"challenge_id":3157,"text":"أوون (بواو طويلة مفخمة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5228,"challenge_id":3157,"text":"أون قصيرة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3158,"lesson_id":227,"type":"read_select","question":"المقطع «ⲟⲥ» في نهاية الكلمات اليونانية يُنطق:","coptic_display":"ⲟⲥ","audio_text":"أوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5229,"challenge_id":3158,"text":"أوس (بواو قصيرة خطافة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5230,"challenge_id":3158,"text":"أووس ممدودة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3159,"lesson_id":227,"type":"write","question":"ركّب المقطع العكسي 'إِش':","coptic_display":"ⲉϣ","audio_text":"إش","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲉϣ","tiles":["ⲉ","ϣ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3160,"lesson_id":227,"type":"match","question":"طابق المقطع العكسي بنطقه:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"ⲁⲛ","right":"آن"},{"left":"ⲉⲛ","right":"إِن"},{"left":"ⲟⲛ","right":"أون قصيرة"},{"left":"ⲱⲛ","right":"أوون مفخمة"}],"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3161,"lesson_id":227,"type":"read_select","question":"المقطع «ⲁϥ» في بداية الأفعال الماضية ينطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5231,"challenge_id":3161,"text":"آف","is_correct":true,"image_url":null,"audio_url":null},{"id":5232,"challenge_id":3161,"text":"أُف","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":228,"unit_id":56,"title":"مختبر القراءة الإيقاعية السريعة للمقاطع","xp_reward":6,"order_index":5,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3162,"lesson_id":228,"type":"read_select","question":"اقرأ السلسلة السريعة: «ⲥⲁ ⲥⲉ ⲥⲓ ⲥⲏ ⲥⲟ ⲥⲱ ⲥⲟⲩ» بالترتيب:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":1,"options":[{"id":5233,"challenge_id":3162,"text":"سا، سِ، سي، سيي، سو، سوو، سو مضمومة","is_correct":true,"image_url":null,"audio_url":null},{"id":5234,"challenge_id":3162,"text":"ترتيب غير صحيح","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3163,"lesson_id":228,"type":"read_select","question":"ميز بين «ⲃⲁ» و «ⲁⲃ»: أيهما ينطق فيه الحرف (ڤ)؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5235,"challenge_id":3163,"text":"الأولى (ⲃⲁ) لأن الفيتا متبوعة بمتحرك","is_correct":true,"image_url":null,"audio_url":null},{"id":5236,"challenge_id":3163,"text":"الثانية (ⲁⲃ)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3164,"lesson_id":228,"type":"write","question":"ركّب كلمة 'مخلّص' من مقطعين (سوتير):","coptic_display":"ⲥⲱⲧⲏⲣ","audio_text":"سوتير","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲥⲱⲧⲏⲣ","tiles":["ⲥⲱ","ⲧⲏⲣ"],"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":3165,"lesson_id":228,"type":"select","question":"كلمة «ⲥⲱⲧⲏⲣ» تعني بالقبطية:","coptic_display":"ⲥⲱⲧⲏⲣ","audio_text":"سوتير","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5237,"challenge_id":3165,"text":"مخلّص / فادي","is_correct":true,"image_url":null,"audio_url":null},{"id":5238,"challenge_id":3165,"text":"خالق","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3166,"lesson_id":228,"type":"read_select","question":"كم مقطعاً في كلمة «ⲡⲁ/ⲡⲁ»؟","coptic_display":"ⲡⲁ/ⲡⲁ","audio_text":"بابا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5239,"challenge_id":3166,"text":"مقطعان: (با) و (با)","is_correct":true,"image_url":null,"audio_url":null},{"id":5240,"challenge_id":3166,"text":"مقطع واحد","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3167,"lesson_id":228,"type":"read_select","question":"كلمة «ϫⲟⲓ» (سفينة / مركب) تتكون من مقطع:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5241,"challenge_id":3167,"text":"واحد ينطق (جوي صلبة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5242,"challenge_id":3167,"text":"مقطعين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":46,"level_id":5,"title":"الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)","badge":"Ϣ-Ϫ","description":"الحروف الديموطيقية السبعة الخاصة باللغة المصرية القديمة","order_index":6,"lessons":[{"id":158,"unit_id":46,"title":"حرف شاي (Ϣ ϣ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":818,"lesson_id":158,"type":"text_view","question":"نبذة عن حرف شاي (Ϣ ϣ)","coptic_display":"Ϣ ϣ","audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":"• اسم الحرف: شاي\n• نطق الحرف بالعربي: ش\n• قواعد النطق: الحرف السادس والعشرون. أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم. يُنطق حرف \"ش\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϣⲁⲩ\n  - القبطي المعرب (نطقها): «شاف»\n  - المعنى بالعربية: قطة\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":819,"lesson_id":158,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϣ واستمع لنطقه","coptic_display":"Ϣ","audio_text":"شاي كابيتال","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":820,"lesson_id":158,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϣ واستمع لنطقه","coptic_display":"ϣ","audio_text":"شاي سمول","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":821,"lesson_id":158,"type":"read_select","question":"ما هو نطق الحرف Ϣ بالعربية؟","coptic_display":"Ϣ","audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4540,"challenge_id":821,"text":"ش","is_correct":true,"image_url":null,"audio_url":null},{"id":4541,"challenge_id":821,"text":"س","is_correct":false,"image_url":null,"audio_url":null},{"id":4542,"challenge_id":821,"text":"ص","is_correct":false,"image_url":null,"audio_url":null},{"id":4543,"challenge_id":821,"text":"تش","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":822,"lesson_id":158,"type":"select","question":"ما معنى الكلمة القبطية: ϣⲁⲩ؟ (المعرب: «شاف»)","coptic_display":"ϣⲁⲩ","audio_text":"شاف","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4545,"challenge_id":822,"text":"قطة","is_correct":true,"image_url":null,"audio_url":null},{"id":4546,"challenge_id":822,"text":"أسد","is_correct":false,"image_url":null,"audio_url":null},{"id":4547,"challenge_id":822,"text":"طائر","is_correct":false,"image_url":null,"audio_url":null},{"id":4544,"challenge_id":822,"text":"كلب","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":823,"lesson_id":158,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قطة (المعرب: «شاف»)","coptic_display":"ϣⲁⲩ","audio_text":"شاف","audio_url":"audio_coptic/26shay.mp3","correct_word":"ϣⲁⲩ","tiles":["ϣ","ⲁ","ⲩ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":159,"unit_id":46,"title":"حرف فاي (Ϥ ϥ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":824,"lesson_id":159,"type":"text_view","question":"نبذة عن حرف فاي (Ϥ ϥ)","coptic_display":"Ϥ ϥ","audio_text":"فاي","audio_url":"audio_coptic/27fay.mp3","correct_word":"• اسم الحرف: فاي\n• نطق الحرف بالعربي: ف\n• قواعد النطق: الحرف السابع والعشرون. حرف مصري ديموطيقي أصيل يُنطق \"ف\".\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϥⲱⲓ\n  - القبطي المعرب (نطقها): «فوي»\n  - المعنى بالعربية: شعر\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":825,"lesson_id":159,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϥ واستمع لنطقه","coptic_display":"Ϥ","audio_text":"فاي كابيتال","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":826,"lesson_id":159,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϥ واستمع لنطقه","coptic_display":"ϥ","audio_text":"فاي سمول","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":827,"lesson_id":159,"type":"read_select","question":"ما هو نطق الحرف Ϥ بالعربية؟","coptic_display":"Ϥ","audio_text":"فاي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4549,"challenge_id":827,"text":"ف","is_correct":true,"image_url":null,"audio_url":null},{"id":4550,"challenge_id":827,"text":"ب","is_correct":false,"image_url":null,"audio_url":null},{"id":4551,"challenge_id":827,"text":"ڤ","is_correct":false,"image_url":null,"audio_url":null},{"id":4548,"challenge_id":827,"text":"و","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":828,"lesson_id":159,"type":"select","question":"ما معنى الكلمة القبطية: ϥⲱⲓ؟ (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4552,"challenge_id":828,"text":"يد","is_correct":false,"image_url":null,"audio_url":null},{"id":4553,"challenge_id":828,"text":"عين","is_correct":false,"image_url":null,"audio_url":null},{"id":4554,"challenge_id":828,"text":"رأس","is_correct":false,"image_url":null,"audio_url":null},{"id":4555,"challenge_id":828,"text":"شعر","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":829,"lesson_id":159,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: شعر (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":"ϥⲱⲓ","tiles":["ϥ","ⲱ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":160,"unit_id":46,"title":"حرف خاي (Ϧ ϧ)","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":830,"lesson_id":160,"type":"text_view","question":"نبذة عن حرف خاي (Ϧ ϧ)","coptic_display":"Ϧ ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":"• اسم الحرف: خاي\n• نطق الحرف بالعربي: خ\n• قواعد النطق: الحرف الثامن والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف \"خ\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϧⲏⲃⲥ\n  - القبطي المعرب (نطقها): «خيبس»\n  - المعنى بالعربية: مصباح\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":831,"lesson_id":160,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϧ واستمع لنطقه","coptic_display":"Ϧ","audio_text":"خاي كابيتال","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":832,"lesson_id":160,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϧ واستمع لنطقه","coptic_display":"ϧ","audio_text":"خاي سمول","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":833,"lesson_id":160,"type":"read_select","question":"ما هو نطق الحرف Ϧ بالعربية؟","coptic_display":"Ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4556,"challenge_id":833,"text":"خ","is_correct":true,"image_url":null,"audio_url":null},{"id":4557,"challenge_id":833,"text":"غ","is_correct":false,"image_url":null,"audio_url":null},{"id":4558,"challenge_id":833,"text":"ح","is_correct":false,"image_url":null,"audio_url":null},{"id":4559,"challenge_id":833,"text":"هـ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":834,"lesson_id":160,"type":"select","question":"ما معنى الكلمة القبطية: ϧⲏⲃⲥ؟ (المعرب: «خيبس»)","coptic_display":"ϧⲏⲃⲥ","audio_text":"خيبس","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4561,"challenge_id":834,"text":"شمعة","is_correct":false,"image_url":null,"audio_url":null},{"id":4562,"challenge_id":834,"text":"نور","is_correct":false,"image_url":null,"audio_url":null},{"id":4563,"challenge_id":834,"text":"قنديل","is_correct":false,"image_url":null,"audio_url":null},{"id":4560,"challenge_id":834,"text":"مصباح","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":835,"lesson_id":160,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: مصباح (المعرب: «خيبس»)","coptic_display":"ϧⲏⲃⲥ","audio_text":"خيبس","audio_url":"audio_coptic/28khay.mp3","correct_word":"ϧⲏⲃⲥ","tiles":["ϧ","ⲏ","ⲃ","ⲥ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":161,"unit_id":46,"title":"حرف هوري (Ϩ ϩ)","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":836,"lesson_id":161,"type":"text_view","question":"نبذة عن حرف هوري (Ϩ ϩ)","coptic_display":"Ϩ ϩ","audio_text":"هوري","audio_url":"audio_coptic/29hory.mp3","correct_word":"• اسم الحرف: هوري\n• نطق الحرف بالعربي: هـ\n• قواعد النطق: الحرف التاسع والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف \"هـ\" دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϩ̀ⲑⲟ\n  - القبطي المعرب (نطقها): «إهثو»\n  - المعنى بالعربية: حصان\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":837,"lesson_id":161,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϩ واستمع لنطقه","coptic_display":"Ϩ","audio_text":"هوري كابيتال","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":838,"lesson_id":161,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϩ واستمع لنطقه","coptic_display":"ϩ","audio_text":"هوري سمول","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":839,"lesson_id":161,"type":"read_select","question":"ما هو نطق الحرف Ϩ بالعربية؟","coptic_display":"Ϩ","audio_text":"هوري","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4565,"challenge_id":839,"text":"هـ","is_correct":true,"image_url":null,"audio_url":null},{"id":4566,"challenge_id":839,"text":"ح","is_correct":false,"image_url":null,"audio_url":null},{"id":4567,"challenge_id":839,"text":"خ","is_correct":false,"image_url":null,"audio_url":null},{"id":4564,"challenge_id":839,"text":"ع","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":840,"lesson_id":161,"type":"select","question":"ما معنى الكلمة القبطية: ϩ̀ⲑⲟ؟ (المعرب: «إهثو»)","coptic_display":"ϩ̀ⲑⲟ","audio_text":"إهثو","audio_url":"audio_coptic/29hory.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4568,"challenge_id":840,"text":"أسد","is_correct":false,"image_url":null,"audio_url":null},{"id":4569,"challenge_id":840,"text":"خروف","is_correct":false,"image_url":null,"audio_url":null},{"id":4570,"challenge_id":840,"text":"جمل","is_correct":false,"image_url":null,"audio_url":null},{"id":4571,"challenge_id":840,"text":"حصان","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":841,"lesson_id":161,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: حصان (المعرب: «إهثو»)","coptic_display":"ϩ̀ⲑⲟ","audio_text":"إهثو","audio_url":"audio_coptic/29hory.mp3","correct_word":"ϩ̀ⲑⲟ","tiles":["ϩ","̀","ⲑ","ⲟ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":162,"unit_id":46,"title":"حرف جانجا (Ϫ ϫ)","xp_reward":5,"order_index":5,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":842,"lesson_id":162,"type":"text_view","question":"نبذة عن حرف جانجا (Ϫ ϫ)","coptic_display":"Ϫ ϫ","audio_text":"جانجا","audio_url":"audio_coptic/30ganga.mp3","correct_word":"• اسم الحرف: جانجا\n• نطق الحرف بالعربي: ج (معطشة أو غير معطشة)\n• قواعد النطق: الحرف الثلاثون. حرف مصري ديموطيقي أصيل. يُنطق \"ج\" معطشة قبل المتحرك للكسر، و\"ج\" غير معطشة في الحالات الأخرى.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϫⲉⲙⲫⲉϩ\n  - القبطي المعرب (نطقها): «جيمفيه»\n  - المعنى بالعربية: تفاح\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":843,"lesson_id":162,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϫ واستمع لنطقه","coptic_display":"Ϫ","audio_text":"جانجا كابيتال","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":844,"lesson_id":162,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϫ واستمع لنطقه","coptic_display":"ϫ","audio_text":"جانجا سمول","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":845,"lesson_id":162,"type":"read_select","question":"ما هو نطق الحرف Ϫ بالعربية؟","coptic_display":"Ϫ","audio_text":"جانجا","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4572,"challenge_id":845,"text":"ج معطشة (أو د)","is_correct":true,"image_url":null,"audio_url":null},{"id":4573,"challenge_id":845,"text":"ج أو غ أو ن (غاما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4574,"challenge_id":845,"text":"تش (تشيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4575,"challenge_id":845,"text":"ش","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":846,"lesson_id":162,"type":"select","question":"ما معنى الكلمة القبطية: ϫⲉⲙⲫⲉϩ؟ (المعرب: «جيمفيه»)","coptic_display":"ϫⲉⲙⲫⲉϩ","audio_text":"جيمفيه","audio_url":"audio_coptic/30ganga.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4577,"challenge_id":846,"text":"برتقال","is_correct":false,"image_url":null,"audio_url":null},{"id":4578,"challenge_id":846,"text":"بطيخ","is_correct":false,"image_url":null,"audio_url":null},{"id":4579,"challenge_id":846,"text":"عنب","is_correct":false,"image_url":null,"audio_url":null},{"id":4576,"challenge_id":846,"text":"تفاح","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":847,"lesson_id":162,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: تفاح (المعرب: «جيمفيه»)","coptic_display":"ϫⲉⲙⲫⲉϩ","audio_text":"جيمفيه","audio_url":"audio_coptic/30ganga.mp3","correct_word":"ϫⲉⲙⲫⲉϩ","tiles":["ϫ","ⲉ","ⲙ","ⲫ","ⲉ","ϩ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":170,"unit_id":46,"title":"🔄 مراجعة الوحدة 6","xp_reward":5,"order_index":6,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":885,"lesson_id":170,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ϣ ϣ","right":"شاي (ش)"},{"left":"Ϥ ϥ","right":"فاي (ف)"},{"left":"Ϧ ϧ","right":"خاي (خ)"},{"left":"Ϩ ϩ","right":"هوري (هـ)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":886,"lesson_id":170,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"شاي","audio_url":"audio_coptic/26shay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4656,"challenge_id":886,"text":"Ϣ ϣ (شاي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4657,"challenge_id":886,"text":"Ⲥ ⲥ (سيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4658,"challenge_id":886,"text":"Ϭ ϭ (تشيما)","is_correct":false,"image_url":null,"audio_url":null},{"id":4659,"challenge_id":886,"text":"Ϫ ϫ (جانجا)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":887,"lesson_id":170,"type":"select","question":"ما معنى الكلمة: ϥⲱⲓ؟ (المعرب: «فوي»)","coptic_display":"ϥⲱⲓ","audio_text":"فوي","audio_url":"audio_coptic/27fay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4660,"challenge_id":887,"text":"شعر","is_correct":true,"image_url":null,"audio_url":null},{"id":4661,"challenge_id":887,"text":"رأس","is_correct":false,"image_url":null,"audio_url":null},{"id":4663,"challenge_id":887,"text":"يد","is_correct":false,"image_url":null,"audio_url":null},{"id":4662,"challenge_id":887,"text":"عين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":888,"lesson_id":170,"type":"write","question":"رتب حروف الكلمة: تفاح (المعرب: «جيمفيه»)","coptic_display":"ϫⲉⲙⲫⲉϩ","audio_text":"جيمفيه","audio_url":"audio_coptic/30ganga.mp3","correct_word":"ϫⲉⲙⲫⲉϩ","tiles":["ϫ","ⲉ","ⲙ","ⲫ","ⲉ","ϩ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":889,"lesson_id":170,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ϧ؟","coptic_display":"Ϧ","audio_text":"خاي","audio_url":"audio_coptic/28khay.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4664,"challenge_id":889,"text":"خاي (خ)","is_correct":true,"image_url":null,"audio_url":null},{"id":4665,"challenge_id":889,"text":"هوري (هـ)","is_correct":false,"image_url":null,"audio_url":null},{"id":4666,"challenge_id":889,"text":"غاما (غ أو ج أو ن)","is_correct":false,"image_url":null,"audio_url":null},{"id":4667,"challenge_id":889,"text":"تشيما (تش)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":47,"level_id":5,"title":"الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)","badge":"Ϭ-Ϯ","description":"ختام الأبجدية واختبار إتقان الـ 32 حرفاً القبطية بالكامل","order_index":7,"lessons":[{"id":163,"unit_id":47,"title":"حرف تشيما (Ϭ ϭ)","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":848,"lesson_id":163,"type":"text_view","question":"نبذة عن حرف تشيما (Ϭ ϭ)","coptic_display":"Ϭ ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":"• اسم الحرف: تشيما\n• نطق الحرف بالعربي: تش\n• قواعد النطق: الحرف الحادي والثلاثون. الحرف السادس من الحروف المصرية الديموطيقية، يُنطق تاء وشين معاً (تش) دائماً.\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϭⲁϫ\n  - القبطي المعرب (نطقها): «تشاج»\n  - المعنى بالعربية: عصفور\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":849,"lesson_id":163,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϭ واستمع لنطقه","coptic_display":"Ϭ","audio_text":"تشيما كابيتال","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":850,"lesson_id":163,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϭ واستمع لنطقه","coptic_display":"ϭ","audio_text":"تشيما سمول","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":851,"lesson_id":163,"type":"read_select","question":"ما هو نطق الحرف Ϭ بالعربية؟","coptic_display":"Ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4581,"challenge_id":851,"text":"تش","is_correct":true,"image_url":null,"audio_url":null},{"id":4582,"challenge_id":851,"text":"ش","is_correct":false,"image_url":null,"audio_url":null},{"id":4583,"challenge_id":851,"text":"ج","is_correct":false,"image_url":null,"audio_url":null},{"id":4580,"challenge_id":851,"text":"ت","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":852,"lesson_id":163,"type":"select","question":"ما معنى الكلمة القبطية: ϭⲁϫ؟ (المعرب: «تشاج»)","coptic_display":"ϭⲁϫ","audio_text":"تشاج","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4584,"challenge_id":852,"text":"دجاجة","is_correct":false,"image_url":null,"audio_url":null},{"id":4585,"challenge_id":852,"text":"حمامة","is_correct":false,"image_url":null,"audio_url":null},{"id":4586,"challenge_id":852,"text":"بطة","is_correct":false,"image_url":null,"audio_url":null},{"id":4587,"challenge_id":852,"text":"عصفور","is_correct":true,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":853,"lesson_id":163,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: عصفور (المعرب: «تشاج»)","coptic_display":"ϭⲁϫ","audio_text":"تشاج","audio_url":"audio_coptic/31chema.mp3","correct_word":"ϭⲁϫ","tiles":["ϭ","ⲁ","ϫ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":164,"unit_id":47,"title":"حرف تي (Ϯ ϯ)","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":854,"lesson_id":164,"type":"text_view","question":"نبذة عن حرف تي (Ϯ ϯ)","coptic_display":"Ϯ ϯ","audio_text":"تي","audio_url":"audio_coptic/32tee.mp3","correct_word":"• اسم الحرف: تي\n• نطق الحرف بالعربي: تـ + ي\n• قواعد النطق: الحرف الثاني والثلاثون والأخير في الأبجدية القبطية. مقطع صوتي مركب ينطق تاء وياء معاً (تـ + ي = Ti).\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ϯⲙⲓ\n  - القبطي المعرب (نطقها): «تيمي»\n  - المعنى بالعربية: قرية\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":855,"lesson_id":164,"type":"trace","question":"تتبّع كتابة الحرف الكبير (كابيتال): Ϯ واستمع لنطقه","coptic_display":"Ϯ","audio_text":"تي كابيتال","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[],"xp_reward":1},{"id":856,"lesson_id":164,"type":"trace","question":"تتبّع كتابة الحرف الصغير (سمول): ϯ واستمع لنطقه","coptic_display":"ϯ","audio_text":"تي سمول","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[],"xp_reward":1},{"id":857,"lesson_id":164,"type":"read_select","question":"ما هو نطق الحرف Ϯ بالعربية؟","coptic_display":"Ϯ","audio_text":"تي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4588,"challenge_id":857,"text":"تـ + ي (تي)","is_correct":true,"image_url":null,"audio_url":null},{"id":4589,"challenge_id":857,"text":"ت","is_correct":false,"image_url":null,"audio_url":null},{"id":4590,"challenge_id":857,"text":"ث","is_correct":false,"image_url":null,"audio_url":null},{"id":4591,"challenge_id":857,"text":"د + ي (دي)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":858,"lesson_id":164,"type":"select","question":"ما معنى الكلمة القبطية: ϯⲙⲓ؟ (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4593,"challenge_id":858,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4594,"challenge_id":858,"text":"مدينة","is_correct":false,"image_url":null,"audio_url":null},{"id":4595,"challenge_id":858,"text":"قرية","is_correct":true,"image_url":null,"audio_url":null},{"id":4592,"challenge_id":858,"text":"بيت","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":859,"lesson_id":164,"type":"write","question":"رتب حروف الكلمة القبطية لتكوين: قرية (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":"ϯⲙⲓ","tiles":["ϯ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[],"xp_reward":1}]},{"id":171,"unit_id":47,"title":"🔄 مراجعة شاملة للأبجدية القبطية","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":890,"lesson_id":171,"type":"match","question":"صل بين كل حرف قبطي ونطقه بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ϭ ϭ","right":"تشيما (تش)"},{"left":"Ϯ ϯ","right":"تي (تـ + ي)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":891,"lesson_id":171,"type":"listen","question":"استمع إلى نطق الحرف ثم اختر الحرف المطابق","coptic_display":null,"audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4690,"challenge_id":891,"text":"Ϭ ϭ (تشيما)","is_correct":true,"image_url":null,"audio_url":null},{"id":4691,"challenge_id":891,"text":"Ϣ ϣ (شاي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4692,"challenge_id":891,"text":"Ϫ ϫ (جانجا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4693,"challenge_id":891,"text":"Ϯ ϯ (تي)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":892,"lesson_id":171,"type":"select","question":"ما معنى الكلمة: ϯⲙⲓ؟ (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4670,"challenge_id":892,"text":"كنيسة","is_correct":false,"image_url":null,"audio_url":null},{"id":4673,"challenge_id":892,"text":"قرية","is_correct":true,"image_url":null,"audio_url":null},{"id":4671,"challenge_id":892,"text":"بيت","is_correct":false,"image_url":null,"audio_url":null},{"id":4672,"challenge_id":892,"text":"مدينة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":893,"lesson_id":171,"type":"write","question":"رتب حروف الكلمة: قرية (المعرب: «تيمي»)","coptic_display":"ϯⲙⲓ","audio_text":"تيمي","audio_url":"audio_coptic/32tee.mp3","correct_word":"ϯⲙⲓ","tiles":["ϯ","ⲙ","ⲓ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":894,"lesson_id":171,"type":"read_select","question":"ما هو نطق الحرف القبطي: Ϭ؟","coptic_display":"Ϭ","audio_text":"تشيما","audio_url":"audio_coptic/31chema.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":4676,"challenge_id":894,"text":"تشيما (تش)","is_correct":true,"image_url":null,"audio_url":null},{"id":4677,"challenge_id":894,"text":"شاي (ش)","is_correct":false,"image_url":null,"audio_url":null},{"id":4674,"challenge_id":894,"text":"جانجا (ج معطشة)","is_correct":false,"image_url":null,"audio_url":null},{"id":4675,"challenge_id":894,"text":"تي (تـ+ي)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":172,"unit_id":47,"title":"🎓 الاختبار النهائي الشامل للمستوى الأول","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":895,"lesson_id":172,"type":"match","question":"صل الحرف بنطقه الصحيح بالعربية","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":[{"left":"Ⲁ ⲁ","right":"ألفا (أ)"},{"left":"Ⲕ ⲕ","right":"كابا (ك)"},{"left":"ⲭ ⲭ","right":"خي (خ/ك/ش)"},{"left":"Ϯ ϯ","right":"تي (تـ+ي)"}],"is_correct":true,"order_index":1,"xp":1,"options":[],"xp_reward":1},{"id":896,"lesson_id":172,"type":"listen","question":"استمع واختر الحرف الصحيح","coptic_display":null,"audio_text":"ألفا","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":4678,"challenge_id":896,"text":"Ⲁ ⲁ (ألفا)","is_correct":true,"image_url":null,"audio_url":null},{"id":4680,"challenge_id":896,"text":"Ⲉ ⲉ (إي)","is_correct":false,"image_url":null,"audio_url":null},{"id":4679,"challenge_id":896,"text":"Ⲏ ⲏ (هيتا)","is_correct":false,"image_url":null,"audio_url":null},{"id":4681,"challenge_id":896,"text":"Ⲟ ⲟ (أُو)","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":897,"lesson_id":172,"type":"select","question":"ما معنى الكلمة القبطية: ⲁⲗⲱⲙ؟ (المعرب: «آلوم»)","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":4682,"challenge_id":897,"text":"جبنة","is_correct":true,"image_url":null,"audio_url":null},{"id":4683,"challenge_id":897,"text":"لبن","is_correct":false,"image_url":null,"audio_url":null},{"id":4684,"challenge_id":897,"text":"خبز","is_correct":false,"image_url":null,"audio_url":null},{"id":4685,"challenge_id":897,"text":"عسل","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":898,"lesson_id":172,"type":"select","question":"كم عدد حروف الأبجدية القبطية كاملة؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":4686,"challenge_id":898,"text":"٣٢ حرفاً","is_correct":true,"image_url":null,"audio_url":null},{"id":4688,"challenge_id":898,"text":"٢٦ حرفاً","is_correct":false,"image_url":null,"audio_url":null},{"id":4687,"challenge_id":898,"text":"٢٨ حرفاً","is_correct":false,"image_url":null,"audio_url":null},{"id":4689,"challenge_id":898,"text":"٣٠ حرفاً","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":899,"lesson_id":172,"type":"write","question":"رتب حروف الكلمة القبطية: جبنة (المعرب: «آلوم») [ⲁⲗⲱⲙ]","coptic_display":"ⲁⲗⲱⲙ","audio_text":"آلوم","audio_url":"assets/sounds/1alom.mp3","correct_word":"ⲁⲗⲱⲙ","tiles":["ⲁ","ⲗ","ⲱ","ⲙ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1}]}]},{"id":57,"level_id":6,"title":"الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة","badge":"التقطيع الصوتي","description":"امتلاك مهارة تشريح أي كلمة قبطية طويلة إلى مقاطع بديهية بالشرطة المائلة (/).","order_index":7,"lessons":[{"id":229,"unit_id":57,"title":"القواعد الذهبية الأربع لتقطيع الكلمات","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3168,"lesson_id":229,"type":"text_view","question":"القواعد الأربع للتقطيع المقطعي","coptic_display":"V/CV ، VC/CV","audio_text":"تقطيع الكلمات","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• القواعد الذهبية لتقطيع الكلمات بالشرطة المائلة (/):\n  1. قاعدة النواة: لا يوجد مقطع بدون حركة (متحرك) أو جنكم.\n  2. قاعدة الساكن الفردي بين حركتين (V / CV): يتبع الحركة التالية. مثال: ⲡⲁ/ⲥⲟⲛ (با - سون = أخي)\n  3. قاعدة الساكنين بين حركتين (VC / CV): يُقسمان بين المقطعين. مثال: ⲙⲁⲣ/ⲕⲟⲥ (مار - كوس)\n  4. قاعدة الجنكم: يقف كمقطع مستقل. مثال: ⲡ̀/ϭⲟ/ⲓⲥ (إب - شو - يس)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3169,"lesson_id":229,"type":"read_select","question":"التقطيع الصوتي الصحيح لكلمة «ⲡⲁⲥⲟⲛ» (أخي) هو:","coptic_display":"ⲡⲁ/ⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5243,"challenge_id":3169,"text":"ⲡⲁ/ⲥⲟⲛ (ساكن بين حركتين يتبع اللاحقة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5244,"challenge_id":3169,"text":"ⲡⲁⲥ/ⲟⲛ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3170,"lesson_id":229,"type":"read_select","question":"التقطيع الصوتي لكلمة «ⲙⲁⲣⲕⲟⲥ» (مرقس) هو:","coptic_display":"ⲙⲁⲣ/ⲕⲟⲥ","audio_text":"ماركوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5245,"challenge_id":3170,"text":"ⲙⲁⲣ/ⲕⲟⲥ (ساكنان بين حركتين يقسمان)","is_correct":true,"image_url":null,"audio_url":null},{"id":5246,"challenge_id":3170,"text":"ⲙⲁ/ⲣⲕⲟⲥ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3171,"lesson_id":229,"type":"select","question":"كلمة «ⲡⲁⲥⲟⲛ» تعني بالقبطية:","coptic_display":"ⲡⲁⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5247,"challenge_id":3171,"text":"أخي","is_correct":true,"image_url":null,"audio_url":null},{"id":5248,"challenge_id":3171,"text":"أبي","is_correct":false,"image_url":null,"audio_url":null},{"id":5249,"challenge_id":3171,"text":"أختي","is_correct":false,"image_url":null,"audio_url":null},{"id":6025,"challenge_id":3171,"text":"أمي","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3172,"lesson_id":229,"type":"write","question":"قطّع وركّب كلمة 'أخي' بالشرطة المائلة:","coptic_display":"ⲡⲁ/ⲥⲟⲛ","audio_text":"باصون","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲡⲁ/ⲥⲟⲛ","tiles":["ⲡⲁ","/","ⲥⲟⲛ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3173,"lesson_id":229,"type":"read_select","question":"كلمة «ⲧⲁⲥⲱⲛⲓ» (أختي) تقطع إلى:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5250,"challenge_id":3173,"text":"3 مقاطع: ⲧⲁ/ⲥⲱ/ⲛⲓ","is_correct":true,"image_url":null,"audio_url":null},{"id":5251,"challenge_id":3173,"text":"مقطعين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":230,"unit_id":57,"title":"السوابق وأدوات التعريف المدمجة","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3174,"lesson_id":230,"type":"text_view","question":"أدوات التعريف وسوابق الأسماء","coptic_display":"ⲡⲓ-, ϯ-, ⲛⲓ-","audio_text":"أدوات التعريف","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• ترتبط أدوات التعريف بالاسم في وحدة واحدة:\n  - ⲡⲓ- (بي للمذكر): مثل ⲡⲓ/ⲕⲁ/ϩ (بي كاه = الأرض)\n  - ϯ- (تي للمؤنث): مثل ϯ/ⲣⲟⲙ/ⲡⲓ (تي رومبي = السنة)\n  - ⲛⲓ- (ني للجمع): مثل ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ (ني في أو ي = السماوات)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3175,"lesson_id":230,"type":"read_select","question":"كلمة «ϯⲣⲟⲙⲡⲓ» (السنة) تقطع إلى:","coptic_display":"ϯ/ⲣⲟⲙ/ⲡⲓ","audio_text":"تي رومبي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5252,"challenge_id":3175,"text":"ϯ/ⲣⲟⲙ/ⲡⲓ (3 مقاطع)","is_correct":true,"image_url":null,"audio_url":null},{"id":5253,"challenge_id":3175,"text":"ϯⲣ/ⲟⲙⲡⲓ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3176,"lesson_id":230,"type":"select","question":"ما معنى كلمة «ϯⲣⲟⲙⲡⲓ» في الصلوات؟","coptic_display":"ϯⲣⲟⲙⲡⲓ","audio_text":"تي رومبي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5254,"challenge_id":3176,"text":"السنة","is_correct":true,"image_url":null,"audio_url":null},{"id":5255,"challenge_id":3176,"text":"الشهر","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3177,"lesson_id":230,"type":"write","question":"ركّب مقاطع كلمة 'السنة':","coptic_display":"ϯ/ⲣⲟⲙ/ⲡⲓ","audio_text":"تي رومبي","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϯ/ⲣⲟⲙ/ⲡⲓ","tiles":["ϯ","/","ⲣⲟⲙ","/","ⲡⲓ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3178,"lesson_id":230,"type":"read_select","question":"كلمة «ⲡⲓⲕⲁϩ» تعني بالقبطية:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5256,"challenge_id":3178,"text":"الأرض","is_correct":true,"image_url":null,"audio_url":null},{"id":5257,"challenge_id":3178,"text":"السماء","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3179,"lesson_id":230,"type":"read_select","question":"كلمة «ⲛⲓⲫⲏⲟⲩⲓ» (السماوات) تقطع إلى:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5258,"challenge_id":3179,"text":"4 مقاطع: ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ","is_correct":true,"image_url":null,"audio_url":null},{"id":5259,"challenge_id":3179,"text":"مقطعين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":231,"unit_id":57,"title":"الكلمات المركبة ومقاطع الإضافة والتجريد","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3180,"lesson_id":231,"type":"text_view","question":"مقاطع التجريد والفاعل والصفة","coptic_display":"ⲙⲉⲧ-, ⲣⲉϥ-, ⲙⲁ-","audio_text":"سوابق التجريد","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• سوابق الكلمات المركبة الطويلة:\n  - ⲙⲉⲧ- (سابقة التجريد): مثل ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ (صلاح / كرم)\n  - ⲣⲉϥ- (سابقة الفاعل): مثل ⲣⲉϥ/ϩⲓ/ⲱ/ⲓϣ (كارز / مبشر)\n  - ⲙⲁ- (سابقة المكان): مثل ⲙⲁ/ⲛ̀/ϣⲱ/ⲡⲓ (مسكن)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3181,"lesson_id":231,"type":"read_select","question":"السابقة «ⲙⲉⲧ-» في أول الكلمة تفيد:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5260,"challenge_id":3181,"text":"تحويل الصفة إلى اسم معنى ومصدر (تجريد)","is_correct":true,"image_url":null,"audio_url":null},{"id":5261,"challenge_id":3181,"text":"الجمع","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3182,"lesson_id":231,"type":"read_select","question":"السابقة «ⲣⲉϥ-» تفيد دلالة:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5262,"challenge_id":3182,"text":"اسم الفاعل وصاحب المهنة أو الصفة","is_correct":true,"image_url":null,"audio_url":null},{"id":5263,"challenge_id":3182,"text":"المكان","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3183,"lesson_id":231,"type":"select","question":"معنى كلمة «ⲣⲉϥϩⲓⲱⲓϣ» في لقب مارمرقس:","coptic_display":"ⲣⲉϥϩⲓⲱⲓϣ","audio_text":"ريف هي أو يش","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5264,"challenge_id":3183,"text":"الكارز / المنادي بالبشارة","is_correct":true,"image_url":null,"audio_url":null},{"id":5265,"challenge_id":3183,"text":"الشهيد","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3184,"lesson_id":231,"type":"write","question":"ركّب مقاطع 'صلاحك' بالشرطة المائلة:","coptic_display":"ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ","audio_text":"ميت خرستوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ","tiles":["ⲙⲉⲧ","/","ⲭ","/","ⲣⲏⲥ","/","ⲧⲟⲥ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3185,"lesson_id":231,"type":"read_select","question":"كلمة «ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ» (ملكوتك) تتكون من:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5266,"challenge_id":3185,"text":"ضمير ملكية + سابقة تجريد + كلمة ملك (أورو)","is_correct":true,"image_url":null,"audio_url":null},{"id":5267,"challenge_id":3185,"text":"كلمة بسيطة","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":232,"unit_id":57,"title":"تحدي فك الكلمات الطويلة بالغة الصعوبة","xp_reward":6,"order_index":4,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3186,"lesson_id":232,"type":"read_select","question":"قطّع الكلمة الكبرى «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» (الإنجيلي):","coptic_display":"ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ","audio_text":"إيڤانغيليستيس","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":1,"options":[{"id":5268,"challenge_id":3186,"text":"ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ (5 مقاطع)","is_correct":true,"image_url":null,"audio_url":null},{"id":5269,"challenge_id":3186,"text":"ⲉ/ⲩⲁⲅⲅⲉ/ⲗⲓⲥⲧⲏⲥ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3187,"lesson_id":232,"type":"read_select","question":"التقطيع الصائب لكلمة «ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» (مبارك) هو:","coptic_display":"ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ","audio_text":"إفسماروؤوت","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5270,"challenge_id":3187,"text":"ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ (5 مقاطع)","is_correct":true,"image_url":null,"audio_url":null},{"id":5271,"challenge_id":3187,"text":"ϥⲥ/ⲙⲁ/ⲣⲱⲟⲩⲧ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3188,"lesson_id":232,"type":"select","question":"كلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» تعني:","coptic_display":"ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ","audio_text":"إيڤانغيليستيس","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5272,"challenge_id":3188,"text":"الإنجيلي (كاتب البشارة)","is_correct":true,"image_url":null,"audio_url":null},{"id":5273,"challenge_id":3188,"text":"الشهيد","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3189,"lesson_id":232,"type":"write","question":"ركّب كلمة 'مبارك' مقطعة بالشرطة المائلة:","coptic_display":"ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ","audio_text":"إفسماروؤوت","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ","tiles":["ϥ̀","/","ⲥ","/","ⲙⲁ","/","ⲣⲱ","/","ⲟⲩⲧ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3190,"lesson_id":232,"type":"read_select","question":"كم مقطعاً في كلمة «ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ» (الرسول)؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5274,"challenge_id":3190,"text":"5 مقاطع: ⲡⲓ/ⲁ̀/ⲡⲟⲥ/ⲧⲟ/ⲗⲟⲥ","is_correct":true,"image_url":null,"audio_url":null},{"id":5275,"challenge_id":3190,"text":"3 مقاطع","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3191,"lesson_id":232,"type":"read_select","question":"كلمة «ⲁϥϭⲓⲱⲙⲥ» (اعتمد) تقطع إلى:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5276,"challenge_id":3191,"text":"3 مقاطع: ⲁϥ/ϭⲓ/ⲱⲙⲥ","is_correct":true,"image_url":null,"audio_url":null},{"id":5277,"challenge_id":3191,"text":"مقطعين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]},{"id":58,"level_id":6,"title":"الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل","badge":"قراءة كنسية","description":"تتويج المستوى الثاني بقراءة نصوص صلوات وألحان كنسية كاملة واجتياز امتحان التخرج الشامل.","order_index":8,"lessons":[{"id":233,"unit_id":58,"title":"مختبر صلوات المردات اليومية والطلبات","xp_reward":5,"order_index":1,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3192,"lesson_id":233,"type":"text_view","question":"طلبات ومردات الكنيسة اليومية","coptic_display":"Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ","audio_text":"إفنوتي ناي نان","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• نصوص كنسية معتمدة من كتاب إعدادي (ص 57):\n  1. Ⲫ̀/ⲛⲟⲩ/ϯ ⲛⲁ/ⲓ ⲛⲁⲛ (إفنوتي ناي نان = يا الله ارحمنا)\n  2. Ⲫ̀/ⲛⲟⲩ/ϯ ⲥⲱ/ⲧⲉⲙ ⲉ̀/ⲣⲟⲛ (إفنوتي سوتيم إيرون = يا الله اسمعنا)\n  3. Ⲫ̀/ⲛⲟⲩ/ϯ ⲥⲟⲙⲥ ⲉ̀/ⲣⲟⲛ (إفنوتي سومس إيرون = يا الله انظر إلينا)\n  4. Ⲫ̀/ⲛⲟⲩ/ϯ ϫⲟⲩ/ϣⲧ ⲉ̀/ⲣⲟⲛ (إفنوتي جوشت إيرون = يا الله اطلع علينا)\n  5. Ⲫ̀/ⲛⲟⲩ/ϯ ϣⲉⲛ/ϩⲏⲧ ϧⲁ/ⲣⲟⲛ (إفنوتي شينهيت خارون = يا الله تراءف علينا)\n  6. Ⲁ̀/ⲛⲟⲛ ϧⲁ ⲡⲉⲕ/ⲗⲁ/ⲟⲥ (آنون خا بيكلاؤس = نحن شعبك)","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3193,"lesson_id":233,"type":"read_select","question":"ما معنى عبارة «Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ»؟","coptic_display":"Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ","audio_text":"إفنوتي ناي نان","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5278,"challenge_id":3193,"text":"يا الله ارحمنا","is_correct":true,"image_url":null,"audio_url":null},{"id":5279,"challenge_id":3193,"text":"يا الله باركنا","is_correct":false,"image_url":null,"audio_url":null},{"id":5280,"challenge_id":3193,"text":"يا الله اسمعنا","is_correct":false,"image_url":null,"audio_url":null},{"id":6026,"challenge_id":3193,"text":"يا الله انظر إلينا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3194,"lesson_id":233,"type":"read_select","question":"كيف تنطق عبارة «Ⲫ̀ⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ»؟","coptic_display":"Ⲫ̀ⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ","audio_text":"إفنوتي سوتيم إيرون","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5281,"challenge_id":3194,"text":"إفنوتي سوتيم إيرون (يا الله اسمعنا)","is_correct":true,"image_url":null,"audio_url":null},{"id":5282,"challenge_id":3194,"text":"إفنوتي سومس إيرون","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3195,"lesson_id":233,"type":"select","question":"معنى عبارة «Ⲁ̀ⲛⲟⲛ ϧⲁ ⲡⲉⲕⲗⲁⲟⲥ» في المردات:","coptic_display":"Ⲁ̀ⲛⲟⲛ ϧⲁ ⲡⲉⲕⲗⲁⲟⲥ","audio_text":"آنون خا بيكلاؤس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5283,"challenge_id":3195,"text":"نحن شعبك","is_correct":true,"image_url":null,"audio_url":null},{"id":5284,"challenge_id":3195,"text":"أنتم خدام الله","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3196,"lesson_id":233,"type":"write","question":"ركّب طلبة 'يا الله ارحمنا':","coptic_display":"Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ","audio_text":"إفنوتي ناي نان","audio_url":"audio_coptic/1alfa.mp3","correct_word":"Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ","tiles":["Ⲫ̀ⲛⲟⲩϯ","ⲛⲁⲓ","ⲛⲁⲛ"],"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[],"xp_reward":1},{"id":3197,"lesson_id":233,"type":"read_select","question":"كلمة «ϫⲟⲩϣⲧ» في «Ⲫ̀ⲛⲟⲩϯ ϫⲟⲩϣⲧ ⲉ̀ⲣⲟⲛ» تعني:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5285,"challenge_id":3197,"text":"اطلع علينا / انظر إلينا بعين الرحمة","is_correct":true,"image_url":null,"audio_url":null},{"id":5286,"challenge_id":3197,"text":"اسمعنا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":234,"unit_id":58,"title":"مختبر ربع إنجيل عيد النيروز وإكليل السنة","xp_reward":5,"order_index":2,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3198,"lesson_id":234,"type":"text_view","question":"ربع مرد إنجيل النيروز بالتقطيع الصوتي","coptic_display":"ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ","audio_text":"إسمو إيبيكولوم","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• نص ربع إنجيل عيد النيروز (كتاب إعدادي ص 1 وص 14):\n  Ⲁⲗ/ⲗⲏ/ⲗⲟⲩ/ⲓⲁ (4) : ⲥ̀/ⲙⲟⲩ ⲉ̀/ⲡⲓ/ⲭ/ⲗⲟⲙ ⲛ̀/ⲧⲉ ϯ/ⲣⲟⲙ/ⲡⲓ : ϩⲓ/ⲧⲉⲛ ⲧⲉⲕ/ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ Ⲡ̀/ϭⲟ/ⲓⲥ : Ⲭⲉ ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ ⲛ̀/ϫⲉ Ⲫ̀/ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀/ϣⲏ/ⲣⲓ ⲛⲉⲙ Ⲡⲓ/ⲡ̀/ⲛⲉⲩ/ⲙⲁ ⲉⲑ/ⲟⲩ/ⲁⲃ.\n• الترجمة: هلليلويا (4): بارك إكليل السنة بصلاحك يا رب، لأنه مبارك الآب والابن والروح القدس.","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3199,"lesson_id":234,"type":"read_select","question":"في كلمة «ⲉ̀ⲡⲓⲭⲗⲟⲙ» (الإكليل)، حرف الكي يُنطق:","coptic_display":"ⲉ̀ⲡⲓⲭⲗⲟⲙ","audio_text":"إيبيكولوم","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5287,"challenge_id":3199,"text":"كاف لأن الكلمة قبطية أصيلة","is_correct":true,"image_url":null,"audio_url":null},{"id":5288,"challenge_id":3199,"text":"شين","is_correct":false,"image_url":null,"audio_url":null},{"id":5289,"challenge_id":3199,"text":"خاء","is_correct":false,"image_url":null,"audio_url":null},{"id":6027,"challenge_id":3199,"text":"قاف","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3200,"lesson_id":234,"type":"select","question":"معنى جملة «ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ» هو:","coptic_display":"ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ","audio_text":"إسمو إيبيكولوم إنتي تيرومبي","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5290,"challenge_id":3200,"text":"بارك إكليل السنة","is_correct":true,"image_url":null,"audio_url":null},{"id":5291,"challenge_id":3200,"text":"بارك شعبك","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3201,"lesson_id":234,"type":"write","question":"ركّب عبارة 'بارك الإكليل':","coptic_display":"ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ","audio_text":"إسمو إيبيكولوم","audio_url":"audio_coptic/1alfa.mp3","correct_word":"ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ","tiles":["ⲥ̀ⲙⲟⲩ","ⲉ̀ⲡⲓⲭⲗⲟⲙ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3202,"lesson_id":234,"type":"read_select","question":"كيف تنطق عبارة «Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ»؟","coptic_display":"Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ","audio_text":"إفيوت نِم إبشيري","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5292,"challenge_id":3202,"text":"إفيوت نِم إبشيري (الآب والابن)","is_correct":true,"image_url":null,"audio_url":null},{"id":5293,"challenge_id":3202,"text":"إفيوت نِم إبشويس","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3203,"lesson_id":234,"type":"read_select","question":"الكلمة «ⲧⲉⲕⲙⲉⲧⲭⲣⲏⲥⲧⲟⲥ» تعني:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5294,"challenge_id":3203,"text":"صلاحك / جودك","is_correct":true,"image_url":null,"audio_url":null},{"id":5295,"challenge_id":3203,"text":"مجدك","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":235,"unit_id":58,"title":"مختبر ذكصولوجية القديس مرقس الرسول","xp_reward":5,"order_index":3,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3204,"lesson_id":235,"type":"text_view","question":"لحن الهيتينيات لمارمرقس الرسول بالتقطيع","coptic_display":"Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ Ⲙⲁⲣⲕⲟⲥ","audio_text":"هيتين ني إيڤكي","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• نص الذكصولوجية (كتاب إعدادي ص 64):\n  Ϩⲓ/ⲧⲉⲛ ⲛⲓ/ⲉⲩ/ⲭⲏ : ⲛ̀/ⲧⲉ ⲡⲓ/ⲑⲉ/ⲱ/ⲣⲓ/ⲙⲟⲥ : ⲛ̀/ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ : Ⲙⲁⲣ/ⲕⲟⲥ ⲡⲓ/ⲁ̀/ⲡⲟⲥ/ⲧⲟ/ⲗⲟⲥ : Ⲡ̀/ϭⲟ/ⲓⲥ ⲁ̀/ⲣⲓ/ϩ̀/ⲙⲟⲧ ⲛⲁⲛ : ⲙ̀/ⲡⲓ/ⲭⲱ ⲉ̀/ⲃⲟⲗ : ⲛ̀/ⲧⲉ ⲛⲉⲛ/ⲛⲟ/ⲃⲓ.\n• الترجمة: بصلوات ناظر الإله الإنجيلي مرقس الرسول، يا رب أنعم لنا بمغفرة خطايانا.","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3205,"lesson_id":235,"type":"read_select","question":"كلمة «ⲛⲓⲉⲩⲭⲏ» تعني بالقبطية:","coptic_display":"ⲛⲓⲉⲩⲭⲏ","audio_text":"ني إيڤكي","audio_url":"audio_coptic/2vo.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5296,"challenge_id":3205,"text":"الصلوات / الطلبات","is_correct":true,"image_url":null,"audio_url":null},{"id":5297,"challenge_id":3205,"text":"الأصوام","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3206,"lesson_id":235,"type":"select","question":"لقب مارمرقس «ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ» يعني:","coptic_display":"ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ","audio_text":"بيثيؤوريموس","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5298,"challenge_id":3206,"text":"ناظر الإله","is_correct":true,"image_url":null,"audio_url":null},{"id":5299,"challenge_id":3206,"text":"الشهيد","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3207,"lesson_id":235,"type":"write","question":"ركّب اسم 'مرقس الرسول' بالقبطية:","coptic_display":"Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ","audio_text":"ماركوس بي أبوستولوس","audio_url":"audio_coptic/1alfa.mp3","correct_word":"Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ","tiles":["Ⲙⲁⲣⲕⲟⲥ","ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3208,"lesson_id":235,"type":"read_select","question":"عبارة «ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ» تعني:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5300,"challenge_id":3208,"text":"بمغفرة خطايانا","is_correct":true,"image_url":null,"audio_url":null},{"id":5301,"challenge_id":3208,"text":"ببركة بيوتنا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3209,"lesson_id":235,"type":"read_select","question":"في «ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ»، حرف الهوري عليه جنكم ينطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5302,"challenge_id":3209,"text":"إهموت (بهمزة مكسورة قبل الهاء)","is_correct":true,"image_url":null,"audio_url":null},{"id":5303,"challenge_id":3209,"text":"هاموت","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":236,"unit_id":58,"title":"مختبر صلاة 'أبانا الذي في السماوات'","xp_reward":5,"order_index":4,"practice_xp":5,"challenge_xp":5,"challenges":[{"id":3210,"lesson_id":236,"type":"text_view","question":"الصلاة الربانية بالتقطيع الصوتي الكامل","coptic_display":"Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ","audio_text":"بنيوت إتخين نيفيؤوي","audio_url":"audio_coptic/1alfa.mp3","correct_word":"• نص الصلاة الربانية:\n  Ⲡⲉⲛ/ⲓⲱⲧ ⲉⲧ/ϧⲉⲛ ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ : ⲙⲁ/ⲣⲉϥ/ⲧⲟⲩ/ⲃⲟ ⲛ̀/ϫⲉ ⲡⲉⲕ/ⲣⲁⲛ : ⲙⲁ/ⲣⲉⲥ/ⲓ̀ ⲛ̀/ϫⲉ ⲧⲉⲕ/ⲙⲉⲧ/ⲟⲩ/ⲣⲟ : ⲡⲉⲧ/ⲉϩ/ⲛⲁⲕ ⲙⲁ/ⲣⲉϥ/ϣⲱ/ⲡⲓ : ⲙ̀/ⲫ̀/ⲣⲏϯ ϧⲉⲛ ⲧ̀/ⲫⲉ ⲛⲉⲙ ϩⲓ/ϫⲉⲛ ⲡⲓ/ⲕⲁ/ϩ.\n• الترجمة: أبانا الذي في السماوات، ليتقدس اسمك، ليأتِ ملكوتك، لتكن مشيئتك، كما في السماء كذلك على الأرض.","tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":0,"options":[],"xp_reward":0},{"id":3211,"lesson_id":236,"type":"read_select","question":"كلمة «ⲡⲉⲕⲣⲁⲛ» تعني:","coptic_display":"ⲡⲉⲕⲣⲁⲛ","audio_text":"بيكران","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5304,"challenge_id":3211,"text":"اسمك","is_correct":true,"image_url":null,"audio_url":null},{"id":5305,"challenge_id":3211,"text":"بيتك","is_correct":false,"image_url":null,"audio_url":null},{"id":5306,"challenge_id":3211,"text":"روحك","is_correct":false,"image_url":null,"audio_url":null},{"id":6028,"challenge_id":3211,"text":"ملكوتك","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3212,"lesson_id":236,"type":"select","question":"عبارة «ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ» تعني:","coptic_display":"ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ","audio_text":"تيكميت أورو","audio_url":"audio_coptic/1alfa.mp3","correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5307,"challenge_id":3212,"text":"ملكوتك","is_correct":true,"image_url":null,"audio_url":null},{"id":5308,"challenge_id":3212,"text":"مجدك","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3213,"lesson_id":236,"type":"write","question":"ركّب عبارة 'أبانا الذي في السماوات':","coptic_display":"Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ","audio_text":"بنيوت إتخين نيفيؤوي","audio_url":"audio_coptic/1alfa.mp3","correct_word":"Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ","tiles":["Ⲡⲉⲛⲓⲱⲧ","ⲉⲧϧⲉⲛ","ⲛⲓⲫⲏⲟⲩⲓ"],"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[],"xp_reward":1},{"id":3214,"lesson_id":236,"type":"read_select","question":"كيف تنطق عبارة «ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩ»؟","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5309,"challenge_id":3214,"text":"خين إتفيه نِم هيجين بيكاه (في السماء وعلى الأرض)","is_correct":true,"image_url":null,"audio_url":null},{"id":5310,"challenge_id":3214,"text":"خين تافيه نوم هيجون","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3215,"lesson_id":236,"type":"read_select","question":"في «ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ»، كلمة «ⲧⲟⲩⲃⲟ» تعني:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5311,"challenge_id":3215,"text":"يتقدس / يطهر","is_correct":true,"image_url":null,"audio_url":null},{"id":5312,"challenge_id":3215,"text":"يرتفع","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]},{"id":237,"unit_id":58,"title":"الامتحان النهائي الكبير لشهادة القراءة القبطية","xp_reward":6,"order_index":5,"practice_xp":6,"challenge_xp":6,"challenges":[{"id":3216,"lesson_id":237,"type":"read_select","question":"سؤال 1: في كلمة «ⲭⲉⲣⲉ» (السلام لكِ)، يُنطق حرف الكي:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":1,"xp":1,"options":[{"id":5313,"challenge_id":3216,"text":"شين (شيريه)","is_correct":true,"image_url":null,"audio_url":null},{"id":5314,"challenge_id":3216,"text":"خاء","is_correct":false,"image_url":null,"audio_url":null},{"id":5315,"challenge_id":3216,"text":"كاف","is_correct":false,"image_url":null,"audio_url":null},{"id":6029,"challenge_id":3216,"text":"سين","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3217,"lesson_id":237,"type":"read_select","question":"سؤال 2: في كلمة «ⲭⲏⲙⲓ» (مصر)، يُنطق حرف الكي:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":2,"xp":1,"options":[{"id":5316,"challenge_id":3217,"text":"كاف (كيمي)","is_correct":true,"image_url":null,"audio_url":null},{"id":5317,"challenge_id":3217,"text":"شين","is_correct":false,"image_url":null,"audio_url":null},{"id":5318,"challenge_id":3217,"text":"خاء","is_correct":false,"image_url":null,"audio_url":null},{"id":6030,"challenge_id":3217,"text":"قاف","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3218,"lesson_id":237,"type":"read_select","question":"سؤال 3: في كلمة «ⲁⲅⲅⲉⲗⲟⲥ»، الغمّا الأولى تنطق:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":3,"xp":1,"options":[{"id":5319,"challenge_id":3218,"text":"نون (أنغيلوس)","is_correct":true,"image_url":null,"audio_url":null},{"id":5320,"challenge_id":3218,"text":"جيم","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3219,"lesson_id":237,"type":"read_select","question":"سؤال 4: في اسم «Ⲇⲁⲩⲓⲇ»، الدلتا والفيتا ينطقان:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":4,"xp":1,"options":[{"id":5321,"challenge_id":3219,"text":"د و ڤ (داڤيد)","is_correct":true,"image_url":null,"audio_url":null},{"id":5322,"challenge_id":3219,"text":"ذ و ب","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3220,"lesson_id":237,"type":"read_select","question":"سؤال 5: في كلمة «ⲥ̀ⲙⲟⲩ»، الجنكم فوق السيما يلفظ:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":5,"xp":1,"options":[{"id":5323,"challenge_id":3220,"text":"إِسـ","is_correct":true,"image_url":null,"audio_url":null},{"id":5324,"challenge_id":3220,"text":"سا","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1},{"id":3221,"lesson_id":237,"type":"read_select","question":"سؤال 6: التقطيع الصحيح لكلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» هو:","coptic_display":null,"audio_text":null,"audio_url":null,"correct_word":null,"tiles":null,"pairs":null,"is_correct":true,"order_index":6,"xp":1,"options":[{"id":5325,"challenge_id":3221,"text":"ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ","is_correct":true,"image_url":null,"audio_url":null},{"id":5326,"challenge_id":3221,"text":"ⲉ/ⲩⲁⲅⲅⲉ/ⲗⲓⲥⲧⲏⲥ","is_correct":false,"image_url":null,"audio_url":null}],"xp_reward":1}]}]}],"chests":[{"id":"chest_unit_1","level_id":5,"unit_id":41,"title":"🎁 صندوق كنز الوحدة 1","description":"مكافأة إتمام دروس ومراجعة الوحدة 1","placement_type":"unit_end","after_lesson_id":165,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:14.452862+00:00"},{"id":"chest_unit_2","level_id":5,"unit_id":42,"title":"🎁 صندوق كنز الوحدة 2","description":"مكافأة إتمام دروس ومراجعة الوحدة 2","placement_type":"unit_end","after_lesson_id":166,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:24.120217+00:00"},{"id":"chest_unit_3","level_id":5,"unit_id":43,"title":"🎁 صندوق كنز الوحدة 3","description":"مكافأة إتمام دروس ومراجعة الوحدة 3","placement_type":"unit_end","after_lesson_id":167,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:31.505007+00:00"},{"id":"chest_unit_4","level_id":5,"unit_id":44,"title":"🎁 صندوق كنز الوحدة 4","description":"مكافأة إتمام دروس ومراجعة الوحدة 4","placement_type":"unit_end","after_lesson_id":168,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:38.422023+00:00"},{"id":"chest_unit_5","level_id":5,"unit_id":45,"title":"🎁 صندوق كنز الوحدة 5","description":"مكافأة إتمام دروس ومراجعة الوحدة 5","placement_type":"unit_end","after_lesson_id":169,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:44.559788+00:00"},{"id":"chest_unit_6","level_id":5,"unit_id":46,"title":"🎁 صندوق كنز الوحدة 6","description":"مكافأة إتمام دروس ومراجعة الوحدة 6","placement_type":"unit_end","after_lesson_id":170,"xp_mode":"fixed","xp_min":10,"xp_max":10,"hearts":1,"has_badge":false,"badge_title":"","badge_icon":"gift","badge_desc":"","order_index":0,"created_at":"2026-09-12T14:06:52.06023+00:00"},{"id":"chest_unit_7","level_id":5,"unit_id":47,"title":"🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول","description":"تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!","placement_type":"unit_end","after_lesson_id":171,"xp_mode":"fixed","xp_min":50,"xp_max":50,"hearts":3,"has_badge":true,"badge_title":"متقن الأبجدية القبطية","badge_icon":"trophy","badge_desc":"أتممت المستوى الأول للأبجدية القبطية كاملاً (٣٢ حرفاً)","order_index":0,"created_at":"2026-09-12T14:06:58.486596+00:00"},{"id":"chest_unit_51","level_id":6,"unit_id":51,"title":"صندوق إتقان الوحدة ١: هندسة الحركات ومقاييس زمن النطق","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":205,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ١: هندسة الحركات ومقاييس زمن النطق","badge_icon":"star","badge_desc":"أتممت الوحدة ١: هندسة الحركات ومقاييس زمن النطق","order_index":1,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_52","level_id":6,"unit_id":52,"title":"صندوق إتقان الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":209,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة","badge_icon":"star","badge_desc":"أتممت الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة","order_index":2,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_53","level_id":6,"unit_id":53,"title":"صندوق إتقان الوحدة ٣: الحروف ذات النطق الشرطي المزدوج","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":214,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٣: الحروف ذات النطق الشرطي المزدوج","badge_icon":"star","badge_desc":"أتممت الوحدة ٣: الحروف ذات النطق الشرطي المزدوج","order_index":3,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_54","level_id":6,"unit_id":54,"title":"صندوق إتقان الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":219,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة","badge_icon":"star","badge_desc":"أتممت الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة","order_index":4,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_55","level_id":6,"unit_id":55,"title":"صندوق إتقان الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":223,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني","badge_icon":"star","badge_desc":"أتممت الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني","order_index":5,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_56","level_id":6,"unit_id":56,"title":"صندوق إتقان الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":228,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس","badge_icon":"star","badge_desc":"أتممت الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس","order_index":6,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_57","level_id":6,"unit_id":57,"title":"صندوق إتقان الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":232,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة","badge_icon":"star","badge_desc":"أتممت الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة","order_index":7,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_unit_58","level_id":6,"unit_id":58,"title":"صندوق إتقان الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل","description":"تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!","placement_type":"unit_end","after_lesson_id":237,"xp_mode":"fixed","xp_min":15,"xp_max":15,"hearts":1,"has_badge":true,"badge_title":"متقن الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل","badge_icon":"star","badge_desc":"أتممت الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل","order_index":8,"created_at":"2026-09-14T17:33:58.020411+00:00"},{"id":"chest_level_2_final","level_id":6,"unit_id":58,"title":"🏆 صندوق التخرج والاحتفال الختامي للمستوى الثاني","description":"تهانينا الحارة! لقد أتقنت جميع قواعد القراءة والمقاطع الصوتية والنصوص الكنسية بنجاح باهر!","placement_type":"level_end","after_lesson_id":237,"xp_mode":"fixed","xp_min":60,"xp_max":60,"hearts":3,"has_badge":true,"badge_title":"قارئ قبطي متقن","badge_icon":"trophy","badge_desc":"أتممت المستوى الثاني لقواعد القراءة والنطق السليم كاملاً","order_index":99,"created_at":"2026-09-14T17:33:58.020411+00:00"}]};

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
      'ergoh': '5ergoh.mp3', '5ergoh': '5ergoh.mp3', 'ⲉ̀ⲣϫⲱ': '5ergoh.mp3', 'ⲉ̀ⲣϫⲱ': '5ergoh.mp3', 'إرجو': '5ergoh.mp3',
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

    // 1. إيقاف أي صوت شغال حالياً
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

    const filename = cleanPrimary.split('/').pop().split('\\').pop().split('?')[0];

    // 2. كاش عناصر Web Audio فائق السرعة
    const cachedBuf = this._audioBufferCache.get(cleanPrimary) || (filename ? this._audioBufferCache.get(filename) : null);
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

    // 3. كاش عناصر HTML5 Audio
    const cachedAudio = this._soundFileCache.get(cleanPrimary) || (filename ? this._soundFileCache.get(filename) : null);
    if(cachedAudio){
      try {
        cachedAudio.currentTime = 0;
        this._activeAudio = cachedAudio;
        const p = cachedAudio.play();
        if(p !== undefined) await p;
        return true;
      } catch(e){}
    }

    // 4. استخراج المرشحين
    let candidates = this.resolveAudioCandidates(cleanPrimary);
    if (filename && (!candidates || candidates.length === 0)) {
      candidates = this.resolveAudioCandidates(filename);
    }
    if (!candidates || candidates.length === 0) {
      candidates = [cleanPrimary];
    }

    // إضافة مسارات إضافية تضمن إيجاد الملف دائماً
    if (filename && filename.endsWith('.mp3')) {
      const extraPaths = [
        `audio_coptic/${filename}`,
        `assets/sounds/${filename}`,
        `./audio_coptic/${filename}`,
        `./assets/sounds/${filename}`,
        `../audio_coptic/${filename}`,
        `../assets/sounds/${filename}`,
        filename
      ];
      extraPaths.forEach(p => {
        if (!candidates.includes(p)) candidates.push(p);
      });
    }

    // 5. التشغيل المباشر عبر HTML5 Audio (يعمل 100% دون أخطاء CORS على كل المنصات)
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      const ok = await new Promise((resolve) => {
        let done = false;
        const audio = new Audio();
        this._activeAudio = audio;
        audio.preload = 'auto';

        const finishOk = () => {
          if(!done){
            done = true;
            this._soundFileCache.set(cleanPrimary, audio);
            if (filename) this._soundFileCache.set(filename, audio);
            resolve(true);
          }
        };

        const finishFail = () => {
          if(!done){
            done = true;
            resolve(false);
          }
        };

        audio.addEventListener('playing', finishOk, { once: true });
        audio.addEventListener('canplaythrough', finishOk, { once: true });
        audio.addEventListener('error', finishFail, { once: true });

        try {
          audio.src = candidateUrl;
          const p = audio.play();
          if(p !== undefined){
            p.then(finishOk).catch(finishFail);
          }
        } catch(err){
          finishFail();
        }

        // أقصى مهلة للمحاولة الفردية 600 ميلي ثانية لتفادي أي تأخير
        setTimeout(finishFail, 600);
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
        } else if(data.type === 'progress_remote' || data.type === 'progress_admin_update' || data.type === 'levels_unlocked'){
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
              if(data.type === 'levels_unlocked' || data.actionType === 'unlock_levels'){
                try {
                  localStorage.setItem('mg_coptic_unlocked_all_levels', 'true');
                  if (curUid) localStorage.setItem(`mg_coptic_unlocked_all_levels_${curUid}`, 'true');
                } catch(_) {}
                this.getLessonProgress(curUid, false).then(() => {
                  if(typeof window !== 'undefined'){
                    if(typeof window.drawSkillMapDOM === 'function') window.drawSkillMapDOM();
                    if(typeof window.renderSkillMap === 'function') window.renderSkillMap();
                    if(typeof window.renderLevelSelectorCards === 'function') window.renderLevelSelectorCards();
                  }
                });
              }
            }, 300);
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
                if(isExplicitReset){
                  this.resetFullAccountLocal(curUid);
                }

                if (payload?.new) {
                  const curProg = this.getProgressLocal(curUid) || {};
                  curProg.points = Number(payload.new.points ?? curProg.points ?? 0);
                  curProg.total_points = curProg.points;
                  if (payload.new.hearts != null) curProg.hearts = Number(payload.new.hearts);
                  if (payload.new.streak_days != null) curProg.streak_days = Number(payload.new.streak_days);
                  if (Array.isArray(payload.new.claimed_chests)) curProg.claimed_chests = payload.new.claimed_chests;
                  if (payload.new.reset_version != null) {
                    curProg.reset_version = Number(payload.new.reset_version);
                    localStorage.setItem(`mg_coptic_reset_version_${curUid}`, String(curProg.reset_version));
                  }
                  this.saveProgressLocal(curProg, curUid);
                  if(typeof window !== 'undefined'){
                    if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(curProg);
                    if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                    if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
                  }
                }

                this.getProgress(curUid, true).then(fresh => {
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

    // إذا كان التقدم مسجلاً محلياً ولم يُطلب الجلب الإجباري، نرجعه فوراً مع مزامنة في الخلفية
    if(progress && !forceRemote){
      const cached = this.checkAndRegenerateHearts(progress, uid);
      if(sbClient && uid && !this._bgSyncActive){
        this._bgSyncActive = true;
        sbClient.from('user_progress').select('*').eq('user_id', uid).maybeSingle().then(({ data, error }) => {
          this._bgSyncActive = false;
          if(!error && data){
            const serverPoints = Number(data.points ?? 0);
            const serverHearts = Number(data.hearts ?? 5);
            const serverStreak = Number(data.streak_days ?? 1);
            if(cached.points !== serverPoints || cached.hearts !== serverHearts || cached.streak_days !== serverStreak){
              cached.points = serverPoints;
              cached.total_points = serverPoints;
              cached.hearts = serverHearts;
              cached.streak_days = serverStreak;
              if(Array.isArray(data.claimed_chests)) cached.claimed_chests = data.claimed_chests;
              this.saveProgressLocal(cached, uid);
              if(typeof window !== 'undefined'){
                if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(cached);
                if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
              }
            }
          }
        }).catch(() => { this._bgSyncActive = false; });
      }
      return cached;
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

  // إضافة نقاط محلياً فقط دون إرسال تحديث فردي للسيرفر (لمنع التكرار وحماية حصانة السيرفر)
  addPointsLocalOnly(userId, points = 0){
    const uid = userId || this.getCurrentUser()?.id;
    const prog = this.getProgressLocal(uid) || {};
    const safePoints = Math.max(0, parseInt(points, 10) || 0);
    prog.points = Math.max(0, (prog.points || 0) + safePoints);
    prog.total_points = prog.points;
    this.saveProgressLocal(prog, uid, true);
    return prog;
  }

  // تحديث التقدم سحابياً في Supabase لحساب المستخدم بدقة دون مساس بالنقاط إلا إذا حُددت
  async updateProgress(userId, updates = {}){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = await this.getProgress(uid);
    let pointsChanged = false;
    if(typeof updates.hearts === 'number') prog.hearts = Math.max(0, Math.min(5, updates.hearts));
    if(typeof updates.addPoints === 'number') {
      const safePoints = parseInt(updates.addPoints, 10) || 0;
      if (safePoints !== 0) {
        prog.points = Math.max(0, (prog.points || 0) + safePoints);
        prog.total_points = prog.points;
        pointsChanged = true;
      }
    }
    if(typeof updates.addHearts === 'number') {
      const safeHearts = Math.max(0, parseInt(updates.addHearts, 10) || 0);
      prog.hearts = Math.max(0, Math.min(5, (prog.hearts ?? 5) + safeHearts));
    }
    if(typeof updates.streak_days === 'number') prog.streak_days = Math.max(1, updates.streak_days);
    if(Array.isArray(updates.claimed_chests)) prog.claimed_chests = updates.claimed_chests;

    this.saveProgressLocal(prog, uid);

    if(sbClient && uid){
      // تحديث الحقول المعدلة فعلياً فقط دون كتابة عشوائية فوق النقاط
      const dbUpdates = {};
      if(typeof updates.hearts === 'number' || typeof updates.addHearts === 'number') dbUpdates.hearts = prog.hearts;
      if(typeof updates.streak_days === 'number') dbUpdates.streak_days = prog.streak_days;
      if(Array.isArray(updates.claimed_chests)) dbUpdates.claimed_chests = prog.claimed_chests || [];
      if(updates.last_active_date) dbUpdates.last_active_date = prog.last_active_date;
      if(pointsChanged) dbUpdates.points = prog.points;

      if(Object.keys(dbUpdates).length > 0){
        sbClient.from('user_progress').update(dbUpdates).eq('user_id', uid).then(()=>{}).catch(e => {
          console.warn('Supabase updateProgress error:', e);
        });
      }
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
    // شراء قلوب بنقاط الـ XP (القلب = 100 XP) مع دعم RPC الذري والاحتياطي الموثوق
  async buyHeartsWithXp(userId, count = 1, costParam = 100){
    const uid = userId || this.getCurrentUser()?.id;
    const safeCount = Math.max(1, Math.min(5, parseInt(count, 10) || 1));
    const COST_PER_HEART = 100;

    // 1. المحاولة أولاً عبر الدالة الذرية الموثوقة على السيرفر (Server-Authoritative RPC)
    if(sbClient && uid){
      try {
        const { data: rpcData, error: rpcErr } = await sbClient.rpc('buy_hearts_with_xp', {
          p_hearts_count: safeCount,
          p_cost_per_heart: COST_PER_HEART
        });

        if(!rpcErr && rpcData){
          if(rpcData.success){
            const curProg = this.getProgressLocal(uid) || {};
            curProg.points = Number(rpcData.points ?? curProg.points ?? 0);
            curProg.total_points = curProg.points;
            curProg.hearts = Number(rpcData.hearts ?? 5);

            const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;
            if(curProg.hearts >= 5){
              try { localStorage.removeItem(timerKey); } catch(e){}
              curProg.last_heart_loss_at = null;
            }

            this.saveProgressLocal(curProg, uid);
            return { success: true, prog: curProg, hearts: curProg.hearts, points: curProg.points };
          } else {
            return {
              success: false,
              reason: rpcData.reason || 'insufficient_xp',
              required: rpcData.required,
              current: rpcData.current
            };
          }
        }
      } catch(rpcEx){
        console.warn('buy_hearts_with_xp RPC fallback to client calculation:', rpcEx);
      }
    }

    // 2. احتياطي العميل الموثوق (Client Fallback) في حال تعذر تشغيل RPC
    let prog = await this.getProgress(uid, true);

    // حساب التكلفة الصحيحة بدقة:
    // إذا مرر المستدعي التكلفة الإجمالية (مثلاً 400 لأربعة قلوب) أو سعر القلب الواحد (100)
    let totalCost = safeCount * COST_PER_HEART;
    const numCost = parseInt(costParam, 10);
    if(!isNaN(numCost) && numCost > 0){
      if(numCost === safeCount * COST_PER_HEART){
        totalCost = numCost;
      } else if(numCost === COST_PER_HEART){
        totalCost = safeCount * COST_PER_HEART;
      } else if(numCost < COST_PER_HEART){
        totalCost = safeCount * numCost;
      } else {
        totalCost = numCost;
      }
    }

    const currentPoints = prog.points || 0;
    if(currentPoints < totalCost){
      return { success: false, reason: 'insufficient_xp', required: totalCost, current: currentPoints };
    }
    prog.points = Math.max(0, currentPoints - totalCost);
    prog.total_points = prog.points;
    prog.hearts = Math.max(0, Math.min(5, (prog.hearts || 0) + safeCount));

    const timerKey = `mg_coptic_heart_timer_${uid || 'guest'}`;
    if (prog.hearts >= 5) {
      try { localStorage.removeItem(timerKey); } catch(e){}
      prog.last_heart_loss_at = null;
    }

    this.saveProgressLocal(prog, uid);
    if(sbClient && uid){
      sbClient.from('user_progress').update({ points: prog.points, hearts: prog.hearts }).eq('user_id', uid).then(()=>{}).catch(e => {
        console.warn('Supabase buyHearts update error:', e);
      });
    }
    return { success: true, prog, hearts: prog.hearts, points: prog.points };
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
      if (Array.isArray(cachedCurriculum.levels) && cachedCurriculum.levels.length >= 3 && cachedCurriculum.units.length >= 25) {
        return cachedCurriculum;
      }
      localStorage.removeItem('mg_coptic_curriculum_v2');
      localStorage.removeItem('mg_coptic_curriculum_v1');
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM);
      cachedCurriculum = null;
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
            const { data: optData } = await sbClient.from('challenge_options').select('*').in('challenge_id', chIds).order('id', { ascending: true });
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
                const xp = 1; // كل سؤال بـ 1 XP
                return {
                  ...c,
                  xp: xp,
                  xp_reward: xp,
                  options: opts
                };
              });
              const finalLessonXp = lChallenges.length; // 1 XP لكل سؤال
              const finalPracticeXp = lChallenges.length;
              const finalChallengeXp = lChallenges.length;

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

    const baseLessonKey = String(lessonId).replace(/_[pc]$/, '');
    const wasAlreadyCompleted = Boolean(
      (map[String(lessonId)] && map[String(lessonId)].status === 'completed') ||
      (map[baseLessonKey] && map[baseLessonKey].status === 'completed')
    );
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

          const awardedXp = wasAlreadyCompleted ? 0 : Number(rpcData.added_xp || 0);
          map.added_xp = awardedXp;
          map.points = curProg.points;
          map.hearts = curProg.hearts;

          if(awardedXp > 0){
            this.recordTodayEarnedXP(uid, awardedXp);
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
    if(!serverHandled){
      const rawReward = (xpReward !== undefined && xpReward !== null) ? parseInt(xpReward, 10) : 20;
      const fallbackXp = wasAlreadyCompleted ? 0 : (isNaN(rawReward) ? 0 : Math.max(0, rawReward));
      const curProg = this.getProgressLocal(uid) || {};
      if(fallbackXp > 0){
        curProg.points = (curProg.points || 0) + fallbackXp;
        curProg.total_points = (curProg.total_points || 0) + fallbackXp;
        this.saveProgressLocal(curProg, uid);
        this.recordTodayEarnedXP(uid, fallbackXp);
      }
      map.added_xp = fallbackXp;
      map.points = curProg.points || 0;
      map.hearts = curProg.hearts || 5;

      if(sbClient && uid && !isNaN(numLessonId)){
        sbClient.from('user_lesson_progress').upsert({
          user_id: uid,
          lesson_id: numLessonId,
          status: 'completed',
          score: parseInt(score, 10) || 100,
          updated_at: new Date().toISOString()
        }).then(()=>{}, ()=>{});

        if(!wasAlreadyCompleted && fallbackXp > 0){
          sbClient.from('user_progress').update({
            points: curProg.points || 0,
            last_active_date: new Date().toISOString().split('T')[0]
          }).eq('user_id', uid).then(()=>{}, ()=>{});
        }
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
