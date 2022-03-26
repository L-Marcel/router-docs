import { Grid } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeCascate } from "../../theme/animations";
import { RouterTypesCount } from "./RouterTypesCount";

interface ProjectItemRouterTypesProps {
  posts: number;
  gets: number;
  puts: number;
  deletes: number;
};

function ProjectItemRouterTypes({ posts, gets, puts, deletes }: ProjectItemRouterTypesProps) {
  return (
    <Grid
      as={m.div}
      flexDir="column-reverse"
      columnGap={2}
      rowGap={2}
      gridTemplateColumns="max-content"
      w="max-content"
      gridTemplateAreas={[
        `"a b" "c d"`,
        `"a b" "c d"`,
        `"a e e" "b c d"`,
        `"a e e" "b c d"`,
        `"a b c d"`
      ]}
      {...fadeCascate}
    >
      <RouterTypesCount
        gridArea="a"
        colorScheme="blue"
        text="posts"
        count={posts}
      />
      <RouterTypesCount
        gridArea="b"
        colorScheme="green"
        text="gets"
        count={gets}
      />
      <RouterTypesCount 
        gridArea="c"
        colorScheme="purple"
        text="puts"
        count={puts}
      />
      <RouterTypesCount 
        gridArea="d"
        colorScheme="red"
        text="delete"
        count={deletes}
      />
    </Grid>
  );
};

export { ProjectItemRouterTypes };