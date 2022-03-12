import { Box, BoxProps, Img } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LoadingImageBar } from "./LoadingImageBar";

interface LoadingImageBarProps extends BoxProps {
  endPercent?: number;
  increment?: number;
  autoIncrement?: boolean;
  startPercent?: number;
  onEndLoading?: () => void;
};

function LoadingImage({ 
  endPercent, 
  increment, 
  autoIncrement, 
  startPercent,
  onEndLoading,
  ...rest 
}: LoadingImageBarProps) {
  return (
    <Box
      as={motion.div}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="max-content"
      {...rest}
    >
      <LoadingImageBar
        {...{
          endPercent, 
          increment, 
          autoIncrement, 
          startPercent,
          onEndLoading
        }}
      />
      <Img 
        src="/assets/loading.svg"
        position="absolute"
      />
    </Box>
  );
};

export { LoadingImage };