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

const Weather = ({ weather }) => {
  return (
    <div>
      <div>
        <strong>temperature: </strong>
        {weather.temperature} Celcius
      </div>
      {/* <img alt="icon representing weather" src={weather.image} /> */}
      <div>
        <strong>wind: </strong>
        {weather.wind} m/s
      </div>
    </div>
  );
};

const Country = ({ country, weather }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital[0]}</div>
    <div>population {country.population}</div>
    <h3>Spoken Languages</h3>
    <ul>
      {Object.keys(country.languages).map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
    </ul>
    <div>
      <img alt="country flag" src={country.flags.svg} width="256" />
    </div>
    <h3>Weather in {country.capital[0]}</h3>
    <Weather weather={weather} />
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

const Main = ({ countries, weather, onCountryClick }) => {
  if (countries.length === 1) {
    // console.log(countries[0]);
    return <Country country={countries[0]} weather={weather} />;
  } else if (countries.length < 10) {
    return <Countries countries={countries} onCountryClick={onCountryClick} />;
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

const App = () => {
  const [searchParam, setSearchParam] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({
    city: "",
    temperature: "",
    image: "",
    wind: "",
  });

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

  useEffect(() => {
    if (countries.length === 1 && weather.city !== countries[0].capital[0]) {
      const city = countries[0].capital[0];
      const api_key = process.env.REACT_APP_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          // console.log(response.data);
          setWeather({
            city: countries[0].capital[0],
            temperature: response.data.main.temp,
            image: response.data.weather.icon,
            wind: response.data.wind.speed,
          });
        });
    }
  });
  const handleCountryClick = (countryName) => {
    // console.log(countryName);
    setSearchParam(countryName);
  };

  return (
    <div>
      <Search value={searchParam} onValueChange={setSearchParam} />
      <Main
        countries={countries}
        weather={weather}
        onCountryClick={handleCountryClick}
      />
    </div>
  );
};

export default App;
