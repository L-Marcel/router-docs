import { Box, Grid, Progress } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { usePagination } from "../../contexts/hooks/usePagination";
import { fadeCascate, fadeToTop } from "../../theme/animations";
import { LoadingImage } from "../LoadingImage";
import { ProjectItem } from "./ProjectItem";
import { api } from "../../services/api";
import { useSearch } from "../../contexts/hooks/useSearch";
import { useUser } from "../../contexts/hooks/useUser";
import { SearchWithoutResultImage } from "../SearchWithoutResultImage";
import { useRefresh } from "../../contexts/hooks/useRefresh";

function ProjectsList() {
  const { user } = useUser();
  const { setRefreshRemove } = useRefresh();

  const { currentPage, setPagination } = usePagination();
  const { search } = useSearch();

  const {
    data,
    isLoading,
    isError,
    isFetching,
    remove
  } = useQuery<ProjectList>(["projects", currentPage, search, user.email], () => {
    return api.get(`/projects?page=${currentPage}&itemsPerPage=${9}&name=${search}`, {
      headers: {
        user: user.id
      }
    }).then((res) => res.data)
  }, {
    enabled: user.id.length > 0,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    setRefreshRemove(remove);
  }, [remove])

  useEffect(() => {
    if(!isLoading && !isError && data !== undefined) {
      setPagination({
        ...data
      });
    };
  }, [data, isError, isLoading]);

  return (
    <Box mt={20}>
      { isFetching || isLoading && 
        <Progress
          colorScheme="primary"
          isIndeterminate
          mt="94px"
          position="absolute"
          h="5px"
          top={0}
          left={0}
          w="100%"
          zIndex={100}
        />
      }
      {
        isLoading? <LoadingImage
          autoIncrement
          minW="100vw"
          minH="70vh"
          ml={-5}
          {...fadeToTop}
        />: isError || data?.projects?.length <= 0? <SearchWithoutResultImage
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
          {
            data?.projects.map(p => {
              return (
                <ProjectItem 
                  key={p.id}
                  project={p}
                />
              );
            })
          }
        </Grid>
      }
    </Box>
  );
};

export { ProjectsList };