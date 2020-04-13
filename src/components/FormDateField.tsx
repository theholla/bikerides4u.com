import React from 'react';

interface FormDateFieldProps {
  handleChange: (event: React.ChangeEvent<any>) => void;
  formValue: string;
  labelText: string;
  id: string;
  name: string;
  min: string;
  max: string;
}
export function FormDateField({
  handleChange,
  labelText,
  formValue,
  name,
  id,
  min,
  max,
}: FormDateFieldProps): JSX.Element {
  return (
    <div className="date-field">
      <label htmlFor={id} className="form-label">
        {labelText}
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
