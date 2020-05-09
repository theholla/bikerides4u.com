import { BikeRides4UEvent, RawEventDesc, Coordinate } from '../../../types';

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
  latLng: Coordinate;
  geoLookupAddress: string;
  date: YYYYMMDD;
  friendlyDate: MDYYYY;
  freshAsOf: MDYYYYHMMSSSS;
};

export type BikeRide = FormattedEvent & {
  distanceTo?: number;
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

// TODO: compute on backend to avoid browser-specific date math
export function getDayOfWeek(date: YYYYMMDD, time?: string): Day {
  const day = new Date(`${date} ${time || '00:00:00'}`).getDay();
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

function getEventKey(date: YYYYMMDD, id: string): string {
  // repeating events have the same id so we must store them with additional meta
  return `${date}-${id}`;
}

export function formatEvents(events: BikeRides4UEvent[]): FormattedEvent[] {
  return events
    .map(event => {
      return {
        key: getEventKey(event.date, event.id),
        freshAsOf: new Date(event.updated).toLocaleString(),
        friendlyDate: getFriendlyDate(event.date),
        dayOfWeek: getDayOfWeek(event.date, event.time),
        times: getTimeForDesc(event.time, event.endtime),
        latLng: event.geoLookup.latLng,
        geoLookupAddress: event.geoLookup.formattedAddress,
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
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
