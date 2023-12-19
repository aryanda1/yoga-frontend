import { css } from "@emotion/react";

import React from "react";
import Icon from "../GlobalComponents/Icon";
import TrainerCard from "./TrainerCard";
import Container from "../GlobalComponents/Container";
import TrainerOneBg from "../Image/trainerOne.jpg";
import TrainerTwoBg from "../Image/trainerTwo.jpg";
import TrainerThreeBg from "../Image/trainerThree.jpg";

const Trainers = () => (
  <section css={styles} className="trainers" id="trainers">
    <h2>
      EXPERT <span>TRAINERS</span>
    </h2>
    <Icon />
    <p>
      Guiding your wellness journey with knowledge and passion, our experienced
      instructors bring <br /> expertise to every class for a transformative and
      enriching yoga experience.
    </p>
    <Container>
      <TrainerCard
        title="Morning Sadhana"
        name="Prasant Jakhmala"
        desc="Experience the tranquility of Morning Sadhana led by Prasant Jakhmala, a transformative session to kickstart your day with serene mindfulness."
        img={TrainerOneBg}
      />
      <TrainerCard
        title="Hath Yoga"
        name="Subham Uniyal"
        desc="Join Subham Uniyal for an invigorating Hath Yoga class, blending traditional postures and breathwork to enhance strength, flexibility, and overall well-being."
        img={TrainerTwoBg}
      />
      <TrainerCard
        title="Soulful Asanas"
        name="Shivam Joshi"
        desc="Join Shivam Joshi for a thrilling experience of Soulful Asanas, a blend of ancient and modern asanas to enhance your overall well-being and relaxation."
        img={TrainerThreeBg}
      />
    </Container>
  </section>
);

const styles = css`
  width: 100%;
  padding: 120px 0;
  text-align: center;
  h2 {
    color: #232d39;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  > p {
    color: #7a7a7a;
    font-size: 16px;
    line-height: 1.7;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0 0 0;
  }
  @media (max-width: 650px) {
    > p {
      padding: 0 30px;
      br {
        display: none;
      }
    }
  }
  @media (max-width: 830px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
  }
  @media (min-width: 831px) and (max-width: 1226px) {
    .container {
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 780px;
    }
  }
`;

export default Trainers;
