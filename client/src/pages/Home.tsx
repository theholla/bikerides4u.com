import React, { Component } from 'react';
import axios from 'axios';
import { EventListHeader, EventListContent, Controls, Map, Modal, AlertBanner } from '../components';
import { FormattedEvent, getISODate } from '../helpers/format-events';
import { formatEvents } from '../helpers/format-events';
import './Home.css';

interface HomeState {
  data: {
    start: string;
    end: string;
    events: FormattedEvent[];
  };
  isModalOpen: boolean;
  filteredEvents: FormattedEvent[];
  selectedEventId?: string;
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
        end: getISODate(new Date(), 7776000000), // 90 days in milliseconds
      },
      isModalOpen: false,
      filteredEvents: [],
      error: null,
    };
  }

  componentDidMount(): void {
    this.fetchEvents();
  }

  toggleModalOpen = (): void =>
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  closeModal = (): void => this.setState({ isModalOpen: false });
  handleEventListItemClick = (selectedEventId: string): void => this.setState({ selectedEventId });
  handleEventsFiltered = (filteredEvents: FormattedEvent[]): void => this.setState({ filteredEvents });

  fetchEvents(): Promise<void> {
    const { data } = this.state;
    this.setState({ loading: true });
    return axios
      .get(`api/shift-events?start=${data.start}&end=${data.end}`)
      .then((response) => {
        const events = formatEvents(response.data);
        this.setState({
          data: { ...data, events },
          filteredEvents: events,
          loading: false,
        });
      })
      .catch((err) => {
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
    const { data, loading, filteredEvents, selectedEventId, isModalOpen, error } = this.state;
    return (
      <div>
        <div id="map-disclaimer">
          <AlertBanner classes="map-disclaimer" message="Wider screen required to use filters; try rotating device." />
        </div>
        <div id="site-content">
          <div id="sidebar">
            <EventListHeader events={filteredEvents} handleFiltersButtonClick={this.toggleModalOpen} />
            <div className="event-list">
              <EventListContent
                error={error}
                loading={loading}
                events={filteredEvents}
                handleListItemClick={this.handleEventListItemClick}
              />
            </div>
          </div>
          <div id="map">
            <Map points={filteredEvents.concat().reverse()} selectedEventId={selectedEventId} />
          </div>
          <Modal id="event-list-modal" title={'Filters'} isOpen={isModalOpen} handleCloseButtonClick={this.closeModal}>
            <Controls data={data} handleEventsFiltered={this.handleEventsFiltered} />
          </Modal>
        </div>
      </div>
    );
  }
}
