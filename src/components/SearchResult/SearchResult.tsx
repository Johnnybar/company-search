import React from "react";
import "./SearchResult.css";

type SearchResultProps = {
  searchResult: Company;
  i: number;
};
function SearchResult({ searchResult, i }: SearchResultProps) {
  return (
    <div key={i}>
      <img src={searchResult.logo} alt={searchResult.company_name} />
      <h1>{searchResult.company_name}</h1>
      <p>specialty: {searchResult.specialty}</p>
      city: {searchResult.city}
    </div>
  );
}

export default SearchResult;
