import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

interface MapProps {
  latitude: number;
  longitude: number;
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
    const position = [this.state.latitude, this.state.longitude] as LatLngTuple;
    return (
      <div className="map-pane" id="map">
        <Map center={position} zoom={this.state.zoom} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          ></TileLayer>
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default CustomMap;
