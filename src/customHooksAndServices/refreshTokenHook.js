import axiosService from "../axios/axiosBase";
import useAuth from "./authContextHook";
import { processPayments } from "../utils";
const useRefreshToken = () => {
  const { user, setUser } = useAuth();
  const refreshToken = async () => {
    return axiosService("/api/refresh", {
      method: "GET",
      withCredentials: true,
    })
      .then((data) => {
        if (data.data.user && data.data.user.payments.length > 0)
          data.data.user.payments = processPayments(data.data.user.payments);

        setUser(data.data.user);
        return data.data.user;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
  return { refreshToken };
};

export default useRefreshToken;
