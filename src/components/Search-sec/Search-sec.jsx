import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

export const Search = ({ getWeatherdetails }) => {
  const [city, setCity] = useState("");

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      getWeatherdetails(city); // Pass the city name to the parent function
    } else {
      console.error("City name cannot be empty");
    }
  };

  return (
    <div className="Search-section">
      <form className="Search-form" onSubmit={handleCitySearch}>
        <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
        <input
          type="search"
          placeholder="Enter a city name"
          className="Search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update state with input value
        />
      </form>
      <button className="location-button">
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </button>
    </div>
  );
};

export default Search;


