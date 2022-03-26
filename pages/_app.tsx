import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "components/theme";
import Layout from "components/common/Layout";
import { SessionProvider } from "next-auth/react";
import MyApolloProvider from "lib/apollo/ApolloProvider";
import { useServiceWorker } from "components/hooks/useServiceWorker";

function MyApp({ Component, pageProps }: AppProps) {
  useServiceWorker();

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <MyApolloProvider>
          <CssBaseline />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyApolloProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
