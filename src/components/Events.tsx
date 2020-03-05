import React, { Component } from 'react';
import EventList from './EventList';
import Form from './Form';
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
    const { events } = this.state;
    return (
      <div className="control-pane">
        <Form />
        <div className="events-content-area">
          <div>{events.length} rides</div>
          <EventList events={events} />
        </div>
      </div>
    );
  }
}

export default Events;
