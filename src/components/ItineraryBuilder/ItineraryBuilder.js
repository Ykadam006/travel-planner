import React, { useState } from 'react';
import './ItineraryBuilder.css';

const predefinedItineraries = [
  { activity: 'Eiffel Tower Visit', date: '2024-12-01', image: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?q=80&w=2964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Louvre Museum Tour', date: '2024-12-02', image: 'https://images.unsplash.com/photo-1639756152470-23cc9e7598b3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Boat Ride on Seine River', date: '2024-12-03', image: 'https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Taj Mahal Sunrise', date: '2024-12-05', image: 'https://images.unsplash.com/photo-1684235423897-4e630a4f1e52?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Safari in Serengeti', date: '2024-12-06', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=3172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Great Wall of China Walk', date: '2024-12-07', image: 'https://images.unsplash.com/photo-1583405584623-58f4b7d1380f?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Statue of Liberty Tour', date: '2024-12-08', image: 'https://images.unsplash.com/photo-1553008016-d3323ad1628b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Santorini Sunset', date: '2024-12-10', image: 'https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { activity: 'Tokyo Disneyland', date: '2024-12-11', image: 'https://images.unsplash.com/photo-1547782126-87bb2bead14e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Sydney Opera House Visit', date: '2024-12-12', image: 'https://images.unsplash.com/photo-1722509627844-970fda8728a8?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Northern Lights Viewing', date: '2024-12-15', image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Golden Gate Bridge Walk', date: '2024-12-16', image: 'https://plus.unsplash.com/premium_photo-1673266628909-8545ab30061b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Machu Picchu Trek', date: '2024-12-17', image: 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Dubai Desert Safari', date: '2024-12-20', image: 'https://images.unsplash.com/photo-1612899326681-66508905b4ce?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Christ the Redeemer Tour', date: '2024-12-21', image: 'https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Angkor Wat Exploration', date: '2024-12-22', image: 'https://plus.unsplash.com/premium_photo-1661963188432-5de8a11f21a7?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Rome Colosseum Tour', date: '2024-12-25', image: 'https://images.unsplash.com/photo-1710275025343-e5565f144730?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Visit the Blue Lagoon', date: '2024-12-26', image: 'https://images.unsplash.com/photo-1516638670706-e28e9118fa9a?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Petra Adventure', date: '2024-12-28', image: 'https://images.unsplash.com/photo-1595937551125-aaeb22a42f56?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { activity: 'Niagara Falls Tour', date: '2024-12-30', image: 'https://images.unsplash.com/photo-1619831619894-2580d80bfc1d?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
];
const ItineraryBuilder = () => {
  const [itinerary, setItinerary] = useState([]);
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    if (activity && date) {
      setItinerary([...itinerary, { activity, date }]);
      setActivity('');
      setDate('');
    }
  };

  const handleRemove = (index) => {
    const updatedItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(updatedItinerary);
  };

  const handleAddPredefined = (predefined) => {
    if (!itinerary.some((item) => item.activity === predefined.activity && item.date === predefined.date)) {
      setItinerary([...itinerary, predefined]);
    }
  };

  return (
    <div className="itinerary-builder">
      <h1>Plan Your Itinerary</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add Activity</button>
      </div>

      <ul className="custom-itinerary-list">
      <hr className="separator" />
        <h2>Your Custom Itinerary</h2>
        {itinerary.map((item, index) => (
          <li key={index}>
            <span>
              {item.date} - {item.activity}
            </span>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="predefined-itineraries">
      <hr className="separator" />
        <h2>Popular Itineraries</h2>
        <div className="itinerary-grid">
          {predefinedItineraries.map((item, index) => (
            <div
              key={index}
              className={`itinerary-card ${itinerary.some(
                (i) => i.activity === item.activity && i.date === item.date
              )
                ? 'selected'
                : ''
              }`}
              onClick={() => handleAddPredefined(item)}
            >
              <img src={item.image} alt={item.activity} />
              <div className="card-info">
                <h3>{item.activity}</h3>
                <p>Date: {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
