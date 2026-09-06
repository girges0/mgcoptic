/**
 * MG COPTIC - Android & Mobile Back Button & Exit Manager
 * - Handles back navigation to previous screens/sections/modals.
 * - Double-tap back on root screens (Home / Welcome) triggers exit with confirmation toast.
 */
(function () {
  'use strict';

  var lastBackPressTime = 0;
  var toastTimeout = null;

  // إنشاء عنصر التنبيه (Toast) المنبثق عند الضغط الأول للخروج
  function showExitToast() {
    var toast = document.getElementById('mg-exit-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mg-exit-toast';
      toast.setAttribute('role', 'alert');
      toast.style.cssText = [
        'position: fixed',
        'bottom: 32px',
        'left: 50%',
        'transform: translateX(-50%) translateY(20px)',
        'background-color: #4A0E21',
        'color: #FAF4E9',
        'padding: 12px 22px',
        'border-radius: 9999px',
        'font-family: "Cairo", -apple-system, sans-serif',
        'font-size: 0.95rem',
        'font-weight: 700',
        'box-shadow: 0 8px 24px rgba(38, 25, 18, 0.35)',
        'border: 1.5px solid #B8892E',
        'z-index: 999999999',
        'opacity: 0',
        'visibility: hidden',
        'transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        'display: flex',
        'align-items: center',
        'gap: 10px',
        'white-space: nowrap',
        'direction: rtl',
        'pointer-events: none',
        'max-width: 90vw'
      ].join(';');

      toast.innerHTML = [
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DBC8A4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">',
        '  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>',
        '  <polyline points="16 17 21 12 16 7"></polyline>',
        '  <line x1="21" y1="12" x2="9" y2="12"></line>',
        '</svg>',
        '<span>اضغط مرة أخرى للخروج من التطبيق</span>'
      ].join('');

      document.body.appendChild(toast);
    }

    // إظهار التوست بحركة انسيابية
    if (toastTimeout) clearTimeout(toastTimeout);
    requestAnimationFrame(function () {
      toast.style.visibility = 'visible';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    toastTimeout = setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(function () {
        toast.style.visibility = 'hidden';
      }, 250);
    }, 2000);
  }

  // فحص النوافذ المنبثقة المفتوحة لإغلاقها أولاً قبل الرجوع
  function closeAnyOpenModal() {
    // 1. SweetAlert2 dialogs
    if (window.Swal && typeof window.Swal.isVisible === 'function' && window.Swal.isVisible()) {
      window.Swal.close();
      return true;
    }

    // 2. Auth modal
    var authModal = document.getElementById('auth-modal');
    if (authModal && (authModal.style.display === 'flex' || authModal.style.display === 'block')) {
      if (typeof window.closeAuthModal === 'function') {
        window.closeAuthModal();
      } else {
        authModal.style.display = 'none';
      }
      return true;
    }

    // 3. User profile / settings / search modal
    var openModals = document.querySelectorAll('.modal.show, .mg-modal.active, #user-profile-modal[style*="display: block"], #settings-modal[style*="display: block"]');
    if (openModals && openModals.length > 0) {
      for (var i = 0; i < openModals.length; i++) {
        openModals[i].style.display = 'none';
        openModals[i].classList.remove('show', 'active');
      }
      return true;
    }

    // 4. Mobile sidebar / drawer if open
    var openSidebar = document.querySelector('.sidebar.open, .nav-drawer.active, .mobile-menu.open');
    if (openSidebar) {
      openSidebar.classList.remove('open', 'active');
      return true;
    }

    // 5. Lesson runner / quiz modal if open inside learn.html
    var runner = document.getElementById('lesson-runner-container') || document.querySelector('.lesson-runner.active');
    if (runner && runner.style.display !== 'none' && !runner.classList.contains('hidden')) {
      if (typeof window.exitLessonRunner === 'function') {
        window.exitLessonRunner();
        return true;
      }
    }

    return false;
  }

  // المعالج المركزي لزر الرجوع
  async function handleBackButton() {
    // أولوية 1: إغلاق أي نافذة منبثقة مفتوحة
    if (closeAnyOpenModal()) {
      return;
    }

    var path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    var isRootPage = (path === '/' || path === '' || path === '/index' || path === '/welcome');

    // أولوية 2: إذا كنا في صفحة فرعية (مثل learn, login, signup, onboarding)
    if (!isRootPage) {
      if (path === '/login' || path === '/signup') {
        // العودة إلى صفحة الترحيب
        window.location.replace('/welcome');
        return;
      }

      if (path === '/learn' || path === '/onboarding') {
        // العودة إلى الصفحة الرئيسية
        window.location.replace('/');
        return;
      }

      // أي صفحة فرعية أخرى
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.replace('/');
      }
      return;
    }

    // أولوية 3: نحن في الصفحة الرئيسية أو صفحة الترحيب (Root Page) -> ميزة الضغط مرتين للخروج
    var now = Date.now();
    if (now - lastBackPressTime < 2000) {
      // الضغطة الثانية خلال ثانيتين: خروج فوري من التطبيق
      var App = window.Capacitor?.Plugins?.App;
      if (App && typeof App.exitApp === 'function') {
        App.exitApp();
      } else {
        // إذا كان داخل متصفح ويب، نعرض تأكيد الخروج
        if (window.Swal) {
          Swal.fire({
            title: 'هل تريد الخروج؟',
            text: 'هل أنت متأكد من رغبتك في إغلاق المنصة؟',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'نعم، إغلاق',
            cancelButtonText: 'إلغاء',
            customClass: { popup: 'mg-swal-popup' }
          }).then(function (result) {
            if (result.isConfirmed) {
              window.close();
            }
          });
        }
      }
    } else {
      // الضغطة الأولى: تسجيل التوقيت وإظهار رسالة التنبيه
      lastBackPressTime = now;
      showExitToast();
    }
  }

  // تسجيل المستمع في Capacitor App Plugin
  function initCapacitorBackButton() {
    var App = window.Capacitor?.Plugins?.App;
    if (App && typeof App.addListener === 'function') {
      App.addListener('backButton', function (data) {
        handleBackButton();
      });
      console.log('[MG BackButton] Capacitor hardware back button listener registered.');
    }
  }

  // دعم الرجوع أيضاً عبر الـ Web History API للمتصفحات والـ PWA
  function initWebHistoryFallback() {
    var path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    var isRootPage = (path === '/' || path === '' || path === '/index' || path === '/welcome');

    if (isRootPage) {
      try {
        window.history.pushState({ page: 'root' }, '', window.location.href);
      } catch (e) {}

      window.addEventListener('popstate', function (event) {
        handleBackButton();
        try {
          window.history.pushState({ page: 'root' }, '', window.location.href);
        } catch (e) {}
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCapacitorBackButton();
      initWebHistoryFallback();
    });
  } else {
    initCapacitorBackButton();
    initWebHistoryFallback();
  }

  window.MGBackButton = {
    handle: handleBackButton,
    showExitToast: showExitToast
  };
})();
