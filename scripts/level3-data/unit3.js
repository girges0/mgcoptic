// =========================================================================
// Level 3 - Unit 3: التمييز المعجمي: الأصل القبطي والأصل اليوناني
// Total Lessons: 4 | Total Challenges: 30 (4069 - 4098)
// =========================================================================

module.exports = {
  id: 73,
  level_id: 7,
  title: "الوحدة ٣: التمييز المعجمي: الأصل القبطي والأصل اليوناني",
  badge: "Ϣ-Ϯ",
  description: "إتقان علامات الحروف الفارقة للأصل اليوناني والقبطي، وتأثير أصل الكلمة على القواعد النطقية.",
  order_index: 3,
  lessons: [
    {
      id: 310,
      title: "العلامات الحرفية الفارقة للأصل اليوناني (Ⲅ, Ⲇ, Ⲋ, Ⲝ, ⲫ, Ⲭ, Ⲯ)",
      challenges: [
        {
          id: 4069,
          type: "select",
          question: "إذا احتوت كلمة على حرف الإكسي (Ⲝ) أو حرف الإبسي (Ⲯ)، فما هو أصل الكلمة حكماً دون استثناء؟",
          coptic_display: "Ⲝ / Ⲯ",
          options: [
            { text: "يونانية الأصل دائماً", is_correct: true },
            { text: "قبطية صميمة دائماً", is_correct: false },
            { text: "عبرانية قديمة", is_correct: false },
            { text: "فرعونية متوارثة", is_correct: false }
          ],
          explanation: "حرفا Ⲝ و Ⲯ حرفان يونانيان لا يدخلان إلا في الكلمات المستعارة من اليونانية."
        },
        {
          id: 4070,
          type: "read_select",
          question: "كلمة «Ⲇⲟⲝⲁ» (مجد) تحتوي على حرفين يونانيين فارقين، ما هما؟",
          coptic_display: "Ⲇⲟⲝⲁ",
          options: [
            { text: "الدلدا (Ⲇ) والإكسي (ⲝ)", is_correct: true },
            { text: "الألفا والأوميجا", is_correct: false },
            { text: "السيما والتاف", is_correct: false },
            { text: "الغاما والخاي", is_correct: false }
          ],
          explanation: "حرف الدلدا Ⲇ وحرف الإكسي ⲝ كلاهما علامة قطعية على الأصل اليوناني."
        },
        {
          id: 4071,
          type: "true_false",
          question: "حرف الفاي (Ⲫ) لا يأتي مطلقاً في أي كلمة قبطية أصيلة بل هو حكر على اليونانية فقط.",
          coptic_display: "Ⲫ",
          is_correct: false,
          explanation: "خطأ؛ حرف الفي (Ⲫ) يأتي في الكلمات القبطية كأداة تعريف (ⲫⲓⲱⲧ) أو في كلمات قبطية مثل ⲣ̀ⲫⲏⲓ، ولكنه في أصول الحروف المنفصلة دخل من اليونانية."
        },
        {
          id: 4072,
          type: "match",
          question: "طابق كل حرف يوناني فارق بالدليل التطبيقي عليه من النصوص الكنسية:",
          pairs: [
            { left: "Ⲝ", right: "Ⲇⲟⲝⲁ (ذوكسا = مجد)" },
            { left: "Ⲯ", right: "ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)" },
            { left: "Ⲭ", right: "ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (بي خريستوس = المسيح)" },
            { left: "Ⲅ", right: "Ⲁⲅⲓⲟⲥ (آجيوس = قدوس)" }
          ],
          explanation: "أمثلة حية من ألحان الكنيسة تؤكد الأصل اليوناني لتلك الحروف."
        },
        {
          id: 4073,
          type: "select",
          question: "لماذا يُنطق حرف الكي (Ⲭ) كشين في كلمة «ⲉⲩⲭⲏ» (صلاة)؟",
          coptic_display: "ⲉⲩⲭⲏ",
          options: [
            { text: "لأنها كلمة يونانية متبوعة بحرف متحرك مائل للكسر (Ⲏ)", is_correct: true },
            { text: "لأنها كلمة قبطية صميمة", is_correct: false },
            { text: "لأنها بدأت بالمقطع إيڤ", is_correct: false },
            { text: "لأنها جاءت في صلاة فردية", is_correct: false }
          ],
          explanation: "قاعدة الكي اليونانية: تنطق شيناً إذا تلاها متحرك كسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ) كما في ⲉⲩⲭⲏ (إيڤكي/إيفشي بحسب الاصطلاح الكنسي المعتمد)."
        },
        {
          id: 4074,
          type: "fill_blank",
          question: "أكمل كلمة 'مزمور' اليونانية بحرف الإبسي الفارغ (بصالموس):",
          coptic_display: "...ⲁⲗⲙⲟⲥ",
          correct_word: "ⲯⲁⲗⲙⲟⲥ",
          options: [
            { text: "ⲯⲁⲗⲙⲟⲥ", is_correct: true },
            { text: "ⲝⲁⲗⲙⲟⲥ", is_correct: false },
            { text: "ⲥⲁⲗⲙⲟⲥ", is_correct: false }
          ],
          explanation: "ⲯⲁⲗⲙⲟⲥ = مزمور، تبدأ بحرف الإبسي Ⲯ."
        },
        {
          id: 4075,
          type: "write",
          question: "رتّب حروف كلمة 'مزمور' بالقبطية بحرف الإبسي (بصالموس):",
          coptic_display: "ⲯⲁⲗⲙⲟⲥ",
          tiles: ["ⲯ", "ⲁ", "ⲗ", "ⲙ", "ⲟ", "ⲥ"],
          correct_word: "ⲯⲁⲗⲙⲟⲥ",
          explanation: "ⲯⲁⲗⲙⲟⲥ = مزمور."
        },
        {
          id: 4076,
          type: "read_select",
          question: "أي من الحروف التالية إذا وجدته في كلمة حكمت فوراً بأنها ليست قبطية صميمة؟",
          coptic_display: "ⲝ / ϣ / ϧ / ϩ",
          options: [
            { text: "حرف الإكسي (Ⲝ)", is_correct: true },
            { text: "حرف الشاي (Ϣ)", is_correct: false },
            { text: "حرف الخاي (Ϧ)", is_correct: false },
            { text: "حرف الهوري (Ϩ)", is_correct: false }
          ],
          explanation: "حرف Ⲝ يوناني فارق، أما Ϣ وϦ وϨ فقبطية صميمة."
        }
      ]
    },
    {
      id: 311,
      title: "العلامات الحرفية السبعة للأصل القبطي الصميم (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ)",
      challenges: [
        {
          id: 4077,
          type: "select",
          question: "كم عدد الحروف القبطية السبعة المأخوذة من الخط الديموطيقي المصري القديم التي تؤكد قبطية الكلمة؟",
          coptic_display: "حروف الديموطيقي",
          options: [
            { text: "7 حروف: (Ϣ, Ϥ, Ϧ, Ϩ, Ϫ, Ϭ, Ϯ)", is_correct: true },
            { text: "5 حروف فقط", is_correct: false },
            { text: "10 حروف", is_correct: false },
            { text: "3 حروف", is_correct: false }
          ],
          explanation: "الحروف السبعة الأخيرة في الأبجدية القبطية مشتقة من الخط الديموطيقي وتؤكد أصالة الكلمة المصرية القبطية."
        },
        {
          id: 4078,
          type: "read_select",
          question: "إذا وجدت في كلمة أحد الحروف (Ϣ أو Ϥ أو Ϧ أو Ϩ)، فما هو أصل الكلمة يقيناً؟",
          coptic_display: "Ϣ, Ϥ, Ϧ, Ϩ",
          options: [
            { text: "قبطية أصيلة لا يمكن أن تكون يونانية", is_correct: true },
            { text: "يونانية معربة", is_correct: false },
            { text: "لاتينية الأصل", is_correct: false },
            { text: "سريانية قديمة", is_correct: false }
          ],
          explanation: "هذه الحروف السبعة لم تعرفها الأبجدية اليونانية، فوجود أحدها دليل حاسم على قبطية الكلمة."
        },
        {
          id: 4079,
          type: "true_false",
          question: "يمكن لكلمة يونانية أصيلة أن تشتمل على حرف الشاي (Ϣ) إذا كانت في النص الليتورجي.",
          coptic_display: "Ϣ",
          is_correct: false,
          explanation: "مستحيل؛ اليونانية لا تحوي حرف Ϣ، والكلمات التي تحوي Ϣ قبطية حصراً."
        },
        {
          id: 4080,
          type: "match",
          question: "طابق كل حرف قبطي أصيل بكلمته المعتمدة في المنهج:",
          pairs: [
            { left: "Ϣ", right: "ϣⲱⲡ (يقبل / يتناول)" },
            { left: "Ϧ", right: "ⲱⲛϧ (يعيش / حياة)" },
            { left: "Ϫ", right: "ϫⲟⲙ (قوة)" },
            { left: "Ϯ", right: "ⲛⲟⲩϯ (الله)" }
          ],
          explanation: "شواهد على الحروف الديموطيقية السبعة في المفردات القبطية الأصيلة."
        },
        {
          id: 4081,
          type: "fill_blank",
          question: "أكمل كلمة 'قوة' القبطية الصميمة بالحرف الديموطيقي جانجا (جوم):",
          coptic_display: "...ⲟⲙ",
          correct_word: "ϫⲟⲙ",
          options: [
            { text: "ϫⲟⲙ", is_correct: true },
            { text: "ⲅⲟⲙ", is_correct: false },
            { text: "ⲕⲟⲙ", is_correct: false }
          ],
          explanation: "ϫⲟⲙ (جوم) = قوة."
        },
        {
          id: 4082,
          type: "write",
          question: "رتّب حروف كلمة 'قوة' بالقبطية بحرف الجانجا (جوم):",
          coptic_display: "ϫⲟⲙ",
          tiles: ["ϫ", "ⲟ", "ⲙ"],
          correct_word: "ϫⲟⲙ",
          explanation: "ϫⲟⲙ = قوة."
        },
        {
          id: 4083,
          type: "select",
          question: "أي الكلمات التالية قبطية صميمة استناداً لاشتمالها على حرف ديموطيقي؟",
          coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ / ⲱⲛϧ / ⲁⲅⲅⲉⲗⲟⲥ / ⲉⲩⲭⲏ",
          options: [
            { text: "ⲱⲛϧ (لوجود حرف الخاي Ϧ)", is_correct: true },
            { text: "ⲥⲧⲁⲩⲣⲟⲥ", is_correct: false },
            { text: "ⲁⲅⲅⲉⲗⲟⲥ", is_correct: false },
            { text: "ⲉⲩⲭⲏ", is_correct: false }
          ],
          explanation: "ⲱⲛϧ تنتهي بحرف الخاي Ϧ وهو أحد الحروف السبعة الديموطيقية."
        }
      ]
    },
    {
      id: 312,
      title: "تحولات نطق الحروف المشروطة بحسب أصل الكلمة",
      challenges: [
        {
          id: 4084,
          type: "select",
          question: "ما هو الحرف الذي ينطق خاء (خ) دائماً في الكلمات القبطية، بينما في اليونانية ينطق شين أو كاف بحسب الحركة التالية؟",
          coptic_display: "Ⲭ",
          options: [
            { text: "حرف الكي (Ⲭ)", is_correct: true },
            { text: "حرف الخاي (Ϧ)", is_correct: false },
            { text: "حرف الغاما (Ⲅ)", is_correct: false },
            { text: "حرف الكابا (Ⲕ)", is_correct: false }
          ],
          explanation: "حرف الكي (Ⲭ) في القبطي خاء دائماً، أما في اليوناني فله شروط: شين قبل متحرك للكسر، وكاف قبل غيره."
        },
        {
          id: 4085,
          type: "read_select",
          question: "في كلمة «ⲭⲏⲙⲓ» (مصر)، كيف يُنطق حرف الكي (Ⲭ) ولماذا؟",
          coptic_display: "ⲭⲏⲙⲓ",
          options: [
            { text: "يُنطق خاء (خيمي) لأن الكلمة قبطية أصيلة", is_correct: true },
            { text: "يُنطق شين لأن بعده إيتا للكسر", is_correct: false },
            { text: "يُنطق كافاً لأنها اسم بلد", is_correct: false },
            { text: "يُنطق جيماً معطشة", is_correct: false }
          ],
          explanation: "كلمة ⲭⲏⲙⲓ قبطية صميمة (أرض مصر السوداء)، والكي في الكلمات القبطية يُنطق خاء دائماً: خيمي."
        },
        {
          id: 4086,
          type: "true_false",
          question: "حرف الدلدا (Ⲇ) ينطق دال في الكلمات القبطية وأسماء الأعلام، وينطق ذال في الكلمات اليونانية العامة.",
          coptic_display: "Ⲇ",
          is_correct: true,
          explanation: "قاعدة الدلدا المعتمدة: دال في الأعلام والقبطي، وذال في سائر الكلمات اليونانية."
        },
        {
          id: 4087,
          type: "match",
          question: "طابق كل كلمة بصوت حرف الكي (Ⲭ) فيها بناء على أصل الكلمة وسياقها:",
          pairs: [
            { left: "ⲭⲏⲙⲓ (مصر)", right: "خاء - كلمة قبطية أصيلة" },
            { left: "ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (المسيح)", right: "كاف - كلمة يونانية بعدها ساكن رو" },
            { left: "Ⲭⲉⲣⲉ (افرحي / السلام)", right: "شين - كلمة يونانية بعدها متحرك كسر" },
            { left: "ⲯⲩⲭⲏ (نفس)", right: "شين - كلمة يونانية بعدها إيتا" }
          ],
          explanation: "تطبيق قواعد نطق حرف الكي بدقة بالغة."
        },
        {
          id: 4088,
          type: "select",
          question: "في التحية الكنسية الشهيرة «Ⲭⲉⲣⲉ ⲛⲉ» (السلام لكِ)، ما هو النطق الصوتي المعتمد للحرف الأول؟",
          coptic_display: "Ⲭⲉⲣⲉ",
          options: [
            { text: "شين معطوفة على الكسر: (شيري)", is_correct: true },
            { text: "خاء: (خيري)", is_correct: false },
            { text: "كاف: (كيري)", is_correct: false },
            { text: "جيم: (جيري)", is_correct: false }
          ],
          explanation: "Ⲭⲉⲣⲉ يونانية وجاء بعد الكي حرف كسر (Ⲉ)، فتنطق شيناً: شيري."
        },
        {
          id: 4089,
          type: "fill_blank",
          question: "أكمل اسم أرض مصر بالقبطية (خيمي):",
          coptic_display: "...ⲏⲙⲓ",
          correct_word: "ⲭⲏⲙⲓ",
          options: [
            { text: "ⲭⲏⲙⲓ", is_correct: true },
            { text: "Ϧⲏⲙⲓ", is_correct: false },
            { text: "ⲕⲏⲙⲓ", is_correct: false }
          ],
          explanation: "ⲭⲏⲙⲓ (خيمي) = مصر."
        },
        {
          id: 4090,
          type: "write",
          question: "رتّب حروف كلمة 'مصر' بالقبطية بحرف الكي القبطي (خيمي):",
          coptic_display: "ⲭⲏⲙⲓ",
          tiles: ["ⲭ", "ⲏ", "ⲙ", "ⲓ"],
          correct_word: "ⲭⲏⲙⲓ",
          explanation: "ⲭⲏⲙⲓ = مصر."
        },
        {
          id: 4091,
          type: "read_select",
          question: "لماذا تختلف طريقة نطق الكي بين «ⲭⲏⲙⲓ» و «Ⲭⲉⲣⲉ» رغم أن كلاهما متبوع بمتحرك للكسر؟",
          coptic_display: "ⲭⲏⲙⲓ / Ⲭⲉⲣⲉ",
          options: [
            { text: "لأن الأولى قبطية فتنطق خاء دائماً، والثانية يونانية فتنطق شين بحسب شرط الكسر", is_correct: true },
            { text: "لأن الأولى مسبوقة بألف", is_correct: false },
            { text: "لأن الثانية فعل والأولى اسم", is_correct: false },
            { text: "لا يوجد أي اختلاف في النطق بينهما", is_correct: false }
          ],
          explanation: "الأصل المعجمي هو الحاكم: القبطي يلتزم بنطق الخاء، أما اليوناني فيخضع لقاعدة الشين والكاف."
        }
      ]
    },
    {
      id: 313,
      title: "مختبر فرز النصوص والمفردات الكنسية بين القبطي واليوناني",
      challenges: [
        {
          id: 4092,
          type: "select",
          question: "في جملة الصلاة الربانية «Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ»، ما هو التصنيف المعجمي لجميع هذه الكلمات؟",
          coptic_display: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ",
          options: [
            { text: "كلمات قبطية صميمة بالكامل", is_correct: true },
            { text: "كلمات يونانية الأصل معربة", is_correct: false },
            { text: "مزيج نصفه قبطي ونصفه يوناني", is_correct: false },
            { text: "مترجمة من العبرية مباشرة دون تعديل", is_correct: false }
          ],
          explanation: "مطلع الصلاة الربانية قبطي صميم بالكامل (أبانا الذي في السموات)."
        },
        {
          id: 4093,
          type: "read_select",
          question: "في التسبحة الشهيرة «Ⲁⲝⲓⲟⲥ ⲕⲉ ⲇⲓⲕⲉⲟⲥ» (مستحق وعادل)، ما هو أصل هذه العبارة؟",
          coptic_display: "Ⲁⲝⲓⲟⲥ ⲕⲉ ⲇⲓⲕⲉⲟⲥ",
          options: [
            { text: "يونانية بالكامل لوجود ⲝ و Ⲇ و ⲕⲉ", is_correct: true },
            { text: "قبطية أصيلة", is_correct: false },
            { text: "قبطية بحيرية", is_correct: false },
            { text: "قبطية صعيدية", is_correct: false }
          ],
          explanation: "العبارة يونانية بالكامل من ليتورجية القديس باسيليوس والقديس يوحنا ذهبي الفم."
        },
        {
          id: 4094,
          type: "true_false",
          question: "تشتمل الصلوات الليتورجية في الكنيسة القبطية على نصوص باللغة اليونانية حفظت كما هي بأصواتها اليونانية دون ترجمة.",
          coptic_display: "الصلوات الليتورجية",
          is_correct: true,
          explanation: "صحيح؛ مثل: كيرياليسون، أجيوس، أوكاسيوس، ذوكسا باتري، وغيرها الكثير."
        },
        {
          id: 4095,
          type: "match",
          question: "فرز الكلمات التالية بين أصل قبطي وأصل يوناني:",
          pairs: [
            { left: "ⲛⲟⲩϯ (الله)", right: "أصل قبطي صميم (حرف Ϯ)" },
            { left: "ⲡⲓⲭⲣⲓⲥⲧⲟⲥ (المسيح)", right: "أصل يوناني كنسي" },
            { left: "ⲱⲛϧ (حياة)", right: "أصل قبطي صميم (حرف Ϧ)" },
            { left: "Ⲁⲅⲅⲉⲗⲟⲥ (ملاك)", right: "أصل يوناني ليتورجي" }
          ],
          explanation: "فرز معجمي دقيق مستند إلى قواعد الحروف الفارقة."
        },
        {
          id: 4096,
          type: "select",
          question: "أي من العبارات الكنسية التالية تمثل تركيبة قبطية صرفة؟",
          coptic_display: "Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ / Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ / Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ",
          options: [
            { text: "Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ (الآب والابن)", is_correct: true },
            { text: "Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ", is_correct: false },
            { text: "Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ", is_correct: false },
            { text: "Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ", is_correct: false }
          ],
          explanation: "Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ عبارة قبطية أصيلة كاملة البناء."
        },
        {
          id: 4097,
          type: "fill_blank",
          question: "أكمل العبارة القبطية الشهيرة 'الآب والابن' (Ⲫⲓⲱⲧ ⲛⲉⲙ ...):",
          coptic_display: "Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡ...",
          correct_word: "Ⲡϣⲏⲣⲓ",
          options: [
            { text: "Ⲡϣⲏⲣⲓ", is_correct: true },
            { text: "Ⲡⲓⲱⲧ", is_correct: false },
            { text: "Ⲡⲛⲉⲩⲙⲁ", is_correct: false }
          ],
          explanation: "Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ = الآب والابن."
        },
        {
          id: 4098,
          type: "write",
          question: "رتّب حروف كلمة 'الابن' بالقبطية بحرف الشاي الديموطيقي (بشيري):",
          coptic_display: "Ⲡϣⲏⲣⲓ",
          tiles: ["Ⲡ", "ϣ", "ⲏ", "ⲣ", "ⲓ"],
          correct_word: "Ⲡϣⲏⲣⲓ",
          explanation: "Ⲡϣⲏⲣⲓ (بشيري) = الابن."
        }
      ]
    }
  ]
};
