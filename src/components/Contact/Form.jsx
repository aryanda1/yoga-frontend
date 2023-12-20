import { css } from "@emotion/react";

import React, { useState } from "react";
import { btnStyles } from "../GlobalComponents/Button";
import ContactBg from "../Image/contactBg.jpg";
import { useReducer } from "react";
import { errorReducer, initialErrorState } from "../../state/ContactReducer";
import { TextField, Button } from "@mui/material";
import useContact from "../../customHooksAndServices/ContactHook";
import Textarea from "./TextArea";

const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const Form = ({ text }) => {
  const { contact } = useContact();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [errorState, dispatchError] = useReducer(
    errorReducer,
    initialErrorState
  );
  const [input, setInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const inputChangeHandler = (e) => {
    console.log(e.target.name, e.target.value, errorState);
    switch (e.target.name) {
      case "name":
        dispatchError({ type: "resetNameError" });
        if (e.target.value === "")
          dispatchError({
            type: "setContactNameError",
            payload: "Name cannot be empty",
          });
        else if (e.target.value.length < 3)
          dispatchError({
            type: "setContactNameError",
            payload: "Name must be atleast 3 characters",
          });
        break;
      case "message":
        dispatchError({ type: "resetMessageError" });
        if (e.target.value === "")
          dispatchError({
            type: "setContactMessageError",
            payload: "Message cannot be empty",
          });
        else if (e.target.value.length < 5)
          dispatchError({
            type: "setContactMessageError",
            payload: "Message must be atleast 5 characters",
          });
        break;
      case "email":
        dispatchError({ type: "resetEmailError" });
        if (e.target.value === "")
          dispatchError({
            type: "setContactEmailError",
            payload: "Email cannot be empty",
          });
        else if (!EMAIL_REGEX.test(e.target.value))
          dispatchError({
            type: "setContactEmailError",
            payload: "Email is not valid",
          });
        break;
    }
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setRequestInProgress(true);
    e.preventDefault();
    console.log(input);
    if (
      errorState.contactName ||
      errorState.contactEmail ||
      errorState.contactSubject ||
      errorState.contactMessage
    ) {
      setRequestInProgress(false);
      return;
    }
    // if (!username || !password) {
    //   return;
    // }
    const data = await contact(input);
    setRequestInProgress(false);
    if (data.status === 200) {
      window.alert("Email sent successfully!");
      setInput({ name: "", email: "", message: "", subject: "" });
    } else {
      window.alert(data.response.data);
    }
  };
  return (
    <div css={styles} className="formContainer">
      <form onSubmit={handleSubmit}>
        <TextField
          className="input"
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
          name="name"
          onChange={inputChangeHandler}
          value={input.name}
          error={errorState.contactName !== ""}
          helperText={errorState.contactName || " "}
        />
        <TextField
          className="input"
          id="outlined-basic"
          label="Your Email"
          variant="outlined"
          name="email"
          onChange={inputChangeHandler}
          value={input.email}
          error={errorState.contactEmail !== ""}
          helperText={errorState.contactEmail || " "}
        />
        <TextField
          className="input"
          id="outlined-basic"
          label="Your Subject"
          variant="outlined"
          name="subject"
          onChange={inputChangeHandler}
          value={input.subject}
          helperText=" "
          sx={{ gridColumn: "span 2" }}
        />
        <Textarea
          name="message"
          label="Message"
          placeholder="Enter your message ..."
          styles={{ gridColumn: "span 2" }}
          helperText={errorState.contactMessage || " "}
          value={input.message}
          onChangeHandler={inputChangeHandler}
          err={errorState.contactMessage !== ""}
        />
        <Button
          variant="contained"
          type="submit"
          css={btnStyles}
          size="large"
          sx={{ mt: 2, padding: 3 }}
          disabled={
            requestInProgress ||
            errorState.contactEmail !== "" ||
            errorState.contactMessage !== "" ||
            errorState.contactName !== ""
          }
        >
          SEND A MESSAGE
        </Button>
      </form>
    </div>
  );
};

const styles = css`
  width: 100%;
  padding: 80px;
  min-height: 60vh;
  display: flex;
  background: url("${ContactBg}") no-repeat center/cover;
  form {
    margin: auto;
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    width: 100%;
    background: #fff;
    padding: 40px;
    border-radius: 6px;
    column-gap: 10px;
  }
  & * {
    // flex: 1;
  }
  @media (max-width: 1200px) {
    padding: 80px 30px;
    form {
      max-width: 900px;
    }
  }
  @media (max-width: 768px) {
    form {
      display: block;
    }
    .input {
      width: 100%;
    }
  }
`;

export default Form;
