import React from "react";
import "./Profiles.css";
const Profiles = ({ username, image, state }) => {
  return (
    <div className="profile">
      <img src={image} alt="" />
      <div className="info">
        <p className="username">{username}</p>
        <p className="state">{state}</p>
      </div>
    </div>
  );
};

export default Profiles;
