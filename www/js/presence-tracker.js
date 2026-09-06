/**
 * MG COPTIC - Realtime Presence Tracker
 * تتبع حضور وتواجد الطلاب اللحظي بالموقع (Realtime Presence) بدقة 100%
 * عبر قنوات Supabase Realtime بدون تخمين أو تأخير.
 */

(function () {
  'use strict';

  const PRESENCE_CHANNEL_NAME = 'coptic_online_presence';
  let presenceChannel = null;
  let isTracking = false;
  let heartbeatTimer = null;

  // الحصول على عميل Supabase المتاح
  function getSupabaseClient() {
    if (window.sbClient && typeof window.sbClient.channel === 'function') {
      return window.sbClient;
    }
    if (window.sb && typeof window.sb.channel === 'function') {
      return window.sb;
    }
    if (window.supabaseClient && typeof window.supabaseClient.channel === 'function') {
      return window.supabaseClient;
    }
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      const url = 'https://kdoanxzpfiscprjjzzic.supabase.co';
      const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
      try {
        window.sbClient = window.supabase.createClient(url, key, {
          auth: {
            storageKey: 'mg_coptic_student_auth_token',
            persistSession: true,
            autoRefreshToken: true
          }
        });
        return window.sbClient;
      } catch (e) {
        console.warn('[Presence] Failed to initialize default client:', e);
      }
    }
    return null;
  }

  // استخراج بيانات المستخدم الحالي المسجل
  function getCurrentUser() {
    try {
      if (typeof window.getUserProfileData === 'function') {
        const u = window.getUserProfileData();
        if (u && u.id) return u;
      }
      if (window.currentAuthUser && window.currentAuthUser.id) {
        return window.currentAuthUser;
      }
      const raw = localStorage.getItem('mg_coptic_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.id) return parsed;
      }
    } catch (e) {
      console.warn('[Presence] getCurrentUser error:', e);
    }
    return null;
  }

  // بدء تتبع تواجد المستخدم اللحظي
  async function startPresenceTracking() {
    const user = getCurrentUser();
    if (!user || !user.id) {
      return;
    }

    const client = getSupabaseClient();
    if (!client) {
      setTimeout(startPresenceTracking, 1500);
      return;
    }

    if (presenceChannel && isTracking) {
      return;
    }

    try {
      if (!presenceChannel) {
        presenceChannel = client.channel(PRESENCE_CHANNEL_NAME, {
          config: {
            presence: {
              key: user.id
            }
          }
        });
      }

      presenceChannel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          try {
            await presenceChannel.track({
              user_id: user.id,
              full_name: user.full_name || 'طالب قبطي',
              email: user.email || '',
              online_at: new Date().toISOString(),
              page: window.location.pathname
            });
            isTracking = true;

            // تحديث تاريخ آخر نشاط إلى تاريخ اليوم في قاعدة البيانات إن لزم
            syncTodayActiveDate(user.id);
          } catch (trackErr) {
            console.warn('[Presence] track error:', trackErr);
          }
        }
      });

      // ضبط نبض خفيف كل دقيقتين لتجديد التتبع طالما المتصفح مفتوح
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      heartbeatTimer = setInterval(async () => {
        if (isTracking && presenceChannel && document.visibilityState === 'visible') {
          try {
            await presenceChannel.track({
              user_id: user.id,
              full_name: user.full_name || 'طالب قبطي',
              email: user.email || '',
              online_at: new Date().toISOString(),
              page: window.location.pathname
            });
          } catch (e) {}
        }
      }, 120000);

    } catch (e) {
      console.warn('[Presence] startTracking error:', e);
    }
  }

  // إيقاف التتبع فورياً عند إغلاق الصفحة أو تسجيل الخروج
  async function stopPresenceTracking() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
    if (presenceChannel && isTracking) {
      try {
        await presenceChannel.untrack();
        const client = getSupabaseClient();
        if (client && typeof client.removeChannel === 'function') {
          client.removeChannel(presenceChannel);
        }
      } catch (e) {}
      presenceChannel = null;
      isTracking = false;
    }
  }

  // مزامنة حقل last_active_date لليوم الحالي إذا لم يكن مسجلاً اليوم
  function syncTodayActiveDate(userId) {
    if (!userId) return;
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const client = getSupabaseClient();
      if (!client) return;

      // فحص سريع من الذاكرة المحلية لتجنب استدعاءات متكررة
      const cacheKey = `mg_coptic_last_synced_date_${userId}`;
      if (localStorage.getItem(cacheKey) === todayStr) {
        return;
      }

      client.from('user_progress')
        .update({ last_active_date: todayStr })
        .eq('user_id', userId)
        .then(() => {
          localStorage.setItem(cacheKey, todayStr);
        })
        .catch(() => {});
    } catch (e) {}
  }

  // الاستماع لأحداث إغلاق الصفحة أو التنقل لإلغاء الحضور فوراً
  window.addEventListener('beforeunload', () => {
    stopPresenceTracking();
  });

  window.addEventListener('pagehide', () => {
    stopPresenceTracking();
  });

  // الاستماع لتغيير الرؤية (تبديل التاب / الرجوع)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (!isTracking) {
        startPresenceTracking();
      }
    }
  });

  // الاستماع لحدث تسجيل الدخول أو الخروج من التطبيق
  window.addEventListener('user_logged_in', () => {
    startPresenceTracking();
  });

  window.addEventListener('user_logged_out', () => {
    stopPresenceTracking();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'mg_coptic_user') {
      if (e.newValue) {
        startPresenceTracking();
      } else {
        stopPresenceTracking();
      }
    }
  });

  // التشغيل التلقائي عند اكتمال تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(startPresenceTracking, 800);
    });
  } else {
    setTimeout(startPresenceTracking, 800);
  }

  // تصدير واجهة برمجية عامة
  window.CopticPresence = {
    start: startPresenceTracking,
    stop: stopPresenceTracking,
    isTracking: () => isTracking
  };

})();
