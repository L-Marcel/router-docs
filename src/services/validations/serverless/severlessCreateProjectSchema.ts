import Joi from "joi";

export const severlessCreateProjectSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  repository: Joi.string().required(),
  description: Joi.string().optional().max(800).allow(""),
  root: Joi.string().optional().max(200).allow(""),
  baseUrl: Joi.string().optional().max(200).allow(""),
  version: Joi.string().required().max(10).min(1)
}).required();
