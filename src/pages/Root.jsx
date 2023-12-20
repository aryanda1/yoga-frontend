import { Outlet, useSubmit } from "react-router-dom";
// import AppBar from "./AppBar";
import Nav from "../components/Navbar/Nav";
import Overlay from "../components/Main/Overlay";
import { useEffect } from "react";
import useRefreshToken from "../customHooksAndServices/refreshTokenHook";
// import { useLoaderData } from "react-router-dom";
// import { getTokenDuration } from "./utils/auth";
export default function Root() {
  const { refreshToken } = useRefreshToken();
  useEffect(() => {
    refreshToken();
  }, []);
  // const token = useLoaderData();
  // const submit = useSubmit();
  // useEffect(() => {
  //   if (!token) return;
  //   let tokenDur = getTokenDuration();
  //   tokenDur = tokenDur > 0 ? tokenDur : 0;
  //   setTimeout(() => {
  //     submit(null, { method: "POST", action: "/logout" });
  //   }, tokenDur);
  // }, [submit, token]);
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
