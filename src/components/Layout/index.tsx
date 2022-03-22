import { Box, BoxProps } from "@chakra-ui/react";
import Head from "next/head";
import { useRealtimeProgressState } from "../../contexts/hooks/useRealtimeProgressState";
import { Loading } from "../Loading";
import { LayoutBody } from "./LayoutBody";

interface LayoutProps extends BoxProps {
  title?: string;
  withCount?: boolean;
};

function Layout({ 
  title = "", 
  children,
  withCount,
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
      </LayoutBody>
      { state !== "Inactivity" &&
        <Box
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