import axiosService from "../axios/axiosBase";
import useAuth from "./authContextHook";

const useRefreshToken = () => {
  const { user, setUser } = useAuth();
  const refreshToken = async () => {
    return axiosService("/api/refresh", {
      method: "GET",
      withCredentials: true,
    })
      .then((data) => {
        console.log(data.data.user);
        setUser(data.data.user);
        console.log(user);
        return data.data.user;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
  return { refreshToken };
};

export default useRefreshToken;
