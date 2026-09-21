/**
 * COPTIC_LETTERS_CATALOG
 * الدليل الشامل لـ 32 حرفاً للأبجدية القبطية وفقاً لمنهج التربية الكنسية للكنيسة القبطية الأرثوذكسية
 * يحتوي على:
 * - اسم الحرف ونطقه بالعربي
 * - هل هو حرف متحرك أم ساكن (مع تصنيف المتحرك: فتح / كسر / ضم)
 * - تفاصيل حالات النطق إن كان له أكثر من نطق
 * - نبذة عن الكلمة التطبيقية (الكلمة بالقبطية، القبطي المعرب، المعنى بالعربي، النطق السماعي)
 */

(function () {
  const CATALOG = [
    // الوحدة 1 (Ⲁ - Ⲉ)
    {
      id: 1, upper: 'Ⲁ', lower: 'ⲁ', pair: 'Ⲁ ⲁ', name: 'ألفا',
      isVowel: true, vowelType: 'متحرك للفتح', letterTypeBadge: 'حرف متحرك (للفتح)',
      badgeClass: 'badge-vowel',
      pronunciation: 'أ ، ا',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'الحرف الأول في الأبجدية القبطية. يُنطق دائماً ألفاً مفتوحة مشبعة ممدودة مثل حرف الألف في كلمتي <strong>(باب)</strong> و<strong>(قال)</strong>.'
      ],
      word: { coptic: 'ⲁⲗⲱⲙ', phoneticAr: 'آلُـومْ', meaning: 'جبنة', soundFile: 'assets/sounds/1alom.mp3' },
      soundFile: 'audio_coptic/1alfa.mp3'
    },
    {
      id: 2, upper: 'Ⲃ', lower: 'ⲃ', pair: 'Ⲃ ⲃ', name: 'بيتا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ب، ف',
      hasMultiple: true,
      multipleCountText: 'له نطقان (ڤ / ب)',
      rules: [
        'يُنطق <strong>(ڤ)</strong>: إذا جاء بعده أي حرف متحرك (Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲱ, Ⲩ) مثل نطق الفاء بثلاث نقاط في كلمة <strong>(ڤيديو)</strong>.',
        'يُنطق <strong>(ب)</strong>: إذا لم يأتِ بعده حرف متحرك، أو إذا جاء في نهاية الكلمة مثل حرف الباء في كلمة <strong>(كتاب)</strong>.'
      ],
      word: { coptic: 'ⲃⲱ', phoneticAr: 'ڤُـو', meaning: 'شجرة', soundFile: 'assets/sounds/2vo.mp3' },
      soundFile: 'audio_coptic/2veta.mp3'
    },
    {
      id: 3, upper: 'Ⲅ', lower: 'ⲅ', pair: 'Ⲅ ⲅ', name: 'غما',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ج، غ، ن',
      hasMultiple: true,
      multipleCountText: 'له 3 أصوات (جـ / ن / غ)',
      rules: [
        'يُنطق <strong>(جـ معطشة)</strong>: في الكلمات اليونانية إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).',
        'يُنطق <strong>(ن)</strong>: إذا جاء بعده أحد الحروف الحلقية (Ⲅ, Ⲕ, Ⲭ, Ⲝ).',
        'يُنطق <strong>(غ)</strong>: في الكلمات القبطية، وفي الكلمات اليونانية في باقي الحالات.'
      ],
      word: { coptic: 'ⲅⲁⲗⲁ', phoneticAr: 'غَـالَا', meaning: 'لبن', soundFile: 'assets/sounds/3ghala.mp3' },
      soundFile: 'audio_coptic/3ghamma.mp3'
    },
    {
      id: 4, upper: 'Ⲇ', lower: 'ⲇ', pair: 'Ⲇ ⲇ', name: 'دلتا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'د، ذ',
      hasMultiple: true,
      multipleCountText: 'له نطقان (د / ذ)',
      rules: [
        'يُنطق <strong>(د)</strong>: في أسماء الأعلام والأشخاص والبلاد، وفي الكلمات القبطية الأصل.',
        'يُنطق <strong>(ذ)</strong>: في باقي الكلمات ذات الأصل اليوناني.'
      ],
      word: { coptic: 'Ⲇⲟⲝⲁ', phoneticAr: 'ذُوكْصَـا', meaning: 'مجد', soundFile: 'assets/sounds/4zoksa.mp3' },
      soundFile: 'audio_coptic/4delta.mp3'
    },
    {
      id: 5, upper: 'Ⲉ', lower: 'ⲉ', pair: 'Ⲉ ⲉ', name: 'إي',
      isVowel: true, vowelType: 'متحرك للكسر (خفيف)', letterTypeBadge: 'حرف متحرك (للكسر خفيف)',
      badgeClass: 'badge-vowel',
      pronunciation: 'إمالة صغيرة',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للكسر الخفيف، يُنطق فتحة مائلة للكسر (إمالة خفيفة كالياء اللينة) مثل حركة الياء في كلمتي <strong>(إلى)</strong> و<strong>(على)</strong>.'
      ],
      word: { coptic: 'ⲉ̀ⲣϫⲱ', phoneticAr: 'إِرْجُـو', meaning: 'دجاجة', soundFile: 'assets/sounds/5ergoh.mp3' },
      soundFile: 'audio_coptic/5ei.mp3'
    },

    // الوحدة 2 (Ⲋ - Ⲓ)
    {
      id: 6, upper: 'Ⲋ', lower: 'ⲋ', pair: 'Ⲋ ⲋ', name: 'سوو',
      isVowel: false, vowelType: null, letterTypeBadge: 'رقم عددي رمزي',
      badgeClass: 'badge-symbol',
      pronunciation: 'للعدد 6',
      hasMultiple: false,
      multipleCountText: 'نطق واحد',
      rules: [
        'ليس حرفاً هجائياً أصيلاً بل رمز ورقم عددي يدل على <strong>الرقم ستة (٦)</strong>. يوضع فوقه شرطة أفقية لتمييزه كرقم، ويُنطق <strong>"سو"</strong>.'
      ],
      word: { coptic: 'ⲋ̅ ⲛ̀ⲣⲱⲙⲓ', phoneticAr: 'سُـوآوُو إِنْ رُومِي', meaning: '6 رجال', soundFile: 'assets/sounds/6soohinrpmy.mp3' },
      soundFile: 'audio_coptic/6sow.mp3'
    },
    {
      id: 7, upper: 'Ⲍ', lower: 'ⲍ', pair: 'Ⲍ ⲍ', name: 'زيتا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ز',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف زين <strong>"ز"</strong> صريحاً في جميع الكلمات والمواضع مثل حرف الزاي في كلمة <strong>(زهرة)</strong>.'
      ],
      word: { coptic: 'Ⲍⲱⲏ', phoneticAr: 'زُوئِي', meaning: 'حياة', soundFile: 'assets/sounds/7zowy.mp3' },
      soundFile: 'audio_coptic/7zeta.mp3'
    },
    {
      id: 8, upper: 'Ⲏ', lower: 'ⲏ', pair: 'Ⲏ ⲏ', name: 'إيتا',
      isVowel: true, vowelType: 'متحرك للكسر (طويل ممدود)', letterTypeBadge: 'حرف متحرك (للكسر طويل)',
      badgeClass: 'badge-vowel',
      pronunciation: 'إ، ى',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للكسر، يُنطق ياءً طويلة مشبعة ممدودة مثل مد الياء في كلمتي <strong>(جميل)</strong> و<strong>(سرير)</strong>.'
      ],
      word: { coptic: 'Ⲏⲓ', phoneticAr: 'إِي', meaning: 'بيت', soundFile: 'assets/sounds/8ei.mp3' },
      soundFile: 'audio_coptic/8eta.mp3'
    },
    {
      id: 9, upper: 'Ⲑ', lower: 'ⲑ', pair: 'Ⲑ ⲑ', name: 'ثيتا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ث',
      hasMultiple: true,
      multipleCountText: 'له نطقان (ث / ت)',
      rules: [
        'يُنطق <strong>(ت)</strong>: إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ) مثل حرف التاء في كلمة <strong>(تمثال)</strong>.',
        'يُنطق <strong>(ث)</strong>: في باقي الحالات الأخرى مثل حرف الثاء في كلمتي <strong>(ثمار)</strong> و<strong>(ثابت)</strong>.'
      ],
      word: { coptic: 'Ⲑⲁⲙⲓⲟ', phoneticAr: 'ثَامِيـوْ', meaning: 'يخلق', soundFile: 'assets/sounds/9samyo.mp3' },
      soundFile: 'audio_coptic/9seta.mp3'
    },
    {
      id: 10, upper: 'Ⲓ', lower: 'ⲓ', pair: 'Ⲓ ⲓ', name: 'يوتا',
      isVowel: true, vowelType: 'متحرك للكسر (قصير)', letterTypeBadge: 'حرف متحرك (للكسر قصير)',
      badgeClass: 'badge-vowel',
      pronunciation: 'ى',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للكسر، يُنطق ياءً قصيرة صريحة أو كسرة واضحة مثل حرف الياء في كلمة <strong>(دين)</strong> أو الكسرة في كلمة <strong>(مِن)</strong>.'
      ],
      word: { coptic: 'ⲓⲁⲗ', phoneticAr: 'إِيَـالْ', meaning: 'مراية', soundFile: 'assets/sounds/10ial.mp3' },
      soundFile: 'audio_coptic/10yota.mp3'
    },

    // الوحدة 3 (Ⲕ - Ⲝ)
    {
      id: 11, upper: 'Ⲕ', lower: 'ⲕ', pair: 'Ⲕ ⲕ', name: 'كبا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ك',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف كاف <strong>"ك"</strong> في جميع المواضع والكلمات دون استثناء.'
      ],
      word: { coptic: 'ⲕⲁϣ', phoneticAr: 'كَـاشْ', meaning: 'قلم', soundFile: 'assets/sounds/11kash.mp3' },
      soundFile: 'audio_coptic/11kapa.mp3'
    },
    {
      id: 12, upper: 'Ⲗ', lower: 'ⲗ', pair: 'Ⲗ ⲗ', name: 'لولا/لافلا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ل',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف لام <strong>"ل"</strong> في جميع الكلمات والمواضع مثل حرف اللام في كلمة <strong>(ليمون)</strong>.'
      ],
      word: { coptic: 'ⲗⲁⲃⲟ', phoneticAr: 'لَاڤُـو', meaning: 'أسد', soundFile: 'assets/sounds/12lavo.mp3' },
      soundFile: 'audio_coptic/12lavla.mp3'
    },
    {
      id: 13, upper: 'Ⲙ', lower: 'ⲙ', pair: 'Ⲙ ⲙ', name: 'مي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'م',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف ميم <strong>"م"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲙⲁⲛϩⲟⲛ', phoneticAr: 'مَانْهُـونْ', meaning: 'برتقال', soundFile: 'assets/sounds/13manhon.mp3' },
      soundFile: 'audio_coptic/13mi.mp3'
    },
    {
      id: 14, upper: 'Ⲛ', lower: 'ⲛ', pair: 'Ⲛ ⲛ', name: 'ني',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ن',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف نون <strong>"ن"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲉⲛ̀ⲕⲟⲧ', phoneticAr: 'إِنْكُـوتْ', meaning: 'ينام', soundFile: 'assets/sounds/14enkot.mp3' },
      soundFile: 'audio_coptic/14ni.mp3'
    },
    {
      id: 15, upper: 'Ⲝ', lower: 'ⲝ', pair: 'Ⲝ ⲝ', name: 'إكسي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن مركب',
      badgeClass: 'badge-compound',
      pronunciation: 'إكس',
      hasMultiple: false,
      multipleCountText: 'نطق مركب مزدوج',
      rules: [
        'حرف مركب يُنطق كاف وسين معاً <strong>(كـ + س)</strong> في مقطع صوتي واحد مثل صوت الكاف والسين في كلمة <strong>(مَكْسَب)</strong>.'
      ],
      word: { coptic: 'ⲝⲟⲩⲏ', phoneticAr: 'إِكْسُـويْ', meaning: 'مسطرة', soundFile: 'assets/sounds/15ksooy.mp3' },
      soundFile: 'audio_coptic/15axsy.mp3'
    },

    // الوحدة 4 (Ⲟ - Ⲧ)
    {
      id: 16, upper: 'Ⲟ', lower: 'ⲟ', pair: 'Ⲟ ⲟ', name: 'أو',
      isVowel: true, vowelType: 'متحرك للضم (قصير)', letterTypeBadge: 'حرف متحرك (للضم قصير)',
      badgeClass: 'badge-vowel',
      pronunciation: 'أو',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للضم، يُنطق واواً قصيرة خطافة كضمة حرف القاف في كلمة <strong>(قُل)</strong>.'
      ],
      word: { coptic: 'ⲟⲩⲱⲙ', phoneticAr: 'أُوؤْم', meaning: 'يأكل', soundFile: "assets/sounds/16o'om.mp3" },
      soundFile: 'audio_coptic/16oo.mp3'
    },
    {
      id: 17, upper: 'Ⲡ', lower: 'ⲡ', pair: 'Ⲡ ⲡ', name: 'بي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ب',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق باءً شديدة صريحة تخرج بحبس الهواء وضغط الشفتين بقوة <strong>(پ)</strong> مثل الباء المشددة في <strong>(رَبّ)</strong>.'
      ],
      word: { coptic: 'ⲡⲓⲱⲧ', phoneticAr: 'بَايُـوتْ', meaning: 'أبي', soundFile: 'assets/sounds/17bayot.mp3' },
      soundFile: 'audio_coptic/17pee.mp3'
    },
    {
      id: 18, upper: 'Ⲣ', lower: 'ⲣ', pair: 'Ⲣ ⲣ', name: 'رو',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ر',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف راء <strong>"ر"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲣⲏ', phoneticAr: 'رِي', meaning: 'شمس', soundFile: 'assets/sounds/18ree.mp3' },
      soundFile: 'audio_coptic/18roo.mp3'
    },
    {
      id: 19, upper: 'Ⲥ', lower: 'ⲥ', pair: 'Ⲥ ⲥ', name: 'سيما',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'س',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف سين <strong>"س"</strong> في جميع المواضع.'
      ],
      word: { coptic: 'ⲡⲁⲥⲟⲛ', phoneticAr: 'بَاصُـونْ', meaning: 'أخي', soundFile: 'assets/sounds/19pason.mp3'},
      soundFile: 'audio_coptic/19sema.mp3'
    },
    {
      id: 20, upper: 'Ⲧ', lower: 'ⲧ', pair: 'Ⲧ ⲧ', name: 'تاف',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ت',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف تاء <strong>"ت"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲧⲁⲙⲁⲩ', phoneticAr: 'تَامَـاڤْ', meaning: 'أمي', soundFile: 'assets/sounds/20tamav.mp3'},
      soundFile: 'audio_coptic/20tav.mp3'
    },

    // الوحدة 5 (Ⲩ - Ⲱ)
    {
      id: 21, upper: 'Ⲩ', lower: 'ⲩ', pair: 'Ⲩ ⲩ', name: 'إبسيلون',
      isVowel: true, vowelType: 'متحرك (متعدد الحالات)', letterTypeBadge: 'حرف متحرك (متعدد الحالات)',
      badgeClass: 'badge-vowel',
      pronunciation: 'ى، و، ف',
      hasMultiple: true,
      multipleCountText: 'له 3 حالات نطق (ڤ / و / ي)',
      rules: [
        'يُنطق <strong>(ڤ)</strong>: إذا سبقه حرف Ⲁ (ألفا) أو Ⲉ (إي) مثل المقطعين (ⲀⲨ / ⲈⲨ) كما في نطق حرف (ڤ).',
        'يُنطق <strong>(واو ممدودة)</strong>: إذا سبقه حرف Ⲟ (أو قصيرة) في المقطع (ⲞⲨ) مثل مد الواو في كلمة <strong>(نور)</strong>.',
        'يُنطق <strong>(ياء خفيفة)</strong>: في باقي الحالات إذا جاء بعد ساكن في الكلمات ذات الأصل اليوناني مثل الياء في كلمة <strong>(تسبحة)</strong>.'
      ],
      word: { coptic: 'ⲩⲥⲓⲥ', phoneticAr: 'إِيسِـيسْ', meaning: 'مطر', soundFile: 'assets/sounds/21usis.mp3'},
      soundFile: 'audio_coptic/21epselon.mp3'
    },
    {
      id: 22, upper: 'Ⲫ', lower: 'ⲫ', pair: 'Ⲫ ⲫ', name: 'في',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ف',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف فاء <strong>"ف"</strong> في جميع الكلمات والمواضع مثل حرف الفاء في كلمة <strong>(فرس)</strong>.'
      ],
      word: { coptic: 'ⲫⲉϧ', phoneticAr: 'فِيـخْ', meaning: 'بطيخ', soundFile: 'assets/sounds/22fev.mp3' },
      soundFile: 'audio_coptic/22fi.mp3'
    },
    {
      id: 23, upper: 'Ⲭ', lower: 'ⲭ', pair: 'Ⲭ ⲭ', name: 'كي، خي، شي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ك، خ، ش',
      hasMultiple: true,
      multipleCountText: 'له 3 أصوات (ك / ش / خ)',
      rules: [
        'يُنطق <strong>(ك)</strong>: في الكلمات ذات الأصل القبطي.',
        'يُنطق <strong>(ش)</strong>: في الكلمات ذات الأصل اليوناني إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).',
        'يُنطق <strong>(خ)</strong>: في الكلمات ذات الأصل اليوناني في باقي الحالات (إذا لم يأتِ بعده كسر).'
      ],
      word: { coptic: 'ⲭ̀ⲗⲓⲗ', phoneticAr: 'إِخْلِيـلْ', meaning: 'عقد', soundFile: 'assets/sounds/23khlil.mp3' },
      soundFile: 'audio_coptic/23ki.mp3'
    },
    {
      id: 24, upper: 'Ⲯ', lower: 'ⲯ', pair: 'Ⲯ ⲯ', name: 'بسي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن مركب',
      badgeClass: 'badge-compound',
      pronunciation: 'بس',
      hasMultiple: false,
      multipleCountText: 'نطق مركب مزدوج',
      rules: [
        'حرف مركب يُنطق باء وسين معاً <strong>(بـ + س)</strong> في مقطع صوتي واحد مثل صوت (بْسْ) في كلمة <strong>(كَبْس)</strong>.'
      ],
      word: { coptic: 'ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ', phoneticAr: 'إِبْسِـيتْ إِنْ كِنْكِـنْ', meaning: '9 دفوف', soundFile: 'assets/sounds/24psit.mp3' },
      soundFile: 'audio_coptic/24psi.mp3'
    },
    {
      id: 25, upper: 'Ⲱ', lower: 'ⲱ', pair: 'Ⲱ ⲱ', name: 'أوو',
      isVowel: true, vowelType: 'متحرك للضم (طويل)', letterTypeBadge: 'حرف متحرك (للضم طويل)',
      badgeClass: 'badge-vowel',
      pronunciation: 'أوو',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'آخر الحروف المأخوذة من الأبجدية اليونانية. حرف متحرك للضم، يُنطق واواً طويلة مفتوحة مفخمة ممدودة كمد الواو في كلمتي <strong>(صَوم)</strong> و<strong>(يَوم)</strong>.'
      ],
      word: { coptic: 'ⲧⲁⲥⲱⲛⲓ', phoneticAr: 'تَاسُـونِي', meaning: 'أختي', soundFile: 'assets/sounds/25tasoni.mp3' },
      soundFile: 'audio_coptic/25oo.mp3'
    },

    // الوحدة 6 (Ϣ - Ϫ)
    {
      id: 26, upper: 'Ϣ', lower: 'ϣ', pair: 'Ϣ ϣ', name: 'شاي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'ش',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم، يُنطق دائماً حرف شين <strong>"ش"</strong>.'
      ],
      word: { coptic: 'ϣⲁⲩ', phoneticAr: 'شَـاڤْ', meaning: 'قطة', soundFile: 'assets/sounds/26shau.mp3' },
      soundFile: 'audio_coptic/26shay.mp3'
    },
    {
      id: 27, upper: 'Ϥ', lower: 'ϥ', pair: 'Ϥ ϥ', name: 'فاي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'ف',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف فاء <strong>"ف"</strong>.'
      ],
      word: { coptic: 'ϥⲱⲓ', phoneticAr: 'فُـويْ', meaning: 'شعر', soundFile: 'assets/sounds/27foi.mp3' },
      soundFile: 'audio_coptic/27fay.mp3'
    },
    {
      id: 28, upper: 'Ϧ', lower: 'ϧ', pair: 'Ϧ ϧ', name: 'خاي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'خ',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف خاء <strong>"خ"</strong>.'
      ],
      word: { coptic: 'ϧⲏⲃⲥ', phoneticAr: 'خِيبْسْ', meaning: 'مصباح', soundFile: 'assets/sounds/28khevs.mp3' },
      soundFile: 'audio_coptic/28khay.mp3'
    },
    {
      id: 29, upper: 'Ϩ', lower: 'ϩ', pair: 'Ϩ ϩ', name: 'هوري',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'هـ',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف هاء <strong>"هـ"</strong>.'
      ],
      word: { coptic: 'ϩ̀ⲑⲟ', phoneticAr: 'إِهْـثُـو', meaning: 'حصان', soundFile: 'assets/sounds/29htho.mp3' },
      soundFile: 'audio_coptic/29hory.mp3'
    },
    {
      id: 30, upper: 'Ϫ', lower: 'ϫ', pair: 'Ϫ ϫ', name: 'جنجا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'ج',
      hasMultiple: true,
      multipleCountText: 'له نطقان (جـ معطشة / جـ)',
      rules: [
        'يُنطق <strong>(جـ معطشة)</strong>: إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).',
        'يُنطق <strong>(جـ غير معطشة)</strong>: مثل الجيم المصرية في باقي الحالات.'
      ],
      word: { coptic: 'ϫⲉⲙⲫⲉϩ', phoneticAr: 'جِمْفِـيهْ', meaning: 'تفاح', soundFile: 'assets/sounds/30zempheh.mp3' },
      soundFile: 'audio_coptic/30ganga.mp3'
    },

    // الوحدة 7 (Ϭ - Ϯ)
    {
      id: 31, upper: 'Ϭ', lower: 'ϭ', pair: 'Ϭ ϭ', name: 'تشيما',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'تش',
      hasMultiple: false,
      multipleCountText: 'نطق مركب (ت + ش)',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً تاء وشين معاً <strong>(تش)</strong> في مقطع صوتي واحد مثل صوت (تْش) في كلمة <strong>(تْشيللو)</strong>.'
      ],
      word: { coptic: 'ϭⲁϫ', phoneticAr: 'تْشَـاجْ', meaning: 'عصفور', soundFile: 'assets/sounds/31chaj.mp3' },
      soundFile: 'audio_coptic/31chema.mp3'
    },
    {
      id: 32, upper: 'Ϯ', lower: 'ϯ', pair: 'Ϯ ϯ', name: 'تي',
      isVowel: false, vowelType: null, letterTypeBadge: 'مقطع ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'تي',
      hasMultiple: false,
      multipleCountText: 'نطق مقطعي (تـ + ي)',
      rules: [
        'الحرف الثاني والثلاثون، آخر حروف الأبجدية القبطية. مقطع صوتي ديموطيقي مركب يُنطق تاء متبوعة بكسرة ياء صريحة <strong>(تـ + ي)</strong> مثل صوت (تي) في كلمة <strong>(تين)</strong>.'
      ],
      word: { coptic: 'ϯⲙⲓ', phoneticAr: 'تِيـمِي', meaning: 'قرية', soundFile: 'assets/sounds/32timi.mp3' },
      soundFile: 'audio_coptic/32tee.mp3'
    }
  ];

  // دالة البحث عن الحرف في الفهرس
  function findLetterCatalogItem(ch) {
    if (!ch) return null;
    const disp = String(ch.coptic_display || '').trim();
    const q = String(ch.question || '').trim();
    const audio = String(ch.audio_url || '').trim();

    // 1. مطابقة مباشرة بالرمز القبطي
    if (disp) {
      const matchDisp = CATALOG.find(item => item.pair === disp || item.upper === disp || item.lower === disp);
      if (matchDisp) return matchDisp;
    }

    // 2. مطابقة بالاسم في عنوان السؤال
    if (q) {
      const matchQ = CATALOG.find(item => {
        const rootName = item.name.split(' ')[0];
        return q.includes(rootName) || (item.name.includes('(') && q.includes(item.name.split('(')[0].trim()));
      });
      if (matchQ) return matchQ;
    }

    // 3. مطابقة بملف الصوت
    if (audio) {
      const matchAudio = CATALOG.find(item => item.soundFile && audio.includes(item.soundFile.replace('audio_coptic/', '')));
      if (matchAudio) return matchAudio;
    }

    return null;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 1. توليد HTML المخصص لشاشة نبذة الحرف فقط
  function renderLetterOnlyCardHtml(ch) {
    let item = (ch && ch.overview_item) || null;
    if (!item) {
      if (ch && ch.overview_data && typeof ch.overview_data === 'object' && (ch.overview_data.name || ch.overview_data.word)) {
        item = ch.overview_data;
      } else if (ch && ch.explanation && typeof ch.explanation === 'string' && ch.explanation.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(ch.explanation);
          if (parsed && (parsed.name || parsed.word)) item = parsed;
        } catch (e) {}
      }
    }
    if (!item) item = findLetterCatalogItem(ch);
    if (!item) return renderLetterOverviewCardHtml(ch);

    const pair = item.pair || `${item.upper || ''} ${item.lower || ''}`.trim();
    const badgeClass = item.badgeClass || (item.isVowel ? 'badge-vowel' : 'badge-consonant');
    const typeBadge = item.letterTypeBadge || (item.isVowel ? 'حرف متحرك' : 'حرف ساكن');
    const hasMulti = item.hasMultiple || (item.multipleCountText ? true : false);
    const multiText = item.multipleCountText || '';
    const pron = item.pronunciation || '';
    const soundFile = item.soundFile || ch.audio_url || '';
    const rulesTitle = item.rulesTitle || (hasMulti ? 'حالات وقواعد نطق الحرف بالتفصيل:' : 'قاعدة نطق الحرف:');
    const rules = Array.isArray(item.rules) ? item.rules : (item.rules ? [item.rules] : []);

    const colors = item.colors || {};
    const titleStyle = colors.titleColor ? `style="color:${colors.titleColor} !important;"` : '';

    return `
      <div class="overview-step-pill-wrapper">
        <span class="overview-step-pill step-letter">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          الخطوة ١ من ٢ • استكشاف الحرف
        </span>
      </div>

      <div class="question-heading overview-screen-title" ${titleStyle}>
        نبذة عن حرف ${escapeHtml(item.name)} (${escapeHtml(pair)})
      </div>

      <div class="coptic-overview-wrap single-view">
        <div class="letter-overview-card hero-letter-card">
          <div class="letter-overview-header">
            <div class="letter-header-top-row">
              <div class="letter-glyph-box">
                <span class="letter-glyph-val">${escapeHtml(pair)}</span>
              </div>

              <div class="letter-meta-col">
                <div class="letter-title-row">
                  <span class="letter-name-title">حرف ${escapeHtml(item.name)}</span>
                </div>
                <div class="letter-badges-row">
                  <span class="coptic-badge ${badgeClass}">${escapeHtml(typeBadge)}</span>
                  ${hasMulti && multiText ? `<span class="coptic-badge badge-multi">${escapeHtml(multiText)}</span>` : ''}
                </div>
                <div class="letter-pron-preview">
                  <span class="letter-pron-label">النطق بالعربي:</span>
                  <span class="letter-pron-val">« ${escapeHtml(pron)} »</span>
                </div>
              </div>
            </div>

            <div class="letter-audio-action">
              <button type="button" class="btn-listen-letter hero-audio-btn" aria-label="استمع لنطق الحرف" title="استمع لنطق الحرف" onclick="if(window.playChallengeAudio){ window.playChallengeAudio('${soundFile}', '${item.name}', this); } else if(window.CurriculumAdminSystem && CurriculumAdminSystem.playAudioSnippet){ CurriculumAdminSystem.playAudioSnippet('${soundFile}', '${item.name}', this); } else if(window.Sound && window.Sound.playChallengeAudio){ window.Sound.playChallengeAudio('${soundFile}', '${item.name}'); }">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
                <span>استمع لنطق الحرف (${escapeHtml(item.name)})</span>
              </button>
            </div>
          </div>

          <div class="letter-rules-box">
            <div class="letter-rules-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span>${escapeHtml(rulesTitle)}</span>
            </div>
            <ol class="letter-rules-list ${rules.length <= 1 ? 'single-rule' : ''}">
              ${rules.map(r => `<li>${r}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
  }

  // 2. توليد HTML المخصص لشاشة نبذة الكلمة التطبيقية فقط
  function renderWordOnlyCardHtml(ch) {
    let item = (ch && ch.overview_item) || null;
    if (!item) {
      if (ch && ch.overview_data && typeof ch.overview_data === 'object' && (ch.overview_data.name || ch.overview_data.word)) {
        item = ch.overview_data;
      } else if (ch && ch.explanation && typeof ch.explanation === 'string' && ch.explanation.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(ch.explanation);
          if (parsed && (parsed.name || parsed.word)) item = parsed;
        } catch (e) {}
      }
    }
    if (!item) item = findLetterCatalogItem(ch);
    if (!item || !item.word) return renderLetterOverviewCardHtml(ch);

    const pair = item.pair || `${item.upper || ''} ${item.lower || ''}`.trim();
    const wordObj = item.word || {};
    const copticWord = wordObj.coptic || '';
    const phoneticAr = wordObj.phoneticAr || '';
    const meaning = wordObj.meaning || '';
    const soundFile = wordObj.soundFile || wordObj.audioFile || '';

    const colors = item.colors || {};
    const titleStyle = colors.wordTitleColor ? `style="color:${colors.wordTitleColor} !important;"` : '';

    return `
      <div class="overview-step-pill-wrapper">
        <span class="overview-step-pill step-word">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          الخطوة ٢ من ٢ • الكلمة التطبيقية
        </span>
      </div>

      <div class="question-heading overview-screen-title" ${titleStyle}>
        نبذة عن الكلمة التطبيقية على حرف ${escapeHtml(item.name)}
      </div>

      <div class="coptic-overview-wrap single-view">
        <div class="word-overview-card hero-word-card">
          <div class="word-card-hero-banner">
            <div class="word-card-letter-tag">
              <span class="tag-label">الحرف المدروس:</span>
              <span class="tag-letter">${escapeHtml(pair)} (${escapeHtml(item.name)})</span>
            </div>
            <div class="word-card-coptic-huge">${escapeHtml(copticWord)}</div>
          </div>

          <div class="word-card-details-row">
            <div class="word-detail-block">
              <span class="word-detail-label">القبطي المعرب (النطق)</span>
              <span class="word-detail-val phonetic">« ${escapeHtml(phoneticAr)} »</span>
            </div>
            <div class="word-detail-divider"></div>
            <div class="word-detail-block">
              <span class="word-detail-label">المعنى بالعربية</span>
              <span class="word-detail-val meaning">${escapeHtml(meaning)}</span>
            </div>
          </div>

          <div class="word-audio-action-row">
            <button type="button" class="btn-listen-word-hero" aria-label="استمع لنطق الكلمة" title="استمع لنطق الكلمة" onclick="const _wAudio = '${soundFile}'; if(window.playChallengeAudio){ window.playChallengeAudio(_wAudio, '${phoneticAr}', this); } else if(window.CurriculumAdminSystem && CurriculumAdminSystem.playAudioSnippet){ CurriculumAdminSystem.playAudioSnippet(_wAudio, '${phoneticAr}', this); } else if(window.Sound && window.Sound.playChallengeAudio){ window.Sound.playChallengeAudio(_wAudio, '${phoneticAr}'); }">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
              <span>استمع لنطق الكلمة (${escapeHtml(phoneticAr)})</span>
            </button>
          </div>

          <div class="overview-exercise-hint">
            <span class="hint-icon">💡</span>
            <span class="hint-text">تلميح: احفظ شكل الكلمة ونطقها جيداً، ستتدرب على قراءتها وتكوين حروفها في التمارين التالية!</span>
          </div>
        </div>
      </div>
    `;
  }

  // توليد HTML الكامل للنبذة الشاملة
  function renderLetterOverviewCardHtml(ch) {
    let item = null;

    // 1. التحقق من وجود بيانات مخصصة محفوظة من الداش بورد
    if (ch && ch.overview_data && typeof ch.overview_data === 'object' && (ch.overview_data.name || ch.overview_data.word)) {
      item = ch.overview_data;
    } else if (ch && ch.explanation && typeof ch.explanation === 'string' && ch.explanation.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(ch.explanation);
        if (parsed && (parsed.name || parsed.word)) {
          item = parsed;
        }
      } catch (e) {}
    }

    // 2. إذا لم تكن معدلة يدوياً، استخدام الفهرس المعتمد للحرف
    if (!item) {
      item = findLetterCatalogItem(ch);
    }

    // إذا وجدنا الحرف في الفهرس أو البيانات المخصصة
    if (item) {
      const title = ch.question || item.title || `نبذة عن حرف ${item.name} (${item.pair || item.upper || ''})`;
      const pair = item.pair || `${item.upper || ''} ${item.lower || ''}`.trim();
      const badgeClass = item.badgeClass || (item.isVowel ? 'badge-vowel' : 'badge-consonant');
      const typeBadge = item.letterTypeBadge || (item.isVowel ? 'حرف متحرك' : 'حرف ساكن');
      const hasMulti = item.hasMultiple || (item.multipleCountText ? true : false);
      const multiText = item.multipleCountText || '';
      const pron = item.pronunciation || '';
      const soundFile = item.soundFile || ch.audio_url || '';
      const rulesTitle = item.rulesTitle || (hasMulti ? 'حالات وقواعد نطق الحرف بالتفصيل:' : 'قاعدة نطق الحرف:');
      const rules = Array.isArray(item.rules) ? item.rules : (item.rules ? [item.rules] : []);
      const wordTitle = item.wordTitle || 'نبذة عن الكلمة التطبيقية على الحرف';
      const wordObj = item.word || {};
      const copticWord = wordObj.coptic || '';
      const phoneticAr = wordObj.phoneticAr || '';
      const meaning = wordObj.meaning || '';

      // قراءة الألوان المخصصة مع قيم افتراضية متناسقة
      const colors = item.colors || {};
      const titleStyle = colors.titleColor ? `style="color:${colors.titleColor} !important;"` : '';
      
      const letterCardStyles = [];
      if (colors.cardBg) letterCardStyles.push(`background:${colors.cardBg} !important;`);
      if (colors.cardBorder) letterCardStyles.push(`border-color:${colors.cardBorder} !important;`);
      const letterCardAttr = letterCardStyles.length ? `style="${letterCardStyles.join(' ')}"` : '';

      const glyphBoxStyles = [];
      if (colors.glyphBg) glyphBoxStyles.push(`background:${colors.glyphBg} !important;`);
      if (colors.glyphBorder) glyphBoxStyles.push(`border-color:${colors.glyphBorder} !important;`);
      const glyphBoxAttr = glyphBoxStyles.length ? `style="${glyphBoxStyles.join(' ')}"` : '';

      const glyphValAttr = colors.glyphColor ? `style="color:${colors.glyphColor} !important;"` : '';

      const pronValStyles = [];
      if (colors.pronColor) pronValStyles.push(`color:${colors.pronColor} !important;`);
      if (colors.pronBg) pronValStyles.push(`background:${colors.pronBg} !important;`);
      if (colors.pronBorder) pronValStyles.push(`border-color:${colors.pronBorder} !important;`);
      const pronValAttr = pronValStyles.length ? `style="${pronValStyles.join(' ')}"` : '';

      const rulesBoxStyles = [];
      if (colors.rulesBg) rulesBoxStyles.push(`background:${colors.rulesBg} !important;`);
      if (colors.rulesBorder) rulesBoxStyles.push(`border-color:${colors.rulesBorder} !important;`);
      const rulesBoxAttr = rulesBoxStyles.length ? `style="${rulesBoxStyles.join(' ')}"` : '';

      const rulesTitleAttr = colors.rulesTitleColor ? `style="color:${colors.rulesTitleColor} !important;"` : '';
      const rulesTextAttr = colors.rulesTextColor ? `style="color:${colors.rulesTextColor} !important;"` : '';

      const wordCardStyles = [];
      if (colors.wordCardBg) wordCardStyles.push(`background:${colors.wordCardBg} !important;`);
      if (colors.wordCardBorder) wordCardStyles.push(`border-color:${colors.wordCardBorder} !important;`);
      const wordCardAttr = wordCardStyles.length ? `style="${wordCardStyles.join(' ')}"` : '';

      const wordTitleAttr = colors.wordTitleColor ? `style="color:${colors.wordTitleColor} !important;"` : '';

      const wordCellStyles = [];
      if (colors.wordCellBg) wordCellStyles.push(`background:${colors.wordCellBg} !important;`);
      if (colors.wordCellBorder) wordCellStyles.push(`border-color:${colors.wordCellBorder} !important;`);
      const wordCellAttr = wordCellStyles.length ? `style="${wordCellStyles.join(' ')}"` : '';

      const wordCopticAttr = colors.wordCopticColor ? `style="color:${colors.wordCopticColor} !important;"` : '';
      const wordPhoneticAttr = colors.wordPhoneticColor ? `style="color:${colors.wordPhoneticColor} !important;"` : '';
      const wordMeaningAttr = colors.wordMeaningColor ? `style="color:${colors.wordMeaningColor} !important;"` : '';

      return `
        <div class="question-heading" ${titleStyle}>${escapeHtml(title)}</div>
        
        <div class="coptic-overview-wrap">
          
          <!-- بطاقة النبذة عن الحرف -->
          <div class="letter-overview-card" ${letterCardAttr}>
            <div class="letter-overview-header">
              <div class="letter-header-top-row">
                <div class="letter-glyph-box" ${glyphBoxAttr}>
                  <span class="letter-glyph-val" ${glyphValAttr}>${escapeHtml(pair)}</span>
                </div>

                <div class="letter-meta-col">
                  <div class="letter-title-row">
                    <span class="letter-name-title">حرف ${escapeHtml(item.name)}</span>
                  </div>
                  <div class="letter-badges-row">
                    <span class="coptic-badge ${badgeClass}">${escapeHtml(typeBadge)}</span>
                    ${hasMulti && multiText ? `<span class="coptic-badge badge-multi">${escapeHtml(multiText)}</span>` : ''}
                  </div>
                  <div class="letter-pron-preview">
                    <span class="letter-pron-label">النطق بالعربي:</span>
                    <span class="letter-pron-val" ${pronValAttr}>« ${escapeHtml(pron)} »</span>
                  </div>
                </div>
              </div>

              <div class="letter-audio-action">
                <button type="button" class="btn-listen-letter" aria-label="استمع لنطق الحرف" title="استمع لنطق الحرف" onclick="if(window.playChallengeAudio){ window.playChallengeAudio('${soundFile}', '${item.name}', this); } else if(window.CurriculumAdminSystem && CurriculumAdminSystem.playAudioSnippet){ CurriculumAdminSystem.playAudioSnippet('${soundFile}', '${item.name}', this); } else if(window.Sound && window.Sound.playChallengeAudio){ window.Sound.playChallengeAudio('${soundFile}', '${item.name}'); }">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                  <span>استمع لنطق الحرف</span>
                </button>
              </div>
            </div>

            <div class="letter-rules-box" ${rulesBoxAttr}>
              <div class="letter-rules-title" ${rulesTitleAttr}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span>${escapeHtml(rulesTitle)}</span>
              </div>
              <ol class="letter-rules-list ${rules.length <= 1 ? 'single-rule' : ''}" ${rulesTextAttr}>
                ${rules.map(r => `<li>${r}</li>`).join('')}
              </ol>
            </div>
          </div>

          <!-- بطاقة النبذة عن الكلمة التطبيقية -->
          <div class="word-overview-card" ${wordCardAttr}>
            <div class="word-card-title" ${wordTitleAttr}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span>${escapeHtml(wordTitle)}</span>
            </div>

            <div class="word-card-grid">
              <div class="word-grid-cell" ${wordCellAttr}>
                <span class="cell-label">الكلمة بالقبطية</span>
                <span class="cell-coptic-val" ${wordCopticAttr}>${escapeHtml(copticWord)}</span>
              </div>

              <div class="word-grid-cell" ${wordCellAttr}>
                <span class="cell-label">القبطي المعرب (النطق)</span>
                <span class="cell-phonetic-val" ${wordPhoneticAttr}>« ${escapeHtml(phoneticAr)} »</span>
              </div>

              <div class="word-grid-cell" ${wordCellAttr}>
                <span class="cell-label">المعنى بالعربية</span>
                <span class="cell-meaning-val" ${wordMeaningAttr}>${escapeHtml(meaning)}</span>
              </div>

              <div class="word-grid-cell" ${wordCellAttr}>
                <span class="cell-label">النطق السماعي</span>
                <button type="button" class="btn-listen-word" aria-label="استمع لنطق الكلمة" title="استمع لنطق الكلمة" onclick="const _wAudio = '${wordObj.soundFile || wordObj.audioFile || ''}'; if(window.playChallengeAudio){ window.playChallengeAudio(_wAudio, '${phoneticAr}', this); } else if(window.CurriculumAdminSystem && CurriculumAdminSystem.playAudioSnippet){ CurriculumAdminSystem.playAudioSnippet(_wAudio, '${phoneticAr}', this); } else if(window.Sound && window.Sound.playChallengeAudio){ window.Sound.playChallengeAudio(_wAudio, '${phoneticAr}'); }">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span>استمع للكلمة</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      `;
    }

    // Fallback عام لأي درس لا يطابق الـ 32 حرفاً
    const textContent = ch.explanation || ch.correct_word || '';
    return `
      <div class="question-heading">${escapeHtml(ch.question || 'شرح وقراءة (تأمّل وتعلّم)')}</div>
      ${ch.image_url ? `
        <div class="challenge-image-container">
          <div class="challenge-image-card" onclick="window.openImageZoomModal ? window.openImageZoomModal('${(ch.image_url || '').replace(/'/g, "\\'")}', '${(ch.question || '').replace(/'/g, "\\'")}') : null" title="انقر لتكبير الصورة">
            <img src="${escapeHtml(ch.image_url)}" alt="صورة توضيحية" class="challenge-image-tag" loading="lazy" />
          </div>
        </div>
      ` : ''}
      ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
        <div class="coptic-letter-display">
          ${ch.coptic_display ? `<span class="coptic-big-glyph">${escapeHtml(ch.coptic_display)}</span>` : ''}
          ${(ch.audio_text || ch.audio_url) ? `
            <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio ? window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this) : null">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            </button>
          ` : ''}
        </div>
      ` : ''}
      ${textContent ? `
        <div class="challenge-text-view-card" style="background:linear-gradient(180deg, #FFFCF5 0%, #FAF4E8 100%); border:2px solid #E2D3BE; border-radius:18px; padding:20px 22px; margin:16px auto 0; max-width:580px; text-align:right; color:#3A271B; font-size:1.08rem; line-height:1.85; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.05); white-space:pre-line;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px; color:#6F1737; font-weight:800; font-size:0.95rem; border-bottom:1px dashed #DCCDB7; padding-bottom:8px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>شرح وتوضيح تعليمي</span>
          </div>
          <div>${escapeHtml(textContent)}</div>
        </div>
      ` : ''}
    `;
  }

  // تنظيف خيارات نطق الحرف لضمان عرض النطق باللغة العربية الخالصة 100% بدون أي حروف إنجليزية وبدون اسم الحرف
  function formatPronunciationOption(text) {
    if (!text) return '';
    let str = String(text).trim();

    // 1. تحويل الرموز اللاتينية المفردة مباشرة إلى مقابلها العربي
    const englishToArMap = {
      'E': 'إي', 'e': 'إي',
      'ee': 'ياء ممدودة', 'i': 'ياء قصيرة',
      'X': 'كـ + س', 'x': 'كـ + س',
      'O': 'واو مضمومة', 'o': 'واو مضمومة',
      'Ō': 'واو ممدودة', 'ō': 'واو ممدودة',
      'P': 'ب مشددة', 'p': 'ب مشددة',
      'Ps': 'بـ + س', 'ps': 'بـ + س',
      'Tsh': 'تش', 'tsh': 'تش',
      'Ti': 'تـ + ي', 'ti': 'تـ + ي'
    };
    if (englishToArMap[str]) return englishToArMap[str];

    // 2. إذا كان النص يحتوي على 'ينطق:' أو '—'
    if (str.includes('ينطق:')) {
      str = str.split('ينطق:')[1].trim();
    } else if (str.includes('—')) {
      str = str.split('—')[1].trim();
    }

    // 3. إزالة أي أقواس تحتوي على حروف إنجليزية لاتينية، مثل (E) أو (ee) أو (X) أو (Tsh)
    str = str.replace(/\s*\([A-Za-zŌō\s+-]+\)/g, '').trim();

    // 4. إذا كان النص يحتوي على اسم الحرف ونطقه بين قوسين عربيين مثل: 'ڤيتا (ڤ أو ب)' أو 'فيدا (ف أو ب)'
    const parenMatch = str.match(/\(([^)]+)\)$/);
    if (parenMatch) {
      const insideParen = parenMatch[1].trim();
      if (/[\u0600-\u06FF]/.test(insideParen) && !/[a-zA-Z]/.test(insideParen)) {
        const beforeParen = str.substring(0, parenMatch.index).trim();
        // إذا كان ما قبل القوسين هو اسم حرف وليس وصفاً للنطق
        if (beforeParen && !beforeParen.includes('أو') && !beforeParen.includes('مفتوحة') && !beforeParen.includes('ممدودة') && !beforeParen.includes('قصيرة') && !beforeParen.includes('مضمومة') && !beforeParen.includes('مشددة')) {
          str = insideParen;
        }
      }
    }

    // 5. إزالة أي أحرف إنجليزية متبقية لضمان أن كل الإجابات بالعربي 100%
    str = str.replace(/[A-Za-zŌō]/g, '').trim();

    return str || text;
  }

  // استخراج معنى الكلمة بالعربي والقبطي المعرب لتمارين كتابة وترتيب الكلمة
  function extractWordMeaningAndPhonetic(ch) {
    let meaning = '';
    let phonetic = (ch && ch.audio_text) ? String(ch.audio_text).trim() : '';

    if (ch && (ch.correct_word || ch.coptic_display)) {
      const targetWord = (ch.correct_word || ch.coptic_display || '').trim();
      const found = CATALOG.find(c => c.word && (c.word.coptic === targetWord || targetWord.includes(c.word.coptic)));
      if (found && found.word) {
        meaning = found.word.meaning;
        if (!phonetic || phonetic === targetWord) phonetic = found.word.phoneticAr;
      }
    }

    if (!meaning && ch && ch.question) {
      const q = ch.question;
      const m = q.match(/(?:لتكوين|الكلمة|الكلمة القبطية):\s*([^(«[]+)/);
      if (m && m[1]) meaning = m[1].trim();
      const mPhon = q.match(/«([^»]+)»/);
      if (mPhon && mPhon[1]) phonetic = mPhon[1].trim();
    }

    return { meaning: meaning || 'الكلمة المطلوبة', phonetic: phonetic || '' };
  }

  // تصدير للنافذة العامة
  if (typeof window !== 'undefined') {
    window.COPTIC_LETTERS_CATALOG = CATALOG;
    window.findLetterCatalogItem = findLetterCatalogItem;
    window.renderLetterOverviewCardHtml = renderLetterOverviewCardHtml;
    window.renderLetterOnlyCardHtml = renderLetterOnlyCardHtml;
    window.renderWordOnlyCardHtml = renderWordOnlyCardHtml;
    window.formatPronunciationOption = formatPronunciationOption;
    window.extractWordMeaningAndPhonetic = extractWordMeaningAndPhonetic;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      COPTIC_LETTERS_CATALOG: CATALOG,
      findLetterCatalogItem,
      renderLetterOverviewCardHtml,
      renderLetterOnlyCardHtml,
      renderWordOnlyCardHtml,
      formatPronunciationOption,
      extractWordMeaningAndPhonetic
    };
  }
})();
