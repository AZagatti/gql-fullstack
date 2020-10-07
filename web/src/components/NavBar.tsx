import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const NavBar: React.FC = () => {
  const [{ fetching: logoutFetching }, handleLogout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button color="black" as={Link} mr={4}>
            Create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          color="gray.300"
          isLoading={logoutFetching}
          onClick={() => handleLogout()}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" top={0} zIndex={1} bg="purple.500" p={4}>
      <Flex maxW={800} flex={1} m="auto" align="center">
        <NextLink href="/">
          <Link>
            <Heading color="white">LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"} color="white">
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
