import React from 'react';
import './NavBar.css';

function NavBar(): JSX.Element {
  return (
    <div className="nav-bar">
      <div className="nav-bar-item logo">Bike Rides 4U</div>
      <div className="nav-bar-item push">How it works</div>
      <div className="nav-bar-item">Search</div>
      <div className="nav-bar-item">Trips</div>
      <div className="nav-bar-item">(--) Holla #</div>
    </div>
  );
}

export default NavBar;
