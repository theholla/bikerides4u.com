import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './AlertBanner.css';

type AlertBannerProps = {
  message: string;
  classes?: string;
};
export function AlertBanner(props: AlertBannerProps): JSX.Element {
  const { message, classes } = props;

  return (
    <span className={`alert-banner ${classes ? classes : ''}`}>
      <FontAwesomeIcon icon={faInfoCircle} /> {message}
    </span>
  );
}
