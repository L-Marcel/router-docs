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
        tabIndex={5}
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
        tabIndex={4}
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
        tabIndex={3}
        href="/me/projects/create"
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
        href="/me/projects"
        tabIndex={2}
      >
        projects
      </Button>
    </>
  );
};

export { MenuGroupButtons };