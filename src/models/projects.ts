import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";
import { projectFormat } from "../utils/projectFormat";

export class Projects {
  static async create(project: Prisma.ProjectCreateInput, userId: string) {
    const formattedProject = await projectFormat({ ...project } as any, userId, false);

    return await db.project.create({
      data: {
        ...formattedProject
      }
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