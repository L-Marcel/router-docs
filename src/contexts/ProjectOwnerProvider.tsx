import { useBreakpointValue } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

export const projectOwnerContext = createContext({} as ProjectOwnerContext);

function ProjectOwnerProvider({ children }) {
  const isSmallVersion = useBreakpointValue({
    lg: false,
    xl: false,
    base: true
  });

  const [showNavigation, setShowNavigation] = useState(true);
  const _changeShowNavigation = useCallback(() => {
    setShowNavigation(sn => !sn);
  }, [setShowNavigation]);

  const [project, setProject] = useState<ProjectWithVersions>();
  const _setProject = useCallback((project: ProjectWithVersions) => {
    setProject(project);
  }, [setProject]);

  
  useEffect(() => {
    setShowNavigation(!isSmallVersion);
  }, [isSmallVersion]);

  return (
    <projectOwnerContext.Provider
      value={{
        isSmallVersion,
        showNavigation,
        changeShowNavigation: _changeShowNavigation,
        project,
        setProject: _setProject
      }}
    >
      {children}
    </projectOwnerContext.Provider>
  );
};

export { ProjectOwnerProvider };