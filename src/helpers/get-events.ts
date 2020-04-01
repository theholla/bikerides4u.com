import axios, { AxiosResponse } from 'axios';
import { getDistance } from 'geolib';
import testData from '../test-data.json';

interface Event {
  id: string;
  title: string;
  venue: string;
  address: string;
  organizer: string;
  details: string;
  time: string;
  latitude: number;
  longitude: number;
  hideemail: string; // stringified number
  timedetails?: string;
  locdetails?: string;
  eventduration: string; // stringified number
  weburl: string;
  webname: string;
  image: string;
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
  date: string;
  caldaily_id: string; // stringified number
  shareable: string;
  cancelled: boolean;
  newsflash?: string;
  endtime: string;
}

interface ShiftCalResponse {
  events: Event[];
}

type Coordinate = {
  latitude: number;
  longitude: number;
};

export interface MappedEvent {
  id: string;
  latitude: number;
  longitude: number;
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

function getLatLon(address: string): Coordinate {
  // TODO: Get lat/long from user's geolocation
  return { latitude: 45.504738, longitude: -122.675275 };
}

function mapEvents(address: string, events: Event[]): Array<MappedEvent> {
  const userCoords = getLatLon(address);
  const res = events
    .map(({ id, title, venue, date, latitude, longitude, time, endtime }) => ({
      id,
      updated: new Date().toLocaleString(),
      latitude,
      longitude,
      distance: formatNumber(getDistance(userCoords, { latitude, longitude }, 0.1)),
      title,
      venue,
      date,
      times: getTimeForDesc(time, endtime),
    }))
    .sort((a, b) => a.distance - b.distance);
  return res;
}

const baseUrl = 'https://www.shift2bikes.org/api/events.php';
function getEvents(address = '', start = '2020-03-31', end = '2020-05-15'): Promise<MappedEvent[]> {
  // not hitting actual Shift API for now bc I don't want to accidentally DDoS them
  // return axios
  //   .get(`${baseUrl}?startdate=${start}&enddate=${end}`)
  return Promise.resolve(testData as any)
    .then(({ data }: AxiosResponse<ShiftCalResponse>) => {
      return mapEvents(address, data.events);
    })
    .catch((err: Error) => {
      console.error(err);
      return [];
    });
}

export default getEvents;
