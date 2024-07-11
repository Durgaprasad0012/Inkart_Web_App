import React from "react";
import "./CommonButton.css";
const CommonButton = (props) => {
  const { title, bgcolor, onClick, width } = props;    
  return (
    <div className="button">
      <button
        onClick={onClick}
        style={{
          backgroundColor: bgcolor == "success" ? "#08c402" : "#000",
          width:width
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default CommonButton;
