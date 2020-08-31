import axios, { AxiosResponse } from 'axios';
import { Client } from '@googlemaps/google-maps-services-js';
import testData from '../test-data/shift-events.json';

function getEventKey(date: string, id: string): string {
  // repeating events have the same id so we must store them with additional meta
  return `${date}-${id}`;
}

export enum Day {
  Sun = 'Sun',
  Mon = 'Mon',
  Tu = 'Tu',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
}

export function getDayOfWeek(date: string, time?: string): Day {
  const day = new Date(`${date} ${time || '00:00:00'}`).getDay();
  switch (day) {
    case 0:
      return Day.Sun;
    case 1:
      return Day.Mon;
    case 2:
      return Day.Tu;
    case 3:
      return Day.Wed;
    case 4:
      return Day.Thu;
    case 5:
      return Day.Fri;
    case 6:
      return Day.Sat;
    default:
      throw new Error(`Could not get day for date '${date}' time '${time}'`);
  }
}

const BERMUDA_TRIANGLE = {
  latitude: 25.0,
  longitude: -71.0,
};

function getDummyCoords(): Coordinate {
  return {
    latitude: 45.522723 + Math.random() * -0.05,
    longitude: -122.656115 + Math.random() * 0.07,
  };
}

function formatEvent(event: RawEvent, latLng: Coordinate, formattedAddress: string): BikeRides4UEvent {
  return {
    id: event.id,
    title: event.title,
    startTime: event.time,
    endTime: event.endtime,
    details: event.details,
    date: event.date,
    venue: event.venue,
    address: event.address,
    audience: event.audience,
    organizer: event.organizer,
    shareable: event.shareable,
    cancelled: event.cancelled,
    newsflash: event.newsflash,
    latLng,
    formattedAddress,
    key: getEventKey(event.date, event.id),
    dayOfWeek: getDayOfWeek(event.date, event.time),
    fetched: new Date().getTime(),
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

export type BikeRides4UEvent = RawEventDesc & {
  key: string;
  dayOfWeek: Day;
  latLng: Coordinate;
  formattedAddress: string;
  startTime: string;
  endTime: string | null;
  fetched: number;
};

function hydrateFromCache(event: RawEvent): BikeRides4UEvent {
  const { latLng, formattedAddress } = geocache[event.address];
  return formatEvent(event, latLng, formattedAddress);
}

function hydrateFromLocationService(event: RawEvent): Promise<BikeRides4UEvent> {
  const googleMapsClient = new Client({});
  const options = {
    params: {
      address: event.address,
      bounds: '45.445202,-122.829405|45.655988,-122.545333',
      key: process.env.GOOGLE_MAPS_API_KEY || '',
    },
    timeout: 1000,
  };

  return googleMapsClient.geocode(options).then(response => {
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
  } else if (['TBD', 'TBA', '', null].includes(event.address)) {
    return Promise.resolve(formatEvent(event, BERMUDA_TRIANGLE, ''));
  }
  return hydrateFromLocationService(event);
}

export function getShiftEvents(
  useLiveData: boolean,
  useGeocodingService: boolean,
  start: string, // in format YYYY-MM-DD
  end: string // in format YYYY-MM-DD
): Promise<BikeRides4UEvent[]> {
  // FIXME: dead code in prod and way too much branching
  if (!useLiveData) {
    if (useGeocodingService) {
      return Promise.all(testData.map((event: RawEvent) => hydrateEventWithLatLng(event)));
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
        if (useGeocodingService) {
          return Promise.all(events.map((event: RawEvent) => hydrateEventWithLatLng(event)));
        } else {
          return Promise.resolve(events.map(event => formatEvent(event, getDummyCoords(), 'FAKE COORDS')));
        }
      }
    )
    .catch(err => {
      console.error(err.stack);
      throw new Error(`Error retrieving data from Shift API`);
    });
}

type RawEventDesc = {
  id: string;
  title: string;
  details: string;
  address: string;
  venue: string;
  organizer: string;
  cancelled: boolean;
  date: string; // in format YYYY-MM-DD
  audience: string; // enum
  shareable: string; // shareable web link
  newsflash: string | null;
};

interface RawEvent extends RawEventDesc {
  caldaily_id: string; // stringified number
  hideemail: string; // stringified number
  datestype: string; // enum, stringified number
  area: string; // enum
  tinytitle: string;
  printdescr: string;
  featured: boolean;
  printemail: boolean;
  printphone: boolean;
  printweburl: boolean;
  printcontact: boolean;
  time: string;
  timedetails: string | null;
  image: string | null;
  locdetails: string | null;
  endtime: string | null;
  weburl: string | null;
  eventduration: string | null; // stringified number
  webname: string | null;
  contact: string | null;
  email: string | null;
  phone: string | null;
}

type Coordinate = {
  readonly latitude: number;
  readonly longitude: number;
};
