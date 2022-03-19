import { Layout } from "../../../components/Layout";
import { CreateProjectForm } from "../../../components/CreateProjectForm";
import { SimplePageHeader } from "../../../components/SimplePageHeader";

function ProjectsCreatePage() {
  return (
    <Layout
      title={"R.Docs: Add Project"}
      display="inline-flex"
      overflowY="auto"
      overflowX="hidden"
      h="100vh"
    >
      <SimplePageHeader
        title="New project"
        subtitle="Necessaries information"
      />
      <CreateProjectForm/>
    </Layout>
  );
};

export default ProjectsCreatePage;