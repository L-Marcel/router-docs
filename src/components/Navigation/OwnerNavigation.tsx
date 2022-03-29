import { Accordion, Box, Text } from "@chakra-ui/react";
import { m, Reorder } from "framer-motion";
import { usePOIsSmallVersion } from "../../contexts/hooks/ProjectOwner/usePOIsSmallVersion";
import { usePOProject } from "../../contexts/hooks/ProjectOwner/usePOProject";
import { usePOShowNavigation } from "../../contexts/hooks/ProjectOwner/usePOShowNavigation";
import { fadeNavigationOverlay, moveNavigationToRight } from "../../theme/animations";
import { OwnerNavigationVersionItem } from "./OwnerNavigationVersionItem";

function OwnerNavigation() {
  const isSmallVersion = usePOIsSmallVersion();
  const { showNavigation: show } = usePOShowNavigation();
  const { project, setProject } = usePOProject();

  function handleOnChangeVersionOrder(projectVersions : any[]) {
    setProject({
      ...project,
      versions: projectVersions
    });
  };
 
  return (
    <>
      <Box 
        h="100vh"
        as={m.div}
        overflowY="auto"
        bgColor="gray.50"
        py={50}
        __css={{
          "::-webkit-scrollbar-track": {
            background: "gray.100"
          },
          "::-webkit-scrollbar-thumb": {
            background: "currentColor"
          }
        }}
        {...moveNavigationToRight}
        animate={show || !isSmallVersion? "visible":"hidden"}
        zIndex={5}
      >
        <Text
          fontSize={18}
          py={1}
          px={4}
          fontWeight="semibold"
          bgColor="gray.200"
        >
          Versions
        </Text>
        <Accordion 
          allowToggle
          allowMultiple
          defaultIndex={[]}
          as={Reorder.Group}
          w="100%"
          axis="y"
          values={project?.versions} 
          onReorder={handleOnChangeVersionOrder}
        >
          {project?.versions.map(v => 
            <OwnerNavigationVersionItem 
              projectVersion={v} 
              key={v.id}
            />
          )}
        </Accordion>
      </Box>
      { show && isSmallVersion && <Box
        as={m.div}
        top={0}
        left={0}
        position="absolute"
        w="100%"
        h="100%"
        bgColor="gray.800"
        zIndex={4}
        {...fadeNavigationOverlay}
      /> }
    </>
  );
};

export { OwnerNavigation };