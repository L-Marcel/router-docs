import axios from "axios";
import { signOut } from "next-auth/react";
import Router from "next/router";
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
})

api.interceptors.response.use(config => config, (error) => {
  const { response: res, config } = error;

  /*if(res.status === 401 && !config._notFirstError && config.url.inclues("github")) {
    error.config._notFirstError = true;
    console.log(config.url);

    return api(config);
  } else if(res.status === 401) {
    console.log(config, "sing out");
    signOut().then(() => {
      Router.push("/");
      localStorage.removeItem("user");
    });
  };*/

  return Promise.reject(error);
})

export { api };
