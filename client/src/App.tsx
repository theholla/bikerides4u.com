import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components';
import { About, PAQ, Home } from './pages';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/paq">
          <PAQ />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
