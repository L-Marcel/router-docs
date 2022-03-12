import { Users } from "../../models/users";
import { getError } from "../../utils/error";

export async function authenticate(req: ReqWithUser, res: Res, next: () => Promise<void>) {
  const { user: userId } = req.headers;

  const user = await Users.find({
    id: String(userId)
  });

  if(!user) {
    return getError(res, 401, "Unauthorized");
  };

  req.user = user;

  await next();
};