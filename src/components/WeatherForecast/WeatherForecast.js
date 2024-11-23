import React, { useState } from 'react';
import axios from 'axios';
import './WeatherForecast.css';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

const WeatherForecast = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Use environment variable

  const fetchWeatherData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
      )
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
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          fetchWeatherData(lat, lon);
        } else {
          setError('Location not found. Please enter a valid city name.');
          setWeatherData(null);
        }
      })
      .catch(() => {
        setError('Could not fetch location data. Please try again.');
        setWeatherData(null);
      });
  };

  return (
    <div className="weather-forecast">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div
          className={`weather-info ${weatherData.current.weather[0].main.toLowerCase()}`}
        >
          <h2>{location}</h2>
          <div className="current-weather">
            <h3>Current Weather</h3>
            <p>
              <FaTemperatureHigh /> {weatherData.current.temp}°C
            </p>
            <p>
              <FaTint /> Humidity: {weatherData.current.humidity}%
            </p>
            <p>
              <FaWind /> Wind: {weatherData.current.wind_speed} m/s
            </p>
          </div>
          <h3>5-Day Forecast</h3>
          <div className="forecast-scroll">
            {weatherData.daily.slice(0, 5).map((day, index) => (
              <div key={index} className="forecast-card">
                <p>Day {index + 1}</p>
                <p>{day.temp.day}°C</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
