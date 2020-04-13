import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar(): JSX.Element {
  return (
    <div className="nav-bar">
      <Link to="/" className="nav-bar-item" id="logo">
        BikeRides4U.com (beta)
      </Link>
      <Link to="/paq" className="nav-bar-item push">
        PAQ
      </Link>
      <Link to="/about" className="nav-bar-item">
        About
      </Link>
    </div>
  );
}
