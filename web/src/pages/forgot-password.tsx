import { Box, Flex, Link, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import { useState } from "react";

import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const ForgotPassword: React.FC = () => {
  const [complete, setComplete] = useState(false);
  const [handleForgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await handleForgotPassword({variables: values});
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              If an account with that email exists, we sent you can email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
              <Flex mt={2}>
                <NextLink href="/login">
                  <Link ml="auto">Login?</Link>
                </NextLink>
              </Flex>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                variantColor="teal"
              >
                Login
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
