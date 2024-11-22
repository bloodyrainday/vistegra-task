import React from "react";
import style from "../styles/Button.module.css";

const Button = ({ title, setChooseMaterial }) => {
  return (
    <div
      className={`${style.button} ${style.active}`}
      onClick={() => setChooseMaterial(title)}
    >
      {title}
    </div>
  );
};

export default Button;
