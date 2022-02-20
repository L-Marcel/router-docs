import { Avatar, Box, BoxProps, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTop } from "../theme/animations";

declare interface ProfileProps extends BoxProps {
  user: User;
};

function Profile({ user, ...rest }: ProfileProps) {
  return (
    <Box
      as={motion.div}
      data-testid="profile"
      display="inline-flex"
      w="min-content"
      p={2}
      borderRadius={15}
      justifyContent="center"
      alignItems="center" 
      {...rest}
    >
      <Avatar
        data-testid="avatar"
        src={user.avatar}
        borderColor="primary.600"
        borderWidth={4}
        as={motion.div}
        {...fadeToTop}
      />
      <Box
        mx={3}
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Text 
          data-testid="username"
          whiteSpace="nowrap"
          fontSize={18}
          fontWeight="semibold"
          w="100%"
          color="primary.700"
          lineHeight="18px"
          as={motion.p}
          {...fadeToTop}
        >{user.username}</Text>
        <Text
          data-testid="email"
          whiteSpace="nowrap"
          fontWeight="light"
          fontSize={14}
          w="100%"
          color="black"
          as={motion.p}
          {...fadeToTop}
        >{user.email}</Text>
      </Box>
    </Box>
  );
};

export { Profile };