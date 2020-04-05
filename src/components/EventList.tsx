import React from 'react';
import { Event } from '.';
import { MappedEvent, getEventKey } from '../helpers/get-events';
import './EventList.css';

interface EventListProps {
  events: MappedEvent[];
  handleListItemClick: (id: string) => void;
}
export function EventList({ events, handleListItemClick }: EventListProps): JSX.Element {
  return (
    <div className="events-content-area">
      <div className="event-list">
        {events.map(({ id, date, title, venue, friendlyDate, times, updated, distance }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          <Event
            id={id}
            title={title}
            venue={venue}
            date={friendlyDate}
            updated={updated}
            times={times}
            distance={distance}
            handleListItemClick={handleListItemClick}
            key={getEventKey(date, id)}
          />
        ))}
      </div>
    </div>
  );
}
