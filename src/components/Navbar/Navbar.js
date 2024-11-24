import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import TypingEffect from 'react-typing-effect';  // Importing the typing effect component
import "./Navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo with Typing Effect */}
        <div className="navbar-logo">
          <Link to="/" onClick={() => handleLinkClick("/")}>
            <TypingEffect
              text="Ghumakkad"
              speed={100}  // Typing speed (ms)
              eraseDelay={2000}  // Time before erasing
              typingDelay={500}  // Time before typing starts
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li>
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={activeLink === "/" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/itinerary-builder"
              onClick={() => handleLinkClick("/itinerary-builder")}
              className={activeLink === "/itinerary-builder" ? "active" : ""}
            >
              Plan Trip
            </Link>
          </li>
          <li>
            <Link
              to="/packing-list"
              onClick={() => handleLinkClick("/packing-list")}
              className={activeLink === "/packing-list" ? "active" : ""}
            >
              Packing
            </Link>
          </li>
          <li>
            <Link
              to="/travel-suggestions"
              onClick={() => handleLinkClick("/travel-suggestions")}
              className={activeLink === "/travel-suggestions" ? "active" : ""}
            >
              Explore Ideas
            </Link>
          </li>
          <li>
            <Link
              to="/budget-estimator"
              onClick={() => handleLinkClick("/budget-estimator")}
              className={activeLink === "/budget-estimator" ? "active" : ""}
            >
              Budget Tool
            </Link>
          </li>
          <li>
            <Link
              to="/weather-forecast"
              onClick={() => handleLinkClick("/weather-forecast")}
              className={activeLink === "/weather-forecast" ? "active" : ""}
            >
              Weather
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {mobileMenuOpen ? <VscChromeClose /> : <GiHamburgerMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => handleLinkClick("/")}
                className={activeLink === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/itinerary-builder"
                onClick={() => handleLinkClick("/itinerary-builder")}
                className={activeLink === "/itinerary-builder" ? "active" : ""}
              >
                Plan Trip
              </Link>
            </li>
            <li>
              <Link
                to="/packing-list"
                onClick={() => handleLinkClick("/packing-list")}
                className={activeLink === "/packing-list" ? "active" : ""}
              >
                Packing
              </Link>
            </li>
            <li>
              <Link
                to="/travel-suggestions"
                onClick={() => handleLinkClick("/travel-suggestions")}
                className={activeLink === "/travel-suggestions" ? "active" : ""}
              >
                Explore Ideas
              </Link>
            </li>
            <li>
              <Link
                to="/budget-estimator"
                onClick={() => handleLinkClick("/budget-estimator")}
                className={activeLink === "/budget-estimator" ? "active" : ""}
              >
                Budget Tool
              </Link>
            </li>
            <li>
              <Link
                to="/weather-forecast"
                onClick={() => handleLinkClick("/weather-forecast")}
                className={activeLink === "/weather-forecast" ? "active" : ""}
              >
                Weather
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
