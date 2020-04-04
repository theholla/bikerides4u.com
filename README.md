# Realtime Shift2Bikes Calendar Map Display

A just-for-fun app.

This app pings the Shift2Bikes calendar API on a regular cadence and displays realtime bike ride data on a map.

Complete:

- [x] Fetch bike fun data from Shift2Bikes API (or test source) on a regular cadence
- [x] Use websockets to update list of events in realtime
- [x] Display events from list on map with some meta
- [x] Implement routing

To be implemented:

- [] Get lat/long from user's geolocation
- [] Get search address from input form
- [] Get start/end date filters from input form

## Usage

```bash
npm i
npm start
```

App will be visible on http://localhost:3000/

## Current UI

Based off of Getaround's website.

![screen capture of app](/misc/screencap.png)

## About Shift2Bikes

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See Shift2Bikes.org for more information about bike fun in Portland.
