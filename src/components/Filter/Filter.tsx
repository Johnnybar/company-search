import React from "react";
import "./Filter.scss";

interface FilterProps {
  handleFilterClick: handleFilterClick;
  filter: string;
}
function Filter({ handleFilterClick, filter }: FilterProps) {
  return (
    <div>
      <input
        type="checkbox"
        id={filter}
        name={filter}
        onClick={handleFilterClick}
      />
      <label htmlFor={filter}>{filter}</label>
    </div>
  );
}

export default Filter;
