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

type BikeRides4UEvent = RawEventDesc & {
  key: string;
  dayOfWeek: Day;
  latLng: Coordinate;
  formattedAddress: string;
  startTime: string;
  endTime: string | null;
  fetched: number;
};

export type FormattedEvent = BikeRides4UEvent & {
  times: string;
  friendlyDate: string;
  freshAsOf: string;
};

export function getISODate(date: Date, plusMilliseconds?: number): string {
  if (plusMilliseconds) {
    return getISODate(new Date(new Date().getTime() + plusMilliseconds));
  } else {
    return date.toISOString().split('T')[0];
  }
}

function removeLeadingZero(dateString: string): number {
  return Number(dateString);
}

// for now assume all users want PST
export function getFriendlyDate(date: string): string {
  if (!date) return '';
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
    hr = parseInt(hour, 10); // remove leading 0 from AM times
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

export function formatEvents(events: BikeRides4UEvent[]): FormattedEvent[] {
  return events
    .map((event) => ({
      ...event,
      friendlyDate: getFriendlyDate(event.date),
      times: getTimeForDesc(event.startTime, event.endTime),
      freshAsOf: new Date(event.fetched).toLocaleString(),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
