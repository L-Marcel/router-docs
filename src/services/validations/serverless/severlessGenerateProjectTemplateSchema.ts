import Joi from "joi";

export const severlessGenerateProjectTemplateSchema = Joi.object({
  version: Joi.string(),
  project: Joi.string().uuid().required(),
  id: Joi.string().uuid().when("version", {
    not: Joi.string(),
    then: Joi.string().required()
  })
}).required();
