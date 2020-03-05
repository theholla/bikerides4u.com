import React from 'react';
import Event from './Event';
import { MappedEvent } from '../helpers/get-events';

interface EventListProps {
  events: MappedEvent[];
}
function EventList({ events }: EventListProps): JSX.Element {
  return (
    <div className="events-list">
      {events.map(({ title, venue, date, times, updated, distance }, idx) => (
        <Event
          title={title}
          venue={venue}
          date={date}
          updated={updated}
          times={times}
          distance={distance}
          key={title + idx}
        />
      ))}
    </div>
  );
}
export default EventList;
