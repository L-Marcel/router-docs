import { Github } from "../../../services/github";
import { withMiddleware } from "../../../services/middlewares";

async function listRepositories(req: ReqWithUser, res: Res) {
  const { id } = req.user;

  const github = new Github();
  await github.init(id);

  const repositories: Repository[] = await github.getRepositories();

  return res.status(200).json(repositories);
};

export default async function handler(req: ReqWithUser, res: Res) {
  if(req.method === "GET") {
    return await withMiddleware("authenticate")(listRepositories)(req, res);
  } else  {
    return res.status(404);
  };
}