import React, { Component } from 'react';
import { FormCheckbox, FormDateField, Toggle } from '.';
import { BikeRide, Day } from '../helpers/format-events';
import { Coordinate } from '../../../types';
import './Controls.css';

const allDaysOfWeek = [Day.Sun, Day.Mon, Day.Tu, Day.Wed, Day.Thu, Day.Fri, Day.Sat];
enum LocationPermissions {
  GRANTED = 'granted',
  DENIED = 'denied',
  PROMPT = 'prompt',
  UNKNOWN = 'unknown',
}
enum SortBy {
  LOCATION = 'latLng',
  DATE = 'date',
}

interface ControlsProps {
  data: {
    start: string;
    end: string;
    events: BikeRide[];
  };
  handleEventsFiltered: (filtered: BikeRide[]) => void;
  updateMapCenter: (userLocation?: Coordinate) => void;
}
interface ControlsState {
  ridesFrom?: string;
  ridesUntil?: string;
  daysOfWeek: { [key in Day]: boolean };
  sortBy: SortBy;
  useLocation: boolean;
  browserGeoPerms: LocationPermissions;
  loading: boolean;
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
      sortBy: SortBy.DATE, // TODO: implement toggle sort
      useLocation: false,
      browserGeoPerms: LocationPermissions.UNKNOWN,
      loading: false,
    };

    this.checkBrowserPermissions();
    this.sortEvents();
  }

  checkBrowserPermissions(): Promise<LocationPermissions> {
    if (!navigator.permissions) {
      return Promise.resolve(LocationPermissions.UNKNOWN);
    }

    return navigator.permissions.query({ name: 'geolocation' }).then(permissions => {
      const permission = permissions.state;
      const browserGeoPerms =
        permission === 'granted'
          ? LocationPermissions.GRANTED
          : permission === 'denied'
          ? LocationPermissions.DENIED
          : permission === 'prompt'
          ? LocationPermissions.PROMPT
          : LocationPermissions.UNKNOWN;

      return browserGeoPerms;
    });
  }

  toggleLocationPermissions = (e: React.ChangeEvent<any>): Promise<void> => {
    const { updateMapCenter } = this.props;

    const toggledOn = !!e.target.checked;
    if (!toggledOn) {
      this.setState({ useLocation: false });
      return Promise.resolve(updateMapCenter());
    }

    return this.checkBrowserPermissions().then(() => this.useLocationFromBrowser());
  };

  useLocationFromBrowser(): void {
    const { updateMapCenter } = this.props;

    this.setState({ loading: true });
    return navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({ useLocation: true, loading: false });

        return updateMapCenter({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      err => {
        console.error(err.message);
        this.setState({ browserGeoPerms: LocationPermissions.DENIED, loading: false });
      }
    );
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

  sortEvents = (): void => {
    const { data, handleEventsFiltered } = this.props;
    const { sortBy } = this.state;
    let sorted = null;
    switch (sortBy) {
      case SortBy.DATE: {
        sorted = data.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      }
      case SortBy.LOCATION: {
        sorted = data.events.sort((a, b) => a.distanceTo - b.distanceTo);
        break;
      }
    }
    return handleEventsFiltered(sorted);
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
    const { ridesFrom, ridesUntil, daysOfWeek, useLocation, browserGeoPerms, loading } = this.state;
    return (
      <form className="controls-form">
        <section>
          <div className="date-input-group">
            <FormDateField
              id="start-date"
              handleChange={this.handleSelectRidesFrom}
              formValue={ridesFrom || ''}
              label="From"
              name="start date"
              min={data.start}
              max={data.end}
            />
            <FormDateField
              id="end-date"
              handleChange={this.handleSelectRidesUntil}
              formValue={ridesUntil || ''}
              label="Until"
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
                label={day}
                name={day}
              />
            ))}
          </div>
        </section>
        <section>
          <Toggle
            label="Use my location"
            id={'location-toggle'}
            checked={!!useLocation}
            toggleValue={this.toggleLocationPermissions}
            disabled={browserGeoPerms === LocationPermissions.DENIED}
            disabledMsg={'User denied Geolocation; check your browser location settings'}
            loading={loading}
          />
        </section>
      </form>
    );
  }
}
