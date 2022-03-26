import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

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
    <Container maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Link href="/" passHref>
            <Typography flex={1} component="a">{`ExpenseBook`}</Typography>
          </Link>
          <Typography mr={2}>{session?.user?.email}</Typography>
          {
            <Button onClick={handleClick} variant="contained" color="secondary">
              {text}
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Box mt={10}>{children}</Box>
    </Container>
  );
};

export default Layout;
