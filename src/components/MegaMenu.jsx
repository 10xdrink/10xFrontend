// src/components/MegaMenu.jsx

import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart.png";
import UserIcon from "../assets/User.png";
import MailIcon from "../assets/MailIcon.png";
import ChatSupport from "../assets/ChatSupport.png";
import LimeCharge from "../assets/Product Images/Lime Charge.png";
import LimeCharge2 from "../assets/Lime Charge2.png";


// Importing product data can be beneficial for dynamic linking
// However, for simplicity, we'll hardcode the slugs based on provided MongoDB data

const MegaMenu = () => {
  return (
    <div className="w-full mx-auto border-t-2 border-white">
      <div className="main-div flex flex-col md:flex-row bg-gradient-to-b from-[#0821D2] to-[#000000]">
        {/* Shop Column */}
        <div className="first-col w-full md:w-[20%] py-6 md:py-12 px-6 md:px-20 border-b md:border-b-0 border-white/20">
          <h3 className="text-white quantico-bold-italic text-xl md:text-2xl uppercase">Shop</h3>
          <ul className="text-white text-base mt-4">
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/products">Collection</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/products/lime-mango-1">Power Up</Link>
            </li>
          </ul>
        </div>

        {/* About Column */}
        <div className="second-col w-full md:w-[20%] bg-transparent py-6 md:py-12 px-6 md:px-20 border-b md:border-b-0 border-white/20">
          <h3 className="text-white quantico-bold-italic text-xl md:text-2xl uppercase">About</h3>
          <ul className="text-white text-base mt-4 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0">
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/legal">Legal</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/thank-you">Thank You</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/404">404</Link>
            </li>
          </ul>
        </div>

        {/* Featured Products Column - Hidden on Mobile */}
        <div className="third-col hidden md:flex w-full md:w-[40%] py-12 pr-9 gap-4">
          <Link className="w-1/2" to="/products/lime-mango-1">
            <img
              src={LimeCharge2}
              alt="Lime Charge2"
              className="w-full h-auto object-cover shadow-lg hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
          <Link className="w-1/2" to="/products/lime-mango-1">
            <img
              src={LimeCharge}
              alt="Lime Charge"
              className="w-full h-auto object-cover shadow-lg hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Support Column */}
        <div className="last-col w-full md:w-[20%] bg-gradient-to-t from-[#FFFFFF] to-[#E6E6E6] py-6 md:py-12">
          {/* Top Support Buttons */}
          <div className="top px-6 md:px-0">
            <div className="z-10 learn-more w-full mb-6">
              <button
                className="text-3xl md:text-4xl uppercase quantico-bold-italic"
                type="button"
                aria-label="Support"
              >
                Support
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <button
                className="mega-support-btn py-2 px-3 md:px-4 flex gap-2 items-center justify-center pt-sans-regular w-full"
                type="button"
                aria-label="Chat Customer Support"
              >
                <img src={ChatSupport} alt="Chat Support" className="w-5 md:w-6 h-5 md:h-6" /> 
                <span className="text-sm md:text-base">Chat</span>
              </button>
              <button
                className="mega-support-btn py-2 px-3 md:px-4 flex gap-2 items-center justify-center pt-sans-regular w-full"
                type="button"
                aria-label="Email Support"
              >
                <img src={MailIcon} alt="Email Support" className="w-4 md:w-5 h-3 md:h-4" /> 
                <span className="text-sm md:text-base">Email</span>
              </button>
            </div>
          </div>

          {/* Bottom Social Links and Icons */}
          <div className="bottom px-6 md:px-12 mt-8 md:mt-44">
            {/* All Icons in One Row */}
            <div className="flex items-center justify-between">
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-6 h-6 flex items-center justify-center hover:text-[#0821D2] transition-colors duration-300"
                >
                  <i className="fa-brands fa-facebook text-[24px]"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-6 h-6 flex items-center justify-center hover:text-[#0821D2] transition-colors duration-300"
                >
                  <i className="fa-brands fa-instagram text-[24px]"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-6 h-6 flex items-center justify-center hover:text-[#0821D2] transition-colors duration-300"
                >
                  <i className="fa-brands fa-twitter text-[24px]"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-6 h-6 flex items-center justify-center hover:text-[#0821D2] transition-colors duration-300"
                >
                  <i className="fa-brands fa-linkedin text-[24px]"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-6 h-6 flex items-center justify-center hover:text-[#0821D2] transition-colors duration-300"
                >
                  <i className="fa-brands fa-youtube text-[24px]"></i>
                </a>
              </div>
              {/* Cart and User Icons */}
              <div className="flex gap-2">
                <Link to="/cart" aria-label="Cart">
                  <img
                    className="w-6 h-6 hover:opacity-80 transition-opacity duration-300"
                    src={CartIcon}
                    alt="Cart"
                  />
                </Link>
                <Link to="/user" aria-label="User Account">
                  <img
                    className="w-6 h-6 hover:opacity-80 transition-opacity duration-300"
                    src={UserIcon}
                    alt="User"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;