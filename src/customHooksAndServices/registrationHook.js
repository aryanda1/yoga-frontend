import axiosService from "../axios/axiosBase";

const register = async (credentials) => {
  return axiosService("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: credentials,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export default function useRegister() {
  return { register };
}
