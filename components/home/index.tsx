import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CallToActionButton from "./CallToActionButton";
import Hero from "./Hero.svg";

const HomePage = () => {
  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={6}>
          <Hero />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack alignItems={"flex-start"} spacing={2}>
            <Typography variant="h2" lineHeight="110%">
              Best expense manager in the planet!
            </Typography>
            <Typography>Keep track of your expenses</Typography>
            <Stack direction="row" spacing={2}>
              <CallToActionButton />
              <CallToActionButton variant="outlined">
                Learn more
              </CallToActionButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
