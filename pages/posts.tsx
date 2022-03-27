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
import { useAppState } from "components/hooks/useAppState";
import { usePostsQuery } from "graphql/posts.generated";
import { useSession } from "next-auth/react";

const Posts = () => {
  const { data: session } = useSession();
  const { state, setContextState } = useAppState();
  const { data } = usePostsQuery({
    skip: !session,
    fetchPolicy: "network-only",
  });

  const handleClick = () => {
    setContextState({
      ...state,
      modalShown: !state.modalShown,
    });
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Button onClick={handleClick}>Show Dialog</Button>
        <Dialog open={state.modalShown}>
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
