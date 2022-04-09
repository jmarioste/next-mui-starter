// import { NextLink } from "components/common/NextLink";
import { Box } from "@mui/material";
import Layout from "components/common/Layout";
import HomePage from "components/home";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>ExpenseBook</title>
        <meta name="description" content="Manage your expenses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <HomePage />
      </Box>
    </Layout>
  );
};

export default Home;
