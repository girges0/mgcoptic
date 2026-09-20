// =========================================================================
// Level 3 - Unit 6: قاموس المفردات الحياتية والكنسية والطقسية
// Total Lessons: 4 | Total Challenges: 30 (4159 - 4188)
// =========================================================================

module.exports = {
  id: 76,
  level_id: 7,
  title: "الوحدة ٦: قاموس المفردات الحياتية والكنسية والطقسية",
  badge: "Ⲉⲕⲕⲗⲏⲥⲓⲁ",
  description: "إتقان المفردات الطقسية الكبرى (الهيكل، الأسرار، التقويم والشهور القبطية، الرتب الكنسية، والأسرة والطبيعة).",
  order_index: 6,
  lessons: [
    {
      id: 322,
      title: "مفردات الهيكل والأسرار والمقدسات",
      challenges: [
        {
          id: 4159,
          type: "select",
          question: "ما معنى كلمة «ⲉⲣⲫⲏⲓ» (إرفي) في المصطلحات الكنسية العريقة؟",
          coptic_display: "ⲉⲣⲫⲏⲓ",
          options: [
            { text: "الهيكل / المعبد المقدس", is_correct: true },
            { text: "المذبح الحجري فقط", is_correct: false },
            { text: "صحن الكنيسة الخارجي", is_correct: false },
            { text: "برج الأجراس", is_correct: false }
          ],
          explanation: "ⲉⲣⲫⲏⲓ (إرفي) تعني الهيكل أو بيت الرب المقدس."
        },
        {
          id: 4160,
          type: "read_select",
          question: "ما هي الكلمة القبطية الدقيقة لمصطلح 'المذبح' المقدس؟",
          coptic_display: "المذبح المقدس",
          options: [
            { text: "ⲡⲓⲙⲁⲛ̀ⲉⲣϣⲱⲟⲩϣⲓ (بي ما إن إرشووشي) أو ⲑⲩⲥⲓⲁⲥⲧⲏⲣⲓⲟⲛ", is_correct: true },
            { text: "ⲡⲓⲱⲛϧ", is_correct: false },
            { text: "ⲡⲓⲥⲱⲙⲁ", is_correct: false },
            { text: "ⲧⲓⲙⲉⲧⲟⲩⲣⲟ", is_correct: false }
          ],
          explanation: "المذبح يسمى بالقبطية موضع ذبح الذبيحة: ⲡⲓⲙⲁⲛ̀ⲉⲣϣⲱⲟⲩϣⲓ، وباليونانية ⲑⲩⲥⲓⲁⲥⲧⲏⲣⲓⲟⲛ."
        },
        {
          id: 4161,
          type: "true_false",
          question: "كلمة «ⲙⲩⲥⲧⲏⲣⲓⲟⲛ» (مستيريون) تعني 'سر مقدّس' من أسرار الكنيسة السبعة.",
          coptic_display: "ⲙⲩⲥⲧⲏⲣⲓⲟⲛ",
          is_correct: true,
          explanation: "صحيح؛ ⲙⲩⲥⲧⲏⲣⲓⲟⲛ هي الكلمة اللاهوتية لسر الكنيسة المقدس."
        },
        {
          id: 4162,
          type: "match",
          question: "طابق كل مصطلح طقسي كنسي بمعناه الصحيح بالعربية:",
          pairs: [
            { left: "ⲉⲕⲕⲗⲏⲥⲓⲁ", right: "كنيسة / جماعة المؤمنين" },
            { left: "ⲉⲣⲫⲏⲓ", right: "هيكل مقدس" },
            { left: "ⲡⲓⲱⲓⲕ", right: "الخبز / القربان المقدس" },
            { left: "ⲡⲓⲏⲣⲡ", right: "الخمر (عصير الكرمة الطقسي)" }
          ],
          explanation: "عناصر خدمة سر الإفخارستيا والهيكل المقدس."
        },
        {
          id: 4163,
          type: "select",
          question: "ما معنى الكلمتين «ⲡⲓⲥⲱⲙⲁ» و «ⲡⲓⲥⲛⲟϥ» في صلوات القداس الإلهي؟",
          coptic_display: "ⲡⲓⲥⲱⲙⲁ / ⲡⲓⲥⲛⲟϥ",
          options: [
            { text: "الجسد والدم الأقدسان", is_correct: true },
            { text: "الماء والزيت", is_correct: false },
            { text: "البخور والشمع", is_correct: false },
            { text: "الإنجيل والرسائل", is_correct: false }
          ],
          explanation: "ⲡⲓⲥⲱⲙⲁ (الجسد) و ⲡⲓⲥⲛⲟϥ (الدم)."
        },
        {
          id: 4164,
          type: "fill_blank",
          question: "أكمل عبارة سر التناول 'الجسد والدم': (ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ...):",
          coptic_display: "ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ...",
          correct_word: "ⲡⲓⲥⲛⲟϥ",
          options: [
            { text: "ⲡⲓⲥⲛⲟϥ", is_correct: true },
            { text: "ⲡⲓⲱⲓⲕ", is_correct: false },
            { text: "ⲡⲓⲏⲣⲡ", is_correct: false }
          ],
          explanation: "ⲡⲓⲥⲱⲙⲁ ⲛⲉⲙ ⲡⲓⲥⲛⲟϥ = الجسد والدم."
        },
        {
          id: 4165,
          type: "write",
          question: "رتّب حروف كلمة 'كنيسة' بالقبطية (إككليسيا):",
          coptic_display: "ⲉⲕⲕⲗⲏⲥⲓⲁ",
          tiles: ["ⲉ", "ⲕ", "ⲕ", "ⲗ", "ⲏ", "ⲥ", "ⲓ", "ⲁ"],
          correct_word: "ⲉⲕⲕⲗⲏⲥⲓⲁ",
          explanation: "ⲉⲕⲕⲗⲏⲥⲓⲁ = كنيسة."
        }
      ]
    },
    {
      id: 323,
      title: "مصطلحات الأعياد، الأصوام، والتقويم القبطي",
      challenges: [
        {
          id: 4166,
          type: "select",
          question: "ما هو الشهر الأول في التقويم القبطي ومبدأ السنة القبطية الشهداء؟",
          coptic_display: "الشهر الأول",
          options: [
            { text: "Ⲑⲱⲟⲩⲧ (توت)", is_correct: true },
            { text: "Ⲡⲁⲟⲡⲓ (بابه)", is_correct: false },
            { text: "Ϩⲁⲑⲱⲣ (هاتور)", is_correct: false },
            { text: "Ⲭⲟⲓⲁⲕ (كيهك)", is_correct: false }
          ],
          explanation: "Ⲑⲱⲟⲩⲧ (توت) هو الشهر الأول في السنة القبطية وعيد النيروز المجيد."
        },
        {
          id: 4167,
          type: "read_select",
          question: "ما معنى كلمة «Ⲡⲁⲥⲭⲁ» (بصخة) وكلمة «ⲡⲓⲛⲏⲥⲧⲓⲁ» (بي نيستيا)؟",
          coptic_display: "Ⲡⲁⲥⲭⲁ / ⲛⲏⲥⲧⲓⲁ",
          options: [
            { text: "الفصح (العبور)، والصوم المقدس", is_correct: true },
            { text: "الميلاد، وعيد الغطاس", is_correct: false },
            { text: "الصعود، وعيد العنصرة", is_correct: false },
            { text: "القربان، والبخور", is_correct: false }
          ],
          explanation: "البصخة هي العبور/الفصح، وⲛⲏⲥⲧⲓⲁ هي الصوم."
        },
        {
          id: 4168,
          type: "true_false",
          question: "يحتوي التقويم القبطي على 13 شهراً، منها 12 شهراً طول كل منها 30 يوماً وشهر أخير صغير يسمى «Ⲡⲓⲁ̀ⲃⲟⲧ ⲛ̀ⲕⲟⲩϫⲓ» (الشهر الصغير / النسيء).",
          coptic_display: "التقويم القبطي",
          is_correct: true,
          explanation: "صحيح؛ 12 شهراً تاماً + شهر النسيء (5 أو 6 أيام في الكبيسة)."
        },
        {
          id: 4169,
          type: "match",
          question: "طابق الشهور القبطية الأربعة الأولى بترتيبها الزمني الصحيح:",
          pairs: [
            { left: "الشهر 1", right: "Ⲑⲱⲟⲩⲧ (توت)" },
            { left: "الشهر 2", right: "Ⲡⲁⲟⲡⲓ (بابه)" },
            { left: "الشهر 3", right: "Ϩⲁⲑⲱⲣ (هاتور)" },
            { left: "الشهر 4", right: "Ⲭⲟⲓⲁⲕ (كيهك)" }
          ],
          explanation: "ترتيب فصول وشهور السنة القبطية الزراعية والطقسية."
        },
        {
          id: 4170,
          type: "select",
          question: "ما اسم عيد القيامة المجيد بالقبطية؟",
          coptic_display: "عيد القيامة المجيد",
          options: [
            { text: "Ⲡϣⲁⲓ ⲛ̀ⲧⲉ Ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ (بشاي إنتي تي أناستاسيس)", is_correct: true },
            { text: "Ⲡϣⲁⲓ ⲙ̀Ⲡⲓϫⲓⲛⲙⲓⲥⲓ", is_correct: false },
            { text: "Ⲡϣⲁⲓ ⲙ̀Ⲡⲓⲱⲙⲥ", is_correct: false },
            { text: "Ⲡϣⲁⲓ ⲛ̀Ⲧⲉⲡⲓⲫⲁⲛⲓⲁ", is_correct: false }
          ],
          explanation: "Ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ تعني القيامة، و Ⲡϣⲁⲓ يعني العيد."
        },
        {
          id: 4171,
          type: "fill_blank",
          question: "أكمل اسم شهر التسبيح المريمي المشهور كيهك (خوياك):",
          coptic_display: "...ⲟⲓⲁⲕ",
          correct_word: "Ⲭⲟⲓⲁⲕ",
          options: [
            { text: "Ⲭⲟⲓⲁⲕ", is_correct: true },
            { text: "Ϧⲟⲓⲁⲕ", is_correct: false },
            { text: "Ⲕⲟⲓⲁⲕ", is_correct: false }
          ],
          explanation: "Ⲭⲟⲓⲁⲕ (كيهك) يبدأ بحرف الكي اليوناني Ⲭ."
        },
        {
          id: 4172,
          type: "write",
          question: "رتّب حروف كلمة 'عيد' بالقبطية (بشاي):",
          coptic_display: "Ⲡϣⲁⲓ",
          tiles: ["Ⲡ", "ϣ", "ⲁ", "ⲓ"],
          correct_word: "Ⲡϣⲁⲓ",
          explanation: "Ⲡϣⲁⲓ = العيد."
        }
      ]
    },
    {
      id: 324,
      title: "الألقاب الكنسية والصفات الروحية",
      challenges: [
        {
          id: 4173,
          type: "select",
          question: "ما هو اللقب القبطي المعادل لرتبة 'البطريرك' أو بابا الإسكندرية؟",
          coptic_display: "البابا والبطريرك",
          options: [
            { text: "Ⲡⲁⲡⲁ ⲟⲩⲟϩ ⲛ̀Ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ (بابا أووه إن باتريارشيس)", is_correct: true },
            { text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ", is_correct: false },
            { text: "Ⲡⲓⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ", is_correct: false },
            { text: "Ⲡⲓⲯⲁⲗⲧⲏⲥ", is_correct: false }
          ],
          explanation: "Ⲡⲁⲡⲁ (الأب الأعظم) و Ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ (رئيس الآباء)."
        },
        {
          id: 4174,
          type: "read_select",
          question: "ما معنى رتبة الشماس بالقبطية واليونانية «ⲡⲓⲇⲓⲁⲕⲱⲛ» (بي دياكون)؟",
          coptic_display: "ⲡⲓⲇⲓⲁⲕⲱⲛ",
          options: [
            { text: "الخادم المكرس لخدمة المذبح والفقراء", is_correct: true },
            { text: "القارئ فقط", is_correct: false },
            { text: "المرتل الموسيقي فقط", is_correct: false },
            { text: "حارس الباب", is_correct: false }
          ],
          explanation: "ⲇⲓⲁⲕⲱⲛ كلمة يونانية الأصل تعني الخادم (Servant)."
        },
        {
          id: 4175,
          type: "true_false",
          question: "كلمة «ⲟⲩⲏⲃ» (ويب) هي الكلمة القبطية الأصيلة المعبرة عن رتبة 'كاهن' أو 'قس'.",
          coptic_display: "ⲟⲩⲏⲃ",
          is_correct: true,
          explanation: "صحيح؛ ⲟⲩⲏⲃ (ويب) تعني الطاهر / الكاهن المقدس، وجمعها ⲟⲩⲏⲃ (كهنة)."
        },
        {
          id: 4176,
          type: "match",
          question: "طابق كل رتبة كنسية بمعناها القبطي والوظيفي:",
          pairs: [
            { left: "ⲡⲓⲉⲡⲓⲥⲕⲟⲡⲟⲥ", right: "الأسقف (الناظر من فوق / الراعي)" },
            { left: "ⲡⲓⲟⲩⲏⲃ / ⲡⲓⲡⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ", right: "القسيس / الكاهن الشيخ" },
            { left: "ⲡⲓⲇⲓⲁⲕⲱⲛ", right: "الشماس (الخادم)" },
            { left: "ⲡⲓⲯⲁⲗⲧⲏⲥ", right: "المرتل (الإبصالتيس)" }
          ],
          explanation: "الرتب الكنسية الطقسية السليمة بحسب التقليد القبطي الأرثوذكسي."
        },
        {
          id: 4177,
          type: "select",
          question: "ما معنى الصفة الروحية القبطية «ⲉⲑⲟⲩⲁⲃ» في جملة «Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ»؟",
          coptic_display: "ⲉⲑⲟⲩⲁⲃ",
          options: [
            { text: "القدوس / الطاهر (الروح القدس)", is_correct: true },
            { text: "العظيم / العالي", is_correct: false },
            { text: "المحيي فقط", is_correct: false },
            { text: "الضابط لكل شيء", is_correct: false }
          ],
          explanation: "ⲉⲑⲟⲩⲁⲃ تعني القدوس (من الفعل ⲟⲩⲁⲃ = يطهر أو يقدس)."
        },
        {
          id: 4178,
          type: "fill_blank",
          question: "أكمل اللقب الثالوثي 'الروح القدس' (Ⲡⲓⲡⲛⲉⲩⲙⲁ ...):",
          coptic_display: "Ⲡⲓⲡⲛⲉⲩⲙⲁ ...",
          correct_word: "ⲉⲑⲟⲩⲁⲃ",
          options: [
            { text: "ⲉⲑⲟⲩⲁⲃ", is_correct: true },
            { text: "ⲉⲧⲧⲁⲓⲏⲟⲩⲧ", is_correct: false },
            { text: "ⲉⲑⲛⲁⲛⲉϥ", is_correct: false }
          ],
          explanation: "Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ = الروح القدس."
        },
        {
          id: 4179,
          type: "write",
          question: "رتّب حروف كلمة 'الكاهن' بالقبطية الأصيلة (بي ويب):",
          coptic_display: "Ⲡⲓⲟⲩⲏⲃ",
          tiles: ["Ⲡⲓ", "ⲟⲩ", "ⲏ", "ⲃ"],
          correct_word: "Ⲡⲓⲟⲩⲏⲃ",
          explanation: "Ⲡⲓⲟⲩⲏⲃ (بي ويب) = الكاهن."
        },
        {
          id: 4180,
          type: "read_select",
          question: "في تسمية الكهنة «ⲛⲓⲟⲩⲏⲃ»، ما هي أداة التعريف المستعملة هنا؟",
          coptic_display: "ⲛⲓⲟⲩⲏⲃ",
          options: [
            { text: "Ⲛⲓ أداة تعريف الجمع المذكر والمؤنث العامة (الـ)", is_correct: true },
            { text: "Ⲡⲓ أداة المفرد المذكر", is_correct: false },
            { text: "Ϯ أداة المفرد المؤنث", is_correct: false },
            { text: "Ⲟⲩ أداة التنكير", is_correct: false }
          ],
          explanation: "Ⲛⲓ هي أداة التعريف لجمع الأسماء: ⲛⲓⲟⲩⲏⲃ = الكهنة."
        }
      ]
    },
    {
      id: 325,
      title: "المفردات اليومية، الطبيعة، والأسرة المتقدمة",
      challenges: [
        {
          id: 4181,
          type: "select",
          question: "ما هي معاني كلمات الأسرة الأساسية: «ⲓⲱⲧ»، «ⲙⲁⲩ»، «ⲥⲟⲛ»، «ⲥⲱⲛⲓ»؟",
          coptic_display: "ⲓⲱⲧ / ⲙⲁⲩ / ⲥⲟⲛ / ⲥⲱⲛⲓ",
          options: [
            { text: "أب، أم، أخ، أخت", is_correct: true },
            { text: "جد، جدة، عم، عمة", is_correct: false },
            { text: "ابن، ابنة، حفيد، حفيدة", is_correct: false },
            { text: "معلم، تلميذ، صديق، جار", is_correct: false }
          ],
          explanation: "ⲓⲱⲧ = أب، ⲙⲁⲩ = أم، ⲥⲟⲛ = أخ، ⲥⲱⲛⲓ = أخت."
        },
        {
          id: 4182,
          type: "read_select",
          question: "ما معنى كلمة «ⲙⲱⲟⲩ» (موو) وكلمة «ⲕⲁϩⲓ» (كاهي)؟",
          coptic_display: "ⲙⲱⲟⲩ / ⲕⲁϩⲓ",
          options: [
            { text: "الماء، والأرض / التراب", is_correct: true },
            { text: "النار، والهواء", is_correct: false },
            { text: "الشمس، والقمر", is_correct: false },
            { text: "الشجر، والثمر", is_correct: false }
          ],
          explanation: "ⲙⲱⲟⲩ = ماء، و ⲕⲁϩⲓ / ⲕⲁϩ = أرض."
        },
        {
          id: 4183,
          type: "true_false",
          question: "كلمة «ⲣⲏ» (ري) تعني 'الشمس'، وكلمة «ⲓⲟϩ» (يوه) تعني 'القمر' بالقبطية.",
          coptic_display: "ⲣⲏ / ⲓⲟϩ",
          is_correct: true,
          explanation: "صحيح؛ ⲣⲏ (ري) = شمس (من رع المصرية القديمة)، و ⲓⲟϩ (يوه) = قمر."
        },
        {
          id: 4184,
          type: "match",
          question: "طابق عناصر الطبيعة بالقبطية بمعانيها العربية:",
          pairs: [
            { left: "ⲣⲏ", right: "الشمس" },
            { left: "ⲓⲟϩ", right: "القمر" },
            { left: "ⲥⲓⲟⲩ", right: "النجم" },
            { left: "ⲙⲱⲟⲩ", right: "الماء" }
          ],
          explanation: "مفردات الطبيعة والكون الأساسية في المعجم القبطي."
        },
        {
          id: 4185,
          type: "select",
          question: "ما معنى الكلمة القبطية «ⲣⲱⲙⲓ» (رومي) التي تشكل جوهر تعريف الكائن البشري؟",
          coptic_display: "ⲣⲱⲙⲓ",
          options: [
            { text: "إنسان / رجل / بشر", is_correct: true },
            { text: "ملك / حاكم", is_correct: false },
            { text: "ملاك نوراني", is_correct: false },
            { text: "طائر", is_correct: false }
          ],
          explanation: "ⲣⲱⲙⲓ (رومي) تعني إنسان أو رجل."
        },
        {
          id: 4186,
          type: "fill_blank",
          question: "أكمل كلمة 'أخ' بالقبطية (سون):",
          coptic_display: "...ⲟⲛ",
          correct_word: "ⲥⲟⲛ",
          options: [
            { text: "ⲥⲟⲛ", is_correct: true },
            { text: "ⲕⲟⲛ", is_correct: false },
            { text: "ⲣⲟⲛ", is_correct: false }
          ],
          explanation: "ⲥⲟⲛ = أخ."
        },
        {
          id: 4187,
          type: "write",
          question: "رتّب حروف كلمة 'إنسان / رجل' بالقبطية (رومي):",
          coptic_display: "ⲣⲱⲙⲓ",
          tiles: ["ⲣ", "ⲱ", "ⲙ", "ⲓ"],
          correct_word: "ⲣⲱⲙⲓ",
          explanation: "ⲣⲱⲙⲓ = إنسان."
        },
        {
          id: 4188,
          type: "read_select",
          question: "في تعبير «ⲡⲁⲥⲟⲛ» و «ⲧⲁⲥⲱⲛⲓ»، ما وظيفة السوابق ⲡⲁ- و ⲧⲁ-؟",
          coptic_display: "ⲡⲁⲥⲟⲛ / ⲧⲁⲥⲱⲛⲓ",
          options: [
            { text: "ضمائر ملكية للمتكلم: (أخي) للمذكر، و(أختي) للمؤنث", is_correct: true },
            { text: "أدوات تنكير", is_correct: false },
            { text: "حروف نداء", is_correct: false },
            { text: "أفعال ماضية", is_correct: false }
          ],
          explanation: "ⲡⲁ- ملكيتي لمفرد مذكر (أخي)، و ⲧⲁ- ملكيتي لمفرد مؤنث (أختي)."
        }
      ]
    }
  ]
};
