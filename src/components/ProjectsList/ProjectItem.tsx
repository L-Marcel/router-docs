import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTop } from "../../theme/animations";
import { bg } from "../../theme/effects/bg";

function ProjectItem() {
  return (
    <Box
      as={motion.div}
      display="flex"
      w="100%"
      h={250}
      cursor="pointer"
      whileHover={{
        scale: .98,
      }}
      whileTap={{
        scale: .95
      }}
      {...bg({ 
        bg: "gray.50", 
        hoverEffect: true,
        borderBottomColor: "primary.400",
        borderBottomWidth: 5,
        opacity: 1
      }) as any}
      {...fadeToTop}
    >
    </Box>
  );
};

export { ProjectItem };