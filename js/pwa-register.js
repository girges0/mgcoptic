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
})();
