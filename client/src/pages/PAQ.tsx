import React from 'react';
import { ExternalLink } from '../components';

export function PAQ(): JSX.Element {
  return (
    <div className="page-content">
      <h1>Potentially Asked Questions</h1>
      <div>
        <h2>Where is ___ useful feature?</h2>
        <p>This project is in beta and many useful features have not yet been implemented.</p>
        <p>
          Before submitting feedback, please take a look at the &quot;Next Steps&quot; section of this project&apos;s{' '}
          <ExternalLink href="https://github.com/theholla/BikeRides4U/blob/master/README.md#roadmap" text="README" />.
          The feature you&apos;re thinking of may already be on the roadmap.
        </p>
        <p>
          If the feature isn&apos;t listed, please either{' '}
          <ExternalLink href="https://github.com/theholla/BikeRides4U/issues" text="submit an issue" /> on Github or
          reach out to BikeRides4U@gmail.com with your suggestion. It would be extremely valuable to learn how this web
          app could be more useful for more people.
        </p>
        <div>
          <h2>Why is ___ broken or wrong?</h2>
          <p>
            This project is in beta and ride data and locations are <strong>not</strong> guaranteed to be accurate.
          </p>
          <p>
            If something is broken or wrong, please help improve this project by{' '}
            <ExternalLink href="https://github.com/theholla/BikeRides4U/issues" text="submitting an issue" /> on Github,
            or reaching out to BikeRides4U@gmail.com with your suggestion.
          </p>
          <p>It&apos;s helpful if you include specific details, such as:</p>
          <ul>
            <li>Browser (Firefox, Safari, etc)</li>
            <li>Type of device (Android phone, MacBook, etc.)</li>
            <li>Any repeatable steps that might reproduce the issue</li>
          </ul>
        </div>
        <div>
          <h2>Can I contribute?</h2>
          <p>
            Yes please! The best way to contribute is simply by using this web app and submitting feedback, either in
            the form of issues on Github or emails to BikeRides4U@gmail.com.
          </p>
          <p>
            You can also contribute to the codebase. This project is open source. If you would like to collaborate, take
            a look at any open issues on Github. You can{' '}
            <ExternalLink href="https://github.com/theholla/BikeRides4U/issues" text="submit a pull request" /> on
            Github.
          </p>
        </div>
      </div>
    </div>
  );
}
