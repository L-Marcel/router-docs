import { Github } from "../../../services/github";
import { withMiddleware } from "../../../services/middlewares";

async function listRepositories(req: ReqWithUser, res: Res) {
  const { id } = req.user;
  const { justNotInUse } = req.query;

  try {
    const github = await new Github().init(id);

    let repositories: Repository[] = await github.getRepositories(Boolean(justNotInUse));

    return res.status(200).json(repositories);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  };
};

export default async function handler(req: ReqWithUser, res: Res) {
  if(req.method === "GET") {
    return await withMiddleware("authenticate")(listRepositories)(req, res);
  } else {
    return res.status(404);
  };
}