# BikeRides4U

Webserver that serves up the BikeRides4U ride map.

TODO:

- [] Productionize logging
- [] Run through [Express best practices](http://expressjs.com/en/advanced/best-practice-performance.html) and implement other improvements for production

## Local development

### Initial clone

Set up project, install dependencies, and start the app:

```bash
npm run setup
npm i
npm start
```

Visit `http://localhost:8080` in your browser to see the app.

Sample request to API: `curl -X GET "http://localhost:8080/api/shift-events?start=2020-05-01&end=2020-06-01"`.

### Live Data

The local project reads test data from a file while in development mode. To enable live data, set `NODE_ENV` to `production` in the `.env` file and restart the app. Use this mode sparingly; please do not be a jerk and pummel the Shift2Bikes API.

### Enable Geocoding

By default the server will hydrate event data with random coordinates in Portland, OR as the event lat/lng.

To enable geocoding, you'll need an active [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) account and API key. Set `GOOGLE_MAPS_API_KEY` in the `.env` file to your personal API key.

Note on geocoder: the current address data on events is mostly intersections and very free-flowing (not validated). Only the super robust Google Maps API was able to infer lat/lng from the hand-typed addresses with any accuracy. If the address data were to be validated when users add new events, it would probably be fine to use a smaller/cheaper geocoding service such as [LocationIQ](https://locationiq.com/).

## About Shift2Bikes

This web app is not affiliated with Shift2Bikes.org. But I do think they're awesome!

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See [Shift2Bikes.org](https://www.shift2bikes.org/) for more information about bike fun in Portland.
