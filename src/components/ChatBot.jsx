// src/components/ChatBot.jsx

import { useState } from "react";
import { Transition } from "@headlessui/react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For handling loading state
  const [successMessage, setSuccessMessage] = useState(""); // For success feedback
  const [errorMessage, setErrorMessage] = useState(""); // For error feedback

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = {
      name: e.target.name.value.trim(),
      mobile: e.target.mobile.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),
      consent: e.target.consent.checked,
    };

    try {
      const response = await fetch(`/api/chatbot/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || "Message sent successfully!");
        setIsOpen(false);
        e.target.reset();
      } else {
        setErrorMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 w-[360px] bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setSuccessMessage("")}
          >
            {/* SVG Close Icon */}
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.64a.5.5 0 00.707.707L10 10.707l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64a.5.5 0 000-.708z" />
            </svg>
          </span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 w-[360px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{errorMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setErrorMessage("")}
          >
            {/* SVG Close Icon */}
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.64a.5.5 0 00.707.707L10 10.707l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64a.5.5 0 000-.708z" />
            </svg>
          </span>
        </div>
      )}

      {/* Chatbot Modal */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
      >
        <div className="mb-4 w-[360px] bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-400 p-[1px] rounded-2xl shadow-lg">
          {/* Header */}
          <div
            className="bg-gradient-to-b from-[#061792] to-[#000103] rounded-t-2xl p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-b from-[#061792] to-[#000103] rounded-full w-12 h-12 flex items-center justify-center p-2">
                <img
                  src="https://res.cloudinary.com/dvbbsgj1u/image/upload/v1731090126/tesnhlpvlo6w9bdjepag.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white quantico-bold text-lg">
                Have a question?
              </span>
            </div>
            <svg
              className="w-5 h-5 text-white transform transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-b-2xl px-4 py-8">
            <div className="flex gap-3 mb-4">
              <div className="bg-gradient-to-b from-[#061792] to-[#000103] w-24 h-12 rounded-full flex items-center justify-center p-2">
                <img
                  src="https://res.cloudinary.com/dvbbsgj1u/image/upload/v1731090126/tesnhlpvlo6w9bdjepag.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base bg-[#EDEDED] p-2 text-black pt-sans-regular">
                Enter your question below and a team member will get right back
                to you as soon as possible
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Input */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0821D2] text-black pt-sans-regular shadow-sm focus:shadow-md"
                aria-label="Name" /* Accessibility */
                required
              />

              {/* Mobile Phone Input with +91 Prefix */}
              <input
                type="tel"
                name="mobile"
                placeholder="+91 Mobile Phone"
                pattern="\+91\d{10}"
                title="Enter a valid +91 mobile number (e.g., +911234567890)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0821D2] text-black pt-sans-regular shadow-sm focus:shadow-md"
                aria-label="Mobile Phone" /* Accessibility */
                required
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0821D2] text-black pt-sans-regular shadow-sm focus:shadow-md"
                aria-label="Email" /* Accessibility */
                required
              />

              {/* Message Input */}
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0821D2] text-black pt-sans-regular shadow-sm focus:shadow-md resize-none"
                aria-label="Message" /* Accessibility */
                required
              ></textarea>

              {/* Custom Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  className="custom-checkbox h-5 w-5 rounded focus:ring-[#0821D2] transition-transform duration-200"
                  required
                />
                <label
                  htmlFor="consent"
                  className="cursor-pointer text-xs text-black pt-sans-regular"
                >
                  By submitting you agree to receive SMS and/or e-mails for the
                  provided channel. Rates may be applied.
                </label>
              </div>

              {/* Custom Checkbox Styles */}
              <style jsx>{`
                .custom-checkbox {
                  appearance: none;
                  background-color: #fff;
                  border: 2px solid #000000;
                  width: 2rem;
                  height: 1.25rem;
                  display: inline-block;
                  position: relative;
                  cursor: pointer;
                  transition: background-color 0.3s, border-color 0.3s;
                }

                .custom-checkbox:checked {
                  background-color: #0821d2;
                  border-color: #0821d2;
                  transform: scale(1.1);
                }

                .custom-checkbox:checked::after {
                  content: "";
                  position: absolute;
                  top: 2px;
                  left: 6px;
                  width: 6px;
                  height: 12px;
                  border: solid white;
                  border-width: 0 2px 2px 0;
                  transform: rotate(45deg);
                }

                /* Animations */
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
              `}</style>

              {/* Submit Button */}
              <div className="flex justify-center w-full">
                <div className="learn-more">
                  <button
                    type="submit"
                    className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-lg md:text-xl py-3 px-6 md:px-8 focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "SENDING..." : "SEND"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Transition>

      {/* Circular Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)} // Toggle isOpen state
        className="p-4 rounded-full bg-gradient-to-b from-[#061792] to-[#000103] flex items-center justify-center relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIwIEwgMjAgMjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAyMCAwIEwgMjAgMjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"
        />
        {/* Chat Icon */}
        <i className="fa-regular fa-comments text-white text-3xl relative z-10"></i>
      </button>
    </div>
  );
}
