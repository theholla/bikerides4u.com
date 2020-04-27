import axios from 'axios';
import googleMapsApi from '@googlemaps/google-maps-services-js';
import { getShiftEvents } from './get-shift-events';

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
