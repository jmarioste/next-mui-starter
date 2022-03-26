import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "components/theme";
import Layout from "components/common/Layout";
import { SessionProvider } from "next-auth/react";
import MyApolloProvider from "lib/ApolloProvider";
import PageTransition from "components/common/PageTransition";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <MyApolloProvider>
          <CssBaseline />
          <PageTransition />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyApolloProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
