    (function initLearningPathEngine() {
      function escapeHtml(str) {
        return String(str ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      }

      const game = new Proxy({}, {
        get: (target, prop) => {
          if (prop === 'sound') return window.Sound || window.MGCopticGame?.sound;
          return window.MGCopticGame ? window.MGCopticGame[prop] : target[prop];
        }
      });

      let activeCurriculum = null;
      let activeLessonProgress = {};
      let selectedLesson = null;
      let selectedNextLessonId = null;

      let currentChallenges = [];
      let initialChallengesCount = 0;
      let currentChallengeIndex = 0;
      let correctAnswersCount = 0;
      let sessionXpEarned = 0;
      let runnerState = 'answering';
      let currentRunnerHearts = 5;
      let isOutOfHeartsModalOpen = false;
      let currentSelection = null;
      let wordTilesBuilt = [];
      let selectedMatchLeft = null;
      let selectedMatchRight = null;
      let matchedPairsCount = 0;
      let currentActiveChestId = null;
      let currentActiveChestData = null;
      let isReplayingLesson = false;
      let sessionAnsweredChallenges = new Set(); // تتبع التمارين المُجاب عليها لمنع تكرار النقاط

      function getAuthUserId() {
        if (window.currentAuthUser && window.currentAuthUser.id) return window.currentAuthUser.id;
        const u = typeof getUserProfileData === 'function' ? getUserProfileData() : null;
        return u ? u.id : null;
      }

      let duoToastTimer = null;
      function showToast(text, iconType = 'lock') {
        const toast = document.getElementById('duo-toast');
        const textEl = document.getElementById('duo-toast-text');
        if (!toast || !textEl) return;
        textEl.textContent = text;
        toast.classList.add('show');
        if (duoToastTimer) clearTimeout(duoToastTimer);
        duoToastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
      }
      window.showToast = showToast;

      function showFloatingXpBadge(text) {
        try {
          const badge = document.createElement('div');
          badge.textContent = text;
          badge.style.position = 'fixed';
          badge.style.top = '75px';
          badge.style.left = '50%';
          badge.style.transform = 'translateX(-50%) translateY(0)';
          badge.style.background = 'linear-gradient(135deg, #00A3FF, #0077CC)';
          badge.style.color = '#FFFFFF';
          badge.style.padding = '6px 16px';
          badge.style.borderRadius = '20px';
          badge.style.fontWeight = '800';
          badge.style.fontSize = '0.92rem';
          badge.style.boxShadow = '0 4px 15px rgba(0, 163, 255, 0.4)';
          badge.style.zIndex = '999999';
          badge.style.transition = 'all 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
          document.body.appendChild(badge);
          setTimeout(() => {
            badge.style.transform = 'translateX(-50%) translateY(-28px)';
            badge.style.opacity = '0';
          }, 100);
          setTimeout(() => badge.remove(), 950);
        } catch(e){}
      }

      // وظيفة التحديث الفوري واللحظي لنقاط XP (0 مللي ثانية) بدون أي تأخير أو انتظار للشبكة
      function updateInstantXP(deltaXp = 0, newExactTotal = null) {
        try {
          const tbXp = document.getElementById('topbar-xp-val') || document.getElementById('points-val');
          let currentVal = 0;
          if (tbXp) {
            currentVal = parseInt(tbXp.textContent, 10) || 0;
          }
          const targetXp = (newExactTotal !== null && newExactTotal !== undefined)
            ? Number(newExactTotal)
            : (currentVal + Number(deltaXp || 0));

          if (tbXp) {
            tbXp.textContent = targetXp;
            // وميض وانتعاش حركي فوري لشارة XP
            const badge = document.getElementById('topbar-xp-badge');
            if (badge) {
              badge.classList.remove('xp-updated-pop');
              void badge.offsetWidth;
              badge.classList.add('xp-updated-pop');
            }
          }

          const homeCardXp = document.getElementById('home-card-xp');
          if (homeCardXp) {
            homeCardXp.textContent = targetXp;
          }

          if (newExactTotal !== null && newExactTotal !== undefined) {
            const uid = (typeof getAuthUserId === 'function') ? getAuthUserId() : null;
            const userKey = uid ? `mg_coptic_progress_${uid}` : 'mg_coptic_progress';
            try {
              const raw = localStorage.getItem(userKey) || localStorage.getItem('mg_coptic_progress');
              let p = raw ? JSON.parse(raw) : {};
              p.points = targetXp;
              p.total_points = targetXp;
              if (uid) localStorage.setItem(userKey, JSON.stringify(p));
              localStorage.setItem('mg_coptic_progress', JSON.stringify(p));
            } catch (_) {}
          }

          if (typeof window.invalidateMGCache === 'function') {
            window.invalidateMGCache();
          }
        } catch (e) {
          console.warn('updateInstantXP error:', e);
        }
      }
      window.updateInstantXP = updateInstantXP;

      async function refreshStatsDisplay(forcedProg = null) {
        try {
          const uid = getAuthUserId();
          let prog = forcedProg;
          if (!prog) {
            if (game && typeof game.getProgressLocal === 'function') {
              prog = game.getProgressLocal(uid);
            }
            if (!prog && typeof getUserProgressData === 'function') {
              prog = getUserProgressData();
            }
            if (!prog && game && game.getProgress) {
              prog = await game.getProgress(uid);
            }
          }
          if (!prog) return;

          const hearts = prog.hearts ?? 5;
          const xp = prog.points ?? prog.total_points ?? 0;
          const streak = prog.streak_days ?? 1;

          const runnerHearts = document.getElementById('runner-hearts-count');
          if (runnerHearts) runnerHearts.textContent = hearts;

          const tbXp = document.getElementById('topbar-xp-val') || document.getElementById('points-val');
          if (tbXp) {
            const oldVal = parseInt(tbXp.textContent, 10);
            tbXp.textContent = xp;
            if (!isNaN(oldVal) && xp > oldVal) {
              const badge = document.getElementById('topbar-xp-badge');
              if (badge) {
                badge.classList.remove('xp-updated-pop');
                void badge.offsetWidth;
                badge.classList.add('xp-updated-pop');
              }
            }
          }
          const tbStreak = document.getElementById('topbar-streak-val') || document.getElementById('streak-val');
          if (tbStreak) tbStreak.textContent = streak;
          const tbHearts = document.getElementById('topbar-hearts-val') || document.getElementById('hearts-val');
          if (tbHearts) tbHearts.textContent = hearts;

          const cardXp = document.getElementById('home-card-xp');
          if (cardXp) cardXp.textContent = xp;
          const cardStreak = document.getElementById('home-card-streak');
          if (cardStreak) cardStreak.textContent = streak;

          if (typeof syncUserProfileUI === 'function') syncUserProfileUI();

          const runnerOverlay = document.getElementById('challenge-runner-overlay');
          const isRunnerActive = runnerOverlay && (runnerOverlay.style.display === 'flex' || runnerOverlay.classList.contains('active'));
          if (!isRunnerActive && typeof syncHomeLearningProgress === 'function') {
            syncHomeLearningProgress();
          }
        } catch(e){}
      }
      window.refreshStatsDisplay = refreshStatsDisplay;

// ============================================================
      // مبدّل المستويات المصغر والأنيق (Compact Professional Level Bar)
      // بدون أي شعار ضخم - صغير وملخص واحترافي وبسيط
      // ============================================================
      let currentActiveLevelId = null;

      function isLevelUnlocked(levelId, curriculum, progress) {
        // المستوى الأول مفتوح دائماً للجميع
        if (String(levelId) === '5') return true;

        // التحقق من تفعيل فتح جميع المستويات بالحساب (Admin Override / Master Unlock)
        try {
          const uid = (typeof getAuthUserId === 'function') ? getAuthUserId() : null;
          if (uid && (localStorage.getItem(`mg_coptic_unlocked_all_levels_${uid}`) === 'true' || localStorage.getItem('mg_coptic_unlocked_all_levels') === 'true')) {
            return true;
          }
          if (localStorage.getItem('mg_coptic_unlocked_all_levels') === 'true') {
            return true;
          }
          if (progress && (progress.all_levels_unlocked === true || progress.unlocked_all_levels === true || progress['__all_unlocked'] === true)) {
            return true;
          }
        } catch(e) {}

        if (!curriculum || !curriculum.levels) return false;
        const levels = (curriculum.levels || []).slice().sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1));
        const targetIdx = levels.findIndex(l => String(l.id) === String(levelId));
        if (targetIdx <= 0) return true;

        // التحقق من اكتمال كافة المستويات السابقة بنسبة 100%
        for (let i = 0; i < targetIdx; i++) {
          const prevLvl = levels[i];
          const prevStats = getLevelStats(prevLvl.id, curriculum, progress);
          if (!prevStats.isCompleted) {
            return false;
          }
        }
        return true;
      }

      function getActiveLevelId() {
        let activeCur = null;
        if (typeof activeCurriculum !== 'undefined' && activeCurriculum && activeCurriculum.units) activeCur = activeCurriculum;
        else if (typeof DEFAULT_CURRICULUM !== 'undefined' && DEFAULT_CURRICULUM && DEFAULT_CURRICULUM.units) activeCur = DEFAULT_CURRICULUM;
        
        let prog = (typeof activeLessonProgress !== 'undefined' && activeLessonProgress) ? activeLessonProgress : {};

        if (currentActiveLevelId) {
          if (activeCur && !isLevelUnlocked(currentActiveLevelId, activeCur, prog)) {
            currentActiveLevelId = '5';
            try { localStorage.setItem('mg_coptic_active_level_id', '5'); } catch(e){}
          }
          return currentActiveLevelId;
        }

        try {
          const saved = localStorage.getItem('mg_coptic_active_level_id');
          if (saved && saved !== '5') {
            if (activeCur && !isLevelUnlocked(saved, activeCur, prog)) {
              currentActiveLevelId = '5';
              localStorage.setItem('mg_coptic_active_level_id', '5');
              return '5';
            }
            currentActiveLevelId = String(saved);
            return currentActiveLevelId;
          }
        } catch(e) {}
        currentActiveLevelId = '5';
        return currentActiveLevelId;
      }

      function setActiveLevelId(levelId) {
        let activeCur = null;
        if (typeof activeCurriculum !== 'undefined' && activeCurriculum && activeCurriculum.units) activeCur = activeCurriculum;
        else if (typeof DEFAULT_CURRICULUM !== 'undefined' && DEFAULT_CURRICULUM && DEFAULT_CURRICULUM.units) activeCur = DEFAULT_CURRICULUM;
        let prog = (typeof activeLessonProgress !== 'undefined' && activeLessonProgress) ? activeLessonProgress : {};

        if (activeCur && !isLevelUnlocked(levelId, activeCur, prog)) {
          console.warn('[Anti-Cheat] محاولة مرفوضة: لا يمكن الانتقال لمستوى مغلق قبل إكمال المستوى السابق بنسبة 100%.');
          currentActiveLevelId = '5';
          try { localStorage.setItem('mg_coptic_active_level_id', '5'); } catch(e) {}
          return false;
        }

        currentActiveLevelId = String(levelId);
        try {
          localStorage.setItem('mg_coptic_active_level_id', currentActiveLevelId);
        } catch(e) {}
        return true;
      }

      function getLevelStats(levelId, curriculum, progress) {
        if (!curriculum || !curriculum.units) {
          return { totalUnits: 0, totalLessons: 0, completedLessons: 0, totalChallenges: 0, percent: 0, isCompleted: false };
        }
        const units = curriculum.units.filter(u => String(u.level_id) === String(levelId));
        let totalLessons = 0;
        let completedLessons = 0;
        let totalChallenges = 0;

        units.forEach(u => {
          (u.lessons || []).forEach(les => {
            totalLessons++;
            const p = progress ? progress[String(les.id)] : null;
            if (p && (p.status === 'completed' || p.completed === true || Number(p.stars) > 0)) {
              completedLessons++;
            }
            if (les.challenge_list && les.challenge_list.length > 0) {
              totalChallenges += les.challenge_list.length;
            } else if (les.content && les.content.challenges) {
              totalChallenges += les.content.challenges.length;
            } else {
              totalChallenges += 4;
            }
          });
        });
        const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        const isCompleted = totalLessons > 0 && completedLessons >= totalLessons;
        return {
          totalUnits: units.length,
          totalLessons,
          completedLessons,
          totalChallenges,
          percent,
          isCompleted
        };
      }

      function areAllLevelsCompleted(curriculum, progress) {
        if (!curriculum || !curriculum.levels || curriculum.levels.length === 0) return false;
        const cur = (curriculum && curriculum.units) ? curriculum : (typeof DEFAULT_CURRICULUM !== 'undefined' ? DEFAULT_CURRICULUM : null);
        if (!cur) return false;
        const levels = (cur.levels || []).filter(l => {
          const stats = getLevelStats(l.id, cur, progress);
          return stats.totalLessons > 0;
        });
        if (levels.length === 0) return false;
        return levels.every(l => {
          const stats = getLevelStats(l.id, cur, progress);
          return stats.isCompleted;
        });
      }
      window.areAllLevelsCompleted = areAllLevelsCompleted;

      function showUpcomingLevelsModal(forceCompletedState = false) {
        if (typeof Swal === 'undefined') return;
        const allDone = forceCompletedState || (typeof areAllLevelsCompleted === 'function' && areAllLevelsCompleted(activeCurriculum, activeLessonProgress));
        
        const headerTitle = allDone 
          ? 'تهانينا يا بطل! أتممت كل المستويات 🎉🏆' 
          : 'المستويات القادمة والتحديثات الكبرى 🚀✨';
        
        const badgeTag = allDone
          ? 'إنجاز استثنائي • مكتمل بنسبة 100%'
          : 'قريباً جداً • قيد الإعداد والإطلاق ⏳';
        
        const leadText = allDone
          ? 'لقد أنهيت ببراعة واجتهاد <b>كافة مستويات منصة MG COPTIC</b> المتاحة حالياً!'
          : 'نعمل بكل شغف على إعداد وتطوير <b>مجموعة مستويات تفاعلية كبرى</b> لنقلك لمستوى الإتقان والتحدث بطلاقة!';

        Swal.fire({
          title: `<span style="color:#4A0E21;font-weight:900;font-size:1.3rem;font-family:'Cairo',var(--font-display),sans-serif;">${headerTitle}</span>`,
          html: `
            <div style="text-align:center;direction:rtl;padding:4px 0;font-family:'Cairo','Tajawal',sans-serif;">
              <div style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#7A1736 0%,#4A0E21 100%);border:2.5px solid #E8C172;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:2rem;box-shadow:0 8px 20px rgba(107,21,48,0.25);">
                ${allDone ? '🏆' : '⏳'}
              </div>
              <div style="display:inline-block;background:linear-gradient(135deg,#FFF2D6 0%,#FFE5B4 100%);color:#7A4B05;border:1px solid #E8CA88;padding:3px 14px;border-radius:20px;font-size:0.78rem;font-weight:800;margin-bottom:12px;">
                ${badgeTag}
              </div>
              <p style="font-size:0.95rem;color:#2E2018;font-weight:700;line-height:1.65;margin:0 0 14px;">
                ${leadText}
              </p>
              <div style="background:linear-gradient(135deg,#FFFDF9 0%,#FAF3E6 100%);border:1.5px solid #E2D5BE;border-radius:16px;padding:14px;text-align:right;margin-bottom:14px;box-shadow:0 3px 10px rgba(46,32,24,0.04);">
                <div style="display:flex;align-items:center;gap:6px;font-weight:900;color:#6B1530;font-size:0.95rem;margin-bottom:10px;">
                  <span>✨</span>
                  <span>ما الذي ينتظرك في التحديثات القادمة:</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;font-size:0.85rem;color:#4A3828;line-height:1.6;font-weight:700;">
                  <div style="display:flex;align-items:flex-start;gap:8px;background:rgba(255,255,255,0.75);padding:8px 10px;border-radius:10px;border:1px solid rgba(196,160,82,0.25);">
                    <span style="font-size:1.15rem;line-height:1;">🌟</span>
                    <div><b>مستويات ودروس تفاعلية جديدة</b><br><span style="font-size:0.76rem;color:#7A695A;font-weight:600;">محتوى تعليمي متدرج مع تمارين مبتكرة لتطوير مهاراتك خطوة بخطوة.</span></div>
                  </div>
                  <div style="display:flex;align-items:flex-start;gap:8px;background:rgba(255,255,255,0.75);padding:8px 10px;border-radius:10px;border:1px solid rgba(196,160,82,0.25);">
                    <span style="font-size:1.15rem;line-height:1;">🎯</span>
                    <div><b>تحديات وأنشطة تطبيقية مشوقة</b><br><span style="font-size:0.76rem;color:#7A695A;font-weight:600;">أنشطة تفاعلية متنوعة تعزز ثقتك وتثبت ما تعلمته بأسلوب ممتع.</span></div>
                  </div>
                  <div style="display:flex;align-items:flex-start;gap:8px;background:rgba(255,255,255,0.75);padding:8px 10px;border-radius:10px;border:1px solid rgba(196,160,82,0.25);">
                    <span style="font-size:1.15rem;line-height:1;">🚀</span>
                    <div><b>ميزات وتطويرات كبرى للمنصة</b><br><span style="font-size:0.76rem;color:#7A695A;font-weight:600;">أدوات ذكية وتحديثات بصرية تجعل تجربة التعلم أكثر سهولة وروعة.</span></div>
                  </div>
                </div>
              </div>
              <p style="font-size:0.8rem;color:#7A695A;margin:0;line-height:1.5;font-weight:600;">
                💡 يمكنك في هذه الأثناء مراجعة دروسك السابقة، أو تصفح القاموس والأبجدية لتثبيت معلوماتك!
              </p>
            </div>
          `,
          confirmButtonText: 'ممتاز، في انتظار الانطلاق! 🌟',
          confirmButtonColor: '#6B1530',
          backdrop: 'rgba(30, 20, 15, 0.75)',
          customClass: {
            popup: 'swal2-celebration-popup'
          }
        });
      }
      window.showUpcomingLevelsModal = showUpcomingLevelsModal;
      window.showAllLevelsCompletedModal = () => showUpcomingLevelsModal(true);

      function renderLevelCapsuleHeader(activeLvlId, curriculum, progress) {
        const levels = (curriculum.levels || []).slice().sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1));
        const currentLvl = levels.find(l => String(l.id) === String(activeLvlId)) || levels[0] || { id: 5, title: 'المستوى الأول: الأبجدية القبطية الكاملة', order_index: 1 };
        const order = Number(currentLvl.order_index) || 1;
        const stats = getLevelStats(activeLvlId, curriculum, progress);
        
        let levelName = 'المستوى الأول: الأبجدية القبطية';
        if (order === 2 || String(activeLvlId) === '6') {
          levelName = 'المستوى الثاني: قواعد القراءة';
        }

        return `
          <div class="modern-level-switcher-wrapper">
            <button type="button" class="compact-level-bar-btn" onclick="openLevelSelectorModal()" aria-label="تبديل المستوى الدراسي" title="اضغط للانتقال بين المستويات">
              <div class="compact-level-title-group">
                <span class="compact-level-name">${escapeHtml(levelName)}</span>
                <span class="compact-level-stat">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>${stats.completedLessons}/${stats.totalLessons} درس (${stats.percent}%)</span>
                </span>
              </div>
              <div class="compact-level-switch-btn">
                <span>تبديل المستوى</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>
          </div>
        `;
      }

      function renderLevelSelectorCards() {
        const container = document.getElementById('level-cards-container');
        if (!container || !activeCurriculum) return;
        
        const levels = (activeCurriculum.levels || [])
          .filter(l => String(l.id) === '5' || String(l.id) === '6' || Number(l.order_index) === 1 || Number(l.order_index) === 2)
          .slice()
          .sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1));

        const activeLvlId = String(getActiveLevelId());
        
        let html = '';
        levels.forEach((lvl, idx) => {
          const lvlId = String(lvl.id);
          const order = Number(lvl.order_index) || (idx + 1);
          const stats = getLevelStats(lvlId, activeCurriculum, activeLessonProgress);
          const isActive = lvlId === activeLvlId;
          const isUnlocked = isLevelUnlocked(lvlId, activeCurriculum, activeLessonProgress);
          
          let subtitle = '٣٢ حرفاً ورمزاً بالأصوات والكلمات والقواعد الأساسية';
          let tag = 'المستوى الأول • إتقان الحروف';
          
          if (order === 2 || lvlId === '6') {
            subtitle = 'الحركات، أزمنة النطق، الجنكم، الحروف المركبة، والمقاطع الصوتية';
            tag = 'المستوى الثاني • قواعد القراءة';
          } else if (order === 3 || lvlId === '7') {
            subtitle = 'المراجعة الشاملة، تحليل النصوص، التراكيب الكنسية، والترجمة التطبيقية';
            tag = 'المستوى الثالث • المراجعة والتطبيق المتقدم';
          }

          let statusBadgeHtml = '';
          if (!isUnlocked) {
            statusBadgeHtml = `
              <span class="level-card-badge badge-locked-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>مغلق</span>
              </span>`;
          } else if (isActive) {
            statusBadgeHtml = `
              <span class="level-card-badge badge-active-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>المستوى الحالي</span>
              </span>`;
          } else if (stats.isCompleted) {
            statusBadgeHtml = `
              <span class="level-card-badge badge-completed-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="16 10 11 15 8 12"/>
                </svg>
                <span>مكتمل</span>
              </span>`;
          } else if (stats.completedLessons > 0) {
            statusBadgeHtml = `
              <span class="level-card-badge badge-switch-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>قيد التقدم (${stats.percent}%)</span>
              </span>`;
          } else {
            statusBadgeHtml = `
              <span class="level-card-badge badge-switch-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span>اضغط للانتقال</span>
              </span>`;
          }

          let statsRowHtml = '';
          if (!isUnlocked) {
            const prevStats = getLevelStats('5', activeCurriculum, activeLessonProgress);
            const remaining = Math.max(0, prevStats.totalLessons - prevStats.completedLessons);
            statsRowHtml = `
              <span class="stat-pill" style="color:#8C6517;font-weight:800;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>أكمل ${remaining} درساً في المستوى الأول لفتح هذا المستوى</span>
              </span>
            `;
          } else {
            statsRowHtml = `
              <span class="stat-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                <span>${stats.totalUnits} وحدات</span>
              </span>
              <span class="stat-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                <span>${stats.totalLessons} درساً</span>
              </span>
              <span class="stat-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                </svg>
                <span>${stats.totalChallenges} تمريناً</span>
              </span>
              ${stats.completedLessons > 0 ? `
                <span class="stat-pill stat-completed">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>${stats.completedLessons}/${stats.totalLessons} منجز</span>
                </span>` : ''}
            `;
          }

          html += `
            <div class="modern-level-card ${isActive ? 'is-active' : ''} ${!isUnlocked ? 'is-locked' : ''}" onclick="switchCurriculumLevel('${lvlId}')">
              <div class="level-card-num-badge">
                ${!isUnlocked ? `
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ` : `<span>${order === 1 ? '١' : '٢'}</span>`}
              </div>
              <div class="level-card-main-col">
                <div class="level-card-top-meta">
                  <span class="level-card-tag">${escapeHtml(tag)}</span>
                  ${statusBadgeHtml}
                </div>
                <h4 class="level-card-title">${escapeHtml(lvl.title)}</h4>
                <p class="level-card-desc">${escapeHtml(lvl.description || subtitle)}</p>
                <div class="level-card-stats-row">
                  ${statsRowHtml}
                </div>
                ${isUnlocked ? `
                  <div class="level-card-progress-bar-wrap">
                    <div class="level-card-progress-fill ${stats.isCompleted ? 'completed' : ''}" style="width: ${stats.percent}%;"></div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        });

        html += `
          <div class="modern-level-card is-upcoming" onclick="window.showUpcomingLevelsModal ? window.showUpcomingLevelsModal() : window.showAllLevelsCompletedModal()" role="button" tabindex="0">
            <div class="level-card-num-badge upcoming-badge">
              <span class="upcoming-badge-icon">⏳</span>
            </div>
            <div class="level-card-main-col">
              <div class="level-card-top-meta">
                <span class="level-card-tag upcoming-tag">
                  <span class="upcoming-live-dot"></span>
                  <span>قريباً جداً • قيد الإعداد</span>
                </span>
                <span class="level-card-badge upcoming-pill-badge">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>تحديثات جديدة</span>
                </span>
              </div>
              <h4 class="level-card-title upcoming-title">
                <span>المستويات القادمة</span>
                <span class="upcoming-sparkle">✨</span>
              </h4>
              <p class="level-card-desc upcoming-desc">نعمل بكل شغف على إعداد وتجهيز مستويات ودروس جديدة لإثراء رحلتك التعليمية، ترقبوها قريباً!</p>
              <div class="upcoming-action-bar">
                <div class="upcoming-action-content">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>اضغط لمعرفة ما ينتظرك في التحديث القادم ✨</span>
                </div>
                <div class="upcoming-action-arrow">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        `;

        container.innerHTML = html;
      }

      window.openLevelSelectorModal = function() {
        const modal = document.getElementById('level-selector-modal');
        const btn = document.querySelector('.compact-level-bar-btn') || document.querySelector('.modern-level-capsule-btn');
        if (!modal) return;
        renderLevelSelectorCards();
        modal.classList.add('show');
        if (btn) btn.classList.add('active');
      };

      window.closeLevelSelectorModal = function() {
        const modal = document.getElementById('level-selector-modal');
        const btn = document.querySelector('.compact-level-bar-btn') || document.querySelector('.modern-level-capsule-btn');
        if (modal) modal.classList.remove('show');
        if (btn) btn.classList.remove('active');
      };

      window.switchCurriculumLevel = function(targetLevelId) {
        if (!isLevelUnlocked(targetLevelId, activeCurriculum, activeLessonProgress)) {
          const prevStats = getLevelStats('5', activeCurriculum, activeLessonProgress);
          const remaining = Math.max(0, prevStats.totalLessons - prevStats.completedLessons);
          const msg = `المستوى مغلق! يجب إكمال جميع دروس المستوى الأول أولاً (متبقي ${remaining} درساً).`;
          
          if (typeof showToast === 'function') {
            showToast(msg, 'lock');
          } else if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'warning',
              title: 'المستوى مغلق 🔒',
              text: msg,
              confirmButtonText: 'حسناً، سأكمل المستوى الأول أولاً',
              confirmButtonColor: '#6B1530'
            });
          } else {
            alert(msg);
          }
          return;
        }

        setActiveLevelId(targetLevelId);
        window.closeLevelSelectorModal();
        drawSkillMapDOM();
        const container = document.getElementById('curriculum-units-container');
        if (container) {
          const targetY = container.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
        const lvlName = String(targetLevelId) === '6' ? 'المستوى الثاني: قواعد القراءة' : 'المستوى الأول: الأبجدية القبطية';
        if (typeof showToast === 'function') {
          showToast(`تم الانتقال إلى ${lvlName}`, 'check');
        }
      };

      function drawSkillMapDOM() {
        const container = document.getElementById('curriculum-units-container');
        if (!container) return;

        if (!activeCurriculum || !activeCurriculum.units || activeCurriculum.units.length === 0) {
          // التحقق من صلاحية وتحديث خيارات التمارين
          try {
            const curVer = localStorage.getItem('mg_coptic_curriculum_v_tag');
            if (curVer !== 'v8_multi_level_switcher') {
              localStorage.removeItem('mg_coptic_curriculum_v2');
              localStorage.removeItem('mg_coptic_curriculum_v1');
              localStorage.setItem('mg_coptic_curriculum_v_tag', 'v8_multi_level_switcher');
            }
          } catch(e) {}
          const raw = localStorage.getItem('mg_coptic_curriculum_v2') || localStorage.getItem('mg_coptic_curriculum_v1');
          if (raw) {
            try { activeCurriculum = JSON.parse(raw); } catch (e) { }
          }
          if (!activeCurriculum || !activeCurriculum.units || activeCurriculum.units.length === 0) {
            if (typeof window.DEFAULT_CURRICULUM !== 'undefined' && window.DEFAULT_CURRICULUM && window.DEFAULT_CURRICULUM.units) {
              activeCurriculum = window.DEFAULT_CURRICULUM;
            } else if (typeof DEFAULT_CURRICULUM !== 'undefined' && DEFAULT_CURRICULUM && DEFAULT_CURRICULUM.units) {
              activeCurriculum = DEFAULT_CURRICULUM;
            }
          }
        }

        const uid = getAuthUserId();
        if (!activeLessonProgress || Object.keys(activeLessonProgress).length === 0) {
          const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : 'mg_coptic_lesson_progress';
          const rawLP = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem('mg_coptic_lesson_progress');
          if (rawLP) {
            try { activeLessonProgress = JSON.parse(rawLP); } catch (e) { }
          }
        }
        if (!activeLessonProgress || Object.keys(activeLessonProgress).length === 0) {
          activeLessonProgress = {};
        }

        if (!activeCurriculum || !activeCurriculum.units || activeCurriculum.units.length === 0) {
          container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;color:var(--ink-soft);font-weight:700;">
              <div style="font-size:3rem;margin-bottom:12px;">📚</div>
              <div style="font-size:1.15rem;color:var(--ink);margin-bottom:8px;">مسار التعلم جاهز لاستقبال المنهج</div>
              <div style="font-size:0.9rem;color:var(--ink-soft);max-width:380px;margin:0 auto;line-height:1.6;">تم تصفير بيانات المسار السابقة بنجاح. يمكنك الآن إضافة الوحدات والدروس والتمارين التفاعلية من لوحة التحكم لتظهر فوراً هنا.</div>
            </div>`;
          return;
        }

        let html = '';
        let foundFirstCurrent = false;
        const getWaveOffset = (stepIdx) => (stepIdx === 0 ? 0 : ((stepIdx % 2 === 1) ? 70 : -70));
        const stepGap = 135;
        const startY = 60;
        const cx = 170;

        // 1. استخراج وترتيب المستويات
        const levels = (activeCurriculum.levels || []).slice().sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1));
        const levelMap = new Map();
        levels.forEach((lvl, idx) => {
          levelMap.set(String(lvl.id), {
            ...lvl,
            order: Number(lvl.order_index) || (idx + 1)
          });
        });

        // 2. ترتيب الوحدات: أولاً حسب ترتيب المستوى ثم حسب ترتيب الوحدة داخل المستوى
        const sortedUnits = (activeCurriculum.units || []).slice().sort((a,b) => {
          const lvlA = levelMap.get(String(a.level_id))?.order ?? 9999;
          const lvlB = levelMap.get(String(b.level_id))?.order ?? 9999;
          if (lvlA !== lvlB) return lvlA - lvlB;
          return (Number(a.order_index) || 1) - (Number(b.order_index) || 1);
        });

        let currentRenderedLevelId = null;

        // تصفية الوحدات لعرض وحدات المستوى النشط فقط لسرعة فائقة (0ms) وخفة الـ DOM
        let activeLvlId = String(getActiveLevelId());
        let unitsToRender = sortedUnits.filter(u => String(u.level_id) === activeLvlId);
        if (unitsToRender.length === 0) {
          activeLvlId = '5';
          unitsToRender = sortedUnits.filter(u => String(u.level_id) === '5');
        }

        // إضافة الكبسولة العائمة الذكية لتبديل المستويات في قمة المسار
        html += renderLevelCapsuleHeader(activeLvlId, activeCurriculum, activeLessonProgress);

        unitsToRender.forEach((unit, unitIdx) => {
          const unitLessons = (unit.lessons && unit.lessons.length > 0) 
            ? unit.lessons.slice().sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1)) 
            : [];

          const prevUnit = unitIdx === 0 ? null : unitsToRender[unitIdx - 1];
          let prevUnitMastered = true;
          if (prevUnit && prevUnit.lessons && prevUnit.lessons.length > 0) {
            prevUnitMastered = prevUnit.lessons.every(l => (activeLessonProgress[String(l.id)] || {}).status === 'completed');
          }

          const rawBadge = String(unit.badge || 'ⲁ').trim();
          let badgeContent = '';
          if (rawBadge.startsWith('data:image/') || rawBadge.startsWith('http://') || rawBadge.startsWith('https://') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(rawBadge)) {
            badgeContent = `<img src="${rawBadge}" alt="شارة" style="width:48px;height:48px;min-width:48px;min-height:48px;object-fit:cover;border-radius:10px;display:block;" />`;
          } else {
            let fontSize = '1.6rem';
            if (rawBadge.length > 10) fontSize = '0.75rem';
            else if (rawBadge.length > 6) fontSize = '0.88rem';
            else if (rawBadge.length > 3) fontSize = '1.05rem';
            else if (rawBadge.length > 2) fontSize = '1.25rem';
            badgeContent = `<span style="font-size:${fontSize};font-weight:800;line-height:1.1;white-space:nowrap;padding:0 4px;">${escapeHtml(rawBadge)}</span>`;
          }

          // إذا كانت الوحدة بدون دروس مضافة بعد: لا يتم توليد أي مسار وهمي مغلق
          if (unitLessons.length === 0) {
            html += `
              <div class="unit-section" id="unit-${unit.id}">
                <div class="unit-banner">
                  <div class="unit-banner-badge">${badgeContent}</div>
                  <div class="unit-banner-info">
                    <h3 class="unit-banner-title">${escapeHtml(unit.title)}</h3>
                    <p class="unit-banner-sub">${escapeHtml(unit.description || 'أتقن نطق ورسم الحروف والكلمات')}</p>
                  </div>
                </div>
                <div style="text-align:center; padding:30px 20px; background:rgba(255,255,255,0.75); border-radius:18px; margin:15px auto 35px; max-width:420px; border:2px dashed #C4A052; color:#706354; box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                  <svg style="width:38px;height:38px;margin:0 auto 10px;fill:none;stroke:#C4A052;stroke-width:1.8;display:block;" viewBox="0 0 24 24"><path d="M12 6v6m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"/></svg>
                  <div style="font-weight:800; font-size:1.05rem; color:#4A0D24; margin-bottom:4px;">دروس هذه الوحدة قيد الإعداد</div>
                  <div style="font-size:0.85rem; opacity:0.85;">سيتم إضافة الدروس والتمارين التفاعلية لهذه الوحدة قريباً</div>
                </div>
              </div>
            `;
            return;
          }

          // بناء الخطوات الحقيقية فقط 1:1 دون أي تمارين مصطنعة أو مكررة
          const unitSteps = [];
          const allCustomChests = activeCurriculum.chests || [];
          const unitCustomChests = allCustomChests.filter(c => String(c.unit_id) === String(unit.id) || unitLessons.some(l => String(l.id) === String(c.after_lesson_id || c.lesson_id)));

          // 1. صناديق بداية الوحدة (unit_start)
          unitCustomChests.filter(c => c.placement_type === 'unit_start').sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1)).forEach(c => {
            unitSteps.push({
              kind: 'chest',
              chestId: String(c.id),
              chestData: c,
              requires: null
            });
          });

          // 2. الدروس والمحطات التعليمية (1:1 لكل درس مضاف فعلياً في الوحدة)
          unitLessons.forEach((les, lesIdx) => {
            const reqId = lesIdx === 0 ? null : String(unitLessons[lesIdx - 1].id);
            unitSteps.push({
              kind: 'lesson',
              id: String(les.id),
              title: les.title || unit.title,
              requires: reqId
            });

            // صناديق مخصصة بعد هذا الدرس
            unitCustomChests.filter(c => (String(c.after_lesson_id) === String(les.id) || String(c.lesson_id) === String(les.id)) && c.placement_type !== 'unit_start' && c.placement_type !== 'unit_end')
              .sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1))
              .forEach(c => {
                unitSteps.push({
                  kind: 'chest',
                  chestId: String(c.id),
                  chestData: c,
                  requires: String(les.id)
                });
              });
          });

          const lastStepId = unitLessons.length > 0 
            ? String(unitLessons[unitLessons.length - 1].id) 
            : null;

          // 3. صندوق نهاية الوحدة (صندوق الهدايا والكنز التلقائي في نهاية كل وحدة بدلاً من الكأس)
          let endChests = unitCustomChests.filter(c => c.placement_type === 'unit_end');

          // إذا لم يوجد صندوق نهاية مسجل في البيانات لهذه الوحدة، نبحث في المنهج المتزامن أو ننشئه تلقائياً
          if (endChests.length === 0) {
            const canonicalChests = (typeof DEFAULT_CURRICULUM !== 'undefined' && Array.isArray(DEFAULT_CURRICULUM?.chests))
              ? DEFAULT_CURRICULUM.chests
              : ((typeof window !== 'undefined' && window.DEFAULT_CURRICULUM && Array.isArray(window.DEFAULT_CURRICULUM.chests)) ? window.DEFAULT_CURRICULUM.chests : []);

            const isLastUnit = (unitIdx === sortedUnits.length - 1);
            let matchedChest = canonicalChests.find(c => String(c.unit_id) === String(unit.id) || String(c.id) === `chest_unit_${unit.order_index || (unitIdx + 1)}`);

            if (!matchedChest) {
              matchedChest = {
                id: `chest_unit_${unit.order_index || (unitIdx + 1)}`,
                unit_id: unit.id,
                title: isLastUnit ? '🏆 صندوق التخرج والاحتفال الختامي للمستوى الأول' : `🎁 صندوق كنز ${unit.title}`,
                description: isLastUnit ? 'تهانينا! لقد أتقنت جميع الـ 32 حرفاً القبطية بنجاح باهر!' : `مكافأة إتمام دروس ومراجعة ${unit.title}`,
                placement_type: 'unit_end',
                after_lesson_id: lastStepId,
                xp_mode: 'fixed',
                xp_min: isLastUnit ? 50 : 10,
                xp_max: isLastUnit ? 50 : 10,
                hearts: isLastUnit ? 3 : 1,
                has_badge: isLastUnit,
                badge_title: isLastUnit ? 'متقن الأبجدية القبطية' : '',
                badge_icon: isLastUnit ? 'trophy' : 'gift'
              };
            }
            endChests = [ matchedChest ];
          }

          endChests.forEach(c => {
            unitSteps.push({
              kind: 'chest',
              chestId: String(c.id),
              chestData: c,
              requires: lastStepId
            });
          });

          const totalSteps = unitSteps.length;
          const totalHeight = startY + (totalSteps - 1) * stepGap + 85;

          const points = [];
          for (let i = 0; i < totalSteps; i++) {
            const x = cx + getWaveOffset(i);
            const y = startY + i * stepGap;
            points.push({ x, y });
          }

          let pathD = `M ${points[0].x} ${points[0].y}`;
          for (let i = 1; i < points.length; i++) {
            const p0 = points[i - 1];
            const p1 = points[i];
            const cY0 = p0.y + stepGap * 0.52;
            const cY1 = p1.y - stepGap * 0.52;
            pathD += ` C ${p0.x} ${cY0}, ${p1.x} ${cY1}, ${p1.x} ${p1.y}`;
          }

          html += `
            <div class="unit-section" id="unit-${unit.id}">
              <div class="unit-banner">
                <div class="unit-banner-badge">${badgeContent}</div>
                <div class="unit-banner-info">
                  <h3 class="unit-banner-title">${escapeHtml(unit.title)}</h3>
                  <p class="unit-banner-sub">${escapeHtml(unit.description || 'أتقن نطق ورسم الحروف والكلمات')}</p>
                </div>
              </div>

              <div class="nodes-path" style="height:${totalHeight}px;">
                <svg class="nodes-trail-svg" viewBox="0 0 340 ${totalHeight}" width="340" height="${totalHeight}">
                  <path d="${pathD}" fill="none" stroke="#E6DCB8" stroke-width="16" stroke-linecap="round"/>
                  <path d="${pathD}" fill="none" stroke="#C4A052" stroke-width="10" stroke-linecap="round" stroke-dasharray="14 14"/>
                  <path d="${pathD}" fill="none" stroke="#FFF7D6" stroke-width="4" stroke-linecap="round" stroke-dasharray="14 14"/>
                </svg>
          `;

          unitSteps.forEach((step, stepIdx) => {
            const pt = points[stepIdx];

            if (step.kind === 'chest') {
              const isClaimed = game.isChestClaimed ? game.isChestClaimed(step.chestId) : false;
              const reqCompleted = step.requires ? ((activeLessonProgress[step.requires] || {}).status === 'completed') : true;
              const isChestUnlocked = reqCompleted;
              const chestStatusClass = isClaimed ? 'claimed' : (!isChestUnlocked ? 'locked' : 'unlocked');

              const cData = step.chestData || {};
              let xpTag = '+30 XP';
              if (cData.xp_mode === 'range') {
                xpTag = `+${cData.xp_min}~${cData.xp_max} XP`;
              } else if (cData.xp_min !== undefined) {
                xpTag = `+${cData.xp_min} XP`;
              }
              const rewardTagText = isClaimed ? 'تم الفتح ✓' : (!isChestUnlocked ? 'مغلق 🔒' : xpTag);
              const chestDataJson = JSON.stringify(cData).replace(/"/g, '&quot;');

              html += `
                <div class="path-step-node-pos" style="left:${pt.x}px; top:${pt.y}px;">
                  <div class="node-wrapper">
                    <button type="button" 
                            class="mystery-chest-btn ${chestStatusClass}" 
                            data-chest-id="${step.chestId}"
                            data-chest-data="${chestDataJson}"
                            data-claimed="${isClaimed}"
                            data-unlocked="${isChestUnlocked}"
                            title="${!isChestUnlocked ? 'صندوق الكنز مغلق — أكمل التدريب السابق أولاً لفتحه' : (escapeHtml(cData.title) || 'صندوق الكنز والمكافآت')}">
                      <svg class="chest-svg-img" viewBox="0 0 72 60" fill="none">
                        <ellipse cx="36" cy="54" rx="26" ry="4" fill="rgba(0,0,0,0.3)"/>
                        <rect x="8" y="24" width="56" height="28" rx="4" fill="#D4AF37" stroke="#664D13" stroke-width="2.5"/>
                        <rect x="15" y="24" width="8" height="28" fill="#F3CB4D" stroke="#664D13" stroke-width="1.2"/>
                        <rect x="49" y="24" width="8" height="28" fill="#F3CB4D" stroke="#664D13" stroke-width="1.2"/>
                        <path d="M6 24C6 12 16 6 36 6C56 6 66 12 66 24H6Z" fill="#E5C158" stroke="#664D13" stroke-width="2.5"/>
                        <path d="M8 24H64" stroke="#FFF7D6" stroke-width="2" stroke-linecap="round"/>
                        <rect x="30" y="20" width="12" height="15" rx="3" fill="#4A0E21" stroke="#FFD700" stroke-width="2"/>
                        <circle cx="36" cy="26" r="2.5" fill="#FFEFA6"/>
                      </svg>
                      <span class="chest-reward-tag">${rewardTagText}</span>
                    </button>
                  </div>
                </div>
              `;
              return;
            }


            const progressInfo = activeLessonProgress[step.id] || { status: 'locked' };
            const isCompleted = progressInfo.status === 'completed';
            
            const isAllLevelsUnlockedOverride = (function() {
              try {
                const uid = (typeof getAuthUserId === 'function') ? getAuthUserId() : null;
                if (uid && (localStorage.getItem(`mg_coptic_unlocked_all_levels_${uid}`) === 'true' || localStorage.getItem('mg_coptic_unlocked_all_levels') === 'true')) return true;
                if (localStorage.getItem('mg_coptic_unlocked_all_levels') === 'true') return true;
                if (activeLessonProgress && (activeLessonProgress['__all_unlocked'] === true || activeLessonProgress.all_levels_unlocked === true)) return true;
              } catch(_) {}
              return false;
            })();

            let isUnlocked = false;
            if (isAllLevelsUnlockedOverride) {
              isUnlocked = true;
            } else if (step.requires === null) {
              isUnlocked = prevUnitMastered;
            } else {
              isUnlocked = (activeLessonProgress[step.requires] || {}).status === 'completed';
            }

            let isCurrent = false;
            if (isUnlocked && !isCompleted && !foundFirstCurrent) {
              isCurrent = true;
              foundFirstCurrent = true;
            }

            let statusClass = 'locked';
            let iconSvg = '';

            let calloutText = 'ابدأ';
            if (step.kind === 'practice') calloutText = 'تطبيق';
            else if (step.kind === 'challenge') calloutText = 'تحدي';

            if (isCurrent) {
              statusClass = 'current';
              iconSvg = `
                <svg class="star-glyph" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              `;
            } else if (isCompleted) {
              statusClass = 'completed';
              iconSvg = `
                <svg class="check-glyph" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              `;
            } else if (isUnlocked) {
              statusClass = 'unlocked';
              if (step.kind === 'practice') {
                iconSvg = `
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#8C2430">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="#8C2430" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="#8C2430" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                `;
              } else if (step.kind === 'challenge') {
                iconSvg = `
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#8C2430">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                `;
              } else {
                iconSvg = `
                  <svg class="star-glyph" viewBox="0 0 24 24" fill="#8C2430">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                `;
              }
            } else {
              statusClass = 'locked';
              iconSvg = `
                <svg class="lock-glyph" viewBox="0 0 24 24" fill="#706354">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              `;
            }

            html += `
              <div class="path-step-node-pos" style="left:${pt.x}px; top:${pt.y}px;">
                <div class="node-wrapper">
                  ${isCurrent ? `
                    <div class="duo-callout-bubble">
                      <span>${calloutText}</span>
                    </div>
                    <div class="node-active-halo"></div>
                  ` : ''}

                  <button type="button" 
                          class="lesson-node-btn ${statusClass}"
                          data-lesson-id="${step.id}"
                          data-status="${statusClass}"
                          title="${escapeHtml(step.title)}">
                    ${iconSvg}
                  </button>
                </div>
              </div>
            `;
          });

          html += `
              </div>
            </div>
          `;
        });

        // إذا أتم الطالب كافة المستويات المتاحة في المنصة
        if (typeof areAllLevelsCompleted === 'function' && areAllLevelsCompleted(activeCurriculum, activeLessonProgress)) {
          html += `
            <div class="all-levels-celebration-card" onclick="window.showAllLevelsCompletedModal()">
              <div class="celebration-badge-row">
                <span class="celebration-pill-tag">إنجاز أسطوري • 100% مكتمل</span>
                <span class="celebration-pill-soon">مستويات جديدة قريباً 🚀</span>
              </div>
              <div class="celebration-trophy-circle">🏆</div>
              <h3 class="celebration-title">تهانينا من القلب! لقد أتممت جميع المستويات بنجاح! 🎉</h3>
              <p class="celebration-desc">
                أحسنت صنعاً! لقد أنهيت كافة الدروس والتحديات المتاحة حالياً على منصة MG COPTIC.
                نحن نعمل حالياً بكل شغف على إعداد وتجهيز <b>مستويات وتحديات متقدمة جديدة</b> ستنزل قريباً جداً بإذن الله ✨
              </p>
              <button type="button" class="celebration-action-btn" onclick="event.stopPropagation(); window.showAllLevelsCompletedModal()">
                <span>ماذا ينتظرك في المستويات القادمة؟ 🌟</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          `;
        }

        container.innerHTML = html;

        container.querySelectorAll('.lesson-node-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const isTrophy = btn.dataset.type === 'trophy';
            if (isTrophy) {
              const isMastered = btn.dataset.mastered === 'true';
              if (isMastered) {
                if (game.sound) game.sound.playVictory();
                showToast('أحسنت! لقد أتقنت دروس هذه الوحدة بجدارة.');
              } else {
                if (game.sound) game.sound.playWrong();
                showToast('أنهِ دروس ومستويات هذه الوحدة أولاً لنيل وسام الإتقان!');
              }
              return;
            }

            const lessonId = btn.dataset.lessonId;
            const status = btn.dataset.status;

            if (status === 'locked') {
              if (game.sound) game.sound.playWrong();
              showToast('هذا المستوى مغلق حالياً. أكمل المستويات السابقة أولاً لفتحه!');
              return;
            }

            // فحص ما إذا كان الدرس مكتملاً مسبقاً (وضع المراجعة لا يشترط قلوباً)
            const baseLessonId = String(lessonId).replace(/_[pc]$/, '');
            const isLessonCompleted = Boolean(activeLessonProgress && (
              (activeLessonProgress[String(lessonId)] && activeLessonProgress[String(lessonId)].status === 'completed') ||
              (baseLessonId && activeLessonProgress[baseLessonId] && activeLessonProgress[baseLessonId].status === 'completed')
            ));

            // يلزم وجود قلب واحد على الأقل لدخول أي تمرين إلا في وضع المراجعة
            const uid = getAuthUserId();
            const prog = (game.getProgressLocal ? game.getProgressLocal(uid) : null) || {};
            const currentHearts = Number(prog.hearts ?? 5);
            if (currentHearts < 1 && !isLessonCompleted) {
              if (game.sound) game.sound.playWrong();
              showToast('تحتاج إلى قلب واحد على الأقل لبدء التمارين!');
              handleOutOfHearts();
              return;
            }

            openLessonDetails(lessonId);
          });
        });

        container.querySelectorAll('.mystery-chest-btn').forEach(chestBtn => {
          chestBtn.addEventListener('click', () => {
            const chestId = chestBtn.dataset.chestId;
            const isClaimed = game.isChestClaimed ? game.isChestClaimed(chestId) : (chestBtn.dataset.claimed === 'true');
            const isUnlocked = chestBtn.dataset.unlocked === 'true';

            if (isClaimed) {
              if (game.sound) game.sound.playClick();
              showToast('لقد استلمت مكافأة هذا الصندوق سابقاً.');
              return;
            }

            if (!isUnlocked) {
              if (game.sound) game.sound.playWrong();
              showToast('صندوق الكنز مغلق 🔒 — أكمل التدريب السابق أولاً للوصول إليه واستلام مكافأتك!');
              return;
            }

            let cData = null;
            try {
              cData = JSON.parse(chestBtn.dataset.chestData || '{}');
            } catch(e){}

            if (!cData || !cData.title) {
              const allC = activeCurriculum.chests || [];
              cData = allC.find(c => String(c.id) === String(chestId)) || {
                id: chestId,
                title: 'صندوق المكافأة السري!',
                description: 'أحسنت وصولاً إلى هذه المحطة! إليك هديتك التشجيعية:',
                xp_mode: 'fixed',
                xp_min: 30,
                hearts: 1
              };
            }

            currentActiveChestId = chestId;
            currentActiveChestData = cData;

            const chestModal = document.getElementById('chest-modal');
            if (chestModal) {
              const titleEl = chestModal.querySelector('.chest-modal-title');
              const descEl = chestModal.querySelector('.chest-modal-desc');
              const gridEl = chestModal.querySelector('.chest-rewards-grid');

              if (titleEl) titleEl.textContent = cData.title || 'صندوق المكافأة السري!';
              if (descEl) descEl.innerHTML = (cData.description || 'أحسنت وصولاً إلى هذه المحطة!<br>إليك هديتك التشجيعية:').replace(/\n/g, '<br>');

              const xpText = cData.xp_mode === 'range' ? `+${cData.xp_min}~${cData.xp_max} XP` : `+${cData.xp_min || 30} XP`;
              const heartsCount = cData.hearts !== undefined ? cData.hearts : 1;

              if (gridEl) {
                gridEl.innerHTML = `
                  <div class="chest-reward-card xp-reward">
                    <div class="reward-icon-wrap">
                      <svg viewBox="0 0 24 24" width="36" height="36" fill="#228be6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <div class="reward-card-val xp-val" dir="ltr">
                      <span>${xpText}</span>
                    </div>
                    <div class="reward-card-lbl">نقاط XP زيادة</div>
                  </div>

                  ${heartsCount > 0 ? `
                    <div class="chest-reward-card heart-reward">
                      <div class="reward-icon-wrap">
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="#e03131"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </div>
                      <div class="reward-card-val heart-val" dir="ltr">
                        <span>+${heartsCount} محاولات</span>
                      </div>
                      <div class="reward-card-lbl">محاولات إضافية</div>
                    </div>
                  ` : ''}
                `;
              }

              openAnimatedChestModal(chestModal);
            }
          });
        });
      }

      /* =========================================================
         ✨ Modern Cinematic Chest Confetti & Opening Engine ✨
         ========================================================= */
      function launchChestConfetti(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const w = 380;
        const h = 320;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        const colors = ['#FFD700', '#FFA000', '#00D2FF', '#FF3366', '#00E676', '#FFFFFF', '#E040FB'];
        const particles = [];
        const count = 75;

        for (let i = 0; i < count; i++) {
          const angle = (Math.random() * Math.PI * 1.3) + Math.PI * 0.85;
          const speed = 4 + Math.random() * 8.5;
          particles.push({
            x: w / 2 + (Math.random() * 24 - 12),
            y: h / 2 + 10,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 4 + Math.random() * 6.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.3,
            gravity: 0.22,
            drag: 0.965,
            opacity: 1,
            decay: 0.009 + Math.random() * 0.012,
            shape: Math.random() > 0.35 ? 'rect' : 'circle'
          });
        }

        function animate() {
          ctx.clearRect(0, 0, w, h);
          let active = false;

          particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= p.drag;
            p.vy *= p.drag;
            p.rotation += p.rotSpeed;
            p.opacity = Math.max(0, p.opacity - p.decay);

            if (p.opacity > 0 && p.y < h + 30) {
              active = true;
              ctx.save();
              ctx.globalAlpha = p.opacity;
              ctx.fillStyle = p.color;
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);

              if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
              } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }
          });

          if (active) {
            requestAnimationFrame(animate);
          } else {
            ctx.clearRect(0, 0, w, h);
          }
        }
        requestAnimationFrame(animate);
      }

      function openAnimatedChestModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.remove('is-opened');
        modalEl.classList.remove('is-wobbling');
        modalEl.style.display = 'flex';

        // 1. Anticipation Wobble
        modalEl.classList.add('is-wobbling');

        // 2. Open Lid & Trigger Confetti Cannon after 620ms (matches physics wobble duration)
        setTimeout(() => {
          modalEl.classList.remove('is-wobbling');
          modalEl.classList.add('is-opened');

          if (game && game.sound && typeof game.sound.playVictory === 'function') {
            game.sound.playVictory();
          }

          const canvas = modalEl.querySelector('.chest-confetti-canvas');
          if (canvas) launchChestConfetti(canvas);
        }, 620);
      }

      async function renderSkillMap() {
        // 1. عرض فوري لحظي 0ms من البيانات المتاحة مسبقاً
        drawSkillMapDOM();

        // 2. جلب أحدث البيانات من السيرفر بالخلفية وتحديث الخريطة
        try {
          const uid = getAuthUserId();
          let changed = false;
          if (game.getCurriculum) {
            const freshCurr = await game.getCurriculum(true);
            if (freshCurr && freshCurr.units && freshCurr.units.length > 0) {
              activeCurriculum = freshCurr;
              changed = true;
            }
          }
          if (game.getLessonProgress) {
            const freshProg = await game.getLessonProgress(uid, true);
            if (freshProg) {
              activeLessonProgress = freshProg;
              changed = true;
            }
          }
          if (changed) {
            drawSkillMapDOM();
          }
        } catch(e){
          console.warn('renderSkillMap server sync error:', e);
        }
      }
      window.renderSkillMap = renderSkillMap;

      window.resetLearningPathUI = function() {
        activeLessonProgress = {};
        selectedLesson = null;
        selectedNextLessonId = null;
        currentActiveChestId = null;
        if (typeof drawSkillMapDOM === 'function') {
          drawSkillMapDOM();
        }
      };

      // تهيئة خريطة المسار فور تحميل الصفحة والسكريبت
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => renderSkillMap());
      } else {
        renderSkillMap();
      }

      window.openLessonDetails = function(lessonId) {
        let foundLesson = null;
        let foundUnit = null;

        if (!activeCurriculum || !activeCurriculum.units) return;

        const isPractice = String(lessonId).endsWith('_p');
        const isChallenge = String(lessonId).endsWith('_c');
        const baseLessonId = String(lessonId).replace(/_[pc]$/, '');

        // فحص ما إذا كان الدرس مكتملاً مسبقاً (وضع المراجعة)
        const isLessonDone = Boolean(activeLessonProgress && (
          (activeLessonProgress[String(lessonId)] && activeLessonProgress[String(lessonId)].status === 'completed') ||
          (baseLessonId && activeLessonProgress[baseLessonId] && activeLessonProgress[baseLessonId].status === 'completed')
        ));

        // التحقق من توفر قلب واحد على الأقل قبل فتح تفاصيل التمرين (إلا إذا كان مراجعة)
        const uid = getAuthUserId();
        const prog = (game.getProgressLocal ? game.getProgressLocal(uid) : null) || {};
        const currentHearts = Number(prog.hearts ?? 5);
        if (currentHearts < 1 && !isLessonDone) {
          if (game.sound) game.sound.playWrong();
          showToast('تحتاج إلى قلب واحد على الأقل لبدء التمارين!');
          handleOutOfHearts();
          return;
        }

        activeCurriculum.units.forEach(u => {
          (u.lessons || []).forEach(l => {
            if (String(l.id) === baseLessonId) {
              foundLesson = l;
              foundUnit = u;
            }
          });
        });

        if (!foundLesson) return;

        const lessonCopy = { ...foundLesson };
        const realChallenges = Array.isArray(foundLesson.challenges) ? [...foundLesson.challenges] : [];
        lessonCopy.id = lessonId;

        const calcChXp = (chs) => (chs || [])
          .filter(c => c.type !== 'text_view' && c.type !== 'letter_overview' && c.type !== 'word_overview' && c.type !== 'lesson_overview' && c.type !== 'image_view')
          .reduce((sum, c) => sum + ((c.xp_reward !== undefined && c.xp_reward !== null && !isNaN(parseInt(c.xp_reward, 10))) ? parseInt(c.xp_reward, 10) : 1), 0);

        if (isPractice) {
          lessonCopy.title = foundLesson.title || foundUnit.title;
          const pracChallenges = realChallenges.filter(c => c.type === 'listen' || c.type === 'listen_write' || c.type === 'read_select' || c.type === 'image_select' || c.type === 'match' || c.type === 'fill_blank' || c.audio_url || c.audio_text);
          lessonCopy.challenges = pracChallenges.length >= 2 ? pracChallenges : realChallenges;
          lessonCopy.xp_reward = calcChXp(lessonCopy.challenges);
        } else if (isChallenge) {
          lessonCopy.title = foundLesson.title || foundUnit.title;
          lessonCopy.challenges = realChallenges;
          lessonCopy.xp_reward = calcChXp(lessonCopy.challenges);
        } else {
          lessonCopy.title = foundLesson.title || foundUnit.title;
          lessonCopy.challenges = realChallenges;
          lessonCopy.xp_reward = calcChXp(lessonCopy.challenges);
        }

        selectedLesson = lessonCopy;
        selectedNextLessonId = null;

        const modalBadge = document.getElementById('modal-lesson-badge');
        const modalTitle = document.getElementById('modal-lesson-title');
        const modalDesc = document.getElementById('modal-lesson-desc');
        const modalXp = document.getElementById('modal-lesson-xp');
        const modalCount = document.getElementById('modal-lesson-count');
        const lessonModal = document.getElementById('lesson-modal');

        const isAlreadyDone = Boolean(activeLessonProgress && (
          (activeLessonProgress[String(lessonCopy.id)] && activeLessonProgress[String(lessonCopy.id)].status === 'completed') ||
          (baseLessonId && activeLessonProgress[baseLessonId] && activeLessonProgress[baseLessonId].status === 'completed')
        ));
        if (modalBadge) {
          let badgeText = '';
          const copticMatches = (lessonCopy.title || '').match(/[\u2C80-\u2CFF\u0370-\u03FF]+/g);
          if (copticMatches && copticMatches.length > 0) {
            badgeText = copticMatches[0];
          } else if (lessonCopy.challenges && lessonCopy.challenges[0] && lessonCopy.challenges[0].coptic_display) {
            badgeText = lessonCopy.challenges[0].coptic_display;
          }

          if (!badgeText) {
            badgeText = String(foundUnit.badge || 'Ⲁ').trim();
          }

          if (badgeText.startsWith('data:image/') || badgeText.startsWith('http://') || badgeText.startsWith('https://') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(badgeText)) {
            modalBadge.innerHTML = `<img src="${badgeText}" alt="شارة" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;" />`;
          } else if (isPractice || (lessonCopy.title || '').includes('مراجعة')) {
            modalBadge.innerHTML = `
              <svg viewBox="0 0 24 24" width="34" height="34" fill="#FFD700" stroke="#FFF7D6" stroke-width="1.2" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.3));">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            `;
          } else {
            let fontSize = '2.35rem';
            if (badgeText.length > 5) fontSize = '0.95rem';
            else if (badgeText.length > 3) fontSize = '1.15rem';
            else if (badgeText.length > 1) fontSize = '1.35rem';
            modalBadge.innerHTML = `<span class="coptic-big-glyph" style="font-size:${fontSize};font-weight:900;line-height:1;white-space:nowrap;display:flex;align-items:center;justify-content:center;direction:ltr;unicode-bidi:isolate;color:#FFFFFF;">${escapeHtml(badgeText)}</span>`;
          }
        }
        if (modalTitle) modalTitle.textContent = lessonCopy.title;
        if (modalDesc) {
          if (isPractice) {
            modalDesc.textContent = 'تمارين استماع وتطبيق ومطابقة لترسيخ نطق وحروف هذه الوحدة.';
          } else if (isChallenge) {
            modalDesc.textContent = 'تحدي شامل وسريع لاختبار مدى إتقانك لكافة حروف وكلمات هذه الوحدة.';
          } else {
            modalDesc.textContent = foundUnit.description ? `تدريبات وتمارين على: ${foundUnit.description}` : 'أجب عن الأسئلة بدقة لكسب النقاط وفتح المستوى التالي.';
          }
        }
        if (modalXp) modalXp.textContent = isAlreadyDone ? 'مراجعة (0 XP)' : `+${lessonCopy.xp_reward} XP`;
        const btnModalStart = document.getElementById('btn-modal-start');
        if (btnModalStart) btnModalStart.textContent = isAlreadyDone ? 'راجع الدرس' : 'يلا نبدأ الدرس';
        const count = lessonCopy.challenges.length;
        if (modalCount) {
          modalCount.textContent = count === 0 ? 'لا توجد تمارين بعد' : (count === 1 ? 'تمرين واحد' : (count === 2 ? 'تمرينان' : (count >= 3 && count <= 10 ? `${count} تمارين` : `${count} تمرين`)));
        }

        if (game.sound) game.sound.playClick();
        if (lessonModal) lessonModal.style.display = 'flex';
      };

      // ربط أزرار النوافذ المنبثقة
      document.addEventListener('DOMContentLoaded', () => {
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const lessonModal = document.getElementById('lesson-modal');
        const btnModalStart = document.getElementById('btn-modal-start');
        const modalChestCloseBtn = document.getElementById('modal-chest-close-btn');
        const chestModal = document.getElementById('chest-modal');
        const btnClaimChest = document.getElementById('btn-claim-chest');
        const runnerQuitBtn = document.getElementById('runner-quit-btn');
        const btnCheckAction = document.getElementById('btn-check-action');
        const btnVictoryContinue = document.getElementById('btn-victory-continue');
        const victoryModal = document.getElementById('victory-modal');

        if (modalCloseBtn && lessonModal) {
          modalCloseBtn.onclick = () => { lessonModal.style.display = 'none'; };
          lessonModal.onclick = (e) => { if (e.target === lessonModal) lessonModal.style.display = 'none'; };
        }

                /* Heart badge click disabled – no modal on tap */

        if (btnModalStart && lessonModal) {
          btnModalStart.onclick = async () => {
            if (!selectedLesson || !selectedLesson.challenges || selectedLesson.challenges.length === 0) {
              if (game.sound) game.sound.playWrong();
              showToast('هذا الدرس قيد الإعداد ولا يحتوي على تمارين حالياً.');
              return;
            }

            // فحص ما إذا كان الدرس مكتملاً مسبقاً (وضع المراجعة لا يشترط قلوباً)
            const baseLessonId = String(selectedLesson.id).replace(/_[pc]$/, '');
            const isLessonDone = Boolean(activeLessonProgress && (
              (activeLessonProgress[String(selectedLesson.id)] && activeLessonProgress[String(selectedLesson.id)].status === 'completed') ||
              (baseLessonId && activeLessonProgress[baseLessonId] && activeLessonProgress[baseLessonId].status === 'completed')
            ));

            const uid = getAuthUserId();
            let prog = {};
            if (game.getProgress) {
              prog = await game.getProgress(uid);
            } else if (game.getProgressLocal) {
              prog = game.getProgressLocal(uid) || {};
            }
            const hearts = Number(prog.hearts ?? 5);
            if (hearts < 1 && !isLessonDone) {
              lessonModal.style.display = 'none';
              currentRunnerHearts = 0;
              if (game.sound) game.sound.playWrong();
              showToast('تحتاج إلى قلب واحد على الأقل لبدء التمارين!');
              handleOutOfHearts();
              return;
            }
            lessonModal.style.display = 'none';
            startLessonRunner(selectedLesson);
          };
        }

        function closeChestModal() {
          if (!chestModal) return;
          chestModal.style.display = 'none';
          chestModal.classList.remove('is-opened', 'is-wobbling');
        }

        if (modalChestCloseBtn && chestModal) {
          modalChestCloseBtn.onclick = closeChestModal;
          chestModal.onclick = (e) => { if (e.target === chestModal) closeChestModal(); };
        }

        if (btnClaimChest && chestModal) {
          btnClaimChest.onclick = async () => {
            if (!currentActiveChestId || btnClaimChest.disabled) return;
            btnClaimChest.disabled = true;
            btnClaimChest.style.opacity = '0.6';
            btnClaimChest.style.pointerEvents = 'none';

            const chestId = currentActiveChestId;
            const uid = getAuthUserId();

            try {
              let claimed = false;
              if (game.claimChest) {
                claimed = await game.claimChest(uid, chestId);
              }

              closeChestModal();

              if (claimed) {
                const chestXp = (currentActiveChestData && currentActiveChestData.xp_reward) ? parseInt(currentActiveChestData.xp_reward, 10) : 30;
                if (typeof window.updateInstantXP === 'function' && chestXp > 0) {
                  window.updateInstantXP(chestXp);
                }
                showFloatingXpBadge(`+${chestXp || 30} XP  +1 قلب`);
                if (game.sound && typeof game.sound.playChestReward === 'function') {
                  game.sound.playChestReward();
                } else if (game.sound && typeof game.sound.playVictory === 'function') {
                  game.sound.playVictory();
                }

                await refreshStatsDisplay();
                renderSkillMap();
                showToast('مبروك! تم فتح صندوق الكنز بنجاح.');
              } else {
                await refreshStatsDisplay();
                renderSkillMap();
                showToast('هذا الصندوق مفتوح مسبقاً أو غير متاح حالياً.');
              }
            } catch (err) {
              console.warn('Error opening chest:', err);
              closeChestModal();
            } finally {
              btnClaimChest.disabled = false;
              btnClaimChest.style.opacity = '1';
              btnClaimChest.style.pointerEvents = 'auto';
              currentActiveChestId = null;
              currentActiveChestData = null;
            }
          };
        }

        if (runnerQuitBtn) {
          runnerQuitBtn.onclick = async () => {
            const confirmed = await mgConfirm('الخروج من الدرس', 'هل تريد التوقف والخروج إلى الخريطة؟<br>سيتم فقدان تقدمك في هذا الدرس الحالي.', 'warning', { confirmText: 'نعم، خروج', cancelText: 'متابعة' });
            if (confirmed) closeRunner();
          };
        }

        if (btnCheckAction) {
          btnCheckAction.onclick = async () => {
            if (btnCheckAction.disabled) return;
            const currentCh = currentChallenges[currentChallengeIndex];

            // للشاشات التمهيدية (نبذة الحرف ونبذة الكلمة)، انتقال فوري ومريح للدارس بنقرة واحدة بدون احتساب XP
            if (currentCh && (currentCh.type === 'letter_overview' || currentCh.type === 'word_overview' || currentCh.type === 'lesson_overview')) {
              if (currentRunnerHearts <= 0 && !isReplayingLesson) {
                handleOutOfHearts();
                return;
              }
              btnCheckAction.disabled = true;
              correctAnswersCount++;
              currentChallengeIndex++;
              loadChallenge(currentChallengeIndex);
              return;
            }

            if (currentRunnerHearts < 1 && !isReplayingLesson) {
              handleOutOfHearts();
              return;
            }

            if (runnerState === 'out_of_hearts') {
              runnerState = 'answering';
              loadChallenge(currentChallengeIndex);
              return;
            }

            try {
              if (runnerState === 'answering') {
                btnCheckAction.disabled = true;
                await evaluateAnswer();
              } else if (runnerState === 'checked') {
                if (currentRunnerHearts < 1 && !isReplayingLesson) {
                  handleOutOfHearts();
                  return;
                }
                btnCheckAction.disabled = true;
                currentChallengeIndex++;
                loadChallenge(currentChallengeIndex);
              }
            } catch (runnerErr) {
              console.error('Error during challenge check:', runnerErr);
              btnCheckAction.disabled = false;
              btnCheckAction.style.pointerEvents = 'auto';
            }
          };
        }

        if (btnVictoryContinue && victoryModal) {
          btnVictoryContinue.onclick = async () => {
            victoryModal.style.display = 'none';
            closeRunner();
            if (typeof window.invalidateMGCache === 'function') window.invalidateMGCache();
            if (typeof refreshStatsDisplay === 'function') await refreshStatsDisplay();
            if (typeof syncHomeLearningProgress === 'function') await syncHomeLearningProgress();
            await refreshStatsDisplay();
            const uid = getAuthUserId();
            if (game.getLessonProgress) activeLessonProgress = await game.getLessonProgress(uid);
            renderSkillMap();

            // فحص اكتمال جميع المستويات وإظهار رسالة المستويات القادمة
            try {
              if (typeof areAllLevelsCompleted === 'function' && areAllLevelsCompleted(activeCurriculum, activeLessonProgress)) {
                setTimeout(() => {
                  if (typeof window.showAllLevelsCompletedModal === 'function') {
                    window.showAllLevelsCompletedModal();
                  }
                }, 450);
              }
            } catch(e) {}
          };
        }
      });

      async function startLessonRunner(lesson) {
        window.startLessonRunner = startLessonRunner;
        const uid = getAuthUserId();

        // تحديث بيانات التقدم من أحدث نسخة محفوظة محلياً
        try {
          const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : 'mg_coptic_lesson_progress';
          const rawLP = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem('mg_coptic_lesson_progress');
          if (rawLP) {
            const parsed = JSON.parse(rawLP);
            if (parsed && typeof parsed === 'object') activeLessonProgress = parsed;
          }
        } catch(e) {}

        // فحص ما إذا كان المستوى قد تم إكماله مسبقاً (وضع الإعادة/المراجعة)
        const baseLId = String(lesson.id).replace(/_[pc]$/, '');
        const currentProg = (activeLessonProgress && (activeLessonProgress[String(lesson.id)] || activeLessonProgress[baseLId])) || {};
        isReplayingLesson = Boolean(currentProg.status === 'completed');

        let prog = {};
        if (game.getProgress) {
          prog = await game.getProgress(uid);
        } else if (game.getProgressLocal) {
          prog = game.getProgressLocal(uid) || {};
        }
        currentRunnerHearts = Number(prog.hearts ?? 5);

        if (currentRunnerHearts < 1 && !isReplayingLesson) {
          closeRunner();
          if (game.sound) game.sound.playWrong();
          showToast('تحتاج إلى قلب واحد على الأقل لبدء التمارين!');
          handleOutOfHearts();
          return;
        }

        currentChallenges = [...(lesson.challenges || [])];
        if (currentChallenges.length === 0) {
          mgAlert('لا توجد تمارين', 'لا توجد تمارين مسجلة لهذا الدرس حالياً.', 'info');
          return;
        }

        // تحضير النبذات التمهيدية التفصيلية والاحترافية لكافة الدروس (المستوى الأول والثاني والمراجعات)
        try {
          const firstCh = currentChallenges[0];
          let expandedLetter = false;
          if (firstCh && (firstCh.type === 'text_view' || firstCh.type === 'letter_overview') && typeof window.findLetterCatalogItem === 'function') {
            const item = window.findLetterCatalogItem(firstCh);
            if (item && item.word && item.word.coptic) {
              const letterCh = {
                ...firstCh,
                id: `${firstCh.id || 'intro'}_letter`,
                type: 'letter_overview',
                overview_item: item,
                question: `نبذة عن حرف ${item.name} (${item.pair || item.upper})`,
                audio_url: item.soundFile || firstCh.audio_url,
                audio_text: item.name, xp_reward: 0, xp: 0
              };
              const wordCh = {
                ...firstCh,
                id: `${firstCh.id || 'intro'}_word`,
                type: 'word_overview',
                overview_item: item,
                question: `نبذة عن الكلمة التطبيقية على حرف ${item.name}`,
                audio_url: item.word.soundFile || item.word.audioFile || '',
                audio_text: item.word.phoneticAr || item.word.meaning,
                xp_reward: 0
              };
              currentChallenges = [letterCh, wordCh, ...currentChallenges.slice(1)];
              expandedLetter = true;
            }
          }

          // إذا لم يكن حرفاً تمهيدياً (دروس المراجعات أو المستوى الثاني)، فحص وجود نبذة في كتالوج النبذات الشامل
          if (!expandedLetter && typeof window.getLessonOverviewData === 'function') {
            const ovData = window.getLessonOverviewData(lesson.id);
            if (ovData) {
              const overviewCh = {
                id: `intro_lesson_${lesson.id}`,
                lesson_id: lesson.id,
                type: 'lesson_overview',
                overview_data: ovData,
                question: ovData.headerTitle || lesson.title,
                audio_url: ovData.audioFile || '',
                audio_text: ovData.audioText || lesson.title,
                xp_reward: 0,
                xp: 0
              };
              if (currentChallenges[0] && currentChallenges[0].type === 'text_view') {
                currentChallenges = [overviewCh, ...currentChallenges.slice(1)];
              } else if (currentChallenges[0] && currentChallenges[0].type !== 'lesson_overview') {
                currentChallenges = [overviewCh, ...currentChallenges];
              }
            }
          }
        } catch (e) {
          console.warn('Error expanding letter/lesson overview:', e);
        }

        // تهيئة قائمة التمارين المُجاب عليها للجلسة الحالية
        sessionAnsweredChallenges = new Set();

        initialChallengesCount = currentChallenges.length;
        currentChallengeIndex = 0;
        correctAnswersCount = 0;
        sessionXpEarned = 0;
        runnerState = 'answering';

        const runnerOverlay = document.getElementById('challenge-runner-overlay');
        if (runnerOverlay) runnerOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        refreshStatsDisplay();
        loadChallenge(currentChallengeIndex);
      }

      function closeRunner() {
        if (typeof cleanupTraceOrientationListener === 'function') {
          cleanupTraceOrientationListener();
        }
        if (window.activeRunnerTracer) {
          try { window.activeRunnerTracer.destroy(); } catch (_) {}
          window.activeRunnerTracer = null;
        }
        const runnerOverlay = document.getElementById('challenge-runner-overlay');
        if (runnerOverlay) {
          runnerOverlay.style.display = 'none';
          runnerOverlay.classList.remove('trace-fullscreen-active');
        }
        const feedbackBox = document.getElementById('feedback-msg-box');
        if (feedbackBox) {
          feedbackBox.style.display = 'none';
          feedbackBox.className = 'feedback-msg';
        }
        document.body.style.overflow = 'auto';
        refreshStatsDisplay();
        renderSkillMap();
        if (typeof clearActiveBriefTimer === 'function') {
          clearActiveBriefTimer();
        }
      }

      // ==========================================================================
      // READING BRIEF COUNTDOWN TIMER CONTROLLER
      // ==========================================================================
      let activeBriefTimerInterval = null;
      let briefTimerRemaining = 15;
      let briefTimerTotal = 15;
      let isBriefTimerPaused = false;

      function isBriefTimerEnabled() {
        try {
          return localStorage.getItem('mg_coptic_brief_timer_enabled') !== 'false';
        } catch (_) {
          return true;
        }
      }

      function getBriefTimerDuration() {
        try {
          const val = parseInt(localStorage.getItem('mg_coptic_brief_timer_duration'), 10);
          return (val && val >= 3 && val <= 180) ? val : 15;
        } catch (_) {
          return 15;
        }
      }

      function handleBriefTimerToggleChange(enabled) {
        try {
          localStorage.setItem('mg_coptic_brief_timer_enabled', enabled ? 'true' : 'false');
        } catch (_) {}
        const durBlock = document.getElementById('settings-timer-duration-block');
        if (durBlock) {
          if (enabled) durBlock.classList.remove('disabled');
          else durBlock.classList.add('disabled');
        }
        if (typeof showToast === 'function') {
          showToast(enabled ? 'تم تفعيل مؤقت القراءة قبل التمارين' : 'تم إيقاف مؤقت القراءة قبل التمارين');
        }
      }

      const BRIEF_TIMER_PRESETS = [5, 15, 30, 45, 60];

      function secondsToSliderIndex(seconds) {
        seconds = parseInt(seconds, 10) || 15;
        const idx = BRIEF_TIMER_PRESETS.indexOf(seconds);
        if (idx !== -1) return idx;
        if (seconds <= 5) return 0;
        if (seconds <= 15) return 0 + (seconds - 5) / 10;
        if (seconds <= 30) return 1 + (seconds - 15) / 15;
        if (seconds <= 45) return 2 + (seconds - 30) / 15;
        if (seconds <= 60) return 3 + (seconds - 45) / 15;
        return 4;
      }

      function handleTimerSliderInput(sliderVal) {
        const val = parseFloat(sliderVal);
        const roundedIdx = Math.max(0, Math.min(4, Math.round(val)));
        const seconds = BRIEF_TIMER_PRESETS[roundedIdx];
        
        const rangeInput = document.getElementById('settings-timer-range');
        if (rangeInput) rangeInput.value = roundedIdx;

        setBriefTimerDuration(seconds, false);
      }
      window.handleTimerSliderInput = handleTimerSliderInput;

      function stepBriefTimerDuration(delta) {
        const customInput = document.getElementById('settings-timer-custom-input');
        let current = parseInt(customInput ? customInput.value : getBriefTimerDuration(), 10) || 15;
        current = Math.max(3, Math.min(180, current + delta));
        setBriefTimerDuration(current);
      }

      function handleCustomDurationInput(val) {
        let num = parseInt(val, 10);
        if (!num || isNaN(num)) return;
        num = Math.max(3, Math.min(180, num));
        setBriefTimerDuration(num);
      }

      function setBriefTimerDuration(seconds, updateSlider = true) {
        seconds = parseInt(seconds, 10) || 15;
        seconds = Math.max(3, Math.min(180, seconds));

        try {
          localStorage.setItem('mg_coptic_brief_timer_duration', String(seconds));
        } catch (_) {}

        const display = document.getElementById('settings-timer-duration-display');
        if (display) {
          display.textContent = `${seconds} ثانية`;
        }

        const customInput = document.getElementById('settings-timer-custom-input');
        if (customInput && parseInt(customInput.value, 10) !== seconds) {
          customInput.value = seconds;
        }

        const rangeInput = document.getElementById('settings-timer-range');
        if (rangeInput && updateSlider) {
          rangeInput.value = secondsToSliderIndex(seconds);
        }

        // تحديث حالة الأزرار والنقاط النشطة لربط المؤشر بالعلامة مباشرة
        document.querySelectorAll('.settings-tick-btn').forEach(btn => {
          const p = parseFloat(btn.style.getPropertyValue('--p'));
          const idx = Math.round(p * 4);
          const presetSec = BRIEF_TIMER_PRESETS[idx];
          btn.classList.toggle('active', presetSec === seconds);
        });

        document.querySelectorAll('.slider-dot').forEach(dot => {
          const p = parseFloat(dot.style.getPropertyValue('--p'));
          const idx = Math.round(p * 4);
          const presetSec = BRIEF_TIMER_PRESETS[idx];
          dot.classList.toggle('active', presetSec === seconds);
        });

        document.querySelectorAll('.duration-chip-btn').forEach(btn => {
          const btnSec = parseInt(btn.getAttribute('data-sec'), 10);
          btn.classList.toggle('active', btnSec === seconds);
        });

        if (typeof showToast === 'function') {
          showToast(`تم ضبط مدة مؤقت القراءة على ${seconds} ثانية`);
        }
      }

      function initBriefTimerSettingsUI() {
        const toggle = document.getElementById('settings-timer-toggle');
        const durBlock = document.getElementById('settings-timer-duration-block');
        const customInput = document.getElementById('settings-timer-custom-input');
        const rangeInput = document.getElementById('settings-timer-range');
        const display = document.getElementById('settings-timer-duration-display');
        const isEnabled = isBriefTimerEnabled();
        const duration = getBriefTimerDuration();

        if (toggle) toggle.checked = isEnabled;
        if (durBlock) {
          if (isEnabled) durBlock.classList.remove('disabled');
          else durBlock.classList.add('disabled');
        }
        if (display) {
          display.textContent = `${duration} ثانية`;
        }
        if (customInput) {
          customInput.value = duration;
        }
        if (rangeInput) {
          rangeInput.value = secondsToSliderIndex(duration);
        }

        document.querySelectorAll('.settings-tick-btn').forEach(btn => {
          const p = parseFloat(btn.style.getPropertyValue('--p'));
          const idx = Math.round(p * 4);
          const presetSec = BRIEF_TIMER_PRESETS[idx];
          btn.classList.toggle('active', presetSec === duration);
        });

        document.querySelectorAll('.slider-dot').forEach(dot => {
          const p = parseFloat(dot.style.getPropertyValue('--p'));
          const idx = Math.round(p * 4);
          const presetSec = BRIEF_TIMER_PRESETS[idx];
          dot.classList.toggle('active', presetSec === duration);
        });

        document.querySelectorAll('.duration-chip-btn').forEach(btn => {
          const btnSec = parseInt(btn.getAttribute('data-sec'), 10);
          btn.classList.toggle('active', btnSec === duration);
        });
      }

      function clearActiveBriefTimer() {
        if (activeBriefTimerInterval) {
          clearInterval(activeBriefTimerInterval);
          activeBriefTimerInterval = null;
        }
        isBriefTimerPaused = false;
      }

      function renderBriefTimerWidgetHtml(initialSeconds) {
        return `
          <div class="brief-timer-widget" id="brief-timer-widget">
            <div class="brief-timer-header-row">
              <div class="brief-timer-badge">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span>نبذة تمهيدية</span>
              </div>
              <div class="brief-timer-status" id="brief-timer-status">
                <span class="brief-timer-status-dot" id="brief-timer-status-dot"></span>
                <span id="brief-timer-status-text">وقت القراءة</span>
              </div>
            </div>

            <div class="brief-timer-main">
              <div class="brief-timer-info-col">
                <div class="brief-timer-title">
                  <span>تمهّل لفهم القاعدة ونطق الحرف</span>
                </div>
                <div class="brief-timer-desc">
                  راجع النطق والقاعدة جيداً قبل بدء التمارين
                </div>
              </div>

              <div class="brief-timer-circular-wrap">
                <svg class="brief-timer-svg" viewBox="0 0 80 80" width="60" height="60" style="width:60px;height:60px;transform:rotate(-90deg);display:block;">
                  <circle class="brief-timer-bg-circle" cx="40" cy="40" r="34" fill="none" stroke="#EADBCE" stroke-width="6"></circle>
                  <circle class="brief-timer-progress-circle" id="brief-timer-progress-circle" cx="40" cy="40" r="34" fill="none" stroke="#B8892E" stroke-width="6" stroke-linecap="round" stroke-dasharray="213.628" stroke-dashoffset="0" style="transition:stroke-dashoffset 0.85s linear, stroke 0.3s ease;"></circle>
                </svg>
                <div class="brief-timer-center">
                  <span class="brief-timer-num" id="brief-timer-seconds">${initialSeconds}</span>
                  <span class="brief-timer-unit">ثانية</span>
                </div>
              </div>
            </div>

            <div class="brief-timer-controls">
              <button type="button" class="btn-brief-ctrl pause" id="btn-brief-pause" onclick="window.toggleBriefTimerPause && window.toggleBriefTimerPause()" title="إيقاف مؤقت للقراءة">
                <svg id="brief-pause-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                <span id="brief-pause-text">إيقاف مؤقت</span>
              </button>
              <button type="button" class="btn-brief-ctrl skip" id="btn-brief-skip" onclick="window.skipBriefTimer && window.skipBriefTimer()" title="تخطي الوقت والبدء فوراً">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
                <span>تخطي والبدء</span>
              </button>
            </div>
          </div>
        `;
      }

      function updateBriefTimerUI(remaining, total) {
        const secEl = document.getElementById('brief-timer-seconds');
        const circleEl = document.getElementById('brief-timer-progress-circle');
        if (secEl) {
          secEl.textContent = String(remaining);
          if (remaining <= 3) {
            secEl.classList.add('ending');
          } else {
            secEl.classList.remove('ending');
          }
        }
        if (circleEl) {
          const circumference = 213.628;
          const fraction = Math.max(0, remaining) / Math.max(1, total);
          const offset = circumference * (1 - fraction);
          circleEl.style.strokeDashoffset = String(offset);
          if (remaining <= 3) {
            circleEl.style.stroke = '#DC2626';
          } else if (remaining <= Math.ceil(total / 2)) {
            circleEl.style.stroke = '#EAB308';
          } else {
            circleEl.style.stroke = '#B8892E';
          }
        }
      }

      function toggleBriefTimerPause() {
        if (!activeBriefTimerInterval) return;
        isBriefTimerPaused = !isBriefTimerPaused;
        const pauseBtn = document.getElementById('btn-brief-pause');
        const pauseIcon = document.getElementById('brief-pause-icon');
        const pauseText = document.getElementById('brief-pause-text');
        const dot = document.getElementById('brief-timer-status-dot');
        const statusText = document.getElementById('brief-timer-status-text');
        const btnCheck = document.getElementById('btn-check-action');

        if (isBriefTimerPaused) {
          if (pauseText) pauseText.textContent = 'استئناف';
          if (pauseIcon) {
            pauseIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>';
          }
          if (dot) {
            dot.classList.add('paused');
            dot.classList.remove('done');
          }
          if (statusText) statusText.textContent = 'المؤقت موقوف';
          if (pauseBtn) pauseBtn.style.background = 'rgba(245, 158, 11, 0.18)';
          if (btnCheck && btnCheck.disabled) {
            btnCheck.textContent = `قراءة النبذة (موقوف ${briefTimerRemaining} ث)`;
          }
        } else {
          if (pauseText) pauseText.textContent = 'إيقاف مؤقت';
          if (pauseIcon) {
            pauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
          }
          if (dot) {
            dot.classList.remove('paused');
          }
          if (statusText) statusText.textContent = 'وقت القراءة';
          if (pauseBtn) pauseBtn.style.background = '';
          if (btnCheck && btnCheck.disabled) {
            btnCheck.textContent = `قراءة النبذة (${briefTimerRemaining} ث)`;
          }
        }
      }

      function skipBriefTimer() {
        clearActiveBriefTimer();
        const btnCheck = document.getElementById('btn-check-action');
        onBriefTimerComplete(btnCheck, true);
      }

      function onBriefTimerComplete(btnCheck, isSkip = false) {
        const secEl = document.getElementById('brief-timer-seconds');
        const circleEl = document.getElementById('brief-timer-progress-circle');
        const dot = document.getElementById('brief-timer-status-dot');
        const statusText = document.getElementById('brief-timer-status-text');
        const pauseBtn = document.getElementById('btn-brief-pause');
        const skipBtn = document.getElementById('btn-brief-skip');

        if (secEl) {
          secEl.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
          secEl.classList.remove('ending');
        }
        if (circleEl) {
          circleEl.style.strokeDashoffset = '0';
          circleEl.style.stroke = '#059669';
        }
        if (dot) {
          dot.className = 'brief-timer-status-dot done';
        }
        if (statusText) {
          statusText.textContent = isSkip ? 'تم التخطي ✓' : 'اكتمل وقت القراءة ✓';
          statusText.style.color = '#059669';
          statusText.style.fontWeight = '800';
        }
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (skipBtn) skipBtn.style.display = 'none';

        if (btnCheck) {
          btnCheck.disabled = false;
          const orig = btnCheck.getAttribute('data-original-text');
          if (orig) btnCheck.textContent = orig;
          btnCheck.classList.add('ready');
          btnCheck.style.animation = 'briefFadeIn 0.4s ease-out';
        }

        try {
          if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(40);
          }
        } catch (_) {}

        if (isSkip && btnCheck) {
          setTimeout(() => {
            try { btnCheck.click(); } catch (_) {}
          }, 80);
        }
      }

      function startBriefTimerForChallenge(ch, btnCheck) {
        clearActiveBriefTimer();

        const mount = document.getElementById('brief-timer-mount');
        if (!mount) {
          if (btnCheck) {
            btnCheck.disabled = false;
            btnCheck.classList.add('ready');
          }
          return;
        }

        if (!isBriefTimerEnabled()) {
          mount.innerHTML = '';
          if (btnCheck) {
            btnCheck.disabled = false;
            btnCheck.classList.add('ready');
          }
          return;
        }

        const duration = getBriefTimerDuration();
        briefTimerRemaining = duration;
        briefTimerTotal = duration;
        isBriefTimerPaused = false;

        mount.innerHTML = renderBriefTimerWidgetHtml(duration);

        if (btnCheck) {
          btnCheck.disabled = true;
          btnCheck.classList.remove('ready');
          const originalText = (ch.type === 'letter_overview') ? 'التالي: نبذة عن الكلمة ←' : ((ch.type === 'word_overview' || ch.type === 'lesson_overview') ? 'ابدأ التمارين ←' : 'فهمت ومتابعة');
          btnCheck.setAttribute('data-original-text', originalText);
          btnCheck.textContent = `قراءة النبذة (${briefTimerRemaining} ث)`;
        }

        updateBriefTimerUI(briefTimerRemaining, briefTimerTotal);

        activeBriefTimerInterval = setInterval(() => {
          if (isBriefTimerPaused) return;

          briefTimerRemaining--;

          if (briefTimerRemaining <= 0) {
            clearActiveBriefTimer();
            onBriefTimerComplete(btnCheck, false);
          } else {
            updateBriefTimerUI(briefTimerRemaining, briefTimerTotal);
            if (btnCheck && btnCheck.disabled) {
              btnCheck.textContent = `قراءة النبذة (${briefTimerRemaining} ث)`;
            }
          }
        }, 1000);
      }

      window.isBriefTimerEnabled = isBriefTimerEnabled;
      window.getBriefTimerDuration = getBriefTimerDuration;
      window.handleBriefTimerToggleChange = handleBriefTimerToggleChange;
      window.handleTimerSliderInput = handleTimerSliderInput;
      window.setBriefTimerDuration = setBriefTimerDuration;
      window.toggleCustomDurationPanel = function() {};
      window.stepBriefTimerDuration = stepBriefTimerDuration;
      window.handleCustomDurationInput = handleCustomDurationInput;
      window.initBriefTimerSettingsUI = initBriefTimerSettingsUI;
      window.toggleBriefTimerPause = toggleBriefTimerPause;
      window.skipBriefTimer = skipBriefTimer;
      window.clearActiveBriefTimer = clearActiveBriefTimer;
      window.startBriefTimerForChallenge = startBriefTimerForChallenge;
      try { initBriefTimerSettingsUI(); } catch (_) {}

      function skipDirectlyToExercises() {
        if (typeof clearActiveBriefTimer === 'function') {
          clearActiveBriefTimer();
        }
        if (!Array.isArray(currentChallenges) || currentChallenges.length === 0) return;
        const firstExerciseIdx = currentChallenges.findIndex(c => c && c.type !== 'letter_overview' && c.type !== 'word_overview' && c.type !== 'lesson_overview' && c.type !== 'text_view' && c.type !== 'image_view');
        if (firstExerciseIdx !== -1 && firstExerciseIdx > currentChallengeIndex) {
          currentChallengeIndex = firstExerciseIdx;
          loadChallenge(currentChallengeIndex);
        } else if (currentChallengeIndex < currentChallenges.length - 1) {
          currentChallengeIndex++;
          loadChallenge(currentChallengeIndex);
        }
      }
      window.skipDirectlyToExercises = skipDirectlyToExercises;

      function loadChallenge(index) {
        if (typeof clearActiveBriefTimer === 'function') {
          clearActiveBriefTimer();
        }
        if (typeof cleanupTraceOrientationListener === 'function') {
          cleanupTraceOrientationListener();
        }
        if (window.activeRunnerTracer) {
          try { window.activeRunnerTracer.destroy(); } catch (_) {}
          window.activeRunnerTracer = null;
        }
        if (currentRunnerHearts < 1 && !isReplayingLesson) {
          handleOutOfHearts();
          return;
        }
        if (!Array.isArray(currentChallenges) || currentChallenges.length === 0) {
          mgAlert('لا توجد تمارين', 'لا توجد تمارين مسجلة لهذا الدرس حالياً.', 'info');
          closeRunner();
          return;
        }
        if (index >= currentChallenges.length) {
          finishLessonSuccess();
          return;
        }

        const ch = currentChallenges[index];
        if (!ch) {
          console.warn('Challenge at index', index, 'is invalid or missing.');
          if (index < currentChallenges.length - 1) {
            currentChallengeIndex++;
            loadChallenge(currentChallengeIndex);
            return;
          } else {
            finishLessonSuccess();
            return;
          }
        }

        runnerState = 'answering';
        currentSelection = null;
        const btnCheck = document.getElementById('btn-check-action');
        const feedbackBox = document.getElementById('feedback-msg-box');
        const runnerProgress = document.getElementById('runner-progress-fill');

        if (btnCheck) {
          btnCheck.disabled = true;
          btnCheck.textContent = 'تحقق';
          btnCheck.className = 'btn-check-answer';
          btnCheck.style.pointerEvents = 'auto';
        }
        if (feedbackBox) {
          feedbackBox.style.display = 'none';
          feedbackBox.className = 'feedback-msg';
          const fbIcon = document.getElementById('feedback-icon');
          const fbText = document.getElementById('feedback-text');
          if (fbIcon) fbIcon.innerHTML = '';
          if (fbText) fbText.textContent = '';
        }

        const percent = Math.min(100, Math.round((correctAnswersCount / Math.max(1, initialChallengesCount)) * 100));
        if (runnerProgress) runnerProgress.style.width = percent + '%';

        try {
          renderChallengeContent(ch);
        } catch (renderErr) {
          console.error('Error rendering challenge at index', index, renderErr, ch);
          const runnerBody = document.getElementById('runner-body-content');
          if (runnerBody) {
            runnerBody.innerHTML = `
              <div style="text-align:center; padding:30px 16px; max-width:440px; margin:0 auto;">
                <p style="font-weight:700; color:#3A271B; margin-bottom:16px;">تعذر تحميل هذا السؤال. اضغط للمتابعة إلى السؤال التالي:</p>
                <button type="button" class="btn-check-answer ready" style="margin:0 auto; display:block;" onclick="currentChallengeIndex++; loadChallenge(currentChallengeIndex);">السؤال التالي ←</button>
              </div>
            `;
          }
        }

        if (ch && (ch.type === 'image_view' || ch.type === 'text_view' || ch.type === 'letter_overview' || ch.type === 'word_overview' || ch.type === 'lesson_overview') && btnCheck) {
          if (ch.type === 'letter_overview') {
            btnCheck.textContent = 'التالي: نبذة عن الكلمة ←';
          } else if (ch.type === 'word_overview' || ch.type === 'lesson_overview') {
            btnCheck.textContent = 'ابدأ التمارين ←';
          } else {
            btnCheck.textContent = 'فهمت ومتابعة';
          }

          if (ch.type === 'letter_overview' || ch.type === 'word_overview' || ch.type === 'lesson_overview') {
            startBriefTimerForChallenge(ch, btnCheck);
          } else {
            btnCheck.disabled = false;
            btnCheck.classList.add('ready');
          }
        }
      }

      function renderChallengeContent(ch) {
        const runnerBody = document.getElementById('runner-body-content');
        if (!runnerBody) return;

        if (!ch) {
          runnerBody.innerHTML = `
            <div style="text-align:center; padding:30px 16px;">
              <p style="font-weight:700; color:#3A271B; margin-bottom:14px;">التمرين غير متوفر</p>
              <button type="button" class="btn-check-answer ready" onclick="currentChallengeIndex++; loadChallenge(currentChallengeIndex);">التالي ←</button>
            </div>
          `;
          return;
        }

        // خلط الخيارات عشوائياً للمتعلم (Fisher-Yates Shuffle)
        if (Array.isArray(ch.options) && ch.options.length > 1) {
          if (!ch._shuffledOptions) {
            const shuffled = [...ch.options];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            ch._shuffledOptions = shuffled;
          }
        }
        const activeOptions = ch._shuffledOptions || ch.options || [];
        let html = '';

        if (ch.type === 'letter_overview') {
          if (typeof window.renderLetterOnlyCardHtml === 'function') {
            html += window.renderLetterOnlyCardHtml(ch);
          } else if (typeof window.renderLetterOverviewCardHtml === 'function') {
            html += window.renderLetterOverviewCardHtml(ch);
          }
        } else if (ch.type === 'word_overview') {
          if (typeof window.renderWordOnlyCardHtml === 'function') {
            html += window.renderWordOnlyCardHtml(ch);
          } else if (typeof window.renderLetterOverviewCardHtml === 'function') {
            html += window.renderLetterOverviewCardHtml(ch);
          }
        } else if (ch.type === 'lesson_overview') {
          if (typeof window.renderComprehensiveLessonOverviewHtml === 'function') {
            html += window.renderComprehensiveLessonOverviewHtml(ch, selectedLesson);
          } else if (typeof window.renderLetterOverviewCardHtml === 'function') {
            html += window.renderLetterOverviewCardHtml(ch);
          }
        } else if (ch.type === 'image_view') {
          html += `
            <div class="question-heading">${escapeHtml(ch.question || 'انظر إلى الصورة وتأملها')}</div>
            ${ch.image_url ? `
              <div class="challenge-image-container">
                <div class="challenge-image-card" onclick="window.openImageZoomModal ? window.openImageZoomModal('${(ch.image_url || '').replace(/'/g, "\\'")}', '${(ch.question || '').replace(/'/g, "\\'")}') : null" title="انقر لتكبير الصورة">
                  <img src="${escapeHtml(ch.image_url)}" alt="صورة توضيحية" class="challenge-image-tag" loading="lazy" />
                  <div class="challenge-image-zoom-badge">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span>تكبير الصورة</span>
                  </div>
                </div>
              </div>
            ` : ''}
            ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
              <div class="coptic-letter-display">
                ${ch.coptic_display ? `<span class="coptic-big-glyph">${escapeHtml(ch.coptic_display)}</span>` : ''}
                ${(ch.audio_text || ch.audio_url) ? `
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this)">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
            ` : ''}
            ${ch.explanation ? `
              <div class="challenge-explanation-card" style="background:#FFFDF7; border:1.5px solid #E4D5BC; border-radius:14px; padding:14px 18px; margin:14px auto 0; max-width:540px; text-align:center; color:#4A3525; font-size:1.02rem; line-height:1.6; font-weight:600; box-shadow:0 3px 12px rgba(0,0,0,0.04);">
                ${escapeHtml(ch.explanation)}
              </div>
            ` : ''}
          `;
        } else if (ch.type === 'text_view') {
          if (typeof window.renderComprehensiveLessonOverviewHtml === 'function' && window.getLessonOverviewData && window.getLessonOverviewData(selectedLesson?.id || ch.lesson_id)) {
            html += window.renderComprehensiveLessonOverviewHtml(ch, selectedLesson);
          } else if (typeof window.renderLetterOverviewCardHtml === 'function') {
            html += window.renderLetterOverviewCardHtml(ch);
          } else {
            html += `
              <div class="question-heading">${escapeHtml(ch.question || 'شرح وقراءة (تأمّل وتعلّم)')}</div>
              ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
                <div class="coptic-letter-display">
                  ${ch.coptic_display ? `<span class="coptic-big-glyph">${escapeHtml(ch.coptic_display)}</span>` : ''}
                  ${(ch.audio_text || ch.audio_url) ? `
                    <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio ? window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this) : null">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                      </svg>
                    </button>
                  ` : ''}
                </div>
              ` : ''}
              ${(ch.explanation || ch.correct_word) ? `
                <div class="challenge-text-view-card" style="background:linear-gradient(180deg, #FFFCF5 0%, #FAF4E8 100%); border:2px solid #E2D3BE; border-radius:18px; padding:20px 22px; margin:16px auto 0; max-width:580px; text-align:right; color:#3A271B; font-size:1.08rem; line-height:1.85; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.05); white-space:pre-line;">
                  <div>${escapeHtml(ch.explanation || ch.correct_word)}</div>
                </div>
              ` : ''}
            `;
          }
        } else if (ch.type === 'listen_write') {
          html += `
            <div class="question-heading">${ch.question || 'استمع جيداً ثم اكتب الحرف أو الكلمة القبطية'}</div>
            <div class="coptic-letter-display">
              <button type="button" class="audio-icon-btn listen-pulse" style="width:78px;height:78px;border-radius:50%;margin:12px auto 6px;" aria-label="استمع للصوت" title="استمع للصوت" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.correct_word || ch.coptic_display || 'حرف قبطي'}', this)">
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </button>
            </div>
            <div class="listen-write-container" style="max-width:440px; margin:16px auto; display:flex; flex-direction:column; gap:12px; width:100%; box-sizing:border-box;">
              <div style="position:relative; width:100%;">
                <input type="text" id="listen-write-user-input" class="coptic-input listen-write-input" data-coptic-keyboard placeholder="اكتب بالقبطية هنا..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                <button type="button" onclick="const inp=document.getElementById('listen-write-user-input'); if(inp && inp.value){ inp.value=inp.value.slice(0,-1); inp.dispatchEvent(new Event('input', {bubbles:true})); }" title="مسح آخر حرف" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); border:none; background:transparent; cursor:pointer; color:#888; padding:6px; display:flex; align-items:center; justify-content:center;">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
                </button>
              </div>
              <div style="display:flex; justify-content:center; align-items:center; gap:8px;">
                <button type="button" class="keyboard-toggle-btn" onclick="const inp=document.getElementById('listen-write-user-input'); if(inp){ inp.focus(); if(window.CopticKeyboard) window.CopticKeyboard.open(inp); }" style="background:#FAF6EE; border:1.5px solid #D6C8B2; color:#6F1737; border-radius:20px; padding:6px 14px; font-size:0.85rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="8" x2="6" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="14" y1="8" x2="14" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="14" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
                  <span>لوحة المفاتيح القبطية</span>
                </button>
              </div>
            </div>
          `;
        } else if (ch.type === 'image_select') {
          html += `
            <div class="question-heading">${ch.question || 'انظر إلى الصورة ثم اختر الإجابة الصحيحة'}</div>
            ${ch.image_url ? `
              <div class="challenge-image-container">
                <div class="challenge-image-card" onclick="window.openImageZoomModal ? window.openImageZoomModal('${(ch.image_url || '').replace(/'/g, "\\'")}', '${(ch.question || '').replace(/'/g, "\\'")}') : null" title="انقر لتكبير الصورة">
                  <img src="${escapeHtml(ch.image_url)}" alt="صورة السؤال" class="challenge-image-tag" loading="lazy" />
                  <div class="challenge-image-zoom-badge">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span>تكبير الصورة</span>
                  </div>
                </div>
              </div>
            ` : ''}
            ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
              <div class="coptic-letter-display">
                ${ch.coptic_display ? `<span class="coptic-big-glyph">${ch.coptic_display}</span>` : ''}
                ${(ch.audio_text || ch.audio_url) ? `
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this)">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
            ` : ''}
            <div class="options-grid">
              ${activeOptions.map((opt, i) => {
                const letters = ['أ', 'ب', 'ج', 'د'];
                return `
                  <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                    <span class="option-badge">${letters[i] || (i + 1)}</span>
                    <span class="option-label-text">${escapeHtml(opt.text)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        } else if (ch.type === 'read_select') {
          html += `
            <div class="question-heading">${ch.question || 'اقرأ الحرف/الكلمة ثم اختر النطق الصحيح'}</div>
            ${ch.image_url ? `
              <div class="challenge-image-container">
                <div class="challenge-image-card" onclick="window.openImageZoomModal ? window.openImageZoomModal('${(ch.image_url || '').replace(/'/g, "\\'")}', '${(ch.question || '').replace(/'/g, "\\'")}') : null" title="انقر لتكبير الصورة">
                  <img src="${escapeHtml(ch.image_url)}" alt="صورة السؤال" class="challenge-image-tag" loading="lazy" />
                  <div class="challenge-image-zoom-badge">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span>تكبير الصورة</span>
                  </div>
                </div>
              </div>
            ` : ''}
            <div class="coptic-letter-display">
              ${ch.coptic_display ? `<span class="coptic-big-glyph" style="font-size:3.6rem; line-height:1.2; font-weight:800;">${ch.coptic_display}</span>` : ''}
              ${(ch.audio_text || ch.audio_url) ? `
                <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this)">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                </button>
              ` : ''}
            </div>
            <div class="options-grid">
              ${activeOptions.map((opt, i) => {
                const optText = (typeof window.formatPronunciationOption === 'function') 
                  ? window.formatPronunciationOption(opt.text) 
                  : (opt.text ? opt.text.replace(/\s*\([A-Za-zŌō\s+-]+\)/g, '').replace(/[A-Za-zŌō]/g, '').trim() : '');
                const letters = ['أ', 'ب', 'ج', 'د'];
                return `
                  <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                    <span class="option-badge">${letters[i] || (i + 1)}</span>
                    <span class="option-label-text">${escapeHtml(optText || opt.text)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        } else if (ch.type === 'select') {
          html += `
            <div class="question-heading">${ch.question}</div>
            ${ch.image_url ? `
              <div class="challenge-image-container">
                <div class="challenge-image-card" onclick="window.openImageZoomModal ? window.openImageZoomModal('${(ch.image_url || '').replace(/'/g, "\\'")}', '${(ch.question || '').replace(/'/g, "\\'")}') : null" title="انقر لتكبير الصورة">
                  <img src="${escapeHtml(ch.image_url)}" alt="صورة السؤال" class="challenge-image-tag" loading="lazy" />
                  <div class="challenge-image-zoom-badge">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span>تكبير الصورة</span>
                  </div>
                </div>
              </div>
            ` : ''}
            ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
              <div class="coptic-letter-display">
                ${ch.coptic_display ? `<span class="coptic-big-glyph">${ch.coptic_display}</span>` : ''}
                ${(ch.audio_text || ch.audio_url) ? `
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this)">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
              ${(ch.audio_text && ch.coptic_display && ch.audio_text !== ch.coptic_display && !ch.audio_text.startsWith('http')) ? `
                <div class="coptic-phonetic-badge" style="display:flex; justify-content:center; align-items:center; gap:6px; margin:2px auto 14px; background:#FFFBF2; border:1.5px solid #E8D9C0; color:#6F1737; font-weight:800; font-size:1.08rem; padding:5px 18px; border-radius:24px; box-shadow:0 2px 8px rgba(0,0,0,0.04); max-width:fit-content;">
                  <span style="color:#8C6D3B; font-size:0.85rem; font-weight:700;">القبطي المعرب:</span>
                  <span style="font-size:1.15rem; color:#6F1737;">«${escapeHtml(ch.audio_text)}»</span>
                </div>
              ` : ''}
            ` : ''}
            <div class="options-grid">
              ${activeOptions.map((opt, i) => {
                const letters = ['أ', 'ب', 'ج', 'د'];
                return `
                  <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                    <span class="option-badge">${letters[i] || (i + 1)}</span>
                    <span class="option-label-text">${escapeHtml(opt.text)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        } else if (ch.type === 'listen') {
          html += `
            <div class="question-heading">${ch.question}</div>
            <div class="coptic-letter-display">
              <button type="button" class="audio-icon-btn listen-pulse" style="width:72px;height:72px;border-radius:50%;margin-top:10px;" aria-label="استمع للصوت" title="استمع للصوت" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || 'حرف قبطي'}', this)">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </button>
            </div>
            <div class="options-grid">
              ${activeOptions.map((opt, i) => {
                const letters = ['أ', 'ب', 'ج', 'د'];
                return `
                  <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                    <span class="option-badge">${letters[i] || (i + 1)}</span>
                    <span class="option-label-text">${escapeHtml(opt.text)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        } else if (ch.type === 'write') {
          wordTilesBuilt = [];
          const tiles = ch.tiles || (ch.correct_word ? ch.correct_word.split('') : ['ك', 'س']);
          const shuffled = [...tiles].sort(() => Math.random() - 0.5);

          // استخراج معنى الكلمة بالعربي والقبطي المعرب
          let wordInfo = { meaning: '', phonetic: ch.audio_text || '' };
          if (typeof window.extractWordMeaningAndPhonetic === 'function') {
            wordInfo = window.extractWordMeaningAndPhonetic(ch);
          } else if (ch.question) {
            const m = ch.question.match(/(?:لتكوين|الكلمة|الكلمة القبطية):\s*([^(«[]+)/);
            if (m && m[1]) wordInfo.meaning = m[1].trim();
            const mPhon = ch.question.match(/«([^»]+)»/);
            if (mPhon && mPhon[1]) wordInfo.phonetic = mPhon[1].trim();
          }
          if (!wordInfo.meaning) wordInfo.meaning = 'الكلمة المطلوبة';

          html += `
            <div class="question-heading">${escapeHtml(ch.question || 'رتّب حروف الكلمة القبطية')}</div>
            <div class="write-target-card" style="background:linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%); border:2px solid #E6D7C3; border-radius:20px; padding:18px 24px; margin:12px auto 16px; max-width:480px; text-align:center; box-shadow:0 6px 18px rgba(74, 13, 36, 0.05);">
              <div style="font-size:0.82rem; font-weight:800; color:#8D725C; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.2px;">المعنى بالعربية:</div>
              <div style="font-size:2rem; font-weight:900; color:#3A2315; line-height:1.25; margin-bottom:8px;">${escapeHtml(wordInfo.meaning)}</div>
              ${wordInfo.phonetic ? `
                <div style="display:inline-flex; align-items:center; gap:6px; background:#FAF4E8; border:1.5px solid #ECDDC5; padding:4px 16px; border-radius:20px; color:#6F1737; font-weight:800; font-size:1rem; margin-bottom:10px;">
                  <span style="color:#8D725C; font-size:0.82rem;">القبطي المعرب:</span>
                  <span>« ${escapeHtml(wordInfo.phonetic)} »</span>
                </div>
              ` : ''}
              ${(ch.audio_url || wordInfo.phonetic) ? `
                <div style="margin-top:2px;">
                  <button type="button" class="audio-icon-btn listen-pulse" style="width:50px; height:50px; border-radius:50%; margin:0 auto;" aria-label="استمع لنطق الكلمة" title="استمع لنطق الكلمة" onclick="window.playChallengeAudio ? window.playChallengeAudio('${ch.audio_url || ''}', '${wordInfo.phonetic || ch.audio_text || ''}', this) : null">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                </div>
              ` : ''}
            </div>
            <div class="write-area" style="direction:ltr !important;">
              <div class="tiles-dropzone" id="tiles-dropzone" style="direction:ltr !important; flex-direction:row !important;" onclick="if(event.target.closest('.word-tile') && window.unpickWordTile) window.unpickWordTile(event.target.closest('.word-tile'))">
                <span style="color:var(--ink-soft);font-size:.92rem;direction:rtl;" id="dropzone-placeholder">اضغط على الحروف لترتيبها هنا</span>
              </div>
              <div class="tiles-pool" id="tiles-pool" style="direction:ltr !important; flex-direction:row !important;">
                ${shuffled.map((t, idx) => `
                  <button type="button" class="word-tile" data-tile-id="${idx}" data-letter="${escapeHtml(t)}" style="direction:ltr !important;" onclick="pickWordTile(this, '${t.replace(/'/g, "\\'")}', ${idx})">${t}</button>
                `).join('')}
              </div>
            </div>
          `;
        } else if (ch.type === 'match') {
          const pairs = ch.pairs || [
            { left: 'Ⲁ ⲁ', right: 'ألفا' },
            { left: 'Ⲃ ⲃ', right: 'ڤيتا (بيتا)' },
            { left: 'Ⲉ ⲉ', right: 'إي' },
            { left: 'Ⲇ ⲇ', right: 'دلدا' }
          ];

          matchedPairsCount = 0;
          selectedMatchLeft = null;
          selectedMatchRight = null;

          const leftShuffled = [...pairs].sort(() => Math.random() - 0.5);
          const rightShuffled = [...pairs].sort(() => Math.random() - 0.5);

          html += `
            <div class="question-heading">${ch.question}</div>
            <div class="match-grid">
              <div class="match-col">
                ${leftShuffled.map(p => `
                  <button type="button" class="match-btn coptic-font" data-pair-key="${p.left}" onclick="handleMatchClick(this, 'left', '${p.left}')">
                    ${p.left}
                  </button>
                `).join('')}
              </div>
              <div class="match-col">
                ${rightShuffled.map(p => `
                  <button type="button" class="match-btn" data-pair-match="${p.left}" onclick="handleMatchClick(this, 'right', '${p.left}')">
                    ${p.right}
                  </button>
                `).join('')}
              </div>
            </div>
          `;
        } else if (ch.type === 'trace') {
          const questionText = ch.question || 'تتبّع كتابة الحرف / الكلمة بدقة على السبورة';
          html += `
            <div class="trace-interactive-card">
              <div class="trace-expanded-header">
                <button type="button" id="btn-trace-collapse" class="trace-collapse-btn" aria-label="تصغير لوحة التتبع" title="تصغير السبورة">&times;</button>
              </div>
              <div class="question-heading">${questionText}</div>
              ${(ch.audio_text || ch.audio_url) ? `
                <div class="trace-audio-wrap">
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio ? window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this) : (game && game.sound && game.sound.speakArabic ? game.sound.speakArabic('${ch.audio_text}') : null)">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                </div>
              ` : ''}
              <div id="trace-info-container" class="trace-info-container">
                <div id="trace-target-title" class="trace-target-title">جاري تجهيز لوحة التتبع...</div>
              </div>

              <!-- شريط أدوات السبورة: زر التكبير ومؤشر سمك القلم -->
              <div class="trace-toolbar-row">
                <div class="trace-stroke-control">
                  <span class="trace-stroke-label">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                    سُمْك القلم
                  </span>
                  <input type="range" id="trace-stroke-slider" min="6" max="32" value="12" step="2" class="trace-stroke-slider" title="تحكم في سمك خط الكتابة">
                  <div class="trace-stroke-val-box">
                    <span id="trace-stroke-val" class="trace-stroke-val">12px</span>
                    <span id="trace-stroke-preview" class="trace-stroke-preview"></span>
                  </div>
                </div>
                <button type="button" id="btn-trace-expand" class="trace-expand-btn" aria-label="تكبير السبورة" title="تكبير السبورة (ملء الشاشة)">
                  <svg class="icon-expand" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                  <svg class="icon-collapse" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/>
                  </svg>
                </button>
              </div>

              <div class="trace-canvas-wrapper" style="position:relative;width:100%;max-width:340px;height:310px;margin:0 auto;background:#FFFDF8;border-radius:24px;border:2px solid #D6C8B2;box-shadow:0 8px 24px rgba(0,0,0,0.05);overflow:hidden;touch-action:none;">
                <canvas id="trace-exercise-canvas" style="width:100%;height:100%;touch-action:none;display:block;cursor:crosshair;"></canvas>
                <div id="trace-accuracy-badge" class="trace-accuracy-badge" style="position:absolute;top:10px;left:10px;background:rgba(255,255,255,0.95);backdrop-filter:blur(4px);padding:4px 12px;border-radius:12px;font-size:.82rem;font-weight:800;color:#2A1F17;border:1px solid #D6C8B2;display:none;">الدقة: <span id="trace-score-val">0</span>%</div>
              </div>
              <div class="trace-actions-row" style="display:flex;justify-content:center;gap:12px;margin:16px auto 0;width:100%;max-width:340px;">
                <button type="button" id="btn-trace-evaluate" class="trace-action-btn btn-trace-evaluate" style="flex:1;padding:12px 16px;font-size:.92rem;font-weight:800;background:linear-gradient(135deg, #B8860B, #8F6310);color:#fff;border:none;border-radius:14px;cursor:pointer;box-shadow:0 4px 12px rgba(184,134,11,0.25);display:flex;align-items:center;justify-content:center;gap:6px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>فحص النتيجة</span>
                </button>
                <button type="button" id="btn-trace-clear" class="trace-action-btn btn-trace-clear" style="flex:1;padding:12px 16px;font-size:.92rem;font-weight:800;background:#EFE6D5;color:#2A1F17;border:1.5px solid #DFD2BD;border-radius:14px;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.04);display:flex;align-items:center;justify-content:center;gap:6px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                  <span>مسح وإعادة</span>
                </button>
              </div>
            </div>
          `;
        } else if (ch.type === 'fill_blank') {
          const copticDisplay = ch.coptic_display || '';
          const options = ch.options || [];
          const shuffledOpts = [...options].sort(() => Math.random() - 0.5);

          html += `
            <div class="question-heading">${ch.question}</div>
            ${(copticDisplay || ch.audio_text || ch.audio_url) ? `
              <div class="coptic-letter-display">
                ${copticDisplay ? `<span class="coptic-big-glyph">${copticDisplay}</span>` : ''}
                ${(ch.audio_text || ch.audio_url) ? `
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || copticDisplay || ''}', this)">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
            ` : ''}
            <div class="fill-blank-area">
              <div class="fill-blank-input-wrapper">
                <input type="text" 
                       id="fill-blank-user-input" 
                       class="fill-blank-input coptic-input" 
                       placeholder="اضغط هنا للكتابة بالقبطي..." 
                       dir="ltr" 
                       autocomplete="off" 
                       autocorrect="off" 
                       autocapitalize="off" 
                       spellcheck="false">
              </div>
              ${shuffledOpts.length > 0 ? `
                <div class="fill-blank-options-label">أو اختر الكلمة المفقودة من الخيارات:</div>
                <div class="fill-blank-chips-pool">
                  ${shuffledOpts.map((opt) => `
                    <button type="button" class="fill-blank-chip coptic-font" onclick="pickFillBlankChip(this, '${escapeHtml(opt.text)}')">${escapeHtml(opt.text)}</button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `;
        } else if (ch.type === 'true_false') {
          const isTrue = ch.is_correct !== false;
          html += `
            <div class="question-heading">${ch.question}</div>
            ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
              <div class="coptic-letter-display">
                ${ch.coptic_display ? `<span class="coptic-big-glyph">${ch.coptic_display}</span>` : ''}
                ${(ch.audio_text || ch.audio_url) ? `
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this)">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
            ` : ''}
            <div class="options-grid">
              <div class="option-card tf-option" data-tf="true" onclick="selectTrueFalse(this, true)">
                <span>صح (True) ✓</span>
              </div>
              <div class="option-card tf-option" data-tf="false" onclick="selectTrueFalse(this, false)">
                <span>خطأ (False) ✕</span>
              </div>
            </div>
          `;
        } else {
          // احتياطي شامل لأي تمرين لضمان عدم بقاء الشاشة فارغة مطلقاً
          html += `
            <div class="question-heading">${escapeHtml(ch.question || 'اختر الإجابة الصحيحة')}</div>
            ${(ch.coptic_display || ch.audio_text || ch.audio_url) ? `
              <div class="coptic-letter-display">
                ${ch.coptic_display ? `<span class="coptic-big-glyph">${escapeHtml(ch.coptic_display)}</span>` : ''}
                ${(ch.audio_text || ch.audio_url) ? `
                  <button type="button" class="audio-icon-btn" aria-label="استمع للنطق" title="استمع للنطق" onclick="window.playChallengeAudio ? window.playChallengeAudio('${ch.audio_url || ''}', '${ch.audio_text || ch.coptic_display || ''}', this) : null">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                ` : ''}
              </div>
            ` : ''}
            ${activeOptions.length > 0 ? `
              <div class="options-grid">
                ${activeOptions.map((opt, i) => {
                  const optText = typeof opt === 'string' ? opt : (opt.text || '');
                  const letters = ['أ', 'ب', 'ج', 'د'];
                  return `
                    <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                      <span class="option-badge">${letters[i] || (i + 1)}</span>
                      <span class="option-label-text">${escapeHtml(optText)}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
          `;
        }

        runnerBody.innerHTML = html;

        // توصيل مستمع الإدخال لتمرين استمع واكتب وإظهار الكيبورد القبطي
        if (ch.type === 'listen_write') {
          const inp = document.getElementById('listen-write-user-input');
          if (inp) {
            inp.addEventListener('input', () => {
              const btnCheck = document.getElementById('btn-check-action');
              if (btnCheck) btnCheck.disabled = !inp.value.trim();
            });
            setTimeout(() => {
              try {
                inp.focus();
                if (window.CopticKeyboard) window.CopticKeyboard.open(inp);
              } catch (_) {}
            }, 350);
          }
        }

        // توصيل مستمع الإدخال لتمرين أكمل الفراغ وإظهار الكيبورد القبطي
        if (ch.type === 'fill_blank') {
          const inp = document.getElementById('fill-blank-user-input');
          if (inp) {
            inp.addEventListener('input', () => {
              const btnCheck = document.getElementById('btn-check-action');
              if (btnCheck) btnCheck.disabled = !inp.value.trim();
            });
            setTimeout(() => {
              try {
                inp.focus();
                if (window.CopticKeyboard) window.CopticKeyboard.open(inp);
              } catch (_) {}
            }, 300);
          }
        }

        // تشغيل الصوت فوراً لأي تمرين يحتوي على صوت دون الحاجة للضغط على الزر
        const hasAudio = !!(ch.audio_url || ch.audio_text || ch.type === 'listen' || ch.type === 'listen_write');
        if (hasAudio) {
          setTimeout(() => {
            const audioBtn = runnerBody.querySelector('.audio-icon-btn, .coptic-audio-circle-btn, .audio-play-btn');
            const spokenText = ch.audio_text || (ch.type === 'listen' || ch.type === 'listen_write' ? (ch.correct_word || ch.coptic_display || 'حرف قبطي') : (ch.coptic_display || ''));
            if (window.playChallengeAudio) {
              window.playChallengeAudio(ch.audio_url || '', spokenText, audioBtn);
            } else if (game && game.sound && game.sound.playChallengeAudio) {
              game.sound.playChallengeAudio(ch.audio_url || '', spokenText);
            } else if (game && game.sound && game.sound.speakArabic) {
              game.sound.speakArabic(spokenText);
            }
          }, 250);
        }

        if (ch.type === 'trace') {
          initTraceChallenge(ch);
        }
      }

      // ==========================================
      // إدارة وضع ملء الشاشة للسبورة (Trace Fullscreen)
      // ==========================================
      let traceOrientationMql = null;
      let traceOrientationHandler = null;

      window.setTraceFullscreenMode = function(expanded) {
        const card = document.querySelector('.trace-interactive-card');
        const overlay = document.getElementById('challenge-runner-overlay');
        const expandBtn = document.getElementById('btn-trace-expand');
        if (!card) return;

        if (expanded) {
          card.classList.add('is-expanded');
          if (overlay) overlay.classList.add('trace-fullscreen-active');
          if (expandBtn) {
            expandBtn.classList.add('is-active');
            expandBtn.setAttribute('aria-label', 'تصغير السبورة');
            expandBtn.setAttribute('title', 'تصغير السبورة');
            const expIcon = expandBtn.querySelector('.icon-expand');
            const colIcon = expandBtn.querySelector('.icon-collapse');
            if (expIcon) expIcon.style.display = 'none';
            if (colIcon) colIcon.style.display = 'block';
          }
        } else {
          card.classList.remove('is-expanded');
          if (overlay) overlay.classList.remove('trace-fullscreen-active');
          if (expandBtn) {
            expandBtn.classList.remove('is-active');
            expandBtn.setAttribute('aria-label', 'تكبير السبورة');
            expandBtn.setAttribute('title', 'تكبير السبورة (ملء الشاشة)');
            const expIcon = expandBtn.querySelector('.icon-expand');
            const colIcon = expandBtn.querySelector('.icon-collapse');
            if (expIcon) expIcon.style.display = 'block';
            if (colIcon) colIcon.style.display = 'none';
          }
        }

        // تحديث أبعاد الكانفاس وإعادة رسمه مع الحفاظ الكامل على ضربات القلم
        requestAnimationFrame(() => {
          if (window.activeRunnerTracer) {
            window.activeRunnerTracer.resize();
          }
          setTimeout(() => {
            if (window.activeRunnerTracer) {
              window.activeRunnerTracer.resize();
            }
          }, 230);
        });
      };

      function setupTraceOrientationListener() {
        cleanupTraceOrientationListener();
        if (!window.matchMedia) return;

        try {
          traceOrientationMql = window.matchMedia('(orientation: landscape)');
          traceOrientationHandler = function() {
            // عند تدوير الشاشة أو تغيير الأبعاد، نقوم فقط بإعادة ضبط أبعاد لوحة الرسم دون تفعيل ملء الشاشة تلقائياً
            if (window.activeRunnerTracer) {
              requestAnimationFrame(() => {
                window.activeRunnerTracer.resize();
              });
            }
          };

          if (traceOrientationMql.addEventListener) {
            traceOrientationMql.addEventListener('change', traceOrientationHandler);
          } else if (traceOrientationMql.addListener) {
            traceOrientationMql.addListener(traceOrientationHandler);
          }
        } catch (err) {
          console.warn('Trace orientation listener setup warning:', err);
        }
      }

      function cleanupTraceOrientationListener() {
        if (traceOrientationMql && traceOrientationHandler) {
          try {
            if (traceOrientationMql.removeEventListener) {
              traceOrientationMql.removeEventListener('change', traceOrientationHandler);
            } else if (traceOrientationMql.removeListener) {
              traceOrientationMql.removeListener(traceOrientationHandler);
            }
          } catch (_) {}
        }
        traceOrientationMql = null;
        traceOrientationHandler = null;
        const overlay = document.getElementById('challenge-runner-overlay');
        if (overlay) overlay.classList.remove('trace-fullscreen-active');
        const card = document.querySelector('.trace-interactive-card');
        if (card) card.classList.remove('is-expanded');
        const expandBtn = document.getElementById('btn-trace-expand');
        if (expandBtn) {
          expandBtn.classList.remove('is-active');
          expandBtn.setAttribute('aria-label', 'تكبير السبورة');
          expandBtn.setAttribute('title', 'تكبير السبورة (ملء الشاشة)');
          const expIcon = expandBtn.querySelector('.icon-expand');
          const colIcon = expandBtn.querySelector('.icon-collapse');
          if (expIcon) expIcon.style.display = 'block';
          if (colIcon) colIcon.style.display = 'none';
        }
      }

      async function initTraceChallenge(ch) {
        const canvasEl = document.getElementById('trace-exercise-canvas');
        if (!canvasEl) return;

        let targetText = ch.text_to_trace || ch.coptic_display || ch.custom_word;
        let targetTitle = ch.target_title || '';
        let exerciseId = ch.writing_exercise_id || ch.exercise_id;

        if (!targetText) {
          const qCoptic = String(ch.question || '').match(/[\u2C80-\u2CFF\u0370-\u03FF\s]+/);
          if (qCoptic) {
            targetText = qCoptic[0].trim();
          } else {
            targetText = ch.question || 'Ⲁ';
          }
        }

        let cleanText = String(targetText).trim();

        const titleEl = document.getElementById('trace-target-title');
        if (titleEl) {
          if (targetTitle && !targetTitle.includes(cleanText)) {
            titleEl.textContent = `${targetTitle} (${cleanText})`;
          } else {
            titleEl.textContent = targetTitle || cleanText;
          }
        }

        const badge = document.getElementById('trace-accuracy-badge');
        const scoreVal = document.getElementById('trace-score-val');
        const btnCheck = document.getElementById('btn-check-action');

        if (window.activeRunnerTracer) {
          try { window.activeRunnerTracer.destroy(); } catch (_) {}
          window.activeRunnerTracer = null;
        }

        if (typeof LetterTracer !== 'undefined') {
          try {
            window.activeRunnerTracer = new LetterTracer({
              canvasId: canvasEl,
              fontUrl: 'assets/fonts/girges.woff',
              text: cleanText,
              passThreshold: 80,
              minCoverageThreshold: 80,
              onStrokeEnd: (count) => {
                if (btnCheck && count > 0) btnCheck.disabled = false;
              },
              onSuccess: (score) => {
                if (badge && scoreVal) {
                  scoreVal.textContent = score;
                  badge.style.display = 'block';
                  badge.style.color = '#2e6b3e';
                  badge.style.borderColor = '#2e6b3e';
                }
                ch._tracePassed = true;
                ch._lastScore = score;
                if (btnCheck) btnCheck.disabled = false;
              }
            });
          } catch (tracerErr) {
            console.warn('LetterTracer initialization error:', tracerErr);
            if (btnCheck) btnCheck.disabled = false;
          }
        }

        const btnClear = document.getElementById('btn-trace-clear');
        if (btnClear) {
          btnClear.onclick = () => {
            if (window.activeRunnerTracer) window.activeRunnerTracer.clear();
            if (badge) badge.style.display = 'none';
            if (btnCheck) btnCheck.disabled = true;
            ch._tracePassed = false;
          };
        }

        const btnEval = document.getElementById('btn-trace-evaluate');
        if (btnEval) {
          btnEval.onclick = () => {
            if (window.activeRunnerTracer) {
              const evalRes = window.activeRunnerTracer.evaluate();
              if (badge && scoreVal) {
                scoreVal.textContent = evalRes.finalScore;
                badge.style.display = 'block';
                badge.style.color = evalRes.passed ? '#2e6b3e' : (evalRes.incomplete ? '#c2410c' : '#a13030');
                badge.style.borderColor = evalRes.passed ? '#2e6b3e' : (evalRes.incomplete ? '#ea580c' : '#a13030');
              }
              if (evalRes.incomplete) {
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'warning',
                  title: evalRes.message || `يرجى إكمال كتابة الحرف كاملاً (${evalRes.coveragePercent}%)`,
                  showConfirmButton: false,
                  timer: 2500
                });
              } else if (!evalRes.passed) {
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'info',
                  title: `الدقة: ${evalRes.finalScore}% — حاول الرسم بدقة أكبر داخل المسار لتصل إلى 80%`,
                  showConfirmButton: false,
                  timer: 2500
                });
              } else {
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'success',
                  title: `ممتاز! الدقة: ${evalRes.finalScore}% — اضغط تحقق للمتابعة`,
                  showConfirmButton: false,
                  timer: 2500
                });
              }
            }
          };
        }

        const btnExpand = document.getElementById('btn-trace-expand');
        if (btnExpand) {
          btnExpand.onclick = () => {
            const card = document.querySelector('.trace-interactive-card');
            const isExp = card && card.classList.contains('is-expanded');
            window.setTraceFullscreenMode(!isExp);
          };
        }

        const btnCollapse = document.getElementById('btn-trace-collapse');
        if (btnCollapse) {
          btnCollapse.onclick = () => {
            window.setTraceFullscreenMode(false);
          };
        }

        // التأكد من أن السبورة تبدأ دائماً في الوضع العادي (غير ملء الشاشة) ولا تتسع إلا بضغط زر التكبير
        window.setTraceFullscreenMode(false);
        setupTraceOrientationListener();

        const strokeSlider = document.getElementById('trace-stroke-slider');
        const strokeVal = document.getElementById('trace-stroke-val');
        const strokePreview = document.getElementById('trace-stroke-preview');
        if (strokeSlider) {
          strokeSlider.value = 12;
          if (strokeVal) strokeVal.textContent = '12px';
          if (strokePreview) {
            strokePreview.style.width = '12px';
            strokePreview.style.height = '12px';
          }
          strokeSlider.oninput = (e) => {
            const w = parseInt(e.target.value, 10);
            if (strokeVal) strokeVal.textContent = `${w}px`;
            if (strokePreview) {
              strokePreview.style.width = `${w}px`;
              strokePreview.style.height = `${w}px`;
            }
            if (window.activeRunnerTracer) {
              window.activeRunnerTracer.setStrokeWidth(w);
            }
          };
        }

        setTimeout(() => {
          if (window.activeRunnerTracer) {
            window.activeRunnerTracer._setupCanvasSize();
            window.activeRunnerTracer.draw();
          }
        }, 60);
      }

      window.pickFillBlankChip = function(btn, word) {
        if (runnerState !== 'answering') return;
        if (game.sound) game.sound.playClick();
        const inputEl = document.getElementById('fill-blank-user-input');
        if (inputEl) {
          inputEl.value = word;
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
        document.querySelectorAll('.fill-blank-chip').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        const btnCheck = document.getElementById('btn-check-action');
        if (btnCheck) btnCheck.disabled = false;
      };

      window.selectTrueFalse = function(el, val) {
        if (runnerState !== 'answering') return;
        if (game.sound) game.sound.playClick();
        document.querySelectorAll('.option-card.tf-option').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        currentSelection = val;
        const btnCheck = document.getElementById('btn-check-action');
        if (btnCheck) btnCheck.disabled = false;
      };

      window.selectOptionCard = function(el, idx) {
        if (runnerState !== 'answering') return;
        if (game.sound) game.sound.playClick();
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        currentSelection = idx;
        const btnCheck = document.getElementById('btn-check-action');
        if (btnCheck) btnCheck.disabled = false;
      };

      window.unpickWordTile = function(placedTileOrId, tileId) {
        if (runnerState !== 'answering') return;
        if (game.sound) game.sound.playClick();
        const dropzone = document.getElementById('tiles-dropzone');
        if (!dropzone) return;

        let placedEl = null;
        let tId = tileId;

        if (placedTileOrId instanceof HTMLElement) {
          placedEl = placedTileOrId;
          if (tId === undefined || tId === null) {
            tId = placedEl.getAttribute('data-tile-id');
          }
        } else if (typeof placedTileOrId === 'number' || typeof placedTileOrId === 'string') {
          tId = String(placedTileOrId);
          placedEl = dropzone.querySelector(`.word-tile[data-tile-id="${tId}"]`);
        }

        if (placedEl) {
          placedEl.remove();
        }

        if (tId !== undefined && tId !== null) {
          const poolBtn = document.querySelector(`.tiles-pool .word-tile[data-tile-id="${tId}"]`);
          if (poolBtn) {
            poolBtn.classList.remove('is-placed');
            poolBtn.style.visibility = 'visible';
          }
        }

        const remainingTiles = Array.from(dropzone.querySelectorAll('.word-tile'));
        wordTilesBuilt = remainingTiles.map(el => el.getAttribute('data-letter') || el.textContent.trim());

        if (wordTilesBuilt.length === 0 && !document.getElementById('dropzone-placeholder')) {
          const ph = document.createElement('span');
          ph.id = 'dropzone-placeholder';
          ph.style.cssText = 'color:var(--ink-soft);font-size:.92rem;direction:rtl;';
          ph.textContent = 'اضغط على الحروف لترتيبها هنا';
          dropzone.appendChild(ph);
        }

        const btnCheck = document.getElementById('btn-check-action');
        if (btnCheck) btnCheck.disabled = (wordTilesBuilt.length === 0);
      };

      window.pickWordTile = function(btn, letter, tileId) {
        if (runnerState !== 'answering') return;
        const tId = (tileId !== undefined && tileId !== null) ? String(tileId) : (btn.getAttribute('data-tile-id') || '0');

        if (btn.classList.contains('is-placed')) {
          window.unpickWordTile(null, tId);
          return;
        }

        if (game.sound) game.sound.playClick();
        const dropzone = document.getElementById('tiles-dropzone');
        if (!dropzone) return;
        const placeholder = document.getElementById('dropzone-placeholder');
        if (placeholder) placeholder.remove();

        btn.classList.add('is-placed');

        const placedTile = document.createElement('button');
        placedTile.type = 'button';
        placedTile.className = 'word-tile placed-tile';
        placedTile.style.direction = 'ltr';
        placedTile.style.unicodeBidi = 'isolate';
        placedTile.textContent = letter;
        placedTile.setAttribute('data-tile-id', tId);
        placedTile.setAttribute('data-letter', letter);
        placedTile.setAttribute('title', 'اضغط لإعادة الحرف');
        placedTile.setAttribute('aria-label', `إعادة حرف ${letter}`);

        const handleUnpick = function(e) {
          if (e) {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
          }
          window.unpickWordTile(placedTile, tId);
        };

        placedTile.onclick = handleUnpick;
        placedTile.addEventListener('touchend', handleUnpick, { passive: false });

        dropzone.appendChild(placedTile);

        const remainingTiles = Array.from(dropzone.querySelectorAll('.word-tile'));
        wordTilesBuilt = remainingTiles.map(el => el.getAttribute('data-letter') || el.textContent.trim());

        const btnCheck = document.getElementById('btn-check-action');
        if (btnCheck) btnCheck.disabled = false;
      };

      window.handleMatchClick = function(btn, side, key) {
        if (runnerState !== 'answering') return;
        if (game.sound) game.sound.playClick();

        if (side === 'left') {
          document.querySelectorAll('.match-col:first-child .match-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedMatchLeft = { el: btn, key: key };
        } else {
          document.querySelectorAll('.match-col:last-child .match-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedMatchRight = { el: btn, key: key };
        }

        if (selectedMatchLeft && selectedMatchRight) {
          const btnCheck = document.getElementById('btn-check-action');
          if (selectedMatchLeft.key === selectedMatchRight.key) {
            if (game.sound) game.sound.playCorrect();
            selectedMatchLeft.el.classList.remove('selected');
            selectedMatchRight.el.classList.remove('selected');
            selectedMatchLeft.el.classList.add('matched');
            selectedMatchRight.el.classList.add('matched');
            matchedPairsCount++;

            const totalPairs = (currentChallenges[currentChallengeIndex].pairs || []).length || 4;
            if (matchedPairsCount >= totalPairs) {
              if (btnCheck) {
                btnCheck.disabled = false;
                setTimeout(() => btnCheck.click(), 400);
              }
            }
          } else {
            if (game.sound) game.sound.playWrong();
            const lEl = selectedMatchLeft.el;
            const rEl = selectedMatchRight.el;
            setTimeout(() => {
              lEl.classList.remove('selected');
              rEl.classList.remove('selected');
            }, 300);
          }
          selectedMatchLeft = null;
          selectedMatchRight = null;
        }
      };

      async function evaluateAnswer() {
        const ch = currentChallenges[currentChallengeIndex];
        let isCorrect = false;

        if (ch.type === 'image_view' || ch.type === 'text_view' || ch.type === 'letter_overview' || ch.type === 'word_overview' || ch.type === 'lesson_overview') {
          isCorrect = true;
        } else if (ch.type === 'select' || ch.type === 'listen' || ch.type === 'read_select' || ch.type === 'image_select') {
          const selectedOpt = ch.options[currentSelection];
          isCorrect = selectedOpt && selectedOpt.is_correct;
        } else if (ch.type === 'listen_write') {
          const inputEl = document.getElementById('listen-write-user-input');
          const userVal = (inputEl ? inputEl.value : '').trim();
          const correctVal = (ch.correct_word || ch.coptic_display || '').trim();
          const clean = (s) => s.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
          isCorrect = (clean(userVal) === clean(correctVal) || clean(userVal).toLowerCase() === clean(correctVal).toLowerCase());
          if (inputEl) {
            inputEl.classList.remove('correct', 'wrong');
            inputEl.classList.add(isCorrect ? 'correct' : 'wrong');
          }
        } else if (ch.type === 'write') {
          const built = wordTilesBuilt.join('');
          isCorrect = (built === ch.correct_word);
          const dropTiles = document.querySelectorAll('#tiles-dropzone .word-tile');
          dropTiles.forEach(t => t.classList.add(isCorrect ? 'correct-tile' : 'wrong-tile'));
        } else if (ch.type === 'match') {
          const totalPairs = (ch.pairs || []).length || 4;
          isCorrect = (matchedPairsCount >= totalPairs);
        } else if (ch.type === 'fill_blank') {
          const inputEl = document.getElementById('fill-blank-user-input');
          const userVal = (inputEl ? inputEl.value : '').trim();
          const correctVal = (ch.correct_word || '').trim();
          const normalize = (t) => t.replace(/\s+/g, ' ').trim().toLowerCase();
          isCorrect = (normalize(userVal) === normalize(correctVal));
          if (inputEl) {
            inputEl.classList.remove('correct', 'wrong');
            inputEl.classList.add(isCorrect ? 'correct' : 'wrong');
          }
        } else if (ch.type === 'true_false') {
          const isTrue = ch.is_correct !== false;
          isCorrect = (currentSelection === isTrue);
          document.querySelectorAll('.option-card.tf-option').forEach(card => {
            const cardVal = card.dataset.tf === 'true';
            if (cardVal === isTrue) card.classList.add('correct');
            else if (card.classList.contains('selected')) card.classList.add('wrong');
          });
        } else if (ch.type === 'trace') {
          if (window.activeRunnerTracer) {
            const evalRes = window.activeRunnerTracer.evaluate();
            const badge = document.getElementById('trace-accuracy-badge');
            const scoreVal = document.getElementById('trace-score-val');
            if (badge && scoreVal) {
              scoreVal.textContent = evalRes.finalScore;
              badge.style.display = 'block';
              badge.style.color = evalRes.passed ? '#2e6b3e' : (evalRes.incomplete ? '#c2410c' : '#a13030');
              badge.style.borderColor = evalRes.passed ? '#2e6b3e' : (evalRes.incomplete ? '#ea580c' : '#a13030');
            }
            isCorrect = (evalRes.passed === true);
          } else {
            isCorrect = (ch._tracePassed === true);
          }
        }

        runnerState = 'checked';
        const btnCheck = document.getElementById('btn-check-action');
        const feedbackBox = document.getElementById('feedback-msg-box');
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackText = document.getElementById('feedback-text');

        if (ch.type === 'select' || ch.type === 'listen' || ch.type === 'read_select' || ch.type === 'image_select') {
          const allOptionCards = document.querySelectorAll('.option-card');
          allOptionCards.forEach((c, idx) => {
            const isThisCorrect = ch.options && ch.options[idx] && ch.options[idx].is_correct;
            if (isThisCorrect) {
              c.classList.remove('selected');
              c.classList.add('correct');
            } else if (idx === currentSelection && !isCorrect) {
              c.classList.remove('selected');
              c.classList.add('wrong');
            }
          });
        }

        const uid = getAuthUserId();

        if (isCorrect) {
          correctAnswersCount++;
          // تمارين النبذة والتوضيح 0 XP، وكل التمارين التفاعلية الأخرى تأخذ قيمتها من الداشبورد (افتراضياً 1 XP)
          const isOverviewCh = (ch.type === 'letter_overview' || ch.type === 'word_overview' || ch.type === 'lesson_overview' || ch.type === 'text_view' || ch.type === 'image_view');
          let challengeXp = 0;
          if (!isOverviewCh) {
            challengeXp = (ch.xp_reward !== undefined && ch.xp_reward !== null && !isNaN(parseInt(ch.xp_reward, 10)))
              ? parseInt(ch.xp_reward, 10)
              : 1;
          }

          // منع احتساب نقاط XP نهائياً في حال إعادة المستوى أو التمرين المُجاب عليه مسبقاً
          const challengeUniqueId = ch.id || `ch_${currentChallengeIndex}_${(ch.question || ch.coptic_display || '').substring(0,20)}`;
          const alreadyAnsweredThisChallenge = sessionAnsweredChallenges.has(challengeUniqueId);

          if (!isReplayingLesson && !alreadyAnsweredThisChallenge && challengeXp > 0) {
            sessionXpEarned += challengeXp;
            sessionAnsweredChallenges.add(challengeUniqueId);

            // تحديث فوري ولحظي لـ XP في الشريط العلوي والكاش (0 مللي ثانية)
            if (typeof window.updateInstantXP === 'function') {
              window.updateInstantXP(challengeXp);
            }

            if (game && game.updateProgress) {
              game.updateProgress(uid, { addPoints: challengeXp });
            }
            showFloatingXpBadge(`+${challengeXp} XP ⭐`);
            if (window.addTodayEarnedXP) window.addTodayEarnedXP(challengeXp);
          } else if (!alreadyAnsweredThisChallenge) {
            sessionAnsweredChallenges.add(challengeUniqueId);
          }

          if (ch.type !== 'match' && game.sound) game.sound.playCorrect();

          if (feedbackBox) {
            feedbackBox.className = 'feedback-msg correct show';
            feedbackBox.style.display = 'flex';
            if (feedbackIcon) feedbackIcon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
            if (feedbackText) {
              if (isReplayingLesson) {
                feedbackText.textContent = 'عاش يا بطل! إجابة صح ومظبوطة 🌟 (مراجعة)';
              } else {
                feedbackText.textContent = (challengeXp > 0) ? `عاش يا بطل! إجابة صح ومظبوطة 🌟 (+${challengeXp} XP)` : 'عاش يا بطل! إجابة صح ومظبوطة 🌟';
              }
            }
          }

          if (btnCheck) {
            btnCheck.textContent = 'يلا كمّل';
            btnCheck.className = 'btn-check-answer btn-continue-ok';
            btnCheck.disabled = false;
            btnCheck.style.pointerEvents = 'auto';
          }
        } else {
          currentChallenges.push(ch);

          if (!isReplayingLesson) {
            if (game.loseHeart) {
              const prog = await game.loseHeart(uid);
              currentRunnerHearts = Number(prog.hearts ?? 0);
            } else {
              currentRunnerHearts = Math.max(0, currentRunnerHearts - 1);
            }
            const runnerHearts = document.getElementById('runner-hearts-count');
            if (runnerHearts) runnerHearts.textContent = currentRunnerHearts;
          }
          if (game.sound) game.sound.playWrong();

          if (feedbackBox) {
            feedbackBox.className = 'feedback-msg wrong show';
            feedbackBox.style.display = 'flex';
            if (feedbackIcon) feedbackIcon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            if (feedbackText) {
              if (ch.type === 'fill_blank' && ch.correct_word) {
                feedbackText.textContent = `مش مظبوطة — الكلمة الصح هي: «${ch.correct_word}»`;
              } else if (ch.type === 'listen_write' && (ch.correct_word || ch.coptic_display)) {
                feedbackText.textContent = `مش مظبوطة — الصح هو: «${ch.correct_word || ch.coptic_display}»`;
              } else {
                const correctOpt = (ch.options || []).find(o => o.is_correct);
                if (correctOpt) {
                  const correctText = (typeof window.formatPronunciationOption === 'function' && ch.type === 'read_select')
                    ? window.formatPronunciationOption(correctOpt.text)
                    : correctOpt.text;
                  feedbackText.textContent = `مش مظبوطة — الصح هو: «${correctText}»`;
                } else {
                  feedbackText.textContent = 'مش مظبوطة، معلش ركز وجرب تاني في التمرين الجاي 💪';
                }
              }
            }
          }

          if (currentRunnerHearts <= 0 && !isReplayingLesson) {
            runnerState = 'out_of_hearts';
            if (btnCheck) {
              btnCheck.textContent = 'قلوبك خلصت';
              btnCheck.className = 'btn-check-answer btn-continue-err';
              btnCheck.disabled = false;
              btnCheck.style.pointerEvents = 'auto';
            }
            setTimeout(() => handleOutOfHearts(), 350);
          } else {
            if (btnCheck) {
              btnCheck.textContent = 'يلا كمّل';
              btnCheck.className = 'btn-check-answer btn-continue-err';
              btnCheck.disabled = false;
              btnCheck.style.pointerEvents = 'auto';
            }
          }
        }
      }

      async function handleOutOfHearts() {
        if (isOutOfHeartsModalOpen) return;
        isOutOfHeartsModalOpen = true;

        const runnerOverlay = document.getElementById('challenge-runner-overlay');
        if (runnerOverlay) {
          runnerOverlay.style.pointerEvents = 'none';
        }

        const uid = getAuthUserId();
        let currentXP = 0;
        let hearts = 0;
        if (game.getProgress) {
          const prog = await game.getProgress(uid);
          currentXP = prog.points || 0;
          hearts = prog.hearts || 0;
        }
        currentRunnerHearts = hearts;
        const heartsNeeded = Math.max(1, 5 - hearts);
        const costPerHeart = 100;
        const fullCost = heartsNeeded * costPerHeart;

        const canBuySingle = currentXP >= costPerHeart;
        const canBuyFull = currentXP >= fullCost;

        const htmlContent = `
          <div class="ooh-modal-wrap">
            <style>
              .swal2-popup.mg-ooh-popup {
                font-family: 'Tajawal', 'Cairo', 'Segoe UI', sans-serif !important;
                direction: rtl !important;
                border-radius: 28px !important;
                background: #FFFFFF !important;
                padding: 24px 20px 20px !important;
                border: 1.5px solid rgba(244, 63, 94, 0.22) !important;
                box-shadow: 0 25px 60px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(244, 63, 94, 0.08) !important;
                max-width: 440px !important;
                width: 92% !important;
                position: relative !important;
                overflow: hidden !important;
              }
              .swal2-popup.mg-ooh-popup::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 6px;
                background: linear-gradient(90deg, #f43f5e, #fb7185, #f43f5e);
              }
              .swal2-popup.mg-ooh-popup .swal2-html-container {
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
              }
              .swal2-popup.mg-ooh-popup .swal2-actions {
                width: 100% !important;
                margin: 12px 0 0 !important;
              }
              .swal2-popup.mg-ooh-popup .mg-ooh-back-btn {
                width: 100% !important;
                margin: 0 !important;
                padding: 13px 20px !important;
                background: #f8fafc !important;
                border: 1.5px solid #cbd5e1 !important;
                border-radius: 16px !important;
                color: #475569 !important;
                font-family: 'Tajawal', 'Cairo', sans-serif !important;
                font-weight: 800 !important;
                font-size: 0.96rem !important;
                cursor: pointer !important;
                box-shadow: none !important;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 6px !important;
              }
              .swal2-popup.mg-ooh-popup .mg-ooh-back-btn:hover {
                background: #f1f5f9 !important;
                border-color: #94a3b8 !important;
                color: #0f172a !important;
                transform: translateY(-1px) !important;
              }
              .swal2-popup.mg-ooh-popup .mg-ooh-back-btn:active {
                transform: scale(0.98) !important;
              }
              .ooh-badge-wrap {
                position: relative;
                width: 76px;
                height: 76px;
                margin: 0 auto 12px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .ooh-badge-glow {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(244, 63, 94, 0.3) 0%, rgba(244, 63, 94, 0.05) 70%, transparent 100%);
                animation: oohPulse 2.2s infinite ease-in-out;
              }
              @keyframes oohPulse {
                0% { transform: scale(0.92); opacity: 0.6; }
                50% { transform: scale(1.18); opacity: 1; }
                100% { transform: scale(0.92); opacity: 0.6; }
              }
              .ooh-badge-circle {
                position: relative;
                width: 66px;
                height: 66px;
                border-radius: 50%;
                background: linear-gradient(145deg, #fff1f2, #ffe4e6);
                border: 2px solid rgba(244, 63, 94, 0.35);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 24px rgba(244, 63, 94, 0.22);
              }
              .ooh-title {
                font-size: 1.4rem;
                font-weight: 900;
                color: #0f172a;
                margin: 0 0 4px;
                font-family: 'Tajawal', 'Cairo', sans-serif;
              }
              .ooh-subtitle {
                font-size: 0.88rem;
                color: #64748b;
                margin: 0 0 12px;
                font-weight: 600;
              }
              .ooh-hearts-track {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                margin: 0 auto 14px;
                padding: 6px 14px;
                background: #f8fafc;
                border-radius: 14px;
                width: fit-content;
                border: 1px dashed #cbd5e1;
              }
              .ooh-heart-slot {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 26px;
                height: 26px;
              }
              .ooh-heart-pulse-svg {
                animation: oohHeartBlink 1.8s infinite ease-in-out;
              }
              @keyframes oohHeartBlink {
                0%, 100% { transform: scale(0.9); opacity: 0.6; }
                50% { transform: scale(1.15); opacity: 1; }
              }
              .ooh-recharge-card {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 1.5px solid #bae6fd;
                border-radius: 18px;
                padding: 12px 14px;
                margin-bottom: 12px;
                text-align: right;
                box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
              }
              .ooh-recharge-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 6px;
              }
              .ooh-recharge-badge {
                font-weight: 800;
                font-size: 0.88rem;
                color: #0369a1;
                display: inline-flex;
                align-items: center;
                gap: 6px;
              }
              .ooh-recharge-max {
                background: #0284c7;
                color: #ffffff;
                padding: 2px 8px;
                border-radius: 20px;
                font-size: 0.72rem;
                font-weight: 800;
              }
              .ooh-recharge-desc {
                font-size: 0.82rem;
                color: #0c4a6e;
                line-height: 1.5;
                margin-bottom: 8px;
                font-weight: 600;
              }
              .ooh-recharge-timer {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: rgba(255, 255, 255, 0.95);
                padding: 8px 14px;
                border-radius: 12px;
                border: 1px solid #7dd3fc;
                font-size: 0.84rem;
                color: #0369a1;
                font-weight: 700;
              }
              .ooh-wallet-strip {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #fffbeb;
                border: 1px solid #fef3c7;
                border-radius: 14px;
                padding: 8px 14px;
                margin-bottom: 12px;
                font-size: 0.86rem;
                font-weight: 700;
              }
              .ooh-wallet-label {
                color: #92400e;
              }
              .ooh-wallet-val {
                color: #b45309;
                font-size: 0.96rem;
                font-weight: 900;
                display: inline-flex;
                align-items: center;
                gap: 6px;
              }
              .ooh-actions {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }
              .ooh-btn-buy {
                width: 100%;
                border: none;
                border-radius: 16px;
                padding: 12px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                font-family: inherit;
                transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s;
              }
              .ooh-btn-buy:active {
                transform: scale(0.98);
              }
              .ooh-btn-single {
                background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
                color: #ffffff;
                box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
              }
              .ooh-btn-single:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(2, 132, 199, 0.45);
              }
              .ooh-btn-all {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: #ffffff;
                box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
              }
              .ooh-btn-all:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(5, 150, 105, 0.45);
              }
              .ooh-btn-text-side {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                text-align: right;
                gap: 2px;
              }
              .ooh-btn-main-text {
                font-size: 0.95rem;
                font-weight: 800;
                display: inline-flex;
                align-items: center;
                gap: 6px;
              }
              .ooh-btn-sub-text {
                font-size: 0.74rem;
                opacity: 0.88;
                font-weight: 600;
              }
              .ooh-tag-best {
                background: #fef08a;
                color: #854d0e;
                font-size: 0.68rem;
                font-weight: 900;
                padding: 2px 7px;
                border-radius: 10px;
                margin-left: 4px;
              }
              .ooh-btn-price-pill {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 5px 12px;
                border-radius: 12px;
                font-size: 0.88rem;
                font-weight: 900;
                letter-spacing: 0.3px;
                white-space: nowrap;
              }
              .ooh-insufficient-card {
                background: #fef2f2;
                border: 1.5px solid #fecaca;
                border-radius: 16px;
                padding: 12px 14px;
                text-align: right;
                color: #991b1b;
              }
              .ooh-insufficient-title {
                font-weight: 800;
                font-size: 0.88rem;
                margin-bottom: 4px;
                display: inline-flex;
                align-items: center;
                gap: 6px;
              }
              .ooh-insufficient-desc {
                font-size: 0.8rem;
                color: #b91c1c;
                line-height: 1.5;
                margin: 0;
                font-weight: 600;
              }
            </style>

            <div class="ooh-badge-wrap">
              <div class="ooh-badge-glow"></div>
              <div class="ooh-badge-circle"><svg viewBox="0 0 24 24" width="38" height="38" fill="#f43f5e"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09L12 10.5l1.5-2.5L12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/><path d="M12 5l-1.5 3 2 2.5-2 3.5 2 3-1 2" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            </div>

            <h2 class="ooh-title">قلوبك خلصت يا بطل!</h2>
            <p class="ooh-subtitle">محتاج قلوب علشان تكمل التمارين في المستوى ده</p>

            <div class="ooh-hearts-track" title="${hearts} من 5 قلوب">
              ${Array.from({length: 5}, (_, i) => i < hearts
                ? `<span class="ooh-heart-slot"><svg viewBox="0 0 24 24" width="22" height="22" fill="#f43f5e" class="ooh-heart-pulse-svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>`
                : `<span class="ooh-heart-slot"><svg viewBox="0 0 24 24" width="22" height="22" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>`
              ).join('')}
            </div>

            <div class="ooh-recharge-card">
              <div class="ooh-recharge-header">
                <span class="ooh-recharge-badge"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> شحن القلوب كل 24 ساعة</span>
                <span class="ooh-recharge-max">حتى 5 قلوب</span>
              </div>
              <div class="ooh-recharge-desc">
                القلوب بتتشحن لوحدها كل ٢٤ ساعة لحد ما تكمل ٥ قلوب كاملة (قلب جديد كل ٤.٨ ساعة).
              </div>
              <div class="ooh-recharge-timer">
                <span style="display:inline-flex;align-items:center;gap:5px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M12 2v3M9 2h6M19 6l1.5-1.5"/></svg> القلب اللي جاي هيتشحن خلال:</span>
                <span id="ooh-live-timer" style="font-weight:900;color:#0284c7;">ثواني بنحسب...</span>
              </div>
            </div>

            <div class="ooh-wallet-strip">
              <span class="ooh-wallet-label">رصيدك دلوقتي:</span>
              <span class="ooh-wallet-val"><svg viewBox="0 0 24 24" width="17" height="17" fill="#f59e0b" stroke="#d97706" stroke-width="1.2" style="vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <b>${currentXP} XP</b></span>
            </div>

            ${canBuySingle ? `
              <div class="ooh-actions">
                <button type="button" id="swal-buy-1-heart" class="ooh-btn-buy ooh-btn-single">
                  <div class="ooh-btn-text-side">
                    <span class="ooh-btn-main-text">شراء قلب واحد <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" style="vertical-align:middle;display:inline-block;margin:0 2px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
                    <span class="ooh-btn-sub-text">كمّل التمرين علطول</span>
                  </div>
                  <span class="ooh-btn-price-pill">${costPerHeart} XP</span>
                </button>
                ${canBuyFull ? `
                  <button type="button" id="swal-buy-all-hearts" class="ooh-btn-buy ooh-btn-all">
                    <div class="ooh-btn-text-side">
                      <span class="ooh-btn-main-text">
                        املا القلوب كلها (${heartsNeeded} قلوب)
                        <span class="ooh-tag-best">أوفرلك</span>
                      </span>
                      <span class="ooh-btn-sub-text">ارجع بـ ٥ قلوب كاملة فوراً</span>
                    </div>
                    <span class="ooh-btn-price-pill">${fullCost} XP</span>
                  </button>
                ` : ''}
              </div>
            ` : `
              <div class="ooh-insufficient-card">
                <div class="ooh-insufficient-title"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M9 18h6m-4 3h2m-1-18a7 7 0 0 0-4.9 12c.7.7 1.1 1.6 1.1 2.5v.5h7.6v-.5c0-.9.4-1.8 1.1-2.5A7 7 0 0 0 12 3z"/></svg> رصيدك من الـ XP مش كفاية للشراء دلوقتي</div>
                <p class="ooh-insufficient-desc">
                  سعر القلب الواحد <b>${costPerHeart} XP</b> ورصيدك <b>${currentXP} XP</b>.<br>
                  يمكنك الانتظار حتى اكتمال شحن القلوب كل 24 ساعة، أو مراجعة الدروس السابقة لكسب المزيد من الـ XP!
                </p>
              </div>
            `}
          </div>
        `;

        let boughtHearts = false;
        let countdownInterval = null;

        const result = await Swal.fire({
          html: htmlContent,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: 'العودة لمسار التعلم',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          backdrop: 'rgba(15, 23, 42, 0.75)',
          customClass: {
            popup: 'mg-ooh-popup',
            cancelButton: 'mg-ooh-back-btn'
          },
          didOpen: () => {
            const timerValEl = document.getElementById('ooh-live-timer');
            const updateLiveTimer = () => {
              if (!timerValEl) return;
              let timeInfo = null;
              if (game.getTimeUntilNextHeart) {
                timeInfo = game.getTimeUntilNextHeart(uid);
              }
              if (timeInfo && !timeInfo.isFull) {
                const sec = Number(timeInfo.secondsRemaining || 0);
                const h = Math.floor(sec / 3600);
                const m = Math.floor((sec % 3600) / 60);
                const s = sec % 60;
                const pad = (n) => (n < 10 ? '0' + n : String(n));
                const hStr = h > 0 ? `${h} ساعة و ` : '';
                const mStr = `${m} دقيقة و `;
                const sStr = `${pad(s)} ثانية`;
                timerValEl.innerHTML = `<b style="color:#0284c7;font-weight:900;">${hStr}${mStr}${sStr}</b>`;
              } else {
                timerValEl.innerHTML = `<b style="color:#0284c7;font-weight:900;">مكتمل بالكامل</b>`;
              }
            };
            updateLiveTimer();
            countdownInterval = setInterval(updateLiveTimer, 1000);

            const performHeartPurchase = async (count, cost) => {
              if (!game.buyHeartsWithXp) return;
              try {
                const buyRes = await game.buyHeartsWithXp(uid, count, cost);
                if (buyRes && buyRes.success) {
                  boughtHearts = true;
                  if (countdownInterval) clearInterval(countdownInterval);
                  const newHearts = Number(buyRes?.prog?.hearts ?? buyRes?.hearts ?? count);
                  currentRunnerHearts = newHearts;

                  const runnerHeartsEl = document.getElementById('runner-hearts-count');
                  if (runnerHeartsEl) runnerHeartsEl.textContent = newHearts;

                  await refreshStatsDisplay();
                  if (game.sound) game.sound.playCorrect();
                  showToast(count === 1 ? 'تم شراء 1 قلب بنجاح! (+1)' : `تم ملء جميع القلوب (${count} قلوب) بنجاح!`);

                  isOutOfHeartsModalOpen = false;
                  const runnerOverlayEl = document.getElementById('challenge-runner-overlay');
                  if (runnerOverlayEl) {
                    runnerOverlayEl.style.pointerEvents = 'auto';
                  }

                  Swal.close();

                  const isRunnerActive = runnerOverlayEl && runnerOverlayEl.style.display === 'flex';
                  if (isRunnerActive && currentChallenges && currentChallenges.length > 0) {
                    runnerState = 'answering';
                    loadChallenge(currentChallengeIndex);
                  } else if (selectedLesson) {
                    startLessonRunner(selectedLesson);
                  }
                } else {
                  showToast('تعذر الشراء، رصيد الـ XP غير كافٍ');
                }
              } catch (errBuy) {
                console.error('Error buying hearts:', errBuy);
                showToast('حدث خطأ أثناء الشراء، يرجى المحاولة ثانية');
              }
            };

            const b1 = document.getElementById('swal-buy-1-heart');
            if (b1) {
              b1.onclick = async () => {
                b1.disabled = true;
                b1.style.opacity = '0.7';
                await performHeartPurchase(1, costPerHeart);
                b1.disabled = false;
                b1.style.opacity = '1';
              };
            }
            const bAll = document.getElementById('swal-buy-all-hearts');
            if (bAll) {
              bAll.onclick = async () => {
                bAll.disabled = true;
                bAll.style.opacity = '0.7';
                await performHeartPurchase(heartsNeeded, costPerHeart);
                bAll.disabled = false;
                bAll.style.opacity = '1';
              };
            }
          },
          willClose: () => {
            if (countdownInterval) clearInterval(countdownInterval);
          }
        });

        if (countdownInterval) clearInterval(countdownInterval);
        isOutOfHeartsModalOpen = false;
        if (runnerOverlay) {
          runnerOverlay.style.pointerEvents = 'auto';
        }

        if (!boughtHearts) {
          closeRunner();
        }
      }

      function finishLessonSuccess() {
        if (typeof cleanupTraceOrientationListener === 'function') {
          cleanupTraceOrientationListener();
        }
        const runnerProgress = document.getElementById('runner-progress-fill');
        if (runnerProgress) runnerProgress.style.width = '100%';
        if (game.sound) game.sound.playVictory();

        const accuracy = Math.round((correctAnswersCount / Math.max(1, currentChallenges.length)) * 100);
        const uid = getAuthUserId();
        const earnableCount = (selectedLesson && Array.isArray(selectedLesson.challenges))
          ? selectedLesson.challenges
              .filter(c => c.type !== 'text_view' && c.type !== 'letter_overview' && c.type !== 'word_overview' && c.type !== 'lesson_overview' && c.type !== 'image_view')
              .reduce((sum, c) => sum + ((c.xp_reward !== undefined && c.xp_reward !== null && !isNaN(parseInt(c.xp_reward, 10))) ? parseInt(c.xp_reward, 10) : 1), 0)
          : (parseInt(selectedLesson?.xp_reward, 10) || 5);
        const fullConfiguredXp = Math.max(1, earnableCount);
        const earnedXp = isReplayingLesson ? 0 : (sessionXpEarned > 0 ? sessionXpEarned : fullConfiguredXp);

        const vXp = document.getElementById('v-xp-gained');
        const vAcc = document.getElementById('v-accuracy');
        const victoryModal = document.getElementById('victory-modal');

        const displayedGainedXp = isReplayingLesson ? 'مراجعة (0 XP)' : `+${(sessionXpEarned > 0 ? sessionXpEarned : earnedXp)} XP`;
        if (vXp) vXp.textContent = displayedGainedXp;
        if (vAcc) vAcc.textContent = `${accuracy}%`;

        // إظهار شاشة النصر فوراً بدون أي تعليق أو تأخير (0 ميلي ثانية)
        if (victoryModal) victoryModal.style.display = 'flex';

        // حفظ التقدم ومزامنة السحابة في الخلفية مع تحديث واجهة النصر بالقيمة الحقيقية
        if (game.completeLesson && selectedLesson) {
          const finalXpToPass = isReplayingLesson ? 0 : (sessionXpEarned > 0 ? sessionXpEarned : earnedXp);
          game.completeLesson(uid, selectedLesson.id, accuracy, selectedNextLessonId, finalXpToPass).then(res => {
            if (vXp) {
              const gainedVal = res?.added_xp ?? (isReplayingLesson ? 0 : sessionXpEarned);
              vXp.textContent = isReplayingLesson ? 'مراجعة (0 XP)' : `+${gainedVal} XP`;
            }
            if (typeof refreshStatsDisplay === 'function') refreshStatsDisplay();
            if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
          }).catch(e => {
            console.warn('Background completeLesson error:', e);
          });

          // مسح سجل التمارين المُجاب عليها بعد إكمال الدرس بالكامل (لم يعد مطلوباً)
          try {
            const answeredKey = `mg_coptic_answered_${uid || 'guest'}_${selectedLesson.id}`;
            localStorage.removeItem(answeredKey);
          } catch(e) {}
          sessionAnsweredChallenges = new Set();
        }
      }

      window.openImageZoomModal = function(imageUrl, caption) {
        if (!imageUrl) return;
        let modal = document.getElementById('global-image-zoom-modal');
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'global-image-zoom-modal';
          modal.className = 'global-image-zoom-modal';
          modal.innerHTML = `
            <div class="image-zoom-controls">
              <button type="button" id="btn-zoom-in-action" class="image-zoom-btn" title="تكبير (+)">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
              <button type="button" id="btn-zoom-out-action" class="image-zoom-btn" title="تصغير (−)">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
              <button type="button" id="btn-zoom-close-action" class="image-zoom-btn close-btn" title="إغلاق (Esc)">✕</button>
            </div>
            <div class="image-zoom-viewport" id="image-zoom-viewport">
              <img id="image-zoom-target" src="" alt="صورة مكبرة" />
              <div id="image-zoom-caption" class="image-zoom-caption"></div>
            </div>
            <div class="image-zoom-hint">انقر نقراً مزدوجاً للتبديل بين التكبير، أو انقر في أي مكان فارغ للإغلاق</div>
          `;
          document.body.appendChild(modal);

          let currentZoom = 1;
          const targetImg = modal.querySelector('#image-zoom-target');
          const setZoom = (z) => {
            currentZoom = Math.max(0.6, Math.min(3.5, z));
            targetImg.style.transform = `scale(${currentZoom})`;
          };

          modal.querySelector('#btn-zoom-in-action').onclick = (e) => {
            e.stopPropagation();
            setZoom(currentZoom + 0.35);
          };
          modal.querySelector('#btn-zoom-out-action').onclick = (e) => {
            e.stopPropagation();
            setZoom(currentZoom - 0.35);
          };
          modal.querySelector('#btn-zoom-close-action').onclick = (e) => {
            e.stopPropagation();
            closeZoom();
          };

          modal.onclick = (e) => {
            if (e.target === modal || e.target.id === 'image-zoom-viewport') {
              closeZoom();
            }
          };

          targetImg.ondblclick = (e) => {
            e.stopPropagation();
            setZoom(currentZoom > 1.2 ? 1 : 1.8);
          };

          function closeZoom() {
            modal.classList.remove('active');
            setTimeout(() => {
              modal.style.display = 'none';
              currentZoom = 1;
              targetImg.style.transform = 'scale(1)';
            }, 220);
          }
          modal._closeZoom = closeZoom;
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
              closeZoom();
            }
          });
        }

        const img = modal.querySelector('#image-zoom-target');
        const cap = modal.querySelector('#image-zoom-caption');
        if (img) {
          img.src = imageUrl;
          img.style.transform = 'scale(1)';
        }
        if (cap) {
          cap.textContent = caption || '';
          cap.style.display = caption ? 'block' : 'none';
        }
        modal.style.display = 'flex';
        requestAnimationFrame(() => modal.classList.add('active'));
      };
    })();
