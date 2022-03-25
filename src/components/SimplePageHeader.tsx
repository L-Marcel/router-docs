import { Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { fadeToTop } from "../theme/animations";
import { Button } from "./Button";

interface SimplePageHeaderProps {
  title: string;
  subtitle?: string;
  redirectButton?: {
    text: string;
    href?: string;
    onClick?: (ev: MouseEvent) => void;
  }
};

function SimplePageHeader({
  title,
  subtitle,
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
      <Button
        as={motion.button}
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
      </Button>
      <Heading
        as={motion.h1}
        color="primary.600"
        ml="-1px"
        fontSize={[20, 30, 40]}
        {...fadeToTop}
      >
        {title}
      </Heading>
      {
        subtitle && <Text
          as={motion.p}
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