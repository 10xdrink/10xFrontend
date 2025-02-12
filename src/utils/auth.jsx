// src/utils/auth.js

const TOKEN_KEY = 'authToken'; // Use a consistent key

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Decodes a JWT token to extract its payload.
 *
 * @param {string} token - The JWT token to decode.
 * @returns {object|null} - The decoded payload if successful, otherwise null.
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Retrieves the current user's information from the JWT token.
 *
 * @returns {object|null} - The user information if available, otherwise null.
 */
export const getUserFromToken = () => {
  const token = getToken();
  const decoded = decodeToken(token);
  return decoded ? decoded.user : null;
};
