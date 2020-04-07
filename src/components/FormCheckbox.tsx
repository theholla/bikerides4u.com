import React from 'react';

interface FormCheckboxProps {
  handleChange: (event: React.ChangeEvent<any>) => void;
  checked: boolean;
  labelText: string;
  id: string;
  name: string;
}
export function FormCheckbox({ handleChange, labelText, checked, name, id }: FormCheckboxProps): JSX.Element {
  return (
    <div className="form-checkbox">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="form-input field"
      />
    </div>
  );
}
