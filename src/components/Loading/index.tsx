import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";
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
  mt = -8,
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

  useEffect(() => {

  }, []);

  return (
    <Box
      mt={mt}
      {...rest}
    >
      {title && <Heading
        mt={2}
        color="primary.800"
      >
        {title}
      </Heading>}
      <Text
        color="primary.500"
        fontSize={[18, 24]}
        fontWeight="medium"
        display="flex"
        alignItems="center"
        as={motion.p}
        {...fadeToTop}
      >
        {withCount && <Counter
          suffix={counterSuffix}
          to={counterValue}
          mr="4px"
        />}<Text mb="2px" mr="4px">{">"}</Text><motion.span ref={el}/>
      </Text>
    </Box>
  );
};

export { Loading };