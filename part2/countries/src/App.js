import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({countries}) => (
    <div>
        {countries.map((country) => (
          <div key={country.name.official}>{country.name.common}</div>
        ))}
    </div>
);

const Country = ({country}) => (
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

const App = () => {
  const [searchParam, setSearchParam] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (searchParam.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchParam}`)
        .then((response) => {
          setCountries(response.data);
        });
    } else {
      setCountries([]);
    }
  }, [searchParam]);

  let Main;

  if (countries.length === 1) {
    // console.log(countries[0]);
    Main = (<Country country={countries[0]} />);
  } else if (countries.length < 10) {
    Main = (<Countries countries={countries} />);
  } else {
    Main = (<div>Too many matches, specify another filter</div>);
  }

  return (
    <div>
      <div>
        find countries
        <input
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
        />
      </div>
      {Main}
    </div>
  );
};

export default App;
