import React from 'react';
import { LatLngTuple } from 'leaflet';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { FormattedEvent } from '../helpers/format-events';
import './Map.css';
import { MarkerCluster } from './MarkerCluster';

const defaultCoords = {
  latitude: 45.522723,
  longitude: -122.656115,
};
const zoom = 13;
interface MapProps {
  selectedEventKey: string | null;
  points: FormattedEvent[];
}
export function Map({ points, selectedEventKey }: MapProps) {
  const position = [defaultCoords.latitude, defaultCoords.longitude] as LatLngTuple;

  return (
    <LeafletMap center={position} zoom={zoom} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer" target="_blank">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" rel="noreferrer" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" rel="noreferrer" target="_blank">OpenStreetMap France</a>'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ></TileLayer>
      <MarkerCluster points={points} selectedEventKey={selectedEventKey} />
    </LeafletMap>
  );
}
