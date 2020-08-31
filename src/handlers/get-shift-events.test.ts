import axios from 'axios';
import googleMapsApi from '@googlemaps/google-maps-services-js';
import { Day, getShiftEvents, getDayOfWeek } from './get-shift-events';

jest.mock('axios', () => ({ get: jest.fn(() => Promise.resolve()) }));
jest.mock('@googlemaps/google-maps-services-js', () => jest.fn());
console.info = jest.fn();

test('getShiftEvents does not trigger Shift2Bikes API call in test data mode', () => {
  const USE_LIVE_DATA = false;
  const USE_GEOCODING_SERVICE = false;
  getShiftEvents(USE_LIVE_DATA, USE_GEOCODING_SERVICE, '2020-04-01', '2020-04-15');
  expect(axios.get).not.toHaveBeenCalled();
});

test('getShiftEvents triggers Shift2Bikes API call in live mode', () => {
  const USE_LIVE_DATA = true;
  const USE_GEOCODING_SERVICE = false;
  getShiftEvents(USE_LIVE_DATA, USE_GEOCODING_SERVICE, '2020-04-01', '2020-04-15');
  expect(axios.get).toHaveBeenCalled();
});

test('getShiftEvents does not trigger geocoder API call when geocoder live mode is off', () => {
  const USE_LIVE_DATA = false;
  const USE_GEOCODING_SERVICE = false;
  getShiftEvents(USE_LIVE_DATA, USE_GEOCODING_SERVICE, '2020-04-01', '2020-04-15');
  expect(googleMapsApi).not.toHaveBeenCalled();
});

test('getDayOfWeek returns expected day for given ride date', () => {
  expect(getDayOfWeek('2020-04-05', '00:00:01')).toEqual(Day.Sun);
  expect(getDayOfWeek('2020-04-05')).toEqual(Day.Sun);
  expect(getDayOfWeek('2020-04-06')).toEqual(Day.Mon);
  expect(getDayOfWeek('2020-04-07')).toEqual(Day.Tu);
  expect(getDayOfWeek('2020-04-08')).toEqual(Day.Wed);
  expect(getDayOfWeek('2020-04-09')).toEqual(Day.Thu);
  expect(getDayOfWeek('2020-04-10')).toEqual(Day.Fri);
  expect(getDayOfWeek('2020-04-11')).toEqual(Day.Sat);
  expect(getDayOfWeek('2020-04-11', '23:59:59')).toEqual(Day.Sat);
});
