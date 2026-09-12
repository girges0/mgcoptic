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

      async function refreshStatsDisplay(forcedProg = null) {
        try {
          const uid = getAuthUserId();
          let prog = forcedProg;
          if (!prog) {
            if (game && game.getProgress) {
              prog = await game.getProgress(uid);
            } else if (typeof getUserProgressData === 'function') {
              prog = getUserProgressData();
            }
          }
          if (!prog) return;

          const hearts = prog.hearts ?? 5;
          const xp = prog.points ?? prog.total_points ?? 0;
          const streak = prog.streak_days ?? 1;

          const runnerHearts = document.getElementById('runner-hearts-count');
          if (runnerHearts) runnerHearts.textContent = hearts;

          const tbXp = document.getElementById('topbar-xp-val') || document.getElementById('points-val');
          if (tbXp) tbXp.textContent = xp;
          const tbStreak = document.getElementById('topbar-streak-val') || document.getElementById('streak-val');
          if (tbStreak) tbStreak.textContent = streak;
          const tbHearts = document.getElementById('topbar-hearts-val') || document.getElementById('hearts-val');
          if (tbHearts) tbHearts.textContent = hearts;

          const cardXp = document.getElementById('home-card-xp');
          if (cardXp) cardXp.textContent = xp;
          const cardStreak = document.getElementById('home-card-streak');
          if (cardStreak) cardStreak.textContent = streak;

          if (typeof syncUserProfileUI === 'function') syncUserProfileUI();
          if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
        } catch(e){}
      }
      window.refreshStatsDisplay = refreshStatsDisplay;

      function drawSkillMapDOM() {
        const container = document.getElementById('curriculum-units-container');
        if (!container) return;

        if (!activeCurriculum || !activeCurriculum.units || activeCurriculum.units.length === 0) {
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

        sortedUnits.forEach((unit, unitIdx) => {
          // إضافة شريط المستوى عند الانتقال لمستوى جديد
          const unitLvlId = String(unit.level_id);
          const lvlInfo = levelMap.get(unitLvlId);
          if (lvlInfo && unitLvlId !== currentRenderedLevelId) {
            currentRenderedLevelId = unitLvlId;
            html += `
              <div class="level-section-header" style="margin: 40px auto 25px; text-align: center; max-width: 580px; position: relative;">
                <div style="display: inline-flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(135deg, #4A0D24 0%, #6B1530 100%); color: #FFE066; padding: 10px 28px; border-radius: 50px; border: 2px solid #C4A052; box-shadow: 0 6px 18px rgba(74,13,36,0.25);">
                  <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#FFE066; box-shadow:0 0 8px #FFE066;"></span>
                  <span style="font-size: 1.25rem; font-weight: 900; font-family: var(--font-display, inherit); color: #FFF; letter-spacing: -0.2px;">${escapeHtml(lvlInfo.title || `المستوى ${lvlInfo.order}`)}</span>
                  <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#FFE066; box-shadow:0 0 8px #FFE066;"></span>
                </div>
                ${lvlInfo.description ? `<p style="font-size: 0.9rem; color: var(--ink-soft, #706354); margin: 10px auto 0; max-width: 480px; font-weight: 600; line-height: 1.5;">${escapeHtml(lvlInfo.description)}</p>` : ''}
              </div>
            `;
          }

          const unitLessons = (unit.lessons && unit.lessons.length > 0) 
            ? unit.lessons.slice().sort((a,b) => (Number(a.order_index) || 1) - (Number(b.order_index) || 1)) 
            : [];

          const prevUnit = unitIdx === 0 ? null : sortedUnits[unitIdx - 1];
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
            
            let isUnlocked = false;
            if (step.requires === null) {
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
                    <div class="reward-card-lbl">نقاط خبرة إضافية</div>
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

        if (isPractice) {
          lessonCopy.title = foundLesson.title || foundUnit.title;
          lessonCopy.xp_reward = parseInt(foundLesson.practice_xp, 10) || 20;
          const pracChallenges = realChallenges.filter(c => c.type === 'listen' || c.type === 'listen_write' || c.type === 'read_select' || c.type === 'image_select' || c.type === 'match' || c.type === 'fill_blank' || c.audio_url || c.audio_text);
          lessonCopy.challenges = pracChallenges.length >= 2 ? pracChallenges : realChallenges;
        } else if (isChallenge) {
          lessonCopy.title = foundLesson.title || foundUnit.title;
          lessonCopy.xp_reward = parseInt(foundLesson.challenge_xp, 10) || 30;
          lessonCopy.challenges = realChallenges;
        } else {
          lessonCopy.title = foundLesson.title || foundUnit.title;
          lessonCopy.xp_reward = parseInt(foundLesson.xp_reward, 10) || 20;
          lessonCopy.challenges = realChallenges;
        }

        selectedLesson = lessonCopy;
        selectedNextLessonId = null;

        const modalBadge = document.getElementById('modal-lesson-badge');
        const modalTitle = document.getElementById('modal-lesson-title');
        const modalDesc = document.getElementById('modal-lesson-desc');
        const modalXp = document.getElementById('modal-lesson-xp');
        const modalCount = document.getElementById('modal-lesson-count');
        const lessonModal = document.getElementById('lesson-modal');

        const isAlreadyDone = (activeLessonProgress && activeLessonProgress[String(lessonCopy.id)] && activeLessonProgress[String(lessonCopy.id)].status === 'completed');
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
        if (modalXp) modalXp.textContent = isAlreadyDone ? '+0 XP (إعادة مراجعة)' : `+${lessonCopy.xp_reward} XP`;
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

        if (btnModalStart && lessonModal) {
          btnModalStart.onclick = () => {
            if (!selectedLesson || !selectedLesson.challenges || selectedLesson.challenges.length === 0) {
              if (game.sound) game.sound.playWrong();
              showToast('هذا الدرس قيد الإعداد ولا يحتوي على تمارين حالياً.');
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
                showFloatingXpBadge('+30 XP ⭐  +1 ❤️');
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
            if (runnerState === 'answering') {
              btnCheckAction.disabled = true;
              await evaluateAnswer();
            } else if (runnerState === 'checked') {
              btnCheckAction.disabled = true;
              currentChallengeIndex++;
              loadChallenge(currentChallengeIndex);
            }
          };
        }

        if (btnVictoryContinue && victoryModal) {
          btnVictoryContinue.onclick = async () => {
            victoryModal.style.display = 'none';
            closeRunner();
            await refreshStatsDisplay();
            const uid = getAuthUserId();
            if (game.getLessonProgress) activeLessonProgress = await game.getLessonProgress(uid);
            renderSkillMap();
          };
        }
      });

      function startLessonRunner(lesson) {
        currentChallenges = [...(lesson.challenges || [])];
        if (currentChallenges.length === 0) {
          mgAlert('لا توجد تمارين', 'لا توجد تمارين مسجلة لهذا الدرس حالياً.', 'info');
          return;
        }

        // تحديث بيانات التقدم من أحدث نسخة محفوظة محلياً لمنع تكرار المكافآت
        try {
          const uid = getAuthUserId();
          const userLpKey = uid ? `mg_coptic_lesson_progress_${uid}` : 'mg_coptic_lesson_progress';
          const rawLP = (uid ? localStorage.getItem(userLpKey) : null) || localStorage.getItem('mg_coptic_lesson_progress');
          if (rawLP) {
            const parsed = JSON.parse(rawLP);
            if (parsed && typeof parsed === 'object') activeLessonProgress = parsed;
          }
        } catch(e) {}

        // فحص ما إذا كان المستوى قد تم إكماله مسبقاً (وضع الإعادة/المراجعة)
        const currentProg = (activeLessonProgress && activeLessonProgress[String(lesson.id)]) || {};
        isReplayingLesson = (currentProg.status === 'completed');

        // استعادة قائمة التمارين المُجاب عليها مسبقاً لهذا الدرس (لمنع تكرار XP عند الخروج والعودة)
        sessionAnsweredChallenges = new Set();
        if (!isReplayingLesson) {
          try {
            const uid = getAuthUserId();
            const answeredKey = `mg_coptic_answered_${uid || 'guest'}_${lesson.id}`;
            const savedAnswered = localStorage.getItem(answeredKey);
            if (savedAnswered) {
              const arr = JSON.parse(savedAnswered);
              if (Array.isArray(arr)) arr.forEach(id => sessionAnsweredChallenges.add(id));
            }
          } catch(e) {}
        }

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
        document.body.style.overflow = 'auto';
        refreshStatsDisplay();
        renderSkillMap();
      }

      function loadChallenge(index) {
        if (typeof cleanupTraceOrientationListener === 'function') {
          cleanupTraceOrientationListener();
        }
        if (window.activeRunnerTracer) {
          try { window.activeRunnerTracer.destroy(); } catch (_) {}
          window.activeRunnerTracer = null;
        }
        if (index >= currentChallenges.length) {
          finishLessonSuccess();
          return;
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
        }
        if (feedbackBox) feedbackBox.style.visibility = 'hidden';

        const percent = Math.min(100, Math.round((correctAnswersCount / Math.max(1, initialChallengesCount)) * 100));
        if (runnerProgress) runnerProgress.style.width = percent + '%';

        const ch = currentChallenges[index];
        renderChallengeContent(ch);

        if (ch && (ch.type === 'image_view' || ch.type === 'text_view') && btnCheck) {
          btnCheck.disabled = false;
          btnCheck.textContent = 'فهمت ومتابعة';
          btnCheck.classList.add('ready');
        }
      }

      function renderChallengeContent(ch) {
        const runnerBody = document.getElementById('runner-body-content');
        if (!runnerBody) return;
        let html = '';

        if (ch.type === 'image_view') {
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
          if (typeof window.renderLetterOverviewCardHtml === 'function') {
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
              ${(ch.options || []).map((opt, i) => `
                <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                  ${opt.text}
                </div>
              `).join('')}
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
              ${(ch.options || []).map((opt, i) => {
                const optText = (typeof window.formatPronunciationOption === 'function') 
                  ? window.formatPronunciationOption(opt.text) 
                  : (opt.text ? opt.text.replace(/\s*\([A-Za-zŌō\s+-]+\)/g, '').replace(/[A-Za-zŌō]/g, '').trim() : '');
                return `
                  <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                    ${escapeHtml(optText || opt.text)}
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
              ${(ch.options || []).map((opt, i) => `
                <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                  ${opt.text}
                </div>
              `).join('')}
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
              ${(ch.options || []).map((opt, i) => `
                <div class="option-card" data-idx="${i}" onclick="selectOptionCard(this, ${i})">
                  ${opt.text}
                </div>
              `).join('')}
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
              <div class="tiles-dropzone" id="tiles-dropzone" style="direction:ltr !important; flex-direction:row !important;">
                <span style="color:var(--ink-soft);font-size:.92rem;direction:rtl;" id="dropzone-placeholder">اضغط على الحروف لترتيبها هنا</span>
              </div>
              <div class="tiles-pool" id="tiles-pool" style="direction:ltr !important; flex-direction:row !important;">
                ${shuffled.map((t) => `
                  <button type="button" class="word-tile" style="direction:ltr !important;" onclick="pickWordTile(this, '${t}')">${t}</button>
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

      window.pickWordTile = function(btn, letter) {
        if (runnerState !== 'answering') return;
        if (game.sound) game.sound.playClick();
        const dropzone = document.getElementById('tiles-dropzone');
        const placeholder = document.getElementById('dropzone-placeholder');
        if (placeholder) placeholder.remove();

        wordTilesBuilt.push(letter);
        btn.style.visibility = 'hidden';

        const placedTile = document.createElement('button');
        placedTile.type = 'button';
        placedTile.className = 'word-tile';
        placedTile.style.direction = 'ltr';
        placedTile.style.unicodeBidi = 'isolate';
        placedTile.textContent = letter;
        placedTile.onclick = function() {
          if (runnerState !== 'answering') return;
          if (game.sound) game.sound.playClick();
          const childTiles = Array.from(dropzone.querySelectorAll('.word-tile'));
          const domIdx = childTiles.indexOf(placedTile);
          placedTile.remove();
          btn.style.visibility = 'visible';
          if (domIdx !== -1) {
            wordTilesBuilt.splice(domIdx, 1);
          } else {
            const idx = wordTilesBuilt.lastIndexOf(letter);
            if (idx !== -1) wordTilesBuilt.splice(idx, 1);
          }
          if (wordTilesBuilt.length === 0 && !document.getElementById('dropzone-placeholder')) {
            const ph = document.createElement('span');
            ph.id = 'dropzone-placeholder';
            ph.style.cssText = 'color:var(--ink-soft);font-size:.92rem;direction:rtl;';
            ph.textContent = 'اضغط على الحروف لترتيبها هنا';
            dropzone.appendChild(ph);
          }
          const btnCheck = document.getElementById('btn-check-action');
          if (btnCheck) btnCheck.disabled = wordTilesBuilt.length === 0;
        };
        dropzone.appendChild(placedTile);
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

        if (ch.type === 'image_view' || ch.type === 'text_view') {
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
          const rawChallengeXp = (ch.xp_reward !== undefined && ch.xp_reward !== null) ? ch.xp_reward : (ch.xp !== undefined && ch.xp !== null ? ch.xp : ((ch.type === 'image_view' || ch.type === 'text_view') ? 0 : 1));
          const parsedChallengeXp = parseInt(rawChallengeXp, 10);
          const challengeXp = (!isNaN(parsedChallengeXp) && parsedChallengeXp >= 0) ? parsedChallengeXp : ((ch.type === 'image_view' || ch.type === 'text_view') ? 0 : 1);

          // منع احتساب نقاط XP نهائياً في حال إعادة المستوى أو التمرين المُجاب عليه مسبقاً
          const challengeUniqueId = ch.id || `ch_${currentChallengeIndex}_${(ch.question || ch.coptic_display || '').substring(0,20)}`;
          const alreadyAnsweredThisChallenge = sessionAnsweredChallenges.has(challengeUniqueId);

          if (!isReplayingLesson && !alreadyAnsweredThisChallenge && challengeXp > 0) {
            sessionXpEarned += challengeXp;
            if (game.updateProgress) await game.updateProgress(uid, { addPoints: challengeXp });
            showFloatingXpBadge(`+${challengeXp} XP ⭐`);
            if (window.addTodayEarnedXP) window.addTodayEarnedXP(challengeXp);
          }

          // تسجيل التمرين كمُجاب عليه وحفظه محلياً
          if (!isReplayingLesson && !alreadyAnsweredThisChallenge) {
            sessionAnsweredChallenges.add(challengeUniqueId);
            try {
              const answeredKey = `mg_coptic_answered_${uid || 'guest'}_${selectedLesson.id}`;
              localStorage.setItem(answeredKey, JSON.stringify([...sessionAnsweredChallenges]));
            } catch(e) {}
          }

          if (ch.type !== 'match' && game.sound) game.sound.playCorrect();

          if (feedbackBox) {
            feedbackBox.className = 'feedback-msg correct';
            if (feedbackIcon) feedbackIcon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
            if (feedbackText) {
              if (ch.type === 'image_view' || ch.type === 'text_view') {
                feedbackText.textContent = challengeXp > 0 ? `أحسنت! واصل التعلّم (+${challengeXp} XP)` : 'أحسنت! واصل التعلّم';
              } else {
                feedbackText.textContent = isReplayingLesson ? 'إجابة صحيحة وممتازة! (وضع المراجعة)' : (challengeXp > 0 ? `إجابة صحيحة وممتازة! (+${challengeXp} XP)` : 'إجابة صحيحة وممتازة!');
              }
            }
            feedbackBox.style.visibility = 'visible';
          }

          if (btnCheck) {
            btnCheck.textContent = 'متابعة';
            btnCheck.className = 'btn-check-answer btn-continue-ok';
            btnCheck.disabled = false;
          }
        } else {
          currentChallenges.push(ch);

          let currentHearts = 5;
          if (game.loseHeart) {
            const prog = await game.loseHeart(uid);
            currentHearts = prog.hearts;
          }
          const runnerHearts = document.getElementById('runner-hearts-count');
          if (runnerHearts) runnerHearts.textContent = currentHearts;
          if (game.sound) game.sound.playWrong();

          if (feedbackBox) {
            feedbackBox.className = 'feedback-msg wrong';
            if (feedbackIcon) feedbackIcon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            if (feedbackText) {
              if (ch.type === 'fill_blank' && ch.correct_word) {
                feedbackText.textContent = `إجابة غير صحيحة — الكلمة الصحيحة: «${ch.correct_word}»`;
              } else if (ch.type === 'listen_write' && (ch.correct_word || ch.coptic_display)) {
                feedbackText.textContent = `إجابة غير صحيحة — الإجابة الصحيحة هي: «${ch.correct_word || ch.coptic_display}»`;
              } else {
                feedbackText.textContent = 'إجابة غير صحيحة، حاول مجددًا في التمرين القادم';
              }
            }
            feedbackBox.style.visibility = 'visible';
          }

          if (btnCheck) {
            btnCheck.textContent = 'متابعة';
            btnCheck.className = 'btn-check-answer btn-continue-err';
            btnCheck.disabled = false;
          }

          if (currentHearts <= 0) {
            setTimeout(() => handleOutOfHearts(), 1100);
          }
        }
      }

      async function handleOutOfHearts() {
        const uid = getAuthUserId();
        let currentXP = 0;
        let hearts = 0;
        if (game.getProgress) {
          const prog = await game.getProgress(uid);
          currentXP = prog.points || 0;
          hearts = prog.hearts || 0;
        }
        const heartsNeeded = 5 - hearts;
        const fullCost = heartsNeeded * 15;

        if (currentXP >= 15) {
          const canFull = currentXP >= fullCost;
          const htmlContent = `
            <div style="text-align:center;line-height:1.7;padding:6px 0;">
              <p style="font-size:1.15rem;font-weight:800;color:var(--madder);margin-bottom:6px;">نفدت محاولاتك! 💔</p>
              <p style="font-size:.92rem;color:var(--ink-soft);margin-bottom:14px;">سعر القلب الواحد = <b>15 XP</b> ⭐ (رصيدك: <b>${currentXP} XP</b>)</p>
              <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px;">
                <button type="button" id="swal-buy-1-heart" style="padding:12px 18px;font-size:.96rem;background:linear-gradient(135deg,#00A3FF,#0077CC);border:none;border-radius:14px;color:#fff;cursor:pointer;font-weight:800;box-shadow:0 4px 14px rgba(0,163,255,0.35);">
                  شراء 1 قلب (+1 ❤️) بـ 15 XP
                </button>
                ${canFull ? `
                  <button type="button" id="swal-buy-all-hearts" style="padding:11px 18px;font-size:.92rem;background:#E7F5FF;border:1.5px solid #00A3FF;border-radius:14px;color:#0077CC;cursor:pointer;font-weight:800;">
                    ملء كل القلوب (${heartsNeeded} ❤️) بـ ${fullCost} XP
                  </button>
                ` : ''}
              </div>
            </div>
          `;

          const result = await Swal.fire({
            html: htmlContent,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'الخروج إلى الخريطة',
            customClass: {
              popup: 'coptic-swal-popup',
              cancelButton: 'coptic-swal-cancel'
            },
            didOpen: () => {
              const b1 = document.getElementById('swal-buy-1-heart');
              if (b1) {
                b1.onclick = async () => {
                  Swal.close();
                  if (game.buyHeartsWithXp) {
                    const buyRes = await game.buyHeartsWithXp(uid, 1, 15);
                    if (buyRes.success) {
                      await refreshStatsDisplay();
                      if (game.sound) game.sound.playCorrect();
                      showToast('تم شراء 1 قلب بنجاح! (+1 ❤️)');
                      loadChallenge(currentChallengeIndex);
                    }
                  }
                };
              }
              const bAll = document.getElementById('swal-buy-all-hearts');
              if (bAll) {
                bAll.onclick = async () => {
                  Swal.close();
                  if (game.buyHeartsWithXp) {
                    const buyRes = await game.buyHeartsWithXp(uid, heartsNeeded, 15);
                    if (buyRes.success) {
                      await refreshStatsDisplay();
                      if (game.sound) game.sound.playCorrect();
                      showToast(`تم ملء جميع القلوب (${heartsNeeded} ❤️) بنجاح!`);
                      loadChallenge(currentChallengeIndex);
                    }
                  }
                };
              }
            }
          });

          if (result.dismiss === Swal.DismissReason.cancel) {
            closeRunner();
          }
        } else {
          await mgAlert(
            'نفدت المحاولات! 💔',
            `ليس لديك رصيد كافٍ من الـ XP لشراء قلوب جديدة.<br>سعر القلب الواحد = <b>15 XP</b> ورصيدك الحالي: <b>${currentXP} XP</b>.<br>يمكنك مراجعة الدروس السابقة لكسب المزيد من النقاط والمحاولة من جديد!`,
            'error'
          );
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
        // ضمان تطابق الـ XP المكتسب بنسبة 100% مع الرقم المعروض والمضبوط من الداشبورد
        const fullConfiguredXp = selectedLesson ? (parseInt(selectedLesson.xp_reward, 10) || 20) : 20;
        const earnedXp = isReplayingLesson ? 0 : fullConfiguredXp;

        const vXp = document.getElementById('v-xp-gained');
        const vAcc = document.getElementById('v-accuracy');
        const victoryModal = document.getElementById('victory-modal');

        if (vXp) vXp.textContent = isReplayingLesson ? '+0 XP (إعادة مراجعة)' : `+${earnedXp} XP`;
        if (vAcc) vAcc.textContent = `${accuracy}%`;

        // إظهار شاشة النصر فوراً بدون أي تعليق أو تأخير (0 ميلي ثانية)
        if (victoryModal) victoryModal.style.display = 'flex';

        // حفظ التقدم ومزامنة السحابة في الخلفية دون تعطيل الواجهة
        if (game.completeLesson && selectedLesson) {
          game.completeLesson(uid, selectedLesson.id, accuracy, selectedNextLessonId, earnedXp).catch(e => {
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
