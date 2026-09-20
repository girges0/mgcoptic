// =========================================================================
// Level 3 - Unit 9: البناء النحوي التأسيسي والترجمة التطبيقية
// Total Lessons: 5 | Total Challenges: 36 (4253 - 4288)
// =========================================================================

module.exports = {
  id: 79,
  level_id: 7,
  title: "الوحدة ٩: البناء النحوي التأسيسي والترجمة التطبيقية",
  badge: "Ⲡⲓ-Ϯ-Ⲛⲓ",
  description: "إتقان أدوات التعريف والتنكير، ضمائر الفاعل، أدوات النسبة والإضافة، تركيب الجملة الاسمية، وورشة الترجمة.",
  order_index: 9,
  lessons: [
    {
      id: 334,
      title: "أدوات التعريف والتنكير (Ⲡⲓ, Ϯ, Ⲛⲓ, Ⲟⲩ, Ϩⲁⲛ)",
      challenges: [
        {
          id: 4253,
          type: "select",
          question: "ما هي أدوات التعريف العامة في اللغة القبطية للمفرد المذكر والمفرد المؤنث والجمع بنوعيه؟",
          coptic_display: "أدوات التعريف العامة",
          options: [
            { text: "Ⲡⲓ للمفرد المذكر، Ϯ للمفرد المؤنث، Ⲛⲓ للجمع بنوعيه", is_correct: true },
            { text: "Ⲟⲩ للمذكر، Ϩⲁⲛ للمؤنث", is_correct: false },
            { text: "Ⲡⲁ للمذكر، Ⲧⲁ للمؤنث، Ⲛⲁ للجمع", is_correct: false },
            { text: "Ⲫⲓ للمذكر، Ⲑⲓ للمؤنث فقط", is_correct: false }
          ],
          explanation: "أدوات التعريف العامة الثلاثة الأساسية هي: Ⲡⲓ (المذكر)، Ϯ (المؤنث)، Ⲛⲓ (الجمع)."
        },
        {
          id: 4254,
          type: "read_select",
          question: "ما هي أدوات التنكير المقابلة (أداة نكرة لمفرد، وأداة نكرة لجمع)؟",
          coptic_display: "أدوات التنكير",
          options: [
            { text: "Ⲟⲩ للمفرد (مذكر ومؤنث)، و Ϩⲁⲛ للجمع بنوعيه", is_correct: true },
            { text: "Ⲡⲓ و Ϯ", is_correct: false },
            { text: "ⲛ̀ و ⲙ̀", is_correct: false },
            { text: "ⲡⲉ و ⲧⲉ", is_correct: false }
          ],
          explanation: "Ⲟⲩ تعني 'أحد / شيء / نكرة مفردة' مثل ⲟⲩⲣⲱⲙⲓ (رجل ما)، و Ϩⲁⲛ تعني 'بعض / نكرة جمع' مثل ϩⲁⲛⲣⲱⲙⲓ (رجال)."
        },
        {
          id: 4255,
          type: "true_false",
          question: "أداة التعريف الخاصة للمذكر (Ⲡ̀) تتحول إلى (Ⲫ̀) إذا بدأت الكلمة بحرف من حروف الحلقيات والشفويات المنفردة (Ⲃ, Ⲓ, Ⲗ, ⲙ, Ⲛ, Ⲣ, ⲞⲨ).",
          coptic_display: "قاعدة الحروف الحلقية والشفوية (فيلنور)",
          is_correct: true,
          explanation: "صحيح؛ قاعدة الحروف السبعة (Ⲃ, Ⲓ, Ⲗ, ⲙ, Ⲛ, Ⲣ, ⲞⲨ) تحول Ⲡ̀ إلى Ⲫ̀ مثل Ⲫⲓⲱⲧ."
        },
        {
          id: 4256,
          type: "match",
          question: "طابق كل أداة بنوع الاسم الذي تدل عليه في القواعد القبطية:",
          pairs: [
            { left: "Ⲡⲓ-", right: "معرّف مفرد مذكر (مثل: Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ)" },
            { left: "Ϯ-", right: "معرّف مفرد مؤنث (مثل: Ϯⲉⲕⲕⲗⲏⲥⲓⲁ)" },
            { left: "Ⲛⲓ-", right: "معرّف جمع بنوعيه (مثل: Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ)" },
            { left: "Ⲟⲩ-", right: "منكّر مفرد (مثل: ⲟⲩⲣⲱⲙⲓ = إنسان ما)" }
          ],
          explanation: "منظومة أدوات التعريف والتنكير في النحو القبطي البحيري."
        },
        {
          id: 4257,
          type: "select",
          question: "لماذا نقول «Ⲫⲓⲱⲧ» (الآب) بالفي (Ⲫ) بدلاً من «Ⲡⲓⲱⲧ» بالبي (Ⲡ)؟",
          coptic_display: "Ⲫⲓⲱⲧ",
          options: [
            { text: "لأن كلمة «ⲓⲱⲧ» تبدأ بحرف اليوطا (Ⲓ) وهو من حروف عائلة الرنين السبعة (فيلنور)", is_correct: true },
            { text: "لأن كلمة الآب اسم مؤنث", is_correct: false },
            { text: "لأنها كلمة يونانية مستعارة", is_correct: false },
            { text: "لأن حرف الفي يحل محل الألف دائماً", is_correct: false }
          ],
          explanation: "اليوطا Ⲓ من حروف (Ⲃ Ⲓ Ⲗ ⲙ Ⲛ Ⲣ ⲞⲨ) التي تحول أداة التعريف الخاصة إلى Ⲫ̀."
        },
        {
          id: 4258,
          type: "fill_blank",
          question: "أكمل تعريف كلمة 'الكنيسة' (مفرد مؤنث): (...ⲉⲕⲕⲗⲏⲥⲓⲁ):",
          coptic_display: "...ⲉⲕⲕⲗⲏⲥⲓⲁ",
          correct_word: "Ϯ",
          options: [
            { text: "Ϯ", is_correct: true },
            { text: "Ⲡⲓ", is_correct: false },
            { text: "Ⲛⲓ", is_correct: false }
          ],
          explanation: "الكنيسة مؤنثة وتأخذ أداة التعريف Ϯ: Ϯⲉⲕⲕⲗⲏⲥⲓⲁ."
        },
        {
          id: 4259,
          type: "write",
          question: "رتّب حروف عبارة 'الكنيسة' بأداة التعريف المؤنثة (تي إككليسيا):",
          coptic_display: "Ϯⲉⲕⲕⲗⲏⲥⲓⲁ",
          tiles: ["Ϯ", "ⲉⲕ", "ⲕⲗⲏ", "ⲥⲓⲁ"],
          correct_word: "Ϯⲉⲕⲕⲗⲏⲥⲓⲁ",
          explanation: "Ϯⲉⲕⲕⲗⲏⲥⲓⲁ = الكنيسة."
        }
      ]
    },
    {
      id: 335,
      title: "ضمائر الفاعل المتصلة والمنفصلة (ⲁⲛⲟⲕ, ⲛ̀ⲑⲟⲕ, ...)",
      challenges: [
        {
          id: 4260,
          type: "select",
          question: "ما هي الضمائر المنفصلة الثلاثة الأولى للمتكلم والمخاطب المذكر والمخاطبة المؤنثة؟",
          coptic_display: "الضمائر المنفصلة",
          options: [
            { text: "ⲁⲛⲟⲕ (أنا)، ⲛ̀ⲑⲟⲕ (أنتَ)، ⲛ̀ⲑⲟ (أنتِ)", is_correct: true },
            { text: "ⲛ̀ⲧⲟϥ، ⲛ̀ⲧⲟⲥ، ⲛ̀ⲑⲱⲟⲩ", is_correct: false },
            { text: "ⲁⲛⲟⲛ، ⲛ̀ⲑⲱⲧⲉⲛ، ⲛ̀ⲧⲱⲟⲩ", is_correct: false },
            { text: "ⲡⲁⲓ، ⲑⲁⲓ، ⲛⲁⲓ", is_correct: false }
          ],
          explanation: "ⲁⲛⲟⲕ = أنا، ⲛ̀ⲑⲟⲕ = أنتَ، ⲛ̀ⲑⲟ = أنتِ."
        },
        {
          id: 4261,
          type: "read_select",
          question: "ما معنى الضمير المنفصل «ⲁⲛⲟⲛ» في لغة الخدمة والتسبيح؟",
          coptic_display: "ⲁⲛⲟⲛ",
          options: [
            { text: "نحنُ (ضمير جماعة المتكلمين)", is_correct: true },
            { text: "أنتم", is_correct: false },
            { text: "هم", is_correct: false },
            { text: "أنا بمفردي", is_correct: false }
          ],
          explanation: "ⲁⲛⲟⲛ تعني نحنُ، وتقابل ⲁⲛⲟⲕ (أنا)."
        },
        {
          id: 4262,
          type: "true_false",
          question: "الضميران «ⲛ̀ⲧⲟϥ» و «ⲛ̀ⲧⲟⲥ» يعنيان على الترتيب: 'هو' للغائب المذكر، و'هي' للغائبة المؤنثة.",
          coptic_display: "ⲛ̀ⲧⲟϥ / ⲛ̀ⲧⲟⲥ",
          is_correct: true,
          explanation: "صحيح؛ ⲛ̀ⲧⲟϥ (هو) و ⲛ̀ⲧⲟⲥ (هي)."
        },
        {
          id: 4263,
          type: "match",
          question: "طابق كل ضمير منفصل بالترجمة المقابلة له في العربية:",
          pairs: [
            { left: "ⲁⲛⲟⲕ", right: "أنا" },
            { left: "ⲛ̀ⲑⲟⲕ", right: "أنتَ (مذكر)" },
            { left: "ⲛ̀ⲧⲟϥ", right: "هو (غائب مذكر)" },
            { left: "ⲁⲛⲟⲛ", right: "نحنُ" }
          ],
          explanation: "منظومة ضمائر الفاعل المنفصلة في القبطية."
        },
        {
          id: 4264,
          type: "select",
          question: "في عبارة «Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ» (إنجيل يوحنا)، ما معنى العبارة؟",
          coptic_display: "Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ",
          options: [
            { text: "أنا هو خبز الحياة", is_correct: true },
            { text: "أنا هو الراعي الصالح", is_correct: false },
            { text: "أنا هو نور العالم", is_correct: false },
            { text: "أنا هو الطريق والحق", is_correct: false }
          ],
          explanation: "Ⲁⲛⲟⲕ (أنا) ⲡⲉ (هو) ⲡⲓⲱⲓⲕ (الخبز) ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ (الذي للحياة)."
        },
        {
          id: 4265,
          type: "fill_blank",
          question: "أكمل إعلان السيد المسيح الشهير 'أنا هو خبز الحياة' (... ⲡⲉ ⲡⲓⲱⲓⲕ):",
          coptic_display: "... ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ",
          correct_word: "Ⲁⲛⲟⲕ",
          options: [
            { text: "Ⲁⲛⲟⲕ", is_correct: true },
            { text: "Ⲛ̀ⲑⲟⲕ", is_correct: false },
            { text: "Ⲛ̀ⲧⲟϥ", is_correct: false }
          ],
          explanation: "Ⲁⲛⲟⲕ ⲡⲉ = أنا هو."
        },
        {
          id: 4266,
          type: "write",
          question: "رتّب حروف جملة 'أنا هو خبز الحياة' بالقبطية (آنوك بي بي ويك إنتي بي أونخ):",
          coptic_display: "Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ",
          tiles: ["Ⲁⲛⲟⲕ", "ⲡⲉ", "ⲡⲓⲱⲓⲕ", "ⲛ̀ⲧⲉ", "ⲡⲓⲱⲛϧ"],
          correct_word: "Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ",
          explanation: "Ⲁⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ = أنا هو خبز الحياة."
        }
      ]
    },
    {
      id: 336,
      title: "أدوات الإضافة والنسبة (ⲛ̀ⲧⲉ, ⲙ̀, ⲛ̀)",
      challenges: [
        {
          id: 4267,
          type: "select",
          question: "ما هما نوعا الإضافة في اللغة القبطية للتعبير عن نسبة شيء إلى شيء آخر؟",
          coptic_display: "الإضافة القبطية",
          options: [
            { text: "الإضافة المباشرة بالأداة المركبة «ⲛ̀ⲧⲉ»، والإضافة بالحروف الرابطة المختصرة «ⲛ̀» و «ⲙ̀»", is_correct: true },
            { text: "الإضافة بحرف الواو فقط", is_correct: false },
            { text: "الإضافة بتنوين الكلمة الأولى", is_correct: false },
            { text: "الإضافة بالتقديم والتأخير دون أي أداة", is_correct: false }
          ],
          explanation: "تعتمد القبطية أداة النسبة الكاملة ⲛ̀ⲧⲉ أو الأداة المتصلة ⲛ̀ / ⲙ̀ لربط المضاف بالمضاف إليه."
        },
        {
          id: 4268,
          type: "read_select",
          question: "متى تستعمل الأداة «ⲙ̀» بدلاً من «ⲛ̀» في الإضافة والنسبة؟",
          coptic_display: "ⲙ̀ vs ⲛ̀",
          options: [
            { text: "قبل الكلمات التي تبدأ بأحد الحروف الشفوية (Ⲃ, ⲙ, Ⲡ, Ⲫ, Ⲯ)", is_correct: true },
            { text: "قبل الكلمات المؤنثة فقط", is_correct: false },
            { text: "في آخر الجملة فقط", is_correct: false },
            { text: "قبل الحروف المتحركة السبعة", is_correct: false }
          ],
          explanation: "القاعدة الصرفية: ⲛ̀ تنقلب إلى ⲙ̀ قبل الشفويات لتجانس مخرج الشفتين."
        },
        {
          id: 4269,
          type: "true_false",
          question: "في جملة «Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ» (ابن الله)، استعملنا ⲙ̀ لأن كلمة Ⲫⲛⲟⲩϯ تبدأ بحرف شفوي هو الفاي (Ⲫ).",
          coptic_display: "Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ",
          is_correct: true,
          explanation: "صحيح؛ الفاي حرف شفوي فاقتضى استخدام ⲙ̀."
        },
        {
          id: 4270,
          type: "match",
          question: "طابق كل تركيب إضافة بالأداة المستخدمة فيه وسببها:",
          pairs: [
            { left: "Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ", right: "ⲙ̀ - قبل الحرف الشفوي Ⲫ" },
            { left: "ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡⲓⲱⲛϧ", right: "ⲛ̀ⲧⲉ - أداة النسبة المنفصلة" },
            { left: "Ⲡⲣⲁⲛ ⲛ̀Ⲓⲏⲥⲟⲩⲥ", right: "ⲛ̀ - قبل حرف اليوطا غير الشفوي" },
            { left: "Ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ", right: "ⲛ̀ⲧⲉ - إضافة اسم الملكوت للسموات" }
          ],
          explanation: "شواهد نحوية حية من العهد الجديد والصلوات."
        },
        {
          id: 4271,
          type: "select",
          question: "ما الترجمة الدقيقة لعبارة «Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ»؟",
          coptic_display: "Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ",
          options: [
            { text: "ابن الله", is_correct: true },
            { text: "خادم الله", is_correct: false },
            { text: "بيت الله", is_correct: false },
            { text: "شعب الله", is_correct: false }
          ],
          explanation: "Ⲡϣⲏⲣⲓ = الابن، ⲙ̀Ⲫⲛⲟⲩϯ = الله."
        },
        {
          id: 4272,
          type: "fill_blank",
          question: "أكمل عبارة 'ابن الله' بأداة الإضافة الصحيحة (Ⲡϣⲏⲣⲓ ... Ⲫⲛⲟⲩϯ):",
          coptic_display: "Ⲡϣⲏⲣⲓ ... Ⲫⲛⲟⲩϯ",
          correct_word: "ⲙ̀",
          options: [
            { text: "ⲙ̀", is_correct: true },
            { text: "ⲛ̀", is_correct: false },
            { text: "ϧⲉⲛ", is_correct: false }
          ],
          explanation: "ⲙ̀ قبل حرف الفاي الشفوي."
        },
        {
          id: 4273,
          type: "write",
          question: "رتّب حروف عبارة 'ابن الله' بالقبطية (بشيري إمفنوتي):",
          coptic_display: "Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ",
          tiles: ["Ⲡϣⲏⲣⲓ", "ⲙ̀", "Ⲫⲛⲟⲩϯ"],
          correct_word: "Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ",
          explanation: "Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ = ابن الله."
        }
      ]
    },
    {
      id: 337,
      title: "تراكيب الجملة الاسمية البسيطة والربط النحوي",
      challenges: [
        {
          id: 4274,
          type: "select",
          question: "كيف تُربط عناصر الجملة الاسمية البسيطة (المبتدأ والخبر) في اللغة القبطية؟",
          coptic_display: "رابطة الجملة الاسمية",
          options: [
            { text: "باستخدام ضمائر الربط الإشارية (ⲡⲉ للمذكر، ⲧⲉ للمؤنث، ⲛⲉ للجمع)", is_correct: true },
            { text: "بوضع ضمة على آخر المبتدأ دون أداة رابطة", is_correct: false },
            { text: "باستخدام فعل كان فقط", is_correct: false },
            { text: "بحذف الخبر دائماً", is_correct: false }
          ],
          explanation: "الجملة الاسمية تستخدم أدوات الربط الثلاثة الشهيرة: ⲡⲉ (هو)، ⲧⲉ (هي)، ⲛⲉ (هم)."
        },
        {
          id: 4275,
          type: "read_select",
          question: "في جملة «Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ» (الله محبة)، ما هو دور الكلمة الأخيرة «ⲡⲉ»؟",
          coptic_display: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ",
          options: [
            { text: "أداة ربط الجملة الاسمية العائدة على المبتدأ المذكر (الله هو محبة)", is_correct: true },
            { text: "أداة نفي بمعنى ليس", is_correct: false },
            { text: "أداة استفهام", is_correct: false },
            { text: "حرف جر زائد", is_correct: false }
          ],
          explanation: "ⲡⲉ هي أداة الكينونة والربط للمذكر: الله (هو) محبة."
        },
        {
          id: 4276,
          type: "true_false",
          question: "في الجملة الاسمية المؤنثة، نستخدم الأداة «ⲧⲉ» كأداة ربط مثل: «Ϯⲉⲕⲕⲗⲏⲥⲓⲁ ⲟⲩⲙⲁⲩ ⲧⲉ» (الكنيسة هي أم).",
          coptic_display: "Ϯⲉⲕⲕⲗⲏⲥⲓⲁ ⲟⲩⲙⲁⲩ ⲧⲉ",
          is_correct: true,
          explanation: "صحيح؛ ⲧⲉ أداة ربط الاسم المؤنث."
        },
        {
          id: 4277,
          type: "match",
          question: "طابق أدوات الربط في الجملة الاسمية بحسب نوع المبتدأ وتطبيقاتها:",
          pairs: [
            { left: "ⲡⲉ", right: "للمفرد المذكر: Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ (الله محبة)" },
            { left: "ⲧⲉ", right: "للمفرد المؤنث: Ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲟⲩⲟⲩⲱⲓⲛⲓ ⲧⲉ" },
            { left: "ⲛⲉ", right: "للجمع بنوعيه: Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ϩⲁⲛⲡⲛⲉⲩⲙⲁ ⲛⲉ" },
            { left: "ⲡⲉⲛ-", right: "ضمير ملكية مضاف للمفرد المذكر (نا)" }
          ],
          explanation: "أدوات الكينونة والربط الثلاثية في الجملة الاسمية القبطية."
        },
        {
          id: 4278,
          type: "select",
          question: "ما الترجمة الدقيقة للآية الإنجيلية «Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ»؟",
          coptic_display: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ",
          options: [
            { text: "الله محبة", is_correct: true },
            { text: "الله نور", is_correct: false },
            { text: "الله روح", is_correct: false },
            { text: "الله سلام", is_correct: false }
          ],
          explanation: "ⲁⲅⲁⲡⲏ تعني محبة (الله محبة)."
        },
        {
          id: 4279,
          type: "fill_blank",
          question: "أكمل الجملة الاسمية 'الله محبة' بأداة الربط المذكر المناسبة (Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ...):",
          coptic_display: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ...",
          correct_word: "ⲡⲉ",
          options: [
            { text: "ⲡⲉ", is_correct: true },
            { text: "ⲧⲉ", is_correct: false },
            { text: "ⲛⲉ", is_correct: false }
          ],
          explanation: "ⲡⲉ لأن Ⲫⲛⲟⲩϯ مذكر."
        },
        {
          id: 4280,
          type: "write",
          question: "رتّب حروف جملة 'الله محبة' بالقبطية (إفنوتي أو أغابي بي):",
          coptic_display: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ",
          tiles: ["Ⲫⲛⲟⲩϯ", "ⲟⲩⲁⲅⲁⲡⲏ", "ⲡⲉ"],
          correct_word: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ",
          explanation: "Ⲫⲛⲟⲩϯ ⲟⲩⲁⲅⲁⲡⲏ ⲡⲉ = الله محبة."
        }
      ]
    },
    {
      id: 338,
      title: "ورشة الترجمة ثنائية الاتجاه (قبطي ⇄ عربي)",
      challenges: [
        {
          id: 4281,
          type: "select",
          question: "ترجم العبارة القبطية «Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ» إلى العربية:",
          coptic_display: "Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ",
          options: [
            { text: "اللهم ارحمنا", is_correct: true },
            { text: "الله مخلصنا", is_correct: false },
            { text: "الله يسمعنا", is_correct: false },
            { text: "الله يباركنا", is_correct: false }
          ],
          explanation: "Ⲫⲛⲟⲩϯ = الله، ⲛⲁⲓ = ارحم، ⲛⲁⲛ = ـنا (ارحمنا)."
        },
        {
          id: 4282,
          type: "read_select",
          question: "كيف تُترجم عبارة 'السلام لكِ يا مريم' إلى اللغة القبطية الكنسية بدقة؟",
          coptic_display: "السلام لكِ يا مريم",
          options: [
            { text: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ (شيري ني ماريا)", is_correct: true },
            { text: "Ⲡⲉⲛⲓⲱⲧ Ⲙⲁⲣⲓⲁ", is_correct: false },
            { text: "Ⲫⲛⲟⲩϯ ⲛⲉⲙ Ⲙⲁⲣⲓⲁ", is_correct: false },
            { text: "Ⲁⲅⲓⲟⲥ Ⲙⲁⲣⲓⲁ", is_correct: false }
          ],
          explanation: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ = السلام لكِ يا مريم."
        },
        {
          id: 4283,
          type: "true_false",
          question: "عبارة «Ⲟⲩϫⲁⲓ ϧⲉⲛ Ⲡϭⲟⲓⲥ» تعني في التراسل القبطي والتحيات 'كن معافى في الرب' أو 'سلام في الرب'.",
          coptic_display: "Ⲟⲩϫⲁⲓ ϧⲉⲛ Ⲡϭⲟⲓⲥ",
          is_correct: true,
          explanation: "صحيح؛ ⲟⲩϫⲁⲓ تعني السلامة أو الخلاص أو الصحة (معافى)."
        },
        {
          id: 4284,
          type: "match",
          question: "طابق العبارات القبطية بترجماتها العربية السليمة في ورشة الترجمة:",
          pairs: [
            { left: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ", right: "السلام لكِ يا مريم" },
            { left: "Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ", right: "يا الله ارحمنا" },
            { left: "Ⲁⲝⲓⲟⲥ", right: "مستحق" },
            { left: "Ⲁⲙⲏⲛ", right: "حقاً / استجب" }
          ],
          explanation: "ترجمة دقيقة للتعبيرات الليتورجية اليومية."
        },
        {
          id: 4285,
          type: "select",
          question: "ما ترجمة عبارة «Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲙ̀ⲙⲏⲓ» الواردة في قطع صلاة باكر بالأجبية؟",
          coptic_display: "Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲙ̀ⲙⲏⲓ",
          options: [
            { text: "النور الحقيقي", is_correct: true },
            { text: "النور العظيم", is_correct: false },
            { text: "النور الأبدي", is_correct: false },
            { text: "نور العالم", is_correct: false }
          ],
          explanation: "ⲙⲏⲓ تعني الحق / الحقيقي: (النور الحقيقي)."
        },
        {
          id: 4286,
          type: "fill_blank",
          question: "أكمل التحية المريمية بالقبطية 'السلام لكِ' (Ⲭⲉⲣⲉ ...):",
          coptic_display: "Ⲭⲉⲣⲉ ...",
          correct_word: "ⲛⲉ",
          options: [
            { text: "ⲛⲉ", is_correct: true },
            { text: "ⲛⲁⲕ", is_correct: false },
            { text: "ⲛⲁⲛ", is_correct: false }
          ],
          explanation: "Ⲭⲉⲣⲉ ⲛⲉ (السلام لكِ للمؤنثة)."
        },
        {
          id: 4287,
          type: "write",
          question: "رتّب حروف عبارة 'السلام لكِ يا مريم' بالقبطية (شيري ني ماريا):",
          coptic_display: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ",
          tiles: ["Ⲭⲉⲣⲉ", "ⲛⲉ", "Ⲙⲁⲣⲓⲁ"],
          correct_word: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ",
          explanation: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ = السلام لكِ يا مريم."
        },
        {
          id: 4288,
          type: "read_select",
          question: "ما ترجمة عبارة «Ϯⲙⲉⲧⲥⲁⲃⲉ ⲛ̀ⲧⲉ ϯⲁⲥⲡⲓ» التي تعبر عن إتقان لغة الآباء؟",
          coptic_display: "Ϯⲙⲉⲧⲥⲁⲃⲉ ⲛ̀ⲧⲉ ϯⲁⲥⲡⲓ",
          options: [
            { text: "معرفة وإتقان اللغة (حكمة اللسان)", is_correct: true },
            { text: "تاريخ الكنيسة", is_correct: false },
            { text: "قراءة الكتب القديمة", is_correct: false },
            { text: "ترجمة الإنجيل", is_correct: false }
          ],
          explanation: "ⲙⲉⲧⲥⲁⲃⲉ = الحكمة والإتقان، ⲁⲥⲡⲓ = اللغة أو اللسان."
        }
      ]
    }
  ]
};
