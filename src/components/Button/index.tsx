import { ButtonProps as CButtonProps, Link } from "@chakra-ui/react";
import { ReactNode } from "react";

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
      <Link href={href} data-testid="link">
        <DefaultButton icon={icon} {...rest}>
          {children}
        </DefaultButton>
      </Link>
    );
  };

  return (
    <DefaultButton icon={icon} {...rest}>
      {children}
    </DefaultButton>
  );
};

export { Button };