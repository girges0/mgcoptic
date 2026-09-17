const fs = require('fs');
const path = require('path');

// =========================================================================
// MG COPTIC — Full Level 2 Generator (8 Units, 42 Lessons, 252 Challenges)
// 100% Accurate according to Holy Synod Coptic Curriculum (2014)
// =========================================================================

const level2 = {
  id: 6,
  title: "المستوى الثاني: قواعد القراءة ونطق الكلمات",
  description: "أتقن قواعد القراءة والنطق الشرطي والمقاطع الصوتية لتتمكن من قراءة جميع الكلمات والنصوص القبطية بطلاقة تامة.",
  order_index: 2
};

// --- UNIT 1 ---
const unit1 = {
  id: 51,
  level_id: 6,
  title: "الوحدة ١: هندسة الحركات ومقاييس زمن النطق",
  badge: "Ⲁ-Ⲱ",
  description: "إتقان مخارج وأزمنة الحروف المتحركة السبعة والتمييز السمعي والبصري بين الحركات المتشابهة.",
  order_index: 1,
  lessons: [
    {
      id: 201, title: "حركة الفتح وحرف الألفا (Ⲁ ⲁ)", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة حركة الفتح وحرف الألفا (Ⲁ ⲁ)", coptic_display: "Ⲁ ⲁ", audio_text: "ألفا", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• اسم الحرف: ألفا (Ⲁ ⲁ)\n• النطق: ألف مفتوحة دائماً (مثل A في lamp).\n• شواهد من المجمع المقدس:\n  - ⲣⲁⲛ (ران) = اسم\n  - ⲁⲛⲟⲕ (آنوك) = أنا\n  - ⲥⲁ (سا) = ناحية / جهة", explanation: "حرف الألفا حركة فتح صريحة ومستقلة." },
        { type: "read_select", question: "كيف تنطق كلمة «ⲣⲁⲛ» (اسم) بالقبطية؟", coptic_display: "ⲣⲁⲛ", audio_text: "ران", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ران (بألف مفتوحة صريحة)", is_correct: true }, { text: "رون (بواو)", is_correct: false }, { text: "رين (بياء)", is_correct: false }], explanation: "حرف الألفا يفتح الحرف السابق: ران." },
        { type: "select", question: "ما معنى كلمة «ⲁⲛⲟⲕ» بالقبطية؟", coptic_display: "ⲁⲛⲟⲕ", audio_text: "آنوك", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "أنا", is_correct: true }, { text: "أنت", is_correct: false }, { text: "هو", is_correct: false }], explanation: "ⲁⲛⲟⲕ تعني أنا." },
        { type: "write", question: "رتّب حروف كلمة 'اسم' بالقبطية (ران):", coptic_display: "ⲣⲁⲛ", audio_text: "ران", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲣ", "ⲁ", "ⲛ"], correct_word: "ⲣⲁⲛ", explanation: "ⲣⲁⲛ = اسم." },
        { type: "read_select", question: "هل يتغير نطق حرف الألفا (Ⲁ) بتغير موضعه؟", coptic_display: "Ⲁ", audio_text: "ألفا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "لا، يُنطق دائماً ألفاً مفتوحة", is_correct: true }, { text: "نعم، يتغير نطقه", is_correct: false }], explanation: "الألفا حركة فتح ثابتة." },
        { type: "read_select", question: "كلمة «ⲥⲁ» (ناحية) تتكون من مقطع صوتي يُنطق:", coptic_display: "ⲥⲁ", audio_text: "سا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "سا", is_correct: true }, { text: "سو", is_correct: false }, { text: "سي", is_correct: false }], explanation: "سيما + ألفا = سا." }
      ]
    },
    {
      id: 202, title: "عائلة حروف الكسر الثلاثية (Ⲉ ، Ⲏ ، Ⲓ)", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة التمييز بين درجات الكسر الثلاث", coptic_display: "Ⲉ ، Ⲏ ، Ⲓ", audio_text: "إي وإيتا ويوطا", audio_url: "audio_coptic/8ei.mp3", correct_word: "• Ⲉ (إي): كسرة خفيفة خطافة (مثل e في help).\n  - مثال: ⲛⲉⲙ (نِم) = مع\n• Ⲏ (إيتا): ياء مكسورة بمد طويل ممتد (مثل ee في feet).\n  - مثال: ⲙⲏⲧ (ميت) = عشرة (10)\n• Ⲓ (يوطا): ياء قصيرة صريحة (مثل i في drink).\n  - مثال: ⲕⲓⲙ (كيم) = يتحرك / حركة", explanation: "درجات الكسر الثلاث المعتمدة." },
        { type: "read_select", question: "أي من الحروف التالية يمثل 'الياء المكسورة بمد طويل'؟", coptic_display: "Ⲏ", audio_text: "إيتا", audio_url: "audio_coptic/8ei.mp3", options: [{ text: "حرف الإيتا (Ⲏ)", is_correct: true }, { text: "حرف الإي (Ⲉ)", is_correct: false }, { text: "حرف اليوطا (Ⲓ)", is_correct: false }], explanation: "الإيتا (Ⲏ) هي حرف المد الطويل للياء." },
        { type: "select", question: "ما معنى كلمة «ⲛⲉⲙ» بالقبطية؟", coptic_display: "ⲛⲉⲙ", audio_text: "نِم", audio_url: "audio_coptic/8ei.mp3", options: [{ text: "مع (حرف عطف)", is_correct: true }, { text: "في", is_correct: false }, { text: "إلى", is_correct: false }], explanation: "ⲛⲉⲙ = مع." },
        { type: "match", question: "طابق كل حرف بدرجة كسره الصوتية:", pairs: [{ left: "Ⲉ", right: "كسرة خفيفة خطافة" }, { left: "Ⲏ", right: "ياء مكسورة بمد طويل" }, { left: "Ⲓ", right: "ياء قصيرة صريحة" }], explanation: "درجات الكسر الثلاث." },
        { type: "write", question: "ركّب كلمة 'عشرة' بالقبطية (ميت):", coptic_display: "ⲙⲏⲧ", audio_text: "ميت", audio_url: "audio_coptic/8ei.mp3", tiles: ["ⲙ", "ⲏ", "ⲧ"], correct_word: "ⲙⲏⲧ", explanation: "ⲙⲏⲧ = عشرة (10)." },
        { type: "read_select", question: "كلمة «ⲕⲓⲙ» (يتحرك) تنطق بياء:", coptic_display: "ⲕⲓⲙ", audio_text: "كيم", audio_url: "audio_coptic/8ei.mp3", options: [{ text: "قصيرة صريحة (كيم)", is_correct: true }, { text: "ممدودة طويلاً", is_correct: false }, { text: "واو مضمومة", is_correct: false }], explanation: "اليوطا ياء قصيرة صريحة." }
      ]
    },
    {
      id: 203, title: "عائلة حروف الضم ومقاييس الواوات (Ⲟ ، Ⲱ ، ⲞⲨ)", xp: 8,
      challenges: [
        { type: "text_view", question: "مقاييس أصوات الواو في اللغة القبطية", coptic_display: "Ⲟ ، Ⲱ ، ⲞⲨ", audio_text: "أو وأوميجا وأو مضمومة", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• Ⲟ: واو قصيرة خطافة (مثل o في stop / مُعلم). مثال: ⲥⲟⲡ (سوب) = مرة\n• Ⲱ: واو طويلة مفتوحة مفخمة (مثل hope / يوم). مثال: ⲱⲛϧ (أونخ) = حياة\n• ⲞⲨ: واو طويلة مضمومة بشفتين مقفلتين (مثل oo في soon / فول). مثال: ⲁ̀ⲗⲟⲩ (آلو) = صبي", explanation: "مقاييس أصوات الواوات الثلاثة." },
        { type: "read_select", question: "كلمة «ⲥⲟⲡ» (مرة) تُنطق بواو:", coptic_display: "ⲥⲟⲡ", audio_text: "سوب", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "قصيرة خطافة (سوب)", is_correct: true }, { text: "طويلة مفخمة", is_correct: false }, { text: "مكسورة", is_correct: false }], explanation: "حرف Ⲟ واو قصيرة دائماً." },
        { type: "select", question: "ما معنى كلمة «ⲱⲛϧ» بالقبطية؟", coptic_display: "ⲱⲛϧ", audio_text: "أونخ", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يعيش / حياة", is_correct: true }, { text: "يموت", is_correct: false }, { text: "يأكل", is_correct: false }], explanation: "ⲱⲛϧ = حياة / يعيش." },
        { type: "write", question: "ركّب كلمة 'صبي' بالقبطية (آلو):", coptic_display: "ⲁ̀ⲗⲟⲩ", audio_text: "آلو", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲁ̀", "ⲗ", "ⲟⲩ"], correct_word: "ⲁ̀ⲗⲟⲩ", explanation: "ⲁ̀ⲗⲟⲩ = صبي." },
        { type: "read_select", question: "ما الفرق في النطق بين «ⲥⲟⲡ» و «ⲥⲱⲡ»؟", coptic_display: "ⲥⲟⲡ / ⲥⲱⲡ", audio_text: "سوب وسووب", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "الأولى بواو قصيرة خطافة والثانية بواو طويلة مفتوحة", is_correct: true }, { text: "كلاهما متطابقان", is_correct: false }], explanation: "الفارق بين Ⲟ و Ⲱ هو زمن النطق والتفخيم." },
        { type: "read_select", question: "التركيب «ⲞⲨ» في كلمة «ⲛⲟⲩϯ» (الله) يُنطق:", coptic_display: "ⲛⲟⲩϯ", audio_text: "نوتي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "واو طويلة مضمومة كحرف المد في 'فول'", is_correct: true }, { text: "واو قصيرة", is_correct: false }], explanation: "ⲞⲨ واو طويلة مضمومة (OO)." }
      ]
    },
    {
      id: 204, title: "الأصوات المركبة الخاصة (ⲁⲩ ، ⲉⲩ ، ⲏⲩ)", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة تحول الإبسلون بعد حروف الفتح والكسر إلى (ڤ)", coptic_display: "ⲁⲩ ، ⲉⲩ ، ⲏⲩ", audio_text: "آڤ وإيڤ", audio_url: "audio_coptic/2vo.mp3", correct_word: "• القاعدة الذهبية: إذا جاء حرف الإبسلون (Ⲩ) مسبوقاً بحرف فتح (Ⲁ) أو كسر (Ⲉ أو Ⲏ)، فإنه يُنطق صوتاً صامتاً شفتانياً: (ڤ - V):\n  - ⲁⲩ ⬅ (آڤ) مثل: ⲥⲧⲁⲩⲣⲟⲥ (إستافروس) = صليب\n  - ⲉⲩ ⬅ (إيڤ) مثل: ⲉⲩⲭⲏ (إيڤكي) = صلاة\n  - ⲏⲩ ⬅ (إيـ-ڤ ممدودة) مثل: ⲛⲏⲩ (نيڤ) = آتٍ / قادم", explanation: "الإبسلون بعد Ⲁ أو Ⲉ أو Ⲏ ينطق (ڤ)." },
        { type: "read_select", question: "كيف يُنطق المقطع «ⲁⲩ» في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)؟", coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ", audio_text: "إستافروس", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "آڤ (صوت ڤ)", is_correct: true }, { text: "أوو (واو مضمومة)", is_correct: false }, { text: "آي (ياء)", is_correct: false }], explanation: "Ⲁ + Ⲩ = آڤ." },
        { type: "select", question: "ما معنى كلمة «ⲉⲩⲭⲏ» في التراث الكنسي؟", coptic_display: "ⲉⲩⲭⲏ", audio_text: "إيڤكي", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "صلاة / طلبة", is_correct: true }, { text: "صوم", is_correct: false }, { text: "قربان", is_correct: false }], explanation: "ⲉⲩⲭⲏ = صلاة." },
        { type: "write", question: "ركّب كلمة 'صليب' بالقبطية:", coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ", audio_text: "إستافروس", audio_url: "audio_coptic/2vo.mp3", tiles: ["ⲥ", "ⲧ", "ⲁ", "ⲩ", "ⲣ", "ⲟ", "ⲥ"], correct_word: "ⲥⲧⲁⲩⲣⲟⲥ", explanation: "ⲥⲧⲁⲩⲣⲟⲥ = صليب." },
        { type: "read_select", question: "كلمة «ⲛⲏⲩ» (آتٍ) تُنطق:", coptic_display: "ⲛⲏⲩ", audio_text: "نيڤ", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "نيڤ (بياء ممدودة بعدها ڤ)", is_correct: true }, { text: "نيو", is_correct: false }], explanation: "Ⲏ + Ⲩ = نيڤ." },
        { type: "read_select", question: "في كلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ» (إنجيل)، المقطع الأول «ⲉⲩ» ينطق:", coptic_display: "ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ", audio_text: "إيڤانغيليون", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "إيڤ", is_correct: true }, { text: "أوو", is_correct: false }], explanation: "Ⲉ + Ⲩ = إيڤ." }
      ]
    },
    {
      id: 205, title: "مختبر المقارنة والتمييز السمعي للوحدة الأولى", xp: 12,
      challenges: [
        { type: "read_select", question: "ميز بين «ⲙⲉⲧ» و «ⲙⲏⲧ»: الثانية بياء ممدودة وتعني:", coptic_display: "ⲙⲏⲧ", audio_text: "ميت", audio_url: "audio_coptic/8ei.mp3", options: [{ text: "رقم عشرة (10)", is_correct: true }, { text: "رقم خمسة", is_correct: false }, { text: "خبز", is_correct: false }], explanation: "ⲙⲏⲧ = عشرة." },
        { type: "match", question: "طابق كل كلمة بنطقها الصحيح من حيث طول الحركة:", pairs: [{ left: "ⲥⲟⲡ", right: "سوب (واو قصيرة)" }, { left: "ⲥⲱⲡ", right: "سووب (واو طويلة مفتوحة)" }, { left: "ⲥⲟⲩ", right: "سو (واو مضمومة)" }], explanation: "مقارنة الواوات الثلاثة." },
        { type: "select", question: "أي من الكلمات التالية تشتمل على صوت (ڤ) صامت؟", coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ / ⲕⲓⲙ / ⲣⲁⲛ", audio_text: "إستافروس", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "ⲥⲧⲁⲩⲣⲟⲥ (صليب)", is_correct: true }, { text: "ⲕⲓⲙ (حركة)", is_correct: false }, { text: "ⲣⲁⲛ (اسم)", is_correct: false }], explanation: "لوجود التركيب ⲁⲩ." },
        { type: "write", question: "ركّب كلمة 'مع' بالقبطية:", coptic_display: "ⲛⲉⲙ", audio_text: "نِم", audio_url: "audio_coptic/8ei.mp3", tiles: ["ⲛ", "ⲉ", "ⲙ"], correct_word: "ⲛⲉⲙ", explanation: "ⲛⲉⲙ = مع." },
        { type: "read_select", question: "كم مقطعاً صوتياً في كلمة «ⲉⲙⲙⲁⲛⲟⲩⲏⲗ» (عمانوئيل)؟", coptic_display: "ⲉⲙ/ⲙⲁ/ⲛⲟⲩ/ⲏⲗ", audio_text: "إمّانوئيل", audio_url: "audio_coptic/8ei.mp3", options: [{ text: "4 مقاطع (إم / ما / نو / إيل)", is_correct: true }, { text: "مقطعان فقط", is_correct: false }], explanation: "4 مقاطع صوتية متناسقة." },
        { type: "read_select", question: "ما هو الحرف المتحرك الوحيد المخصص للفتح في القبطية؟", coptic_display: "Ⲁ", audio_text: "ألفا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "الألفا (Ⲁ)", is_correct: true }, { text: "الإي (Ⲉ)", is_correct: false }], explanation: "Ⲁ هو حركة الفتح الوحيدة." }
      ]
    }
  ]
};

