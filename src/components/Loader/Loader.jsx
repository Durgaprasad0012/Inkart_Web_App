import React from "react";
import "./Loader.css";
import loader from "../../assets/icon/app_icon.png";
const Loader = ({ disp }) => {
  return (
    <div
      className="loader-container"
      style={{ display: disp ? "flex" : "none" }}
    >
      <img src={loader} alt="loaderlogo" />
    </div>
  );
};

export default Loader;
