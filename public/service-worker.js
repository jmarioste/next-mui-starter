/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self;
const version = "1.3";

const staticCacheName = "pages-cache-v1";
sw.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker  4🤙");
  // event.waitUntil(
  //   caches
  //     .open(staticCacheName)
  //     .then((cache) => cache.addAll(precacheResources))
  // );
  this.skipWaiting();
});

sw.addEventListener("activate", async function (event) {
  console.log("activated");
  await this.clients.claim();
  console.log("service worker has now claimed all the pages");
});

sw.addEventListener("message", async function (event) {
  console.log("message", event.data);

  let allClients = await this.clients.matchAll({
    includeUncontrolled: true,
  });
  allClients = allClients.filter((client) => client.id !== event.source.id);
  allClients.map((client) => client.postMessage(event.data));
});

sw.addEventListener("fetch", function (event) {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(async (cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      const response = await fetch(event.request);
      if (
        response.headers.has("content-type") &&
        response.headers.get("content-type").match(/font/i)
      ) {
        const cache = await this.caches.open(staticCacheName);
        cache.add(event.request.url, response);
      }

      return response;
    })
  );
});

console.log(self);
