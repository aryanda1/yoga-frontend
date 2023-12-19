import { css } from "@emotion/react";

import React from "react";
import Button, { btnStyles } from "../GlobalComponents/Button";
import { Link } from "react-router-dom";

const Info = () => (
  <div css={styles} className="info">
    <p>EMBRACE INNER PEACE, FIND BALANCE</p>
    <h1>
      SIMPLIFY WITH OUR <span>YOGA</span>
    </h1>
    <Link to="/auth?mode=signup" css={btnStyles}>
      BECOME A MEMBER.
    </Link>
  </div>
);

const styles = css`
  width: 100%;
  max-width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  color: #fff;
  p {
    font-size: 17px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 1.2px;
  }
  h1 {
    font-size: 90px;
    line-height: 1;
    font-weight: 900;
    margin: 36px 0;
    span {
      color: #ed563b;
    }
  }
  .btn {
    padding: 14px 16px;
  }
  @media (max-width: 1000px) {
    h1 {
      font-size: 42px;
    }
  }
`;

export default Info;
