/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self;
const version = "1.95";

const staticCacheName = `static-cache-${version}`;

sw.addEventListener("install", function (event) {
  console.log(`ServiceWorker version ${version} installed`);
  sw.skipWaiting();
});

sw.addEventListener("activate", async function (event) {
  let deleteCache = this.caches.keys().then((keys) => {
    const deletes = keys
      .filter((key) => key !== staticCacheName)
      .map((key) => {
        console.log("deleting " + key);
        return this.caches.delete(key);
      });
    return Promise.all(deletes);
  });

  event.waitUntil(
    Promise.all(deleteCache)
      .then(() => {
        console.log("claiming windows");
        return this.clients.claim();
      })
      .then(() => {
        console.log("activated");
      })
  );
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
  // const promise = caches
  //   .match(event.request, {
  //     ignoreSearch: true,
  //   })
  //   .then(async (cachedResponse) => {
  //     if (cachedResponse) {
  //       return cachedResponse;
  //     }
  //     const response = await fetch(event.request);
  //     if (response.url.match(/(_next\/static)|.woff2|.css/i)) {
  //       console.log("Caching:", event.request.url);
  //       const cache = await this.caches.open(staticCacheName);
  //       cache.add(event.request.url, response.clone());
  //     }
  //     return response;
  //   });
  // event.respondWith(promise);
});

console.log(self);
