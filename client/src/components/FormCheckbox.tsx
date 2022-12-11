import React from 'react';

interface FormCheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  label: string;
  id: string;
  name: string;
}
export function FormCheckbox({ onChange, label, checked, name, id }: FormCheckboxProps): JSX.Element {
  return (
    <div className="form-checkbox">
      <label htmlFor={id} className="form-label checkbox-label">
        {label}
      </label>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} className="form-input field" />
    </div>
  );
}
