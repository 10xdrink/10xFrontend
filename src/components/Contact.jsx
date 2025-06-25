// src/components/Contact.jsx

import React, { useState } from "react";
import axios from "axios";
import Email from "../assets/Email.png";
import Phone from "../assets/PhoneNumber.png";
import Location from "../assets/Location.png";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    termsAgreed: false,
  });

  // State for handling submission status
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Email validation regex
  const validateEmail = (email) => {
    // Simple email regex for validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessages([]);

    // Client-side validation
    const errors = [];

    if (!validateEmail(formData.email)) {
      errors.push("Please enter a valid email address.");
    }

    if (formData.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long.");
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
      // Use environment variable for backend URL
      const backendURL = `${import.meta.env.VITE_API_URL}/contact`;

      // Send the request to the API
      const response = await axios.post(backendURL, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        termsAgreed: formData.termsAgreed,
      });

      // Set success message
      setSuccessMessage("Form Submitted, We'll get back to you shortly");

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        message: "",
        termsAgreed: false,
      });

      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Validation errors from backend
        const messages = error.response.data.errors.map((err) => err.msg);
        setErrorMessages(messages);
      } else if (error.response && error.response.data.message) {
        // Other errors from backend
        setErrorMessages([error.response.data.message]);
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
    <div className="flex flex-col md:flex-row justify-between items-start w-full mx-auto py-12 px-6 sm:px-6 lg:px-20 text-black bg-[#F0F0F0]">
      {/* Contact Information */}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl quantico-bold-italic mt-1 uppercase mb-4 animate-fadeIn">
          Get in touch
        </h1>
        <p className="mb-8 pt-sans-bold text-base sm:text-lg capitalize animate-fadeIn delay-200">
          Have a question or need assistance? Contact us!
        </p>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center space-x-3 animate-slideInLeft delay-400">
            <img src={Email} alt="Email" className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="pt-sans-regular text-sm sm:text-base">
              info@10xdrink.com
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 animate-slideInLeft delay-600">
            <img src={Phone} alt="Phone" className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="pt-sans-regular text-sm sm:text-base">
              +91 9676393311
            </span>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-3 animate-slideInLeft delay-800">
            <img
              src={Location}
              alt="Location"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="pt-sans-regular text-sm sm:text-base">
              Door No: 18-1-337/C/19/A/11st Floor,<br/>
              Sai Baba Nagar, Uppuguda, Chatrinaka,<br/>
              Chandrayangutta, Hyderabad, Telangana.<br/>
              PIN 500005.
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <form
          className="space-y-6 animate-fadeInUp delay-1000"
          onSubmit={handleSubmit}
        >
          {/* Success Message */}
          {successMessage && (
            <div className="p-4 mb-4 text-green-700 bg-green-100 rounded transition-opacity duration-500 animate-fadeIn">
              {successMessage}
            </div>
          )}

          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded transition-opacity duration-500 animate-fadeIn">
              <ul className="list-disc pl-5">
                {errorMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Name Input */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 pt-sans-regular text-sm sm:text-base"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-3 rounded-md focus:outline-none focus:border-[#0821D2] transition-all duration-300 pt-sans-regular shadow-sm focus:shadow-md w-full"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 pt-sans-regular text-sm sm:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${
                errorMessages.some((msg) =>
                  msg.toLowerCase().includes("email")
                )
                  ? "border-red-500"
                  : "border-gray-400"
              } p-3 rounded-md focus:outline-none focus:border-[#0821D2] transition-all duration-300 pt-sans-regular shadow-sm focus:shadow-md w-full`}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="mb-2 pt-sans-regular text-sm sm:text-base"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`border ${
                errorMessages.some((msg) =>
                  msg.toLowerCase().includes("message")
                )
                  ? "border-red-500"
                  : "border-gray-400"
              } p-3 rounded-md focus:outline-none focus:border-[#0821D2] transition-all duration-300 pt-sans-regular shadow-sm focus:shadow-md resize-none w-full`}
              placeholder="Enter your message..."
              rows="5"
              required
            ></textarea>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="termsAgreed"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className="custom-checkbox h-5 w-5 sm:h-6 sm:w-6 rounded border-gray-400 focus:ring-[#0821D2] transition-transform duration-200"
              required
            />
            <label htmlFor="termsAgreed" className="text-sm sm:text-base">
              <p className="roboto-regular">I agree to the Terms</p>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`quantico-bold-italic text-lg sm:text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-6 sm:px-8 font-bold focus:outline-none hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } w-full sm:w-auto`}
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
                  <span>Sending...</span>
                </div>
              ) : (
                "SEND"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* CSS is handled in a separate CSS file or through Tailwind classes */}

    </div>
  );
};

export default Contact;
