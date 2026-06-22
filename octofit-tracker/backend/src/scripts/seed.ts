/**
 * Seed the octofit_db database with test data
 * Run with: npm run seed
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('\nClearing existing collections...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Collections cleared');

    // Seed Teams
    console.log('\nSeeding teams...');
    const teams = await Team.insertMany([
      {
        name: 'Alpha Warriors',
        description: 'The strongest team in town',
        members: [],
        totalPoints: 0
      },
      {
        name: 'Beta Runners',
        description: 'Fast and furious athletes',
        members: [],
        totalPoints: 0
      },
      {
        name: 'Gamma Cyclists',
        description: 'Two-wheeled champions',
        members: [],
        totalPoints: 0
      }
    ]);
    console.log(`✓ Seeded ${teams.length} teams`);

    // Seed Users
    console.log('\nSeeding users...');
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashedpassword123',
        avatar: 'https://avatar.example.com/alice.jpg',
        points: 1250,
        team: teams[0]._id
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'hashedpassword123',
        avatar: 'https://avatar.example.com/bob.jpg',
        points: 980,
        team: teams[0]._id
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        password: 'hashedpassword123',
        avatar: 'https://avatar.example.com/carol.jpg',
        points: 1540,
        team: teams[1]._id
      },
      {
        name: 'David Wilson',
        email: 'david@example.com',
        password: 'hashedpassword123',
        avatar: 'https://avatar.example.com/david.jpg',
        points: 1100,
        team: teams[1]._id
      },
      {
        name: 'Emma Martinez',
        email: 'emma@example.com',
        password: 'hashedpassword123',
        avatar: 'https://avatar.example.com/emma.jpg',
        points: 1680,
        team: teams[2]._id
      },
      {
        name: 'Frank Brown',
        email: 'frank@example.com',
        password: 'hashedpassword123',
        avatar: 'https://avatar.example.com/frank.jpg',
        points: 920,
        team: teams[2]._id
      }
    ]);
    console.log(`✓ Seeded ${users.length} users`);

    // Update teams with members
    await Team.updateMany(
      {},
      [
        {
          $set: {
            members: users.map(u => u._id).slice(0, 2)
          }
        }
      ]
    );

    // Seed Activities
    console.log('\nSeeding activities...');
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 520,
        notes: 'Morning jog in the park'
      },
      {
        user: users[0]._id,
        type: 'gym',
        duration: 60,
        calories: 450,
        notes: 'Strength training session'
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 680,
        notes: 'Long bike ride'
      },
      {
        user: users[2]._id,
        type: 'swimming',
        duration: 50,
        distance: 2,
        calories: 500,
        notes: 'Pool lap swimming'
      },
      {
        user: users[2]._id,
        type: 'running',
        duration: 35,
        distance: 6,
        calories: 420,
        notes: 'Evening run'
      },
      {
        user: users[3]._id,
        type: 'walking',
        duration: 60,
        distance: 5,
        calories: 280,
        notes: 'Casual walk'
      },
      {
        user: users[4]._id,
        type: 'cycling',
        duration: 120,
        distance: 50,
        calories: 920,
        notes: 'Weekend cycling adventure'
      },
      {
        user: users[5]._id,
        type: 'gym',
        duration: 75,
        calories: 550,
        notes: 'Mixed cardio and weights'
      }
    ]);
    console.log(`✓ Seeded ${activities.length} activities`);

    // Seed Leaderboard
    console.log('\nSeeding leaderboard...');
    const leaderboardEntries = users.map((user, index) => ({
      user: user._id,
      team: user.team,
      rank: index + 1,
      points: user.points,
      totalActivities: Math.floor(Math.random() * 20) + 5
    }));

    await Leaderboard.insertMany(leaderboardEntries);
    console.log(`✓ Seeded ${leaderboardEntries.length} leaderboard entries`);

    // Seed Workouts
    console.log('\nSeeding workout suggestions...');
    const workouts = await Workout.insertMany([
      {
        title: 'Morning Cardio Blast',
        description: 'High-intensity cardio workout to start your day',
        difficulty: 'intermediate',
        type: 'cardio',
        duration: 30,
        caloriesBurned: 350,
        instructions: [
          'Warm up for 5 minutes',
          'Do 20 jumping jacks',
          'Run in place for 2 minutes',
          'Do 15 burpees',
          'Jump rope for 2 minutes',
          'Cool down for 3 minutes'
        ],
        equipment: ['jump rope']
      },
      {
        title: 'Full Body Strength',
        description: 'Complete strength training routine',
        difficulty: 'advanced',
        type: 'strength',
        duration: 60,
        caloriesBurned: 450,
        instructions: [
          'Warm up with 10 minutes of light cardio',
          'Bench press: 3 sets of 8-10 reps',
          'Squats: 3 sets of 12 reps',
          'Deadlifts: 3 sets of 6-8 reps',
          'Pull-ups: 3 sets to failure',
          'Cool down stretching'
        ],
        equipment: ['barbell', 'dumbbells', 'bench']
      },
      {
        title: 'Beginner Yoga',
        description: 'Gentle yoga for flexibility and relaxation',
        difficulty: 'beginner',
        type: 'flexibility',
        duration: 40,
        caloriesBurned: 150,
        instructions: [
          'Start with deep breathing',
          'Downward dog',
          'Cat-cow stretches',
          'Warrior pose holds',
          'Child pose',
          'Final relaxation pose'
        ],
        equipment: ['yoga mat']
      },
      {
        title: 'Weekend Trail Run',
        description: 'Outdoor trail running for endurance',
        difficulty: 'intermediate',
        type: 'cardio',
        duration: 90,
        caloriesBurned: 800,
        instructions: [
          'Find a local trail',
          'Start with easy pace for 10 minutes',
          'Gradually increase pace',
          'Maintain steady rhythm',
          'Cool down walk for 5 minutes'
        ],
        equipment: []
      },
      {
        title: 'Core and Abs',
        description: 'Targeted core strengthening workout',
        difficulty: 'intermediate',
        type: 'strength',
        duration: 25,
        caloriesBurned: 200,
        instructions: [
          'Planks: 3 sets of 60 seconds',
          'Crunches: 3 sets of 20',
          'Leg raises: 3 sets of 15',
          'Mountain climbers: 3 sets of 30 seconds',
          'Russian twists: 2 sets of 20'
        ],
        equipment: ['mat']
      }
    ]);
    console.log(`✓ Seeded ${workouts.length} workouts`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`
    Summary:
    - Teams: ${teams.length}
    - Users: ${users.length}
    - Activities: ${activities.length}
    - Leaderboard Entries: ${leaderboardEntries.length}
    - Workouts: ${workouts.length}
    `);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
