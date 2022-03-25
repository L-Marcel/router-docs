import { Projects } from "../../../../models/projects";
import { Github } from "../../../../services/github";
import { withMiddleware } from "../../../../services/middlewares";

async function getRepository(req: ReqWithUser, res: Res) {
  const { project } = req.query;
  const { id } = req.user;

  try {
    const { repository: fullName } = await Projects.find({
      id: String(project)
    }); 
  
    const github = await new Github().init(id);
    
    const repository = await github.getRepository(fullName);
  
    return res.status(200).json(repository);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  };
};

export default async function handler(req: ReqWithUser, res: Res) {
  if(req.method === "GET") {
    return await withMiddleware("authenticate")(getRepository)(req, res);
  } else  {
    return res.status(404);
  };
}