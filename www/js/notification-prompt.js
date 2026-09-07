/**
 * ============================================================================
 * MG COPTIC - Notification Activation Prompt (App & Web)
 * يعرض نافذة/رسالة راقية لتفعيل الإشعارات فور الدخول للصفحة الرئيسية
 * للمستخدمين الجدد والقدامى والزوار في كلٍ من التطبيق والموقع.
 * ============================================================================
 */

(function () {
  'use strict';

  const PROMPT_DISMISS_KEY = 'mg_notif_prompt_dismissed';
  const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 ساعة مهلة قبل إعادة التذكير

  function isAuthModalOpen() {
    const authModal = document.getElementById('auth-modal');
    if (!authModal) return false;
    const style = window.getComputedStyle ? window.getComputedStyle(authModal) : null;
    return (authModal.style.display && authModal.style.display !== 'none') || (style && style.display !== 'none');
  }

  /**
   * فحص ما إذا كان يجب إظهار نافذة تفعيل الإشعارات
   */
  async function shouldShowPrompt() {
    try {
      // إذا كانت نافذة تسجيل الدخول/إنشاء الحساب مفتوحة، نؤجل نافذة الإشعارات
      if (isAuthModalOpen()) {
        return 'postpone';
      }

      const isNative = typeof window.Capacitor !== 'undefined' && 
                       typeof window.Capacitor.isNativePlatform === 'function' && 
                       window.Capacitor.isNativePlatform();

      // 1. فحص بيئة الأندرويد الأصلية
      if (isNative) {
        const PushNotifications = window.Capacitor?.Plugins?.PushNotifications;
        if (!PushNotifications) return false;

        const permStatus = await PushNotifications.checkPermissions();
        if (permStatus?.receive === 'granted') {
          // الإذن ممنوح بالفعل، نحدث التوكن بصمت
          if (typeof window.requestNotificationPermission === 'function') {
            window.requestNotificationPermission({ silent: true });
          }
          return false;
        }
        return true;
      }

      // 2. فحص بيئة متصفح الويب و PWA
      if ('Notification' in window) {
        const perm = Notification.permission;
        if (perm === 'granted') {
          // الإذن ممنوح، نحدث التوكن بصمت
          if (typeof window.requestNotificationPermission === 'function') {
            window.requestNotificationPermission({ silent: true });
          }
          return false;
        }
        if (perm === 'denied') {
          // المتصفح حظر الإشعارات بشكل دائم
          return false;
        }

        // حالة default: لم يُطلب الإذن بعد
        const dismissedAt = localStorage.getItem(PROMPT_DISMISS_KEY);
        if (dismissedAt && (Date.now() - Number(dismissedAt) < DISMISS_COOLDOWN_MS)) {
          return false;
        }

        return true;
      }

      return false;
    } catch (e) {
      console.warn('[NotificationPrompt] Check error:', e);
      return false;
    }
  }

  /**
   * إنشاء وعرض نافذة تفعيل الإشعارات الملكية
   */
  function createAndShowPrompt() {
    if (document.getElementById('mg-notif-prompt-overlay')) return;

    // حقن كود الـ CSS إذا لم يكن موجوداً
    if (!document.getElementById('mg-notif-prompt-styles')) {
      const style = document.createElement('style');
      style.id = 'mg-notif-prompt-styles';
      style.textContent = `
        @keyframes mgFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes mgScaleUp {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes mgBellRing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(8deg); }
          80% { transform: rotate(-5deg); }
        }
        .mg-notif-overlay {
          position: fixed;
          inset: 0;
          background: rgba(38, 25, 18, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: mgFadeIn 0.3s ease-out forwards;
          direction: rtl;
          font-family: 'Cairo', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .mg-notif-card {
          width: 100%;
          max-width: 420px;
          background: #FAF4E9;
          border: 2px solid #DBC8A4;
          border-radius: 28px;
          box-shadow: 0 20px 48px rgba(38, 25, 18, 0.35);
          overflow: hidden;
          animation: mgScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          text-align: center;
          position: relative;
        }
        .mg-notif-header {
          padding: 28px 24px 16px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mg-notif-badge {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          background: #F3E9D2;
          border: 2px solid #DBC8A4;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 8px 20px rgba(107, 21, 48, 0.15);
          margin-bottom: 16px;
        }
        .mg-notif-badge img {
          width: 54px;
          height: 54px;
          object-fit: contain;
        }
        .mg-notif-bell-bubble {
          position: absolute;
          bottom: -6px;
          left: -6px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #6B1530;
          color: #FAF4E9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.25);
          animation: mgBellRing 2s infinite ease-in-out;
        }
        .mg-notif-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #261912;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .mg-notif-desc {
          font-size: 0.95rem;
          font-weight: 600;
          color: #6B5B52;
          line-height: 1.6;
          margin-bottom: 18px;
          padding: 0 10px;
        }
        .mg-notif-features {
          background: #F3E9D2;
          border-radius: 18px;
          padding: 14px 16px;
          margin: 0 20px 20px 20px;
          text-align: right;
          border: 1px solid #E6D8BF;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mg-notif-feat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          color: #3A2A20;
        }
        .mg-notif-feat-icon {
          font-size: 1.15rem;
        }
        .mg-notif-actions {
          padding: 0 20px 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mg-btn-enable {
          width: 100%;
          padding: 16px;
          background-color: #6B1530;
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          font-family: 'Cairo', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 0 #4A0E21;
          transition: all 0.12s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .mg-btn-enable:active {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #4A0E21;
        }
        .mg-btn-later {
          background: transparent;
          border: none;
          color: #7A6F66;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          padding: 8px;
          transition: color 0.2s;
        }
        .mg-btn-later:hover {
          color: #261912;
          text-decoration: underline;
        }
      `;
      document.head.appendChild(style);
    }

    const overlay = document.createElement('div');
    overlay.id = 'mg-notif-prompt-overlay';
    overlay.className = 'mg-notif-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'mg-notif-title');

    overlay.innerHTML = `
      <div class="mg-notif-card" id="mg-notif-prompt-card">
        <div class="mg-notif-header">
          <div class="mg-notif-badge">
            <img src="logo.png" alt="MG COPTIC" onerror="this.src='icon-192.png'">
            <div class="mg-notif-bell-bubble">🔔</div>
          </div>
          <h2 class="mg-notif-title" id="mg-notif-title">تفعيل إشعارات المنصة</h2>
          <p class="mg-notif-desc">
            ابقَ على تواصل مع رحلتك التعليمية! فعّل التنبيهات لتصلك أحدث الدروس والتذكيرات أولاً بأول.
          </p>
        </div>

        <div class="mg-notif-features">
          <div class="mg-notif-feat-item">
            <span class="mg-notif-feat-icon">🔥</span>
            <span>تذكيرات يومية للحفاظ على سلسلة دراستك (Streak)</span>
          </div>
          <div class="mg-notif-feat-item">
            <span class="mg-notif-feat-icon">🏆</span>
            <span>تنبيهات فورية عند تغيّر ترتيبك في لوحة المتصدرين</span>
          </div>
          <div class="mg-notif-feat-item">
            <span class="mg-notif-feat-icon">✨</span>
            <span>إشعارات المحتوى الكنسي والطقوس والمفردات الجديدة</span>
          </div>
        </div>

        <div class="mg-notif-actions">
          <button type="button" class="mg-btn-enable" id="mg-btn-activate-notif">
            <span>🔔 تفعيل الإشعارات الآن</span>
          </button>
          <button type="button" class="mg-btn-later" id="mg-btn-dismiss-notif">
            <span>سأقوم بالتفعيل لاحقاً</span>
          </button>
        </div>
      </div>
    `;

    const closePrompt = () => {
      overlay.style.transition = 'opacity 0.25s ease';
      overlay.style.opacity = '0';
      const card = overlay.querySelector('.mg-notif-card');
      if (card) {
        card.style.transition = 'transform 0.25s ease';
        card.style.transform = 'scale(0.92) translateY(20px)';
      }
      setTimeout(() => overlay.remove(), 260);
    };

    // زر التفعيل
    const enableBtn = overlay.querySelector('#mg-btn-activate-notif');
    enableBtn.addEventListener('click', async () => {
      enableBtn.disabled = true;
      enableBtn.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:8px;">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#FFFFFF" stroke-width="2.5" fill="none" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
          <span>جارٍ التفعيل...</span>
        </span>
      `;

      try {
        if (typeof window.requestNotificationPermission === 'function') {
          const res = await window.requestNotificationPermission({ forcePrompt: true });
          if (res && res.granted) {
            closePrompt();
            if (typeof window.mgToast === 'function') {
              window.mgToast('تم تفعيل إشعارات المنصة بنجاح! 🎉', 'success');
            } else if (window.Swal) {
              window.Swal.fire({
                icon: 'success',
                title: 'تم التفعيل بنجاح! 🎉',
                text: 'ستصلك الآن تنبيهات الدروس والتحديات اليومية.',
                confirmButtonColor: '#6B1530',
                confirmButtonText: 'ممتاز'
              });
            }
            return;
          }
        }
      } catch (err) {
        console.warn('[NotificationPrompt] Activation error:', err);
      }

      // في حال الرفض أو عدم التوافق
      closePrompt();
    });

    // زر "لاحقاً"
    const laterBtn = overlay.querySelector('#mg-btn-dismiss-notif');
    laterBtn.addEventListener('click', () => {
      localStorage.setItem(PROMPT_DISMISS_KEY, Date.now().toString());
      closePrompt();
    });

    document.body.appendChild(overlay);
  }

  /**
   * فحص وتشغيل النافذة بعد استقرار واجهة الصفحة
   */
  async function initNotificationPrompt() {
    setTimeout(async () => {
      const show = await shouldShowPrompt();
      if (show === 'postpone') {
        // تأجيل النافذة لحين إغلاق مودال تسجيل الدخول
        window.addEventListener('mg:auth-modal-closed', () => {
          setTimeout(initNotificationPrompt, 1200);
        }, { once: true });
        return;
      }
      if (show) {
        createAndShowPrompt();
      }
    }, 1800);
  }

  // إذا فتح مودال الحساب أثناء ظهور نافذة الإشعارات، يتم إخفاؤها فوراً لإعطاء الأولوية للحساب
  window.addEventListener('mg:auth-modal-opened', () => {
    const overlay = document.getElementById('mg-notif-prompt-overlay');
    if (overlay) {
      overlay.remove();
      window.addEventListener('mg:auth-modal-closed', () => {
        setTimeout(initNotificationPrompt, 1200);
      }, { once: true });
    }
  });

  /**
   * الاستماع اللحظي لإشعارات السيرفر والإدارة (Realtime In-App Notifications)
   */
  function initRealtimeNotificationListener() {
    const sb = window.sbClient || window.sb;
    if (!sb || typeof sb.channel !== 'function') return;

    try {
      sb.channel('realtime-user-notifications')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notification_events'
        }, (payload) => {
          const ev = payload.new;
          if (!ev) return;

          const myId = window.currentAuthUser?.id || (typeof getUserProfileData === 'function' ? getUserProfileData()?.id : null);
          if (ev.target_user_id && ev.target_user_id !== myId) {
            return;
          }

          // تشغيل صوت الإشعار الاحتفالي اللطيف
          if (window.Sound && typeof window.Sound.playVictory === 'function') {
            try { window.Sound.playVictory(); } catch (_) {}
          }

          // إظهار إشعار النظام إذا كان مسموحاً
          if ('Notification' in window && Notification.permission === 'granted') {
            try {
              if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then(reg => {
                  reg.showNotification(ev.title, {
                    body: ev.body,
                    icon: 'logo.png',
                    badge: 'icon-192.png',
                    data: { url: ev.deep_link || 'index.html' }
                  });
                });
              } else {
                new Notification(ev.title, { body: ev.body, icon: 'icon-192.png' });
              }
            } catch (_) {}
          }

          // عرض إشعار داخلي فوري راقٍ (In-App Banner)
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              title: ev.title,
              text: ev.body,
              imageUrl: 'logo.png',
              imageWidth: 54,
              imageHeight: 54,
              imageAlt: 'MG Coptic',
              confirmButtonText: ev.deep_link ? 'فتح الآن 🚀' : 'حسناً',
              confirmButtonColor: '#6B1530',
              showCancelButton: Boolean(ev.deep_link),
              cancelButtonText: 'إغلاق',
              cancelButtonColor: '#746B6F'
            }).then(r => {
              if (r.isConfirmed && ev.deep_link) {
                window.location.href = ev.deep_link;
              }
            });
          }
        })
        .subscribe();
    } catch (err) {
      console.warn('[Realtime Notif] Subscription notice:', err);
    }
  }

  // تصدير دالة الفحص العام
  window.checkAndShowNotificationPrompt = createAndShowPrompt;

  // التشغيل التلقائي عند اكتمال تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initNotificationPrompt();
      setTimeout(initRealtimeNotificationListener, 2000);
    });
  } else {
    initNotificationPrompt();
    setTimeout(initRealtimeNotificationListener, 2000);
  }
})();
