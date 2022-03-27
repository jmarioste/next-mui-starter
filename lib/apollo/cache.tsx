import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
const isServer = typeof window === "undefined";
const appInitials = {
  modalShown: false,
  isLoggedIn: false,
};
type AppState = typeof appInitials;

const appInitialState =
  (!isServer && JSON.parse(localStorage.getItem("app-state"))) ?? appInitials;

export const appStateVar: ReactiveVar<AppState> = makeVar(appInitialState);

export const apolloCache = new InMemoryCache({});

// appStateVar.attachCache(apolloCache);
