const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  'https://enosiii.github.io/Anime-Watch-List/',
  'https://script.google.com/macros/s/AKfycbwpdAJmvep38oEly6CRrLjE7tgO-nbwGyL3yG5HVUjmbUtr7IiwOBTe02n_SJaFVUig/exec',
  'https://enosiii.github.io/PWA/AWL/PC-icon-192x192.png',
  'https://enosiii.github.io/PWA/AWL/PC-icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
