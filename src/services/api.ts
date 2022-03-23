import axios from "axios";
import { localStorageExist } from "../utils/localStorageExists";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? undefined;

const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(config => {
  if(localStorageExist() && !config.headers.common["user"]) {
    const user = JSON.parse(localStorage?.getItem("user"));
    config.headers.common["user"] = user?.id;
    api.defaults.headers.common["user"] = user?.id;
  };

  return config;
});

export { api };
