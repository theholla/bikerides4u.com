import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function tick(): void {
  ReactDOM.render(<App />, document.getElementById('root'));
}

setInterval(tick, 1000);
