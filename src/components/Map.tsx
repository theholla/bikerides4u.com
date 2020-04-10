import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { Coordinate } from '../../br4u';
import { FormattedEvent } from '../helpers/format-events';
import './Map.css';

const zoom = 13;
interface MapProps {
  mapCenter: Coordinate;
  selectedEventId?: string;
  points: FormattedEvent[];
}
export class Map extends Component<MapProps, {}> {
  render(): JSX.Element {
    const { mapCenter, points, selectedEventId } = this.props;
    const position = [mapCenter.latitude, mapCenter.longitude] as LatLngTuple;

    return (
      <div className="map-pane" id="map">
        <LeafletMap center={position} zoom={zoom} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          ></TileLayer>
          <Circle center={position} radius={400} />
          {points.map((point: FormattedEvent) => (
            <div key={point.key}>
              <Marker position={[point.latLng.latitude, point.latLng.longitude] as LatLngTuple}>
                {/** FIXME: need to set some property...not isOpen..not sure what */}
                <Popup isOpen={selectedEventId === point.id}>
                  <div>{point.title}</div>
                  <div>{point.venue}</div>
                  <div>{point.address}</div>
                  <div>{point.times}</div>
                  <div>{point.friendlyDate}</div>
                  <p>{point.details}</p>
                </Popup>
              </Marker>
            </div>
          ))}
        </LeafletMap>
      </div>
    );
  }
}
