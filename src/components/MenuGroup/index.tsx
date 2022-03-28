import { Button } from "../../components/Button";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import { MenuGroupButtons } from "./MenuGroupButtons";
import { boxShadow } from "../../theme/effects/shadow";

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
      data-testid="menu-group"
      zIndex={5}
      {...boxShadow()}
    >
      { isOpen && <MenuGroupButtons/> }
      <Button
        data-testid="menu-main-button"
        icon={isOpen? RiArrowDropDownLine:RiArrowDropUpLine}
        opacity={0}
        isIconButton
        colorScheme="primary"
        borderRadius={60}
        size="lg"
        fontSize={[40, 40, 50, 50, 50, 50]}
        onClick={() => setIsOpen(v => !v)}
      />
    </Stack>
  );
};

export { MenuGroup };