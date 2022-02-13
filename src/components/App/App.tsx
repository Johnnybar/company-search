import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../Filter/Filter";
import Input from "../Input/Input";
import SearchResult from "../SearchResult/SearchResult";
import {
  getResultsBasedOnInput,
  getResultsBasedOnFilters,
  checkIfFiltersExistReturnResults,
  getFiltersRemoveDuplicates,
} from "../../utils";

function App() {
  const [allCompaniesData, setAllCompaniesData] = useState<Company[]>([]);
  const [querySearchResults, setQuerySearchResults] = useState<Company[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<Company[]>(
    []
  );
  const [filters, setFilters] = useState<string[]>([]);
  let [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [error, setError] = useState<Optional<string>>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLowerCase();
    const queryResult: Company[] = getResultsBasedOnInput(
      allCompaniesData,
      value
    );
    setQuerySearchResults(queryResult);
    let filteredResult: Company[] = [];
    if (selectedFilters.length) {
      filteredResult = getResultsBasedOnFilters(queryResult, selectedFilters);
    }
    setFilteredSearchResults(
      filteredResult.length ? filteredResult : queryResult
    );
  };

  const handleFilterClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    checked
      ? (selectedFilters = [...selectedFilters, name])
      : selectedFilters.splice(selectedFilters.indexOf(name), 1);
    setSelectedFilters(selectedFilters);

    const filteredResults = checkIfFiltersExistReturnResults(
      selectedFilters,
      querySearchResults
    );

    setFilteredSearchResults(filteredResults);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`MOCK_DATA.json`);
        setAllCompaniesData(data);
        const specialtiesFilters = getFiltersRemoveDuplicates(data);
        setFilters(specialtiesFilters);
      } catch (error) {
        setError(error as string);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filters &&
          filters.map((filter, i) => (
            <Filter
              key={i}
              handleFilterClick={handleFilterClick}
              filter={filter}
            />
          ))}
      </div>
      <div className="search">
        <Input handleSearch={handleSearch} />
      </div>
      <div className="results">
        {filteredSearchResults.length > 0 &&
          filteredSearchResults.map((searchResult: Company, i: number) => (
            <ul key={i}>
              <li>
                <SearchResult searchResult={searchResult} i={i} />
              </li>
            </ul>
          ))}
      </div>
      {error && <div>The following error has occurred: {error}</div>}
    </div>
  );
}

export default App;
