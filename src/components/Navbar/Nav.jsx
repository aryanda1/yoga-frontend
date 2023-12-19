import { css } from "@emotion/react";

import React, { useState } from "react";
import Logo from "./Logo";
import LinksContainer from "./LinksContainer";
import Container from "../GlobalComponents/Container";
import Hamburger from "./Hamburger";
const Nav = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <nav css={styles}>
      <Container>
        <Logo />
        <Hamburger
          menuClickHandler={() => setHidden(!hidden)}
          closed={hidden}
        ></Hamburger>
        <LinksContainer hidden={hidden} onClick={() => setHidden(!hidden)} />
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
  @media (max-width: 1000px) {
    background: rgba(35, 45, 57, 0.8);
    .container {
      flex-wrap: wrap;
    }
  }
`;

export default Nav;
