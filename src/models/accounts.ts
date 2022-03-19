import { Prisma } from "@prisma/client";
import { db } from "../services/prismaClient";

export class Accounts {
  static async create(Account: Prisma.AccountCreateInput) {
    return await db.account.create({
      data: Account
    });
  };
  static async find(where: Prisma.AccountWhereInput) {
    return await db.account.findFirst({
      where
    });
  };
  static async list(where?: Prisma.AccountWhereInput) {
    return await db.account.findMany({
      where
    });
  };
  static async update(id: string, Account: Prisma.AccountUpdateInput) {
    return await db.account.update({
      data: Account,
      where: {
        id
      }
    });
  };
  static async delete(id: string) {
    return await db.account.delete({
      where: {
        id
      }
    });
  }; 
};