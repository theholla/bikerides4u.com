import axios, { AxiosResponse } from 'axios';
import testData from './test-data.json';
import { BikeRides4UEvent, RawEvent, Coordinate } from '../shared-types/shared-types';

function getCoordsFromAddress(address: string): Coordinate {
  // FIXME: add handler for "can't parse address for coords" error, list those events separately?
  // TODO: Get lat/long from address
  return { latitude: 45.522723 + Math.random() * -0.05, longitude: -122.656115 + Math.random() * 0.07 };
}

export function getEvents(
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
        latLng: getCoordsFromAddress(event.address),
      }));
    })
    .catch((err: Error) => {
      console.error('Error fetching events from API', { err });
      return [];
    });
}
