const filesToCache = [
    '/',
    'index.html',
    'assets/css/style.css',
    'assets/js/app.js',
    'assets/js/apiTransaction.js',
    'assets/favicon/android-chrome-192x192.png',
    'assets/favicon/android-chrome-512x512.png',
    'assets/favicon/favicon-32x32.png',
    'manifest.json'
];

const cacheName = 'imovie-app-v1';

self.addEventListener('install', event => {
    console.log('installing service worker and caching static assets...😎😎');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
               return cache.addAll(filesToCache);
            })
            .then(() => {
                return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', event => {
    console.log('activating service worker...');
    return self.clients.claim();
});


self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // Respond with custom 404 page
                        if (response.status === 404) {
                            return caches.match('./pages/404.html');
                        }

                        return caches.open(staticCacheName)
                            .then(cache => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            });
                    });

            }).catch(error => {
                console.log('You have a ', error);
                //  Respond with custom offline page
                return caches.match('./pages/offline.html');
            })
    );
});