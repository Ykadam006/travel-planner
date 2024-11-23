import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

const Navbar = () => {
  const [navbarState, setNavbarState] = useState(false);

  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container">
            <h1>Ghumakkad</h1>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/itinerary-builder">Itinerary </Link>
          </li>
          <li>
            <Link to="/packing-list">Packing </Link>
          </li>
          <li>
            <Link to="/travel-suggestions"> Suggestions</Link>
          </li>
          <li>
            <Link to="/budget-estimator">Budget </Link>
          </li>
          <li>
            <Link to="/weather-forecast">Weather </Link>
          </li>
        </ul>
       
      </Nav>

      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <Link to="/" onClick={() => setNavbarState(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/itinerary-builder" onClick={() => setNavbarState(false)}>
              Itinerary Builder
            </Link>
          </li>
          <li>
            <Link to="/packing-list" onClick={() => setNavbarState(false)}>
              Packing List
            </Link>
          </li>
          <li>
            <Link to="/travel-suggestions" onClick={() => setNavbarState(false)}>
              Travel Suggestions
            </Link>
          </li>
          <li>
            <Link to="/budget-estimator" onClick={() => setNavbarState(false)}>
              Budget Estimator
            </Link>
          </li>
          <li>
            <Link to="/weather-forecast" onClick={() => setNavbarState(false)}>
              Weather Forecast
            </Link>
          </li>
        </ul>
      </ResponsiveNav>
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .container {
      font-size: 1.5rem;
      font-weight: bold;
      color: #243e36;
    }
    .toggle {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
  .nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    li {
      a {
        text-decoration: none;
        color: #243e36;
        font-size: 1rem;
        font-weight: 500;
        transition: color 0.3s;
        &:hover {
          color: #7ca982;
        }
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #48cae4;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #023e8a;
    }
  }
  @media screen and (max-width: 768px) {
    .nav-links {
      display: none;
    }
    .brand .toggle {
      display: block;
    }
    button {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  top: ${({ state }) => (state ? "60px" : "-300px")};
  width: 100%;
  height: 30vh;
  transition: all 0.3s ease;
  z-index: 10;
  ul {
    list-style: none;
    li {
      margin: 0.5rem 0;
      a {
        text-decoration: none;
        font-size: 1.2rem;
        color: #243e36;
        &:hover {
          color: #7ca982;
        }
      }
    }
  }
`;
