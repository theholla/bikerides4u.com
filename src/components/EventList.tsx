import React from 'react';
import { Event, BlankState } from '.';
import { FormattedEvent } from '../helpers/format-events';
import './EventList.css';

interface EventListProps {
  loading: boolean;
  events: FormattedEvent[];
  handleListItemClick: (id: string) => void;
}
export function EventList({ loading, events, handleListItemClick }: EventListProps): JSX.Element {
  return (
    <div className="events-content-area">
      <div className="event-list-meta">
        <div className="ride-count">{events.length} rides</div>
      </div>
      <div className="event-list">
        {events.length ? (
          events.map(event => <Event key={event.key} event={event} handleListItemClick={handleListItemClick} />)
        ) : (
          <BlankState
            loading={loading}
            mainText="No events found."
            details={'Try another filter, or click the photo to submit your own ride to shift2bikes.org!'}
            href="https://www.shift2bikes.org/addevent/"
          />
        )}
      </div>
    </div>
  );
}
