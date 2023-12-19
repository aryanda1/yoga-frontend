import { css } from "@emotion/react";
import { btnStyles } from "../GlobalComponents/Button";
import { Link } from "react-router-dom";
import React from "react";
import Button from "../GlobalComponents/Button";
import GymOverlayBg from "../Image/gymOverlayBg.jpg";

const Member = ({ text }) => (
  <section css={styles} className="member">
    <h2>
      DON’T <span>THINK</span>, BEGIN <span>TODAY</span>!
    </h2>
    <p>
      Experience the serenity of our yoga sanctuary. Whether you're seeking
      inner peace, strength, or flexibility, our classes offer a path to
      well-being.
      <br />
      Don't overthink it; start your transformative journey now!"
    </p>
    <Link to="/auth?mode=signup" css={btnStyles}>
      BECOME A MEMBER.
    </Link>
  </section>
);

const styles = css`
  width: 100%;
  padding: 120px 0;
  text-align: center;
  background: url("${GymOverlayBg}") no-repeat center/cover;
  h2 {
    color: #fff;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  p {
    color: #fff;
    font-size: 16px;
    line-height: 1.7;
    margin: 20px 0;
  }
  @media (max-width: 850px) {
    h2 {
      font-size: 30px;
    }
    p {
      padding: 0 20px;
      br {
        display: none;
      }
    }
  }
`;

export default Member;
