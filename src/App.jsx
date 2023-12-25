import React from "react";
import "./App.css";
// import Landing from "./pages/Landing";
import Root from "./pages/Root";
// import Auth from "./pages/Auth";
import {
  createBrowserRouter,
  Route,
  Routes,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoutes from "./pages/ProtectedRoutes";
// import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import Overlay from "./components/Main/Overlay";

const ProfileLazy = lazy(() => import("./pages/Profile"));

const LandingLazy = lazy(() => import("./pages/Landing"));

const AuthLazy = lazy(() => import("./pages/Auth"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error404 />}>
      <Route
        index
        element={
          <Suspense fallback={<Overlay text="Loading..." />}>
            <LandingLazy />
          </Suspense>
        }
      />
      <Route
        path="auth"
        element={
          <Suspense fallback={<Overlay text="Loading..." />}>
            <AuthLazy />
          </Suspense>
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Overlay text="Loading..." />}>
              <ProfileLazy />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
