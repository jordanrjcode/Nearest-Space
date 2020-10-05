import React, { useState, useEffect, useRef } from "react";
import "./RoomMessage.css";
import { useSelector } from "react-redux";
const RoomMessage = ({
  sendMessage,
  allMessages,
  chatLists,
  listActive,
  partner,
}) => {
  const [message, setMessage] = useState("");
  const user = useSelector((store) => store.auth.user);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current !== null) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [allMessages, partner]);

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage({
      message,
      idchatList: listActive,
      sender: user.username,
      receiver: partner,
    });
    setMessage("");
  };
  return (
    <div className="room__message">
      <div ref={divRef} className="list__messages">
        {allMessages.map((message, index) => {
          if (message.receiver === partner || message.sender === partner) {
            return (
              <p
                key={index}
                id={message.sender === user.username ? "sender" : "receiver"}
              >
                {message.message}
              </p>
            );
          }
          return null;
        })}
      </div>
      <form
        onSubmit={(e) => {
          submitMessage(e);
        }}
        className="input__message"
      >
        <input
          type="text"
          value={message}
          className="room__message__input"
          autoComplete="off"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit" className="room__message__button">
          <img src="/images/enviar.svg" alt="enviar" />
        </button>
      </form>
    </div>
  );
};

export default RoomMessage;
