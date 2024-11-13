// src/components/Toast.jsx

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const toastVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.8 },
};

const Toast = ({ message, isVisible, onClose, type, duration }) => {
  // Determine icon and color based on toast type
  let icon;
  let iconColor;

  switch (type) {
    case 'success':
      icon = faCheckCircle;
      iconColor = 'text-green-500';
      break;
    case 'error':
      icon = faExclamationTriangle;
      iconColor = 'text-red-500';
      break;
    case 'info':
      icon = faInfoCircle;
      iconColor = 'text-blue-500';
      break;
    default:
      icon = faInfoCircle;
      iconColor = 'text-blue-500';
  }

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      // Cleanup the timer if the component unmounts or if isVisible changes
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-5 right-5 max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastVariants}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="flex items-center p-4">
            <div className={`flex-shrink-0 ${iconColor}`}>
              <FontAwesomeIcon icon={icon} className="w-6 h-6" />
            </div>
            <div className="ml-3 w-full flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="bg-transparent rounded-md inline-flex text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  duration: PropTypes.number, // Duration in milliseconds
};

Toast.defaultProps = {
  type: 'success',
  duration: 5000, // Default duration is 3 seconds
};

export default Toast;
