import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components';
import { About, Community, Featured, Home } from './pages';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <div className="root">
        <NavBar />
        <Switch>
          <Route path="/featured">
            <Featured />
          </Route>
          <Route path="/community">
            <Community />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
