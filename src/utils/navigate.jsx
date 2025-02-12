// src/utils/navigate.js

/**
 * Navigation Utility
 * 
 * This module provides functions to manage navigation outside of React components.
 * It allows setting the navigate function from React Router and using it elsewhere.
 */

let navigateFunction;

/**
 * Sets the navigate function from React Router.
 * This should be called once when the app initializes.
 *
 * @param {Function} navigate - The navigate function from React Router's useNavigate hook.
 */
export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};

/**
 * Navigates to a specified path using the navigate function.
 *
 * @param {string} path - The path to navigate to.
 */
export const navigateTo = (path) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.warn("Navigate function not set. Please initialize it using setNavigate.");
  }
};
