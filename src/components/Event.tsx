import React from 'react';
import { FormattedEvent } from '../helpers/format-events';
import { Error } from './Error';

interface EventProps {
  event: FormattedEvent;
  handleListItemClick: (id: string) => void;
}
export function Event(props: EventProps): JSX.Element {
  const {
    event: {
      id,
      cancelled,
      title,
      newsflash,
      venue,
      times,
      address,
      geoLookupAddress,
      friendlyDate,
      distance,
      freshAsOf,
    },
    handleListItemClick,
  } = props;
  return (
    <div onClick={(): void => handleListItemClick(id)}>
      <div className="event">
        <div className="event-title">
          {cancelled ? (
            <div>
              <span className="cancelled">{title}</span>
              <span className="cancelled-banner"> Cancelled</span>
            </div>
          ) : (
            <div>{title}</div>
          )}
        </div>
        {newsflash && <div className="newsflash">Newsflash: {newsflash}</div>}
        <div className="event-venue">{venue}</div>
        <div className="event-times">{times}</div>
        <div className="event-date">{friendlyDate}</div>
        <div className="refreshed">data last refreshed {freshAsOf}</div>
        <div className="event-distance-to push">
          {geoLookupAddress ? (
            <span>{distance} miles</span>
          ) : (
            <Error className="geoLookupError" error={`Could not get coordinates from address "${address}"`} />
          )}
        </div>
      </div>
    </div>
  );
}
