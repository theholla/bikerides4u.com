import React from 'react';
import { Event } from '.';
import { MappedEvent } from '../helpers/get-events';
import './EventList.css';

interface EventListProps {
  events: MappedEvent[];
  cadence: string;
}
export function EventList({ cadence, events }: EventListProps): JSX.Element {
  return (
    <div className="events-content-area">
      <div>
        <div className="event-list-meta">
          <div className="ride-count">
            <strong>{events.length} rides</strong>
          </div>
          <div className="push">
            <em>Updating {cadence}</em>
          </div>
        </div>
        <div className="event-list">
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
      </div>
    </div>
  );
}
