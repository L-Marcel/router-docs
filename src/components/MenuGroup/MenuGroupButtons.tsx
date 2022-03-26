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
        data-testid="icon-button"
        onClick={signOut}
      >
        exit
      </Button>
      <Button 
        icon={GiLifeBuoy}
        isIconButton
        fontSize={20}
        rotateOnHover={90}
        data-testid="icon-button"
      >
        help
      </Button>
      <Button 
        icon={AiOutlinePlus}
        isIconButton
        fontSize={20}
        rotateOnHover={90}
        data-testid="icon-button"
        href="/me/projects/create"
      >
        add project
      </Button>
      <Button 
        icon={HiTemplate}
        isIconButton
        fontSize={20}
        rotateOnHover={90}
        data-testid="icon-button"
        href="/me/projects"
      >
        projects
      </Button>
    </>
  );
};

export { MenuGroupButtons };