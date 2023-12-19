import axiosService from "../axios/axiosBase";

const login = async (credentials) => {
  return axiosService("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(credentials),
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export default function useLogin() {
  return { login };
}
