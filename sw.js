const CACHE_NAME = 'fuel-v10'; // رفعنا الإصدار للتحديث الإجباري
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/26fd/512.png'
];

// تثبيت ملفات التطبيق في الذاكرة الدائمة للهاتف
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري حفظ الملفات للعمل بدون إنترنت...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// تفعيل النسخة الجديدة فوراً
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
  self.clients.claim();
});

// الاستجابة من الذاكرة حتى لو لا يوجد إنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).catch(() => {
        // إذا فشل الإنترنت ولم يجد الملف في الكاش، لا يظهر صفحة خطأ جوجل
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
