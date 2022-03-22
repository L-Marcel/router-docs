import { Prisma } from "@prisma/client";
import { Accounts } from "../models/accounts";
import { ProjectVersions } from "../models/projectVersions";
import { Routes } from "../models/routes";
import { Github } from "../services/github";
import { dateFormat } from "./dateFormat";

async function projectFormat(
  p: Project,
  authenticatedUserId: string, 
  {
    getVersions = true, 
    getCount = true,
  },
  versions?: Prisma.ProjectVersionCreateNestedManyWithoutProjectInput,
) {
  const github = new Github();
  await github.init(authenticatedUserId);

  const projectVersions = getVersions? await ProjectVersions.list({
    project: {
      id: p.id
    }
  }):versions;

  const routes = await Routes.list({
    projectVersion: {
      project: {
        id: p.id
      }
    }
  });

  const counts = getCount? routes.reduce<RouteTypesCount>((c, r) => {
    ++c[`${r.type}s`];
    return c;
  }, {
    posts: 0,
    gets: 0,
    puts: 0,
    deletes: 0
  }):{};

  const projectPackagePath = await github.getRepositoryPackageJSON(p.repository);
  const haveExpress = projectPackagePath?.dependencies?.express !== undefined;
  const havePrisma = projectPackagePath?.dependencies["@prisma/client"] !== undefined;

  return {
    ...p,
    formattedName: p.name.slice(0, 17) + (p.name.length > 17? "...":""),
    formattedDescription: p.description.slice(0, 213) + (p.description.length > 213? "...":""),
    haveExpress,
    havePrisma,
    formattedCreatedAt: dateFormat(p.createdAt),
    ...counts,
    versions: projectVersions
  };
};

export { projectFormat };