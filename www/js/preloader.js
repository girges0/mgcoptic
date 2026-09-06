/**
 * MG COPTIC - Robust Smart Preloader & Network State Controller
 */
(function () {
  'use strict';

  var isDismissed = false;
  var slowTimer = null;
  var timeoutTimer = null;

  function dismiss() {
    if (isDismissed) return;
    isDismissed = true;

    if (slowTimer) clearTimeout(slowTimer);
    if (timeoutTimer) clearTimeout(timeoutTimer);

    var preloader = document.getElementById('mg-preloader');
    if (preloader) {
      preloader.classList.add('loaded');
      setTimeout(function () {
        if (preloader && preloader.parentNode) {
          preloader.style.display = 'none';
        }
      }, 400);
    }
  }

  function showSlowNotice() {
    if (isDismissed) return;
    var subtext = document.getElementById('mg-loader-subtext');
    var slowBox = document.getElementById('mg-slow-notice');
    if (subtext) {
      subtext.textContent = 'جاري الاتصال بالسيرفر...';
    }
    if (slowBox) {
      slowBox.style.display = 'inline-flex';
    }
  }

  function showError() {
    if (isDismissed) return;
    var mainBox = document.getElementById('mg-loader-main-box');
    var errorBox = document.getElementById('mg-loader-error-box');
    if (mainBox) mainBox.style.display = 'none';
    if (errorBox) errorBox.classList.add('active');
  }

  // Timer 1: If loading takes > 1.8s, show slow network notice
  slowTimer = setTimeout(function () {
    if (!isDismissed) {
      showSlowNotice();
    }
  }, 1800);

  // Timer 2: If loading takes > 7.5s, show error & retry button
  timeoutTimer = setTimeout(function () {
    if (!isDismissed) {
      showError();
    }
  }, 7500);

  // Offline event immediately triggers error box
  window.addEventListener('offline', function () {
    if (!isDismissed) {
      showError();
    }
  });

  // Attempt dismissal when auth check is complete
  function attemptDismiss() {
    if (window.__mgAuthCheckPending) return;
    dismiss();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(attemptDismiss, 120);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(attemptDismiss, 120);
    });
    window.addEventListener('load', function () {
      setTimeout(attemptDismiss, 120);
    });
  }

  // Safety fallback: auto-dismiss after 3.2s max so user is never stuck
  setTimeout(function () {
    if (!window.__mgRedirecting) {
      dismiss();
    }
  }, 3200);

  window.MGPreloader = {
    dismiss: dismiss,
    showError: showError,
    retry: function () {
      window.location.reload();
    }
  };
})();
