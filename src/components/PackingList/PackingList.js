import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [showMore, setShowMore] = useState(false); // Track whether to show more lists

  const handleAdd = () => {
    if (item.trim()) {
      setItems([...items, { name: item.trim(), packed: false }]);
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
    const predefinedItems = predefinedLists[listName].map((name) => ({
      name,
      packed: false,
    }));
    setItems(predefinedItems);
  };

  // Get the lists to show based on the showMore state
  const listsToShow = showMore
    ? Object.keys(predefinedLists)
    : Object.keys(predefinedLists).slice(0, 5);

  return (
    <div className="packing-list">
      <h1>Packing List Planner</h1>
      <p>Plan and organize your trip essentials effortlessly! 🧳</p>

      {/* Add Item Form */}
      <div className="add-item-form">
        <h2>Add Your Own Item</h2>
        <div className="form">
          <motion.input
            type="text"
            placeholder="Enter an item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        </div>
      </div>

      {/* Predefined Lists */}
      <div className="predefined-lists">
        <h2>Predefined Lists</h2>
        <motion.div
          className="predefined-cards"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {listsToShow.map((listName) => (
            <motion.div
              key={listName}
              className="predefined-card"
              whileHover={{ scale: 1.05, backgroundColor: '#C9E0B6' }}
              onClick={() => loadPredefinedList(listName)}
            >
              <h3>{listName}</h3>
              <p>{`${predefinedLists[listName].length} items`}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More / Load Less Button */}
        {Object.keys(predefinedLists).length > 5 && (
          <motion.button
            className="load-more"
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? 'Load Less' : 'Load More'}
          </motion.button>
        )}
      </div>

      {/* Packing List */}
      <div className="list-container">
        <h2>Your Packing List</h2>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {items.map((i, index) => (
            <motion.li
              key={index}
              className={i.packed ? 'packed' : ''}
              onClick={() => togglePacked(index)}
              whileHover={{ scale: 1.05 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {i.name}
            </motion.li>
          ))}
        </motion.ul>
        {items.length === 0 && <p>No items found. Start packing! 🚀</p>}
      </div>
    </div>
  );
};

export default PackingList;