import { css } from "@emotion/react";

import React, { useState } from "react";
import Logo from "./Logo";
import LinksContainer from "./LinksContainer";
import Container from "../GlobalComponents/Container";
import Hamburger from "./Hamburger";
import UserMenu from "./UserMenu";
import useAuth from "../../customHooksAndServices/authContextHook";

const Nav = () => {
  const [hidden, setHidden] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();
  const isLoggedIn = user.accessToken !== "";
  return (
    <nav css={styles}>
      <Container>
        <Logo />
        <Hamburger
          menuClickHandler={() => setHidden(!hidden)}
          closed={hidden}
        ></Hamburger>
        <LinksContainer hidden={hidden} isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <div
            style={{ position: "relative", marginLeft: "2rem" }}
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
  img {
    width: 40px;
    object-fit: cover;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }
  @media (max-width: 1000px) {
    background: rgba(35, 45, 57, 0.8);
    .container {
      flex-wrap: wrap;
    }
  }
`;

export default Nav;
