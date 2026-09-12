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
      pronunciation: 'ألف مفتوحة (أَ)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'الحرف الأول في الأبجدية القبطية. يُنطق دائماً ألفاً مفتوحة مشبعة مثل <strong>(أَ)</strong> في العربية أو <strong>(A)</strong> في كلمة (Father).'
      ],
      word: { coptic: 'ⲁⲗⲱⲙ', phoneticAr: 'آلوم', meaning: 'جبنة' },
      soundFile: 'audio_coptic/1alfa.mp3'
    },
    {
      id: 2, upper: 'Ⲃ', lower: 'ⲃ', pair: 'Ⲃ ⲃ', name: 'ڤيتا (بيتا)',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ڤ (V) أو ب (B)',
      hasMultiple: true,
      multipleCountText: 'له نطقان (ڤ / ب)',
      rules: [
        'يُنطق <strong>(ڤ / V)</strong>: إذا جاء بعده أي حرف متحرك (Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲱ, Ⲩ).',
        'يُنطق <strong>(ب / B)</strong>: إذا لم يأتِ بعده حرف متحرك، أو إذا جاء في نهاية الكلمة.'
      ],
      word: { coptic: 'ⲃⲱ', phoneticAr: 'ڤو', meaning: 'شجرة' },
      soundFile: 'audio_coptic/2veta.mp3'
    },
    {
      id: 3, upper: 'Ⲅ', lower: 'ⲅ', pair: 'Ⲅ ⲅ', name: 'غاما',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'جـ معطشة أو ن أو غ',
      hasMultiple: true,
      multipleCountText: 'له 3 أصوات (جـ / ن / غ)',
      rules: [
        'يُنطق <strong>(جـ معطشة)</strong>: في الكلمات اليونانية إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).',
        'يُنطق <strong>(ن)</strong>: إذا جاء بعده أحد الحروف الحلقية (Ⲅ, Ⲕ, Ⲭ, Ⲝ).',
        'يُنطق <strong>(غ)</strong>: في الكلمات القبطية، وفي الكلمات اليونانية في باقي الحالات.'
      ],
      word: { coptic: 'ⲅⲁⲗⲁ', phoneticAr: 'غالا', meaning: 'لبن' },
      soundFile: 'audio_coptic/3ghamma.mp3'
    },
    {
      id: 4, upper: 'Ⲇ', lower: 'ⲇ', pair: 'Ⲇ ⲇ', name: 'دلدا (دلتا)',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'د أو ذ',
      hasMultiple: true,
      multipleCountText: 'له نطقان (د / ذ)',
      rules: [
        'يُنطق <strong>(د)</strong>: في أسماء الأعلام والأشخاص والبلاد، وفي الكلمات القبطية الأصل.',
        'يُنطق <strong>(ذ)</strong>: في باقي الكلمات ذات الأصل اليوناني.'
      ],
      word: { coptic: 'ⲁⲇⲁⲙ', phoneticAr: 'آدام', meaning: 'آدم' },
      soundFile: 'audio_coptic/4delta.mp3'
    },
    {
      id: 5, upper: 'Ⲉ', lower: 'ⲉ', pair: 'Ⲉ ⲉ', name: 'إي',
      isVowel: true, vowelType: 'متحرك للكسر (خفيف)', letterTypeBadge: 'حرف متحرك (للكسر خفيف)',
      badgeClass: 'badge-vowel',
      pronunciation: 'إي خفيفة (E)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للكسر يُنطق فتحة مائلة للكسر مثل حرف <strong>(E)</strong> في كلمة (pen) أو (bed).'
      ],
      word: { coptic: 'ⲉ̀ⲣϣⲱ', phoneticAr: 'إرجو', meaning: 'دجاجة' },
      soundFile: 'audio_coptic/5ei.mp3'
    },

    // الوحدة 2 (Ⲋ - Ⲓ)
    {
      id: 6, upper: 'Ⲋ', lower: 'ⲋ', pair: 'Ⲋ ⲋ', name: 'سو (رقم ٦)',
      isVowel: false, vowelType: null, letterTypeBadge: 'رقم عددي رمزي',
      badgeClass: 'badge-symbol',
      pronunciation: 'سو (الرقم 6)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد',
      rules: [
        'ليس حرفاً هجائياً أصيلاً بل رمز ورقم عددي يدل على <strong>الرقم ستة (٦)</strong>. يوضع فوقه شرطة أفقية لتمييزه كرقم، ويُنطق <strong>"سو"</strong>.'
      ],
      word: { coptic: 'ⲥⲟⲟⲩ ⲛ̀ϣⲕⲉⲗⲕⲓⲗ', phoneticAr: 'إسوؤو إن شكيلكيل', meaning: '6 أجراس' },
      soundFile: 'audio_coptic/6sow.mp3'
    },
    {
      id: 7, upper: 'Ⲍ', lower: 'ⲍ', pair: 'Ⲍ ⲍ', name: 'زاتا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ز (Z)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف زين <strong>"ز"</strong> مثل حرف <strong>(Z)</strong> في الإنجليزية في جميع الكلمات والمواضع.'
      ],
      word: { coptic: 'ⲍⲱⲙⲟⲥ', phoneticAr: 'أزموس', meaning: 'شوربة' },
      soundFile: 'audio_coptic/7zeta.mp3'
    },
    {
      id: 8, upper: 'Ⲏ', lower: 'ⲏ', pair: 'Ⲏ ⲏ', name: 'هيتا (إيتا)',
      isVowel: true, vowelType: 'متحرك للكسر (طويل ممدود)', letterTypeBadge: 'حرف متحرك (للكسر طويل)',
      badgeClass: 'badge-vowel',
      pronunciation: 'ياء طويلة ممدودة (ee)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للكسر يُنطق ياء طويلة مشبعة ممدودة مثل <strong>(ee)</strong> في كلمة (meet) أو (see).'
      ],
      word: { coptic: 'ⲏ̀ⲡⲓ', phoneticAr: 'إيبي', meaning: 'قبة' },
      soundFile: 'audio_coptic/8eta.mp3'
    },
    {
      id: 9, upper: 'Ⲑ', lower: 'ⲑ', pair: 'Ⲑ ⲑ', name: 'ثيتا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ث أو ت',
      hasMultiple: true,
      multipleCountText: 'له نطقان (ث / ت)',
      rules: [
        'يُنطق <strong>(ت)</strong>: إذا سبقه حرف سيما (Ⲥ) أو حرف شاي (Ϣ).',
        'يُنطق <strong>(ث)</strong>: في باقي الحالات الأخرى مثل حرف <strong>(Th)</strong> في الإنجليزية.'
      ],
      word: { coptic: 'ⲕⲓⲑⲁⲣⲁ', phoneticAr: 'كيثارا', meaning: 'قيثارة' },
      soundFile: 'audio_coptic/9seta.mp3'
    },
    {
      id: 10, upper: 'Ⲓ', lower: 'ⲓ', pair: 'Ⲓ ⲓ', name: 'إيوتا',
      isVowel: true, vowelType: 'متحرك للكسر (قصير)', letterTypeBadge: 'حرف متحرك (للكسر قصير)',
      badgeClass: 'badge-vowel',
      pronunciation: 'ياء قصيرة خفيفة (i)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للكسر يُنطق ياء قصيرة أو كسرة خفيفة مثل حرف <strong>(I)</strong> في كلمة (sit) أو (pin).'
      ],
      word: { coptic: 'ⲓⲁⲗ', phoneticAr: 'إيال', meaning: 'مراية' },
      soundFile: 'audio_coptic/10yota.mp3'
    },

    // الوحدة 3 (Ⲕ - Ⲝ)
    {
      id: 11, upper: 'Ⲕ', lower: 'ⲕ', pair: 'Ⲕ ⲕ', name: 'كابا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ك (K)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف كاف <strong>"ك"</strong> في جميع المواضع والكلمات دون استثناء.'
      ],
      word: { coptic: 'ⲕⲁϣ', phoneticAr: 'كاش', meaning: 'قلم' },
      soundFile: 'audio_coptic/11kapa.mp3'
    },
    {
      id: 12, upper: 'Ⲗ', lower: 'ⲗ', pair: 'Ⲗ ⲗ', name: 'لابدا (لافلا)',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ل (L)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف لام <strong>"ل"</strong> مثل حرف <strong>(L)</strong> في الإنجليزية.'
      ],
      word: { coptic: 'ⲗⲁⲃⲟ', phoneticAr: 'لاڤو', meaning: 'أسد' },
      soundFile: 'audio_coptic/12lavla.mp3'
    },
    {
      id: 13, upper: 'Ⲙ', lower: 'ⲙ', pair: 'Ⲙ ⲙ', name: 'مي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'م (M)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف ميم <strong>"م"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲙⲁⲛϩⲟⲛ', phoneticAr: 'مانهون', meaning: 'برتقال' },
      soundFile: 'audio_coptic/13mi.mp3'
    },
    {
      id: 14, upper: 'Ⲛ', lower: 'ⲛ', pair: 'Ⲛ ⲛ', name: 'ني',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ن (N)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف نون <strong>"ن"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲉⲛ̀ⲕⲟⲧ', phoneticAr: 'إنكوت', meaning: 'ينام' },
      soundFile: 'audio_coptic/14ni.mp3'
    },
    {
      id: 15, upper: 'Ⲝ', lower: 'ⲝ', pair: 'Ⲝ ⲝ', name: 'كسي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن مركب',
      badgeClass: 'badge-compound',
      pronunciation: 'كـ + س (X)',
      hasMultiple: false,
      multipleCountText: 'نطق مركب مزدوج',
      rules: [
        'حرف مركب يُنطق كاف وسين معاً <strong>(كـ + س = X)</strong> في مقطع صوتي واحد.'
      ],
      word: { coptic: 'ⲝⲟⲩⲏ', phoneticAr: 'إكسومي', meaning: 'مسطرة' },
      soundFile: 'audio_coptic/15axsy.mp3'
    },

    // الوحدة 4 (Ⲟ - Ⲧ)
    {
      id: 16, upper: 'Ⲟ', lower: 'ⲟ', pair: 'Ⲟ ⲟ', name: 'أُو (قصيرة)',
      isVowel: true, vowelType: 'متحرك للضم (قصير)', letterTypeBadge: 'حرف متحرك (للضم قصير)',
      badgeClass: 'badge-vowel',
      pronunciation: 'واو قصيرة مضمومة (O)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف متحرك للضم يُنطق واواً قصيرة مضمومة خفيفة مثل حرف <strong>(O)</strong> في كلمة (not) أو (hot).'
      ],
      word: { coptic: 'ⲟⲩⲱⲙ', phoneticAr: 'أوؤم', meaning: 'يأكل' },
      soundFile: 'audio_coptic/16oo.mp3'
    },
    {
      id: 17, upper: 'Ⲡ', lower: 'ⲡ', pair: 'Ⲡ ⲡ', name: 'بي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ب ثقيلة مشددة (P)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق باء شديدة تخرج بحبس الهواء ثم إطلاقه بقوة مثل حرف <strong>(P)</strong> في الإنجليزية.'
      ],
      word: { coptic: 'ⲡⲓⲱⲧ', phoneticAr: 'بايوت', meaning: 'أبي' },
      soundFile: 'audio_coptic/17pee.mp3'
    },
    {
      id: 18, upper: 'Ⲣ', lower: 'ⲣ', pair: 'Ⲣ ⲣ', name: 'رو',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ر (R)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف راء <strong>"ر"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲣⲏ', phoneticAr: 'ري', meaning: 'شمس' },
      soundFile: 'audio_coptic/18roo.mp3'
    },
    {
      id: 19, upper: 'Ⲥ', lower: 'ⲥ', pair: 'Ⲥ ⲥ', name: 'سيما',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'س (S)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف سين <strong>"س"</strong> في جميع المواضع.'
      ],
      word: { coptic: 'ⲡⲁⲥⲟⲛ', phoneticAr: 'باصون', meaning: 'أخي' },
      soundFile: 'audio_coptic/19sema.mp3'
    },
    {
      id: 20, upper: 'Ⲧ', lower: 'ⲧ', pair: 'Ⲧ ⲧ', name: 'تاف',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ت (T)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف تاء <strong>"ت"</strong> في جميع المواضع والكلمات.'
      ],
      word: { coptic: 'ⲧⲁⲙⲁⲩ', phoneticAr: 'تاماف', meaning: 'أمي' },
      soundFile: 'audio_coptic/20tav.mp3'
    },

    // الوحدة 5 (Ⲩ - Ⲱ)
    {
      id: 21, upper: 'Ⲩ', lower: 'ⲩ', pair: 'Ⲩ ⲩ', name: 'إبسيلون',
      isVowel: true, vowelType: 'متحرك (متعدد الحالات)', letterTypeBadge: 'حرف متحرك (متعدد الحالات)',
      badgeClass: 'badge-vowel',
      pronunciation: 'ڤ (V) أو و أو ي',
      hasMultiple: true,
      multipleCountText: 'له 3 حالات نطق (ڤ / و / ي)',
      rules: [
        'يُنطق <strong>(ڤ / V)</strong>: إذا سبقه حرف Ⲁ (ألفا) أو Ⲉ (إي) مثل المقطعين (ⲀⲨ / ⲈⲨ).',
        'يُنطق <strong>(و ممدودة)</strong>: إذا سبقه حرف Ⲟ (أو قصيرة) في المقطع (ⲞⲨ).',
        'يُنطق <strong>(ي)</strong>: في باقي الحالات إذا لم يسبقه (Ⲁ أو Ⲉ أو Ⲟ).'
      ],
      word: { coptic: 'ⲩⲥⲓⲥ', phoneticAr: 'إيسيس', meaning: 'مطر' },
      soundFile: 'audio_coptic/21epselon.mp3'
    },
    {
      id: 22, upper: 'Ⲫ', lower: 'ⲫ', pair: 'Ⲫ ⲫ', name: 'في',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ف (F)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'يُنطق دائماً حرف فاء <strong>"ف"</strong> مثل حرف <strong>(F)</strong> في الإنجليزية.'
      ],
      word: { coptic: 'ⲫⲉⲃ', phoneticAr: 'أفيغ', meaning: 'بطيخ' },
      soundFile: 'audio_coptic/22fi.mp3'
    },
    {
      id: 23, upper: 'Ⲭ', lower: 'ⲭ', pair: 'Ⲭ ⲭ', name: 'خي (كي)',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن',
      badgeClass: 'badge-consonant',
      pronunciation: 'ك أو ش أو خ',
      hasMultiple: true,
      multipleCountText: 'له 3 أصوات (ك / ش / خ)',
      rules: [
        'يُنطق <strong>(ك)</strong>: في الكلمات ذات الأصل القبطي.',
        'يُنطق <strong>(ش)</strong>: في الكلمات ذات الأصل اليوناني إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).',
        'يُنطق <strong>(خ)</strong>: في الكلمات ذات الأصل اليوناني في باقي الحالات (إذا لم يأتِ بعده كسر).'
      ],
      word: { coptic: 'ⲭ̀ⲗⲓⲗ', phoneticAr: 'إخليل', meaning: 'عقد' },
      soundFile: 'audio_coptic/23ki.mp3'
    },
    {
      id: 24, upper: 'Ⲯ', lower: 'ⲯ', pair: 'Ⲯ ⲯ', name: 'إبسي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن مركب',
      badgeClass: 'badge-compound',
      pronunciation: 'بـ + س (Ps)',
      hasMultiple: false,
      multipleCountText: 'نطق مركب مزدوج',
      rules: [
        'حرف مركب يُنطق باء خفيفة وسين معاً <strong>(بـ + س = Ps)</strong> في مقطع صوتي واحد.'
      ],
      word: { coptic: 'ⲯⲓⲧ ⲛ̀ⲕⲉⲛⲕⲉⲛ', phoneticAr: 'إبسيت إن كينكين', meaning: '9 دفوف' },
      soundFile: 'audio_coptic/24psi.mp3'
    },
    {
      id: 25, upper: 'Ⲱ', lower: 'ⲱ', pair: 'Ⲱ ⲱ', name: 'أوميغا (أو طويلة)',
      isVowel: true, vowelType: 'متحرك للضم (طويل)', letterTypeBadge: 'حرف متحرك (للضم طويل)',
      badgeClass: 'badge-vowel',
      pronunciation: 'واو طويلة ممدودة (Ō)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'آخر الحروف المأخوذة من الأبجدية اليونانية. حرف متحرك للضم يُنطق واواً طويلة مفتوحة مشبعة ممدودة <strong>(Ō)</strong>.'
      ],
      word: { coptic: 'ⲧⲁⲥⲱⲛⲓ', phoneticAr: 'تاسوني', meaning: 'أختي' },
      soundFile: 'audio_coptic/25oo.mp3'
    },

    // الوحدة 6 (Ϣ - Ϫ)
    {
      id: 26, upper: 'Ϣ', lower: 'ϣ', pair: 'Ϣ ϣ', name: 'شاي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'ش (Sh)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'أول الحروف المصرية السبعة المأخوذة من الخط الديموطيقي القديم، يُنطق دائماً حرف شين <strong>"ش"</strong>.'
      ],
      word: { coptic: 'ϣⲁⲩ', phoneticAr: 'شاف', meaning: 'قطة' },
      soundFile: 'audio_coptic/26shay.mp3'
    },
    {
      id: 27, upper: 'Ϥ', lower: 'ϥ', pair: 'Ϥ ϥ', name: 'فاي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'ف (F)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف فاء <strong>"ف"</strong>.'
      ],
      word: { coptic: 'ϥⲱⲓ', phoneticAr: 'فوي', meaning: 'شعر' },
      soundFile: 'audio_coptic/27fay.mp3'
    },
    {
      id: 28, upper: 'Ϧ', lower: 'ϧ', pair: 'Ϧ ϧ', name: 'خاي',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'خ (Kh)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف خاء <strong>"خ"</strong>.'
      ],
      word: { coptic: 'ϧⲏⲃⲥ', phoneticAr: 'خيبس', meaning: 'مصباح' },
      soundFile: 'audio_coptic/28khay.mp3'
    },
    {
      id: 29, upper: 'Ϩ', lower: 'ϩ', pair: 'Ϩ ϩ', name: 'هوري',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'هـ (H)',
      hasMultiple: false,
      multipleCountText: 'نطق واحد ثابت',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً حرف هاء <strong>"هـ"</strong>.'
      ],
      word: { coptic: 'ϩ̀ⲑⲟ', phoneticAr: 'إهثو', meaning: 'حصان' },
      soundFile: 'audio_coptic/29hory.mp3'
    },
    {
      id: 30, upper: 'Ϫ', lower: 'ϫ', pair: 'Ϫ ϫ', name: 'جانجا',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'جـ معطشة أو جـ غير معطشة',
      hasMultiple: true,
      multipleCountText: 'له نطقان (جـ معطشة / جـ)',
      rules: [
        'يُنطق <strong>(جـ معطشة)</strong>: إذا جاء بعده حرف متحرك للكسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ).',
        'يُنطق <strong>(جـ غير معطشة)</strong>: مثل الجيم المصرية في باقي الحالات.'
      ],
      word: { coptic: 'ϫⲉⲙⲫⲉϩ', phoneticAr: 'جيمفيه', meaning: 'تفاح' },
      soundFile: 'audio_coptic/30ganga.mp3'
    },

    // الوحدة 7 (Ϭ - Ϯ)
    {
      id: 31, upper: 'Ϭ', lower: 'ϭ', pair: 'Ϭ ϭ', name: 'تشيما',
      isVowel: false, vowelType: null, letterTypeBadge: 'حرف ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'تش (Tsh)',
      hasMultiple: false,
      multipleCountText: 'نطق مركب (ت + ش)',
      rules: [
        'حرف مصري ديموطيقي أصيل، يُنطق دائماً تاء وشين معاً <strong>(تش)</strong> مثل <strong>(Ch)</strong> في كلمة (church).'
      ],
      word: { coptic: 'ϭⲁϫ', phoneticAr: 'تشاج', meaning: 'عصفور' },
      soundFile: 'audio_coptic/31chema.mp3'
    },
    {
      id: 32, upper: 'Ϯ', lower: 'ϯ', pair: 'Ϯ ϯ', name: 'تي',
      isVowel: false, vowelType: null, letterTypeBadge: 'مقطع ساكن ديموطيقي',
      badgeClass: 'badge-demotic',
      pronunciation: 'تـ + ي (Ti)',
      hasMultiple: false,
      multipleCountText: 'نطق مقطعي (تـ + ي)',
      rules: [
        'الحرف الثاني والثلاثون، آخر حروف الأبجدية القبطية. مقطع صوتي ديموطيقي مركب يُنطق تاء متبوعة بكسرة ياء <strong>(تـ + ي = Ti)</strong>.'
      ],
      word: { coptic: 'ϯⲙⲓ', phoneticAr: 'تيمي', meaning: 'قرية' },
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
                <button type="button" class="btn-listen-word" aria-label="استمع لنطق الكلمة" title="استمع لنطق الكلمة" onclick="if(window.playChallengeAudio){ window.playChallengeAudio('', '${phoneticAr}', this); } else if(window.CurriculumAdminSystem && CurriculumAdminSystem.playAudioSnippet){ CurriculumAdminSystem.playAudioSnippet('', '${phoneticAr}', this); } else if(window.Sound && window.Sound.playChallengeAudio){ window.Sound.playChallengeAudio('', '${phoneticAr}'); }">
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
    window.formatPronunciationOption = formatPronunciationOption;
    window.extractWordMeaningAndPhonetic = extractWordMeaningAndPhonetic;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      COPTIC_LETTERS_CATALOG: CATALOG,
      findLetterCatalogItem,
      renderLetterOverviewCardHtml,
      formatPronunciationOption,
      extractWordMeaningAndPhonetic
    };
  }
})();
