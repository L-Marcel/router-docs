import { Projects } from "../models/projects";
import { api } from "./api";
import { db } from "./prismaClient";

export class Github {
  token: string;
  account: string;
  
  async init(user: string | {
    token: string,
    account: string
  }) {
    if(typeof user === "string") {
      const { providerAccountId, access_token } = await db.account.findFirst({
        where: {
          user: {
            id: user,
          }
        }
      });

      this.token = access_token;
      this.account = providerAccountId;

      api.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      this.token = user.token;
      this.account = user.account;

      api.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    };

    return this;
  };

  async getUser() {
    const { account } = this;
    return await api.get<GithubUser>(`https://api.github.com/user/${account}`)
    .then(res => res.data);
  };
  
  async getRepository(fullName: string): Promise<Repository | void> {
    return await api.get(`https://api.github.com/repos/${fullName}`)
    .then(async(res) => {
      const r = res.data;
      const projectPackagePath = await this.getRepositoryPackageJSON(r.full_name);
      const haveExpress = projectPackagePath?.dependencies?.express !== undefined;
      const havePrisma = projectPackagePath?.dependencies["@prisma/client"] !== undefined;

      return {
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        haveExpress,
        havePrisma,
        version: projectPackagePath?.version ?? "1.0.0"
      } as Repository;
    });
  };

  async getRepositories(
    justNotInUse: boolean = false,
    page = 1, 
    previousData: Repository[] = []
  ): Promise<Repository[]> {
    const { account } = this;
    return await api.get(`https://api.github.com/user/${account}/repos?page=${page}`)
    .then(async(res) => {
      const repositories: Repository[] = await Promise.all(res.data.map(async(r, i) => {
        const projectPackagePath = await this.getRepositoryPackageJSON(r.full_name);

        let haveExpress = false;
        let havePrisma = false;

        if(projectPackagePath?.dependencies) {
          haveExpress = projectPackagePath?.dependencies?.express !== undefined;
          havePrisma = projectPackagePath?.dependencies["@prisma/client"] !== undefined;
        };

        const inUse = justNotInUse? await Projects.find({
          repository: r.full_name.toLowerCase()
        }):false;

        return {
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          haveExpress,
          havePrisma,
          version: projectPackagePath?.version ?? "1.0.0",
          inUse: inUse? true:false
        } as Repository;
      }));

      const filteredRepositories = repositories.filter(r => 
        (r.haveExpress || r.havePrisma) && (!r.inUse || !justNotInUse)
      );
      
      const allRepositories = [
        ...previousData,
        ...filteredRepositories
      ];

      if(repositories.length >= 30) {
        return await this.getRepositories(justNotInUse, ++page, allRepositories);
      };

      return allRepositories;
    });
  };

  async getRepositoryPackageJSON(reposFullName: string) {
    return await api.get(`https://raw.githubusercontent.com/${reposFullName}/master/package.json`).
    then(res => {
      return res.data;
    }).catch(err => {
      if(err.status !== 404) {
        return err;
      };

      return undefined;
    });
  };
};