import { useEffect } from "react";

/**
 * Installs public/service-worker.js
 * @returns
 */
export const useServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });

      if (navigator.serviceWorker.controller) {
        console.log("we have a new service worker installed");
      }

      navigator.serviceWorker.oncontrollerchange = (ev) => {
        console.log("new service worker activated");
      };

      // navigator.serviceWorker.getRegistrations().then(async (regs) => {
      //   for (let reg of regs) {
      //     try {
      //       await reg.unregister();
      //       console.log(`deleted`);
      //     } catch (e) {}
      //   }
      // });
    }
  }, []);

  return true;
};
