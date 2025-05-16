// Footer.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import relumeLogo from '../assets/Relume.png';
import logo from "../assets/10X Logo.webp";
import TaglineWhite from '../assets/Tagline White.png';
import axios from 'axios';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  // Accordion state management
  const [openSections, setOpenSections] = useState({
    shop: false,
    about: false,
    emailList: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.name || !formData.email) {
      setStatus({ loading: false, success: false, message: 'Please fill in both fields.' });
      return;
    }

    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ loading: false, success: false, message: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ loading: true, success: null, message: '' });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/email-list`, formData);
      if (response.data.success) {
        setStatus({ loading: false, success: true, message: 'Subscription successful!' });
        setFormData({ name: '', email: '' }); // Reset form
      } else {
        setStatus({ loading: false, success: false, message: response.data.message || 'Something went wrong.' });
      }
    } catch (error) {
      // Handle different error scenarios
      let errorMsg = 'Something went wrong.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      setStatus({ loading: false, success: false, message: errorMsg });
    }
  };

  return (
    <footer className="hidden sm:block mega-menu text-white py-10 px-20 w-full">
      <div className="w-full pt-8 max-w-full">
        {/* Top section */}
        <div className="flex flex-wrap justify-between items-start mb-14 mx-auto max-w-full">
          {/* Logo Section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0 text-center sm:text-left">
            <img
              src={logo}
              alt="10X Logo"
              className="w-48 h-15 mr-4 mt-2 mb-2"
            />
            <p className="text-sm">
              <img className="w-48 h-15 mr-4 mt-2 mb-2" src={TaglineWhite} alt="THE BRAIN BATTERY" />
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-8 text-xl">
              <Link to={""}>
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </div>
          </div>

          {/* Shop Accordion */}
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-8 lg:mb-0 text-center sm:text-left">
            {/* Accordion Header */}
            <button
              className="w-full flex justify-between items-center text-2xl font-bold mb-4 nimbusL-bol lg:hidden focus:outline-none"
              onClick={() => toggleSection('shop')}
            >
              SHOP
              <i className={`fa-solid ${openSections.shop ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSections.shop ? 'max-h-60' : 'max-h-0 lg:max-h-full'}`}>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-lg pt-sans-regular hover:underline">
                    Collection
                  </Link>
                </li>
                <li>
                  <Link to="/products/lime-mango-1" className="text-lg pt-sans-regular hover:underline">
                    Power Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* About Accordion */}
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-8 lg:mb-0 text-center sm:text-left">
            {/* Accordion Header */}
            <button
              className="w-full flex justify-between items-center text-2xl font-bold mb-4 nimbusL-bol lg:hidden focus:outline-none"
              onClick={() => toggleSection('about')}
            >
              ABOUT
              <i className={`fa-solid ${openSections.about ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSections.about ? 'max-h-96' : 'max-h-0 lg:max-h-full'}`}>
              <ul className="space-y-2">
                <li>
                  <Link to="/about-us" className="text-lg pt-sans-regular hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-lg pt-sans-regular hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-lg pt-sans-regular hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-lg pt-sans-regular hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="text-lg pt-sans-regular hover:underline">
                    Legal
                  </Link>
                </li>
                <li>
                  <Link to="/thank-you" className="text-lg pt-sans-regular hover:underline">
                    Thank You
                  </Link>
                </li>
                <li>
                  <Link to="*" className="text-lg pt-sans-regular hover:underline">
                    404
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Join the Email List */}
          <div className="join-the-email-list w-full lg:w-1/3 border border-white pt-8 pr-8 pl-8 pb-8 text-center lg:text-left">
            {/* Accordion Header for Email List on smaller screens */}
            <button
              className="w-full flex justify-between items-center text-xl font-bold mb-4 nimbusL-bol lg:hidden focus:outline-none"
              onClick={() => toggleSection('emailList')}
            >
              JOIN THE EMAIL LIST
              <i className={`fa-solid ${openSections.emailList ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSections.emailList ? 'max-h-96' : 'max-h-0 lg:max-h-full'}`}>
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full py-2 px-4 mb-2 bg-white text-gray-800 rounded-sm focus:outline-none pt-sans-regular"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-2 px-4 mb-2 bg-white text-gray-800 rounded-sm focus:outline-none pt-sans-regular"
                    required
                  />
                </div>

                {/* Submit Button - Half the form width aligned left */}
                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`w-1/2 flex items-center text-xl justify-center pt-4 pb-4 pl-4 pr-4 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out ${
                      status.loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {status.loading ? 'Submitting...' : 'SUBMIT'}
                    {!status.loading && <img className="ml-3 w-6" src={relumeLogo} alt="Submit Icon" />}
                  </button>
                </div>
              </form>

              {/* Status Message */}
              {status.message && (
                <p
                  className={`mt-4 text-sm ${
                    status.success ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gradient Divider */}
        <hr className="horizontal border-0 bg-gradient-to-r from-[#13EAED] via-[#4CC3CB] to-[#0AA3A5] my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-sm max-w-full mx-auto text-center lg:text-left">
          <p className="text-lg pt-sans-regular"> {new Date().getFullYear()} 10X. All rights reserved.</p>
          <div className="flex flex-wrap justify-center lg:justify-end space-x-4 mt-4 lg:mt-0">
            <Link to="/terms-and-conditions" className="text-lg pt-sans-regular hover:underline">
              Terms & Conditions
            </Link>
            <Link to="/refund-cancellation-policy" className="text-lg pt-sans-regular hover:underline">
              Refund & Cancellation Policy
            </Link>
            <Link to="/privacy-policy" className="text-lg pt-sans-regular hover:underline">
              Privacy Policy
            </Link>
            <Link to="/cookie-settings" className="text-lg pt-sans-regular hover:underline">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;