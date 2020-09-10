const cacheName = 'v2';

// call install event
self.addEventListener('install', (e) => {
    console.log('Service worker : installed');
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
        fetch(e.request)
             .then(res => {
                const resClone = res.clone();

                caches.open(cacheName)
                      .then(cache => {
                          cache.put(e.request, resClone);
                      });
                    return res;
             }).catch(err => caches.match(e.request).then(res=> res))
    );
});
