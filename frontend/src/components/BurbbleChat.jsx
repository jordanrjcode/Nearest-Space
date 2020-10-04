import React from "react";
import "./BurbbleChat.css";
const BurbbleChat = ({ setMessageActive, username, state, image }) => {
  return (
    <div
      class="chat"
      onClick={() => {
        setMessageActive(true);
      }}
    >
      <img src={image} alt="user__logo" />
      <div className="info">
        <p className="user">{username}</p>
        <p className="state">{state}</p>
      </div>
    </div>
  );
};

export default BurbbleChat;
