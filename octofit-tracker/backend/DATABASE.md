# OctoFit Tracker - Database Documentation

## Overview

MongoDB with Mongoose ODM for the OctoFit Tracker application. All models are TypeScript-first with strict type safety.

## Database Configuration

- **URI:** `mongodb://localhost:27017/octofit_db`
- **Database:** `octofit_db`
- **Connection:** Configured in `src/config/mongodb.ts`

## Models

### User
```typescript
{
  name: string (required)
  email: string (required, unique)
  password: string (required)
  avatar?: string
  points: number (default: 0)
  team?: ObjectId (references Team)
  createdAt: Date
  updatedAt: Date
}
```

**Usage:**
- User registration and authentication
- Team membership tracking
- Points accumulation from activities

---

### Team
```typescript
{
  name: string (required)
  description: string
  members: ObjectId[] (references User)
  totalPoints: number (default: 0)
  createdAt: Date
  updatedAt: Date
}
```

**Usage:**
- Team creation and management
- Member list population
- Team-wide point tracking

---

### Activity
```typescript
{
  user: ObjectId (required, references User)
  type: string enum (running|cycling|swimming|walking|gym)
  duration: number (required, in minutes)
  distance?: number (in kilometers)
  calories: number (required)
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

**Usage:**
- Log user activities
- Track fitness metrics
- Calculate points based on calories burned

---

### Leaderboard
```typescript
{
  user: ObjectId (required, unique, references User)
  team?: ObjectId (references Team)
  rank: number (default: 0)
  points: number (default: 0)
  totalActivities: number (default: 0)
  createdAt: Date
  updatedAt: Date
}
```

**Indexes:**
- `{ points: -1, rank: 1 }` - For sorting by points and rank

**Usage:**
- Global and team rankings
- User rank tracking
- Competitive leaderboards

---

### Workout
```typescript
{
  title: string (required)
  description: string (required)
  difficulty: string enum (beginner|intermediate|advanced)
  type: string enum (cardio|strength|flexibility|sports)
  duration: number (required, in minutes)
  caloriesBurned: number (required)
  instructions: string[] (required)
  equipment?: string[]
  createdAt: Date
  updatedAt: Date
}
```

**Usage:**
- Personalized workout suggestions
- Workout templates and guides
- Difficulty-based filtering

---

## Seed Data

### Script Location
- Path: `src/scripts/seed.ts`
- Command: `npm run seed`

### Seed Sample Data
The seed script creates:
- **3 Teams:** Alpha Warriors, Beta Runners, Gamma Cyclists
- **6 Users:** With names, emails, and team assignments
- **8 Activities:** Varied types with realistic metrics
- **6 Leaderboard Entries:** Ranked by points
- **5 Workouts:** Templates for different fitness levels

### Running the Seed Script

```bash
# From the backend directory
npm run seed

# Output includes:
# ✓ Connected to MongoDB
# ✓ Collections cleared
# ✓ Seeded X teams
# ✓ Seeded X users
# ✓ Seeded X activities
# ✓ Seeded X leaderboard entries
# ✓ Seeded X workouts
# ✅ Database seeding completed successfully!
```

## API Routes with Database Integration

### Users
- `GET /api/users/` - Fetch all users with populated team data
- `GET /api/users/:id` - Fetch user by ID
- `POST /api/users/` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams
- `GET /api/teams/` - Fetch all teams with populated members
- `GET /api/teams/:id` - Fetch team by ID
- `POST /api/teams/` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities
- `GET /api/activities/` - Fetch all activities with populated user data
- `GET /api/activities/:id` - Fetch activity by ID
- `POST /api/activities/` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Leaderboard
- `GET /api/leaderboard/` - Global leaderboard (sorted by points, limit 100)
- `GET /api/leaderboard/team/:teamId` - Team leaderboard
- `GET /api/leaderboard/user/:userId` - User rank details

### Workouts
- `GET /api/workouts/` - Fetch all workouts
- `GET /api/workouts/:id` - Fetch workout by ID
- `POST /api/workouts/` - Create workout template
- `GET /api/workouts/suggestions/:userId` - Get random workout suggestions (3 workouts)

## Development Workflow

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Ensure MongoDB is running
ps aux | grep mongod

# 3. Build TypeScript
npm run build

# 4. Seed the database
npm run seed

# 5. Start the server
npm run dev
```

### Testing Data
After running the seed script, test endpoints:

```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Get leaderboard
curl http://localhost:8000/api/leaderboard

# Get all activities
curl http://localhost:8000/api/activities
```

## Data Relationships

```
User → Team (many-to-one)
Activity → User (many-to-one)
Leaderboard → User (one-to-one)
Leaderboard → Team (many-to-one)
Team → User (one-to-many, via members array)
```

## Notes

- All models use timestamps (createdAt, updatedAt)
- Mongoose automatically handles ObjectId conversions
- Populate operations ensure related data is included in responses
- Strict TypeScript typing prevents type mismatches
- Indexes on leaderboard for performance-critical sorting
