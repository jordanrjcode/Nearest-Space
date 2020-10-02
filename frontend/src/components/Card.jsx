import React from "react";
import "./Card.css";
const Card = ({ image_url, title }) => {
  return (
    <div className="card-container">
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
    </div>
  );
};

export default Card;
