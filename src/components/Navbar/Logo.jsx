import { css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);

  {
    /* Performs similarly to componentDidMount in classes */
  }
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 400;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [isMobile]);
  return (
    <h2 css={styles}>
      <Link to="/" style={{ color: "inherit" }}>
        {isMobile ? "T" : "TRAINING"} <span>{isMobile ? "S" : "STUDIO"}</span>
      </Link>
    </h2>
  );
};

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
