import axios, { AxiosResponse } from 'axios';
import { getDistance } from 'geolib';

interface Event {
  id: string;
  title: string;
  venue: string;
  address: string;
  organizer: string;
  details: string;
  time: string;
  hideemail: string; // stringified number
  timedetails?: string;
  locdetails?: string;
  eventduration?: string; // stringified number
  weburl: string;
  webname: string;
  image?: string;
  audience: string; // enum
  tinytitle: string;
  printdescr: string;
  datestype: string; // enum, stringified number
  area: string; // enum
  featured: boolean;
  printemail: boolean;
  printphone: boolean;
  printweburl: boolean;
  printcontact: boolean;
  email?: string;
  phone?: string;
  contact?: string;
  date: string; // stringified date ie '2020-05-14'
  caldaily_id: string; // stringified number
  shareable: string; // shareable web link
  cancelled: boolean;
  newsflash?: string;
  endtime?: string;
}

interface ShiftCalResponse {
  events: Event[];
}

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export interface MappedEvent {
  id: string;
  latLng: Coordinate;
  updated: string;
  title: string;
  venue: string;
  date: string;
  times: string;
  distance: number;
}

function transformTime(hhmmss: string): string {
  const [hour, minute] = hhmmss.substring(0, 5).split(':');
  const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
  let hr = null;
  if (parseInt(hour) > 12) {
    hr = -(12 - parseInt(hour)); // help the americans
  } else {
    hr = parseInt(hour, 10); // remove trailing 0 from AM times
  }
  return `${hr}:${minute} ${period}`;
}

function getTimeForDesc(start: string, end?: string): string {
  let time = transformTime(start);
  if (end) {
    time += ` - ${transformTime(end)}`;
  }
  return time;
}

const convert = {
  metersToMiles: (meters: number): number => meters * 0.00062137,
  metersToFeet: (meters: number): number => meters * 3.2808,
};

function formatNumber(number: number): number {
  return Number(convert.metersToMiles(number).toFixed(2));
}

function getCoordsFromAddress(address: string): Coordinate {
  // FIXME: add handler for "can't parse address for coords" error, list those events separately?
  // TODO: Get lat/long from address
  return { latitude: 45.504738 + Math.random() * 0.05, longitude: -122.675275 + Math.random() * 0.07 };
}

function mapEvents(userLoc: Coordinate, events: Event[]): Array<MappedEvent> {
  return events
    .map(({ id, title, venue, date, address, time, endtime }) => {
      const latLng = getCoordsFromAddress(address);
      return {
        id,
        updated: new Date().toLocaleString(),
        latLng,
        distance: formatNumber(getDistance(userLoc, latLng, 0.1)),
        title,
        venue,
        date,
        times: getTimeForDesc(time, endtime),
      };
    })
    .sort((a, b) => a.distance - b.distance);
}

function getEvents(userLoc: Coordinate, start = '2020-03-31', end = '2020-05-15'): Promise<MappedEvent[]> {
  const url = `https://www.shift2bikes.org/api/events.php?startdate=${start}&enddate=${end}`;
  return axios
    .get(url)
    .then((events: AxiosResponse<ShiftCalResponse>) => {
      if (!events || !events.data) {
        console.log('No events found for that date range', { start, end });
        return [];
      }
      return mapEvents(userLoc, events.data.events);
    })
    .catch((err: Error) => {
      console.error(err);
      return [];
    });
}

export default getEvents;
