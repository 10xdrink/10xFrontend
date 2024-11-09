// src/components/ProductList.jsx

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import Toast from "./Toast"; // Import the Toast component
import api from "../utils/api"; // Import the API utility

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "All",
    variants: [],
    packaging: "All",
  });
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;
  const [error, setError] = useState(null);

  // State for Toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch products whenever currentPage or selectedFilters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};

        // Apply category filter if not 'All'
        if (selectedFilters.category !== "All") {
          params.category = selectedFilters.category;
        }

        // Apply variants filter if any
        if (selectedFilters.variants.length > 0) {
          params.variants = selectedFilters.variants.join(",");
        }

        // Apply packaging filter if not 'All'
        if (selectedFilters.packaging !== "All") {
          params.packaging = selectedFilters.packaging;
        }

        // Apply pagination parameters
        params.page = currentPage;
        params.limit = productsPerPage;

        const response = await api.get("/products", { params });

        if (response.data.success) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages); // Assuming backend sends totalPages
        } else {
          console.error("Failed to fetch products:", response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedFilters]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleFilterChange = (filterCategory, option) => {
    setSelectedFilters((prevFilters) => {
      if (filterCategory === "variants") {
        const updatedVariants = prevFilters.variants.includes(option)
          ? prevFilters.variants.filter((variant) => variant !== option)
          : [...prevFilters.variants, option];
        return { ...prevFilters, variants: updatedVariants };
      } else {
        return { ...prevFilters, [filterCategory]: option };
      }
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setSelectedFilters({ category: "All", variants: [], packaging: "All" });
    setCurrentPage(1);
  };

  const handleAddToCart = async (product) => {
    if (user) {
      await addToCart({
        id: product._id, // Use backend's unique ID
        title: product.title,
        price: product.variants[0].price,
        thumbnail: product.thumbnail,
        quantity: 1,
        variant: product.variants[0].size,
        packaging: "Bottle", // Set default packaging or make dynamic
      });
    } else {
      setToastMessage("Make sure you are logged in to add products to the cart.");
      setToastVisible(true);
    }
  };

  return (
    <div className="main-div bg-gray-100">
      <div className="py-12 px-20">
        <h1 className="text-7xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
          Collection
        </h1>
        <p className="text-lg pt-sans-regular mb-16">
          Browse our product collection today!
        </p>
        <div className="all-things-here flex w-full mx-auto">
          {/* Filters Sidebar */}
          <aside className="w-1/4 bg-white mr-12 p-10 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 nimbus-bold">FILTERS</h2>
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 pt-sans-bold">
                Category
              </h3>
              {["Beverages"].map((category) => (
                <div
                  key={category}
                  className="flex items-center mb-2 custom-radio"
                >
                  <input
                    type="radio"
                    name="category"
                    id={`category-${category}`}
                    onChange={() => handleFilterChange("category", category)}
                    checked={selectedFilters.category === category}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="pt-sans-regular cursor-pointer ml-2"
                  >
                    {category}
                  </label>
                </div>
              ))}
              <div className="flex items-center mb-2 custom-radio">
                <input
                  type="radio"
                  name="category"
                  id="category-All"
                  onChange={() => handleFilterChange("category", "All")}
                  checked={selectedFilters.category === "All"}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="category-All"
                  className="pt-sans-regular cursor-pointer ml-2"
                >
                  All
                </label>
              </div>
            </div>

            {/* Variants Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 pt-sans-bold">
                Variants
              </h3>
              {[
                "60ml",
                "120ml",
                "250ml",
                "Pack of 5",
                "Pack of 10",
                "5 Liters",
                "10 Liters",
              ].map((variant) => (
                <div
                  key={variant}
                  className="checkbox-wrapper-15 mb-2 flex items-center"
                >
                  <input
                    className="inp-cbx"
                    id={`cbx-${variant}`}
                    type="checkbox"
                    style={{ display: "none" }}
                    onChange={() => handleFilterChange("variants", variant)}
                    checked={selectedFilters.variants.includes(variant)}
                  />
                  <label className="cbx" htmlFor={`cbx-${variant}`}>
                    <span>
                      <svg width="12px" height="9px" viewBox="0 0 12 9">
                        <polyline points="1 5 4 8 11 1"></polyline>
                      </svg>
                    </span>
                    <span>{variant}</span>
                  </label>
                </div>
              ))}
            </div>

            {/* Packaging Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 pt-sans-bold">
                Packaging
              </h3>
              {["Bottle"].map((pack) => (
                <div key={pack} className="flex items-center mb-2 custom-radio">
                  <input
                    type="radio"
                    name="packaging"
                    id={`packaging-${pack}`}
                    onChange={() => handleFilterChange("packaging", pack)}
                    checked={selectedFilters.packaging === pack}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`packaging-${pack}`}
                    className="cursor-pointer ml-2"
                  >
                    {pack}
                  </label>
                </div>
              ))}
              <div className="flex items-center mb-2 custom-radio">
                <input
                  type="radio"
                  name="packaging"
                  id="packaging-All"
                  onChange={() => handleFilterChange("packaging", "All")}
                  checked={selectedFilters.packaging === "All"}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="packaging-All"
                  className="pt-sans-regular cursor-pointer ml-2"
                >
                  All
                </label>
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="learn-more mt-8">
              <button
                className="uppercase shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl px-4 py-2"
                type="button"
                onClick={resetFilters}
              >
                Reset Filters <i className="ml-2 fa-solid fa-arrows-rotate"></i>
              </button>
            </div>
          </aside>

          {/* Products Section */}
          <section className="w-3/4">
            {/* Display error message if any */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading
                ? Array.from({ length: productsPerPage }).map((_, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-4 shadow-lg rounded-lg text-center"
                    >
                      <div className="loading-image loading-placeholder bg-gray-300 h-40 mb-4"></div>
                      <div className="loading-title loading-placeholder bg-gray-300 h-6 mb-2"></div>
                      <div className="loading-text loading-placeholder bg-gray-300 h-4 mb-2"></div>
                      <div className="loading-text loading-placeholder bg-gray-300 h-4 mb-4"></div>
                      <div className="loading-button loading-placeholder bg-gray-300 h-10 w-full"></div>
                    </div>
                  ))
                : products.map((product) => (
                    <div
                      key={product._id} // Use unique identifier from backend
                      className="bg-white border border-gray-200 p-4 shadow-lg rounded-lg text-center animate-fadeInUp transition-transform duration-300 ease-in-out hover:scale-105 relative overflow-hidden"
                    >
                      <Link to={`/products/${product.slug}`} className="block">
                        {/* Image Container */}
                        <div className="relative group">
                          {/* Primary Image */}
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-auto object-cover mb-4 transition-opacity duration-500 ease-in-out"
                            loading="lazy"
                          />
                          {/* Secondary Image */}
                          {product.images && product.images.length > 0 && (
                            <img
                              src={product.images[0]}
                              alt={`${product.title} Preview`}
                              className="w-full h-auto object-cover mb-4 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <h2 className="text-2xl font-bold mb-2 quantico-bold-italic text-black">
                          {product.title}
                        </h2>
                        <p className="text-md mb-2">
                          {product.variants.map((v) => v.size).join(", ")}
                        </p>
                        <p className="text-[20px] pt-sans-bold mb-4">
                          ${product.variants[0].price.toFixed(2)}
                        </p>
                      </Link>

                      {/* Add to Cart Button */}
                      <div className="learn-more">
                        <button
                          className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-transparent border border-[#0821D2] quantico-bold-italic text-xl w-full uppercase mt-2 py-2 transition-colors duration-300 ease-in-out "
                          type="button"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between mt-16 space-x-4 w-full quantico-bold-italic">
                {/* Page Numbers */}
                <div className="flex items-center space-x-2 w-1/2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`w-10 h-10 flex items-center justify-center border ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-[#A467F7CC] to-[#9857F3] text-white quantico-bold-italic border-[#9857F3]"
                          : "border-purple-500 text-purple-500"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Next and Previous Buttons */}
                <div className="flex items-center justify-end space-x-2 w-1/2">
                  <button
                    className={`w-12 h-10 flex items-center justify-center border ${
                      currentPage === 1
                        ? "text-gray-300 border-gray-300 cursor-not-allowed"
                        : "text-purple-500 border-purple-500"
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    className={`w-12 h-10 flex items-center justify-center border ${
                      currentPage === totalPages
                        ? "text-gray-300 border-gray-300 cursor-not-allowed"
                        : "text-purple-500 border-purple-500"
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};

export default ProductList;
