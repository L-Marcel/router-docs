import { Heading, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import { MouseEvent } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { fadeToTop } from "../theme/animations";
import { Button } from "./Button";

interface SimplePageHeaderProps {
  title: string;
  subtitle?: string;
  withoutButton?: boolean;
  redirectButton?: {
    text: string;
    href?: string;
    onClick?: (ev: MouseEvent) => void;
  }
};

function SimplePageHeader({
  title,
  subtitle,
  withoutButton = false,
  redirectButton = {
    text: "Return",
    href: "/me/projects"
  }
}: SimplePageHeaderProps) {
  const { 
    href, 
    text,
    onClick
  } = redirectButton;

  return (
    <>
      { !withoutButton && <Button
        as={m.button}
        icon={AiOutlineDoubleLeft}
        href={href}
        bgColor="transparent"
        px={0}
        mb={[2, -1, -1, -1, -1]}
        color="primary.800"
        size="sm"
        _hover={{
          bgColor: "trasparent"
        }}
        _focus={{
          bgColor: "trasparent"
        }}
        _active={{
          bgColor: "trasparent"
        }}
        onClick={onClick}
        {...fadeToTop}
      >
        {text}
      </Button> }
      <Heading
        as={m.h1}
        color="primary.600"
        ml="-1px"
        fontSize={[20, 30, 40]}
        {...fadeToTop}
      >
        {title}
      </Heading>
      {
        subtitle && <Text
          as={m.p}
          mt={-1} 
          mb={[4, 2, 2, 2, 2]}
          fontWeight="light"
          fontSize={[14, 18, 20]}
          {...fadeToTop}
        >
          {subtitle}
        </Text>
      }
    </>
  );
};

export { SimplePageHeader };