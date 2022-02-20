import { Box } from "@chakra-ui/react";
import { Button } from "./Button";
import pk from "../../package.json";
import { openUrl } from "../utils/openUrl";

function AppInfo() {
  return (
    <Box
      data-testid="app-info"
      position="fixed"
      bottom={0}
      left={0}
      display="flex"
      p={5}
    >
      <Button
        size="sm"
        data-testid="rd-github"
        onClick={() => openUrl("https://github.com/L-Marcel/router-docs")}
        colorScheme="primary"
        mr={2}
      >
        V{pk.version}
      </Button>
      <Button 
        size="sm"
        data-testid="l-marcel"
        onClick={() => openUrl("http://l-marcel.vercel.app")}
      >
        l-marcel
      </Button>
    </Box>
  );
};

export { AppInfo };