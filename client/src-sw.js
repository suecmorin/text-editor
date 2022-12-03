const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { request } = require('express');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching--credit Chrome Developers "caching resources during runtime"
const scriptsRoute = new Route(({ request }) => {
  return request.destination === 'script';
}, new CacheFirst ({
     cacheName: 'scripts',
     plugins: [
        new ExpirationPlugin({
             maxEntries: 50,
        })
     ]
}));

const stylesRoute= new Route(({ request }) => {
  return request.destination === 'style';
}, new CacheFirst ({
     cacheName: 'styles',
     plugins: [
      new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30,
      })
     ]
}));
registerRoute(scriptsRoute);
registerRoute(stylesRoute);

