import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";

export class Projects {
  static async create(project: Prisma.ProjectCreateInput) {
    return await db.project.create({
      data: project
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