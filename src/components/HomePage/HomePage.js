import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1493988577905-2fa4018652be?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1495819001850-6c67d73d1b1e?q=80&w=2967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1499561385668-5ebdb06a79bc?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const recommendations = [
    { 
        image: 'https://images.unsplash.com/photo-1715837484239-9e9b191a6bb6?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        name: 'Tokyo', 
        description: 'Explore vibrant culture and cuisine. 🍣🎏 Immerse yourself in the heart of Japan! 🇯🇵'
      },
      { 
        image: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        name: 'Bali', 
        description: 'A tropical paradise waiting for you. 🌴🌊 Unwind on stunning beaches and explore lush landscapes! 🌅'
      },
      { 
        image: 'https://images.unsplash.com/photo-1509821361533-422c91a204f0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        name: 'Dubai', 
        description: 'Luxury, adventure, and unforgettable experiences. 🏙️🛥️ Discover the magic of the desert and world-class shopping! 🏜️✨'
      },
      { 
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        name: 'Paris', 
        description: 'The city of love and lights! 🗼💖 Stroll along the Seine, enjoy fine dining, and see iconic landmarks like the Eiffel Tower! 🥖🍷'
      }
  ];

  const services = [
    { icon: '🗺️', title: 'Itinerary Builder', description: 'Plan your trip day by day with ease.' },
    { icon: '🧳', title: 'Packing List', description: 'Get a customized packing list for your destination.' },
    { icon: '🌟', title: 'Travel Suggestions', description: 'Discover exciting destinations and activities.' },
    { icon: '💰', title: 'Budget Estimator', description: 'Plan your trip within your budget efficiently.' },
    { icon: '☀️', title: 'Weather Forecast', description: 'Stay updated with destination weather forecasts.' }
  ];
  
  const testimonials = [
    { name: 'Priya & Raj', testimonial: 'Ghumakkad made our honeymoon in Bali unforgettable! The itinerary was perfect!', rating: 5 },
    { name: 'Sam & Laura', testimonial: 'Amazing trip to Paris. All the details were taken care of, making our experience seamless.', rating: 5 },
    { name: 'John & Mary', testimonial: 'The team was fantastic! The local experiences in Tokyo were beyond what we imagined.', rating: 4 },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero">
        <img src={heroImages[currentSlide]} alt="Travel Destination" className="hero-img" />
        <div className="hero-overlay">
          <h1>Explore the World with Ghumakkad</h1>
          <p>__________________________________</p>
          <button className="cta-btn">Plan Your Trip</button>
          <div className="slide-controls">
            <button className="prev-btn" onClick={handlePrevSlide}>❮</button>
            <button className="next-btn" onClick={handleNextSlide}>❯</button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations">
        <h2>Trending Destinations</h2>
        <div className="cards">
          {recommendations.map((rec, index) => (
            <div className="card" key={index}>
              <img src={rec.image} alt={rec.name} />
              <h3>{rec.name}</h3>
              <p>{rec.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Travelers Say</h2>
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <p>"{testimonial.testimonial}"</p>
              <h4>- {testimonial.name}</h4>
              <div className="rating">{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
