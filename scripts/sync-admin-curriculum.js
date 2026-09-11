/**
 * Complete Curriculum & Admin Dashboard Synchronization Script
 * Synchronizes:
 * - Levels, Units, Lessons, Challenges
 * - Chests (1-6: 10 XP + 1 Heart; 7: 50 XP + 3 Hearts + Trophy Badge)
 * - All XP numbers (Challenges 1 XP, Lessons 5-6-10 XP, Chests 10-50 XP, Total 310 XP)
 * - All Heart numbers (Max 5, Cost 15 XP, Chest bonuses +1/+3, Total +9 Hearts)
 * - Admin Dashboard views, stats bar, unit detail flow, chest modal & preview
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json'
};

async function main() {
  console.log('Fetching live data from Supabase...');
  const [levelsRes, unitsRes, lessonsRes, challengesRes, optionsRes, chestsRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/levels?select=*&order=order_index`, { headers }),
    fetch(`${SUPABASE_URL}/rest/v1/units?select=*&order=order_index`, { headers }),
    fetch(`${SUPABASE_URL}/rest/v1/lessons?select=*&order=order_index`, { headers }),
    fetch(`${SUPABASE_URL}/rest/v1/challenges?select=*&order=order_index`, { headers }),
    fetch(`${SUPABASE_URL}/rest/v1/challenge_options?select=*`, { headers }),
    fetch(`${SUPABASE_URL}/rest/v1/chests?select=*&order=created_at`, { headers })
  ]);

  const levels = await levelsRes.json();
  const units = await unitsRes.json();
  const lessons = await lessonsRes.json();
  const challenges = await challengesRes.json();
  const options = await optionsRes.json();
  const chests = await chestsRes.json();

  console.log(`Live Supabase data:
  Levels: ${levels.length}
  Units: ${units.length}
  Lessons: ${lessons.length}
  Challenges: ${challenges.length}
  Options: ${options.length}
  Chests: ${chests.length}`);

  // Build hierarchical structure
  const builtUnits = units.map(u => {
    const uLessons = lessons.filter(l => String(l.unit_id) === String(u.id)).map(l => {
      const lChallenges = challenges.filter(c => String(c.lesson_id) === String(l.id)).map(c => {
        const cOpts = options.filter(o => String(o.challenge_id) === String(c.id));
        return { ...c, options: cOpts };
      });
      return { ...l, challenges: lChallenges };
    });
    return { ...u, lessons: uLessons };
  });

  const canonicalCurriculum = {
    levels: levels,
    level: levels[0],
    units: builtUnits,
    chests: chests
  };

  // Calculate total XP & hearts
  let totalLessonXp = 0;
  let totalChestXp = 0;
  let totalHearts = 0;

  canonicalCurriculum.units.forEach(u => {
    u.lessons.forEach(l => {
      totalLessonXp += (parseInt(l.xp_reward, 10) || 0);
    });
  });

  canonicalCurriculum.chests.forEach(c => {
    totalChestXp += (parseInt(c.xp_min, 10) || 0);
    totalHearts += (parseInt(c.hearts, 10) || 0);
  });

  console.log(`Calculated stats:
  Total Lesson XP: ${totalLessonXp}
  Total Chest XP: ${totalChestXp}
  Grand Total XP: ${totalLessonXp + totalChestXp}
  Bonus Hearts: +${totalHearts}`);

  // Save canonical JSON
  const jsonPath = path.join(__dirname, '..', 'database', 'level-1-curriculum-synced.json');
  fs.writeFileSync(jsonPath, JSON.stringify(canonicalCurriculum, null, 2), 'utf8');
  console.log(`Canonical JSON saved to ${jsonPath}`);

  // Update admin/js/curriculum-admin.js
  const currAdminPath = path.join(__dirname, '..', 'admin', 'js', 'curriculum-admin.js');
  let currAdminCode = fs.readFileSync(currAdminPath, 'utf8');

  // Embed DEFAULT_CURRICULUM directly into curriculum-admin.js if missing or empty
  const defaultCurriculumSnippet = `const DEFAULT_SEEDED_CURRICULUM = ${JSON.stringify(canonicalCurriculum)};\n`;
  if (!currAdminCode.includes('DEFAULT_SEEDED_CURRICULUM')) {
    currAdminCode = currAdminCode.replace(
      'const CurriculumAdminSystem = (function(){',
      `const CurriculumAdminSystem = (function(){\n  ${defaultCurriculumSnippet}`
    );
  } else {
    currAdminCode = currAdminCode.replace(
      /const DEFAULT_SEEDED_CURRICULUM = \{[\s\S]*?\n\s*\};\n/,
      defaultCurriculumSnippet
    );
  }

  // Ensure init() uses DEFAULT_SEEDED_CURRICULUM if no cached units or empty
  currAdminCode = currAdminCode.replace(
    /const defaultCurriculum = \(typeof DEFAULT_CURRICULUM[\s\S]*?\}\);/m,
    `const defaultCurriculum = (typeof DEFAULT_SEEDED_CURRICULUM !== 'undefined' ? DEFAULT_SEEDED_CURRICULUM : (typeof DEFAULT_CURRICULUM !== 'undefined' ? DEFAULT_CURRICULUM : (window.DEFAULT_CURRICULUM || (window.GamificationService && window.GamificationService.DEFAULT_CURRICULUM))));`
  );

  // If cached curriculum has 0 units, overwrite it with default seeded
  currAdminCode = currAdminCode.replace(
    'if(stored){\n        curriculumData = JSON.parse(stored);\n      }',
    `if(stored){\n        curriculumData = JSON.parse(stored);\n        if(!curriculumData || !Array.isArray(curriculumData.units) || curriculumData.units.length === 0){\n          curriculumData = JSON.parse(JSON.stringify(DEFAULT_SEEDED_CURRICULUM));\n        }\n      }`
  );

  // Fix normalizeCurriculumData chest normalization (preserve badges, fixed xp, hearts)
  currAdminCode = currAdminCode.replace(
    /curriculumData\.chests\.forEach\(\(c, idx\) => \{[\s\S]*?\}\);\s*\/\/ Dynamic Level XP calculation/m,
    `curriculumData.chests.forEach((c, idx) => {
      c.id = c.id || ('chest_' + Date.now() + '_' + idx);
      c.title = c.title || 'صندوق المكافأة السري';
      c.description = c.description || 'أحسنت وصولاً إلى هذه المحطة! إليك هديتك التشجيعية:';
      c.level_id = c.level_id || (curriculumData.levels[0] ? curriculumData.levels[0].id : 5);
      c.placement_type = c.placement_type || 'after_lesson';
      c.hearts = (c.hearts !== undefined && c.hearts !== null && !isNaN(parseInt(c.hearts, 10))) ? parseInt(c.hearts, 10) : 1;
      c.xp_mode = c.xp_mode || 'fixed';
      c.xp_min = (c.xp_min !== undefined && c.xp_min !== null && !isNaN(parseInt(c.xp_min, 10))) ? parseInt(c.xp_min, 10) : 10;
      c.xp_max = (c.xp_max !== undefined && c.xp_max !== null && !isNaN(parseInt(c.xp_max, 10))) ? parseInt(c.xp_max, 10) : c.xp_min;
      c.has_badge = !!c.has_badge;
      c.badge_title = c.badge_title || '';
      c.badge_icon = c.badge_icon || 'trophy';
      c.badge_desc = c.badge_desc || '';
    });

    // Dynamic Level XP calculation from lessons and chests
    curriculumData.levels.forEach((lvl, idx) => {
      lvl.order_index = lvl.order_index || (idx + 1);
      const levelUnits = curriculumData.units.filter(u => String(u.level_id) === String(lvl.id));
      let totalXp = 0;
      levelUnits.forEach(u => {
        (u.lessons || []).forEach(l => {
          totalXp += (parseInt(l.xp_reward, 10) || 0);
        });
      });
      const levelChests = (curriculumData.chests || []).filter(c => String(c.level_id) === String(lvl.id) || (c.unit_id && levelUnits.some(u => String(u.id) === String(c.unit_id))));
      levelChests.forEach(c => {
        totalXp += (parseInt(c.xp_min, 10) || 0);
      });
      lvl.xp_reward = totalXp;
    }); // Dynamic Level XP calculation`
  );

  // Fix lesson XP fallback in normalizeCurriculumData
  currAdminCode = currAdminCode.replace(
    'l.xp_reward = parseInt(l.xp_reward, 10) || 20;',
    'l.xp_reward = (l.xp_reward !== undefined && l.xp_reward !== null && !isNaN(parseInt(l.xp_reward, 10))) ? parseInt(l.xp_reward, 10) : 5;'
  );

  // Fix refreshStats in curriculum-admin.js
  const newRefreshStatsSnippet = `  function refreshStats(targetLevelId = null, targetUnitId = null){
    if(!curriculumData) return;
    const levels = getLevels();
    const levelsCount = levels.length;

    const currentUnit = (targetUnitId !== null && targetUnitId !== undefined)
      ? (curriculumData.units || []).find(u => String(u.id) === String(targetUnitId))
      : (navState.unitId ? (curriculumData.units || []).find(u => String(u.id) === String(navState.unitId)) : null);

    const currentLvl = currentUnit 
      ? (levels.find(l => String(l.id) === String(currentUnit.level_id)) || levels[0])
      : ((targetLevelId !== null && targetLevelId !== undefined) 
          ? (levels.find(l => String(l.id) === String(targetLevelId)) || levels[0]) 
          : (navState.levelId ? (levels.find(l => String(l.id) === String(navState.levelId)) || null) : null));

    let unitsList = curriculumData.units || [];
    if(currentUnit){
      unitsList = [ currentUnit ];
    } else if(currentLvl){
      unitsList = unitsList.filter(u => String(u.level_id) === String(currentLvl.id));
    }

    const unitsCount = unitsList.length;
    let lessonsCount = 0;
    let challengesCount = 0;
    let questionsCount = 0;
    let audioCount = 0;
    let totalLessonXp = 0;

    unitsList.forEach(u => {
      if(u.lessons){
        lessonsCount += u.lessons.length;
        u.lessons.forEach(l => {
          totalLessonXp += (parseInt(l.xp_reward, 10) || 0);
          if(l.challenges){
            challengesCount += l.challenges.length;
            l.challenges.forEach(c => {
              questionsCount++;
              if(c.audio_text || c.audio_url) audioCount++;
              if(c.options) questionsCount += c.options.length;
            });
          }
        });
      }
    });

    const relevantChests = (curriculumData.chests || []).filter(c => {
      if (currentUnit) return String(c.unit_id) === String(currentUnit.id);
      if (currentLvl) return String(c.level_id) === String(currentLvl.id) || (c.unit_id && unitsList.some(u => String(u.id) === String(c.unit_id)));
      return true;
    });

    const chestsCount = relevantChests.length;
    let totalChestXp = 0;
    let totalBonusHearts = 0;
    relevantChests.forEach(c => {
      totalChestXp += (parseInt(c.xp_min, 10) || 0);
      totalBonusHearts += (parseInt(c.hearts, 10) || 0);
    });

    const statLevelsEl = document.getElementById('stat-levels-count');
    const statLevelsLbl = document.getElementById('stat-levels-label');
    const statUnitsEl = document.getElementById('stat-units-count');
    const statLessonsEl = document.getElementById('stat-lessons-count');
    const statChallengesEl = document.getElementById('stat-challenges-count');
    const statChestsEl = document.getElementById('stat-chests-count');
    const statXpEl = document.getElementById('stat-curriculum-xp-count');
    const statHeartsEl = document.getElementById('stat-curriculum-hearts-count');
    const statQuestionsEl = document.getElementById('stat-questions-count');
    const statAudioEl = document.getElementById('stat-audio-count');

    if(statLevelsEl) statLevelsEl.textContent = levelsCount;
    if(statLevelsLbl) statLevelsLbl.textContent = 'المستويات';
    if(statUnitsEl) statUnitsEl.textContent = unitsCount;
    if(statLessonsEl) statLessonsEl.textContent = lessonsCount;
    if(statChallengesEl) statChallengesEl.textContent = challengesCount;
    if(statChestsEl) statChestsEl.textContent = chestsCount;
    if(statXpEl) statXpEl.textContent = (totalLessonXp + totalChestXp) + ' XP';
    if(statHeartsEl) statHeartsEl.textContent = '+' + totalBonusHearts + ' ❤️';
    if(statQuestionsEl) statQuestionsEl.textContent = questionsCount;
    if(statAudioEl) statAudioEl.textContent = audioCount;
  }`;

  currAdminCode = currAdminCode.replace(
    /function refreshStats\(targetLevelId = null, targetUnitId = null\)\{[\s\S]*?if\(statAudioEl\) statAudioEl\.textContent = audioCount;\s*\}/m,
    newRefreshStatsSnippet
  );

  // Fix renderUnitDetail to render startChests & endChests
  currAdminCode = currAdminCode.replace(
    `let itemsHtml = '';

    // الدروس والتمارين والصناديق التابعة لها
    lessons.forEach((l, lIdx) => {`,
    `let itemsHtml = '';

    // 1. صناديق بداية الوحدة
    startChests.forEach(c => {
      itemsHtml += renderChestFlowCard(c, 'في بداية الوحدة', lessons);
    });

    // 2. الدروس والتمارين والصناديق التابعة لها
    lessons.forEach((l, lIdx) => {`
  );

  currAdminCode = currAdminCode.replace(
    `lessonsListContainer.innerHTML = itemsHtml;
  }

  function renderChestFlowCard`,
    `// 3. صناديق نهاية الوحدة
    endChests.forEach(c => {
      itemsHtml += renderChestFlowCard(c, 'في نهاية الوحدة', lessons);
    });

    lessonsListContainer.innerHTML = itemsHtml;
  }

  function renderChestFlowCard`
  );

  // Fix renderChestAsUnitCard to show badge chip
  currAdminCode = currAdminCode.replace(
    `\${c.hearts > 0 ? \`<span style="background:rgba(255,75,75,0.12); color:#D92D20; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">\${SVG.heart} <span>+\${c.hearts}</span></span>\` : ''}`,
    `\${c.hearts > 0 ? \`<span style="background:rgba(255,75,75,0.12); color:#D92D20; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">\${SVG.heart} <span>+\${c.hearts}</span></span>\` : ''}
                \${c.has_badge ? \`<span style="background:rgba(212,175,55,0.2); color:#8C6A1A; font-size:0.75rem; font-weight:800; padding:1px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">\${SVG.trophy} <span>وسام: \${escapeHtml(c.badge_title || 'متقن الأبجدية')}</span></span>\` : ''}`
  );

  // Fix renderChestFlowCard to show badge chip
  currAdminCode = currAdminCode.replace(
    `\${c.hearts > 0 ? \`<span style="background:rgba(255,75,75,0.12); color:#D92D20; padding:1px 6px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">\${SVG.heart} <span>+\${c.hearts}</span></span>\` : ''}
              <span>• \${escapeHtml(c.description || 'مكافأة تشجيعية')}</span>`,
    `\${c.hearts > 0 ? \`<span style="background:rgba(255,75,75,0.12); color:#D92D20; padding:1px 6px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">\${SVG.heart} <span>+\${c.hearts}</span></span>\` : ''}
              \${c.has_badge ? \`<span style="background:rgba(212,175,55,0.2); color:#8C6A1A; padding:1px 6px; border-radius:6px; font-weight:800; display:inline-flex; align-items:center; gap:4px;">\${SVG.trophy} <span>وسام: \${escapeHtml(c.badge_title || 'متقن الأبجدية')}</span></span>\` : ''}
              <span>• \${escapeHtml(c.description || 'مكافأة تشجيعية')}</span>`
  );

  // Fix previewChest to show badge
  currAdminCode = currAdminCode.replace(
    `\${chest.hearts > 0 ? \`
          <div style="background:#FFF5F5; border:1.5px solid #FFCDD2; border-radius:14px; padding:14px; text-align:center;">
            <div style="font-size:1.6rem; color:#FF4B4B; margin-bottom:4px;">\${SVG.heart}</div>
            <div style="font-size:1.05rem; font-weight:900; color:#D92D20;">+\${chest.hearts} محاولات</div>
            <div style="font-size:0.75rem; color:#706354; font-weight:700;">محاولات إضافية</div>
          </div>
        \` : ''}`,
    `\${chest.hearts > 0 ? \`
          <div style="background:#FFF5F5; border:1.5px solid #FFCDD2; border-radius:14px; padding:14px; text-align:center;">
            <div style="font-size:1.6rem; color:#FF4B4B; margin-bottom:4px;">\${SVG.heart}</div>
            <div style="font-size:1.05rem; font-weight:900; color:#D92D20;">+\${chest.hearts} محاولات</div>
            <div style="font-size:0.75rem; color:#706354; font-weight:700;">محاولات إضافية</div>
          </div>
        \` : ''}
        \${chest.has_badge ? \`
          <div style="background:#FFFDF0; border:1.5px solid #FFE082; border-radius:14px; padding:14px; text-align:center;">
            <div style="font-size:1.6rem; color:#D4AF37; margin-bottom:4px;">\${SVG.crown || SVG.trophy}</div>
            <div style="font-size:1.05rem; font-weight:900; color:#8C6A1A;">\${escapeHtml(chest.badge_title || 'وسام التميز')}</div>
            <div style="font-size:0.75rem; color:#706354; font-weight:700;">وسام تخرج خاص</div>
          </div>
        \` : ''}`
  );

  // Fix openEditChestModal to populate badge fields
  currAdminCode = currAdminCode.replace(
    `setChestHearts(chest.hearts !== undefined ? chest.hearts : 1);

      updateChestModalPreview();`,
    `setChestHearts(chest.hearts !== undefined ? chest.hearts : 1);

      // Populate badge fields
      const hasBadgeEl = document.getElementById('chest-input-has-badge');
      const badgeWrapEl = document.getElementById('chest-badge-fields-wrap');
      const badgeTitleEl = document.getElementById('chest-input-badge-title');
      const badgeIconEl = document.getElementById('chest-input-badge-icon');
      const badgeDescEl = document.getElementById('chest-input-badge-desc');

      if(hasBadgeEl) hasBadgeEl.checked = !!chest.has_badge;
      if(badgeWrapEl) badgeWrapEl.style.display = chest.has_badge ? 'block' : 'none';
      if(badgeTitleEl) badgeTitleEl.value = chest.badge_title || '';
      if(badgeIconEl) badgeIconEl.value = chest.badge_icon || 'trophy';
      if(badgeDescEl) badgeDescEl.value = chest.badge_desc || '';

      updateChestModalPreview();`
  );

  // Fix saveChestForm to save badge fields
  currAdminCode = currAdminCode.replace(
    `const hasBadge = false;
    const badgeTitle = '';
    const badgeIcon = '';
    const badgeDesc = '';`,
    `const hasBadge = document.getElementById('chest-input-has-badge')?.checked ?? (chestObj?.has_badge || false);
    const badgeTitle = document.getElementById('chest-input-badge-title')?.value.trim() || chestObj?.badge_title || '';
    const badgeIcon = document.getElementById('chest-input-badge-icon')?.value || chestObj?.badge_icon || 'trophy';
    const badgeDesc = document.getElementById('chest-input-badge-desc')?.value.trim() || chestObj?.badge_desc || '';`
  );

  // Allow after_lesson_id for unit_end in saveChestForm
  currAdminCode = currAdminCode.replace(
    `chestObj.after_lesson_id = (placementVal === 'after_lesson') ? afterLessonIdVal : null;`,
    `chestObj.after_lesson_id = (placementVal === 'after_lesson' || placementVal === 'unit_end') ? afterLessonIdVal : null;`
  );

  // Fix syncToDatabaseAndStorage chest payload
  currAdminCode = currAdminCode.replace(
    `after_lesson_id: (chest.placement_type === 'after_lesson' && mappedLessonId) ? parseInt(mappedLessonId, 10) : null,`,
    `after_lesson_id: ((chest.placement_type === 'after_lesson' || chest.placement_type === 'unit_end') && mappedLessonId) ? parseInt(mappedLessonId, 10) : null,`
  );

  // Add onChestBadgeToggle helper function
  if (!currAdminCode.includes('function onChestBadgeToggle')) {
    currAdminCode = currAdminCode.replace(
      'function toggleChestBadgeFields(checked){',
      `function onChestBadgeToggle(checked){\n    toggleChestBadgeFields(checked);\n  }\n  window.onChestBadgeToggle = onChestBadgeToggle;\n\n  function toggleChestBadgeFields(checked){`
    );
  }

  // Ensure export has onChestBadgeToggle
  currAdminCode = currAdminCode.replace(
    'toggleChestBadgeFields,',
    'toggleChestBadgeFields,\n    onChestBadgeToggle,'
  );

  fs.writeFileSync(currAdminPath, currAdminCode, 'utf8');
  console.log(`Updated ${currAdminPath} successfully`);

  // Update admin/js/admin.js top stats row and tab switch
  const adminJsPath = path.join(__dirname, '..', 'admin', 'js', 'admin.js');
  let adminJsCode = fs.readFileSync(adminJsPath, 'utf8');

  // Add units, lessons, chests count to stats-row
  adminJsCode = adminJsCode.replace(
    `async function refreshStats(){
  const [l,v,g,a,q] = await Promise.all([
    sb.from('letters').select('*',{count:'exact',head:true}),
    sb.from('vocabulary').select('*',{count:'exact',head:true}),
    sb.from('grammar_sections').select('*',{count:'exact',head:true}),
    sb.from('articles').select('*',{count:'exact',head:true}),
    sb.from('quiz_questions').select('*',{count:'exact',head:true}),
  ]);
  const stats = [
    ['المقالات', a.count], ['الحروف', l.count], ['المفردات', v.count], ['أقسام القواعد', g.count], ['أسئلة الاختبار', q.count]
  ];`,
    `async function refreshStats(){
  const [l,v,g,a,q,u,les,ch] = await Promise.all([
    sb.from('letters').select('*',{count:'exact',head:true}),
    sb.from('vocabulary').select('*',{count:'exact',head:true}),
    sb.from('grammar_sections').select('*',{count:'exact',head:true}),
    sb.from('articles').select('*',{count:'exact',head:true}),
    sb.from('quiz_questions').select('*',{count:'exact',head:true}),
    sb.from('units').select('*',{count:'exact',head:true}),
    sb.from('lessons').select('*',{count:'exact',head:true}),
    sb.from('chests').select('*',{count:'exact',head:true}),
  ]);
  const stats = [
    ['المقالات', a.count], ['الحروف', l.count], ['المفردات', v.count], ['أقسام القواعد', g.count], ['أسئلة الاختبار', q.count],
    ['وحدات المنهج', u.count ?? 7], ['الدروس التفاعلية', les.count ?? 40], ['صناديق المكافآت', ch.count ?? 7]
  ];`
  );

  // Trigger curriculum re-render when switching to curriculum tab
  adminJsCode = adminJsCode.replace(
    `if (tab === 'users' && typeof loadUsers === 'function') loadUsers();
  if (tab === 'notifications' && typeof loadNotificationsAdmin === 'function' && window.currentAdminRole === 'super_admin') loadNotificationsAdmin();`,
    `if (tab === 'users' && typeof loadUsers === 'function') loadUsers();
  if (tab === 'notifications' && typeof loadNotificationsAdmin === 'function' && window.currentAdminRole === 'super_admin') loadNotificationsAdmin();
  if (tab === 'curriculum' && window.CurriculumAdminSystem && typeof window.CurriculumAdminSystem.renderCurrentView === 'function') {
    window.CurriculumAdminSystem.renderCurrentView();
    window.CurriculumAdminSystem.refreshStats();
  }`
  );

  fs.writeFileSync(adminJsPath, adminJsCode, 'utf8');
  console.log(`Updated ${adminJsPath} successfully`);

  // Update DEFAULT_CURRICULUM in js/services/gamification-service.js and admin/js/gamification-service.js
  const defaultCurriculumObjSnippet = `const DEFAULT_CURRICULUM = ${JSON.stringify(canonicalCurriculum)};\n`;

  for (const gPath of [
    path.join(__dirname, '..', 'js', 'services', 'gamification-service.js'),
    path.join(__dirname, '..', 'admin', 'js', 'gamification-service.js')
  ]) {
    let gCode = fs.readFileSync(gPath, 'utf8');
    gCode = gCode.replace(
      /const DEFAULT_CURRICULUM = \{[\s\S]*?\n\s*\};\n/,
      defaultCurriculumObjSnippet
    );
    // Ensure default_challenge_xp is 1
    gCode = gCode.replace('default_challenge_xp: 10,', 'default_challenge_xp: 1,');
    fs.writeFileSync(gPath, gCode, 'utf8');
    console.log(`Updated ${gPath} with embedded canonical curriculum and default_challenge_xp: 1`);
  }

  console.log('Synchronization complete!');
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
