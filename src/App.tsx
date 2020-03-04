import React from 'react';
import Clock from './components/Clock';
import './App.css';

function App(): JSX.Element {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <Clock />
    </div>
  );
}

export default App;
