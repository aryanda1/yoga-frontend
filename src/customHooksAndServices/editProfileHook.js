import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useEditProfile() {
  const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();

  const editProfileInfo = async ({ editProperty, editValue, isFormData }) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        editProperty,
        editValue,
      }),
    };
    if (isFormData) {
      options.headers["Content-Type"] = "multipart/form-data";
      options.data = editValue;
    }
    console.log(options.headers);
    return axiosPrivateService("/api/editprofile", options)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  return { editProfileInfo };
}
