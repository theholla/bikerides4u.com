import React, { Component } from 'react';
import { LatLngTuple } from 'leaflet';
import { Map as LeafletMap, TileLayer, Circle } from 'react-leaflet';
import { Marker } from '.';
import { Coordinate } from '../../types';
import { BikeRide } from '../helpers/format-events';
import './Map.css';

const zoom = 13;
interface MapProps {
  mapCenter: Coordinate;
  selectedEventId?: string;
  points: BikeRide[];
}
export class Map extends Component<MapProps> {
  render(): JSX.Element {
    const { mapCenter, points, selectedEventId } = this.props;
    const position = [mapCenter.latitude, mapCenter.longitude] as LatLngTuple;

    return (
      <LeafletMap center={position} zoom={zoom} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer" target="_blank">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" rel="noreferrer" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" rel="noreferrer" target="_blank">OpenStreetMap France</a>'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        ></TileLayer>
        <Circle center={position} radius={400} />
        {points.map((point: BikeRide) => (
          <Marker isSelected={selectedEventId === point.id} point={point} key={point.key} />
        ))}
      </LeafletMap>
    );
  }
}
