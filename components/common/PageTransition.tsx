import { Box, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PageTransition = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(1);
    const handleRouteChangeComplete = () => setLoading(0);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading > 0) {
      const timer = setTimeout(() => {
        setLoading((prev) => prev + 15);
      }, 50);

      return () => clearTimeout(timer);
    }
  });

  return (
    !!loading && (
      <Box position="fixed" width="100%" top={0}>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={loading}
        />
      </Box>
    )
  );
};
export default PageTransition;
