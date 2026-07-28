import axios from "axios";

// import.meta.env.PROD is set by Vite at build time and CANNOT be overridden
// by any environment variable — it is always true in production builds.
// This guarantees /api is used on Vercel regardless of dashboard env vars.
const API_URL = import.meta.env.PROD
  ? "/api"
  : (import.meta.env.VITE_API_URL || "http://localhost:5000/api");

export const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default publicApi;