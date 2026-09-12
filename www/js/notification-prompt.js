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
      // 1. إذا تم رفضها أو تأجيلها في هذه الجلسة الحالية، لا تظهر مطلقاً
      if (sessionStorage.getItem('mg_notif_prompt_session_dismissed')) {
        return false;
      }

      // 2. فحص المهلة الزمنية للتأجيل (تعمل على الأندرويد والويب معاً)
      const dismissedAt = localStorage.getItem(PROMPT_DISMISS_KEY);
      if (dismissedAt && (Date.now() - Number(dismissedAt) < DISMISS_COOLDOWN_MS)) {
        return false;
      }

      // 3. إذا كانت نافذة تسجيل الدخول/إنشاء الحساب مفتوحة، نؤجل نافذة الإشعارات
      if (isAuthModalOpen()) {
        return 'postpone';
      }

      const isNative = typeof window.Capacitor !== 'undefined' && 
                       typeof window.Capacitor.isNativePlatform === 'function' && 
                       window.Capacitor.isNativePlatform();

      // 4. فحص بيئة الأندرويد الأصلية
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
        if (permStatus?.receive === 'denied') {
          // إذا كان المستخدم قد رفض الإشعارات من نظام الهاتف، لا نزعجه بالنافذة
          return false;
        }
        return true;
      }

      // 5. فحص بيئة متصفح الويب و PWA
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
      localStorage.setItem(PROMPT_DISMISS_KEY, Date.now().toString());
      sessionStorage.setItem('mg_notif_prompt_session_dismissed', 'true');
      closePrompt();
    });

    // زر "سأقوم بالتفعيل لاحقاً"
    const laterBtn = overlay.querySelector('#mg-btn-dismiss-notif');
    laterBtn.addEventListener('click', () => {
      localStorage.setItem(PROMPT_DISMISS_KEY, Date.now().toString());
      sessionStorage.setItem('mg_notif_prompt_session_dismissed', 'true');
      closePrompt();
    });

    // إغلاق عند النقر خارج البطاقة
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        localStorage.setItem(PROMPT_DISMISS_KEY, Date.now().toString());
        sessionStorage.setItem('mg_notif_prompt_session_dismissed', 'true');
        closePrompt();
      }
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

          // إشعار مركز الإشعارات اللحظي وتحديث الشارة فوراً
          if (typeof window.onNewNotificationReceived === 'function') {
            try { window.onNewNotificationReceived(ev); } catch (_) {}
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

          // إذا كان الإشعار عبارة عن هدية تم إرسالها للطالب، اعرض النافذة الاحتفالية الفاخرة فوراً
          if (ev.deep_link && (ev.deep_link.includes('gift') || ev.title.includes('هدية') || ev.title.includes('مكافأة'))) {
            try {
              let giftId = ev.id;
              let xp = 0;
              let hearts = 0;
              let title = ev.title;
              let message = ev.body;
              const rawParams = (ev.deep_link || '').includes('?') ? ev.deep_link.split('?')[1] : '';
              const params = new URLSearchParams(rawParams);
              if (params.get('id') || params.get('gift_id')) giftId = params.get('id') || params.get('gift_id');
              if (params.get('xp')) xp = parseInt(params.get('xp'), 10) || 0;
              if (params.get('hearts')) hearts = parseInt(params.get('hearts'), 10) || 0;
              if (params.get('title')) title = decodeURIComponent(params.get('title'));

              if (typeof window.showStudentGiftCelebration === 'function') {
                window.showStudentGiftCelebration({ giftId, xp, hearts, title, message });
                return;
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
                if (ev.deep_link.includes('gift')) {
                  if (typeof window.showStudentGiftCelebration === 'function') {
                    window.showStudentGiftCelebration({ giftId: ev.id, title: ev.title, message: ev.body });
                  }
                  return;
                }
                let target = ev.deep_link.replace(/^\/+/, '');
                if (target.startsWith('learn') && !target.startsWith('learn.html')) {
                  target = target.replace(/^learn/, 'learn.html');
                } else if (target.startsWith('login') && !target.startsWith('login.html')) {
                  target = target.replace(/^login/, 'login.html');
                } else if (target.startsWith('signup') && !target.startsWith('signup.html')) {
                  target = target.replace(/^signup/, 'signup.html');
                }
                window.location.href = target;
              }
            });
          }
        })
        .subscribe();
    } catch (err) {
      console.warn('[Realtime Notif] Subscription notice:', err);
    }
  }

  // ============================================================================
  // مركز الإشعارات الفاخر (Notification Center Manager - 100% SVG Only)
  // ============================================================================
  let cachedNotificationsList = [];
  let isNotificationsCenterOpen = false;

  function getDismissedNotifIds(userId) {
    try {
      const key = 'mg_coptic_dismissed_notifs_' + (userId || 'guest');
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (_) {
      return [];
    }
  }

  function markNotifAsDismissed(notifId, userId) {
    if (!notifId) return;
    try {
      const key = 'mg_coptic_dismissed_notifs_' + (userId || 'guest');
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      if (!list.includes(notifId)) {
        list.push(notifId);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch (_) {}
  }

  function formatArabicRelativeTime(dateStr) {
    if (!dateStr) return 'الآن';
    const diffMs = Date.now() - new Date(dateStr).getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'الآن';
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'الآن';
    if (mins < 60) return `منذ ${mins} ${mins === 1 ? 'دقيقة' : mins === 2 ? 'دقيقتين' : mins <= 10 ? 'دقائق' : 'دقيقة'}`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `منذ ${hours} ${hours === 1 ? 'ساعة' : hours === 2 ? 'ساعتين' : hours <= 10 ? 'ساعات' : 'ساعة'}`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'أمس';
    if (days === 2) return 'منذ يومين';
    if (days < 30) return `منذ ${days} أيام`;
    try {
      return new Date(dateStr).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
    } catch (_) {
      return 'منذ فترة';
    }
  }

  function getNotificationSvgIcon(eventType, deepLink, title) {
    const link = (deepLink || '').toLowerCase();
    const t = (title || '').toLowerCase();

    // 1. Gift
    if (link.includes('gift') || t.includes('هدية') || t.includes('مكافأة') || eventType === 'gift') {
      return `
        <div class="mg-notif-type-icon mg-notif-type-gift" title="هدية تقديرية">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" rx="1.5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        </div>`;
    }

    // 2. Hearts
    if (eventType === 'hearts_refilled' || link.includes('heart') || t.includes('قلب') || t.includes('قلوب')) {
      return `
        <div class="mg-notif-type-icon mg-notif-type-hearts" title="قلوب">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>`;
    }

    // 3. Streak / Flame
    if (eventType === 'daily_reminder' || link.includes('streak') || t.includes('استمرارية') || t.includes('حماسة')) {
      return `
        <div class="mg-notif-type-icon mg-notif-type-streak" title="استمرارية ونشاط">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </div>`;
    }

    // 4. XP / Rank / Trophy
    if (eventType === 'rank_change' || eventType === 'achievement' || t.includes('ترتيب') || t.includes('صدارة') || t.includes('xp')) {
      return `
        <div class="mg-notif-type-icon mg-notif-type-xp" title="إنجاز ونقاط">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
            <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
            <path d="M6 3h12a2 2 0 0 1 2 2v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V5a2 2 0 0 1 2-2z" />
          </svg>
        </div>`;
    }

    // 5. Welcome / New Content
    if (eventType === 'welcome' || eventType === 'new_content' || t.includes('أهلاً') || t.includes('مرحباً') || t.includes('درس')) {
      return `
        <div class="mg-notif-type-icon mg-notif-type-welcome" title="مرحباً بك">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>`;
    }

    // 6. Default Broadcast / Bell
    return `
      <div class="mg-notif-type-icon mg-notif-type-broadcast" title="تنبيه عام">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>`;
  }

  async function fetchUserNotificationsList() {
    const myId = window.currentAuthUser?.id || (typeof getUserProfileData === 'function' ? getUserProfileData()?.id : null);
    const dismissed = getDismissedNotifIds(myId);
    let items = [];

    const sb = window.sbClient || window.sb;
    if (sb) {
      try {
        let query = sb.from('notification_events')
          .select('id, event_type, title, body, deep_link, created_at, target_user_id')
          .order('created_at', { ascending: false })
          .limit(40);

        if (myId) {
          query = query.or(`target_user_id.eq.${myId},target_user_id.is.null`);
        } else {
          query = query.is('target_user_id', null);
        }

        const { data, error } = await query;
        if (!error && Array.isArray(data)) {
          items = data;
        }
      } catch (err) {
        console.warn('[Notif Center] Supabase fetch error:', err);
      }
    }

    // Default introductory welcome notification if no events exist yet
    if (items.length === 0 && !dismissed.includes('welcome-intro-default')) {
      items.push({
        id: 'welcome-intro-default',
        event_type: 'welcome',
        title: 'أهلاً بك في منصة MG Coptic',
        body: 'يسرنا انضمامك إلى رحلة تعلم وإتقان اللغة القبطية الكنسية! ستصلك هنا كافة التنبيهات والهدايا والمكافآت التقديرية.',
        deep_link: 'index.html#learn',
        created_at: new Date().toISOString()
      });
    }

    // Filter out dismissed
    const filtered = items.filter(n => !dismissed.includes(n.id));
    cachedNotificationsList = filtered;
    return filtered;
  }

  function updateNotificationBadges(count) {
    const badgeEl = document.getElementById('topbar-notif-badge');
    const countPill = document.getElementById('mg-notif-count-pill');
    const clearBtn = document.getElementById('mg-notif-clear-all-btn');

    if (countPill) {
      countPill.textContent = String(count);
      countPill.style.display = count > 0 ? 'inline-block' : 'none';
    }

    if (badgeEl) {
      if (count > 0) {
        badgeEl.textContent = count > 99 ? '99+' : String(count);
        badgeEl.style.display = 'flex';
      } else {
        badgeEl.style.display = 'none';
      }
    }

    if (clearBtn) {
      clearBtn.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  function renderNotificationsBody(items) {
    const bodyEl = document.getElementById('mg-notif-panel-body');
    if (!bodyEl) return;

    if (!items || items.length === 0) {
      bodyEl.innerHTML = `
        <div class="mg-notif-empty-box">
          <div class="mg-notif-empty-svg">
            <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="rgba(168, 130, 58, 0.7)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M32 10a14 14 0 0 0-14 14c0 14-6 18-6 18h40s-6-4-6-18a14 14 0 0 0-14-14z" />
              <path d="M26.5 48a5.5 5.5 0 0 0 11 0" />
              <line x1="12" y1="52" x2="52" y2="52" stroke="#6B1530" stroke-width="2" stroke-linecap="round" />
              <circle cx="48" cy="16" r="3" fill="#A8823A" stroke="none" />
              <circle cx="16" cy="20" r="2" fill="#A8823A" stroke="none" />
            </svg>
          </div>
          <div class="mg-notif-empty-title">لا توجد إشعارات حالياً</div>
          <div class="mg-notif-empty-desc">ستظهر هنا التنبيهات والهدايا والمكافآت التقديرية فور صدورها.</div>
        </div>
      `;
      updateNotificationBadges(0);
      return;
    }

    updateNotificationBadges(items.length);

    let html = '';
    items.forEach(item => {
      const iconSvg = getNotificationSvgIcon(item.event_type, item.deep_link, item.title);
      const timeAgo = formatArabicRelativeTime(item.created_at);
      const hasAction = item.deep_link && item.deep_link.trim().length > 0;
      const isGift = (item.deep_link && item.deep_link.includes('gift')) || (item.title && (item.title.includes('هدية') || item.title.includes('مكافأة')));
      const actionText = isGift ? 'استلام الهدية' : 'عرض والتنقل';

      html += `
        <div class="mg-notif-item" id="notif-item-${item.id}" data-id="${item.id}">
          ${iconSvg}
          <div class="mg-notif-content">
            <div class="mg-notif-item-title">${item.title || 'إشعار'}</div>
            <div class="mg-notif-item-body">${item.body || ''}</div>
            <div class="mg-notif-item-meta">
              <span class="mg-notif-time">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>${timeAgo}</span>
              </span>
              ${hasAction ? `
                <button type="button" class="mg-notif-action-btn" onclick="window.handleNotificationAction && window.handleNotificationAction('${item.id}', '${encodeURIComponent(item.deep_link || '')}')">
                  <span>${actionText}</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              ` : ''}
            </div>
          </div>
          <button type="button" class="mg-notif-delete-single-btn" onclick="window.deleteSingleNotification && window.deleteSingleNotification('${item.id}', this)" title="حذف هذا الإشعار" aria-label="حذف هذا الإشعار">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      `;
    });

    bodyEl.innerHTML = html;
  }

  async function refreshNotificationsCenter() {
    const items = await fetchUserNotificationsList();
    renderNotificationsBody(items);
  }

  function toggleNotificationsCenter(e) {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    if (isNotificationsCenterOpen) {
      closeNotificationsCenter();
    } else {
      openNotificationsCenter();
    }
  }

  function openNotificationsCenter() {
    const panel = document.getElementById('mg-notif-panel');
    const backdrop = document.getElementById('mg-notif-backdrop');
    const btn = document.getElementById('topbar-notif-btn');

    if (!panel) return;

    panel.style.display = 'flex';
    if (backdrop) {
      backdrop.style.display = 'block';
      setTimeout(() => backdrop.classList.add('active'), 10);
    }
    if (btn) btn.setAttribute('aria-expanded', 'true');
    isNotificationsCenterOpen = true;

    refreshNotificationsCenter();
  }

  function closeNotificationsCenter() {
    const panel = document.getElementById('mg-notif-panel');
    const backdrop = document.getElementById('mg-notif-backdrop');
    const btn = document.getElementById('topbar-notif-btn');

    if (backdrop) {
      backdrop.classList.remove('active');
      setTimeout(() => { backdrop.style.display = 'none'; }, 200);
    }
    if (panel) {
      panel.style.display = 'none';
    }
    if (btn) btn.setAttribute('aria-expanded', 'false');
    isNotificationsCenterOpen = false;
  }

  async function deleteSingleNotification(notifId, btnEl) {
    if (!notifId) return;
    const itemEl = btnEl ? btnEl.closest('.mg-notif-item') : document.getElementById(`notif-item-${notifId}`);

    if (itemEl) {
      itemEl.classList.add('removing');
    }

    const myId = window.currentAuthUser?.id || (typeof getUserProfileData === 'function' ? getUserProfileData()?.id : null);
    markNotifAsDismissed(notifId, myId);

    // If connected to Supabase and not a local demo, attempt server delete
    const sb = window.sbClient || window.sb;
    if (sb && notifId.length > 20) {
      try {
        if (myId) {
          sb.from('notification_events').delete().eq('id', notifId).eq('target_user_id', myId).then(() => {}).catch(() => {});
        }
      } catch (_) {}
    }

    cachedNotificationsList = cachedNotificationsList.filter(n => n.id !== notifId);

    setTimeout(() => {
      if (itemEl) itemEl.remove();
      updateNotificationBadges(cachedNotificationsList.length);

      const bodyEl = document.getElementById('mg-notif-panel-body');
      if (bodyEl && cachedNotificationsList.length === 0) {
        renderNotificationsBody([]);
      }
    }, 250);
  }

  async function clearAllNotifications() {
    const myId = window.currentAuthUser?.id || (typeof getUserProfileData === 'function' ? getUserProfileData()?.id : null);
    const bodyEl = document.getElementById('mg-notif-panel-body');

    if (bodyEl) {
      const items = bodyEl.querySelectorAll('.mg-notif-item');
      items.forEach(el => el.classList.add('removing'));
    }

    cachedNotificationsList.forEach(n => {
      markNotifAsDismissed(n.id, myId);
    });

    const sb = window.sbClient || window.sb;
    if (sb && myId) {
      try {
        sb.from('notification_events').delete().eq('target_user_id', myId).then(() => {}).catch(() => {});
      } catch (_) {}
    }

    cachedNotificationsList = [];

    setTimeout(() => {
      renderNotificationsBody([]);
    }, 250);
  }

  function handleNotificationAction(notifId, encodedDeepLink) {
    closeNotificationsCenter();
    const deepLink = decodeURIComponent(encodedDeepLink || '');

    if (deepLink.includes('gift')) {
      const item = cachedNotificationsList.find(n => n.id === notifId);
      if (typeof window.showStudentGiftCelebration === 'function') {
        let giftId = notifId;
        let xp = 0;
        let hearts = 0;
        let title = item?.title || 'هدية خاصة';
        let message = item?.body || '';
        try {
          const rawParams = deepLink.includes('?') ? deepLink.split('?')[1] : '';
          const params = new URLSearchParams(rawParams);
          if (params.get('id') || params.get('gift_id')) giftId = params.get('id') || params.get('gift_id');
          if (params.get('xp')) xp = parseInt(params.get('xp'), 10) || 0;
          if (params.get('hearts')) hearts = parseInt(params.get('hearts'), 10) || 0;
          if (params.get('title')) title = decodeURIComponent(params.get('title'));
        } catch (_) {}
        window.showStudentGiftCelebration({ giftId, xp, hearts, title, message });
        return;
      }
    }

    let target = deepLink.replace(/^\/+/, '');
    if (target.startsWith('learn') && !target.startsWith('learn.html')) {
      target = target.replace(/^learn/, 'learn.html');
    }
    if (target) {
      window.location.href = target;
    }
  }

  function onNewNotificationReceived(ev) {
    const btn = document.getElementById('topbar-notif-btn');
    if (btn) {
      btn.classList.remove('has-new-alert');
      void btn.offsetWidth; // trigger reflow
      btn.classList.add('has-new-alert');
    }

    if (ev && ev.id) {
      const exists = cachedNotificationsList.some(n => n.id === ev.id);
      if (!exists) {
        cachedNotificationsList.unshift(ev);
        if (isNotificationsCenterOpen) {
          renderNotificationsBody(cachedNotificationsList);
        } else {
          updateNotificationBadges(cachedNotificationsList.length);
        }
      }
    } else {
      refreshNotificationsCenter();
    }
  }

  // Close on Escape or click outside
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNotificationsCenterOpen) {
      closeNotificationsCenter();
    }
  });

  document.addEventListener('click', (e) => {
    if (!isNotificationsCenterOpen) return;
    const panel = document.getElementById('mg-notif-panel');
    const btn = document.getElementById('topbar-notif-btn');
    if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
      closeNotificationsCenter();
    }
  });

  // Export to window for global access
  window.toggleNotificationsCenter = toggleNotificationsCenter;
  window.openNotificationsCenter = openNotificationsCenter;
  window.closeNotificationsCenter = closeNotificationsCenter;
  window.refreshNotificationsCenter = refreshNotificationsCenter;
  window.deleteSingleNotification = deleteSingleNotification;
  window.clearAllNotifications = clearAllNotifications;
  window.handleNotificationAction = handleNotificationAction;
  window.onNewNotificationReceived = onNewNotificationReceived;

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
