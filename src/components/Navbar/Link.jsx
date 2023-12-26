import { css } from "@emotion/react";
import { HashLink } from "react-router-hash-link";
import React from "react";

const Linkk = ({ name, linkTo, isHome }) => {
  return (
    <HashLink css={styles} to={linkTo} className={isHome && "selected"}>
      {name}
    </HashLink>
  );
};

const styles = css`
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  transition: color 200ms ease-in-out;
  &.selected,
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