// --- UNIT 2 ---
const unit2 = {
  id: 52,
  level_id: 6,
  title: "الوحدة ٢: علامة الجِنكِم (Ⲻ) وتكوين المقاطع المستقلة",
  badge: "Ⲻ-Djinkim",
  description: "فهم فلسفة التشكيل القبطي بالجنكم وكيفية صياغة المقاطع ومنع التقاء السواكن.",
  order_index: 2,
  lessons: [
    {
      id: 206, title: "الجنكم فوق الحروف الساكنة (صانع المقطع)", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة الجنكم فوق الحروف الساكنة", coptic_display: "ⲙ̀ ، ⲛ̀ ، ⲥ̀ ، ⲡ̀", audio_text: "جنكم ساكن", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• إذا وُضع الجنكم فوق حرف ساكن، يُنطق بمثابة همزة مكسورة خفيفة تسبق الحرف (إِ + الساكن)، فيجعله مقطعاً صوتياً مستقلاً بمفرده:\n  - ⲙ̀ ⬅ يُنطق (إِم) مثل: ⲙ̀/ⲫⲣⲏ (إمفري = مثل / كـ)\n  - ⲛ̀ ⬅ يُنطق (إِن) مثل: ⲛ̀/ⲧⲉ (إنتي = خاص بـ / لـ)\n  - ⲥ̀ ⬅ يُنطق (إِس) مثل: ⲥ̀/ⲙⲟⲩ (إسمو = بارك)\n  - ⲡ̀ ⬅ يُنطق (إِب) مثل: ⲡ̀/ϭⲟ/ⲓⲥ (إبشويس = الرب)", explanation: "الجنكم على الساكن يسبقه بهمزة مكسورة (إِ)." },
        { type: "read_select", question: "كيف يُنطق حرف السيما في أول كلمة «ⲥ̀ⲙⲟⲩ» (بارك)؟", coptic_display: "ⲥ̀ⲙⲟⲩ", audio_text: "إسمو", audio_url: "audio_coptic/6soohinrpmy.mp3", options: [{ text: "إِسـ (بهمزة مكسورة خفيفة قبل السين)", is_correct: true }, { text: "سا", is_correct: false }, { text: "سو", is_correct: false }], explanation: "الجنكم فوق الساكن ينطق كهمزة مكسورة: إِسـ." },
        { type: "select", question: "ما معنى كلمة «ⲡ̀ϭⲟⲓⲥ» الكنسية الشهيرة؟", coptic_display: "ⲡ̀ϭⲟⲓⲥ", audio_text: "إبشويس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "الرب / السيد", is_correct: true }, { text: "السماء", is_correct: false }, { text: "الملك", is_correct: false }], explanation: "ⲡ̀ϭⲟⲓⲥ = الرب." },
        { type: "write", question: "ركّب كلمة 'بارك' مقطعة بالقبطية (إسمو):", coptic_display: "ⲥ̀ⲙⲟⲩ", audio_text: "إسمو", audio_url: "audio_coptic/6soohinrpmy.mp3", tiles: ["ⲥ̀", "ⲙ", "ⲟⲩ"], correct_word: "ⲥ̀ⲙⲟⲩ", explanation: "ⲥ̀ⲙⲟⲩ = بارك." },
        { type: "read_select", question: "كم مقطعاً صوتياً في كلمة «ⲙ̀/ⲫⲣⲏ» (مثل)؟", coptic_display: "ⲙ̀/ⲫⲣⲏ", audio_text: "إمفري", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "مقطعان: (إم) و (فري)", is_correct: true }, { text: "مقطع واحد", is_correct: false }], explanation: "الجنكم صنع المقطع الأول المستقل (إم)." },
        { type: "read_select", question: "نطق حرف «ⲛ̀» في أول كلمة «ⲛ̀ⲧⲉ» هو:", coptic_display: "ⲛ̀ⲧⲉ", audio_text: "إنتي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "إِن", is_correct: true }, { text: "نا", is_correct: false }], explanation: "ⲛ̀ = إِن." }
      ]
    },
    {
      id: 207, title: "الجنكم فوق الحروف المتحركة (همزة القطع)", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة الجنكم فوق الحروف المتحركة", coptic_display: "ⲁ̀ ، ⲉ̀ ، ⲓ̀", audio_text: "جنكم متحرك", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• إذا وُضع الجنكم فوق حرف متحرك، ينطق الحرف نفسه بنبرة استقلال قاطعة كهمزة القطع:\n  - ⲁ̀ ⬅ (آ قاطعة) مثل: ⲁ̀/ⲗⲟⲩ (آ-لو = صبي)\n  - ⲉ̀ ⬅ (إي قاطعة) مثل: ⲉ̀/ⲃⲟⲗ (إي-فول = خارجاً / من)\n  - ⲓ̀ ⬅ (إي قاطعة) مثل: ⲓ̀ (إي = تعالَ)", explanation: "الجنكم على المتحرك يفيد استقلال نطقه كهمزة قطع." },
        { type: "read_select", question: "ما هو أثر الجنكم فوق حرف متحرك مثل «ⲉ̀» في «ⲉ̀ⲃⲟⲗ»؟", coptic_display: "ⲉ̀ⲃⲟⲗ", audio_text: "إيفول", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يفيد استقلال نطق الحرف كنبرة منفصلة قاطعة", is_correct: true }, { text: "يجعله صامتاً", is_correct: false }], explanation: "الجنكم يعطي استقلالاً للنطق." },
        { type: "select", question: "ما معنى كلمة «ⲉ̀ⲃⲟⲗ» بالقبطية؟", coptic_display: "ⲉ̀ⲃⲟⲗ", audio_text: "إيفول", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "خارجاً / من", is_correct: true }, { text: "داخلاً", is_correct: false }], explanation: "ⲉ̀ⲃⲟⲗ = خارجاً / من." },
        { type: "write", question: "ركّب كلمة 'خارجاً' بالقبطية:", coptic_display: "ⲉ̀ⲃⲟⲗ", audio_text: "إيفول", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲉ̀", "ⲃ", "ⲟ", "ⲗ"], correct_word: "ⲉ̀ⲃⲟⲗ", explanation: "ⲉ̀ⲃⲟⲗ = خارجاً." },
        { type: "read_select", question: "في عبارة «ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ» (أنعم لنا)، كيف يُنطق المقطع الأول «ⲁ̀»؟", coptic_display: "ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ", audio_text: "آري إهموت", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "آ (بنبرة همزة قطع صريحة)", is_correct: true }, { text: "إِ", is_correct: false }], explanation: "ⲁ̀ تلفظ آ مستقلة." },
        { type: "read_select", question: "ما الفرق في وظيفة الجنكم بين ساكن (ⲥ̀) ومتحرك (ⲉ̀)؟", options: [{ text: "على الساكن يسبقه بهمزة (إِسـ)، وعلى المتحرك ينطقه كهمزة مستقلة (إي)", is_correct: true }, { text: "كلاهما متطابقان", is_correct: false }], explanation: "الفرق الجوهري بين الساكن والمتحرك." }
      ]
    },
    {
      id: 208, title: "الجنكم المتتابع والكلمات متعددة المقاطع", xp: 8,
      challenges: [
        { type: "text_view", question: "تتابع علامات الجنكم في الكلمة الواحدة", coptic_display: "ⲛ̀ⲧ̀ⲫⲉ ، ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ", audio_text: "جنكم متتابع", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• عندما تتتابع حروف ساكنة تحمل علامة الجنكم، ينطق كل حرف كمقطع مستقل:\n  - ⲛ̀/ⲧ̀/ⲫⲉ ⬅ يُنطق (إن - إت - فيه = السماء)\n  - ⲙ̀/ⲡ̀/ϭⲟ/ⲓⲥ ⬅ يُنطق (إم - إب - شو - يس = للرب)\n  - ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ ⬅ يُنطق (إف - س - ما - رو - ؤوت = مبارك)", explanation: "تتابع علامات الجنكم في الكلمة الواحدة." },
        { type: "read_select", question: "كلمة «ⲛ̀ⲧ̀ⲫⲉ» (السماء) تتكون من كم مقطع صوتي؟", coptic_display: "ⲛ̀/ⲧ̀/ⲫⲉ", audio_text: "إن إت فيه", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "3 مقاطع: (إن) و (إت) و (فيه)", is_correct: true }, { text: "مقطعان فقط", is_correct: false }], explanation: "3 مقاطع صوتية مستقلة." },
        { type: "select", question: "ما معنى كلمة «ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» في التسابيح؟", coptic_display: "ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ", audio_text: "إفسماروؤوت", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "مبارك", is_correct: true }, { text: "قدوس", is_correct: false }], explanation: "ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ = مبارك." },
        { type: "write", question: "ركّب كلمة 'السماء' ذات الجنكم المزدوج:", coptic_display: "ⲛ̀ⲧ̀ⲫⲉ", audio_text: "إن إت فيه", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲛ̀", "ⲧ̀", "ⲫ", "ⲉ"], correct_word: "ⲛ̀ⲧ̀ⲫⲉ", explanation: "ⲛ̀ⲧ̀ⲫⲉ = السماء." },
        { type: "read_select", question: "المقطعان الأولان في «ⲙ̀ⲡ̀ϭⲟⲓⲥ» (للرب) ينطقان:", coptic_display: "ⲙ̀ⲡ̀ϭⲟⲓⲥ", audio_text: "إم إبشويس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "إم - إب", is_correct: true }, { text: "ما - با", is_correct: false }], explanation: "ⲙ̀ (إم) + ⲡ̀ (إب)." },
        { type: "read_select", question: "لماذا وُضع الجنكم في كلمة «ⲛ̀ⲧ̀ⲫⲉ»؟", options: [{ text: "لمنع التقاء السواكن وتسهيل النطق بمقاطع مستقلة", is_correct: true }, { text: "لأنه حرف علة", is_correct: false }], explanation: "الجنكم يمنع التقاء السواكن." }
      ]
    },
    {
      id: 209, title: "مراجعة وتحدي إتقان الجِنكِم", xp: 12,
      challenges: [
        { type: "match", question: "طابق الحرف بنطقه الفعلي عند وجود الجنكم:", pairs: [{ left: "ⲙ̀", right: "إِم" }, { left: "ⲡ̀", right: "إِب" }, { left: "ⲧ̀", right: "إِت" }, { left: "ϥ̀", right: "إِف" }], explanation: "نطق السواكن بالجنكم." },
        { type: "read_select", question: "في جملة «ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ»، كم علامة جنكم توجد؟", coptic_display: "ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ", audio_text: "إسمو إيبيكولوم", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "علامتان: الأولى فوق ⲥ̀ والثانية فوق ⲉ̀", is_correct: true }, { text: "علامة واحدة فقط", is_correct: false }], explanation: "علامتان واضحتان." },
        { type: "write", question: "ركّب كلمة 'الرب' مقطعة:", coptic_display: "ⲡ̀ϭⲟⲓⲥ", audio_text: "إبشويس", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲡ̀", "ϭ", "ⲟ", "ⲓ", "ⲥ"], correct_word: "ⲡ̀ϭⲟⲓⲥ", explanation: "ⲡ̀ϭⲟⲓⲥ = الرب." },
        { type: "select", question: "كلمة «ⲙ̀ⲛⲟⲩϯ» المقطع الأول منها ينطق:", coptic_display: "ⲙ̀ⲛⲟⲩϯ", audio_text: "إمنوتي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "إِم (مقطع مستقل)", is_correct: true }, { text: "مـا", is_correct: false }], explanation: "ⲙ̀/ⲛⲟⲩ/ϯ = إم - نو - تي." },
        { type: "read_select", question: "ما الفرق الصوتي بين «ⲡⲓ» و «ⲡ̀/ⲓ»؟", options: [{ text: "الأولى تُنطق (بي) مقطع واحد، والثانية (إِب - ي) مقطعين", is_correct: true }, { text: "لا فرق بينهما", is_correct: false }], explanation: "الجنكم يقسم المقطع." },
        { type: "read_select", question: "حرف «ⲭ̀» في كلمة «ⲭ̀ⲣⲱⲟⲩ» (شاطئ) يُنطق:", coptic_display: "ⲭ̀ⲣⲱⲟⲩ", audio_text: "إكروؤو", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "إِك", is_correct: true }, { text: "كا", is_correct: false }], explanation: "ⲭ̀ = إِك." }
      ]
    }
  ]
};

