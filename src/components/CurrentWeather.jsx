import React from 'react';

const CurrentWeather = ({ currentWeather }) => {
  const weatherIconUrl = currentWeather.icon
    ? `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`
    : null;

  return (
    <div className="current-weather">
      {weatherIconUrl && <img src={weatherIconUrl} className="weather-icon" alt="Weather Icon" />}
      <h2 className="temperature">
        {currentWeather.temperature} <span><sup>o</sup>C</span>
      </h2>
      <p className="description">{currentWeather.description}</p>
    </div>
  );
};

export default CurrentWeather;





