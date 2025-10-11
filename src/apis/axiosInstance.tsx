import axios from "axios";
import { ENV } from "@/config/runtimeEnv";

const axiosInstance = axios.create({
  baseURL: ENV.apiBase(),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
