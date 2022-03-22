import { authenticate } from "./authenticate";
import { label } from "next-api-middleware";
import { validate } from "./validate";
import { severlessCreateProjectSchema } from "../validations/serverless/severlessCreateProjectSchema";
import { severlessGenerateProjectTemplateSchema } from "../validations/serverless/severlessGenerateProjectTemplateSchema";

const createProjectValidate: Middleware = async(req, res, next) => 
await validate(req, res, next, severlessCreateProjectSchema);

const generateProjectTemplateValidate: Middleware = async(req, res, next) => 
await validate(req, res, next, severlessGenerateProjectTemplateSchema);

export const withMiddleware = label({
  authenticate,
  createProjectValidate,
  generateProjectTemplateValidate
});