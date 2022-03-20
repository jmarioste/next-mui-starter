import { Container, Stack, Typography } from "@mui/material";
import React from "react";
// import Image from "next/image";
import Custom500Svg from "public/500.svg";

const Custom500Page = () => {
  return (
    <Container maxWidth="sm">
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <Custom500Svg />
        <Typography variant="h4">Internal Server Error</Typography>
        <Typography>
          {`Sorry for the inconvenience! Don't worry, we're already looking into
          it.`}
        </Typography>
      </Stack>
    </Container>
  );
};

export default Custom500Page;
