/**
 * API Service for OctoFit Tracker Frontend
 * Handles all API calls to the backend
 */

import { API_BASE_URL } from './config/api.ts'

export const apiService = {
  async fetchHealthStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch health status:', error);
      throw error;
    }
  },

  async fetchUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  async fetchActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      throw error;
    }
  },

  async fetchTeams() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      throw error;
    }
  },

  async fetchLeaderboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      throw error;
    }
  },

  async fetchWorkouts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workouts`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
      throw error;
    }
  }
};

export default apiService;
