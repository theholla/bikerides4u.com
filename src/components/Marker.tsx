import React, { createRef } from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { FormattedEvent } from '../helpers/format-events';

interface MarkerProps {
  isSelected: boolean;
  point: FormattedEvent;
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
    const { point } = this.props;
    return (
      <LeafletMarker
        ref={this.markerRef}
        position={[point.latLng.latitude, point.latLng.longitude] as LatLngTuple}
        key={point.key}
      >
        <Popup>
          <div>{point.title}</div>
          <div>{point.friendlyDate}</div>
          <div>{point.times}</div>
          <div>{point.venue}</div>
          <p>{point.details}</p>
          <p>
            <strong>Listed address:</strong>
            <br />
            {point.address}
          </p>
          <p>
            <strong>Displaying location for:</strong>
            <br />
            {point.geoLookupAddress}
          </p>
        </Popup>
      </LeafletMarker>
    );
  }
}
