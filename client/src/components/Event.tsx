import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar, faClock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BikeRide } from '../helpers/format-events';
import { ExternalLink } from './ExternalLink';
import './Event.css';
import { AlertBanner } from './AlertBanner';

type EventProps = {
  event: BikeRide;
  locationEnabled: boolean;
  handleListItemClick?: (id: string) => void;
};
export function Event(props: EventProps): JSX.Element {
  const {
    event: {
      id,
      shareable,
      cancelled,
      title,
      formattedAddress,
      newsflash,
      venue,
      details,
      times,
      address,
      friendlyDate,
      distanceTo,
      freshAsOf,
    },
    locationEnabled,
    handleListItemClick,
  } = props;

  let eventClassName = 'event';
  if (cancelled) eventClassName += ' cancelled';

  return (
    <div onClick={handleListItemClick ? (): void => handleListItemClick(id) : undefined}>
      <div className={eventClassName}>
        <div className={formattedAddress && handleListItemClick ? 'clickable' : ''}>
          <div className="event-title">
            {title} {cancelled && <AlertBanner message="Cancelled" />}
          </div>
          <div className="event-details">
            <div className={newsflash ? 'newsflash' : 'hidden'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="event-detail">Newsflash: {newsflash}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendar} />
              <span className="event-detail">{friendlyDate}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} />
              <span className="event-detail">{times}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="event-detail">{venue}</span>
            </div>
            <div className="map-details">
              <div className="map-detail">{details}</div>
              <div className="map-detail">
                <strong>Listed address:</strong>
                <div>{address}</div>
              </div>
              <div className="map-detail">
                <strong>Displaying location for:</strong>
                <div>{formattedAddress}</div>
              </div>
            </div>
            {locationEnabled && distanceTo && (
              <div className="event-distance-to">
                <DistanceTo distanceTo={distanceTo} formattedAddress={formattedAddress} address={address} />
              </div>
            )}
          </div>
        </div>
        <div className="refreshed">
          fetched {freshAsOf}{' '}
          <span>
            <ExternalLink href={shareable} text="(see original)" />
          </span>
        </div>
      </div>
    </div>
  );
}

type DistanceToProps = {
  distanceTo: number | null;
  formattedAddress: string | null;
  address: string | null;
};
function DistanceTo(props: DistanceToProps): JSX.Element {
  const { distanceTo, formattedAddress, address } = props;

  let message = '';
  if (formattedAddress && distanceTo) {
    // geocoding service found address, display distance
    message = `${distanceTo} ${distanceTo === 1 ? 'mile' : 'miles'}`;
  } else {
    // geocoding service could not find address
    message = `Coordinates not found for address: ${address}`;
  }
  return <span className="push">{message}</span>;
}
