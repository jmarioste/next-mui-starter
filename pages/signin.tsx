import { LoadingButton } from "@mui/lab";
import { Container, Stack, Typography } from "@mui/material";
import FormikTextField from "components/common/FormikTextField";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import React from "react";
import { object, string, TypeOf } from "yup";

const schema = object({
  email: string().email().required(),
  password: string().required(),
});

type SignInSchema = TypeOf<typeof schema>;
const initalValues: SignInSchema = {
  email: "",
  password: "",
};

const SignUp = () => {
  const handleSubmit = (values: SignInSchema) => {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
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
            <Typography variant="h4" align="center">
              Sign in
            </Typography>
            <FormikTextField name="email" label="email"></FormikTextField>
            <FormikTextField
              name="password"
              label="password"
              type="password"
            ></FormikTextField>
            <LoadingButton type="submit" variant="contained">
              Login
            </LoadingButton>
          </Stack>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignUp;
