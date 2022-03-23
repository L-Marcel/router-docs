import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "../../../services/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { api } from "../../../services/api";
import { Users } from "../../../models/users";
import { Accounts } from "../../../models/accounts";
import { Github } from "../../../services/github";

export default NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    session: async({ session }) => {
      let user = await Users.find({
        ...session.user
      });

      if(!user) {
        user = await Users.create({
          ...session.user
        });
      };

      api.defaults.headers.common["user"] = user.id;

      return session;
    }
  }
});