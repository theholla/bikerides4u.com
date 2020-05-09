import React, { createRef } from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { Event } from '.';
import { BikeRide } from '../helpers/format-events';
import './Event.css';

interface MarkerProps {
  isSelected: boolean;
  point: BikeRide;
  locationEnabled: boolean;
  key: string;
}
export class Marker extends React.Component<MarkerProps, {}> {
  markerRef = createRef<LeafletMarker>();

  componentDidUpdate(): void {
    const { isSelected } = this.props;
    if (this.markerRef.current && isSelected) {
      this.markerRef.current.leafletElement.openPopup();
    }
  }

  render(): JSX.Element {
    const { point, locationEnabled } = this.props;
    const { latLng, geoLookupAddress, key } = point;
    if (!geoLookupAddress) return <div></div>;
    return (
      <LeafletMarker ref={this.markerRef} position={[latLng.latitude, latLng.longitude] as LatLngTuple} key={key}>
        <Popup>
          <Event locationEnabled={locationEnabled} event={point} />
        </Popup>
      </LeafletMarker>
    );
  }
}
