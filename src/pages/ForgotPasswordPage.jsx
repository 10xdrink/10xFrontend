// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordBG from "../assets/LoginBG.png"; // Ensure this image exists
import api from "../utils/api"; // API instance for making requests
import { SwitchTransition, CSSTransition } from "react-transition-group";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");

  // Error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });
      setSuccess(
        response.data.message || "Reset link sent to your email successfully."
      );
      setEmail("");
    } catch (err) {
      console.error("Forgot Password error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again later."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${ForgotPasswordBG})` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[600px]">
        <SwitchTransition>
          <CSSTransition key="forgot-password" timeout={300} classNames="fade">
            <div>
              <h2 className="text-3xl font-bold mb-4 quantico-bold">
                Forgot Password
              </h2>
              <p className="mb-8 text-lg pt-sans-regular">
                Enter your email below to receive a password reset link.
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border-2 ${
                      error ? "border-red-500" : "border-black"
                    } rounded`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold quantico-bold-italic hover:bg-gray-800 transition duration-300 rounded"
                >
                  SEND RESET LINK
                </button>
              </form>
              <div className="text-center mt-4">
                <p>
                  Remembered your password?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-sm font-bold hover:underline pt-sans-bold"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
