import axios, { AxiosResponse } from 'axios';
import { BikeRides4UEvent } from '../../br4u';
import testData from '../test-data.json';

const BASE_URL = process.env.REACT_APP_RIDES4U_BASE_URL;
const SHOULD_USE_LIVE_DATA = process.env.REACT_APP_USE_LIVE_DATA === 'true';

/**
 * Reach out to BikeRides4U API to retrieve Shift2Bikes bike fun data
 * Identical to Shift response but supplemented with lat/lng based on the event's street address
 */
export function requestEvents(start: string, end: string): Promise<AxiosResponse<BikeRides4UEvent[]>> {
  if (!SHOULD_USE_LIVE_DATA) {
    return Promise.resolve({ data: testData }) as any;
  }

  return axios.get(`${BASE_URL}/shift-events?start=${start}&end=${end}`);
}
