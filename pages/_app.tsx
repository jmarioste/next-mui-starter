import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { theme } from "components/theme";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "lib/apollo-client";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const client = getApolloClient();
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
      <ApolloProvider client={client}>
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
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
