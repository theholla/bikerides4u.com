import React from 'react';
import { MappedEvent } from '../helpers/get-events';

function Event(props: MappedEvent): JSX.Element {
  const { title, date, venue, times, updated, distance } = props;
  return (
    <div className="event">
      <div>
        <em>{title}</em>
      </div>
      <div>{date}</div>
      <div>{venue}</div>
      <div>{times}</div>
      <div>{distance} mi</div>
      <div>updated: {updated}</div>
    </div>
  );
}

export default Event;
