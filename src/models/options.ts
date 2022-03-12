import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";

export class Routes {
  static async create(route: Prisma.RouteCreateInput) {
    return await db.route.create({
      data: route,
    });
  };
  static async find(where: Prisma.RouteWhereInput) {
    return await db.route.findFirst({
      where
    });
  };
  static async list(where?: Prisma.RouteWhereInput) {
    return await db.route.findMany({
      where,
      orderBy: {
        position: "asc",
      }
    });
  };
  static async update(id: string, route: Prisma.RouteUpdateInput) {
    return await db.route.update({
      data: route,
      where: {
        id
      }
    });
  };
  static async delete(id: string) {
    return await db.route.delete({
      where: {
        id
      }
    });
  }; 
};