import React, { useState } from "react";
import data from "../data/data.json";
import config from "../data/config.json";
import style from "../styles/Calculation.module.css";
import ListSorting from "./ListSorting";
import WidthLengthInput from "./WidthLengthInput";
import StrengthSelection from "./StrengthSelection";
import Result from "./Result";

const Calculation = () => {
  const lists = data.filter((item) => item.type === "list");
  const pipes = data.filter((item) => item.type === "pipe");
  const sizes = config.filter((item) => item.type === "size");
  const frames = config.filter((item) => item.type === "frame");
  const fixes = config.filter((item) => item.type === "fix");

  let fixValue;

  let maxWidthSize;
  let minWidthSize;
  let maxLengthSize;
  let minLengthSize;

  sizes.forEach((item) => {
    if (item.key === "width") {
      maxWidthSize = item.max;
      minWidthSize = item.min;
    } else if (item.key === "length") {
      maxLengthSize = item.max;
      minLengthSize = item.min;
    }
  });

  const [chooseSort, setChooseSort] = useState("по цене");
  const [chooseStrength, setChooseStrength] = useState(frames[0].name);
  let stepValue;
  config
    .filter((item) => item.name === chooseStrength)
    .map((item) => (stepValue = item.step));

  console.log("stepValue", stepValue);
  const [radioListValue, setRadioListValue] = useState(null);
  const [radioPipeValue, setRadioPipeValue] = useState(null);
  const [inputWidthValue, setInputWidthValue] = useState(minWidthSize);
  const [inputLengthValue, setInputLengthValue] = useState(minLengthSize);

  // cart

  let cart = [];

  console.log("cart", cart);

  let listCount =
    radioListValue &&
    Math.ceil(
      (inputWidthValue * inputLengthValue) / (radioListValue.width * 1)
    );

  let pipeCount =
    (Math.floor(inputWidthValue / stepValue) + 1) * inputLengthValue +
    (Math.floor(inputLengthValue / stepValue) + 1) * inputWidthValue;

  let fixCount;

  if (radioListValue) {
    fixes
      .filter((item) => item.key === radioListValue.material)
      .forEach((item) => {
        fixValue = item.value;
        fixCount = fixValue * inputWidthValue * inputLengthValue;
      });
    cart.push(radioListValue);
    radioListValue.count = listCount;
    data.forEach((item) => {
      if (item.type === "fix") {
        item.count = fixCount;
        cart.push(item);
      }
    });
  }

  if (radioPipeValue) {
    cart.push(radioPipeValue);
    radioPipeValue.count = pipeCount;
  }

  return (
    <div className={style.wrapper}>
      <div>
        <p>выберите лист покрытия:</p>
        <ListSorting chooseSort={chooseSort} setChooseSort={setChooseSort} />

        {/* lists */}

        <div className={style.lists}>
          {chooseSort === "по цене"
            ? lists
                .sort((a, b) => a.price - b.price)
                .map((item, index) => {
                  return (
                    <div className={style.list_item} key={index}>
                      <input
                        type="radio"
                        name="list"
                        id={`list${index}`}
                        value={item.name}
                        onChange={() => setRadioListValue(item)}
                      />
                      <label htmlFor={`list${index}`}>
                        {item.name} {item.material}
                      </label>
                    </div>
                  );
                })
            : lists
                .sort((a, b) => a.width - b.width)
                .map((item, index) => {
                  return (
                    <div className={style.list_item} key={index}>
                      <input
                        type="radio"
                        name="list"
                        id={`list${index}`}
                        value={item.name}
                        onChange={() => setRadioListValue(item)}
                      />
                      <label htmlFor={`list${index}`}>
                        {item.name} {item.material}
                      </label>
                    </div>
                  );
                })}
        </div>

        {/*pipes*/}

        <p>выберите трубу:</p>
        <div className={style.lists}>
          {pipes
            .sort((a, b) => a.price - b.price)
            .map((item, index) => {
              return (
                <div className={style.list_item} key={index}>
                  <input
                    type="radio"
                    name="pipes"
                    id={`pipe${index}`}
                    value={item.name}
                    onChange={() => setRadioPipeValue(item)}
                  />
                  <label htmlFor={`pipe${index}`}>{item.name}</label>
                </div>
              );
            })}
        </div>

        {/*width and length*/}
        {console.log(inputWidthValue, inputLengthValue)}
        <WidthLengthInput
          minWidthSize={minWidthSize}
          maxWidthSize={maxWidthSize}
          minLengthSize={minLengthSize}
          maxLengthSize={maxLengthSize}
          inputWidthValue={inputWidthValue}
          setInputWidthValue={setInputWidthValue}
          inputLengthValue={inputLengthValue}
          setInputLengthValue={setInputLengthValue}
        />

        {/* choose the strength*/}

        <StrengthSelection
          frames={frames}
          chooseStrength={chooseStrength}
          setChooseStrength={setChooseStrength}
        />

        {/* do some calculations */}

        <div className={style.calculations}>
          <p>
            количество листов от площади изделия:{" "}
            <span>{radioListValue ? listCount : 0}</span> шт.
          </p>
          <p>
            количество трубы в метрах погонных: <span>{pipeCount}</span> мп
          </p>
          <p>
            количество саморезов на м2:{" "}
            <span>{radioListValue ? fixCount : 0}</span> шт.
          </p>
        </div>
      </div>
      {console.log("radioListValue", radioListValue)}

      {/*result section*/}

      <Result
        cart={cart}
        inputWidthValue={inputWidthValue}
        inputLengthValue={inputLengthValue}
        stepValue={stepValue}
      />
    </div>
  );
};

export default Calculation;
