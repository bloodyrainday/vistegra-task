import React, { useState } from "react";
import style from "../styles/StrengthSelection.module.css";

const StrengthSelection = ({ frames, chooseStrength, setChooseStrength }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={style.wrapper}>
      <p className={style.text}>выберите прочность: </p>
      <span
        className={style.choose_strength_button}
        onClick={() => setIsActive(!isActive)}
      >
        {chooseStrength}
        {isActive && (
          <div className={style.strength_selections}>
            {frames.map((item, index) => {
              return (
                <span key={index} onClick={() => setChooseStrength(item.name)}>
                  {item.name}
                </span>
              );
            })}
          </div>
        )}
      </span>
    </div>
  );
};

export default StrengthSelection;
