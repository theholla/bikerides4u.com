import React, { Component } from 'react';
import EventList from './EventList';
import getEvents, { MappedEvent } from '../helpers/get-events';

const POLL_INTERVAL = 2000;

interface EventsState {
  events: MappedEvent[];
  thoughts: string;
}
class Events extends Component<{}, EventsState> {
  timerID: any = '';

  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      thoughts: '',
    };
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.getEvents(), POLL_INTERVAL);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  getEvents(): Promise<void> {
    return getEvents().then(events => this.setState({ events }));
  }

  handleSubmit = (event: React.FormEvent): void => {
    alert('submitted' + this.state.thoughts);
    event.preventDefault();
  };

  onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ thoughts: event.target.value });
  };

  render(): JSX.Element {
    const { events } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" />
          </label>
          <label>
            Favorite bike and why:
            <textarea
              name="favBike"
              value={this.state.thoughts}
              onChange={this.onTextAreaChange}
              placeholder="write thoughts here"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h1>Upcoming Events</h1>
        <EventList events={events} />
      </div>
    );
  }
}

export default Events;
