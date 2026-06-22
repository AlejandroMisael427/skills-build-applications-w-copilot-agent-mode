import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

// GET global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ points: -1, rank: 1 })
      .limit(100);
    res.json({
      message: 'Get global leaderboard',
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const teamId = typeof req.params.teamId === 'string' ? req.params.teamId : req.params.teamId[0];
    const leaderboard = await Leaderboard.find({ team: teamId } as any)
      .populate('user')
      .populate('team')
      .sort({ points: -1 });
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = typeof req.params.userId === 'string' ? req.params.userId : req.params.userId[0];
    const userRank = await Leaderboard.findOne({ user: userId } as any)
      .populate('user')
      .populate('team');
    if (!userRank) {
      return res.status(404).json({ error: 'User rank not found' });
    }
    res.json({
      message: `Get rank for user ${userId}`,
      data: userRank
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
});

export default router;
