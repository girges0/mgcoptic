// =========================================================================
// Level 3 - Unit 4: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية
// Total Lessons: 4 | Total Challenges: 30 (4099 - 4128)
// =========================================================================

module.exports = {
  id: 74,
  level_id: 7,
  title: "الوحدة ٤: دقة تشكيل الأصوات الحلقية والشجرية والحلقومية",
  badge: "Ϧ-Ϭ",
  description: "إتقان الفروق الدقيقة بين الحلقيات (Ϧ, Ⲭ, Ϩ) والمزدوجة (Ⲝ, Ⲯ) وأصوات الشين وتشي (Ϣ, Ϭ) في النصوص.",
  order_index: 4,
  lessons: [
    {
      id: 314,
      title: "الثلاثي الحلقي المتقابل (Ϧ vs Ⲭ vs Ϩ)",
      challenges: [
        {
          id: 4099,
          type: "select",
          question: "ما هو الفارق في المخرج الصوتي بين الخاي (Ϧ) والهوري (Ϩ)؟",
          coptic_display: "Ϧ / Ϩ",
          options: [
            { text: "Ϧ حلقي احتكاكي خشن (خاء)، بينما Ϩ حنجري مهموس خفيف (هاء)", is_correct: true },
            { text: "كلاهما ينطقان هاء دائماً", is_correct: false },
            { text: "Ϧ ينطق كافاً وϨ ينطق حاء", is_correct: false },
            { text: "لا يوجد أي فرق بينهما في اللهجة البحيرية", is_correct: false }
          ],
          explanation: "الخاي Ϧ ينطق خاء (خ) صريحة، بينما الهوري Ϩ ينطق هاء (هـ) رقيقة من أقصى الحلق."
        },
        {
          id: 4100,
          type: "read_select",
          question: "في كلمة «ϧⲉⲛ» (في / بواسطة)، ما هو الصوت الحلقي الذي تبدأ به الكلمة؟",
          coptic_display: "ϧⲉⲛ",
          options: [
            { text: "صوت الخاء الصريح (خين)", is_correct: true },
            { text: "صوت الهاء (هين)", is_correct: false },
            { text: "صوت الشين (شين)", is_correct: false },
            { text: "صوت الغين (غين)", is_correct: false }
          ],
          explanation: "حرف Ϧ ينطق خاء دائماً دون شرط: ϧⲉⲛ = خين."
        },
        {
          id: 4101,
          type: "true_false",
          question: "حرف الهوري (Ϩ) يمكن أن ينطق حاء (ح) في بعض الكلمات القبطية القديمة.",
          coptic_display: "Ϩ",
          is_correct: false,
          explanation: "في القبطية البحيرية المعتمدة ينطق هاء (هـ) صريحة، واللغة القبطية لا تحوي صوت الحاء العربي المفصول."
        },
        {
          id: 4102,
          type: "match",
          question: "طابق كل حرف حلقي بنطقه الصوتي المعتمد مع مثاله:",
          pairs: [
            { left: "Ϧ", right: "خاء صريحة دائمًا: ϧⲉⲛ (خين = في)" },
            { left: "Ϩ", right: "هاء رقيقة دائماً: ϩⲏⲧ (هيت = قلب)" },
            { left: "Ⲭ (قبطي)", right: "خاء في الكلمات القبطية: ⲭⲏⲙⲓ (خيمي = مصر)" },
            { left: "Ⲭ (يوناني)", right: "شين أو كاف بحسب الحركة اللاحقة" }
          ],
          explanation: "مقارنة دقيقة بين الحروف الحلقية الثلاثة."
        },
        {
          id: 4103,
          type: "select",
          question: "في كلمة «ϩⲓⲧⲉⲛ» (بصلوات / بواسطة)، ما معنى الكلمة في مستهل الألحان الكنسية؟",
          coptic_display: "ϩⲓⲧⲉⲛ",
          options: [
            { text: "بشفاعة / بصلوات / بواسطة", is_correct: true },
            { text: "سلام / فرح", is_correct: false },
            { text: "قدوس / طاهر", is_correct: false },
            { text: "مجد / إكرام", is_correct: false }
          ],
          explanation: "ϩⲓⲧⲉⲛ (هيتين) تعني بشفاعة أو بصلوات، وتبدأ بحرف الهوري Ϩ."
        },
        {
          id: 4104,
          type: "fill_blank",
          question: "أكمل كلمة 'قلب' بالقبطية بحرف الهوري (هيت):",
          coptic_display: "...ⲏⲧ",
          correct_word: "ϩⲏⲧ",
          options: [
            { text: "ϩⲏⲧ", is_correct: true },
            { text: "ϧⲏⲧ", is_correct: false },
            { text: "ⲭⲏⲧ", is_correct: false }
          ],
          explanation: "ϩⲏⲧ (هيت) = قلب."
        },
        {
          id: 4105,
          type: "write",
          question: "رتّب حروف كلمة 'بشفاعة / بصلوات' بالقبطية (هيتين):",
          coptic_display: "ϩⲓⲧⲉⲛ",
          tiles: ["ϩ", "ⲓ", "ⲧ", "ⲉ", "ⲛ"],
          correct_word: "ϩⲓⲧⲉⲛ",
          explanation: "ϩⲓⲧⲉⲛ = بشفاعة / بصلوات."
        },
        {
          id: 4106,
          type: "read_select",
          question: "أي من الكلمات التالية تشتمل على صوت هاء (هـ) رقيق؟",
          coptic_display: "ⲱⲛϧ / ϩⲏⲧ / ⲭⲏⲙⲓ / ϧⲉⲛ",
          options: [
            { text: "ϩⲏⲧ (قلب) - لوجود حرف الهوري", is_correct: true },
            { text: "ⲱⲛϧ (حياة)", is_correct: false },
            { text: "ⲭⲏⲙⲓ (مصر)", is_correct: false },
            { text: "ϧⲉⲛ (في)", is_correct: false }
          ],
          explanation: "حرف الهوري Ϩ في كلمة ϩⲏⲧ يعطي صوت الهاء الرقيق."
        }
      ]
    },
    {
      id: 315,
      title: "الحروف المزدوجة التوافقية (Ⲝ vs Ⲯ)",
      challenges: [
        {
          id: 4107,
          type: "select",
          question: "ما هو التركيب الصوتي الداخلي لحرف الإكسي (Ⲝ)؟",
          coptic_display: "Ⲝ",
          options: [
            { text: "كاف متبوعة بسيما: (ك + س = ks)", is_correct: true },
            { text: "باء متبوعة بسيما: (ب + س = ps)", is_correct: false },
            { text: "تاء متبوعة بشين: (ت + ش = tsh)", is_correct: false },
            { text: "دال متبوعة بزاي: (د + ز = dz)", is_correct: false }
          ],
          explanation: "حرف الإكسي Ⲝ هو اختصار صوتي للمركب (ك + س)."
        },
        {
          id: 4108,
          type: "read_select",
          question: "ما هو التركيب الصوتي الداخلي لحرف الإبسي (Ⲯ)؟",
          coptic_display: "Ⲯ",
          options: [
            { text: "باء متبوعة بسيما: (ب + س = ps)", is_correct: true },
            { text: "كاف متبوعة بسيما: (ك + س = ks)", is_correct: false },
            { text: "فاء متبوعة بتاف: (ف + ت = ft)", is_correct: false },
            { text: "ميم متبوعة بسيما: (م + س = ms)", is_correct: false }
          ],
          explanation: "حرف الإبسي Ⲯ هو اختصار صوتي للمركب (ب + س)."
        },
        {
          id: 4109,
          type: "true_false",
          question: "يُعامل الحرف المزدوج (Ⲝ أو Ⲯ) في القبطية كحرفين ساكنين متتاليين عند التقطيع الصوتي.",
          coptic_display: "Ⲝ / Ⲯ",
          is_correct: true,
          explanation: "صحيح؛ يفك صوتياً إلى ساكنين متلاحقين: ks و ps."
        },
        {
          id: 4110,
          type: "match",
          question: "طابق كل حرف مركب بتكوينه ومثاله الكنسي الشائع:",
          pairs: [
            { left: "Ⲝ", right: "ك + س مثل: Ⲇⲟⲝⲁ (ذوكسا = مجد)" },
            { left: "Ⲯ", right: "ب + س مثل: ⲯⲁⲗⲙⲟⲥ (بصالموس = مزمور)" },
            { left: "Ϯ", right: "ت + ي مثل: Ϯⲙⲉⲧⲟⲩⲣⲟ (تي ميت أورو)" },
            { left: "Ϭ", right: "ت + ش (تش) مع الكسر أو ج" }
          ],
          explanation: "الحروف المركبة في الأبجدية القبطية وأصواتها المزدوجة."
        },
        {
          id: 4111,
          type: "select",
          question: "في كلمة «ⲯⲩⲭⲏ» (نفس)، ما هما الحرفان المزدوج والحلقي المتتابعان فيها؟",
          coptic_display: "ⲯⲩⲭⲏ",
          options: [
            { text: "الإبسي (ⲯ = ب+س) والكي (ⲭ = شين)", is_correct: true },
            { text: "الإكسي (ⲝ) والخاي (Ϧ)", is_correct: false },
            { text: "السيما والتاف", is_correct: false },
            { text: "الفيدا والغاما", is_correct: false }
          ],
          explanation: "ⲯ تبدأ بـ (ب+س)، والكي متبوع بإيتا فينطق شيناً: بسيشي / بوسيخي."
        },
        {
          id: 4112,
          type: "fill_blank",
          question: "أكمل كتابة كلمة 'مجد' بحرف الإكسي المركب (ذوكسا):",
          coptic_display: "Ⲇⲟ...ⲁ",
          correct_word: "Ⲇⲟⲝⲁ",
          options: [
            { text: "Ⲇⲟⲝⲁ", is_correct: true },
            { text: "Ⲇⲟⲯⲁ", is_correct: false },
            { text: "Ⲇⲟⲥⲁ", is_correct: false }
          ],
          explanation: "Ⲇⲟⲝⲁ بحرف الإكسي ⲝ."
        },
        {
          id: 4113,
          type: "write",
          question: "رتّب حروف كلمة 'نفس' اليونانية الأصل بحرف الإبسي (بسيخي):",
          coptic_display: "ⲯⲩⲭⲏ",
          tiles: ["ⲯ", "ⲩ", "ⲭ", "ⲏ"],
          correct_word: "ⲯⲩⲭⲏ",
          explanation: "ⲯⲩⲭⲏ = نفس."
        }
      ]
    },
    {
      id: 316,
      title: "ثنائيات الكاف والشين والتشي (Ⲕ, Ϣ, Ϭ) وضوابط النطق",
      challenges: [
        {
          id: 4114,
          type: "select",
          question: "ما هو النطق الصوتي الدقيق لحرف التشيما (Ϭ) في اللغة القبطية؟",
          coptic_display: "Ϭ",
          options: [
            { text: "ينطق (تش - tsh) إذا جاء بعده حرف متحرك للكسر، و(ش) أو (ك) مع غيره", is_correct: true },
            { text: "ينطق كافاً صريحة دائماً", is_correct: false },
            { text: "ينطق سيناً رقيقة دائماً", is_correct: false },
            { text: "ينطق طاء مفخمة", is_correct: false }
          ],
          explanation: "حرف Ϭ ينطق تاء وشيناً مدمجين (تش) إذا جاء بعده كسر (Ⲉ, Ⲏ, Ⲓ, Ⲩ)، وشيناً أو كافاً في غير ذلك."
        },
        {
          id: 4115,
          type: "read_select",
          question: "في كلمة «Ϭⲟⲓⲥ» (الرب / السيد)، كيف يُنطق الحرف الأول؟",
          coptic_display: "Ϭⲟⲓⲥ",
          options: [
            { text: "شويس / تشويس (صوت شين أو تش مدمج)", is_correct: true },
            { text: "كويس بكاف صلبة", is_correct: false },
            { text: "لويس بلام", is_correct: false },
            { text: "مويس بميم", is_correct: false }
          ],
          explanation: "Ϭⲟⲓⲥ تنطق شويس أو تشويس (الرب)."
        },
        {
          id: 4116,
          type: "true_false",
          question: "حرف الشاي (Ϣ) ينطق دائماً شيناً (ش) صريحة دون أي تغيير أو شروط في جميع مواضعه.",
          coptic_display: "Ϣ",
          is_correct: true,
          explanation: "صحيح؛ حرف الشاي Ϣ من الحروف الثابتة النطق وينطق شيناً صريحة دائماً."
        },
        {
          id: 4117,
          type: "match",
          question: "طابق كل حرف بالصوت الأساسي الذي يمثله في الكلمات القبطية:",
          pairs: [
            { left: "Ⲕ", right: "كاف انفجارية صلبة دائماً: ⲕⲁϩ (كاه = أرض)" },
            { left: "Ϣ", right: "شين احتكاكية رقيقة دائماً: ϣⲗⲏⲗ (شليل = صلاة)" },
            { left: "Ϭ", right: "تشي مركب أو شين مشروطة: Ϭⲟⲓⲥ (شويس = الرب)" },
            { left: "Ϫ", right: "جيم صريحة أو معطشة بحسب الحركة" }
          ],
          explanation: "مقارنة دقيقة بين الحروف الشجرية والحنكية."
        },
        {
          id: 4118,
          type: "select",
          question: "ما معنى كلمة «ϣⲗⲏⲗ» بالقبطية، وهي من أشهر الكلمات الطقسية؟",
          coptic_display: "ϣⲗⲏⲗ",
          options: [
            { text: "صلاة / يصلي", is_correct: true },
            { text: "صوم / يصوم", is_correct: false },
            { text: "قربان / تقدمة", is_correct: false },
            { text: "سلام / تحية", is_correct: false }
          ],
          explanation: "ϣⲗⲏⲗ (شليل) تعني صلاة."
        },
        {
          id: 4119,
          type: "fill_blank",
          question: "أكمل كلمة 'صلاة' بالقبطية بحرف الشاي الصحيح (شليل):",
          coptic_display: "...ⲗⲏⲗ",
          correct_word: "ϣⲗⲏⲗ",
          options: [
            { text: "ϣⲗⲏⲗ", is_correct: true },
            { text: "Ϭⲗⲏⲗ", is_correct: false },
            { text: "ⲕⲗⲏⲗ", is_correct: false }
          ],
          explanation: "ϣⲗⲏⲗ (شليل) = صلاة."
        },
        {
          id: 4120,
          type: "write",
          question: "رتّب حروف كلمة 'صلاة' بالقبطية (شليل):",
          coptic_display: "ϣⲗⲏⲗ",
          tiles: ["ϣ", "ⲗ", "ⲏ", "ⲗ"],
          correct_word: "ϣⲗⲏⲗ",
          explanation: "ϣⲗⲏⲗ = صلاة."
        }
      ]
    },
    {
      id: 317,
      title: "قراءة وفحص كلمات ونصوص ليتورجية تركز على الحلقيات",
      challenges: [
        {
          id: 4121,
          type: "select",
          question: "في مقدمة مرد الإنجيل «Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ» (بصلوات / بشفاعات)، ما هما الحرفان الحلقيان المتباينان في هاتين الكلمتين؟",
          coptic_display: "Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ",
          options: [
            { text: "الهوري (Ϩ) في الأولى، والكي (Ⲭ) في الثانية", is_correct: true },
            { text: "الخاي في الأولى والغاما في الثانية", is_correct: false },
            { text: "السيما والتاف", is_correct: false },
            { text: "اللافلا والرو", is_correct: false }
          ],
          explanation: "Ϩⲓⲧⲉⲛ تبدأ بالهوري، وⲉⲩⲭⲏ تحتوي على الكي اليونانية."
        },
        {
          id: 4122,
          type: "read_select",
          question: "في عبارة «Ϧⲉⲛ ⲡⲣⲁⲛ ⲙ̀Ⲫⲓⲱⲧ» (باسم الآب)، ما هو الحرف الحلقي الوارد في حرف الجر «Ϧⲉⲛ»؟",
          coptic_display: "Ϧⲉⲛ ⲡⲣⲁⲛ ⲙ̀Ⲫⲓⲱⲧ",
          options: [
            { text: "حرف الخاي (Ϧ)", is_correct: true },
            { text: "حرف الهوري (Ϩ)", is_correct: false },
            { text: "حرف الكي (Ⲭ)", is_correct: false },
            { text: "حرف الغاما (Ⲅ)", is_correct: false }
          ],
          explanation: "Ϧⲉⲛ تبدأ بحرف الخاي Ϧ قبطي أصيل."
        },
        {
          id: 4123,
          type: "true_false",
          question: "تحتوي عبارة «Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ» على حرف الخاي الديموطيقي في كلمة «ⲉⲧϧⲉⲛ».",
          coptic_display: "ⲉⲧϧⲉⲛ",
          is_correct: true,
          explanation: "صحيح؛ ⲉⲧϧⲉⲛ مركبة من ⲉⲧ (الذي) + ϧⲉⲛ (في)."
        },
        {
          id: 4124,
          type: "match",
          question: "طابق كل عبارة ليتورجية بترجمتها العربية الدقيقة:",
          pairs: [
            { left: "Ϧⲉⲛ ⲡⲣⲁⲛ", right: "باسم (في اسم)" },
            { left: "Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ", right: "بصلوات / بشفاعات" },
            { left: "Ϭⲟⲓⲥ ⲛⲁⲓ ⲛⲁⲛ", right: "يا رب ارحمنا" },
            { left: "ϣⲗⲏⲗ ⲉ̀ϫⲉⲛ", right: "صلوا من أجل" }
          ],
          explanation: "أشهر التراكيب الحلقية والشجرية في صلوات الكنيسة اليومية."
        },
        {
          id: 4125,
          type: "select",
          question: "في نداء الشماس «Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ» (صلوا)، ما هو الحرف المزدوج الحلقي المتضمن في الكلمة؟",
          coptic_display: "Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ",
          options: [
            { text: "حرف الإكسي (ⲝ = ك+س)", is_correct: true },
            { text: "حرف الإبسي (Ⲯ = ب+س)", is_correct: false },
            { text: "حرف الخاي (Ϧ)", is_correct: false },
            { text: "حرف الهوري (Ϩ)", is_correct: false }
          ],
          explanation: "Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ كلمة يونانية تحوي حرف الإكسي ⲝ."
        },
        {
          id: 4126,
          type: "fill_blank",
          question: "أكمل بداية البسملة القبطية الشهيرة 'باسم الآب' (Ϧⲉⲛ ... ⲙ̀Ⲫⲓⲱⲧ):",
          coptic_display: "Ϧⲉⲛ ... ⲙ̀Ⲫⲓⲱⲧ",
          correct_word: "ⲡⲣⲁⲛ",
          options: [
            { text: "ⲡⲣⲁⲛ", is_correct: true },
            { text: "ⲡⲓⲣⲁⲛ", is_correct: false },
            { text: "ⲡⲓⲱⲧ", is_correct: false }
          ],
          explanation: "Ϧⲉⲛ ⲡⲣⲁⲛ ⲙ̀Ⲫⲓⲱⲧ = باسم الآب."
        },
        {
          id: 4127,
          type: "write",
          question: "رتّب حروف عبارة 'باسم' بالقبطية (خين بـ ران):",
          coptic_display: "Ϧⲉⲛ ⲡⲣⲁⲛ",
          tiles: ["Ϧⲉⲛ", "ⲡ", "ⲣ", "ⲁ", "ⲛ"],
          correct_word: "Ϧⲉⲛ ⲡⲣⲁⲛ",
          explanation: "Ϧⲉⲛ ⲡⲣⲁⲛ = باسم."
        },
        {
          id: 4128,
          type: "read_select",
          question: "ما هو حكم نطق حرف الفاي في «ⲙ̀Ⲫⲓⲱⲧ» (للآب)؟",
          coptic_display: "ⲙ̀Ⲫⲓⲱⲧ",
          options: [
            { text: "فاء مهموسة غير مجهورة (فيوت)", is_correct: true },
            { text: "باء شفتانية", is_correct: false },
            { text: "ڤاء مجهورة", is_correct: false },
            { text: "واو لينة", is_correct: false }
          ],
          explanation: "حرف الفاي Ⲫ ينطق دائماً فاء (ف) رقيقة مهموسة: إمفيوت."
        }
      ]
    }
  ]
};
