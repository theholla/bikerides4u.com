import React from 'react';
import { MappedEvent } from '../helpers/get-events';

interface Handlers {
  handleListItemClick: (id: string) => void;
}
export function Event(props: MappedEvent & Handlers): JSX.Element {
  const { id, title, date, venue, times, updated, distance, handleListItemClick } = props;
  return (
    <div onClick={(): void => handleListItemClick(id)}>
      <div className="event">
        <div className="event-title">{title}</div>
        <div className="event-venue">{venue}</div>
        <div className="event-times">{times}</div>
        <div className="event-date">{date}</div>
        <div className="event-distance-to push">{distance} miles</div>
        <div className="refreshed">data refreshed {updated}</div>
      </div>
    </div>
  );
}
