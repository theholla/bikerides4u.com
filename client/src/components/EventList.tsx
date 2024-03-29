import React from 'react';
import { Event, BlankState, Error } from '.';
import { FormattedEvent } from '../helpers/format-events';
import './EventList.css';

type EventListProps = {
  events: FormattedEvent[];
  handleFiltersButtonClick: () => void;
};
export function EventListHeader(props: EventListProps): JSX.Element {
  const { events, handleFiltersButtonClick } = props;
  return (
    <div className="event-list-header">
      <div className="event-list-title">
        <h2>Upcoming bike fun (showing next 90 days)</h2>
      </div>
      <div className="event-list-meta">
        <div className="ride-count">{events.length} rides</div>
        <button className="push" onClick={handleFiltersButtonClick}>
          Filters
        </button>
      </div>
    </div>
  );
}

type EventListContentProps = {
  loading: boolean;
  events: FormattedEvent[];
  error: string | null;
  handleListItemClick: (id: string) => void;
};
export function EventListContent({ events, error, loading, handleListItemClick }: EventListContentProps): JSX.Element {
  if (error) {
    return <Error message={error} />;
  }
  if (events.length) {
    return (
      <div>
        {events.map((event) => (
          <Event key={event.key} event={event} handleListItemClick={handleListItemClick} />
        ))}
      </div>
    );
  }
  return (
    <BlankState
      loading={loading}
      mainText="No events found."
      details={'Try another filter, or click the photo to submit your own ride to shift2bikes.org!'}
      href="https://www.shift2bikes.org/addevent/"
    />
  );
}
