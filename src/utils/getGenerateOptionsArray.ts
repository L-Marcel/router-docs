function getGenerateOptionsList(
  project: ProjectWithVersions, 
  repository: RepositoryVersion,
  isSearching: boolean,
) {
  if(repository) {
    return [
      repository as any,
      ...project.versions
    ];
  }else if(isSearching) {
    return [
      {
        version: "loading#Searching github repository...",
        id: "invalid",
        color: "var(--chakra-colors-blue-500)",
        isDisabled: true,
      },
      ...project.versions
    ];
  } else if(project?.versions?.some(
    v => v.version === repository?.version
  )) {
    return [
      {
        version: "error#Cannot get repositories...",
        id: "invalid",
        color: "var(--chakra-colors-purple-500)",
        isDisabled: true
      },
      ...project.versions
    ];
  } else {
    return project.versions;
  };
};

export { getGenerateOptionsList };