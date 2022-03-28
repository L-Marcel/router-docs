import { Box } from "@chakra-ui/react";
import { Profile } from "../../../components/Profile";
import { Layout } from "../../../components/Layout";
import { ProjectsList } from "../../../components/ProjectsList";
import { SearchBar } from "../../../components/SearchBar";
import { boxShadow } from "../../../theme/effects/shadow";
import { useUser } from "../../../contexts/hooks/useUser";
import { GetServerSideProps } from "next";
import { Users } from "../../../models/users";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

declare interface ProjectsProps {
  user: User;
};

function ProjectsPage({ user }: ProjectsProps) {
  const { setUser } = useUser();
  
  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <Layout
      title={`R.Docs: ${user.name}`}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
      withMenu
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        px={8}
        pl={[3, 8]}
        py={4}
        display="flex"
        flexDir={"row"}
        justifyContent="space-between"
        zIndex={90}
        w="100%"
        bgColor="gray.50"
        {...boxShadow()}
      >
        <Profile user={user}/>
        <SearchBar/>
      </Box>
      <ProjectsList/>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async({ req }) => {
  const session = await getSession({ req });
  
  if(session) {
    const user = await Users.find({ email: session?.user?.email });
    
    return {
      props: {
        user
      }
    };
  };

  return {
    redirect: {
      destination: "/",
      permanent: false
    }
  };
};

export default ProjectsPage;