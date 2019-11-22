const STATIC_CACHE = 'static_v1'
const DYNAMIC_CACHE = 'dynamic_v1'

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[Service Worker] Precaching App Shell');
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/app.js',
                    '/styles.css'
                ]);
            })
    )
});

self.addEventListener("activate", event => {
    console.log("[Service Worker] Activating Service Worker ...", event);
    return self.clients.claim();
});

self.addEventListener("fetch", event => {
    console.log("[Service Worker] Fetching Service Worker ...", event);
    event.respondWith(async function() {
        const cachedResponse = await caches.match(event.request);

        console.log("cachedResponse:", cachedResponse);
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
            .then(fetchResponse => {
                console.log("fetchResponse.url:", fetchResponse.url);
                caches.open(DYNAMIC_CACHE)
                    .then(cache => {
                        cache.put(event.request.url, fetchResponse.clone());
                        return fetchResponse;
                    })
            });
    }());
});
