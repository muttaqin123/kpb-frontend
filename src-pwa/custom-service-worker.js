/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching'

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)
self.addEventListener('fetch', function (event) {
  // Intercept fetch events dan tambahkan header Cache-Control: no-cache
  event.respondWith(
    fetch(event.request, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
  )
})
