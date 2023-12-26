import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../customHooksAndServices/authContextHook";
import useLogout from "../../customHooksAndServices/logoutHook";
import { css } from "@emotion/react";
function UserMenu({ show }) {
  const { logout } = useLogout();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout().then(() => {
      setUser({
        username: "",
        accessToken: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        community: "",
      });
      navigate("/");
    });
  }
  return (
    <dialog open={show} css={style}>
      <Link to="/profile">Profile</Link>
      <Link to="/transactions">Transactions</Link>
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </dialog>
  );
}

const style = css`
  position: absolute;
  top: 50px;
  left: 0;
  padding: 10px;
  background: border-box;
  color: white;
  /*   Open state of the dialog  */
  transform-origin: 50% 0%;
  &::after {
    content: "";
    position: absolute;
    top: -20px;
    border: 10px solid transparent;
    border-bottom-color: white;
    left: 50%;
  }
  &[open] {
    opacity: 0.8;
    transform: translateX(calc(-50% + 9px)) scaleY(1); //centering the dialog with respect to profile image
  }

  /*   Closed state of the dialog   */
  opacity: 0;
  transform: translateX(calc(-50% + 9px)) scaleY(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out,
    overlay 0.3s ease-out allow-discrete, display 0.3s ease-out allow-discrete;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */

  /*   Before-open state  */
  /* Needs to be after the previous dialog[open] rule to take effect,
    as the specificity is the same */
  @starting-style {
    &[open] {
      opacity: 0;
      transform: translateX(calc(-50% + 9px)) scaleY(0);
    }
  }

  /* Transition the :backdrop when the dialog modal is promoted to the top layer */
  * + * {
    margin-top: 5px;
  }
  a {
    display: block;
    text-wrap: nowrap;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    padding-bottom: 8px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    &:hover {
      color: white;
    }
  }
  button {
    background: #ed563b;
    transition: background 500ms ease-in-out;
    margin-top: 10px;
    &:hover {
      background: #f9735b;
    }
  }
`;

export default UserMenu;
