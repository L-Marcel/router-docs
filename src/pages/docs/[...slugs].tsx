import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { api } from "../../services/api";
import { sleep } from "../../utils/sleep";

interface ProjectProps {
  project: ProjectWithVersions;
};

function ProjectPage({ project }: ProjectProps) {
  const router = useRouter();

  return (
    <Layout
      title={"R.Docs: Project"}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
    >
      <h1>{project.name}</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async({ params }) => {
  const { slugs } = params;

  return {
    props: {
      project: {
        name: slugs[0]
      }
    },
    revalidate: 60 * 60 * 24 * 7,
  };
};

export default ProjectPage;