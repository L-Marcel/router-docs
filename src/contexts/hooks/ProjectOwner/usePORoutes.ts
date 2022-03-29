import { useContextSelector } from "use-context-selector";
import { projectOwnerContext } from "../../ProjectOwnerProvider";

function usePORoutes() {
  const getRoutes = useContextSelector(projectOwnerContext, po => po.getRoutes);
  const setRoutes = useContextSelector(projectOwnerContext, po => po.setRoutes);

  return {
    getRoutes,
    setRoutes
  };
};

export { usePORoutes };