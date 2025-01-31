const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  'https://script.google.com/macros/s/AKfycbwpdAJmvep38oEly6CRrLjE7tgO-nbwGyL3yG5HVUjmbUtr7IiwOBTe02n_SJaFVUig/exec',
  'https://username.github.io/PWA/AWL/PC-icon-192x192.png',
  'https://username.github.io/PWA/AWL/PC-icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
