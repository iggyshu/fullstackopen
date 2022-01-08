import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries, onCountryClick }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name.official}>
        {country.name.common}
        <button onClick={() => onCountryClick(country.name.common)}>
          show
        </button>
      </div>
    ))}
  </div>
);

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital[0]}</div>
    <div>population {country.population}</div>
    <h3>Languages</h3>
    <ul>
      {Object.keys(country.languages).map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
    </ul>
    <div>
      <img alt="country flag" src={country.flags.svg} width="256" />
    </div>
  </div>
);

const Search = ({ value, onValueChange }) => {
  return (
    <div>
      find countries
      <input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </div>
  );
};

const Main = ({ countries, onCountryClick }) => {
  if (countries.length === 1) {
    // console.log(countries[0]);
    return <Country country={countries[0]} />;
  } else if (countries.length < 10) {
    return <Countries countries={countries} onCountryClick={onCountryClick} />;
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

const App = () => {
  const [searchParam, setSearchParam] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (searchParam.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchParam}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((reason) => {
          console.log("failed request", reason);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  }, [searchParam]);

  const handleCountryClick = (countryName) => {
    // console.log(countryName);
    setSearchParam(countryName);
  };

  return (
    <div>
      <Search value={searchParam} onValueChange={setSearchParam} />
      <Main countries={countries} onCountryClick={handleCountryClick} />
    </div>
  );
};

export default App;
