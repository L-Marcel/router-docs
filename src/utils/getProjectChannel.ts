function getProjectChannel(p: Project, v:{ id: string, version: string }) {
  return `${p.id}@${v.id === "new" || v.id === "invalid"? v.version:v.id}`;
};

function getProjectChannelServer(v: { id: string, version: string, project: string }) {
  return `${v.project}@${v.id ?? v.version}`;
};

export { 
  getProjectChannel, 
  getProjectChannelServer 
};