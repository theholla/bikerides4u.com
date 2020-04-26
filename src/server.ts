import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { getShiftEvents } from './handlers';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SHOULD_USE_LIVE_DATA: process.env.NODE_ENV === 'production',
  SHOULD_USE_LIVE_GEOCODING: process.env.GOOGLE_MAPS_API_KEY !== '<-YOUR_API_KEY_HERE>',
};

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/shift-events', (req, res, next) => {
  const { start, end } = req.query as { start: string; end: string };

  const SECS_30_MINS = 1800;
  return getShiftEvents(config.SHOULD_USE_LIVE_DATA, config.SHOULD_USE_LIVE_GEOCODING, start, end)
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
  console.log({ config });
});
