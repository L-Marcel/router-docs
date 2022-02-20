import { Stack } from "@chakra-ui/react";
import { Button } from "../components/Button";
import { openUrl } from "../utils/openUrl";
import { Banner } from "../components/Banner";
import { AppInfo } from "../components/AppInfo";
import { Layout } from "../components/Layout";

function Main() {
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
          onClick={() => openUrl(`https://github.com/login/oauth/authorize?scope=user:email:repos&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT}`, "_self")}
        >
          Login with Github
        </Button>
        <Button href="/documentation" colorScheme="gray">Documentation</Button>
      </Stack>
      <AppInfo/>
    </Layout>
  );
};

export default Main;