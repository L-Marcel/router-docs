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

function Button({ icon, children, href, ...rest }: ButtonProps) {
  if(href) {
    return (
      <NextLink
        href={href}
        passHref
        data-testid="link"
      >
        <Link
          _hover={{
            textDecoration: null
          }}
        >
          <DefaultButton
            icon={icon} 
            {...rest}
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