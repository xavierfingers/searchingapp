const CACHE_NAME = 'search-browser-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/partytown-*.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch
        return response || fetch(event.request);
      })
  );
});
