import axios from 'axios';
import { getShiftEvents } from './get-shift-events';

console.info = jest.fn();
jest.mock('axios', () => ({ get: jest.fn(() => Promise.resolve()) }));

test('getShiftEvents does not trigger API call in test data mode', () => {
  const SHOULD_USE_LIVE_DATA = false;
  getShiftEvents(SHOULD_USE_LIVE_DATA, '2020-04-01', '2020-04-15');
  expect(axios.get).not.toHaveBeenCalled();
});

test('getShiftEvents triggers API call in live mode', () => {
  const SHOULD_USE_LIVE_DATA = true;
  getShiftEvents(SHOULD_USE_LIVE_DATA, '2020-04-01', '2020-04-15');
  expect(axios.get).toHaveBeenCalled();
});
