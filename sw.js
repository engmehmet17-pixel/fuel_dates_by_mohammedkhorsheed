const CACHE_NAME = 'fuel-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/26fd/512.png'
];

// التثبيت وحفظ الملفات في ذاكرة الهاتف
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
  self.skipWaiting();
});

// تفعيل وضع "الأوفلاين التام"
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
