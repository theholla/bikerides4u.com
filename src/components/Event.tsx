import React from 'react';
import { MappedEvent } from '../helpers/get-events';

function Event(props: MappedEvent): JSX.Element {
  return (
    <div className="event">
      <div>
        <em>{props.title}</em>
      </div>
      <div>{props.date}</div>
      <div>{props.venue}</div>
      <div>{props.times}</div>
      <div>updated: {props.updated}</div>
    </div>
  );
}

export default Event;
