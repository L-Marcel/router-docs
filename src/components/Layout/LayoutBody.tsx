import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { fadeCascate } from "../../theme/animations";

function _LayoutBody({ children, ...rest }: BoxProps) {
  return (
    <Box
      data-testid="layout"
      as={motion.div}
      w="100vw"
      h="100%"
      minH="100vh"
      p={8}
      flexDir="column"
      {...fadeCascate}
      {...rest}
    >
     {children} 
    </Box>
  );
};

export const LayoutBody = memo(_LayoutBody);