import React, { useState, useEffect } from "react";
import "./AddUser.css";
import Profiles from "../Profiles";
import Settings from "../Settings";
import { useDispatch, useSelector } from "react-redux";
import { searchListUser, createRoomChat } from "../../Redux/appDuck";
function AddUser({ setModeAgg, modeSetting, setModeSetting }) {
  const dispatch = useDispatch();
  const searchUsers = useSelector((store) => store.app.searchUsers);
  const [listU, setListU] = useState([]);
  useEffect(() => {
    if (searchUsers !== null) setListU(searchUsers);
  }, [searchUsers]);

  const search = (username) => {
    if (!username.trim()) {
      setListU([]);
      return;
    }
    dispatch(searchListUser({ username }));
  };
  return (
    <div
      className="addUser"
      id="x"
      onClick={(e) => {
        if (e.target.id === "x") {
          setModeAgg(false);
          setModeSetting(false);
        }
      }}
    >
      <div className="addUser__container" id="user__container">
        {modeSetting ? (
          <Settings />
        ) : (
          <>
            <input
              type="text"
              placeholder="Who do you want to add?"
              onChange={(e) => {
                search(e.target.value);
              }}
            />
            <div className="addUser__usersContainer">
              {searchUsers !== null
                ? listU.map((users) => (
                    <div
                      key={users._id}
                      onClick={() => {
                        dispatch(createRoomChat({ received: users._id }));
                        setModeAgg(false);
                      }}
                    >
                      <Profiles
                        username={users.username}
                        image={users.image}
                        state={users.state}
                      />
                    </div>
                  ))
                : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddUser;
