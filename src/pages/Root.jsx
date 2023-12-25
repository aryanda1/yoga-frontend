import { Outlet, useSubmit } from "react-router-dom";
// import AppBar from "./AppBar";
import Nav from "../components/Navbar/Nav";

export default function Root() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
