import { css } from "@emotion/react";

import React from "react";

const Map = () => (
  <div css={styles} className="mapouter">
    <iframe
      id="gmap_canvas"
      src="https://www.google.com/maps/embed/v1/place?q=https://www.google.com/maps/dir//Paramanand+Institute+of+Yoga+Sciences+and+Research,+Rani+Bagh+Main,+Khandwa+Road,+Paramanand+Ashram+Rd,+Indore,+Madhya+Pradesh+452020/@20.4481987,82.746316,5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3962fcbbd0acf35b:0x416a3420a6f969c5!2m2!1d75.88539!2d22.6731941?entry=ttu&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
    ></iframe>
  </div>
);

const styles = css`
  width: 100%;
  max-width: 50%;
  min-height: 60vh;
  iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }
  @media (max-width: 1200px) {
    max-width: 100%;
    height: 60vh;
  }
`;

export default Map;
