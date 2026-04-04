const CACHE_NAME = 'fuel-v20'; // رفعنا الإصدار لضمان تحديث الهاتف
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/26fd/512.png'
];

// تثبيت التطبيق وحفظ الملفات فوراً
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); 
});

// تفعيل النسخة الجديدة وحذف أي قديم
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

// الاستراتيجية الذهبية: افتح من الذاكرة أولاً، وإذا فشلت اذهب للإنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      // إذا وجد الملف في ذاكرة الهاتف، أرجعه فوراً (وهذا يمنع رسالة "لا يتوفر إنترنت")
      if (cachedResponse) {
        return cachedResponse;
      }
      // إذا لم يجده، اطلبه من الإنترنت
      return fetch(e.request);
    })
  );
});
