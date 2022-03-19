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
    } else {
      this.token = user.token;
      this.account = user.account;
    };
  };
  
  async getRepository(fullName: string): Promise<Repository | void> {
    const { token } = this;

    return await api.get(`https://api.github.com/repos/${fullName}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async(res) => {
      const r = res.data;
      const projectPackagePath = await this.getRepositoryPackageJSON(r.full_name, token);
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
    }).catch(res => console.log(res));
  };

  async getRepositories(
    page = 1, 
    previousData: Repository[] = []
  ): Promise<Repository[]> {
    const { account, token } = this;

    return await api.get(`https://api.github.com/user/${account}/repos?page=${page}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async(res) => {
      const repositories: Repository[] = await Promise.all(res.data.map(async(r, i) => {
        const projectPackagePath = await this.getRepositoryPackageJSON(r.full_name, token);
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
      }));

      const filteredRepositories = repositories.filter(r => r.haveExpress || r.havePrisma);
      
      const allRepositories = [
        ...previousData,
        ...filteredRepositories
      ];

      if(repositories.length >= 30) {
        return await this.getRepositories(++page, allRepositories);
      };

      return allRepositories;
    }).catch((err) => {
      return [];
    });
  };
  async getRepositoryPackageJSON(reposFullName: string, token: string) {
    return await api.get(`https://raw.githubusercontent.com/${reposFullName}/master/package.json`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(res => {
      return res.data;
    }).catch(() => {});
  };
};