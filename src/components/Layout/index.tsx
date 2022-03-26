import { Box, BoxProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRealtimeProgressState } from "../../contexts/hooks/useRealtimeProgressState";
import { fadeCascate } from "../../theme/animations";
import { Loading } from "../Loading";
import { LayoutBody } from "./LayoutBody";

const DynamicMenu = dynamic(() => import("../MenuGroup")
.then((mod) => mod.MenuGroup));

interface LayoutProps extends BoxProps {
  title?: string;
  withCount?: boolean;
  withMenu?: boolean;
};

function Layout({ 
  title = "", 
  children,
  withCount,
  withMenu = false,
  ...rest 
}: LayoutProps) {
  const { 
    realtimeProgressState: {
      state,
      message,
      progress: count,
    }
  } = useRealtimeProgressState();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutBody
        {...rest}
      >
        {children}
        { withMenu && <DynamicMenu/> }
      </LayoutBody>
      { state !== "Inactivity" &&
        <Box
          as={m.div}
          data-testid="layout-loading"
          position="absolute"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          w="100vw"
          h="100%"
          zIndex={999}
          top={0}
          left={0}
          bgColor="white"
          {...fadeCascate}
        >
          <Loading
            loop={false}
            display="flex"
            flexDir="column"
            counterSuffix="% "
            counterValue={count}
            withCount={withCount}
            strings={message? [message]:undefined}
            title={title}
          />
        </Box>
      }
    </>
  );
};

export { Layout }; 