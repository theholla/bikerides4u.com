import React, { useEffect, useState } from 'react';
import { FormCheckbox, FormDateField } from '.';
import { FormattedEvent, Day } from '../helpers/format-events';
import './Filters.css';

const allDaysOfWeek = [Day.Sun, Day.Mon, Day.Tu, Day.Wed, Day.Thu, Day.Fri, Day.Sat];

interface FiltersProps {
  start: string;
  end: string;
  allEvents: FormattedEvent[];
  handleEventsFiltered: (filtered: FormattedEvent[]) => void;
}

export function Filters({ start, end, allEvents, handleEventsFiltered }: FiltersProps): JSX.Element {
  const [ridesFrom, setRidesFrom] = useState(start);
  const [ridesUntil, setRidesUntil] = useState(end);
  const [daysOfWeek, setDaysOfWeek] = useState<{ [key in Day]: boolean }>({
    [Day.Sun]: true,
    [Day.Mon]: true,
    [Day.Tu]: true,
    [Day.Wed]: true,
    [Day.Thu]: true,
    [Day.Fri]: true,
    [Day.Sat]: true,
  });

  useEffect(() => {
    const sorted = allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return handleEventsFiltered(sorted);
  }, []); // just run once

  useEffect(() => {
    let filtered = allEvents;
    if (ridesFrom) {
      filtered = filtered.filter((ride) => ride.date.toLocaleString() >= ridesFrom);
    }
    if (ridesUntil) {
      filtered = filtered.filter((ride) => ride.date.toLocaleString() <= ridesUntil);
    }
    filtered = filtered.filter((ride) => !!daysOfWeek[ride.dayOfWeek]);
    handleEventsFiltered(filtered);
  }, [ridesFrom, ridesUntil, daysOfWeek]);

  return (
    <form className="filters-form">
      <section>
        <div className="date-input-group">
          <FormDateField
            id="start-date"
            handleChange={(e) => setRidesFrom(e.target.value)}
            formValue={ridesFrom || ''}
            label="From"
            name="start date"
            min={start}
            max={end}
          />
          <FormDateField
            id="end-date"
            handleChange={(e) => setRidesUntil(e.target.value)}
            formValue={ridesUntil || ''}
            label="Until"
            name="end date"
            min={start}
            max={end}
          />
        </div>
      </section>
      <section>
        <div className="checkbox-group">
          {allDaysOfWeek.map((day) => (
            <FormCheckbox
              key={day}
              id={day}
              onChange={(e) => setDaysOfWeek({ ...daysOfWeek, [e.target.id]: !!e.target.checked })}
              checked={!!daysOfWeek[day]}
              label={day}
              name={day}
            />
          ))}
        </div>
      </section>
    </form>
  );
}
