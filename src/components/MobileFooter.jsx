import React, { useState } from "react";
import { Link } from "react-router-dom";
import relumeLogo from '../assets/Relume.png';
import logo from "../assets/10X Logo.webp";
import TaglineWhite from '../assets/Tagline White.png';
import axios from 'axios';

const MobileFooter = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });
  
  // State variables for accordions
  const [shopOpen, setShopOpen] = useState(true); // Open by default
  const [aboutOpen, setAboutOpen] = useState(false);

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
      const response = await axios.post('http://localhost:5000/api/email-list', formData);
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
    <footer className="block sm:hidden mega-menu text-white py-6 px-4 w-full">
      <div className="w-full pt-4 max-w-full">
        {/* Top section */}
        <div className="flex flex-col justify-between items-center mb-10 mx-auto max-w-full">
          {/* Logo Section */}
          <div className="w-full mb-6 text-center">
            <img
              src={logo}
              alt="10X Logo"
              className="w-36 h-auto mx-auto mt-2 mb-2"
            />
            <p className="text-sm">
              <img className="w-36 h-auto mx-auto mt-2 mb-2" src={TaglineWhite} alt="THE BRAIN BATTERY" />
            </p>
            <div className="flex justify-center space-x-4 mt-4 text-xl">
              <Link to={""}>
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link to={""}>
                <i className="icons fab fa-instagram"></i>
              </Link>
              <Link to={""}>
                <i className="icons fab fa-twitter"></i>
              </Link>
              <Link to={""}>
                <i className="icons fab fa-linkedin-in"></i>
              </Link>
              <Link to={""}>
                <i className="icons fab fa-youtube"></i>
              </Link>
            </div>
          </div>

          {/* SHOP Accordion */}
          <div className="w-full mb-6 ml-6 mt-4">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex justify-between items-center w-full text-xl font-bold mb-2 nimbusL-bol focus:outline-none"
              aria-expanded={shopOpen}
            >
              SHOP
              <svg
                className={`w-6 h-6 mr-4 transition-transform duration-300 ${
                  shopOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {shopOpen && (
              <ul className="space-y-1 text-left">
                <li>
                  <Link to="/products" className="text-base pt-sans-regular hover:underline">
                    Collection
                  </Link>
                </li>
                <li>
                  <Link to="/products/lime-mango-1" className="text-base pt-sans-regular hover:underline">
                    Power Up
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* ABOUT Accordion */}
          <div className="w-full mb-6 ml-6">
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex justify-between items-center w-full text-xl font-bold mb-2 nimbusL-bol focus:outline-none"
              aria-expanded={aboutOpen}
            >
              ABOUT
              <svg
                className={`w-6 h-6 mr-4 transition-transform duration-300 ${
                  aboutOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {aboutOpen && (
              <ul className="space-y-1 text-left">
                <li>
                  <Link to="/about-us" className="text-base pt-sans-regular hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-base pt-sans-regular hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-base pt-sans-regular hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base pt-sans-regular hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="text-base pt-sans-regular hover:underline">
                    Legal
                  </Link>
                </li>
                <li>
                  <Link to="/thank-you" className="text-base pt-sans-regular hover:underline">
                    Thank You
                  </Link>
                </li>
                <li>
                  <Link to="*" className="text-base pt-sans-regular hover:underline">
                    404
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Join the Email List */}
          <div className="w-[95%] border border-white pt-6 px-6 pb-6 ">
            <h3 className="text-lg font-bold mb-2 nimbusL-bol">JOIN THE EMAIL LIST</h3>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 px-3 mb-2 bg-white text-gray-800 rounded-sm focus:outline-none pt-sans-regular"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 px-3 mb-2 bg-white text-gray-800 rounded-sm focus:outline-none pt-sans-regular"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-left">
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`w-[50%] flex items-center text-lg justify-center py-4 px-4 bg-transparent border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out ${
                    status.loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status.loading ? 'Submitting...' : 'SUBMIT'}
                  {!status.loading && <img className="ml-2 w-5" src={relumeLogo} alt="Submit Icon" />}
                </button>
              </div>
            </form>

            {/* Status Message */}
            {status.message && (
              <p
                className={`mt-3 text-sm ${
                  status.success ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Bottom Section with blue top border - Add the new links here */}
        <div className="w-full border-t border-[#0AA3A5] pt-2 text-left">
          <div className="flex flex-col items-start text-sm max-w-full mx-auto p-4">
            <Link to="/terms-and-conditions" className="text-base pt-sans-regular hover:underline mb-2">
              Terms & Conditions
            </Link>
            <Link to="/refund-cancellation-policy" className="text-base pt-sans-regular hover:underline mb-2">
              Refund & Cancellation Policy
            </Link>
            <Link to="/privacy-policy" className="text-base pt-sans-regular hover:underline mb-2">
              Privacy Policy
            </Link>
            <Link to="/cookie-settings" className="text-base pt-sans-regular hover:underline mb-2">
              Cookie Settings
            </Link>
            <p className="text-base pt-sans-regular mt-2">© {new Date().getFullYear()} 10X. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;