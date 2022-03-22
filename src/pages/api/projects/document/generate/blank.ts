import { withMiddleware } from "../../../../../services/middlewares";
import { Template } from "../../../../../services/template";


async function blank(req: ReqWithUser, res: Res) {
  const { id, version, project } = req.body;

  await Template.use("blank", {
    id, 
    version,
    project
  });

  return res.status(200).json({});
};

export default async function handler(req: ReqWithUser, res: Res) {
  if(req.method === "POST") {
    return await withMiddleware("authenticate", "generateProjectTemplateValidate")(blank)(req, res);
  } else {
    return res.status(404);
  };
};