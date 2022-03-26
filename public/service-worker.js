/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self;

sw.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker  4🤙");
});

sw.addEventListener("activate", function (event) {
  console.log("activated");
});

sw.addEventListener("message", function (event) {
  console.log("message", event.data);
});

sw.addEventListener("fetch", function (event) {
  // console.log("fetch", event.request);
});

console.log(self);
