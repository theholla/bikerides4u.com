import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

type ModalProps = {
  id: string;
  isOpen: boolean;
  title: string;
  handleCloseButtonClick: () => void;
  children: JSX.Element;
};
export function Modal(props: ModalProps): JSX.Element {
  const { id, isOpen, title, handleCloseButtonClick, children } = props;
  return (
    <div>
      <div className={`modal-overlay ${isOpen ? '' : 'closed'}`} id={id + '-overlay'}></div>
      <div className={`modal ${isOpen ? '' : 'closed'}`} id={id}>
        <button className="close-button" onClick={handleCloseButtonClick}>
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
        <div className="modal-content">
          <h1>{title}</h1>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
