import React, { useState } from 'react';
import axios from 'axios';
import './WeatherForecast.css';
import { FaTemperatureHigh, FaWind, FaTint, FaCloudSun} from 'react-icons/fa';

const WeatherForecast = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8fd8ed51284e42978ea222605242311'; // Replace with your WeatherAPI key

  // Function to fetch current weather data based on city
  const fetchWeatherData = (city) => {
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => {
        setWeatherData(response.data); // Store weather data
        setError(''); // Clear any previous error
      })
      .catch(() => {
        setError('Could not fetch weather data. Please try again.'); // Error handling
        setWeatherData(null); // Reset weather data
      });
  };

  // Function to handle search button click and fetch weather for entered location
  const handleSearch = () => {
    if (location.trim() === '') {
      setError('Please enter a valid location'); // Validation for empty input
      return;
    }
    fetchWeatherData(location); // Fetch weather for the provided city
  };

  // Weather condition-based animation class
  const weatherConditionClass = weatherData
    ? weatherData.current.condition.text.toLowerCase().replace(' ', '-')
    : '';

  return (
    <div className={`weather-forecast ${weatherConditionClass}`}>
      <h1 className="weather-title">Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update location on input change
        className="weather-input"
      />
      <button onClick={handleSearch} className="weather-button">
        Get Weather
      </button>
      {error && <div className="error">{error}</div>} {/* Display error message if any */}

      {weatherData && (
        <div className="weather-info">
          <h2 className="fade-in">{weatherData.location.name}</h2> {/* Display location name with fade-in */}
          <div className="current-weather">
            <h3>Current Weather</h3>
            <p className="fade-in">
              <FaTemperatureHigh /> {weatherData.current.temp_c}°C {/* Temperature */}
            </p>
            <p className="fade-in">
              <FaTint /> Humidity: {weatherData.current.humidity}% {/* Humidity */}
            </p>
            <p className="fade-in">
              <FaWind /> Wind: {weatherData.current.wind_kph} km/h {/* Wind speed */}
            </p>
            <p className="fade-in">
              <FaCloudSun /> Feels Like: {weatherData.current.feelslike_c}°C {/* Feels Like Temperature */}
            </p>
            <p className="fade-in">UV Index: {weatherData.current.uv}</p> {/* UV Index */}
            <p className="fade-in">Pressure: {weatherData.current.pressure_mb} mb</p> {/* Pressure */}
            <p className="fade-in">Wind Gust: {weatherData.current.gust_kph} km/h</p> {/* Wind Gust */}
            <p>{weatherData.current.condition.text}</p> {/* Weather description */}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
