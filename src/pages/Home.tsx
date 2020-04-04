import React, { Component } from 'react';
import { EventList, Form, Map } from '../components';
import getEvents, { MappedEvent } from '../helpers/get-events';
import './Home.css';

const POLL_INTERVAL = 2000;

interface HomeState {
  events: MappedEvent[];
  address: string;
}

// TODO: Get lat/long from user's geolocation
export class Home extends Component<{}, HomeState> {
  timerID?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      address: '', // TODO: Get search address from input form
    };
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.getSortedEvents(), POLL_INTERVAL);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID as any);
  }

  getSortedEvents(): Promise<void> {
    return getEvents(this.state.address).then(events => this.setState({ events }));
  }

  render(): JSX.Element {
    return (
      <div className="content">
        <div>
          <Form />
          <div className="events-content-area">
            <div>{this.state.events.length} rides</div>
            <EventList events={this.state.events} />
          </div>
        </div>
        <Map latitude={45.504738} longitude={-122.675275} points={this.state.events} />
      </div>
    );
  }
}
