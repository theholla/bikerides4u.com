import axios, { AxiosResponse } from 'axios';
import { getDistance } from 'geolib';

// FIXME: this file is getting out of hand, could use cleanup

interface RawEvent {
  id: string;
  venue: string;
  address: string;
  hideemail: string; // stringified number
  locdetails?: string;
  eventduration?: string; // stringified number
  image?: string;
  tinytitle: string;
  printdescr: string;
  datestype: string; // enum, stringified number
  area: string; // enum
  featured: boolean;
  printemail: boolean;
  printphone: boolean;
  printweburl: boolean;
  printcontact: boolean;
  contact?: string;
  date: YYYYMMDD;
  caldaily_id: string; // stringified number
  audience: string; // enum
  cancelled: boolean;
  details: string;
  email?: string;
  endtime: string;
  newsflash?: string;
  organizer: string;
  phone?: string;
  shareable: string; // shareable web link
  time: string;
  timedetails?: string;
  title: string;
  webname: string;
  weburl: string;
}
interface ShiftCalResponse {
  events: RawEvent[];
}

// these date types do not enforce; they just help me recall what the dates (hopefully) look like
type YYYYMMDD = string; // date already in PST in format yyyy-mm-dd
type MDYYYY = string; // date in PST in format m/d/yyyy
type MDYYYYHMMSSSS = string; // date in PST in format m/d/yyyy h:mm:ssss

export interface FormattedEvent {
  id: string;
  key: string;
  title: string;
  details: string;
  venue: string;
  dayOfWeek: Day;
  times: string;
  distance: number;
  latLng: Coordinate;
  date: YYYYMMDD;
  friendlyDate: MDYYYY;
  freshAsOf: MDYYYYHMMSSSS;
}

export type Coordinate = {
  readonly latitude: number;
  readonly longitude: number;
};

export enum Day {
  Sun = 'Sun',
  Mon = 'Mon',
  Tu = 'Tu',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
}

export const defaultCoords = {
  latitude: 45.504738,
  longitude: -122.675275,
};

function getEventKey(date: YYYYMMDD, id: string): string {
  // repeating events have the same id so we must store them with additional meta
  return `${date}-${id}`;
}

// hhmmss = hh:mm:ss, ie 18:30:00
export function transformTime(hhmmss: string): string {
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

export function getTimeForDesc(start: string, end?: string): string {
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

function removeLeadingZero(dateString: string): number {
  return Number(dateString);
}

export function getISODate(date: Date, plusMilliseconds?: number): YYYYMMDD {
  if (plusMilliseconds) {
    return getISODate(new Date(new Date().getTime() + plusMilliseconds));
  } else {
    return date.toISOString().split('T')[0];
  }
}

// for now assume all users are also in PST
export function getFriendlyDate(date: YYYYMMDD): MDYYYY {
  const [year, month, day] = date.split('-');
  return `${removeLeadingZero(month)}/${removeLeadingZero(day)}/${year}`;
}

export function getDayOfWeek(date: YYYYMMDD): Day {
  const day = new Date(`${date} PST`).getDay();
  // FIXME: this is a bummer.. can I get from idx instead?
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
  }
  console.error(`Cannot find day of week for date; choosing Sun`, { date });
  return Day.Sun;
}

function mapEvents(userLoc: Coordinate, events: RawEvent[]): Array<FormattedEvent> {
  return events
    .map(({ id, title, details, venue, date, address, time, endtime }) => {
      const latLng = getCoordsFromAddress(address);
      return {
        id,
        key: getEventKey(date, id),
        freshAsOf: new Date().toLocaleString(),
        latLng,
        distance: formatNumber(getDistance(userLoc, latLng, 0.1)),
        title,
        details,
        venue,
        date,
        friendlyDate: getFriendlyDate(date),
        dayOfWeek: getDayOfWeek(date),
        times: getTimeForDesc(time, endtime),
      };
    })
    .sort((a, b) => a.distance - b.distance);
}

export interface FetchedData {
  events: FormattedEvent[];
  start: YYYYMMDD;
  end: YYYYMMDD;
}
function getEvents(userLoc: Coordinate, start: YYYYMMDD, end: YYYYMMDD): Promise<FetchedData> {
  const defaultResponse = {
    events: [],
    start,
    end,
  };
  const url = `https://www.shift2bikes.org/api/events.php?startdate=${start}&enddate=${end}`;
  return axios
    .get(url)
    .then((events: AxiosResponse<ShiftCalResponse>) => {
      if (!events || !events.data) {
        console.log('No events found for that date range', { start, end });
        return defaultResponse;
      }
      return { ...defaultResponse, events: mapEvents(userLoc, events.data.events) };
    })
    .catch((err: Error) => {
      console.error(err);
      return defaultResponse;
    });
}

export default getEvents;
