import React from 'react';

interface FormDateFieldProps {
  handleChange: (event: React.ChangeEvent<any>) => void;
  formValue: string;
  labelText: string;
}
export function FormDateField({ handleChange, labelText, formValue }: FormDateFieldProps): JSX.Element {
  return (
    <div className="end-inputs">
      <label htmlFor="endDate" className="date-label">
        {labelText}
      </label>
      <input
        id="endDate"
        type="date"
        className="date-input field"
        onChange={handleChange}
        value={formValue}
        name="end date"
      />
    </div>
  );
}
