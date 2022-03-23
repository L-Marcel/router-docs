import { Projects } from "../../../models/projects";
import { ProjectVersions } from "../../../models/projectVersions";
import { withMiddleware } from "../../../services/middlewares";
import { forcePageRevalidation } from "../../../utils/forcePageRevalidation";

async function update(req: ReqWithUser, res: Res) {
  const { id } = req.query;
  const data = req.body;

  const projectUpdated = await Projects.update(String(id), {
    ...data
  });

  await forcePageRevalidation(res, `/projects/${id}/doc/generate`);

  return res.status(200).json(projectUpdated);
};

async function remove(req: ReqWithUser, res: Res) {
  const { id } = req.query;

  await Projects.delete(String(id));

  return res.status(200).json({});
};

async function find(req: Req, res: Res) {
  const { id } = req.query;

  const project = await Projects.find({ 
    id: String(id),
  });

  const versions = await ProjectVersions.list({
    project: {
      id: String(id)
    }
  });

  return res.status(200).json({
    ...project,
    versions
  });
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