import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function usePaymentSubmission() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();

  const paymentSubmission = async ({ months }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        months,
      }),
    };

    return axiosPrivateService("/api/pay", options)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  return { paymentSubmission };
}
