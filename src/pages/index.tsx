import { Stack } from "@chakra-ui/react";
import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import { AppInfo } from "../components/AppInfo";
import { Layout } from "../components/Layout";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

function Main() {
  function handleSignIn() {
    signIn("github");
  };

  return (
    <Layout
      title="Routerdocs: Autogen"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Banner
        title="{ Routerdocs: Autogen }"
        description="One method to make your documentation quickly and easily, automatize and optimize your work and resolve, of course, your problems"
      />
      <Stack 
        spacing={3}
        direction={["column", "row"]}
        justifyContent="center"
        alignItems="center"
        mb={35}
      >
        <Button 
          colorScheme="primary"
          onClick={handleSignIn}
        >
          Login with Github
        </Button>
        <Button href="/documentation" colorScheme="gray">Documentation</Button>
      </Stack>
      <AppInfo/>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async({
  req
}) => {
  const session = await getSession({ req });

  if(session) {
    return {
      redirect: {
        destination: "/me/projects",
        permanent: false
      }
    };
  };

  return {
    props: {}
  };
};

export default Main;