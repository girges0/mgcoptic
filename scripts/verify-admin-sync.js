const fs = require('fs');

const html = fs.readFileSync('admin/index.html', 'utf8');

const requiredIds = [
  'stat-levels-count',
  'stat-units-count',
  'stat-lessons-count',
  'stat-challenges-count',
  'stat-chests-count',
  'stat-curriculum-xp-count',
  'stat-curriculum-hearts-count',
  'levels-overview-grid',
  'level-detail-hero',
  'reward-box-content',
  'level-detail-units-list',
  'unit-detail-hero',
  'unit-detail-lessons-list',
  'chest-input-has-badge',
  'chest-input-badge-title',
  'chest-input-badge-icon',
  'chest-input-badge-desc',
  'chest-badge-fields-wrap',
  'modal-chest-preview',
  'modal-chest-editor'
];

let missing = 0;
requiredIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    console.error('Missing ID in admin/index.html:', id);
    missing++;
  }
});

if (missing === 0) {
  console.log(`All ${requiredIds.length} required admin UI IDs are verified and present in admin/index.html!`);
} else {
  console.error(`${missing} IDs missing`);
  process.exit(1);
}

// Check JSON sync file
const json = JSON.parse(fs.readFileSync('database/level-1-curriculum-synced.json', 'utf8'));
console.log(`Canonical Curriculum Verified:
  Level: ${json.level.title} (ID: ${json.level.id})
  Units: ${json.units.length} units
  Lessons: ${json.units.reduce((s, u) => s + u.lessons.length, 0)} lessons
  Challenges: ${json.units.reduce((s, u) => s + u.lessons.reduce((ls, l) => ls + l.challenges.length, 0), 0)} challenges
  Chests: ${json.chests.length} chests`);

// Verify chest rewards
json.chests.forEach((c, idx) => {
  console.log(`  Chest ${idx + 1} (${c.id}): ${c.title} | XP: ${c.xp_min} | Hearts: +${c.hearts} | Badge: ${c.has_badge ? c.badge_title : 'None'}`);
});
