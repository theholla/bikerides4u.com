import React from 'react';
import { Event } from '.';
import { FormattedEvent } from '../helpers/get-events';
import blankStateImage from '../images/blank-event-state.jpg';
import './EventList.css';

interface EventListProps {
  events: FormattedEvent[];
  cadence: string;
  handleListItemClick: (id: string) => void;
}
export function EventList({ cadence, events, handleListItemClick }: EventListProps): JSX.Element {
  return (
    <div className="events-content-area">
      <div className="event-list-meta">
        <div className="ride-count">{events.length} rides</div>
        <div className="ride-update-cadence push">updating {cadence}</div>
      </div>
      <div className="event-list">
        {events.length ? (
          events.map(({ id, key, title, venue, friendlyDate, times, freshAsOf, distance }) => (
            <Event
              id={id}
              title={title}
              venue={venue}
              friendlyDate={friendlyDate}
              freshAsOf={freshAsOf}
              times={times}
              distance={distance}
              handleListItemClick={handleListItemClick}
              key={key}
            />
          ))
        ) : (
          <div className="event-list-empty">
            No events found.
            <img src={blankStateImage} alt="child crying next to bicycle" />
            Try another filter, or{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://www.shift2bikes.org/addevent/">
              submit your own ride
            </a>
            !
          </div>
        )}
      </div>
    </div>
  );
}
