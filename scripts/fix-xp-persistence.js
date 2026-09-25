const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Comprehensive XP Persistence Fix...');

// 1. Files to update for gamification-service.js
const gamificationFiles = [
  'gamification-service.js',
  'js/services/gamification-service.js',
  'www/gamification-service.js',
  'www/js/services/gamification-service.js',
  'admin/js/gamification-service.js'
];

for (const relPath of gamificationFiles) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix 1.1: getSbClient assignment
  content = content.replace(
    /function getSbClient\(\)\s*\{[\s\S]*?if\s*\(window\.sb\)\s*return window\.sb;[\s\S]*?if\s*\(window\.sbClient\)\s*return window\.sbClient;[\s\S]*?if\s*\(sbClient\)\s*return sbClient;/m,
    `function getSbClient() {
  if (typeof window !== 'undefined' && window.sb) {
    sbClient = window.sb;
    return sbClient;
  }
  if (typeof window !== 'undefined' && window.sbClient) {
    sbClient = window.sbClient;
    return sbClient;
  }
  if (sbClient) return sbClient;`
  );

  // Fix 1.2: saveProgressLocal invalidates in-memory cache
  content = content.replace(
    /saveProgressLocal\(prog,\s*userId\s*=\s*null,\s*broadcast\s*=\s*true\)\s*\{[\s\S]*?localStorage\.setItem\(MG_CONFIG\.STORAGE_KEYS\.PROGRESS,\s*JSON\.stringify\(normalized\)\);/,
    `saveProgressLocal(prog, userId = null, broadcast = true){
    try {
      const uid = userId || prog?.user_id || this.getCurrentUser()?.id;
      const normalized = {
        ...prog,
        points: prog?.points ?? prog?.total_points ?? 0,
        total_points: prog?.points ?? prog?.total_points ?? 0,
        hearts: prog?.hearts ?? 5,
        streak_days: prog?.streak_days ?? 1
      };
      if(uid){
        localStorage.setItem(\`mg_coptic_progress_\${uid}\`, JSON.stringify(normalized));
      }
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.PROGRESS, JSON.stringify(normalized));
      if(typeof window !== 'undefined' && typeof window.invalidateMGCache === 'function'){
        window.invalidateMGCache();
      }`
  );

  // Fix 1.3: getProgress with forceRemote = true using Math.max and syncing
  content = content.replace(
    /let serverPoints = Number\(data\.points \?\? 0\);[\s\S]*?\/\/ فحص ومطابقة النقاط مع الرصيد المحلي إذا كان رصيد السيرفر صفر ولديه رصيد محلي مكتسب[\s\S]*?progress = \{[\s\S]*?user_id: uid,[\s\S]*?hearts: data\.hearts \?\? 5,[\s\S]*?points: serverPoints,[\s\S]*?total_points: serverPoints,/m,
    `const activeSb = getSbClient();
          const serverPoints = Number(data.points ?? 0);
          const localProg = this.getProgressLocal(uid);
          const localPoints = Number(localProg?.points ?? localProg?.total_points ?? 0);

          // القاعدة الذهبية: النقاط لا تقل إطلاقاً بل تأخذ القيمة الأعلى دائماً (Non-Decreasing XP)
          let resolvedPoints = Math.max(localPoints, serverPoints);

          if (serverPoints === 0 && resolvedPoints === 0) {
            const recovered = await this.checkAndRecoverLostXp(uid);
            if (recovered && recovered.points != null) {
              resolvedPoints = Math.max(resolvedPoints, Number(recovered.points));
            }
          }

          // إذا كانت النقاط المحلية أعلى من السيرفر، يتم مزامنتها فوراً مع قاعدة البيانات والداش بورد
          if (resolvedPoints > serverPoints && uid && activeSb) {
            try {
              activeSb.rpc('sync_full_user_gamification', {
                p_user_id: uid,
                p_points: resolvedPoints,
                p_hearts: Number(data.hearts ?? 5),
                p_streak_days: Number(data.streak_days ?? 1),
                p_completed_lessons: []
              }).catch(() => {});
              activeSb.from('user_progress').update({
                points: resolvedPoints,
                total_points: resolvedPoints,
                last_active_date: new Date().toISOString().split('T')[0]
              }).eq('user_id', uid).then(() => {}, () => {});
            } catch (_) {}
          }

          progress = {
            user_id: uid,
            hearts: data.hearts ?? 5,
            points: resolvedPoints,
            total_points: resolvedPoints,`
  );

  // Fix 1.4: In non-forceRemote background sync of getProgress, ensure activeSb is used
  content = content.replace(
    /if\(sbClient && uid && !this\._bgSyncActive\)\{\s*this\._bgSyncActive = true;\s*sbClient\.from\('user_progress'\)/g,
    `const activeSb = getSbClient();
      if(activeSb && uid && !this._bgSyncActive){
        this._bgSyncActive = true;
        activeSb.from('user_progress')`
  );

  // Fix 1.5: In updateProgress, ensure getSbClient() is used, sync_full_user_gamification is called
  const updateProgressOld = /async updateProgress\(userId,\s*updates\s*=\s*\{\}\)\s*\{[\s\S]*?return prog;\s*\}/m;
  const updateProgressNew = `async updateProgress(userId, updates = {}){
    const uid = userId || this.getCurrentUser()?.id;
    let prog = this.getProgressLocal(uid);
    if (!prog) {
      prog = await this.getProgress(uid);
    }
    if (!prog) prog = { points: 0, total_points: 0, hearts: 5, streak_days: 1 };
    let pointsChanged = false;
    if(typeof updates.hearts === 'number') prog.hearts = Math.max(0, Math.min(5, updates.hearts));
    if(typeof updates.addPoints === 'number') {
      const safePoints = parseInt(updates.addPoints, 10) || 0;
      if (safePoints !== 0) {
        prog.points = Math.max(0, (prog.points || 0) + safePoints);
        prog.total_points = prog.points;
        pointsChanged = true;
      }
    }
    if(typeof updates.points === 'number') {
      const targetPoints = Math.max(0, parseInt(updates.points, 10) || 0);
      if (prog.points !== targetPoints) {
        prog.points = targetPoints;
        prog.total_points = targetPoints;
        pointsChanged = true;
      }
    }
    if(typeof updates.addHearts === 'number') {
      const safeHearts = Math.max(0, parseInt(updates.addHearts, 10) || 0);
      prog.hearts = Math.max(0, Math.min(5, (prog.hearts ?? 5) + safeHearts));
    }
    if(typeof updates.streak_days === 'number') prog.streak_days = Math.max(1, updates.streak_days);
    if(Array.isArray(updates.claimed_chests)) prog.claimed_chests = updates.claimed_chests;

    // حفظ فوري محلياً وتحديث الواجهة والذاكرة بلحظية تامة
    this.saveProgressLocal(prog, uid);
    if(typeof window !== 'undefined'){
      if(typeof window.invalidateMGCache === 'function') window.invalidateMGCache();
      if(typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(prog);
    }

    const activeSb = getSbClient();
    if(activeSb && uid){
      // 1. مزامنة ذرية موثقة فورية في قاعدة البيانات لضمان عدم ضياع أي نقطة
      if(pointsChanged) {
        activeSb.rpc('sync_full_user_gamification', {
          p_user_id: uid,
          p_points: prog.points,
          p_hearts: prog.hearts ?? 5,
          p_streak_days: prog.streak_days || 1,
          p_completed_lessons: []
        }).catch(() => {});
      }

      // 2. تحديث مباشر للحقول في جدول user_progress لظهورها بالداشبورد
      const dbUpdates = {
        points: prog.points || 0,
        total_points: prog.points || 0,
        hearts: prog.hearts ?? 5,
        streak_days: prog.streak_days || 1,
        last_active_date: prog.last_active_date || new Date().toISOString().split('T')[0]
      };
      if(Array.isArray(updates.claimed_chests)) dbUpdates.claimed_chests = prog.claimed_chests || [];

      activeSb.from('user_progress').update(dbUpdates).eq('user_id', uid).then(({ error }) => {
        if(error) {
          activeSb.from('user_progress').upsert({ user_id: uid, ...dbUpdates }, { onConflict: 'user_id' }).catch(()=>{});
        }
      }).catch(()=>{});

      if (pointsChanged && typeof BroadcastChannel !== 'undefined') {
        try {
          const bc = new BroadcastChannel('mg_coptic_gamification_sync');
          bc.postMessage({ type: 'xp_updated', userId: uid, points: prog.points });
          setTimeout(() => { try { bc.close(); } catch (_) {} }, 1000);
        } catch (_) {}
      }
    }
    return prog;
  }`;

  content = content.replace(updateProgressOld, updateProgressNew);

  // Fix 1.6: completeLesson - ensures points are never decreased, always synced to Supabase
  const completeLessonOld = /async completeLesson\(userId,\s*lessonId,\s*score\s*=\s*100,\s*nextLessonId\s*=\s*null,\s*xpReward\s*=\s*20\)\s*\{[\s\S]*?return map;\s*\}/m;
  const completeLessonNew = `async completeLesson(userId, lessonId, score = 100, nextLessonId = null, xpReward = 20){
    const uid = userId || this.getCurrentUser()?.id;
    const userLpKey = uid ? \`mg_coptic_lesson_progress_\${uid}\` : MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS;
    let map = {};
    try {
      const raw = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS);
      if(raw) map = JSON.parse(raw);
    } catch(e){}

    const baseLessonKey = String(lessonId).replace(/_[pc]$/, '');
    const wasAlreadyCompleted = Boolean(
      (map[String(lessonId)] && map[String(lessonId)].status === 'completed') ||
      (map[baseLessonKey] && map[baseLessonKey].status === 'completed')
    );
    map[String(lessonId)] = { status: 'completed', score: score };

    // إذا كانت محطة تحدي _c اكتملت، نتأكد أن الدرس الأساسي والمحطة _p مسجلان كمكتملين
    if(/_c$/.test(String(lessonId))){
      const baseId = String(lessonId).replace(/_c$/, '');
      if(!map[baseId] || map[baseId].status !== 'completed'){
        map[baseId] = { status: 'completed', score: score };
      }
      if(!map[\`\${baseId}_p\`] || map[\`\${baseId}_p\`].status !== 'completed'){
        map[\`\${baseId}_p\`] = { status: 'completed', score: score };
      }
    } else if(/_p$/.test(String(lessonId))){
      const baseId = String(lessonId).replace(/_p$/, '');
      if(!map[baseId] || map[baseId].status !== 'completed'){
        map[baseId] = { status: 'completed', score: score };
      }
    }

    if(nextLessonId){
      if(!map[String(nextLessonId)] || map[String(nextLessonId)].status === 'locked'){
        map[String(nextLessonId)] = { status: 'in_progress', score: 0 };
      }
    }

    try {
      if(uid) localStorage.setItem(userLpKey, JSON.stringify(map));
      localStorage.setItem(MG_CONFIG.STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(map));
    } catch(e){}

    const isVirtualStation = /_(p|c)$/.test(String(lessonId));
    const numLessonId = isVirtualStation
      ? parseInt(String(lessonId).replace(/_(p|c)$/, ''), 10)
      : parseInt(lessonId, 10);

    const safeXpReward = (xpReward !== undefined && xpReward !== null && !isNaN(parseInt(xpReward, 10)))
      ? Math.max(0, parseInt(xpReward, 10))
      : 0;

    const curProg = this.getProgressLocal(uid) || {};
    let currentLocalPoints = Number(curProg.points || curProg.total_points || 0);

    const activeSb = getSbClient();
    const compIds = [];
    for (const [k, v] of Object.entries(map || {})) {
      if (!k.includes('_') && v && (v.status === 'completed' || v.isCompleted)) {
        const n = parseInt(k, 10);
        if (!isNaN(n) && n > 0 && !compIds.includes(n)) compIds.push(n);
      }
    }
    if (!isNaN(numLessonId) && !compIds.includes(numLessonId)) compIds.push(numLessonId);

    if(activeSb && uid && !isNaN(numLessonId)){
      try {
        const nextNum = (nextLessonId && !/_(p|c)$/.test(String(nextLessonId))) ? parseInt(nextLessonId, 10) : null;
        const earnedVal = wasAlreadyCompleted ? 0 : safeXpReward;

        const { data: recData } = await activeSb.rpc('record_lesson_completion', {
          p_lesson_id: numLessonId,
          p_score: parseInt(score, 10) || 100,
          p_xp_reward: earnedVal,
          p_next_lesson_id: (!isNaN(nextNum) && nextNum > 0) ? nextNum : null,
          p_user_id: uid
        });

        const serverPointsReturned = Number(recData?.points ?? recData?.total_points ?? 0);
        // لا نسمح إطلاقاً بأن تنقص النقاط عن رصيد الطالب الفعلي
        currentLocalPoints = Math.max(currentLocalPoints, serverPointsReturned);
        if(recData?.hearts != null) curProg.hearts = Number(recData.hearts);
        if(recData?.streak_days != null) curProg.streak_days = Number(recData.streak_days);
      } catch (recErr) {
        console.warn('record_lesson_completion error:', recErr);
      }

      // تأكيد مزامنة النقاط والدروس عبر sync_full_user_gamification
      try {
        await activeSb.rpc('sync_full_user_gamification', {
          p_user_id: uid,
          p_points: currentLocalPoints,
          p_hearts: curProg.hearts || 5,
          p_streak_days: curProg.streak_days || 1,
          p_completed_lessons: compIds
        });
      } catch (syncErr) {
        console.warn('sync_full_user_gamification error in completeLesson:', syncErr);
      }

      // تحديث مباشر في user_progress و user_lesson_progress لظهور الدرس والنقاط فوراً في الداش بورد
      try {
        await activeSb.from('user_progress').update({
          points: currentLocalPoints,
          total_points: currentLocalPoints,
          hearts: curProg.hearts || 5,
          streak_days: curProg.streak_days || 1,
          last_active_date: new Date().toISOString().split('T')[0]
        }).eq('user_id', uid);

        await activeSb.from('user_lesson_progress').upsert({
          user_id: uid,
          lesson_id: numLessonId,
          status: 'completed',
          score: parseInt(score, 10) || 100,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });
      } catch (_) {}
    }

    curProg.points = currentLocalPoints;
    curProg.total_points = currentLocalPoints;
    this.saveProgressLocal(curProg, uid);

    if (typeof window !== 'undefined') {
      if (typeof window.invalidateMGCache === 'function') window.invalidateMGCache();
      if (typeof window.refreshStatsDisplay === 'function') window.refreshStatsDisplay(curProg);
    }

    map.added_xp = wasAlreadyCompleted ? 0 : safeXpReward;
    map.points = currentLocalPoints;
    map.hearts = curProg.hearts || 5;

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const bc = new BroadcastChannel('mg_coptic_gamification_sync');
        bc.postMessage({
          type: 'lesson_completed',
          userId: uid,
          lessonId: numLessonId,
          score: parseInt(score, 10) || 100,
          points: currentLocalPoints
        });
        setTimeout(() => { try { bc.close(); } catch (_) {} }, 1000);
      } catch (_) {}
    }

    return map;
  }`;

  content = content.replace(completeLessonOld, completeLessonNew);

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Updated ${relPath}`);
}

// 2. Update learn.js in js/pages and www/js/pages
const learnFiles = ['js/pages/learn.js', 'www/js/pages/learn.js'];
for (const relPath of learnFiles) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Ensure btnVictoryContinue and finishLessonSuccess invalidate cache and refresh properly
  content = content.replace(
    /if \(btnVictoryContinue && victoryModal\) \{[\s\S]*?victoryModal\.style\.display = 'none';\s*closeRunner\(\);/m,
    `if (btnVictoryContinue && victoryModal) {
          btnVictoryContinue.onclick = async () => {
            victoryModal.style.display = 'none';
            closeRunner();
            if (typeof window.invalidateMGCache === 'function') window.invalidateMGCache();
            if (typeof refreshStatsDisplay === 'function') await refreshStatsDisplay();
            if (typeof syncHomeLearningProgress === 'function') await syncHomeLearningProgress();`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Updated ${relPath}`);
}

// 3. Update index.html and www/index.html
const indexHtmlFiles = ['index.html', 'www/index.html'];
for (const relPath of indexHtmlFiles) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix 3.1: Replace game.completeLesson(..., 0) with finalXpToPass in finishLessonSuccess
  content = content.replace(
    /game\.completeLesson\(uid,\s*selectedLesson\.id,\s*accuracy,\s*selectedNextLessonId,\s*0\)\.then\(res => \{/g,
    `const finalXpToPass = isReplayingLesson ? 0 : (sessionXpEarned > 0 ? sessionXpEarned : fullConfiguredXp);
          game.completeLesson(uid, selectedLesson.id, accuracy, selectedNextLessonId, finalXpToPass).then(res => {`
  );

  // Fix 3.2: Ensure vXp display uses gained value properly
  content = content.replace(
    /if \(vXp\) \{\s*vXp\.textContent = isReplayingLesson \? 'مراجعة \(0 XP\)' : `\+\$\{sessionXpEarned\} XP`;\s*\}/g,
    `if (vXp) {
              const gainedVal = res?.added_xp ?? (isReplayingLesson ? 0 : (sessionXpEarned > 0 ? sessionXpEarned : fullConfiguredXp));
              vXp.textContent = isReplayingLesson ? 'مراجعة (0 XP)' : \`+\${gainedVal} XP\`;
            }`
  );

  // Fix 3.3: btnVictoryContinue invalidates cache and triggers syncHomeLearningProgress
  content = content.replace(
    /if \(btnVictoryContinue && victoryModal\) \{[\s\S]*?victoryModal\.style\.display = 'none';\s*closeRunner\(\);\s*await refreshStatsDisplay\(\);/m,
    `if (btnVictoryContinue && victoryModal) {
          btnVictoryContinue.onclick = async () => {
            victoryModal.style.display = 'none';
            closeRunner();
            if (typeof window.invalidateMGCache === 'function') window.invalidateMGCache();
            if (typeof refreshStatsDisplay === 'function') await refreshStatsDisplay();
            if (typeof syncHomeLearningProgress === 'function') await syncHomeLearningProgress();`
  );

  // Fix 3.4: getUserProgressData checks user-specific key first
  content = content.replace(
    /function getUserProgressData\(\)\s*\{\s*if \(_memUserProgress\) return _memUserProgress;\s*try\s*\{\s*const raw = localStorage\.getItem\('mg_coptic_progress'\);/m,
    `function getUserProgressData() {
      if (_memUserProgress) return _memUserProgress;
      try {
        const uid = (typeof getAuthUserId === 'function' ? getAuthUserId() : null) || (window.currentAuthUser ? window.currentAuthUser.id : null);
        const userKey = uid ? \`mg_coptic_progress_\${uid}\` : 'mg_coptic_progress';
        const raw = (uid ? localStorage.getItem(userKey) : null) || localStorage.getItem('mg_coptic_progress');`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Updated ${relPath}`);
}

// 4. Update home.js in js/pages and www/js/pages
const homeFiles = ['js/pages/home.js', 'www/js/pages/home.js'];
for (const relPath of homeFiles) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Ensure syncHomeLearningProgress reconciles properly
  content = content.replace(
    /const userProg = \(await game\.getProgress\(userId\)\) \|\| getUserProgressData\(\);/g,
    `const userProg = (await game.getProgress(userId, false)) || getUserProgressData();`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Updated ${relPath}`);
}

console.log('🎉 XP Persistence Fix Applied Successfully to all files!');
