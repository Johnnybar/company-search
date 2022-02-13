import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const [allCompaniesData, setAllCompaniesData] = useState<any[]>([]);
const [query, setQuery] = useState("");
const [filters, setFilters] = useState<any[]>([]);
let [selectedFilters, setSelectedFilters] = useState<any[]>([]);

function App() {
  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    setQuery(value);
    let queryResult = [];
    queryResult = allCompaniesData.filter((item) => {
      return value !== ""
        ? item.company_name.toLowerCase().search(value) !== -1
        : "";
    });
    let filteredResult: any = [];
    if (selectedFilters.length) {
      filteredResult = queryResult.filter((item) => {
        return selectedFilters.includes(item.specialty);
      });
    }
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
              <input type="checkbox" id={filter} name={filter} />
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
    </div>
  );
}

export default App;
