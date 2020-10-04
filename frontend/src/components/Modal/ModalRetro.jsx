import React from "react";
import "./ModalRetro.css";
const ModalRetro = () => {
  return (
    <div>
      <div className="modal">
        <p className="message">Do you want to communicate?</p>
        <div className="options">
          <button className="btn">Yes</button>
          <button className="btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalRetro;
