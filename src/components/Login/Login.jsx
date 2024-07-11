import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "./Controller";
import CommonInput from "../../common/CommonInput/CommonInput";
import CommonButton from "../../common/CommonButtton/CommonButton";
import title from "../../assets/icon/InKart.png";
import { FcGoogle } from "react-icons/fc";

import { auth, db, provider } from "../../Config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/action";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onError, setOnError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userId);
  const name = useSelector((state) => state.name);
  const mail = useSelector((state) => state.email);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  console.log("Redux Value : ", id, name, mail, isLoggedIn);

  // ######### Login submit function ##############
  const handleSignIn = async () => {
    if (validateEmail(email)) {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const user = querySnapshot.docs.find(
          (doc) =>
            doc.data().email === email &&
            doc.data().password === password &&
            doc.data().status === true
        );

        if (querySnapshot.docs) {
          querySnapshot.docs.forEach((doc) => {
            if (email === doc.data().email) {
              console.log("hai");
              dispatch(
                login({
                  userId: doc.id,
                  name: doc.data().name,
                  email: doc.data().email,
                  contact: doc.data().contact,
                })
              );
              navigate("/");
            } else {
              setOnError("Invalid username and password");
              setEmail("");
              setPassword("");
            }
          });
        } else {
          setOnError("Invalid username and password");
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
        setOnError("Error connecting to the database");
      }
    } else {
      setOnError("invalid email, please try another..");
      setEmail("");
      setPassword("");
    }
  };
  // ############# Google SignUp #################
  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider).then(async(data) => {
      console.log(data.user); 
      localStorage.setItem("name",data.user.displayName)
      localStorage.setItem("email",data.user.email)
      localStorage.setItem("userId",data.user.uid)
      dispatch(
        login({
          userId: data.user.uid,
          name: data.user.displayName,
          email: data.user.email,
        })
      );
    });
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="title">
          <img src={title} alt="title" />
          <h4>Welcome to Inkart</h4>
        </div>
        {email.length > 0 ? <span></span> : <span> {onError} </span>}
        <CommonInput
          type={"email"}
          labeltxt={"Username"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={"user"}
        />
        <CommonInput
          type={"password"}
          labeltxt={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="password"
        />
        <CommonButton
          title={"SignIn"}
          bgcolor={"success"}
          width={"100%"}
          onClick={() => handleSignIn()}
        />
        <div className="bottom-content-box">
          <div className="divider"></div>
          or
          <div className="divider"></div>
        </div>
        <div className="google" onClick={() => handleGoogleSignUp()}>
          <FcGoogle size={25} /> <b>SignUp with Google</b>
        </div>
        <p className="bottom-content">
          create new account <Link to="/signup">click here.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
