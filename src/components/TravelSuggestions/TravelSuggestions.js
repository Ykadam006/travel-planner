import React, { useState } from 'react';
import './TravelSuggestions.css';

const predefinedSuggestions = [
  { name: 'Eiffel Tower', category: 'Landmark', address: 'Champ de Mars, 5 Avenue Anatole', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Great Wall of China', category: 'Historical Site', address: 'Huairou District, Beijing', image: 'https://images.unsplash.com/photo-1558981012-236ee58eb5c9?q=80&w=2884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Machu Picchu', category: 'Ancient City', address: 'Machu Picchu, Peru', image: 'https://plus.unsplash.com/premium_photo-1694475501155-2f344cea9eb3?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Colosseum', category: 'Landmark', address: 'Piazza del Colosseo, Rome', image: 'https://images.unsplash.com/photo-1704915332184-68202025c9ba?q=80&w=2901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Taj Mahal', category: 'Monument', address: 'Agra, India', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Statue of Liberty', category: 'Landmark', address: 'New York, USA', image: 'https://plus.unsplash.com/premium_photo-1694475458100-5410cc40d07a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Sydney Opera House', category: 'Cultural Landmark', address: 'Bennelong Point, Sydney', image: 'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Santorini', category: 'Island', address: 'Cyclades, Greece', image: 'https://plus.unsplash.com/premium_photo-1661963764475-77d34338b3a3?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Grand Canyon', category: 'Natural Wonder', address: 'Arizona, USA', image: 'https://images.unsplash.com/photo-1555997157-5c8da70533b0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Mount Fuji', category: 'Mountain', address: 'Honshu Island, Japan', image: 'https://images.unsplash.com/photo-1713346641776-73165964c0d4?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Palace of Versailles', category: 'Palace', address: 'Versailles, France', image: 'https://plus.unsplash.com/premium_photo-1694475239205-b95bfdca075e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Stonehenge', category: 'Archaeological Site', address: 'Wiltshire, England', image: 'https://images.unsplash.com/photo-1692375309884-99e1f0a34fe3?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Mount Everest', category: 'Mountain', address: 'Nepal', image: 'https://images.unsplash.com/photo-1606829411515-35bac5e69de7?q=80&w=2994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Big Ben', category: 'Clock Tower', address: 'London, England', image: 'https://plus.unsplash.com/premium_photo-1661922394754-5d8d05a448cf?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Pyramids of Giza', category: 'Historical Site', address: 'Giza Governorate, Egypt', image: 'https://images.unsplash.com/photo-1623674587543-9c7564de99d1?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Niagara Falls', category: 'Waterfall', address: 'Ontario, Canada', image: 'https://images.unsplash.com/photo-1517007658277-ef85a5df6348?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Acropolis of Athens', category: 'Historical Site', address: 'Athens, Greece', image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Alhambra', category: 'Palace', address: 'Granada, Spain', image: 'https://images.unsplash.com/photo-1666501866046-6d05e3d74f00?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Christ the Redeemer', category: 'Statue', address: 'Rio de Janeiro, Brazil', image: 'https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Burj Khalifa', category: 'Skyscraper', address: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Great Barrier Reef', category: 'Natural Wonder', address: 'Queensland, Australia', image: 'https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Venice', category: 'City', address: 'Veneto, Italy', image: '  ' },
  { name: 'Yellowstone National Park', category: 'National Park', address: 'Wyoming, USA', image: '  ' },
  { name: 'Angkor Wat', category: 'Temple', address: 'Siem Reap, Cambodia', image: '  ' },
  { name: 'Louvre Museum', category: 'Museum', address: 'Paris, France', image: '  ' },
  { name: 'Sagrada Familia', category: 'Cathedral', address: 'Barcelona, Spain', image: '  ' },
  { name: 'Mount Kilimanjaro', category: 'Mountain', address: 'Tanzania', image: '  ' },
  { name: 'Tulum', category: 'Ancient City', address: 'Quintana Roo, Mexico', image: '  ' },
  { name: 'Victoria Falls', category: 'Waterfall', address: 'Zimbabwe/Zambia', image: '  ' },
  { name: 'Easter Island', category: 'Island', address: 'Chile', image: '  ' },
  { name: 'Petra', category: 'Archaeological Site', address: 'Ma’an Governorate, Jordan', image: '  ' },
  { name: 'Mount Rushmore', category: 'Monument', address: 'South Dakota, USA', image: '  ' },
  { name: 'Mount Vesuvius', category: 'Volcano', address: 'Naples, Italy', image: '  ' },
  { name: 'Tower of Pisa', category: 'Landmark', address: 'Pisa, Italy', image: '  ' },
  { name: 'Mount Kilimanjaro', category: 'Mountain', address: 'Tanzania', image: '  ' },
  { name: 'Machu Picchu', category: 'Ancient City', address: 'Peru', image: '  ' },
  { name: 'Red Square', category: 'Historic Site', address: 'Moscow, Russia', image: '  ' },
  { name: 'Burj Al Arab', category: 'Hotel', address: 'Dubai, UAE', image: '  ' },
  { name: 'Mount Etna', category: 'Volcano', address: 'Sicily, Italy', image: '  ' },
  { name: 'Sydney Harbour Bridge', category: 'Bridge', address: 'Sydney, Australia', image: '  ' },
  { name: 'Lalibela Rock-Hewn Churches', category: 'Historical Site', address: 'Lalibela, Ethiopia', image: '  ' },
  { name: 'Lake Baikal', category: 'Lake', address: 'Siberia, Russia', image: '  ' },
  { name: 'Cliffs of Moher', category: 'Natural Wonder', address: 'County Clare, Ireland', image: '  ' },
  { name: 'Plitvice Lakes National Park', category: 'National Park', address: 'Croatia', image: '  ' },
  { name: 'Matterhorn', category: 'Mountain', address: 'Switzerland/Italy', image: '  ' },
  { name: 'Cinque Terre', category: 'City', address: 'Liguria, Italy', image: '  ' },
  { name: 'Isla del Sol', category: 'Island', address: 'Lake Titicaca, Bolivia', image: '  ' },
  { name: 'Ayers Rock', category: 'Monument', address: 'Northern Territory, Australia', image: '  ' },
  { name: 'Cappadocia', category: 'Region', address: 'Nevşehir Province, Turkey', image: '  ' },
  { name: 'Kiyomizu-dera', category: 'Temple', address: 'Kyoto, Japan', image: '  ' },
  { name: 'Giza Pyramids', category: 'Ancient Site', address: 'Giza, Egypt', image: '  ' },
  { name: 'Mount Arenal', category: 'Volcano', address: 'Costa Rica', image: '  ' },
  { name: 'Salar de Uyuni', category: 'Desert', address: 'Potosí, Bolivia', image: '  ' },
  { name: 'Fjords of Norway', category: 'Natural Wonder', address: 'Norway', image: '  ' },
  { name: 'Chichen Itza', category: 'Archaeological Site', address: 'Yucatán, Mexico', image: '  ' }
];


const TravelSuggestions = () => {
  const [location, setLocation] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [error, setError] = useState('');

  // Randomly shuffle the predefined suggestions and select 10
  const randomSuggestions = predefinedSuggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  const filterSuggestions = (query) => {
    setLocation(query);
    if (query === '') {
      setFilteredSuggestions(randomSuggestions);
    } else {
      setFilteredSuggestions(
        randomSuggestions.filter((place) =>
          place.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Initially display the random suggestions
  React.useEffect(() => {
    setFilteredSuggestions(randomSuggestions);
  }, []);

  return (
    <div className="travel-suggestions">
      <h1>Travel Suggestions</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for a destination..."
          value={location}
          onChange={(e) => filterSuggestions(e.target.value)}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="cards-container">
        {filteredSuggestions.length > 0 &&
          filteredSuggestions.map((place, index) => (
            <div className="card" key={index}>
              <img
                src={place.image}
                alt={place.name}
                className="card-image"
              />
              <div className="card-content">
                <h3>{place.name}</h3>
                <p>{place.category}</p>
                <p>{place.address}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TravelSuggestions