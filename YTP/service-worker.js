const CACHE_NAME = 'pwa-ytp-cache-v1';
const urlsToCache = [
  'https://enosiii.github.io/YT-Playlist/playlist.js',
  'https://enosiii.github.io/YT-Playlist/',
  'https://enosiii.github.io/PWA/YTP/manifest.json',
  'https://enosiii.github.io/PWA/YTP/yt1-icon-192x192.png',
  'https://enosiii.github.io/PWA/YTP/yt1-icon-512x512.png'
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
