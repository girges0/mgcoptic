    function hydrateHomeFromCacheSync() {
      try {
        // 1. استعادة نقاط XP والستريك والرتبة
        const prog = getUserProgressData();
        const xp = prog.points ?? prog.total_points ?? 0;
        const streak = prog.streak_days ?? 1;

        const cardXp = document.getElementById('home-card-xp');
        if (cardXp) cardXp.textContent = xp;
        const cardStreak = document.getElementById('home-card-streak');
        if (cardStreak) cardStreak.textContent = streak;

        // تحديث إحصائيات الشريط العلوي
        const tbXp = document.getElementById('topbar-xp-val') || document.getElementById('points-val');
        if (tbXp) tbXp.textContent = xp;
        const tbStreak = document.getElementById('topbar-streak-val') || document.getElementById('streak-val');
        if (tbStreak) tbStreak.textContent = streak;
        const hearts = prog.hearts ?? 5;
        const tbHearts = document.getElementById('topbar-hearts-val') || document.getElementById('hearts-val');
        if (tbHearts) tbHearts.textContent = hearts;

        let tierLevel = 'المستوى 1';
        if (xp >= 1000) { tierLevel = 'المستوى 5'; }
        else if (xp >= 600) { tierLevel = 'المستوى 4'; }
        else if (xp >= 300) { tierLevel = 'المستوى 3'; }
        else if (xp >= 100) { tierLevel = 'المستوى 2'; }

        // استعادة ترتيب التصنيف من الذاكرة المحلية
        const cachedRankRaw = localStorage.getItem('mg_coptic_cached_user_rank');
        let rankNum = null;
        if (cachedRankRaw) {
          try {
            const cachedRank = JSON.parse(cachedRankRaw);
            rankNum = cachedRank.rank ?? null;
          } catch (e) { }
        }
        updateUserRankUI(rankNum);

        const tagText = document.getElementById('home-curriculum-tag-text');
        if (tagText) tagText.textContent = `تابع التعلّم • ${tierLevel}`;

        // 2. استعادة بيانات كارت المسار المحفوظة مسبقاً لمنع ظهور الديفولت
        const heroCacheRaw = localStorage.getItem('mg_coptic_cached_hero_card');
        if (heroCacheRaw) {
          try {
            const heroCache = JSON.parse(heroCacheRaw);
            if (heroCache && heroCache.version === 3 && heroCache.lessonTitle && !heroCache.lessonTitle.includes('تحدي') && !heroCache.lessonTitle.includes('تطبيق') && heroCache.lessonTitle !== 'رقم1') {
              if (heroCache.lessonTitle) {
                const lTitleEl = document.getElementById('home-lesson-title');
                if (lTitleEl) lTitleEl.textContent = heroCache.lessonTitle;
              }
              if (heroCache.unitTitle) {
                const uTitleEl = document.getElementById('home-unit-title');
                if (uTitleEl) uTitleEl.textContent = heroCache.unitTitle;
              }
              if (heroCache.btnHref) {
                const btnEl = document.getElementById('home-continue-btn');
                if (btnEl) btnEl.href = heroCache.btnHref;
              }
              if (heroCache.xpRewardText) {
                const xpRewardEl = document.getElementById('home-hero-xp-reward');
                if (xpRewardEl) xpRewardEl.textContent = heroCache.xpRewardText;
              }
              if (heroCache.progressCount) {
                const countEl = document.getElementById('home-progress-count');
                if (countEl) countEl.textContent = heroCache.progressCount;
              }
              if (heroCache.progressPct) {
                const pctEl = document.getElementById('home-progress-pct');
                if (pctEl) pctEl.textContent = heroCache.progressPct;
              }
              if (heroCache.fillWidth) {
                const fillEl = document.getElementById('home-progress-fill');
                if (fillEl) fillEl.style.width = heroCache.fillWidth;
              }
            } else {
              localStorage.removeItem('mg_coptic_cached_hero_card');
            }
          } catch(e) {
            localStorage.removeItem('mg_coptic_cached_hero_card');
          }
        }

        // 3. هدف اليوم الفوري الحقيقي
        updateDailyGoalUI();

        // 4. اسم وصورة الترحيب
        const user = getUserProfileData();
        if (user && user.full_name) {
          const firstName = user.full_name.trim().split(' ')[0] || user.full_name.trim();
          const initial = user.full_name.trim().length > 0 ? user.full_name.trim().charAt(0) : 'Ⲁ';
          const greetName = document.getElementById('home-greeting-name');
          if (greetName) greetName.textContent = 'أهلاً، ' + firstName;
          const homeMono = document.getElementById('home-monogram');
          if (homeMono) {
            if (user.avatar_url) {
              homeMono.innerHTML = '<img src="' + user.avatar_url + '" alt="' + user.full_name + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
            } else {
              homeMono.innerHTML = '<span style="font-size:1.35rem;font-weight:900;line-height:1;display:flex;align-items:center;justify-content:center;color:#FFFFFF;width:100%;height:100%;">' + initial + '</span>';
            }
          }
          const tbAvatar = document.getElementById('topbar-avatar');
          if (tbAvatar) {
            if (user.avatar_url) {
              tbAvatar.innerHTML = '<img src="' + user.avatar_url + '" alt="' + user.full_name + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
            } else {
              tbAvatar.innerHTML = '<span style="font-size:1.1rem;font-weight:900;line-height:1;display:flex;align-items:center;justify-content:center;color:#FFFFFF;width:100%;height:100%;">' + initial + '</span>';
            }
          }
        }
      } catch (e) {
        console.warn('hydrateHomeFromCacheSync error:', e);
      }
    }

    async function syncHomeLearningProgress() {
      try {
        updateDailyGoalUI();
        if (!window.MGCopticGame) return;
        const game = window.MGCopticGame;
        const user = currentAuthUser || getUserProfileData();
        const userId = user ? user.id : null;

        const curriculum = await game.getCurriculum();
        const progressMap = await game.getLessonProgress(userId);
        const userProg = (await game.getProgress(userId)) || getUserProgressData();

        const xp = userProg.points ?? userProg.total_points ?? 0;
        const streak = userProg.streak_days ?? 1;

        // تحديث إحصائيات الكروت الثلاثة
        const cardXp = document.getElementById('home-card-xp');
        if (cardXp) cardXp.textContent = xp;
        const cardStreak = document.getElementById('home-card-streak');
        if (cardStreak) cardStreak.textContent = streak;

        // تحديث إحصائيات الشريط العلوي
        const tbXp3 = document.getElementById('topbar-xp-val') || document.getElementById('points-val');
        if (tbXp3) tbXp3.textContent = xp;
        const tbStreak3 = document.getElementById('topbar-streak-val') || document.getElementById('streak-val');
        if (tbStreak3) tbStreak3.textContent = streak;
        const tbHearts3 = document.getElementById('topbar-hearts-val') || document.getElementById('hearts-val');
        if (tbHearts3) tbHearts3.textContent = userProg.hearts ?? 5;

        if (!curriculum || !curriculum.units || curriculum.units.length === 0) return;

        // ترتيب المستويات والوحدات بدقة (ترتيب المستوى أولاً ثم ترتيب الوحدة)
        const levels = (curriculum.levels || []).slice().sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1));
        const levelMap = new Map();
        levels.forEach((lvl, idx) => {
          levelMap.set(String(lvl.id), {
            ...lvl,
            order: Number(lvl.order_index) || (idx + 1)
          });
        });

        const sortedUnits = (curriculum.units || []).slice().sort((a,b) => {
          const lvlA = levelMap.get(String(a.level_id))?.order ?? 9999;
          const lvlB = levelMap.get(String(b.level_id))?.order ?? 9999;
          if (lvlA !== lvlB) return lvlA - lvlB;
          return (Number(a.order_index) || 1) - (Number(b.order_index) || 1);
        });

        // بناء مصفوفة كافة محطات مسار التعلم الحقيقية (الدرس، التطبيق، التحدي)
        let allSteps = [];
        sortedUnits.forEach((unit, uIdx) => {
          const lvl = levelMap.get(String(unit.level_id));
          const levelTitle = lvl ? lvl.title : 'المستوى 1';
          const unitLessons = (unit.lessons && unit.lessons.length > 0)
            ? unit.lessons.slice().sort((a,b) => (a.order_index || 1) - (b.order_index || 1))
            : [{ id: unit.id * 100 + 1, title: unit.title, xp_reward: 20, practice_xp: 20, challenge_xp: 30 }];

          if (unitLessons.length === 1) {
            const baseLesson = unitLessons[0];
            const lesXp = parseInt(baseLesson.xp_reward, 10) || 20;
            const pracXp = parseInt(baseLesson.practice_xp, 10) || 20;
            const chalXp = parseInt(baseLesson.challenge_xp, 10) || 30;

            // 1. درس الشرح الأساسي
            allSteps.push({
              id: String(baseLesson.id),
              title: baseLesson.title || unit.title,
              unitTitle: unit.title,
              unitDesc: unit.description || '',
              unitIndex: uIdx + 1,
              levelTitle: levelTitle,
              xpReward: lesXp,
              kind: 'lesson'
            });

            // 2. محطة التطبيق والاستماع
            allSteps.push({
              id: `${baseLesson.id}_p`,
              title: baseLesson.title || unit.title,
              unitTitle: unit.title,
              unitDesc: unit.description || '',
              unitIndex: uIdx + 1,
              levelTitle: levelTitle,
              xpReward: pracXp,
              kind: 'practice'
            });

            // 3. محطة تحدي الإتقان
            allSteps.push({
              id: `${baseLesson.id}_c`,
              title: baseLesson.title || unit.title,
              unitTitle: unit.title,
              unitDesc: unit.description || '',
              unitIndex: uIdx + 1,
              levelTitle: levelTitle,
              xpReward: chalXp,
              kind: 'challenge'
            });
          } else {
            unitLessons.forEach((les, lIdx) => {
              allSteps.push({
                id: String(les.id),
                title: les.title || unit.title,
                unitTitle: unit.title,
                unitDesc: unit.description || '',
                unitIndex: uIdx + 1,
                levelTitle: levelTitle,
                xpReward: parseInt(les.xp_reward, 10) || 20,
                kind: 'lesson'
              });
            });
          }
        });

        const totalStepsCount = allSteps.length;
        let completedCount = 0;
        let activeStep = null;

        for (let i = 0; i < allSteps.length; i++) {
          const step = allSteps[i];
          const prog = progressMap[String(step.id)];
          if (prog && prog.status === 'completed') {
            completedCount++;
          } else if (!activeStep) {
            activeStep = step; // أول خطوة غير مكتملة
          }
        }

        if (!activeStep && allSteps.length > 0) {
          activeStep = allSteps[allSteps.length - 1];
        }

        if (activeStep) {
          const lTitleEl = document.getElementById('home-lesson-title');
          if (lTitleEl) lTitleEl.textContent = activeStep.title;

          const uTitleEl = document.getElementById('home-unit-title');
          if (uTitleEl) {
            let desc = activeStep.unitTitle || 'الوحدة الأولى';
            if (activeStep.unitDesc && !activeStep.unitDesc.includes('ⲁ') && !activeStep.unitDesc.includes('Z')) {
              desc += ' — ' + activeStep.unitDesc;
            }
            uTitleEl.textContent = desc;
          }

          const tagText = document.getElementById('home-curriculum-tag-text');
          if (tagText) {
            const lvlTag = activeStep.levelTitle ? (activeStep.levelTitle.split(':')[0] || 'المستوى 1') : 'المستوى 1';
            tagText.textContent = `تابع التعلّم • ${lvlTag}`;
          }

          const btnEl = document.getElementById('home-continue-btn');
          if (btnEl) {
            btnEl.onclick = () => {
              switchTab('learn');
              if (activeStep && activeStep.id && typeof openLessonDetails === 'function') {
                setTimeout(() => openLessonDetails(String(activeStep.id)), 150);
              }
            };
          }

          const xpRewardEl = document.getElementById('home-hero-xp-reward');
          if (xpRewardEl) xpRewardEl.textContent = `+${activeStep.xpReward} XP عند الإتمام`;

          const activeIndex = allSteps.findIndex(s => s.id === activeStep.id) + 1;
          const pct = totalStepsCount > 0 ? Math.round((completedCount / totalStepsCount) * 100) : 0;
          const displayFillPct = totalStepsCount > 0 ? Math.min(100, Math.max(0, pct)) : 0;

          const countEl = document.getElementById('home-progress-count');
          if (countEl) countEl.textContent = `ليفيل ${activeIndex > 0 ? activeIndex : 1} من ${totalStepsCount}`;

          const pctEl = document.getElementById('home-progress-pct');
          if (pctEl) pctEl.textContent = `${pct}%`;

          const fillEl = document.getElementById('home-progress-fill');
          if (fillEl) fillEl.style.width = `${displayFillPct}%`;

          // حفظ نسخة محسوبة في الكاش للاستعادة الفورية في الزيارة التالية
          try {
            localStorage.setItem('mg_coptic_cached_hero_card', JSON.stringify({
              version: 3,
              lessonTitle: activeStep.title,
              unitTitle: uTitleEl ? uTitleEl.textContent : '',
              btnHref: 'learn.html?lesson=' + encodeURIComponent(activeStep.id),
              xpRewardText: `+${activeStep.xpReward} XP عند الإتمام`,
              progressCount: `ليفيل ${activeIndex > 0 ? activeIndex : 1} من ${totalStepsCount}`,
              progressPct: `${pct}%`,
              fillWidth: `${displayFillPct}%`
            }));
          } catch(e){}
        }

        // تحديث هدف اليوم الحقيقي
        updateDailyGoalUI();

      } catch (e) {
        console.warn('syncHomeLearningProgress error:', e);
      }
    }

    function syncUserProfileUI() {
      const user = currentAuthUser || getUserProfileData();
      const prog = getUserProgressData();
      const isLoggedIn = !!user;

      // 1. Topbar
      const tbName = document.getElementById('topbar-username');
      const tbAvatar = document.getElementById('topbar-avatar');
      const tbLoginBtn = document.getElementById('topbar-login-btn');
      const tbUserChip = document.getElementById('topbar-user-badge');

      if (isLoggedIn) {
        const initial = (user.full_name && user.full_name.trim().length > 0) ? user.full_name.trim().charAt(0) : 'Ⲁ';
        if (tbName) { tbName.style.display = 'none'; tbName.textContent = user.full_name || 'بطل قبطي'; }
        if (tbAvatar) {
          if (user.avatar_url) {
            tbAvatar.innerHTML = '<img src="' + user.avatar_url + '" alt="' + (user.full_name || '') + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
          } else {
            tbAvatar.innerHTML = '<span style="font-size:1.1rem;font-weight:900;line-height:1;display:flex;align-items:center;justify-content:center;color:#FFFFFF;width:100%;height:100%;">' + initial + '</span>';
          }
        }
        if (tbUserChip) tbUserChip.style.display = 'inline-flex';
        if (tbLoginBtn) tbLoginBtn.style.display = 'none';
      } else {
        if (tbAvatar) tbAvatar.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
        if (tbUserChip) tbUserChip.style.display = 'none';
        if (tbLoginBtn) tbLoginBtn.style.display = 'inline-flex';
      }

      // 2. Homepage learning card stats
      const totalXP = prog.points ?? prog.total_points ?? 0;
      const streakDays = prog.streak_days ?? 1;

      const cardStreak = document.getElementById('home-card-streak');
      if (cardStreak) cardStreak.textContent = streakDays;
      const cardXp = document.getElementById('home-card-xp');
      if (cardXp) cardXp.textContent = totalXP;

      // تحديث إحصائيات الشريط العلوي
      const tbXp2 = document.getElementById('topbar-xp-val') || document.getElementById('points-val');
      if (tbXp2) tbXp2.textContent = totalXP;
      const tbStreak2 = document.getElementById('topbar-streak-val') || document.getElementById('streak-val');
      if (tbStreak2) tbStreak2.textContent = streakDays;
      const tbHearts2 = document.getElementById('topbar-hearts-val') || document.getElementById('hearts-val');
      if (tbHearts2) tbHearts2.textContent = prog.hearts ?? 5;

      const greetName = document.getElementById('home-greeting-name');
      const monogram = document.getElementById('home-monogram');

      if (user && user.full_name) {
        const firstName = user.full_name.trim().split(' ')[0] || user.full_name.trim();
        const initial = (user.full_name.trim().length > 0) ? user.full_name.trim().charAt(0) : 'Ⲁ';
        if (greetName) greetName.textContent = 'أهلاً، ' + firstName;

        if (monogram) {
          if (user.avatar_url) {
            monogram.innerHTML = '<img src="' + user.avatar_url + '" alt="' + user.full_name + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
          } else {
            monogram.innerHTML = '<span style="font-size:1.35rem;font-weight:900;line-height:1;display:flex;align-items:center;justify-content:center;color:#FFFFFF;width:100%;height:100%;">' + initial + '</span>';
          }
        }
      } else {
        if (greetName) greetName.textContent = 'أهلاً بك';
        if (monogram) {
          monogram.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
        }
      }

      syncHomeLearningProgress();

      const xpEl = document.getElementById('home-stat-xp');
      if (xpEl) xpEl.textContent = (prog.total_points || 0) + ' XP';
      const streakEl = document.getElementById('home-stat-streak');
      if (streakEl) streakEl.textContent = (prog.streak_days || 1) + ' يوم';
      const heartsEl = document.getElementById('home-stat-hearts');
      if (heartsEl) {
        const h = Math.min(prog.hearts ?? 5, 5);
        heartsEl.textContent = h + ' / 5';
      }

      // 3. Settings tab inputs & details
      const accDetails = document.getElementById('settings-account-details');
      const accGuest = document.getElementById('settings-account-guest');
      const emailEl = document.getElementById('settings-user-email');
      const roleEl = document.getElementById('settings-user-role');
      const sInput = document.getElementById('settings-name-input');
      const sImg = document.getElementById('settings-avatar-preview');
      const sFallback = document.getElementById('settings-avatar-fallback');

      if (isLoggedIn) {
        if (accDetails) accDetails.style.display = 'block';
        if (accGuest) accGuest.style.display = 'none';
        if (emailEl) emailEl.textContent = user.email || '-';
        if (roleEl) roleEl.textContent = (user.role === 'admin') ? 'مدير المنصة' : 'طالب';
        if (sInput && !sInput.value) sInput.value = user.full_name || '';
        const initial = (user.full_name && user.full_name.trim().length > 0) ? user.full_name.trim().charAt(0).toUpperCase() : 'Ⲁ';
        if (sImg && sFallback) {
          if (user.avatar_url) {
            sImg.src = user.avatar_url;
            sImg.style.display = 'block';
            sFallback.style.display = 'none';
          } else {
            sImg.style.display = 'none';
            sFallback.style.display = 'flex';
            sFallback.innerHTML = '<span style="font-size:2.2rem;font-weight:900;line-height:1;display:flex;align-items:center;justify-content:center;color:#FFFFFF;width:100%;height:100%;">' + initial + '</span>';
          }
        }
      } else {
        if (accDetails) accDetails.style.display = 'none';
        if (accGuest) accGuest.style.display = 'block';
        if (sInput) sInput.value = '';
        if (sImg) sImg.style.display = 'none';
        if (sFallback) {
          sFallback.style.display = 'flex';
          sFallback.innerHTML = '<svg width="44" height="44" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
        }
      }
    }

    /* ============ DAILY GOAL TRACKING & MODAL (حقيقي ودقيق) ============ */
    function getDailyGoalProgressData() {
      const user = (typeof currentAuthUser !== 'undefined' && currentAuthUser) || (typeof getUserProfileData === 'function' ? getUserProfileData() : null);
      const uid = user && user.id ? user.id : 'guest';
      const goalKey = `mg_coptic_daily_goal_${uid}`;
      const dateKey = `mg_coptic_daily_xp_date_${uid}`;
      const valKey = `mg_coptic_daily_xp_val_${uid}`;

      const goalXP = parseInt(localStorage.getItem(goalKey) || localStorage.getItem('mg_coptic_daily_goal') || '30', 10);
      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem(dateKey) || localStorage.getItem('mg_coptic_daily_xp_date');
      let earnedToday = 0;

      // تنظيف تلقائي للبيانات التالفة القديمة
      const cleanFixedFlag = localStorage.getItem('mg_coptic_daily_xp_fixed_v2');
      if (!cleanFixedFlag) {
        localStorage.setItem('mg_coptic_daily_xp_fixed_v2', 'true');
        localStorage.setItem(dateKey, todayStr);
        localStorage.setItem(valKey, '0');
        localStorage.setItem('mg_coptic_daily_xp_date', todayStr);
        localStorage.setItem('mg_coptic_daily_xp_val', '0');
        return { goalXP, earnedToday: 0 };
      }

      if (savedDate !== todayStr) {
        // بداية يوم جديد: النقاط تبدأ من 0 دائماً ولا تفبرك من الرصيد الكلي
        earnedToday = 0;
        localStorage.setItem(dateKey, todayStr);
        localStorage.setItem(valKey, '0');
        localStorage.setItem('mg_coptic_daily_xp_date', todayStr);
        localStorage.setItem('mg_coptic_daily_xp_val', '0');
      } else {
        earnedToday = parseInt(localStorage.getItem(valKey) || localStorage.getItem('mg_coptic_daily_xp_val') || '0', 10);
      }

      if (isNaN(earnedToday) || earnedToday < 0) {
        earnedToday = 0;
      }

      return { goalXP, earnedToday };
    }

    function updateDailyGoalUI() {
      const { goalXP, earnedToday } = getDailyGoalProgressData();
      const isCompleted = earnedToday >= goalXP;
      const pct = Math.min(100, Math.round((earnedToday / goalXP) * 100));

      const goalTitleEl = document.getElementById('home-goal-title');
      if (goalTitleEl) {
        goalTitleEl.textContent = `تعلّم واكسب ${goalXP} نقطة XP`;
      }

      const goalTextEl = document.getElementById('home-goal-text');
      if (goalTextEl) {
        goalTextEl.textContent = `${earnedToday} / ${goalXP} XP`;
      }

      const goalFillEl = document.getElementById('home-goal-fill');
      if (goalFillEl) {
        goalFillEl.style.width = `${pct}%`;
        if (isCompleted) {
          goalFillEl.style.background = 'linear-gradient(90deg, #10B981, #059669)';
        } else {
          goalFillEl.style.background = '';
        }
      }

      const goalBadgeEl = document.getElementById('home-goal-badge');
      if (goalBadgeEl) {
        if (isCompleted) {
          goalBadgeEl.textContent = 'مكتمل ✓';
          goalBadgeEl.style.background = '#E6F4EA';
          goalBadgeEl.style.color = '#137333';
        } else {
          const remaining = Math.max(0, goalXP - earnedToday);
          goalBadgeEl.textContent = `+${remaining > 0 ? remaining : goalXP} XP`;
          goalBadgeEl.style.background = '';
          goalBadgeEl.style.color = '';
        }
      }
    }
    window.updateDailyGoalUI = updateDailyGoalUI;
    try { updateDailyGoalUI(); } catch (e) { }

    window.addTodayEarnedXP = function (amount) {
      if (!amount || amount <= 0) return;
      const user = (typeof currentAuthUser !== 'undefined' && currentAuthUser) || (typeof getUserProfileData === 'function' ? getUserProfileData() : null);
      const uid = user && user.id ? user.id : 'guest';
      const dateKey = `mg_coptic_daily_xp_date_${uid}`;
      const valKey = `mg_coptic_daily_xp_val_${uid}`;

      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem(dateKey) || localStorage.getItem('mg_coptic_daily_xp_date');
      let current = 0;
      if (savedDate === todayStr) {
        current = parseInt(localStorage.getItem(valKey) || localStorage.getItem('mg_coptic_daily_xp_val') || '0', 10);
      }
      const updated = Math.max(0, current + amount);
      localStorage.setItem(dateKey, todayStr);
      localStorage.setItem(valKey, String(updated));
      localStorage.setItem('mg_coptic_daily_xp_date', todayStr);
      localStorage.setItem('mg_coptic_daily_xp_val', String(updated));
      updateDailyGoalUI();
    };

    function saveDailyGoalSetting(goal) {
      const numGoal = parseInt(goal, 10) || 30;
      const user = (typeof currentAuthUser !== 'undefined' && currentAuthUser) || (typeof getUserProfileData === 'function' ? getUserProfileData() : null);
      const uid = user && user.id ? user.id : 'guest';
      localStorage.setItem(`mg_coptic_daily_goal_${uid}`, String(numGoal));
      localStorage.setItem('mg_coptic_daily_goal', String(numGoal));
      updateDailyGoalUI();
    }

    window.openDailyGoalModal = async function () {
      const currentGoal = parseInt(localStorage.getItem('mg_coptic_daily_goal') || '30', 10);
      const standardGoals = [
        { val: 15, title: 'خفيف', desc: '١٥ نقطة XP' },
        { val: 30, title: 'عادي (موصى به)', desc: '٣٠ نقطة XP' },
        { val: 50, title: 'جاد ومكثف', desc: '٥٠ نقطة XP' },
        { val: 100, title: 'تحدي الأبطال', desc: '١٠٠ نقطة XP' }
      ];

      const isCustom = !standardGoals.some(g => g.val === currentGoal);

      let optionsHtml = '';
      standardGoals.forEach(g => {
        const isSelected = !isCustom && g.val === currentGoal;
        optionsHtml += `
          <label class="daily-goal-option ${isSelected ? 'selected' : ''}" onclick="selectDailyGoalRadio('${g.val}')" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:2px solid ${isSelected ? 'var(--madder, #8C2430)' : '#E7DCC8'};border-radius:14px;margin-bottom:10px;cursor:pointer;background:${isSelected ? '#FDF4F5' : '#FFFDF8'};transition:all .2s ease;">
            <div style="text-align:right;">
              <div style="font-weight:800;font-size:.98rem;color:var(--ink, #2B1810);">${g.title}</div>
              <div style="font-size:.82rem;color:var(--ink-soft, #7C7267);">${g.desc}</div>
            </div>
            <input type="radio" name="daily_goal_choice" value="${g.val}" ${isSelected ? 'checked' : ''} style="accent-color:var(--madder, #8C2430);width:18px;height:18px;">
          </label>
        `;
      });

      // خيار الهدف المخصص
      optionsHtml += `
        <label class="daily-goal-option ${isCustom ? 'selected' : ''}" onclick="selectDailyGoalRadio('custom')" style="display:flex;flex-direction:column;gap:8px;padding:12px 16px;border:2px solid ${isCustom ? 'var(--madder, #8C2430)' : '#E7DCC8'};border-radius:14px;margin-bottom:10px;cursor:pointer;background:${isCustom ? '#FDF4F5' : '#FFFDF8'};transition:all .2s ease;">
          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
            <div style="text-align:right;">
              <div style="font-weight:800;font-size:.98rem;color:var(--ink, #2B1810);">هدف مخصص</div>
              <div style="font-size:.82rem;color:var(--ink-soft, #7C7267);">حدد عدد نقاط XP التي تناسبك</div>
            </div>
            <input type="radio" name="daily_goal_choice" value="custom" ${isCustom ? 'checked' : ''} style="accent-color:var(--madder, #8C2430);width:18px;height:18px;">
          </div>
          <div id="custom-goal-input-wrap" style="display:${isCustom ? 'flex' : 'none'};align-items:center;gap:8px;margin-top:6px;width:100%;">
            <input type="number" id="custom-goal-input" min="5" max="1000" step="5" value="${isCustom ? currentGoal : 40}" placeholder="أدخل عدد النقاط (مثال: 40)..." style="flex:1;padding:8px 12px;border:1.5px solid #E7DCC8;border-radius:10px;font-size:.95rem;font-weight:700;outline:none;background:#FFF;" onclick="event.stopPropagation();" oninput="event.stopPropagation();">
            <span style="font-size:.85rem;font-weight:700;color:var(--ink-soft);">XP</span>
          </div>
        </label>
      `;

      const { value: selectedGoal } = await Swal.fire({
        title: 'تعديل الهدف اليومي',
        html: `
          <div style="margin-top:10px;">
            <p style="font-size:.88rem;color:var(--ink-soft);margin-bottom:14px;">حدد مقدار نقاط الـ XP التي ترغب في اكتسابها يومياً لتحافظ على استمراريتك:</p>
            <div id="daily-goal-options-list">
              ${optionsHtml}
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'حفظ الهدف',
        cancelButtonText: 'إلغاء',
        customClass: {
          popup: 'coptic-swal-popup',
          confirmButton: 'coptic-swal-confirm',
          cancelButton: 'coptic-swal-cancel'
        },
        preConfirm: () => {
          const checked = document.querySelector('input[name="daily_goal_choice"]:checked');
          if (!checked) return currentGoal;
          if (checked.value === 'custom') {
            const customVal = parseInt(document.getElementById('custom-goal-input')?.value, 10);
            if (!customVal || customVal < 5 || isNaN(customVal)) {
              Swal.showValidationMessage('يرجى إدخال عدد نقاط صحيح (5 نقاط على الأقل)');
              return false;
            }
            return customVal;
          }
          return parseInt(checked.value, 10);
        }
      });

      if (selectedGoal) {
        saveDailyGoalSetting(selectedGoal);
        if (window.MGCopticGame && window.MGCopticGame.sound) {
          window.MGCopticGame.sound.playCorrect();
        }
        if (typeof showToast === 'function') {
          showToast(`تم تعيين هدفك اليومي إلى ${selectedGoal} XP بنجاح! 🎯`);
        }
      }
    };

    window.selectDailyGoalRadio = function (val) {
      const isCustom = val === 'custom';
      const radios = document.querySelectorAll('input[name="daily_goal_choice"]');
      radios.forEach(r => {
        const isThis = isCustom ? (r.value === 'custom') : (r.value === String(val));
        r.checked = isThis;
        const parent = r.closest('.daily-goal-option');
        if (parent) {
          parent.style.borderColor = isThis ? 'var(--madder, #8C2430)' : '#E7DCC8';
          parent.style.background = isThis ? '#FDF4F5' : '#FFFDF8';
        }
      });

      const customWrap = document.getElementById('custom-goal-input-wrap');
      if (customWrap) {
        customWrap.style.display = isCustom ? 'flex' : 'none';
        if (isCustom) {
          const input = document.getElementById('custom-goal-input');
          if (input) setTimeout(() => input.focus(), 100);
        }
      }
    };

    async function resetUserProgressConfirm() {
      const confirmed = await mgConfirm('إعادة تعيين التقدم', 'هل أنت متأكد من رغبتك في إعادة تعيين كافة نقاطك وتقدمك الدراسي؟<br><strong>لا يمكن التراجع عن هذا الإجراء.</strong>', 'warning', { confirmText: 'نعم، إعادة التعيين', cancelText: 'تراجع' });
      if (confirmed) {
        localStorage.removeItem('mg_coptic_progress');
        localStorage.removeItem('mg_coptic_lesson_progress');
        localStorage.removeItem('mg_coptic_claimed_chests');
        syncUserProfileUI();
        renderLeaderboardList();
        mgSuccess('تمت إعادة التعيين', 'تمت إعادة تعيين التقدم بنجاح.');
      }
    }
