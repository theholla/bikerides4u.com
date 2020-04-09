import { getDistance } from 'geolib';
import { BikeRides4UEvent, RawEventDesc, Coordinate } from './shared-types';

// these date types do not enforce; they just help me recall what the dates (hopefully) look like
type YYYYMMDD = string; // date already in PST in format yyyy-mm-dd
type MDYYYY = string; // date in PST in format m/d/yyyy
type MDYYYYHMMSSSS = string; // date in PST in format m/d/yyyy h:mm:ssss

export enum Day {
  Sun = 'Sun',
  Mon = 'Mon',
  Tu = 'Tu',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
}

export type FormattedEvent = RawEventDesc & {
  key: string;
  dayOfWeek: Day;
  times: string;
  distance: number;
  latLng: Coordinate;
  date: YYYYMMDD;
  friendlyDate: MDYYYY;
  freshAsOf: MDYYYYHMMSSSS;
};

export function getISODate(date: Date, plusMilliseconds?: number): YYYYMMDD {
  if (plusMilliseconds) {
    return getISODate(new Date(new Date().getTime() + plusMilliseconds));
  } else {
    return date.toISOString().split('T')[0];
  }
}

function removeLeadingZero(dateString: string): number {
  return Number(dateString);
}

// for now assume all users are also in PST
export function getFriendlyDate(date: YYYYMMDD): MDYYYY {
  const [year, month, day] = date.split('-');
  return `${removeLeadingZero(month)}/${removeLeadingZero(day)}/${year}`;
}

// hhmmss = hh:mm:ss, ie 18:30:00
export function transformTime(hhmmss: string): string {
  const [hour, minute] = hhmmss.substring(0, 5).split(':');
  const hrInt = parseInt(hour);
  const period = hrInt > 11 && hrInt < 24 ? 'PM' : 'AM';
  let hr = null;
  if (hrInt > 12) {
    hr = hrInt === 24 ? 12 : -(12 - hrInt); // help the americans
  } else {
    hr = parseInt(hour, 10); // remove trailing 0 from AM times
  }
  return `${hr}:${minute} ${period}`;
}

export function getTimeForDesc(start: string, end: string | null): string {
  let time = transformTime(start);
  if (end) {
    time += ` - ${transformTime(end)}`;
  }
  return time;
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
  console.error(`Cannot parse day of week from date; choosing Sun`, { date });
  return Day.Sun;
}

const convert = {
  metersToMiles: (meters: number): number => meters * 0.00062137,
  metersToFeet: (meters: number): number => meters * 3.2808,
};

function formatNumber(number: number): number {
  return Number(convert.metersToMiles(number).toFixed(2));
}

function getEventKey(date: YYYYMMDD, id: string): string {
  // repeating events have the same id so we must store them with additional meta
  return `${date}-${id}`;
}

export function formatEvents(events: BikeRides4UEvent[], userLoc: Coordinate): FormattedEvent[] {
  return events
    .map(event => {
      return {
        key: getEventKey(event.date, event.id),
        freshAsOf: new Date().toLocaleString(),
        distance: formatNumber(getDistance(userLoc, event.latLng, 0.1)),
        friendlyDate: getFriendlyDate(event.date),
        dayOfWeek: getDayOfWeek(event.date),
        times: getTimeForDesc(event.time, event.endtime),
        latLng: event.latLng,
        id: event.id,
        title: event.title,
        details: event.details,
        venue: event.venue,
        address: event.address,
        audience: event.audience,
        organizer: event.organizer,
        shareable: event.shareable,
        cancelled: event.cancelled,
        newsflash: event.newsflash,
        date: event.date,
      };
    })
    .sort((a, b) => a.distance - b.distance);
}
