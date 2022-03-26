import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";

const appInitialState = {
  loggedIn: false,
  modalShown: false,
};
type AppState = typeof appInitialState;

export const appStateVar: ReactiveVar<AppState> = makeVar(appInitialState);

appStateVar.onNextChange((state) => {
  navigator.serviceWorker.controller.postMessage({
    type: "state-change",
    state,
  });
});
export const apolloCache = new InMemoryCache({});
