/**
 * MG COPTIC - PWA Registration & Auto-Update Handler
 * Ensures instant updates across Web, PWA, and APK
 */

(function () {
  'use strict';

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Check for updates on load
          registration.update();

          // Also check for updates periodically or on tab focus
          window.addEventListener('focus', () => {
            registration.update();
          });

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available; auto-reload or silently activate
                    console.log('[PWA] New version detected and ready.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
        });
    });

    // When the service worker controlling this page changes, update smoothly
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        // Optionally refresh or keep seamless
        console.log('[PWA] Controller changed to new version.');
      }
    });
  }

  // 2. Install Prompt Handler (for "Add to Home Screen" buttons)
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    window.deferredPwaPrompt = deferredPrompt;
    window.dispatchEvent(new CustomEvent('pwa:can-install', { detail: { prompt: deferredPrompt } }));

    // Show any elements with data-pwa-install-btn
    const installBtns = document.querySelectorAll('[data-pwa-install-btn]');
    installBtns.forEach((btn) => {
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log('[PWA] User response to install:', outcome);
          deferredPrompt = null;
          window.deferredPwaPrompt = null;
          installBtns.forEach((b) => (b.style.display = 'none'));
        }
      });
    });
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Application successfully installed.');
    deferredPrompt = null;
    window.deferredPwaPrompt = null;
  });

  // 3. Robust Offline Detection & UI Notification
  // Displays a clear, user-friendly overlay when internet connection is lost
  function setupOfflineNotice() {
    const OVERLAY_ID = 'mg-offline-overlay';

    function createOverlay() {
      if (document.getElementById(OVERLAY_ID)) return;

      const overlay = document.createElement('div');
      overlay.id = OVERLAY_ID;
      overlay.setAttribute('dir', 'rtl');
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999999;
        background: rgba(15, 23, 42, 0.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 24px;
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        color: #F8FAFC;
        animation: mgFadeIn 0.3s ease;
      `;

      overlay.innerHTML = `
        <style>
          @keyframes mgFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes mgPulseWarn { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.08); opacity: 1; } }
          .mg-offline-card {
            background: linear-gradient(145deg, #1E293B, #0F172A);
            border: 1px solid rgba(245, 158, 11, 0.35);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(245, 158, 11, 0.15);
            border-radius: 24px;
            padding: 36px 28px;
            max-width: 420px;
            width: 100%;
            text-align: center;
            position: relative;
          }
          .mg-offline-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: rgba(245, 158, 11, 0.12);
            border: 2px solid rgba(245, 158, 11, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #F59E0B;
            animation: mgPulseWarn 2.5s infinite ease-in-out;
          }
          .mg-offline-btn {
            background: linear-gradient(135deg, #F59E0B, #D97706);
            color: #0F172A;
            border: none;
            padding: 14px 28px;
            font-size: 1rem;
            font-weight: 800;
            border-radius: 14px;
            cursor: pointer;
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
            transition: all 0.2s ease;
          }
          .mg-offline-btn:active {
            transform: scale(0.97);
          }
        </style>
        <div class="mg-offline-card">
          <div class="mg-offline-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
              <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
          </div>
          <h2 style="margin: 0 0 10px; font-size: 1.35rem; font-weight: 800; color: #FFFFFF;">
            انقطع الاتصال بالإنترنت
          </h2>
          <p style="margin: 0 0 26px; font-size: 0.98rem; color: #CBD5E1; line-height: 1.6;">
            يتطلب هذا التطبيق اتصالاً بالإنترنت للعمل بشكل سليم وتحميل المحتوى والدروس.
          </p>
          <button id="mg-offline-retry-btn" class="mg-offline-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>إعادة المحاولة</span>
          </button>
        </div>
      `;

      document.body.appendChild(overlay);

      const retryBtn = document.getElementById('mg-offline-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', async () => {
          const btnSpan = retryBtn.querySelector('span');
          if (btnSpan) btnSpan.textContent = 'جارٍ الفحص...';
          retryBtn.style.opacity = '0.75';
          retryBtn.disabled = true;

          try {
            await fetch('https://mgcoptic.vercel.app/favicon.png?_=' + Date.now(), {
              method: 'HEAD',
              mode: 'no-cors',
              cache: 'no-store'
            });
            hideNotice();
            window.location.reload();
          } catch (err) {
            setTimeout(() => {
              if (btnSpan) btnSpan.textContent = 'إعادة المحاولة';
              retryBtn.style.opacity = '1';
              retryBtn.disabled = false;
            }, 600);
          }
        });
      }
    }

    function showNotice() {
      createOverlay();
      const el = document.getElementById(OVERLAY_ID);
      if (el) el.style.display = 'flex';
    }

    function hideNotice() {
      const el = document.getElementById(OVERLAY_ID);
      if (el) el.style.display = 'none';
    }

    window.addEventListener('offline', () => showNotice());
    window.addEventListener('online', () => {
      hideNotice();
    });

    // Initial check on load
    if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showNotice);
      } else {
        showNotice();
      }
    }
  }

  setupOfflineNotice();

  // 4. Push Notification Support & Diagnostic Test Helper
  window.checkPushNotificationStatus = async function () {
    try {
      if (window.Capacitor && window.Capacitor.isPluginAvailable && window.Capacitor.isPluginAvailable('PushNotifications')) {
        const { PushNotifications } = window.Capacitor.Plugins;
        const permStatus = await PushNotifications.checkPermissions();
        return { type: 'capacitor_native', status: permStatus };
      } else if ('Notification' in window) {
        return { type: 'web_standard', status: Notification.permission };
      }
      return { type: 'none', status: 'unsupported' };
    } catch (e) {
      return { error: e.message };
    }
  };

  window.sendTestNotification = async function (title = 'MG Coptic', body = 'تجربة إشعار ناجحة!') {
    try {
      if (window.Capacitor && window.Capacitor.isPluginAvailable && window.Capacitor.isPluginAvailable('PushNotifications')) {
        const { PushNotifications } = window.Capacitor.Plugins;
        let perm = await PushNotifications.requestPermissions();
        if (perm.receive === 'granted') {
          await PushNotifications.register();
          return { success: true, mode: 'capacitor_registered' };
        } else {
          return { success: false, reason: 'permission_denied' };
        }
      } else if ('Notification' in window) {
        let perm = await Notification.requestPermission();
        if (perm === 'granted') {
          new Notification(title, {
            body: body,
            icon: '/icon-192.png'
          });
          return { success: true, mode: 'web_notification' };
        } else {
          return { success: false, reason: 'permission_denied' };
        }
      }
      return { success: false, reason: 'not_supported' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };
})();
