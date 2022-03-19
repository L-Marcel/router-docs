import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";

export class ProjectVersions {
  static async create(projectVersions: Prisma.ProjectVersionCreateInput) {
    return await db.projectVersion.create({
      data: {
        ...projectVersions
      }
    });
  };
  static async find(where: Prisma.ProjectVersionWhereInput) {
    return await db.projectVersion.findFirst({
      where
    });
  };
  static async list(where?: Prisma.ProjectVersionWhereInput) {
    return await db.projectVersion.findMany({
      where,
      orderBy: {
        createdAt: "asc"
      }
    });
  };
  static async update(id: string, projectVersions: Prisma.ProjectVersionUpdateInput) {
    return await db.projectVersion.update({
      data: projectVersions,
      where: {
        id
      }
    });
  };
  static async delete(id: string) {
    return await db.projectVersion.delete({
      where: {
        id
      }
    });
  }; 
};