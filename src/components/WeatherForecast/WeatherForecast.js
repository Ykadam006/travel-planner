import React, { useState } from 'react';
import axios from 'axios';
import './WeatherForecast.css';
import { FaTemperatureHigh, FaWind, FaTint, FaCloudSun } from 'react-icons/fa';

const WeatherForecast = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8fd8ed51284e42978ea222605242311'; 
  const fetchWeatherData = (city) => {
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch(() => {
        setError('Could not fetch weather data. Please try again.');
        setWeatherData(null);
      });
  };

  const handleSearch = () => {
    if (location.trim() === '') {
      setError('Please enter a valid location');
      return;
    }
    fetchWeatherData(location);
  };

  // Get background image class based on the weather condition
  const getWeatherBackgroundClass = () => {
    if (!weatherData) return '';
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear')) return 'sunny-bg';
    if (condition.includes('rain') || condition.includes('showers')) return 'rainy-bg';
    if (condition.includes('cloud') || condition.includes('overcast')) return 'cloudy-bg';
    if (condition.includes('snow')) return 'snowy-bg';
    return 'default-bg'; // Fallback class
  };

  return (
    <div className={`weather-forecast ${getWeatherBackgroundClass()}`}>
      <h1 className="weather-title">Weather Forecast</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="weather-input"
        />
        <button onClick={handleSearch} className="weather-button">
          Get Weather
        </button>
      </div>
      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}</h2>
          <div className="weather-box">
            <p>
              <FaTemperatureHigh /> {weatherData.current.temp_c}°C
            </p>
            <p>
              <FaTint /> Humidity: {weatherData.current.humidity}%
            </p>
            <p>
              <FaWind /> Wind: {weatherData.current.wind_kph} km/h
            </p>
            <p>
              <FaCloudSun /> Feels Like: {weatherData.current.feelslike_c}°C
            </p>
            <p>UV Index: {weatherData.current.uv}</p>
            <p>Pressure: {weatherData.current.pressure_mb} mb</p>
            <p>Wind Gust: {weatherData.current.gust_kph} km/h</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
