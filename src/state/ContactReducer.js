const initialErrorState = {
  contactEmail: "",
  contactName: "",
  contactMessage: "",
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case "resetAllErrors":
      state.contactName = "";
      state.contactMessage = "";
      state.contactEmail = "";
      return { ...state };
    case "setContactMessageError":
      state.contactMessage = action.payload;
      return { ...state };
    case "setContactEmailError":
      state.contactEmail = action.payload;
      return { ...state };
    case "setContactNameError":
      state.contactName = action.payload;
      return { ...state };
    case "resetNameError":
      state.contactName = "";
      return { ...state };
    case "resetEmailError":
      state.contactEmail = "";
      return { ...state };
    case "resetMessageError":
      state.contactMessage = "";
      return { ...state };
    default:
      return state;
  }
};

export { initialErrorState, errorReducer };
