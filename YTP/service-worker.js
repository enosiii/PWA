const CACHE_NAME = 'pwa-ytp-cache-v1';
const urlsToCache = [
  'https://enosiii.github.io/YT-Playlist/playlist.js',
  'https://enosiii.github.io/YT-Playlist/',
  'https://enosiii.github.io/PWA/YTP/manifest.json',
  'https://enosiii.github.io/PWA/YTP/yt1-icon-192x192.png',
  'https://enosiii.github.io/PWA/YTP/yt1-icon-512x512.png',
  'https://www.youtube.com/iframe_api' // Adding YouTube iframe API for caching
];

// Install event - Caching essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - Serving cached resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate event - Clean up old caches
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

// Background Sync API - To handle background tasks like playback
self.addEventListener('message', (event) => {
  if (event.data.action === 'playVideo') {
    // Example: Handle the background playback task (when the video starts)
    // Use Media Session API to control media playback
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Video Title', // Dynamic title here
        artist: 'Artist Name', // Dynamic artist here
        album: 'Album Name', // Optional: Dynamic album name
        artwork: [
          { src: 'https://enosiii.github.io/PWA/YTP/yt1-icon-192x192.png', sizes: '192x192', type: 'image/png' }
        ]
      });

      // Set action handlers for play, pause, etc.
      navigator.mediaSession.setActionHandler('play', () => {
        // Logic to start playback
        console.log('Playback started');
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        // Logic to pause playback
        console.log('Playback paused');
      });

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        // Logic to handle seek backward
        console.log('Seeking backward');
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        // Logic to handle seek forward
        console.log('Seeking forward');
      });
    }

    // Optionally, you can show a notification when video playback starts
    self.registration.showNotification('Video is now playing in the background!');
  }
});
