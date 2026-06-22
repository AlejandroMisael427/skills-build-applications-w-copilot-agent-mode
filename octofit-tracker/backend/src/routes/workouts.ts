import { Router, Request, Response } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({
      message: 'Get all workouts',
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST create workout suggestion
router.post('/', async (req: Request, res: Response) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json({
      message: 'Workout suggestion created',
      data: newWorkout
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// GET personalized workout suggestions for user
router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // For now, return a random selection of workouts
    // In a real app, this would be based on user preferences and activity history
    const workouts = await Workout.aggregate([
      { $sample: { size: 3 } }
    ]);
    res.json({
      message: `Get workout suggestions for user ${userId}`,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout suggestions' });
  }
});

export default router;
