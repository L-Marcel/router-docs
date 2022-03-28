import { Box } from "@chakra-ui/react";
import { Button } from "../Button";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { boxShadow } from "../../theme/effects/shadow";
import { usePOIsSmallVersion } from "../../contexts/hooks/ProjectOwner/usePOIsSmallVersion";
import { usePOShowNavigation } from "../../contexts/hooks/ProjectOwner/usePOShowNavigation";

function NavigationMobileButton() {
  const isSmallVersion = usePOIsSmallVersion();
  const { 
    showNavigation: show, 
    changeShowNavigation
  } = usePOShowNavigation();

  if(!isSmallVersion) {
    return null;
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      right={14}
      m={8}
      alignItems="center"
      justifyContent="flex-end"
      color="primary.800"
      data-testid="menu-group"
      zIndex={5}
      {...boxShadow()}
    >
      <Button
        icon={show? VscChromeClose:RiMenuUnfoldFill}
        isIconButton
        colorScheme="primary"
        borderRadius={60}
        size="lg"
        fontSize={22}
        onClick={changeShowNavigation}
        minW={35}
        h={35}
      />
    </Box>
  );
};

export { NavigationMobileButton };