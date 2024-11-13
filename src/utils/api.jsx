// src/utils/api.js

import axios from 'axios';
import { getToken, setToken, removeToken } from './auth';
import axiosRetry from 'axios-retry';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Retry logic
axiosRetry(api, {
  retries: 3,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           (error.response && error.response.status >= 500 && error.response.status < 600);
  },
  retryDelay: (retryCount) => {
    console.warn(`Retrying request... Attempt #${retryCount}`);
    return retryCount * 1000; // 1s, 2s, 3s
  },
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getToken();
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
    const newToken = response.headers['authorization'] || response.headers['Authorization'];
    if (newToken && newToken.startsWith('Bearer ')) {
      setToken(newToken.split(' ')[1]);
      console.log('Token updated from response headers.');
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data, config } = error.response;
      
      console.error(`API Error: ${config.method.toUpperCase()} ${config.url} - Status ${status}`);
      console.error('Error Data:', data);

      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Invalid request parameters.');
          break;
        case 401:
          console.warn('Unauthorized! Invalid or expired token.');
          removeToken();
          window.location.href = '/login'; // Redirect to login page
          break;
        case 403:
          console.warn('Forbidden: You do not have access to this resource.');
          break;
        case 404:
          console.warn('Not Found: The requested resource does not exist.');
          break;
        case 500:
          console.error('Internal Server Error: Please try again later.');
          break;
        default:
          console.error('An unexpected error occurred.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error in setting up the request:', error.message);
    }

    const customError = {
      message: error.response?.data?.message || 'An unexpected error occurred.',
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };

    return Promise.reject(customError);
  }
);

export default api;
