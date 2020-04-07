# Shift2Bikes Ride Map

This web app pings the Shift2Bikes calendar API on a regular cadence and displays bike rides on an interactive map. Users can apply filters to find rides that are relevant to them.

## Current UI

![screen capture of app](/misc/screencap.png)

## MVP

Complete:

- [x] Center map on lat/long from user's geolocation
- [x] Regularly fetch bike fun data from Shift2Bikes API
- [x] Display rides in list and on map (poc: use random location data)
- [x] Add ride filters: start date, end date, day of week
- [x] Implement routing
- [x] Implement realtime mode flag

TODO:

- [~] Fire map marker click when user clicks on ride in list
- [] Display actual ride locations on map (will probably need api key / to implement a backend)

## Cool ideas for later

- Add ride filters: organizer, audience, location name, area (PDX/Vancouver), duration
- Add ride filter: time of day (morning / afternoon / evening)
- Add ride filter: expandable radius in map
- Make center of map draggable; currently defaults to user location if allowed
- Display weather icon next to ride for expected weather
- Find meaningful words in ride description, highlight those somehow (filter? thumbs?)

## Local development

```bash
npm i
npm start
```

App will be visible on http://localhost:3000/

## Realtime data

This web app has the ability to display ride updates in near-realtime. This functionality is disabled by default because I'm not trying to be a jerk and overload Shift's servers. This is a just-for-fun web dev project.

To enable realtime updates, change `REACT_APP_REALTIME_MODE` to `true` in `.env` before running the app.

## About Shift2Bikes

Shift's mission is to promote inclusive bike fun. Shift also facilitates lots of events. Examples of Shift-related activities include breakfast give aways, social rides, educational bike tours, actions to raise awareness about cyclist injuries or deaths, information-sharing events, art-bike parades and more.

See [Shift2Bikes.org](https://www.shift2bikes.org/) for more information about bike fun in Portland.
