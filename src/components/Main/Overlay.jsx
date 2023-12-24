import { css } from "@emotion/react";
import { Typography } from "@mui/joy";

import React from "react";

const Overlay = ({ text }) => (
  <div css={styles} className="overlay">
    {text && (
      <Typography fontSize="clamp(2rem, 4vw, 3rem)" sx={{ color: "white" }}>
        {text}
      </Typography>
    )}
  </div>
);

const styles = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(35, 45, 57, 0.8);
  display: grid;
  place-items: center;
`;

export default Overlay;
