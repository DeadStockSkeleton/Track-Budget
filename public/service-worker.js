const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
// install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static').then( cache => {
      return cache.addAll([
        './',
        './index.html',
        './icon.png',
        './script.js',
        '/manifest.webmanifest',
        '/db.js'
      ]);
    })
  );
  console.log('Install');
  self.skipWaiting();
});

self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(DATA_CACHE_NAME).then((data)=>{
      return (event.request).then((res) => {
        cache.put(event.request.url, res.clone())
        return res
      })
    }).catch(() => {
      // Network request failed, try to get it from the cache.
      return cache.match(event.request);
    })
  );
});
