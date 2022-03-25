import { Projects } from "../../models/projects";
import { ProjectVersions } from "../../models/projectVersions";

async function find(req: Req, res: Res) {
  const { repository } = req.query;

  try {
    if(repository.length != 2) {
      return res.status(404);
    };

    const [ username, slug ] = repository as string[];
    
    const project = await Projects.find({
      repository: `${username}/${slug}`
    });

    if(!project) {
      return res.status(404).json({
        message: "Not found"
      });
    };

    const versions = await ProjectVersions.list({
      project: {
        id: project.id
      }
    });

    return res.status(200).json({
      ...project,
      versions
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  };
};

export default async function handler(req: Req, res: Res) {
  if(req.method === "GET") {
    return await find(req, res);
  } else {
    return res.status(404);
  };
};