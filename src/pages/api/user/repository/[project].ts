import { Projects } from "../../../../models/projects";
import { Github } from "../../../../services/github";
import { withMiddleware } from "../../../../services/middlewares";

async function getRepository(req: ReqWithUser, res: Res) {
  const { project } = req.query;
  const { id } = req.user;

  const { repository: fullName } = await Projects.find({
    id: String(project)
  }); 

  const github = new Github();
  await github.init(id);

  const repository = await github.getRepository(fullName);

  return res.status(200).json(repository);
};

export default withMiddleware("authenticate")(getRepository);