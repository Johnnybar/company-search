import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [allCompaniesData, setAllCompaniesData] = useState<any[]>([]);
  const [querySearchResults, setQuerySearchResults] = useState<any[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<any[]>([]);
  let [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    setQuery(value);
    let queryResult = [];
    queryResult = allCompaniesData.filter((item) => {
      return value !== ""
        ? item.company_name.toLowerCase().search(value) !== -1
        : "";
    });
    setQuerySearchResults(queryResult);
    // setFilteredSearchResults(result);
    let filteredResult: any = [];
    if (selectedFilters.length) {
      filteredResult = queryResult.filter((item) => {
        return selectedFilters.includes(item.specialty);
      });
    }
    setFilteredSearchResults(
      filteredResult.length ? filteredResult : queryResult
    );
  };

  const handleFilterClick = (event: any) => {
    const filterName = event.target.name;
    const filterStatus = event.target.checked;
    filterStatus
      ? (selectedFilters = [...selectedFilters, event.target.name])
      : selectedFilters.splice(selectedFilters.indexOf(filterName), 1);

    setSelectedFilters(selectedFilters);

    const filteredResults = selectedFilters.length
      ? querySearchResults.filter((result) =>
          selectedFilters.includes(result.specialty)
        )
      : querySearchResults;
    console.log(filteredResults, "filtered results");

    setFilteredSearchResults(filteredResults);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`MOCK_DATA.json`);
        setAllCompaniesData(data);
        const specialties = Array.from(
          new Set(data.map((company: Company) => company.specialty))
        );

        setFilters(specialties);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filters &&
          filters.map((filter) => (
            <div>
              <input
                type="checkbox"
                id={filter}
                name={filter}
                onClick={handleFilterClick}
              />
              <label htmlFor={filter}>{filter}</label>
            </div>
          ))}
      </div>
      <div className="search">
        <input
          type="text"
          placeholder={"Search "}
          className={"input"}
          onChange={handleSearch}
          value={query}
        />
      </div>
      <div className="results">
        {filteredSearchResults.length > 0 &&
          filteredSearchResults.map((searchResult: any, i: number) => (
            <div key={i}>
              <img src={searchResult.logo} alt={searchResult.company_name} />
              <h1>{searchResult.company_name}</h1>
              <p>specialty: {searchResult.specialty}</p>
              city: {searchResult.city}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
