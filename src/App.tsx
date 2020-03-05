import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Form from './components/Form';
import EventList from './components/EventList';
import Map from './components/Map';
import './App.css';
import getEvents, { MappedEvent } from './helpers/get-events';

const POLL_INTERVAL = 2000;

interface AppState {
  events: MappedEvent[];
  address: string;
}
// FIXME: lat/long should be typed into form and pass down into components
class App extends Component<{}, AppState> {
  timerID: any = '';

  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      address: '', // FIXME: get address from form
    };
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.getSortedEvents(), POLL_INTERVAL);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  getSortedEvents(): Promise<void> {
    return getEvents(this.state.address).then(events => this.setState({ events }));
  }

  render(): JSX.Element {
    return (
      <div className="root">
        <NavBar />
        <div className="content">
          <div className="control-pane">
            <Form />
            <div className="events-content-area">
              <div>{this.state.events.length} rides</div>
              <EventList events={this.state.events} />
            </div>
          </div>
          <Map latitude={45.504738} longitude={-122.675275} points={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
