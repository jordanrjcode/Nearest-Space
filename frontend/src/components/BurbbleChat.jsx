import React from "react";
import "./BurbbleChat.css";
const BurbbleChat = ({ setMessageActive, username, image }) => {
  return (
    <div
      className="chat"
      onClick={() => {
        setMessageActive(true);
      }}
    >
      <img src={image} alt="user__logo" />
      <div className="info">
        <p className="user">{username}</p>
      </div>
    </div>
  );
};

export default BurbbleChat;