// --- UNIT 3 ---
const unit3 = {
  id: 53,
  level_id: 6,
  title: "الوحدة ٣: الحروف ذات النطق الشرطي المزدوج",
  badge: "Conditional-2",
  description: "فحص الحرف التالي بدقة لتحديد صوت الحرف الحالي (Ⲃ, Ⲇ, Ⲑ, Ϫ).",
  order_index: 3,
  lessons: [
    {
      id: 210, title: "حرف الفيتا (Ⲃ ⲃ) — بين 'ڤ' و 'ب'", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة نطق حرف الفيتا (Ⲃ ⲃ)", coptic_display: "Ⲃ ⲃ", audio_text: "فيتا", audio_url: "audio_coptic/2vo.mp3", correct_word: "• يُنطق (ڤ - V): إذا تلاه أي حرف متحرك (Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲩ, Ⲱ).\n  - أمثلة: ⲃⲁⲗ (ڤال = عين)، ⲃⲱⲕ (ڤوك = اذهب)، ⲉ̀ⲃⲟⲗ (إيڤول = خارجاً)\n• يُنطق (ب - B): إذا تلاه حرف ساكن أو جاء في نهاية الكلمة.\n  - أمثلة: ⲧⲱⲃ (توب = طوبة)، ⲛⲓⲃ (نيف = كل)، ⲁⲃⲃⲁ (أبّا = أب)", explanation: "الفيتا تنطق ڤ قبل المتحرك وب قبل الساكن وفي الآخر." },
        { type: "read_select", question: "كيف يُنطق حرف «Ⲃ» في كلمة «ⲃⲁⲗ» (عين)؟", coptic_display: "ⲃⲁⲗ", audio_text: "ڤال", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "ڤ (V) لمجيء حرف متحرك (Ⲁ) بعده", is_correct: true }, { text: "ب (B)", is_correct: false }], explanation: "متبوعة بحرف متحرك = ڤ." },
        { type: "read_select", question: "كيف يُنطق حرف «Ⲃ» في نهاية كلمة «ⲧⲱⲃ»؟", coptic_display: "ⲧⲱⲃ", audio_text: "توب", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "ب (B) لوقوعه في نهاية الكلمة", is_correct: true }, { text: "ڤ (V)", is_correct: false }], explanation: "في نهاية الكلمة ينطق ب." },
        { type: "select", question: "ما معنى كلمة «ⲃⲱⲕ» بالقبطية؟", coptic_display: "ⲃⲱⲕ", audio_text: "ڤوك", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "اذهب / انطلق", is_correct: true }, { text: "اجلس", is_correct: false }], explanation: "ⲃⲱⲕ = اذهب." },
        { type: "write", question: "ركّب كلمة 'عين' بالقبطية (ڤال):", coptic_display: "ⲃⲁⲗ", audio_text: "ڤال", audio_url: "audio_coptic/2vo.mp3", tiles: ["ⲃ", "ⲁ", "ⲗ"], correct_word: "ⲃⲁⲗ", explanation: "ⲃⲁⲗ = عين." },
        { type: "read_select", question: "في كلمة «ⲁⲃⲃⲁ» (أبّا)، نُطق حرف الفيتا (ب) لأن:", options: [{ text: "بعده حرف ساكن آخر", is_correct: true }, { text: "بعده حرف متحرك", is_correct: false }], explanation: "الفيتا متبوعة بساكن تنطق ب." }
      ]
    },
    {
      id: 211, title: "حرف الدلتا (Ⲇ ⲇ) — بين 'د' و 'ذ'", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة نطق حرف الدلتا (Ⲇ ⲇ)", coptic_display: "Ⲇ ⲇ", audio_text: "دلتا", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• يُنطق (د - D): في أسماء الأعلام والأشخاص والمدن والبلاد المقدسة.\n  - أمثلة: Ⲇⲁⲩⲓⲇ (داڤيد = داود الملك)، Ⲇⲁⲛⲓⲏⲗ (دانيال النبي)، Ⲓⲟⲣⲇⲁⲛⲏⲥ (يوردانيس = نهر الأردن)\n• يُنطق (ذ - DH): في باقي الكلمات العامة (ومعظمها يوناني الأصل).\n  - أمثلة: ⲇⲟⲝⲁ (ذوكصا = مجد)، ⲇⲓⲁⲕⲱⲛ (ذياكون = شماس)", explanation: "أسماء الأعلام (د)، والكلمات العامة (ذ)." },
        { type: "read_select", question: "يُنطق حرف «Ⲇ» في اسم «Ⲇⲁⲩⲓⲇ» بصوت:", coptic_display: "Ⲇⲁⲩⲓⲇ", audio_text: "داڤيد", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "د (D) لأنه اسم عَلَم", is_correct: true }, { text: "ذ (DH)", is_correct: false }], explanation: "اسم عَلَم = د." },
        { type: "read_select", question: "يُنطق حرف «Ⲇ» في كلمة «ⲇⲟⲝⲁ» (مجد) بصوت:", coptic_display: "ⲇⲟⲝⲁ", audio_text: "ذوكصا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ذ (DH) لأنها كلمة عامة وليست اسم عَلَم", is_correct: true }, { text: "د (D)", is_correct: false }], explanation: "كلمة عامة = ذ." },
        { type: "select", question: "كلمة «ⲇⲓⲁⲕⲱⲛ» تعني في الكنيسة:", coptic_display: "ⲇⲓⲁⲕⲱⲛ", audio_text: "ذياكون", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "شماس / خادم", is_correct: true }, { text: "كاهن", is_correct: false }], explanation: "ⲇⲓⲁⲕⲱⲛ = شماس." },
        { type: "write", question: "ركّب كلمة 'مجد' بالقبطية (ذوكصا):", coptic_display: "ⲇⲟⲝⲁ", audio_text: "ذوكصا", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲇ", "ⲟ", "ⲝ", "ⲁ"], correct_word: "ⲇⲟⲝⲁ", explanation: "ⲇⲟⲝⲁ = مجد." },
        { type: "read_select", question: "نهر الأردن «Ⲓⲟⲣⲇⲁⲛⲏⲥ» ينطق فيه الدلتا بصوت:", options: [{ text: "د (D) لأنه اسم مكان مقدّس (عَلَم)", is_correct: true }, { text: "ذ", is_correct: false }], explanation: "الأردن اسم علم = د." }
      ]
    },
    {
      id: 212, title: "حرف الثيتا (Ⲑ ⲑ) — بين 'ت' و 'ث'", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة نطق حرف الثيتا (Ⲑ ⲑ)", coptic_display: "Ⲑ ⲑ", audio_text: "ثيتا", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• يُنطق (ت - T): إذا سبقه مباشرة حرف السيما (Ⲥ) أو حرف الشاي (Ϣ).\n  - أمثلة: ⲙⲓⲥ/ⲑⲟⲥ (مستوس = أجرة)، ⲁⲥ/ⲑⲉ/ⲛⲏⲥ (أستينيس = ضعيف / مريض)\n• يُنطق (ث - TH): في جميع الحالات الأخرى.\n  - أمثلة: ⲑⲱⲛ (ثون = أين)، ⲑⲉⲟⲥ (ثيئوس = إله)، ⲡⲁⲣⲑⲉⲛⲟⲥ (بارثينوس = عذراء)", explanation: "ينطق ت بعد السيما أو الشاي، وث في باقي الحالات." },
        { type: "read_select", question: "في كلمة «ⲙⲓⲥⲑⲟⲥ» (أجرة)، يُنطق حرف «Ⲑ»:", coptic_display: "ⲙⲓⲥⲑⲟⲥ", audio_text: "مستوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ت (T) لأنه مسبوق بحرف السيما (Ⲥ)", is_correct: true }, { text: "ث (TH)", is_correct: false }], explanation: "بعد السيما ينطق ت." },
        { type: "read_select", question: "في كلمة «ⲑⲱⲛ» (أين)، يُنطق حرف «Ⲑ»:", coptic_display: "ⲑⲱⲛ", audio_text: "ثون", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ث (TH) لعدم وجود سيما أو شاي قبله", is_correct: true }, { text: "ت (T)", is_correct: false }], explanation: "في بداية الكلمة ينطق ث." },
        { type: "select", question: "معنى كلمة «ⲡⲁⲣⲑⲉⲛⲟⲥ» في التسابيح هو:", coptic_display: "ⲡⲁⲣⲑⲉⲛⲟⲥ", audio_text: "بارثينوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "العذراء", is_correct: true }, { text: "الملكة", is_correct: false }], explanation: "ⲡⲁⲣⲑⲉⲛⲟⲥ = العذراء." },
        { type: "write", question: "ركّب كلمة 'أين' بالقبطية (ثون):", coptic_display: "ⲑⲱⲛ", audio_text: "ثون", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲑ", "ⲱ", "ⲛ"], correct_word: "ⲑⲱⲛ", explanation: "ⲑⲱⲛ = أين." },
        { type: "read_select", question: "كلمة «ⲑⲉⲟⲥ» (إله) تنطق:", coptic_display: "ⲑⲉⲟⲥ", audio_text: "ثيئوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ثيئوس", is_correct: true }, { text: "تيئوس", is_correct: false }], explanation: "تنطق ثيئوس." }
      ]
    },
    {
      id: 213, title: "حرف الجانجا (Ϫ ϫ) — بين 'جيم معطشة' و 'جيم صلبة'", xp: 8,
      challenges: [
        { type: "text_view", question: "قاعدة نطق حرف الجانجا (Ϫ ϫ)", coptic_display: "Ϫ ϫ", audio_text: "جانجا", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• يُنطق (جيم معطشة - J): إذا تلاه حرف متحرك مائل للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  - أمثلة: ϫⲉ (جيه = لأن / قائلاً)، ϫⲓ (جي = خُذ)، ϫⲏϫ (جيج = رؤساء)\n• يُنطق (جيم مصرية صلبة غير معطشة - G): في باقي الحالات (قبل الفتح والضم والسواكن وفي آخر الكلمة).\n  - أمثلة: ϫⲁⲙⲟⲩⲗ (جامول = جمل)، ϫⲟⲙ (جوم = قوة)، ⲁϫⲡ (أجب = ساعة)", explanation: "جيم معطشة قبل الكسر، وجيم صلبة في غير ذلك." },
        { type: "read_select", question: "يُنطق حرف «Ϫ» في كلمة «ϫⲉ» (لأن):", coptic_display: "ϫⲉ", audio_text: "جيه", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "جيم معطشة (J) لمجيء حرف كسر (Ⲉ) بعده", is_correct: true }, { text: "جيم صلبة (G)", is_correct: false }], explanation: "متبوعة بكسر = جيم معطشة." },
        { type: "read_select", question: "يُنطق حرف «Ϫ» في كلمة «ϫⲁⲙⲟⲩⲗ» (جمل):", coptic_display: "ϫⲁⲙⲟⲩⲗ", audio_text: "جامول", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "جيم قاهرية صلبة (G) لعدم وجود كسر بعده", is_correct: true }, { text: "جيم معطشة", is_correct: false }], explanation: "متبوعة بألفا (فتح) = جيم صلبة." },
        { type: "select", question: "كلمة «ϫⲟⲙ» تعني بالقبطية:", coptic_display: "ϫⲟⲙ", audio_text: "جوم", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "قوة", is_correct: true }, { text: "ضعف", is_correct: false }], explanation: "ϫⲟⲙ = قوة." },
        { type: "write", question: "ركّب كلمة 'جمل' بالقبطية (جامول):", coptic_display: "ϫⲁⲙⲟⲩⲗ", audio_text: "جامول", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϫ", "ⲁ", "ⲙ", "ⲟⲩ", "ⲗ"], correct_word: "ϫⲁⲙⲟⲩⲗ", explanation: "ϫⲁⲙⲟⲩⲗ = جمل." },
        { type: "read_select", question: "في كلمة «ⲁϫⲡ» (ساعة)، يُنطق حرف الجانجا:", options: [{ text: "جيم صلبة (أجب) لأنه متبوع بحرف ساكن (Ⲡ)", is_correct: true }, { text: "جيم معطشة", is_correct: false }], explanation: "متبوعة بساكن = جيم صلبة." }
      ]
    },
    {
      id: 214, title: "مراجعة وتحدي الحروف الثنائية النطق", xp: 12,
      challenges: [
        { type: "match", question: "طابق الحرف بشرط نطقه المحدد بدقة:", pairs: [{ left: "Ⲃ", right: "ڤ قبل المتحرك وب في غير ذلك" }, { left: "Ⲇ", right: "د في أسماء الأعلام وذ في العام" }, { left: "Ⲑ", right: "ت بعد س وش وث في غير ذلك" }, { left: "Ϫ", right: "جيم معطشة قبل الكسر وصلبة في غيره" }], explanation: "ملخص القواعد الثنائية الأربع." },
        { type: "read_select", question: "أي كلمة مما يلي تحتوي جيماً معطشة صريحة؟", coptic_display: "ϫⲉ / ϫⲟⲙ / ϫⲁⲙⲟⲩⲗ", audio_text: "جيه", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ϫⲉ (جيه)", is_correct: true }, { text: "ϫⲟⲙ (جوم)", is_correct: false }, { text: "ϫⲁⲙⲟⲩⲗ (جامول)", is_correct: false }], explanation: "ϫⲉ متبوعة بكسر." },
        { type: "write", question: "ركّب اسم 'داود' بالقبطية (داڤيد):", coptic_display: "Ⲇⲁⲩⲓⲇ", audio_text: "داڤيد", audio_url: "audio_coptic/1alfa.mp3", tiles: ["Ⲇ", "ⲁ", "ⲩ", "ⲓ", "ⲇ"], correct_word: "Ⲇⲁⲩⲓⲇ", explanation: "Ⲇⲁⲩⲓⲇ = داود." },
        { type: "read_select", question: "كلمة «ⲁⲥⲑⲉⲛⲏⲥ» (مريض) نطق حرف الثيتا فيها هو:", options: [{ text: "ت (أستينيس)", is_correct: true }, { text: "ث", is_correct: false }], explanation: "سبقها حرف سيما." },
        { type: "select", question: "في جملة «ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ Ⲇⲁⲩⲓⲇ»، نطق الفيتا والدلتا هو:", options: [{ text: "ڤ (في إيڤول) و د (في داڤيد)", is_correct: true }, { text: "ب و ذ", is_correct: false }], explanation: "ڤ لتلوها بمتحرك ود لأنه اسم علم." },
        { type: "read_select", question: "هل الجانجا حرف مصري ديموطيقي أم يوناني؟", options: [{ text: "حرف مصري ديموطيقي أصيل", is_correct: true }, { text: "حرف يوناني", is_correct: false }], explanation: "الجانجا من الحروف الديموطيقية الـ 7." }
      ]
    }
  ]
};

