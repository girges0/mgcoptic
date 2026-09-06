// Service Worker for MG COPTIC PWA
// Strategy: Network-First for fast live updates, with offline cache fallback

const CACHE_NAME = 'mgcoptic-v1.0.0';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/learn.html',
  '/login.html',
  '/signup.html',
  '/onboarding.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.png',
  '/logo.png',
  '/girges.woff'
];

// Install: Pre-cache essential shell assets and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use addAll with individual catch so missing optional files don't break install
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[SW] Pre-cache skipped:', url, err);
          })
        )
      );
    })
  );
});

// Activate: Clean up any old caches and take control of all open pages immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-HTTP/HTTPS and non-GET requests (e.g. chrome-extension, POST mutations)
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Never cache Supabase database or auth API requests
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  // 1. Navigation requests (HTML pages): ALWAYS Network-First
  // Ensures any live website update reflects instantly in PWA and APK
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback: try cache or root
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 2. Static Assets (CSS, JS, Images, Fonts): Stale-While-Revalidate
  // Serves immediately for high speed while updating in background
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // network error is handled by cachedResponse fallback
        });

      return cachedResponse || fetchPromise;
    })
  );
});
