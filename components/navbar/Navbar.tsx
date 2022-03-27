import {
  AppBar,
  Toolbar,
  Container,
  Stack,
  Box,
  Button,
  styled,
} from "@mui/material";
import { MuiLink } from "components/common/Alias";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const redirectUrl = encodeURIComponent(router.asPath);
  return (
    <NavbarBase position="static">
      <Toolbar disableGutters>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link href="/" passHref>
              <MuiLink underline="none">{`ExpenseBook`}</MuiLink>
            </Link>
            <Box flex={1} />

            {/* <Link href="/app" passHref>
              <Button variant="contained" color="primary">
                Go to Dashboard
              </Button>
            </Link> */}
            <Link href="/about" passHref>
              <Button variant="text">About</Button>
            </Link>
            <Link href="/contact" passHref>
              <Button variant="text">Contact</Button>
            </Link>
            {user ? (
              <AccountMenu />
            ) : (
              <>
                <Button variant="text" onClick={() => signIn()}>
                  Sign in
                </Button>
                <Link href={`/signup?redirectUrl=${redirectUrl}`} passHref>
                  <Button variant="contained" color="primary">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Container>
      </Toolbar>
    </NavbarBase>
  );
};

export default Navbar;

const NavbarBase = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));
