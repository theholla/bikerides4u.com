import React from 'react';
import { Event, BlankState, Error } from '.';
import { FormattedEvent } from '../helpers/format-events';
import './EventList.css';

type EventListProps = {
  loading: boolean;
  events: FormattedEvent[];
  error: string | null;
  handleFiltersButtonClick: () => void;
  handleListItemClick: (id: string) => void;
};
export function EventList(props: EventListProps): JSX.Element {
  const { loading, events, handleFiltersButtonClick, handleListItemClick, error } = props;
  return (
    <div className="events-content-area">
      <div className="event-list-header">
        <div className="event-list-title">
          <h2>Upcoming bike fun (showing next 45 days)</h2>
        </div>
        <div className="event-list-meta">
          <div className="ride-count">{events.length} rides</div>
          <div className="filters push" onClick={handleFiltersButtonClick}>
            Filters
          </div>
        </div>
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
