import { Router, Request, Response } from 'express';
import Team from '../models/Team.js';

const router = Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members');
    res.json({
      message: 'Get all teams',
      data: teams
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Get team ${id}`,
      data: team
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json({
      message: 'Team created',
      data: newTeam
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${id} updated`,
      data: updatedTeam
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
