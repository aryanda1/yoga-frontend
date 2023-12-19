import { css } from "@emotion/react";

import React from "react";
import Linkk from "./Link";
import { Link } from "react-router-dom";
import Button from "../GlobalComponents/Button";
import { btnStyles } from "../GlobalComponents/Button";
import useAuth from "../../customHooksAndServices/authContextHook";

const LinksContainer = ({ hidden, onClick }) => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div css={styles} className={(hidden ? "hidden" : "") + " linksContainer"}>
      <Linkk name="HOME" linkTo="/#home" onClick={onClick} />
      <Linkk name="ABOUT" linkTo="/#trainers" onClick={onClick} />
      <Linkk name="CLASSES" linkTo="/#ourClasses" onClick={onClick} />
      <Linkk name="SCHEDULES" linkTo="/#schedule" onClick={onClick} />
      <Linkk name="CONTACT" linkTo="/#contact" onClick={onClick} />
      {user.accessToken ? (
        <img src="https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg" />
      ) : (
        <Link to="/auth?mode=signup" css={btnStyles} onClick={onClick}>
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
  justify-content: space-between;
  img {
    width: 40px;
    cursor: pointer;
    border-radius: 50%;
  }
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
