import React, { Component } from 'react';
import { EventList, Controls, Map } from '../components';
import getEvents, { getISODate, FetchedData, Coordinate, FormattedEvent, defaultCoords } from '../helpers/get-events';
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
  fetchedData: FetchedData;
  filteredEvents: FormattedEvent[];
  selectedEventId?: string;
  mapCenter: Coordinate;
}
export class Home extends Component<{}, HomeState> {
  timerID?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      fetchedData: {
        events: [],
        start: getISODate(new Date()),
        end: getISODate(new Date(), 3.888e9), // 45 days in milliseconds
      },
      filteredEvents: [],
      mapCenter: defaultCoords,
    };
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

  handleEventListItemClick = (id: string): void => {
    console.log('click ', id);
    return this.setState({ selectedEventId: id });
  };

  handleEventsFiltered = (filteredEvents: FormattedEvent[]): void => {
    return this.setState({ filteredEvents });
  };

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
    return getEvents(this.state.mapCenter, this.state.fetchedData.start, this.state.fetchedData.end).then(fetchedData =>
      this.setState({
        fetchedData,
        filteredEvents: fetchedData.events,
      })
    );
  }

  render(): JSX.Element {
    const { fetchedData, filteredEvents, mapCenter, selectedEventId } = this.state;
    return (
      <div className="content">
        <div className="control-panel">
          <Controls fetchedData={fetchedData} handleEventsFiltered={this.handleEventsFiltered} />
          <EventList cadence={CADENCE} events={filteredEvents} handleListItemClick={this.handleEventListItemClick} />
        </div>
        <Map
          latitude={mapCenter.latitude}
          longitude={mapCenter.longitude}
          points={filteredEvents}
          selectedEventId={selectedEventId}
        />
      </div>
    );
  }
}
