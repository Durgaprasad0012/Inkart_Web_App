import React from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiFillPhone,
  AiFillLock,
} from "react-icons/ai";
import "./CommonInput.css";

const CommonInput = (props) => {
  const { type, labeltxt, value, onChange, icon } = props;
  return (
    <div className="iconGroup">
      <div className="input-group">
        {type==="textaria"?
        <textarea id={labeltxt} rows={2} value={value} onChange={onChange} required></textarea>
        :
        <input
          type={type}
          id={labeltxt}
          value={value}
          onChange={onChange}
          required
        />
        }
        <label htmlFor={labeltxt}>{labeltxt}</label>
      </div>
      {icon === "user" ? (
        <AiOutlineUser size={25} />
      ) : icon === "contact" ? (
        <AiFillPhone size={25} />
      ) : icon === "password" ? (
        <AiFillLock size={25} />
      ) : icon === "mail" ? (
        <AiOutlineMail size={25}/>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommonInput;
