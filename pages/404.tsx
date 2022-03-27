import { Container, Stack, Typography } from "@mui/material";
import React from "react";

import Custom404Svg from "public/404.svg";
import Link from "next/link";
import { MuiLink } from "components/common/Alias";
import PageTransition from "components/common/PageTransition";

const NotFoundPage = () => {
  return (
    <>
      <PageTransition />
      <Container maxWidth="sm">
        <Stack height="100vh" alignItems="center" justifyContent="center">
          <Custom404Svg />
          <Typography variant="h4">404 - Page Not found</Typography>
          <Link href="/" passHref>
            <MuiLink>Back to home</MuiLink>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default NotFoundPage;
