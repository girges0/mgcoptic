const fs = require('fs');
const path = require('path');

// =========================================================================
// MG COPTIC — Full Level 3 Generator & Supabase Seeder
// 10 Units | 42 Lessons | 316 Challenges | 11 Chests
// Title: المستوى الثالث: المراجعة الشاملة والتطبيق المتقدم
// =========================================================================

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates'
};

const level3 = {
  id: 7,
  title: "المستوى الثالث: المراجعة الشاملة والتطبيق المتقدم",
  description: "مراجعة احترافية متقدمة وتطبيقية لجميع قواعد ونصوص ومفردات المستويين الأول والثاني مع تقييمات تفاعلية شاملة.",
  order_index: 3
};

// Load units
const units = [
  require('./level3-data/unit1.js'),
  require('./level3-data/unit2.js'),
  require('./level3-data/unit3.js'),
  require('./level3-data/unit4.js'),
  require('./level3-data/unit5.js'),
  require('./level3-data/unit6.js'),
  require('./level3-data/unit7.js'),
  require('./level3-data/unit8.js'),
  require('./level3-data/unit9.js'),
  require('./level3-data/unit10.js')
];

function validateCurriculum() {
  console.log('🔍 Validating Level 3 Curriculum structure...');
  if (units.length !== 10) {
    throw new Error(`Expected 10 units, got ${units.length}`);
  }

  let totalLessons = 0;
  let totalChallenges = 0;

  units.forEach((u, uIdx) => {
    totalLessons += u.lessons.length;
    let uChs = 0;
    u.lessons.forEach((l, lIdx) => {
      uChs += l.challenges.length;
      totalChallenges += l.challenges.length;
      
      l.challenges.forEach((ch, chIdx) => {
        if (!ch.type) throw new Error(`Missing type in unit ${uIdx+1} lesson ${lIdx+1} ch ${chIdx+1}`);
        if (!ch.question) throw new Error(`Missing question in unit ${uIdx+1} lesson ${lIdx+1} ch ${chIdx+1}`);
        if (ch.type === 'select' || ch.type === 'read_select' || ch.type === 'fill_blank') {
          if (!ch.options || ch.options.length === 0) {
            throw new Error(`Missing options for ${ch.type} in ch ${ch.id}: ${ch.question}`);
          }
          const correctCount = ch.options.filter(o => o.is_correct).length;
          if (correctCount === 0) {
            throw new Error(`No correct option in ch ${ch.id}: ${ch.question}`);
          }
        } else if (ch.type === 'match') {
          if (!ch.pairs || ch.pairs.length === 0) {
            throw new Error(`Missing pairs in match ch ${ch.id}: ${ch.question}`);
          }
        } else if (ch.type === 'write') {
          if (!ch.correct_word || !ch.tiles || ch.tiles.length === 0) {
            throw new Error(`Missing tiles/correct_word in write ch ${ch.id}: ${ch.question}`);
          }
        } else if (ch.type === 'true_false') {
          if (typeof ch.is_correct !== 'boolean') {
            throw new Error(`Missing boolean is_correct in true_false ch ${ch.id}: ${ch.question}`);
          }
        }
      });
    });
    console.log(`  Unit ${uIdx + 1}: ${u.title} (${u.lessons.length} lessons, ${uChs} challenges)`);
  });

  console.log(`\n📊 Verification totals:`);
  console.log(`  Units: ${units.length} (Expected: 10)`);
  console.log(`  Lessons: ${totalLessons} (Expected: 42)`);
  console.log(`  Challenges: ${totalChallenges} (Expected: 316)`);

  if (totalLessons !== 42) throw new Error(`Expected 42 lessons, got ${totalLessons}`);
  if (totalChallenges !== 316) throw new Error(`Expected 316 challenges, got ${totalChallenges}`);

  console.log('✅ Validation passed 100%!');
}

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function buildSQL() {
  console.log('\n📝 Building SQL Migration file...');
  let sql = `-- ============================================================================
-- Migration 13: Level 3 Coptic Curriculum (المستوى الثالث: المراجعة الشاملة والتطبيق المتقدم)
-- Total Units: 10 | Total Lessons: 42 | Total Challenges: 316 | Total XP: ~456
-- Badge: Ⲡⲓⲣⲉϥⲥⲁⲃⲉ (المتقن القبطي الشامل)
-- ============================================================================

DO $$
DECLARE
    v_level_id INT := 7;
BEGIN
    -- 1. Levels
    INSERT INTO public.levels (id, title, description, order_index)
    VALUES (v_level_id, 'المستوى الثالث: المراجعة الشاملة والتطبيق المتقدم', 'مراجعة احترافية متقدمة وتطبيقية لجميع قواعد ونصوص ومفردات المستويين الأول والثاني مع تقييمات تفاعلية شاملة.', 3)
    ON CONFLICT (id) DO UPDATE SET 
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        order_index = EXCLUDED.order_index;

    -- Clean existing Level 3 data if re-running
    DELETE FROM public.challenge_options WHERE challenge_id IN (
        SELECT id FROM public.challenges WHERE lesson_id IN (
            SELECT id FROM public.lessons WHERE unit_id IN (
                SELECT id FROM public.units WHERE level_id = v_level_id
            )
        )
    );
    DELETE FROM public.challenges WHERE lesson_id IN (
        SELECT id FROM public.lessons WHERE unit_id IN (
            SELECT id FROM public.units WHERE level_id = v_level_id
        )
    );
    DELETE FROM public.lessons WHERE unit_id IN (
        SELECT id FROM public.units WHERE level_id = v_level_id
    );
    DELETE FROM public.chests WHERE level_id = v_level_id;
    DELETE FROM public.units WHERE level_id = v_level_id;
`;

  let optIdCounter = 7001;

  // Insert Units
  for (const u of units) {
    sql += `
    -- ---------------------------------------------------------
    -- Unit ${u.order_index}: ${u.title}
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (${u.id}, v_level_id, ${escapeSql(u.title)}, ${escapeSql(u.badge)}, ${escapeSql(u.description)}, ${u.order_index});
`;

    // Lessons
    for (let lIdx = 0; lIdx < u.lessons.length; lIdx++) {
      const l = u.lessons[lIdx];
      const lessonOrder = lIdx + 1;
      const lessonXp = l.challenges.length;
      sql += `
    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (${l.id}, ${u.id}, ${escapeSql(l.title)}, ${lessonXp}, 1, ${lessonXp}, ${lessonOrder});
`;

      // Challenges
      for (let cIdx = 0; cIdx < l.challenges.length; cIdx++) {
        const ch = l.challenges[cIdx];
        const chOrder = cIdx + 1;
        const tilesSql = ch.tiles ? escapeSql(JSON.stringify(ch.tiles)) + '::jsonb' : 'NULL';
        const pairsSql = ch.pairs ? escapeSql(JSON.stringify(ch.pairs)) + '::jsonb' : 'NULL';
        const isCorrectSql = (ch.is_correct !== false) ? 'TRUE' : 'FALSE';

        sql += `
    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (${ch.id}, ${l.id}, ${escapeSql(ch.type)}, ${escapeSql(ch.question)}, ${escapeSql(ch.coptic_display || null)}, ${escapeSql(ch.audio_text || null)}, ${escapeSql(ch.audio_url || null)}, ${escapeSql(ch.correct_word || null)}, ${tilesSql}, ${pairsSql}, ${isCorrectSql}, ${chOrder});
`;

        // Challenge Options
        if (ch.options && ch.options.length > 0) {
          for (const opt of ch.options) {
            const optId = optIdCounter++;
            sql += `    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct) VALUES (${optId}, ${ch.id}, ${escapeSql(opt.text)}, ${opt.is_correct ? 'TRUE' : 'FALSE'});\n`;
          }
        }
      }
    }

    // Unit Chest
    const lastLessonId = u.lessons[u.lessons.length - 1].id;
    const chestId = `chest_unit_${u.id}`;
    sql += `
    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES (${escapeSql(chestId)}, v_level_id, ${u.id}, ${escapeSql('صندوق إتقان ' + u.title)}, ${escapeSql('تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!')}, 'unit_end', ${lastLessonId}, 'fixed', 15, 15, 1, true, ${escapeSql('متقن ' + u.title)}, 'star', ${escapeSql('أتممت ' + u.title)}, ${u.order_index});
`;
  }

  // Final Level Chest
  const finalLessonId = units[9].lessons[units[9].lessons.length - 1].id;
  sql += `
    -- ---------------------------------------------------------
    -- Level 3 Final Graduation Chest
    -- ---------------------------------------------------------
    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc, order_index)
    VALUES ('chest_level_3_final', v_level_id, 80, '🏆 وسام التخرج الكبير: المتقن القبطي الشامل (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ)', 'تهانينا العظيمة! لقد أتممت المستوى الثالث والمراجعة الشاملة ونلت لقب المتقن القبطي الشامل عن جدارة واستحقاق!', 'level_end', ${finalLessonId}, 'fixed', 75, 75, 3, true, 'المتقن القبطي الشامل — Ⲡⲓⲣⲉϥⲥⲁⲃⲉ', 'trophy', 'أتممت المستوى الثالث والمراجعة الشاملة والتطبيق المتقدم بالكامل', 99);

END $$;

-- Validation queries
SELECT 'levels' AS tbl, count(*) FROM public.levels WHERE id = 7
UNION ALL
SELECT 'units' AS tbl, count(*) FROM public.units WHERE level_id = 7
UNION ALL
SELECT 'lessons' AS tbl, count(*) FROM public.lessons WHERE unit_id IN (SELECT id FROM public.units WHERE level_id = 7)
UNION ALL
SELECT 'challenges' AS tbl, count(*) FROM public.challenges WHERE lesson_id IN (SELECT id FROM public.lessons WHERE unit_id IN (SELECT id FROM public.units WHERE level_id = 7))
UNION ALL
SELECT 'chests' AS tbl, count(*) FROM public.chests WHERE level_id = 7;
`;

  return sql;
}

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

