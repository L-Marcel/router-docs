import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { Heading } from "@chakra-ui/react";
import { CreateProjectForm } from "../../../components/CreateProjectForm";
import { motion } from "framer-motion";
import { fadeToTop } from "../../../theme/animations";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useUser } from "../../../contexts/hooks/useUser";

function ProjectsCreate() {
  const { user } = useUser();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if(!!user.id) {
      api.get(`/user/repositories`, {
        headers: {
          user: user.id
        }
      }).then((res) => {
        console.log(res.data);
        setRepositories(res.data);
      });
    };
  }, [setRepositories, user, api]);

  return (
    <Layout
      title={"R.Docs: Add Project"}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
    >
      <Button
        as={motion.button}
        icon={AiOutlineDoubleLeft}
        href="/me/projects"
        bgColor="transparent"
        px={0}
        color="primary.800"
        size="sm"
        _hover={{
          bgColor: "trasparent"
        }}
        _focus={{
          bgColor: "trasparent"
        }}
        _active={{
          bgColor: "trasparent"
        }}
        {...fadeToTop}
      >
        Return
      </Button>
      <Heading
        as={motion.h1}
        color="primary.600"
        {...fadeToTop}
      >
        New project
      </Heading>
      <CreateProjectForm/>
    </Layout>
  );
};

export default ProjectsCreate;