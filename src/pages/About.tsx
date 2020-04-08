import React from 'react';
import { Link } from '../components';

export function About(): JSX.Element {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Bike Rides 4 U</h1>
        <div>
          <p>This website is a labor of love and is not affiliated with the organization Shift2Bikes.</p>
          <p>
            The web app pings the Shift2Bikes calendar API and displays bike fun events on an interactive map. Rides are
            initially sorted according to distance from user, if the user allows location sharing. Otherwise the events
            are sorted according to distance from Thai Champa, my favorite Thai food cart.
          </p>
          <p>
            This project is open source. If you would like to collaborate, you&apos;re welcome to open an issue on its{' '}
            <Link href="https://github.com/theholla/shift2bikes-ride-map" text="Github repository" /> and submit a pull
            request.
          </p>
        </div>
        <h2>Is something broken or wrong?</h2>
        <div>
          <p>
            Please reach out to bikerides4u@gmail.com with the issue and some details, such as:
            <ul>
              <li>Browser (Firefox, Safari, etc)</li>
              <li>Type of device (Android phone, MacBook, etc.)</li>
              <li>Any repeatable steps that might reproduce the issue</li>
            </ul>
          </p>
        </div>
        <h2>About Shift2Bikes</h2>
        <div>
          <p>This website is not affiliated with Shift2Bikes.org. But we do think they&apos;re awesome!</p>
          <p>
            Shift&apos;s mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of
            Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to
            raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.
          </p>
          <p>
            See <Link href="http://shift2bikes.org/" text="Shift2Bikes.org" /> for more information about bike fun in
            Portland.
          </p>
        </div>
      </div>
    </div>
  );
}
