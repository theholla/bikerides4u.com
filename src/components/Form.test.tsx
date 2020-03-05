import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';

test('renders the location input field', () => {
  const { getByLabelText } = render(<Form />);
  const locationInput = getByLabelText(/address/i);
  expect(locationInput).toBeInTheDocument();
});

test('renders the start input field', () => {
  const { getByLabelText } = render(<Form />);
  const startInput = getByLabelText(/start/i);
  expect(startInput).toBeInTheDocument();
  expect(startInput).toBeEmpty();
});

test('renders the end input field', () => {
  const { getByLabelText } = render(<Form />);
  const endInput = getByLabelText(/end/i);
  expect(endInput).toBeInTheDocument();
  expect(endInput).toBeEmpty();
});
