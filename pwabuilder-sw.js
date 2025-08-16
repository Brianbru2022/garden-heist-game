// Basic offline service worker for your game
const CACHE_NAME = "ochil-giant-cache-v1";
const offlineFallbackPage = "offline.html";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([offlineFallbackPage]))
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(resp => {
      return resp || (event.request.mode === "navigate"
        ? caches.match(offlineFallbackPage)
        : undefined);
    }))
  );
});
