import { Button } from "../../components/Button";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import { MenuGroupButtons } from "./MenuGroupButtons";

function MenuGroup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack
      position="fixed"
      bottom={0}
      right={0}
      m={8}
      alignItems="center"
      justifyContent="flex-end"
      color="primary.800"
      filter="drop-shadow(1px 1px 1px gray)"
      data-testid="menu-group"
    >
      { isOpen && <MenuGroupButtons/> }
      <Button
        role="icon-button"
        data-testid="menu-main-button"
        icon={isOpen? RiArrowDropDownLine:RiArrowDropUpLine}
        pb={!isOpen && "2px"}
        pt={isOpen && "2px"}
        isIconButton
        colorScheme="primary"
        borderRadius={60}
        size="lg"
        fontSize={50}
        w={50}
        h={50}
        onClick={() => setIsOpen(v => !v)}
      />
    </Stack>
  );
};

export { MenuGroup };