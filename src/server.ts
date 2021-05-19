import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { getShiftEvents, getEventGeoJSON } from './routes';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  USE_LIVE_DATA: process.env.NODE_ENV === 'production',
  USE_GEOCODING_SERVICE: process.env.GOOGLE_MAPS_API_KEY !== '<YOUR_API_KEY_HERE>',
};

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/shift-events', (req, res, next) => {
  const { start, end } = req.query as { start: string; end: string };

  const SECS_30_MINS = 1800;
  return getShiftEvents(config.USE_LIVE_DATA, config.USE_GEOCODING_SERVICE, start, end)
    .then(events => {
      res.set('Cache-Control', `public, max-age=${SECS_30_MINS}`);
      return res.json(events);
    })
    .catch(err => {
      if (err) {
        next(err);
      }
    });
});

app.get('/api/shift-events-geo-json', (req, res, next) => {
  return getEventGeoJSON(config.USE_LIVE_DATA, config.USE_GEOCODING_SERVICE)
    .then(geoJSON => res.json(geoJSON))
    .catch(err => {
      if (err) {
        next(err);
      }
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
  console.log({ config });
});
