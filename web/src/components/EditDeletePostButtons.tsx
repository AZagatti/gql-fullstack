import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, handleDeletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          ml="auto"
          aria-label="Edit Post"
          icon="edit"
        />
      </NextLink>

      <IconButton
        onClick={() => handleDeletePost({ id: id })}
        ml="auto"
        aria-label="Delete Post"
        icon="delete"
      />
    </Box>
  );
};

export default EditDeletePostButtons;
