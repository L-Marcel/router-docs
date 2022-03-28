import { Box } from "@chakra-ui/react";
import { m } from "framer-motion";
import { usePOIsSmallVersion } from "../../contexts/hooks/ProjectOwner/usePOIsSmallVersion";
import { usePOProject } from "../../contexts/hooks/ProjectOwner/usePOProject";
import { usePOShowNavigation } from "../../contexts/hooks/ProjectOwner/usePOShowNavigation";
import { moveOnNavigationChange } from "../../theme/animations";
import { SimplePageHeader } from "../SimplePageHeader";

function ProjectOwnerContent() {
  const isSmallVersion = usePOIsSmallVersion();
  const { showNavigation  } = usePOShowNavigation();
  const { project } = usePOProject();
  
  return (
    <Box
      as={m.div}
      display="flex"
      flexDir="column"
      p={[8, 10]}
      pt={[6, 8]}
      minH="100vh"
      position="absolute"
      {...moveOnNavigationChange}
      animate={showNavigation || !isSmallVersion? "reduced":"expanded"}
      marginLeft={isSmallVersion && "0px !important"}
    >
      <SimplePageHeader
        withoutButton
        title={project.name}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam quas dignissimos odit, maxime ipsam tempora minus inventore officia atque natus earum tenetur amet a totam quidem fuga excepturi vitae quod!"
      />
    </Box>
  );
};

export { ProjectOwnerContent };