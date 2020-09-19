import React from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { useMutation } from "urql";

import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

interface RegisterProps {}

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      username
    }
  }
}
`;

const Register: React.FC<RegisterProps> = () => {
  const [, handleRegister] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return handleRegister(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              variantColor="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
