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
      backgroundColor: isDisabled ? "red" : "green",
      color: "#FFF",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};
interface FilterProps {
  handleFilterClick: handleFilterClick;
  filterSelectOptions: SelectOptionProps[];
}
function Filter({ handleFilterClick, filterSelectOptions }: FilterProps) {
  return (
    <Select
      isMulti
      name="Specialty"
      styles={customStyles}
      options={filterSelectOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selectedFilters) => {
        handleFilterClick(selectedFilters);
      }}
    />
  );
}

export default Filter;
