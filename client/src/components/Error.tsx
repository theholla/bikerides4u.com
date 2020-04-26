import React from 'react';
import './Error.css';

type ErrorProps = {
  error: string;
  className?: string;
};
export function Error(props: ErrorProps): JSX.Element {
  const { className, error } = props;
  return <div className={`error ${className || ''}`}>{error}</div>;
}
