// src/components/CommunicationsModal.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';

const CommunicationsModal = ({ onClose }) => {
  // Modal animation variants
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
    exit: { y: "100vh", opacity: 0, transition: { ease: 'easeInOut', duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto px-4 sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
        aria-labelledby="communications-modal-title"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
      >
        <FocusTrap>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-3xl shadow-lg relative max-h-screen overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-gradient-to-r from-black to-[#0821D2] hover:text-white px-3 py-3 sm:px-4 sm:py-4 focus:outline-none rounded-full"
              aria-label="Close Communications Modal"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h2
              id="communications-modal-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black quantico-bold-italic dark:text-gray-100 mb-6 sm:mb-8 text-center"
            >
              Connect With Us
            </h2>

            {/* Company Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Company Name */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-black dark:text-gray-200 mb-1 sm:mb-2 pt-sans-regular">
                  Company Name:
                </h3>
                <p className="text-black dark:text-gray-300 text-base sm:text-lg pt-sans-regular">
                  10x Private Limited
                </p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-black dark:text-gray-200 mb-1 sm:mb-2 pt-sans-regular">
                  Email:
                </h3>
                <p className="text-black dark:text-gray-300 text-base sm:text-lg pt-sans-regular">
                  <a href="mailto:support@10x.com" className="text-[#0821D2] hover:underline pt-sans-regular">
                    support@10x.com
                  </a>
                </p>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-black dark:text-gray-200 mb-1 sm:mb-2 pt-sans-regular">
                  Address:
                </h3>
                <p className="text-black dark:text-gray-300 text-base sm:text-lg">
                  3rd Floor, Jyothi Imperial Building<br />
                  Above South India Shopping Mall,<br />
                  Near Flyover, Gachibowli,<br />
                  Hyderabad, Telangana 500081
                </p>
              </div>
            </div>

            {/* Redirect Button */}
            <div className="mt-8 sm:mt-12 flex justify-center">
              <Link to="/about-us">
                <button className="quantico-bold-italic text-base sm:text-lg lg:text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-6 sm:px-8 lg:px-10 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded w-full sm:w-auto">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </FocusTrap>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommunicationsModal;
