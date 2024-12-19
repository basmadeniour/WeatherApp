export const HourlyItems = ({ hourlyWeather }) => {
  if (!hourlyWeather || hourlyWeather.length === 0) {
    return <p>No hourly weather data available.</p>;
  }

  return (
    <>
      {hourlyWeather.slice(0, 12).map((hour, index) => (
        <li key={index} className="weather-item">
          <p className="time">
            {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt={hour.weather[0].description}
            className="weather-icon"
          />
          <p className="temperature">{hour.temp} °C</p>
        </li>
      ))}
    </>
  );
};


export default HourlyItems;


