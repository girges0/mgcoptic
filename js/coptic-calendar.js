/**
 * MG COPTIC — الشهور القبطية (١٣ شهرًا)
 * Coptic Months Service & UI Renderer
 * 
 * تظهر الشهور بنفس شكل الحروف القبطية تماماً (في الموبايل والكمبيوتر)
 * مع ظهور التاريخ القبطي الحالي في الأعلى
 * وإمكانية قلب البطاقة وسماع نطق الشهر وإضافة الصوت من لوحة التحكم
 */

(function () {
  'use strict';

  // الشهور القبطية الـ 13 — الاسم بالعربي والقبطي وعدد الأيام فقط
  const DEFAULT_COPTIC_MONTHS = [
    { id: 1, order_index: 1, name_ar: 'توت', name_coptic: 'Ⲑⲱⲟⲩⲧ', days_count: 30, audio_url: '' },
    { id: 2, order_index: 2, name_ar: 'بابه', name_coptic: 'Ⲡⲁⲱⲡⲉ', days_count: 30, audio_url: '' },
    { id: 3, order_index: 3, name_ar: 'هاتور', name_coptic: 'Ϩⲁⲑⲱⲣ', days_count: 30, audio_url: '' },
    { id: 4, order_index: 4, name_ar: 'كيهك', name_coptic: 'Ⲕⲟⲓⲁϩⲕ', days_count: 30, audio_url: '' },
    { id: 5, order_index: 5, name_ar: 'طوبة', name_coptic: 'Ⲧⲱⲃⲉ', days_count: 30, audio_url: '' },
    { id: 6, order_index: 6, name_ar: 'أمشير', name_coptic: 'Ⲙⲉϣⲓⲣ', days_count: 30, audio_url: '' },
    { id: 7, order_index: 7, name_ar: 'برمهات', name_coptic: 'Ⲡⲁⲣⲉⲙϩⲁⲧ', days_count: 30, audio_url: '' },
    { id: 8, order_index: 8, name_ar: 'برمودة', name_coptic: 'Ⲡⲁⲣⲙⲟⲩⲧⲉ', days_count: 30, audio_url: '' },
    { id: 9, order_index: 9, name_ar: 'بشنس', name_coptic: 'Ⲡⲁϣⲟⲛⲥ', days_count: 30, audio_url: '' },
    { id: 10, order_index: 10, name_ar: 'بؤونة', name_coptic: 'Ⲡⲁⲱⲛⲓ', days_count: 30, audio_url: '' },
    { id: 11, order_index: 11, name_ar: 'أبيب', name_coptic: 'Ⲉⲡⲏⲡ', days_count: 30, audio_url: '' },
    { id: 12, order_index: 12, name_ar: 'مسرى', name_coptic: 'Ⲙⲉⲥⲱⲣⲏ', days_count: 30, audio_url: '' },
    { id: 13, order_index: 13, name_ar: 'النسيء', name_coptic: 'Ⲡⲓⲕⲟⲩϫⲓ', days_count: 5, audio_url: '' }
  ];

  const STORAGE_KEY = 'mg_coptic_calendar_data';
  const CARD_AUTO_CLOSE_MS = 10000;
  const cardState = new Map();

  const ICON_AUDIO = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;

  function resolveAudioUrl(input) {
    if (!input) return '';
    const trimmed = String(input).trim();
    if (!trimmed) return '';

    const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
    }

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('/')) {
      return trimmed;
    }

    const sbUrl = 'https://kdoanxzpfiscprjjzzic.supabase.co';
    return `${sbUrl}/storage/v1/object/public/audio-files/${trimmed}`;
  }

  function playMonthAudioFile(audioUrl, btnElement, monthNameAr) {
    const resolved = resolveAudioUrl(audioUrl);
    if (!resolved) {
      if (typeof window.toast === 'function') {
        window.toast(`لم يتم إضافة تسجيل صوتي لشهر ${monthNameAr} بعد — يمكنك إضافته من لوحة التحكم`, 'warn');
      }
      return null;
    }

    try {
      if (typeof window.playAudio === 'function') {
        return window.playAudio(resolved, btnElement);
      }
      const audio = new Audio(resolved);
      audio.play().catch(e => console.warn('Audio play notice:', e));
      return audio;
    } catch (err) {
      console.warn('Audio init error:', err);
      return null;
    }
  }

  function closeMonthCard(card, i) {
    card.classList.remove('flipped', 'playing');
    const st = cardState.get(i);
    if (st) {
      if (st.timeoutId) clearTimeout(st.timeoutId);
      if (st.audio) {
        st.audio.pause();
        st.audio.currentTime = 0;
      }
    }
    cardState.set(i, { timeoutId: null, audio: null });
  }

  function openMonthCard(card, i, audioUrl, monthNameAr) {
    document.querySelectorAll('#coptic-months-grid .letter-card.flipped').forEach(other => {
      if (other !== card) closeMonthCard(other, other.dataset.i);
    });

    card.classList.add('flipped');

    const btn = card.querySelector('.audio-btn');
    const audio = playMonthAudioFile(audioUrl, btn, monthNameAr);
    if (audio) {
      card.classList.add('playing');
      audio.addEventListener('ended', () => card.classList.remove('playing'));
    }

    const timeoutId = setTimeout(() => closeMonthCard(card, i), CARD_AUTO_CLOSE_MS);
    cardState.set(i, { timeoutId, audio });
  }

  class CopticCalendarService {
    constructor() {
      this.months = [];
      this.loadMonths();
    }

    loadMonths() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length >= 12) {
            this.months = parsed.map(m => {
              const def = DEFAULT_COPTIC_MONTHS.find(d => d.order_index === m.order_index) || {};
              return {
                id: m.id || def.id,
                order_index: m.order_index || def.order_index,
                name_ar: m.name_ar || def.name_ar,
                name_coptic: m.name_coptic || def.name_coptic,
                days_count: m.days_count || def.days_count || 30,
                audio_url: m.audio_url || ''
              };
            });
            return;
          }
        }
      } catch (e) {
        console.warn('CopticCalendarService: Error parsing local data', e);
      }
      this.months = JSON.parse(JSON.stringify(DEFAULT_COPTIC_MONTHS));
    }

    saveLocalMonths() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.months));
        window.dispatchEvent(new CustomEvent('coptic-calendar-updated', { detail: this.months }));
      } catch (e) {}
    }

    async loadFromSupabase(sbClient) {
      if (!sbClient) return this.months;
      try {
        const { data, error } = await sbClient
          .from('coptic_calendar')
          .select('id, order_index, name_ar, name_coptic, days_count, audio_url')
          .order('order_index');

        if (!error && data && data.length >= 12) {
          this.months = data.map(item => {
            const def = DEFAULT_COPTIC_MONTHS.find(d => d.order_index === item.order_index) || {};
            return {
              id: item.id || def.id,
              order_index: item.order_index || def.order_index,
              name_ar: item.name_ar || def.name_ar,
              name_coptic: item.name_coptic || def.name_coptic,
              days_count: item.days_count || def.days_count || 30,
              audio_url: item.audio_url || ''
            };
          });
          this.saveLocalMonths();
          return this.months;
        }
      } catch (err) {
        console.warn('CopticCalendar: Supabase load notice:', err.message);
      }
      return this.months;
    }

    toArabicDigits(num) {
      return String(num).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }

    gregorianToJDN(year, month, day) {
      const a = Math.floor((14 - month) / 12);
      const y = year + 4800 - a;
      const m = month + 12 * a - 3;
      return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    }

    getCopticDate(date = new Date()) {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const jdn = this.gregorianToJDN(y, m, d);

      const c = jdn - 1825030;
      const cYear = Math.floor((4 * c + 3) / 1461) + 1;
      const startOfYear = Math.floor((cYear - 1) * 1461 / 4);
      const dayInYear = c - startOfYear;

      let cMonth = Math.floor(dayInYear / 30) + 1;
      let cDay = (dayInYear % 30) + 1;

      if (cMonth > 13) cMonth = 13;

      const isCopticLeapYear = (cYear % 4 === 3);
      const nasieDays = isCopticLeapYear ? 6 : 5;

      const monthObj = this.months.find(m => m.order_index === cMonth) || this.months[cMonth - 1] || DEFAULT_COPTIC_MONTHS[cMonth - 1];

      return {
        cYear,
        cMonth,
        cDay,
        isCopticLeapYear,
        nasieDays,
        monthObj,
        gregorianDate: date
      };
    }
  }

  const service = new CopticCalendarService();
  window.CopticCalendarService = service;

  // رسم قسم الشهور القبطية مع عرض التاريخ القبطي الحالي في الأعلى
  function renderCopticCalendarSection() {
    const container = document.getElementById('vocab');
    if (!container) return;

    const todayCoptic = service.getCopticDate(new Date());
    const currentMonthNum = todayCoptic.cMonth;

    const weekdaysAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const todayWeekday = weekdaysAr[new Date().getDay()];
    const gMonthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const todayGString = `${todayWeekday}، ${new Date().getDate()} ${gMonthsAr[new Date().getMonth()]} ${new Date().getFullYear()}م`;

    container.innerHTML = `
      <!-- زر العودة للرئيسية -->
      <button type="button" class="back-to-home-btn" onclick="switchTab('home')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>العودة للرئيسية</span>
      </button>

      <!-- بطاقة التاريخ القبطي الحالي في الأعلى -->
      <div class="coptic-current-date-banner">
        <div class="coptic-date-main-col">
          <div class="coptic-date-badge-tag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>التاريخ القبطي اليوم:</span>
          </div>
          <div class="coptic-date-value">
            <span class="coptic-date-ar">${service.toArabicDigits(todayCoptic.cDay)} ${todayCoptic.monthObj.name_ar} ${service.toArabicDigits(todayCoptic.cYear)} ش</span>
            <span class="coptic-date-cop coptic-font">${todayCoptic.monthObj.name_coptic}</span>
          </div>
        </div>
        <div class="coptic-date-sub-col">
          <span class="gregorian-prefix">الموافق بالميلادي:</span>
          <span class="gregorian-val">${todayGString}</span>
        </div>
      </div>

      <!-- ترويسة العنوان (نفس تنسيق الحروف القبطية) -->
      <div class="section-title">
        <h2>الشهور القبطية (١٣ شهرًا)</h2>
      </div>

      <!-- شريط التلميح (نفس تنسيق الحروف القبطية) -->
      <div class="hint">
        اضغط على أي بطاقة لقلبها وسماع نطق الشهر ورؤية عدد أيامه.
      </div>

      <!-- شبكة البطاقات (نفس .grid بالضبط، تظهر 6 أعمدة في الكمبيوتر وعمودين في الموبايل) -->
      <div class="grid coptic-months-letter-grid" id="coptic-months-grid">
        ${service.months.map((m, i) => {
          const isCurrent = m.order_index === currentMonthNum;
          return `
            <div class="letter-card month-letter-card ${isCurrent ? 'is-current-month' : ''}" data-i="${i}" title="${m.name_ar}">
              <div class="flip">
                <!-- وجه البطاقة الأمامي: الحرف/الاسم بالقبطي في المنتصف وتحته الاسم بالعربي -->
                <div class="face front">
                  ${isCurrent ? `<span class="month-now-badge" title="الشهر الحالي الآن"><svg class="badge-star-icon" width="11" height="11" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> الشهر الحالي</span>` : ''}
                  <div class="glyph month-glyph">${m.name_coptic}</div>
                  <div class="letter-name month-name">${m.name_ar}</div>
                </div>

                <!-- وجه البطاقة الخلفي: الاسم بالعربي والقبطي وترتيبه وعدد الأيام وزر الصوت -->
                <div class="face back">
                  <div class="card-info-row">
                    <span class="meta-lbl">الاسم:</span>
                    <span class="meta-val name-val">${m.name_ar}</span>
                  </div>
                  <div class="card-info-row">
                    <span class="meta-lbl">بالقبطية:</span>
                    <span class="meta-val coptic-font month-back-coptic">${m.name_coptic}</span>
                  </div>
                  <div class="card-info-row">
                    <span class="meta-lbl">ترتيبه:</span>
                    <span class="meta-val num-val">الشهر ${service.toArabicDigits(m.order_index)}</span>
                  </div>
                  <div class="card-info-row">
                    <span class="meta-lbl">عدد الأيام:</span>
                    <span class="meta-val">${service.toArabicDigits(m.days_count || 30)} يومًا</span>
                  </div>
                  <button type="button" class="del-btn audio-btn" data-audio="${m.audio_url || ''}" title="تشغيل النطق">${ICON_AUDIO}</button>
                </div>
              </div>
              <div class="card-timer"><i></i></div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const grid = container.querySelector('#coptic-months-grid');
    if (!grid) return;

    grid.querySelectorAll('.letter-card').forEach(card => {
      const i = card.dataset.i;
      cardState.set(i, { timeoutId: null, audio: null });
      card.addEventListener('click', () => {
        if (card.classList.contains('flipped')) {
          closeMonthCard(card, i);
        } else {
          const monthData = service.months[i];
          openMonthCard(card, i, monthData.audio_url, monthData.name_ar);
        }
      });
    });

    grid.querySelectorAll('.audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.letter-card');
        const i = card.dataset.i;
        const monthData = service.months[i];
        openMonthCard(card, i, monthData.audio_url, monthData.name_ar);
      });
    });
  }

  window.addEventListener('coptic-calendar-updated', () => {
    service.loadMonths();
    const container = document.getElementById('vocab');
    if (container && !container.hidden && container.classList.contains('active')) {
      renderCopticCalendarSection();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCopticCalendarSection);
  } else {
    renderCopticCalendarSection();
  }

  window.renderCopticCalendar = renderCopticCalendarSection;

})();
