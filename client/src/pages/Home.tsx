import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EventListHeader, EventListContent, Filters, Map, Modal, AlertBanner } from '../components';
import { FormattedEvent, getISODate } from '../helpers/format-events';
import { formatEvents } from '../helpers/format-events';
import './Home.css';

export function Home(): JSX.Element {
  const start = getISODate(new Date());
  const end = getISODate(new Date(), 7776000000); // 90 days in milliseconds

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<FormattedEvent[]>([]);
  const [selectedEventKey, setSelectedEventKey] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`api/shift-events?start=${start}&end=${end}`)
      .then((response) => {
        const events = formatEvents(response.data);
        setEvents(events);
        setFilteredEvents(events);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        let errMsg = 'Error retrieving events for date';
        if (!err.response) errMsg += ': No response from BR4U API';
        setError(errMsg);
        console.error(errMsg, { start, end, err });
      });
  }, []); // just run once

  return (
    <div>
      <div id="map-disclaimer">
        <AlertBanner classes="map-disclaimer" message="Wider screen required to use filters; try rotating device." />
      </div>
      <div id="site-content">
        <div id="sidebar">
          <EventListHeader events={filteredEvents} handleFiltersButtonClick={() => setIsModalOpen(!isModalOpen)} />
          <div className="event-list">
            <EventListContent
              error={error}
              loading={loading}
              events={filteredEvents}
              handleListItemClick={(key: string): void => setSelectedEventKey(key)}
            />
          </div>
        </div>
        <div id="map">
          <Map points={filteredEvents.concat().reverse()} selectedEventKey={selectedEventKey} />
        </div>
        <Modal
          id="event-list-modal"
          title={'Filters'}
          isOpen={isModalOpen}
          handleCloseButtonClick={(): void => setIsModalOpen(false)}
        >
          <Filters
            start={start}
            end={end}
            allEvents={events}
            handleEventsFiltered={(events): void => setFilteredEvents(events)}
          />
        </Modal>
      </div>
    </div>
  );
}
