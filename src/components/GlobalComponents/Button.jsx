import { css } from "@emotion/react";

import React from "react";

const Button = ({ text }) => (
  <a css={btnStyles} href="#/" className="btn">
    {text}
  </a>
);

export const btnStyles = css`
  text-decoration: none;
  display: inline-block;
  background: #ed563b;
  color: #fff;
  font-size: 14px;
  padding: 12px 14px;
  transition: background 500ms ease-in-out;
  &:hover {
    background: #f9735b;
  }
  &:disabled {
    cursor: no-drop;
    pointer-events: all;
  }
`;

export default Button;
