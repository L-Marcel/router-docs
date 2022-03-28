import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { LoadingFeedback } from "../../../components/Loading/LoadingFeedback";
import { NavigationMobileButton } from "../../../components/Navigation/NavigationMobileButton";
import { OwnerNavigation } from "../../../components/Navigation/OwnerNavigation";
import { ProjectOwnerContent } from "../../../components/ProjectOwnerContent";
import { usePOProject } from "../../../contexts/hooks/ProjectOwner/usePOProject";
import { ProjectOwnerProvider } from "../../../contexts/ProjectOwnerProvider";
import { api } from "../../../services/api";

interface ProjectProps {
  project: ProjectWithVersions;
};

function ProjectPage({ project }: ProjectProps) {
  const router = useRouter();
  const { setProject, project: _project } = usePOProject();

  useEffect(() => {
    setProject(project);
  }, [project]);

  if(router.isFallback || !_project) {
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
      p={0}
      flexDir="row"
      h="100vh"
      withMenu
    >
      <OwnerNavigation/>
      <ProjectOwnerContent/>
      <NavigationMobileButton/>
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

function ProjectOwnerPage(props: any) {
  return (
    <ProjectOwnerProvider>
      <ProjectPage {...props}/>
    </ProjectOwnerProvider>
  );
};

export default ProjectOwnerPage;