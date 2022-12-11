import React, { ReactNode } from 'react';

type ExternalLinkProps = {
  href: string;
  text?: string;
  children?: ReactNode;
};
export function ExternalLink(props: ExternalLinkProps): JSX.Element {
  const { href, text, children } = props;
  return (
    <a target="blank" rel="noopener noreferrer" href={href}>
      {text || children}
    </a>
  );
}
