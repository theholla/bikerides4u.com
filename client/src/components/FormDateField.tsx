import React from 'react';

interface FormDateFieldProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formValue: string;
  label: string;
  id: string;
  name: string;
  min: string;
  max: string;
}
export function FormDateField({ handleChange, label, formValue, name, id, min, max }: FormDateFieldProps): JSX.Element {
  return (
    <div className="date-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type="date"
        placeholder="yyyy-mm-dd"
        id={id}
        name={name}
        value={formValue}
        min={min}
        max={max}
        onChange={handleChange}
        className="form-input field"
      />
    </div>
  );
}
