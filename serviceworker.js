self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
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

self.addEventListener("activate", function(event) {
    console.log("[Service Worker] Activating Service Worker ...", event);
    return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
    console.log("[Service Worker] Fetching Service Worker ...", event);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function(res) {
                            caches.open('dynamic')
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        });
                }
            })
    );
});
