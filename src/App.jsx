import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// userComponents
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Category from "./components/Categories/Category";
// Admin Components
import AdminHome from "./components/ADMINISTRATOR/AdminHome/AdminHome";
import AdminCategory from "./components/ADMINISTRATOR/AdminCategory/AdminCategory";
import AdminProduct from "./components/ADMINISTRATOR/AdminProduct/AdminProduct";
import AdminProductView from "./components/ADMINISTRATOR/AdminProductView/AdminProductView";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [adminLogin, setAdminLogin] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const useremail = useSelector((state) => state.email);

  // Mock loading and authentication for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    if (useremail === "admin@mail.com") {
      setAdminLogin(true);
    } else {
      setAdminLogin(false);
    }
  }, [useremail]);

  return (
    <BrowserRouter className="main-container">
      {loading ? (
        <Loader disp={loading} />
      ) : (
        <AuthRoutes isLoggedIn={isLoggedIn} adminLogin={adminLogin} />
      )}
    </BrowserRouter>
  );
};

const AuthRoutes = ({ isLoggedIn, adminLogin }) => (
  <Routes className="main-container">
    {!isLoggedIn ? (
      <>
        {/* guest user pages.. */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </>
    ) : adminLogin ? (
      <>
        <Route path="/" element={<AdminHome />} />
        <Route path="/AdminCategory" element={<AdminCategory />} />
        <Route path="/AdminProduct" element={<AdminProduct />} />
        <Route path="/AdminProductView" element={<AdminProductView />} />
      </>
    ) : (
      <>
        {/* route user pages.. */}
        <Route path="/" element={<Home />} />
        <Route path="/Category" element={<Category />} />
      </>
    )}
  </Routes>
);

export default App;
