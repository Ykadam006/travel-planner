import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItineraryBuilder from './components/ItineraryBuilder/ItineraryBuilder';
import PackingList from './components/PackingList/PackingList';
import TravelSuggestions from './components/TravelSuggestions/TravelSuggestions';
import BudgetEstimator from './components/BudgetEstimator/BudgetEstimator';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import HomePage from './components/HomePage/HomePage'; // Import HomePage

function App() {
  return (
    <BrowserRouter>  {/* Wrap your components inside BrowserRouter */}
      <div className="App">
        <Navbar />
        <Routes> {/* Use Routes for routing */}
          <Route path="/" element={<HomePage />} /> {/* Route for HomePage */}
          <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
          <Route path="/packing-list" element={<PackingList />} />
          <Route path="/travel-suggestions" element={<TravelSuggestions />} />
          <Route path="/budget-estimator" element={<BudgetEstimator />} />
          <Route path="/weather-forecast" element={<WeatherForecast />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
