import React from "react";
import "./SearchResult.scss";

function SearchResult({ searchResult, i }: SearchResultProps) {
  return (
    <li
      className="company-search-search-result col-sm-4 col-md-3"
      id="company-search-search-result"
      key={i}
    >
      <img
        className="company-search-search-result__image"
        src={searchResult.logo}
        alt={searchResult.company_name}
      />
      <h3 className="company-search-search-result__title">
        {searchResult.company_name}
      </h3>
      <p className="company-search-search-result__specialty">
        <strong>Specialty: </strong>
        {searchResult.specialty}
      </p>
      <p className="company-search-search-result__city">
        <strong>City: </strong>
        {searchResult.city}
      </p>
    </li>
  );
}

export default SearchResult;
