import React from 'react';

interface EventProps {
  id: string;
  title: string;
  freshAsOf: string;
  venue: string;
  friendlyDate: string;
  times: string;
  distance: number;
  handleListItemClick: (id: string) => void;
}
export function Event(props: EventProps): JSX.Element {
  const { id, title, friendlyDate, venue, times, freshAsOf, distance, handleListItemClick } = props;
  return (
    <div onClick={(): void => handleListItemClick(id)}>
      <div className="event">
        <div className="event-title">{title}</div>
        <div className="event-venue">{venue}</div>
        <div className="event-times">{times}</div>
        <div className="event-date">{friendlyDate}</div>
        <div className="event-distance-to push">{distance} miles</div>
        <div className="refreshed">data refreshed {freshAsOf}</div>
      </div>
    </div>
  );
}
