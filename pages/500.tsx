import { Container, Stack, Typography } from "@mui/material";
import React from "react";
// import Image from "next/image";
import Custom500Svg from "public/500.svg";
import Link from "next/link";
import { MuiLink } from "components/common/Alias";
import PageTransition from "components/common/PageTransition";

const Custom500Page = () => {
  return (
    <>
      <PageTransition />
      <Container maxWidth="sm">
        <Stack height="100vh" alignItems="center" justifyContent="center">
          <Custom500Svg />
          <Typography variant="h4">Internal Server Error</Typography>
          <Typography>
            {`Don't worry, we're already looking into
          it.`}
          </Typography>
          <Link href="/" passHref prefetch={false}>
            <MuiLink>Back to home</MuiLink>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default Custom500Page;
