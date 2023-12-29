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
      if (data.data.user && data.data.user.payments.length > 0)
        data.data.user.payments = processPayments(data.data.user.payments);
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export default function useLogin() {
  return { login };
}
