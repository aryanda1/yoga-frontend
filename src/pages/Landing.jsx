import React from "react";
import Main from "../components/Main/Main";
import Member from "../components/Member/Member";
import Classes from "../components/OurClasses/Classes";
import Schedule from "../components/Schedule/Schedule";
import Trainers from "../components/Trainers/Trainers";
import Contact from "../components/Contact/Contact";

const Landing = () => (
  <div>
    <Main />
    <Member />
    <Classes />
    <Schedule />
    <Trainers />
    <Contact />
  </div>
);

export default Landing;
