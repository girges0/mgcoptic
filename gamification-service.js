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
   المنهج الافتراضي للمستوى الأول (الأبجدية القبطية - اللهجة البحيرية)
   ============================================================ */
const DEFAULT_CURRICULUM = {
  levels: [
    {
      id: 1,
      title: 'المستوى 1: الأبجدية القبطية (اللهجة البحيرية)',
      description: 'تعلّم نطق وكتابة وقراءة جميع الحروف القبطية الـ 32 من خلال 7 وحدات تدريبية ممتعة.',
      order_index: 1
    }
  ],
  level: {
    id: 1,
    title: 'المستوى 1: الأبجدية القبطية (اللهجة البحيرية)',
    description: 'تعلّم نطق وكتابة وقراءة جميع الحروف القبطية الـ 32 من خلال 7 وحدات تدريبية ممتعة.',
    order_index: 1
  },
  units: [
    {
      id: 1,
      level_id: 1,
      title: 'الوحدة 1: الحروف الأولى (ⲁ- ⲃ- ⲅ- ⲇ ⲉ)',
      order_index: 1,
      badge: 'Ⲁ',
      description: 'ألفا، فيدا، غاما، دلدا، إي',
      lessons: [
        {
          id: 1,
          unit_id: 1,
          title: 'الدرس 1: نطق الحروف ⲁ ⲃ ⲅ ⲇ ⲉ',
          order_index: 1,
          xp_reward: 20,
          challenges: [
            {
              id: 101,
              type: 'select',
              question: 'ما هو الصوت الأساسي للحرف Ⲁⲁ (ألفا)؟',
              coptic_display: 'Ⲁ ⲁ',
              audio_text: 'ألفا',
              audio_url: 'audio/alfa.mp3',
              options: [
                { text: 'أَ (ألف مفتوحة ممدودة)', is_correct: true },
                { text: 'ب (باء صريحة)', is_correct: false },
                { text: 'ك (كاف مفخمة)', is_correct: false },
                { text: 'م (ميم ساكنة)', is_correct: false }
              ]
            },
            {
              id: 102,
              type: 'select',
              question: 'أي من الحروف التالية يُنطق «ڤ / ب» واسمه فيدا؟',
              coptic_display: 'Ⲃ ⲃ',
              audio_text: 'فيدا',
              options: [
                { text: 'Ⲃ ⲃ', is_correct: true },
                { text: 'Ⲇ ⲇ', is_correct: false },
                { text: 'Ⲉ ⲉ', is_correct: false },
                { text: 'Ⲅ ⲅ', is_correct: false }
              ]
            },
            {
              id: 103,
              type: 'listen',
              question: 'استمع للاسم واختر الحرف القبطي المقابل:',
              audio_text: 'غاما',
              coptic_display: 'Ⲅ ⲅ',
              options: [
                { text: 'Ⲅ ⲅ (غاما)', is_correct: true },
                { text: 'Ⲁ ⲁ (ألفا)', is_correct: false },
                { text: 'Ⲃ ⲃ (فيدا)', is_correct: false },
                { text: 'Ⲇ ⲇ (دلدا)', is_correct: false }
              ]
            },
            {
              id: 104,
              type: 'select',
              question: 'حرف Ⲇⲇ (دلدا) يُنطق في الكلمات القبطية كـ:',
              coptic_display: 'Ⲇ ⲇ',
              audio_text: 'دلدا',
              options: [
                { text: 'د (دال) أو ذ (ذال)', is_correct: true },
                { text: 'ر (راء)', is_correct: false },
                { text: 'س (سين)', is_correct: false },
                { text: 'ص (صاد)', is_correct: false }
              ]
            },
            {
              id: 105,
              type: 'match',
              question: 'طابق كل حرف قبطي باسمه الصحيح:',
              pairs: [
                { left: 'Ⲁ ⲁ', right: 'ألفا' },
                { left: 'Ⲃ ⲃ', right: 'فيدا' },
                { left: 'Ⲉ ⲉ', right: 'إي' },
                { left: 'Ⲇ ⲇ', right: 'دلدا' }
              ]
            },
            {
              id: 106,
              type: 'trace',
              question: 'تتبّع ورسم الحرف القبطي Ⲁ (ألفا) كاملاً على السبورة بدقة:',
              text_to_trace: 'Ⲁ',
              coptic_display: 'Ⲁ',
              target_title: 'حرف ألفا (Ⲁ)',
              xp_reward: 15
            }
          ]
        }
      ]
    },
    {
      id: 2,
      level_id: 1,
      title: 'الوحدة 2: الحروف (ⲍ ⲏ ⲑ ⲓ ⲕ)',
      order_index: 2,
      badge: 'Ⲍ',
      description: 'زاتا، هيتا، ثيتا، إيوتا، كابا',
      lessons: [
        {
          id: 2,
          unit_id: 2,
          title: 'الدرس 2: أصوات الحروف ⲍ ⲏ ⲑ ⲓ ⲕ',
          order_index: 1,
          xp_reward: 20,
          challenges: [
            {
              id: 201,
              type: 'select',
              question: 'ما هو اسم الحرف القبطي Ⲍⲍ وكيف يُنطق؟',
              coptic_display: 'Ⲍ ⲍ',
              audio_text: 'زاتا',
              options: [
                { text: 'زاتا — يُنطق زاي (ز)', is_correct: true },
                { text: 'هيتا — ياء ممدودة', is_correct: false },
                { text: 'ثيتا — ثاء', is_correct: false },
                { text: 'كابا — كاف', is_correct: false }
              ]
            },
            {
              id: 202,
              type: 'select',
              question: 'حرف Ⲏⲏ (هيتا) هو حركة مدّية تعادل في النطق:',
              coptic_display: 'Ⲏ ⲏ',
              audio_text: 'هيتا',
              options: [
                { text: 'ياء ممدودة طويلة (يه)', is_correct: true },
                { text: 'واو مضمومة', is_correct: false },
                { text: 'ألف مقصورة', is_correct: false },
                { text: 'نون ساكنة', is_correct: false }
              ]
            },
            {
              id: 203,
              type: 'listen',
              question: 'استمع للاسم واختر الحرف القبطي الصحيح:',
              audio_text: 'ثيتا',
              coptic_display: 'Ⲑ ⲑ',
              options: [
                { text: 'Ⲑ ⲑ (ثيتا)', is_correct: true },
                { text: 'Ⲧ ⲧ (تاف)', is_correct: false },
                { text: 'Ⲍ ⲍ (زاتا)', is_correct: false },
                { text: 'Ⲕ ⲕ (كابا)', is_correct: false }
              ]
            },
            {
              id: 204,
              type: 'match',
              question: 'طابق الحروف القبطية بنطقها الصحيح:',
              pairs: [
                { left: 'Ⲓ ⲓ', right: 'ي (إيوتا)' },
                { left: 'Ⲕ ⲕ', right: 'ك (كابا)' },
                { left: 'Ⲍ ⲍ', right: 'ز (زاتا)' },
                { left: 'Ⲑ ⲑ', right: 'ث (ثيتا)' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      level_id: 1,
      title: 'الوحدة 3: الحروف (ⲗ ⲙ ⲛ ⲝ ⲟ)',
      order_index: 3,
      badge: 'Ⲗ',
      description: 'لابدا، مي، ني، كسي، أو القصيرة',
      lessons: [
        {
          id: 3,
          unit_id: 3,
          title: 'الدرس 3: أصوات الحروف ⲗ ⲙ ⲛ ⲝ ⲟ',
          order_index: 1,
          xp_reward: 25,
          challenges: [
            {
              id: 301,
              type: 'select',
              question: 'ما هو نطق الحرف القبطي Ⲗⲗ (لابدا)؟',
              coptic_display: 'Ⲗ ⲗ',
              audio_text: 'لابدا',
              options: [
                { text: 'ل (لام)', is_correct: true },
                { text: 'م (ميم)', is_correct: false },
                { text: 'ر (راء)', is_correct: false },
                { text: 'ن (نون)', is_correct: false }
              ]
            },
            {
              id: 302,
              type: 'select',
              question: 'الحرف المركّب Ⲝⲝ (كسي) يُنطق:',
              coptic_display: 'Ⲝ ⲝ',
              audio_text: 'كسي',
              options: [
                { text: 'كس (K + S)', is_correct: true },
                { text: 'بس (P + S)', is_correct: false },
                { text: 'تش (CH)', is_correct: false },
                { text: 'تي (T + I)', is_correct: false }
              ]
            },
            {
              id: 303,
              type: 'write',
              question: 'اكتب أو رتّب الحروف لتكوين نطق الحرف المركب Ⲝⲝ:',
              coptic_display: 'Ⲝ ⲝ',
              correct_word: 'كس',
              tiles: ['ك', 'س', 'ب', 'ت'],
              options: []
            },
            {
              id: 304,
              type: 'match',
              question: 'طابق بين الحرف ونطقه المقابل:',
              pairs: [
                { left: 'Ⲙ ⲙ', right: 'م (مي)' },
                { left: 'Ⲛ ⲛ', right: 'ن (ني)' },
                { left: 'Ⲗ ⲗ', right: 'ل (لابدا)' },
                { left: 'Ⲟ ⲟ', right: 'ُأ (أو قصيرة)' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      level_id: 1,
      title: 'الوحدة 4: الحروف (ⲡ ⲣ ⲥ ⲧ ⲩ)',
      order_index: 4,
      badge: 'Ⲡ',
      description: 'بي، رو، سيما، تاف، إبسيلون',
      lessons: [
        {
          id: 4,
          unit_id: 4,
          title: 'الدرس 4: الحروف ⲡ ⲣ ⲥ ⲧ ⲩ',
          order_index: 1,
          xp_reward: 25,
          challenges: [
            {
              id: 401,
              type: 'select',
              question: 'حرف Ⲡⲡ (بي) يُنطق في الكلمات القبطية كـ:',
              coptic_display: 'Ⲡ ⲡ',
              audio_text: 'بي',
              options: [
                { text: 'ب (باء صريحة)', is_correct: true },
                { text: 'ف (فاء)', is_correct: false },
                { text: 'ت (تاء)', is_correct: false },
                { text: 'م (ميم)', is_correct: false }
              ]
            },
            {
              id: 402,
              type: 'select',
              question: 'ما هو الحرف الذي يُنطق (س) واسمه سيما؟',
              coptic_display: 'Ⲥ ⲥ',
              audio_text: 'سيما',
              options: [
                { text: 'Ⲥ ⲥ (سيما)', is_correct: true },
                { text: 'Ⲣ ⲣ (رو)', is_correct: false },
                { text: 'Ⲧ ⲧ (تاف)', is_correct: false },
                { text: 'Ⲩ ⲩ (إبسيلون)', is_correct: false }
              ]
            },
            {
              id: 403,
              type: 'listen',
              question: 'استمع للاسم وحدد الحرف المقابل:',
              audio_text: 'رو',
              coptic_display: 'Ⲣ ⲣ',
              options: [
                { text: 'Ⲣ ⲣ (رو)', is_correct: true },
                { text: 'Ⲡ ⲡ (بي)', is_correct: false },
                { text: 'Ⲥ ⲥ (سيما)', is_correct: false },
                { text: 'Ⲧ ⲧ (تاف)', is_correct: false }
              ]
            },
            {
              id: 404,
              type: 'match',
              question: 'طابق الحرف القبطي بنطقه:',
              pairs: [
                { left: 'Ⲣ ⲣ', right: 'ر (راء)' },
                { left: 'Ⲧ ⲧ', right: 'ت (تاء)' },
                { left: 'Ⲩ ⲩ', right: 'و / ي (إبسيلون)' },
                { left: 'Ⲡ ⲡ', right: 'ب (باء)' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 5,
      level_id: 1,
      title: 'الوحدة 5: الحروف (ⲫ ⲭ ⲯ ⲱ)',
      order_index: 5,
      badge: 'Ⲫ',
      description: 'في، خي، إبسي، أوميغا',
      lessons: [
        {
          id: 5,
          unit_id: 5,
          title: 'الدرس 5: الحروف ⲫ ⲭ ⲯ ⲱ',
          order_index: 1,
          xp_reward: 25,
          challenges: [
            {
              id: 501,
              type: 'select',
              question: 'ما هو الحرف المركّب Ⲯⲯ وما نطقه؟',
              coptic_display: 'Ⲯ ⲯ',
              audio_text: 'إبسي',
              options: [
                { text: 'إبسي — يُنطق «بس» (P + S)', is_correct: true },
                { text: 'كسي — يُنطق «كس»', is_correct: false },
                { text: 'تي — يُنطق «تي»', is_correct: false },
                { text: 'تشيما — يُنطق «تش»', is_correct: false }
              ]
            },
            {
              id: 502,
              type: 'select',
              question: 'حرف Ⲱⲱ (أوميغا) يُمثل حركة:',
              coptic_display: 'Ⲱ ⲱ',
              audio_text: 'أوميغا',
              options: [
                { text: 'واو ممدودة طويلة (أوو)', is_correct: true },
                { text: 'واو قصيرة مضمومة', is_correct: false },
                { text: 'ياء ساكنة', is_correct: false },
                { text: 'ألف مهموزة', is_correct: false }
              ]
            },
            {
              id: 503,
              type: 'write',
              question: 'رتّب الحروف لكتابة نطق الحرف المركب Ⲯⲯ (إبسي):',
              coptic_display: 'Ⲯ ⲯ',
              correct_word: 'بس',
              tiles: ['ب', 'س', 'ك', 'ي'],
              options: []
            },
            {
              id: 504,
              type: 'match',
              question: 'طابق كل حرف بالصوت المقابل له:',
              pairs: [
                { left: 'Ⲫ ⲫ', right: 'ف (في)' },
                { left: 'Ⲭ ⲭ', right: 'خ / ك / ش (خي)' },
                { left: 'Ⲯ ⲯ', right: 'بس (إبسي)' },
                { left: 'Ⲱ ⲱ', right: 'أوو (أوميغا)' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 6,
      level_id: 1,
      title: 'الوحدة 6: الحروف المصرية الخاصة (ϣ ϥ ϧ ϩ ϫ ϭ ϯ)',
      order_index: 6,
      badge: 'Ϣ',
      description: 'الحروف السبعة القبطية الأصيلة من الخط الديموطيقي',
      lessons: [
        {
          id: 6,
          unit_id: 6,
          title: 'الدرس 6: الحروف السبعة الديموطيقية',
          order_index: 1,
          xp_reward: 30,
          challenges: [
            {
              id: 601,
              type: 'select',
              question: 'الحرف Ϣϣ (شاي) هو حرف مصري قديم ويُنطق:',
              coptic_display: 'Ϣ ϣ',
              audio_text: 'شاي',
              options: [
                { text: 'ش (شين صريحة)', is_correct: true },
                { text: 'س (سين)', is_correct: false },
                { text: 'ص (صاد)', is_correct: false },
                { text: 'ث (ثاء)', is_correct: false }
              ]
            },
            {
              id: 602,
              type: 'select',
              question: 'أي من الحروف التالية يُنطق «تش» مثل «تشيرش»؟',
              coptic_display: 'Ϭ ϭ',
              audio_text: 'تشيما',
              options: [
                { text: 'Ϭ ϭ (تشيما)', is_correct: true },
                { text: 'Ϫ ϫ (جانجا)', is_correct: false },
                { text: 'Ϩ ϩ (هوري)', is_correct: false },
                { text: 'Ϧ ϧ (خاي)', is_correct: false }
              ]
            },
            {
              id: 603,
              type: 'select',
              question: 'الحرف Ϫϫ (جانجا) في اللهجة البحيرية يُنطق:',
              coptic_display: 'Ϫ ϫ',
              audio_text: 'جانجا',
              options: [
                { text: 'ج (جيم عطشة / معطشة أو دج)', is_correct: true },
                { text: 'ق (قاف)', is_correct: false },
                { text: 'غ (غين)', is_correct: false },
                { text: 'خ (خاء)', is_correct: false }
              ]
            },
            {
              id: 604,
              type: 'listen',
              question: 'استمع للاسم واختر الحرف الديموطيقي:',
              audio_text: 'فاي',
              coptic_display: 'Ϥ ϥ',
              options: [
                { text: 'Ϥ ϥ (فاي)', is_correct: true },
                { text: 'Ϧ ϧ (خاي)', is_correct: false },
                { text: 'Ϩ ϩ (هوري)', is_correct: false },
                { text: 'Ϯ ϯ (تي)', is_correct: false }
              ]
            },
            {
              id: 605,
              type: 'match',
              question: 'طابق الحروف المصرية الخاصة بأسمائها:',
              pairs: [
                { left: 'Ϥ ϥ', right: 'فاي (ف)' },
                { left: 'Ϧ ϧ', right: 'خاي (خ حلقية)' },
                { left: 'Ϩ ϩ', right: 'هوري (هـ)' },
                { left: 'Ϯ ϯ', right: 'تي (مقطع مركب)' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 7,
      level_id: 1,
      title: 'الوحدة 7: مراجعة شاملة وتحدي الأبجدية',
      order_index: 7,
      badge: 'Ϯ',
      description: 'اختبار إتقان جميع حروف الأبجدية القبطية الـ 32',
      lessons: [
        {
          id: 7,
          unit_id: 7,
          title: 'الدرس 7: التحدي الختامي للأبجدية القبطية',
          order_index: 1,
          xp_reward: 40,
          challenges: [
            {
              id: 701,
              type: 'select',
              question: 'كم عدد حروف الأبجدية القبطية (بما فيها الحرف الرقمي سو Ⲋⲋ)؟',
              coptic_display: 'Ⲁ ... Ϯ',
              audio_text: 'الأبجدية القبطية',
              options: [
                { text: '32 حرفاً', is_correct: true },
                { text: '28 حرفاً', is_correct: false },
                { text: '26 حرفاً', is_correct: false },
                { text: '30 حرفاً', is_correct: false }
              ]
            },
            {
              id: 702,
              type: 'select',
              question: 'كم عدد الحروف القبطية الأصيلة المأخوذة من الديموطيقية المصرية؟',
              coptic_display: 'Ϣ ϥ ϧ ϩ ϫ ϭ ϯ',
              audio_text: 'الحروف المصرية',
              options: [
                { text: '7 حروف', is_correct: true },
                { text: '5 حروف', is_correct: false },
                { text: '9 حروف', is_correct: false },
                { text: '3 حروف', is_correct: false }
              ]
            },
            {
              id: 703,
              type: 'match',
              question: 'تحدي المطابقة الأخير: طابق الحرف بصوته الصحيح:',
              pairs: [
                { left: 'Ⲁ ⲁ', right: 'ألف مفتوحة' },
                { left: 'Ⲱ ⲱ', right: 'واو ممدودة' },
                { left: 'Ϣ ϣ', right: 'شين' },
                { left: 'Ϯ ϯ', right: 'مقطع تي' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

/* ============================================================
   محرك الصوتيات بواسطة Web Audio API (Chimes, Buzzers, Celebrations)
   ============================================================ */
class SoundEffects {
  constructor(){
    this.ctx = null;
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
      if(this.ctx && this.ctx.state === 'suspended'){
        this.ctx.resume().catch(()=>{});
      }
    } catch(e){}
  }
  playCorrect(){
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
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50];
      const times = [0, 0.1, 0.2, 0.32, 0.46, 0.65];
      const durs  = [0.09, 0.09, 0.09, 0.12, 0.16, 0.55];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + times[i]);
        gain.gain.setValueAtTime(0.18, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + durs[i]);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + times[i]);
        osc.stop(now + times[i] + durs[i]);
      });
    } catch(e){}
  }
  playChestReward(){
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
    try {
      this._init();
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch(e){}
  }
  _audioBufferCache = new Map();
  _currentSourceNode = null;

  resolveAudioCandidates(input){
    if(!input) return [];
    const raw = String(input).trim();
    if(!raw) return [];

    // 1. Google Drive (file/d/ID/view, open?id=ID, uc?id=ID, docs.google.com/...)
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

    // 2. Dropbox (dl=0 -> raw=1 or dl=1)
    if(/dropbox\.com/i.test(raw)){
      let u = raw.replace(/\?dl=0/i, '').replace(/&dl=0/i, '');
      u = u.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      return [u, raw.includes('?') ? `${raw}&raw=1` : `${raw}?raw=1`, raw];
    }

    return [raw];
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

    // 1. إذا كان الصوت مخزناً في كاش Web Audio
    if(this._audioBufferCache.has(cleanPrimary) && this.ctx){
      try {
        const buffer = this._audioBufferCache.get(cleanPrimary);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        this._currentSourceNode = source;
        return true;
      } catch(e){}
    }

    const candidates = this.resolveAudioCandidates(cleanPrimary);

    // 2. المحاولة عبر Web Audio API (أدق وأعلى نقاء وموثوقية)
    for(let i = 0; i < candidates.length; i++){
      const candidateUrl = candidates[i];
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
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
        }, 3500);
      });

      if(ok) return true;
    }

    return false;
  }

  async playChallengeAudio(audioUrl, audioText) {
    this.unlock();
    const cleanUrl = String(audioUrl || '').trim();
    if (cleanUrl && (cleanUrl.startsWith('http') || cleanUrl.startsWith('data:') || cleanUrl.includes('.'))) {
      try {
        const ok = await this.playAudio(cleanUrl);
        if (ok) return true;
      } catch(e){}
    }
    const textToSpeak = String(audioText || '').trim();
    if (textToSpeak) {
      return this.speakArabic(textToSpeak);
    }
    return false;
  }

  speakArabic(text){
    if(!text) return false;
    const clean = String(text).trim();
    if(!clean) return false;

    // 1. استدعاء نطق المتصفح المحلي كاحتياط
    const fallbackToSpeechSynthesis = () => {
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
        console.warn('Speech synthesis fallback error:', err);
        return false;
      }
    };

    // 2. التدفق الصوتي عالي النقاء عبر السيرفر الصوتي (يعمل على جميع الأجهزة دون الحاجة لحزم لغات الويندوز)
    try {
      if(this._activeAudio){
        try { this._activeAudio.pause(); this._activeAudio.currentTime = 0; } catch(e){}
        this._activeAudio = null;
      }

      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(clean)}`;
      const audio = new Audio(ttsUrl);
      this._activeAudio = audio;
      audio.playbackRate = 0.95;

      const p = audio.play();
      if(p !== undefined){
        p.catch(err => {
          fallbackToSpeechSynthesis();
        });
      }
      return true;
    } catch(e){
      return fallbackToSpeechSynthesis();
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
  ['click', 'touchstart', 'keydown', 'mousedown'].forEach(evt => {
    window.addEventListener(evt, () => {
      Sound.unlock();
      if('speechSynthesis' in window && window.speechSynthesis.paused){
        window.speechSynthesis.resume();
      }
    }, { once: true, passive: true });
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
        if(data.type === 'progress_remote' || data.type === 'progress_admin_update'){
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
                this.getProgress(curUid, false).then(fresh => {
                  if(typeof window !== 'undefined'){
                    if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(fresh);
                    if(typeof window.syncHomeLearningProgress === 'function') window.syncHomeLearningProgress();
                    if(typeof window.hydrateHomeFromCacheSync === 'function') window.hydrateHomeFromCacheSync();
                  }
                });
              }, 1000);
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
      default_challenge_xp: 10,
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

  // التحقق الحقيقي من جلسة Supabase Auth وجلب بيانات البروفايل
  async getCurrentUserAsync(){
    if(!sbClient) return this.getCurrentUser();
    try {
      const { data: { session }, error: sErr } = await sbClient.auth.getSession();
      if(sErr || !session || !session.user){
        // إذا لم توجد جلسة نشطة، تفريغ كاش المستخدم
        localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.USER);
        return null;
      }
      const authUser = session.user;
      const { data: profile, error: pErr } = await sbClient.from('users').select('*').eq('id', authUser.id).single();
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
      const key = uid ? `mg_coptic_claimed_chests_${uid}` : 'mg_coptic_claimed_chests';
      const raw = localStorage.getItem(key) || localStorage.getItem('mg_coptic_claimed_chests');
      const list = raw ? JSON.parse(raw) : [];
      return list.includes(String(chestId));
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

  // فتح صندوق الكنز وحفظه سحابياً في Supabase لحساب المستخدم مع دعم الجوائز والشارات
  async claimChest(userId, chestId, xpReward = 30, heartsReward = 1, badgeReward = null){
    try {
      const uid = userId || this.getCurrentUser()?.id;
      const key = uid ? `mg_coptic_claimed_chests_${uid}` : 'mg_coptic_claimed_chests';
      const raw = localStorage.getItem(key) || localStorage.getItem('mg_coptic_claimed_chests');
      let list = raw ? JSON.parse(raw) : [];
      if(!list.includes(String(chestId))){
        list.push(String(chestId));
        if(uid) localStorage.setItem(key, JSON.stringify(list));
        localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(list));
      }

      if(sbClient && uid){
        try {
          await sbClient.from('user_progress').update({ claimed_chests: list }).eq('user_id', uid);
        } catch(err){
          console.warn('Supabase claimChest update warning:', err);
        }
      }

      // حفظ الشارة إن وُجدت
      if(badgeReward && (badgeReward.title || badgeReward.badge_title)){
        try {
          const bTitle = badgeReward.title || badgeReward.badge_title;
          const bIcon = badgeReward.icon || badgeReward.badge_icon || '🏆';
          const bDesc = badgeReward.description || badgeReward.badge_desc || '';
          const badgeKey = uid ? `mg_coptic_badges_${uid}` : 'mg_coptic_badges';
          const rawBadges = localStorage.getItem(badgeKey) || localStorage.getItem('mg_coptic_badges') || '[]';
          let badgesList = JSON.parse(rawBadges);
          const alreadyHas = badgesList.some(b => (b.id === badgeReward.id || b.title === bTitle));
          if(!alreadyHas){
            badgesList.push({
              id: badgeReward.id || `badge_${Date.now()}`,
              title: bTitle,
              icon: bIcon,
              description: bDesc,
              unlocked_at: new Date().toISOString()
            });
            if(uid) localStorage.setItem(badgeKey, JSON.stringify(badgesList));
            localStorage.setItem('mg_coptic_badges', JSON.stringify(badgesList));
          }
        } catch(bErr){
          console.warn('Saving chest badge error:', bErr);
        }
      }

      await this.updateProgress(uid, { addPoints: xpReward, addHearts: heartsReward });
      this.sound.playChestReward();
      return true;
    } catch(e){
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

  // تسجيل الخروج ومسح بيانات الجلسة السابقة
  async signOut(){
    if(sbClient){
      try {
        await sbClient.auth.signOut();
      } catch(e){}
    }
    try {
      const cur = this.getCurrentUser();
      const uid = cur?.id;
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.USER);
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.PROGRESS);
      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      localStorage.removeItem('mg_coptic_student_auth_token');
      localStorage.removeItem('mg_coptic_claimed_chests');
      if(uid){
        localStorage.removeItem(`mg_coptic_progress_${uid}`);
        localStorage.removeItem(`mg_coptic_lesson_progress_${uid}`);
        localStorage.removeItem(`mg_coptic_claimed_chests_${uid}`);
        localStorage.removeItem(`mg_coptic_user_${uid}`);
      }
    } catch(e){}
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
      return progress;
    }

    if(sbClient && uid){
      try {
        const { data, error } = await sbClient.from('user_progress').select('*').eq('user_id', uid).maybeSingle();
        if(!error && data){
          progress = {
            user_id: uid,
            hearts: data.hearts ?? 5,
            points: data.points ?? 0,
            total_points: data.points ?? 0,
            streak_days: data.streak_days ?? 1,
            last_active_date: data.last_active_date || new Date().toISOString().split('T')[0],
            claimed_chests: data.claimed_chests || []
          };
          if(Array.isArray(data.claimed_chests)){
            localStorage.setItem(`mg_coptic_claimed_chests_${uid}`, JSON.stringify(data.claimed_chests));
            localStorage.setItem('mg_coptic_claimed_chests', JSON.stringify(data.claimed_chests));
          }
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
          sbClient.from('user_progress').insert(initialProg).catch(()=>{});
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

  // خصم قلب عند الإجابة الخاطئة
  async loseHeart(userId){
    let prog = await this.getProgress(userId);
    prog.hearts = Math.max(0, (prog.hearts || 5) - 1);
    this.saveProgressLocal(prog);

    if(sbClient && userId){
      sbClient.from('user_progress').update({ hearts: prog.hearts }).eq('user_id', userId).then(()=>{}).catch(()=>{});
    }
    return prog;
  }

  // إعادة ملء القلوب إلى 5
  // شراء قلوب بنقاط الـ XP (القلب = 15 XP)
  async buyHeartsWithXp(userId, count = 1, costPerHeart = 15){
    let prog = await this.getProgress(userId);
    const totalCost = count * costPerHeart;
    const currentPoints = prog.points || 0;
    if(currentPoints < totalCost){
      return { success: false, reason: 'insufficient_xp', required: totalCost, current: currentPoints };
    }
    prog.points = Math.max(0, currentPoints - totalCost);
    prog.hearts = Math.max(0, Math.min(5, (prog.hearts || 0) + count));
    this.saveProgressLocal(prog);
    if(sbClient && userId){
      try {
        await sbClient.from('user_progress').update({ points: prog.points, hearts: prog.hearts }).eq('user_id', userId);
      } catch(e){}
    }
    return { success: true, prog };
  }

  async refillHearts(userId){
    let prog = await this.getProgress(userId);
    prog.hearts = 5;
    this.saveProgressLocal(prog);
    if(sbClient && userId){
      try {
        await sbClient.from('user_progress').update({ hearts: 5 }).eq('user_id', userId);
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
      if(cached) cachedCurriculum = JSON.parse(cached);
    } catch(e){}

    // إذا كان المنهج محفوظاً محلياً ولم يُطلب الجلب الإجباري، نرجعه فوراً (0 ميلي ثانية)
    if(cachedCurriculum && cachedCurriculum.units && cachedCurriculum.units.length > 0 && !forceRemote){
      return cachedCurriculum;
    }

    if(sbClient){
      try {
        const { data: levelsData, error: lvlErr } = await sbClient.from('levels').select('*').order('order_index');
        const { data: unitsData, error: uErr } = await sbClient.from('units').select('*').order('order_index');

        if(!uErr && unitsData && unitsData.length > 0){
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
      const raw = localStorage.getItem(userLpKey) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    if(map && Object.keys(map).length > 0 && !forceRemote){
      return map;
    }

    if(sbClient && uid){
      try {
        const { data, error } = await sbClient.from('user_lesson_progress').select('*').eq('user_id', uid);
        if(!error && data && data.length > 0){
          data.forEach(row => {
            map[String(row.lesson_id)] = {
              status: row.status,
              score: row.score || 0
            };
          });
          localStorage.setItem(userLpKey, JSON.stringify(map));
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
  async completeLesson(userId, lessonId, score = 100, nextLessonId = null, xpReward = 20){
    const uid = userId || this.getCurrentUser()?.id;
    const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS;
    let map = {};
    try {
      const raw = localStorage.getItem(userLpKey) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    const wasAlreadyCompleted = map[String(lessonId)] && map[String(lessonId)].status === 'completed';
    map[String(lessonId)] = { status: 'completed', score: score };

    if(nextLessonId){
      if(!map[String(nextLessonId)] || map[String(nextLessonId)].status === 'locked'){
        map[String(nextLessonId)] = { status: 'in_progress', score: 0 };
      }
    }

    try {
      localStorage.setItem(userLpKey, JSON.stringify(map));
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(map));
    } catch(e){}

    const effectiveXpReward = wasAlreadyCompleted ? 0 : (parseInt(xpReward, 10) || 0);
    if(effectiveXpReward > 0 && uid){
      const curProg = this.getProgressLocal(uid) || { user_id: uid, points: 0, total_points: 0 };
      curProg.points = (curProg.points || 0) + effectiveXpReward;
      curProg.total_points = (curProg.total_points || 0) + effectiveXpReward;
      this.saveProgressLocal(curProg, uid);
      this.recordTodayEarnedXP(uid, effectiveXpReward);
    }

    // مزامنة سحابية غير معطلة في الخلفية وبشكل متوازٍ لمنع أي تعليق
    // ملاحظة: المحطات الافتراضية (_p, _c) تُحفظ محلياً فقط لأن عمود lesson_id في قاعدة البيانات من نوع integer
    const isVirtualStation = /_(p|c)$/.test(String(lessonId));
    if(sbClient && uid && !isVirtualStation){
      (async () => {
        try {
          const promises = [
            sbClient.from('user_lesson_progress').upsert({
              user_id: uid,
              lesson_id: parseInt(lessonId, 10),
              status: 'completed',
              score: parseInt(score, 10) || 100,
              updated_at: new Date().toISOString()
            })
          ];
          if(nextLessonId && !/_(p|c)$/.test(String(nextLessonId))){
            promises.push(
              sbClient.from('user_lesson_progress').upsert({
                user_id: uid,
                lesson_id: parseInt(nextLessonId, 10),
                status: 'in_progress',
                score: 0,
                updated_at: new Date().toISOString()
              })
            );
          }
          if(effectiveXpReward > 0){
            promises.push(
              sbClient.from('user_progress').upsert({
                user_id: uid,
                points: (this.getProgressLocal(uid)?.points || 0),
                last_active_date: new Date().toISOString().split('T')[0]
              })
            );
          }
          await Promise.all(promises);
        } catch(err){
          console.warn('completeLesson cloud sync error:', err);
        }
      })();
    }

    return map;
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
