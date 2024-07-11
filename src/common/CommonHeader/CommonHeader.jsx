import React, { useState } from "react";
import logo from "../../assets/icon/InKart.png";
import CommonSearch from "../../common/CommonSearch/CommonSearch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "../../Redux/action";
import { HashLink as Link } from "react-router-hash-link";

import { TbUserSquareRounded } from "react-icons/tb";
import { IoMdCart } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";

import "./CommonHeader.css";

const CommonHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const userId = useSelector((state) => state.userId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);

  // user setting click function
  const handleUserClick = () => {
    setUserPopUp(!userPopUp);
  };

  // switch to home Button function
  const handleHome = () => {
    navigate("/");
  };

  // handle menu Open function
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  // user SignOut function
  const handleLogOut = () => {
    dispatch(signOut());
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="header-container">
      <div className="menu">
        <TiThMenu id="menu" size={25} onClick={() => handleMenuOpen()} />
      </div>
      <div className="logo">
        <img src={logo} alt="logo" onClick={() => handleHome()} />
      </div>
      <div className="search">
        <CommonSearch />
      </div>
      <div className="userdetails">
        <TbUserSquareRounded
          id="userClick"
          size={25}
          onClick={() => handleUserClick()}
        />
        <div
          className="userpopup"
          style={{
            display: userPopUp ? "block" : "none",
          }}
        >
          <p>{email}</p>
          <button onClick={handleLogOut}>signOut</button>
        </div>
        <span>Welcome {username}</span>
      </div>
      <div className="cart">
        <IoMdCart size={25} />
        <span>Cart</span>
      </div>
      <div
        className="menu-contentBox"
        style={{
          width: menuOpen ? "400px" : "0px",
        }}
      >
        <div className="menu-item-content">
          <div className="menu-head">
            <h2 className="username">{username}</h2>
            <p>{email}</p>
          </div>
          <div className="menu-item-group">
            <Link
              smooth
              to="#category"
              className="menu-item"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              All Categories
            </Link>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              My Orders
            </a>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              My Cart
            </a>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              Offers Zone
            </a>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              Coupons
            </a>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              My Wishlist
            </a>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              My Notifications
            </a>
          </div>
          <div className="menu-item-group">
            <a href="#" className="menu-item">
              My Account
            </a>
          </div>
        </div>
        <div className="contact">
          <p>help center contact </p>
          <span className="logout">contact</span>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
