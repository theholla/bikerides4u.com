import React from 'react';
import { render } from '@testing-library/react';
import { Controls } from './Controls';
import { Day } from '../helpers/format-events';

function mockFunc(): void {
  return;
}

test('renders the start input field', () => {
  const { getByLabelText } = render(
    <Controls data={{ events: [], start: '', end: '' }} updateMapCenter={mockFunc} handleEventsFiltered={mockFunc} />
  );
  const startDatePicker = getByLabelText(/from/i);
  expect(startDatePicker).toBeInTheDocument();
  expect(startDatePicker).toBeEmpty();
});

test('renders the end input field', () => {
  const { getByLabelText } = render(
    <Controls data={{ events: [], start: '', end: '' }} updateMapCenter={mockFunc} handleEventsFiltered={mockFunc} />
  );
  const endDatePicker = getByLabelText(/until/i);
  expect(endDatePicker).toBeInTheDocument();
  expect(endDatePicker).toBeEmpty();
});

test('renders the day of week checkboxes', () => {
  const { getByLabelText } = render(
    <Controls data={{ events: [], start: '', end: '' }} updateMapCenter={mockFunc} handleEventsFiltered={mockFunc} />
  );
  expect(getByLabelText(Day.Sun)).toBeInTheDocument();
  expect(getByLabelText(Day.Mon)).toBeInTheDocument();
  expect(getByLabelText(Day.Tu)).toBeInTheDocument();
  expect(getByLabelText(Day.Wed)).toBeInTheDocument();
  expect(getByLabelText(Day.Thu)).toBeInTheDocument();
  expect(getByLabelText(Day.Fri)).toBeInTheDocument();
  expect(getByLabelText(Day.Sat)).toBeInTheDocument();
});
