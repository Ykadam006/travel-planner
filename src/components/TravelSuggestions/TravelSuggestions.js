import React, { useState } from 'react';
import axios from 'axios';
import './TravelSuggestions.css';

const TravelSuggestions = () => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_GEOAPIFY_API_KEY; // Use environment variable

  const fetchSuggestions = () => {
    axios
      .get(
        `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=place:${location}&limit=6&apiKey=${API_KEY}`
      )
      .then((response) => {
        setSuggestions(response.data.features);
        setError('');
      })
      .catch(() => {
        setError('Could not fetch suggestions. Please try again.');
        setSuggestions([]);
      });
  };

  return (
    <div className="travel-suggestions">
      <h1>Travel Suggestions</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchSuggestions}>Get Suggestions</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="cards-container">
        {suggestions.length > 0 &&
          suggestions.map((place, index) => (
            <div className="card" key={index}>
              <img
                src={
                  place.properties.image ||
                  'https://via.placeholder.com/150' // Fallback image
                }
                alt={place.properties.name}
              />
              <div className="card-content">
                <h3>{place.properties.name || 'Unknown Place'}</h3>
                <p>{place.properties.category || 'Category not available'}</p>
                <p>Address: {place.properties.address_line1 || 'Not available'}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TravelSuggestions;
