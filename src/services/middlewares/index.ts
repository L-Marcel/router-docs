import { authenticate } from "./authenticate";
import { label } from "next-api-middleware";

export const withMiddleware = label({
  authenticate
});