import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Layout: React.FC = ({ children }) => {
  const { data: session } = useSession();
  return (
    <Container maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography flex={1}>{`ExpenseBook`}</Typography>
          <Typography mr={2}>{session?.user?.email}</Typography>
          {session && (
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: "/signin",
                })
              }
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  );
};

export default Layout;
