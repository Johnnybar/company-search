import React from "react";
import "./SearchResult.scss";

type SearchResultProps = {
  searchResult: Company;
  i: number;
};
function SearchResult({ searchResult, i }: SearchResultProps) {
  return (
    <li className="cusono-search-results__result col-3" key={i}>
      <img
        className="cosuno-search-result__result-image"
        src={searchResult.logo}
        alt={searchResult.company_name}
      />
      <h1 className="cosuno-search-result__result-title">
        {searchResult.company_name}
      </h1>
      <p className="cosuno-search-result__result-specialty">
        specialty: {searchResult.specialty}
      </p>
      <p className="cosuno-search-result__result-city">
        city: {searchResult.city}
      </p>
    </li>
  );
}

export default SearchResult;
