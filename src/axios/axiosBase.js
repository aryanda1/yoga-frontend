import axios from "axios";
// import "dotenv/config";
const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosPrivateService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosService;
