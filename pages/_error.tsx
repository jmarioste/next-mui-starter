import { Container, Stack, Typography } from "@mui/material";
import Custom500Svg from "public/500.svg";

function Error({ statusCode }) {
  return (
    <Container maxWidth="sm">
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <Custom500Svg />
        <Typography variant="h4">Internal Server Error {statusCode}</Typography>
        <Typography>
          {`Sorry for the inconvenience! Don't worry, we're already looking into
          it.`}
        </Typography>
      </Stack>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
