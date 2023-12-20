import axiosService from "../axios/axiosBase";

const contact = async (contactFormDetails) => {
  return axiosService("/contactUs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(contactFormDetails),
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export default function useContact() {
  return { contact };
}
