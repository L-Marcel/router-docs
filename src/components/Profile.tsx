import { Avatar, Box, BoxProps, Text, useBreakpointValue } from "@chakra-ui/react";

interface ProfileProps extends BoxProps {
  user: User;
};

function Profile({ user, ...rest }: ProfileProps) {
  const isWideOrNormalVersion = useBreakpointValue({
    md: true,
    base: false
  });

  return (
    <Box
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
        src={user.image}
        name={user.name}
        borderColor="primary.600"
        w={50}
        h={50}
        borderWidth={4}
      />
      {isWideOrNormalVersion && <Box
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
        >{user.name}</Text>
        <Text
          data-testid="email"
          whiteSpace="nowrap"
          fontWeight="light"
          fontSize={14}
          w="100%"
          color="black"
        >{user.email}</Text>
      </Box>}
    </Box>
  );
};

export { Profile };