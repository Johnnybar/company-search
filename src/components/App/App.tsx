import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Filter from "../Filter/Filter";
import Input from "../Input/Input";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";

function App() {
  interface Company {
    company_name: string;
    logo: string;
    city: number;
    specialty: string;
  }
  const [allCompaniesData, setAllCompaniesData] = useState<any[]>([]);
  const [querySearchResults, setQuerySearchResults] = useState<any[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  let [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const handleSearch = (event: any) => {
    let { value } = event.target;
    value = value.toLowerCase();
    const queryResult = allCompaniesData.filter((item) => {
      return value !== ""
        ? item.company_name.toLowerCase().search(value) !== -1
        : "";
    });
    setQuerySearchResults(queryResult);
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
    const { name, checked } = event.target;
    checked
      ? (selectedFilters = [...selectedFilters, name])
      : selectedFilters.splice(selectedFilters.indexOf(name), 1);

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
            <Filter handleFilterClick={handleFilterClick} filter={filter} />
          ))}
      </div>
      <div className="search">
        <Input handleSearch={handleSearch} />
      </div>
      <div className="results">
        {filteredSearchResults.length > 0 &&
          filteredSearchResults.map((searchResult: Company, i: number) => (
            <ul>
              <li>
                <SearchResult searchResult={searchResult} i={i} />
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}

export default App;
