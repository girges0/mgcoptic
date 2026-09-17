/**
 * MG COPTIC — Make all badges, questions, and descriptions 100% Arabic (No English)
 */
const fs = require('fs');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
const headers = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' };

const UNIT_BADGE_ARABIC = {
  51: 'Ⲁ-Ⲱ',
  52: 'الجِنكِم',
  53: 'نطق مزدوج',
  54: 'نطق ثلاثي',
  55: 'قبطي ويوناني',
  56: 'المقاطع الصوتية',
  57: 'التقطيع الصوتي',
  58: 'قراءة كنسية'
};

async function main() {
  console.log('🔄 Converting all badges and text to 100% Arabic...');

  // 1. Update Supabase Units
  for (const [unitId, arabicBadge] of Object.entries(UNIT_BADGE_ARABIC)) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/units?id=eq.${unitId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ badge: arabicBadge })
    });
    if (!res.ok) console.error('Error updating unit badge in Supabase:', unitId, await res.text());
    else console.log(`✅ Supabase Unit ${unitId} badge set to: ${arabicBadge}`);
  }

  // 2. Update Supabase Chest
  await fetch(`${SUPABASE_URL}/rest/v1/chests?id=eq.chest_level_2_final`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ badge_title: 'قارئ قبطي متقن' })
  });
  console.log('✅ Supabase graduation chest badge_title updated to Arabic.');

  // 3. Update database/level-2-curriculum-synced.json
  const lvl2Path = 'database/level-2-curriculum-synced.json';
  if (fs.existsSync(lvl2Path)) {
    const lvl2 = JSON.parse(fs.readFileSync(lvl2Path, 'utf-8'));
    lvl2.units.forEach(u => {
      if (UNIT_BADGE_ARABIC[u.id]) {
        u.badge = UNIT_BADGE_ARABIC[u.id];
      }
      u.lessons.forEach(l => {
        l.challenges.forEach(ch => {
          if (ch.question) {
            ch.question = ch.question.replace(/\(Syllabification\)/g, '').replace(/Syllabification/g, 'التقطيع الصوتي').trim();
          }
          if (ch.correct_word) {
            ch.correct_word = ch.correct_word
              .replace(/مثل A في lamp/g, 'ألف مفتوحة صريحة')
              .replace(/مثل e في help/g, 'كسرة خفيفة خطافة')
              .replace(/مثل ee في feet/g, 'ياء مكسورة بمد طويل')
              .replace(/مثل i في drink/g, 'ياء قصيرة صريحة')
              .replace(/مثل meet/g, 'ياء ممدودة صريحة')
              .replace(/مثل o في stop \/ مُعلم/g, 'واو قصيرة خطافة')
              .replace(/مثل hope \/ يوم/g, 'واو طويلة مفتوحة ومفخمة')
              .replace(/مثل oo في soon \/ فول/g, 'واو طويلة مضمومة بشفتين مقفلتين');
          }
        });
      });
    });
    fs.writeFileSync(lvl2Path, JSON.stringify(lvl2, null, 2), 'utf-8');
    console.log('✅ Updated database/level-2-curriculum-synced.json to 100% Arabic');
  }

  // 4. Update database/full-curriculum-levels-1-and-2.json
  const fullPath = 'database/full-curriculum-levels-1-and-2.json';
  if (fs.existsSync(fullPath)) {
    const full = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    full.units.forEach(u => {
      if (UNIT_BADGE_ARABIC[u.id]) {
        u.badge = UNIT_BADGE_ARABIC[u.id];
      }
      u.lessons.forEach(l => {
        l.challenges.forEach(ch => {
          if (ch.question) {
            ch.question = ch.question.replace(/\(Syllabification\)/g, '').replace(/Syllabification/g, 'التقطيع الصوتي').trim();
          }
          if (ch.correct_word) {
            ch.correct_word = ch.correct_word
              .replace(/مثل A في lamp/g, 'ألف مفتوحة صريحة')
              .replace(/مثل e في help/g, 'كسرة خفيفة خطافة')
              .replace(/مثل ee في feet/g, 'ياء مكسورة بمد طويل')
              .replace(/مثل i في drink/g, 'ياء قصيرة صريحة')
              .replace(/مثل meet/g, 'ياء ممدودة صريحة')
              .replace(/مثل o في stop \/ مُعلم/g, 'واو قصيرة خطافة')
              .replace(/مثل hope \/ يوم/g, 'واو طويلة مفتوحة ومفخمة')
              .replace(/مثل oo في soon \/ فول/g, 'واو طويلة مضمومة بشفتين مقفلتين');
          }
        });
      });
    });
    full.chests.forEach(ch => {
      if (ch.badge_title) {
        ch.badge_title = ch.badge_title.replace(/\(Master Coptic Reader\)/g, '').trim();
      }
    });
    fs.writeFileSync(fullPath, JSON.stringify(full, null, 2), 'utf-8');
    console.log('✅ Updated database/full-curriculum-levels-1-and-2.json to 100% Arabic');
  }

  // 5. Update gamification services
  const fullCurriculum = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  const fullCurriculumStr = JSON.stringify(fullCurriculum);

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

  // 6. Update learn.js cache version tag
  const learnFiles = ['js/pages/learn.js', 'www/js/pages/learn.js'];
  for (const f of learnFiles) {
    if (!fs.existsSync(f)) continue;
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/v5_1xp_per_question/g, 'v6_pure_arabic_badges');
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`✅ Bumped cache version to v6_pure_arabic_badges in ${f}`);
  }

  // 7. Update markdown curriculum document
  const docPath = 'منهج_المستوى_الثاني_قواعد_القراءة_MG_COPTIC.md';
  if (fs.existsSync(docPath)) {
    let doc = fs.readFileSync(docPath, 'utf-8');
    doc = doc
      .replace(/`Ⲻ-Djinkim`/g, '`الجِنكِم`')
      .replace(/`Conditional-2`/g, '`نطق مزدوج`')
      .replace(/`Conditional-3`/g, '`نطق ثلاثي`')
      .replace(/`Coptic-vs-Greek`/g, '`قبطي ويوناني`')
      .replace(/`Syllables-Matrix`/g, '`المقاطع الصوتية`')
      .replace(/`Syllabification-Master`/g, '`التقطيع الصوتي`')
      .replace(/`Liturgy-Master`/g, '`قراءة كنسية`')
      .replace(/\(Master Coptic Reader\)/g, '')
      .replace(/\(Syllabic Jinkim\)/g, '(الجنكم المقطعي المستقل)')
      .replace(/\(V \/ CV\)/g, '(مقطع مفتوح / ساكن يليه متحرك)')
      .replace(/\(VC \/ CV\)/g, '(ساكنان متتاليان)')
      .replace(/Master Breakdown Challenge/g, 'تحدي فك وتقطيع الكلمات الطويلة الكبرى');
    fs.writeFileSync(docPath, doc, 'utf-8');
    console.log(`✅ Updated ${docPath}`);
  }

  console.log('🎉 All English labels replaced with 100% authentic Arabic terminology!');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
