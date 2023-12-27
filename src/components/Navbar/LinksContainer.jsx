import { css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import Linkk from "./Link";
import { Link, useLocation } from "react-router-dom";
import { btnStyles } from "../GlobalComponents/Button";

const LinksContainer = ({ hidden, isLoggedIn, closeMenu }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div css={styles} className={(hidden ? "hidden" : "") + " linksContainer"}>
      <Linkk
        name="HOME"
        linkTo="/#home"
        isHome={path === "/"}
        onClick={closeMenu}
      />
      <Linkk name="ABOUT" linkTo="/#trainers" onClick={closeMenu} />
      <Linkk name="CLASSES" linkTo="/#ourClasses" onClick={closeMenu} />
      <Linkk name="SCHEDULES" linkTo="/#schedule" onClick={closeMenu} />
      <Linkk name="CONTACT" linkTo="/#contact" onClick={closeMenu} />
      {!isLoggedIn && (
        <Link to="/auth?mode=signup" css={btnStyles} onClick={closeMenu}>
          GET STARTED
        </Link>
      )}
    </div>
  );
};

const styles = css`
  width: 100%;
  max-width: 620px;
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: space-evenly;

  @media (max-width: 1000px) {
    max-width: 100%;
    padding: 0 30px 20px 30px;
    flex-direction: column;
    align-items: flex-start;
    opacity: 1;
    position: absolute;
    left: 0;
    top: 70px;
    background: rgba(35, 45, 57, 0.8);
    transition: top 1100ms ease-in-out, opacity 1100ms ease-in-out;
    &.hidden {
      left: 0;
      top: -500px;
      opacity: 0;
    }
    .btn {
      width: 100%;
      text-align: center;
      padding: 16px;
    }
  }
`;

export default LinksContainer;
