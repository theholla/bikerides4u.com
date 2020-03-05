import React, { Component } from 'react';
import './Form.css';

interface FormState {
  location: string;
  startDate: string;
  endDate: string;
}
class Form extends Component<{}, FormState> {
  constructor(props: {}) {
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
    return (
      <div className="controls-form">
        <div className="top-row item">
          <input
            type="text"
            aria-label="address"
            onChange={this.handleLocationChange}
            value={this.state.location}
            name="address"
            className="location-input"
            placeholder="Portland, Oregon"
          />
        </div>
        <div className="bottom-row item">
          <label>
            Start
            <input type="date" onChange={this.handleStartDateChange} value={this.state.startDate} name="start date" />
          </label>
          <label>
            End
            <input type="date" onChange={this.handleEndDateChange} value={this.state.endDate} name="end date" />
          </label>
        </div>
      </div>
    );
  }
}

export default Form;
