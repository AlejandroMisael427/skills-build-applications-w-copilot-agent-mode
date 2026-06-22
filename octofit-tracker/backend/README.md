# OctoFit Tracker - Backend API Documentation

## Overview

Express.js-based REST API for the OctoFit Tracker application with TypeScript support.

- **Server Port:** 8000
- **API Base URL:** `/api`

## Environment Variables

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
CODESPACE_NAME=(optional - for GitHub Codespaces)
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health status and API URL

### Users (`/api/users`)
- **GET** `/api/users/` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users/` - Create new user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Teams (`/api/teams`)
- **GET** `/api/teams/` - Get all teams
- **GET** `/api/teams/:id` - Get team by ID
- **POST** `/api/teams/` - Create new team
- **PUT** `/api/teams/:id` - Update team
- **DELETE** `/api/teams/:id` - Delete team

### Activities (`/api/activities`)
- **GET** `/api/activities/` - Get all activities
- **GET** `/api/activities/:id` - Get activity by ID
- **POST** `/api/activities/` - Log new activity
- **PUT** `/api/activities/:id` - Update activity
- **DELETE** `/api/activities/:id` - Delete activity

### Leaderboard (`/api/leaderboard`)
- **GET** `/api/leaderboard/` - Get global leaderboard
- **GET** `/api/leaderboard/team/:teamId` - Get team leaderboard
- **GET** `/api/leaderboard/user/:userId` - Get user rank

### Workouts (`/api/workouts`)
- **GET** `/api/workouts/` - Get all workouts
- **GET** `/api/workouts/:id` - Get workout by ID
- **POST** `/api/workouts/` - Create workout suggestion
- **GET** `/api/workouts/suggestions/:userId` - Get personalized suggestions

## Scripts

```bash
# Development (with auto-reload)
npm run dev

# Build (TypeScript compilation)
npm run build

# Start (runs compiled code)
npm start
```

## Technology Stack

- **Runtime:** Node.js LTS
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **CORS:** Enabled for all origins
- **Dev Tools:** Nodemon, ts-node

## Codespaces Support

The API automatically detects GitHub Codespaces environment and returns the appropriate URL via the `getApiUrl()` function. When running in Codespaces, the API URL will be `https://{CODESPACE_NAME}-8000.app.github.dev`.

## Project Structure

```
backend/
├── src/
│   ├── server.ts          # Express app setup
│   ├── config/
│   │   └── mongodb.ts     # MongoDB connection
│   └── routes/
│       ├── users.ts
│       ├── teams.ts
│       ├── activities.ts
│       ├── leaderboard.ts
│       └── workouts.ts
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env
```
