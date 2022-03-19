import { Github } from "../../../services/github";
import { withMiddleware } from "../../../services/middlewares";
import { db } from "../../../services/prismaClient";

async function listRepositories(req: ReqWithUser, res: Res) {
  const { id } = req.user;

  const github = new Github();
  await github.init(id);

  const repositories: Repository[] = await github.getRepositories();

  return res.status(200).json(repositories);
};

export default withMiddleware("authenticate")(listRepositories);