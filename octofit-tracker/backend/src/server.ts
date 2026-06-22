import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Determine API URL based on environment
const getApiUrl = () => {
  const codespaceNameEnv = process.env.CODESPACE_NAME;
  if (codespaceNameEnv) {
    return `https://${codespaceNameEnv}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OctoFit Tracker API is running',
    apiUrl: getApiUrl()
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: ${getApiUrl()}`);
});
