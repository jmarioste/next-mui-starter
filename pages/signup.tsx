import { Alert, Container, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf } from "yup";
import { signIn } from "next-auth/react";
import { useSignupMutation } from "graphql/user.generated";
import FormikTextField from "components/common/FormikTextField";
import Link from "next/link";
import PageTransition from "components/common/PageTransition";

const schema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
});

type SignupSchema = TypeOf<typeof schema>;
const initalValues: SignupSchema = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [signup, { loading, error: signUpErr }] = useSignupMutation();
  // const [error, setError] = useState("");
  const handleSubmit = (values: SignupSchema) => {
    signup({
      variables: {
        input: values,
      },
      onCompleted() {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/",
        });
      },
      onError() {},
    });
  };
  return (
    <>
      <PageTransition />
      <Container maxWidth="sm">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initalValues}
          validationSchema={schema}
        >
          <Form>
            <Stack spacing={1} justifyContent="center" height="100vh">
              <Typography variant="h4" align="center" mb={2}>
                Sign up
              </Typography>
              <FormikTextField name="name" label="name"></FormikTextField>
              <FormikTextField name="email" label="email"></FormikTextField>
              <FormikTextField
                name="password"
                label="password"
                type="password"
              ></FormikTextField>
              {signUpErr && <Alert severity="error">{signUpErr.message}</Alert>}
              <Stack direction="row" spacing={1}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading && !signUpErr}
                >
                  Create account
                </LoadingButton>
                <Link href="/signin" passHref>
                  <LoadingButton variant="outlined">
                    Already have an account?
                  </LoadingButton>
                </Link>
              </Stack>
            </Stack>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default SignUp;
