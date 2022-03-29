import { Routes } from "../../../../models/routes";
import { withMiddleware } from "../../../../services/middlewares";

async function list(req: ReqWithUser, res: Res) {
  const { version, name } = req.query;

  try {
    const routes = await Routes.list({
      name: {
        contains: String(name ?? "") ?? undefined
      },
      projectVersion: {
        id: String(version)
      }
    });

    console.log(routes);
  
    return res.status(200).json({
      routes
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message
    });
  };
};

async function create(req: ReqWithUser, res: Res) {
  const { version, ...data } = req.body;

  try {
    const routeCreated = await Routes.create({
      ...data,
      projectVersion: {
        connect: {
          id: version
        }
      }
    });

    return res.status(200).json(routeCreated);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  };
};

export default async function handler(req: ReqWithUser, res: Res) {
  if(req.method === "POST") {
    return await withMiddleware("authenticate")(create)(req, res);
  } else if(req.method === "GET") {
    return await list(req, res);
  } else {
    return res.status(404);
  };
};