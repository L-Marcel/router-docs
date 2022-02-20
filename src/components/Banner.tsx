import { Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTop } from "../theme/animations";

interface BannerProps {
  title?: string;
  description?: string;
};

function Banner({ title = "", description = "" }: BannerProps) {
  return (
    <>
      <Heading
        data-testid="title"
        as={motion.h1}
        color="primary.500"
        fontSize={[20, 28, 30]}
        layoutId="title"
        mb={2}
        {...fadeToTop}
      >
        {title}
      </Heading>
      <Text
        data-testid="description"
        as={motion.p}
        maxW={["80%", "50%"]}
        textAlign="center"
        fontSize={[15, 18]}
        mb={5}
        {...fadeToTop}
      >
        {description}
      </Text>
    </>
  );
};

export { Banner };