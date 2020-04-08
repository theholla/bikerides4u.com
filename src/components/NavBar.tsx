import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar(): JSX.Element {
  return (
    <div className="nav-bar">
      <Link to="/" className="nav-bar-item link" id="logo">
        Bike Rides 4U
      </Link>
      <Link to="/about" className="nav-bar-item link push">
        About
      </Link>
    </div>
  );
}
