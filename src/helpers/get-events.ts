import axios, { AxiosResponse } from 'axios';
import testData from '../test-data.json';

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

export interface MappedEvent {
  updated: string;
  title: string;
  venue: string;
  date: string;
  times: string;
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

function mapEvents(events: Event[]): Array<MappedEvent> {
  const res = events.map(({ title, venue, date, time, endtime }) => ({
    updated: new Date().toLocaleString(),
    title,
    venue,
    date,
    times: getTimeForDesc(time, endtime),
  }));
  return res;
}

const baseUrl = 'https://www.shift2bikes.org/api/events.php';
function getEvents(start = '2020-03-05', end = '2020-03-15'): Promise<MappedEvent[]> {
  // return axios
  //   .get(`${baseUrl}?startdate=${start}&enddate=${end}`)
  return Promise.resolve(testData as any)
    .then(({ data }: AxiosResponse<ShiftCalResponse>) => {
      return mapEvents(data.events);
    })
    .catch((err: Error) => {
      console.error(err);
      return [];
    });
}

export default getEvents;
