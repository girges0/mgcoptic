/**
 * MG COPTIC — Enforce 1 XP per Question / Challenge everywhere
 */
const fs = require('fs');

console.log('🔧 Enforcing 1 XP per question across the entire project...');

// 1. Update database/full-curriculum-levels-1-and-2.json
const fullPath = 'database/full-curriculum-levels-1-and-2.json';
if (fs.existsSync(fullPath)) {
  const full = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  full.units.forEach(u => {
    u.lessons.forEach(l => {
      const qCount = l.challenges.length;
      l.xp_reward = qCount;
      l.challenge_xp = qCount;
      l.practice_xp = qCount;
      l.challenges.forEach(c => {
        c.xp = 1;
        c.xp_reward = 1;
      });
    });
  });
  fs.writeFileSync(fullPath, JSON.stringify(full, null, 2), 'utf-8');
  console.log('✅ Updated database/full-curriculum-levels-1-and-2.json');
}

// 2. Update database/level-2-curriculum-synced.json
const lvl2Path = 'database/level-2-curriculum-synced.json';
if (fs.existsSync(lvl2Path)) {
  const lvl2 = JSON.parse(fs.readFileSync(lvl2Path, 'utf-8'));
  lvl2.units.forEach(u => {
    u.lessons.forEach(l => {
      const qCount = l.challenges.length;
      l.xp = qCount;
      l.xp_reward = qCount;
      l.challenges.forEach(c => {
        c.xp = 1;
        c.xp_reward = 1;
      });
    });
  });
  fs.writeFileSync(lvl2Path, JSON.stringify(lvl2, null, 2), 'utf-8');
  console.log('✅ Updated database/level-2-curriculum-synced.json');
}

// 3. Update gamification services
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

  // Replace DEFAULT_CURRICULUM
  content = content.replace(/const DEFAULT_CURRICULUM = \{[\s\S]*?\};\n/, `const DEFAULT_CURRICULUM = ${fullCurriculumStr};\n`);

  // Ensure getCurriculum assigns 1 XP per question and lesson XP = questions count
  content = content.replace(
    /const xp = parseInt\(c\.xp_reward \|\| c\.xp \|\| 10, 10\) \|\| 10;/g,
    'const xp = 1; // كل سؤال بـ 1 XP'
  );
  content = content.replace(
    /const finalLessonXp = parseInt\(l\.xp_reward, 10\) \|\| 20;/g,
    'const finalLessonXp = lChallenges.length; // 1 XP لكل سؤال'
  );
  content = content.replace(
    /const finalPracticeXp = parseInt\(l\.practice_xp, 10\) \|\| 20;/g,
    'const finalPracticeXp = lChallenges.length;'
  );
  content = content.replace(
    /const finalChallengeXp = parseInt\(l\.challenge_xp, 10\) \|\| 30;/g,
    'const finalChallengeXp = lChallenges.length;'
  );

  fs.writeFileSync(f, content, 'utf-8');
  console.log(`✅ Updated ${f}`);
}

// 4. Update learn.js in root and www
const learnFiles = ['js/pages/learn.js', 'www/js/pages/learn.js'];
for (const f of learnFiles) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf-8');

  // Bump version tag to force cache refresh
  content = content.replace(/v4_level2_reading_rules/g, 'v5_1xp_per_question');

  // Ensure modal always calculates lesson XP based on questions count (1 XP each)
  content = content.replace(
    /lessonCopy\.xp_reward = parseInt\(foundLesson\.practice_xp, 10\) \|\| 20;/g,
    'lessonCopy.xp_reward = lessonCopy.challenges.length;'
  );
  content = content.replace(
    /lessonCopy\.xp_reward = parseInt\(foundLesson\.challenge_xp, 10\) \|\| 30;/g,
    'lessonCopy.xp_reward = lessonCopy.challenges.length;'
  );
  content = content.replace(
    /lessonCopy\.xp_reward = parseInt\(foundLesson\.xp_reward, 10\) \|\| 20;/g,
    'lessonCopy.xp_reward = lessonCopy.challenges.length;'
  );

  // In finishLessonSuccess
  content = content.replace(
    /const fullConfiguredXp = selectedLesson \? \(parseInt\(selectedLesson\.xp_reward, 10\) \|\| 20\) : 20;/g,
    'const fullConfiguredXp = selectedLesson ? (Array.isArray(selectedLesson.challenges) ? selectedLesson.challenges.length : (parseInt(selectedLesson.xp_reward, 10) || 1)) : 1;'
  );

  fs.writeFileSync(f, content, 'utf-8');
  console.log(`✅ Updated ${f}`);
}

// 5. Update curriculum documentation
const docPath = 'منهج_المستوى_الثاني_قواعد_القراءة_MG_COPTIC.md';
if (fs.existsSync(docPath)) {
  let doc = fs.readFileSync(docPath, 'utf-8');
  doc = doc.replace(/يمنح كل درس من 7 إلى 10 نقاط XP/g, 'يمنح كل سؤال أو تمرين 1 نقطة XP (الدرس الكامل = 5 أو 6 نقاط XP بحسب عدد أسئلته)');
  doc = doc.replace(/يمنح كل درس 12 نقطة XP/g, 'يمنح كل تمرين 1 نقطة XP (الدرس الكامل = 6 نقاط XP)');
  fs.writeFileSync(docPath, doc, 'utf-8');
  console.log('✅ Updated منهج_المستوى_الثاني_قواعد_القراءة_MG_COPTIC.md');
}

console.log('🎉 Successfully applied 1 XP per question across the entire system!');
