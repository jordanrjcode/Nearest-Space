import React from "react";
import "./Images.css";
function Images({ image }) {
  return (
    <div
      className="images-container"
      style={{ backgroundImage: "url(" + image + ")" }}
    ></div>
  );
}

export default Images;
