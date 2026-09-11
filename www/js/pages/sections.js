    /* ============ SVG ICONS (احترافية بدل الإيموجي) ============ */
    const ICON_AUDIO = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
    const ICON_MUTED = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
    const ICON_TRASH = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
    const ICON_LINK = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

    /* ============ SUPABASE CONNECTION ============ */
    // نفس مشروع الداشبورد، مع عزل جلسة الطالب عن جلسة المدير
    const SB_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
    const SB_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
    const sb = window.supabase.createClient(SB_URL, SB_ANON_KEY, {
      auth: {
        storageKey: 'mg_coptic_student_auth_token',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    /* ============ DATA (تتحمّل من قاعدة البيانات عند فتح الموقع) ============ */
    let alphabetData = [];
    let vocabDataBase = [];
    let grammarSections = [];
    let articlesData = []; // مقالات الصفحة الرئيسية (تتحمّل من جدول articles، المنشورة بس)
    let quizQuestionsFromDB = []; // أسئلة الاختبار اللي عملها الأدمن (اختيار من متعدد / مقالي)
    let quizSettings = { categoryCounts: {} }; // تتحمّل من إعدادات لوحة التحكم: عدد أسئلة لكل فئة
    const DEFAULT_QUESTION_TIME = 15; // احتياطي لو سؤال معينش وقت محفوظ له
    const DEFAULT_CATEGORY_COUNT = 5; // احتياطي لو فئة معيّنة معهاش عدد محفوظ ليها

    async function loadContentFromSupabase() {
      const [lettersRes, vocabRes, grammarRes, articlesRes, quizRes, quizCatSettingsRes] = await Promise.all([
        sb.from('letters').select('*').order('sort_order'),
        sb.from('vocabulary').select('*').eq('status', 'approved').order('sort_order').order('id'),
        sb.from('grammar_sections').select('*').order('sort_order'),
        sb.from('articles').select('*').eq('is_published', true).order('sort_order').order('id'),
        sb.from('quiz_questions').select('*').order('sort_order'),
        sb.from('quiz_category_settings').select('*'),
      ]);

      alphabetData = (lettersRes.data || []).map(l => ({
        glyph: l.glyph, name: l.name, translit: l.translit, sound: l.sound, num: l.num, audio: l.audio_filename
      }));

      vocabDataBase = (vocabRes.data || []).map(v => ({
        coptic: v.coptic, translit: v.translit, meaning: v.meaning, cat: v.category,
        audio: v.audio_filename, image: v.image_url
      }));

      grammarSections = (grammarRes.data || []).map(g => ({ title: g.title, html: sanitizeGrammarHtml(g.content_html) }));

      articlesData = (articlesRes.data || []).map(a => ({ title: a.title, html: sanitizeGrammarHtml(a.content_html) }));

      quizQuestionsFromDB = (quizRes.data || []).map(q => ({
        type: q.type, question: q.question, options: q.options, correctIndex: q.correct_index,
        modelAnswer: q.model_answer, category: q.category, difficulty: q.difficulty || 'medium',
        timeSeconds: q.time_seconds || DEFAULT_QUESTION_TIME,
        linkUrl: q.link_url || null, linkLabel: q.link_label || null
      }));

      const categoryCounts = {};
      (quizCatSettingsRes.data || []).forEach(s => { categoryCounts[s.category] = s.questions_count; });
      quizSettings = { categoryCounts };

      const anyError = lettersRes.error || vocabRes.error || grammarRes.error || articlesRes.error || quizRes.error;
      if (anyError) console.error('تعذّر تحميل بعض بيانات الموقع:', anyError);
    }

    /* ============ دالات إعادة التحميل المباشر عند التعديل في لوحة التحكم ============ */
    async function reloadLetters() {
      const res = await sb.from('letters').select('*').order('sort_order');
      if (!res.error && res.data) {
        alphabetData = res.data.map(l => ({
          glyph: l.glyph, name: l.name, translit: l.translit, sound: l.sound, num: l.num, audio: l.audio_filename
        }));
        if (typeof renderAlphabet === 'function') renderAlphabet();
      }
    }

    async function reloadVocabulary() {
      const res = await sb.from('vocabulary').select('*').eq('status', 'approved').order('sort_order').order('id');
      if (!res.error && res.data) {
        vocabDataBase = res.data.map(v => ({
          coptic: v.coptic, translit: v.translit, meaning: v.meaning, cat: v.category,
          audio: v.audio_filename, image: v.image_url
        }));
        if (typeof renderVocab === 'function') renderVocab();
      }
    }

    async function reloadGrammar() {
      const res = await sb.from('grammar_sections').select('*').order('sort_order');
      if (!res.error && res.data) {
        grammarSections = res.data.map(g => ({ title: g.title, html: sanitizeGrammarHtml(g.content_html) }));
        if (typeof renderGrammar === 'function') renderGrammar();
      }
    }

    async function reloadArticles() {
      const res = await sb.from('articles').select('*').eq('is_published', true).order('sort_order').order('id');
      if (!res.error && res.data) {
        articlesData = res.data.map(a => ({ title: a.title, html: sanitizeGrammarHtml(a.content_html) }));
        if (typeof renderArticles === 'function') renderArticles();
      }
    }

    async function reloadQuiz() {
      const [quizRes, quizCatSettingsRes] = await Promise.all([
        sb.from('quiz_questions').select('*').order('sort_order'),
        sb.from('quiz_category_settings').select('*')
      ]);
      if (!quizRes.error && quizRes.data) {
        quizQuestionsFromDB = quizRes.data.map(q => ({
          type: q.type, question: q.question, options: q.options, correctIndex: q.correct_index,
          modelAnswer: q.model_answer, category: q.category, difficulty: q.difficulty || 'medium',
          timeSeconds: q.time_seconds || DEFAULT_QUESTION_TIME,
          linkUrl: q.link_url || null, linkLabel: q.link_label || null
        }));
      }
      if (!quizCatSettingsRes.error && quizCatSettingsRes.data) {
        const categoryCounts = {};
        quizCatSettingsRes.data.forEach(s => { categoryCounts[s.category] = s.questions_count; });
        quizSettings = { categoryCounts };
      }
      if (typeof renderQuizSetup === 'function') renderQuizSetup();
    }

    /* ============ ربط المزامنة اللحظية الحية (Realtime Live Sync) مع الداشبورد ============ */
    function setupRealtimeContentSync() {
      if (!sb || !sb.channel) return;
      try {
        let secUserProgTimer = null;
        sb.channel('mg-coptic-live-content-sync')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'letters' }, () => {
            console.log('⚡ Realtime: تم تحديث الأبجدية من الداشبورد');
            reloadLetters();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'vocabulary' }, () => {
            console.log('⚡ Realtime: تم تحديث الكلمات والمفردات من الداشبورد');
            reloadVocabulary();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'grammar_sections' }, () => {
            console.log('⚡ Realtime: تم تحديث القواعد من الداشبورد');
            reloadGrammar();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => {
            console.log('⚡ Realtime: تم تحديث المقالات من الداشبورد');
            reloadArticles();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_questions' }, () => {
            console.log('⚡ Realtime: تم تحديث أسئلة الاختبار من الداشبورد');
            reloadQuiz();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_category_settings' }, () => {
            console.log('⚡ Realtime: تم تحديث إعدادات الاختبار من الداشبورد');
            reloadQuiz();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, () => {
            if (secUserProgTimer) clearTimeout(secUserProgTimer);
            secUserProgTimer = setTimeout(() => {
              if (typeof renderRealLeaderboard === 'function') renderRealLeaderboard();
              if (typeof refreshStatsDisplay === 'function') refreshStatsDisplay();
            }, 800);
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
            if (typeof renderRealLeaderboard === 'function') renderRealLeaderboard();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'units' }, () => {
            console.log('⚡ Realtime: تم تحديث وحدات المسار من الداشبورد');
            if (window.MGCopticGame && window.MGCopticGame.getCurriculum) {
              window.MGCopticGame.getCurriculum(true).then(() => {
                if (typeof window.renderSkillMap === 'function') window.renderSkillMap();
                if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
              });
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'lessons' }, () => {
            console.log('⚡ Realtime: تم تحديث دروس المسار من الداشبورد');
            if (window.MGCopticGame && window.MGCopticGame.getCurriculum) {
              window.MGCopticGame.getCurriculum(true).then(() => {
                if (typeof window.renderSkillMap === 'function') window.renderSkillMap();
                if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
              });
            }
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'challenges' }, () => {
            console.log('⚡ Realtime: تم تحديث تمارين المسار من الداشبورد');
            if (window.MGCopticGame && window.MGCopticGame.getCurriculum) {
              window.MGCopticGame.getCurriculum(true).then(() => {
                if (typeof window.renderSkillMap === 'function') window.renderSkillMap();
                if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
              });
            }
          })
          .subscribe();
      } catch (err) {
        console.warn('Realtime subscription error:', err);
      }
    }

    /* ============ STATE ============ */
    let customVocab = [];
    let vocabAll = [];

    /* ============ HERO STATS ============ */
    function toArabicDigits(n) {
      return String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }
    /* ============ TABS (topbar + mobile bottom nav, kept in sync) ============ */
    /* ============ TABS (topbar + mobile bottom nav, kept in sync) ============ */
    const tabOrder = ['home', 'learn', 'leaderboard', 'settings', 'alphabet', 'vocab', 'grammar', 'quiz', 'competitions'];
    window.tabOrder = tabOrder;
    const bottomNavSections = ['home', 'learn', 'leaderboard', 'settings'];

    function switchTab(tabName, updateUrl = true) {
      if (!tabOrder.includes(tabName)) return;
      const currentPanel = document.querySelector('.tab-panel.active');
      const fromIndex = currentPanel ? tabOrder.indexOf(currentPanel.id) : -1;
      const toIndex = tabOrder.indexOf(tabName);
      if (toIndex === fromIndex) return;
      const slideFrom = toIndex > fromIndex ? '-24px' : '24px';

      document.querySelectorAll('nav.tabs button, .bottom-nav .bn-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabName);
      });
      document.querySelectorAll('.tab-panel').forEach(p => {
        const isTarget = p.id === tabName;
        if (isTarget) p.style.setProperty('--slide-from', slideFrom);
        p.classList.toggle('active', isTarget);
      });

      if (updateUrl) {
        const newHash = tabName === 'home' ? '' : '#' + tabName;
        if (window.location.hash !== newHash) {
          try {
            history.replaceState(null, '', window.location.pathname + window.location.search + newHash);
          } catch (e) {
            window.location.hash = newHash;
          }
        }
      }

      if (tabName === 'learn') {
        if (typeof window.renderSkillMap === 'function') {
          window.renderSkillMap();
        }
        if (typeof window.refreshStatsDisplay === 'function') {
          window.refreshStatsDisplay();
        }
      }
      if (tabName === 'quiz') showQuizSetup();
      if (tabName === 'home') {
        if (typeof syncUserProfileUI === 'function') syncUserProfileUI();
        if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
      }
      if (tabName === 'leaderboard' && typeof window.renderRealLeaderboard === 'function') window.renderRealLeaderboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.switchTab = switchTab;

    window.addEventListener('hashchange', () => {
      const hash = (window.location.hash || '').replace('#', '').trim() || 'home';
      if (window.tabOrder && window.tabOrder.includes(hash)) {
        switchTab(hash, false);
      }
    });
    document.querySelectorAll('nav.tabs button, .bottom-nav .bn-btn').forEach(btn => {
      if (btn.dataset.tab) {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
      }
    });

    /* ============ SWIPE NAVIGATION (mobile) ============ */
    (function initSwipeNav() {
      const SWIPE_THRESHOLD = 45;
      let startX = 0, startY = 0, tracking = false;

      document.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        if (e.target.closest('#image-lightbox, #auth-modal, .modal-overlay, .chest-modal-overlay, .challenge-runner-overlay, .victory-modal, input, textarea, select, .alphabet-card, .vocab-card, .choice-btn, button, a')) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
      }, { passive: true });

      document.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.25) return;

        const currentPanel = document.querySelector('.tab-panel.active');
        if (!currentPanel) return;
        const currentId = currentPanel.id;

        // إذا كان المستخدم داخل أحد التمارين الفرعية (حروف، كلمات، قواعد، اختبار)، السحب لليسار يعيده للرئيسية
        if (['alphabet', 'vocab', 'grammar', 'quiz'].includes(currentId)) {
          if (dx < 0) switchTab('home');
          return;
        }

        const idx = bottomNavSections.indexOf(currentId);
        if (idx === -1) return;

        // سحب الشاشة لليمين (dx > 0): الانتقال للتبويب التالي جهة اليسار (مثل من الرئيسية لمسار التعلم)
        // سحب الشاشة لليسار (dx < 0): الانتقال للتبويب السابق جهة اليمين (مثل من مسار التعلم للرئيسية)
        if (dx > 0) {
          if (idx + 1 < bottomNavSections.length) {
            switchTab(bottomNavSections[idx + 1]);
          }
        } else if (dx < 0) {
          if (idx - 1 >= 0) {
            switchTab(bottomNavSections[idx - 1]);
          }
        }
      }, { passive: true });
    })();

    /* ============ ALPHABET RENDER ============ */
    // كل بطاقة حرف: الضغط عليها يقلبها ويشغّل صوتها معًا. بعد ١٠ ثوانٍ بالضبط
    // تعود البطاقة لوجهها الأصلي ويتوقف الصوت تلقائيًا (سواء انتهى أو لا يزال يعمل).
    // الضغط عليها مرة أخرى وهي مقلوبة يُغلقها فورًا (بدون انتظار الـ١٠ ثوانٍ).
    const CARD_AUTO_CLOSE_MS = 10000;
    const cardState = new Map(); // data-i -> { timeoutId, audio }

    function closeCard(card, i) {
      card.classList.remove('flipped', 'playing');
      const st = cardState.get(i);
      if (st) {
        if (st.timeoutId) clearTimeout(st.timeoutId);
        if (st.audio) { st.audio.pause(); st.audio.currentTime = 0; }
      }
      cardState.set(i, { timeoutId: null, audio: null });
    }

    function openCard(card, i, audioFile) {
      // أغلق أي بطاقة أخرى مفتوحة أولًا (بطاقة واحدة مفتوحة في كل مرة)
      document.querySelectorAll('.letter-card.flipped').forEach(other => {
        if (other !== card) closeCard(other, other.dataset.i);
      });

      card.classList.add('flipped');
      const audio = playAudio(audioFile, card.querySelector('.audio-btn'));
      if (audio) { card.classList.add('playing'); audio.addEventListener('ended', () => card.classList.remove('playing')); }

      const timeoutId = setTimeout(() => closeCard(card, i), CARD_AUTO_CLOSE_MS);
      cardState.set(i, { timeoutId, audio });
    }

    function renderAlphabet() {
      const grid = document.getElementById('alphabet-grid');
      grid.innerHTML = alphabetData.map((l, i) => {
        const cleanTranslit = (l.translit || '').replace(/[\/\\\[\]]/g, '').trim();
        const cleanSound = (l.sound || '').trim();
        const cleanName = (l.name || '').trim();
        const cleanNum = (l.num && l.num !== '-') ? String(l.num).trim() : '—';

        return `
    <div class="letter-card" data-i="${i}">
      <div class="flip">
        <div class="face front">
          <div class="glyph">${l.glyph}</div>
          <div class="letter-name">${cleanName}</div>
        </div>
        <div class="face back">
          <div class="card-info-row">
            <span class="meta-lbl">الاسم:</span>
            <span class="meta-val name-val">${cleanName}</span>
          </div>
          <div class="card-info-row">
            <span class="meta-lbl">النطق:</span>
            <span class="meta-val sound-val">${cleanSound || '—'}</span>
          </div>
          <div class="card-info-row">
            <span class="meta-lbl">النطق الصوتي:</span>
            <span class="meta-val translit-val">${cleanTranslit || '—'}</span>
          </div>
          <div class="card-info-row">
            <span class="meta-lbl">القيمة العددية:</span>
            <span class="meta-val num-val">${cleanNum}</span>
          </div>
          <button class="del-btn audio-btn" data-audio="${l.audio || ''}" title="تشغيل النطق">${ICON_AUDIO}</button>
        </div>
      </div>
      <div class="card-timer"><i></i></div>
    </div>
  `;
      }).join('');

      grid.querySelectorAll('.letter-card').forEach(card => {
        const i = card.dataset.i;
        cardState.set(i, { timeoutId: null, audio: null });
        card.addEventListener('click', () => {
          if (card.classList.contains('flipped')) {
            closeCard(card, i);
          } else {
            openCard(card, i, alphabetData[i].audio);
          }
        });
      });
      grid.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const card = btn.closest('.letter-card');
          const i = card.dataset.i;
          // إعادة تشغيل الصوت وتصفير عدّاد الـ١٠ ثوانٍ
          openCard(card, i, alphabetData[i].audio);
        });
      });
    }

    /* ============ VOCAB RENDER ============ */
    function refreshVocabAll() {
      vocabAll = [...vocabDataBase, ...customVocab];
      const cats = ['all', ...new Set(vocabAll.map(v => v.cat).filter(Boolean))];
      const sel = document.getElementById('vocab-filter');
      if (!sel) return;
      const current = sel.value || 'all';
      sel.innerHTML = cats.map(c => `<option value="${c}">${c === 'all' ? 'كل الفئات' : c}</option>`).join('');
      sel.value = cats.includes(current) ? current : 'all';
    }

    function renderVocab() {
      refreshVocabAll();
      const searchEl = document.getElementById('vocab-search');
      const search = searchEl ? searchEl.value.trim().toLowerCase() : '';
      const catEl = document.getElementById('vocab-filter');
      const cat = catEl ? catEl.value : 'all';
      const list = document.getElementById('vocab-list');
      if (!list) return;
      const filtered = vocabAll.filter(v => {
        const matchesCat = cat === 'all' || v.cat === cat;
        const matchesSearch = !search || v.meaning.toLowerCase().includes(search) || (v.translit || '').toLowerCase().includes(search) || v.coptic.includes(search);
        return matchesCat && matchesSearch;
      });
      list.innerHTML = filtered.map((v, i) => {
        const isCustom = customVocab.includes(v);
        const customIndex = isCustom ? customVocab.indexOf(v) : -1;
        const hasAudio = Boolean(v.audio && String(v.audio).trim());
        return `
    <div class="word-card ${v.image ? 'has-media' : ''}">
      <div class="word-coptic-side">
        <div class="coptic">${v.coptic}</div>
      </div>
      <div class="word-arabic-side">
        ${v.translit ? `<div class="translit">${v.translit}</div>` : ''}
        <div class="meaning">${v.meaning}</div>
      </div>
      <div class="word-actions">
        ${v.cat ? `<div class="cat-tag">${v.cat}</div>` : ''}
        ${hasAudio ?
            `<button type="button" class="audio-btn" data-audio="${v.audio}" title="تشغيل النطق" aria-label="تشغيل النطق">${ICON_AUDIO}</button>` :
            `<button type="button" class="audio-btn disabled" disabled title="لا يوجد تسجيل صوتي" aria-label="لا يوجد تسجيل">${ICON_MUTED}</button>`
          }
        ${isCustom ? `<button type="button" class="del-btn" data-idx="${customIndex}" title="حذف" aria-label="حذف">${ICON_TRASH}</button>` : ''}
        ${v.image ? `<div class="word-media"><img src="${v.image}" alt="${v.meaning}" loading="lazy"></div>` : ''}
      </div>
    </div>`;
      }).join('') || '<p class="hint">لا توجد نتائج مطابقة.</p>';

      list.querySelectorAll('.del-btn[data-idx]').forEach(btn => {
        btn.addEventListener('click', async () => {
          customVocab.splice(parseInt(btn.dataset.idx), 1);
          await saveCustomVocab();
          renderVocab();
        });
      });
      list.querySelectorAll('.audio-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', () => playAudio(btn.dataset.audio, btn));
      });
    }

    const vSearch = document.getElementById('vocab-search');
    if (vSearch) vSearch.addEventListener('input', renderVocab);
    const vFilter = document.getElementById('vocab-filter');
    if (vFilter) vFilter.addEventListener('change', renderVocab);

    const vForm = document.getElementById('add-form');
    if (vForm) {
      vForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const f = e.target;
        const entry = {
          coptic: f.coptic.value.trim(),
          translit: f.translit.value.trim(),
          meaning: f.meaning.value.trim(),
          cat: f.category.value.trim() || 'مضافة'
        };
      if (!entry.coptic || !entry.meaning) return;
      customVocab.push(entry);
      await saveCustomVocab();
      f.reset();
      renderVocab();
    });

    /* ============ STORAGE (persists across sessions via localStorage) ============ */
    const STORAGE_KEY_VOCAB = 'coptic-app-custom-vocab';
    async function saveCustomVocab() {
      try {
        localStorage.setItem(STORAGE_KEY_VOCAB, JSON.stringify(customVocab));
      } catch (err) { console.error('تعذّر الحفظ:', err); }
    }
    async function loadCustomVocab() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_VOCAB);
        customVocab = raw ? JSON.parse(raw) : [];
      } catch (err) {
        customVocab = [];
      }
    }

    /* ============ GRAMMAR RENDER ============ */
    // أزرار الحذف (rte-remove-btn) خاصة بمحرر لوحة التحكم فقط لحذف الصور/الملفات أثناء التعديل،
    // ولا وظيفة لها هنا في الموقع العام، لذلك نحذفها من المحتوى قبل عرضه حتى لا تظهر عائمة فوق النص.
    function sanitizeGrammarHtml(html) {
      if (!html) return '';
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      tmp.querySelectorAll('.rte-remove-btn').forEach(btn => btn.remove());
      return tmp.innerHTML;
    }
    function renderGrammar() {
      const container = document.getElementById('grammar-content');
      container.innerHTML = grammarSections.map(g => `
    <div class="grammar-block">
      <h3>${g.title}</h3>
      ${g.html}
    </div>
  `).join('');
    }

    /* ============ مقالات الصفحة الرئيسية ============ */
    // بترتب حسب sort_order اللي بيتحدد من لوحة التحكم، وده اللي بيحدد
    // مكان كل مقالة بالظبط بين باقي المقالات في الصفحة الرئيسية.
    function renderArticles() {
      const container = document.getElementById('articles-list');
      if (!container) return;
      container.innerHTML = articlesData.map(a => `
    <div class="article-block">
      <h3>${a.title}</h3>
      ${a.html}
    </div>
  `).join('');
    }

    /* ============ تكبير صور القواعد (Lightbox) ============ */
    const imageLightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    function openImageLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      imageLightbox.classList.add('open');
    }
    function closeImageLightbox() {
      imageLightbox.classList.remove('open');
      lightboxImg.src = '';
    }
    document.getElementById('grammar-content').addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      openImageLightbox(img.src, img.alt);
    });
    document.getElementById('articles-list').addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      openImageLightbox(img.src, img.alt);
    });
    document.getElementById('vocab-list').addEventListener('click', (e) => {
      const img = e.target.closest('.word-media img');
      if (!img) return;
      openImageLightbox(img.src, img.alt);
    });
    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox) closeImageLightbox(); // ضغط على الخلفية الغامقة يقفل الصورة
    });
    imageLightbox.querySelector('.lightbox-close').addEventListener('click', closeImageLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageLightbox.classList.contains('open')) closeImageLightbox();
    });

    /* ============ QUIZ ENGINE ============ */
    function escHtml(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    let quizBest = { correct: 0, total: 0 }; // أفضل نتيجة محفوظة (عدد صح من إجمالي) لأسئلة الاختيار من متعدد
    let quizFilters = { cats: new Set(), diff: 'all' }; // cats فاضية = كل الأقسام
    let quizSession = null; // {questions, index, answers, correct}
    let quizTimerInterval = null;

    function buildQuizPool() {
      return quizQuestionsFromDB
        .filter(q => {
          if (q.type === 'mcq' && (!Array.isArray(q.options) || q.options.length < 2 || q.correctIndex == null)) return false;
          if (quizFilters.diff !== 'all' && (q.difficulty || 'medium') !== quizFilters.diff) return false;
          if (quizFilters.cats.size && !quizFilters.cats.has(q.category || 'عام')) return false;
          return true;
        });
    }

    // بيبني مجموعة أسئلة الاختبار: من كل فئة موجودة في الـ pool، ياخد العدد
    // المحدد لها من إعدادات لوحة التحكم (أو عدد افتراضي لو مفيش إعداد محفوظ)
    function buildQuizSelection() {
      const pool = buildQuizPool();
      const byCategory = {};
      pool.forEach(q => {
        const cat = q.category || 'عام';
        (byCategory[cat] = byCategory[cat] || []).push(q);
      });
      let selected = [];
      Object.keys(byCategory).forEach(cat => {
        const count = quizSettings.categoryCounts[cat] ?? DEFAULT_CATEGORY_COUNT;
        const shuffledCat = [...byCategory[cat]].sort(() => Math.random() - 0.5);
        selected.push(...shuffledCat.slice(0, count));
      });
      return selected.sort(() => Math.random() - 0.5);
    }

    function renderQuizSetup() {
      const emptyCard = document.getElementById('quiz-empty-state');
      const controlsDiv = document.getElementById('quiz-setup-controls');
      const cats = [...new Set(quizQuestionsFromDB.map(q => q.category || 'عام'))];
      const pillsDiv = document.getElementById('quiz-cat-pills');

      if (!quizQuestionsFromDB || quizQuestionsFromDB.length === 0 || cats.length === 0) {
        if (emptyCard) emptyCard.style.display = 'flex';
        if (controlsDiv) controlsDiv.style.display = 'none';
        return;
      }

      if (emptyCard) emptyCard.style.display = 'none';
      if (controlsDiv) controlsDiv.style.display = 'block';

      pillsDiv.innerHTML = `<button type="button" class="pill active" data-cat="all">الكل</button>` +
        cats.map(c => `<button type="button" class="pill" data-cat="${escHtml(c)}">${escHtml(c)}</button>`).join('');
      pillsDiv.querySelectorAll('.pill').forEach(p => {
        p.addEventListener('click', () => {
          const cat = p.dataset.cat;
          const allPill = pillsDiv.querySelector('.pill[data-cat="all"]');
          if (cat === 'all') {
            quizFilters.cats.clear();
            pillsDiv.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
            p.classList.add('active');
          } else {
            allPill.classList.remove('active');
            p.classList.toggle('active');
            if (p.classList.contains('active')) quizFilters.cats.add(cat);
            else quizFilters.cats.delete(cat);
            if (quizFilters.cats.size === 0) allPill.classList.add('active');
          }
          updateQuizSetupHint();
        });
      });
      updateQuizSetupHint();
    }

    function updateQuizSetupHint() {
      const pool = buildQuizPool();
      const count = buildQuizSelection().length;
      const hint = document.getElementById('quiz-setup-hint');
      const startBtn = document.getElementById('quiz-start-btn');
      if (pool.length === 0 || count === 0) {
        hint.innerHTML = `<span class="quiz-filter-empty"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>مفيش أسئلة مطابقة للاختيار ده دلوقتي.. جرب تختار قسم أو صعوبة تانية!</span>`;
        startBtn.disabled = true;
      } else {
        hint.textContent = `الاختبار هيتكون من ${toArabicDigits(count)} سؤال، ولكل سؤال وقته الخاص.`;
        startBtn.disabled = false;
      }
      document.getElementById('quiz-best-hint').textContent =
        quizBest.total > 0 ? `أفضل نتيجة محفوظة: ${toArabicDigits(quizBest.correct)} من ${toArabicDigits(quizBest.total)}` : '';
    }

    function showQuizSetup() {
      stopQuizTimer();
      quizSession = null;
      document.getElementById('quiz-setup').style.display = '';
      document.getElementById('quiz-run').style.display = 'none';
      document.getElementById('quiz-result').style.display = 'none';
      renderQuizSetup();
    }

    document.getElementById('quiz-diff-pills').addEventListener('click', (e) => {
      const btn = e.target.closest('.pill');
      if (!btn) return;
      quizFilters.diff = btn.dataset.diff;
      document.querySelectorAll('#quiz-diff-pills .pill').forEach(p => p.classList.toggle('active', p === btn));
      updateQuizSetupHint();
    });
    document.getElementById('quiz-start-btn').addEventListener('click', startQuiz);
    document.getElementById('quiz-retry-btn').addEventListener('click', startQuiz);
    document.getElementById('quiz-new-btn').addEventListener('click', showQuizSetup);

    function startQuiz() {
      refreshVocabAll();
      const questions = buildQuizSelection();
      if (questions.length === 0) return;
      quizSession = { questions, index: 0, answers: [], correct: 0 };
      document.getElementById('quiz-setup').style.display = 'none';
      document.getElementById('quiz-result').style.display = 'none';
      document.getElementById('quiz-run').style.display = '';
      showQuizQuestion();
    }

    function showQuizQuestion() {
      const { questions, index } = quizSession;
      const item = questions[index];
      document.getElementById('quiz-progress-label').textContent =
        `سؤال ${toArabicDigits(index + 1)} من ${toArabicDigits(questions.length)}`;
      document.getElementById('quiz-progress-fill').style.width = `${(index / questions.length) * 100}%`;

      const linkHtml = item.linkUrl
        ? `<a class="quiz-link" href="${escHtml(item.linkUrl)}" target="_blank" rel="noopener noreferrer">${ICON_LINK} ${escHtml(item.linkLabel || 'رابط إضافي')}</a>`
        : '';
      document.getElementById('quiz-question').innerHTML = `<p>${item.question}</p>${linkHtml}`;
      const optsDiv = document.getElementById('quiz-options');

      const fb = document.getElementById('quiz-feedback-banner');
      if (fb) { fb.style.display = 'none'; fb.className = 'quiz-feedback-box'; fb.textContent = ''; }

      if (item.type === 'mcq') {
        optsDiv.innerHTML = item.options.map((o, i) => `<button data-i="${i}">${escHtml(o)}</button>`).join('');
        optsDiv.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => submitAnswer(parseInt(btn.dataset.i)));
        });
      } else {
        optsDiv.innerHTML = `
      <textarea id="essay-answer" rows="3" style="width:100%;padding:10px;border:1px solid var(--gold-light);border-radius:8px;font-family:inherit;"
        placeholder="اكتب إجابتك هنا (اختياري)"></textarea>
      <button class="btn secondary" id="reveal-answer" style="margin-top:10px;">إظهار الإجابة النموذجية</button>
      <p id="model-answer-box" class="hint" style="display:none;margin-top:8px;"></p>
    `;
        document.getElementById('reveal-answer').addEventListener('click', () => submitAnswer(null));
      }
      startQuizTimer();
    }

    function startQuizTimer() {
      stopQuizTimer();
      const { questions, index } = quizSession;
      const total = questions[index].timeSeconds || DEFAULT_QUESTION_TIME;
      let timeLeft = total;
      updateTimerUI(timeLeft, total);
      quizTimerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI(timeLeft, total);
        if (timeLeft <= 0) {
          stopQuizTimer();
          submitAnswer(null, true);
        }
      }, 1000);
    }
    function stopQuizTimer() {
      if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
    }
    function updateTimerUI(timeLeft, total) {
      const numEl = document.getElementById('quiz-timer-num');
      const fillEl = document.getElementById('quiz-timer-fill');
      if (!numEl || !fillEl) return;
      const clamped = Math.max(timeLeft, 0);
      numEl.textContent = toArabicDigits(clamped);
      fillEl.style.width = `${(clamped / total) * 100}%`;
      fillEl.classList.toggle('low', clamped <= total * 0.3);
    }

    function submitAnswer(selectedIndex, isTimeout) {
      stopQuizTimer();
      const { questions, index } = quizSession;
      const item = questions[index];
      let isCorrect = null; // null = سؤال مقالي (مش بيتصحح تلقائيًا)

      if (item.type === 'mcq') {
        isCorrect = selectedIndex === item.correctIndex;
        document.querySelectorAll('#quiz-options button').forEach(b => {
          b.disabled = true;
          const i = parseInt(b.dataset.i);
          if (i === item.correctIndex) b.classList.add('correct');
          else if (i === selectedIndex) b.classList.add('wrong');
        });
        if (isCorrect) quizSession.correct++;

        const fb = document.getElementById('quiz-feedback-banner');
        if (fb) {
          fb.className = 'quiz-feedback-box ' + (isCorrect ? 'correct' : 'wrong');
          fb.textContent = isCorrect ? 'إجابة صحيحة! أحسنت 🌟' : 'إجابة غير صحيحة، حاول مجددًا في التمرين القادم';
          fb.style.display = 'block';
        }
      } else {
        const box = document.getElementById('model-answer-box');
        box.textContent = item.modelAnswer ? item.modelAnswer : 'لا توجد إجابة نموذجية مسجّلة لهذا السؤال.';
        box.style.display = 'block';
        const revealBtn = document.getElementById('reveal-answer');
        if (revealBtn) revealBtn.disabled = true;
      }

      quizSession.answers.push({
        question: item.question, type: item.type, options: item.options,
        selectedIndex, correctIndex: item.correctIndex, isCorrect,
        userEssay: item.type === 'essay' ? (document.getElementById('essay-answer')?.value || '').trim() : null,
        modelAnswer: item.modelAnswer,
        linkUrl: item.linkUrl, linkLabel: item.linkLabel,
      });

      setTimeout(() => {
        if (quizSession.index + 1 < quizSession.questions.length) {
          quizSession.index++;
          showQuizQuestion();
        } else {
          finishQuiz();
        }
      }, isTimeout ? 1300 : 1500);
    }

    function finishQuiz() {
      const { questions, correct, answers } = quizSession;
      const mcqCount = questions.filter(q => q.type === 'mcq').length;
      const pct = mcqCount ? Math.round((correct / mcqCount) * 100) : 0;
      const bestPct = quizBest.total ? Math.round((quizBest.correct / quizBest.total) * 100) : -1;

      if (mcqCount && pct > bestPct) {
        quizBest = { correct, total: mcqCount };
        try { localStorage.setItem(STORAGE_KEY_QUIZ_BEST, JSON.stringify(quizBest)); } catch (e) { }
      }

      document.getElementById('quiz-run').style.display = 'none';
      document.getElementById('quiz-result').style.display = '';

      const summary = document.getElementById('quiz-result-summary');
      summary.innerHTML = mcqCount
        ? `<div class="big-score">${toArabicDigits(correct)} / ${toArabicDigits(mcqCount)}</div>
       <div class="pct">عدد الإجابات الصحيحة</div>`
        : `<div class="big-score">تم بنجاح</div>
       <div class="pct">راجعت ${toArabicDigits(questions.length)} سؤال مقالي</div>`;

      document.getElementById('quiz-result-list').innerHTML = answers.map(a => {
        const linkHtml = a.linkUrl
          ? `<a class="quiz-link" href="${escHtml(a.linkUrl)}" target="_blank" rel="noopener noreferrer">${ICON_LINK} ${escHtml(a.linkLabel || 'رابط إضافي')}</a>`
          : '';
        if (a.type === 'mcq') {
          const userText = a.selectedIndex != null ? a.options[a.selectedIndex] : 'بدون إجابة (انتهى الوقت)';
          const correctText = a.options[a.correctIndex];
          return `<div class="quiz-review-item ${a.isCorrect ? 'correct' : 'wrong'}">
        <div class="qr-q">${a.question}</div>
        <div class="qr-a">إجابتك: ${userText}${a.isCorrect ? '' : ` — <b>الصحيحة: ${correctText}</b>`}</div>
        ${linkHtml}
      </div>`;
        }
        return `<div class="quiz-review-item">
      <div class="qr-q">${a.question}</div>
      <div class="qr-a">${a.userEssay ? `إجابتك: ${a.userEssay}` : 'من غير إجابة مكتوبة'}${a.modelAnswer ? ` — <b>الإجابة النموذجية: ${a.modelAnswer}</b>` : ''}</div>
      ${linkHtml}
    </div>`;
      }).join('');
    }

    /* ============ COPTIC CALENDAR ============ */
    // خوارزمية تحويل قياسية (ميلادي يوليانى-غريغوري ← يوم جولياني ← قبطي)
    // التقويم القبطي: بداية سنة الشهداء = ٢٩ أغسطس ٢٨٤م (يوليانية)، ١٣ شهرًا (١٢×٣٠ يومًا + نسيء ٥/٦ أيام)
    const copticMonths = [
      { name: "توت", coptic: "Ⲑⲱⲟⲩⲧ", translit: "Thout" },
      { name: "بابه", coptic: "Ⲡⲁⲟⲡⲓ", translit: "Paopi" },
      { name: "هاتور", coptic: "Ϩⲁⲑⲱⲣ", translit: "Hathor" },
      { name: "كيهك", coptic: "Ⲕⲟⲓⲁϩⲕ", translit: "Koiak" },
      { name: "طوبة", coptic: "Ⲧⲱⲃⲓ", translit: "Tobi" },
      { name: "أمشير", coptic: "Ⲙⲉϣⲓⲣ", translit: "Meshir" },
      { name: "برمهات", coptic: "Ⲡⲁⲣⲉⲙϩⲁⲧ", translit: "Paremhat" },
      { name: "برموده", coptic: "Ⲫⲁⲣⲙⲟⲩⲑⲓ", translit: "Paremoude" },
      { name: "بشنس", coptic: "Ⲡⲁϣⲟⲛⲥ", translit: "Pashons" },
      { name: "بؤونة", coptic: "Ⲡⲁⲱⲛⲓ", translit: "Paoni" },
      { name: "أبيب", coptic: "Ⲉⲡⲓⲡ", translit: "Epip" },
      { name: "مسرى", coptic: "Ⲙⲉⲥⲱⲣⲓ", translit: "Mesori" },
      { name: "نسيء", coptic: "Ⲡⲓⲕⲟⲩϫⲓ ⲛ̀ⲁⲃⲟⲧ", translit: "Pi Kogi Enavot" },
    ];
    const arabicWeekdays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

    const GREGORIAN_EPOCH = 1721425.5;
    const COPTIC_EPOCH = 1825029.5;

    function leapGregorian(year) {
      return (year % 4 === 0) && !(year % 100 === 0 && year % 400 !== 0);
    }
    function gregorianToJD(year, month, day) {
      return (GREGORIAN_EPOCH - 1) +
        (365 * (year - 1)) +
        Math.floor((year - 1) / 4) +
        (-Math.floor((year - 1) / 100)) +
        Math.floor((year - 1) / 400) +
        Math.floor((((367 * month) - 362) / 12) +
          ((month <= 2) ? 0 : (leapGregorian(year) ? -1 : -2)) +
          day);
    }
    function copticToJD(year, month, day) {
      return COPTIC_EPOCH - 1 + (365 * (year - 1)) + Math.floor(year / 4) + (30 * (month - 1)) + day;
    }
    function jdToCoptic(jd) {
      jd = Math.floor(jd) + 0.5;
      const year = Math.floor((4 * (jd - COPTIC_EPOCH) + 1463) / 1461);
      const month = Math.floor((jd - copticToJD(year, 1, 1)) / 30) + 1;
      const day = jd + 1 - copticToJD(year, month, 1);
      return { year, month, day };
    }
    function weekdayFromJD(jd) {
      return Math.floor(jd + 1.5) % 7; // 0 = الأحد
    }
    function gregorianToCoptic(year, month, day) {
      return jdToCoptic(gregorianToJD(year, month, day));
    }

    function renderCopticToday() {
      try {
        const now = new Date();
        const cDate = new Date(now.getTime());
        if (now.getHours() >= 18) {
          cDate.setDate(cDate.getDate() + 1);
        }
        const y = cDate.getFullYear(), m = cDate.getMonth() + 1, d = cDate.getDate();
        const jd = gregorianToJD(y, m, d);
        const c = jdToCoptic(jd);
        const wd = weekdayFromJD(jd);
        const monthInfo = copticMonths[c.month - 1] || copticMonths[0];

        const gregorianText = now.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) + 'م';

        const fields = [
          ['ctc-day', toArabicDigits(c.day)],
          ['ctc-month-coptic', monthInfo.coptic],
          ['ctc-month-ar', monthInfo.name],
          ['ctc-year', toArabicDigits(c.year)],
          ['ctc-weekday', arabicWeekdays[wd]],
          ['ctc-gregorian', gregorianText],
        ];
        fields.forEach(([id, value]) => {
          const el = document.getElementById(id);
          if (el) el.textContent = value;
          const homeEl = document.getElementById(id + '-home');
          if (homeEl) homeEl.textContent = value;
        });

        try {
          localStorage.setItem('coptic_today_cache', JSON.stringify({
            day: toArabicDigits(c.day),
            monthCoptic: monthInfo.coptic,
            monthAr: monthInfo.name,
            year: toArabicDigits(c.year),
            weekday: arabicWeekdays[wd],
            gregorian: gregorianText,
            ts: Date.now()
          }));
        } catch (e) { }
      } catch (e) {
        try {
          const cached = JSON.parse(localStorage.getItem('coptic_today_cache'));
          if (cached) {
            const fields = [
              ['ctc-day', cached.day],
              ['ctc-month-coptic', cached.monthCoptic],
              ['ctc-month-ar', cached.monthAr],
              ['ctc-year', cached.year],
              ['ctc-weekday', cached.weekday],
              ['ctc-gregorian', cached.gregorian],
            ];
            fields.forEach(([id, value]) => {
              const el = document.getElementById(id);
              if (el) el.textContent = value;
              const homeEl = document.getElementById(id + '-home');
              if (homeEl) homeEl.textContent = value;
            });
          }
        } catch (err) { }
      }
    }

    function renderMonthsGrid() {
      const grid = document.getElementById('months-grid');
      if (!grid) return;
      grid.innerHTML = copticMonths.map((mo, i) => `
    <div class="month-card">
      <div class="month-num">${toArabicDigits(i + 1)}</div>
      <span class="month-coptic coptic">${mo.coptic}</span>
      <div class="month-name">${mo.name}</div>
      <div class="month-days">${i === 12 ? '٥ أو ٦ أيام' : '٣٠ يومًا'}</div>
    </div>
  `).join('');
    }

    /* ============ AUDIO PLAYBACK & URL RESOLVER ============ */
    function resolveAudioUrl(input) {
      if (!input) return '';
      let url = String(input).trim();
      if (!url) return '';

      // Google Drive: استخراج معرف الملف وتحويله لرابط بث مباشر صالح للتشغيل الفوري
      const gdMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^&]*&)*id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{20,})/i);
      if (gdMatch && gdMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${gdMatch[1]}`;
      }

      // Dropbox: تحويل رابط المعاينة إلى رابط مباشر
      if (/dropbox\.com/i.test(url)) {
        url = url.replace(/[?&]dl=0/i, '').replace(/[?&]raw=1/i, '');
        url += (url.includes('?') ? '&' : '?') + 'raw=1';
        return url;
      }

      // OneDrive
      if (/1drv\.ms|onedrive\.live\.com/i.test(url)) {
        if (!url.includes('download=1')) {
          url += (url.includes('?') ? '&' : '?') + 'download=1';
        }
        return url;
      }

      // روابط كاملة مباشرة (مثل Supabase Storage أو CDN أو سيرفر صوتي) أو Data URI
      if (/^https?:\/\/|^data:audio/i.test(url)) {
        return url;
      }

      // مسارات صوتية محلية مباشرة
      if (url.startsWith('assets/') || url.startsWith('audio_coptic/') || url.startsWith('audio/')) {
        return url;
      }

      // ملف صوت محلي داخل assets/sounds/
      return 'assets/sounds/' + url;
    }

    function playAudio(filename, btn) {
      if (!filename) {
        if (btn) {
          btn.innerHTML = ICON_MUTED;
          btn.title = 'لا يوجد تسجيل صوتي بعد';
          setTimeout(() => { btn.innerHTML = ICON_AUDIO; }, 1200);
        }
        return null;
      }
      const src = resolveAudioUrl(filename);
      const audio = new Audio(src);
      if (btn) {
        btn.classList.add('is-playing');
        const card = btn.closest('.word-card, .letter-card');
        if (card) card.classList.add('playing');
        audio.addEventListener('ended', () => {
          btn.classList.remove('is-playing');
          if (card) card.classList.remove('playing');
        });
        audio.addEventListener('pause', () => {
          btn.classList.remove('is-playing');
          if (card) card.classList.remove('playing');
        });
      }
      audio.play().catch(err => {
        console.warn('تعذر تشغيل الصوت:', src, err);
        if (btn) {
          btn.classList.remove('is-playing');
          const card = btn.closest('.word-card, .letter-card');
          if (card) card.classList.remove('playing');
          btn.title = 'تعذّر تشغيل الملف — تأكد من صحة الرابط أو جعل ملف Google Drive عامًا';
        }
      });
      return audio;
    }

    /* ============ INIT ============ */
    const STORAGE_KEY_QUIZ_BEST = 'coptic-app-quiz-best-score';
    (async function init() {
      renderCopticToday();
      renderMonthsGrid();
      setInterval(renderCopticToday, 60000);
      await loadCustomVocab();
      try {
        const best = localStorage.getItem(STORAGE_KEY_QUIZ_BEST);
        if (best) {
          const parsed = JSON.parse(best);
          if (parsed && typeof parsed === 'object' && 'correct' in parsed && 'total' in parsed) {
            quizBest = parsed; // الصيغة الجديدة: {correct, total}
          } else {
            quizBest = { correct: 0, total: 0 }; // صيغة قديمة (نسبة مئوية بس)، منقدرش نحوّلها لعدد صح فمنبدأ من جديد
          }
        }
      } catch (e) { quizBest = { correct: 0, total: 0 }; }
      await loadContentFromSupabase();
      setupRealtimeContentSync();
      renderAlphabet();
      renderVocab();
      renderGrammar();
      renderArticles();
      renderCopticToday();
      renderMonthsGrid();
      renderQuizSetup();
    })();

    