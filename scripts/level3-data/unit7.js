// =========================================================================
// Level 3 - Unit 7: فك شفرات الاختصارات والرموز والمخطوطات
// Total Lessons: 4 | Total Challenges: 30 (4189 - 4218)
// =========================================================================

module.exports = {
  id: 77,
  level_id: 7,
  title: "الوحدة ٧: فك شفرات الاختصارات والرموز والمخطوطات",
  badge: "Ⲓ̅Ⲏ̅Ⲥ",
  description: "تحليل الأسماء المقدسة (Nomina Sacra)، اختصارات الألقاب الكنسية، ونظام الأرقام والتوثيق المخطوطي.",
  order_index: 7,
  lessons: [
    {
      id: 326,
      title: "الأسماء المقدسة الرئيسية (Nomina Sacra)",
      challenges: [
        {
          id: 4189,
          type: "select",
          question: "ماذا يسمى وضع خط أفقي يعلو حرفين أو ثلاثة في المخطوطات القبطية للدلالة على اسم إلهي مقدس؟",
          coptic_display: "Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅",
          options: [
            { text: "الأسماء المقدسة (Nomina Sacra)", is_correct: true },
            { text: "الجنكم التكراري", is_correct: false },
            { text: "علامة الاستفهام الكنسية", is_correct: false },
            { text: "شكل النغمة اللحنية", is_correct: false }
          ],
          explanation: "Nomina Sacra هي الاختصارات التقوية للألقاب والأسماء الإلهية في المخطوطات المبكرة تعبيراً عن التوقير."
        },
        {
          id: 4190,
          type: "read_select",
          question: "إلى أي اسم يشير الاختصار الكنسي الشهير «Ⲓ̅ⲏ̅ⲥ̅» أو «Ⲓ̅ⲥ̅» في الأيقونات والمخطوطات؟",
          coptic_display: "Ⲓ̅ⲏ̅ⲥ̅",
          options: [
            { text: "ⲓⲏⲥⲟⲩⲥ (يسوع)", is_correct: true },
            { text: "ⲓⲱⲁⲛⲛⲏⲥ (يوحنا)", is_correct: false },
            { text: "ⲓⲁⲕⲱⲃⲟⲥ (يعقوب)", is_correct: false },
            { text: "ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ (أورشليم)", is_correct: false }
          ],
          explanation: "Ⲓ̅ⲏ̅ⲥ̅ اختصار لاسم الخلاص: يسوع (ⲓⲏⲥⲟⲩⲥ)."
        },
        {
          id: 4191,
          type: "true_false",
          question: "الاختصار «Ⲡ̅ⲭ̅ⲥ̅» في المخطوطات والأيقونات يشير إلى لقب «Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ» (المسيح).",
          coptic_display: "Ⲡ̅ⲭ̅ⲥ̅",
          is_correct: true,
          explanation: "صحيح؛ Ⲡ̅ⲭ̅ⲥ̅ اختصار (بي خريستوس = المسيح)."
        },
        {
          id: 4192,
          type: "match",
          question: "طابق كل اختصار مقدس بالاسم الكامل الذي يمثله في الكنيسة:",
          pairs: [
            { left: "Ⲓ̅ⲥ̅", right: "ⲓⲏⲥⲟⲩⲥ (يسوع)" },
            { left: "Ⲡ̅ⲭ̅ⲥ̅", right: "Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (المسيح)" },
            { left: "Ⲑ̅ⲥ̅", right: "Ⲑⲉⲟⲥ (الله)" },
            { left: "Ⲡ̅ⲛ̅ⲁ̅", right: "Ⲡⲛⲉⲩⲙⲁ (الروح)" }
          ],
          explanation: "أشهر أربعة اختصارات لاهوتية في التراث المخطوطي الأرثوذكسي."
        },
        {
          id: 4193,
          type: "select",
          question: "في كتابة «Ⲟ̅ⲥ̅» أو «Ⲑ̅ⲥ̅»، يشير الاختصار إلى كلمة يونانية شهيرة هي:",
          coptic_display: "Ⲑ̅ⲥ̅",
          options: [
            { text: "Ⲑⲉⲟⲥ (ثيئوس = الله)", is_correct: true },
            { text: "Ⲑⲱⲟⲩⲧ (توت)", is_correct: false },
            { text: "Ⲑⲁⲙⲓⲟ (يخلق)", is_correct: false },
            { text: "Ⲑⲉⲗⲏⲙⲁ (مشيئة)", is_correct: false }
          ],
          explanation: "Ⲑ̅ⲥ̅ اختصار لكلمة Ⲑⲉⲟⲥ (الله)."
        },
        {
          id: 4194,
          type: "fill_blank",
          question: "أكمل الاسم الكامل للاختصار المقدس 'المسيح' (Ⲡⲓ...ⲥⲧⲟⲥ):",
          coptic_display: "Ⲡⲓ...ⲥⲧⲟⲥ",
          correct_word: "ⲭⲣⲓ",
          options: [
            { text: "ⲭⲣⲓ", is_correct: true },
            { text: "ⲕⲣⲓ", is_correct: false },
            { text: "ϣⲣⲓ", is_correct: false }
          ],
          explanation: "Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ = المسيح."
        },
        {
          id: 4195,
          type: "write",
          question: "رتّب حروف الاسم الإلهي 'يسوع' بالقبطية كاملاً (إيسوس):",
          coptic_display: "Ⲓⲏⲥⲟⲩⲥ",
          tiles: ["Ⲓ", "ⲏ", "ⲥ", "ⲟⲩ", "ⲥ"],
          correct_word: "Ⲓⲏⲥⲟⲩⲥ",
          explanation: "Ⲓⲏⲥⲟⲩⲥ = يسوع."
        },
        {
          id: 4196,
          type: "read_select",
          question: "على أيقونة ضابط الكل يكتب «Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅»، ما هي الترجمة الحرفية الدقيقة؟",
          coptic_display: "Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅",
          options: [
            { text: "يسوع المسيح", is_correct: true },
            { text: "ابن الله", is_correct: false },
            { text: "مخلص العالم", is_correct: false },
            { text: "ملك الملوك", is_correct: false }
          ],
          explanation: "Ⲓ̅ⲥ̅ (يسوع) Ⲡ̅ⲭ̅ⲥ̅ (المسيح)."
        }
      ]
    },
    {
      id: 327,
      title: "اختصارات الألقاب والصلوات الشائعة",
      challenges: [
        {
          id: 4197,
          type: "select",
          question: "في كتب القطمارس والدفنار، ماذا يعني اختصار «ⲁ̅ⲗ» في بداية الفقرات؟",
          coptic_display: "ⲁ̅ⲗ",
          options: [
            { text: "اختصار لكلمة «Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ» (هلليلويا)", is_correct: true },
            { text: "اختصار للألفا الأولى", is_correct: false },
            { text: "اختصار لكلمة ألو (صبي)", is_correct: false },
            { text: "اختصار لمدينة الإسكندرية", is_correct: false }
          ],
          explanation: "ⲁ̅ⲗ هي الاختصار الطقسي المعتمد لترتيل كلمة «هلليلويا»."
        },
        {
          id: 4198,
          type: "read_select",
          question: "في المخطوطات الطقسية، إلى ماذا يرمز الحرف «Ⲇ̅» أو «Ⲇⲟ̅» في هوامش الخدمة؟",
          coptic_display: "Ⲇ̅",
          options: [
            { text: "مرد المجد «Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ» (المجد للآب)", is_correct: true },
            { text: "الشماس دياكون", is_correct: false },
            { text: "الداود النبي", is_correct: false },
            { text: "اليوم العاشر", is_correct: false }
          ],
          explanation: "Ⲇ̅ أو Ⲇⲟ̅ يرمز للمجدلة الصغرى (ذوكسا باتري)."
        },
        {
          id: 4199,
          type: "true_false",
          question: "يرمز الحرفان «Ⲕ̅ⲉ̅» في نصوص المردات الكنسية إلى «Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ» (يا رب ارحم).",
          coptic_display: "Ⲕ̅ⲉ̅",
          is_correct: true,
          explanation: "صحيح؛ Ⲕ̅ⲉ̅ اختصار شائع جداً في كتب الصلوات لطلب الرحمة (كيرياليسون)."
        },
        {
          id: 4200,
          type: "match",
          question: "طابق كل رمز اختصاري بالعبارة الطقسية الكاملة له:",
          pairs: [
            { left: "Ⲕ̅ⲉ̅", right: "Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ (يا رب ارحم)" },
            { left: "ⲁ̅ⲗ", right: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (هلليلويا)" },
            { left: "ⲉ̅ⲑ̅ⲩ̅", right: "ⲉⲑⲟⲩⲁⲃ (قدوس / طاهر)" },
            { left: "ⲡ̅ⲣ̅", right: "ⲡⲣⲟⲥⲉⲩⲭⲏ (صلاة / طلبة)" }
          ],
          explanation: "اختصارات شائعة في المخطوطات والكتب الطقسية القبطية."
        },
        {
          id: 4201,
          type: "select",
          question: "ما معنى العبارة اليونانية الشهيرة «Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ»؟",
          coptic_display: "Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ",
          options: [
            { text: "يا رب ارحم", is_correct: true },
            { text: "يا رب اسمع", is_correct: false },
            { text: "المجد لله", is_correct: false },
            { text: "السلام للجميع", is_correct: false }
          ],
          explanation: "Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ = يا رب ارحم."
        },
        {
          id: 4202,
          type: "fill_blank",
          question: "أكمل نداء طلب الرحمة باليونانية (Ⲕⲩⲣⲓⲉ ...):",
          coptic_display: "Ⲕⲩⲣⲓⲉ ...",
          correct_word: "ⲉⲗⲉⲏⲥⲟⲛ",
          options: [
            { text: "ⲉⲗⲉⲏⲥⲟⲛ", is_correct: true },
            { text: "ⲁⲝⲓⲟⲥ", is_correct: false },
            { text: "ⲇⲟⲝⲁ", is_correct: false }
          ],
          explanation: "Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ = يا رب ارحم."
        },
        {
          id: 4203,
          type: "write",
          question: "رتّب حروف كلمة 'يا رب' باليونانية الطقسية (كيريي):",
          coptic_display: "Ⲕⲩⲣⲓⲉ",
          tiles: ["Ⲕ", "ⲩ", "ⲣ", "ⲓ", "ⲉ"],
          correct_word: "Ⲕⲩⲣⲓⲉ",
          explanation: "Ⲕⲩⲣⲓⲉ = يا رب."
        }
      ]
    },
    {
      id: 328,
      title: "نظام الترقيم القبطي الكامل (الحساب بالأبجدية من 1 إلى 900)",
      challenges: [
        {
          id: 4204,
          type: "select",
          question: "كيف يُعبَّر عن الأرقام في نظام الترقيم الحسابي القبطي؟",
          coptic_display: "حساب الجُمّل القبطي",
          options: [
            { text: "باستخدام حروف الأبجدية القبطية يعلوها خط أفقي لتمييزها كأرقام عددية", is_correct: true },
            { text: "باستخدام أرقام هيروغليفية معقدة", is_correct: false },
            { text: "بالأرقام الرومانية I, V, X فقط", is_correct: false },
            { text: "بالأرقام الهندية العربية 1, 2, 3", is_correct: false }
          ],
          explanation: "نظام الترقيم القبطي يخصص لكل حرف قيمة عددية (Ⲁ=1، Ⲃ=2...) مع وضع خط أفقي فوقه."
        },
        {
          id: 4205,
          type: "read_select",
          question: "ما هي القيمة العددية للرمز الخاص «ⲋ̅» (سو) في حساب الأرقام القبطي؟",
          coptic_display: "ⲋ̅",
          options: [
            { text: "الرقم ستة (6)", is_correct: true },
            { text: "الرقم سبعة (7)", is_correct: false },
            { text: "الرقم ستين (60)", is_correct: false },
            { text: "الرقم ستمائة (600)", is_correct: false }
          ],
          explanation: "ⲋ̅ هو الرمز العددي المخصص للرقم 6 (سو)."
        },
        {
          id: 4206,
          type: "true_false",
          question: "الحرف «Ⲓ̅» يمثل الرقم 10، والحرف «ⲣ̅» يمثل الرقم 100 في الحساب القبطي.",
          coptic_display: "Ⲓ̅ = 10 / ⲣ̅ = 100",
          is_correct: true,
          explanation: "صحيح؛ عقود العشرات تبدأ بـ Ⲓ (10)، والمئات تبدأ بـ Ⲣ (100)."
        },
        {
          id: 4207,
          type: "match",
          question: "طابق الحروف بالأرقام العددية التي تمثلها في حساب الأبجدية القبطية:",
          pairs: [
            { left: "ⲁ̅", right: "1 (واحد)" },
            { left: "ⲉ̅", right: "5 (خمسة)" },
            { left: "ⲋ̅", right: "6 (ستة)" },
            { left: "ⲓ̅", right: "10 (عشرة)" }
          ],
          explanation: "القيم العددية لآحاد الأرقام القبطية."
        },
        {
          id: 4208,
          type: "select",
          question: "كيف يكتب الرقم 12 بالقبطية بدمج العشرات والآحاد (10 + 2)؟",
          coptic_display: "العدد 12",
          options: [
            { text: "Ⲓ̅ⲃ̅ (عشرة Ⲓ + اثنان Ⲃ)", is_correct: true },
            { text: "Ⲃ̅Ⲓ̅", is_correct: false },
            { text: "ⲁ̅ⲃ̅", is_correct: false },
            { text: "ⲙ̅ⲃ̅", is_correct: false }
          ],
          explanation: "الترقيم يضع العشرات أولاً ثم الآحاد: Ⲓ̅ⲃ̅ = 12."
        },
        {
          id: 4209,
          type: "fill_blank",
          question: "أكمل كتابة الرمز العددي القبطي للرقم 6 (سو):",
          coptic_display: "...̅",
          correct_word: "ⲋ̅",
          options: [
            { text: "ⲋ̅", is_correct: true },
            { text: "ⲍ̅", is_correct: false },
            { text: "ⲉ̅", is_correct: false }
          ],
          explanation: "ⲋ̅ = الرقم ستة (6)."
        },
        {
          id: 4210,
          type: "write",
          question: "رتّب حروف العدد 15 بالقبطية (10 + 5 = Ⲓ̅ⲉ̅):",
          coptic_display: "Ⲓ̅ⲉ̅",
          tiles: ["Ⲓ̅", "ⲉ̅"],
          correct_word: "Ⲓ̅ⲉ̅",
          explanation: "Ⲓ̅ⲉ̅ = 15."
        },
        {
          id: 4211,
          type: "read_select",
          question: "ما هو الحرف الذي يمثل الرقم ثمانية (8) في الأرقام القبطية؟",
          coptic_display: "الرقم 8",
          options: [
            { text: "حرف الإيتا (Ⲏ̅)", is_correct: true },
            { text: "حرف الزاتا (Ⲍ̅)", is_correct: false },
            { text: "حرف الثيتا (Ⲑ̅)", is_correct: false },
            { text: "حرف الكابا (Ⲕ̅)", is_correct: false }
          ],
          explanation: "Ⲍ̅=7، Ⲏ̅=8، Ⲑ̅=9، Ⲓ̅=10."
        }
      ]
    },
    {
      id: 329,
      title: "قراءة وتفكيك نماذج حقيقية من نصوص المخطوطات والصلوات",
      challenges: [
        {
          id: 4212,
          type: "select",
          question: "عند قراءة سطر مخطوطي يبدأ بـ «Ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ»، ما معنى هذه العبارة الإنجيلية الشهيرة؟",
          coptic_display: "Ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ",
          options: [
            { text: "ملكوت السموات", is_correct: true },
            { text: "كنيسة القديسين", is_correct: false },
            { text: "صلاة الأبرار", is_correct: false },
            { text: "عرش الآباء", is_correct: false }
          ],
          explanation: "Ϯⲙⲉⲧⲟⲩⲣⲟ = الملكوت، ⲛ̀ⲧⲉ = أداة إضافة (ـلـ)، ⲛⲓⲫⲏⲟⲩⲓ = السموات."
        },
        {
          id: 4213,
          type: "read_select",
          question: "في النص المخطوطي «Ⲁⲙⲏⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ»، كم لغة تشترك في صياغة هذه التسبيحة الجامعة؟",
          coptic_display: "Ⲁⲙⲏⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ",
          options: [
            { text: "لغتان: العبرانية (آمين، هلليلويا) واليونانية (ذوكسا باتري)", is_correct: true },
            { text: "القبطية فقط", is_correct: false },
            { text: "اللاتينية والعربية", is_correct: false },
            { text: "السريانية والفارسية", is_correct: false }
          ],
          explanation: "آمين وهلليلويا عبريتان أصيلتان، وذوكسا باتري يونانية، واستوعبتهما الليتورجيا القبطية بامتياز."
        },
        {
          id: 4214,
          type: "true_false",
          question: "تتميز المخطوطات القبطية القديمة بعدم وضع فواصل ومسافات واسعة بين الكلمات في بعض العصور (Scriptio continua).",
          coptic_display: "المخطوطات القديمة",
          is_correct: true,
          explanation: "صحيح؛ كانت المخطوطات القديمة تكتب الكلمات متصلة وتعتمد على دراية القارئ بالقواعد للتقطيع."
        },
        {
          id: 4215,
          type: "match",
          question: "طابق المقاطع المخطوطية بمعناها في التحليل الإنجيلي:",
          pairs: [
            { left: "Ϯⲙⲉⲧⲟⲩⲣⲟ", right: "الملكوت (الملكية العظمى)" },
            { left: "ⲛⲓⲫⲏⲟⲩⲓ", right: "السموات (جمع بفي = سماء)" },
            { left: "Ⲡⲉⲛⲛⲟⲩϯ", right: "إلهنا (نووتي + بين)" },
            { left: "Ⲡⲉⲛⲥⲱⲧⲏⲣ", right: "مخلصنا (سوتير + بين)" }
          ],
          explanation: "مفردات لاهوتية تأسيسية في قراءة المخطوطات."
        },
        {
          id: 4216,
          type: "select",
          question: "في نهاية فصول الأناجيل بالمخطوطات نجد «Ⲡⲉⲧⲉ ⲟⲩⲟⲛ ⲙⲁϣϫ ⲙ̀ⲙⲟϥ ⲉ̀ⲥⲱⲧⲉⲙ»، ما معناه؟",
          coptic_display: "Ⲡⲉⲧⲉ ⲟⲩⲟⲛ ⲙⲁϣϫ ⲙ̀ⲙⲟϥ ⲉ̀ⲥⲱⲧⲉⲙ",
          options: [
            { text: "من له أذنان للسمع فليسمع", is_correct: true },
            { text: "المجد لله دائماً أبدياً", is_correct: false },
            { text: "طوبى لمن يتلو هذا الكلام", is_correct: false },
            { text: "هذا هو إنجيل المسيح", is_correct: false }
          ],
          explanation: "ⲙⲁϣϫ = أذنان، ⲥⲱⲧⲉⲙ = يسمع: (من له أذنان للسمع فليسمع)."
        },
        {
          id: 4217,
          type: "fill_blank",
          question: "أكمل الكلمة المخطوطية الشهيرة لـ 'الملكوت' (Ϯ...ⲟⲩⲣⲟ):",
          coptic_display: "Ϯ...ⲟⲩⲣⲟ",
          correct_word: "ⲙⲉⲧ",
          options: [
            { text: "ⲙⲉⲧ", is_correct: true },
            { text: "ⲣⲉϥ", is_correct: false },
            { text: "ϫⲓⲛ", is_correct: false }
          ],
          explanation: "ⲙⲉⲧ- سابقة لتكوين الأسماء المعنوية: Ϯⲙⲉⲧⲟⲩⲣⲟ = الملكوت."
        },
        {
          id: 4218,
          type: "write",
          question: "رتّب حروف كلمة 'الملكوت' بالقبطية كاملة (تي ميت أورو):",
          coptic_display: "Ϯⲙⲉⲧⲟⲩⲣⲟ",
          tiles: ["Ϯ", "ⲙⲉⲧ", "ⲟⲩ", "ⲣ", "ⲟ"],
          correct_word: "Ϯⲙⲉⲧⲟⲩⲣⲟ",
          explanation: "Ϯⲙⲉⲧⲟⲩⲣⲟ = الملكوت."
        }
      ]
    }
  ]
};
