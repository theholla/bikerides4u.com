import React from 'react';
import { CloseButton } from '.';
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
        <CloseButton handleClick={handleCloseButtonClick} />
        <div className="modal-content">
          <h1>{title}</h1>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
