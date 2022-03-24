import { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { Box, Container } from "@mui/material";
import { MuiLink } from "components/common/Alias";

const SsrPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      SSR Page
      <Box>
        <Link href={"/another-page"} passHref>
          <MuiLink>To another page</MuiLink>
        </Link>
      </Box>
    </Container>
  );
};

export default SsrPage;

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("inside ssr");
  // await sleep(6000);

  console.log("returning ssr");
  return {
    props: {},
  };
};
