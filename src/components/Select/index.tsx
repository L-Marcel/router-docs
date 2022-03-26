import { Box, BoxProps, FormHelperText, Tag, Text } from "@chakra-ui/react";
import ReactSelect, { StylesConfig } from "react-select";
import { m } from "framer-motion";
import { fadeToRight } from "../../theme/animations";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode, useState } from "react";

interface SelectProps extends BoxProps {
  options: SelectOption[];
  register?: UseFormRegisterReturn;
  selectStyles?: StylesConfig;
  labelFormat?: (data) => ReactNode;
  error?: string;
  value?: any;
  onChange?: (value: any) => void;
};

function Select({ 
  options, 
  onChange, 
  children,
  maxW = ["90%", "80%", "50%", "30%", "35%", "40%"],
  placeholder,
  borderRadius = 0,
  register,
  selectStyles,
  labelFormat,
  error,
  value,
  ...rest 
}: SelectProps) {
  const [hover, setHover] = useState(false);
  const [isFirstHover, setIsFirstHover] = useState(true);

  return (
    <>
      <Box
        as={m.div}
        zIndex={90}
        w="100%"
        filter="drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))"
        variants={{
          hidden: fadeToRight.variants.hidden,
          visible: {
            ...fadeToRight.variants.visible,
            filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))"
          },
          hover: {
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            opacity: 1,
            x: 0
          }
        }}
        animate={
          isFirstHover? undefined:
          hover? "hover":"visible"
        }
        onHoverStart={() => {
          if(isFirstHover) {
            setIsFirstHover(false);
          };
          setHover(true);
        }}
        onHoverEnd={() => setHover(false)}
        {...rest}
        className={undefined}
        maxW={maxW}
      >
        <Box
          as={m.div}
          w="100%"
          animate="visible"
        >
          <ReactSelect
            placeholder={placeholder}
            className={rest.className}      
            styles={selectStyles}
            options={options}
            {...register}
            formatOptionLabel={labelFormat}
            onChange={(newValue: SelectOption) => {
              setHover(false);

              const ev = { target: { 
                value: newValue.value,
                name: register?.name
              }};

              register?.onChange(ev);
              onChange && onChange(ev.target.value);
            }}
          />
        </Box>
      </Box>
      { error && <FormHelperText
        color="primary.700"
        ml="5px !important"
        mt="5px !important"
      >
        {error.slice(0, 1).toUpperCase() + error.slice(1, error.length)}
      </FormHelperText> }
    </>
  );
};

export { Select };