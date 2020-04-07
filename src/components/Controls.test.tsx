import React from 'react';
import { render } from '@testing-library/react';
import { Controls } from './Controls';

test('renders the location input field', () => {
  const { getByLabelText } = render(<Controls events={[]} cadence="x" />);
  const locationInput = getByLabelText(/address/i);
  expect(locationInput).toBeInTheDocument();
});

test('renders the start input field', () => {
  const { getByLabelText } = render(<Controls events={[]} cadence="x" />);
  const startInput = getByLabelText(/start/i);
  expect(startInput).toBeInTheDocument();
  expect(startInput).toBeEmpty();
});

test('renders the end input field', () => {
  const { getByLabelText } = render(<Controls events={[]} cadence="x" />);
  const endInput = getByLabelText(/end/i);
  expect(endInput).toBeInTheDocument();
  expect(endInput).toBeEmpty();
});
