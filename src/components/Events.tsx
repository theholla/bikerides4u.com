import React, { Component } from 'react';
import Event from './Event';
import getEvents, { MappedEvent } from '../helpers/get-events';

const POLL_INTERVAL = 2000;

interface EventsState {
  events: MappedEvent[];
}
class Events extends Component<{}, EventsState> {
  timerID: any = '';

  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.getEvents(), POLL_INTERVAL);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  getEvents(): Promise<void> {
    return getEvents().then(events => this.setState({ events }));
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Upcoming Events</h1>
        {this.state.events.map(({ title, venue, date, times, updated }, idx) => (
          <Event title={title} venue={venue} date={date} updated={updated} times={times} key={title + idx} />
        ))}
      </div>
    );
  }
}

export default Events;
