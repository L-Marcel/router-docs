import { useContextSelector } from "use-context-selector";
import { projectOwnerContext } from "../../ProjectOwnerProvider";

function usePOProject() {
  const project = useContextSelector(projectOwnerContext, po => po.project);
  const setProject = useContextSelector(projectOwnerContext, po => po.setProject);

  return {
    project,
    setProject
  };
};

export { usePOProject };