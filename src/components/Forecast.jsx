import React from 'react';

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <ul>
        {forecast.map((day, index) => (
          <li key={index} className="forecast-item">
            <p>{new Date(day.dt_txt).toLocaleString()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>{day.main.temp} °C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
