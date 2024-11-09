// src/components/Toast.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ message, isVisible, onClose, type }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Toast disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Define styles based on toast type
  const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div
      className={`z-100 fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4 animate-fadeIn ${toastStyles[type] || 'bg-gray-800 text-white'}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {/* Icon based on toast type */}
      {type === 'success' && (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {type === 'error' && (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span className="text-sm">{message}</span>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
};

Toast.defaultProps = {
  type: 'success',
};

export default Toast;
