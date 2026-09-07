// Service Worker for MG COPTIC PWA
// Strategy: Fast Network-First with Timeout for Navigation, Stale-While-Revalidate for Assets

const CACHE_NAME = 'mgcoptic-v1.0.8';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/welcome.html',
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
    let reqToFetch = request;
    if (url.pathname === '/welcome' || url.pathname.endsWith('/welcome')) {
      reqToFetch = new Request(new URL('welcome.html', request.url).href, request);
    } else if (url.pathname === '/login' || url.pathname.endsWith('/login')) {
      reqToFetch = new Request(new URL('login.html' + url.search, request.url).href, request);
    } else if (url.pathname === '/signup' || url.pathname.endsWith('/signup')) {
      reqToFetch = new Request(new URL('signup.html' + url.search, request.url).href, request);
    } else if (url.pathname === '/learn' || url.pathname.endsWith('/learn')) {
      reqToFetch = new Request(new URL('learn.html' + url.search, request.url).href, request);
    }

    event.respondWith(
      new Promise((resolve) => {
        let isResolved = false;

        // If network takes > 1200ms, immediately serve cached HTML if available
        const timeoutId = setTimeout(async () => {
          if (!isResolved) {
            const cached = (await caches.match(reqToFetch)) || (await caches.match(request));
            if (cached) {
              isResolved = true;
              resolve(cached);
            }
          }
        }, 1200);

        fetch(reqToFetch)
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

  const title = data.title || data.notification?.title || data.data?.title || 'MG COPTIC';
  const body = data.body || data.notification?.body || data.data?.body || '';
  const rawDeepLink = data.deep_link || data.data?.deep_link || data.link || '/';
  const baseUrl = self.location.origin;
  const fullUrl = new URL(rawDeepLink, baseUrl).href;

  // دعم لوجو المنصة الرسمي الكامل والأيقونة والشعار المفرغ
  const iconUrl = data.icon || data.notification?.icon || data.data?.icon || (baseUrl + '/logo.png');
  const badgeUrl = data.badge || data.notification?.badge || data.data?.badge || (baseUrl + '/icon-192.png');
  const imageUrl = data.image || data.notification?.image || data.data?.image || null;

  const options = {
    body: body,
    icon: iconUrl,
    badge: badgeUrl,
    tag: data.tag || 'mg_coptic_notification_' + Date.now(),
    renotify: true,
    vibrate: [150, 75, 150],
    data: { deep_link: fullUrl }
  };

  if (imageUrl) {
    options.image = imageUrl;
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

// 4. Notification Click: Deep link directly into the application
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawLink = event.notification.data?.deep_link || '/';
  const targetUrl = new URL(rawLink, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
