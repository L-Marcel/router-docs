import { useContextSelector } from "use-context-selector";
import { projectOwnerContext } from "../../ProjectOwnerProvider";

function usePOIsSmallVersion() {
  const isSmallVersion = useContextSelector(projectOwnerContext, po => po.isSmallVersion);

  return isSmallVersion;
};

export { usePOIsSmallVersion };