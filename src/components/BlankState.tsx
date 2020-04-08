import React from 'react';
import { Spinner } from '.';
import blankStateImage from '../images/blank-event-state.jpg';

import './BlankState.css';

type BlankStateProps = {
  loading: boolean;
  mainText: string;
  details?: string;
  href?: string;
};
export function BlankState(props: BlankStateProps): JSX.Element {
  const { loading, mainText, details, href } = props;
  return loading ? (
    <Spinner />
  ) : (
    <div className="empty">
      {mainText}
      {href ? (
        <a target="blank" rel="noopener noreferrer" href={href}>
          <img src={blankStateImage} alt="child crying next to bicycle" />
        </a>
      ) : (
        <img src={blankStateImage} alt="child crying next to bicycle" />
      )}
      {details}
    </div>
  );
}
