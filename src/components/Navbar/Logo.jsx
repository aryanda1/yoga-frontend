import { css } from "@emotion/react";

import React from "react";
import { Link } from "react-router-dom";

const Logo = () => (
  <h2 css={styles}>
    <Link to="/" style={{ color: "inherit" }}>
      TRAINING <span>STUDIO</span>
    </Link>
  </h2>
);

const styles = css`
  color: #fff;
  font-size: 29px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  span {
    color: #ed563b;
  }
`;

export default Logo;
