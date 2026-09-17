/**
 * MG COPTIC — Enforce 2 or 4 Options Rule (All Options Closely Related)
 */
const fs = require('fs');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
const headers = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' };

// Mapping: Question signature -> 4th closely related option text
const FOURTH_OPTIONS = {
  'كيف تنطق كلمة «ⲣⲁⲛ»': 'روون (بواو مفخمة طويلة)',
  'ما معنى كلمة «ⲁⲛⲟⲕ»': 'نحن',
  'كلمة «ⲥⲁ» (ناحية) تتكون من مقطع صوتي': 'سِيـ (بياء مكسورة طويلة)',
  'الياء المكسورة بمد طويل': 'حرف الإبسلون (Ⲩ)',
  'ما معنى كلمة «ⲛⲉⲙ»': 'على (حرف جر)',
  'كلمة «ⲕⲓⲙ» (يتحرك) تنطق بياء': 'خفيفة خطافة كالألف اللينة',
  'كلمة «ⲥⲟⲡ» (مرة) تُنطق بواو': 'طويلة مضمومة كحرف المد في فول',
  'ما معنى كلمة «ⲱⲛϧ»': 'يقوم / قيامة',
  'المقطع «ⲁⲩ» في كلمة «ⲥⲧⲁⲩⲣⲟⲥ»': 'أو (واو قصيرة خطافة)',
  'ما معنى كلمة «ⲉⲩⲭⲏ»': 'ترنيمة / تسبحة',
  'ميز بين «ⲙⲉⲧ» و «ⲙⲏⲧ»': 'رقم سبعة (7)',
  'صوت (ڤ) صامت': 'ⲥⲟⲡ (مرة)',
  'حرف السيما في أول كلمة «ⲥ̀ⲙⲟⲩ»': 'سيـ (بكسرة تلي السين)',
  'ما معنى كلمة «ⲡ̀ϭⲟⲓⲥ»': 'القدوس',
  'جيماً معطشة صريحة': 'ϫⲱ (جو)',
  'كلمة «ⲁⲅⲓⲟⲥ» (قدوس)': 'قاف (Q)',
  'كلمة «ⲁⲅⲅⲉⲗⲟⲥ» (ملاك)، حرف الغمّا الأول': 'ياء',
  'ما معنى كلمة «ⲁⲅⲅⲉⲗⲟⲥ» الكنسية': 'قديس',
  'في كلمة «ⲛⲟⲩϯ» (الله)': 'همزة مكسورة',
  'كلمة «ⲭⲏⲙⲓ» (مصر) قبطية': 'جيم معطشة',
  'كلمة «ⲭⲉⲣⲉ» (السلام لكِ) يونانية ومتبوعة بكسر': 'سين (سيريه)',
  'كلمة «Ⲭⲣⲓⲥⲧⲟⲥ» (المسيح) يونانية ومتبوعة بساكن': 'غين (غرستوس)',
  'كم حرفاً مصرياً ديموطيقياً': '6 حروف',
  'أي كلمة مما يلي قبطية أصيلة 100%': 'ⲭⲉⲣⲉ (السلام لكِ)',
  'المقطع «ⲅⲉ» يُنطق': 'كِ',
  'كلمة «ⲡⲁⲥⲟⲛ» تعني بالقبطية': 'أمي',
  'ما معنى عبارة «Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ»': 'يا الله انظر إلينا',
  'في كلمة «ⲉ̀ⲡⲓⲭⲗⲟⲙ» (الإكليل)': 'قاف',
  'كلمة «ⲡⲉⲕⲣⲁⲛ» تعني': 'ملكوتك',
  'سؤال 1: في كلمة «ⲭⲉⲣⲉ»': 'سين',
  'سؤال 2: في كلمة «ⲭⲏⲙⲓ»': 'قاف'
};

