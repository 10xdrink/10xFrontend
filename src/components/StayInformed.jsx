// src/components/StayInformed.js

import React, { useState } from "react";
import StayInformedImage from "../assets/StayInformed.png";
import relumeLogo from "../assets/Relume.png";

const StayInformed = () => {
  // State to manage email input and submission status
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!email) {
      setStatus({
        loading: false,
        success: false,
        message: "Please enter your email address.",
      });
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        loading: false,
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus({ loading: true, success: null, message: "" });

    // Assign a default name since the name field is omitted
    const defaultName = "Subscriber";

    try {
      const response = await fetch("https://backend.10xdrink.com/api/email-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: defaultName, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          message: data.message || "Subscription successful!",
        });
        setEmail(""); // Reset the form
      } else {
        setStatus({
          loading: false,
          success: false,
          message: data.message || "Subscription failed. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message: "An error occurred. Please try again later.",
      });
      console.error("Error subscribing to email list:", error);
    }
  };

  return (
    <div>
      <div className="main-div flex mt-24 bg-gradient-to-r from-[#FFFFFF] to-[#E6E6E6]">
        <div className="left w-1/2 flex justify-start items-center px-12">
          <div className="heading">
            <h1 className="text-7xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
              Stay Informed <br />
              with Our <br />
              Newsletter
            </h1>

            <div className="description mt-4">
              <p className="text-xl pt-sans-regular mb-8">
                Subscribe to our newsletter for the latest blog posts and
                exclusive <br />
                content.
              </p>
            </div>

            {/* Updated Form */}
            <form onSubmit={handleSubmit} className="input-box flex">
              <div className="input-email flex items-center space-x-4 w-full">
                {/* Email Input */}
                <input
                  type="email"
                  name="email"
                  aria-label="Email address"
                  className="flex-1 px-4 py-4 border-2  outline-none pt-sans-regular border-black"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`flex items-center uppercase quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-4 px-6 font-bold  focus:outline-none hover:shadow-lg transition duration-300 ease-in-out ${
                    status.loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Join now"
                  disabled={status.loading}
                >
                  {status.loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      JOIN NOW
                      <img
                        className="ml-3 w-6"
                        src={relumeLogo}
                        alt="Submit Icon"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Status Message */}
            {status.message && (
              <div className="mt-4">
                <p
                  className={`text-sm ${
                    status.success ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              </div>
            )}

            <div className="paragraph">
              <p className="text-base pt-sans-regular mt-2">
                By joining, you agree to our{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="right-div w-1/2">
          {StayInformedImage && (
            <img
              className="w-full"
              src={StayInformedImage}
              alt="Stay Informed"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StayInformed;