async function seedSupabase() {
  console.log('\n🚀 Seeding Level 3 to Supabase REST API...');

  // 1. Level 3
  console.log('1️⃣ Upserting Level 3 (id: 7)...');
  await postBatch('levels', [level3]);
  console.log('✅ Level 3 upserted.');

  // 2. Units
  console.log('2️⃣ Upserting 10 Units...');
  const unitsToInsert = units.map(u => ({
    id: u.id,
    level_id: u.level_id,
    title: u.title,
    badge: u.badge,
    description: u.description,
    order_index: u.order_index
  }));
  await postBatch('units', unitsToInsert);
  console.log('✅ 10 Units upserted.');

  // 3. Lessons, Challenges & Options
  console.log('3️⃣ Preparing Lessons, Challenges, Options & Chests...');
  const lessonsToInsert = [];
  const challengesToInsert = [];
  const optionsToInsert = [];
  const chestsToInsert = [];

  let optIdCounter = 7001;

  for (const u of units) {
    let lastLessonId = null;

    for (let lIdx = 0; lIdx < u.lessons.length; lIdx++) {
      const l = u.lessons[lIdx];
      lastLessonId = l.id;
      const lessonOrder = lIdx + 1;
      const lessonXp = l.challenges.length;

      lessonsToInsert.push({
        id: l.id,
        unit_id: u.id,
        title: l.title,
        order_index: lessonOrder,
        practice_xp: 1,
        challenge_xp: lessonXp,
        xp_reward: lessonXp
      });

      for (let cIdx = 0; cIdx < l.challenges.length; cIdx++) {
        const ch = l.challenges[cIdx];
        const chOrder = cIdx + 1;

        challengesToInsert.push({
          id: ch.id,
          lesson_id: l.id,
          type: ch.type,
          question: ch.question,
          coptic_display: ch.coptic_display || null,
          audio_text: ch.audio_text || null,
          audio_url: ch.audio_url || null,
          correct_word: ch.correct_word || null,
          tiles: ch.tiles || null,
          pairs: ch.pairs || null,
          is_correct: (ch.is_correct !== false),
          order_index: chOrder
        });

        if (ch.options && ch.options.length > 0) {
          for (const opt of ch.options) {
            optionsToInsert.push({
              id: optIdCounter++,
              challenge_id: ch.id,
              text: opt.text,
              is_correct: !!opt.is_correct
            });
          }
        }
      }
    }

    // Unit chest
    chestsToInsert.push({
      id: `chest_unit_${u.id}`,
      level_id: 7,
      unit_id: u.id,
      title: `صندوق إتقان ${u.title}`,
      description: 'تهانينا! لقد أتقنت دروس هذه الوحدة المتقدمة بنجاح باهر!',
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

  // Level 3 final chest
  const finalLessonId = units[9].lessons[units[9].lessons.length - 1].id;
  chestsToInsert.push({
    id: 'chest_level_3_final',
    level_id: 7,
    unit_id: 80,
    title: '🏆 وسام التخرج الكبير: المتقن القبطي الشامل (Ⲡⲓⲣⲉϥⲥⲁⲃⲉ)',
    description: 'تهانينا العظيمة! لقد أتممت المستوى الثالث والمراجعة الشاملة ونلت لقب المتقن القبطي الشامل عن جدارة واستحقاق!',
    placement_type: 'level_end',
    after_lesson_id: finalLessonId,
    xp_mode: 'fixed',
    xp_min: 75,
    xp_max: 75,
    hearts: 3,
    has_badge: true,
    badge_title: 'المتقن القبطي الشامل — Ⲡⲓⲣⲉϥⲥⲁⲃⲉ',
    badge_icon: 'trophy',
    badge_desc: 'أتممت المستوى الثالث والمراجعة الشاملة والتطبيق المتقدم بالكامل',
    order_index: 99
  });

  console.log(`  Posting ${lessonsToInsert.length} Lessons...`);
  await postBatch('lessons', lessonsToInsert);
  console.log(`✅ Lessons posted.`);

  console.log(`  Posting ${challengesToInsert.length} Challenges...`);
  await postBatch('challenges', challengesToInsert);
  console.log(`✅ Challenges posted.`);

  console.log(`  Posting ${optionsToInsert.length} Challenge Options...`);
  await postBatch('challenge_options', optionsToInsert);
  console.log(`✅ Challenge Options posted.`);

  console.log(`  Posting ${chestsToInsert.length} Chests...`);
  await postBatch('chests', chestsToInsert);
  console.log(`✅ Chests posted.`);

  console.log('\n🎉 Level 3 successfully seeded to Supabase REST API!');
}

async function main() {
  validateCurriculum();

  // Generate SQL file
  const sql = buildSQL();
  fs.writeFileSync('migration-13-level3-comprehensive-review.sql', sql, 'utf8');
  fs.writeFileSync('database/migrations/migration-13-level3-comprehensive-review.sql', sql, 'utf8');
  console.log('💾 Saved SQL migration to migration-13-level3-comprehensive-review.sql');

  // Save JSON
  const fullLevel3Data = {
    level: level3,
    units: units
  };
  fs.writeFileSync('database/level-3-curriculum-synced.json', JSON.stringify(fullLevel3Data, null, 2), 'utf8');
  console.log('💾 Saved JSON to database/level-3-curriculum-synced.json');

  // Seed Supabase directly
  await seedSupabase();

  // Verify Supabase counts directly
  console.log('\n🔍 Verifying Supabase live data counts:');
  const [lvls, uCount, lCount, chCount, chsCount] = await Promise.all([
    fetch(SUPABASE_URL + '/rest/v1/levels?select=*&order=order_index', { headers }).then(r => r.json()),
    fetch(SUPABASE_URL + '/rest/v1/units?select=id&level_id=eq.7', { headers }).then(r => r.json()),
    fetch(SUPABASE_URL + '/rest/v1/lessons?select=id&unit_id=gte.71&unit_id=lte.80', { headers }).then(r => r.json()),
    fetch(SUPABASE_URL + '/rest/v1/challenges?select=id&id=gte.4001&id=lte.4316', { headers }).then(r => r.json()),
    fetch(SUPABASE_URL + '/rest/v1/chests?select=id&level_id=eq.7', { headers }).then(r => r.json())
  ]);

  console.log(`  Total Levels in DB: ${lvls.length}`);
  console.log(`  Level 3 Units in DB: ${uCount.length} (Target: 10)`);
  console.log(`  Level 3 Lessons in DB: ${lCount.length} (Target: 42)`);
  console.log(`  Level 3 Challenges in DB: ${chCount.length} (Target: 316)`);
  console.log(`  Level 3 Chests in DB: ${chsCount.length} (Target: 11)`);

  if (uCount.length === 10 && lCount.length === 42 && chCount.length === 316) {
    console.log('\n🌟 ALL TARGETS ACHIEVED EXACTLY 100% IN SUPABASE! 🌟');
  } else {
    console.warn('\n⚠️ Some counts did not match expected values. Please check logs.');
  }
}

main().catch(err => {
  console.error('❌ Error executing Level 3 generator:', err);
  process.exit(1);
});
