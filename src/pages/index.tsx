import { Progress, Stack } from "@chakra-ui/react";
import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import { AppInfo } from "../components/AppInfo";
import { Layout } from "../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MainPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session.status === "authenticated") {
      router.push("/me/projects");
    };
  }, [session]);

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
      {session.status !== "unauthenticated" && <Progress
        colorScheme="primary"
        isIndeterminate
        position="absolute"
        h="5px"
        top={0}
        left={0}
        w="100%"
        zIndex={100}
      />}
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

export default MainPage;