// =========================================================================
// Level 3 - Unit 8: قراءة ونقد النصوص الكنسية الشهيرة
// Total Lessons: 4 | Total Challenges: 34 (4219 - 4252)
// =========================================================================

module.exports = {
  id: 78,
  level_id: 7,
  title: "الوحدة ٨: قراءة ونقد النصوص الكنسية الشهيرة",
  badge: "Ⲡⲉⲛⲓⲱⲧ",
  description: "تحليل وتفكيك نصوص الصلاة الربانية ولحن البركة وصلاة الصلح وتسبحة نصف الليل مع تصحيح الأخطاء الشائعة.",
  order_index: 8,
  lessons: [
    {
      id: 330,
      title: "قراءة وتحليل نص الصلاة الربانية (Ⲡⲉⲛⲓⲱⲧ)",
      challenges: [
        {
          id: 4219,
          type: "select",
          question: "ما هو الإعراب والتحليل الصوتي للكلمة الأولى من الصلاة الربانية «Ⲡⲉⲛⲓⲱⲧ»؟",
          coptic_display: "Ⲡⲉⲛⲓⲱⲧ",
          options: [
            { text: "أداة ملكية الجمع المتكلم (Ⲡⲉⲛ- = أبانا / نا) متصلة بكلمة (ⲓⲱⲧ = أب)", is_correct: true },
            { text: "فعل أمر بمعنى استجب لنا", is_correct: false },
            { text: "اسم إشارة بمعنى هذا الأب", is_correct: false },
            { text: "حرف جر مركب بمعنى من أجل الآب", is_correct: false }
          ],
          explanation: "Ⲡⲉⲛ- سابقة الملكية لـ (نا) للمفرد المذكر + ⲓⲱⲧ (أب) = أبانا."
        },
        {
          id: 4220,
          type: "read_select",
          question: "في جملة «ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ ⲛ̀ϫⲉ ⲡⲉⲕⲣⲁⲛ»، ما معنى الصيغة النحوية «ⲙⲁⲣⲉϥ-»؟",
          coptic_display: "ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ",
          options: [
            { text: "صيغة التمني أو الطلب للأمر الغائب (ليتقدس / ليطهر)", is_correct: true },
            { text: "فعل ماضٍ تام بمعنى قد تقدس وانتهى", is_correct: false },
            { text: "أداة نهي بمعنى لا تدع", is_correct: false },
            { text: "صيغة استفهام", is_correct: false }
          ],
          explanation: "ⲙⲁⲣⲉ- هي بادئة الأمر للغائب أو التمني (ليتقدس)."
        },
        {
          id: 4221,
          type: "true_false",
          question: "تفيد أداة «ⲛ̀ϫⲉ» في الصلاة الربانية تأخير الفاعل وإبرازه لغوياً بعد الفعل (ليتقدس اسمُك).",
          coptic_display: "ⲛ̀ϫⲉ",
          is_correct: true,
          explanation: "صحيح؛ ⲛ̀ϫⲉ هي أداة الفاعل المؤخر في الجملة الفعلية القبطية."
        },
        {
          id: 4222,
          type: "match",
          question: "طابق كل عبارة من الصلاة الربانية بترجمتها الدقيقة:",
          pairs: [
            { left: "ⲙⲁⲣⲉⲥⲓ̀ ⲛ̀ϫⲉ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ", right: "ليأتِ ملكوتك" },
            { left: "ⲡⲉⲧⲉϩⲛⲁⲕ ⲙⲁⲣⲉϥϣⲱⲡⲓ", right: "لتكن مشيئتك" },
            { left: "ⲡⲉⲛⲱⲓⲕ ⲛ̀ⲧⲉ ⲣⲁⲥϯ", right: "خبزنا الذي للغد (كفافنا)" },
            { left: "ⲭⲁ ⲛⲏⲉⲧⲉⲣⲟⲛ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", right: "اغفر لنا ذنوبنا" }
          ],
          explanation: "الطلبات الجوهرية في الصلاة الربانية بحسب النص القبطي البحيري."
        },
        {
          id: 4223,
          type: "select",
          question: "ما معنى عبارة «ⲙ̀ⲫⲣⲏϯ ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ»؟",
          coptic_display: "ⲙ̀ⲫⲣⲏϯ ϧⲉⲛ ⲧ̀ⲫⲉ ⲛⲉⲙ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ",
          options: [
            { text: "كما في السماء كذلك على الأرض", is_correct: true },
            { text: "في الليل وفي النهار", is_correct: false },
            { text: "من الآن وإلى الأبد", is_correct: false },
            { text: "بين الملائكة والبشر", is_correct: false }
          ],
          explanation: "ⲙ̀ⲫⲣⲏϯ (كما) ϧⲉⲛ ⲧ̀ⲫⲉ (في السماء) ⲛⲉⲙ (و) ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ (على الأرض)."
        },
        {
          id: 4224,
          type: "fill_blank",
          question: "أكمل عبارة الصلاة الربانية 'اغفر لنا ما علينا': (... ⲛⲏⲉⲧⲉⲣⲟⲛ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ):",
          coptic_display: "... ⲛⲏⲉⲧⲉⲣⲟⲛ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ",
          correct_word: "ⲭⲁ",
          options: [
            { text: "ⲭⲁ", is_correct: true },
            { text: "ⲙⲁ", is_correct: false },
            { text: "ⲁⲣⲓ", is_correct: false }
          ],
          explanation: "ⲭⲁ ... ⲉ̀ⲃⲟⲗ = اترك / اغفر."
        },
        {
          id: 4225,
          type: "write",
          question: "رتّب حروف مستهل الصلاة الربانية بالقبطية (أبانا الذي في السموات):",
          coptic_display: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ",
          tiles: ["Ⲡⲉⲛⲓⲱⲧ", "ⲉⲧϧⲉⲛ", "ⲛⲓⲫⲏⲟⲩⲓ"],
          correct_word: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ",
          explanation: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ = أبانا الذي في السموات."
        },
        {
          id: 4226,
          type: "read_select",
          question: "في نهاية الصلاة الربانية «ϧⲉⲛ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲉⲛϭⲟⲓⲥ»، ما معنى «Ⲡⲉⲛϭⲟⲓⲥ»؟",
          coptic_display: "Ⲡⲉⲛϭⲟⲓⲥ",
          options: [
            { text: "ربنا (ϭⲟⲓⲥ = رب + Ⲡⲉⲛ = نا)", is_correct: true },
            { text: "إلهنا", is_correct: false },
            { text: "مخلصنا", is_correct: false },
            { text: "ملكنا", is_correct: false }
          ],
          explanation: "Ⲡⲉⲛϭⲟⲓⲥ (بنشويس) تعني ربنا."
        },
        {
          id: 4227,
          type: "select",
          question: "ما معنى الفعل «ⲛⲁϩⲙⲉⲛ» في طلبة «ⲛⲁϩⲙⲉⲛ ⲉ̀ⲃⲟⲗ ϩⲁ ⲡⲓⲡⲉⲧϩⲱⲟⲩ»؟",
          coptic_display: "ⲛⲁϩⲙⲉⲛ ⲉ̀ⲃⲟⲗ",
          options: [
            { text: "نجّنا / أنقذنا", is_correct: true },
            { text: "ارحمنا", is_correct: false },
            { text: "احفظنا", is_correct: false },
            { text: "علّمنا", is_correct: false }
          ],
          explanation: "ⲛⲟϩⲉⲙ = يخلص / ينقذ، ⲛⲁϩⲙⲉⲛ = نجّنا."
        }
      ]
    },
    {
      id: 331,
      title: "قراءة وتحليل لحن البركة والصلح وتسابيح التمجيد",
      challenges: [
        {
          id: 4228,
          type: "select",
          question: "في لحن البركة الشهير «Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ»، ما معنى الفعل «Ⲧⲉⲛⲟⲩⲱϣⲧ»؟",
          coptic_display: "Ⲧⲉⲛⲟⲩⲱϣⲧ",
          options: [
            { text: "نسجدُ (فعل مضارع لجماعة المتكلمين نحن)", is_correct: true },
            { text: "نطلبُ", is_correct: false },
            { text: "نباركُ", is_correct: false },
            { text: "نسبحُ", is_correct: false }
          ],
          explanation: "ⲟⲩⲱϣⲧ = يسجد، Ⲧⲉⲛ- سابقة الحاضر لنحن = نسجد."
        },
        {
          id: 4229,
          type: "read_select",
          question: "في ختام لحن البركة «ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ»، ما المعنى اللاهوتي الدقيق؟",
          coptic_display: "ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ",
          options: [
            { text: "أتيتَ وخلّصتَنا", is_correct: true },
            { text: "قمتَ ورفعتَنا", is_correct: false },
            { text: "صعدتَ وباركتَنا", is_correct: false },
            { text: "تراءيتَ وشفيتَنا", is_correct: false }
          ],
          explanation: "ⲓ̀ = يأتي، ⲥⲱϯ = يخلص: (أتيت وخلصتنا)."
        },
        {
          id: 4230,
          type: "true_false",
          question: "جملة «Ϯϩⲓⲣⲏⲛⲏ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ» في صلاة الصلح تعني 'سلام الله الذي يفوق كل عقل'.",
          coptic_display: "Ϯϩⲓⲣⲏⲛⲏ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ",
          is_correct: true,
          explanation: "صحيح؛ Ϯϩⲓⲣⲏⲛⲏ (السلام) ⲛ̀ⲧⲉ (الذي لـ) Ⲫⲛⲟⲩϯ (الله)."
        },
        {
          id: 4231,
          type: "match",
          question: "طابق عبارات التسابيح الكنسية بترجماتها الدقيقة:",
          pairs: [
            { left: "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ", right: "نسجد للآب" },
            { left: "ⲛⲉⲙ Ⲡϣⲏⲣⲓ", right: "والابن" },
            { left: "ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ", right: "والروح القدس" },
            { left: "ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ", right: "أتيت وخلصتنا" }
          ],
          explanation: "أركان تسبيحة البركة والثالوث الأقدس."
        },
        {
          id: 4232,
          type: "select",
          question: "في مقدمة صلاة الصلح «Ⲡⲛⲟⲩϯ ⲡⲓⲛⲓϣϯ ⲛ̀ⲉ̀ⲛⲉϩ»، ما معنى الصفة «ⲡⲓⲛⲓϣϯ»؟",
          coptic_display: "ⲡⲓⲛⲓϣϯ",
          options: [
            { text: "العظيم / الأكبر", is_correct: true },
            { text: "الرحيم", is_correct: false },
            { text: "القدوس", is_correct: false },
            { text: "الأزلي", is_correct: false }
          ],
          explanation: "ⲛⲓϣϯ تعني عظيم."
        },
        {
          id: 4233,
          type: "fill_blank",
          question: "أكمل عبارة لحن البركة الأولى 'نسجد للآب' (Ⲧⲉⲛⲟⲩⲱϣⲧ ...):",
          coptic_display: "Ⲧⲉⲛⲟⲩⲱϣⲧ ...",
          correct_word: "ⲙ̀Ⲫⲓⲱⲧ",
          options: [
            { text: "ⲙ̀Ⲫⲓⲱⲧ", is_correct: true },
            { text: "ⲛ̀Ⲫⲓⲱⲧ", is_correct: false },
            { text: "ⲉ̀Ⲫⲓⲱⲧ", is_correct: false }
          ],
          explanation: "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ = نسجد للآب."
        },
        {
          id: 4234,
          type: "write",
          question: "رتّب حروف عبارة 'أتيت وخلصتنا' بالقبطية (أك إي أك سوتي إممون):",
          coptic_display: "ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ",
          tiles: ["ⲁⲕⲓ̀", "ⲁⲕⲥⲱϯ", "ⲙ̀ⲙⲟⲛ"],
          correct_word: "ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ",
          explanation: "ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ = أتيت وخلصتنا."
        },
        {
          id: 4235,
          type: "read_select",
          question: "ما نوع الفعل «ⲁⲕⲥⲱϯ» من حيث صيغة الزمن والضمير؟",
          coptic_display: "ⲁⲕⲥⲱϯ",
          options: [
            { text: "ماضٍ تام للمخاطب المذكر المفرد (أنتَ خلّصتَ)", is_correct: true },
            { text: "أمر جماعي", is_correct: false },
            { text: "حاضر مستمر", is_correct: false },
            { text: "مستقبل قريب", is_correct: false }
          ],
          explanation: "ⲁⲕ- سابقة الماضي للمخاطب المذكر (أنتَ فعلتَ)."
        }
      ]
    },
    {
      id: 332,
      title: "قراءة وتحليل قطع الأجبية وتسبحة نصف الليل",
      challenges: [
        {
          id: 4236,
          type: "select",
          question: "ما اسم كتاب الصلوات السبع اليومية بالقبطية؟",
          coptic_display: "صلوات الساعات",
          options: [
            { text: "Ⲡⲓϫⲱⲙ ⲛ̀ⲧⲉ ⲛⲓⲁϫⲡ (بي جوم إنتي ني أجب = الأجبية)", is_correct: true },
            { text: "Ⲡⲓⲯⲁⲗⲧⲏⲣⲓⲟⲛ", is_correct: false },
            { text: "Ⲡⲓⲉⲩⲭⲟⲗⲟⲅⲓⲟⲛ", is_correct: false },
            { text: "Ⲡⲓⲕⲁⲧⲁⲙⲉⲣⲟⲥ", is_correct: false }
          ],
          explanation: "الأجبية مشتقة من الكلمة القبطية ⲁϫⲡ (أجب) أي ساعة."
        },
        {
          id: 4237,
          type: "read_select",
          question: "في تسبحة نصف الليل «Ⲧⲉⲛⲑⲏⲛⲟⲩ» (قوموا يا بني النور)، ما معنى الكلمة الأولى؟",
          coptic_display: "Ⲧⲉⲛⲑⲏⲛⲟⲩ",
          options: [
            { text: "استيقظوا / هبوا / انتبهوا (أنتم)", is_correct: true },
            { text: "ارقدوا بسلام", is_correct: false },
            { text: "صلوا بلا انقطاع", is_correct: false },
            { text: "اسجدوا بخوف", is_correct: false }
          ],
          explanation: "Ⲧⲉⲛⲑⲏⲛⲟⲩ هي صيغة التنبيه والاستنهاض: هلموا / استيقظوا."
        },
        {
          id: 4238,
          type: "true_false",
          question: "تعبير «ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ» يعني حرفياً 'بنو النور'.",
          coptic_display: "ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ",
          is_correct: true,
          explanation: "صحيح؛ ⲛⲓϣⲏⲣⲓ = الأبناء / البنون، ⲡⲓⲟⲩⲱⲓⲛⲓ = النور."
        },
        {
          id: 4239,
          type: "match",
          question: "طابق الكلمات الطقسية من تسبحة نصف الليل بمعانيها:",
          pairs: [
            { left: "ⲡⲓⲟⲩⲱⲓⲛⲓ", right: "النور الإلهي" },
            { left: "ⲛⲓⲁϫⲡ", right: "الساعات / أوقات الصلاة" },
            { left: "ϩⲱⲥ", right: "سبّحوا / هوس" },
            { left: "ⲑⲉⲟⲧⲟⲕⲓⲁ", right: "ثيؤطوكية (تمجيد والدة الإله)" }
          ],
          explanation: "المفردات الأساسية لنظام الإبصالمودية الكنسية وتسابيح الليل."
        },
        {
          id: 4240,
          type: "select",
          question: "ما معنى كلمة «Ϩⲱⲥ» (هوس) التي تُطلق على تسابيح الكتاب المقدس الأربعة؟",
          coptic_display: "Ϩⲱⲥ",
          options: [
            { text: "تسبحة / سبّحوا", is_correct: true },
            { text: "صلاة توبة", is_correct: false },
            { text: "قراءة تاريخية", is_correct: false },
            { text: "وعظة تعليمية", is_correct: false }
          ],
          explanation: "Ϩⲱⲥ تعني تسبحة أو ترنيمة حمد."
        },
        {
          id: 4241,
          type: "fill_blank",
          question: "أكمل نداء تسبحة نصف الليل 'بني النور' (ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ...):",
          coptic_display: "ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ...",
          correct_word: "ⲡⲓⲟⲩⲱⲓⲛⲓ",
          options: [
            { text: "ⲡⲓⲟⲩⲱⲓⲛⲓ", is_correct: true },
            { text: "ⲡⲓⲱⲛϧ", is_correct: false },
            { text: "ⲧ̀ⲫⲉ", is_correct: false }
          ],
          explanation: "ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ = بنو النور."
        },
        {
          id: 4242,
          type: "write",
          question: "رتّب حروف كلمة 'النور' بالقبطية (بي أوويني):",
          coptic_display: "ⲡⲓⲟⲩⲱⲓⲛⲓ",
          tiles: ["ⲡⲓ", "ⲟⲩ", "ⲱ", "ⲓ", "ⲛ", "ⲓ"],
          correct_word: "ⲡⲓⲟⲩⲱⲓⲛⲓ",
          explanation: "ⲡⲓⲟⲩⲱⲓⲛⲓ = النور."
        },
        {
          id: 4243,
          type: "read_select",
          question: "في عبارة «Ϩⲱⲥ ⲉ̀Ⲡϭⲟⲓⲥ» (سبحوا الرب)، ما هي أداة الجر المفعولية المستعملة؟",
          coptic_display: "Ϩⲱⲥ ⲉ̀Ⲡϭⲟⲓⲥ",
          options: [
            { text: "حرف الجر ⲉ̀ المتصل بأداة التعريف بي", is_correct: true },
            { text: "حرف الجر ϧⲉⲛ", is_correct: false },
            { text: "أداة النسبة ⲛ̀ⲧⲉ", is_correct: false },
            { text: "أداة العطف ⲛⲉⲙ", is_correct: false }
          ],
          explanation: "ⲉ̀ تدل على التوجه نحو المفعول: سبحوا للرب / نحو الرب."
        }
      ]
    },
    {
      id: 333,
      title: "تصحيح الأخطاء الشائعة في القراءة الشفهية الكنسية",
      challenges: [
        {
          id: 4244,
          type: "select",
          question: "ما هو الخطأ الشائع الذي يقع فيه البعض عند نطق كلمة «ⲭⲏⲙⲓ» (مصر)؟",
          coptic_display: "ⲭⲏⲙⲓ",
          options: [
            { text: "نطقها شيناً (شيمي) ظناً منهم أنها تخضع لقاعدة الكي اليونانية، والصحيح خاء (خيمي) لأنها قبطية", is_correct: true },
            { text: "نطقها جيماً", is_correct: false },
            { text: "نطقها فاء", is_correct: false },
            { text: "مد الميم", is_correct: false }
          ],
          explanation: "خطأ شائع شهير: ⲭⲏⲙⲓ كلمة قبطية أصيلة فينطق حرف الكي فيها خاء دائماً (خيمي)."
        },
        {
          id: 4245,
          type: "read_select",
          question: "ما هو الصواب في نطق كلمة «ⲁⲅⲓⲟⲥ» (قدوس): هل بجيم معطشة أم بغين؟",
          coptic_display: "ⲁⲅⲓⲟⲥ",
          options: [
            { text: "الصواب بجيم معطشة (آجيوس) لأنها كلمة يونانية متبوعة بمتحرك كسر (Ⲓ)", is_correct: true },
            { text: "الصواب بغين (آغيوس) دائماً", is_correct: false },
            { text: "الصواب بنون (آنيوس)", is_correct: false },
            { text: "كلاهما خطأ فادح", is_correct: false }
          ],
          explanation: "القاعدة المجمعية الصريحة: الغاما في اليوناني قبل متحرك للكسر تنطق جيماً معطشة (آجيوس)."
        },
        {
          id: 4246,
          type: "true_false",
          question: "من الأخطاء الشائعة تسكين الحرف الذي يعلوه جنكم وكأنه سكون عربي دون توليد صوت الكسرة الخفيفة التمهيدية.",
          coptic_display: "الجنكم والتسكين",
          is_correct: true,
          explanation: "صحيح؛ إهمال صوت الهمزة المكسورة التمهيدية يلغي وظيفة الجنكم الإيقاعية."
        },
        {
          id: 4247,
          type: "match",
          question: "طابق الكلمة بالنطق الكنسي الصحيح المصحح مقابل النطق الخاطئ:",
          pairs: [
            { left: "ⲭⲏⲙⲓ (مصر)", right: "خيمي (صحيح) وليس شيمي" },
            { left: "ⲁⲅⲓⲟⲥ (قدوس)", right: "آجيوس (صحيح) وليس آغيوس" },
            { left: "ⲉⲩⲭⲏ (صلاة)", right: "إيڤكي أو إيفشي وليس إيوكي" },
            { left: "ⲥⲧⲁⲩⲣⲟⲥ (صليب)", right: "إستافروس (صوت ڤ) وليس إستاوروس" }
          ],
          explanation: "تصحيح أهم أربعة أخطاء شائعة في القراءة الشفهية الكنسية."
        },
        {
          id: 4248,
          type: "select",
          question: "لماذا يُعد نطق «ⲥⲧⲁⲩⲣⲟⲥ» كـ (إستاوروس) خطأً صوتياً؟",
          coptic_display: "ⲥⲧⲁⲩⲣⲟⲥ",
          options: [
            { text: "لأن الإبسلون بعد الألفا (ⲁⲩ) ينقلب حتماً إلى صوت ڤ صامت (إستافروس)", is_correct: true },
            { text: "لأن الألفا تسقط", is_correct: false },
            { text: "لأن السيما تصبح زاي", is_correct: false },
            { text: "لأنها كلمة قبطية قديمة", is_correct: false }
          ],
          explanation: "القاعدة الذهبية: ⲁⲩ تنطق (آڤ) بصوت ڤ صامت دائماً."
        },
        {
          id: 4249,
          type: "fill_blank",
          question: "أكمل تصحيح النطق لكلمة مصر القبطية: تنطق (...-مي) وليس (شي-مي):",
          coptic_display: "ⲭⲏⲙⲓ",
          correct_word: "خي",
          options: [
            { text: "خي", is_correct: true },
            { text: "شي", is_correct: false },
            { text: "كي", is_correct: false }
          ],
          explanation: "تنطق خيمي لأن الكلمة قبطية أصلية."
        },
        {
          id: 4250,
          type: "write",
          question: "رتّب حروف كلمة 'قدوس' اليونانية ذات الجيم المعطشة (آجيوس):",
          coptic_display: "Ⲁⲅⲓⲟⲥ",
          tiles: ["Ⲁ", "ⲅ", "ⲓ", "ⲟ", "ⲥ"],
          correct_word: "Ⲁⲅⲓⲟⲥ",
          explanation: "Ⲁⲅⲓⲟⲥ = قدوس."
        },
        {
          id: 4251,
          type: "read_select",
          question: "في كلمة «ⲛⲓⲃⲓ» (يتنفس)، كيف يُنطق حرف الفيدا لمنع الخطأ الشائع؟",
          coptic_display: "ⲛⲓⲃⲓ",
          options: [
            { text: "نيڤي (بصوت ڤ لوقوعها قبل متحرك كسر Ⲓ)", is_correct: true },
            { text: "نيبي (بصوت باء)", is_correct: false },
            { text: "نيمي (بصوت ميم)", is_correct: false },
            { text: "نيفي (بفاء مهموسة)", is_correct: false }
          ],
          explanation: "الفيدا قبل الحرف المتحرك تنطق ڤ: نيڤي."
        },
        {
          id: 4252,
          type: "select",
          question: "ما هو معيار النطق الأرثوذكسي المعتمد في الكنيسة القبطية حالياً؟",
          coptic_display: "المعيار المعتمد",
          options: [
            { text: "قرارات المجمع المقدس ولجنة الطقوس وقواعد المعلم عريان مفتاح والبابا كيرلس الرابع", is_correct: true },
            { text: "الاجتهاد الفردي لكل قارئ دون مرجع", is_correct: false },
            { text: "النطق اليوناني البيزنطي الحديث المنفصل", is_correct: false },
            { text: "قواعد اللهجة الصعيدية المترجمة بالإنجليزية فقط", is_correct: false }
          ],
          explanation: "تعتمد الكنيسة القبطية الأرثوذكسية قواعد المجمع المقدس لإحياء النطق البحيري الأصيل."
        }
      ]
    }
  ]
};
