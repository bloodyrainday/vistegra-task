import React, { useState } from "react";
import style from "../styles/ListSorting.module.css";
import ListSortingSelections from "./ListSortingSelections";

const ListSorting = ({ chooseSort, setChooseSort }) => {
  const [isActive, setIsActive] = useState(false);
  const sorting = ["по цене", "по ширине"];

  return (
    <div className={style.wrapper}>
      <p className={style.text}>отсортировать листы </p>
      <span
        className={style.sort_button}
        onClick={() => setIsActive(!isActive)}
      >
        {chooseSort}
        {isActive && (
          <ListSortingSelections
            setChooseSort={setChooseSort}
            sorting={sorting}
          />
        )}
      </span>
    </div>
  );
};

export default ListSorting;
