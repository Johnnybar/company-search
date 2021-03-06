import React from "react";
import "./App.scss";
import { useState, useEffect } from "react";
import Filters from "../Filters/Filters";
import Input from "../Input/Input";
import SearchResult from "../SearchResult/SearchResult";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import {
  getResultsBasedOnInput,
  checkForFiltersReturnResults,
  getFiltersRemoveDuplicates,
  createFiltersSelectOptions,
  fetchData,
} from "../../utils";

function App() {
  const [allCompaniesData, setAllCompaniesData] = useState<Company[]>([]);
  const [querySearchResults, setQuerySearchResults] = useState<Company[]>([]);
  //finalSearchResults refers to results received following search and possible filters added
  const [finalSearchResults, setFinalSearchResults] = useState<Company[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  let [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [error, setError] = useState<Optional<string>>(null);
  //this stateful value (filterSelectOptions) is only meant to create React-Select's options prop
  const [filterSelectOptions, setFilterSelectOptions] = useState<
    SelectOptionProps[]
  >([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLowerCase();
    const queryResult: Company[] = getResultsBasedOnInput(
      allCompaniesData,
      value
    );
    setQuerySearchResults(queryResult);
    let filteredResults: Company[];
    //set final results based on either filters+query or only query if no filters were selected
    filteredResults = checkForFiltersReturnResults(
      selectedFilters,
      queryResult
    );
    setFinalSearchResults(filteredResults);
  };

  const handleFilterClick = (selectedFilters: SelectOptionProps[]) => {
    const remainingSelectedFilters = selectedFilters.map(
      (item: SelectOptionProps) => item.value
    );
    setSelectedFilters(remainingSelectedFilters);
    let filteredResults: Company[];

    //set final results based on either filters+query or only query if no filters were selected
    filteredResults = checkForFiltersReturnResults(
      remainingSelectedFilters,
      querySearchResults
    );
    setFinalSearchResults(filteredResults);
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setAllCompaniesData(data);
        //create all specialties filters
        const specialtiesFilters = getFiltersRemoveDuplicates(data);
        //create React-Select's options prop using specialties filters
        const reactSelectFilterOptions =
          createFiltersSelectOptions(specialtiesFilters);
        setFilterSelectOptions(reactSelectFilterOptions);
        setFilters(specialtiesFilters);
      })
      .catch((error) => {
        setError(error as string);
        console.log(error);
      });
  }, []);

  return (
    <div className="company-search-app">
      <Header />
      <div className="company-search-content-wrapper container">
        <div className="company-search-search-field__wrapper">
          <Input handleSearch={handleSearch} />
          {filters && (
            <Filters
              handleFilterClick={handleFilterClick}
              filterSelectOptions={filterSelectOptions}
            />
          )}
        </div>
        <div className="cusono-search-results container">
          <ul className="cusono-search-results__results-list row">
            {finalSearchResults.length > 0 &&
              finalSearchResults.map((searchResult: Company, i: number) => (
                <SearchResult searchResult={searchResult} i={i} key={i} />
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
