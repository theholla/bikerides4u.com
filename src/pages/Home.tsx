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
  error: string | null;
}
export class Home extends Component<{}, HomeState> {
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
      error: null,
    };

    this.setMapCenter();
  }

  componentDidMount(): void {
    this.getSortedEvents();
  }

  handleEventListItemClick = (selectedEventId: string): void => {
    return this.setState({ selectedEventId });
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
    }
  }

  getSortedEvents(): Promise<void> {
    const { data, mapCenter } = this.state;
    this.setState({ loading: true });
    return requestEvents(data.start, data.end)
      .then(response => {
        const events = formatEvents(response.data, mapCenter);
        this.setState({
          data: { ...data, events },
          filteredEvents: events,
          loading: false,
        });
      })
      .catch(err => {
        let errMsg = 'Error retrieving events for date';

        // FIXME: handle additional error states
        if (!err.response) {
          errMsg = 'No response from BR4U API';
        }

        console.error(errMsg, { start: data.start, end: data.end, err });

        this.setState({
          loading: false,
          error: errMsg,
        });
      });
  }

  render(): JSX.Element {
    const { data, loading, filteredEvents, mapCenter, selectedEventId, error } = this.state;
    return (
      <div className="content">
        <div className="control-panel">
          <Controls data={data} handleEventsFiltered={this.handleEventsFiltered} />
          <EventList
            error={error}
            loading={loading}
            events={filteredEvents}
            handleListItemClick={this.handleEventListItemClick}
          />
        </div>
        <Map mapCenter={mapCenter} points={filteredEvents} selectedEventId={selectedEventId} />
      </div>
    );
  }
}
