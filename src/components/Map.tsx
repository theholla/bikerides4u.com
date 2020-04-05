import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { MappedEvent, defaultCoords, getEventKey } from '../helpers/get-events';
import './Map.css';

const zoom = 13;
interface MapProps {
  selectedEventId?: string;
  latitude: number;
  longitude: number;
  points: MappedEvent[];
}
export class Map extends Component<MapProps, {}> {
  constructor(props: MapProps) {
    super(props);
  }

  render(): JSX.Element {
    const { latitude, longitude, points, selectedEventId } = this.props;
    const position = [latitude, longitude] as LatLngTuple;

    return (
      <div className="map-pane" id="map">
        <LeafletMap center={position} zoom={zoom} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          ></TileLayer>
          {latitude !== defaultCoords.latitude && (
            <Circle center={position} radius={400}>
              <Popup>You are here!</Popup>
            </Circle>
          )}
          {points.map((point: MappedEvent) => (
            <div key={getEventKey(point.date, point.id)}>
              <Marker position={[point.latLng.latitude, point.latLng.longitude] as LatLngTuple}>
                {/** FIXME: need to set some property...not isOpen..not sure what */}
                <Popup isOpen={selectedEventId === point.id}>
                  <p>
                    <div>{point.title}</div>
                    <div>{point.venue}</div>
                    <div>{point.times}</div>
                    <div>{point.friendlyDate}</div>
                  </p>
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
