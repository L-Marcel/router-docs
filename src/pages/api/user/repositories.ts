import { Github } from "../../../services/github";
import { withMiddleware } from "../../../services/middlewares";

async function listRepositories(req: ReqWithUser, res: Res) {
  const { id } = req.user;

  const repositories: Repository[] = await Github.getRepositories(id);

  return res.status(200).json(repositories);
};

export default withMiddleware("authenticate")(listRepositories);