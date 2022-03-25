import { Box, BoxProps, Heading, Progress, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { fadeToTop } from "../../theme/animations";
import { Counter } from "../Counter";

interface LoadingProps extends BoxProps {
  title?: string;
  strings?: string[];
  loop?: boolean;
  withCount?: boolean;
  counterValue?: number;
  counterSuffix?: string;
};

function Loading({ 
  title, 
  strings,
  loop = true,
  withCount = false,
  counterValue = 0,
  counterSuffix,
  mt = [8, 0, 0, -8, -8],
  ml = [8, 0, 0, -8, -8],
  ...rest 
}: LoadingProps) {
	const el = useRef(null);
	const typed = useRef(null);

  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: strings || [
        "Creating an universe...",
        "Searching your name...",
        "Exploring the prismatic elements...",
        "Running with express...",
        "Filtering awesome blank pages...",
        "Destroing the world...",
        "Calculating anything..."
      ],
      loop,
      typeSpeed: 24,
      backDelay: 2000,
      backSpeed: 24,
      cursorChar: "_",
    });
    
    return () => typed.current.destroy();
  }, [strings, loop, typed]);
  
  return (
    <>
      <Progress
        colorScheme="primary"
        isIndeterminate={!withCount}
        value={counterValue}
        position="absolute"
        h="5px"
        top={0}
        left={0}
        w="100%"
        zIndex={100}
      />
      <Box
        mt={mt}
        ml={ml}
        position="absolute"
        display="flex"
        flexDir="column"
        top={0}
        left={0}
        right={[null, 0, 0, 0, 0]}
        bottom={[null, 0, 0, 0, 0]}
        justifyContent="center"
        alignItems="center"
        {...rest}
      >
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          {title && <Heading
            as={motion.h1}
            mt={2}
            fontSize={[18, 24, 30]}
            color="primary.800"
            {...fadeToTop}
          >
            {title}
          </Heading>}
          <Box
            color="primary.500"
            fontSize={[18, 24]}
            fontWeight="medium"
            display="flex"
            alignItems="center"
            as={motion.div}
            {...fadeToTop}
          >
            {withCount && <Counter
              suffix={counterSuffix}
              to={counterValue}
              mr="4px"
            />}<Text mb="2px" alignSelf="flex-start" mr="4px">{">"}</Text><motion.span ref={el}/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Loading };