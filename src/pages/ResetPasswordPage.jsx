// src/pages/ResetPasswordPage.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginBG from "../assets/LoginBG.png"; // Ensure this image exists
import api from "../utils/api"; // API instance for making requests
import { SwitchTransition, CSSTransition } from "react-transition-group";

const ResetPasswordPage = () => {
  const { resetToken } = useParams(); // Get the token from URL params
  const navigate = useNavigate();

  // Form states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Show/Hide password state
  const [showPassword, setShowPassword] = useState(false);

  // Handle password reset form submission
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post(`/auth/reset-password/${resetToken}`, {
        password,
      });
      setSuccess(response.data.message || "Password has been reset successfully.");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
    } catch (err) {
      console.error("Password Reset error:", err);
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBG})` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[600px]">
        <SwitchTransition>
          <CSSTransition key="reset-password" timeout={300} classNames="fade">
            <div>
              <h2 className="text-3xl font-bold mb-4 quantico-bold">
                Reset Password
              </h2>
              <p className="mb-8 text-lg pt-sans-regular">
                Enter your new password below.
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    New Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-2 pt-sans-regular"
                  >
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye"></i> // Visible Icon
                    ) : (
                      <i className="fa-solid fa-eye-slash"></i> // Hidden Icon
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold quantico-bold-italic hover:bg-gray-800 transition duration-300 rounded"
                >
                  RESET PASSWORD
                </button>
              </form>
              <div className="text-center mt-4 pt-sans-regular">
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

export default ResetPasswordPage;
