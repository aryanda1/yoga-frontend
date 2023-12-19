import React from "react";
import "./App.css";
import Landing from "./pages/Landing";
import Root from "./pages/Root";
import Auth from "./pages/Auth";
import EditProfile from "./pages/EditProfile";
import {
  createBrowserRouter,
  Route,
  Routes,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Landing />} />
      <Route path="auth" element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
