import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
// import { useAppStateQuery } from "graphql/local.generated";
import { usePostsQuery } from "graphql/posts.generated";
import { appStateVar } from "lib/apollo/cache";
import { useSession } from "next-auth/react";
import React from "react";

const Posts = () => {
  const { data: session } = useSession();
  const appState = useReactiveVar(appStateVar);
  const { data } = usePostsQuery({
    skip: !session,
  });

  console.log("appState", appState);

  const handleClick = () => {
    appStateVar({
      ...appState,
      modalShown: !appState.modalShown,
    });
  };
  return (
    <Stack spacing={2}>
      <Box>
        <Button onClick={handleClick}>Show Dialog</Button>
        <Dialog open={appState.modalShown}>
          <DialogTitle>My Dialog</DialogTitle>
          <DialogContent>My Content</DialogContent>
          <DialogActions>
            <Button onClick={handleClick}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {data?.posts.map((post) => {
        return (
          <Box key={post._id}>
            <Typography variant="h4">{post.title}</Typography>
            <Typography color="textSecondary">{post.body}</Typography>
          </Box>
        );
      })}
    </Stack>
  );
};

export default Posts;
