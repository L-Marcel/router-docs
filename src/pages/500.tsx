import { Box, Heading, Img, Text, useBreakpointValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { fadeToTop } from "../theme/animations";

function Error() {
  const isWideOrNormalVersion = useBreakpointValue({
    md: true,
    base: false
  });
  
  return (
    <Layout
      position="fixed"
      title="Routerdocs: Error"
      display="flex"
      justifyContent="center"
      flexDir="row"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDir="column"
        p={[3, 5]}
        position="relative"
        bottom={0}
        ml={[0, -20]}
        mb={20}
      >
        <Heading
          data-testid="title"
          as={m.h1}
          color="primary.600"
          fontSize={[18, 30, 35]}
          layoutId="error-title"
          textAlign="left"
          {...fadeToTop}
        >
          Internal erro
        </Heading>
        <Text
          data-testid="error-description"
          as={m.p}
          maxW={[350, 350, 450]}
          textAlign={"left"}
          fontSize={[14, 18]}
          mb={2}
          {...fadeToTop}
        >
          We received an error on the server and are working to fix then. Please, try again.
        </Text>
        <Button
          colorScheme="primary"
          href="/me/projects"
          display="inline-flex"
          inlineSize="min-content"
          mt={[null, 1]}
          size={isWideOrNormalVersion? "md":"sm"}
        >
          Voltar
        </Button>
      </Box>
      <Img 
        as={m.img} 
        src="/assets/error.svg"
        height={["180px", "250px"]}
        position="absolute"
        right={[25, 130, 130, 130, "30%"]}
        bottom={["18%", "12%", "13%", "14%", "12%"]}
        sizes="50%"
        alt="A big and red 404 error message with a man with a red shirt and black hair inside the zero number searching something or someone."
        mt={28}
        mb={10}
        {...fadeToTop}
      />
    </Layout>
  );
};

export default Error;