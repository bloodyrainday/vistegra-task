import React from "react";
import style from "../styles/Result.module.css";

const Result = ({ cart, inputLengthValue, inputWidthValue, stepValue }) => {
  const columnTitles = ["наименование", "ед.", "кол-во", "сумма"];

  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.count;
  });
  return (
    <div className={style.wrapper}>
      <div className={style.results}>
        <p>
          площадь изделия: <span>{inputLengthValue * inputWidthValue}</span> м2
        </p>
        <p>
          расчетный размер ячейки: <span>{`${stepValue}x${stepValue}`}</span> м
        </p>
      </div>

      <table>
        <thead>
          <tr>
            {columnTitles.map((item) => {
              return <th className={style.titles}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>{item.count}</td>
                  <td>{(item.price * item.count).toFixed(0)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>

      <p>
        Итого: <span>{totalPrice.toFixed(0)}</span>
      </p>
    </div>
  );
};

export default Result;
