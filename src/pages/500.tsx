import { Box, Heading, Img, Text, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { fadeToTop } from "../theme/animations";
import { bg } from "../theme/effects/bg";

function Error() {
  const isWideOrNormalVersion = useBreakpointValue({
    md: true,
    base: false
  });
  
  return (
    <Layout
      title="Routerdocs: Error"
      display="flex"
      justifyContent="center"
      flexDir="row"
      alignItems="center"
    >
      <Img 
        as={motion.img} 
        src="/assets/500.svg"
        position="absolute"
        right={[26, "30%"]}
        bottom={[0, "4%"]}
        sizes="50%"
        alt="A big and red 404 error message with a man with a red shirt and black hair inside the zero number searching something or someone."
        mt={28}
        mb={10}
        {...fadeToTop}
      />
      <Box
        display="flex"
        flexDir="column"
        p={[3, 5]}
        position="relative"
        bottom={0}
        ml={[0, -20]}
        mb={20}
        {...bg({ bg: "primary.50" }) as any}
      >
        <Heading
          data-testid="title"
          as={motion.h1}
          color="primary.600"
          fontSize={[18, 30, 35]}
          layoutId="error-title"
          textAlign="left"
          {...fadeToTop}
        >
          We not found the page
        </Heading>
        <Text
          data-testid="error-description"
          as={motion.p}
          maxW={[350, 350, 450]}
          textAlign={"left"}
          fontSize={[14, 18]}
          mb={2}
          {...fadeToTop}
        >
          Our server refused to render this page. If the problem continue, contact us.
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
    </Layout>
  );
};

export default Error;