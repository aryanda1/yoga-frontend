import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import React from "react";

const Linkk = ({ name, linkTo, onClick }) => {
  return (
    <HashLink css={styles} to={linkTo} onClick={onClick}>
      {name}
    </HashLink>
  );
};

const styles = css`
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  transition: color 600ms ease-in-out;
  &:first-of-type,
  &:hover {
    color: #ed563b;
  }
  @media (max-width: 1000px) {
    padding: 14px 0;
    width: 100%;
    font-size: 18px;
  }
`;

export default Linkk;
