import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar, faClock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BikeRide } from '../helpers/format-events';
import { ExternalLink } from './ExternalLink';
import './Event.css';
import { AlertBanner } from './AlertBanner';

interface EventProps {
  event: BikeRide;
  handleListItemClick: (id: string) => void;
}
export function Event(props: EventProps): JSX.Element {
  const {
    event: {
      id,
      shareable,
      cancelled,
      title,
      geoLookupAddress,
      newsflash,
      venue,
      times,
      address,
      friendlyDate,
      distanceTo,
      freshAsOf,
    },
    handleListItemClick,
  } = props;

  let eventClassName = 'event';
  if (cancelled) eventClassName += ' cancelled';

  return (
    <div onClick={(): void => handleListItemClick(id)}>
      <div className={eventClassName}>
        <div className={geoLookupAddress ? 'clickable' : ''}>
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
            <div className="event-distance-to">
              <DistanceTo distanceTo={distanceTo} geoLookupAddress={geoLookupAddress} address={address} />
            </div>
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
  geoLookupAddress: string | null;
  address: string | null;
};
function DistanceTo(props: DistanceToProps): JSX.Element {
  const { distanceTo, geoLookupAddress, address } = props;

  let message = '';
  if (geoLookupAddress && distanceTo) {
    // geocoding service found address, display distance
    message = `${distanceTo} miles`;
  } else {
    // geocoding service could not find address
    message = `Coordinates not found for address: ${address}`;
  }
  return <span className="push">{message}</span>;
}
