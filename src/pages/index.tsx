import { Progress, Stack } from "@chakra-ui/react";
import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import { AppInfo } from "../components/AppInfo";
import { Layout } from "../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingFeedback } from "../components/Loading/LoadingFeedback";

function MainPage() {
  const session = useSession();
  const router = useRouter();
  const isAuthenticated = session.status !== "unauthenticated";

  useEffect(() => {
    if(session.status === "authenticated") {
      router.push("/me/projects");
    };
  }, [session]);

  function handleSignIn() {
    signIn("github");
  };

  return (
    <>
      {isAuthenticated && <LoadingFeedback
        position="absolute"
        bgColor="white"
        zIndex={20}
        title="R.Docs: Checking Session"
      />}
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
            isDisabled={isAuthenticated}
          >
            Login with Github
          </Button>
          <Button 
            href="/documentation" 
            colorScheme="gray"
            isDisabled={isAuthenticated}
          >
            Documentation
          </Button>
        </Stack>
        <AppInfo/>
      </Layout>
    </>
  );
};

export default MainPage;