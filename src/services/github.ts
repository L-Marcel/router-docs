import { api } from "./api";
import { db } from "./prismaClient";

export class Github {
  static async getRepositories(id: string, page = 1, previousData = []) {
    const { providerAccountId, access_token: token } = await db.account.findFirst({
      where: {
        user: {
          id,
        }
      }
    });

    //62476762
    return await api.get(`https://api.github.com/user/${providerAccountId}/repos?page=${page}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(async(res) => {
      const repositories = await Promise.all(res.data.map(async(r, i) => {
        const projectPackagePath = await this.getRepositoryPackageJSON(r.full_name, token);
        const haveExpress = projectPackagePath?.dependencies?.express !== undefined;
        const havePrisma = projectPackagePath?.dependencies["@prisma/client"] !== undefined;

        if(r.name === "router-docs") {
          console.log(projectPackagePath, haveExpress, havePrisma);
        };
        
        return {
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          haveExpress,
          havePrisma
        };
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
    }).catch(() => []);
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