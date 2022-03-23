import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { LoadingFeedback } from "../../../../../components/Loading/LoadingFeedback";
import { GenerateOptions } from "../../../../../components/GenerateOptions";
import { Layout } from "../../../../../components/Layout";
import { api } from "../../../../../services/api";
import { SimplePageHeader } from "../../../../../components/SimplePageHeader";
import { Select } from "../../../../../components/Select";
import { useEffect, useState } from "react";
import { Tag, Text } from "@chakra-ui/react";
import { selectRepositoryVersionStyle } from "../../../../../theme/select/selectRepositoryVersionStyle";
import RealtimeClient from "../../../../../services/pusher/client";
import { versionLabelFormat } from "../../../../../utils/versionLabelFormat";
import { getProjectChannel } from "../../../../../utils/getProjectChannel";
import { getGenerateOptionsList } from "../../../../../utils/getGenerateOptionsArray";

interface GenerateProps {
  project: ProjectWithVersions;
};

function GeneratePage({ project }: GenerateProps) {
  const [isSearchingRepository, setIsSearchingRepository] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState({
    id: "",
    version: ""
  });
  const [repository, setRepository] = useState<RepositoryVersion>();
  const router = useRouter();

  useEffect(() => {
    if(project?.repository) {
      api.get(`user/repository/${project.id}`).then(async(res) => {
        const repository = res.data;

        if(repository?.version && !project?.versions?.some(
          v => v.version === repository?.version
        )) {
          setRepository({
            fullName: project.repository,
            ...repository
          });
        };

        setIsSearchingRepository(false);
      }).catch(res => console.log(res));
    };
  }, [setRepository, project]);

  if(router.isFallback) {
    return (
      <LoadingFeedback
        title="R.Docs: Loading Resources"
      />
    );
  };

  return (
    <Layout
      title={"R.Docs: Document Generation"}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      withCount
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
        value={selectedVersion.version}
        onChange={(value) => {
          const data = (
            repository? [
              repository,
              ...project.versions
            ]:project.versions
          ).find(v => v.version === value);

          const channel = getProjectChannel(project, data as any);
          RealtimeClient.removeChannel(channel);

          let { id } = data as any;

          if(repository?.version === value) {
            id = "new";
          };

          setSelectedVersion({
            version: data.version,
            id
          });
        }}
        maxW={400}
        mb={2}
        selectStyles={selectRepositoryVersionStyle(6)}
        labelFormat={({ label }) => {
          let { tag, version } = versionLabelFormat(label, repository?.version);
  
          return (
            <Text>
              <Tag 
                mr={2}
                colorScheme={tag === "new"? "green":"primary"}
              >
                {tag}
              </Tag>
              {version}
            </Text>
          );
        }}
        placeholder="Select repository version..."
        options={!router.isFallback?
          getGenerateOptionsList(
            project,
            repository,
            isSearchingRepository
          ).map(v => {
            let { isDisabled } = v as any;

            let { label } = versionLabelFormat(v.version, repository?.version);

            return {
              label: label,
              value: v.version,
              color: "var(--chakra-colors-primary-500)",
              isDisabled
            };
          }):[{ 
            value: "loading#Searching github repository...", 
            label: "loading#Searching github repository...", 
            color: "var(--chakra-colors-blue-500)", 
            isDisabled: true 
          }]
        }
      />
      <GenerateOptions 
        project={project} 
        selectedVersion={selectedVersion}
      />
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
  const { slug } = params;
  const project = await api.get<Project>(`/projects/${slug}`).then(res => res.data);

  return {
    props: {
      project
    }
  };
};

export default GeneratePage;