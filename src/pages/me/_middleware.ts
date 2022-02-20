import { checkCookies, getCookies } from "cookies-next";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async function auth(req: NextApiRequest) {
  const cookiesExists = checkCookies("token", { req }) && checkCookies("user", { req });

  if(cookiesExists) {
    return NextResponse.next();
  };

  return NextResponse.redirect("/");
};