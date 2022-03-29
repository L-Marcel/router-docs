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

  const _getRoutes = useCallback((versionId: string) => {
    const versions = project.versions as ProjectVersionWithRoutes[];

    try {
      const version = versions.find(v => v.id === versionId);

      return version.routes;
    } catch (error) {
      console.log(error);
      return [];
    };
  }, [project]);

  const _setRoutes = useCallback((versionId: string, routes: Route[]) => {
    const versions = project.versions as ProjectVersionWithRoutes[];

    setProject({
      ...project,
      versions: versions.map(v => {
        if(v.id === versionId) {
          v.routes = routes;
        };
  
        return v;
      })
    });
  }, [project, setProject]);

  
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
        setProject: _setProject,
        getRoutes: _getRoutes,
        setRoutes: _setRoutes
      }}
    >
      {children}
    </projectOwnerContext.Provider>
  );
};

export { ProjectOwnerProvider };