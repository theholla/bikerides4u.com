import React, { Component } from 'react';
import { EventList, Controls, Map } from '../components';
import getEvents, { Coordinate, MappedEvent, defaultCoords } from '../helpers/get-events';
import './Home.css';

enum cadence {
  EVERY_2_SECONDS = 2000,
  EVERY_5_MINUTES = 300000,
}
enum cadenceFriendlyStrings {
  EVERY_2_SECONDS = 'every two seconds',
  EVERY_5_MINUTES = 'every five minutes',
}
const REALTIME_MODE = process.env.REACT_APP_REALTIME_MODE === 'true';
const POLL_INTERVAL = REALTIME_MODE ? cadence.EVERY_2_SECONDS : cadence.EVERY_5_MINUTES;
const CADENCE = REALTIME_MODE ? cadenceFriendlyStrings.EVERY_2_SECONDS : cadenceFriendlyStrings.EVERY_5_MINUTES;

interface HomeState {
  events: MappedEvent[];
  selectedEventId?: string;
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

    this.handleEventListItemClick = this.handleEventListItemClick.bind(this);
  }

  componentDidMount(): void {
    this.setMapCenter();
    this.getSortedEvents().then(() => {
      this.timerID = setInterval(() => this.getSortedEvents(), POLL_INTERVAL);
    });
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID as any);
  }

  handleEventListItemClick(id: string): void {
    return this.setState({ selectedEventId: id });
  }

  setMapCenter(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.setState({
          mapCenter: { latitude: coords.latitude, longitude: coords.longitude },
        });
      });
    } else {
      this.setState({
        mapCenter: defaultCoords,
      });
    }
  }

  getSortedEvents(): Promise<void> {
    return getEvents(this.state.mapCenter).then(events => this.setState({ events }));
  }

  render(): JSX.Element {
    const { events, mapCenter, selectedEventId } = this.state;
    return (
      <div className="content">
        <div>
          <Controls cadence={CADENCE} events={events} />
          <EventList events={events} handleListItemClick={this.handleEventListItemClick} />
        </div>
        <Map
          latitude={mapCenter.latitude}
          longitude={mapCenter.longitude}
          points={events}
          selectedEventId={selectedEventId}
        />
      </div>
    );
  }
}
