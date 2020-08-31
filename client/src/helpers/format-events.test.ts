import { transformTime, getTimeForDesc, getISODate } from './format-events';

// duplicated tests and algorithm from https://github.com/theholla/shift-ics-generator
// TODO: share code using submodule or even better an npm package

test('transformTime transforms AM times as expected', () => {
  expect(transformTime('01:01:01')).toEqual('1:01 AM');
  expect(transformTime('01:01:59')).toEqual('1:01 AM');
  expect(transformTime('09:00:00')).toEqual('9:00 AM');
  expect(transformTime('11:00:00')).toEqual('11:00 AM');
  expect(transformTime('24:15:00')).toEqual('12:15 AM');
});

test('transformTime transforms PM times as expected', () => {
  expect(transformTime('12:00:00')).toEqual('12:00 PM');
  expect(transformTime('12:15:00')).toEqual('12:15 PM');
  expect(transformTime('13:00:00')).toEqual('1:00 PM');
  expect(transformTime('23:59:01')).toEqual('11:59 PM');
  expect(transformTime('23:59:59')).toEqual('11:59 PM');
});

test('getTimeForDesc returns expected duration when only start time provided', () => {
  expect(getTimeForDesc('09:00:00', null)).toEqual('9:00 AM');
});

test('getTimeForDesc returns expected duration for AM start/end', () => {
  expect(getTimeForDesc('09:59:00', '10:30:00')).toEqual('9:59 AM - 10:30 AM');
});

test('getTimeForDesc returns expected duration for AM start, PM end', () => {
  expect(getTimeForDesc('09:59:00', '13:00:00')).toEqual('9:59 AM - 1:00 PM');
});

test('getTimeForDesc returns expected duration for PM start/end', () => {
  expect(getTimeForDesc('12:30:00', '13:30:00')).toEqual('12:30 PM - 1:30 PM');
});

test('getTimeForDesc returns expected duration for PM start, AM end', () => {
  expect(getTimeForDesc('23:59:00', '06:00:00')).toEqual('11:59 PM - 6:00 AM');
});

test('getISODate returns ISO date with no time', () => {
  expect(getISODate(new Date('4/1/2020'))).toEqual('2020-04-01');
});
