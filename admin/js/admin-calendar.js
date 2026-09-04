/**
 * MG COPTIC — Admin Coptic Months Management
 * إدارة شهور السنة القبطية في لوحة التحكم
 * تشمل: الاسم بالعربي، الاسم بالقبطي، عدد الأيام، والتسجيل الصوتي (رفع واستماع وحذف)
 * تم استخدام أيقونات SVG نظيفة واحترافية بالكامل بدون أي إيموجي
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'mg_coptic_calendar_data';

  // أيقونات SVG احترافية
  const SVG_MIC = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>';
  const SVG_TRASH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
  const SVG_PLAY = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-left:4px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
  const SVG_STOP = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-left:4px;"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>';
  const SVG_CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  // الشهور الافتراضية الـ 13
  const DEFAULT_MONTHS = [
    { order_index: 1, name_ar: 'توت', name_coptic: 'Ⲑⲱⲟⲩⲧ', days_count: 30, audio_url: '' },
    { order_index: 2, name_ar: 'بابه', name_coptic: 'Ⲡⲁⲱⲡⲉ', days_count: 30, audio_url: '' },
    { order_index: 3, name_ar: 'هاتور', name_coptic: 'Ϩⲁⲑⲱⲣ', days_count: 30, audio_url: '' },
    { order_index: 4, name_ar: 'كيهك', name_coptic: 'Ⲕⲟⲓⲁϩⲕ', days_count: 30, audio_url: '' },
    { order_index: 5, name_ar: 'طوبة', name_coptic: 'Ⲧⲱⲃⲉ', days_count: 30, audio_url: '' },
    { order_index: 6, name_ar: 'أمشير', name_coptic: 'Ⲙⲉϣⲓⲣ', days_count: 30, audio_url: '' },
    { order_index: 7, name_ar: 'برمهات', name_coptic: 'Ⲡⲁⲣⲉⲙϩⲁⲧ', days_count: 30, audio_url: '' },
    { order_index: 8, name_ar: 'برمودة', name_coptic: 'Ⲡⲁⲣⲙⲟⲩⲧⲉ', days_count: 30, audio_url: '' },
    { order_index: 9, name_ar: 'بشنس', name_coptic: 'Ⲡⲁϣⲟⲛⲥ', days_count: 30, audio_url: '' },
    { order_index: 10, name_ar: 'بؤونة', name_coptic: 'Ⲡⲁⲱⲛⲓ', days_count: 30, audio_url: '' },
    { order_index: 11, name_ar: 'أبيب', name_coptic: 'Ⲉⲡⲏⲡ', days_count: 30, audio_url: '' },
    { order_index: 12, name_ar: 'مسرى', name_coptic: 'Ⲙⲉⲥⲱⲣⲏ', days_count: 30, audio_url: '' },
    { order_index: 13, name_ar: 'النسيء', name_coptic: 'Ⲡⲓⲕⲟⲩϫⲓ', days_count: 5, audio_url: '' }
  ];

  function escapeHtml(str) {
    return String(str ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // حالة تشغيل الصوت في لوحة التحكم
  let calCurrentAudio = null;
  let calCurrentPlayBtn = null;

  function stopCalAudio() {
    if (calCurrentAudio) {
      try {
        calCurrentAudio.pause();
        calCurrentAudio.currentTime = 0;
      } catch (e) {}
      calCurrentAudio = null;
    }
    if (calCurrentPlayBtn) {
      calCurrentPlayBtn.innerHTML = `${SVG_PLAY}استماع`;
      calCurrentPlayBtn.style.color = 'var(--ok, #1E8E3E)';
      calCurrentPlayBtn.style.borderColor = 'var(--ok, #1E8E3E)';
      calCurrentPlayBtn = null;
    }
  }

  // حل وتوحيد روابط الصوت
  function resolveAudioLink(input) {
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

    if (typeof window.resolveAudioUrl === 'function') {
      return window.resolveAudioUrl(trimmed);
    }

    const sbUrl = 'https://kdoanxzpfiscprjjzzic.supabase.co';
    return `${sbUrl}/storage/v1/object/public/audio-files/${trimmed}`;
  }

  // تحميل الشهور وعرضها في الجدول
  async function loadCalendarMonths() {
    const tbody = document.querySelector('#table-calendar tbody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--ink-soft);">جاري تحميل شهور السنة القبطية...</td></tr>';

    let months = [];

    // جلب من Supabase
    if (window.sb) {
      try {
        const { data, error } = await window.sb
          .from('coptic_calendar')
          .select('id, order_index, name_ar, name_coptic, days_count, audio_url')
          .order('order_index');

        if (!error && data && data.length > 0) {
          months = data;
        }
      } catch (e) {
        console.warn('loadCalendarMonths: Supabase fetch error', e);
      }
    }

    // احتياطي localStorage
    if (!months.length) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            months = parsed;
          }
        }
      } catch (e) {}
    }

    // افتراضي
    if (!months.length) {
      months = JSON.parse(JSON.stringify(DEFAULT_MONTHS));
    }

    months.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(months));
    } catch (e) {}

    renderCalendarRows(months, tbody);
  }

  // رسم أسطر الجدول (الأعمدة الـ 6 فقط: ترتيب، عربي، قبطي، أيام، صوت، حفظ)
  function renderCalendarRows(months, tbody) {
    tbody.innerHTML = '';

    months.forEach(m => {
      const tr = document.createElement('tr');
      tr.dataset.id = m.id || `local_${m.order_index}`;
      tr.dataset.order = m.order_index;

      tr.innerHTML = `
        <td style="text-align:center;">
          <input type="number" class="f-order" value="${m.order_index || 1}" min="1" max="50" style="width:55px;text-align:center;">
        </td>
        <td>
          <input type="text" class="f-name-ar" value="${escapeHtml(m.name_ar || '')}" placeholder="اسم الشهر بالعربي" style="font-weight:700;width:100%;">
        </td>
        <td>
          <input type="text" class="f-name-cop coptic coptic-input" value="${escapeHtml(m.name_coptic || '')}" placeholder="الاسم بالقبطية" style="font-size:1.15rem;width:100%;color:var(--teal);">
        </td>
        <td style="text-align:center;">
          <input type="number" class="f-days" value="${m.days_count || 30}" min="1" max="31" style="width:60px;text-align:center;">
        </td>
        <td data-label="التسجيل الصوتي" style="min-width:220px;">
          <input type="text" class="f-audio f-audio_filename" value="${escapeHtml(m.audio_url || '')}" placeholder="رابط Google Drive أو رابط مباشر" style="width:100%;direction:ltr;font-size:0.8rem;">
          <input type="file" accept="audio/*" class="f-audio-file" style="display:none">
          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px;">
            <button type="button" class="upload-btn f-audio-play" style="${m.audio_url ? '' : 'display:none;'}border-color:var(--ok, #1E8E3E);color:var(--ok, #1E8E3E);">${SVG_PLAY}استماع</button>
            <button type="button" class="upload-btn f-audio-btn">${SVG_MIC}رفع تسجيل</button>
            <button type="button" class="upload-btn f-audio-del" style="${m.audio_url ? '' : 'display:none;'}border-color:var(--err, #D93025);color:var(--err, #D93025);">${SVG_TRASH}حذف الصوت</button>
          </div>
        </td>
        <td style="text-align:center;white-space:nowrap;">
          <button type="button" class="btn btn-save-row" title="حفظ هذا الشهر">${SVG_CHECK}حفظ</button>
        </td>
      `;

      tr.querySelectorAll('input').forEach(el => {
        el.addEventListener('input', () => {
          tr.classList.add('dirty');
          if (typeof window.markDirty === 'function') window.markDirty();
        });
      });

      wireCalendarAudioUpload(tr);

      const saveBtn = tr.querySelector('.btn-save-row');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => saveCalendarRow(tr));
      }

      tbody.appendChild(tr);
    });
  }

  // ربط عناصر الصوت (رفع، استماع، حذف)
  function wireCalendarAudioUpload(tr) {
    const fileInput = tr.querySelector('.f-audio-file');
    const audioBtn = tr.querySelector('.f-audio-btn');
    const textInput = tr.querySelector('.f-audio_filename');
    const delBtn = tr.querySelector('.f-audio-del');
    const playBtn = tr.querySelector('.f-audio-play');

    function updateButtons() {
      const hasVal = Boolean(textInput && textInput.value.trim());
      if (delBtn) delBtn.style.display = hasVal ? '' : 'none';
      if (playBtn) playBtn.style.display = hasVal ? '' : 'none';
    }

    if (textInput) {
      textInput.addEventListener('input', () => {
        updateButtons();
        tr.classList.add('dirty');
        if (typeof window.markDirty === 'function') window.markDirty();
      });

      textInput.addEventListener('change', () => {
        updateButtons();
      });
    }

    // زر رفع ملف صوتي جديد
    if (audioBtn && fileInput) {
      audioBtn.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', async () => {
        if (!fileInput.files || !fileInput.files[0]) return;
        const file = fileInput.files[0];
        const oldUrl = textInput ? textInput.value.trim() : '';

        audioBtn.disabled = true;
        audioBtn.innerHTML = 'جاري الرفع...';

        let uploadedUrl = null;

        if (typeof window.uploadFile === 'function') {
          try {
            uploadedUrl = await window.uploadFile(file, 'audio-files', 'calendar');
          } catch (e) {
            console.warn('uploadFile fallback', e);
          }
        }

        if (!uploadedUrl && window.sb) {
          try {
            const ext = file.name.split('.').pop() || 'mp3';
            const path = `calendar/cal_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
            const { error } = await window.sb.storage.from('audio-files').upload(path, file);
            if (!error) {
              const { data } = window.sb.storage.from('audio-files').getPublicUrl(path);
              uploadedUrl = data.publicUrl;
            } else {
              const { error: err2 } = await window.sb.storage.from('media').upload(path, file);
              if (!err2) {
                const { data } = window.sb.storage.from('media').getPublicUrl(path);
                uploadedUrl = data.publicUrl;
              }
            }
          } catch (e) {
            console.error('Storage upload exception:', e);
          }
        }

        audioBtn.disabled = false;
        audioBtn.innerHTML = `${SVG_MIC}رفع تسجيل`;

        if (uploadedUrl) {
          if (textInput) textInput.value = uploadedUrl;
          updateButtons();
          tr.classList.add('dirty');
          if (typeof window.markDirty === 'function') window.markDirty();
          if (typeof window.toast === 'function') window.toast('اترفع الصوت بنجاح! اضغط حفظ عشان يتخزن');

          if (oldUrl && oldUrl !== uploadedUrl && typeof window.deleteStorageFile === 'function') {
            window.deleteStorageFile(oldUrl);
          }
        }
        fileInput.value = '';
      });
    }

    // زر حذف الصوت
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        const confirmed = typeof window.mgConfirm === 'function'
          ? await window.mgConfirm('حذف التسجيل الصوتي', 'هل أنت متأكد من حذف التسجيل الصوتي لهذا الشهر؟', 'warning', { confirmText: 'نعم، احذف', cancelText: 'إلغاء' })
          : confirm('هل أنت متأكد من حذف التسجيل الصوتي لهذا الشهر؟');

        if (!confirmed) return;

        stopCalAudio();
        const oldUrl = textInput ? textInput.value.trim() : '';
        if (textInput) textInput.value = '';
        updateButtons();
        tr.classList.add('dirty');
        if (typeof window.markDirty === 'function') window.markDirty();
        if (typeof window.toast === 'function') window.toast('تم مسح التسجيل، اضغط حفظ لتأكيد التعديل');

        if (oldUrl && typeof window.deleteStorageFile === 'function') {
          window.deleteStorageFile(oldUrl);
        }
      });
    }

    // زر تجربة الاستماع للصوت
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const rawUrl = textInput ? textInput.value.trim() : '';
        if (!rawUrl) {
          if (typeof window.toast === 'function') window.toast('لا يوجد رابط صوتي لتشغيله', true);
          return;
        }

        if (calCurrentPlayBtn === playBtn && calCurrentAudio) {
          stopCalAudio();
          return;
        }

        stopCalAudio();
        const resolved = resolveAudioLink(rawUrl);

        playBtn.innerHTML = `${SVG_STOP}إيقاف`;
        playBtn.style.color = 'var(--madder, #8C2430)';
        playBtn.style.borderColor = 'var(--madder, #8C2430)';
        calCurrentPlayBtn = playBtn;

        const audio = new Audio(resolved);
        calCurrentAudio = audio;

        audio.addEventListener('ended', stopCalAudio);
        audio.play().catch(err => {
          stopCalAudio();
          console.warn('Audio preview error:', err);
          if (/drive\.google\.com/i.test(rawUrl)) {
            if (typeof window.toast === 'function') {
              window.toast('تعذّر تشغيل الرابط — تأكد أن مشاركة ملف Google Drive مضبوطة على: "أي شخص لديه الرابط"', true);
            }
          } else {
            if (typeof window.toast === 'function') {
              window.toast('تعذّر تشغيل الملف — تأكد من صحة الرابط أو الملف الصوتي', true);
            }
          }
        });
      });
    }
  }

  // حفظ سطر شهر معين
  async function saveCalendarRow(tr) {
    if (!tr) return false;
    const order = parseInt(tr.querySelector('.f-order').value, 10) || 1;
    const nameAr = tr.querySelector('.f-name-ar').value.trim();
    const nameCop = tr.querySelector('.f-name-cop').value.trim();
    const daysCount = parseInt(tr.querySelector('.f-days').value, 10) || 30;
    const audioUrl = tr.querySelector('.f-audio').value.trim();

    if (!nameAr) {
      if (typeof window.toast === 'function') window.toast('يرجى كتابة اسم الشهر بالعربي', true);
      return false;
    }

    const payload = {
      order_index: order,
      name_ar: nameAr,
      name_coptic: nameCop,
      days_count: daysCount,
      audio_url: audioUrl,
      updated_at: new Date().toISOString()
    };

    let saved = false;

    // Supabase save
    if (window.sb) {
      try {
        const id = tr.dataset.id;
        const isNumericId = id && !id.startsWith('local_');

        let res;
        if (isNumericId) {
          res = await window.sb.from('coptic_calendar').update(payload).eq('id', id);
        } else {
          const check = await window.sb.from('coptic_calendar').select('id').eq('order_index', order).maybeSingle();
          if (check.data && check.data.id) {
            res = await window.sb.from('coptic_calendar').update(payload).eq('id', check.data.id);
            tr.dataset.id = check.data.id;
          } else {
            res = await window.sb.from('coptic_calendar').insert([payload]).select('id').single();
            if (res.data && res.data.id) tr.dataset.id = res.data.id;
          }
        }

        if (!res.error) {
          saved = true;
        } else {
          console.warn('saveCalendarRow: Supabase error, will fallback to local storage:', res.error);
        }
      } catch (e) {
        console.warn('saveCalendarRow: Supabase exception:', e);
      }
    }

    // localStorage save
    try {
      let localData = [];
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try { localData = JSON.parse(raw); } catch (e) {}
      }
      if (!Array.isArray(localData) || localData.length === 0) {
        localData = JSON.parse(JSON.stringify(DEFAULT_MONTHS));
      }

      const existingIdx = localData.findIndex(item => item.order_index === order);
      if (existingIdx >= 0) {
        localData[existingIdx] = { ...localData[existingIdx], ...payload };
      } else {
        localData.push({ id: tr.dataset.id, ...payload });
      }

      localData.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localData));
      saved = true;
    } catch (e) {
      console.warn('saveCalendarRow: LocalStorage save failed', e);
    }

    if (saved) {
      tr.classList.remove('dirty');
      if (typeof window.toast === 'function') {
        window.toast(`تم حفظ شهر «${nameAr}» بنجاح ✓`);
      }
      window.dispatchEvent(new CustomEvent('coptic-calendar-updated'));
      return true;
    } else {
      if (typeof window.toast === 'function') {
        window.toast('تعذر حفظ التعديلات، يرجى المحاولة لاحقاً', true);
      }
      return false;
    }
  }

  // حفظ جميع الشهور
  async function saveAllCalendarMonths() {
    const rows = document.querySelectorAll('#table-calendar tbody tr');
    if (!rows.length) return;

    let successCount = 0;
    for (const tr of rows) {
      const ok = await saveCalendarRow(tr);
      if (ok) successCount++;
    }

    if (typeof window.toast === 'function') {
      window.toast(`تم حفظ وتحديث شهور السنة القبطية (${successCount}) ✓`);
    }
  }

  // استعادة الشهور الافتراضية
  async function resetCalendarDefaults() {
    const confirmed = typeof window.mgConfirm === 'function'
      ? await window.mgConfirm(
          'استعادة الشهور الافتراضية',
          'هل تريد بالتأكيد استعادة جميع شهور السنة القبطية الـ 13 إلى إعداداتها الأصلية؟',
          'warning',
          { confirmText: 'نعم، استعد الافتراضي', cancelText: 'إلغاء' }
        )
      : confirm('هل تريد بالتأكيد استعادة جميع شهور السنة القبطية الـ 13 إلى إعداداتها الأصلية؟');

    if (!confirmed) return;

    if (window.sb) {
      try {
        await window.sb.from('coptic_calendar').delete().neq('id', 0);
        for (const m of DEFAULT_MONTHS) {
          await window.sb.from('coptic_calendar').insert([m]);
        }
      } catch (e) {
        console.warn('resetCalendarDefaults: Supabase reset notice', e);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MONTHS));
    if (typeof window.toast === 'function') {
      window.toast('تمت استعادة الشهور القبطية الافتراضية بنجاح ✓');
    }
    await loadCalendarMonths();
    window.dispatchEvent(new CustomEvent('coptic-calendar-updated'));
  }

  // إضافة شهر جديد
  function addCalendarMonth() {
    const tbody = document.querySelector('#table-calendar tbody');
    if (!tbody) return;

    const currentRows = tbody.querySelectorAll('tr');
    const nextOrder = currentRows.length + 1;

    const newMonth = {
      order_index: nextOrder,
      name_ar: '',
      name_coptic: '',
      days_count: 30,
      audio_url: ''
    };

    const tr = document.createElement('tr');
    tr.dataset.id = `local_${Date.now()}`;
    tr.dataset.order = nextOrder;
    tr.classList.add('dirty');

    tr.innerHTML = `
      <td style="text-align:center;">
        <input type="number" class="f-order" value="${nextOrder}" min="1" max="50" style="width:55px;text-align:center;">
      </td>
      <td>
        <input type="text" class="f-name-ar" value="" placeholder="اسم الشهر بالعربي" style="font-weight:700;width:100%;">
      </td>
      <td>
        <input type="text" class="f-name-cop coptic coptic-input" value="" placeholder="الاسم بالقبطية" style="font-size:1.15rem;width:100%;color:var(--teal);">
      </td>
      <td style="text-align:center;">
        <input type="number" class="f-days" value="30" min="1" max="31" style="width:60px;text-align:center;">
      </td>
      <td data-label="التسجيل الصوتي" style="min-width:220px;">
        <input type="text" class="f-audio f-audio_filename" value="" placeholder="رابط Google Drive أو رابط مباشر" style="width:100%;direction:ltr;font-size:0.8rem;">
        <input type="file" accept="audio/*" class="f-audio-file" style="display:none">
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px;">
          <button type="button" class="upload-btn f-audio-play" style="display:none;border-color:var(--ok, #1E8E3E);color:var(--ok, #1E8E3E);">${SVG_PLAY}استماع</button>
          <button type="button" class="upload-btn f-audio-btn">${SVG_MIC}رفع تسجيل</button>
          <button type="button" class="upload-btn f-audio-del" style="display:none;border-color:var(--err, #D93025);color:var(--err, #D93025);">${SVG_TRASH}حذف الصوت</button>
        </div>
      </td>
      <td style="text-align:center;white-space:nowrap;">
        <button type="button" class="btn btn-save-row" title="حفظ هذا الشهر">${SVG_CHECK}حفظ</button>
      </td>
    `;

    tr.querySelectorAll('input').forEach(el => {
      el.addEventListener('input', () => {
        tr.classList.add('dirty');
        if (typeof window.markDirty === 'function') window.markDirty();
      });
    });

    wireCalendarAudioUpload(tr);

    const saveBtn = tr.querySelector('.btn-save-row');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => saveCalendarRow(tr));
    }

    tbody.appendChild(tr);
    tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const nameInput = tr.querySelector('.f-name-ar');
    if (nameInput) nameInput.focus();

    if (typeof window.markDirty === 'function') window.markDirty();
  }

  // تهيئة الأحداث في لوحة التحكم
  function initAdminCalendar() {
    const addBtn = document.getElementById('add-calendar-month');
    if (addBtn) addBtn.addEventListener('click', addCalendarMonth);

    const resetBtn = document.getElementById('reset-calendar-defaults');
    if (resetBtn) resetBtn.addEventListener('click', resetCalendarDefaults);

    const navItem = document.querySelector('[data-panel="panel-calendar"]');
    if (navItem) {
      navItem.addEventListener('click', loadCalendarMonths);
    }

    if (window.location.hash === '#calendar') {
      loadCalendarMonths();
    }
  }

  window.loadCalendarMonths = loadCalendarMonths;
  window.saveCalendarRow = saveCalendarRow;
  window.saveAllCalendarMonths = saveAllCalendarMonths;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminCalendar);
  } else {
    initAdminCalendar();
  }

})();
