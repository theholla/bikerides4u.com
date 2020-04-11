# BikeRides4U Ride Map

This web app pings the Shift2Bikes calendar API and displays bike rides on an interactive map. Users can apply filters to find rides that are relevant to them.

## Current UI

![screen capture of app](/screencap.png)

## MVP

- [x] Fetch bike fun data from Shift2Bikes API
- [x] Center map on lat/long from user's geo-location
- [x] Display rides in list and actual ride location on map
- [x] Add ride filters: start date, end date, day of week
- [x] Implement blank state, loaders, and cancelled event behavior
- [x] Separate concerns of frontend and backend; create simple server
- [x] Cache response from Shift2Bikes API in frontend, geocoding API service in backend
- [x] Fire map marker click when user clicks on ride in list

## Cool ideas for later / Possible Next Steps

1. Add button: report a problem
1. Add toggle: sort by distance vs date
1. Add filters to controls: organizer, audience, location name, area (PDX/Vancouver), duration, time of day
1. Add filter to map: expandable radius
1. Add link to original event on shift2bikes.org
1. Make center of map draggable; currently defaults to user location if allowed
1. Improve mobile-friendliness
1. Allow users to export filtered rides and/or individual ride in .ics format
1. Display weather icon next to ride for expected weather

## Local development

### Initial clone:

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
