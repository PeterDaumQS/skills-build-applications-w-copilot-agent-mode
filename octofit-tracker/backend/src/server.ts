import express from 'express';
import cors from 'cors';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      /https:\/\/.*-5173\.app\.github\.dev$/
    ];

    const isAllowed = allowedOrigins.some((candidate) => {
      if (typeof candidate === 'string') {
        return candidate === origin;
      }

      return candidate.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true
}));

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const resourceRoutes = ['activities', 'leaderboard', 'teams', 'users', 'workouts'];

resourceRoutes.forEach((resource) => {
  app.get(`/api/${resource}/`, (_req, res) => {
    res.json([
      {
        id: `${resource}-1`,
        name: `${resource.charAt(0).toUpperCase()}${resource.slice(1)} sample`,
        description: `Sample ${resource} data for the Octofit Tracker UI.`
      }
    ]);
  });
});

app.listen(port, () => {
  console.log(`Octofit API listening on port ${port}`);
});
