import React from 'react';
import { render } from '@testing-library/react';
import { Controls } from './Controls';
import { Day } from '../helpers/format-events';

function mockFunc(): void {
  return;
}

test('renders the start input field', () => {
  const { getByLabelText } = render(
    <Controls data={{ events: [], start: '', end: '' }} handleEventsFiltered={mockFunc} />
  );
  const startDatePicker = getByLabelText(/from/i);
  expect(startDatePicker).toBeInTheDocument();
  expect(startDatePicker).toBeEmpty();
});

test('renders the end input field', () => {
  const { getByLabelText } = render(
    <Controls data={{ events: [], start: '', end: '' }} handleEventsFiltered={mockFunc} />
  );
  const endDatePicker = getByLabelText(/until/i);
  expect(endDatePicker).toBeInTheDocument();
  expect(endDatePicker).toBeEmpty();
});

test('renders the day of week checkboxes', () => {
  const { getByLabelText } = render(
    <Controls data={{ events: [], start: '', end: '' }} handleEventsFiltered={mockFunc} />
  );
  const sunday = getByLabelText(Day.Sun);
  expect(sunday).toBeInTheDocument();
  const monday = getByLabelText(Day.Mon);
  expect(monday).toBeInTheDocument();
  const tuesday = getByLabelText(Day.Tu);
  expect(tuesday).toBeInTheDocument();
  const wednesday = getByLabelText(Day.Wed);
  expect(wednesday).toBeInTheDocument();
  const thursday = getByLabelText(Day.Thu);
  expect(thursday).toBeInTheDocument();
  const friday = getByLabelText(Day.Fri);
  expect(friday).toBeInTheDocument();
  const saturday = getByLabelText(Day.Sat);
  expect(saturday).toBeInTheDocument();
});
