# BikeRides4U.com Ride Map

Most bikey folks in Portland have used the [Shift2Bikes calendar](https://www.shift2bikes.org/calendar/) to discover upcoming rides... most famously every summer during [Pedalpalooza](https://www.shift2bikes.org/pedalpalooza-calendar/). BikeRides4U.com is a passion project that aims to complement the Shift cal by providing a filterable, interactive map view of the same ride data.

Specifically, this app loads bike fun events onto a map that users can filter to find rides that are relevant to them.

For the event data, this app pings a custom backend server which:

- pulls ride data from the Shift2Bikes Calendar API for a given start date
- hydrates the ride data with lat/lng coordinates using a geocoding service and the event's `address` field
- caches the hydrated event data indefinitely for use later (since coordinates don't move)
- allows responses to be cached by the client for a short interval, reducing potential load on the Shift2Bikes API

Code for the backend is open-source and visible on [Github](https://github.com/theholla/br4u-backend).

## Current UI

![screen capture of app](/screencap.png)

## MVP

- [x] Fetch bike fun data from Shift2Bikes Calendar API
- [x] Center map on lat/long from user's geo-location
- [x] Display rides in list and actual ride location on map
- [x] Fire map marker click when user clicks on ride in list
- [x] Add ride filters: start date, end date, day of week
- [x] Implement blank state, loaders, and cancelled event behavior
- [x] Separate concerns of frontend and backend; create simple server
- [x] Cache ride data in client, cache geo-coded event data in backend

## Next Steps

- [] Run through [a11y project checklist](https://a11yproject.com/checklist/) to identify/address gaps in accessibility (Lighthouse audit score is 94)
- [] Add filters to controls: organizer, audience, location name, area (PDX/Vancouver), cancelled, duration, time of day
- [] XS: Add toggle: sort by distance vs date
- [] XS: Add "use my location" toggle instead of asking for location on page load
- [] XS: Make center of map draggable; currently defaults to user location if allowed
- [] S: Add filter to map: expandable radius
- [] XS: Add button: report a problem
- [] XS: Merge duplicates (repeating rides, example: TNR every thursday)

## Cool ideas for later

1. Add support for maps on small devices (currently supports 1024px and up)
1. Allow user to request additional data besides 45 upcoming days; requires caching shift2bikes cal api response through server or CDN (want to reduce potential load on shift2bikes cal API)
1. Allow users to export filtered rides and/or individual ride in .ics format
1. Display weather icon next to ride for expected weather

## Local development

### Initial clone

First, checkout type definitions from their submodule:

```bash
git submodule update --init
```

Then set up project, install dependencies, and start the app:

```bash
npm run setup
npm i
npm start
```

App will be visible on http://localhost:3000/

### Staying up to date with the remote

```bash
git pull --recurse-submodules
```

### Live Data

The local app reads static test data from a file by default, so there's no need to spin up the server if you are just concerned with its frontend.

To enable live data, run the [companion backend server](https://github.com/theholla/br4u-backend) by following instructions on its GitHub repo. Then, back in this app, set `REACT_APP_USE_LIVE_DATA` to `true` in the `.env` file and restart the app.

## About Shift2Bikes

This web app is not affiliated with Shift2Bikes.org. But I do think they're awesome!

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See [Shift2Bikes.org](https://www.shift2bikes.org/) for more information about bike fun in Portland.
