// src/components/MegaMenu.jsx

import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart.png";
import UserIcon from "../assets/User.png";
import MailIcon from "../assets/MailIcon.png";
import ChatSupport from "../assets/ChatSupport.png";
import LimeCharge from "../assets/Product Images/Lime Charge.png";
import MangoFusion from "../assets/Product Images/mango fusion.png";

// Importing product data can be beneficial for dynamic linking
// However, for simplicity, we'll hardcode the slugs based on provided MongoDB data

const MegaMenu = () => {
  return (
    <div className="w-full mx-auto border-t-2 border-white">
      <div className="main-div flex bg-gradient-to-b from-[#0821D2] to-[#000000]">
        {/* Shop Column */}
        <div className="first-col w-[20%] py-12 px-20">
          <h3 className="text-white quantico-bold-italic text-2xl uppercase">Shop</h3>
          <ul className="text-white text-base mt-4">
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/products">Collection</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              {/* Link to Power Up Products */}
              <Link to="/products/power-up-pack-3">Power Up</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              {/* Link to Power Down Products */}
              <Link to="/products/power-down-purple-5">Power Down</Link>
            </li>
          </ul>
        </div>

        {/* About Column */}
        <div className="second-col w-[20%] bg-transparent py-12 px-20">
          <h3 className="text-white quantico-bold-italic text-2xl uppercase">About</h3>
          <ul className="text-white text-base mt-4">
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
            <li className="pt-sans-regular text-base mt-2 ">
              <Link to="/thank-you">Thank You</Link>
            </li>
            <li className="pt-sans-regular text-base mt-2">
              <Link to="/404">404</Link>
            </li>
          </ul>
        </div>

        {/* Featured Products Column */}
        <div className="third-col w-[40%] flex py-12 pr-9 gap-4">
          {/* Lime Mango Product */}
          <Link className="w-1/2" to="/products/lime-mango-1">
            <img
              src={LimeCharge} // Ensure this image corresponds to "Lime Mango"
              alt="Lime Mango"
              className="w-full h-auto object-cover shadow-lg hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
          {/* Mango Fusion Product */}
          <Link className="w-1/2" to="/products/mango-fusion-2">
            <img
              src={MangoFusion} // Ensure this image corresponds to "Mango Fusion"
              alt="Mango Fusion"
              className="w-full h-auto object-cover shadow-lg hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Support Column */}
        <div className="last-col w-[20%] bg-gradient-to-t from-[#FFFFFF] to-[#E6E6E6] py-12">
          {/* Top Support Buttons */}
          <div className="top">
            <div className="z-10 learn-more w-full">
              <button
                className="text-4xl uppercase quantico-bold-italic"
                type="button"
                aria-label="Support"
              >
                Support
              </button>
            </div>
            <button
              className="mx-8 mega-support-btn py-2 px-10 flex gap-2 items-center pt-sans-regular"
              type="button"
              aria-label="Chat Customer Support"
            >
              <img src={ChatSupport} alt="Chat Support" className="w-6 h-6" /> Chat Customer Support
            </button>
            <button
              className="mx-8 mega-support-btn py-2 px-10 mt-4 flex gap-2 items-center pt-sans-regular"
              type="button"
              aria-label="Email Support"
            >
              <img src={MailIcon} alt="Email Support" className="w-5 h-4" /> Email
            </button>
          </div>

          {/* Bottom Social Links and Icons */}
          <div className="bottom flex px-12 mt-44">
            {/* Social Media Icons */}
            <div className="left flex space-x-4 text-xl text-[#000000]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#0821D2]"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#0821D2]"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-[#0821D2]"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#0821D2]"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[#0821D2]"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            {/* Cart and User Icons */}
            <div className="right flex gap-2 ml-12">
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
  );
};

export default MegaMenu;
