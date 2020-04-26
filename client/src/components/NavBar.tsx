import React from 'react';
import { Link } from 'react-router-dom';
import br4uLogo from '../images/logo.svg';
import './NavBar.css';

export function NavBar(): JSX.Element {
  return (
    <div className="nav-bar" id="nav-bar">
      <div id="logo" className="nav-bar-item">
        <Link to="/">
          <img src={br4uLogo} alt="BikeRides4U.com logo" />
        </Link>
        <span className="beta">(beta)</span>
      </div>
      <Link to="/" className="nav-bar-item push">
        Map
      </Link>
      <Link to="/paq" className="nav-bar-item">
        PAQ
      </Link>
      <Link to="/about" className="nav-bar-item">
        About
      </Link>
    </div>
  );
}
