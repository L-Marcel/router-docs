import { Projects } from "../../../models/projects";
import { withMiddleware } from "../../../services/middlewares";
import { dateFormat } from "../../../utils/dateFormat";

async function list(req: ReqWithUser, res: Res) {
  const { page, itemsPerPage, name } = req.query;
  const { id } = req.user;

  try {
    const projects = await Projects.list({
      name: {
        contains: String(name ?? "") ?? undefined
      },
      user: {
        id
      },
    });
  
    const qtdProjects = projects.length;
    
    const projectsPerPage = Number(itemsPerPage ?? 10);
  
    const diff = qtdProjects % projectsPerPage;
    const qtdPages = (qtdProjects - diff)/projectsPerPage + (diff > 0? 1:0);
    const firstPage = 1;
    const lastPage = qtdPages > 0? qtdPages:1;
  
    let currentPage = Number(page ?? 1);
    
    if(currentPage > lastPage) {
      currentPage = lastPage;
    } else if(currentPage < firstPage) {
      currentPage = firstPage;
    };
  
    const startIn = (currentPage - 1) * projectsPerPage;
    const endIn = startIn + projectsPerPage;
    let projectsInPage = projects.slice(startIn, endIn);
  
    return res.status(200).json({
      currentPage,
      lastPage,
      firstPage,
      projects: projectsInPage
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  };
};

async function create(req: ReqWithUser, res: Res) {
  const { version, ...data } = req.body;
  const { id } = req.user;

  try {
    const projectCreated = await Projects.create({
      ...data,
      versions: {
        create: {
          version,
          formattedCreatedAt: dateFormat(new Date())
        }
      },
      user: {
        connect: {
          id
        }
      }
    }, id);

    return res.status(200).json(projectCreated);
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
    return await withMiddleware("authenticate")(list)(req, res);
  } else {
    return res.status(404);
  };
};