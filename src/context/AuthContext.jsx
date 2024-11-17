// Frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { setToken, getToken, removeToken } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the authenticated user
  const [loading, setLoading] = useState(true); // Indicates if the auth state is being loaded
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract token from URL (e.g., after OAuth)
  const extractTokenFromURL = () => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    if (token) {
      setToken(token);
      // Remove token from URL for security reasons
      window.history.replaceState({}, document.title, location.pathname);
      return token;
    }
    return null;
  };

  // Fetch the authenticated user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await api.get('/auth/me');
          if (response.data?.data) {
            setUser(response.data.data);
          } else {
            throw new Error('User data not found in response.');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          removeToken(); // Remove invalid token
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // First, check if there's a token in the URL
    extractTokenFromURL();
    fetchUser();
  }, [location]);

  /**
   * Handles user login by sending credentials to the backend.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {object} - { success: boolean, message?: string }
   */
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data?.token) {
        setToken(response.data.token);
        
        // Fetch user data after setting the token
        const userResponse = await api.get('/auth/me');
        if (userResponse.data?.data) {
          setUser(userResponse.data.data);
          navigate('/user-dashboard');
          return { success: true };
        } else {
          throw new Error('User data not found in response.');
        }
      } else {
        throw new Error('Token not found in response.');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response?.status === 401) {
        return { success: false, message: 'Authentication failed. Please check your email and password, and ensure your account is active.' };
      }

      let message = error.response?.data?.message || 'Login failed.';
      return { success: false, message };
    }
  };

  /**
   * Initiates the account deletion process by sending a confirmation email.
   *
   * @returns {object} { success: boolean, message?: string }
   */
  const deleteAccount = async () => {
    try {
      const response = await api.post('/auth/request-delete-account');
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Delete account error:', error);
      let message = error.response?.data?.message || 'Account deletion failed.';
      return { success: false, message };
    }
  };

  /**
   * Handles user registration by sending user details to the backend.
   *
   * @param {string} name - User's name.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {object} - { success: boolean, message?: string }
   */
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      navigate('/login');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      let message = error.response?.data?.message || 'Registration failed.';
      return { success: false, message };
    }
  };

  /**
   * Handles user logout by removing the token and clearing user state.
   */
  const logout = async () => {
    try {
      await api.post('/auth/logout'); // Call the backend logout endpoint if implemented
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
    removeToken(); // Remove the token
    setUser(null); // Clear the user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
