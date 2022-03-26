import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";
import { LoadingFeedback } from "../../../components/Loading/LoadingFeedback";
import { MenuGroup } from "../../../components/MenuGroup";
import { api } from "../../../services/api";

interface ProjectProps {
  project: ProjectWithVersions;
};

function ProjectPage({ project }: ProjectProps) {
  const router = useRouter();

  if(router.isFallback) {
    return (
      <LoadingFeedback
        title="R.Docs: Loading Project"
      />
    );
  };

  return (
    <Layout
      title={"R.Docs: Project"}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
      withMenu
    >
      <h1>{}</h1>
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
  const { id } = params;
  const project = await api.get<Project>(`/projects/${id}`)
  .then(res => res.data).catch(() => false);
  
  if(!project) {
    return {
      notFound: true
    };
  };
  
  console.log(project);

  return {
    props: {
      project
    }
  };
};

export default ProjectPage;