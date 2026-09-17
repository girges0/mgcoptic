const fs = require('fs');

const fullCurriculum = JSON.parse(fs.readFileSync('database/full-curriculum-levels-1-and-2.json', 'utf-8'));
const fullCurriculumStr = JSON.stringify(fullCurriculum);

const files = [
  'js/services/gamification-service.js',
  'gamification-service.js',
  'www/js/services/gamification-service.js',
  'www/gamification-service.js'
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf-8');

  // 1. Replace DEFAULT_CURRICULUM
  content = content.replace(/const DEFAULT_CURRICULUM = \{[\s\S]*?\};\n/, `const DEFAULT_CURRICULUM = ${fullCurriculumStr};\n`);

  // 2. Add auto-invalidation for stale 1-level caches in getCurriculum
  const oldCacheCheck = `if(cachedCurriculum && Array.isArray(cachedCurriculum.units) && !forceRemote){\n      return cachedCurriculum;\n    }`;
  const newCacheCheck = `if(cachedCurriculum && Array.isArray(cachedCurriculum.units) && !forceRemote){\n      if (Array.isArray(cachedCurriculum.levels) && cachedCurriculum.levels.length >= 2 && cachedCurriculum.units.length >= 15) {\n        return cachedCurriculum;\n      }\n      localStorage.removeItem('mg_coptic_curriculum_v2');\n      localStorage.removeItem('mg_coptic_curriculum_v1');\n      localStorage.removeItem(MG_CONFIG.STORAGE_KEYS.CURRICULUM);\n      cachedCurriculum = null;\n    }`;
  
  if (content.includes(oldCacheCheck)) {
    content = content.replace(oldCacheCheck, newCacheCheck);
  }

  fs.writeFileSync(f, content, 'utf-8');
  console.log(`✅ Updated ${f} (size: ${(content.length / 1024).toFixed(1)} KB)`);
}

// Also update learn.js in root and www
const learnFiles = ['js/pages/learn.js', 'www/js/pages/learn.js'];
for (const f of learnFiles) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/v3_challenging_options/g, 'v4_level2_reading_rules');
  fs.writeFileSync(f, content, 'utf-8');
  console.log(`✅ Updated version tag in ${f}`);
}

console.log('🎉 All service and learn files updated with complete Level 1 + Level 2 curriculum!');
