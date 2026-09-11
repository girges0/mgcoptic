/**
 * Generates database/migrations/migration-14-level-1-curriculum-complete.sql
 * from the seeded curriculum data.
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const headers = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY };

async function generateSQL() {
  console.log('Fetching curriculum from Supabase to generate canonical SQL migration...');
  const [units, lessons, challenges, challengeOptions, chests] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/units?select=*&order=order_index`, { headers }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/lessons?select=*&order=order_index`, { headers }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/challenges?select=*&order=order_index`, { headers }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/challenge_options?select=*`, { headers }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/chests?select=*`, { headers }).then(r => r.json())
  ]);

  function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    return "'" + String(str).replace(/'/g, "''") + "'";
  }

  let sql = `-- ============================================================================
-- Migration 14: Level 1 Coptic Curriculum Complete (32 Letters across 7 Units)
-- Structure per lesson:
-- 1. Intro (text_view, 0 XP)
-- 2. Trace letter with pronunciation audio (trace, 1 XP)
-- 3. Pronunciation choice (read_select, 1 XP)
-- 4. Word meaning (select, 1 XP)
-- 5. Word tiles spelling (write, 1 XP)
-- + Review lessons at end of each unit
-- + Unit chests (10 XP + 1 heart) & Level Final Chest (50 XP + 3 hearts)
-- ============================================================================

-- Ensure columns exist
ALTER TABLE IF EXISTS public.challenges ADD COLUMN IF NOT EXISTS explanation TEXT;
ALTER TABLE IF EXISTS public.challenges ADD COLUMN IF NOT EXISTS xp_reward INT DEFAULT 1;

-- Clean existing curriculum for level 1
DELETE FROM public.challenge_options;
DELETE FROM public.challenges;
DELETE FROM public.lessons;
DELETE FROM public.chests WHERE level_id IN (1, 5);
DELETE FROM public.units WHERE level_id IN (1, 5);

DO $$
DECLARE
    v_level_id INT := 5;
    v_unit_id INT;
    v_lesson_id INT;
    v_challenge_id INT;
BEGIN
`;

  // Write units
  for (const u of units) {
    sql += `
    -- ---------------------------------------------------------
    -- Unit: ${u.title}
    -- ---------------------------------------------------------
    INSERT INTO public.units (id, level_id, title, badge, description, order_index)
    VALUES (${u.id}, ${u.level_id}, ${escapeSql(u.title)}, ${escapeSql(u.badge)}, ${escapeSql(u.description)}, ${u.order_index})
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, badge = EXCLUDED.badge, description = EXCLUDED.description, order_index = EXCLUDED.order_index;
`;
  }

  // Write lessons
  for (const l of lessons) {
    sql += `
    INSERT INTO public.lessons (id, unit_id, title, xp_reward, practice_xp, challenge_xp, order_index)
    VALUES (${l.id}, ${l.unit_id}, ${escapeSql(l.title)}, ${l.xp_reward || 4}, ${l.practice_xp || 1}, ${l.challenge_xp || 4}, ${l.order_index})
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, xp_reward = EXCLUDED.xp_reward, order_index = EXCLUDED.order_index;
`;
  }

  // Write challenges
  for (const ch of challenges) {
    const tilesSql = ch.tiles ? escapeSql(JSON.stringify(ch.tiles)) + '::jsonb' : 'NULL';
    const pairsSql = ch.pairs ? escapeSql(JSON.stringify(ch.pairs)) + '::jsonb' : 'NULL';
    sql += `
    INSERT INTO public.challenges (id, lesson_id, type, question, coptic_display, audio_text, audio_url, correct_word, tiles, pairs, is_correct, order_index)
    VALUES (${ch.id}, ${ch.lesson_id}, ${escapeSql(ch.type)}, ${escapeSql(ch.question)}, ${escapeSql(ch.coptic_display)}, ${escapeSql(ch.audio_text)}, ${escapeSql(ch.audio_url)}, ${escapeSql(ch.correct_word)}, ${tilesSql}, ${pairsSql}, ${ch.is_correct ? 'TRUE' : 'FALSE'}, ${ch.order_index})
    ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, coptic_display = EXCLUDED.coptic_display, audio_text = EXCLUDED.audio_text, audio_url = EXCLUDED.audio_url, correct_word = EXCLUDED.correct_word, tiles = EXCLUDED.tiles, pairs = EXCLUDED.pairs, order_index = EXCLUDED.order_index;
`;
  }

  // Write challenge options
  for (const opt of challengeOptions) {
    sql += `
    INSERT INTO public.challenge_options (id, challenge_id, text, is_correct)
    VALUES (${opt.id}, ${opt.challenge_id}, ${escapeSql(opt.text)}, ${opt.is_correct ? 'TRUE' : 'FALSE'})
    ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, is_correct = EXCLUDED.is_correct;
`;
  }

  // Write chests
  for (const c of chests) {
    sql += `
    INSERT INTO public.chests (id, level_id, unit_id, title, description, placement_type, after_lesson_id, xp_mode, xp_min, xp_max, hearts, has_badge, badge_title, badge_icon, badge_desc)
    VALUES (${escapeSql(c.id)}, ${c.level_id}, ${c.unit_id ? c.unit_id : 'NULL'}, ${escapeSql(c.title)}, ${escapeSql(c.description)}, ${escapeSql(c.placement_type)}, ${c.after_lesson_id ? c.after_lesson_id : 'NULL'}, ${escapeSql(c.xp_mode)}, ${c.xp_min}, ${c.xp_max}, ${c.hearts}, ${c.has_badge ? 'TRUE' : 'FALSE'}, ${escapeSql(c.badge_title)}, ${escapeSql(c.badge_icon)}, ${escapeSql(c.badge_desc)})
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, xp_min = EXCLUDED.xp_min, xp_max = EXCLUDED.xp_max, hearts = EXCLUDED.hearts;
`;
  }

  sql += `
END $$;

-- Reset sequences
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'units_id_seq') THEN
        PERFORM setval('units_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.units));
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'lessons_id_seq') THEN
        PERFORM setval('lessons_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.lessons));
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'challenges_id_seq') THEN
        PERFORM setval('challenges_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.challenges));
    END IF;
    IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'challenge_options_id_seq') THEN
        PERFORM setval('challenge_options_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.challenge_options));
    END IF;
END $$;
`;

  const targetPath = path.join(__dirname, '..', 'database', 'migrations', 'migration-14-level-1-curriculum-complete.sql');
  fs.writeFileSync(targetPath, sql, 'utf8');
  console.log(`✅ Saved Migration SQL: ${targetPath}`);
}

generateSQL().catch(err => {
  console.error('Generation failed:', err);
});
