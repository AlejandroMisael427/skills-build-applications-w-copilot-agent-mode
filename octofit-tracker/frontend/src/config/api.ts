/**
 * API Configuration for OctoFit Tracker Frontend
 * Detects Codespaces vs Local environment automatically
 */

export const getApiUrl = (): string => {
  // In Codespaces, window.location.hostname is the Codespaces domain
  const hostname = window.location.hostname;
  
  // Check if we're in a Codespaces environment
  if (hostname.includes('github.dev') || hostname.includes('app.github.dev')) {
    // Extract CODESPACE_NAME from hostname
    // Format: codespace-name-8000.app.github.dev
    const parts = hostname.split('-');
    if (parts.length >= 3 && parts[parts.length - 1].includes('app.github.dev')) {
      const codespaceName = parts.slice(0, -2).join('-');
      return `https://${codespaceName}-8000.app.github.dev`;
    }
  }
  
  // Default to localhost for local development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  workouts: `${API_BASE_URL}/api/workouts`
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getApiUrl
};
