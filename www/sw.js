// Service Worker for MG COPTIC PWA
// Strategy: Fast Network-First with Timeout for Navigation, Stale-While-Revalidate for Assets

const CACHE_NAME = 'mgcoptic-v1.0.6';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/welcome.html',
  '/welcome',
  '/learn.html',
  '/login.html',
  '/signup.html',
  '/onboarding.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.png',
  '/logo.png',
  '/girges.woff',
  '/assets/fonts/girges.woff',
  '/css/preloader.css',
  '/js/preloader.js',
  '/js/pwa-register.js',
  '/js/back-button-handler.js'
];

// Install: Pre-cache essential shell assets and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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

// Activate: Clean up old caches and take control immediately
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

  // Ignore non-HTTP/HTTPS and non-GET requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Never cache Supabase database or auth API requests
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  // 1. Navigation requests (HTML pages): Fast Network-First with 1.2s timeout
  // Ensures fresh updates on good connections, but avoids screen freeze on slow connections
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      new Promise((resolve) => {
        let isResolved = false;

        // If network takes > 1200ms, immediately serve cached HTML if available
        const timeoutId = setTimeout(async () => {
          if (!isResolved) {
            const cached = await caches.match(request);
            if (cached) {
              isResolved = true;
              resolve(cached);
            }
          }
        }, 1200);

        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            if (!isResolved) {
              isResolved = true;
              clearTimeout(timeoutId);
              resolve(networkResponse);
            }
          })
          .catch(async () => {
            if (!isResolved) {
              isResolved = true;
              clearTimeout(timeoutId);
              const cached = await caches.match(request);
              if (cached) return resolve(cached);
              const fallback = await caches.match('/index.html');
              resolve(fallback || new Response('Network offline', { status: 503 }));
            }
          });
      })
    );
    return;
  }

  // 2. Static Assets (CSS, JS, Images, Fonts): Stale-While-Revalidate
  // Caches both local and CDN assets (Google Fonts, jsDelivr) for instant load
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});

// 3. Web Push Notifications: Display with MG Coptic Logo and Badge
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || data.notification?.title || 'MG COPTIC';
  const body = data.body || data.notification?.body || '';
  const deepLink = data.deep_link || data.data?.deep_link || data.link || '/';

  const options = {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    image: data.image || data.notification?.image || '/icon-192.png',
    vibrate: [100, 50, 100],
    data: { deep_link: deepLink }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 4. Notification Click: Deep link directly into the application
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const deepLink = event.notification.data?.deep_link || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(deepLink);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(deepLink);
    })
  );
});
