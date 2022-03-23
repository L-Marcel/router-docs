import { authenticate } from "./authenticate";
import { label } from "next-api-middleware";
import { validate } from "./validate";
import { severlessCreateProjectSchema } from "../validations/serverless/severlessCreateProjectSchema";
import { severlessGenerateProjectTemplateSchema } from "../validations/serverless/severlessGenerateProjectTemplateSchema";
import { permissions } from "./permissions";
import { Projects } from "../../models/projects";

//Permissions

const projectPermissions: Middleware = async(req, res, next) => 
await permissions(req, res, next, Projects.checkUserSpecialPermissions);

const projectVersionPermissions: Middleware = async(req, res, next) => 
await permissions(req, res, next, Projects.checkUserSpecialPermissions, req.body.project);

//Validations

const createProjectValidate: Middleware = async(req, res, next) => 
await validate(req, res, next, severlessCreateProjectSchema);

const generateProjectTemplateValidate: Middleware = async(req, res, next) => 
await validate(req, res, next, severlessGenerateProjectTemplateSchema);

export const withMiddleware = label({
  authenticate,
  projectPermissions,
  projectVersionPermissions,
  createProjectValidate,
  generateProjectTemplateValidate
});