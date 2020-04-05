import React, { Component } from 'react';
import { EventList, Form, Map } from '../components';
import getEvents, { Coordinate, MappedEvent } from '../helpers/get-events';
import './Home.css';

enum cadence {
  EVERY_2_SECONDS = 2000,
  EVERY_1_HOUR = 3600000,
}
enum cadenceFriendlyStrings {
  EVERY_2_SECONDS = 'every two seconds',
  EVERY_1_HOUR = 'every hour',
}
const REALTIME_MODE = process.env.REACT_APP_REALTIME_MODE === 'true';
const POLL_INTERVAL = REALTIME_MODE ? cadence.EVERY_2_SECONDS : cadence.EVERY_1_HOUR;
const CADENCE = REALTIME_MODE ? cadenceFriendlyStrings.EVERY_2_SECONDS : cadenceFriendlyStrings.EVERY_1_HOUR;

// TODO: Get lat/long for mapCenter from user's geolocation
const defaultCoords = {
  latitude: 45.504738,
  longitude: -122.675275,
};

interface HomeState {
  events: MappedEvent[];
  mapCenter: Coordinate;
}

// TODO: Get search address from input form, update mapCenter after that
export class Home extends Component<{}, HomeState> {
  timerID?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      mapCenter: defaultCoords,
    };
  }

  componentDidMount(): void {
    this.getSortedEvents().then(() => {
      this.timerID = setInterval(() => this.getSortedEvents(), POLL_INTERVAL);
    });
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID as any);
  }

  getSortedEvents(): Promise<void> {
    return getEvents(this.state.mapCenter).then(events => this.setState({ events }));
  }

  render(): JSX.Element {
    const { mapCenter, events } = this.state;
    return (
      <div className="content">
        <div>
          <Form />
          <EventList cadence={CADENCE} events={events} />
        </div>
        <Map latitude={mapCenter.latitude} longitude={mapCenter.longitude} points={events} />
      </div>
    );
  }
}
