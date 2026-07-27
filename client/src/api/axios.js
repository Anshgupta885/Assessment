import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default publicApi;