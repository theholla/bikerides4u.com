import axios, { AxiosResponse } from 'axios';
import testData from '../test-data.json';
import { BikeRides4UEvent, RawEvent, Coordinate } from './shared-types';

function getCoordsFromAddress(address: string): Coordinate {
  // FIXME: add handler for "can't parse address for coords" error, list those events separately?
  // TODO: Get lat/long from address
  return { latitude: 45.522723 + Math.random() * -0.05, longitude: -122.656115 + Math.random() * 0.07 };
}

// WIP: beginning to separate backend + frontend
// User should hit BikeRides4U API instead of calling this func (TODO: implement backend);
// BikeRides4U backend should handle the call to Shift Cal API + location service API (for lat/lng)
// then respond with cached or new data
export function requestEventsFromBikeRides4UAPI(
  shouldUseLiveData: boolean,
  start: string, // in format YYYY-MM-DD
  end: string // in format YYYY-MM-DD
): Promise<BikeRides4UEvent[]> {
  if (!shouldUseLiveData) {
    return Promise.resolve(testData.events.map(event => ({ ...event, latLng: getCoordsFromAddress(event.address) })));
  }
  return axios
    .get(`https://www.shift2bikes.org/api/events.php?startdate=${start}&enddate=${end}`)
    .then((response: AxiosResponse<any>) => {
      if (!response || !response.data) {
        console.log('No events found for date range', { start, end });
        return [];
      }
      return response.data.events.map((event: RawEvent) => ({
        ...event,
        latLng: getCoordsFromAddress(event.address), // TODO: call service to get actual LatLng
      }));
    })
    .catch((err: Error) => {
      console.error('Error fetching events from API', { err });
      return [];
    });
}
