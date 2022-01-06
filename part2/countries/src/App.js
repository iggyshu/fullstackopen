import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <div>
        find countries
        <input
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
        />
      </div>
      <div>
        {countries.map((country) => (
          <div key={country.name.official}>{country.name.common}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
