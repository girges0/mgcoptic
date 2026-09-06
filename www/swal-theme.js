/**
 * MG COPTIC — SweetAlert2 Coptic Theme & Helpers
 * ================================================
 * ملف الثيم المركزي لجميع إشعارات SweetAlert2 في المشروع
 * يوفر دوال مساعدة: mgConfirm, mgAlert, mgToast, mgSuccess, mgError
 */

/* ───── 1. حقن CSS المخصص ───── */
(function injectSwalCopticCSS() {
  if (document.getElementById('mg-swal-theme-css')) return;
  const style = document.createElement('style');
  style.id = 'mg-swal-theme-css';
  style.textContent = `
    /* ── SweetAlert2 Coptic Override ── */
    .swal2-container {
      z-index: 10000000 !important;
    }
    .swal2-popup.mg-swal-popup {
      font-family: 'Tajawal', 'Cairo', 'Segoe UI', sans-serif;
      direction: rtl;
      border-radius: 22px;
      border: 1.5px solid rgba(168, 130, 58, 0.35);
      background: linear-gradient(165deg, #faf6e9 0%, #f4ecd4 100%);
      box-shadow: 0 20px 60px rgba(36, 27, 18, 0.22), 0 0 0 1px rgba(168, 130, 58, 0.12);
      padding: 28px 24px 20px;
    }
    .swal2-popup.mg-swal-popup .swal2-title {
      font-family: 'Tajawal', 'Cairo', sans-serif;
      font-weight: 800;
      font-size: 1.35rem;
      color: #241b12;
      margin-bottom: 4px;
    }
    .swal2-popup.mg-swal-popup .swal2-html-container {
      font-family: 'Tajawal', 'Cairo', sans-serif;
      font-size: 1rem;
      color: #5a4a3a;
      line-height: 1.7;
      margin-top: 8px;
    }
    /* ── أزرار التأكيد ── */
    .swal2-popup.mg-swal-popup .swal2-confirm {
      background: linear-gradient(135deg, #8c2430 0%, #6b1a24 100%);
      border: none;
      border-radius: 14px;
      font-family: 'Tajawal', sans-serif;
      font-weight: 700;
      font-size: .95rem;
      padding: 10px 28px;
      box-shadow: 0 4px 14px rgba(140, 36, 48, 0.35);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .swal2-popup.mg-swal-popup .swal2-confirm:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(140, 36, 48, 0.45);
    }
    .swal2-popup.mg-swal-popup .swal2-confirm:active {
      transform: scale(0.97);
    }
    /* ── زر الإلغاء ── */
    .swal2-popup.mg-swal-popup .swal2-cancel {
      background: transparent;
      border: 1.5px solid rgba(168, 130, 58, 0.45);
      border-radius: 14px;
      color: #5a4a3a;
      font-family: 'Tajawal', sans-serif;
      font-weight: 700;
      font-size: .95rem;
      padding: 10px 28px;
      transition: background .2s ease, border-color .2s ease;
    }
    .swal2-popup.mg-swal-popup .swal2-cancel:hover {
      background: rgba(168, 130, 58, 0.08);
      border-color: rgba(168, 130, 58, 0.65);
    }
    /* ── أيقونات مخصصة ── */
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-success {
      border-color: #2F7D46;
      color: #2F7D46;
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-success .swal2-success-line-tip,
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-success .swal2-success-line-long {
      background-color: #2F7D46;
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-success .swal2-success-ring {
      border-color: rgba(47, 125, 70, 0.3);
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-error {
      border-color: #8c2430;
      color: #8c2430;
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-error .swal2-x-mark-line-left,
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-error .swal2-x-mark-line-right {
      background-color: #8c2430;
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-warning {
      border-color: #a8823a;
      color: #a8823a;
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-info {
      border-color: #a8823a;
      color: #a8823a;
    }
    .swal2-popup.mg-swal-popup .swal2-icon.swal2-question {
      border-color: #a8823a;
      color: #a8823a;
    }
    /* ── Toast مخصص ── */
    .mg-swal-toast.swal2-popup {
      font-family: 'Tajawal', 'Cairo', sans-serif;
      direction: rtl;
      border-radius: 16px;
      border: 1px solid rgba(168, 130, 58, 0.3);
      background: linear-gradient(165deg, rgba(250, 246, 233, 0.97), rgba(244, 236, 212, 0.97));
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(36, 27, 18, 0.18);
      padding: 12px 18px;
    }
    .mg-swal-toast .swal2-title {
      font-family: 'Tajawal', sans-serif;
      font-weight: 700;
      font-size: .92rem;
      color: #241b12;
    }
    /* ── Backdrop ── */
    .mg-swal-backdrop {
      background: rgba(26, 18, 16, 0.55) !important;
      backdrop-filter: blur(4px);
    }
    /* ── أنيميشن ── */
    .mg-swal-popup.swal2-show {
      animation: mgSwalIn 0.35s cubic-bezier(0.22, 0.68, 0, 1.1);
    }
    .mg-swal-popup.swal2-hide {
      animation: mgSwalOut 0.2s ease-in;
    }
    @keyframes mgSwalIn {
      0% { opacity: 0; transform: scale(0.85) translateY(20px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes mgSwalOut {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.9) translateY(10px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ───── 2. Swal Mixin — النسخة المخصصة ───── */
const MgSwal = Swal.mixin({
  customClass: {
    popup: 'mg-swal-popup',
    confirmButton: 'swal2-confirm',
    cancelButton: 'swal2-cancel',
  },
  buttonsStyling: true,
  backdrop: true,
  showClass: { popup: 'mg-swal-popup swal2-show' },
  hideClass: { popup: 'mg-swal-popup swal2-hide' },
});

/* ───── 3. Toast Mixin ───── */
const MgToast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
  customClass: { popup: 'mg-swal-toast' },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

/* ───── 4. الدوال المساعدة ───── */

/**
 * بديل confirm() — يعرض نافذة تأكيد ويعود بـ true/false
 * @param {string} title - العنوان
 * @param {string} text - النص التفصيلي
 * @param {string} icon - نوع الأيقونة: 'warning' | 'question' | 'info' | 'error'
 * @param {object} opts - خيارات إضافية
 * @returns {Promise<boolean>}
 */
async function mgConfirm(title, text, icon = 'question', opts = {}) {
  const result = await MgSwal.fire({
    title: title,
    html: text || '',
    icon: icon,
    showCancelButton: true,
    confirmButtonText: opts.confirmText || 'نعم',
    cancelButtonText: opts.cancelText || 'إلغاء',
    reverseButtons: true,
    focusCancel: true,
    ...opts
  });
  return result.isConfirmed;
}

/**
 * بديل alert() — إشعار معلوماتي
 * @param {string} title
 * @param {string} text
 * @param {string} icon - 'info' | 'warning' | 'error' | 'success'
 * @returns {Promise}
 */
function mgAlert(title, text, icon = 'info') {
  return MgSwal.fire({
    title: title,
    html: text || '',
    icon: icon,
    confirmButtonText: 'حسنًا',
  });
}

/**
 * إشعار Toast صغير في أعلى الشاشة
 * @param {string} title
 * @param {string} icon - 'success' | 'error' | 'warning' | 'info'
 */
function mgToast(title, icon = 'success') {
  return MgToast.fire({ title, icon });
}

/**
 * إشعار نجاح
 * @param {string} title
 * @param {string} text
 */
function mgSuccess(title, text) {
  return MgSwal.fire({
    title: title,
    html: text || '',
    icon: 'success',
    confirmButtonText: 'ممتاز!',
  });
}

/**
 * إشعار خطأ
 * @param {string} title
 * @param {string} text
 */
function mgError(title, text) {
  return MgSwal.fire({
    title: title,
    html: text || '',
    icon: 'error',
    confirmButtonText: 'فهمت',
  });
}
