import React from "react";
import "./SearchResult.scss";

type SearchResultProps = {
  searchResult: Company;
  i: number;
};
function SearchResult({ searchResult, i }: SearchResultProps) {
  return (
    <li
      className="cosuno-search-result col-3"
      id="cosuno-search-result"
      key={i}
    >
      <img
        className="cosuno-search-result__image"
        src={searchResult.logo}
        alt={searchResult.company_name}
      />
      <h3 className="cosuno-search-result__title">
        {searchResult.company_name}
      </h3>
      <p className="cosuno-search-result__specialty">
        <strong>Specialty: </strong>
        {searchResult.specialty}
      </p>
      <p className="cosuno-search-result__city">
        <strong>City: </strong>
        {searchResult.city}
      </p>
    </li>
  );
}

export default SearchResult;
