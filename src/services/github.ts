import { api } from "./api";
import { db } from "./prismaClient";

export class Github {
  static async getRepositories(id: string, page = 1, previousData: Repository[] = []): Promise<Repository[]> {
    const { providerAccountId, access_token: token } = await db.account.findFirst({
      where: {
        user: {
          id,
        }
      }
    });
    
    return await api.get(`https://api.github.com/user/${providerAccountId}/repos?page=${page}`, {
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

      //Filter not work with Promise.all
      const filteredRepositories = repositories.filter(r => r.haveExpress || r.havePrisma);
      
      const allRepositories = [
        ...previousData,
        ...filteredRepositories
      ];

      if(repositories.length >= 30) {
        return await this.getRepositories(id, ++page, allRepositories);
      };

      return allRepositories;
    }).catch((err) => {
      return [];
    });
  };
  static async getRepositoryPackageJSON(reposFullName: string, token: string) {
    return await api.get(`https://raw.githubusercontent.com/${reposFullName}/master/package.json`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(res => {
      return res.data;
    }).catch(() => {});
  };
};