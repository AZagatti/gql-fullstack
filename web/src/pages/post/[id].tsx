import { Box, Heading } from "@chakra-ui/core";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";

import Layout from "../../components/Layout";
import { useGetPostFromUrl } from "../../hooks/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

const Post: React.FC = () => {
  const { data, loading } = useGetPostFromUrl();

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
    <Layout>
      <Heading>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
