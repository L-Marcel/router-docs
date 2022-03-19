import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FallbackLoading } from "../../../../../components/Loading/FallbackLoading";
import { GenerateOptions } from "../../../../../components/GenerateOptions";
import { Layout } from "../../../../../components/Layout";
import { api } from "../../../../../services/api";
import { SimplePageHeader } from "../../../../../components/SimplePageHeader";
import { Select } from "../../../../../components/Select";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { Github } from "../../../../../services/github";
import { getToken } from "next-auth/jwt";
import { useUser } from "../../../../../contexts/hooks/useUser";
import { Box, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import { selectRepositoryVersionStyle } from "../../../../../theme/select/selectRepositoryVersionStyle";
import { Button } from "../../../../../components/Button";

interface GenerateProps {
  project: ProjectWithVersions;
  repository: Repository;
};

function GeneratePage({ project }: GenerateProps) {
  const [searchingRepository, setSearchingRepository] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [repository, setRepository] = useState<RepositoryVersion>();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if(project?.repository) {
      api.get(`user/repository/${project.id}`, {
        headers: {
          user: user.id
        }
      }).then(async(res) => {
        const repository = res.data;

        if(repository?.version && !project?.versions?.some(
          v => v.version === repository?.version
        )) {
          setRepository({
            fullName: project.repository,
            ...repository
          });
        };

        setSearchingRepository(false);
      }).catch(res => console.log(res));
    };
  }, [setRepository, project]);

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
      <Select
        value={selectedVersion}
        onChange={(value) => 
          setSelectedVersion(value)
        }
        maxW={200}
        mb={2}
        selectStyles={selectRepositoryVersionStyle(6)}
        labelFormat={({ label }) => {
          let text: string = label;

          text = text.includes("#")? text:`${repository.version === label? "new":"override"}#${label}`;
          const [tag, version] = label.split("#");
  
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
        options={!router.isFallback? [ 
          searchingRepository? {
            version: "Searching github repository...",
            id: "invalid",
            isDisabled: true,
          }:repository ?? undefined,
          ...project.versions
        ].map(v => {
          let { isDisabled, id } = v as any;

          if(repository?.version === v.version) {
            id = "new";
          };

          return {
            label: `${id === "new"? id:"override"}#${v.version}`,
            value: id,
            color: "var(--chakra-colors-primary-500)",
            isDisabled
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
  const project = await api.get<Project>(`/projects/${id}`).then(res => res.data);
  
  return {
    props: {
      project
    }
  };
};

export default GeneratePage;