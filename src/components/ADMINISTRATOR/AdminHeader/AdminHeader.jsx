import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../../Redux/action";

import { FaSignOutAlt } from "react-icons/fa";

import logo from "../../../assets/icon/app_icon.png";

import "./AdminHeader.css";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleMenuOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="adminHeader">
      <div className="logo-box">
        <img src={logo} alt="logo" width={40} onClick={handleMenuOpen} />
        <h2>Administrator</h2>
      </div>
      <div className="menuItems">
        <Link to="/">Home</Link>
        <Link to="/AdminCategory">Categories</Link>
        <Link to="/AdminProduct">Products</Link>
      </div>
      <FaSignOutAlt
        size={20}
        style={{ paddingRight: 50 }}
        onClick={handleSignOut}
      />
      <div
        className="menuItems-drawer"
        style={{ width: drawerOpen ? "300px" : "0" }}
      >
        <Link to="/" onClick={() => setDrawerOpen(false)}>
          Home
        </Link>
        <Link to="/AdminCategory" onClick={() => setDrawerOpen(false)}>
          Categories
        </Link>
        <Link to="/AdminProduct" onClick={() => setDrawerOpen(false)}>
          Products
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
