// =========================================================================
// Level 3 - Unit 10: الامتحان النهائي الشامل ومشروع الإتقان
// Total Lessons: 4 | Total Challenges: 28 (4289 - 4316)
// =========================================================================

module.exports = {
  id: 80,
  level_id: 7,
  title: "الوحدة ١٠: الامتحان النهائي الشامل ومشروع الإتقان",
  badge: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ",
  description: "الاختبارات التشخيصية الشاملة للأصوات والقواعد والمفردات ونيل لقب المتقن القبطي الشامل (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ).",
  order_index: 10,
  lessons: [
    {
      id: 339,
      title: "الاختبار التشخيصي الشامل: الأصوات والحروف",
      challenges: [
        {
          id: 4289,
          type: "select",
          question: "ما هو الحرف المتحرك الوحيد الذي يمثل حركة الفتح الصريحة في الأبجدية القبطية؟",
          coptic_display: "حركة الفتح",
          options: [
            { text: "الألفا (Ⲁ)", is_correct: true },
            { text: "الإي (Ⲉ)", is_correct: false },
            { text: "الإيتا (Ⲏ)", is_correct: false },
            { text: "الأوميجا (Ⲱ)", is_correct: false }
          ],
          explanation: "حرف الألفا Ⲁ هو حركة الفتح الوحيدة في القبطية."
        },
        {
          id: 4290,
          type: "read_select",
          question: "متى يُنطق حرف الفيدا (Ⲃ) صوتاً شفتانياً (ب)؟",
          coptic_display: "Ⲃ",
          options: [
            { text: "إذا لم يأتِ بعده حرف متحرك، أو جاء في نهاية الكلمة", is_correct: true },
            { text: "إذا جاء بعده أي حرف متحرك", is_correct: false },
            { text: "إذا كان في كلمة يونانية فقط", is_correct: false },
            { text: "إذا كان فوقه جنكم دائماً", is_correct: false }
          ],
          explanation: "قاعدة الفيدا: ينطق ڤ إذا تلاه متحرك، وب إذا لم يليه متحرك أو في نهاية الكلمة."
        },
        {
          id: 4291,
          type: "true_false",
          question: "حرف الغاما (Ⲅ) ينطق جيماً معطشة في الكلمات القبطية الأصلية دائماً.",
          coptic_display: "Ⲅ",
          is_correct: false,
          explanation: "خطأ؛ ينطق جيماً معطشة حصراً في الكلمات اليونانية المتبوعة بمتحرك كسر، أما في القبطي فينطق غيناً."
        },
        {
          id: 4292,
          type: "match",
          question: "طابق الحروف بالأصوات الصوتية الفارقة التي تمثلها في الاختبار التشخيصي:",
          pairs: [
            { left: "Ⲏ", right: "ياء مكسورة طويلة ممتدة" },
            { left: "Ⲱ", right: "واو طويلة مفتوحة مفخمة" },
            { left: "Ϧ", right: "خاء صريحة قبطية دائماً" },
            { left: "Ⲝ", right: "ك + س (حرف مزدوج يوناني)" }
          ],
          explanation: "اختبار قياس معرفة مخارج الحروف وقواعدها."
        },
        {
          id: 4293,
          type: "select",
          question: "ما الصوت الناتج عن اجتماع حرف الألفا مع الإبسلون «ⲁⲩ» في الكلمات مثل «ⲥⲧⲁⲩⲣⲟⲥ»؟",
          coptic_display: "ⲁⲩ",
          options: [
            { text: "آڤ (صوت ڤ شفتاني-أسناني)", is_correct: true },
            { text: "أوو (واو مضمومة)", is_correct: false },
            { text: "آي (ياء مفتوحة)", is_correct: false },
            { text: "أف (فاء صلبة)", is_correct: false }
          ],
          explanation: "المركب ⲁⲩ ينطق آڤ دائماً."
        },
        {
          id: 4294,
          type: "fill_blank",
          question: "أكمل الكلمة بالحرف المناسب لنطق 'شجرة' (ڤو): (...ⲱ):",
          coptic_display: "...ⲱ",
          correct_word: "ⲃⲱ",
          options: [
            { text: "ⲃⲱ", is_correct: true },
            { text: "ⲫⲱ", is_correct: false },
            { text: "ⲡⲱ", is_correct: false }
          ],
          explanation: "ⲃⲱ = شجرة."
        },
        {
          id: 4295,
          type: "write",
          question: "رتّب حروف كلمة 'اسم' بالقبطية بحرف الألفا الفاتح (ران):",
          coptic_display: "ⲣⲁⲛ",
          tiles: ["ⲣ", "ⲁ", "ⲛ"],
          correct_word: "ⲣⲁⲛ",
          explanation: "ⲣⲁⲛ = اسم."
        }
      ]
    },
    {
      id: 340,
      title: "الاختبار الشامل: قواعد القراءة والمقاطع والأصل المعجمي",
      challenges: [
        {
          id: 4296,
          type: "select",
          question: "ما هو الأثر الصوتي للجنكم على الحرف الساكن العادي مقارنة بالجنكم على الحرف المتحرك؟",
          coptic_display: "الجنكم الشامل",
          options: [
            { text: "على الساكن يسبقه بهمزة مكسورة خفيفة (إِ)، وعلى العلة يمنحه نبرة واستقلالاً صوتياً", is_correct: true },
            { text: "كلاهما ينطقان واواً ممدودة", is_correct: false },
            { text: "على الساكن يسكنه دون صوت، وعلى العلة يحذفه", is_correct: false },
            { text: "لا يوجد أي تأثير للجنكم", is_correct: false }
          ],
          explanation: "خلاصة قاعدة الجنكم المعتمدة في المنهج."
        },
        {
          id: 4297,
          type: "read_select",
          question: "كم عدد الحروف القبطية السبعة المأخوذة من الخط الديموطيقي التي تثبت قبطية الكلمة؟",
          coptic_display: "الحروف الديموطيقية",
          options: [
            { text: "7 حروف: (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ)", is_correct: true },
            { text: "3 حروف فقط", is_correct: false },
            { text: "5 حروف", is_correct: false },
            { text: "12 حرفاً", is_correct: false }
          ],
          explanation: "الحروف السبعة الأخيرة في الأبجدية هي علامات الأصل القبطي الصميم."
        },
        {
          id: 4298,
          type: "true_false",
          question: "حرف الكي (Ⲭ) في كلمة «ⲭⲏⲙⲓ» ينطق خاء لأن الكلمة قبطية، بينما في «Ⲭⲉⲣⲉ» ينطق شين لأن الكلمة يونانية متبوعة بمتحرك كسر.",
          coptic_display: "Ⲭ في ⲭⲏⲙⲓ و Ⲭⲉⲣⲉ",
          is_correct: true,
          explanation: "صحيح؛ هذا التطبيق المقارن يبرهن على التمييز المعجمي التام."
        },
        {
          id: 4299,
          type: "match",
          question: "طابق كل كلمة بأصلها اللغوي وقاعدتها النطقية المقابلة:",
          pairs: [
            { left: "ⲭⲏⲙⲓ", right: "قبطية أصيلة - الكي تنطق خاء" },
            { left: "Ⲇⲟⲝⲁ", right: "يونانية الأصل - الدلدا تنطق ذال" },
            { left: "ⲯⲁⲗⲙⲟⲥ", right: "يونانية الأصل - تبدأ بحرف الإبسي" },
            { left: "ⲱⲛϧ", right: "قبطية صميمة - تنتهي بحرف الخاي" }
          ],
          explanation: "مقارنة معجمية دقيقة تؤكد التمكن من أصول الكلمات."
        },
        {
          id: 4300,
          type: "select",
          question: "كم مقطعاً صوتياً في الكلمة الطقسية «ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ» (ضابط الكل)؟",
          coptic_display: "ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ",
          options: [
            { text: "4 مقاطع صوتية: (بان / تو / كرا / تور)", is_correct: true },
            { text: "مقطعان فقط", is_correct: false },
            { text: "3 مقاطع", is_correct: false },
            { text: "5 مقاطع", is_correct: false }
          ],
          explanation: "ⲡⲁⲛ (1) - ⲧⲟ (2) - ⲕⲣⲁ (3) - ⲧⲱⲣ (4)."
        },
        {
          id: 4301,
          type: "fill_blank",
          question: "أكمل كلمة 'مجد' بحرف الإكسي المركب (ذوكسا): (Ⲇⲟ...ⲁ):",
          coptic_display: "Ⲇⲟ...ⲁ",
          correct_word: "ⲝ",
          options: [
            { text: "ⲝ", is_correct: true },
            { text: "ⲯ", is_correct: false },
            { text: "ⲥ", is_correct: false }
          ],
          explanation: "Ⲇⲟⲝⲁ بحرف ⲝ."
        },
        {
          id: 4302,
          type: "write",
          question: "رتّب حروف كلمة 'مصر' بالقبطية (خيمي):",
          coptic_display: "ⲭⲏⲙⲓ",
          tiles: ["ⲭ", "ⲏ", "ⲙ", "ⲓ"],
          correct_word: "ⲭⲏⲙⲓ",
          explanation: "ⲭⲏⲙⲓ = مصر."
        }
      ]
    },
    {
      id: 341,
      title: "الاختبار الشامل: المفردات والنحو والتراكيب الليتورجية",
      challenges: [
        {
          id: 4303,
          type: "select",
          question: "ما هي أداة التعريف لجمع الأسماء المذكر والمؤنث في القبطية؟",
          coptic_display: "أداة تعريف الجمع",
          options: [
            { text: "Ⲛⲓ- (مثل: Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ)", is_correct: true },
            { text: "Ⲡⲓ-", is_correct: false },
            { text: "Ϯ-", is_correct: false },
            { text: "Ⲟⲩ-", is_correct: false }
          ],
          explanation: "Ⲛⲓ هي أداة التعريف للجمع العام بنوعيه."
        },
        {
          id: 4304,
          type: "read_select",
          question: "في عبارة «Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ»، لماذا جاءت أداة الإضافة ميماً «ⲙ̀» بدلاً من نون «ⲛ̀»؟",
          coptic_display: "ⲙ̀Ⲫⲛⲟⲩϯ",
          options: [
            { text: "لأن كلمة «Ⲫⲛⲟⲩϯ» تبدأ بحرف شفوي هو الفاي (Ⲫ)", is_correct: true },
            { text: "لأن الكلمة جمع", is_correct: false },
            { text: "لأنها أداة نفي", is_correct: false },
            { text: "بسبب وجود حرف علة", is_correct: false }
          ],
          explanation: "تنقلب أداة النسبة ⲛ̀ إلى ⲙ̀ قبل الشفويات (Ⲃ, ⲙ, Ⲡ, Ⲫ, Ⲯ)."
        },
        {
          id: 4305,
          type: "true_false",
          question: "في الجملة الاسمية «Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ»، تفيد الأداة «ⲡⲉ» ربط المبتدأ المذكر بالخبر وتأكيد الكينونة (الله محبة).",
          coptic_display: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ",
          is_correct: true,
          explanation: "صحيح؛ ⲡⲉ هي رابطة الكينونة للمذكر."
        },
        {
          id: 4306,
          type: "match",
          question: "طابق المصطلحات الليتورجية بترجماتها الدقيقة:",
          pairs: [
            { left: "ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ⲡⲓⲥⲛⲟϥ", right: "الجسد والدم الأقدسان" },
            { left: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ", right: "أبانا الذي في السموات" },
            { left: "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ", right: "نسجد للآب" },
            { left: "Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ", right: "المسيح قام" }
          ],
          explanation: "أعمدة الصلوات والتسابيح الكنسية القبطية."
        },
        {
          id: 4307,
          type: "select",
          question: "ماذا يمثل الاختصار المقدس «Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅» المكتوب على الأيقونات القبطية؟",
          coptic_display: "Ⲓ̅ⲥ̅ Ⲡ̅ⲭ̅ⲥ̅",
          options: [
            { text: "يسوع المسيح (Nomina Sacra)", is_correct: true },
            { text: "يوحنا المعمدان", is_correct: false },
            { text: "يعقوب الرسول", is_correct: false },
            { text: "يوسف النجار", is_correct: false }
          ],
          explanation: "Ⲓ̅ⲥ̅ = يسوع، Ⲡ̅ⲭ̅ⲥ̅ = المسيح."
        },
        {
          id: 4308,
          type: "fill_blank",
          question: "أكمل عبارة 'أبانا الذي في السموات' (Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ...):",
          coptic_display: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ...",
          correct_word: "ⲛⲓⲫⲏⲟⲩⲓ",
          options: [
            { text: "ⲛⲓⲫⲏⲟⲩⲓ", is_correct: true },
            { text: "ⲡⲓⲕⲁϩⲓ", is_correct: false },
            { text: "ⲛⲓⲁⲅⲅⲉⲗⲟⲥ", is_correct: false }
          ],
          explanation: "ⲛⲓⲫⲏⲟⲩⲓ = السموات."
        },
        {
          id: 4309,
          type: "write",
          question: "رتّب حروف عبارة 'أنا هو' بالقبطية (آنوك بي):",
          coptic_display: "Ⲁⲛⲟⲕ ⲡⲉ",
          tiles: ["Ⲁⲛⲟⲕ", "ⲡⲉ"],
          correct_word: "Ⲁⲛⲟⲕ ⲡⲉ",
          explanation: "Ⲁⲛⲟⲕ ⲡⲉ = أنا هو."
        }
      ]
    },
    {
      id: 342,
      title: "مشروع التخرج النهائي ونيل لقب «المتقن القبطي الشامل» (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ)",
      challenges: [
        {
          id: 4310,
          type: "select",
          question: "ما المعنى اللغوي والروحي الرفيع للقب التخرج القبطي «Ⲡⲓⲣⲉϥⲥⲁⲃⲉ» (بي ريف سابيه)؟",
          coptic_display: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ",
          options: [
            { text: "الحكيم المتقن / العالم باللغة وتراث الآباء", is_correct: true },
            { text: "القارئ المبتدئ", is_correct: false },
            { text: "المستمع الصامت", is_correct: false },
            { text: "الناسخ الخطي فقط", is_correct: false }
          ],
          explanation: "ⲥⲁⲃⲉ تعني حكيم أو عليم، و ⲣⲉϥ- سابقة الفاعل: Ⲡⲓⲣⲉϥⲥⲁⲃⲉ = الحكيم المتقن الشامل."
        },
        {
          id: 4311,
          type: "read_select",
          question: "عند تلاوة نص قبطي كامل بطلاقة مع إخراج كل حرف من مخرجه ومراعاة أزمنة المد والجنكم، تكون قد حققت:",
          coptic_display: "الإتقان الليتورجي",
          options: [
            { text: "معيار القراءة الكنسية الأرثوذكسية الأصيلة السليمة 100%", is_correct: true },
            { text: "قراءة سريعة دون معنى", is_correct: false },
            { text: "نطقاً محرفاً غير مقبول", is_correct: false },
            { text: "مجرد تكرار آلي", is_correct: false }
          ],
          explanation: "هذا هو جوهر التخرج في المستوى الثالث: الجمع بين الدقة الصوتية والفهم اللغوي والتطبيق الطقسي."
        },
        {
          id: 4312,
          type: "true_false",
          question: "اللغة القبطية هي المرحلة الأخيرة من مراحل اللغة المصرية القديمة مكتوبة بأبجدية مشتقة من اليونانية والخط الديموطيقي.",
          coptic_display: "تاريخ اللغة القبطية",
          is_correct: true,
          explanation: "صحيح؛ القبطية تمثل التطور الأخير للمصرية القديمة (الهيروغليفية والهيراطيقية والديموطيقية)."
        },
        {
          id: 4313,
          type: "match",
          question: "طابق كل مستوى من مستويات المنصة بإنجازه التعليمي الأكبر:",
          pairs: [
            { left: "المستوى الأول", right: "إتقان الـ 32 حرفاً ورمزاً بالقراءة والكتابة" },
            { left: "المستوى الثاني", right: "قواعد القراءة، الجنكم، الحركات والمقاطع" },
            { left: "المستوى الثالث", right: "المراجعة الشاملة، النحو، النصوص والتطبيق المتقدم" },
            { left: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ", right: "لقب التخرج الشرفي الممنوح للمتفوقين" }
          ],
          explanation: "المسار الأكاديمي المتكامل لمنصة MG COPTIC."
        },
        {
          id: 4314,
          type: "select",
          question: "ما هي النصيحة الذهبية المستمرة لحفظ لغة الآباء القبطية حية في القلوب؟",
          coptic_display: "الممارسة والخدمة",
          options: [
            { text: "المداومة على قراءة الأجبية والألحان والقداس الإلهي والبحث في معاني الكلمات", is_correct: true },
            { text: "الاكتفاء بحفظ الحروف مرة واحدة فقط دون صلاة", is_correct: false },
            { text: "إهمال قواعد النطق المعتمدة", is_correct: false },
            { text: "التوقف عن الترتيل", is_correct: false }
          ],
          explanation: "حفظ اللغة القبطية يتحقق بالممارسة اليومية في الصلاة والتسبيح والخدمة الكنسية."
        },
        {
          id: 4315,
          type: "fill_blank",
          question: "أكمل وسام التخرج الختامي باللقب القبطي 'المتقن الحكيم' (Ⲡⲓⲣⲉϥ...):",
          coptic_display: "Ⲡⲓⲣⲉϥ...",
          correct_word: "ⲥⲁⲃⲉ",
          options: [
            { text: "ⲥⲁⲃⲉ", is_correct: true },
            { text: "ⲱϣ", is_correct: false },
            { text: "ⲥϧⲁⲓ", is_correct: false }
          ],
          explanation: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ = الحكيم المتقن."
        },
        {
          id: 4316,
          type: "write",
          question: "رتّب حروف وسام التخرج القبطي الختامي (بي ريف سابيه):",
          coptic_display: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ",
          tiles: ["Ⲡⲓ", "ⲣⲉϥ", "ⲥⲁⲃⲉ"],
          correct_word: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ",
          explanation: "Ⲡⲓⲣⲉϥⲥⲁⲃⲉ = المتقن القبطي الشامل."
        }
      ]
    }
  ]
};
