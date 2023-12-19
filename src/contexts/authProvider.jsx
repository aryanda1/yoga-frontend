import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: {
    accessToken: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    batch: "",
    payments: [],
    joiningDate: "",
  },
  setUser: () => {},
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState({
    accessToken: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    batch: "",
    payments: [],
    joiningDate: "",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
