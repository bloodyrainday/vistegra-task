import React from "react";
import style from "../styles/WidthLengthInput.module.css";

const Input = ({
  minWidthSize,
  maxWidthSize,
  minLengthSize,
  maxLengthSize,
  setInputWidthValue,
  setInputLengthValue,
  inputWidthValue,
  inputLengthValue,
}) => {
  console.log("min max", minWidthSize, maxWidthSize);
  return (
    <div className={style.wrapper}>
      <p>параметры каркаса:</p>

      <div className={style.parametrs}>
        <label htmlFor="">ширина</label>
        <input
          type="number"
          value={inputWidthValue}
          onChange={(e) => {
            if (
              e.target.value >= minWidthSize &&
              e.target.value <= maxWidthSize
            ) {
              setInputWidthValue(e.target.value);
            }
          }}
        />

        <label htmlFor="">длина</label>
        <input
          type="number"
          value={inputLengthValue}
          onChange={(e) => {
            if (
              e.target.value >= minLengthSize &&
              e.target.value <= maxLengthSize
            ) {
              setInputLengthValue(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Input;
