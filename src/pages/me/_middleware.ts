import { NextResponse } from "next/server";

export async function middleware() {
  const authorized = fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/verify")
  .then(() => true).catch(() => false);

  if(!authorized) {
    return NextResponse.redirect("/error?type=401");
  };

  return NextResponse.next();
};