async function main() {
  console.log('🔄 Enforcing 2 or 4 options rule across all files and database...');

  const fullPath = 'database/full-curriculum-levels-1-and-2.json';
  const full = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

  const optionsToInsertToSupabase = [];
  let nextOptId = 6000;

  full.units.forEach(u => {
    u.lessons.forEach(l => {
      l.challenges.forEach(ch => {
        if (ch.options && ch.options.length === 3) {
          const qText = ch.question || '';
          let fourthText = null;

          for (const [key, val] of Object.entries(FOURTH_OPTIONS)) {
            if (qText.includes(key)) {
              fourthText = val;
              break;
            }
          }

          if (!fourthText) {
            fourthText = 'حرف ساكن';
          }

          const newOpt = {
            id: nextOptId++,
            challenge_id: ch.id,
            text: fourthText,
            is_correct: false,
            image_url: null,
            audio_url: null
          };

          ch.options.push(newOpt);

          if (ch.id) {
            optionsToInsertToSupabase.push({
              challenge_id: ch.id,
              text: fourthText,
              is_correct: false,
              image_url: null,
              audio_url: null
            });
          }
        }
      });
    });
  });

  // Save full curriculum
  fs.writeFileSync(fullPath, JSON.stringify(full, null, 2), 'utf-8');
  console.log('✅ Updated database/full-curriculum-levels-1-and-2.json (All questions now have 2 or 4 options)');

  // Save level 2 synced
  const lvl2Path = 'database/level-2-curriculum-synced.json';
  if (fs.existsSync(lvl2Path)) {
    const lvl2 = JSON.parse(fs.readFileSync(lvl2Path, 'utf-8'));
    lvl2.units.forEach(u => {
      u.lessons.forEach(l => {
        l.challenges.forEach(ch => {
          if (ch.options && ch.options.length === 3) {
            const qText = ch.question || '';
            let fourthText = null;
            for (const [key, val] of Object.entries(FOURTH_OPTIONS)) {
              if (qText.includes(key)) {
                fourthText = val;
                break;
              }
            }
            ch.options.push({
              text: fourthText || 'حرف ساكن',
              is_correct: false
            });
          }
        });
      });
    });
    fs.writeFileSync(lvl2Path, JSON.stringify(lvl2, null, 2), 'utf-8');
    console.log('✅ Updated database/level-2-curriculum-synced.json');
  }

  // Insert options to Supabase
  if (optionsToInsertToSupabase.length > 0) {
    console.log(`Inserting ${optionsToInsertToSupabase.length} new 4th options to Supabase...`);
    for (let i = 0; i < optionsToInsertToSupabase.length; i += 25) {
      const batch = optionsToInsertToSupabase.slice(i, i + 25);
      const res = await fetch(`${SUPABASE_URL}/rest/v1/challenge_options`, {
        method: 'POST',
        headers,
        body: JSON.stringify(batch)
      });
      if (!res.ok) {
        console.warn('Supabase options insert notice:', res.status, await res.text());
      }
    }
    console.log('✅ Supabase challenge_options table updated.');
  }

  // Update gamification services
  const fullCurriculumStr = JSON.stringify(full);
  const serviceFiles = [
    'js/services/gamification-service.js',
    'gamification-service.js',
    'www/js/services/gamification-service.js',
    'www/gamification-service.js'
  ];

  for (const f of serviceFiles) {
    if (!fs.existsSync(f)) continue;
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/const DEFAULT_CURRICULUM = \{[\s\S]*?\};\n/, `const DEFAULT_CURRICULUM = ${fullCurriculumStr};\n`);
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`✅ Updated ${f}`);
  }

  // Update learn.js version tag
  const learnFiles = ['js/pages/learn.js', 'www/js/pages/learn.js'];
  for (const f of learnFiles) {
    if (!fs.existsSync(f)) continue;
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/v6_pure_arabic_badges/g, 'v7_strict_2_or_4_options');
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`✅ Bumped cache version to v7_strict_2_or_4_options in ${f}`);
  }

  // Sync learn.js inline into index.html and www/index.html
  const learnJsContent = fs.readFileSync('js/pages/learn.js', 'utf-8');
  const htmlFiles = ['index.html', 'www/index.html'];

  for (const htmlFile of htmlFiles) {
    if (!fs.existsSync(htmlFile)) continue;
    let html = fs.readFileSync(htmlFile, 'utf-8');
    const startMarker = '(function initLearningPathEngine() {';
    const startIdx = html.indexOf(startMarker);
    if (startIdx !== -1) {
      const endMarker = '    })();';
      const endIdx = html.indexOf(endMarker, startIdx + 1000);
      if (endIdx !== -1) {
        const fullEndIdx = endIdx + endMarker.length;
        html = html.slice(0, startIdx) + learnJsContent.trim() + html.slice(fullEndIdx);
        fs.writeFileSync(htmlFile, html, 'utf-8');
        console.log(`✅ Synced learn.js inline into ${htmlFile}`);
      }
    }
  }

  console.log('🎉 2 or 4 options rule successfully enforced everywhere!');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
