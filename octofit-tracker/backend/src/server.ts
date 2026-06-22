import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
