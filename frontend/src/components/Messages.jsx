import React, { Fragment, useEffect, useState } from "react";
import socket from "./Socket.js";
import BurbbleChat from "./BurbbleChat";
import RoomMessage from "./RoomMessage";
import { NavLink } from "react-router-dom";
import Profiles from "./Profiles";
import { useSelector } from "react-redux";
import AddUser from "./Modal/AddUser";
import "./Messages.css";
const Messages = () => {
  const user = useSelector((store) => store.auth.user);
  const [chatActive, setMessageActive] = useState(false);
  const [partner, setPartner] = useState("");
  const [modeSearch, setModeSearch] = useState(false);
  const [modeAgg, setModeAgg] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [chatLists, setChatLists] = useState([]);
  const [allMessages, setAllmessages] = useState([]);
  const [listActive, setListActive] = useState("");
  const [modeSetting, setModeSetting] = useState(false);
  useEffect(() => {
    if (user) socket.emit("connected", user._id, user.username);
  }, [user]);

  useEffect(() => {
    socket.on("loadChats", (chats, messages) => {
      setChatLists(chats);
      console.log(messages);
      setAllmessages(messages);
    });
  }, [partner]);
  useEffect(() => {
    socket.on("whisper", (data) => {
      console.log(data);
      setAllmessages([...allMessages, data]);
    });
    return () => {
      socket.off();
    };
  }, [allMessages]);

  const click = (chat) => {
    if (chat.user1 === user.username) setPartner(chat.user2);
    else setPartner(chat.user1);
    setListActive(chat._id);
  };
  const sendMessage = (data) => {
    setAllmessages([...allMessages, data]);
    socket.emit("message", {
      idchatList: listActive,
      message: data.message,
      receiver: partner,
      sender: user.username,
    });
  };
  return (
    <Fragment>
      <div className="messages__container">
        <div className="sidebar">
          <div className="perfil">
            <div className="personal__container">
              <div
                style={{ backgroundImage: "url(" + user.image + ")" }}
                className="foto__perfil"
              ></div>
              <div className="info__personal">
                <h4>{user.username}</h4>
              </div>
            </div>
            <div className="estado__container">
              <div className="estado__circulo"></div>
              <div className="estado">{user.state}</div>
            </div>
            <img
              src="/images/equipo.svg"
              alt="configuracion"
              className="config"
              onClick={() => {
                setModeAgg(true);
                setModeSetting(true);
              }}
            />
            <img
              src="/images/notificacion.svg"
              alt="notificacion"
              className="notify"
            />
          </div>
          <div className="busqueda">
            {modeSearch === false ? (
              <>
                <img
                  className="search"
                  src="/images/buscar.svg"
                  alt="buscar"
                  onClick={() => {
                    setModeSearch(true);
                  }}
                />
                <img
                  className="add__user"
                  src="/images/agregar-usuario.svg"
                  alt="agregar"
                  onClick={() => {
                    setModeAgg(true);
                  }}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="search__input"
                  value={chatSearch}
                  onChange={(e) => {
                    setChatSearch(e.target.value);
                  }}
                />
                <img
                  className="search__exit"
                  src="/images/salir.svg"
                  alt="salir"
                  onClick={() => {
                    setModeSearch(false);
                    setChatSearch("");
                  }}
                />
              </>
            )}
          </div>
          {chatSearch !== "" ? (
            <div className="search__results">
              <Profiles username={"skaosk"} />
            </div>
          ) : (
            <div className="chats">
              {chatLists.length < 1
                ? null
                : chatLists.map((chat) => {
                    return (
                      <div
                        onClick={() => {
                          click(chat);
                        }}
                      >
                        <BurbbleChat
                          state={user.state}
                          username={
                            chat.user1 === user.username
                              ? chat.user2
                              : chat.user1
                          }
                          image={user.image}
                          setMessageActive={setMessageActive}
                        />
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
        <div className="main">
          <div className="message__header">
            <NavLink to="/">
              {" "}
              <img src="/images/atras.svg" alt="atras" />
            </NavLink>
          </div>

          <div className="chat__room">
            {chatActive ? (
              <RoomMessage
                partner={partner}
                sendMessage={sendMessage}
                allMessages={allMessages}
                chatLists={chatLists}
                listActive={listActive}
              />
            ) : (
              <div className="info__alert">
                <p className="alert__message__room">Select a chat</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {modeAgg ? (
        <AddUser
          setModeSetting={setModeSetting}
          modeSetting={modeSetting}
          setModeAgg={setModeAgg}
        />
      ) : null}
    </Fragment>
  );
};

export default Messages;
