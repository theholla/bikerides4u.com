import { BikeRides4UEvent } from '.';
import { GeoJSON } from 'geojson';
import { getShiftEvents } from './getShiftEvents';

function toGeoJSON(events: Array<BikeRides4UEvent>): GeoJSON {
  return {
    type: 'FeatureCollection',
    features: events.map(event => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [event.latLng.latitude, event.latLng.longitude],
      },
      properties: {
        name: event.title.trim(),
        date: event.date,
      },
    })),
  };
}

export function getEventGeoJSON(useLiveData: boolean, useGeocodingService: boolean): Promise<GeoJSON> {
  const MS_90_DAYS = 7776000000; // 90 days in milliseconds

  const start = new Date().toISOString().split('T')[0];
  const end = new Date(new Date().getTime() + MS_90_DAYS).toISOString().split('T')[0];

  return getShiftEvents(useLiveData, useGeocodingService, start, end).then(events => toGeoJSON(events));
}
