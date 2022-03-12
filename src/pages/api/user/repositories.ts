import { Github } from "../../../services/github";
import { withMiddleware } from "../../../services/middlewares";

async function listRepositories(req: ReqWithUser, res: Res) {
  const { id } = req.user;

  const repositories = await Github.getRepositories(id);
  console.log(repositories.length);

  return res.status(200).json(repositories);
};

export default withMiddleware("authenticate")(listRepositories);