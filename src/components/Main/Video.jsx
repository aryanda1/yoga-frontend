import { css } from "@emotion/react";

import React, { useEffect } from "react";
import VideoBg from "../Image/bgVideo.mp4";
import thumb from "../Image/output.jpg";
const Video = () => {
  return (
    <video
      autoPlay
      playsInline
      muted
      loop
      poster={thumb}
      src={VideoBg}
      css={styles}
    />
  );
};

const styles = css`
  width: 100%;
  height: 100vh;
  height: 100svh;
  object-fit: cover;
`;

export default Video;
