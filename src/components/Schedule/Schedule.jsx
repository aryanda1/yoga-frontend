import { css } from "@emotion/react";

import React, { useState } from "react";
import Icon from "../GlobalComponents/Icon";
import scheduleBg from "../Image/scheduleBg.jpg";
import ScheduleLinks from "./ScheduleLinks";
import Table from "./Table";
import Container from "../GlobalComponents/Container";

const Schedule = () => {
  const [hidden, setHidden] = useState(false);
  const [day, setDay] = useState("Monday");

  return (
    <section css={styles} className="schedule" id="schedule">
      <h2>
        CLASSES <span>SCHEDULE</span>
      </h2>
      <Icon />
      <p>
        Explore a balanced lineup of yoga sessions designed to harmonize your
        mind and body.
        <br />
        Discover the perfect class to align with your wellness goals and embrace
        your yoga journey with us
      </p>
      <Container>
        <ScheduleLinks setDay={setDay} day={day} />
        <Table day={day} />
      </Container>
    </section>
  );
};

const styles = css`
  width: 100%;
  padding: 120px 0;
  min-height: 100vh;
  text-align: center;
  background: url("${scheduleBg}") no-repeat center/cover;
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
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 640px) {
    p {
      padding: 0 30px;
      br {
        display: none;
      }
    }
    .container {
      max-width: 92%;
    }
  }
`;

export default Schedule;
