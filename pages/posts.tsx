import { Box, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { usePostsQuery } from "_generated/graphql";

const Posts = () => {
  const { data: session } = useSession();
  const { data, loading } = usePostsQuery({
    skip: !session,
  });
  console.log("inside posts", session, !session);
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
