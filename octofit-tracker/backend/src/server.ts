import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getApiBaseUrl } from './api.js';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  try {
    const users = await UserModel.find({}).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users' });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  try {
    const teams = await TeamModel.find({}).lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams' });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  try {
    const activities = await ActivityModel.find({}).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities' });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find({}).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard' });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find({}).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts' });
  }
});

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
