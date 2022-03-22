import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function verify(req: Req, res: Res) {
  const token = await getToken({ req, secret });
  console.log(req, secret);

  if(!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  };

  return res.status(200).json({
    message: "Authorized"
  });
};