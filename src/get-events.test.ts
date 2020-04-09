import axios from 'axios';
import { getEvents } from './get-events';

jest.mock('axios', () => ({ get: jest.fn(() => Promise.resolve()) }));

test('getEvents does not trigger API call in test data mode', () => {
  const SHOULD_USE_LIVE_DATA = false;
  getEvents(SHOULD_USE_LIVE_DATA, '2020-04-01', '2020-04-15');
  expect(axios.get).not.toHaveBeenCalled();
});

test('getEvents triggers API call in live mode', () => {
  const SHOULD_USE_LIVE_DATA = true;
  getEvents(SHOULD_USE_LIVE_DATA, '2020-04-01', '2020-04-15');
  expect(axios.get).toHaveBeenCalled();
});
