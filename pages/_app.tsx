import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { theme } from "components/theme";
import Layout from "components/common/Layout";
import { SessionProvider } from "next-auth/react";
import MyApolloProvider from "lib/ApolloProvider";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(1);
    const handleRouteChangeComplete = () => setLoading(0);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);
  }, []);

  useEffect(() => {
    console.log(loading);
    if (loading > 0) {
      const timer = setTimeout(() => {
        setLoading((prev) => prev + 15);
      }, 50);

      return () => clearTimeout(timer);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <MyApolloProvider>
          <CssBaseline />
          {!!loading && (
            <Box position="fixed" width="100%" top={0}>
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={loading}
              />
            </Box>
          )}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyApolloProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
