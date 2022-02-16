import React from "react";
import "./Filters.scss";
import Select from "react-select";

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    width: "400px",
  }),
  option: (styles: any, { isDisabled }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "#ebf1f8" : "#2451b2",
      color: "white",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

function Filter({ handleFilterClick, filterSelectOptions }: FilterProps) {
  return (
    <Select
      isMulti
      name="Specialty"
      styles={customStyles}
      options={filterSelectOptions}
      placeholder="Filter by specialties"
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selectedFilters) => {
        handleFilterClick(selectedFilters);
      }}
    />
  );
}

export default Filter;
