import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonInput from "../../common/CommonInput/CommonInput";
import CommonButton from "../../common/CommonButtton/CommonButton";
import title from "../../assets/icon/InKart.png";
import "./SignUp.css";
import { validateEmail, validatePhoneNumber } from "../Login/Controller";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errormsg, setError] = useState("");
  const handleSignUP = async() => {
    if (!cPassword && !name && !email && !contact && !password) {
      setError("Please fill out this field!");
    } else if (password !== cPassword) {
      setError("Your passwords do not match, please check!");
    } else if (!validateEmail(email)) {
      setError("Invalid email address!");
    } else if (!validatePhoneNumber(contact)) {
      setError("Invalid phone number!");
    } else {
      // firebase add data here
      const data = {
        name: name.trim(),
        contact: contact,
        password: password.trim(),
        email: email.trim(),
        status: true,
      };
      const querySnapshot = await addDoc(collection(db, "users"),data)
      setCPassword("")
      setContact("")
      setEmail("")
      setName("")
      setPassword("")
      setError("");
    }
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="title">
          <img src={title} alt="title" />
          <h4>create an account here</h4>
        </div>
        {errormsg.length < 0 ? <span></span> : <span>{errormsg} </span>}
        <CommonInput
          type={"text"}
          labeltxt={"Enter your name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={"user"}
        />
        <CommonInput
          type={"email"}
          labeltxt={"Enter your email(example@mail.com)"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={"mail"}
        />
        <CommonInput
          type={"number"}
          labeltxt={"Enter your contactnumber"}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          icon={"contact"}
        />
        <CommonInput
          type={"password"}
          labeltxt={"Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={"password"}
        />
        <CommonInput
          type={"password"}
          labeltxt={"Conform your password"}
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          icon={"password"}
        />
        <CommonButton
          title={"SignUp"}
          bgcolor={"success"}
          width={"100%"}
          onClick={() => handleSignUP()}
        />
        <p>
          already have an account <Link to="/">click here.</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
