const CACHE_NAME = 'fuel-app-v2'; // قمت بتحديث الإصدار لضمان التنشيط
const ASSETS = [
  './',
  './index.html',
  './manifest.json?v=2.0',
  'https://i.ibb.co/vz1f0b0/fuel-app-icon.png' // رابط الأيقونة الجديدة
];

// مرحلة التثبيت: حفظ الملفات الأساسية في الكاش
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// مرحلة التنشيط: مسح الكاش القديم إذا وجد
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// استراتيجية جلب البيانات: الكاش أولاً ثم الشبكة (لتسريع الأداء)
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
