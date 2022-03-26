import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import PageTransition from "./PageTransition";

const Layout: React.FC = ({ children }) => {
  const { data: session } = useSession();
  const text = session ? "Sign out" : "Sign in";
  const handleClick = () => {
    if (session?.token) {
      signOut({
        callbackUrl: "/signin",
      });
    } else {
      signIn();
    }
  };
  return (
    <>
      <PageTransition />
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <MuiLink
              flex={1}
              color="#fff"
              underline="none"
            >{`ExpenseBook`}</MuiLink>
          </Link>
          <Typography mr={2}>{session?.user?.email}</Typography>
          {
            <Button onClick={handleClick} variant="contained" color="secondary">
              {text}
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">{children}</Container>
    </>
  );
};

export default Layout;
