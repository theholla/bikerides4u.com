import React from 'react';
import { Event } from '.';
import { MappedEvent } from '../helpers/get-events';

interface EventListProps {
  events: MappedEvent[];
}
export function EventList({ events }: EventListProps): JSX.Element {
  return (
    <div className="events-list">
      {events.map(({ title, venue, date, times, updated, distance }, idx) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
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
