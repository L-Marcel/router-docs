import { Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { fadeToTop } from "../../theme/animations";

interface LoadingProps {
  title?: string;
  strings?: string[];
};

function Loading({ title, strings }: LoadingProps) {
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
      loop: true,
      typeSpeed: 24,
      backDelay: 2000,
      backSpeed: 24,
      cursorChar: "_",
    });
    
    return () => typed.current.destroy();
  }, []);

  return (
    <>
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
        as={motion.p}
        {...fadeToTop}
      >
        <motion.span ref={el}/>
      </Text>
    </>
  );
};

export { Loading };