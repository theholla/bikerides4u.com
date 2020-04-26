import React from 'react';
import { Spinner } from '.';
import './Toggle.css';

type ToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  disabledMsg: string;
  toggleValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  name?: string;
};
export function Toggle(props: ToggleProps): JSX.Element {
  const { id, name, label, checked, disabled, disabledMsg, toggleValue, loading } = props;
  return (
    <div>
      <div className="toggle">
        <input type="checkbox" checked={checked} disabled={disabled} onChange={toggleValue} name={name || id} id={id} />
        <label htmlFor={id}>{label}</label>
        {loading && <Spinner />}
      </div>
      <div>{disabled ? disabledMsg : ''}</div>
    </div>
  );
}
