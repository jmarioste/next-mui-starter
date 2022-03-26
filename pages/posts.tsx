import { Box, Stack, Typography } from "@mui/material";
import { usePostsQuery } from "graphql/posts.generated";
import { useSession } from "next-auth/react";
import React from "react";

const Posts = () => {
  const { data: session } = useSession();
  const { data } = usePostsQuery({
    skip: !session,
  });
  return (
    <Stack spacing={2}>
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
