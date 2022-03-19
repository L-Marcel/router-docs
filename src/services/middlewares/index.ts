import { authenticate } from "./authenticate";
import { label } from "next-api-middleware";
import { validate } from "./validate";
import { severlessCreateProjectSchema } from "../validations/serverless/severlessCreateProjectSchema";

const createProjectValidate: Middleware = async(req, res, next) => 
await validate(req, res, next, severlessCreateProjectSchema);

export const withMiddleware = label({
  authenticate,
  createProjectValidate
});