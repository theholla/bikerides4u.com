import React from 'react';
import { AlertBanner } from '.';

type ErrorProps = {
  message: string;
};
export function Error(props: ErrorProps): JSX.Element {
  const { message } = props;
  return <AlertBanner message={message} />;
}
