import { css } from "@emotion/react";
import useAuth from "../../customHooksAndServices/authContextHook";
import useLogout from "../../customHooksAndServices/logoutHook";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Sidebar({ showMenu, setShowMenu }) {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden"; // Prevents scrolling in the background when menu is open
    }
    if (!showMenu) {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  const handleLogout = () => {
    logout().then(() => {
      setUser({
        accessToken: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        batch: "",
        payments: [],
        joiningDate: "",
        nextBatch: "",
        imageUrl: "",
      });
      navigate("/");
    });
  };
  return (
    <div className={`${showMenu ? "side-menu-active" : ""}`} css={styles}>
      {
        //Links are rendered as anchor tags in the DOM, hence the use of a tag as selector in the stylesheet
      }
      <Link to="pay-now" onClick={() => setShowMenu(false)}>
        <button>Pay Now</button>
      </Link>
      <Link to="pay-history" onClick={() => setShowMenu(false)}>
        <button>View past payments</button>
      </Link>

      <Link to="/" className="mt-auto" onClick={() => setShowMenu(false)}>
        <button>Back to homepage</button>
      </Link>
      <button
        onClick={() => {
          handleLogout();
          setShowMenu(false);
        }}
      >
        Log out
      </button>
    </div>
  );
}

const styles = css`
  position: absolute;
  top: 0;
  left: 0;
  background: ghostwhite;
  height: 100%;
  transition: all 0.5s ease-in-out;
  width: 16rem;
  z-index: 10;
  transform: translateX(-240%);
  display: flex;
  flex-direction: column;
  padding-top: 8rem;
  overflow: auto;
  &.side-menu-active {
    transform: translateX(0);
  }
  .mt-auto {
    margin-top: auto;
  }
  a {
    width: 100%;
    margin-inline: auto;
  }
  button {
    border: 0;
    border-top: 2px solid rgba(35, 45, 57, 0.4);
    background: transparent;
    cursor: pointer;
    color: rgba(35, 45, 57, 0.4);
    font-size: 1.5rem;
    line-height: 2rem;
    padding: 0.75rem;
    transition-duration: 0.15s;
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    &:hover {
      background-color: rgba(35, 45, 57, 0.4);
      color: white;
    }
  }
  @media (max-width: 768px) {
    width: 80%;
    a {
      width: 80%;
    }
    button {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`;

export default Sidebar;
