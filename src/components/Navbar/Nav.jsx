import { css } from "@emotion/react";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import LinksContainer from "./LinksContainer";
import Container from "../GlobalComponents/Container";
import Hamburger from "../GlobalComponents/Hamburger";
import UserMenu from "./UserMenu";
import useAuth from "../../customHooksAndServices/authContextHook";
import useRefreshToken from "../../customHooksAndServices/refreshTokenHook";

const Nav = () => {
  const [hidden, setHidden] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();
  const isLoggedIn = user.accessToken !== "";
  const { refreshToken } = useRefreshToken();
  useEffect(() => {
    refreshToken();
  }, []);
  return (
    <nav css={styles}>
      <Container>
        <Logo />
        <Hamburger
          menuClickHandler={() => setHidden(!hidden)}
          closed={hidden}
        ></Hamburger>
        <LinksContainer
          hidden={hidden}
          isLoggedIn={isLoggedIn}
          closeMenu={() => setHidden(!hidden)}
        />
        {isLoggedIn && (
          <div
            className="user--profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src={user.imageUrl} />
            <UserMenu show={showUserMenu} />
          </div>
        )}
      </Container>
    </nav>
  );
};

const styles = css`
  width: 100%;
  position: absolute;
  top: 0;
  padding: 20px 0;
  background: rgba(250, 250, 250, 0.1);
  z-index: 20;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user--profile {
    position: relative;
    margin-left: 2rem;
    img {
      width: 40px;
      object-fit: cover;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
    }
  }

  @media (max-width: 1000px) {
    background: rgba(35, 45, 57, 0.8);
    .container {
      flex-wrap: wrap;
    }
    button {
      display: block;
    }
  }
  @media (max-width: 500px) {
    .user--profile {
      margin-left: 0;
    }
    button {
      margin-left: 0;
    }
  }
  @media (max-width: 400px) {
    #hamburger{
      margin-inline:auto 2rem;
    }
`;

export default Nav;
