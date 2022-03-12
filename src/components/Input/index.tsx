import { Icon, Input as ChakraInput, InputGroup, InputLeftElement, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { LegacyRef } from "react";
import { IconType } from "react-icons";
import { fadeToRight, fadeToTop } from "../../theme/animations";

interface InputProps extends ChakraInputProps {
  icon?: IconType;
};

const Input = React.forwardRef(({ icon, maxWidth, ...rest }: InputProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <InputGroup
      as={motion.div}
      w={rest.w}
      whileHover={{
        x: 20
      }}
      whileFocus={{
        x: 20
      }}
      whileTap={{
        x: 20
      }}
      maxWidth={maxWidth}
    >
      {icon && <InputLeftElement
        as={motion.div}
        pointerEvents="none"
        {...fadeToTop}
        children={<Icon as={icon}
          color={rest.color ?? "primary.600"}
        />}
      />}
      <ChakraInput
        ref={ref}
        as={motion.input}
        px={4}
        _focus={{
          borderColor: "primary.500"
        }}
        _hover={{
          borderColor: "primary.500"
        }}
        variant="flushed"
        borderColor="primary.500"
        bgColor="gray.50"
        color="primary.600"
        {...rest}
        {...fadeToRight}
      />
    </InputGroup>
  );
});

export { Input };