const CACHE_NAME = 'fuel-app-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://i.ibb.co/vz1f0b0/fuel-app-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
