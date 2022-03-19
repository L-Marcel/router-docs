import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FallbackLoading } from "../../../../../components/Loading/FallbackLoading";
import { GenerateOptions } from "../../../../../components/GenerateOptions";
import { Layout } from "../../../../../components/Layout";
import { api } from "../../../../../services/api";
import { SimplePageHeader } from "../../../../../components/SimplePageHeader";
import { Select } from "../../../../../components/Select";
import { useState } from "react";

interface GenerateProps {
  project: ProjectWithVersions;
};

function GeneratePage({ project }: GenerateProps) {
  const [selectedVersion, setSelectedVersion] = useState("");
  const router = useRouter();

  if(router.isFallback) {
    return (
      <FallbackLoading 
        title="Loading..."
      />
    );
  };

  console.log(project);

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
      <Select
        value={selectedVersion}
        onChange={(value) => 
          setSelectedVersion(value)
        }
        options={!router.isFallback? project.versions?.map(v => {
          return {
            label: v.version,
            value: v.id,
            color: "var(--chakra-colors-primary-500)"
          };
        }):[{ 
          value: "", 
          label: "Loading...", 
          color: "var(--chakra-colors-primary-500)", 
          isDisabled: true 
        }]}
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