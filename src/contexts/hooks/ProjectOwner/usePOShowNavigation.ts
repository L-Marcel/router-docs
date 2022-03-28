import { useContextSelector } from "use-context-selector";
import { projectOwnerContext } from "../../ProjectOwnerProvider";

function usePOShowNavigation() {
  const showNavigation = useContextSelector(projectOwnerContext, po => po.showNavigation);
  const changeShowNavigation = useContextSelector(projectOwnerContext, po => po.changeShowNavigation);

  return {
    showNavigation,
    changeShowNavigation
  };
};

export { usePOShowNavigation };