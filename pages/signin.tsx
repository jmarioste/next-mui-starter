import { LoadingButton } from "@mui/lab";
import { Alert, Container, Stack, Typography } from "@mui/material";
import FormikTextField from "components/common/FormikTextField";
import PageTransition from "components/common/PageTransition";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const callbackUrl = (router.query.redirectUrl as string) ?? "/";
  const handleSubmit = async (values: SignInSchema) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl,
        redirect: false,
      });
      console.log(response.error);
      if (response.error) {
        setError(response.error);
      } else {
        setError("");
        router.push(callbackUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(error);
  return (
    <>
      <PageTransition />
      <Container maxWidth="sm">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initalValues}
          validationSchema={schema}
          validate={() => {
            setError("");
          }}
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
              {error && <Alert severity="error">{error}</Alert>}
              <LoadingButton type="submit" variant="contained">
                Login
              </LoadingButton>
            </Stack>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default SignIn;
