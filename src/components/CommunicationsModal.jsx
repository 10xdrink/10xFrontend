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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
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
            className="bg-white dark:bg-gray-800 rounded-lg p-16 w-11/12 max-w-5xl shadow-lg relative max-h-screen overflow-y-auto "
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white bg-gradient-to-r from-black to-[#0821D2] hover:text-white px-8 py-3 dark:text-gray-300 dark:hover:text-white focus:outline-none rounded-full"
              aria-label="Close Communications Modal"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h2 id="communications-modal-title" className="text-6xl font-semibold text-black dark:text-gray-100 mb-10 quantico-bold-italic">
              Connect With Us
            </h2>

            {/* Company Information */}
            <div className="space-y-8">
              {/* Company Name */}
              <div>
                <h3 className="text-2xl font-medium text-black dark:text-gray-200 mb-2 pt-sans-regular">
                  Company Name:
                </h3>
                <p className="text-black dark:text-gray-300 text-lg pt-sans-regular">
                  10x Private Limited
                </p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-2xl font-medium text-black dark:text-gray-200 mb-2 pt-sans-regular">
                  Email:
                </h3>
                <p className="text-black dark:text-gray-300 text-lg pt-sans-regular">
                  <a href="mailto:support@10x.com" className="text-[#0821D2] hover:underline pt-sans-regular">
                    support@10x.com
                  </a>
                </p>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-2xl font-medium text-black dark:text-gray-200 mb-2 pt-sans-regular pt-sans-regular">
                  Address:
                </h3>
                <p className="text-black dark:text-gray-300 text-lg">
                  3rd Floor, Jyothi Imperial Building<br />
                  Above South India Shopping Mall,<br />
                  Near Flyover, Gachibowli,<br />
                  Hyderabad, Telangana 500081
                </p>
              </div>
            </div>

            {/* Redirect Button */}
            <div className="mt-12 flex justify-center">
              <Link to="/about-us">
                <button className="quantico-bold-italic text-lg bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-10 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded">
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
