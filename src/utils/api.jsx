// src/utils/api.js

import axios from 'axios';
import { getToken, setToken, removeToken } from './auth';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log('Token retrieved for request:', token); // Debugging: Check if token is correct
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling global responses
api.interceptors.response.use(
  (response) => {
    // Check if a new token is provided in the headers
    const newToken = response.headers['authorization'];
    if (newToken && newToken.startsWith('Bearer ')) {
      setToken(newToken.split(' ')[1]); // Update the stored token
      console.log('Token refreshed and updated.');
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.warn('Unauthorized! Redirecting to login.');
        removeToken(); // Remove the invalid token
        // Redirect to login using window.location
        window.location.href = '/login';
      }
    } else {
      console.error('API Error without response:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
