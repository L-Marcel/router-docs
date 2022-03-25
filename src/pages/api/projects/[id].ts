import { Projects } from "../../../models/projects";
import { ProjectVersions } from "../../../models/projectVersions";
import { withMiddleware } from "../../../services/middlewares";
import { forcePageRevalidation } from "../../../utils/forcePageRevalidation";

async function update(req: ReqWithUser, res: Res) {
  const { id } = req.query;
  const data = req.body;

  try {
    const projectUpdated = await Projects.update(String(id), {
      ...data
    });
  
    await forcePageRevalidation(res, `/projects/${id}/doc/generate`);
  
    return res.status(200).json(projectUpdated);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  };
};

async function remove(req: ReqWithUser, res: Res) {
  const { id } = req.query;

  try {
    await Projects.delete(String(id));

    await forcePageRevalidation(res, `/projects/${id}/doc/generate`);

    return res.status(200).json({});
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  };
};

async function find(req: Req, res: Res) {
  const { id } = req.query;

  try {
    const project = await Projects.find({ 
      id: String(id),
    });
  
    const versions = await ProjectVersions.list({
      project: {
        id: String(id)
      }
    });

    if(!project) {
      return res.status(404).json({
        message: "Not found"
      });
    };
  
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
  } else if(req.method === "PUT") {
    return await withMiddleware(
      "authenticate", 
      "projectPermissions"
    )(update)(req, res);
  } else if(req.method === "DELETE") {
    return await withMiddleware(
      "authenticate", 
      "projectPermissions"
    )(remove)(req, res);
  } else {
    return res.status(404);
  };
};