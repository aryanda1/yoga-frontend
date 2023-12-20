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

export { initialErrorState, errorReducer };
