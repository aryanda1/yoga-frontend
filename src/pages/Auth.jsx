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
import { useState } from "react";
import { btnStyles } from "../components/GlobalComponents/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useLogin from "../customHooksAndServices/loginHook";
import useRegister from "../customHooksAndServices/registrationHook";
import useAuth from "../customHooksAndServices/authContextHook";
const intRegex = /^\d*$/;
function Auth() {
  const [searchParams] = useSearchParams();
  const navigateTo = useNavigate();
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
  });
  function formSubmitHandler(e) {
    e.preventDefault();
  }
  function inputChangeHandler(e) {
    if (e.target.name === "age" && !intRegex.test(e.target.value)) {
      return;
    }
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleLogin = async (e) => {
    setRequestInProgress(true);
    e.preventDefault();
    console.log(input);
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
                  />
                  <TextField
                    id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    className={styles.input}
                    sx={{ flex: 1 }}
                    // fullWidth
                    name="username"
                    onChange={inputChangeHandler}
                    value={input.username}
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
