const CACHE_NAME = 'my-story-v1';

// Keshlanadigan barcha zaruriy fayllar va resurslar ro'yxati
const ASSETS_TO_CACHE = [
    './',
    './jestalon.html',
    './style.css',
    './script.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap',
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
];

// Service Worker o'rnatilishi va resurslarni keshga saqlash
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Barcha resurslar keshlanmoqda...');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Eski kesh ma'lumotlarini tozalash va faollashtirish
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Eski kesh tozalandi:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// So'rovlarni tutib qolish: Avval keshdan qidiradi, bo'lmasa tarmoqdan yuklaydi
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                // Tarmoqdan kelgan yangi resursni ham keshga qo'shib qo'yish
                if (event.request.method === 'GET' && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            });
        }).catch(() => {
            // Agar internet bo'lmasa va keshda topilmasa, asosiy sahifani qaytaradi
            if (event.request.mode === 'navigate') {
                return caches.match('./jestalon.html');
            }
        })
    );
});
