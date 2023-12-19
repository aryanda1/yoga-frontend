import { css } from "@emotion/react";

import React from "react";
import Output from "./Output";
import ClassOneBg from "../Image/classOne.jpg";
import ClassTwoBg from "../Image/classTwo.jpg";
import ClassThreeBg from "../Image/classThree.jpg";
import ClassFourBg from "../Image/classFour.jpg";

const Results = ({ training }) => (
  <div css={styles} className="results">
    {training === "FirstClass" && (
      <Output
        title="First Yoga Class"
        info="Morning Sadhana: Immerse yourself in a transformative practice from 6-7 am to start your day with serenity and purpose. This early-morning session combines gentle postures, breathwork, and mindfulness, setting a positive tone for the rest of your day."
        img={ClassOneBg}
      />
    )}

    {training === "SecondClass" && (
      <Output
        title="Second Yoga Class"
        info="Hatha Bliss: Join our experienced Hatha Yoga teacher from 7-8 am for a revitalizing session. Explore the balance of strength and flexibility through traditional poses, fostering a sense of well-being and tranquility in the heart of your morning routine."
        img={ClassTwoBg}
      />
    )}
    {training === "ThirdClass" && (
      <Output
        title="Third Yoga Class"
        info="Soulful Asanas: Elevate your practice with our Soulful Asanas specialist every day from 8-9 am. Immerse yourself in a harmonious blend of mindful movements and deep stretches, connecting your body and soul for a rejuvenating experience to carry you through the day."
        img={ClassThreeBg}
      />
    )}

    {training === "FourthClass" && (
      <Output
        title="Fourth Yoga Class"
        info="Evening Wellness: Join our Women's Wellness Yoga teacher for a rejuvenating session from 5-6 pm. Embrace the tranquility of evening practice, tailored to enhance your well-being. Nurture your body and soul with gentle poses, fostering balance and relaxation."
        img={ClassFourBg}
      />
    )}
  </div>
);

const styles = css`
  width: 100%;
  max-width: 60%;
  .test {
    width: 100%;
    height: 400px;
    background: red;
    &.two {
      background: blue;
    }
  }
  @media (max-width: 900px) {
    max-width: 590px;
    padding: 30px 0 0 0;
  }
  @media (min-width: 901px) and (max-width: 1226px) {
    max-width: 62%;
  }
`;

export default Results;
