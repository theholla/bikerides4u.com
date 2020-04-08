import React from 'react';

type LinkProps = {
  href: string;
  text: string;
};
export function Link(props: LinkProps): JSX.Element {
  const { href, text } = props;
  return (
    <a target="blank" rel="noopener noreferrer" href={href}>
      {text}
    </a>
  );
}
