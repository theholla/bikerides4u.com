import React, { Component } from 'react';
import { EventList, Controls, Map } from '../components';
import { Coordinate } from '../../br4u';
import { getISODate, FormattedEvent } from '../helpers/format-events';
import { requestEvents } from '../helpers/request-events';
import { formatEvents } from '../helpers/format-events';
import './Home.css';

const defaultCoords = {
  latitude: 45.522723,
  longitude: -122.656115,
};

interface HomeState {
  data: {
    start: string;
    end: string;
    events: FormattedEvent[];
  };
  filteredEvents: FormattedEvent[];
  selectedEventId?: string;
  mapCenter: Coordinate;
  loading: boolean;
}
export class Home extends Component<{}, HomeState> {
  timerID?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      data: {
        events: [],
        start: getISODate(new Date()),
        end: getISODate(new Date(), 3.888e9), // 45 days in milliseconds
      },
      filteredEvents: [],
      mapCenter: defaultCoords,
    };

    this.setMapCenter();
  }

  componentDidMount(): void {
    this.getSortedEvents();
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
    this.setState({ loading: true });
    return requestEvents(this.state.data.start, this.state.data.end).then(response => {
      const events = formatEvents(response.data, this.state.mapCenter);
      this.setState({
        data: { ...this.state.data, events },
        filteredEvents: events,
        loading: false,
      });
    });
  }

  render(): JSX.Element {
    const { data, loading, filteredEvents, mapCenter, selectedEventId } = this.state;
    return (
      <div className="content">
        <div className="control-panel">
          <Controls data={data} handleEventsFiltered={this.handleEventsFiltered} />
          <EventList loading={loading} events={filteredEvents} handleListItemClick={this.handleEventListItemClick} />
        </div>
        <Map mapCenter={mapCenter} points={filteredEvents} selectedEventId={selectedEventId} />
      </div>
    );
  }
}
