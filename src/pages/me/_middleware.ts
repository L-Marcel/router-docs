import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: Req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  if(!token) {
    return NextResponse.redirect("/error?type=401");
  };

  return NextResponse.next();
};