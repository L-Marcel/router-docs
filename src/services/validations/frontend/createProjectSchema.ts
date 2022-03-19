import * as yup from "yup";

export const createProjectSchema = yup.object({
  name: yup.string().required().min(3).max(20),
  repository: yup.string().required(),
  description: yup.string().optional().max(800),
  root: yup.string().optional().max(200),
  baseUrl: yup.string().optional().max(200)
}).required();
