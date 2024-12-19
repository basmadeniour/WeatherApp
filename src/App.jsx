import './App.css';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search-sec/Search-sec';
import HourlyItems from './components/HourlyItems';
import Invaiddd from "./components/Assets/no-result.svg"
import { useState } from 'react';

const CURRENT_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const ONE_CALL_API_URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = "0c42f7f6b53b244c78a418f4f181282a";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true); 
  const [invalidCity, setInvalidCity] = useState(false); // Tracks invalid input

  const getWeatherdetails = async (city) => {
    try {
      if (!city.trim()) {
        setShowPrompt(true);
        setInvalidCity(false);
        return;
      }

      setShowPrompt(false);

      const response = await fetch(`${CURRENT_WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        setInvalidCity(true); // Trigger invalid state
        return;
      }

      setInvalidCity(false);

      const data = await response.json();
      const { lat, lon } = data.coord;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      setCurrentWeather({ temperature, description, icon });

      const hourlyResponse = await fetch(
        `${ONE_CALL_API_URL}?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
      );

      if (!hourlyResponse.ok) {
        throw new Error('Unable to fetch hourly forecast');
      }

      const hourlyData = await hourlyResponse.json();
      setHourlyWeather(hourlyData.hourly);
    } catch (error) {
      console.error("Failed to fetch weather details:", error);
    }
  };

  return (
    <div className="container">
      {/* Invalid city error */}
      {invalidCity ? (
        <div className="error-screen">
          <Search getWeatherdetails={getWeatherdetails} />
          <div className="prompt-screen">
            <p>Invalid City Name</p>
            <br />
            <img src={Invaiddd} alt="Error Image" className="error-image" />
          </div>
        </div>
      ) : showPrompt ? (
        <div className="initial-prompt-screen">
          <Search getWeatherdetails={getWeatherdetails} />
          <div className="prompt-screen">
            <p>Please enter a city name to get started.</p>
          </div>
        </div>
      ) : (
        <div className="Weather-section">
          <Search getWeatherdetails={getWeatherdetails} />
          <CurrentWeather currentWeather={currentWeather} />
        </div>
      )}
    </div>
  );
}

export default App;








