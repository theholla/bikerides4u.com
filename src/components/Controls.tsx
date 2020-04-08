import React, { Component } from 'react';
import './Controls.css';
import { FormDateField } from '.';
import { FormattedEvent, Day, getFriendlyDate } from '../helpers/format-events';
import { FormCheckbox } from './FormCheckbox';

const daysOfWeek = [Day.Sun, Day.Mon, Day.Tu, Day.Wed, Day.Thu, Day.Fri, Day.Sat];

interface ControlsProps {
  data: {
    start: string;
    end: string;
    events: FormattedEvent[];
  };
  handleEventsFiltered: (filtered: FormattedEvent[]) => void;
}
interface ControlsState {
  ridesFrom?: string;
  ridesUntil?: string;
  daysOfWeek: { [key in Day]: boolean };
}
export class Controls extends Component<ControlsProps, ControlsState> {
  constructor(props: ControlsProps) {
    super(props);
    this.state = {
      ridesFrom: '',
      ridesUntil: '',
      daysOfWeek: {
        [Day.Sun]: true,
        [Day.Mon]: true,
        [Day.Tu]: true,
        [Day.Wed]: true,
        [Day.Thu]: true,
        [Day.Fri]: true,
        [Day.Sat]: true,
      },
    };
  }

  handleSelectRidesFrom = (e: React.ChangeEvent<any>): void => {
    this.setState({ ridesFrom: e.target.value }, this.applyFilters);
  };

  handleSelectRidesUntil = (e: React.ChangeEvent<any>): void => {
    this.setState({ ridesUntil: e.target.value }, this.applyFilters);
  };

  handleSelectDay = (e: React.ChangeEvent<any>): void => {
    this.setState({ daysOfWeek: { ...this.state.daysOfWeek, [e.target.id]: !!e.target.checked } }, this.applyFilters);
  };

  applyFilters = (): void => {
    const { data, handleEventsFiltered } = this.props;
    const { ridesFrom, ridesUntil, daysOfWeek } = this.state;
    let filtered = data.events;
    if (ridesFrom) {
      filtered = filtered.filter(ride => ride.date.toLocaleString() >= ridesFrom);
    }
    if (ridesUntil) {
      filtered = filtered.filter(ride => ride.date.toLocaleString() <= ridesUntil);
    }
    filtered = filtered.filter(ride => !!daysOfWeek[ride.dayOfWeek]);
    return handleEventsFiltered(filtered);
  };

  // TODO: improve form's accessibility
  render(): JSX.Element {
    const { data } = this.props;
    return (
      <form className="controls-form">
        <section>
          <h2 className="controls-header">
            Fetched events from {getFriendlyDate(data.start)} to {getFriendlyDate(data.end)}
          </h2>
          <div className="filters">
            <h3 className="filters-header">Apply additional filters:</h3>
            <div className="date-input-group">
              <FormDateField
                id="start-date"
                handleChange={this.handleSelectRidesFrom}
                formValue={this.state.ridesFrom || ''}
                labelText="From"
                name="start date"
                min={data.start}
                max={data.end}
              />
              <FormDateField
                id="end-date"
                handleChange={this.handleSelectRidesUntil}
                formValue={this.state.ridesUntil || ''}
                labelText="Until"
                name="end date"
                min={data.start}
                max={data.end}
              />
            </div>
            <div className="checkbox-group">
              {daysOfWeek.map(day => (
                <FormCheckbox
                  key={day}
                  id={day}
                  handleChange={this.handleSelectDay}
                  checked={!!this.state.daysOfWeek[day]}
                  labelText={day}
                  name={day}
                />
              ))}
            </div>
          </div>
        </section>
      </form>
    );
  }
}
