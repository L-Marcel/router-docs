import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";
import { projectFormat } from "../utils/projectFormat";

export class Projects {
  static async checkUserSpecialPermissions(id?: string, tokenUserId?: string) {
    const project = await Projects.find({
      id,
      user: {
        id: tokenUserId
      }
    });

    if(!project) {
      return false;
    };

    return true;
  };
  static async create(project: Prisma.ProjectCreateInput, userId: string) {
    const formattedProject = await projectFormat({ ...project } as any, userId, {
      getCount: false,
      getVersions: false,
    }, project.versions);

    return await db.project.create({
      data: {
        ...formattedProject
      },
    });
  };
  static async find(where: Prisma.ProjectWhereInput) {
    return await db.project.findFirst({
      where
    });
  };
  static async list(where?: Prisma.ProjectWhereInput) {
    return await db.project.findMany({
      where,
      include: {
        versions: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  };
  static async update(id: string, project: Prisma.ProjectUpdateInput) {
    return await db.project.update({
      data: project,
      where: {
        id
      }
    });
  };
  static async delete(id: string) {
    return await db.project.delete({
      where: {
        id
      }
    });
  }; 
};