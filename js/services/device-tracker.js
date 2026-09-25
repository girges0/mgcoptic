/**
 * MG COPTIC — Device & Session Intelligence Tracker
 * =====================================================
 * نظام تتبع الأجهزة والجلسات — للتحليلات فقط وليس للمصادقة.
 * 
 * المبادئ:
 * - لا يجمع بيانات حساسة (لا IMEI, لا MAC, لا GPS, لا SIM)
 * - يستخدم navigator.userAgent فقط + واجهات المتصفح القياسية
 * - Non-blocking — لا يؤثر على تجربة المستخدم أو الأداء
 * - Error-tolerant — إذا فشل التتبع يكمل التطبيق طبيعياً
 * - Throttled — لا يحدث last_seen مع كل ثانية
 * - يخزن device_uuid محلياً (localStorage)
 */

(function() {
  'use strict';

  const DEVICE_UUID_KEY = 'mg_coptic_device_uuid';
  const LAST_TRACK_KEY = 'mg_coptic_last_device_track';
  const TRACK_THROTTLE_MS = 5 * 60 * 1000; // 5 دقائق بين كل تسجيل
  const HEARTBEAT_INTERVAL_MS = 10 * 60 * 1000; // 10 دقائق بين كل heartbeat
  const APP_VERSION = '1.0.0'; // يتم تحديثها مع كل إصدار

  let heartbeatTimer = null;

  // ─── UUID Generator ───────────────────────────────────────
  function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // ─── Device UUID Management ────────────────────────────────
  function getOrCreateDeviceUUID() {
    try {
      let uuid = localStorage.getItem(DEVICE_UUID_KEY);
      if (!uuid) {
        uuid = generateUUID();
        localStorage.setItem(DEVICE_UUID_KEY, uuid);
      }
      return uuid;
    } catch (e) {
      // localStorage may be unavailable (private browsing etc.)
      return generateUUID();
    }
  }

  // ─── User Agent Parsing ───────────────────────────────────
  function parseUserAgent() {
    const ua = navigator.userAgent || '';
    const result = {
      platform: 'web',
      deviceType: 'desktop',
      manufacturer: '',
      model: '',
      osName: '',
      osVersion: '',
      browserName: '',
      browserVersion: ''
    };

    // ── Detect Platform ──
    const isCapacitor = typeof window.Capacitor !== 'undefined' && 
                        typeof window.Capacitor.isNativePlatform === 'function' &&
                        window.Capacitor.isNativePlatform();
    
    if (isCapacitor) {
      const platform = window.Capacitor.getPlatform ? window.Capacitor.getPlatform() : 'web';
      result.platform = platform === 'android' ? 'android' : (platform === 'ios' ? 'ios' : 'web');
    } else if (/Android/i.test(ua)) {
      result.platform = 'web'; // Android browser (not native app)
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      result.platform = 'web'; // iOS browser (not native app)
    }

    // ── Detect OS ──
    if (/Windows NT (\d+[\.\d]*)/i.test(ua)) {
      result.osName = 'Windows';
      const ver = ua.match(/Windows NT (\d+[\.\d]*)/i);
      if (ver) {
        const ntMap = {'10.0': '10/11', '6.3': '8.1', '6.2': '8', '6.1': '7', '6.0': 'Vista'};
        result.osVersion = ntMap[ver[1]] || ver[1];
      }
    } else if (/Mac OS X (\d+[_\.\d]*)/i.test(ua)) {
      result.osName = 'macOS';
      const ver = ua.match(/Mac OS X (\d+[_\.\d]*)/i);
      if (ver) result.osVersion = ver[1].replace(/_/g, '.');
    } else if (/Android (\d+[\.\d]*)/i.test(ua)) {
      result.osName = 'Android';
      const ver = ua.match(/Android (\d+[\.\d]*)/i);
      if (ver) result.osVersion = ver[1];
    } else if (/(?:iPhone|iPad|iPod).*?OS (\d+[_\.\d]*)/i.test(ua)) {
      result.osName = 'iOS';
      const ver = ua.match(/OS (\d+[_\.\d]*)/i);
      if (ver) result.osVersion = ver[1].replace(/_/g, '.');
    } else if (/CrOS/i.test(ua)) {
      result.osName = 'Chrome OS';
    } else if (/Linux/i.test(ua)) {
      result.osName = 'Linux';
    }

    // ── Detect Device Type ──
    if (/iPad|tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
      result.deviceType = 'tablet';
    } else if (/Mobile|iPhone|Android.*Mobile|webOS|iPod/i.test(ua)) {
      result.deviceType = 'mobile';
    } else {
      result.deviceType = 'desktop';
    }

    // ── Detect Manufacturer & Model ──
    // Android models
    if (/Android/i.test(ua)) {
      // Pattern: "Build/XX" or "; MODEL)" or "; MODEL Build"
      const modelMatch = ua.match(/;\s*([^;)]+?)(?:\s+Build|\s*\))/i);
      if (modelMatch && modelMatch[1]) {
        let rawModel = modelMatch[1].trim();
        // Clean up known prefixes
        rawModel = rawModel.replace(/^Linux;\s*/i, '').replace(/^U;\s*/i, '').replace(/^Android\s*\d+[\.\d]*;\s*/i, '');
        
        // Try to extract manufacturer
        const knownBrands = [
          'Samsung', 'Xiaomi', 'Redmi', 'POCO', 'Huawei', 'HONOR', 'Oppo', 'Vivo', 
          'OnePlus', 'Realme', 'Motorola', 'LG', 'Sony', 'Nokia', 'Google', 'Pixel',
          'Tecno', 'Infinix', 'Itel', 'ZTE', 'Lenovo', 'Asus', 'Nothing', 'Fairphone'
        ];
        
        for (const brand of knownBrands) {
          if (rawModel.toLowerCase().startsWith(brand.toLowerCase())) {
            result.manufacturer = brand;
            result.model = rawModel;
            break;
          }
        }
        
        // Samsung specific patterns
        if (!result.manufacturer && /^SM-/i.test(rawModel)) {
          result.manufacturer = 'Samsung';
          result.model = rawModel;
        }
        
        // If no brand detected, use the full model string
        if (!result.manufacturer && rawModel.length > 1 && rawModel.length < 60) {
          result.model = rawModel;
        }
      }
    }
    
    // iOS devices
    if (/iPhone/i.test(ua)) {
      result.manufacturer = 'Apple';
      result.model = 'iPhone';
    } else if (/iPad/i.test(ua)) {
      result.manufacturer = 'Apple';
      result.model = 'iPad';
    } else if (/iPod/i.test(ua)) {
      result.manufacturer = 'Apple';
      result.model = 'iPod';
    } else if (/Macintosh/i.test(ua)) {
      result.manufacturer = 'Apple';
      result.model = 'Mac';
    }

    // ── Detect Browser ──
    if (/Edg\/(\d+[\.\d]*)/i.test(ua)) {
      result.browserName = 'Edge';
      const ver = ua.match(/Edg\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    } else if (/OPR\/(\d+[\.\d]*)/i.test(ua) || /Opera\/(\d+[\.\d]*)/i.test(ua)) {
      result.browserName = 'Opera';
      const ver = ua.match(/OPR\/(\d+[\.\d]*)/i) || ua.match(/Opera\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    } else if (/SamsungBrowser\/(\d+[\.\d]*)/i.test(ua)) {
      result.browserName = 'Samsung Internet';
      const ver = ua.match(/SamsungBrowser\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    } else if (/UCBrowser\/(\d+[\.\d]*)/i.test(ua)) {
      result.browserName = 'UC Browser';
      const ver = ua.match(/UCBrowser\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    } else if (/(?:Chrome|CriOS)\/(\d+[\.\d]*)/i.test(ua) && !/Edg/i.test(ua)) {
      result.browserName = 'Chrome';
      const ver = ua.match(/(?:Chrome|CriOS)\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    } else if (/(?:Safari)\/(\d+[\.\d]*)/i.test(ua) && /Version\/(\d+[\.\d]*)/i.test(ua) && !/Chrome/i.test(ua)) {
      result.browserName = 'Safari';
      const ver = ua.match(/Version\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    } else if (/Firefox\/(\d+[\.\d]*)/i.test(ua)) {
      result.browserName = 'Firefox';
      const ver = ua.match(/Firefox\/(\d+[\.\d]*)/i);
      if (ver) result.browserVersion = ver[1];
    }

    return result;
  }

  // ─── Get Capacitor Device Info (if available) ──────────────
  async function getCapacitorDeviceInfo() {
    try {
      if (typeof window.Capacitor === 'undefined' || 
          !window.Capacitor.isNativePlatform || 
          !window.Capacitor.isNativePlatform()) {
        return null;
      }
      
      const Device = window.Capacitor?.Plugins?.Device;
      if (!Device || typeof Device.getInfo !== 'function') {
        return null;
      }

      const info = await Device.getInfo();
      return {
        platform: info.platform || 'web',
        manufacturer: info.manufacturer || '',
        model: info.model || '',
        osName: info.operatingSystem || '',
        osVersion: info.osVersion || '',
        isVirtual: info.isVirtual || false
      };
    } catch (e) {
      return null;
    }
  }

  // ─── Should Track (Throttle check) ────────────────────────
  function shouldTrackNow() {
    try {
      const lastTrack = localStorage.getItem(LAST_TRACK_KEY);
      if (!lastTrack) return true;
      const elapsed = Date.now() - parseInt(lastTrack, 10);
      return elapsed >= TRACK_THROTTLE_MS;
    } catch (e) {
      return true;
    }
  }

  function markTracked() {
    try {
      localStorage.setItem(LAST_TRACK_KEY, String(Date.now()));
    } catch (e) {
      // ignore
    }
  }

  // ─── Helper: Get Current User (Supabase Auth + Local Cache Fallback) ───
  async function getTrackingUser(sb) {
    // 1. فحص Supabase Auth المباشر
    try {
      if (sb && sb.auth) {
        const { data } = await sb.auth.getUser();
        if (data && data.user && data.user.id) return data.user;
      }
    } catch (_) {}

    // 2. فحص Supabase Session
    try {
      if (sb && sb.auth) {
        const { data } = await sb.auth.getSession();
        if (data && data.session && data.session.user && data.session.user.id) {
          return data.session.user;
        }
      }
    } catch (_) {}

    // 3. فحص الكاش المحلي والذاكرة (خاص بـ WebView وتطبيقات الموبايل)
    try {
      if (window.currentAuthUser && window.currentAuthUser.id) {
        return window.currentAuthUser;
      }
      if (typeof window.getUserProfileData === 'function') {
        const u = window.getUserProfileData();
        if (u && u.id) return u;
      }
      const raw = localStorage.getItem('mg_coptic_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.id) return parsed;
      }
    } catch (_) {}

    return null;
  }

  // ─── Main Track Function ──────────────────────────────────
  async function trackDevice(force = false) {
    try {
      // لا تتبع إذا لم يمر وقت كافٍ (إلا إذا طُلب force)
      if (!force && !shouldTrackNow()) return;

      const sb = window.sb || window.sbClient;
      if (!sb) return;

      const user = await getTrackingUser(sb);
      if (!user || !user.id) return;

      const deviceUUID = getOrCreateDeviceUUID();
      const uaInfo = parseUserAgent();

      // إذا كان Capacitor متاحاً، استخدم معلوماته الأدق
      const capInfo = await getCapacitorDeviceInfo();
      if (capInfo) {
        if (capInfo.platform) uaInfo.platform = capInfo.platform;
        if (capInfo.manufacturer) uaInfo.manufacturer = capInfo.manufacturer;
        if (capInfo.model) uaInfo.model = capInfo.model;
        if (capInfo.osName) uaInfo.osName = capInfo.osName;
        if (capInfo.osVersion) uaInfo.osVersion = capInfo.osVersion;
      }

      // استدعاء دالة الـ Upsert الآمنة مع تمرير معرف المستخدم
      const { error } = await sb.rpc('upsert_user_device', {
        p_device_uuid: deviceUUID,
        p_platform: uaInfo.platform,
        p_device_type: uaInfo.deviceType,
        p_manufacturer: uaInfo.manufacturer,
        p_model: uaInfo.model,
        p_os_name: uaInfo.osName,
        p_os_version: uaInfo.osVersion,
        p_browser_name: uaInfo.browserName,
        p_browser_version: uaInfo.browserVersion,
        p_app_version: APP_VERSION,
        p_screen_width: window.screen ? window.screen.width : 0,
        p_screen_height: window.screen ? window.screen.height : 0,
        p_user_id: user.id
      });

      if (error) {
        console.warn('[DeviceTracker] upsert_user_device error:', error.message);
      } else {
        markTracked();
      }
    } catch (e) {
      console.warn('[DeviceTracker] trackDevice error:', e.message || e);
    }
  }

  // ─── Heartbeat Function ───────────────────────────────────
  async function sendHeartbeat() {
    try {
      const sb = window.sb || window.sbClient;
      if (!sb) return;

      const user = await getTrackingUser(sb);
      if (!user || !user.id) return;

      const deviceUUID = getOrCreateDeviceUUID();
      
      await sb.rpc('heartbeat_device', {
        p_device_uuid: deviceUUID,
        p_user_id: user.id
      });
    } catch (e) {
      // Non-blocking
    }
  }

  // ─── Start Heartbeat Interval ─────────────────────────────
  function startHeartbeat() {
    if (heartbeatTimer) return;
    heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
  }

  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  }

  // ─── Auto-Initialize ──────────────────────────────────────
  function init() {
    // البدء السريع بعد جاهزية العميل
    setTimeout(async () => {
      await trackDevice();
      startHeartbeat();
    }, 1200);

    // عند إغلاق الصفحة
    window.addEventListener('beforeunload', () => {
      stopHeartbeat();
    });

    // عند عودة التركيز للصفحة (مثلاً بعد Tab Switch)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        trackDevice(); // async, non-blocking
      }
    });

    // استماع لحدث تسجيل الدخول العام في التطبيق
    window.addEventListener('user_logged_in', () => {
      trackDevice(true);
      startHeartbeat();
    });

    // استماع لتغير المستخدم في التخزين المحلي (مثلاً بعد تسجيل الدخول في نافذة أخرى أو WebView)
    window.addEventListener('storage', (e) => {
      if (e.key === 'mg_coptic_user' && e.newValue) {
        trackDevice(true);
        startHeartbeat();
      }
    });

    // استماع لتسجيل الدخول الفوري عبر Supabase Auth
    try {
      const sb = window.sb || window.sbClient;
      if (sb && sb.auth && typeof sb.auth.onAuthStateChange === 'function') {
        sb.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
            setTimeout(() => {
              trackDevice(true);
              startHeartbeat();
            }, 600);
          } else if (event === 'SIGNED_OUT') {
            stopHeartbeat();
          }
        });
      }
    } catch (_) {}
  }

  // انتظر حتى يتم تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ─── Public API ───────────────────────────────────────────
  window.MGDeviceTracker = {
    trackDevice: trackDevice,
    sendHeartbeat: sendHeartbeat,
    getDeviceUUID: getOrCreateDeviceUUID,
    parseUserAgent: parseUserAgent,
    APP_VERSION: APP_VERSION
  };

})();
