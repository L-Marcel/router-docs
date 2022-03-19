import { Box, BoxProps, Heading, Img, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeCascate, fadeToTop, zeroGravityReverse } from "../../theme/animations";
import { Button } from "../Button";
import { SearchWithoutResultImageGirl } from "./SearchingWithoutResultImageGirl";

function SearchWithoutResultImage({ ...rest }: BoxProps) {
  return (
    <Box
      as={motion.div}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir={["column", "column", "row"]}
      ml={[-10, undefined]}
      {...rest}
      {...fadeCascate}
    >
      <Box
        as={motion.div}
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="max-content"
        maxW="80vw"
        mt={[5, 5, undefined]}
        ml={[-12, -12, undefined]}
        {...fadeToTop}
      >
        <SearchWithoutResultImageGirl/>
        <Img
          as={motion.img}
          src="/assets/searching.svg"
          alt="A girl with orange hair, white shirt and black pants floating in zero gravity inside a crazy space."
          {...zeroGravityReverse as any}
        />
      </Box>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        maxW={["85%", "85%", "50%"]}
        mt={[12, 12, undefined]}
      >
        <Heading
          data-testid="title"
          as={motion.h1}
          color="primary.500"
          fontSize={[20, 28, 30]}
          layoutId="title"
          textAlign="left"
          mb={2}
          {...fadeToTop}
        >
          Sorry, we couldn't found any projects
        </Heading>
        <Text
          data-testid="description"
          as={motion.p}
          maxW={["90%", "90%", "80%"]}
          textAlign="left"
          fontSize={[15, 18]}
          mb={5}
          {...fadeToTop}
        >
          Something is wrong and we can't found any project. It's too possible that you don't have any projects yet. You can create a project now!
        </Text>
        <Button
          px={4}
          colorScheme="primary"
          display="flex"
          justifyContent="center"
          alignItems="center"
          href="/me/projects/create"
        >
          add project
        </Button>
      </Box>
    </Box>
  );
};

export { SearchWithoutResultImage };