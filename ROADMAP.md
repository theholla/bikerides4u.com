# Roadmap

## Next Steps

- [] Run through [Express best practices](http://expressjs.com/en/advanced/best-practice-performance.html) and implement other improvements for production server
- [] Run through [a11y project checklist](https://a11yproject.com/checklist/) to identify/address gaps in accessibility (Lighthouse audit score is 92 mobile, 98 web)
- [] BUG: Handle singular labels ("1 rides")
- [] BUG: Insert ride "day of week" meta in server to avoid browser specific date math
- [] Show day of week in event list to instill trust in filter
- [] Improve map performance, it's too slow
- [] Make navbar fixed at top of page
- [] Scroll to event in list when click on map marker
- [] Add "clear/reset" filters
- [] Add filters to controls: organizer, audience, location name, area (PDX/Vancouver), cancelled, duration, time of day
- [] Add toggle: sort by distance vs date
- [x] Add "use my location" toggle instead of asking for location on page load
- [] Only display distance when location enabled
- [] Make mapCenter draggable and/or drag map to filter
- [] Add filter to map: expandable radius
- [] Add button: report a problem
- [] Merge duplicates (repeating rides, example: TNR every thursday)

## Cool ideas for later

1. Allow user to request additional data besides 45 upcoming days; requires caching shift2bikes cal api response through server or CDN (want to reduce potential load on shift2bikes cal API)
1. Allow users to export filtered rides and/or individual ride in .ics format
1. Display weather icon next to ride for expected weather
