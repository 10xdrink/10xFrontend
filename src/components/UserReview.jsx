// src/components/UserReview.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import api from "../utils/api"; // Use the api instance
import { ProductContext } from "../context/ProductContext"; // Import ProductContext
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for user data

const UserReview = () => {

  // Form state
  const [formData, setFormData] = useState({
    product: "",
    photos: [],
    rating: "",
    comment: "",
  });

  // State for handling submission status
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // States for Product Dropdown
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Reference for clicking outside the product dropdown
  const productRef = useRef();

  // Access products from ProductContext
  const { products, loading: productsLoading, error: productsError } = useContext(ProductContext);

  // Access user from AuthContext (optional, if needed)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log('Products received in UserReview:', products); // Debugging log
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Click outside handler for Product Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productRef.current && !productRef.current.contains(event.target)) {
        setIsProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      const selectedFiles = Array.from(files);
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const newPhotos = [];
      const newErrors = [];

      selectedFiles.forEach((file) => {
        if (!validTypes.includes(file.type)) {
          newErrors.push(`${file.name} is not a supported format.`);
        } else if (formData.photos.length + newPhotos.length >= 6) {
          newErrors.push("You can only upload up to 6 images.");
        } else {
          newPhotos.push(file);
        }
      });

      if (newErrors.length > 0) {
        setErrorMessages(newErrors);
        // Clear error messages after 5 seconds
        setTimeout(() => {
          setErrorMessages([]);
        }, 5000);
      }

      if (newPhotos.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          photos: [...prevData.photos, ...newPhotos],
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle removing a photo
  const handleRemovePhoto = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
  };

  // Handle rating selection
  const handleRating = (ratingValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: ratingValue,
    }));
  };

  // Handle Product Selection
  const handleProductSelect = (product) => {
    setFormData((prevData) => ({
      ...prevData,
      product: product._id, // Store product ID
    }));
    setIsProductOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    // Client-side validation
    const errors = [];

    if (!formData.product) {
      errors.push("Please select a product.");
    }

    if (!formData.rating) {
      errors.push("Please provide a rating.");
    }

    if (formData.comment.trim().length < 10) {
      errors.push("Comment must be at least 10 characters long.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      // Clear error messages after 5 seconds
      setTimeout(() => {
        setErrorMessages([]);
      }, 5000);
      return;
    }

    try {
      // Prepare form data for submission
      const submissionData = new FormData();
      submissionData.append("product", formData.product); // Send product ID
      formData.photos.forEach((photo) => {
        submissionData.append("photos", photo); // Ensure field name is 'photos'
      });
      submissionData.append("rating", formData.rating);
      submissionData.append("comment", formData.comment);

      // Use the api instance to ensure Authorization header is set
      const response = await api.post('/reviews', submissionData);
      console.log('Review Submission Response:', response.data); // Debugging log

      // Show success modal
      setShowModal(true);

      // Reset form fields
      setFormData({
        product: "",
        photos: [],
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.error('Error submitting review:', error); // Debugging log
      if (error.response && error.response.data && error.response.data.errors) {
        // Validation errors from backend
        const messages = error.response.data.errors.map((err) => err.msg);
        setErrorMessages(messages);
      } else if (error.message) {
        // Other errors from backend
        setErrorMessages([error.message]);
      } else {
        // Network or unexpected errors
        setErrorMessages([
          "An unexpected error occurred. Please try again later.",
        ]);
      }

      // Clear error messages after 5 seconds
      setTimeout(() => {
        setErrorMessages([]);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start w-full mx-auto py-28 px-8 text-black bg-white pl-20 pr-20">
      {/* Review Information */}
      <div className="w-full md:w-1/2 pr-4">
        <h1 className="text-7xl quantico-bold-italic mt-1 uppercase mb-4 animate-fadeIn">
          Submit Your Review
        </h1>
        <p className="mb-8 pt-sans-bold text-lg capitalize animate-fadeIn delay-200">
          Share your experience with our product!
        </p>
        <div className="w-[600px]">
          <img src="https://res.cloudinary.com/dvbbsgj1u/image/upload/v1731671845/kdfy9ptnlqypsaedmxeh.png" alt="" />
        </div>
        {/* You can add additional static information here if needed */}
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <form
          className="space-y-6 animate-fadeInUp delay-1000"
          onSubmit={handleSubmit}
        >
          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 transition-opacity duration-500 animate-fadeIn">
              <ul className="list-disc pl-5">
                {errorMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Product Dropdown */}
          <div className="flex flex-col relative" ref={productRef}>
            <label className="mb-2 pt-sans-regular" htmlFor="product">
              Product
            </label>
            <button
              type="button"
              className="w-full bg-white border border-black text-black py-3 px-4 pr-8 text-left focus:outline-none flex justify-between items-center"
              onClick={() => {
                if (!productsLoading && !productsError) {
                  setIsProductOpen(!isProductOpen);
                }
              }}
              disabled={productsLoading || productsError}
            >
              {formData.product
                ? products.find((p) => p._id === formData.product)?.title || "Select a product"
                : "Select a product"}
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            {isProductOpen && (
              <div className="absolute z-10 w-full bg-white shadow-lg border border-t-0 border-black mt-1 p-4 max-h-80 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <ul>
                    {filteredProducts.map((product) => (
                      <li
                        key={product._id}
                        onClick={() => handleProductSelect(product)}
                        className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                      >
                        {/* Product Image */}
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-8 h-8 object-cover mr-2 rounded"
                        />
                        {/* Product Title */}
                        {product.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-gray-500">No products available.</div>
                )}
              </div>
            )}
            {/* Loading and Error States */}
            {productsLoading && (
              <div className="p-2 text-gray-500">Loading products...</div>
            )}
            {productsError && (
              <div className="p-2 text-red-500">Failed to load products.</div>
            )}
          </div>

          {/* Emoji Reaction Rating */}
          <div className="flex flex-col">
            <label className="mb-2 pt-sans-regular">Rating</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleRating(1)}
                className={`py-4 px-8 ${
                  formData.rating === 1
                    ? "bg-gradient-to-r from-black to-[#0821D2] text-white"
                    : "bg-gray-200 text-[#0821D2]"
                } focus:outline-none transition-colors duration-300 flex flex-col items-center `}
              >
                <i className="fa-solid fa-face-frown text-2xl"></i>
                <span className="mt-1 text-sm">Worst</span>
              </button>
              <button
                type="button"
                onClick={() => handleRating(2)}
                className={`py-4 px-8 ${
                  formData.rating === 2
                    ? "bg-gradient-to-r from-black to-[#0821D2] text-white"
                    : "bg-gray-200 text-[#0821D2]"
                } focus:outline-none transition-colors duration-300 flex flex-col items-center `}
              >
                <i className="fa-solid fa-face-sad-cry text-2xl"></i>
                <span className="mt-1 text-sm">Poor</span>
              </button>
              <button
                type="button"
                onClick={() => handleRating(3)}
                className={`py-4 px-8 ${
                  formData.rating === 3
                    ? "bg-gradient-to-r from-black to-[#0821D2] text-white"
                    : "bg-gray-200 text-[#0821D2]"
                } focus:outline-none transition-colors duration-300 flex flex-col items-center `}
              >
                <i className="fa-solid fa-face-meh text-2xl"></i>
                <span className="mt-1 text-sm">Fair</span>
              </button>
              <button
                type="button"
                onClick={() => handleRating(4)}
                className={`py-4 px-8 ${
                  formData.rating === 4
                    ? "bg-gradient-to-r from-black to-[#0821D2] text-white"
                    : "bg-gray-200 text-[#0821D2]"
                } focus:outline-none transition-colors duration-300 flex flex-col items-center `}
              >
                <i className="fa-solid fa-face-smile text-2xl"></i>
                <span className="mt-1 text-sm">Good</span>
              </button>
              <button
                type="button"
                onClick={() => handleRating(5)}
                className={`py-4 px-8 ${
                  formData.rating === 5
                    ? "bg-gradient-to-r from-black to-[#0821D2] text-white"
                    : "bg-gray-200 text-[#0821D2]"
                } focus:outline-none transition-colors duration-300 flex flex-col items-center `}
              >
                <i className="fa-solid fa-face-grin-stars text-2xl"></i>
                <span className="mt-1 text-sm">Excellent</span>
              </button>
            </div>
          </div>
          {/* Comment Section */}
          <div className="flex flex-col">
            <label htmlFor="comment" className="mb-2 pt-sans-regular">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className={`border ${
                errorMessages.some((msg) =>
                  msg.toLowerCase().includes("comment")
                )
                  ? "border-red-500"
                  : "border-gray-400"
              } p-3 md:p-4 focus:outline-none focus:border-[#0821D2] transition-all duration-300 pt-sans-regular shadow-sm focus:shadow-md resize-none`}
              placeholder="Share your thoughts about the product..."
              rows="5"
              required
            ></textarea>
          </div>


          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "SUBMIT REVIEW"
              )}
            </button>
          </div>
          {/* Additional Styles for Animations */}
          <style jsx>
            {`
              /* Animations similar to Contact.jsx */
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes slideInLeft {
                from {
                  opacity: 0;
                  transform: translateX(-20px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              .animate-fadeIn {
                animation: fadeIn 0.5s ease-out forwards;
              }

              .animate-fadeInUp {
                animation: fadeInUp 0.5s ease-out forwards;
              }

              .animate-slideInLeft {
                animation: slideInLeft 0.5s ease-out forwards;
              }

              .delay-200 {
                animation-delay: 0.2s;
              }

              .delay-400 {
                animation-delay: 0.4s;
              }

              .delay-600 {
                animation-delay: 0.6s;
              }

              .delay-800 {
                animation-delay: 0.8s;
              }

              .delay-1000 {
                animation-delay: 1s;
              }

              /* Optional: Add a shake animation for error state */
              .shake {
                animation: shake 0.5s;
              }

              @keyframes shake {
                0%,
                100% {
                  transform: translateX(0);
                }
                25% {
                  transform: translateX(-5px);
                }
                75% {
                  transform: translateX(5px);
                }
              }

              /* Modal Styles */
              .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 50;
              }

              .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                animation: fadeIn 0.5s ease-out forwards;
              }

              .modal-button {
                margin-top: 1.5rem;
                padding: 0.75rem 1.5rem;
                background: #0821D2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.3s;
              }

              .modal-button:hover {
                background: #060f9e;
              }
            `}
          </style>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4 quantico-bold-italic">Thank You for Your Review!</h2>
            <p className="mb-6 pt-sans-regular">
              We're glad you shared your thoughts. Your feedback helps us improve our products.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Additional Styles for Animations */}
      <style jsx>
        {`
          /* Keyframes for animations are already defined above */
        `}
      </style>
    </div>
  );
};

export default UserReview;
