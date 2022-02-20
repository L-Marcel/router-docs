import { Box, Button, ButtonProps, Icon, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { expandToLeft, fadeToTop } from "../../theme/animations";

interface DefaultButtonProps extends ButtonProps {
  children?: ReactNode;
  icon?: IconType;
  isIconButton?: boolean;
  rotateOnHover?: number;
};

function DefaultButton({ 
  rotateOnHover = 0, 
  isIconButton = false, 
  icon, 
  children, 
  ...rest 
}: DefaultButtonProps) {
  const [isHoved, setIsHoved] = useState(false);
  const isSmallVersion = useBreakpointValue({
    md: false,
    lg: false,
    sm: false,
    base: true
  });

  if(isIconButton) {
    return (
      <Box
        position="relative"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        {
          children && (isHoved || isSmallVersion) && <Text
            data-testid="icon-button-text"
            as={motion.p}
            position="absolute"
            pl={2}
            pr="35px"
            mr={2}
            bgColor="primary.400"
            color="white"
            borderRadius={6}
            fontSize={15}
            fontWeight="light"
            whiteSpace="nowrap"
            {...expandToLeft}
          >
            {children}
          </Text>
        }
        <IconButton
          aria-label="icon-button"
          data-testid="icon-button"
          w="min-content"
          icon={<Icon as={icon}/>}
          as={motion.button}
          onMouseEnter={() => setIsHoved(true)}
          onMouseLeave={() => setIsHoved(false)}
          borderRadius={isSmallVersion? "full":"md"}
          whileHover={!isSmallVersion && {
            scale: .9,
            rotate: rotateOnHover,
            borderRadius: rotateOnHover >= 0? "100%":undefined
          }}
          whileTap={{
            scale: .8
          }}
          {...fadeToTop}
          {...rest}
        />
      </Box>
    );
  };

  return (
    <Button
      data-testid="button"
      as={motion.button}
      whileHover={{
        scale: .9,
      }}
      whileTap={{
        scale: .8
      }}
      {...fadeToTop}
      {...rest}
    >
      {icon && <Icon 
        as={icon} 
        mr={1}
        fontSize={18}
      />}{ children }
    </Button>
  );
};

export { DefaultButton };
