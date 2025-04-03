// src/components/Navbar.jsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/10X Logo.webp";
import UserIcon from "../assets/User.svg"; // Renamed for clarity
import CartIcon from "../assets/CartIcon.png";
import SearchBarIcon from "../assets/SearchBar.svg";
import Hamburger from "../assets/Hamburger.png";
import PowerUpPackImg from "../assets/power up pack.png"; // Import the Power Up Pack image
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import api from "../utils/api"; // Import the API utility
import MegaMenu from "./MegaMenu"; // Import the MegaMenu component
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion components
import { debounce } from "lodash"; // Ensure lodash is installed: npm install lodash

const Navbar = () => {
  // State Management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExitingSearch, setIsExitingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // **Declared before usage**

  const { cartItems, toggleCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for dropdown

  // Debounced search function to optimize API calls
  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (query.trim() === "") {
        // Fetch latest 4 products when query is empty
        try {
          const response = await api.get("/products", {
            params: { sort: "createdAt", order: "desc", limit: 4 },
          });

          if (response.data.success) {
            setFilteredProducts(response.data.products);
          }
        } catch (error) {
          console.error("Error fetching latest products:", error);
          setFilteredProducts([]);
        }
      } else {
        // Perform search
        try {
          const response = await api.get("/products/search", {
            params: { query },
          });

          if (response.data.success) {
            setFilteredProducts(response.data.products);
          }
        } catch (error) {
          console.error("Error searching products:", error);
          setFilteredProducts([]);
        }
      }
    }, 300) // 300ms debounce
  ).current;

  // Scroll event to toggle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.2; // 20% of viewport height
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle Functions
  const toggleSearchModal = () => {
    if (isSearchOpen) {
      setIsExitingSearch(true);
      setTimeout(() => {
        setIsSearchOpen(false);
        setIsExitingSearch(false);
        setSearchQuery("");
        setFilteredProducts([]);
      }, 300); // Match the exit animation duration
    } else {
      setIsSearchOpen(true);
      // Fetch latest products when opening search modal without a query
      debouncedSearch("");
    }
  };

  const toggleMegaMenu = () => setIsMegaMenuOpen((prev) => !prev);

  // Handle Search with Debounce
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSearchSubmit = () => {
    if (filteredProducts.length > 0) {
      navigate(`/products/${filteredProducts[0].slug}`);
    }
    toggleSearchModal();
  };

  // Handle Escape key to close modals and dropdown
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (isSearchOpen) toggleSearchModal();
        if (isMegaMenuOpen) toggleMegaMenu();
        if (isDropdownOpen) setIsDropdownOpen(false); // Close dropdown if open
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchOpen, isMegaMenuOpen, isDropdownOpen]); // **Added isDropdownOpen to dependencies**

  // Prevent background scrolling when modals or dropdowns are open
  useEffect(() => {
    if (isSearchOpen || isMegaMenuOpen || isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen, isMegaMenuOpen, isDropdownOpen]);

  // Focus trapping within MegaMenu modal
  useEffect(() => {
    const trapFocus = (e) => {
      if (
        isMegaMenuOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        e.stopPropagation();
        modalRef.current.focus();
      }
    };

    if (isMegaMenuOpen) {
      document.addEventListener("focus", trapFocus, true);
      // Focus the modal for accessibility
      setTimeout(() => {
        if (modalRef.current) modalRef.current.focus();
      }, 100);
    } else {
      document.removeEventListener("focus", trapFocus, true);
    }

    return () => {
      document.removeEventListener("focus", trapFocus, true);
    };
  }, [isMegaMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle Logout
  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`navbar ${
          isSticky ? "sticky" : ""
        } text-white fixed top-0 left-0 right-0 z-50`}
      >
        {/* Added 'fixed' and 'z-50' to ensure Navbar stays on top */}
        <div className="relative max-w-full mx-auto flex justify-between items-center px-4 sm:px-20 bg-gradient-to-r from-black to-[#0821D2] pt-2 pb-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="10X Logo"
              className="w-20 h-10 mr-4 mt-2 mb-2"
            />
          </Link>

          {/* Right Side Icons */}
          <div className="flex space-x-4 justify-between items-center">
            {/* Search Button */}
            <button
              onClick={toggleSearchModal}
              className="focus:outline-none"
              aria-label="Open Search"
            >
              <img
                className="w-10 h-9 lg:w-12 lg:h-11 mt-1"
                src={SearchBarIcon}
                alt="Search"
              />
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-label="User Menu"
              >
                <img
                  className="w-10 h-9 lg:w-12 lg:h-11  mt-2"
                  src={UserIcon}
                  alt="User"
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute right-0  w-48 bg-white rounded-md shadow-lg z-60" // **Increased z-index to z-60**
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      {!user ? (
                        // Logged Out: Show Login/Signup
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 pt-sans-regular"
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="text-[#061AA6] text-xl">
                            <i className="fa-solid fa-user mr-2"></i>
                          </span>{" "}
                          Login / Signup
                        </Link>
                      ) : (
                        // Logged In: Show My Account, Your Orders, Log Out
                        <>
                          <Link
                            to="/user-dashboard"
                            className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 pt-sans-regular"
                            role="menuitem"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <span className="text-[#061AA6] text-xl">
                              <i className="fa-solid fa-user-circle mr-2"></i>
                            </span>
                            My Account
                          </Link>
                          <Link
                            to="/my-orders"
                            className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 pt-sans-regular"
                            role="menuitem"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <span className="text-[#061AA6] text-xl">
                              <i className="fa-solid fa-box-open mr-2"></i>
                            </span>
                            Your Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 pt-sans-regular"
                            role="menuitem"
                          >
                            <span className="text-[#061AA6] text-xl">
                              <i className="fa-solid fa-sign-out-alt mr-2"></i>
                            </span>
                            Log Out
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="hover:underline relative focus:outline-none"
              aria-label="Open Cart"
            >
              <img
                className="w-10 h-9 lg:w-12 lg:h-11 mt-1"
                src={CartIcon}
                alt="Cart"
              />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-gradient-to-r from-[#F4AE3F] to-[#F4AE3F] text-black rounded-full text-xs w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center mt-0.5 -mr-2">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMegaMenu}
              className="hover:underline block focus:outline-none"
              aria-label="Open Mega Menu"
            >
              <img
                className="w-14 h-12 lg:w-16 lg:h-14 mt-1"
                src={Hamburger}
                alt="Menu"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal with Framer Motion */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black opacity-70"
              onClick={toggleSearchModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            ></motion.div>

            {/* Search Modal Content - Full Page */}
            <motion.div
              className="relative bg-white w-full h-full overflow-y-auto search-scrollbar pt-20 pb-12 px-6 sm:px-12 md:px-20 z-60"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('https://res.cloudinary.com/dvbbsgj1u/image/upload/v1742831705/p9jxgk5thmdfdbfuetfr.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={toggleSearchModal}
                className="absolute top-6 right-6 text-[#9551F2] hover:text-[#7E32EACC] focus:outline-none transition-all duration-300 transform hover:scale-110 focus:scale-110 z-70 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl"
                aria-label="Close Search"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </motion.button>

              {/* Search Header */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#0821D2] to-[#9551F2] bg-clip-text text-transparent quantico-bold">
                  Power Your Day
                  </span>
                </h2>
                <p className="nimbusL-bol text-gray-600 text-lg roboto-regular max-w-2xl mx-auto">
                Pick the 10X product that fits your energy goals


                </p>
              </motion.div>

              {/* Search Input */}
              <motion.div 
                className="max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="search-input-container relative flex items-center overflow-hidden w-full rounded-2xl shadow-lg transition-all duration-300 group hover:shadow-xl bg-white/80 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9551F2]/5 to-[#7E32EACC]/5"></div>
                  <span className="absolute left-6 text-[#9551F2] z-10 text-xl">
                    <i className="fa-solid fa-bolt-lightning"></i>
                  </span>
                  <div className="flex-1 flex items-center">
                    <input
                      type="search"
                      placeholder="Turbocharge Your Routine!"
                      className="w-full py-6 pl-16 pr-20 text-black outline-none border-0 focus:ring-0 roboto-medium text-lg bg-transparent placeholder-gray-500"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      aria-label="Search"
                      onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                      autoFocus
                    />
                  </div> 
                  <button
                    onClick={handleSearchSubmit}
                    className="absolute right-4 w-14 h-14 bg-gradient-to-r from-[#9551F2] to-[#7E32EACC] rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none z-10 shadow-lg group"
                    aria-label="Submit Search"
                  >
                    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <i className="fa-solid fa-magnifying-glass text-white text-xl"></i>
                  </button>
                </div>
              </motion.div>

              {/* Search Results Section */}
              <div className="max-w-6xl mx-auto">
                {searchQuery && (
                  <motion.h3 
                    className="text-2xl font-bold mb-8 text-gray-800 flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Results for "<span className="text-[#9551F2]">{searchQuery}</span>"
                  </motion.h3>
                )}
                
                {/* Results Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      >
                        <Link
                          to={`/products/${product.slug}`}
                          className="block transform product-card-hover outline-none search-result-item h-full"
                          onClick={toggleSearchModal}
                        >
                          <div className="bg-white border border-[#9551F2]/10 rounded-2xl p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                            <div className="w-full mb-4 rounded-xl overflow-hidden">
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full  object-cover transform group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <div className="text-center flex-grow flex flex-col justify-between w-full">
                              <div>
                                <h4 className="font-bold text-lg mb-2 text-gray-800">{product.title}</h4>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {product.description ? product.description.substring(0, 60) + '...' : 'Experience the power of 10X energy'}
                                </p>
                              </div>
                              <div className="mt-auto pt-4 border-t border-[#9551F2]/10">
                                <p className="text-xl font-bold bg-gradient-to-r from-[#0821D2] to-[#9551F2] bg-clip-text text-transparent">
                                  ${product.variants[0].price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  ) : searchQuery && (
                    <motion.div 
                      className="col-span-full flex flex-col items-center justify-center py-16 bg-gradient-to-br from-[#9551F2]/5 to-[#7E32EACC]/5 rounded-2xl border border-[#9551F2]/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <i className="fa-solid fa-face-frown text-7xl text-[#9551F2] mb-6 animate-bounce"></i>
                      <h4 className="text-2xl font-bold text-gray-800 mb-3">No Results Found</h4>
                      <p className="text-gray-600 text-center max-w-md text-lg">
                        Try adjusting your search terms or browse our categories.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MegaMenu Modal with Framer Motion */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black opacity-30"
              onClick={toggleMegaMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            ></motion.div>

            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              tabIndex="-1" // Makes the div focusable
              className="absolute top-0 left-0 w-full bg-white z-60 shadow-lg p-0 transform"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              {/* Close Button */}
              <button
                onClick={toggleMegaMenu}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Close Mega Menu"
              >
                <i className="fa-solid fa-circle-xmark text-3xl"></i>
              </button>

              {/* MegaMenu Component */}
              <MegaMenu />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional: Remove this if not needed */}
      {/* Custom CSS for Sliding Animation */}
      <style>{`
        .translate-y-0 {
          transform: translateY(0);
        }
        .-translate-y-full {
          transform: translateY(-100%);
        }
      `}</style>
    </>
  );
};

export default Navbar;
