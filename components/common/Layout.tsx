import {
  AppBar,
  Container,
  Toolbar,
  Link as MuiLink,
  Stack,
  Box,
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
            <Stack direction="row" alignItems="center">
              <Link href="/" passHref>
                <MuiLink color="#fff" underline="none">{`ExpenseBook`}</MuiLink>
              </Link>
              <Box flex={1} />
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
