import { css } from "@emotion/react";

import React, { useState } from "react";
import Icon from "../GlobalComponents/Icon";
import LinksContainer from "./LinksContainer";
import Results from "./Results";
import Container from "../GlobalComponents/Container";

const Classes = ({ text }) => {
  const [training, setTraining] = useState("FirstClass");

  return (
    <section css={styles} className="ourClasses" id="ourClasses">
      <h2>
        OUR <span>CLASSES</span>
      </h2>
      <Icon />
      <p>
        Explore a diverse range of yoga sessions, carefully curated to suit all
        levels and preferences. From morning serenity to evening bliss, discover
        the perfect class to elevate your yoga journey."
      </p>
      <Container>
        <LinksContainer setTraining={setTraining} training={training} />
        <Results training={training} />
      </Container>
    </section>
  );
};

const styles = css`
  width: 100%;
  padding: 100px 0;
  text-align: center;
  h2 {
    color: #232d39;
    font-size: 26px;
    font-weight: 900;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  p {
    color: #7a7a7a;
    font-size: 15px;
    line-height: 1.7;
    max-width: 80ch;
    margin-inline: auto;
  }
  .container {
    display: flex;
    justify-content: space-between;
    padding: 80px 0 0 0;
  }
  @media (max-width: 900px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    p {
      padding: 0 20px;
      br {
        display: none;
      }
    }
  }
  @media (min-width: 901px) and (max-width: 1226px) {
    .container {
      justify-content: space-between;
      max-width: 90%;
    }
  }
`;

export default Classes;
