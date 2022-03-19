import Joi from "joi";
import { Users } from "../../models/users";
import { getError } from "../../utils/error";

export async function validate(req: ReqWithUser, res: Res, next: () => Promise<void>, schema: Joi.ObjectSchema) {
  const data = req.body;
  const validation = await schema.validateAsync(data);

  if(!validation) {
    return getError(res, 400, "Invalid format");
  };

  await next();
};