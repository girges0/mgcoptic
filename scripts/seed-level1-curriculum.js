/**
 * Seed Level 1 Curriculum: Complete 32 Coptic Letters across 7 Units
 * هيكل كل درس:
 * 1. نبذة عن الحرف الأول: النطق بالعربي، الكلمة وقبطي معرب ومعناها (text_view, 0 XP)
 * 2. تعليم كتابة الحرف ونطقه (trace, 1 XP)
 * 3. تمرين النطق بالعربي (read_select, 1 XP)
 * 4. تمرين الكلمة: صوت وقبطي معرب ومعناها (select, 1 XP)
 * 5. ترتيب حروف الكلمة: قبطي معرب ومعناها (write, 1 XP)
 * + درس مراجعة في نهاية كل وحدة
 * + صناديق الكنوز
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

// تعريف بيانات الـ 32 حرفاً بدقة كنسية ولغوية
const LETTERS_DATA = [
  // الوحدة 1 (Ⲁ - Ⲉ)
  {
    unitIndex: 1,
    letterUpper: 'Ⲁ',
    letterLower: 'ⲁ',
    nameAr: 'ألفا',
    pronunciationAr: 'ألف مفتوحة (أ)',
    soundFile: 'audio_coptic/1alfa.mp3',
    info: 'الحرف الأول في الأبجدية القبطية. يُنطق دائماً مثل حرف الألف المفتوحة في العربية أو (A) في الإنجليزية.',
    wordCoptic: 'ⲁⲗⲟⲩ',
    wordPhoneticAr: 'أَلو',
    wordMeaning: 'ولد / طفل',
    wrongMeanings: ['بنت', 'مدرسة', 'شمس'],
    wrongLetterPron: ['فيدا (ف أو ب)', 'غاما (غ أو ج)', 'دلدا (د أو ذ)']
  },
  {
    unitIndex: 1,
    letterUpper: 'Ⲃ',
    letterLower: 'ⲃ',
    nameAr: 'فيدا',
    pronunciationAr: 'ف أو ب',
    soundFile: 'audio_coptic/2veta.mp3',
    info: 'الحرف الثاني. يُنطق "ف" إذا جاء بعده حرف متحرك، ويُنطق "ب" إذا لم يأتِ بعده متحرك أو في نهاية الكلمة.',
    wordCoptic: 'ⲃⲉⲣⲧ',
    wordPhoneticAr: 'فيرت',
    wordMeaning: 'وردة',
    wrongMeanings: ['شجرة', 'ماء', 'نور'],
    wrongLetterPron: ['ألفا (أ)', 'دلدا (د أو ذ)', 'إي (إي)']
  },
  {
    unitIndex: 1,
    letterUpper: 'Ⲅ',
    letterLower: 'ⲅ',
    nameAr: 'غاما',
    pronunciationAr: 'غ أو ج أو ن',
    soundFile: 'audio_coptic/3ghamma.mp3',
    info: 'الحرف الثالث. ينطق "غ" في الكلمات القبطية، و"ن" قبل الحلقيات، و"ج" معطشة قبل المتحرك للكسر في اليونانية.',
    wordCoptic: 'ⲁⲅⲅⲉⲗⲟⲥ',
    wordPhoneticAr: 'أنجيلوس',
    wordMeaning: 'ملاك',
    wrongMeanings: ['إنسان', 'قديس', 'نبي'],
    wrongLetterPron: ['فيدا (ف أو ب)', 'سو (٦)', 'زاتا (ز)']
  },
  {
    unitIndex: 1,
    letterUpper: 'Ⲇ',
    letterLower: 'ⲇ',
    nameAr: 'دلدا',
    pronunciationAr: 'د أو ذ',
    soundFile: 'audio_coptic/4delta.mp3',
    info: 'الحرف الرابع. يُنطق "د" في أسماء الأعلام والكلمات القبطية، و"ذ" في الكلمات اليونانية.',
    wordCoptic: 'ⲇⲱⲣⲟⲛ',
    wordPhoneticAr: 'ذورون',
    wordMeaning: 'عطية / هدية',
    wrongMeanings: ['صلاة', 'خبز', 'كتاب'],
    wrongLetterPron: ['غاما (غ أو ج)', 'إي (إي)', 'هيتا (ياء طويلة)']
  },
  {
    unitIndex: 1,
    letterUpper: 'Ⲉ',
    letterLower: 'ⲉ',
    nameAr: 'إي',
    pronunciationAr: 'إي خفيفة',
    soundFile: 'audio_coptic/5ei.mp3',
    info: 'الحرف الخامس. حرف متحرك خفيف ينطق مثل حرف (E) في الإنجليزية (فتحة مائلة للكسر).',
    wordCoptic: 'ⲉⲛ',
    wordPhoneticAr: 'إن',
    wordMeaning: 'قرد',
    wrongMeanings: ['أسد', 'طائر', 'سمكة'],
    wrongLetterPron: ['ألفا (أ)', 'فيدا (ف أو ب)', 'دلدا (د أو ذ)']
  },

  // الوحدة 2 (Ⲋ - Ⲓ)
  {
    unitIndex: 2,
    letterUpper: 'Ⲋ',
    letterLower: 'ⲋ',
    nameAr: 'سو (رقم ٦)',
    pronunciationAr: 'سو (الرقم 6)',
    soundFile: 'audio_coptic/6sow.mp3',
    info: 'رمز ورقم عددي قبطي يدل على الرقم ستة (6). يوضع فوقه شرطة أفقية لتمييزه كرقم، وينطق "سو".',
    wordCoptic: 'ⲥⲟⲟⲩ',
    wordPhoneticAr: 'سو',
    wordMeaning: 'الرقم ستة (٦)',
    wrongMeanings: ['الرقم خمسة', 'الرقم سبعة', 'الرقم عشرة'],
    wrongLetterPron: ['زاتا (ز)', 'ثيتا (ث أو ت)', 'كابا (ك)']
  },
  {
    unitIndex: 2,
    letterUpper: 'Ⲍ',
    letterLower: 'ⲍ',
    nameAr: 'زاتا',
    pronunciationAr: 'ز',
    soundFile: 'audio_coptic/7zeta.mp3',
    info: 'الحرف السابع في الأبجدية القبطية. يُنطق دائماً حرف "ز" مثل حرف (Z) في الإنجليزية.',
    wordCoptic: 'ⲧⲣⲁⲡⲉⲍⲁ',
    wordPhoneticAr: 'ترابيزا',
    wordMeaning: 'مائدة / ترابيزة',
    wrongMeanings: ['كرسي', 'باب', 'نافذة'],
    wrongLetterPron: ['سو (٦)', 'هيتا (ياء طويلة)', 'إيوتا (ياء قصيرة)']
  },
  {
    unitIndex: 2,
    letterUpper: 'Ⲏ',
    letterLower: 'ⲏ',
    nameAr: 'هيتا',
    pronunciationAr: 'ياء طويلة ممدودة',
    soundFile: 'audio_coptic/8eta.mp3',
    info: 'الحرف الثامن. حرف متحرك للكسر يُنطق ياء ممدودة وطويلة مثل (ee) في كلمة meet.',
    wordCoptic: 'ⲁⲛⲍⲏⲃ',
    wordPhoneticAr: 'أنزيب',
    wordMeaning: 'مدرسة',
    wrongMeanings: ['كنيسة', 'بيت', 'طريق'],
    wrongLetterPron: ['زاتا (ز)', 'ثيتا (ث أو ت)', 'لابدا (ل)']
  },
  {
    unitIndex: 2,
    letterUpper: 'Ⲑ',
    letterLower: 'ⲑ',
    nameAr: 'ثيتا',
    pronunciationAr: 'ث أو ت',
    soundFile: 'audio_coptic/9seta.mp3',
    info: 'الحرف التاسع. يُنطق "ث" دائماً، إلا إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) فيُنطق "ت".',
    wordCoptic: 'ⲙⲁⲱⲟⲩⲧ',
    wordPhoneticAr: 'ماووت',
    wordMeaning: 'مشط',
    wrongMeanings: ['مرآة', 'ثوب', 'خاتم'],
    wrongLetterPron: ['هيتا (ياء طويلة)', 'إيوتا (ياء قصيرة)', 'مي (م)']
  },
  {
    unitIndex: 2,
    letterUpper: 'Ⲓ',
    letterLower: 'ⲓ',
    nameAr: 'إيوتا',
    pronunciationAr: 'ياء قصيرة',
    soundFile: 'audio_coptic/10yota.mp3',
    info: 'الحرف العاشر. حرف متحرك يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف (I) في الإنجليزية.',
    wordCoptic: 'ⲱⲓⲛⲓ',
    wordPhoneticAr: 'أويني',
    wordMeaning: 'صنارة / نور',
    wrongMeanings: ['شبكة', 'قارب', 'بحر'],
    wrongLetterPron: ['ثيتا (ث أو ت)', 'كابا (ك)', 'ني (ن)']
  },

  // الوحدة 3 (Ⲕ - Ⲝ)
  {
    unitIndex: 3,
    letterUpper: 'Ⲕ',
    letterLower: 'ⲕ',
    nameAr: 'كابا',
    pronunciationAr: 'ك',
    soundFile: 'audio_coptic/11kapa.mp3',
    info: 'الحرف الحادي عشر في الأبجدية القبطية. يُنطق "ك" دائماً في جميع المواضع.',
    wordCoptic: 'ⲉⲕⲕⲗⲏⲥⲓⲁ',
    wordPhoneticAr: 'إككليسيا',
    wordMeaning: 'كنيسة',
    wrongMeanings: ['دير', 'مذبح', 'هيكل'],
    wrongLetterPron: ['لابدا (ل)', 'مي (م)', 'كسي (كـ+س)']
  },
  {
    unitIndex: 3,
    letterUpper: 'Ⲗ',
    letterLower: 'ⲗ',
    nameAr: 'لابدا',
    pronunciationAr: 'ل',
    soundFile: 'audio_coptic/12lavla.mp3',
    info: 'الحرف الثاني عشر. يُنطق "ل" دائماً.',
    wordCoptic: 'ⲗⲁⲙⲡⲁⲥ',
    wordPhoneticAr: 'لامباس',
    wordMeaning: 'مصباح / قنديل',
    wrongMeanings: ['نار', 'زيت', 'شمس'],
    wrongLetterPron: ['كابا (ك)', 'ني (ن)', 'بي (ب مشددة)']
  },
  {
    unitIndex: 3,
    letterUpper: 'Ⲙ',
    letterLower: 'ⲙ',
    nameAr: 'مي',
    pronunciationAr: 'م',
    soundFile: 'audio_coptic/13mi.mp3',
    info: 'الحرف الثالث عشر. يُنطق حرف "م" دائماً.',
    wordCoptic: 'ⲙⲟⲗϧ',
    wordPhoneticAr: 'مولخ',
    wordMeaning: 'شمعة',
    wrongMeanings: ['بخور', 'صليب', 'كأس'],
    wrongLetterPron: ['لابدا (ل)', 'ني (ن)', 'رو (ر)']
  },
  {
    unitIndex: 3,
    letterUpper: 'Ⲛ',
    letterLower: 'ⲛ',
    nameAr: 'ني',
    pronunciationAr: 'ن',
    soundFile: 'audio_coptic/14ni.mp3',
    info: 'الحرف الرابع عشر. يُنطق حرف "ن" دائماً.',
    wordCoptic: 'ⲛⲟⲩϯ',
    wordPhoneticAr: 'نوتي',
    wordMeaning: 'الله',
    wrongMeanings: ['السماء', 'النور', 'الحق'],
    wrongLetterPron: ['مي (م)', 'كسي (كـ+س)', 'سيما (س)']
  },
  {
    unitIndex: 3,
    letterUpper: 'Ⲝ',
    letterLower: 'ⲝ',
    nameAr: 'كسي',
    pronunciationAr: 'كـ + س',
    soundFile: 'audio_coptic/15axsy.mp3',
    info: 'الحرف الخامس عشر. حرف مركب يُنطق كاف وسين معاً (كـ + س = X) في صوت واحد.',
    wordCoptic: 'ⲟⲩⲁⲗⲓⲝ',
    wordPhoneticAr: 'أواليكس',
    wordMeaning: 'ستارة',
    wrongMeanings: ['مائدة', 'حائط', 'سقف'],
    wrongLetterPron: ['كابا (ك)', 'ني (ن)', 'تاف (ت)']
  },

  // الوحدة 4 (Ⲟ - Ⲧ)
  {
    unitIndex: 4,
    letterUpper: 'Ⲟ',
    letterLower: 'ⲟ',
    nameAr: 'أُو (قصيرة)',
    pronunciationAr: 'واو قصيرة مضمومة',
    soundFile: 'audio_coptic/16oo.mp3',
    info: 'الحرف السادس عشر. حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة.',
    wordCoptic: 'ⲥⲓⲟⲩ',
    wordPhoneticAr: 'سيو',
    wordMeaning: 'نجم',
    wrongMeanings: ['قمر', 'سماء', 'سحاب'],
    wrongLetterPron: ['بي (ب ثقيلة)', 'رو (ر)', 'أوميغا (واو طويلة)']
  },
  {
    unitIndex: 4,
    letterUpper: 'Ⲡ',
    letterLower: 'ⲡ',
    nameAr: 'بي',
    pronunciationAr: 'ب ثقيلة مشددة',
    soundFile: 'audio_coptic/17pee.mp3',
    info: 'الحرف السابع عشر. يُنطق "ب" شديدة مشددة مثل حرف (P) في اللغة الإنجليزية.',
    wordCoptic: 'ⲡⲉ',
    wordPhoneticAr: 'بي',
    wordMeaning: 'سماء',
    wrongMeanings: ['أرض', 'ماء', 'نار'],
    wrongLetterPron: ['أُو (واو قصيرة)', 'سيما (س)', 'تاف (ت)']
  },
  {
    unitIndex: 4,
    letterUpper: 'Ⲣ',
    letterLower: 'ⲣ',
    nameAr: 'رو',
    pronunciationAr: 'ر',
    soundFile: 'audio_coptic/18roo.mp3',
    info: 'الحرف الثامن عشر. يُنطق حرف "ر" دائماً.',
    wordCoptic: 'ⲣⲱⲙⲓ',
    wordPhoneticAr: 'رومي',
    wordMeaning: 'إنسان',
    wrongMeanings: ['ملاك', 'حيوان', 'شجر'],
    wrongLetterPron: ['بي (ب مشددة)', 'سيما (س)', 'خي (خ)']
  },
  {
    unitIndex: 4,
    letterUpper: 'Ⲥ',
    letterLower: 'ⲥ',
    nameAr: 'سيما',
    pronunciationAr: 'س',
    soundFile: 'audio_coptic/19sema.mp3',
    info: 'الحرف التاسع عشر. يُنطق حرف "س" دائماً.',
    wordCoptic: 'ⲥⲱ',
    wordPhoneticAr: 'سو',
    wordMeaning: 'يشرب',
    wrongMeanings: ['يأكل', 'ينام', 'يمشي'],
    wrongLetterPron: ['رو (ر)', 'تاف (ت)', 'في (ف)']
  },
  {
    unitIndex: 4,
    letterUpper: 'Ⲧ',
    letterLower: 'ⲧ',
    nameAr: 'تاف',
    pronunciationAr: 'ت',
    soundFile: 'audio_coptic/20tav.mp3',
    info: 'الحرف العشرون في الأبجدية القبطية. يُنطق حرف "ت" دائماً.',
    wordCoptic: 'ⲧⲱⲟⲩ',
    wordPhoneticAr: 'توو',
    wordMeaning: 'جبل',
    wrongMeanings: ['وادي', 'نهر', 'صحراء'],
    wrongLetterPron: ['سيما (س)', 'إبسيلون (ي/و)', 'شاي (ش)']
  },

  // الوحدة 5 (Ⲩ - Ⲱ)
  {
    unitIndex: 5,
    letterUpper: 'Ⲩ',
    letterLower: 'ⲩ',
    nameAr: 'إبسيلون',
    pronunciationAr: 'ي أو ڤ أو و',
    soundFile: 'audio_coptic/21epselon.mp3',
    info: 'الحرف الحادي والعشرون. حرف متحرك ينطق "ڤ" بعد Ⲁ أو Ⲉ، وينطق "و" طويلة بعد Ⲟ (ⲟⲩ)، وينطق "ي" في الحالات الأخرى.',
    wordCoptic: 'ⲩⲓⲟⲥ',
    wordPhoneticAr: 'إيوس',
    wordMeaning: 'ابن',
    wrongMeanings: ['أب', 'أم', 'أخ'],
    wrongLetterPron: ['في (ف)', 'خي (خ أو ك)', 'إبسي (بـ+س)']
  },
  {
    unitIndex: 5,
    letterUpper: 'Ⲫ',
    letterLower: 'ⲫ',
    nameAr: 'في',
    pronunciationAr: 'ف',
    soundFile: 'audio_coptic/22fi.mp3',
    info: 'الحرف الثاني والعشرون. يُنطق حرف "ف" دائماً.',
    wordCoptic: 'ⲫⲟⲟⲩ',
    wordPhoneticAr: 'إفهو',
    wordMeaning: 'اليوم / النهار',
    wrongMeanings: ['أمس', 'غداً', 'الليل'],
    wrongLetterPron: ['إبسيلون (ي/و)', 'خي (خ أو ك)', 'أوميغا (واو طويلة)']
  },
  {
    unitIndex: 5,
    letterUpper: 'Ⲭ',
    letterLower: 'ⲭ',
    nameAr: 'خي',
    pronunciationAr: 'خ أو ك أو ش',
    soundFile: 'audio_coptic/23ki.mp3',
    info: 'الحرف الثالث والعشرون. يُنطق "ك" في الكلمات القبطية، ويُنطق "خ" أو "ش" في الكلمات ذات الأصل اليوناني.',
    wordCoptic: 'ⲭⲣⲓⲥⲧⲟⲥ',
    wordPhoneticAr: 'خريستوس',
    wordMeaning: 'المسيح',
    wrongMeanings: ['المعلم', 'الملك', 'المخلص'],
    wrongLetterPron: ['في (ف)', 'إبسي (بـ+س)', 'هوري (هـ)']
  },
  {
    unitIndex: 5,
    letterUpper: 'Ⲯ',
    letterLower: 'ⲯ',
    nameAr: 'إبسي',
    pronunciationAr: 'بـ + س',
    soundFile: 'audio_coptic/24psi.mp3',
    info: 'الحرف الرابع والعشرون. حرف مركب يُنطق باء وسين معاً في صوت واحد (بـ + س = Ps).',
    wordCoptic: 'ⲯⲁⲗⲙⲟⲥ',
    wordPhoneticAr: 'بصالموس',
    wordMeaning: 'مزمور',
    wrongMeanings: ['صلاة', 'إنجيل', 'ترنيمة'],
    wrongLetterPron: ['خي (خ أو ك)', 'أوميغا (واو طويلة)', 'جانجا (ج)']
  },
  {
    unitIndex: 5,
    letterUpper: 'Ⲱ',
    letterLower: 'ⲱ',
    nameAr: 'أوميغا (أو طويلة)',
    pronunciationAr: 'واو طويلة ممدودة',
    soundFile: 'audio_coptic/25oo.mp3',
    info: 'الحرف الخامس والعشرون. آخر الحروف المأخوذة من اليونانية. يُنطق واواً طويلة ومفتوحة (Ō).',
    wordCoptic: 'ⲱⲛϧ',
    wordPhoneticAr: 'أونخ',
    wordMeaning: 'حياة',
    wrongMeanings: ['موت', 'سلام', 'فرح'],
    wrongLetterPron: ['إبسي (بـ+س)', 'شاي (ش)', 'فاي (ف)']
  },

  // الوحدة 6 (Ϣ - Ϫ)
  {
    unitIndex: 6,
    letterUpper: 'Ϣ',
    letterLower: 'ϣ',
    nameAr: 'شاي',
    pronunciationAr: 'ش',
    soundFile: 'audio_coptic/26shay.mp3',
    info: 'الحرف السادس والعشرون. أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم. يُنطق حرف "ش" دائماً.',
    wordCoptic: 'ϣⲏⲣⲓ',
    wordPhoneticAr: 'شيري',
    wordMeaning: 'ابن / صبي',
    wrongMeanings: ['بنت', 'رجل', 'شيخ'],
    wrongLetterPron: ['فاي (ف)', 'خاي (خ)', 'هوري (هـ)']
  },
  {
    unitIndex: 6,
    letterUpper: 'Ϥ',
    letterLower: 'ϥ',
    nameAr: 'فاي',
    pronunciationAr: 'ف',
    soundFile: 'audio_coptic/27fay.mp3',
    info: 'الحرف السابع والعشرون. حرف مصري ديموطيقي أصيل يُنطق "ف".',
    wordCoptic: 'ϥⲱⲓ',
    wordPhoneticAr: 'فوي',
    wordMeaning: 'شعر (شعر الرأس)',
    wrongMeanings: ['عين', 'يد', 'قدم'],
    wrongLetterPron: ['شاي (ش)', 'خاي (خ)', 'جانجا (ج)']
  },
  {
    unitIndex: 6,
    letterUpper: 'Ϧ',
    letterLower: 'ϧ',
    nameAr: 'خاي',
    pronunciationAr: 'خ',
    soundFile: 'audio_coptic/28khay.mp3',
    info: 'الحرف الثامن والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف "خ" دائماً.',
    wordCoptic: 'ϧⲏⲧ',
    wordPhoneticAr: 'خيت',
    wordMeaning: 'قلب',
    wrongMeanings: ['عقل', 'روح', 'جسد'],
    wrongLetterPron: ['فاي (ف)', 'هوري (هـ)', 'تشيما (تش)']
  },
  {
    unitIndex: 6,
    letterUpper: 'Ϩ',
    letterLower: 'ϩ',
    nameAr: 'هوري',
    pronunciationAr: 'هـ',
    soundFile: 'audio_coptic/29hory.mp3',
    info: 'الحرف التاسع والعشرون. حرف مصري ديموطيقي أصيل يُنطق حرف "هـ" دائماً.',
    wordCoptic: 'ϩⲱⲃ',
    wordPhoneticAr: 'هوب',
    wordMeaning: 'عمل / شيء',
    wrongMeanings: ['راحة', 'كلام', 'فكر'],
    wrongLetterPron: ['خاي (خ)', 'جانجا (ج)', 'تي (تـ+ي)']
  },
  {
    unitIndex: 6,
    letterUpper: 'Ϫ',
    letterLower: 'ϫ',
    nameAr: 'جانجا',
    pronunciationAr: 'ج (معطشة أو غير معطشة)',
    soundFile: 'audio_coptic/30ganga.mp3',
    info: 'الحرف الثلاثون. حرف مصري ديموطيقي أصيل. يُنطق "ج" معطشة قبل المتحرك للكسر، و"ج" غير معطشة في الحالات الأخرى.',
    wordCoptic: 'ϫⲱ',
    wordPhoneticAr: 'جو',
    wordMeaning: 'رأس / يقول',
    wrongMeanings: ['قدم', 'لسان', 'عين'],
    wrongLetterPron: ['هوري (هـ)', 'تشيما (تش)', 'تي (تـ+ي)']
  },

  // الوحدة 7 (Ϭ - Ϯ)
  {
    unitIndex: 7,
    letterUpper: 'Ϭ',
    letterLower: 'ϭ',
    nameAr: 'تشيما',
    pronunciationAr: 'تش',
    soundFile: 'audio_coptic/31chema.mp3',
    info: 'الحرف الحادي والثلاثون. الحرف السادس من الحروف المصرية الديموطيقية، يُنطق تاء وشين معاً (تش) دائماً.',
    wordCoptic: 'ϭⲟⲓⲥ',
    wordPhoneticAr: 'تشويس',
    wordMeaning: 'رب / سيد',
    wrongMeanings: ['عبد', 'خادم', 'ملك'],
    wrongLetterPron: ['جانجا (ج)', 'تي (تـ+ي)', 'شاي (ش)']
  },
  {
    unitIndex: 7,
    letterUpper: 'Ϯ',
    letterLower: 'ϯ',
    nameAr: 'تي',
    pronunciationAr: 'تـ + ي',
    soundFile: 'audio_coptic/32tee.mp3',
    info: 'الحرف الثاني والثلاثون والأخير في الأبجدية القبطية. مقطع صوتي مركب ينطق تاء وياء معاً (تـ + ي = Ti).',
    wordCoptic: 'ϯⲙⲏⲓ',
    wordPhoneticAr: 'تيمي',
    wordMeaning: 'الحق / العدل',
    wrongMeanings: ['الباطل', 'السلام', 'النعمة'],
    wrongLetterPron: ['تشيما (تش)', 'هوري (هـ)', 'خاي (خ)']
  }
];

const UNITS_DATA = [
  { id: 1, title: 'الوحدة ١: الحروف الأولى (Ⲁ – Ⲉ)', badge: 'Ⲁ-Ⲉ', description: 'تعلّم كتابة ونطق أول 5 حروف في الأبجدية القبطية' },
  { id: 2, title: 'الوحدة ٢: الحروف من (Ⲋ – Ⲓ)', badge: 'Ⲋ-Ⲓ', description: 'تعلّم الرمز العددي سو والحروف من زاتا إلى إيوتا' },
  { id: 3, title: 'الوحدة ٣: الحروف من (Ⲕ – Ⲝ)', badge: 'Ⲕ-Ⲝ', description: 'تعلّم الحروف من كابا إلى كسي مع كلمات كنسية شهيرة' },
  { id: 4, title: 'الوحدة ٤: الحروف من (Ⲟ – Ⲧ)', badge: 'Ⲟ-Ⲧ', description: 'تعلّم الحروف من أُو قصيرة إلى تاف' },
  { id: 5, title: 'الوحدة ٥: الحروف من (Ⲩ – Ⲱ)', badge: 'Ⲩ-Ⲱ', description: 'تعلّم الحروف من إبسيلون إلى أوميغا خاتمة الحروف اليونانية' },
  { id: 6, title: 'الوحدة ٦: الحروف المصرية الأصيلة (Ϣ – Ϫ)', badge: 'Ϣ-Ϫ', description: 'الحروف الديموطيقية السبعة الخاصة باللغة المصرية القديمة' },
  { id: 7, title: 'الوحدة ٧: الحروف الختامية والمراجعة الكبرى (Ϭ – Ϯ)', badge: 'Ϭ-Ϯ', description: 'ختام الأبجدية واختبار إتقان الـ 32 حرفاً القبطية بالكامل' }
];

async function postJson(endpoint, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to POST to ${endpoint} (${res.status}): ${txt}`);
  }
  const json = await res.json();
  return Array.isArray(json) ? json[0] : json;
}

async function seed() {
  console.log('🚀 Starting Curriculum Re-seed with Arabic Phonetics...');

  // 1. تنظيف البيانات القديمة
  console.log('🧹 Cleaning old challenges, lessons, chests, units...');
  await fetch(`${SUPABASE_URL}/rest/v1/challenge_options?id=gt.0`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/challenges?id=gt.0`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/lessons?id=gt.0`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/chests?level_id=gt.0`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/units?id=gt.0`, { method: 'DELETE', headers });

  // 2. التحقق من وجود المستوى الأول
  const lvlRes = await fetch(`${SUPABASE_URL}/rest/v1/levels?select=*`, { headers });
  const levels = await lvlRes.json();
  let levelId = 5;
  if (Array.isArray(levels) && levels.length > 0) {
    levelId = levels[0].id;
    await fetch(`${SUPABASE_URL}/rest/v1/levels?id=eq.${levelId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        title: 'المستوى الأول: الأبجدية القبطية الكاملة',
        description: 'تعلّم قراءة وكتابة ونطق الـ ٣٢ حرفاً القبطية وتكوين الكلمات خطوة بخطوة',
        order_index: 1
      })
    });
  }
  console.log(`✅ Target Level ID: ${levelId}`);

  // 3. إنشاء الوحدات
  const unitMap = {};
  for (let i = 0; i < UNITS_DATA.length; i++) {
    const u = UNITS_DATA[i];
    const created = await postJson('units', {
      level_id: levelId,
      title: u.title,
      badge: u.badge,
      description: u.description,
      order_index: i + 1
    });
    unitMap[i + 1] = created.id;
    console.log(`📁 Created Unit ${i + 1}: ${u.title} (ID: ${created.id})`);
  }

  // 4. إنشاء دروس الحروف وتحدياتها الـ 5
  let totalLessonsCreated = 0;
  let totalChallengesCreated = 0;
  const unitLessonsList = {};

  for (let i = 0; i < LETTERS_DATA.length; i++) {
    const item = LETTERS_DATA[i];
    const uIndex = item.unitIndex;
    const dbUnitId = unitMap[uIndex];
    if (!unitLessonsList[uIndex]) unitLessonsList[uIndex] = [];

    const lessonOrder = unitLessonsList[uIndex].length + 1;
    const lessonTitle = `حرف ${item.nameAr} (${item.letterUpper} ${item.letterLower})`;

    const dbLesson = await postJson('lessons', {
      unit_id: dbUnitId,
      title: lessonTitle,
      xp_reward: 5,
      practice_xp: 1,
      challenge_xp: 5,
      order_index: lessonOrder
    });
    unitLessonsList[uIndex].push(dbLesson);
    totalLessonsCreated++;

    const lesId = dbLesson.id;
    const glyphPair = `${item.letterUpper} ${item.letterLower}`;

    // صياغة النبذة الشاملة بالعربي مع القبطي المعرب
    const explanationText = `• اسم الحرف: ${item.nameAr}\n• نطق الحرف بالعربي: ${item.pronunciationAr}\n• قواعد النطق: ${item.info}\n────────────────────\n• كلمة تطبيقية على الحرف:\n  - الكلمة بالقبطية: ${item.wordCoptic}\n  - القبطي المعرب (نطقها): «${item.wordPhoneticAr}»\n  - المعنى بالعربية: ${item.wordMeaning}\n\n(اضغط على زر الصوت للاستماع لنطق الحرف)`;

    // -------------------------------------------------------------
    // الخطوة 1: نبذة عن الحرف (0 نقطة)
    // -------------------------------------------------------------
    await postJson('challenges', {
      lesson_id: lesId,
      type: 'text_view',
      question: `نبذة عن حرف ${item.nameAr} (${glyphPair})`,
      coptic_display: glyphPair,
      audio_text: item.nameAr,
      audio_url: item.soundFile,
      correct_word: explanationText,
      order_index: 1
    });
    totalChallengesCreated++;

    // -------------------------------------------------------------
    // الخطوة 2: تعليم كتابة الحرف الكبير (كابيتال) ونطقه (trace)
    // -------------------------------------------------------------
    await postJson('challenges', {
      lesson_id: lesId,
      type: 'trace',
      question: `تتبّع كتابة الحرف الكبير (كابيتال): ${item.letterUpper} واستمع لنطقه`,
      coptic_display: item.letterUpper,
      audio_text: `${item.nameAr} كابيتال`,
      audio_url: item.soundFile,
      order_index: 2
    });
    totalChallengesCreated++;

    // -------------------------------------------------------------
    // الخطوة 3: تعليم كتابة الحرف الصغير (سمول) ونطقه (trace)
    // -------------------------------------------------------------
    await postJson('challenges', {
      lesson_id: lesId,
      type: 'trace',
      question: `تتبّع كتابة الحرف الصغير (سمول): ${item.letterLower} واستمع لنطقه`,
      coptic_display: item.letterLower,
      audio_text: `${item.nameAr} سمول`,
      audio_url: item.soundFile,
      order_index: 3
    });
    totalChallengesCreated++;

    // -------------------------------------------------------------
    // الخطوة 4: النطق بالعربي (read_select)
    // -------------------------------------------------------------
    const ch3 = await postJson('challenges', {
      lesson_id: lesId,
      type: 'read_select',
      question: `ما هو نطق الحرف ${item.letterUpper} بالعربية؟`,
      coptic_display: item.letterUpper,
      audio_text: item.nameAr,
      audio_url: item.soundFile,
      order_index: 4
    });
    totalChallengesCreated++;

    function cleanOptText(txt) {
      if (!txt) return '';
      let s = String(txt).trim();
      if (s.includes('ينطق:')) return s.split('ينطق:')[1].replace(/\s*\([^)]*\)/g, '').replace(/[a-zA-Z]/g, '').trim();
      if (s.includes('—')) return s.split('—')[1].replace(/\s*\([^)]*\)/g, '').replace(/[a-zA-Z]/g, '').trim();
      const pIdx = s.indexOf('(');
      if (pIdx > 0 && s.endsWith(')')) {
        const inside = s.substring(pIdx + 1, s.length - 1).trim();
        if (/[\u0600-\u06FF]/.test(inside) && !/[a-zA-Z]/.test(inside)) {
          return inside;
        }
      }
      return s.replace(/\s*\([a-zA-Z\s+-]+\)/g, '').replace(/[a-zA-Z]/g, '').trim();
    }

    const optPron = [
      { text: cleanOptText(item.pronunciationAr), is_correct: true },
      { text: cleanOptText(item.wrongLetterPron[0]), is_correct: false },
      { text: cleanOptText(item.wrongLetterPron[1]), is_correct: false },
      { text: cleanOptText(item.wrongLetterPron[2]), is_correct: false }
    ].sort(() => Math.random() - 0.5);

    for (const opt of optPron) {
      await postJson('challenge_options', { challenge_id: ch3.id, text: opt.text, is_correct: opt.is_correct });
    }

    // -------------------------------------------------------------
    // الخطوة 5: كلمة: صوت وقبطي معرب ومعناها (select)
    // -------------------------------------------------------------
    const ch4 = await postJson('challenges', {
      lesson_id: lesId,
      type: 'select',
      question: `ما معنى الكلمة القبطية: ${item.wordCoptic}؟ (المعرب: «${item.wordPhoneticAr}»)`,
      coptic_display: item.wordCoptic,
      audio_text: item.wordPhoneticAr,
      audio_url: item.soundFile,
      order_index: 5
    });
    totalChallengesCreated++;

    const optWord = [
      { text: item.wordMeaning, is_correct: true },
      { text: item.wrongMeanings[0], is_correct: false },
      { text: item.wrongMeanings[1], is_correct: false },
      { text: item.wrongMeanings[2], is_correct: false }
    ].sort(() => Math.random() - 0.5);

    for (const opt of optWord) {
      await postJson('challenge_options', { challenge_id: ch4.id, text: opt.text, is_correct: opt.is_correct });
    }

    // -------------------------------------------------------------
    // الخطوة 6: ترتيب حروف الكلمة من اليسار لليمين (write)
    // -------------------------------------------------------------
    const wordClean = item.wordCoptic.trim();
    const tilesArray = Array.from(wordClean);
    await postJson('challenges', {
      lesson_id: lesId,
      type: 'write',
      question: `رتب حروف الكلمة القبطية لتكوين: ${item.wordMeaning} (المعرب: «${item.wordPhoneticAr}»)`,
      coptic_display: item.wordCoptic,
      audio_text: item.wordPhoneticAr,
      audio_url: item.soundFile,
      correct_word: wordClean,
      tiles: tilesArray,
      order_index: 6
    });
    totalChallengesCreated++;

    console.log(`  ✓ Lesson: ${lessonTitle} with Arabic pronunciation & transliteration`);
  }

  // 5. مراجعة كل وحدة وصناديق الكنز
  for (let uIndex = 1; uIndex <= 7; uIndex++) {
    const dbUnitId = unitMap[uIndex];
    const unitLetters = LETTERS_DATA.filter(l => l.unitIndex === uIndex);
    const revOrder = unitLessonsList[uIndex].length + 1;
    const revTitle = uIndex === 7 ? '🔄 مراجعة شاملة للأبجدية القبطية' : `🔄 مراجعة الوحدة ${uIndex}`;

    const revLesson = await postJson('lessons', {
      unit_id: dbUnitId,
      title: revTitle,
      xp_reward: 5,
      practice_xp: 1,
      challenge_xp: 5,
      order_index: revOrder
    });
    unitLessonsList[uIndex].push(revLesson);
    totalLessonsCreated++;

    // 1. match
    const matchPairs = unitLetters.slice(0, 4).map(l => ({
      left: `${l.letterUpper} ${l.letterLower}`,
      right: `${l.nameAr} (${l.pronunciationAr})`
    }));

    await postJson('challenges', {
      lesson_id: revLesson.id,
      type: 'match',
      question: `صل بين كل حرف قبطي ونطقه بالعربية`,
      pairs: matchPairs,
      order_index: 1
    });
    totalChallengesCreated++;

    // 2. listen
    const targetL = unitLetters[0];
    const listenCh = await postJson('challenges', {
      lesson_id: revLesson.id,
      type: 'listen',
      question: `استمع إلى نطق الحرف ثم اختر الحرف المطابق`,
      audio_text: targetL.nameAr,
      audio_url: targetL.soundFile,
      order_index: 2
    });
    totalChallengesCreated++;

    const optListen = [
      { text: `${targetL.letterUpper} ${targetL.letterLower} (${targetL.nameAr})`, is_correct: true },
      ...unitLetters.slice(1, 4).map(l => ({ text: `${l.letterUpper} ${l.letterLower} (${l.nameAr})`, is_correct: false }))
    ].sort(() => Math.random() - 0.5);

    for (const opt of optListen) {
      await postJson('challenge_options', { challenge_id: listenCh.id, text: opt.text, is_correct: opt.is_correct });
    }

    // 3. select word
    const wordTarget = unitLetters[1] || unitLetters[0];
    const wordCh = await postJson('challenges', {
      lesson_id: revLesson.id,
      type: 'select',
      question: `ما معنى الكلمة: ${wordTarget.wordCoptic}؟ (المعرب: «${wordTarget.wordPhoneticAr}»)`,
      coptic_display: wordTarget.wordCoptic,
      audio_text: wordTarget.wordPhoneticAr,
      audio_url: wordTarget.soundFile,
      order_index: 3
    });
    totalChallengesCreated++;

    const optW = [
      { text: wordTarget.wordMeaning, is_correct: true },
      { text: wordTarget.wrongMeanings[0], is_correct: false },
      { text: wordTarget.wrongMeanings[1], is_correct: false },
      { text: wordTarget.wrongMeanings[2], is_correct: false }
    ].sort(() => Math.random() - 0.5);

    for (const opt of optW) {
      await postJson('challenge_options', { challenge_id: wordCh.id, text: opt.text, is_correct: opt.is_correct });
    }

    // 4. write word
    const targetWrite = unitLetters[unitLetters.length - 1];
    await postJson('challenges', {
      lesson_id: revLesson.id,
      type: 'write',
      question: `رتب حروف الكلمة: ${targetWrite.wordMeaning} (المعرب: «${targetWrite.wordPhoneticAr}»)`,
      coptic_display: targetWrite.wordCoptic,
      audio_text: targetWrite.wordPhoneticAr,
      audio_url: targetWrite.soundFile,
      correct_word: targetWrite.wordCoptic.trim(),
      tiles: Array.from(targetWrite.wordCoptic.trim()),
      order_index: 4
    });
    totalChallengesCreated++;

    // 5. read_select
    const readTarget = unitLetters[2] || unitLetters[0];
    const readCh = await postJson('challenges', {
      lesson_id: revLesson.id,
      type: 'read_select',
      question: `ما هو نطق الحرف القبطي: ${readTarget.letterUpper}؟`,
      coptic_display: readTarget.letterUpper,
      audio_text: readTarget.nameAr,
      audio_url: readTarget.soundFile,
      order_index: 5
    });
    totalChallengesCreated++;

    const optR = [
      { text: `${readTarget.nameAr} (${readTarget.pronunciationAr})`, is_correct: true },
      { text: `${readTarget.wrongLetterPron[0]}`, is_correct: false },
      { text: `${readTarget.wrongLetterPron[1]}`, is_correct: false },
      { text: `${readTarget.wrongLetterPron[2]}`, is_correct: false }
    ].sort(() => Math.random() - 0.5);

    for (const opt of optR) {
      await postJson('challenge_options', { challenge_id: readCh.id, text: opt.text, is_correct: opt.is_correct });
    }

    console.log(`  🌟 Review Lesson created for Unit ${uIndex}`);

    // صندوق الكنز
    const isLevelFinal = (uIndex === 7);
    const chestId = `chest_unit_${uIndex}`;
    const chestPayload = {
      id: chestId,
      level_id: levelId,
      unit_id: dbUnitId,
      title: isLevelFinal ? '🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول' : `🎁 صندوق كنز الوحدة ${uIndex}`,
      description: isLevelFinal ? 'تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!' : `مكافأة إتمام دروس ومراجعة الوحدة ${uIndex}`,
      placement_type: 'unit_end',
      after_lesson_id: revLesson.id,
      xp_mode: 'fixed',
      xp_min: isLevelFinal ? 50 : 10,
      xp_max: isLevelFinal ? 50 : 10,
      hearts: isLevelFinal ? 3 : 1,
      has_badge: isLevelFinal,
      badge_title: isLevelFinal ? 'متقن الأبجدية القبطية' : '',
      badge_icon: isLevelFinal ? 'trophy' : 'gift',
      badge_desc: isLevelFinal ? 'أتممت المستوى الأول للأبجدية القبطية كاملاً (٣٢ حرفاً)' : ''
    };

    await postJson('chests', chestPayload);
    try {
      await postJson('chest_config', {
        chest_id: chestId,
        xp_reward: isLevelFinal ? 50 : 10,
        hearts_reward: isLevelFinal ? 3 : 1
      });
    } catch (_) {}

    console.log(`  🎁 Chest created: ${chestPayload.title}`);
  }

  // الوحدة السابعة: إضافة درس الاختبار النهائي
  const u7UnitId = unitMap[7];
  const examLesson = await postJson('lessons', {
    unit_id: u7UnitId,
    title: '🎓 الاختبار النهائي الشامل للمستوى الأول',
    xp_reward: 5,
    practice_xp: 1,
    challenge_xp: 5,
    order_index: unitLessonsList[7].length + 1
  });
  totalLessonsCreated++;

  // 1. match
  await postJson('challenges', {
    lesson_id: examLesson.id,
    type: 'match',
    question: `صل الحرف بنطقه الصحيح بالعربية`,
    pairs: [
      { left: 'Ⲁ ⲁ', right: 'ألفا (أ)' },
      { left: 'Ⲕ ⲕ', right: 'كابا (ك)' },
      { left: 'ⲭ ⲭ', right: 'خي (خ/ك/ش)' },
      { left: 'Ϯ ϯ', right: 'تي (تـ+ي)' }
    ],
    order_index: 1
  });
  totalChallengesCreated++;

  // 2. listen
  const exListen = await postJson('challenges', {
    lesson_id: examLesson.id,
    type: 'listen',
    question: `استمع واختر الحرف الصحيح`,
    audio_text: 'ألفا',
    audio_url: 'audio_coptic/1alfa.mp3',
    order_index: 2
  });
  totalChallengesCreated++;
  for (const opt of [
    { text: 'Ⲁ ⲁ (ألفا)', is_correct: true },
    { text: 'Ⲃ ⲃ (فيدا)', is_correct: false },
    { text: 'Ⲅ ⲅ (غاما)', is_correct: false },
    { text: 'Ⲇ ⲇ (دلدا)', is_correct: false }
  ]) {
    await postJson('challenge_options', { challenge_id: exListen.id, text: opt.text, is_correct: opt.is_correct });
  }

  // 3. select word
  const exWord = await postJson('challenges', {
    lesson_id: examLesson.id,
    type: 'select',
    question: `ما معنى الكلمة القبطية: ⲛⲟⲩϯ؟ (المعرب: «نوتي»)`,
    coptic_display: 'ⲛⲟⲩϯ',
    audio_text: 'نوتي',
    audio_url: 'audio_coptic/14ni.mp3',
    order_index: 3
  });
  totalChallengesCreated++;
  for (const opt of [
    { text: 'الله', is_correct: true },
    { text: 'السماء', is_correct: false },
    { text: 'الملاك', is_correct: false },
    { text: 'الكنيسة', is_correct: false }
  ]) {
    await postJson('challenge_options', { challenge_id: exWord.id, text: opt.text, is_correct: opt.is_correct });
  }

  // 4. select total letters count
  const exCount = await postJson('challenges', {
    lesson_id: examLesson.id,
    type: 'select',
    question: `كم عدد حروف الأبجدية القبطية كاملة؟`,
    order_index: 4
  });
  totalChallengesCreated++;
  for (const opt of [
    { text: '٣٢ حرفاً', is_correct: true },
    { text: '٢٨ حرفاً', is_correct: false },
    { text: '٢٦ حرفاً', is_correct: false },
    { text: '٣٠ حرفاً', is_correct: false }
  ]) {
    await postJson('challenge_options', { challenge_id: exCount.id, text: opt.text, is_correct: opt.is_correct });
  }

  // 5. write word
  await postJson('challenges', {
    lesson_id: examLesson.id,
    type: 'write',
    question: `رتب حروف الكلمة القبطية: ولد (المعرب: «أَلو») [ⲁⲗⲟⲩ]`,
    coptic_display: 'ⲁⲗⲟⲩ',
    audio_text: 'أَلو',
    audio_url: 'audio_coptic/1alfa.mp3',
    correct_word: 'ⲁⲗⲟⲩ',
    tiles: ['ⲁ', 'ⲗ', 'ⲟ', 'ⲩ'],
    order_index: 5
  });
  totalChallengesCreated++;

  console.log(`\n🎉 SEED WITH ARABIC PHONETICS COMPLETED SUCCESSFULLY!`);
  console.log(`📊 Statistics:`);
  console.log(`   - Units: 7`);
  console.log(`   - Lessons: ${totalLessonsCreated}`);
  console.log(`   - Challenges: ${totalChallengesCreated}`);
}

seed().catch(err => {
  console.error('❌ Seed Failed:', err);
  process.exit(1);
});
