import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Settings.css";
import { editUser } from "../Redux/authDuck";
import { showAlertAction } from "../Redux/alertDuck";
const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const [editData, setEditData] = useState(user.state);
  const edit = (e) => {
    e.preventDefault();
    if (!editData.trim()) {
      dispatch(
        showAlertAction({ category: "Error", message: "The state is required" })
      );
      return;
    }
    if (editData === user.state) {
      return;
    }
    dispatch(editUser({ state: editData }));
  };
  return (
    <form
      className="settings"
      onSubmit={(e) => {
        edit(e);
      }}
    >
      <h2 className="settings__title">Perfil</h2>
      <img src={user.image} className="settings__img" alt="user_image" />
      <input
        type="text"
        className="setting__input "
        name="username__edit"
        disabled
        value={user.username}
      />
      <input
        type="text"
        className="setting__input "
        name="state"
        onChange={(e) => {
          setEditData(e.target.value);
        }}
        value={editData}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Settings;
