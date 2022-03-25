import { ButtonProps as CButtonProps, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { DefaultButton } from "./DefaultButton";

interface ButtonProps extends CButtonProps {
  children?: ReactNode;
  href?: string;
  icon?: IconType;
  isIconButton?: boolean;
  rotateOnHover?: number;
};

function Button({ 
  icon, 
  children, 
  href, 
  ...rest
}: ButtonProps) {
  if(href) {
    return (
      <NextLink
        href={href}
        passHref
        data-testid="link"
      >
        <Link
          tabIndex={-1}
          _hover={{
            textDecoration: null
          }}
          ml={rest.ml}
          mt={rest.mt}
          mr={rest.mr}
          mb={rest.mb}
        >
          <DefaultButton
            icon={icon}
            {...rest}
            ml={0}
            mt={0}
            mr={0}
            mb={0}
          >
            {children}
          </DefaultButton>
        </Link>
      </NextLink>
    );
  };

  return (
    <DefaultButton icon={icon} {...rest}>
      {children}
    </DefaultButton>
  );
};

export { Button };