import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";

import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import UpdootSection from "../components/UpdootSection";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        Query failed
        <div>{error?.message}</div>
      </div>
    );
  }

  console.log(error?.message);

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
                //   updateQuery: (prevValues, { fetchMoreResult }): PostsQuery => {
                //     if (!fetchMoreResult) return prevValues;

                //     return {
                //       __typename: "Query",
                //       posts: {
                //         __typename: "PaginatedPosts",
                //         hasMore: fetchMoreResult.posts.hasMore,
                //         posts: [
                //           ...prevValues.posts.posts,
                //           ...fetchMoreResult.posts.posts,
                //         ],
                //       },
                //     };
                //   },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
