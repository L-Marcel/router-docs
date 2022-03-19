import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "../../../services/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import log from "log-to-file";

export default NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
});