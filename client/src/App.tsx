import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { About, PAQ, Home } from './pages';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/paq" element={<PAQ />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
