# BikeRides4U.com

Simple webserver that serves up an interactive map of bike rides from the shift2bikes calendar API, plus geocoding + caching.

## Current UI

![screen capture of app](/screencap.png)

## Roadmap

### MVP

- [x] Fetch bike fun data from Shift2Bikes Calendar API
- [x] Center map on lat/long from user's geo-location
- [x] Display rides in list and actual ride location on map
- [x] Fire map marker click when user clicks on ride in list
- [x] Add ride filters: start date, end date, day of week
- [x] Implement blank state, loaders, and cancelled event behavior
- [x] Separate concerns of frontend and backend; create simple server
- [x] Cache ride data in client, cache geo-coded event data in backend

### Next Steps

- [] Run through [Express best practices](http://expressjs.com/en/advanced/best-practice-performance.html) and implement other improvements for production server
- [] Run through [a11y project checklist](https://a11yproject.com/checklist/) to identify/address gaps in accessibility (Lighthouse audit score is 94)
- [] Add filters to controls: organizer, audience, location name, area (PDX/Vancouver), cancelled, duration, time of day
- [] Add toggle: sort by distance vs date
- [x] Add "use my location" toggle instead of asking for location on page load
- [] Make center of map draggable; currently defaults to user location if allowed
- [] Add filter to map: expandable radius
- [] Add button: report a problem
- [] Merge duplicates (repeating rides, example: TNR every thursday)

### Cool ideas for later

1. Add support for maps on small devices (currently supports 1024px and up)
1. Allow user to request additional data besides 45 upcoming days; requires caching shift2bikes cal api response through server or CDN (want to reduce potential load on shift2bikes cal API)
1. Allow users to export filtered rides and/or individual ride in .ics format
1. Display weather icon next to ride for expected weather

## Local development

### Initial setup

Do this at least once.

Set up project and install dependencies:

```bash
npm run setup:dev
npm i
```

### Dev mode

If you plan to actively work on both the client and server, your best bet is to run the following in two separate terminal windows/tabs :

1. `npm run start:server:dev`: start the server in watch mode and bind to a port
1. `npm run start:client:dev`: start the client-side code in dev mode; enable hot reloading and proxy client-side app to the server's port

### Production build

To view a production build:

1. In your `.env` file, change `NODE_ENV` to `production`
1. In your `.env` file, change `GOOGLE_MAPS_API_KEY` to your key. Or not. If you leave the default config the geo coordinates for addresses will just be random points in Portland, no big deal.
1. Run `npm start`

This will:

- trigger a production build of the client-side code
- serve those static files over an Express web server, visible in your browser at `http://localhost:8080`

Sample request to API:

```bash
curl -X GET "http://localhost:8080/api/shift-events?start=2020-05-01&end=2020-06-01"
```

### Live Data

The local project reads test data from a file while in development mode. To enable live data, set `NODE_ENV` to `production` in the `.env` file and restart the app. Use this mode sparingly; please do not be a jerk and pummel the Shift2Bikes API.

### Geocoding Service

By default the server will hydrate event data with random coordinates in Portland, OR as the event lat/lng.

To enable geocoding, you'll need an active [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) account and API key. Set `GOOGLE_MAPS_API_KEY` in the `.env` file to your personal API key.

Note on geocoder: the current address data on events is mostly intersections and very free-flowing (not validated). Only the super robust Google Maps API was able to infer lat/lng from the hand-typed addresses with any accuracy. If the address data were to be validated when users add new events, it would probably be fine to use a smaller/cheaper geocoding service such as [LocationIQ](https://locationiq.com/).

## About this Project

Most bikey folks in Portland have used the [Shift2Bikes calendar](https://www.shift2bikes.org/calendar/) to discover upcoming rides... most famously every summer during [Pedalpalooza](https://www.shift2bikes.org/pedalpalooza-calendar/). BikeRides4U.com is a passion project that aims to complement the Shift cal by providing a filterable, interactive map view of the same ride data.

Specifically, this app loads bike fun events onto a map that users can filter to find rides that are relevant to them.

For the event data, this app pings a custom webserver which:

- pulls ride data from the Shift2Bikes Calendar API for a given start date
- hydrates the ride data with lat/lng coordinates using a geocoding service and the event's `address` field
- caches the hydrated event data indefinitely for use later (since coordinates don't move)
- allows responses to be cached by the client for a short interval, reducing potential load on the Shift2Bikes API

## About Shift2Bikes

This web app is not affiliated with Shift2Bikes.org. But I do think they're awesome!

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See [Shift2Bikes.org](https://www.shift2bikes.org/) for more information about bike fun in Portland.
