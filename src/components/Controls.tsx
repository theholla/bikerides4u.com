import React, { Component } from 'react';
import './Controls.css';
import { FormDateField } from '.';
import { MappedEvent } from '../helpers/get-events';

interface ControlsProps {
  events: MappedEvent[];
  cadence: string;
}
interface ControlsState {
  location: string;
  startDate: string;
  endDate: string;
}
export class Controls extends Component<ControlsProps, ControlsState> {
  constructor(props: ControlsProps) {
    super(props);
    this.state = {
      location: '',
      startDate: '',
      endDate: '',
    };
  }

  handleLocationChange = (event: React.ChangeEvent<any>): void => {
    this.setState({ location: event.target.value });
  };

  handleStartDateChange = (event: React.ChangeEvent<any>): void => {
    this.setState({ startDate: event.target.value });
  };

  handleEndDateChange = (event: React.ChangeEvent<any>): void => {
    this.setState({ endDate: event.target.value });
  };

  render(): JSX.Element {
    const { events, cadence } = this.props;
    return (
      <div className="controls-form">
        <div className="location">
          <input
            type="text"
            aria-label="address"
            onChange={this.handleLocationChange}
            value={this.state.location}
            name="address"
            className="location-input field"
            placeholder="Enter Street Address"
          />
        </div>
        <div className="date-inputs">
          <FormDateField handleChange={this.handleStartDateChange} formValue={this.state.startDate} labelText="Start" />
          <FormDateField handleChange={this.handleEndDateChange} formValue={this.state.endDate} labelText="End" />
        </div>
        <div className="event-list-meta">
          <div className="ride-count">{events.length} rides</div>
          <div className="ride-update-cadence push">updating {cadence}</div>
        </div>
      </div>
    );
  }
}
