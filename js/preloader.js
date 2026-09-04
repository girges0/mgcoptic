/**
 * MG COPTIC - Minimal Simple Preloader
 */
(function () {
  'use strict';

  var isDismissed = false;
  var timer = null;

  function dismiss() {
    if (isDismissed) return;
    isDismissed = true;
    if (timer) clearTimeout(timer);

    var preloader = document.getElementById('mg-preloader');
    if (preloader) {
      preloader.classList.add('loaded');
      setTimeout(function () {
        if (preloader && preloader.parentNode) {
          preloader.style.display = 'none';
        }
      }, 350);
    }
  }

  function showError() {
    if (isDismissed) return;
    var loaderBox = document.getElementById('mg-loader-box');
    var errorBox = document.getElementById('mg-error-box');
    if (loaderBox) loaderBox.classList.add('hidden');
    if (errorBox) errorBox.classList.add('active');
  }

  // Safety Timeout: 6s (shows simple retry if network hangs)
  timer = setTimeout(function () {
    if (!isDismissed) {
      showError();
    }
  }, 6000);

  // Network Offline Listener
  window.addEventListener('offline', function () {
    if (!isDismissed) {
      showError();
    }
  });

  function attemptDismiss() {
    if (window.__mgAuthCheckPending) return;
    dismiss();
  }

  // Dismiss as soon as DOM is ready or fully loaded (unless auth check is pending)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(attemptDismiss, 100);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(attemptDismiss, 100);
    });
    window.addEventListener('load', attemptDismiss);
  }

  // Fallback auto-dismiss after 2.5s max so user is never permanently blocked
  setTimeout(function () {
    if (!window.__mgRedirecting) dismiss();
  }, 2500);

  window.MGPreloader = {
    dismiss: dismiss,
    showError: showError
  };
})();
