/* eslint-disable */

importScripts(
  '/workbox-v3.3.1/workbox-background-sync.prod.js',
  '/workbox-v3.3.1/workbox-broadcast-cache-update.prod.js',
  '/workbox-v3.3.1/workbox-cache-expiration.prod.js',
  '/workbox-v3.3.1/workbox-cacheable-response.prod.js',
  '/workbox-v3.3.1/workbox-core.prod.js',
  '/workbox-v3.3.1/workbox-google-analytics.prod.js',
  '/workbox-v3.3.1/workbox-precaching.prod.js',
  '/workbox-v3.3.1/workbox-range-requests.prod.js',
  '/workbox-v3.3.1/workbox-routing.prod.js',
  '/workbox-v3.3.1/workbox-strategies.prod.js',
  '/workbox-v3.3.1/workbox-streams.prod.js',
);

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});