import express from 'express';
import cors from 'cors';
import { getShiftEvents } from './handlers';
import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const SHOULD_USE_LIVE_DATA = NODE_ENV === 'production';
const PORT = process.env.PORT;

const server = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

server.get('/shift-events', cors(corsConfig), (req, res, next) => {
  const { start, end } = req.params;

  const SECS_30_MINS = 1800;
  return getShiftEvents(SHOULD_USE_LIVE_DATA, start, end)
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

server.use((err: any, req: any, res: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
