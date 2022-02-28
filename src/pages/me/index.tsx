import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { Profile } from "../../components/Profile";
import { MenuGroup } from "../../components/MenuGroup";
import { Layout } from "../../components/Layout";
import { ProjectsList } from "../../components/ProjectsList";
import { SearchBar } from "../../components/SearchBar";
import { useEffect } from "react";
import { useUser } from "../../contexts/hooks/useUser";
import { boxShadow } from "../../theme/effects/shadow";

function Me({ user }: MePageProps) {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <Layout
      title={`R.Docs: ${user.username}`}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        px={8}
        py={4}
        display="flex"
        flexDir={"row"}
        justifyContent="space-between"
        zIndex={90}
        w="100%"
        bgColor="gray.50"
        {...boxShadow()}
      >
        <Profile
          //Unique rendering
          user={user}
        />
        <SearchBar/>
      </Box>
      <ProjectsList/>
      <MenuGroup/>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const user = JSON.parse(getCookie("user", ctx).toString());
  
  return {
    props: {
      user
    }
  };
};

export default Me;