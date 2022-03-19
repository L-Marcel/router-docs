import { BiExit } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GiLifeBuoy } from "react-icons/gi";
import { HiTemplate } from "react-icons/hi";
import { Button } from "../Button";
import { useSignOut } from "../../contexts/hooks/useSignOut";

function MenuGroupButtons() {
  const signOut = useSignOut();

  return (
    <>
      <Button 
        icon={BiExit}
        isIconButton
        fontSize={20}
        rotateOnHover={180}
        data-testid="menu-exit-button"
        role="icon-button"
        onClick={signOut}
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