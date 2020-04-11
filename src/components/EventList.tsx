import React from 'react';
import { Event, BlankState, Error } from '.';
import { FormattedEvent } from '../helpers/format-events';
import './EventList.css';

type EventListProps = {
  loading: boolean;
  events: FormattedEvent[];
  error: string | null;
  handleListItemClick: (id: string) => void;
};
export function EventList({ loading, events, handleListItemClick, error }: EventListProps): JSX.Element {
  return (
    <div className="events-content-area">
      <div className="event-list-meta">
        <div className="ride-count">{events.length} rides</div>
      </div>
      <div className="event-list">
        {error ? (
          <Error error={error} />
        ) : events.length ? (
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
