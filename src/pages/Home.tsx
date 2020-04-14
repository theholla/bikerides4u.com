import React, { Component } from 'react';
import { EventList, Controls, Map, Modal, Error } from '../components';
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
  isModalOpen: boolean;
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
      isModalOpen: false,
      filteredEvents: [],
      mapCenter: defaultCoords,
      error: null,
    };

    this.setMapCenter();
  }

  componentDidMount(): void {
    this.getSortedEvents();
  }

  openModal = (): void => this.setState({ isModalOpen: true });
  closeModal = (): void => this.setState({ isModalOpen: false });
  handleEventListItemClick = (selectedEventId: string): void => this.setState({ selectedEventId });
  handleEventsFiltered = (filteredEvents: FormattedEvent[]): void => this.setState({ filteredEvents });

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
    const { data, loading, filteredEvents, mapCenter, selectedEventId, isModalOpen, error } = this.state;
    return (
      <div id="site-content">
        <div id="sidebar">
          <div id="map-disclaimer">
            <Error error="Wider screen required to display map. Distance is from Thai Champa if location is not enabled." />
          </div>
          <EventList
            error={error}
            loading={loading}
            events={filteredEvents}
            handleFiltersButtonClick={this.openModal}
            handleListItemClick={this.handleEventListItemClick}
          />
        </div>
        <div id="map">
          <Map mapCenter={mapCenter} points={filteredEvents} selectedEventId={selectedEventId} />
        </div>
        <Modal id="event-list-modal" title={'Filters'} isOpen={isModalOpen} handleCloseButtonClick={this.closeModal}>
          <Controls data={data} handleEventsFiltered={this.handleEventsFiltered} />
        </Modal>
      </div>
    );
  }
}
