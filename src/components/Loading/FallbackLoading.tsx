import { Layout } from "../Layout";
import { Loading } from "../Loading";

interface FallbackLoadingProps {
  title?: string;
};

function FallbackLoading({ title }: FallbackLoadingProps) {
  return (
    <Layout
      title="R.Docs: Loading..."
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
    >
      <Loading title={title}/>
    </Layout>
  );
};

export { FallbackLoading };