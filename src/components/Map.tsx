import React, { Component } from 'react';
import { Map, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { MappedEvent } from '../helpers/get-events';

interface MapProps {
  latitude: number;
  longitude: number;
  points: MappedEvent[];
}
interface MapState {
  latitude: number;
  longitude: number;
  zoom: number;
}
class CustomMap extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    const { latitude, longitude } = props;
    super(props);
    this.state = {
      latitude,
      longitude,
      zoom: 13,
    };
  }
  render(): JSX.Element {
    const { latitude, longitude, zoom } = this.state;
    const { points } = this.props;
    const position = [latitude, longitude] as LatLngTuple;
    return (
      <div className="map-pane" id="map">
        <Map center={position} zoom={zoom} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          ></TileLayer>
          <Circle center={position} radius={400}>
            <Popup>You are here!</Popup>
          </Circle>
          {points.map((point: MappedEvent, idx: number) => (
            <div key={idx + point.id}>
              <Marker position={[point.latitude, point.longitude] as LatLngTuple}>
                <Popup>{point.title}</Popup>
              </Marker>
            </div>
          ))}
        </Map>
      </div>
    );
  }
}

export default CustomMap;
