import { AccordionButton, AccordionItem, AccordionItemProps, AccordionPanel, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTop } from "../../theme/animations";
import { IconType } from "react-icons";
import { Button } from "../Button";

interface GenerateOptionsItemProps extends AccordionItemProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  title: string;
  icon?: IconType;
  onClick?: () => void;
};

function GenerateOptionsItem({ 
  title, 
  isSelected = false,
  isDisabled = false,
  onClick,
  icon,
  ...rest
}: GenerateOptionsItemProps) {
  return (
    <AccordionItem
      isDisabled={isDisabled}
      as={motion.div}
      display="flex"
      flexDir="column"
      alignItems="center"
      minH={30}
      border="2px solid"
      bgColor={isDisabled && "gray.100"}
      color="primary.700"
      _hover={!isDisabled && {
        cursor: "pointer",
        bgColor: "primary.50",
        borderColor: !isSelected && 
        "var(--chakra-colors-primary-100)!important"
      }}
      borderColor={isSelected? 
        "var(--chakra-colors-primary-500)!important":
        "var(--chakra-colors-gray-200)!important"
      }
      _first={{
        borderTopRadius: 20,
        "button#accodion-button:first-of-type": {
          borderTopRadius: 19,
        }
      }}
      _last={{
        borderBottomRadius: 20,
        "button#accodion-button:first-of-type": {
          borderBottomRadius: !isSelected? 19:0,
        }
      }}
      _notFirst={{
        borderTop: "none"
      }}
      _notLast={{
        borderBottom: "1px solid",
        borderBottomColor: "var(--chakra-colors-gray-200)!important"
      }}
      {...rest}
      {...fadeToTop}
    >
      <AccordionButton
        id="accordion-button"
        px={5}
        pt={5}
        pb={isSelected? 1:5}
        onClick={() => onClick()}
        _hover={{}} //reset
      >
        <Icon 
          as={icon}
          mr={2}
        />
        <Text 
          as={motion.p}
          fontWeight="bold"
          {...fadeToTop}
        >
          {title}
        </Text>
      </AccordionButton>
      <AccordionPanel 
        pb={5} 
        px={5} 
        pt={0}
        display="flex"
        flexDir="column"
      >
        <Text mb={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Text>
        <Button
          colorScheme="primary"
          w="min-content"
        >
          continue
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export { GenerateOptionsItem };