import axios, { AxiosResponse } from 'axios';
import { Client } from '@googlemaps/google-maps-services-js';
import { RawEvent, Coordinate, BikeRides4UEvent } from '../../br4u';
import testData from '../test-data/shift-events.json';

// WIP first working implementation, lots of dev code/branching in here that needs cleanup for prod

const BERMUDA_TRIANGLE = {
  latitude: 25.0,
  longitude: -71.0,
};

function getDummyCoords(): Coordinate {
  return { latitude: 45.522723 + Math.random() * -0.05, longitude: -122.656115 + Math.random() * 0.07 };
}

function formatEvent(event: RawEvent, latLng: Coordinate, formattedAddress: string): BikeRides4UEvent {
  // I don't understand why yet but Google Geocode API translates "TBA" to this address
  // it might have to do with how its api handles map bounds
  if (formattedAddress === '101 Mill plain, Vancouver, WA 98664, USA') {
    formattedAddress = '';
    latLng = BERMUDA_TRIANGLE;
  }
  return {
    ...event,
    updated: new Date().getTime(),
    geoLookup: {
      latLng,
      formattedAddress,
    },
  };
}

function hasError(response: AxiosResponse): boolean {
  return !response || !response.data || !response.data.results || !response.data.results.length;
}

function logError(response: AxiosResponse, eventAddress?: string): void {
  if (!response || !response.data) {
    console.error(`Something went terribly wrong. No response from geocoder`);
  } else if (response.data.error_message) {
    console.error(response.data.status, response.data.error_message);
  } else if (!response.data.results || !response.data.results.length) {
    console.error(`Even google could not find coords for address ${eventAddress}. Setting to Bermuda Triangle.`);
  }
}

// in-memory cache for now
// would like to eventually use Redis and also cache Shift2Bikes API response based on start param
interface GeoLookupCache {
  [key: string]: {
    latLng: Coordinate;
    formattedAddress: string;
  };
}
const geocache = {} as GeoLookupCache;

function hydrateFromCache(event: RawEvent): BikeRides4UEvent {
  const { latLng, formattedAddress } = geocache[event.address];
  return formatEvent(event, latLng, formattedAddress);
}

function hydrateFromLocationService(event: RawEvent): Promise<BikeRides4UEvent> {
  const client = new Client({});
  const options = {
    params: {
      address: event.address,
      bounds: '45.445202,-122.829405|45.655988,-122.545333',
      key: process.env.GOOGLE_MAPS_API_KEY || '',
    },
    timeout: 1000,
  };

  return client.geocode(options).then(response => {
    if (hasError(response)) {
      logError(response, event.address);
      // return event anyways, using fake coords
      return Promise.resolve(formatEvent(event, BERMUDA_TRIANGLE, ''));
    }

    const bestResult = response.data.results[0];
    const details = {
      latLng: {
        latitude: bestResult.geometry.location.lat,
        longitude: bestResult.geometry.location.lng,
      },
      formattedAddress: bestResult.formatted_address,
    };
    geocache[event.address] = details;
    return formatEvent(event, details.latLng, details.formattedAddress);
  });
}

function hydrateEventWithLatLng(event: RawEvent): Promise<BikeRides4UEvent> {
  if (geocache[event.address]) {
    return Promise.resolve(hydrateFromCache(event));
  }
  return hydrateFromLocationService(event);
}

export function getShiftEvents(
  shouldUseLiveData: boolean,
  shouldUseLiveGeocoding: boolean,
  start: string, // in format YYYY-MM-DD
  end: string // in format YYYY-MM-DD
): Promise<BikeRides4UEvent[]> {
  if (!shouldUseLiveData) {
    if (shouldUseLiveGeocoding) {
      const events = testData.map(event => formatEvent(event, getDummyCoords(), 'FAKE COORDS'));
      return Promise.all(events.map((event: RawEvent) => hydrateEventWithLatLng(event)));
    } else {
      return Promise.resolve(testData.map(event => formatEvent(event, getDummyCoords(), 'FAKE COORDS')));
    }
  }

  return axios
    .get(`https://www.shift2bikes.org/api/events.php?startdate=${start}&enddate=${end}`)
    .then(
      (response: AxiosResponse<{ events: RawEvent[] }>): Promise<BikeRides4UEvent[]> => {
        if (!response || !response.data || !response.data.events) {
          console.info('No events found for date range', { start, end });
          return Promise.resolve([]);
        }
        const events = response.data.events;
        return Promise.all(events.map((event: RawEvent) => hydrateEventWithLatLng(event)));
      }
    )
    .catch(err => {
      console.error(err.stack);
      throw new Error(`Error retrieving data from Shift API`);
    });
}
