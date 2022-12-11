import React, { createRef, useEffect } from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { Event } from '.';
import { FormattedEvent } from '../helpers/format-events';
import './Event.css';

interface MarkerProps {
  isSelected: boolean;
  point: FormattedEvent;
  clusterKey?: string;
}
export function Marker({ point, isSelected, clusterKey }: MarkerProps) {
  const markerRef = createRef<LeafletMarker>();

  useEffect(() => {
    if (markerRef.current && isSelected) {
      markerRef.current.leafletElement.openPopup();
    }
  });

  const { latLng, formattedAddress, key } = point;
  if (!formattedAddress) {
    return <div></div>;
  }

  return (
    <LeafletMarker ref={markerRef} position={[latLng.latitude, latLng.longitude] as LatLngTuple} key={key}>
      <Popup>
        <Event event={point} />
      </Popup>
    </LeafletMarker>
  );
}
