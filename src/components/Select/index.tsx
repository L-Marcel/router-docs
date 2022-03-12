import { Box, BoxProps } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { motion } from "framer-motion";
import { fadeToRight } from "../../theme/animations";
import { createProjectFormStyle } from "../../theme/select/createProjectFormStyle";

interface SelectProps extends BoxProps {
  options: SelectOption[];
  onChange: (v) => void;
};

function Select({ options, onChange, children, ...rest }: SelectProps) {
  return (
    <Box
      as={motion.div}
      whileHover={{
        x: 20
      }}
      whileFocus={{
        x: 20
      }}
      whileTap={{
        x: 20
      }}
      zIndex={90}
      {...rest}
      className={undefined}
    >
      <Box
        as={motion.div}
        {...fadeToRight}
      >
        <ReactSelect
          placeholder="Select repository"
          className={rest.className}      
          styles={createProjectFormStyle}
          options={options}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};

export { Select };