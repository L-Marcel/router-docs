import Joi from "joi";

export async function validate(req: ReqWithUser, res: Res, next: () => Promise<void>, schema: Joi.ObjectSchema) {
  const data = req.body;
  const validation = await schema.validateAsync(data);

  if(!validation) {
    return res.status(400).json({
      message: "Invalid format"
    });
  };

  await next();
};