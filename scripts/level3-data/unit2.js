// =========================================================================
// Level 3 - Unit 2: منظومة الجنكم والتقطيع الصوتي المتقدم
// Total Lessons: 4 | Total Challenges: 30 (4039 - 4068)
// =========================================================================

module.exports = {
  id: 72,
  level_id: 7,
  title: "الوحدة ٢: منظومة الجنكم والتقطيع الصوتي المتقدم",
  badge: "Ⲻ",
  description: "إتقان علامة الجنكم على السواكن العادية، والمنفردة، والمتحركات، والتقطيع المقطعي المتكامل.",
  order_index: 2,
  lessons: [
    {
      id: 306,
      title: "الجنكم على الحروف الساكنة العادية والمنفردة",
      challenges: [
        {
          id: 4039,
          type: "select",
          question: "ما هو الأثر الصوتي الدقيق لدخول علامة الجنكم (Ⲻ) على حرف ساكن غير الحروف المنفردة؟",
          coptic_display: "Ⲻ على الساكن",
          options: [
            { text: "يسبقه بهمزة مكسورة خفيفة ليصبح مقطعاً صوتياً مستقلاً (إِ)", is_correct: true },
            { text: "يجعل الحرف ممدوداً بالواو", is_correct: false },
            { text: "يحذف صوت الحرف تماماً", is_correct: false },
            { text: "يحول الساكن إلى حرف حلقي مفخم", is_correct: false }
          ],
          explanation: "الجنكم على الحرف الساكن العادي يولد همزة مكسورة خفيفة قبله ليمنع التقاء السواكن ويجعله مقطعاً مستقلاً."
        },
        {
          id: 4040,
          type: "read_select",
          question: "كيف يُنطق حرف الشاي فوقه جنكم في كلمة «ⲛ̀ϣⲏⲣⲓ» (الابن)؟",
          coptic_display: "ⲛ̀ϣⲏⲣⲓ",
          options: [
            { text: "النون بجنكم تنطق «إن»، ثم «شيري»: (إنشيري)", is_correct: true },
            { text: "تُنطق «نشيري» دون أي صوت كسرة", is_correct: false },
            { text: "تُنطق «أنشيري» بهمزة مفتوحة صريحة", is_correct: false },
            { text: "تُنطق «ونشيري»", is_correct: false }
          ],
          explanation: "الجنكم على النون (ⲛ̀) يعطيها مقطعاً مستقلاً بهمسة كسر: (إن-شيري)."
        },
        {
          id: 4041,
          type: "true_false",
          question: "تؤدي علامة الجنكم على الساكن دائماً نفس وظيفة السكون في اللغة العربية بالضبط دون أي صوت إضافي.",
          coptic_display: "Ⲻ",
          is_correct: false,
          explanation: "خطأ؛ السكون في العربية يقف على الحرف، بينما الجنكم في القبطية يخلق حركة همزة مكسورة (إِ) لتكوين مقطع صوتي مستقل."
        },
        {
          id: 4042,
          type: "match",
          question: "طابق كل حرف ساكن يعلوه جنكم بنطقه الصوتي المنفصل:",
          pairs: [
            { left: "ⲕ̀", right: "إِك (مقطع مستقل)" },
            { left: "ⲧ̀", right: "إِت (مقطع مستقل)" },
            { left: "ⲥ̀", right: "إِس (مقطع مستقل)" },
            { left: "ⲙ̀", right: "إِم (مقطع مستقل رنان)" }
          ],
          explanation: "الجنكم يسبق الساكن بهمزة مكسورة خفيفة."
        },
        {
          id: 4043,
          type: "fill_blank",
          question: "أكمل كتابة كلمة 'الله' مع أداة التعريف بجنكم صحيح (إفنوتي):",
          coptic_display: "...ⲛⲟⲩϯ",
          correct_word: "ⲫ̀ⲛⲟⲩϯ",
          options: [
            { text: "ⲫ̀ⲛⲟⲩϯ", is_correct: true },
            { text: "ⲫⲛⲟⲩϯ", is_correct: false },
            { text: "ⲡ̀ⲛⲟⲩϯ", is_correct: false }
          ],
          explanation: "ⲫ̀ⲛⲟⲩϯ (إفنوتي) = الله، تبدأ بالفاي يعلوها جنكم."
        },
        {
          id: 4044,
          type: "write",
          question: "رتّب حروف كلمة 'السماء' بالقبطية (إتفي):",
          coptic_display: "ⲧ̀ⲫⲉ",
          tiles: ["ⲧ̀", "ⲫ", "ⲉ"],
          correct_word: "ⲧ̀ⲫⲉ",
          explanation: "ⲧ̀ⲫⲉ (إتفي) = السماء."
        },
        {
          id: 4045,
          type: "read_select",
          question: "في كلمة «ⲕ̀ⲥⲙⲁⲣⲱⲟⲩⲧ» (مبارك)، كم مقطعاً صوتياً ينشأ بفضل الجنكم الأول؟",
          coptic_display: "ⲕ̀ⲥⲙⲁⲣⲱⲟⲩⲧ",
          options: [
            { text: "الجنكم على ⲕ̀ يشكل مقطعاً أولاً مستقلاً (إِك-)", is_correct: true },
            { text: "لا يضيف أي مقطع", is_correct: false },
            { text: "يدمج الكلمة كلها في مقطع واحد", is_correct: false },
            { text: "ينطق كحرف علة طويل", is_correct: false }
          ],
          explanation: "ⲕ̀ يشكل مقطعاً بادئاً مستقلاً: إك-سما-رو-أووت."
        }
      ]
    },
    {
      id: 307,
      title: "الجنكم على الحروف الحلقية والشفوية المنفردة",
      challenges: [
        {
          id: 4046,
          type: "select",
          question: "ما هي الحروف السبعة المنفردة ذات الرنين الخاص التي يُسمى كل منها صامتاً رنّاناً عند وضع الجنكم؟",
          coptic_display: "الحروف المنفردة",
          options: [
            { text: "Ⲃ, Ⲅ, Ⲗ, ⲙ, Ⲛ, Ⲣ, Ϩ", is_correct: true },
            { text: "Ⲁ, Ⲉ, Ⲏ, Ⲓ, Ⲟ, Ⲱ, Ⲩ", is_correct: false },
            { text: "Ϣ, Ϥ, Ϧ, Ϫ, Ϭ, Ϯ, Ⲭ", is_correct: false },
            { text: "Ⲕ, Ⲧ, Ⲡ, Ⲫ, Ⲑ, Ⲭ, Ⲍ", is_correct: false }
          ],
          explanation: "الحروف السبعة المنفردة هي: Ⲃ, Ⲅ, Ⲗ, ⲙ, Ⲛ, Ⲣ, Ϩ وتتميز بإمكانية حمل الرنين الصوتي عند وضع الجنكم."
        },
        {
          id: 4047,
          type: "read_select",
          question: "عند دخول الجنكم على حرف المي في كلمة «ⲙ̀ⲡⲓⲣⲏⲧⲓ» (مثل / كهذا)، كيف يُنطق المقطع الأول؟",
          coptic_display: "ⲙ̀ⲡⲓⲣⲏⲧⲓ",
          options: [
            { text: "إِم (مقطع رنان يسهل نطق الباء اللاحقة)", is_correct: true },
            { text: "ما (بفتحة صريحة)", is_correct: false },
            { text: "مو (بضمة)", is_correct: false },
            { text: "م ساكنة دون صوت همزة مسبقة", is_correct: false }
          ],
          explanation: "ⲙ̀ تنطق (إِم) بصوت رنان يمهد للحرف الصامت التالي: إم-بي-ري-تي."
        },
        {
          id: 4048,
          type: "true_false",
          question: "حرف اللافلا (Ⲗ) إذا جاء فوقه جنكم (ⲗ̀) يمكنه أن يشكل نواة مقطع صوتي كامل دون أي حرف علة آخر.",
          coptic_display: "ⲗ̀",
          is_correct: true,
          explanation: "صحيح؛ الحروف السائلة والرنانة فوقها جنكم تشكل مقطعاً مستقلاً (Syllabic Consonant)."
        },
        {
          id: 4049,
          type: "match",
          question: "طابق الحرف المنفرد بجنكم بالمثال التطبيقي المعتمد له في الطقس:",
          pairs: [
            { left: "ⲙ̀", right: "ⲙ̀ⲫⲓⲱⲧ (إمفيوت = للآب)" },
            { left: "ⲛ̀", right: "ⲛ̀ⲑⲟⲕ (إنثوك = أنتَ)" },
            { left: "ⲗ̀", right: "ⲗ̀ⲙⲏⲛ (إلمين = ميناء)" },
            { left: "ⲣ̀", right: "ⲣ̀ⲫⲏⲓ (إرفي = الهيكل)" }
          ],
          explanation: "شواهد كنسية على الحروف المنفردة التي يعلوها الجنكم."
        },
        {
          id: 4050,
          type: "select",
          question: "في كلمة «ⲛ̀ⲧⲟϥ» (هو)، حرف النون يعلوه جنكم، ما هو التحليل الصوتي لكلمة «ⲛ̀»؟",
          coptic_display: "ⲛ̀ⲧⲟϥ",
          options: [
            { text: "تشكل مقطعاً بادئاً مستقلاً يُنطق «إن» يليه المقطع «توف»", is_correct: true },
            { text: "تدمج مع التاف لتصبح نوناً مشددة", is_correct: false },
            { text: "تسقط النون في النطق وتلفظ أوف", is_correct: false },
            { text: "تنطق ناتوف", is_correct: false }
          ],
          explanation: "الكلمة مقطعان: ⲛ̀ (إن) + ⲧⲟϥ (توف)."
        },
        {
          id: 4051,
          type: "fill_blank",
          question: "أكمل الضمير المنفصل للمخاطب المذكر 'أنتَ' (إنثوك):",
          coptic_display: "...̀ⲑⲟⲕ",
          correct_word: "ⲛ̀ⲑⲟⲕ",
          options: [
            { text: "ⲛ̀ⲑⲟⲕ", is_correct: true },
            { text: "ⲙ̀ⲑⲟⲕ", is_correct: false },
            { text: "ⲧ̀ⲑⲟⲕ", is_correct: false }
          ],
          explanation: "ⲛ̀ⲑⲟⲕ (إنثوك) = أنتَ."
        },
        {
          id: 4052,
          type: "write",
          question: "رتّب حروف كلمة 'هو' بالقبطية مع جنكم النون (إنتوف):",
          coptic_display: "ⲛ̀ⲧⲟϥ",
          tiles: ["ⲛ̀", "ⲧ", "ⲟ", "ϥ"],
          correct_word: "ⲛ̀ⲧⲟϥ",
          explanation: "ⲛ̀ⲧⲟϥ (إنتوف) = هو."
        }
      ]
    },
    {
      id: 308,
      title: "الجنكم على الحروف المتحركة وبدايات الكلمات",
      challenges: [
        {
          id: 4053,
          type: "select",
          question: "ما هو الأثر الصوتي الدقيق لدخول علامة الجنكم على الحرف المتحرك (حروف العلة)؟",
          coptic_display: "Ⲻ على المتحرك",
          options: [
            { text: "يعطي الحرف نبرة استقلال صوتي ويمنع إدغامه في الحرف السابق أو اللاحق", is_correct: true },
            { text: "يسبقه بهمزة مكسورة مثل الساكن", is_correct: false },
            { text: "يحوله إلى حرف ساكن مهموس", is_correct: false },
            { text: "يلغي صوت العلة تماماً", is_correct: false }
          ],
          explanation: "الجنكم على المتحرك لا يسبقه بهمزة مكسورة، بل يفصل نطقه ويجعله مقطعاً نبرياً مستقلاً."
        },
        {
          id: 4054,
          type: "read_select",
          question: "في كلمة «ⲁ̀ⲗⲟⲩ» (صبي)، كيف يُنطق حرف الألفا الذي يعلوه جنكم؟",
          coptic_display: "ⲁ̀ⲗⲟⲩ",
          options: [
            { text: "يُنطق ألفاً مفتوحة بنبرة استقلال واضحة: (آ-لو)", is_correct: true },
            { text: "يُنطق إِ-آلو بهمزة مكسورة إضافية", is_correct: false },
            { text: "يُنطق واواً", is_correct: false },
            { text: "يسقط من النطق", is_correct: false }
          ],
          explanation: "الجنكم على Ⲁ يعلن بداية مقطع مستقل مفتوح بنبرة واضحة: (آ-لو)."
        },
        {
          id: 4055,
          type: "true_false",
          question: "عندما يوضع الجنكم على حرف متحرك للكسر مثل الإي (ⲉ̀)، فإنه يُنطق بهمزة مكسورة خفيفة صريحة (إِ).",
          coptic_display: "ⲉ̀",
          is_correct: true,
          explanation: "صحيح؛ ⲉ̀ يُنطق كهمزة مكسورة مستقلة كما في ⲉ̀ⲣϫⲱ (إرجو) و ⲉ̀ⲃⲟⲗ (إيفول)."
        },
        {
          id: 4056,
          type: "select",
          question: "في كلمة «ⲉ̀ⲃⲟⲗ» (خارجاً / من)، ما هو دور الجنكم على حرف الإي الأول؟",
          coptic_display: "ⲉ̀ⲃⲟⲗ",
          options: [
            { text: "تحقيق صوت همزة القطع المكسورة (إِ) في مطلع الكلمة", is_correct: true },
            { text: "مد صوت الواو في نهاية الكلمة", is_correct: false },
            { text: "تحويل الفيدا إلى صوت باء", is_correct: false },
            { text: "تشديد حرف اللام", is_correct: false }
          ],
          explanation: "ⲉ̀ تنطق همزة قطع مكسورة صريحة: إي-ڤول."
        },
        {
          id: 4057,
          type: "match",
          question: "طابق كل حرف متحرك يعلوه جنكم بطريقة أدائه الصوتي:",
          pairs: [
            { left: "ⲁ̀", right: "ألف مفتوحة مستقلة النبرة (آ)" },
            { left: "ⲉ̀", right: "همزة قطع مكسورة صريحة (إِ)" },
            { left: "ⲏ̀", right: "ياء ممدودة منفصلة عن مجاوراتها" },
            { left: "ⲟ̀", right: "واو قصيرة منبورة في مطلع مقطع" }
          ],
          explanation: "وظيفة الجنكم التمكينية على الحركات."
        },
        {
          id: 4058,
          type: "fill_blank",
          question: "أكمل كتابة كلمة 'خارجاً / من' (إيفول) بالحرف المتحرك الصحيح بجنكم:",
          coptic_display: "...̀ⲃⲟⲗ",
          correct_word: "ⲉ̀ⲃⲟⲗ",
          options: [
            { text: "ⲉ̀ⲃⲟⲗ", is_correct: true },
            { text: "ⲁ̀ⲃⲟⲗ", is_correct: false },
            { text: "ⲟ̀ⲃⲟⲗ", is_correct: false }
          ],
          explanation: "ⲉ̀ⲃⲟⲗ (إيفول) = خارجاً / من."
        },
        {
          id: 4059,
          type: "write",
          question: "رتّب حروف كلمة 'دجاجة' بالقبطية بحرف الإي المبدوء بجنكم (إرجو):",
          coptic_display: "ⲉ̀ⲣϫⲱ",
          tiles: ["ⲉ̀", "ⲣ", "ϫ", "ⲱ"],
          correct_word: "ⲉ̀ⲣϫⲱ",
          explanation: "ⲉ̀ⲣϫⲱ (إرجو) = دجاجة."
        },
        {
          id: 4060,
          type: "read_select",
          question: "ما هو الفارق الصوتي الجوهري بين ⲥ̀ (سيما بجنكم) و ⲉ̀ (إي بجنكم)؟",
          coptic_display: "ⲥ̀ / ⲉ̀",
          options: [
            { text: "الأول ساكن يسبقه صوت همزة كسر (إِس)، والثاني حركة علة ينطق كهمزة كسر بذاته (إِ)", is_correct: true },
            { text: "كلاهما متطابقان تماماً", is_correct: false },
            { text: "الأول حركة والثاني حرف ساكن", is_correct: false },
            { text: "الجنكم على العلة يلغي صوتها", is_correct: false }
          ],
          explanation: "الجنكم على الساكن يولد همزة مساعدة، أما على الحركة فهو نبر للحركة ذاتها."
        }
      ]
    },
    {
      id: 309,
      title: "تحليل بنية المقاطع الصوتية المركبة في الكلمات الطويلة",
      challenges: [
        {
          id: 4061,
          type: "select",
          question: "كم مقطعاً صوتياً تتكون منه الكلمة الكنسية الطويلة «ⲉⲙⲙⲁⲛⲟⲩⲏⲗ» (عمانوئيل)؟",
          coptic_display: "ⲉⲙⲙⲁⲛⲟⲩⲏⲗ",
          options: [
            { text: "4 مقاطع صوتية: (ⲉⲙ / ⲙⲁ / ⲛⲟⲩ / ⲏⲗ)", is_correct: true },
            { text: "مقطعان فقط", is_correct: false },
            { text: "3 مقاطع", is_correct: false },
            { text: "5 مقاطع", is_correct: false }
          ],
          explanation: "التقطيع الصوتي: إم (ⲉⲙ) / ما (ⲙⲁ) / نو (ⲛⲟⲩ) / إيل (ⲏⲗ) = 4 مقاطع متوازنة."
        },
        {
          id: 4062,
          type: "read_select",
          question: "في كلمة «ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ» (ضابط الكل)، كيف تتقسم الكلمة مقطعياً؟",
          coptic_display: "ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ",
          options: [
            { text: "بان / تو / كرا / تور (4 مقاطع)", is_correct: true },
            { text: "با / نتو / كراتور (3 مقاطع)", is_correct: false },
            { text: "بانتو / كراتور (مقطعان)", is_correct: false },
            { text: "بان / ت / وك / را / تور (5 مقاطع)", is_correct: false }
          ],
          explanation: "التقطيع السليم: ⲡⲁⲛ (بان) - ⲧⲟ (تو) - ⲕⲣⲁ (كرا) - ⲧⲱⲣ (تور)."
        },
        {
          id: 4063,
          type: "true_false",
          question: "المقطع الصوتي القبطي يمكن أن يبدأ بحرفين صامتين متعاقبين مثل (ⲥⲧ) أو (ⲕⲣ) دون الحاجة لحرف متحرك بينهما.",
          coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ / ⲕⲣⲁⲧⲱⲣ",
          is_correct: true,
          explanation: "صحيح؛ تقبل اللغة القبطية واليونانية البدء بعنقود صامت (Consonant Cluster) مثل st و kr."
        },
        {
          id: 4064,
          type: "match",
          question: "طابق كل كلمة طويلة بعدد مقاطعها الصوتية الدقيقة:",
          pairs: [
            { left: "ⲉⲙⲙⲁⲛⲟⲩⲏⲗ", right: "4 مقاطع صوتية" },
            { left: "ⲡⲓⲭⲣⲓⲥⲧⲟⲥ", right: "3 مقاطع (بي / خريس / توس)" },
            { left: "ⲁⲅⲅⲉⲗⲟⲥ", right: "3 مقاطع (أن / غي / لوس)" },
            { left: "ⲛⲟⲩϯ", right: "مقطعان (نو / تي)" }
          ],
          explanation: "تطبيقات دقيقة على قياس المقاطع الصوتية في الكلمات الكنسية."
        },
        {
          id: 4065,
          type: "select",
          question: "ما هو العنصر الإلزامي الذي يجب أن يتواجد في كل مقطع صوتي قبطي ليكون مقطعاً متكاملاً؟",
          coptic_display: "بنية المقطع",
          options: [
            { text: "حرف حركة (علة)، أو صامت رنّان يعلوه جنكم", is_correct: true },
            { text: "حرف ألفا حصراً", is_correct: false },
            { text: "حرف ساكن فقط بدون أي حركة", is_correct: false },
            { text: "علامة الاختصار", is_correct: false }
          ],
          explanation: "نواة المقطع الصوتي (Syllable Nucleus) تكون دائماً حركة أو صامتاً رنّاناً بجنكم."
        },
        {
          id: 4066,
          type: "fill_blank",
          question: "أكمل التقطيع الصوتي لكلمة 'المسيح' (ⲡⲓ / ... / ⲧⲟⲥ):",
          coptic_display: "ⲡⲓⲭⲣⲓⲥⲧⲟⲥ",
          correct_word: "ⲭⲣⲓⲥ",
          options: [
            { text: "ⲭⲣⲓⲥ", is_correct: true },
            { text: "ⲭⲣⲓ", is_correct: false },
            { text: "ⲣⲓⲥ", is_correct: false }
          ],
          explanation: "المقطع الأوسط هو ⲭⲣⲓⲥ (خريس)."
        },
        {
          id: 4067,
          type: "write",
          question: "رتّب حروف كلمة 'الله' بالقبطية كأحد أهم الكلمات ثنائية المقطع (نوتي):",
          coptic_display: "ⲛⲟⲩϯ",
          tiles: ["ⲛ", "ⲟⲩ", "ϯ"],
          correct_word: "ⲛⲟⲩϯ",
          explanation: "ⲛⲟⲩϯ (نوتي) = الله، مقطعان: ⲛⲟⲩ + ϯ."
        },
        {
          id: 4068,
          type: "read_select",
          question: "في كلمة «ϣⲱⲡⲧ» كم مقطعاً صوتياً تحتويه هذه الكلمة ذات التراكم الصامت النهائي؟",
          coptic_display: "ϣⲱⲡⲧ",
          options: [
            { text: "مقطع واحد مغلق ينتهي بساكنين (شوبت)", is_correct: true },
            { text: "مقطعان لوجود التاف في النهاية", is_correct: false },
            { text: "ثلاثة مقاطع", is_correct: false },
            { text: "لا تعتبر كلمة صحيحة", is_correct: false }
          ],
          explanation: "حركة واحدة (Ⲱ) تشكل نواة مقطع واحد ينتهي بالصامتين ⲡ و ⲧ."
        }
      ]
    }
  ]
};
