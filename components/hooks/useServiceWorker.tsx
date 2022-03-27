import { createContext, useContext, useEffect, useState } from "react";

const ServiceWorkerContext = createContext<{ worker: ServiceWorker }>(null);
export type UnknownWorkerMessage = {
  type: unknown;
  data: unknown;
};

export const ServiceWorkerProvider: React.FC = ({ children }) => {
  const [worker, setWorker] = useState<ServiceWorker>(null);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const nsw = navigator.serviceWorker;
      const onLoad = async () => {
        try {
          await nsw.register("/service-worker.js");
          console.log("Service Worker registration successful");
          if (nsw.controller) {
            setWorker(nsw.controller);
          }

          nsw.oncontrollerchange = (ev) => {
            console.log("new service worker activated");
          };
        } catch (e) {
          console.log("Service Worker registration failed: ", e);
        }
      };

      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
      };
    }
  }, []);

  return (
    <ServiceWorkerContext.Provider value={{ worker }}>
      {children}
    </ServiceWorkerContext.Provider>
  );
};

/**
 * Installs public/service-worker.js
 * @returns
 */
export const useServiceWorker = () => {
  const context = useContext(ServiceWorkerContext);
  if (!context) {
    throw new Error("ServiceWorkerProvider not in parent component!");
  }
  return context.worker;
};
