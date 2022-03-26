import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, Typography } from "@mui/material";
import FormikTextField from "components/common/FormikTextField";
import { Form, Formik } from "formik";
import React from "react";
import { object, string, TypeOf } from "yup";
import { useSignupMutation } from "_generated/graphql";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
  const [signup, { loading }] = useSignupMutation();
  const handleSubmit = (values: SignupSchema) => {
    signup({
      variables: {
        input: values,
      },
      onCompleted: () => {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/",
        });
      },
    });
  };
  return (
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
            <Stack direction="row" spacing={1}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
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
  );
};

export default SignUp;
