const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'elements.html',
    'generic.html',
    '/assets/css/main.css',
    '/assets/css/font-awesome.min.css',
    '/assets/js/breakpoints.min.js',
    '/assets/js/browser.min.js',
    '/assets/js/jquery.min.js',
    '/assets/js/main.js',
    '/assets/js/util.js',
    '/images/banner.jpg',
    '/images/banner.mp4',
    '/images/bg.jpg',
    '/images/cta01.jpg',
    '/images/pic01.jpg',
    '/images/pic02.jpg',
    '/images/pic03.jpg'
]

// call install event
self.addEventListener('install', (e) => {
    console.log('Service worker : installed');
    e.waitUntil(
        caches.open(cacheName)
              .then(cache => {
                  console.log('Service worker : Caching files');
                  cache.addAll(cacheAssets);
              })
              .then(() => self.skipWaiting())
              .catch((err) => console.log(err,'test'))
    );
});

// call install event
self.addEventListener('activate', (e) => {
    console.log('Service worker : activated');
    e.waitUntil(
        caches.keys().then(cahceNames => {
            return Promise.all(
                cahceNames.map(cache => {
                    if( cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// call fetch event
self.addEventListener('fetch',(e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
