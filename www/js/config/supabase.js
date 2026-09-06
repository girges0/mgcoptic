/**
 * MG COPTIC - Supabase Configuration & Client Initialization
 * Centralized configuration for both User and Admin environments.
 */

(function () {
  const SUPABASE_URL = 'https://kdoanxzpfiscprjjzzic.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';
  const MEDIA_BUCKET = 'media';

  // Detect whether we are in the admin portal or user frontend
  const isAdminEnv = window.location.pathname.includes('/admin/');

  const authStorageKey = isAdminEnv ? 'mg_coptic_admin_auth_token' : 'mg_coptic_student_auth_token';

  // Capacitor Preferences Storage Adapter (Ensures persistent session inside Android APK WebView)
  function getStorageAdapter() {
    const isNative = typeof window.Capacitor !== 'undefined' && 
                     typeof window.Capacitor.isNativePlatform === 'function' && 
                     window.Capacitor.isNativePlatform();

    const Preferences = window.Capacitor?.Plugins?.Preferences || window.CapacitorPreferences;
    
    if (isNative && Preferences && typeof Preferences.get === 'function') {
      return {
        getItem: async function (key) {
          try {
            const { value } = await Preferences.get({ key: key });
            return value;
          } catch (e) {
            return window.localStorage ? window.localStorage.getItem(key) : null;
          }
        },
        setItem: async function (key, value) {
          try {
            await Preferences.set({ key: key, value: String(value) });
          } catch (e) {
            if (window.localStorage) window.localStorage.setItem(key, String(value));
          }
        },
        removeItem: async function (key) {
          try {
            await Preferences.remove({ key: key });
          } catch (e) {
            if (window.localStorage) window.localStorage.removeItem(key);
          }
        }
      };
    }
    return window.localStorage;
  }

  let client = null;
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storageKey: authStorageKey,
        storage: getStorageAdapter(),
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } else {
    console.error('Supabase JS library is not loaded. Ensure the Supabase CDN script is included before this file.');
  }

  // Global exports for backward and cross-script compatibility
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
  window.SB_URL = SUPABASE_URL;
  window.SB_ANON_KEY = SUPABASE_ANON_KEY;
  window.MEDIA_BUCKET = MEDIA_BUCKET;
  window.sb = client;
  window.sbClient = client;

  window.createSupabaseClient = function (customStorageKey) {
    if (!window.supabase) return null;
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storageKey: customStorageKey || authStorageKey,
        storage: getStorageAdapter(),
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  };
})();
