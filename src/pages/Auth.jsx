import {
  TextField,
  Card,
  Typography,
  Button,
  FormGroup,
  FormLabel,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import { css } from "@emotion/react";
import { useReducer, useState } from "react";
import { btnStyles } from "../components/GlobalComponents/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useLogin from "../customHooksAndServices/loginHook";
import useRegister from "../customHooksAndServices/registrationHook";
import useAuth from "../customHooksAndServices/authContextHook";
const INT_REGEX = /^\d*$/;

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const initialErrorState = {
  username: "",
  password: "",
  passwordMatch: "",
  registerAge: "",
  registerEmail: "",
  registerFirstName: "",
  registerLastName: "",
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case "resetAllErrors":
      state.username = "";
      state.password = "";
      state.passwordMatch = "";
      state.registerFirstName = "";
      state.registerLastName = "";
      state.registerAge = "";
      state.registerEmail = "";
      return { ...state };
    case "setUsernameError":
      state.username = action.payload;
      return { ...state };
    case "setPasswordError":
      state.password = action.payload;
      return { ...state };
    case "setPasswordMatchError":
      state.passwordMatch = action.payload;
      return { ...state };
    case "setRegisterAgeError":
      state.registerAge = action.payload;
      return { ...state };
    case "setRegisterEmailError":
      state.registerEmail = action.payload;
      return { ...state };
    case "setRegisterFirstNameError":
      state.registerFirstName = action.payload;
      return { ...state };
    case "setRegisterLastNameError":
      state.registerLastName = action.payload;
      return { ...state };
    case "resetFirstNameError":
      state.registerFirstName = "";
      return { ...state };
    case "resetLastNameError":
      state.registerLastName = "";
      return { ...state };
    case "resetEmailError":
      state.registerEmail = "";
      return { ...state };
    case "resetAgeError":
      state.registerAge = "";
      return { ...state };
    case "resetPasswordMatchError":
      state.passwordMatch = "";
      return { ...state };
    case "resetUsernameError":
      state.username = "";
      return { ...state };
    case "resetPasswordError":
      state.password = "";
      return { ...state };
    default:
      return state;
  }
};

