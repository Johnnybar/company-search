import React from "react";
import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../Filters/Filters";
import Input from "../Input/Input";
import SearchResult from "../SearchResult/SearchResult";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import {
  getResultsBasedOnInput,
  getResultsBasedOnFilters,
  checkIfFiltersExistReturnResults,
  getFiltersRemoveDuplicates,
  createFiltersSelectOptions,
} from "../../utils";

function App() {
  const [allCompaniesData, setAllCompaniesData] = useState<Company[]>([]);
  const [querySearchResults, setQuerySearchResults] = useState<Company[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<Company[]>(
    []
  );
  const [filterSelectOptions, setFilterSelectOptions] = useState<
    SelectOptionProps[]
  >([]);
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
      setFilteredSearchResults(filteredResult);
    } else {
      setFilteredSearchResults(queryResult);
    }
  };

  const handleFilterClick = (selectedFilters: any) => {
    const onlyFilters = selectedFilters.map((item: any) => item.value);
    setSelectedFilters(onlyFilters);
    const filteredResults = checkIfFiltersExistReturnResults(
      onlyFilters,
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
        // const specialtiesSelectOptions =
        //   createFiltersSelectOptions(specialtiesFilters);
        setFilterSelectOptions(createFiltersSelectOptions(specialtiesFilters));
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
      <Header />
      <div className="cosuno-content-wrapper container">
        <div className="cosuno-search-field__wrapper row">
          <div className="col-6">
            <Input handleSearch={handleSearch} />
          </div>
          <div className="col-6">
            {filters && (
              <Filters
                handleFilterClick={handleFilterClick}
                filterSelectOptions={filterSelectOptions}
              />
            )}
          </div>
        </div>
        <div className="cusono-search-results container">
          <ul className="cusono-search-results__results-list row">
            {filteredSearchResults.length > 0 &&
              filteredSearchResults.map((searchResult: Company, i: number) => (
                <SearchResult searchResult={searchResult} i={i} />
              ))}
          </ul>
        </div>
        {error && (
          <div className="cusono-error">
            <p className="cusono-error_error-text">
              The following error has occurred: {error}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
