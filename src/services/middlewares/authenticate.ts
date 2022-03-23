import { getToken } from "next-auth/jwt";
import { Users } from "../../models/users";

const secret = process.env.NEXTAUTH_SECRET;

export async function authenticate(req: ReqWithUser, res: Res, next: () => Promise<void>) {
  const { user: userId } = req.headers;
  const token = await getToken({ req, secret });

  const user = await Users.find({
    id: String(userId)
  });


  if(!user || !token || token.name !== user.name || token.email !== user.email) {
    console.log("a");
    return res.status(401).json({
      message: "Unauthorized"
    });
  };

  req.user = user;

  await next();
};