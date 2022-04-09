import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "components/theme";
import { SessionProvider } from "next-auth/react";
import MyApolloProvider from "lib/apollo/ApolloProvider";
import { ServiceWorkerProvider } from "components/hooks/useServiceWorker";
import { AppStateProvider } from "components/hooks/useAppState";
import { NextPage } from "next";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
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
};

export default MyApp;
