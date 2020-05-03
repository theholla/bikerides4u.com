import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './CloseButton.css';

type CloseButtonProps = {
  handleClick: () => void;
};
export function CloseButton(props: CloseButtonProps): JSX.Element {
  const { handleClick } = props;

  return (
    <button className="close-button" onClick={handleClick}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
}
