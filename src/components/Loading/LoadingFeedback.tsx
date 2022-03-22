import { Layout } from "../Layout";
import { Loading } from ".";
import { BoxProps } from "@chakra-ui/react";

interface LoadingFeedbackProps extends BoxProps {
  title?: string;
};

function LoadingFeedback({ title, ...rest }: LoadingFeedbackProps) {
  return (
    <Layout
      title={title}
      display="flex"
      flexDir="column"
      w="100%"
      overflowY="auto"
      overflowX="hidden"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      {...rest}
    >
      <Loading title={title}/>
    </Layout>
  );
};

export { LoadingFeedback };