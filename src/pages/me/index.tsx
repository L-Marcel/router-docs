import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getCookie } from "cookies-next";
import { Profile } from "../../components/Profile";
import { MenuGroup } from "../../components/MenuGroup";
import { Layout } from "../../components/Layout";

function Me({ user }: MePageProps) {
  return (
    <Layout
      title={`R.Docs: ${user.username}`}
      display="inline-flex"
    >
      <Box
        display="inline-flex"
        flexDir="column"
        w="min-content"
      >
        <Profile user={user}/>
      </Box>
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