import React from "react";
import { Link } from "react-router-dom";
import relume from "../assets/relume.png";
import logo from "../assets/10X Logo.webp";
import TaglineWhite from '../assets/Tagline White.png';

const Footer = () => {
  return (
    <footer className="mega-menu text-white py-10 px-20 w-full">
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
              <i class="fa-brands fa-facebook"></i>
              </Link>
              <Link to={""}> 
              <i className="icons fab fa-instagram"></i>
              </Link>
              <Link to={""}>
              <i className="icons fab fa-x-twitter"></i>
              </Link>
              <Link to={""}>
              <i className="icons fab fa-linkedin-in"></i>
              </Link>
              <Link to={""}>
              <i className="icons fab fa-youtube"></i>
              </Link>
            </div>
          </div>

          {/* Shop and About Links */}
          
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-8 lg:mb-0 text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-4 nimbusL-bol">SHOP</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collection" className="text-lg pt-sans-regular hover:underline">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/power-up" className="text-lg pt-sans-regular hover:underline">
                  Power Up
                </Link>
              </li>
              <li>
                <Link to="/power-down" className="text-lg pt-sans-regular hover:underline">
                  Power Down
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/5 mb-8 lg:mb-0 text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-4 nimbusL-bol">ABOUT</h3>
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

          {/* Join the Email List */}
          <div className="join-the-email-list w-full lg:w-1/3 border border-white pt-8 pr-8 pl-8 pb-8 text-center lg:text-left">
            <h3 className="text-xl font-bold mb-4 nimbusL-bol">JOIN THE EMAIL LIST</h3>
            <form action="#" method="POST">
              {/* Name Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full py-2 px-4 mb-2 bg-white text-gray-800 rounded-sm focus:outline-none pt-sans-regular"
                />
              </div>
              
              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full py-2 px-4 mb-2 bg-white text-gray-800 rounded-sm focus:outline-none pt-sans-regular"
                />
              </div>

              {/* Submit Button - Half the form width aligned left */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="w-1/2 flex items-center text-xl justify-center pt-4 pb-4 pl-4 pr-4 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none  hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out"
                >
                  SUBMIT <img className="ml-3 w-6" src={relume} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Gradient Divider */}
        <hr className="horizontal border-0 bg-gradient-to-r from-[#13EAED] via-[#4CC3CB] to-[#0AA3A5] my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-sm max-w-full mx-auto text-center lg:text-left">
        <p className="text-lg pt-sans-regular">© {new Date().getFullYear()} 10X. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <Link to="/privacy-policy" className="text-lg pt-sans-regular hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-lg pt-sans-regular hover:underline">
              Terms of Service
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
