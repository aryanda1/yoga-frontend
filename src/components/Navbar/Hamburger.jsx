import { css } from "@emotion/react";
import React, { useState } from "react";

const Hamburger = ({ closed, menuClickHandler }) => {
  const [remove, setRemove] = useState(false);
  const handleClick = () => {
    menuClickHandler();
    setRemove(true);
  };

  return (
    <button id="hamburger" onClick={handleClick} css={styles}>
      <div
        className={`line line--first ${!remove ? "no-animate" : ""} ${
          !closed ? "animate-forward" : ""
        }`}
      ></div>
      <div
        className={`line line--second ${!remove ? "no-animate" : ""} ${
          !closed ? "animate-forward" : ""
        }`}
      ></div>
      <div
        className={`line line--third ${!remove ? "no-animate" : ""} ${
          !closed ? "animate-forward" : ""
        }`}
      ></div>
    </button>
  );
};

const styles = css`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: none;
  margin-inline: auto 2rem;
  .line {
    width: 2rem;
    height: 0.2rem;
    background-color: white;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .line--first {
    animation: line-first-rev 0.5s ease-in-out forwards;
  }

  .line--first.animate-forward {
    animation: line-first 0.5s ease-in-out forwards;
  }

  .line--second {
    margin-block: 0.3rem;
    animation: line-middle-rev 0.5s ease-in-out forwards;
  }

  .line--second.animate-forward {
    animation: line-middle 0.5s ease-in-out forwards;
  }

  .line--third {
    animation: line-third-rev 0.5s ease-in-out forwards;
  }

  .line--third.animate-forward {
    animation: line-third 0.5s ease-in-out forwards;
  }

  .no-animate {
    animation: none;
  }

  @media (max-width: 1000px) {
    display: block;
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
      transform: translate(0, 0.5rem);
    }
    100% {
      transform: translate(0, 0.5rem) rotate(45deg);
    }
  }

  @keyframes line-first-rev {
    0% {
      transform: translate(0, 0.5rem) rotate(45deg);
    }
    50% {
      transform: translate(0, 0.5rem);
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
      transform: translate(0, -0.5rem);
    }
    100% {
      transform: translate(0, -0.5rem) rotate(-45deg);
    }
  }

  @keyframes line-third-rev {
    0% {
      transform: translate(0, -0.5rem) rotate(-45deg);
    }
    50% {
      transform: translate(0, -0.5rem);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;

export default Hamburger;
