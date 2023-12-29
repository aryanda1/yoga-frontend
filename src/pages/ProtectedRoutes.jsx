import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "../customHooksAndServices/refreshTokenHook";
import { useEffect, useState } from "react";
import Overlay from "../components/Main/Overlay";

export default function ProtectedRoutes() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const token = user.accessToken;
  const { refreshToken } = useRefreshToken();
  const navigateTo = useNavigate();
  const decodedToken = token ? jwtDecode(token) : null;
  const location = useLocation();
  const currentTime = Date.now() / 1000;

  useEffect(() => {
    if (decodedToken && decodedToken.exp > currentTime) {
      setTimeout(() => setLoading(false), 500); // To prevent the loading screen from flashing on the screen
    } else {
      refreshToken()
        .then((data) => {
          setTimeout(() => setLoading(false), 500);
        })
        .catch((err) => {
          setTimeout(() => setLoading(false), 500);
          // console.log(err);
          navigateTo("/", { state: { from: location }, replace: true });
        });
    }
  }, [decodedToken, currentTime, refreshToken, navigateTo, location]);

  return loading ? <Overlay text="Loading..." /> : <Outlet />;
}
