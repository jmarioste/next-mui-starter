import { Container, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { MuiLink, Text } from "components/common/Alias";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
};
const AnotherPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : 1;
  const nextPage = page + 1;
  const prevPage = Math.max(1, page - 1);
  return (
    <Container maxWidth="sm">
      <Box my={2}>
        <Text variant="h3"> Items</Text>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" justifyContent="space-between">
          <Link href={`/another-page?page=${prevPage}`} passHref>
            <MuiLink>Back</MuiLink>
          </Link>
          <Link href={`/another-page?page=${nextPage}`} passHref>
            <MuiLink>Next</MuiLink>
          </Link>
        </Stack>
        <Stack spacing={2}>
          {props.posts.map((p) => {
            return (
              <Stack key={p.id}>
                <Text variant="h5" fontWeight={700} textTransform="capitalize">
                  {p.title}
                </Text>
                <Text mt={1} color="GrayText">
                  {p.body}
                </Text>
              </Stack>
            );
          })}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Link href={`/another-page?page=${prevPage}`} passHref>
            <MuiLink>Back</MuiLink>
          </Link>
          <Link href={`/another-page?page=${nextPage}`} passHref>
            <MuiLink>Next</MuiLink>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default AnotherPage;
// interface IQuery extends ParsedUrlQuery {
//   page: string;
// }
type ServerProps = GetServerSideProps<Props>;
export const getServerSideProps: ServerProps = async (ctx) => {
  let page = 1;
  if (typeof ctx.query.page === "string") {
    page = parseInt(ctx.query.page);
  }
  console.log("inside ssr", page);

  const response = await axios.get<Props["posts"]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return {
    props: {
      posts: response.data.slice((page - 1) * 10, page * 10),
    },
  };
};