// --- UNIT 4 ---
const unit4 = {
  id: 54,
  level_id: 6,
  title: "الوحدة ٤: الحروف الثلاثية النطق والشروط المتشابكة",
  badge: "Conditional-3",
  description: "فك شفرات الحروف الثلاثية النطق بتطبيق الشروط المتسلسلة (Ⲅ, Ⲩ, Ⲭ).",
  order_index: 4,
  lessons: [
    {
      id: 215, title: "حرف الغمّا (Ⲅ ⲅ) — بين 'ج' و 'ن' و 'غ'", xp: 9,
      challenges: [
        { type: "text_view", question: "قاعدة حرف الغمّا (Ⲅ ⲅ) الثلاثية", coptic_display: "Ⲅ ⲅ", audio_text: "غمّا", audio_url: "audio_coptic/3ghala.mp3", correct_word: "• يُنطق (جيم معطشة - G): إذا جاء بعده حرف متحرك مائل للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  - أمثلة: ⲁⲅⲓⲟⲥ (آجيوس = قدوس)، ⲅⲏ (جي = أرض)\n• يُنطق (نون أنفية حلقية - N): إذا جاء بعده حرف حلقي آخر (Ⲅ, Ⲕ, Ⲝ, Ⲭ).\n  - أمثلة: ⲁⲅⲅⲉⲗⲟⲥ (أنغيلوس = ملاك)، ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ (إيڤانغيليون = إنجيل)\n• يُنطق (غين - GH): في باقي الحالات الأخرى.\n  - أمثلة: ⲅⲣⲁⲫⲏ (غرافيه = كتابة)، ⲗⲟⲅⲟⲥ (لوغوس = كلمة)", explanation: "الغمّا: كسر ⬅ جيم | حلقي ⬅ نون | غير ذلك ⬅ غين." },
        { type: "read_select", question: "في كلمة «ⲁⲅⲓⲟⲥ» (قدوس)، يُنطق حرف الغمّا:", coptic_display: "ⲁⲅⲓⲟⲥ", audio_text: "آجيوس", audio_url: "audio_coptic/3ghala.mp3", options: [{ text: "جيم معطشة (G) لوجود حرف كسر (Ⲓ) بعده", is_correct: true }, { text: "نون (N)", is_correct: false }, { text: "غين (GH)", is_correct: false }], explanation: "متبوع بكسر = جيم معطشة." },
        { type: "read_select", question: "في كلمة «ⲁⲅⲅⲉⲗⲟⲥ» (ملاك)، حرف الغمّا الأول يُنطق:", coptic_display: "ⲁⲅⲅⲉⲗⲟⲥ", audio_text: "أنغيلوس", audio_url: "audio_coptic/3ghala.mp3", options: [{ text: "نون أنفية (N) لمجيء غمّا حلقية بعده", is_correct: true }, { text: "جيم", is_correct: false }, { text: "غين", is_correct: false }], explanation: "متبوع بحرف حلقي = نون." },
        { type: "select", question: "ما معنى كلمة «ⲁⲅⲅⲉⲗⲟⲥ» الكنسية؟", coptic_display: "ⲁⲅⲅⲉⲗⲟⲥ", audio_text: "أنغيلوس", audio_url: "audio_coptic/3ghala.mp3", options: [{ text: "ملاك", is_correct: true }, { text: "رسول", is_correct: false }, { text: "شهيد", is_correct: false }], explanation: "ⲁⲅⲅⲉⲗⲟⲥ = ملاك." },
        { type: "write", question: "ركّب كلمة 'قدوس' بالقبطية (آجيوس):", coptic_display: "ⲁⲅⲓⲟⲥ", audio_text: "آجيوس", audio_url: "audio_coptic/3ghala.mp3", tiles: ["ⲁ", "ⲅ", "ⲓ", "ⲟ", "ⲥ"], correct_word: "ⲁⲅⲓⲟⲥ", explanation: "ⲁⲅⲓⲟⲥ = قدوس." },
        { type: "read_select", question: "كلمة «ⲅⲣⲁⲫⲏ» (كتابة) يُنطق الغمّا فيها بصوت:", options: [{ text: "غين (غرافيه) لأنه متبوع بحرف ساكن (Ⲣ)", is_correct: true }, { text: "جيم", is_correct: false }], explanation: "ليس بعده كسر ولا حلقي = غين." }
      ]
    },
    {
      id: 216, title: "حرف الإبسلون (Ⲩ ⲩ) — بين 'ڤ' و 'أو' و 'ي'", xp: 9,
      challenges: [
        { type: "text_view", question: "قاعدة حرف الإبسلون (Ⲩ ⲩ) الثلاثية", coptic_display: "Ⲩ ⲩ", audio_text: "إبسلون", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• يُنطق (ڤ - V): إذا سبقه حرف Ⲁ أو Ⲉ.\n  - أمثلة: ⲥⲧⲁⲩⲣⲟⲥ (إستافروس = صليب)، ⲉⲩⲭⲏ (إيڤكي = صلاة)\n• يُنطق (واو طويلة مضمومة - OO): إذا سبقه حرف Ⲟ (التركيب ⲞⲨ).\n  - أمثلة: ⲟⲩϫⲁⲓ (أوجاي = سلامة)، ⲛⲟⲩϯ (نوتي = إله)\n• يُنطق (ياء قصيرة - I): إذا جاء منفرداً دون أن يسبقه Ⲁ, Ⲉ, Ⲟ.\n  - أمثلة: ⲯⲩⲭⲏ (بسيشي = نفس)، ϩⲩⲙⲛⲟⲥ (هيمنوس = ترنيمة)", explanation: "الإبسلون: بعد Ⲁ, Ⲉ ⬅ ڤ | بعد Ⲟ ⬅ واو مضمومة | منفرد ⬅ ياء." },
        { type: "read_select", question: "في كلمة «ⲛⲟⲩϯ» (الله)، يُنطق الإبسلون:", coptic_display: "ⲛⲟⲩϯ", audio_text: "نوتي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "واو طويلة مضمومة لمجيء الأو (Ⲟ) قبله", is_correct: true }, { text: "ڤ (V)", is_correct: false }, { text: "ياء", is_correct: false }], explanation: "مسبوق بحرف Ⲟ = واو مضمومة." },
        { type: "read_select", question: "في كلمة «ⲥⲧⲁⲩⲣⲟⲥ» (صليب)، يُنطق الإبسلون:", coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ", audio_text: "إستافروس", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "ڤ (V) لمجيء الألفا (Ⲁ) قبله", is_correct: true }, { text: "واو", is_correct: false }], explanation: "مسبوق بألفا = ڤ." },
        { type: "select", question: "ما معنى كلمة «ⲟⲩϫⲁⲓ» بالقبطية؟", coptic_display: "ⲟⲩϫⲁⲓ", audio_text: "أوجاي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "سلامة / عافية / خلاص", is_correct: true }, { text: "مرض", is_correct: false }], explanation: "ⲟⲩϫⲁⲓ = سلامة / عافية." },
        { type: "write", question: "ركّب كلمة 'ترنيمة' بالقبطية (هيمنوس):", coptic_display: "ϩⲩⲙⲛⲟⲥ", audio_text: "هيمنوس", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϩ", "ⲩ", "ⲙ", "ⲛ", "ⲟ", "ⲥ"], correct_word: "ϩⲩⲙⲛⲟⲥ", explanation: "ϩⲩⲙⲛⲟⲥ = ترنيمة." },
        { type: "read_select", question: "في كلمة «ⲯⲩⲭⲏ» (نفس)، يُنطق الإبسلون بصوت:", options: [{ text: "ياء قصيرة (بسيشي) لأنه جاء منفرداً", is_correct: true }, { text: "واو", is_correct: false }], explanation: "إبسلون منفرد = ياء." }
      ]
    },
    {
      id: 217, title: "حرف الكي (Ⲭ ⲭ) — بين 'ك' و 'ش' و 'خ'", xp: 9,
      challenges: [
        { type: "text_view", question: "قاعدة حرف الكي (Ⲭ ⲭ) الثلاثية المعتمدة", coptic_display: "Ⲭ ⲭ", audio_text: "كي", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• يُنطق (كاف - K): في الكلمات القبطية الأصلية دائماً.\n  - أمثلة: ⲭⲏⲙⲓ (كيمي = مصر)، ⲛⲉⲭⲗⲟⲙ (نيكلوم = أكاليل)\n• يُنطق (شين - SH): في الكلمات اليونانية إذا تلاه حرف كسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).\n  - أمثلة: ⲭⲉⲣⲉ (شيريه = السلام لكِ)، ⲭⲓⲱⲛ (شيون = ثلج)\n• يُنطق (خاء - KH): في الكلمات اليونانية إذا لم يتله كسر (قبل فتح أو ضم أو ساكن).\n  - أمثلة: Ⲭⲣⲓⲥⲧⲟⲥ (خرستوس = المسيح)، ⲭⲟⲣⲟⲥ (خوروس = مرتلون)", explanation: "الكي: قبطي ⬅ كاف | يوناني + كسر ⬅ شين | يوناني + غير كسر ⬅ خاء." },
        { type: "read_select", question: "كلمة «ⲭⲏⲙⲓ» (مصر) قبطية الأصل، لذا يُنطق حرف الكي فيها:", coptic_display: "ⲭⲏⲙⲓ", audio_text: "كيمي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "كاف (K) لأن الكلمة قبطية أصيلة", is_correct: true }, { text: "شين", is_correct: false }, { text: "خاء", is_correct: false }], explanation: "في الكلمات القبطية ينطق كافاً دائماً." },
        { type: "read_select", question: "كلمة «ⲭⲉⲣⲉ» (السلام لكِ) يونانية ومتبوعة بكسر، لذا تنطق:", coptic_display: "ⲭⲉⲣⲉ", audio_text: "شيريه", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "شين (شيريه)", is_correct: true }, { text: "خاء (خيريه)", is_correct: false }, { text: "كاف (كيريه)", is_correct: false }], explanation: "يوناني + كسر = شين." },
        { type: "read_select", question: "كلمة «Ⲭⲣⲓⲥⲧⲟⲥ» (المسيح) يونانية ومتبوعة بساكن، لذا تنطق:", coptic_display: "Ⲭⲣⲓⲥⲧⲟⲥ", audio_text: "خرستوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "خاء (خرستوس)", is_correct: true }, { text: "شين (شرستوس)", is_correct: false }, { text: "كاف", is_correct: false }], explanation: "يوناني + غير كسر = خاء." },
        { type: "write", question: "ركّب كلمة 'السلام لكِ' بالقبطية (شيريه):", coptic_display: "ⲭⲉⲣⲉ", audio_text: "شيريه", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲭ", "ⲉ", "ⲣ", "ⲉ"], correct_word: "ⲭⲉⲣⲉ", explanation: "ⲭⲉⲣⲉ = السلام لكِ." },
        { type: "select", question: "كلمة «ⲭⲏⲙⲓ» تعني بالقبطية:", coptic_display: "ⲭⲏⲙⲓ", audio_text: "كيمي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "مصر (الأرض السوداء)", is_correct: true }, { text: "الإسكندرية", is_correct: false }], explanation: "ⲭⲏⲙⲓ = مصر." }
      ]
    },
    {
      id: 218, title: "خوارزمية فحص الحروف الثلاثية بخطوتين", xp: 9,
      challenges: [
        { type: "read_select", question: "في كلمة «ⲭⲁⲕⲓ» (ظلمة) وهي قبطية، نطق الكي هو:", coptic_display: "ⲭⲁⲕⲓ", audio_text: "كاكي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "كاف (كاكي)", is_correct: true }, { text: "خاء", is_correct: false }], explanation: "كلمة قبطية = كاف." },
        { type: "read_select", question: "في كلمة «ⲉⲩⲭⲏ» (صلاة) وهي يونانية ومتبوعة بإيتا، نطق الكي هو:", coptic_display: "ⲉⲩⲭⲏ", audio_text: "إيڤكي", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "شين (إيڤشي) في اليوناني القياسي ويسمح بالكاف", is_correct: true }, { text: "خاء", is_correct: false }], explanation: "تلاها حرف كسر." },
        { type: "read_select", question: "في «ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ»، الغمّا الأولى والثانية تنطقان:", options: [{ text: "الأولى نون والثانية جيم معطشة", is_correct: true }, { text: "كلاهما جيم", is_correct: false }], explanation: "أنغيلوس / إيڤانغيليون." },
        { type: "select", question: "كلمة «ⲛⲉⲭⲗⲟⲙ» (أكاليل) قبطية، فكيف تنطق؟", coptic_display: "ⲛⲉⲭⲗⲟⲙ", audio_text: "نيكلوم", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "نيكلوم (بالكاف)", is_correct: true }, { text: "نيخلوم", is_correct: false }], explanation: "قبطية = كاف." },
        { type: "write", question: "ركّب كلمة 'المسيح':", coptic_display: "Ⲭⲣⲓⲥⲧⲟⲥ", audio_text: "خرستوس", audio_url: "audio_coptic/1alfa.mp3", tiles: ["Ⲭ", "ⲣ", "ⲓ", "ⲥ", "ⲧ", "ⲟ", "ⲥ"], correct_word: "Ⲭⲣⲓⲥⲧⲟⲥ", explanation: "Ⲭⲣⲓⲥⲧⲟⲥ = المسيح." },
        { type: "read_select", question: "حرف «ⲭ» في «ⲭⲟⲣⲟⲥ» (مرتلون) ينطق:", options: [{ text: "خاء (خوروس) لعدم وجود كسر", is_correct: true }, { text: "شين", is_correct: false }], explanation: "متبوع بواو = خاء." }
      ]
    },
    {
      id: 219, title: "مراجعة وتحدي الحروف الثلاثية الشامل", xp: 12,
      challenges: [
        { type: "match", question: "طابق الحرف بحالاته الثلاث بدقة:", pairs: [{ left: "Ⲅ", right: "جيم قبل الكسر، نون قبل الحلقي، غين في الباقي" }, { left: "Ⲩ", right: "ڤ بعد ألفا وإي، واو بعد أو، ياء منفرد" }, { left: "Ⲭ", right: "كاف في القبطي، شين قبل الكسر باليوناني، خاء في الباقي" }], explanation: "ملخص القواعد الثلاثية الكبرى." },
        { type: "read_select", question: "متى ينطق الإبسلون (ڤ)؟", options: [{ text: "إذا سبقه حرف Ⲁ أو Ⲉ", is_correct: true }, { text: "في نهاية الكلمة", is_correct: false }], explanation: "بعد Ⲁ أو Ⲉ." },
        { type: "read_select", question: "متى ينطق الغمّا (نون)؟", options: [{ text: "إذا جاء بعده حرف حلقي آخر (غمّا، كبّا، كسي، كي)", is_correct: true }, { text: "قبل حرف الألفا", is_correct: false }], explanation: "قبل الحروف الحلقية." },
        { type: "write", question: "ركّب كلمة 'إنجيل' بالقبطية:", coptic_display: "ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ", audio_text: "إيڤانغيليون", audio_url: "audio_coptic/2vo.mp3", tiles: ["ⲉ", "ⲩ", "ⲁ", "ⲅ", "ⲅ", "ⲉ", "ⲗ", "ⲓ", "ⲟ", "ⲛ"], correct_word: "ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ", explanation: "ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ = إنجيل." },
        { type: "select", question: "عبارة «Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ» تعني:", options: [{ text: "قدوس الله", is_correct: true }, { text: "المجد لله", is_correct: false }], explanation: "قدوس الله." },
        { type: "read_select", question: "في كلمة «ϩⲩⲙⲛⲟⲥ»، الإبسلون ينطق بصوت:", options: [{ text: "ياء قصيرة", is_correct: true }, { text: "واو", is_correct: false }], explanation: "إبسلون منفرد = ياء." }
      ]
    }
  ]
};

// --- UNIT 5 ---
const unit5 = {
  id: 55,
  level_id: 6,
  title: "الوحدة ٥: الميزان المعجمي والتمييز بين القبطي واليوناني",
  badge: "Coptic-vs-Greek",
  description: "امتلاك الحاسة اللغوية الصائبة لتحديد أصل الكلمة وتطبيق أحكام نطقها بدقة.",
  order_index: 5,
  lessons: [
    {
      id: 220, title: "الحروف الديموطيقية السبعة — صك الهوية المصرية", xp: 9,
      challenges: [
        { type: "text_view", question: "الحروف المصرية السبعة حارسة الأصل القبطي", coptic_display: "Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ", audio_text: "حروف ديموطيقية", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• القاعدة القطعية: أي كلمة في اللغة القبطية تشتمل على حرف أو أكثر من الحروف السبعة الديموطيقية التالية هي كلمة قبطية أصيلة 100%:\n  - Ϣ (شاي)، Ϥ (فاي)، Ϧ (خاي)، Ϩ (هوري)، Ϫ (جانجا)، Ϭ (تشيما)، Ϯ (تي)\n• شواهد معتمدة:\n  - ϣⲱⲡ (شوب = يقبل)، ϥⲁⲓ (فاي = يحمل)، ϧⲉⲛ (خين = في)\n  - ϩⲏⲧ (هيت = قلب)، ϫⲱ (جو = يقول)، ϭⲟⲓⲥ (شويس = رب)", explanation: "الحروف الديموطيقية لا توجد إطلاقاً في الكلمات اليونانية." },
        { type: "read_select", question: "كلمة «ϧⲉⲛ» (في) أصلها:", coptic_display: "ϧⲉⲛ", audio_text: "خين", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "قبطي أصيل لوجود حرف الخاي (Ϧ)", is_correct: true }, { text: "يوناني", is_correct: false }], explanation: "الخاي حرف ديموطيقي أصيل." },
        { type: "read_select", question: "كلمة «ϭⲟⲓⲥ» (رب) أصلها:", coptic_display: "ϭⲟⲓⲥ", audio_text: "شويس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "قبطي أصيل لوجود حرف التشيما (Ϭ)", is_correct: true }, { text: "يوناني", is_correct: false }], explanation: "التشيما حرف ديموطيقي مصري." },
        { type: "select", question: "كم حرفاً مصرياً ديموطيقياً في الأبجدية القبطية؟", options: [{ text: "7 حروف", is_correct: true }, { text: "5 حروف", is_correct: false }, { text: "10 حروف", is_correct: false }], explanation: "7 حروف مصرية مضافة للأبجدية اليونانية." },
        { type: "write", question: "ركّب كلمة 'في' بالقبطية (خين):", coptic_display: "ϧⲉⲛ", audio_text: "خين", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϧ", "ⲉ", "ⲛ"], correct_word: "ϧⲉⲛ", explanation: "ϧⲉⲛ = في." },
        { type: "read_select", question: "إذا احتوت كلمة على حرف «Ϣ» ومعه حرف «Ⲭ»، كيف ينطق الكي؟", options: [{ text: "كاف دائماً لأن الكلمة قبطية قطعاً", is_correct: true }, { text: "شين", is_correct: false }], explanation: "وجود حرف ديموطيقي يثبت قبطية الكلمة." }
      ]
    },
    {
      id: 221, title: "الحروف اليونانية الصريحة وكواشف الأصل", xp: 9,
      challenges: [
        { type: "text_view", question: "الحروف التي تدل على أصل يوناني", coptic_display: "Ⲅ, Ⲇ, Ⲍ, Ⲝ, ⲯ", audio_text: "حروف يونانية", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• الحروف التالية لا تدخل في الكلمات القبطية الأصيلة، بل تشير دائماً إلى أصل يوناني للكلمة:\n  - Ⲅ (غمّا)، Ⲇ (دلتا)، Ⲍ (زاطا)، Ⲝ (إكسي)، ⲯ (إبسي)\n• أمثلة:\n  - ⲇⲟⲝⲁ (ذوكصا = مجد)\n  - ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)\n  - ⲁⲝⲓⲟⲥ (آكسيوس = مستحق)", explanation: "هذه الأحرف يونانية لا توجد في القبطي الأصيل إلا بشذوذ نادر." },
        { type: "read_select", question: "كلمة «ⲇⲟⲝⲁ» (مجد) أصلها:", coptic_display: "ⲇⲟⲝⲁ", audio_text: "ذوكصا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يوناني لوجود حرفي الدلتا والإكسي", is_correct: true }, { text: "قبطي أصيل", is_correct: false }], explanation: "حروف يونانية صريحة." },
        { type: "read_select", question: "كلمة «ⲯⲁⲗⲙⲟⲥ» (مزمور) أصلها:", coptic_display: "ⲯⲁⲗⲙⲟⲥ", audio_text: "بصالموس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يوناني لوجود حرف الإبسي والنهاية os", is_correct: true }, { text: "قبطي", is_correct: false }], explanation: "يونانية الأصل." },
        { type: "select", question: "كلمة «ⲁⲝⲓⲟⲥ» الكنسية تعني:", coptic_display: "ⲁⲝⲓⲟⲥ", audio_text: "آكسيوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "مستحق / عادل", is_correct: true }, { text: "مبارك", is_correct: false }], explanation: "ⲁⲝⲓⲟⲥ = مستحق." },
        { type: "write", question: "ركّب كلمة 'مزمور' بالقبطية:", coptic_display: "ⲯⲁⲗⲙⲟⲥ", audio_text: "بصالموس", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲯ", "ⲁ", "ⲗ", "ⲙ", "ⲟ", "ⲥ"], correct_word: "ⲯⲁⲗⲙⲟⲥ", explanation: "ⲯⲁⲗⲙⲟⲥ = مزمور." },
        { type: "read_select", question: "كلمة «ⲁⲛⲍⲏⲃ» (مدرسة) تُعد من الحالات الشاذة لأنها:", options: [{ text: "كلمة قبطية احتوت نادراً على حرف الزاطا (Ⲍ)", is_correct: true }, { text: "كلمة يونانية محضة", is_correct: false }], explanation: "استثناء نادر جداً." }
      ]
    },
    {
      id: 222, title: "النهايات والقوالب الصرفية اليونانية", xp: 9,
      challenges: [
        { type: "text_view", question: "النهايات الإعرابية اليونانية الشهيرة", coptic_display: "-ⲟⲥ, -ⲏⲥ, -ⲁⲥ, -ⲟⲛ, -ⲓⲁ", audio_text: "نهايات يونانية", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• تتميز الكلمات اليونانية بنهايات إعرابية واضحة:\n  1. نهايات المذكر: -ⲟⲥ (مثل: ⲗⲟⲅⲟⲥ, ⲁⲅⲅⲉⲗⲟⲥ)، -ⲏⲥ (مثل: ⲙⲁⲑⲏⲧⲏⲥ = تلميذ)\n  2. نهايات المحايد والمؤنث: -ⲟⲛ (مثل: ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ)، -ⲓⲁ (مثل: ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة)", explanation: "نهايات الأسماء اليونانية." },
        { type: "read_select", question: "كلمة «ⲉⲕⲕⲗⲏⲥⲓⲁ» (كنيسة) تنتهي بـ «-ⲓⲁ»، لذا فأصلها:", coptic_display: "ⲉⲕⲕⲗⲏⲥⲓⲁ", audio_text: "إكليسيا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يوناني", is_correct: true }, { text: "قبطي", is_correct: false }], explanation: "نهاية يونانية مؤنثة." },
        { type: "read_select", question: "كلمة «ⲙⲁⲑⲏⲧⲏⲥ» (تلميذ) تنتهي بـ «-ⲏⲥ»، وأصلها:", coptic_display: "ⲙⲁⲑⲏⲧⲏⲥ", audio_text: "ماثيتيس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يوناني", is_correct: true }, { text: "قبطي", is_correct: false }], explanation: "نهاية فاعل يونانية." },
        { type: "select", question: "ما معنى كلمة «ⲉⲕⲕⲗⲏⲥⲓⲁ»؟", coptic_display: "ⲉⲕⲕⲗⲏⲥⲓⲁ", audio_text: "إكليسيا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "كنيسة / جماعة المؤمنين", is_correct: true }, { text: "مذبح", is_correct: false }], explanation: "ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة." },
        { type: "write", question: "ركّب كلمة 'كنيسة' بالقبطية (إكليسيا):", coptic_display: "ⲉⲕⲕⲗⲏⲥⲓⲁ", audio_text: "إكليسيا", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲉ", "ⲕ", "ⲕ", "ⲗ", "ⲏ", "ⲥ", "ⲓ", "ⲁ"], correct_word: "ⲉⲕⲕⲗⲏⲥⲓⲁ", explanation: "ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة." },
        { type: "read_select", question: "كلمة «ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ» أصل الكلمة بدون أداة التعريف (ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ) هو:", options: [{ text: "يوناني لنهايتها بـ os", is_correct: true }, { text: "قبطي", is_correct: false }], explanation: "رسول (أبوستولوس) كلمة يونانية." }
      ]
    },
    {
      id: 223, title: "تمرين الفرز المعجمي المتقدم", xp: 12,
      challenges: [
        { type: "match", question: "صنّف الكلمات بدقة حسب أصلها اللغوي:", pairs: [{ left: "ϣⲱⲡ", right: "قبطية لوجود حرف الشاي" }, { left: "ⲗⲟⲅⲟⲥ", right: "يونانية لوجود Ⲅ ونهاية os" }, { left: "ϩⲏⲧ", right: "قبطية لوجود حرف الهوري" }, { left: "ⲉⲩⲭⲏ", right: "يونانية لوجود الإبسلون والكي" }], explanation: "فرز معجمي دقيق." },
        { type: "read_select", question: "في كلمة «ⲭⲱⲣⲁ» (بلد/أرض) وهي يونانية تنتهي بـ a: حرف الكي ينطق:", coptic_display: "ⲭⲱⲣⲁ", audio_text: "خورا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "خاء (خورا) لعدم وجود كسر", is_correct: true }, { text: "كاف", is_correct: false }], explanation: "يوناني + غير كسر = خاء." },
        { type: "select", question: "أي كلمة مما يلي قبطية أصيلة 100%؟", options: [{ text: "ϥⲁⲓ (يحمل)", is_correct: true }, { text: "ⲁⲅⲅⲉⲗⲟⲥ (ملاك)", is_correct: false }, { text: "ⲇⲟⲝⲁ (مجد)", is_correct: false }], explanation: "ϥⲁⲓ لوجود الفاي." },
        { type: "write", question: "ركّب كلمة 'يحمل' بالقبطية (فاي):", coptic_display: "ϥⲁⲓ", audio_text: "فاي", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϥ", "ⲁ", "ⲓ"], correct_word: "ϥⲁⲓ", explanation: "ϥⲁⲓ = يحمل." },
        { type: "read_select", question: "هل يمكن لكلمة تحتوي حرف «Ϫ» أن تكون يونانية الأصل؟", options: [{ text: "مستحيل، لأن الجانجا حرف ديموطيقي خالص", is_correct: true }, { text: "نعم يمكن", is_correct: false }], explanation: "الجانجا علامة قبطية حاسمة." },
        { type: "read_select", question: "كلمة «ⲛⲓⲫⲏⲟⲩⲓ» (السماوات) هي كلمة:", options: [{ text: "قبطية أصيلة", is_correct: true }, { text: "يونانية", is_correct: false }], explanation: "السماوات كلمة قبطية أصيلة." }
      ]
    }
  ]
};

// --- UNIT 6 ---
const unit6 = {
  id: 56,
  level_id: 6,
  title: "الوحدة ٦: مصفوفة المقاطع الصوتية لجداول المجمع المقدس",
  badge: "Syllables-Matrix",
  description: "إتقان القراءة المقطعية الثنائية لكل الحروف مع الحركات السبع استناداً لص 65 و 66 من كتاب إعدادي.",
  order_index: 6,
  lessons: [
    {
      id: 224, title: "مصفوفة مقاطع حروف الوسط (Ⲕ, Ⲃ, Ⲅ, Ⲇ, Ⲍ, Ⲑ)", xp: 9,
      challenges: [
        { type: "text_view", question: "مصفوفة المقاطع لحروف الوسط", coptic_display: "ⲕⲁ ⲕⲉ ⲕⲓ ⲕⲏ ⲕⲟ ⲕⲱ ⲕⲟⲩ", audio_text: "مقاطع كابا", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• جدول المقاطع المعتمد من المجمع المقدس:\n  - Ⲕ: ⲕⲁ (كا), ⲕⲉ (كِ), ⲕⲓ (كي), ⲕⲏ (كيي), ⲕⲟ (كو), ⲕⲱ (كوو), ⲕⲟⲩ (كو مضمومة)\n  - Ⲃ: ⲃⲁ (ڤا), ⲃⲉ (ڤِ), ⲃⲓ (ڤي), ⲃⲏ (ڤيي), ⲃⲟ (ڤو), ⲃⲱ (ڤوو), ⲃⲟⲩ (ڤو مضمومة)\n  - Ⲅ: ⲅⲁ (غا), ⲅⲉ (جِ), ⲅⲓ (جي), ⲅⲏ (جيي), ⲅⲟ (غو), ⲅⲱ (غوو), ⲅⲟⲩ (غو مضمومة)", explanation: "تركيب الساكن مع الحركات السبع." },
        { type: "read_select", question: "المقطع «ⲅⲉ» يُنطق:", coptic_display: "ⲅⲉ", audio_text: "جِ", audio_url: "audio_coptic/3ghala.mp3", options: [{ text: "جِ (معطشة لوجود الإي الكاسرة)", is_correct: true }, { text: "غِ", is_correct: false }, { text: "نِ", is_correct: false }], explanation: "غمّا + كسر = جيم." },
        { type: "read_select", question: "المقطع «ⲃⲁ» يُنطق:", coptic_display: "ⲃⲁ", audio_text: "ڤا", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "ڤا (لأن الفيتا تلاها متحرك)", is_correct: true }, { text: "با", is_correct: false }], explanation: "فيتا + متحرك = ڤ." },
        { type: "match", question: "طابق المقطع الصوتي بنطقه الدقيق:", pairs: [{ left: "ⲕⲟⲩ", right: "كو مضمومة طويلاً" }, { left: "ⲕⲱ", right: "كوو مفتوحة مفخمة" }, { left: "ⲕⲉ", right: "كِ خفيفة" }], explanation: "مقاييس أصوات الكاف." },
        { type: "write", question: "ركّب المقطع الصوتي 'ڤي':", coptic_display: "ⲃⲓ", audio_text: "ڤي", audio_url: "audio_coptic/2vo.mp3", tiles: ["ⲃ", "ⲓ"], correct_word: "ⲃⲓ", explanation: "ⲃ + ⲓ = ڤي." },
        { type: "read_select", question: "المقطع «ⲑⲱ» يُنطق:", options: [{ text: "ثوو (مفخمة)", is_correct: true }, { text: "توو", is_correct: false }], explanation: "ثيتا + أوميجا = ثوو." }
      ]
    },
    {
      id: 225, title: "مصفوفة مقاطع حروف الرنين والشفتانية (Ⲗ, Ⲙ, Ⲛ, Ⲝ, Ⲡ, Ⲣ)", xp: 9,
      challenges: [
        { type: "text_view", question: "مصفوفة حروف الرنين", coptic_display: "Ⲗ, Ⲙ, Ⲛ, Ⲣ", audio_text: "حروف الرنين", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• المقاطع الرنانة:\n  - Ⲗ: ⲗⲁ, ⲗⲉ, ⲗⲓ, ⲗⲏ, ⲗⲟ, ⲗⲱ, ⲗⲟⲩ\n  - Ⲙ: ⲙⲁ, ⲙⲉ, ⲙⲓ, ⲙⲏ, ⲙⲟ, ⲙⲱ, ⲙⲟⲩ\n  - Ⲛ: ⲛⲁ, ⲛⲉ, ⲛⲓ, ⲛⲏ, ⲛⲟ, ⲛⲱ, ⲛⲟⲩ\n  - Ⲣ: ⲣⲁ, ⲣⲉ, ⲣⲓ, ⲣⲏ, ⲣⲟ, ⲣⲱ, ⲣⲟⲩ", explanation: "المقاطع الرنانة والشفتانية." },
        { type: "read_select", question: "المقطع «ⲛⲏ» يُنطق:", coptic_display: "ⲛⲏ", audio_text: "نيي", audio_url: "audio_coptic/8ei.mp3", options: [{ text: "نيي (بياء مكسورة ممدودة)", is_correct: true }, { text: "نِ قصيرة", is_correct: false }], explanation: "نون + إيتا = نيي." },
        { type: "select", question: "كلمة «ⲙⲁ» تعني بالقبطية:", coptic_display: "ⲙⲁ", audio_text: "ما", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "موضع / مكان", is_correct: true }, { text: "زمان", is_correct: false }], explanation: "ⲙⲁ = موضع / مكان." },
        { type: "write", question: "ركّب مقطع 'روو' المفخم:", coptic_display: "ⲣⲱ", audio_text: "روو", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲣ", "ⲱ"], correct_word: "ⲣⲱ", explanation: "ⲣ + ⲱ = روو." },
        { type: "match", question: "طابق المقطع بنطقه:", pairs: [{ left: "ⲗⲟⲩ", right: "لو مضمومة" }, { left: "ⲙⲁ", right: "ما" }, { left: "ⲛⲉ", right: "نِ خفيفة" }], explanation: "مطابقة مقاطع الرنين." },
        { type: "read_select", question: "المقطع «ⲡⲁ» في كلمة «ⲡⲁⲥⲟⲛ» (أخي) ينطق:", options: [{ text: "با خفيفة", is_correct: true }, { text: "بو", is_correct: false }], explanation: "Ⲡ + Ⲁ = با." }
      ]
    },
    {
      id: 226, title: "مصفوفة مقاطع الحروف الديموطيقية (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ)", xp: 9,
      challenges: [
        { type: "text_view", question: "مصفوفة الحروف الديموطيقية المصرية", coptic_display: "Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ", audio_text: "مقاطع ديموطيقية", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• مقاطع الحروف المصرية:\n  - Ϣ: ϣⲁ, ϣⲉ, ϣⲓ, ϣⲏ, ϣⲟ, ϣⲱ, ϣⲟⲩ\n  - Ϥ: ϥⲁ, ϥⲉ, ϥⲓ, ϥⲏ, ϥⲟ, ϥⲱ, ϥⲟⲩ\n  - Ϧ: ϧⲁ, ϧⲉ, ϧⲓ, ϧⲏ, ϧⲟ, ϧⲱ, ϧⲟⲩ\n  - Ϩ: ϩⲁ, ϩⲉ, ϩⲓ, ϩⲏ, ϩⲟ, ϩⲱ, ϩⲟⲩ\n  - Ϫ: ϫⲁ (جا صلبة), ϫⲉ (جِ معطشة), ϫⲓ (جي معطشة), ϫⲏ (جيي معطشة), ϫⲟ (جو صلبة), ϫⲱ (جوو صلبة), ϫⲟⲩ (جو صلبة)", explanation: "مقاطع الحروف الديموطيقية مع تمييز تعطيش الجانجا." },
        { type: "read_select", question: "المقطع «ϫⲉ» يُنطق:", coptic_display: "ϫⲉ", audio_text: "جِ", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "جِ (معطشة لوجود الإي الكاسرة)", is_correct: true }, { text: "جِ صلبة قاهرية", is_correct: false }], explanation: "جانجا + كسر = معطشة." },
        { type: "read_select", question: "المقطع «ϫⲁ» يُنطق:", coptic_display: "ϫⲁ", audio_text: "جا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "جا صلبة قاهرية لعدم وجود كسر", is_correct: true }, { text: "جا معطشة", is_correct: false }], explanation: "جانجا + فتح = صلبة." },
        { type: "write", question: "ركّب مقطع 'شا':", coptic_display: "ϣⲁ", audio_text: "شا", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϣ", "ⲁ"], correct_word: "ϣⲁ", explanation: "ϣ + ⲁ = شا." },
        { type: "match", question: "طابق المقطع الديموطيقي بنطقه:", pairs: [{ left: "ϧⲟⲩ", right: "خو مضمومة" }, { left: "ϩⲁ", right: "ها" }, { left: "Ϭⲓ", right: "تشي / شي" }], explanation: "مقاطع الحروف المصرية." },
        { type: "read_select", question: "المقطع «ϥⲱ» ينطق:", options: [{ text: "فوو (مفخمة)", is_correct: true }, { text: "فو خفيفة", is_correct: false }], explanation: "فاي + أوميجا = فوو." }
      ]
    },
    {
      id: 227, title: "مصفوفة المقاطع العكسية (المتحرك يسبق الساكن)", xp: 9,
      challenges: [
        { type: "text_view", question: "مصفوفة المقاطع العكسية المغلقة", coptic_display: "ⲁⲕ, ⲉⲕ, ⲓⲕ, ⲟⲕ, ⲱⲕ, ⲟⲩⲕ", audio_text: "مقاطع عكسية", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• المقاطع العكسية تنتهي بساكن وتلعب دوراً رئيسياً في نهايات الكلمات:\n  - ⲁⲕ (آك), ⲉⲕ (إِك), ⲓⲕ (إيك), ⲏⲕ (إييك), ⲟⲕ (أوك), ⲱⲕ (أووك), ⲟⲩⲕ (أووك مضمومة)\n  - ⲁⲥ (آس), ⲉⲥ (إِس), ⲓⲥ (إيس), ⲏⲥ (إييس), ⲟⲥ (أوس), ⲱⲥ (أووس), ⲟⲩⲥ (أووس مضمومة)", explanation: "المقاطع المغلقة المنتهية بساكن." },
        { type: "read_select", question: "المقطع «ⲱⲛ» يُنطق:", coptic_display: "ⲱⲛ", audio_text: "أوون", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "أوون (بواو طويلة مفخمة)", is_correct: true }, { text: "أون قصيرة", is_correct: false }], explanation: "أوميجا + نون = أوون." },
        { type: "read_select", question: "المقطع «ⲟⲥ» في نهاية الكلمات اليونانية يُنطق:", coptic_display: "ⲟⲥ", audio_text: "أوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "أوس (بواو قصيرة خطافة)", is_correct: true }, { text: "أووس ممدودة", is_correct: false }], explanation: "أو قصيرة + سيما = أوس." },
        { type: "write", question: "ركّب المقطع العكسي 'إِش':", coptic_display: "ⲉϣ", audio_text: "إش", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲉ", "ϣ"], correct_word: "ⲉϣ", explanation: "ⲉ + ϣ = إِش." },
        { type: "match", question: "طابق المقطع العكسي بنطقه:", pairs: [{ left: "ⲁⲛ", right: "آن" }, { left: "ⲉⲛ", right: "إِن" }, { left: "ⲟⲛ", right: "أون قصيرة" }, { left: "ⲱⲛ", right: "أوون مفخمة" }], explanation: "مقاطع النون العكسية." },
        { type: "read_select", question: "المقطع «ⲁϥ» في بداية الأفعال الماضية ينطق:", options: [{ text: "آف", is_correct: true }, { text: "أُف", is_correct: false }], explanation: "Ⲁ + Ϥ = آف." }
      ]
    },
    {
      id: 228, title: "مختبر القراءة الإيقاعية السريعة للمقاطع", xp: 12,
      challenges: [
        { type: "read_select", question: "اقرأ السلسلة السريعة: «ⲥⲁ ⲥⲉ ⲥⲓ ⲥⲏ ⲥⲟ ⲥⲱ ⲥⲟⲩ» بالترتيب:", options: [{ text: "سا، سِ، سي، سيي، سو، سوو، سو مضمومة", is_correct: true }, { text: "ترتيب غير صحيح", is_correct: false }], explanation: "قراءة إيقاعية لسلسلة السيما." },
        { type: "read_select", question: "ميز بين «ⲃⲁ» و «ⲁⲃ»: أيهما ينطق فيه الحرف (ڤ)؟", options: [{ text: "الأولى (ⲃⲁ) لأن الفيتا متبوعة بمتحرك", is_correct: true }, { text: "الثانية (ⲁⲃ)", is_correct: false }], explanation: "ⲃⲁ = ڤا، أما ⲁⲃ = آب." },
        { type: "write", question: "ركّب كلمة 'مخلّص' من مقطعين (سوتير):", coptic_display: "ⲥⲱⲧⲏⲣ", audio_text: "سوتير", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲥⲱ", "ⲧⲏⲣ"], correct_word: "ⲥⲱⲧⲏⲣ", explanation: "ⲥⲱ / ⲧⲏⲣ = مخلّص." },
        { type: "select", question: "كلمة «ⲥⲱⲧⲏⲣ» تعني بالقبطية:", coptic_display: "ⲥⲱⲧⲏⲣ", audio_text: "سوتير", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "مخلّص / فادي", is_correct: true }, { text: "خالق", is_correct: false }], explanation: "ⲥⲱⲧⲏⲣ = مخلص." },
        { type: "read_select", question: "كم مقطعاً في كلمة «ⲡⲁ/ⲡⲁ»؟", coptic_display: "ⲡⲁ/ⲡⲁ", audio_text: "بابا", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "مقطعان: (با) و (با)", is_correct: true }, { text: "مقطع واحد", is_correct: false }], explanation: "مقطعان متماثلان." },
        { type: "read_select", question: "كلمة «ϫⲟⲓ» (سفينة / مركب) تتكون من مقطع:", options: [{ text: "واحد ينطق (جوي صلبة)", is_correct: true }, { text: "مقطعين", is_correct: false }], explanation: "ϫⲟⲓ = مركب." }
      ]
    }
  ]
};

// --- UNIT 7 ---
const unit7 = {
  id: 57,
  level_id: 6,
  title: "الوحدة ٧: قواعد التقطيع الصوتي وفك الكلمات المركبة",
  badge: "Syllabification-Master",
  description: "امتلاك مهارة تشريح أي كلمة قبطية طويلة إلى مقاطع بديهية بالشرطة المائلة (/).",
  order_index: 7,
  lessons: [
    {
      id: 229, title: "القواعد الذهبية الأربع لتقطيع الكلمات", xp: 10,
      challenges: [
        { type: "text_view", question: "القواعد الأربع للتقطيع المقطعي (Syllabification)", coptic_display: "V/CV ، VC/CV", audio_text: "تقطيع الكلمات", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• القواعد الذهبية لتقطيع الكلمات بالشرطة المائلة (/):\n  1. قاعدة النواة: لا يوجد مقطع بدون حركة (متحرك) أو جنكم.\n  2. قاعدة الساكن الفردي بين حركتين (V / CV): يتبع الحركة التالية. مثال: ⲡⲁ/ⲥⲟⲛ (با - سون = أخي)\n  3. قاعدة الساكنين بين حركتين (VC / CV): يُقسمان بين المقطعين. مثال: ⲙⲁⲣ/ⲕⲟⲥ (مار - كوس)\n  4. قاعدة الجنكم: يقف كمقطع مستقل. مثال: ⲡ̀/ϭⲟ/ⲓⲥ (إب - شو - يس)", explanation: "القواعد الأربع الأساسية للتقطيع." },
        { type: "read_select", question: "التقطيع الصوتي الصحيح لكلمة «ⲡⲁⲥⲟⲛ» (أخي) هو:", coptic_display: "ⲡⲁ/ⲥⲟⲛ", audio_text: "باصون", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ⲡⲁ/ⲥⲟⲛ (ساكن بين حركتين يتبع اللاحقة)", is_correct: true }, { text: "ⲡⲁⲥ/ⲟⲛ", is_correct: false }], explanation: "V/CV = ⲡⲁ/ⲥⲟⲛ." },
        { type: "read_select", question: "التقطيع الصوتي لكلمة «ⲙⲁⲣⲕⲟⲥ» (مرقس) هو:", coptic_display: "ⲙⲁⲣ/ⲕⲟⲥ", audio_text: "ماركوس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ⲙⲁⲣ/ⲕⲟⲥ (ساكنان بين حركتين يقسمان)", is_correct: true }, { text: "ⲙⲁ/ⲣⲕⲟⲥ", is_correct: false }], explanation: "VC/CV = ⲙⲁⲣ/ⲕⲟⲥ." },
        { type: "select", question: "كلمة «ⲡⲁⲥⲟⲛ» تعني بالقبطية:", coptic_display: "ⲡⲁⲥⲟⲛ", audio_text: "باصون", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "أخي", is_correct: true }, { text: "أبي", is_correct: false }, { text: "أختي", is_correct: false }], explanation: "ⲡⲁⲥⲟⲛ = أخي." },
        { type: "write", question: "قطّع وركّب كلمة 'أخي' بالشرطة المائلة:", coptic_display: "ⲡⲁ/ⲥⲟⲛ", audio_text: "باصون", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲡⲁ", "/", "ⲥⲟⲛ"], correct_word: "ⲡⲁ/ⲥⲟⲛ", explanation: "ⲡⲁ/ⲥⲟⲛ = أخي." },
        { type: "read_select", question: "كلمة «ⲧⲁⲥⲱⲛⲓ» (أختي) تقطع إلى:", options: [{ text: "3 مقاطع: ⲧⲁ/ⲥⲱ/ⲛⲓ", is_correct: true }, { text: "مقطعين", is_correct: false }], explanation: "تا / سو / ني = 3 مقاطع." }
      ]
    },
    {
      id: 230, title: "السوابق وأدوات التعريف المدمجة", xp: 10,
      challenges: [
        { type: "text_view", question: "أدوات التعريف وسوابق الأسماء", coptic_display: "ⲡⲓ-, ϯ-, ⲛⲓ-", audio_text: "أدوات التعريف", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• ترتبط أدوات التعريف بالاسم في وحدة واحدة:\n  - ⲡⲓ- (بي للمذكر): مثل ⲡⲓ/ⲕⲁ/ϩ (بي كاه = الأرض)\n  - ϯ- (تي للمؤنث): مثل ϯ/ⲣⲟⲙ/ⲡⲓ (تي رومبي = السنة)\n  - ⲛⲓ- (ني للجمع): مثل ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ (ني في أو ي = السماوات)", explanation: "فك أدوات التعريف عند التقطيع." },
        { type: "read_select", question: "كلمة «ϯⲣⲟⲙⲡⲓ» (السنة) تقطع إلى:", coptic_display: "ϯ/ⲣⲟⲙ/ⲡⲓ", audio_text: "تي رومبي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ϯ/ⲣⲟⲙ/ⲡⲓ (3 مقاطع)", is_correct: true }, { text: "ϯⲣ/ⲟⲙⲡⲓ", is_correct: false }], explanation: "ϯ / ⲣⲟⲙ / ⲡⲓ." },
        { type: "select", question: "ما معنى كلمة «ϯⲣⲟⲙⲡⲓ» في الصلوات؟", coptic_display: "ϯⲣⲟⲙⲡⲓ", audio_text: "تي رومبي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "السنة", is_correct: true }, { text: "الشهر", is_correct: false }], explanation: "ϯⲣⲟⲙⲡⲓ = السنة." },
        { type: "write", question: "ركّب مقاطع كلمة 'السنة':", coptic_display: "ϯ/ⲣⲟⲙ/ⲡⲓ", audio_text: "تي رومبي", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϯ", "/", "ⲣⲟⲙ", "/", "ⲡⲓ"], correct_word: "ϯ/ⲣⲟⲙ/ⲡⲓ", explanation: "ϯ/ⲣⲟⲙ/ⲡⲓ = السنة." },
        { type: "read_select", question: "كلمة «ⲡⲓⲕⲁϩ» تعني بالقبطية:", options: [{ text: "الأرض", is_correct: true }, { text: "السماء", is_correct: false }], explanation: "ⲡⲓⲕⲁϩ = الأرض." },
        { type: "read_select", question: "كلمة «ⲛⲓⲫⲏⲟⲩⲓ» (السماوات) تقطع إلى:", options: [{ text: "4 مقاطع: ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ", is_correct: true }, { text: "مقطعين", is_correct: false }], explanation: "ني / في / أو / ي = 4 مقاطع." }
      ]
    },
    {
      id: 231, title: "الكلمات المركبة ومقاطع الإضافة والتجريد", xp: 10,
      challenges: [
        { type: "text_view", question: "مقاطع التجريد والفاعل والصفة", coptic_display: "ⲙⲉⲧ-, ⲣⲉϥ-, ⲙⲁ-", audio_text: "سوابق التجريد", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• سوابق الكلمات المركبة الطويلة:\n  - ⲙⲉⲧ- (سابقة التجريد): مثل ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ (صلاح / كرم)\n  - ⲣⲉϥ- (سابقة الفاعل): مثل ⲣⲉϥ/ϩⲓ/ⲱ/ⲓϣ (كارز / مبشر)\n  - ⲙⲁ- (سابقة المكان): مثل ⲙⲁ/ⲛ̀/ϣⲱ/ⲡⲓ (مسكن)", explanation: "تركيب الكلمات بواسطة السوابق." },
        { type: "read_select", question: "السابقة «ⲙⲉⲧ-» في أول الكلمة تفيد:", options: [{ text: "تحويل الصفة إلى اسم معنى ومصدر (تجريد)", is_correct: true }, { text: "الجمع", is_correct: false }], explanation: "ⲙⲉⲧ- للمصدر المجرد." },
        { type: "read_select", question: "السابقة «ⲣⲉϥ-» تفيد دلالة:", options: [{ text: "اسم الفاعل وصاحب المهنة أو الصفة", is_correct: true }, { text: "المكان", is_correct: false }], explanation: "ⲣⲉϥ- لاسم الفاعل." },
        { type: "select", question: "معنى كلمة «ⲣⲉϥϩⲓⲱⲓϣ» في لقب مارمرقس:", coptic_display: "ⲣⲉϥϩⲓⲱⲓϣ", audio_text: "ريف هي أو يش", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "الكارز / المنادي بالبشارة", is_correct: true }, { text: "الشهيد", is_correct: false }], explanation: "ⲣⲉϥϩⲓⲱⲓϣ = الكارز." },
        { type: "write", question: "ركّب مقاطع 'صلاحك' بالشرطة المائلة:", coptic_display: "ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ", audio_text: "ميت خرستوس", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲙⲉⲧ", "/", "ⲭ", "/", "ⲣⲏⲥ", "/", "ⲧⲟⲥ"], correct_word: "ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ", explanation: "ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ = صلاح." },
        { type: "read_select", question: "كلمة «ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ» (ملكوتك) تتكون من:", options: [{ text: "ضمير ملكية + سابقة تجريد + كلمة ملك (أورو)", is_correct: true }, { text: "كلمة بسيطة", is_correct: false }], explanation: "ⲧⲉⲕ + ⲙⲉⲧ + ⲟⲩⲣⲟ = ملكوتك." }
      ]
    },
    {
      id: 232, title: "تحدي فك الكلمات الطويلة بالغة الصعوبة", xp: 12,
      challenges: [
        { type: "read_select", question: "قطّع الكلمة الكبرى «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» (الإنجيلي):", coptic_display: "ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ", audio_text: "إيڤانغيليستيس", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ (5 مقاطع)", is_correct: true }, { text: "ⲉ/ⲩⲁⲅⲅⲉ/ⲗⲓⲥⲧⲏⲥ", is_correct: false }], explanation: "5 مقاطع دقيقة." },
        { type: "read_select", question: "التقطيع الصائب لكلمة «ϥ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» (مبارك) هو:", coptic_display: "ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ", audio_text: "إفسماروؤوت", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ (5 مقاطع)", is_correct: true }, { text: "ϥⲥ/ⲙⲁ/ⲣⲱⲟⲩⲧ", is_correct: false }], explanation: "الجنكم صنع المقطع الأول." },
        { type: "select", question: "كلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» تعني:", coptic_display: "ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ", audio_text: "إيڤانغيليستيس", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "الإنجيلي (كاتب البشارة)", is_correct: true }, { text: "الشهيد", is_correct: false }], explanation: "الإنجيلي." },
        { type: "write", question: "ركّب كلمة 'مبارك' مقطعة بالشرطة المائلة:", coptic_display: "ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ", audio_text: "إفسماروؤوت", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ϥ̀", "/", "ⲥ", "/", "ⲙⲁ", "/", "ⲣⲱ", "/", "ⲟⲩⲧ"], correct_word: "ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ", explanation: "ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ = مبارك." },
        { type: "read_select", question: "كم مقطعاً في كلمة «ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ» (الرسول)؟", options: [{ text: "5 مقاطع: ⲡⲓ/ⲁ̀/ⲡⲟⲥ/ⲧⲟ/ⲗⲟⲥ", is_correct: true }, { text: "3 مقاطع", is_correct: false }], explanation: "5 مقاطع دقيقة." },
        { type: "read_select", question: "كلمة «ⲁϥϭⲓⲱⲙⲥ» (اعتمد) تقطع إلى:", options: [{ text: "3 مقاطع: ⲁϥ/ϭⲓ/ⲱⲙⲥ", is_correct: true }, { text: "مقطعين", is_correct: false }], explanation: "ⲁϥ / ϭⲓ / ⲱⲙⲥ = 3 مقاطع." }
      ]
    }
  ]
};

// --- UNIT 8 ---
const unit8 = {
  id: 58,
  level_id: 6,
  title: "الوحدة ٨: المختبر الكنسي المتقدم والامتحان الشامل",
  badge: "Liturgy-Master",
  description: "تتويج المستوى الثاني بقراءة نصوص صلوات وألحان كنسية كاملة واجتياز امتحان التخرج الشامل.",
  order_index: 8,
  lessons: [
    {
      id: 233, title: "مختبر صلوات المردات اليومية والطلبات", xp: 12,
      challenges: [
        { type: "text_view", question: "طلبات ومردات الكنيسة اليومية", coptic_display: "Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ", audio_text: "إفنوتي ناي نان", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• نصوص كنسية معتمدة من كتاب إعدادي (ص 57):\n  1. Ⲫ̀/ⲛⲟⲩ/ϯ ⲛⲁ/ⲓ ⲛⲁⲛ (إفنوتي ناي نان = يا الله ارحمنا)\n  2. Ⲫ̀/ⲛⲟⲩ/ϯ ⲥⲱ/ⲧⲉⲙ ⲉ̀/ⲣⲟⲛ (إفنوتي سوتيم إيرون = يا الله اسمعنا)\n  3. Ⲫ̀/ⲛⲟⲩ/ϯ ⲥⲟⲙⲥ ⲉ̀/ⲣⲟⲛ (إفنوتي سومس إيرون = يا الله انظر إلينا)\n  4. Ⲫ̀/ⲛⲟⲩ/ϯ ϫⲟⲩ/ϣⲧ ⲉ̀/ⲣⲟⲛ (إفنوتي جوشت إيرون = يا الله اطلع علينا)\n  5. Ⲫ̀/ⲛⲟⲩ/ϯ ϣⲉⲛ/ϩⲏⲧ ϧⲁ/ⲣⲟⲛ (إفنوتي شينهيت خارون = يا الله تراءف علينا)\n  6. Ⲁ̀/ⲛⲟⲛ ϧⲁ ⲡⲉⲕ/ⲗⲁ/ⲟⲥ (آنون خا بيكلاؤس = نحن شعبك)", explanation: "قراءة صلوات المردات اليومية." },
        { type: "read_select", question: "ما معنى عبارة «Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ»؟", coptic_display: "Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ", audio_text: "إفنوتي ناي نان", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "يا الله ارحمنا", is_correct: true }, { text: "يا الله باركنا", is_correct: false }, { text: "يا الله اسمعنا", is_correct: false }], explanation: "ناي نان = ارحمنا." },
        { type: "read_select", question: "كيف تنطق عبارة «Ⲫ̀ⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ»؟", coptic_display: "Ⲫ̀ⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ", audio_text: "إفنوتي سوتيم إيرون", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "إفنوتي سوتيم إيرون (يا الله اسمعنا)", is_correct: true }, { text: "إفنوتي سومس إيرون", is_correct: false }], explanation: "سوتيم = اسمع." },
        { type: "select", question: "معنى عبارة «Ⲁ̀ⲛⲟⲛ ϧⲁ ⲡⲉⲕⲗⲁⲟⲥ» في المردات:", coptic_display: "Ⲁ̀ⲛⲟⲛ ϧⲁ ⲡⲉⲕⲗⲁⲟⲥ", audio_text: "آنون خا بيكلاؤس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "نحن شعبك", is_correct: true }, { text: "أنتم خدام الله", is_correct: false }], explanation: "آنون خا بيكلاؤس = نحن شعبك." },
        { type: "write", question: "ركّب طلبة 'يا الله ارحمنا':", coptic_display: "Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ", audio_text: "إفنوتي ناي نان", audio_url: "audio_coptic/1alfa.mp3", tiles: ["Ⲫ̀ⲛⲟⲩϯ", "ⲛⲁⲓ", "ⲛⲁⲛ"], correct_word: "Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ", explanation: "Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ = يا الله ارحمنا." },
        { type: "read_select", question: "كلمة «ϫⲟⲩϣⲧ» في «Ⲫ̀ⲛⲟⲩϯ ϫⲟⲩϣⲧ ⲉ̀ⲣⲟⲛ» تعني:", options: [{ text: "اطلع علينا / انظر إلينا بعين الرحمة", is_correct: true }, { text: "اسمعنا", is_correct: false }], explanation: "جوشت = انظر / اطلع." }
      ]
    },
    {
      id: 234, title: "مختبر ربع إنجيل عيد النيروز وإكليل السنة", xp: 12,
      challenges: [
        { type: "text_view", question: "ربع مرد إنجيل النيروز بالتقطيع الصوتي", coptic_display: "ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ", audio_text: "إسمو إيبيكولوم", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• نص ربع إنجيل عيد النيروز (كتاب إعدادي ص 1 وص 14):\n  Ⲁⲗ/ⲗⲏ/ⲗⲟⲩ/ⲓⲁ (4) : ⲥ̀/ⲙⲟⲩ ⲉ̀/ⲡⲓ/ⲭ/ⲗⲟⲙ ⲛ̀/ⲧⲉ ϯ/ⲣⲟⲙ/ⲡⲓ : ϩⲓ/ⲧⲉⲛ ⲧⲉⲕ/ⲙⲉⲧ/ⲭ/ⲣⲏⲥ/ⲧⲟⲥ Ⲡ̀/ϭⲟ/ⲓⲥ : Ⲭⲉ ϥ̀/ⲥ/ⲙⲁ/ⲣⲱ/ⲟⲩⲧ ⲛ̀/ϫⲉ Ⲫ̀/ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀/ϣⲏ/ⲣⲓ ⲛⲉⲙ Ⲡⲓ/ⲡ̀/ⲛⲉⲩ/ⲙⲁ ⲉⲑ/ⲟⲩ/ⲁⲃ.\n• الترجمة: هلليلويا (4): بارك إكليل السنة بصلاحك يا رب، لأنه مبارك الآب والابن والروح القدس.", explanation: "قراءة ربع مرد إنجيل النيروز." },
        { type: "read_select", question: "في كلمة «ⲉ̀ⲡⲓⲭⲗⲟⲙ» (الإكليل)، حرف الكي يُنطق:", coptic_display: "ⲉ̀ⲡⲓⲭⲗⲟⲙ", audio_text: "إيبيكولوم", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "كاف لأن الكلمة قبطية أصيلة", is_correct: true }, { text: "شين", is_correct: false }, { text: "خاء", is_correct: false }], explanation: "كلمة قبطية = كاف." },
        { type: "select", question: "معنى جملة «ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ» هو:", coptic_display: "ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ", audio_text: "إسمو إيبيكولوم إنتي تيرومبي", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "بارك إكليل السنة", is_correct: true }, { text: "بارك شعبك", is_correct: false }], explanation: "بارك إكليل السنة." },
        { type: "write", question: "ركّب عبارة 'بارك الإكليل':", coptic_display: "ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ", audio_text: "إسمو إيبيكولوم", audio_url: "audio_coptic/1alfa.mp3", tiles: ["ⲥ̀ⲙⲟⲩ", "ⲉ̀ⲡⲓⲭⲗⲟⲙ"], correct_word: "ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ", explanation: "ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ = بارك الإكليل." },
        { type: "read_select", question: "كيف تنطق عبارة «Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ»؟", coptic_display: "Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ", audio_text: "إفيوت نِم إبشيري", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "إفيوت نِم إبشيري (الآب والابن)", is_correct: true }, { text: "إفيوت نِم إبشويس", is_correct: false }], explanation: "إفيوت نِم إبشيري." },
        { type: "read_select", question: "الكلمة «ⲧⲉⲕⲙⲉⲧⲭⲣⲏⲥⲧⲟⲥ» تعني:", options: [{ text: "صلاحك / جودك", is_correct: true }, { text: "مجدك", is_correct: false }], explanation: "ⲧⲉⲕⲙⲉⲧⲭⲣⲏⲥⲧⲟⲥ = صلاحك." }
      ]
    },
    {
      id: 235, title: "مختبر ذكصولوجية القديس مرقس الرسول", xp: 12,
      challenges: [
        { type: "text_view", question: "لحن الهيتينيات لمارمرقس الرسول بالتقطيع", coptic_display: "Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ Ⲙⲁⲣⲕⲟⲥ", audio_text: "هيتين ني إيڤكي", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• نص الذكصولوجية (كتاب إعدادي ص 64):\n  Ϩⲓ/ⲧⲉⲛ ⲛⲓ/ⲉⲩ/ⲭⲏ : ⲛ̀/ⲧⲉ ⲡⲓ/ⲑⲉ/ⲱ/ⲣⲓ/ⲙⲟⲥ : ⲛ̀/ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ : Ⲙⲁⲣ/ⲕⲟⲥ ⲡⲓ/ⲁ̀/ⲡⲟⲥ/ⲧⲟ/ⲗⲟⲥ : Ⲡ̀/ϭⲟ/ⲓⲥ ⲁ̀/ⲣⲓ/ϩ̀/ⲙⲟⲧ ⲛⲁⲛ : ⲙ̀/ⲡⲓ/ⲭⲱ ⲉ̀/ⲃⲟⲗ : ⲛ̀/ⲧⲉ ⲛⲉⲛ/ⲛⲟ/ⲃⲓ.\n• الترجمة: بصلوات ناظر الإله الإنجيلي مرقس الرسول، يا رب أنعم لنا بمغفرة خطايانا.", explanation: "قراءة ذكصولوجية مارمرقس الرسول." },
        { type: "read_select", question: "كلمة «ⲛⲓⲉⲩⲭⲏ» تعني بالقبطية:", coptic_display: "ⲛⲓⲉⲩⲭⲏ", audio_text: "ني إيڤكي", audio_url: "audio_coptic/2vo.mp3", options: [{ text: "الصلوات / الطلبات", is_correct: true }, { text: "الأصوام", is_correct: false }], explanation: "الصلوات." },
        { type: "select", question: "لقب مارمرقس «ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ» يعني:", coptic_display: "ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ", audio_text: "بيثيؤوريموس", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ناظر الإله", is_correct: true }, { text: "الشهيد", is_correct: false }], explanation: "ناظر الإله." },
        { type: "write", question: "ركّب اسم 'مرقس الرسول' بالقبطية:", coptic_display: "Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ", audio_text: "ماركوس بي أبوستولوس", audio_url: "audio_coptic/1alfa.mp3", tiles: ["Ⲙⲁⲣⲕⲟⲥ", "ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ"], correct_word: "Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ", explanation: "مرقس الرسول." },
        { type: "read_select", question: "عبارة «ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ» تعني:", options: [{ text: "بمغفرة خطايانا", is_correct: true }, { text: "ببركة بيوتنا", is_correct: false }], explanation: "مغفرة خطايانا." },
        { type: "read_select", question: "في «ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ»، حرف الهوري عليه جنكم ينطق:", options: [{ text: "إهموت (بهمزة مكسورة قبل الهاء)", is_correct: true }, { text: "هاموت", is_correct: false }], explanation: "ϩ̀ = إهـ." }
      ]
    },
    {
      id: 236, title: "مختبر صلاة 'أبانا الذي في السماوات'", xp: 12,
      challenges: [
        { type: "text_view", question: "الصلاة الربانية بالتقطيع الصوتي الكامل", coptic_display: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ", audio_text: "بنيوت إتخين نيفيؤوي", audio_url: "audio_coptic/1alfa.mp3", correct_word: "• نص الصلاة الربانية:\n  Ⲡⲉⲛ/ⲓⲱⲧ ⲉⲧ/ϧⲉⲛ ⲛⲓ/ⲫⲏ/ⲟⲩ/ⲓ : ⲙⲁ/ⲣⲉϥ/ⲧⲟⲩ/ⲃⲟ ⲛ̀/ϫⲉ ⲡⲉⲕ/ⲣⲁⲛ : ⲙⲁ/ⲣⲉⲥ/ⲓ̀ ⲛ̀/ϫⲉ ⲧⲉⲕ/ⲙⲉⲧ/ⲟⲩ/ⲣⲟ : ⲡⲉⲧ/ⲉϩ/ⲛⲁⲕ ⲙⲁ/ⲣⲉϥ/ϣⲱ/ⲡⲓ : ⲙ̀/ⲫ̀/ⲣⲏϯ ϧⲉⲛ ⲧ̀/ⲫⲉ ⲛⲉⲙ ϩⲓ/ϫⲉⲛ ⲡⲓ/ⲕⲁ/ϩ.\n• الترجمة: أبانا الذي في السماوات، ليتقدس اسمك، ليأتِ ملكوتك، لتكن مشيئتك، كما في السماء كذلك على الأرض.", explanation: "قراءة الصلاة الربانية مقطعة." },
        { type: "read_select", question: "كلمة «ⲡⲉⲕⲣⲁⲛ» تعني:", coptic_display: "ⲡⲉⲕⲣⲁⲛ", audio_text: "بيكران", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "اسمك", is_correct: true }, { text: "بيتك", is_correct: false }, { text: "روحك", is_correct: false }], explanation: "ⲡⲉⲕ (لك) + ⲣⲁⲛ (اسم) = اسمك." },
        { type: "select", question: "عبارة «ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ» تعني:", coptic_display: "ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ", audio_text: "تيكميت أورو", audio_url: "audio_coptic/1alfa.mp3", options: [{ text: "ملكوتك", is_correct: true }, { text: "مجدك", is_correct: false }], explanation: "ملكوتك." },
        { type: "write", question: "ركّب عبارة 'أبانا الذي في السماوات':", coptic_display: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ", audio_text: "بنيوت إتخين نيفيؤوي", audio_url: "audio_coptic/1alfa.mp3", tiles: ["Ⲡⲉⲛⲓⲱⲧ", "ⲉⲧϧⲉⲛ", "ⲛⲓⲫⲏⲟⲩⲓ"], correct_word: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ", explanation: "أبانا الذي في السماوات." },
        { type: "read_select", question: "كيف تنطق عبارة «ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩ»؟", options: [{ text: "خين إتفيه نِم هيجين بيكاه (في السماء وعلى الأرض)", is_correct: true }, { text: "خين تافيه نوم هيجون", is_correct: false }], explanation: "خين إتفيه نِم هيجين بيكاه." },
        { type: "read_select", question: "في «ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ»، كلمة «ⲧⲟⲩⲃⲟ» تعني:", options: [{ text: "يتقدس / يطهر", is_correct: true }, { text: "يرتفع", is_correct: false }], explanation: "طهارة وقداسة." }
      ]
    },
    {
      id: 237, title: "الامتحان النهائي الكبير لشهادة القراءة القبطية", xp: 50,
      challenges: [
        { type: "read_select", question: "سؤال 1: في كلمة «ⲭⲉⲣⲉ» (السلام لكِ)، يُنطق حرف الكي:", options: [{ text: "شين (شيريه)", is_correct: true }, { text: "خاء", is_correct: false }, { text: "كاف", is_correct: false }], explanation: "يوناني + كسر = شين." },
        { type: "read_select", question: "سؤال 2: في كلمة «ⲭⲏⲙⲓ» (مصر)، يُنطق حرف الكي:", options: [{ text: "كاف (كيمي)", is_correct: true }, { text: "شين", is_correct: false }, { text: "خاء", is_correct: false }], explanation: "قبطي أصيل = كاف دائماً." },
        { type: "read_select", question: "سؤال 3: في كلمة «ⲁⲅⲅⲉⲗⲟⲥ»، الغمّا الأولى تنطق:", options: [{ text: "نون (أنغيلوس)", is_correct: true }, { text: "جيم", is_correct: false }], explanation: "قبل حرف حلقي = نون." },
        { type: "read_select", question: "سؤال 4: في اسم «Ⲇⲁⲩⲓⲇ»، الدلتا والفيتا ينطقان:", options: [{ text: "د و ڤ (داڤيد)", is_correct: true }, { text: "ذ و ب", is_correct: false }], explanation: "اسم علم (د) وفيتا قبل متحرك (ڤ)." },
        { type: "read_select", question: "سؤال 5: في كلمة «ⲥ̀ⲙⲟⲩ»، الجنكم فوق السيما يلفظ:", options: [{ text: "إِسـ", is_correct: true }, { text: "سا", is_correct: false }], explanation: "جنكم فوق ساكن = همزة مكسورة." },
        { type: "read_select", question: "سؤال 6: التقطيع الصحيح لكلمة «ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ» هو:", options: [{ text: "ⲉⲩ/ⲁⲅ/ⲅⲉ/ⲗⲓⲥ/ⲧⲏⲥ", is_correct: true }, { text: "ⲉ/ⲩⲁⲅⲅⲉ/ⲗⲓⲥⲧⲏⲥ", is_correct: false }], explanation: "5 مقاطع دقيقة." }
      ]
    }
  ]
};

