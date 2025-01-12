// src/components/Navbar.jsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/10X Logo.webp";
import UserIcon from "../assets/User.svg"; // Renamed for clarity
import CartIcon from "../assets/CartIcon.png";
import SearchBarIcon from "../assets/SearchBar.svg";
import Hamburger from "../assets/Hamburger.png";
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
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black opacity-30"
              onClick={toggleSearchModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            ></motion.div>

            {/* Search Modal Content */}
            <motion.div
              className="relative bg-white w-full h-full sm:w-11/12 sm:max-w-md sm:h-auto p-6 rounded-none sm:rounded-lg shadow-lg z-60"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={toggleSearchModal}
                className="absolute top-4 right-4 text-[#9551F2] hover:text-[#9551F2] focus:outline-none"
                aria-label="Close Search"
              >
                <i className="fa-solid fa-circle-xmark text-2xl"></i>
              </button>

              {/* Search Input */}
              <div className="mt-10">
                <div className="relative flex items-center border-2 border-[#9551F2] overflow-hidden w-full shadow-xl mb-8">
                  <input
                    type="search"
                    placeholder="Search Product"
                    className="w-full p-3 pr-10 text-black outline-none shadow-lg"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    aria-label="Search"
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                    aria-label="Submit Search"
                  >
                    <i className="fa-solid fa-magnifying-glass text-[#7E32EACC] text-xl"></i>
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 4).map((product) => (
                    <Link
                      to={`/products/${product.slug}`}
                      key={product._id}
                      className="block"
                      onClick={toggleSearchModal}
                    >
                      <div className="border p-2 flex flex-col items-center">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-auto object-cover mb-2"
                          loading="lazy"
                        />
                        <div className="text-center">
                          <p className="font-bold text-base">{product.title}</p>
                          <p className="mt-2 text-sm px-4 py-2 rounded-full bg-[#9551F2] text-white font-bold">
                            ${product.variants[0].price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center mt-10">
                    <i className="fa-solid fa-face-frown text-4xl text-[#9551F2] mb-4"></i>
                    <p className="text-black text-lg">No Results Found</p>
                  </div>
                )}
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
