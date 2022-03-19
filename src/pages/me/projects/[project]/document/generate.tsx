import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FallbackLoading } from "../../../../../components/Loading/FallbackLoading";
import { GenerateOptions } from "../../../../../components/GenerateOptions";
import { Layout } from "../../../../../components/Layout";
import { api } from "../../../../../services/api";
import { SimplePageHeader } from "../../../../../components/SimplePageHeader";

interface GenerateProps {
  project: Project;
};

function GeneratePage({ project }: GenerateProps) {
  const router = useRouter();

  if(router.isFallback) {
    return (
      <FallbackLoading 
        title="Loading..."
      />
    );
  };

  return (
    <Layout
      title={"R.Docs: Generate Document"}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
    >
      <SimplePageHeader
        title="Document instances"
        subtitle="Generation method options"
        redirectButton={{
          href: `/me/projects/${project.id}`,
          text: "Cancel"
        }}
      />
      <GenerateOptions project={project}/>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async({ params }) => {
  const { project: id } = params;

  const project = await api.get(`/projects/${id}`).then(res => res.data);

  return {
    props: {
      project
    }
  };
};

export default GeneratePage;