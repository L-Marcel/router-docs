import { FormHelperText, Icon, Input as ChakraInput, InputGroup, InputLeftElement, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import React, { LegacyRef } from "react";
import { IconType } from "react-icons";
import { fadeToRight, fadeToTop } from "../../theme/animations";

interface InputProps extends ChakraInputProps {
  icon?: IconType;
  error?: string;
};

const Input = React.forwardRef(({ 
  icon,
  error,
  maxWidth = ["90%", "80%", "50%", "30%", "35%", "40%"], 
  ...rest 
}: InputProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <>
      <InputGroup
        as={m.div}
        w={rest.w}
        filter="drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))"
        whileHover={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
        whileTap={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
        maxWidth={maxWidth}
      >
        {icon && <InputLeftElement
          as={m.div}
          pointerEvents="none"
          {...fadeToTop}
          children={<Icon as={icon}
            color={rest.color ?? "primary.600"}
          />}
        />}
        <ChakraInput
          ref={ref}
          as={m.input}
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
          borderLeft="none"
          borderRight="none"
          borderTop="none"
        />
      </InputGroup>
      { error && <FormHelperText
        color="primary.700"
        ml="5px !important"
        mt="5px !important"
      >
        {error.slice(0, 1).toUpperCase() + error.slice(1, error.length)}
      </FormHelperText> }
    </>
  );
});

export { Input };