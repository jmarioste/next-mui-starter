import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "components/theme";
import Layout from "components/common/Layout";
import { SessionProvider } from "next-auth/react";
import MyApolloProvider from "lib/ApolloProvider";

function MyApp({ Component, pageProps }: AppProps) {
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
