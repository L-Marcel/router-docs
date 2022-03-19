import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { fadeCascate } from "../theme/animations";
import { Loading } from "./Loading";

interface LayoutProps extends BoxProps {
  title?: string;
};

function Layout({ title = "", children, ...rest }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        data-testid="layout"
        as={motion.div}
        w="100vw"
        h="100%"
        minH="100vh"
        p={8}
        flexDir="column"
        {...fadeCascate}
        {...rest}
      >
        {children}
      </Box>
    </>
  );
};

export { Layout }; 