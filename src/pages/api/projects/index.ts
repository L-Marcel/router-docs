import { Projects } from "../../../models/projects";
import { Routes } from "../../../models/routes";
import { withMiddleware } from "../../../services/middlewares";

async function list(req: ReqWithUser, res: Res) {
  const { page, itemsPerPage, name } = req.query;
  const { id } = req.user;

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
  let projectsInPage = await Promise.all(projects.slice(startIn, endIn)
  .map(async(p): Promise<FormattedProject> => {
    const routes = await Routes.list({
      project: {
        id: p.id
      }
    });

    const counts = routes.reduce<RouteTypesCount>((c, r) => {
      ++c[`${r.type}s`];
      return c;
    }, {
      posts: 0,
      gets: 0,
      puts: 0,
      deletes: 0
    });

    return {
      ...p,
      formattedName: p.name.slice(0, 17) + (p.name.length > 17? "...":""),
      formattedDescription: p.description.slice(0, 213) + (p.description.length > 213? "...":""),
      formattedCreatedAt: new Intl.DateTimeFormat("en-us", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(p.createdAt),
      ...counts
    };
  }));

  return res.status(200).json({
    currentPage,
    lastPage,
    firstPage,
    projects: projectsInPage
  });
};

export default withMiddleware("authenticate")(list);