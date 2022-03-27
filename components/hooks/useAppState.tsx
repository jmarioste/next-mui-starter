import { createContext, useContext, useEffect, useState } from "react";
import { UnknownWorkerMessage, useServiceWorker } from "./useServiceWorker";
const defaultValue = {
  modalShown: false,
  isLoggedIn: false,
};

const context = {
  state: defaultValue,
  setContextState: (state: typeof defaultValue) => {},
};

const AppContext = createContext<typeof context>(context);

export type AppServiceWorkerMessage = {
  type: "UPDATE_APPSTATE";
  data: typeof defaultValue;
};

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(context.state);
  const worker = useServiceWorker();
  useEffect(() => {
    const handler = ({ data }) => {
      const _data = data as UnknownWorkerMessage;
      //handle change in AppState coming from service worker
      if (_data?.type === "UPDATE_APPSTATE") {
        setState(_data.data as AppServiceWorkerMessage["data"]);
      }
    };
    navigator.serviceWorker.addEventListener("message", handler);
    return () => {
      navigator.serviceWorker.removeEventListener("message", handler);
    };
  }, []);
  const setContextState = (newState: typeof context["state"]) => {
    setState(newState);
    worker.postMessage({
      type: "UPDATE_APPSTATE",
      data: newState,
    });
  };
  return (
    <AppContext.Provider value={{ state, setContextState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("no AppStateProvider!");
  }
  return context;
};
