import React from "react";
import "./Input.css";
type InputProps = {
  handleSearch: handleSearch;
};
function Input({ handleSearch }: InputProps) {
  return (
    <input
      type="text"
      placeholder={"Search "}
      className={"input"}
      onChange={handleSearch}
    />
  );
}

export default Input;
