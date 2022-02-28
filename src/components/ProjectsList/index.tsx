import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeCascate, fadeToTop } from "../../theme/animations";
import { LoadingImage } from "../LoadingImage";
import { ProjectItem } from "./ProjectItem";
function ProjectsList() {
  const [isEndLoading, setIsEndLoading] = useState(false);

  return (
    <Box mt={20}>
      {
        !isEndLoading? <LoadingImage
          onEndLoading={() => setIsEndLoading(true)}
          autoIncrement
          minW="100vw"
          minH="70vh"
          ml={-5}
          {...fadeToTop}
        />:<Grid
          as={motion.div}
          w="100%"
          mt={5}
          templateColumns={[
            "repeat(1, 3fr)", 
            "repeat(1, 3fr)", 
            "repeat(2, 3fr)", 
            "repeat(2, 3fr)", 
            "repeat(3, 3fr)", 
            "repeat(3, 3fr)"
          ]}
          columnGap={5}
          rowGap={5}
          {...fadeCascate}
        >
          <ProjectItem/>
          <ProjectItem/>
          <ProjectItem/>
          <ProjectItem/>
          <ProjectItem/>
          <ProjectItem/>
        </Grid>
      }
    </Box>
  );
};

export { ProjectsList };