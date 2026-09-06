
(function () {
  'use strict';

  /* ============ USER PROFILE & REAL SUPABASE AUTH / LEADERBOARD LOGIC ============ */
  let currentAuthUser = null;
  let currentAuthSession = null;
  let currentAuthMode = 'signin';
  let pendingAuthCallback = null;

    function normalizePath(pathname) {
      const raw = pathname || '';
      const normalized = raw.replace(/\.html$/, '').replace(/\/$/, '') || '/';
      console.log(`[MG Path Diagnostic] raw: "${raw}" → normalized: "${normalized}"`);
      return normalized;
    }

    function openAuthModal(mode = 'signin') {
      currentAuthMode = mode;
      switchAuthTab(mode);
      const m = document.getElementById('auth-modal');
      if (m) m.style.display = 'flex';
      const emailInp = document.getElementById('auth-email-input');
      if (emailInp) setTimeout(() => emailInp.focus(), 150);
    }

    function closeAuthModal() {
      const m = document.getElementById('auth-modal');
      if (m) m.style.display = 'none';
      const statusEl = document.getElementById('auth-status-msg');
      if (statusEl) statusEl.textContent = '';
    }

    function switchAuthTab(mode) {
      currentAuthMode = mode;
      const isSignUp = mode === 'signup';
      const tSignIn = document.getElementById('tab-auth-signin');
      const tSignUp = document.getElementById('tab-auth-signup');
      const nameGrp = document.getElementById('auth-name-group');
      const ageGrp = document.getElementById('auth-age-group');
      const titleEl = document.getElementById('auth-modal-title');
      const subtitleEl = document.getElementById('auth-modal-subtitle');
      const submitBtn = document.getElementById('auth-submit-btn');

      if (tSignIn && tSignUp) {
        tSignIn.style.borderBottomColor = isSignUp ? 'transparent' : 'var(--madder)';
        tSignIn.style.color = isSignUp ? 'var(--ink-soft)' : 'var(--madder)';
        tSignUp.style.borderBottomColor = isSignUp ? 'var(--madder)' : 'transparent';
        tSignUp.style.color = isSignUp ? 'var(--madder)' : 'var(--ink-soft)';
      }
      if (nameGrp) nameGrp.style.display = isSignUp ? 'block' : 'none';
      if (ageGrp) ageGrp.style.display = isSignUp ? 'block' : 'none';
      if (titleEl) titleEl.textContent = isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول';
      if (subtitleEl) subtitleEl.textContent = isSignUp ? 'انضم لرحلة إتقان اللغة القبطية' : 'أهلاً بك مجددًا في منصة MG Coptic';
      if (submitBtn) {
        const span = submitBtn.querySelector('span');
        if (span) span.textContent = isSignUp ? 'إنشاء الحساب' : 'دخول';
        else submitBtn.textContent = isSignUp ? 'إنشاء الحساب' : 'دخول';
      }
    }

    function handlePostAuthSuccess() {
      const currentPath = normalizePath(window.location.pathname);
      const isAuthPage = (currentPath === '/login' || currentPath === '/signup');

      if (isAuthPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirect');
        if (redirectUrl && !redirectUrl.includes('login') && !redirectUrl.includes('signup')) {
          window.location.href = redirectUrl;
        } else {
          window.location.href = '/';
        }
      } else {
        closeAuthModal();
        if (typeof hydrateHomeFromCacheSync === 'function') hydrateHomeFromCacheSync();
        if (typeof syncHomeLearningProgress === 'function') syncHomeLearningProgress();
        if (typeof pendingAuthCallback === 'function') {
          const cb = pendingAuthCallback;
          pendingAuthCallback = null;
          cb();
        }
      }
    }

    async function handleForgotPassword(prefilledEmail) {
      const emailInput = document.querySelector('[name="email"], #auth-email-input');
      const defaultVal = prefilledEmail || (emailInput ? emailInput.value.trim() : '');

      if (window.Swal) {
        const { value: email } = await Swal.fire({
          title: 'استعادة كلمة المرور',
          text: 'أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور:',
          input: 'email',
          inputValue: defaultVal,
          inputPlaceholder: 'name@example.com',
          showCancelButton: true,
          confirmButtonText: 'إرسال الرابط',
          cancelButtonText: 'إلغاء',
          customClass: {
            popup: 'mg-swal-popup'
          }
        });

        if (email) {
          try {
            const { error } = await sb.auth.resetPasswordForEmail(email.trim(), {
              redirectTo: window.location.origin + '/login'
            });
            if (error) throw error;
            Swal.fire({
              icon: 'success',
              title: 'تم الإرسال!',
              text: 'تم إرسال تعليمات إعادة التعيين إلى بريدك الإلكتروني بنجاح.',
              confirmButtonText: 'حسناً'
            });
          } catch (err) {
            Swal.fire({
              icon: 'error',
              title: 'تعذر الإرسال',
              text: err.message || 'حدث خطأ أثناء محاولة إرسال الرابط.',
              confirmButtonText: 'حسناً'
            });
          }
        }
      } else {
        const email = prompt('أدخل بريدك الإلكتروني لاستعادة كلمة المرور:', defaultVal);
        if (email && email.trim()) {
          try {
            const { error } = await sb.auth.resetPasswordForEmail(email.trim());
            if (error) alert('تعذر الإرسال: ' + error.message);
            else alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك!');
          } catch (e) {
            alert('حدث خطأ: ' + e.message);
          }
        }
      }
    }

    // حقن أنماط مؤشر التحميل الخاصة بنماذج تسجيل الدخول وإنشاء الحساب
    if (typeof document !== 'undefined' && !document.getElementById('mg-auth-service-styles')) {
      const st = document.createElement('style');
      st.id = 'mg-auth-service-styles';
      st.textContent = `
        @keyframes authSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .auth-btn-spinner {
          animation: authSpin 0.75s linear infinite !important;
          display: inline-block;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .auth-btn-loading {
          opacity: 0.88 !important;
          cursor: wait !important;
          pointer-events: none !important;
        }
        .auth-status-loading-box {
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(107, 21, 48, 0.08) !important;
          border: 1px solid rgba(168, 130, 58, 0.3) !important;
          color: var(--madder, #6B1530) !important;
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 14px;
          box-shadow: 0 2px 8px rgba(36, 27, 18, 0.05);
          transition: all 0.25s ease;
        }
        .auth-status-success-box {
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(47, 125, 70, 0.1) !important;
          border: 1px solid rgba(47, 125, 70, 0.3) !important;
          color: #2F7D46 !important;
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 14px;
          transition: all 0.25s ease;
        }
        .auth-status-error-box {
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(197, 48, 48, 0.08) !important;
          border: 1px solid rgba(197, 48, 48, 0.3) !important;
          color: #C53030 !important;
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 14px;
          transition: all 0.25s ease;
        }
      `;
      document.head.appendChild(st);
    }

    async function handleAuthSubmit(e, explicitMode) {
      if (e && e.preventDefault) e.preventDefault();

      const form = (e && e.target && e.target.tagName === 'FORM') ? e.target : document.getElementById('auth-form');
      const mode = explicitMode || (form ? form.getAttribute('data-auth-mode') : null) || currentAuthMode;

      const emailEl = (form && (form.querySelector('[name="email"]') || form.querySelector('#auth-email-input'))) || document.getElementById('auth-email-input');
      const passEl = (form && (form.querySelector('[name="password"]') || form.querySelector('#auth-password-input'))) || document.getElementById('auth-password-input');
      const confirmPassEl = form ? (form.querySelector('[name="confirm_password"]') || form.querySelector('#auth-confirm-password-input')) : null;
      const firstNameEl = (form && (form.querySelector('[name="first_name"]') || form.querySelector('#auth-firstname-input'))) || document.getElementById('auth-firstname-input');
      const fatherNameEl = (form && (form.querySelector('[name="father_name"]') || form.querySelector('#auth-fathername-input'))) || document.getElementById('auth-fathername-input');
      const nameEl = (form && (form.querySelector('[name="full_name"]') || form.querySelector('[name="name"]') || form.querySelector('#auth-name-input'))) || document.getElementById('auth-name-input');
      const ageEl = (form && (form.querySelector('[name="age"]') || form.querySelector('#auth-age-input'))) || document.getElementById('auth-age-input');
      const statusEl = (form && (form.querySelector('.auth-status-msg') || form.querySelector('#auth-status-msg'))) || document.getElementById('auth-status-msg');
      const submitBtn = (form && (form.querySelector('button[type="submit"]') || form.querySelector('#auth-submit-btn'))) || document.getElementById('auth-submit-btn');

      const email = emailEl ? emailEl.value.trim() : '';
      const password = passEl ? passEl.value : '';
      const formInputs = form ? Array.from(form.querySelectorAll('input, button, select')) : [];

      function resetFormUI(errorMsg) {
        formInputs.forEach(el => { el.disabled = false; });
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('auth-btn-loading');
          if (submitBtn.dataset.origHtml) submitBtn.innerHTML = submitBtn.dataset.origHtml;
        }
        if (statusEl && errorMsg) {
          statusEl.className = 'auth-status-msg auth-status-error-box';
          statusEl.innerHTML = `<span>${errorMsg}</span>`;
        }
      }

      if (submitBtn && !submitBtn.dataset.origHtml) {
        submitBtn.dataset.origHtml = submitBtn.innerHTML;
      }

      // 1. التحقق من صحة المدخلات
      if (mode === 'signup') {
        const firstName = firstNameEl ? firstNameEl.value.trim() : '';
        const fatherName = fatherNameEl ? fatherNameEl.value.trim() : '';

        if (firstNameEl && !firstName) {
          resetFormUI('يرجى إدخال الاسم (إجباري).');
          firstNameEl.focus();
          return;
        }

        if (fatherNameEl && !fatherName) {
          resetFormUI('يرجى إدخال اسم الأب (إجباري).');
          fatherNameEl.focus();
          return;
        }

        if (confirmPassEl && confirmPassEl.value !== password) {
          resetFormUI('كلمتا المرور غير متطابقتين.');
          confirmPassEl.focus();
          return;
        }

        if (password.length < 8) {
          resetFormUI('كلمة المرور يجب أن تكون ٨ أحرف على الأقل.');
          if (passEl) passEl.focus();
          return;
        }

        const ageVal = ageEl ? ageEl.value.trim() : '';
        const parsedAge = parseInt(ageVal, 10);
        if (!ageVal || isNaN(parsedAge) || parsedAge < 4 || parsedAge > 120) {
          resetFormUI('يرجى إدخال العمر (إجباري، من ٤ إلى ١٠٠ سنة).');
          if (ageEl) ageEl.focus();
          return;
        }
      }

      if (!email) {
        resetFormUI('يرجى كتابة البريد الإلكتروني.');
        if (emailEl) emailEl.focus();
        return;
      }
      if (!password) {
        resetFormUI('يرجى كتابة كلمة المرور.');
        if (passEl) passEl.focus();
        return;
      }

      // 2. إظهار حالة التحميل الفورية التفاعلية (Spinner & Progress)
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('auth-btn-loading');
        submitBtn.innerHTML = `
          <span style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
            <svg class="auth-btn-spinner" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
            <span>${mode === 'signup' ? 'جارٍ إنشاء الحساب...' : 'جارٍ تسجيل الدخول...'}</span>
          </span>
        `;
      }
      if (statusEl) {
        statusEl.className = 'auth-status-msg auth-status-loading-box';
        statusEl.innerHTML = `
          <svg class="auth-btn-spinner" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <span>${mode === 'signup' ? 'جاري تجهيز حسابك وبياناتك السحابية...' : 'جاري التحقق من بيانات الدخول...'}</span>
        `;
      }
      formInputs.forEach(el => { if (el !== submitBtn) el.disabled = true; });

      try {
        if (mode === 'signup') {
          const firstName = firstNameEl ? firstNameEl.value.trim() : '';
          const fatherName = fatherNameEl ? fatherNameEl.value.trim() : '';
          let fullName = '';
          if (firstName || fatherName) {
            fullName = (firstName + ' ' + fatherName).trim();
          } else if (nameEl && nameEl.value.trim()) {
            fullName = nameEl.value.trim();
          } else {
            fullName = email.split('@')[0];
          }

          const age = (ageEl && parseInt(ageEl.value, 10)) || 15;

          const { data: signData, error: signErr } = await sb.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                first_name: firstName,
                father_name: fatherName,
                full_name: fullName,
                age: age,
                password: password
              }
            }
          });

          // كشف حالة الإيميل المسجل مسبقاً (سواء error صريح أو fake signup بدون identities)
          const isAlreadyRegisteredError = signErr && (() => {
            const errMsg = String(signErr.message || '').toLowerCase();
            return errMsg.includes('already registered') || errMsg.includes('already exists') || errMsg.includes('user already exists');
          })();
          const isFakeSignup = !signErr && signData && signData.user &&
            (!signData.user.identities || signData.user.identities.length === 0);

          if (isAlreadyRegisteredError || isFakeSignup) {
            if (submitBtn) {
              submitBtn.innerHTML = `
                <span style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
                  <svg class="auth-btn-spinner" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10"></path>
                  </svg>
                  <span>جاري التحويل...</span>
                </span>
              `;
            }
            if (statusEl) {
              statusEl.className = 'auth-status-msg auth-status-loading-box';
              statusEl.innerHTML = `
                <svg class="auth-btn-spinner" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10"></path>
                </svg>
                <span>هذا البريد مسجل مسبقاً! جاري نقلك لتسجيل الدخول...</span>
              `;
            }
            if (document.getElementById('auth-modal')) {
              setTimeout(() => {
                switchAuthTab('signin');
                const emailInp = document.getElementById('auth-email-input');
                const passInp = document.getElementById('auth-password-input');
                if (emailInp) emailInp.value = email;
                if (passInp) {
                  passInp.value = '';
                  passInp.focus();
                }
                resetFormUI('هذا البريد مسجل بالفعل. أدخل كلمة المرور واضغط "دخول".');
              }, 1500);
              return;
            } else {
              setTimeout(() => {
                const redirectParam = redirectTarget ? '&redirect=' + encodeURIComponent(redirectTarget) : '';
                window.location.href = '/login?email=' + encodeURIComponent(email) + redirectParam;
              }, 1500);
              return;
            }
          }
          if (signErr) throw signErr;

          if (statusEl) {
            statusEl.innerHTML = `
              <svg class="auth-btn-spinner" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10"></path>
              </svg>
              <span>جاري تهيئة الملف الشخصي والاتصال بالسيرفر...</span>
            `;
          }

          // إذا لم تُرجع الاستجابة جلسة مباشرة، تسجيل الدخول فوراً
          if (!signData || !signData.session) {
            const { error: logErr } = await sb.auth.signInWithPassword({ email, password });
            if (logErr) throw logErr;
          }

          // حفظ كلمة المرور والاسم والعمر في بيانات الحساب لعرضها في لوحة الإدارة
          let createdUser = null;
          try {
            createdUser = (signData && signData.user) || (await sb.auth.getUser()).data?.user;
            if (createdUser) await sb.from('users').update({ full_name: fullName, password: password, age: age }).eq('id', createdUser.id);
          } catch (e) {
            console.warn('Password profile sync notice:', e);
          }

          // طلب إذن الإشعارات عند التسجيل الجديد حصرياً داخل Capacitor Native
          try {
            const isNative = typeof window.Capacitor !== 'undefined' && 
                             typeof window.Capacitor.isNativePlatform === 'function' && 
                             window.Capacitor.isNativePlatform();

            if (isNative && typeof requestNotificationPermission === 'function') {
              requestNotificationPermission({
                isNewUser: true,
                userId: createdUser?.id,
                name: firstName || fullName
              });
            }
          } catch (pushErr) {
            console.warn('[Push] Signup permission request warning:', pushErr);
          }

          if (submitBtn) {
            submitBtn.innerHTML = `
              <span style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>تم إنشاء الحساب بنجاح!</span>
              </span>
            `;
          }
          if (statusEl) {
            statusEl.className = 'auth-status-msg auth-status-success-box';
            statusEl.innerHTML = `
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2F7D46" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>أهلاً بك يا ${firstName || fullName}! جاري نقلك إلى المنصة...</span>
            `;
          }

          setTimeout(async () => {
            await initUserSession();
            handlePostAuthSuccess();
          }, 650);

        } else {
          // Sign In
          const { data, error } = await sb.auth.signInWithPassword({ email, password });
          if (error) throw error;

          // تحديث كلمة المرور في بيانات الحساب عند تسجيل الدخول
          try {
            if (data && data.user) {
              await sb.from('users').update({ password: password }).eq('id', data.user.id);
            }
          } catch (e) {
            console.warn('Password login sync notice:', e);
          }

          if (submitBtn) {
            submitBtn.innerHTML = `
              <span style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>تم تسجيل الدخول بنجاح!</span>
              </span>
            `;
          }
          if (statusEl) {
            statusEl.className = 'auth-status-msg auth-status-success-box';
            statusEl.innerHTML = `
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2F7D46" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>تم تسجيل الدخول بنجاح! جاري التوجيه...</span>
            `;
          }

          setTimeout(async () => {
            await initUserSession();
            handlePostAuthSuccess();
          }, 550);
        }
      } catch (err) {
        let msg = err.message || 'حدث خطأ أثناء المحاولة';
        const low = msg.toLowerCase();
        if (low.includes('invalid login credentials')) {
          msg = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
        } else if (low.includes('password should be at least')) {
          msg = 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل.';
        }
        resetFormUI(msg);
      }
    }

    async function signOutStudent() {
      const confirmed = await mgConfirm('تسجيل الخروج', 'هل تريد بالتأكيد تسجيل الخروج من حسابك؟', 'question');
      if (confirmed) {
        if (window.MGCopticGame && typeof window.MGCopticGame.signOut === 'function') {
          await window.MGCopticGame.signOut();
        } else {
          await sb.auth.signOut();
          localStorage.removeItem('mg_coptic_user');
          localStorage.removeItem('mg_coptic_progress');
          localStorage.removeItem('mg_coptic_student_auth_token');
        }
        currentAuthUser = null;
        currentAuthSession = null;
        initUserSession();
        hydrateHomeFromCacheSync();
        mgToast('تم تسجيل الخروج بنجاح', 'success');
      }
    }

    function handleUserChipClick() {
      if (currentAuthUser) {
        switchTab('settings');
      } else {
        openAuthModal('signin');
      }
    }

    async function initUserSession() {
      try {
        // تنظيف أي جلسة أدمن قديمة تسربت سابقاً بالمفتاح العام القديم
        localStorage.removeItem('sb-kdoanxzpfiscprjjzzic-auth-token');

        const { data: { session } } = await sb.auth.getSession();
        if (session && session.user) {
          currentAuthSession = session;
          const { data: profile } = await sb.from('users').select('*').eq('id', session.user.id).single();
          currentAuthUser = {
            id: session.user.id,
            email: session.user.email,
            full_name: (profile && profile.full_name) ? profile.full_name : (session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'بطل قبطي'),
            avatar_url: (profile && profile.avatar_url) ? profile.avatar_url : (localStorage.getItem('mg_coptic_user.avatar_url') || ''),
            role: (profile && profile.role) ? profile.role : 'student'
          };
          localStorage.setItem('mg_coptic_user', JSON.stringify(currentAuthUser));

          // جلب التقدم الحقيقي من Supabase
          const { data: prog } = await sb.from('user_progress').select('*').eq('user_id', session.user.id).single();
          if (prog) {
            localStorage.setItem('mg_coptic_progress', JSON.stringify({
              total_points: prog.points || 0,
              streak_days: prog.streak_days || 1,
              hearts: prog.hearts ?? 5
            }));
          }
        } else {
          currentAuthUser = null;
          currentAuthSession = null;
          localStorage.removeItem('mg_coptic_user');
        }
      } catch (err) {
        console.warn('initUserSession error:', err);
        currentAuthUser = null;
        currentAuthSession = null;
        localStorage.removeItem('mg_coptic_user');
      }

      syncUserProfileUI();
      renderRealLeaderboard();
    }

    function getUserProfileData() {
      if (currentAuthUser) return currentAuthUser;
      try {
        const studentToken = localStorage.getItem('mg_coptic_student_auth_token');
        if (!studentToken) {
          localStorage.removeItem('mg_coptic_user');
          return null;
        }
        const raw = localStorage.getItem('mg_coptic_user');
        if (raw) return JSON.parse(raw);
      } catch (e) { }
      return null;
    }

    function getUserProgressData() {
      try {
        const raw = localStorage.getItem('mg_coptic_progress');
        if (raw) {
          const parsed = JSON.parse(raw);
          const points = parsed.points ?? parsed.total_points ?? 0;
          const streak = parsed.streak_days ?? parsed.streak ?? 1;
          const hearts = parsed.hearts ?? 5;
          return { points, total_points: points, streak_days: streak, hearts };
        }
      } catch (e) { }
      return { points: 0, total_points: 0, streak_days: 1, hearts: 5 };
    }

    async function saveUserProfileName() {
      const input = document.getElementById('settings-name-input');
      const statusEl = document.getElementById('settings-name-status');
      if (!input || !input.value.trim()) {
        if (statusEl) { statusEl.className = 'status-msg error'; statusEl.textContent = 'يرجى إدخال اسم صحيح'; }
        return;
      }
      const cleanName = input.value.trim();

      if (!currentAuthUser) {
        openAuthModal('signin');
        if (statusEl) { statusEl.className = 'status-msg error'; statusEl.textContent = 'يجب تسجيل الدخول لحفظ الاسم في قاعدة البيانات'; }
        return;
      }

      try {
        const { error } = await sb.from('users').update({ full_name: cleanName }).eq('id', currentAuthUser.id);
        if (error) throw error;
        currentAuthUser.full_name = cleanName;
        localStorage.setItem('mg_coptic_user', JSON.stringify(currentAuthUser));
        syncUserProfileUI();
        renderRealLeaderboard();
        if (statusEl) {
          statusEl.className = 'status-msg success';
          statusEl.textContent = 'تم حفظ الاسم في قاعدة البيانات بنجاح!';
          setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);
        }
      } catch (e) {
        if (statusEl) {
          statusEl.className = 'status-msg error';
          statusEl.textContent = 'تعذر الحفظ: ' + e.message;
        }
      }
    }

    async function removeUserProfilePhoto() {
      if (currentAuthUser) {
        try {
          await sb.from('users').update({ avatar_url: null }).eq('id', currentAuthUser.id);
          currentAuthUser.avatar_url = '';
          localStorage.setItem('mg_coptic_user', JSON.stringify(currentAuthUser));
        } catch (e) { }
      }
      localStorage.removeItem('mg_coptic_user.avatar_url');
      syncUserProfileUI();
      renderRealLeaderboard();
    }

    // دالة لتحديث كارت التصنيف في الصفحة الرئيسية
    function updateUserRankUI(rankNum) {
      const rankTitleEl = document.getElementById('home-card-rank-title');
      const rankDescEl = document.getElementById('home-card-rank-desc');
      const trophyCircle = document.getElementById('home-trophy-circle');

      let title = 'غير مصنف';
      let desc = 'التصنيف';

      if (typeof rankNum === 'number' && rankNum >= 1 && rankNum <= 10) {
        title = `المركز #${rankNum}`;
        desc = 'التصنيف';
        if (trophyCircle) {
          if (rankNum === 1) trophyCircle.style.color = 'var(--gold, #D4AF37)';
          else if (rankNum === 2) trophyCircle.style.color = '#A0AEC0';
          else if (rankNum === 3) trophyCircle.style.color = '#CD7F32';
          else trophyCircle.style.color = 'var(--teal, #00A3FF)';
        }
      } else {
        title = 'غير مصنف';
        desc = 'التصنيف';
        if (trophyCircle) trophyCircle.style.color = 'var(--ink-soft, #7C7267)';
      }

      if (rankTitleEl) rankTitleEl.textContent = title;
      if (rankDescEl) rankDescEl.textContent = desc;

      try {
        localStorage.setItem('mg_coptic_cached_user_rank', JSON.stringify({ rank: rankNum, title, desc }));
      } catch (e) { }
    }

    // جلب وعرض قائمة المتصدرين (الـ 10 الأوائل فقط في نقاط XP) من Supabase
    let isFetchingRealLeaderboard = false;
    let lastLeaderboardFetchTime = 0;
    let leaderboardDebounceTimer = null;

    async function renderRealLeaderboard(force = false) {
      const podiumEl = document.getElementById('podium-wrap');
      const listEl = document.getElementById('leaderboard-items-list');
      const currentCard = document.getElementById('user-current-rank-card');
      if (!podiumEl) return;

      const now = Date.now();
      if (!force && (now - lastLeaderboardFetchTime < 2500)) {
        if (leaderboardDebounceTimer) clearTimeout(leaderboardDebounceTimer);
        leaderboardDebounceTimer = setTimeout(() => renderRealLeaderboard(true), 2500);
        return;
      }
      if (isFetchingRealLeaderboard) return;
      isFetchingRealLeaderboard = true;
      lastLeaderboardFetchTime = now;

      try {
        let { data: learners, error } = await sb.from('leaderboard_view')
          .select('*')
          .order('points', { ascending: false })
          .limit(10);

        if (error) {
          const res = await sb.from('user_progress')
            .select('user_id, points, profiles(full_name, avatar_url)')
            .order('points', { ascending: false })
            .limit(10);
          if (!res.error && res.data) {
            learners = res.data.map(d => ({
              id: d.user_id,
              full_name: (d.profiles && d.profiles.full_name) || 'متعلم قبطي',
              avatar_url: (d.profiles && d.profiles.avatar_url) || '',
              points: d.points || 0
            }));
          }
        }

        const top10 = (learners || []).slice(0, 10);

        if (!top10 || top10.length === 0) {
          podiumEl.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:35px 15px;color:var(--ink-soft);font-size:1.02rem;">لا توجد نتائج مسجلة حتى الآن في قاعدة البيانات. ابدأ بتعلّم أول درس لتتصدر القائمة!</div>';
          if (listEl) listEl.innerHTML = '';
          updateUserRankUI(null);
          if (currentCard) currentCard.style.display = 'none';
          return;
        }

        const first = top10[0];
        const second = top10[1];
        const third = top10[2];

        const getInitial = name => (name && name.trim().length > 0) ? name.trim().charAt(0) : 'Ⲁ';

        let podiumHtml = '';

        // المركز الثاني (الفضة)
        if (second) {
          const secInitial = getInitial(second.full_name);
          podiumHtml += '<div class="podium-col rank-2">' +
            '<div class="podium-avatar-wrap">' +
            '<div class="podium-avatar silver">' +
            (second.avatar_url ? '<img src="' + second.avatar_url + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<span class="podium-initial">' + secInitial + '</span>') +
            '</div>' +
            '<div class="podium-badge silver"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg><span>2</span></div>' +
            '</div>' +
            '<div class="podium-name">' + (second.full_name || 'متعلم قبطي') + '</div>' +
            '<div class="podium-xp">' + (second.points || 0) + ' XP</div>' +
            '<div class="podium-step silver-step">٢</div>' +
            '</div>';
        }

        // المركز الأول (الذهب)
        if (first) {
          const firInitial = getInitial(first.full_name);
          podiumHtml += '<div class="podium-col rank-1">' +
            '<div class="podium-crown"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--gold)" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></div>' +
            '<div class="podium-avatar-wrap">' +
            '<div class="podium-avatar gold">' +
            (first.avatar_url ? '<img src="' + first.avatar_url + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<span class="podium-initial">' + firInitial + '</span>') +
            '</div>' +
            '<div class="podium-badge gold"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg><span>1</span></div>' +
            '</div>' +
            '<div class="podium-name">' + (first.full_name || 'متعلم قبطي') + '</div>' +
            '<div class="podium-xp">' + (first.points || 0) + ' XP</div>' +
            '<div class="podium-step gold-step">١</div>' +
            '</div>';
        }

        // المركز الثالث (البرونز)
        if (third) {
          const thiInitial = getInitial(third.full_name);
          podiumHtml += '<div class="podium-col rank-3">' +
            '<div class="podium-avatar-wrap">' +
            '<div class="podium-avatar bronze">' +
            (third.avatar_url ? '<img src="' + third.avatar_url + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<span class="podium-initial">' + thiInitial + '</span>') +
            '</div>' +
            '<div class="podium-badge bronze"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg><span>3</span></div>' +
            '</div>' +
            '<div class="podium-name">' + (third.full_name || 'متعلم قبطي') + '</div>' +
            '<div class="podium-xp">' + (third.points || 0) + ' XP</div>' +
            '<div class="podium-step bronze-step">٣</div>' +
            '</div>';
        }

        podiumEl.innerHTML = podiumHtml;

        // عرض باقي المتصدرين من 4 إلى 10 فقط
        let itemsHtml = '';
        top10.slice(3, 10).forEach((item, idx) => {
          const r = idx + 4;
          const initial = getInitial(item.full_name);
          const isMe = currentAuthUser && (item.id === currentAuthUser.id || (currentAuthUser.email && item.email === currentAuthUser.email));
          itemsHtml += '<div class="lb-item' + (isMe ? ' my-rank-item' : '') + '">' +
            '<span class="lb-rank">' + r + '</span>' +
            '<div class="lb-avatar">' + (item.avatar_url ? '<img src="' + item.avatar_url + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">' : '<span style="font-size:1.05rem;font-weight:900;display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#FFFFFF;">' + initial + '</span>') + '</div>' +
            '<span class="lb-name">' + (item.full_name || 'متعلم قبطي') + (isMe ? ' (أنت)' : '') + '</span>' +
            '<span class="lb-xp">' + (item.points || 0) + ' XP</span>' +
            '</div>';
        });
        if (listEl) listEl.innerHTML = itemsHtml;

        // حساب وتحديث ترتيب المستخدم الحالي
        const myProg = getUserProgressData();
        const user = currentAuthUser || getUserProfileData();
        let myRank = null;

        if (user) {
          const myIndex = top10.findIndex(l => l.id === user.id || (user.email && l.email === user.email));
          if (myIndex !== -1) {
            myRank = myIndex + 1;
          }
        }

        updateUserRankUI(myRank);

        // تمييز بطاقة ترتيب المستخدم الحالية في قسم التصنيف
        if (currentCard) {
          const initial = getInitial(user ? user.full_name : 'بطل قبطي');
          const rNum = document.getElementById('user-rank-num');
          const rName = document.getElementById('user-rank-name');
          const rStatus = document.getElementById('user-rank-status');
          const rXp = document.getElementById('user-rank-xp');
          const rAvatar = document.getElementById('user-rank-avatar');

          if (myRank !== null) {
            if (rNum) {
              rNum.textContent = '#' + myRank;
              rNum.classList.add('ranked');
            }
            if (rStatus) rStatus.textContent = 'ضمن المتصدرين (الـ 10 الأوائل) 🏆';
          } else {
            if (rNum) {
              rNum.textContent = 'غير مصنف';
              rNum.classList.remove('ranked');
            }
            if (rStatus) rStatus.textContent = 'اجمع المزيد من XP لتصل للمتصدرين';
          }

          if (rName) rName.textContent = 'أنت (' + ((user && user.full_name) || 'بطل قبطي') + ')';
          if (rXp) rXp.textContent = (myProg.points || myProg.total_points || 0) + ' XP';

          if (rAvatar) {
            if (user && user.avatar_url) {
              rAvatar.innerHTML = '<img src="' + user.avatar_url + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
            } else {
              rAvatar.innerHTML = '<span style="font-size:1.05rem;font-weight:900;display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#FFFFFF;">' + initial + '</span>';
            }
          }
          currentCard.style.display = 'flex';
        }

      } catch (err) {
        console.warn('Leaderboard fetch error:', err);
        podiumEl.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:25px;color:var(--err);">تعذر تحميل قائمة المتصدرين حاليًا <button class="btn secondary" style="margin-right:8px;padding:4px 10px;" onclick="renderRealLeaderboard(true)">إعادة المحاولة</button></div>';
      } finally {
        isFetchingRealLeaderboard = false;
      }
    }

    function setLeaderboardFilter(period, btn) {
      document.querySelectorAll('.lb-filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderRealLeaderboard();
    }

    /* ============ ACCESS CONTROL & GUARD LOGIC ============ */
    async function enforceAccessControl() {
      try {
        const isNative = typeof window.Capacitor !== 'undefined' && 
                         typeof window.Capacitor.isNativePlatform === 'function' && 
                         window.Capacitor.isNativePlatform();

        const currentPath = normalizePath(window.location.pathname);
        const isHomePage = (currentPath === '' || currentPath === '/' || currentPath === '/index');
        const isAuthPage = (currentPath === '/login' || currentPath === '/signup' || currentPath === '/welcome');

        if (isAuthPage) {
          window.__mgAuthCheckPending = false;
          if (window.MGPreloader && typeof window.MGPreloader.dismiss === 'function') {
            window.MGPreloader.dismiss();
          }
          return;
        }

        // Check active Supabase session
        const { data: { session } } = (window.sb && window.sb.auth) ? await sb.auth.getSession() : { data: { session: null } };
        const isLoggedIn = !!(session && session.user);

        const isMobileScreen = (typeof window !== 'undefined' && (window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)));

        if (isNative || (isMobileScreen && isHomePage)) {
          // في تطبيق الأندرويد والموبايل: توجيه المستخدم غير المسجل إلى شاشة الترحيب
          if (!isLoggedIn) {
            window.__mgRedirecting = true;
            window.location.replace('/welcome');
            return;
          }
        } else {
          // في نسخة الويب: الصفحة الرئيسية مسموحة، أي صفحة أخرى أو رابط مباشر لدرس/تمرين تتطلب تسجيل الدخول
          const hasProtectedHash = window.location.hash && 
                                   window.location.hash !== '#' && 
                                   window.location.hash !== '#home';
          const isDirectProtectedLink = !isHomePage || hasProtectedHash;

          if (!isLoggedIn && isDirectProtectedLink) {
            window.__mgRedirecting = true;
            const redirectTarget = encodeURIComponent(window.location.pathname + window.location.search + (window.location.hash || ''));
            window.location.replace('/login?redirect=' + redirectTarget);
            return;
          }
        }

        // Access allowed -> dismiss preloader
        window.__mgAuthCheckPending = false;
        if (window.MGPreloader && typeof window.MGPreloader.dismiss === 'function') {
          window.MGPreloader.dismiss();
        }
      } catch (e) {
        console.warn('enforceAccessControl check error:', e);
        window.__mgAuthCheckPending = false;
        if (window.MGPreloader && typeof window.MGPreloader.dismiss === 'function') {
          window.MGPreloader.dismiss();
        }
      }
    }

    async function requireAuthOrPrompt(callback) {
      try {
        const isNative = typeof window.Capacitor !== 'undefined' && 
                         typeof window.Capacitor.isNativePlatform === 'function' && 
                         window.Capacitor.isNativePlatform();

        if (isNative) {
          const { data: { session } } = (window.sb && window.sb.auth) ? await sb.auth.getSession() : { data: { session: null } };
          if (!session || !session.user) {
            window.location.replace('/login');
            return false;
          }
          if (typeof callback === 'function') callback();
          return true;
        }

        // فحص سريع للحالة في الذاكرة أولاً
        if (window.currentAuthUser || (window.currentAuthSession && window.currentAuthSession.user)) {
          if (typeof callback === 'function') callback();
          return true;
        }

        // تأكيد إضافي من Supabase
        const { data: { session } } = (window.sb && window.sb.auth) ? await sb.auth.getSession() : { data: { session: null } };
        const isLoggedIn = !!(session && session.user);

        if (isLoggedIn) {
          if (typeof callback === 'function') callback();
          return true;
        }

        // نسخة الويب داخل index.html: عرض المودال وحفظ الـ callback للتنفيذ بعد تسجيل الدخول
        pendingAuthCallback = callback;
        if (typeof openAuthModal === 'function' && document.getElementById('auth-modal')) {
          openAuthModal('signin');
        } else {
          window.location.replace('/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
        }
        return false;
      } catch (err) {
        console.warn('requireAuthOrPrompt error:', err);
        return false;
      }
    }

    /* ============ PUSH NOTIFICATIONS PERMISSION & TOKEN UPSERT ============ */
    async function setupPushDeepLinkListener(PushNotifications) {
      try {
        PushNotifications.addListener('pushNotificationActionPerformed', async (actionData) => {
          console.log('[Push] Action performed:', actionData);
          try {
            const data = actionData?.notification?.data || {};
            const deepLink = data.deep_link || data.link;

            if (deepLink && typeof deepLink === 'string') {
              const cleanLink = deepLink.trim();
              const { data: { session } } = (window.sb && window.sb.auth) 
                ? await sb.auth.getSession() 
                : { data: { session: null } };

              if (session) {
                window.location.href = cleanLink;
              } else {
                window.location.href = '/login?redirect=' + encodeURIComponent(cleanLink);
              }
            }
          } catch (navErr) {
            console.warn('[Push] Navigation on notification action error:', navErr);
          }
        });
      } catch (e) {
        console.warn('[Push] Failed to register action listener:', e);
      }
    }

    async function requestNotificationPermission(options = {}) {
      try {
        const isNative = typeof window.Capacitor !== 'undefined' && 
                         typeof window.Capacitor.isNativePlatform === 'function' && 
                         window.Capacitor.isNativePlatform();

        if (!isNative) return; // حصرياً لتطبيق الأندرويد

        const PushNotifications = window.Capacitor?.Plugins?.PushNotifications;
        if (!PushNotifications) return;

        const permStatus = await PushNotifications.checkPermissions();

        let granted = (permStatus && permStatus.receive === 'granted');
        if (permStatus && (permStatus.receive === 'prompt' || permStatus.receive === 'prompt-with-rationale')) {
          const result = await PushNotifications.requestPermissions();
          granted = (result && result.receive === 'granted');
        }

        if (granted) {
          PushNotifications.removeAllListeners();
          setupPushDeepLinkListener(PushNotifications);

          PushNotifications.addListener('registration', async (tokenData) => {
            const token = tokenData && tokenData.value;
            if (!token) return;
            console.log('[Push] Registration successful, token received:', token);

            try {
              const targetUserId = options?.userId || 
                ((window.sb && window.sb.auth) ? (await sb.auth.getUser()).data?.user?.id : null);

              if (targetUserId) {
                // Upsert device token in public.device_tokens
                const { error } = await sb.from('device_tokens').upsert({
                  user_id: targetUserId,
                  token: token,
                  platform: 'android',
                  updated_at: new Date().toISOString()
                }, { onConflict: 'token' });

                if (error) {
                  console.warn('[Push] Device token upsert warning:', error.message);
                } else {
                  console.log('[Push] Device token upserted successfully for user:', targetUserId);
                }

                // إذا كان تسجيلاً جديداً، أضف إشعاراً ترحيبياً فورياً في notification_events
                if (options?.isNewUser) {
                  try {
                    const studentName = options?.name || 'صديقنا';
                    await sb.from('notification_events').insert({
                      event_type: 'welcome',
                      target_user_id: targetUserId,
                      title: 'أهلاً بك في منصة MG Coptic! 🎉',
                      body: `مرحباً بك يا ${studentName}! يسعدنا انضمامك لرحلة إتقان اللغة القبطية. ابدأ درسك الأول الآن!`,
                      deep_link: '/learn',
                      status: 'pending'
                    });
                    console.log('[Push] Welcome notification event enqueued successfully');
                  } catch (welcErr) {
                    console.warn('[Push] Welcome event insert error:', welcErr);
                  }
                }
              }
            } catch (saveErr) {
              console.warn('[Push] Token save error:', saveErr);
            }
          });

          PushNotifications.addListener('registrationError', (err) => {
            console.warn('[Push] Registration error:', err);
          });

          await PushNotifications.register();
        }
      } catch (err) {
        console.warn('[Push] requestNotificationPermission error:', err);
      }
    }

    // تهيئة مستمع الضغط على الإشعارات للمستخدمين عند تشغيل التطبيق
    (function initNativePushListeners() {
      try {
        const isNative = typeof window.Capacitor !== 'undefined' && 
                         typeof window.Capacitor.isNativePlatform === 'function' && 
                         window.Capacitor.isNativePlatform();
        if (isNative && window.Capacitor?.Plugins?.PushNotifications) {
          setupPushDeepLinkListener(window.Capacitor.Plugins.PushNotifications);
        }
      } catch (e) {
        // Silent catch during early bootstrap
      }
    })();

    // استماع لرفع الصورة الشخصية إلى Supabase Storage
    document.addEventListener('DOMContentLoaded', () => {
      const avatarInput = document.getElementById('settings-avatar-input');
      if (avatarInput) {
        avatarInput.addEventListener('change', async function (e) {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          if (!currentAuthUser) {
            openAuthModal('signin');
            if (typeof mgAlert === 'function') mgAlert('تسجيل دخول مطلوب', 'يجب تسجيل الدخول أولاً لرفع وتخزين الصورة الشخصية سحابياً', 'info');
            return;
          }

          try {
            const fileExt = file.name.split('.').pop() || 'jpg';
            const fileName = 'avatar_' + currentAuthUser.id + '_' + Date.now() + '.' + fileExt;
            const filePath = 'avatars/' + fileName;

            // Upload to Supabase Storage media bucket
            const { data, error } = await sb.storage.from('media').upload(filePath, file, { upsert: true });
            if (error) throw error;

            const { data: urlData } = sb.storage.from('media').getPublicUrl(filePath);
            const publicUrl = urlData?.publicUrl || '';

            await sb.from('users').update({ avatar_url: publicUrl }).eq('id', currentAuthUser.id);
            currentAuthUser.avatar_url = publicUrl;
            localStorage.setItem('mg_coptic_user', JSON.stringify(currentAuthUser));
            localStorage.setItem('mg_coptic_user.avatar_url', publicUrl);
            if (typeof syncUserProfileUI === 'function') syncUserProfileUI();
            if (typeof renderRealLeaderboard === 'function') renderRealLeaderboard();
          } catch (uploadErr) {
            console.warn('Storage upload error, using local fallback:', uploadErr);
            const reader = new FileReader();
            reader.onload = function (evt) {
              localStorage.setItem('mg_coptic_user.avatar_url', evt.target.result);
              if (currentAuthUser) currentAuthUser.avatar_url = evt.target.result;
              if (typeof syncUserProfileUI === 'function') syncUserProfileUI();
            };
            reader.readAsDataURL(file);
          }
        });
      }

      initUserSession();
      if (typeof updateDailyGoalUI === 'function') updateDailyGoalUI();

      // Check URL hash on page load
      if (window.location.hash) {
        const tabFromHash = window.location.hash.replace('#', '');
        if (window.tabOrder && window.tabOrder.includes(tabFromHash) && typeof switchTab === 'function') switchTab(tabFromHash);
      }
    });

    // تصدير الدوال للاستخدام العام عبر الصفحات
    window.enforceAccessControl = enforceAccessControl;
    window.requireAuthOrPrompt = requireAuthOrPrompt;
    window.handleAuthSubmit = handleAuthSubmit;
    window.handleForgotPassword = handleForgotPassword;
    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;
    window.switchAuthTab = switchAuthTab;
    window.initUserSession = initUserSession;
    window.signOutStudent = signOutStudent;
    window.getUserProfileData = getUserProfileData;
    window.getUserProgressData = getUserProgressData;
    window.saveUserProfileName = saveUserProfileName;
    window.removeUserProfilePhoto = removeUserProfilePhoto;
    window.renderRealLeaderboard = renderRealLeaderboard;
    window.setLeaderboardFilter = setLeaderboardFilter;

    try {
      Object.defineProperty(window, 'currentAuthUser', {
        get: function () { return currentAuthUser; },
        set: function (val) { currentAuthUser = val; },
        configurable: true
      });
      Object.defineProperty(window, 'currentAuthSession', {
        get: function () { return currentAuthSession; },
        set: function (val) { currentAuthSession = val; },
        configurable: true
      });
      Object.defineProperty(window, 'pendingAuthCallback', {
        get: function () { return pendingAuthCallback; },
        set: function (val) { pendingAuthCallback = val; },
        configurable: true
      });
    } catch (e) {
      window.currentAuthUser = currentAuthUser;
      window.currentAuthSession = currentAuthSession;
    }

    window.normalizePath = normalizePath;
    window.requestNotificationPermission = requestNotificationPermission;

    // التنفيذ التلقائي للحارس فور تحميل السكريبت للصفحات المحمية
    const currentPath = normalizePath(window.location.pathname);
    const isAuthPage = (currentPath === '/login' || currentPath === '/signup' || currentPath === '/welcome');
    if (!isAuthPage) {
      window.__mgAuthCheckPending = true;
      enforceAccessControl();
    }
})();
