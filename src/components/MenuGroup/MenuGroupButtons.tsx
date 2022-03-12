import { BiExit } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GiLifeBuoy } from "react-icons/gi";
import { HiTemplate } from "react-icons/hi";
import { Button } from "../Button";
import { signOut } from "next-auth/react";
import { useRefresh } from "../../contexts/hooks/useRefresh";

function MenuGroupButtons() {
  const { refresh } = useRefresh();

  function handleExit() {
    refresh.remove();
    signOut();
  };

  return (
    <>
      <Button 
        icon={BiExit}
        isIconButton
        fontSize={20}
        rotateOnHover={180}
        data-testid="menu-exit-button"
        role="icon-button"
        onClick={handleExit}
      >
        exit
      </Button>
      <Button 
        icon={GiLifeBuoy}
        isIconButton
        fontSize={20}
        rotateOnHover={90}
        data-testid="menu-help-button"
        role="icon-button"
      >
        help
      </Button>
      <Button 
        icon={AiOutlinePlus}
        isIconButton
        fontSize={20}
        rotateOnHover={90}
        data-testid="menu-add-project-button"
        role="icon-button"
      >
        add project
      </Button>
      <Button 
        icon={HiTemplate}
        isIconButton
        fontSize={20}
        rotateOnHover={90}
        data-testid="menu-projects-button"
        role="icon-button"
      >
        projects
      </Button>
    </>
  );
};

export { MenuGroupButtons };