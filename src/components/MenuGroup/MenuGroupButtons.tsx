import { BiExit } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GiLifeBuoy } from "react-icons/gi";
import { Button } from "../Button";

function MenuGroupButtons() {
  return (
    <>
      <Button 
        icon={BiExit}
        isIconButton
        fontSize={20}
        rotateOnHover={180}
        data-testid="menu-exit-button"
        role="icon-button"
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
        data-testid="menu-adddoc-button"
        role="icon-button"
      >
        add doc
      </Button>
    </>
  );
};

export { MenuGroupButtons };