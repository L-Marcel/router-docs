import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { AppProvider } from "./AppContext";
import { SessionProvider } from "next-auth/react";

const composeProviders = (...providers) => props => {
  return providers.reduceRight(
    (children, Provider) => {
      return (
        <Provider {...props}>{children}</Provider>
      );
    },
    props.children
  );
};

export const AllProviders = composeProviders(
  ChakraProvider,
  QueryClientProvider,
  SessionProvider,
  AppProvider
);