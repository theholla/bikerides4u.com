import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FormattedEvent } from '../helpers/format-events';
import { ExternalLink } from './ExternalLink';
import shiftIcon from '../images/shift-logo.png';
import './Event.css';

library.add(faMapMarkerAlt);
library.add(faCalendar);
library.add(faInfoCircle);

interface EventProps {
  event: FormattedEvent;
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
      distance,
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
            {title} {cancelled && <span className="cancelled-banner">Cancelled</span>}
          </div>
          <div className="event-details">
            <div className={newsflash ? 'newsflash' : 'hidden'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="event-detail">Newsflash: {newsflash}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="event-detail">{venue}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendar} />
              <span className="event-detail">
                {times} on {friendlyDate}
              </span>
            </div>
          </div>
        </div>
        <ExternalLink href={shareable}>
          <img className="icon" src={shiftIcon} />
          <span className="event-detail">shift2bikes.org</span>
        </ExternalLink>
        <div className="refreshed">data last refreshed {freshAsOf}</div>
        <div className="event-distance-to">
          <span className="push">
            {geoLookupAddress ? `${distance} miles` : `Coordinates not found for address: ${address}`}
          </span>
        </div>
      </div>
    </div>
  );
}
