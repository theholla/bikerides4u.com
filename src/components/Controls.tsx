import React, { Component } from 'react';
import './Controls.css';
import { FormDateField } from '.';
import { FormattedEvent, Day } from '../helpers/format-events';
import { FormCheckbox } from './FormCheckbox';

const allDaysOfWeek = [Day.Sun, Day.Mon, Day.Tu, Day.Wed, Day.Thu, Day.Fri, Day.Sat];

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
    const { daysOfWeek } = this.state;
    this.setState({ daysOfWeek: { ...daysOfWeek, [e.target.id]: !!e.target.checked } }, this.applyFilters);
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

  render(): JSX.Element {
    const { data } = this.props;
    const { ridesFrom, ridesUntil, daysOfWeek } = this.state;
    return (
      <form className="controls-form">
        <section>
          <div className="date-input-group">
            <FormDateField
              id="start-date"
              handleChange={this.handleSelectRidesFrom}
              formValue={ridesFrom || ''}
              labelText="From"
              name="start date"
              min={data.start}
              max={data.end}
            />
            <FormDateField
              id="end-date"
              handleChange={this.handleSelectRidesUntil}
              formValue={ridesUntil || ''}
              labelText="Until"
              name="end date"
              min={data.start}
              max={data.end}
            />
          </div>
        </section>
        <section>
          <div className="checkbox-group">
            {allDaysOfWeek.map(day => (
              <FormCheckbox
                key={day}
                id={day}
                handleChange={this.handleSelectDay}
                checked={!!daysOfWeek[day]}
                labelText={day}
                name={day}
              />
            ))}
          </div>
        </section>
      </form>
    );
  }
}
