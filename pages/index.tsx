// import { NextLink } from "components/common/NextLink";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "components/common/Image";
import Layout from "components/common/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>ExpenseBook</title>
        <meta name="description" content="Manage your expenses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Typography variant="h4">
          <strong>Expense</strong>Book
        </Typography>
        <Link href={"/posts"} passHref>
          <MuiLink>Posts</MuiLink>
        </Link>
        <Box position={"relative"} width="100%" height="800px">
          <Image
            src={"/non-existent.png"}
            layout="fill"
            objectFit="cover"
            alt="bg"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
