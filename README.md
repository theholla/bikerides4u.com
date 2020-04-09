# BikeRides4U Backend

This is the backend for the BikeRides4U ride map.

## Local development

Initial setup:

```bash
npm run setup
npm i
npm start
```

Visit http://localhost:8080/shift-events in your browser or run `curl http://localhost:8080/shift-events` in your terminal to see the response.

### Live Data

The local server reads test data from a file while in development mode. To enable live data, set `NODE_ENV` to `production` in the `.env` file and restart the server. Use this mode sparingly; please do not be a jerk and pummel the Shift2Bikes API.

## Companion Frontend

See the code for the companion web app on [GitHub](https://github.com/theholla/shift2bikes-ride-map).

## About Shift2Bikes

This web app is not affiliated with Shift2Bikes.org. But I do think they're awesome!

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See [Shift2Bikes.org](https://www.shift2bikes.org/) for more information about bike fun in Portland.
