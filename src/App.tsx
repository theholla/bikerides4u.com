import React from 'react';
import NavBar from './components/NavBar';
import Events from './components/Events';
import Map from './components/Map';
import './App.css';

// FIXME: lat/long should be typed into form and pass down into components
function App(): JSX.Element {
  return (
    <div className="root">
      <NavBar />
      <div className="content">
        <Events />
        <Map latitude={45.504738} longitude={-122.675275} />
      </div>
    </div>
  );
}

export default App;
