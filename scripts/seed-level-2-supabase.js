/**
 * Seed Level 2 Curriculum to Supabase REST API & Local Files
 * 8 Units, 37 Lessons, 222 Challenges, Options & Chests
 * 100% matched to DB Schema
 */
const fs = require('fs');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates'
};

async function postBatch(endpoint, items, batchSize = 50) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(batch)
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to insert into ${endpoint} (batch ${i}-${i + batch.length}): ${res.status} - ${err}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting Level 2 seeding to Supabase...');
  const data = JSON.parse(fs.readFileSync('database/level-2-curriculum-synced.json', 'utf8'));

  // 1. Level
  console.log('1️⃣ Upserting Level 2 (id: 6)...');
  await postBatch('levels', [data.level]);
  console.log('✅ Level 2 upserted.');

  // 2. Units
  console.log('2️⃣ Upserting 8 Units...');
  const unitsToInsert = data.units.map(u => ({
    id: u.id,
    level_id: u.level_id,
    title: u.title,
    badge: u.badge,
    description: u.description,
    order_index: u.order_index
  }));
  await postBatch('units', unitsToInsert);
  console.log('✅ Units upserted.');

  // 3. Lessons, Challenges & Options
  console.log('3️⃣ Preparing Lessons, Challenges, Options, and Chests...');
  const lessonsToInsert = [];
  const challengesToInsert = [];
  const optionsToInsert = [];
  const chestsToInsert = [];

  let challengeIdCounter = 3000;
  let optIdCounter = 5000;

  for (const u of data.units) {
    let lessonOrder = 1;
    let lastLessonId = null;

    for (const l of u.lessons) {
      lastLessonId = l.id;
      lessonsToInsert.push({
        id: l.id,
        unit_id: u.id,
        title: l.title,
        order_index: lessonOrder++,
        practice_xp: 1,
        challenge_xp: l.xp,
        xp_reward: l.xp
      });

      let chOrder = 1;
      for (const ch of l.challenges) {
        const chId = challengeIdCounter++;
        challengesToInsert.push({
          id: chId,
          lesson_id: l.id,
          type: ch.type,
          question: ch.question,
          coptic_display: ch.coptic_display || null,
          audio_text: ch.audio_text || null,
          audio_url: ch.audio_url || null,
          correct_word: ch.correct_word || null,
          tiles: ch.tiles ? ch.tiles : null,
          pairs: ch.pairs ? ch.pairs : null,
          is_correct: true,
          order_index: chOrder++
        });

        if (ch.options && ch.options.length > 0) {
          for (const opt of ch.options) {
            optionsToInsert.push({
              id: optIdCounter++,
              challenge_id: chId,
              text: opt.text,
              is_correct: !!opt.is_correct,
              image_url: null,
              audio_url: null
            });
          }
        }
      }
    }

    // Chest for unit
    chestsToInsert.push({
      id: `chest_unit_${u.id}`,
      level_id: 6,
      unit_id: u.id,
      title: `صندوق إتقان ${u.title}`,
      description: 'تهانينا! لقد أتقنت دروس هذه الوحدة بنجاح باهر!',
      placement_type: 'unit_end',
      after_lesson_id: lastLessonId,
      xp_mode: 'fixed',
      xp_min: 15,
      xp_max: 15,
      hearts: 1,
      has_badge: true,
      badge_title: `متقن ${u.title}`,
      badge_icon: 'star',
      badge_desc: `أتممت ${u.title}`,
      order_index: u.order_index
    });
  }

  // Final Level 2 Grand Graduation Chest
  chestsToInsert.push({
    id: 'chest_level_2_final',
    level_id: 6,
    unit_id: 58,
    title: '🏆 صندوق التخرج والاحتفال الختامي للمستوى الثاني',
    description: 'تهانينا الحارة! لقد أتقنت جميع قواعد القراءة والمقاطع الصوتية والنصوص الكنسية بنجاح باهر!',
    placement_type: 'level_end',
    after_lesson_id: 237,
    xp_mode: 'fixed',
    xp_min: 60,
    xp_max: 60,
    hearts: 3,
    has_badge: true,
    badge_title: 'قارئ قبطي متقن (Master Coptic Reader)',
    badge_icon: 'trophy',
    badge_desc: 'أتممت المستوى الثاني لقواعد القراءة والنطق السليم كاملاً',
    order_index: 99
  });

  console.log(`Inserting ${lessonsToInsert.length} lessons...`);
  await postBatch('lessons', lessonsToInsert);
  console.log('✅ Lessons inserted.');

  console.log(`Inserting ${challengesToInsert.length} challenges...`);
  await postBatch('challenges', challengesToInsert, 25);
  console.log('✅ Challenges inserted.');

  console.log(`Inserting ${optionsToInsert.length} options...`);
  await postBatch('challenge_options', optionsToInsert, 50);
  console.log('✅ Options inserted.');

  console.log(`Inserting ${chestsToInsert.length} chests...`);
  await postBatch('chests', chestsToInsert);
  console.log('✅ Chests inserted.');

  console.log('\n🎉 ALL LEVEL 2 UNITS, LESSONS, CHALLENGES & CHESTS SEEDED TO SUPABASE SUCCESSFULLY!');
}

main().catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
