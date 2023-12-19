import axios from "axios";
// import "dotenv/config";
const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE,
  withCredentials: true,
});

export const axiosPrivateService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE,
  withCredentials: true,
});

export default axiosService;
