import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "components/theme";
import { SessionProvider } from "next-auth/react";
import MyApolloProvider from "lib/apollo/ApolloProvider";
import { ServiceWorkerProvider } from "components/hooks/useServiceWorker";
import { AppStateProvider } from "components/hooks/useAppState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceWorkerProvider>
      <AppStateProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <MyApolloProvider>
              <CssBaseline />

              <Component {...pageProps} />
            </MyApolloProvider>
          </SessionProvider>
        </ThemeProvider>
      </AppStateProvider>
    </ServiceWorkerProvider>
  );
}

export default MyApp;
