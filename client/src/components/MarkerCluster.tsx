import 'react-leaflet-markercluster/dist/styles.min.css';
import React from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FormattedEvent } from '../helpers/format-events';
import './Event.css';
import { Marker } from './Marker';

interface GroupedPoints {
  [key: string]: FormattedEvent[];
}

interface MarkerClusterProps {
  points: FormattedEvent[];
  selectedEventKey: string | null;
}
export function MarkerCluster({ points, selectedEventKey }: MarkerClusterProps) {
  const groupedPoints: GroupedPoints = {};

  points.forEach((point) => {
    const key = point.latLng.latitude + ':' + point.latLng.longitude;
    if (!groupedPoints[key]) {
      groupedPoints[key] = [point];
    } else {
      groupedPoints[key].push(point);
    }
  });

  return (
    <div>
      {Object.entries(groupedPoints).map(([key, pointGroup]) => (
        <MarkerClusterGroup key={key}>
          {pointGroup.map((point) => (
            <Marker clusterKey={key} isSelected={selectedEventKey === point.key} point={point} />
          ))}
        </MarkerClusterGroup>
      ))}
    </div>
  );
}