const fullUnits = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8];

const curriculumData = {
  levels: [level2],
  level: level2,
  units: fullUnits
};

// 1. Write JSON
fs.writeFileSync('database/level-2-curriculum-synced.json', JSON.stringify(curriculumData, null, 2), 'utf-8');
console.log('✅ Wrote database/level-2-curriculum-synced.json');

// 2. Generate SQL Migration
let sql = `-- ============================================================================
-- Migration 15: Level 2 Coptic Curriculum (Reading Rules & Advanced Syllabification)
-- 8 Comprehensive Units, 42 Deep Lessons, 252 Challenges
-- 100% Strictly adhering to Holy Synod Curriculum 2014
-- ============================================================================

INSERT INTO public.levels (id, title, description, order_index)
VALUES (6, 'المستوى الثاني: قواعد القراءة ونطق الكلمات', 'أتقن قواعد القراءة والنطق الشرطي والمقاطع الصوتية لتتمكن من قراءة جميع الكلمات والنصوص القبطية بطلاقة تامة.', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, order_index = EXCLUDED.order_index;

`;

let optIdCounter = 5000;
let challengeIdCounter = 3000;

for (const u of fullUnits) {
  sql += `\n-- ---------------------------------------------------------\n`;
  sql += `-- Unit: ${u.title}\n`;
  sql += `-- ---------------------------------------------------------\n`;
  sql += `INSERT INTO public.units (id, level_id, title, badge, description, order_index)\n`;
  sql += `VALUES (${u.id}, ${u.level_id}, '${u.title.replace(/'/g, "''")}', '${u.badge}', '${u.description.replace(/'/g, "''")}', ${u.order_index})\n`;
  sql += `ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;\n\n`;

  let lessonOrder = 1;
  for (const l of u.lessons) {
    sql += `INSERT INTO public.lessons (id, unit_id, title, order_index, practice_xp, challenge_xp)\n`;
    sql += `VALUES (${l.id}, ${u.id}, '${l.title.replace(/'/g, "''")}', ${lessonOrder++}, 1, ${l.xp})\n`;
    sql += `ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index, challenge_xp = EXCLUDED.challenge_xp;\n`;

    let chOrder = 1;
    for (const ch of l.challenges) {
      const chId = challengeIdCounter++;
      const copticDisplay = ch.coptic_display ? `'${ch.coptic_display.replace(/'/g, "''")}'` : 'NULL';
      const audioText = ch.audio_text ? `'${ch.audio_text.replace(/'/g, "''")}'` : 'NULL';
      const audioUrl = ch.audio_url ? `'${ch.audio_url}'` : 'NULL';
      const correctWord = ch.correct_word ? `'${ch.correct_word.replace(/'/g, "''")}'` : 'NULL';
      const explanation = ch.explanation ? `'${ch.explanation.replace(/'/g, "''")}'` : 'NULL';
      const tilesJson = ch.tiles ? `'${JSON.stringify(ch.tiles)}'::jsonb` : 'NULL';
      const pairsJson = ch.pairs ? `'${JSON.stringify(ch.pairs).replace(/'/g, "''")}'::jsonb` : 'NULL';

      sql += `INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, explanation, tiles, pairs, order_index, xp_reward)\n`;
      sql += `VALUES (${chId}, ${l.id}, '${ch.type}', '${ch.question.replace(/'/g, "''")}', ${copticDisplay}, ${audioText}, ${audioUrl}, ${correctWord}, ${explanation}, ${tilesJson}, ${pairsJson}, ${chOrder++}, 1)\n`;
      sql += `ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, correct_word = EXCLUDED.correct_word, explanation = EXCLUDED.explanation;\n`;

      if (ch.options && ch.options.length > 0) {
        let optOrder = 1;
        for (const opt of ch.options) {
          const optId = optIdCounter++;
          sql += `INSERT INTO public.challenge_options (id, challenge_id, text, is_correct, order_index)\n`;
          sql += `VALUES (${optId}, ${chId}, '${opt.text.replace(/'/g, "''")}', ${opt.is_correct ? 'TRUE' : 'FALSE'}, ${optOrder++})\n`;
          sql += `ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;\n`;
        }
      }
    }
  }

  // Chest for unit
  sql += `\nINSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)\n`;
  sql += `VALUES ('chest_unit_${u.id}', 6, ${u.id}, 'صندوق إتقان ${u.title}', 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!', 'unit_end', 15, 1, TRUE, 'متقن ${u.title}', 'star', 'أتممت ${u.title}')\n`;
  sql += `ON CONFLICT (id) DO NOTHING;\n`;
}

// Final Level 2 completion chest
sql += `\n-- Final Level 2 Grand Graduation Chest\n`;
sql += `INSERT INTO public.chests (id, level_id, unit_id, title, description, trigger_type, xp_reward, hearts_reward, is_unlocked, badge_title, badge_icon, badge_desc)\n`;
sql += `VALUES ('chest_level_2_final', 6, 58, '🏆 صندوق التخرج والاحتفال الختامي للمستوى الثاني', 'تهانينا الحارة! لقد أتقنت جميع قواعد القراءة والمقاطع الصوتية والنصوص الكنسية بنجاح باهر!', 'level_end', 60, 3, TRUE, 'قارئ قبطي متقن (Master Coptic Reader)', 'trophy', 'أتممت المستوى الثاني لقواعد القراءة والنطق السليم كاملاً')\n`;
sql += `ON CONFLICT (id) DO NOTHING;\n`;

fs.writeFileSync('database/migrations/migration-15-level-2-reading-rules.sql', sql, 'utf-8');
console.log('✅ Wrote database/migrations/migration-15-level-2-reading-rules.sql');
console.log('🎉 Generation complete! Total units:', fullUnits.length);
