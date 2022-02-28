import { setCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { baseUrl } from "../../services/api";

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code } = req.query;
    const data = await fetch(`${baseUrl}/users/login?code=${code}`, {
      headers: {
        "METHOD": "GET"
      }
    })
    .then(res => res.json());

    setCookies("token", data.token, { req, res, maxAge: 60 * 60 * 24 });
    setCookies("user", data.user, { req, res, maxAge: 60 * 60 * 24 });

    return res.redirect("/me");
  } catch (error) {
    return res.redirect(`/error?type=login`);
  };
};