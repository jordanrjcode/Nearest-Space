import React from "react";
import Particles from "react-tsparticles";
import "./Background.css";
import particlesOptions from "./particles.json";

function Background() {
  return <Particles options={particlesOptions} />;
}

export default Background;
