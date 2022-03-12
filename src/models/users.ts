import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";

export class Users {
  static async create(user: Prisma.UserCreateInput) {
    return await db.user.create({
      data: user
    });
  };
  static async find(where: Prisma.UserWhereInput) {
    return await db.user.findFirst({
      where
    });
  };
  static async list(where?: Prisma.UserWhereInput) {
    return await db.user.findMany({
      where
    });
  };
  static async update(id: string, user: Prisma.UserUpdateInput) {
    return await db.user.update({
      data: user,
      where: {
        id
      }
    });
  };
  static async delete(id: string) {
    return await db.user.delete({
      where: {
        id
      }
    });
  }; 
};