import React from "react";
import style from "../styles/ListSortingSelections.module.css";

const ListSortingSelections = ({ setChooseSort, sorting }) => {
  return (
    <div className={style.sort_selections}>
      {sorting.map((item, index) => {
        return (
          <span key={index} onClick={() => setChooseSort(item)}>
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default ListSortingSelections;
