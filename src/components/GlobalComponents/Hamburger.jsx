import { css } from "@emotion/react";
import React, { useState } from "react";

const Hamburger = ({ closed, menuClickHandler }) => {
  //the closed and menuclick handler are used to toggle the hamburger state either three lines or cross
  const [remove, setRemove] = useState(false);
  const handleClick = () => {
    menuClickHandler();
    setRemove(true);
  };

  return (
    <button
      id="hamburger"
      onClick={handleClick}
      css={styles}
      className={`${!closed ? "menu-active" : ""}`}
    >
      <div className={`line line--first ${!remove ? "no-animate" : ""} `}></div>
      <div
        className={`line line--second ${!remove ? "no-animate" : ""}
        `}
      ></div>
      <div className={`line line--third ${!remove ? "no-animate" : ""}`}></div>
    </button>
  );
};

const styles = css`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: none;
  margin-left: auto;
  gap: var(--gap);
  flex-direction: column;
  .line {
    width: 100%;
    height: var(--height);
    background-color: white;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: background 0.5s ease-in-out;
  }

  .line--first {
    animation: line-first-rev 0.5s ease-in-out forwards;
  }

  .line--second {
    animation: line-middle-rev 0.5s ease-in-out forwards;
  }

  .line--third {
    animation: line-third-rev 0.5s ease-in-out forwards;
  }

  &.menu-active {
    .line--first {
      animation: line-first 0.5s ease-in-out forwards;
    }
    .line--second {
      animation: line-middle 0.5s ease-in-out forwards;
    }
    .line--third {
      animation: line-third 0.5s ease-in-out forwards;
    }
  }

  .no-animate {
    animation: none;
  }

  @keyframes line-middle {
    0% {
      opacity: 1;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes line-middle-rev {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes line-first {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(0, calc(var(--height) + var(--gap)));
    }
    100% {
      transform: translate(0, calc(var(--height) + var(--gap))) rotate(45deg);
    }
  }

  @keyframes line-first-rev {
    0% {
      transform: translate(0, calc(var(--height) + var(--gap))) rotate(45deg);
    }
    50% {
      transform: translate(0, calc(var(--height) + var(--gap)));
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
  @keyframes line-third {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(0, calc((var(--height) + var(--gap)) * -1));
    }
    100% {
      transform: translate(0, calc((var(--height) + var(--gap)) * -1))
        rotate(-45deg);
    }
  }

  @keyframes line-third-rev {
    0% {
      transform: translate(0, calc((var(--height) + var(--gap)) * -1))
        rotate(-45deg);
    }
    50% {
      transform: translate(0, calc((var(--height) + var(--gap)) * -1));
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;

export default Hamburger;
