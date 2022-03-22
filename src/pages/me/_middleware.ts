import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: Req) {
  console.log(req, process.env.NEXTAUTH_SECRET);
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  console.log(token);

  if(!token) {
    console.log("bug!");
    return NextResponse.redirect("/error?type=401");
  };

  return NextResponse.next();
};