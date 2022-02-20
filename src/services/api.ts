import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? undefined;

export const api = axios.create({
  baseURL: baseUrl
});

