import { Accounts } from "../models/accounts";
import { Routes } from "../models/routes";
import { Github } from "../services/github";

export async function projectFormat(p: Project, authenticatedUserId: string, withCount = true): Promise<Project> {
  const { access_token: token } = await Accounts.find({
    user: {
      id: authenticatedUserId,
    }
  });

  const routes = await Routes.list({
    project: {
      id: p.id
    }
  });

  const counts = withCount? routes.reduce<RouteTypesCount>((c, r) => {
    ++c[`${r.type}s`];
    return c;
  }, {
    posts: 0,
    gets: 0,
    puts: 0,
    deletes: 0
  }):{};

  const projectPackagePath = await Github.getRepositoryPackageJSON(p.repository, token);
  const haveExpress = projectPackagePath?.dependencies?.express !== undefined;
  const havePrisma = projectPackagePath?.dependencies["@prisma/client"] !== undefined;

  return {
    ...p,
    formattedName: p.name.slice(0, 17) + (p.name.length > 17? "...":""),
    formattedDescription: p.description.slice(0, 213) + (p.description.length > 213? "...":""),
    haveExpress,
    havePrisma,
    formattedCreatedAt: new Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(p.createdAt),
    ...counts
  };
};