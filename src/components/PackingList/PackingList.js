import React, { useState } from 'react';
import './PackingList.css';

const predefinedLists = {
  "Beach Vacation 🏖️": ['Sunscreen', 'Swimsuit', 'Beach Towel', 'Sunglasses', 'Flip Flops'],
  "City Tour 🏙️": ['Comfortable Shoes', 'Camera', 'Guidebook', 'Reusable Water Bottle', 'Power Bank'],
  "Hiking Adventure 🥾": ['Hiking Boots', 'Backpack', 'First Aid Kit', 'Snacks', 'Water Bottle'],
  "Winter Getaway ❄️": ['Warm Jacket', 'Gloves', 'Thermals', 'Beanie', 'Snow Boots'],
  "Business Trip 💼": ['Laptop', 'Notebook', 'Business Attire', 'Chargers', 'Travel Documents'],
  "Road Trip 🚗": ['Snacks', 'Map', 'Phone Charger', 'Comfortable Clothes', 'Travel Mug'],
  "Camping Trip ⛺": ['Tent', 'Sleeping Bag', 'Camping Stove', 'Flashlight', 'Cooler'],
  "Family Vacation 👨‍👩‍👧‍👦": ['Kids’ Toys', 'Board Games', 'Snacks', 'Family Camera', 'Stroller'],
  "Cruise Vacation 🚢": ['Sunscreen', 'Swimwear', 'Hats', 'Sunglasses', 'Formal Outfit'],
  "Safari Adventure 🦁": ['Binoculars', 'Camera', 'Hat', 'Safari Clothes', 'Insect Repellent'],
  "Festival Trip 🎉": ['Tents', 'Portable Speaker', 'Festival Tickets', 'Snacks', 'Comfortable Shoes'],
  "Spa Retreat 🧖‍♀️": ['Face Mask', 'Sunscreen', 'Yoga Mat', 'Comfortable Clothing', 'Slippers'],
  "Music Concert 🎶": ['Concert Tickets', 'Comfortable Shoes', 'Portable Charger', 'Light Jacket', 'Earplugs'],
  "Ski Trip 🎿": ['Ski Gear', 'Ski Goggles', 'Snow Boots', 'Thermals', 'Winter Gloves'],
  "Fishing Trip 🎣": ['Fishing Rod', 'Tackle Box', 'Cooler', 'Sunblock', 'Waterproof Boots'],
  "Golf Weekend ⛳": ['Golf Clubs', 'Golf Shoes', 'Gloves', 'Golf Balls', 'Hat'],
  "Yoga Retreat 🧘‍♀️": ['Yoga Mat', 'Comfortable Clothing', 'Water Bottle', 'Meditation Pillow', 'Sunscreen'],
  "Volunteer Trip 🤝": ['Comfortable Shoes', 'Hat', 'Gloves', 'Work Gloves', 'Water Bottle'],
  "Photography Trip 📸": ['Camera', 'Tripod', 'Spare Batteries', 'Memory Cards', 'Camera Lens'],
  "Business Conference 🏢": ['Business Attire', 'Laptop', 'Notebook', 'Pens', 'Conference Ticket'],
  "New Year's Celebration 🎆": ['Party Outfit', 'Champagne', 'Glasses', 'Party Favors', 'Confetti'],
  "Wedding Attendee 💍": ['Formal Outfit', 'Shoes', 'Gift', 'Wedding Card', 'Makeup Kit'],
  "Backpacking Trip 🎒": ['Backpack', 'Sleeping Bag', 'Tent', 'Camping Stove', 'Trail Snacks'],
  "Antarctic Expedition 🧊": ['Thermal Wear', 'Snow Boots', 'Goggles', 'Face Mask', 'Ice Axe'],
  "Volunteer Mission 🌍": ['Work Clothes', 'Water Bottle', 'Sunscreen', 'First Aid Kit', 'Travel Documents'],
  "Island Getaway 🏝️": ['Sunscreen', 'Sunglasses', 'Swimwear', 'Flip Flops', 'Beach Bag'],
  "Wellness Retreat 🌿": ['Essential Oils', 'Comfortable Clothing', 'Yoga Mat', 'Meditation Cushion', 'Healthy Snacks'],
  "Cruise to the Caribbean 🌊": ['Sunscreen', 'Swimsuit', 'Flip Flops', 'Snorkel Gear', 'Sunglasses'],
  "Solo Travel ✈️": ['Passport', 'Camera', 'Portable Charger', 'Comfortable Shoes', 'Guidebook'],
  "Family Road Trip 🚐": ['Snacks', 'Portable Games', 'Travel Pillow', 'Music Playlist', 'Travel Guide'],
  "Snowboarding Trip 🏂": ['Snowboard', 'Snow Boots', 'Gloves', 'Snow Jacket', 'Thermal Wear'],
  "Staycation 🏠": ['Pajamas', 'Netflix Account', 'Comfortable Blanket', 'Snacks', 'Board Games'],
  "Volunteer Abroad 🌍": ['Travel Documents', 'Volunteering Kit', 'Hat', 'Sunblock', 'Work Clothes'],
  "Luxury Vacation 🏰": ['Formal Wear', 'Camera', 'Jewelry', 'Sunglasses', 'Travel Organizer'],
  "Photo Safari 📷": ['Camera', 'Binoculars', 'Safari Outfit', 'Sunscreen', 'Notebook'],
  "Adventure Tour 🚵": ['Biking Gear', 'Backpack', 'Snacks', 'Sunscreen', 'Power Bank'],
  "Study Abroad 📚": ['Textbooks', 'Laptop', 'Chargers', 'Travel Adapter', 'Notebook'],
  "Wildlife Conservation 🐾": ['Field Notebook', 'Boots', 'Binoculars', 'Work Gloves', 'Sunscreen'],
  "Farm Stay 🧑‍🌾": ['Work Boots', 'Hat', 'Sunscreen', 'Comfortable Clothes', 'Tools'],
  "Mountain Trekking 🏞️": ['Trekking Boots', 'Backpack', 'Water Bottle', 'Snacks', 'Thermal Wear'],
  "Tropical Vacation 🌴": ['Sunscreen', 'Swimwear', 'Flip Flops', 'Sunglasses', 'Beach Towel'],
  "Luxury Cruise 🌟": ['Formal Wear', 'Sunscreen', 'Swimwear', 'Sunglasses', 'Shampoo'],
  "European Tour 🇪🇺": ['Comfortable Shoes', 'Power Bank', 'Travel Guide', 'Documents', 'Camera'],
  "Volcano Tour 🌋": ['Hiking Boots', 'Hat', 'Waterproof Gear', 'First Aid Kit', 'Snacks'],
  "Rural Adventure 🌾": ['Boots', 'Hat', 'Camera', 'Map', 'Sunscreen'],
  "Festival of Lights 🎆": ['Decorations', 'Lights', 'Snacks', 'Party Favors', 'Comfortable Shoes'],
  "Cultural Exchange 🌍": ['Notebook', 'Travel Guide', 'Camera', 'Portable Charger', 'Travel Pillow'],
  "Night Camping 🌙": ['Tent', 'Sleeping Bag', 'Flashlight', 'Camping Stove', 'Snacks'],
  "High Altitude Trek 🏔️": ['Mountain Boots', 'Thermal Wear', 'Backpack', 'Water Bottle', 'Snacks'],
  "Motorcycle Road Trip 🏍️": ['Helmet', 'Leather Jacket', 'Gloves', 'Map', 'Travel Mug'],
  "Romantic Getaway ❤️": ['Romantic Outfits', 'Perfume', 'Sunglasses', 'Camera', 'Portable Speaker'],
  "Holiday in the Alps ⛰️": ['Ski Jacket', 'Snow Boots', 'Warm Hat', 'Gloves', 'Thermals'],
  "Retirement Celebration 🎉": ['Party Attire', 'Travel Ticket', 'Gift', 'Cards', 'Memory Book'],
  "Yoga on the Beach 🧘‍♂️": ['Yoga Mat', 'Swimsuit', 'Sunscreen', 'Hat', 'Sunglasses'],
};



const PackingList = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  const handleAdd = () => {
    if (item) {
      setItems([...items, { name: item, packed: false }]);
      setItem('');
    }
  };

  const togglePacked = (index) => {
    const updatedItems = items.map((i, idx) =>
      idx === index ? { ...i, packed: !i.packed } : i
    );
    setItems(updatedItems);
  };

  const loadPredefinedList = (listName) => {
    const predefinedItems = predefinedLists[listName].map((name) => ({ name, packed: false }));
    setItems(predefinedItems);
  };

  return (
    <div className="packing-list">
      <h1>Your Packing List</h1>
      <div className="predefined-lists">
        {Object.keys(predefinedLists).map((listName) => (
          <button
            key={listName}
            className="predefined-button"
            onClick={() => loadPredefinedList(listName)}
          >
            {listName}
          </button>
        ))}
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Add an item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>
      <ul>
        {items.map((i, index) => (
          <li key={index} className={i.packed ? 'packed' : ''}>
            <span onClick={() => togglePacked(index)}>{i.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackingList;
