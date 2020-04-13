import React from 'react';
import { ExternalLink } from '../components';
import { Link as RouterLink } from 'react-router-dom';

export function About(): JSX.Element {
  return (
    <div className="page-content">
      <h1>About BikeRides4U.com</h1>
      <div>
        <p>
          Most bikey folks in Portland have used the{' '}
          <ExternalLink href="https://www.shift2bikes.org/calendar/" text="Shift2Bikes calendar" /> to discover upcoming
          rides... most famously every summer during{' '}
          <ExternalLink href="https://www.shift2bikes.org/pedalpalooza-calendar/" text="Pedalpalooza" />.
        </p>
        <p>
          BikeRides4U.com is a passion project that aims to complement the Shift cal by providing a filterable,
          interactive map view of the same ride data. It pings the Shift2Bikes calendar API and displays bike fun events
          on an interactive map. Rides are initially sorted according to distance from user, if the user allows location
          sharing. Otherwise the events are sorted according to distance from Thai Champa, my favorite Thai food cart.
        </p>
      </div>
      <div>
        <h2>About Shift2Bikes</h2>
        <p>This website is not affiliated with Shift2Bikes.org. But we do think they&apos;re awesome!</p>
        <p>
          Shift&apos;s mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of
          Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise
          awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.
        </p>
        <p>
          See <ExternalLink href="http://shift2bikes.org/" text="Shift2Bikes.org" /> for more information about bike fun
          in Portland.
        </p>
      </div>
      <div>
        <h2>Disclaimers</h2>
        <ol>
          <li>
            <strong>Affiliations:</strong> This website is a labor of love and is not affiliated with the organization
            Shift2Bikes
          </li>
          <li>
            <strong>Data Integrity:</strong> This project is in beta and ride data and locations are not guaranteed to
            be accurate
          </li>
        </ol>
      </div>
      <div>
        <h2>Still have questions?</h2>
        <p>
          Check out the <RouterLink to="/PAQ">Potentially Asked Questions</RouterLink> page for more answers.
        </p>
      </div>
    </div>
  );
}
