# Shift2Bikes Ride Map

This web app pings the Shift2Bikes calendar API on a regular cadence and displays bike rides on a map.

## Realtime data

This web app has the ability to display ride updates in near-realtime. This functionality is disabled by default because I'm not trying to be a jerk and overload Shift's servers. This is a just-for-fun web dev project.

To enable realtime updates, change `REACT_APP_REALTIME_MODE` to `true` in `.env` before running the app.

## Features

Complete:

- [x] Fetch bike fun data from Shift2Bikes API on a regular cadence
- [x] Display events from list on map (poc: use random location data)
- [x] Implement routing
- [x] Implement realtime mode flag
- [x] Center map on lat/long from user's geolocation

To be implemented:

- [~] Fire map marker click when user clicks on event in list
- [] Display actual event location on map (will probably need api key / to implement a backend)
- [] Get search address from input form
- [] Get start/end date filters from input form
- [] Display weather icon next to ride for expected weather

## Local development

```bash
npm i
npm start
```

App will be visible on http://localhost:3000/

## Current UI

![screen capture of app](/misc/screencap.png)

## About Shift2Bikes

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See [Shift2Bikes.org](https://www.shift2bikes.org/) for more information about bike fun in Portland.
