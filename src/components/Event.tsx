import React from 'react';
import { FormattedEvent } from '../helpers/format-events';

interface EventProps {
  event: FormattedEvent;
  handleListItemClick: (id: string) => void;
}
export function Event(props: EventProps): JSX.Element {
  const {
    event: { id, cancelled, title, newsflash, venue, times, friendlyDate, distance, freshAsOf },
    handleListItemClick,
  } = props;
  return (
    <div onClick={(): void => handleListItemClick(id)}>
      <div className="event">
        <div className="event-title">
          {cancelled ? (
            <div>
              <span className="cancelled">{title}</span>
              <span className="newsflash banner"> Cancelled</span>
            </div>
          ) : (
            <div>{title}</div>
          )}
        </div>
        <div className="newsflash">{newsflash}</div>
        <div className="event-venue">{venue}</div>
        <div className="event-times">{times}</div>
        <div className="event-date">{friendlyDate}</div>
        <div className="event-distance-to push">{distance} miles</div>
        <div className="refreshed">accurate as of {freshAsOf}</div>
      </div>
    </div>
  );
}
