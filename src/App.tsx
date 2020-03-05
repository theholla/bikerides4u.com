import React from 'react';
import NavBar from './components/NavBar';
import Events from './components/Events';
import Map from './components/Map';
import './App.css';

function App(): JSX.Element {
  return (
    <div className="root">
      <NavBar />
      <div className="content">
        <Events />
        <Map />
      </div>
    </div>
  );
}

export default App;
