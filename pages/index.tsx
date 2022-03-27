// import { NextLink } from "components/common/NextLink";
import { Box, Link as MuiLink, Typography } from "@mui/material";
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
      </Box>
    </Layout>
  );
};

export default Home;
