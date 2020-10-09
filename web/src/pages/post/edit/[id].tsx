import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { useGetIntId } from "../../../hooks/useGetIntId";
import { useGetPostFromUrl } from "../../../hooks/useGetPostFromUrl";
import { withApollo } from "../../../utils/withApollo";

const EditPost: React.FC = () => {
  const router = useRouter();
  const id = useGetIntId();
  const { data, loading } = useGetPostFromUrl();

  const [handleUpdatePost] = useUpdatePostMutation();

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          // const { error } = await handleCreatePost({ input: values });
          // if (!error) {
          //   router.push("/");
          // }
          await handleUpdatePost({ variables: { id, ...values } });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="Text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              variantColor="teal"
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
