import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getApiBaseUrl } from './api.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});

const routes = [
  { path: '/api/users', name: 'users' },
  { path: '/api/teams', name: 'teams' },
  { path: '/api/activities', name: 'activities' },
  { path: '/api/leaderboard', name: 'leaderboard' },
  { path: '/api/workouts', name: 'workouts' },
] as const;

for (const route of routes) {
  app.get(route.path, (_req, res) => {
    res.json({
      route: route.path,
      message: `${route.name} endpoint ready`,
      apiBaseUrl: getApiBaseUrl(),
    });
  });

  app.get(`${route.path}/`, (_req, res) => {
    res.json({
      route: route.path,
      message: `${route.name} endpoint ready`,
      apiBaseUrl: getApiBaseUrl(),
    });
  });
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
