import {
  AppBar,
  Container,
  Toolbar,
  Link as MuiLink,
  Stack,
  Box,
  Button,
} from "@mui/material";
import AccountMenu from "components/header/AccountMenu";
import Link from "next/link";
import React from "react";
import PageTransition from "./PageTransition";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <PageTransition />
      <AppBar position="static">
        <Toolbar disableGutters>
          <Container maxWidth="lg">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Link href="/" passHref>
                <MuiLink color="#fff" underline="none">{`ExpenseBook`}</MuiLink>
              </Link>
              <Box flex={1} />

              <Link href="/app" passHref>
                <Button variant="text" color="neutral">
                  App
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button variant="text" color="neutral">
                  About
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button variant="text" color="neutral">
                  Contact
                </Button>
              </Link>
              <AccountMenu />
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};

export default Layout;
