import React, { createRef } from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { BikeRide } from '../helpers/format-events';
import './Event.css';

interface MarkerProps {
  isSelected: boolean;
  point: BikeRide;
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
    const {
      point: { address, cancelled, details, friendlyDate, geoLookupAddress, latLng, times, title, venue, key },
    } = this.props;
    if (!geoLookupAddress) return <div></div>;
    return (
      <LeafletMarker ref={this.markerRef} position={[latLng.latitude, latLng.longitude] as LatLngTuple} key={key}>
        <Popup>
          <div className={cancelled ? 'cancelled' : ''}>
            <div>
              {title} {cancelled && <span className="cancelled-banner"> Cancelled</span>}
            </div>
            <div>{friendlyDate}</div>
            <div>{times}</div>
            <div>{venue}</div>
            <p>{details}</p>
          </div>
          <p>
            <strong>Listed address:</strong>
            <br />
            {address}
          </p>
          <p>
            <strong>Displaying location for:</strong>
            <br />
            {geoLookupAddress}
          </p>
        </Popup>
      </LeafletMarker>
    );
  }
}