function Auth() {
  const [searchParams] = useSearchParams();
  const navigateTo = useNavigate();
  const [errorState, dispatchError] = useReducer(
    errorReducer,
    initialErrorState
  );
  const isLogin = searchParams.get("mode") === "login";
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { login } = useLogin();
  const { register } = useRegister();
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    batch: "1",
    confirmPassword: "",
  });

  function inputChangeHandler(e) {
    if (e.target.name === "age" && !INT_REGEX.test(e.target.value)) {
      return;
    }

    switch (e.target.name) {
      case "age":
        dispatchError({ type: "resetAgeError" });
        if (parseInt(e.target.value) < 18)
          dispatchError({
            type: "setRegisterAgeError",
            payload: "Age must be above 18",
          });
        else if (parseInt(e.target.value) > 65)
          dispatchError({
            type: "setRegisterAgeError",
            payload: "Age must be below 65",
          });
        break;
      case "firstName":
        dispatchError({ type: "resetFirstNameError" });
        if (e.target.value === "")
          dispatchError({
            type: "setRegisterFirstNameError",
            payload: "First Name cannot be empty",
          });
        else if (e.target.value.length < 3)
          dispatchError({
            type: "setRegisterFirstNameError",
            payload: "First Name must be atleast 3 characters",
          });
        break;
      case "lastName":
        dispatchError({ type: "resetLastNameError" });
        if (e.target.value === "")
          dispatchError({
            type: "setRegisterLastNameError",
            payload: "Last Name cannot be empty",
          });
        else if (e.target.value.length < 3)
          dispatchError({
            type: "setRegisterLastNameError",
            payload: "Last Name must be atleast 3 characters",
          });
        break;
      case "email":
        dispatchError({ type: "resetEmailError" });
        if (e.target.value === "")
          dispatchError({
            type: "setRegisterEmailError",
            payload: "Email cannot be empty",
          });
        else if (!EMAIL_REGEX.test(e.target.value))
          dispatchError({
            type: "setRegisterEmailError",
            payload: "Email is not valid",
          });
        break;
      case "confirmPassword":
        dispatchError({ type: "resetPasswordMatchError" });
        const passMatch = input.password === e.target.value;
        if (!passMatch && input.password !== "")
          dispatchError({
            type: "setPasswordMatchError",
            payload: "Passwords do not match",
          });
        break;
      case "password":
        dispatchError({ type: "resetPasswordError" });
        if (e.target.value === "")
          dispatchError({
            type: "setPasswordError",
            payload: "Password cannot be empty",
          });
        else if (!PWD_REGEX.test(e.target.value))
          dispatchError({
            type: "setPasswordError",
            payload:
              "Must be 8-24 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          });
        break;
      case "username":
        dispatchError({ type: "resetUsernameError" });
        if (e.target.value === "")
          dispatchError({
            type: "setUsernameError",
            payload: "Username cannot be empty",
          });
        else if (!USER_REGEX.test(e.target.value))
          dispatchError({
            type: "setUsernameError",
            payload:
              "Must be 4-24 characters long, contain only letters, numbers, and underscores, and start with a letter",
          });
    }

    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleLogin = async (e) => {
    setRequestInProgress(true);
    e.preventDefault();
    console.log(input);
    if (errorState.username || errorState.password) {
      setRequestInProgress(false);
      return;
    }
    const { username, password } = input;
    console.log(username, password);
    if (!username || !password) {
      return;
    }
    const data = await login({ username, loginPassword: password });
    setRequestInProgress(false);
    if (data.status === 200) {
      setUser(data.data.user);
      navigateTo("/");
    } else {
      window.alert(data.response.data);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      errorState.username ||
      errorState.password ||
      errorState.passwordMatch ||
      errorState.registerAge ||
      errorState.registerEmail ||
      errorState.registerFirstName ||
      errorState.registerLastName
    ) {
      return;
    }
    let { firstName, lastName, username, email, password, age, batch } = input;
    console.log(input);
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      age === "" ||
      batch === ""
    ) {
      return;
    }
    age = parseInt(age);
    if (age < 18 || age > 65) return;
    batch = parseInt(batch);
    setRequestInProgress(true);
    const data = await register({
      firstName,
      lastName,
      username,
      email,
      password,
      age,
      batch,
    });

    setRequestInProgress(false);
    if (data.status === 201) {
      setUser(data.data.user);
      navigateTo("/");
    } else {
      window.alert(data.response.data);
    }
  };

  return (
    <div css={styles}>
      <Card variant="outlined" sx={{ padding: 1 }} className="card">
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Welcome to Training Studio. {isLogin ? "Signin" : "Signup"} below
        </Typography>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin ? (
            <>
              {" "}
              <div>
                <FormLabel>Personal Information</FormLabel>
                <div css={styles2}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    className={styles.input}
                    sx={{ flex: 1 }}
                    name="firstName"
                    onChange={inputChangeHandler}
                    value={input.firstName}
                    error={errorState.registerFirstName !== ""}
                    helperText={errorState.registerFirstName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    className={styles.input}
                    sx={{ flex: 1 }}
                    // fullWidth
                    name="lastName"
                    onChange={inputChangeHandler}
                    value={input.lastName}
                    error={errorState.registerLastName !== ""}
                    helperText={errorState.registerLastName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Age"
                    variant="outlined"
                    className={styles.input}
                    fullWidth
                    name="age"
                    onChange={inputChangeHandler}
                    value={input.age}
                    error={errorState.registerAge !== ""}
                    helperText={errorState.registerAge}
                  />
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <FormLabel>Account Information</FormLabel>
                <div css={styles2}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className={styles.input}
                    sx={{ flex: 1 }}
                    name="email"
                    onChange={inputChangeHandler}
                    value={input.email}
                    error={errorState.registerEmail !== ""}
                    helperText={errorState.registerEmail}
                  />
                  <TextField
                    id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    className={styles.input}
                    sx={{ flex: 1 }}
                    name="username"
                    onChange={inputChangeHandler}
                    value={input.username}
                    error={errorState.username !== ""}
                    helperText={errorState.username}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    className={styles.input}
                    fullWidth
                    name="password"
                    onChange={inputChangeHandler}
                    value={input.password}
                    error={errorState.password !== ""}
                    helperText={errorState.password}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    className={styles.input}
                    fullWidth
                    name="confirmPassword"
                    onChange={inputChangeHandler}
                    value={input.confirmPassword}
                    error={errorState.passwordMatch !== ""}
                    helperText={errorState.passwordMatch}
                  />
                </div>
              </div>
              <FormControl
                sx={{
                  display: "grid",
                  justifyItems: "center",
                  marginTop: "1rem",
                }}
              >
                <FormLabel
                  id="demo-form-control-label-placement"
                  sx={{ justifySelf: "start" }}
                >
                  Select Batch Timing
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="batch"
                  defaultValue="top"
                >
                  <Grid container spacing={0.5}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="1"
                        control={<Radio onChange={inputChangeHandler} />}
                        checked={input.batch === "1"}
                        label="6-7AM"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="2"
                        control={<Radio onChange={inputChangeHandler} />}
                        checked={input.batch === "2"}
                        label="7-8AM"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="3"
                        control={<Radio onChange={inputChangeHandler} />}
                        checked={input.batch === "3"}
                        label="8-9AM"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="4"
                        control={<Radio onChange={inputChangeHandler} />}
                        checked={input.batch === "4"}
                        label="5-6PM"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                className={styles.input}
                sx={{ flex: 1 }}
                fullWidth
                name="username"
                onChange={inputChangeHandler}
                value={input.username}
                error={errorState.username !== ""}
                helperText={errorState.username}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className={styles.input}
                fullWidth
                name="password"
                margin="dense"
                onChange={inputChangeHandler}
                value={input.password}
                error={errorState.password !== ""}
                helperText={errorState.password}
              />
            </>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <Typography>
              {isLogin ? "Don't have a acouunt?" : "Already a member?"}
            </Typography>
            <Link
              to={`/auth?mode=${isLogin ? "signup" : "login"}`}
              style={{ display: "inline-block" }}
            >
              {isLogin ? "Signup" : "SignIn"}
            </Link>
          </div>
          <Button
            variant="contained"
            type="submit"
            css={btnStyles}
            size="large"
            sx={{ mt: 2, padding: 3 }}
            disabled={
              requestInProgress ||
              errorState.username !== "" ||
              errorState.password !== "" ||
              errorState.passwordMatch !== "" ||
              errorState.registerAge !== "" ||
              errorState.registerEmail !== "" ||
              errorState.registerFirstName !== "" ||
              errorState.registerLastName !== ""
            }
          >
            {isLogin ? "Signin" : "Signup"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

const styles = css`
  position: relative;
  padding-block: 80.33px 2rem;
  min-height: 100svh;
  background: rgba(35, 45, 57, 0.8);
  .card {
    width: 70%;
    max-width: 700px;
    margin-top: 2rem;
    margin-inline: auto;
  }
  @media (max-width: 1000px) {
    padding-block: 70px 2rem;
  }
`;
const styles2 = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default Auth;
