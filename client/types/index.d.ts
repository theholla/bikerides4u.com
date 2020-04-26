// Type definitions for BikeRides4U
// Project: BikeRides4U
// Definitions by: Diana Holland

export type RawEventDesc = {
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

export interface RawEvent extends RawEventDesc {
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

export type Coordinate = {
  readonly latitude: number;
  readonly longitude: number;
};

export type BikeRides4UEvent = RawEvent & {
  geoLookup: {
    latLng: Coordinate;
    formattedAddress: string;
  };
  updated: number;
};
