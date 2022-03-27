import { Container } from "@mui/material";
import Navbar from "components/navbar/Navbar";
import React from "react";
import PageTransition from "./PageTransition";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <PageTransition />
      <Navbar />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};

export default Layout;
