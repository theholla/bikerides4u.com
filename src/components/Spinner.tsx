import React from 'react';
import spinner from '../images/spinner.svg';
import './Spinner.css';

export function Spinner(): JSX.Element {
  return (
    <div className="loader">
      <img src={spinner} alt="spinner"></img>
    </div>
  );
}
