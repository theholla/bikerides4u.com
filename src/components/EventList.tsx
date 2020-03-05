import React from 'react';
import Event from './Event';
import { MappedEvent } from '../helpers/get-events';

interface EventListProps {
  events: MappedEvent[];
}
function EventList({ events }: EventListProps): JSX.Element {
  return (
    <div className="grid-container">
      {events.map(({ title, venue, date, times, updated }, idx) => (
        <Event title={title} venue={venue} date={date} updated={updated} times={times} key={title + idx} />
      ))}
    </div>
  );
}
export default EventList;
