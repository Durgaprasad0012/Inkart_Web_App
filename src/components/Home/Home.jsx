import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader/CommonHeader";
import Category from "../Categories/Category";
import Banners from "./Banners/Banners";

import "./Home.css";

const Home = () => {
  const userID = useSelector((state) => state.userId);
  const navigate = useNavigate();
  

  return (
    <div className="home-container" id="home">
      <CommonHeader />
      <div className="home-content">
        <Banners />
        <Banners />
        <Banners />
        <Banners />
        <Banners />
        <Banners />
        <Banners />
      </div>
      <Category />
    </div>
  );
};

export default Home;
